/**
 * Locket_Profile_Auth.js — Đồng bộ chỉ-đọc (read-only) UID, @username & displayName
 * lên https://hnyb05-locket.vercel.app/api/auth mà KHÔNG chỉnh sửa response của Locket
 * (đảm bảo không bao giờ làm lỗi Codable hay mất danh sách bạn bè).
 */
(() => {
  const AUTH_URL = "https://hnyb05-locket.vercel.app/api/auth";

  try {
    if (typeof $response === "undefined" || !$response || !$response.body) {
      return $done({});
    }

    function base64UrlToUtf8(input) {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      let str = String(input || "").replace(/-/g, "+").replace(/_/g, "/");
      while (str.length % 4) str += "=";

      const bytes = [];
      for (let i = 0; i < str.length; i += 4) {
        const a = alphabet.indexOf(str[i]);
        const b = alphabet.indexOf(str[i + 1]);
        const c = str[i + 2] === "=" ? -1 : alphabet.indexOf(str[i + 2]);
        const d = str[i + 3] === "=" ? -1 : alphabet.indexOf(str[i + 3]);
        if (a < 0 || b < 0) break;
        bytes.push((a << 2) | (b >> 4));
        if (c >= 0) bytes.push(((b & 15) << 4) | (c >> 2));
        if (d >= 0) bytes.push(((c & 3) << 6) | d);
      }

      let out = "";
      for (let i = 0; i < bytes.length; i++) {
        out += "%" + ("00" + bytes[i].toString(16)).slice(-2);
      }
      return decodeURIComponent(out);
    }

    function decodeUidFromAuth(headers) {
      if (!headers) return "";
      const auth = headers["Authorization"] || headers["authorization"] || "";
      const token = String(auth).replace(/^bearer\s+/i, "").trim();
      const parts = token.split(".");
      if (parts.length !== 3 || !parts[1]) return "";
      try {
        const payload = JSON.parse(base64UrlToUtf8(parts[1]));
        return String(payload.user_id || payload.sub || payload.uid || "").trim();
      } catch {
        return "";
      }
    }

    function readStore(key) {
      return (typeof $persistentStore !== "undefined" && $persistentStore.read(key)) || "";
    }

    function writeStore(key, val) {
      if (typeof $persistentStore !== "undefined") {
        $persistentStore.write(String(val ?? ""), key);
      }
    }

    const reqHeaders = (typeof $request !== "undefined" && $request && $request.headers) || {};
    const jwtUid = decodeUidFromAuth(reqHeaders);
    const uid = jwtUid || readStore("HNYB05_UID");
    if (jwtUid) writeStore("HNYB05_UID", jwtUid);
    if (!uid) return $done({});

    let data;
    try {
      data = JSON.parse($response.body);
    } catch {
      return $done({});
    }

    // Chỉ trích xuất thông tin khi đúng UID của chính chủ máy
    function extractOwnProfile(node, targetUid, depth) {
      if (!node || typeof node !== "object" || depth > 5) return null;
      if (Array.isArray(node)) {
        for (const item of node) {
          const found = extractOwnProfile(item, targetUid, depth + 1);
          if (found) return found;
        }
        return null;
      }

      const nodeUid = node.uid || node.user_uid || node.userId || node.localId || "";
      if (nodeUid === targetUid) {
        const username = typeof node.username === "string" ? node.username.trim() : "";
        const fullName = [node.first_name, node.last_name].filter(Boolean).join(" ").trim();
        const displayName = String(node.displayName || node.display_name || fullName || "").trim();
        if (username || displayName) {
          return { username, displayName };
        }
      }

      for (const key of Object.keys(node)) {
        const val = node[key];
        if (val && typeof val === "object") {
          const found = extractOwnProfile(val, targetUid, depth + 1);
          if (found) return found;
        }
      }
      return null;
    }

    const profile = extractOwnProfile(data, uid, 0);
    if (!profile) {
      return $done({});
    }

    const cachedUsername = readStore("HNYB05_USERNAME");
    const cachedDisplay = readStore("HNYB05_DISPLAY_NAME");
    const changed =
      (profile.username && profile.username !== cachedUsername) ||
      (profile.displayName && profile.displayName !== cachedDisplay);

    if (!changed) {
      return $done({});
    }

    const authHeaders = { "Content-Type": "application/json" };
    const rawAuth = reqHeaders["Authorization"] || reqHeaders["authorization"];
    if (rawAuth) authHeaders["Authorization"] = rawAuth;

    $httpClient.post(
      {
        url: AUTH_URL,
        headers: authHeaders,
        body: JSON.stringify({
          uid,
          username: profile.username,
          displayName: profile.displayName,
        }),
        timeout: 3,
      },
      (err, resp, respBody) => {
        if (!err && respBody) {
          try {
            const auth = JSON.parse(respBody);
            writeStore("HNYB05_ALLOWED", auth.allowed ? "1" : "0");
            writeStore("HNYB05_STATUS", auth.status || "");
            writeStore("HNYB05_AUTH_TS", String(Date.now()));
            if (profile.username) writeStore("HNYB05_USERNAME", profile.username);
            if (profile.displayName) writeStore("HNYB05_DISPLAY_NAME", profile.displayName);
          } catch {}
        }
        return $done({});
      },
    );
  } catch {
    return $done({});
  }
})();
