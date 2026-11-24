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

    function decodeJwtFromAuth(headers) {
      if (!headers) return null;
      const auth = headers["Authorization"] || headers["authorization"] || "";
      const token = String(auth).replace(/^bearer\s+/i, "").trim();
      const parts = token.split(".");
      if (parts.length !== 3 || !parts[1]) return null;
      try {
        return JSON.parse(base64UrlToUtf8(parts[1]));
      } catch {
        return null;
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
    const jwt = decodeJwtFromAuth(reqHeaders);
    const jwtUid = jwt ? String(jwt.user_id || jwt.sub || jwt.uid || "").trim() : "";
    const jwtName = jwt && typeof jwt.name === "string" ? jwt.name.trim() : "";
    const uid = jwtUid || readStore("HNYB05_UID");
    if (jwtUid) writeStore("HNYB05_UID", jwtUid);
    if (!uid) return $done({});

    let data;
    try {
      data = JSON.parse($response.body);
    } catch {
      return $done({});
    }

    function extractFields(node) {
      const username =
        typeof node.username === "string"
          ? node.username.trim().replace(/^@+/, "")
          : typeof node.handle === "string"
            ? node.handle.trim().replace(/^@+/, "")
            : "";
      const fullName = [node.first_name || node.firstName, node.last_name || node.lastName]
        .filter((v) => typeof v === "string" && v.trim())
        .map((v) => v.trim())
        .join(" ");
      const displayName = String(
        node.displayName || node.display_name || fullName || node.name || "",
      ).trim();
      if (username || displayName) {
        return { username, displayName };
      }
      return null;
    }

    // Chỉ trích xuất thông tin khi đúng UID của chính chủ máy
    function extractOwnProfile(node, targetUid, depth) {
      if (!node || typeof node !== "object" || depth > 6) return null;
      if (Array.isArray(node)) {
        for (const item of node) {
          const found = extractOwnProfile(item, targetUid, depth + 1);
          if (found) return found;
        }
        return null;
      }

      const nodeUid =
        node.uid || node.user_uid || node.userId || node.user_id || node.localId || node.id || "";
      if (nodeUid === targetUid) {
        const fields = extractFields(node);
        if (fields) return fields;
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

    let profile = extractOwnProfile(data, uid, 0);

    // Fallback: nếu request body ghi rõ user_uid của chính chủ (vd fetchUserV2/changeProfileInfo)
    if (!profile && typeof $request !== "undefined" && $request && $request.body) {
      try {
        const reqJson = JSON.parse(String($request.body));
        const reqData = reqJson && reqJson.data ? reqJson.data : reqJson;
        const reqTargetUid =
          reqData && (reqData.user_uid || reqData.uid || reqData.userId || "");
        const reqUrl = String($request.url || "");
        if (reqTargetUid === uid || /changeProfileInfo|fetchAccount|getAccountInfo/i.test(reqUrl)) {
          const resNode = (data && data.result && data.result.data) || (data && data.result) || data;
          if (resNode && typeof resNode === "object") {
            profile = extractFields(resNode) || extractFields(reqData || {});
          }
        }
      } catch {}
    }

    if (!profile && jwtName) {
      profile = { username: "", displayName: jwtName };
    }

    const cachedUsername = readStore("HNYB05_USERNAME");
    const cachedDisplay = readStore("HNYB05_DISPLAY_NAME");
    const lastTryTs = Number(readStore("HNYB05_PROFILE_TRY_TS") || "0");
    const needsServerFetch =
      (!cachedUsername || !cachedDisplay) && Date.now() - lastTryTs > 60 * 1000;

    const changed = Boolean(
      profile &&
        ((profile.username && profile.username !== cachedUsername) ||
          (profile.displayName && profile.displayName !== cachedDisplay)),
    );

    if (!changed && !needsServerFetch) {
      return $done({});
    }

    writeStore("HNYB05_PROFILE_TRY_TS", String(Date.now()));

    const authHeaders = { "Content-Type": "application/json" };
    const rawAuth = reqHeaders["Authorization"] || reqHeaders["authorization"];
    if (rawAuth) authHeaders["Authorization"] = rawAuth;
    const rawAppCheck = reqHeaders["x-firebase-appcheck"] || reqHeaders["X-Firebase-AppCheck"];
    if (rawAppCheck) authHeaders["x-firebase-appcheck"] = rawAppCheck;
    const rawUa = reqHeaders["User-Agent"] || reqHeaders["user-agent"];
    if (rawUa) authHeaders["User-Agent"] = rawUa;

    $httpClient.post(
      {
        url: AUTH_URL,
        headers: authHeaders,
        body: JSON.stringify({
          uid,
          username: (profile && profile.username) || "",
          displayName: (profile && profile.displayName) || "",
        }),
        timeout: 6,
      },
      (err, resp, respBody) => {
        if (!err && respBody) {
          try {
            const auth = JSON.parse(respBody);
            writeStore("HNYB05_ALLOWED", auth.allowed ? "1" : "0");
            writeStore("HNYB05_STATUS", auth.status || "");
            writeStore("HNYB05_AUTH_TS", String(Date.now()));
            const resolvedUser = auth.username || (profile && profile.username) || "";
            const resolvedDisplay = auth.displayName || (profile && profile.displayName) || "";
            if (resolvedUser) writeStore("HNYB05_USERNAME", resolvedUser);
            if (resolvedDisplay) writeStore("HNYB05_DISPLAY_NAME", resolvedDisplay);
          } catch {}
        }
        return $done({});
      },
    );
  } catch {
    return $done({});
  }
})();
