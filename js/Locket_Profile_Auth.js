/**
 * Locket_Profile_Auth.js — Đồng bộ chỉ-đọc (read-only, http-response) UID, @username & displayName
 * lên https://hnyb05-locket.vercel.app/api/auth bằng Firebase JWT của Locket.
 * KHÔNG chỉnh sửa request hay response của Locket (an toàn tuyệt đối cho streaks, moments & caption AI).
 */
(() => {
  const AUTH_URL = "https://hnyb05-locket.vercel.app/api/auth";

  try {
    if (typeof $request === "undefined" || !$request) {
      return $done({});
    }

    const reqUrl = String($request.url || "");
    if (/\/(generateFilteredImage|applyFilter)/i.test(reqUrl)) {
      return $done({});
    }

    const reqHeaders = $request.headers || {};
    const rawAuth = reqHeaders["Authorization"] || reqHeaders["authorization"] || "";
    if (!rawAuth) {
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

    function decodeJwt(authHeader) {
      const token = String(authHeader).replace(/^bearer\s+/i, "").trim();
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

    const jwt = decodeJwt(rawAuth);
    const uid = jwt ? String(jwt.user_id || jwt.sub || jwt.uid || "").trim() : "";
    if (!uid) {
      return $done({});
    }

    const prevUid = readStore("HNYB05_UID");
    if (prevUid !== uid) {
      writeStore("HNYB05_UID", uid);
      writeStore("HNYB05_ALLOWED", "0");
      writeStore("HNYB05_USERNAME", "");
      writeStore("HNYB05_DISPLAY_NAME", "");
      writeStore("HNYB05_PROFILE_SYNC_TS", "0");
    }

    const now = Date.now();
    const isAllowed = readStore("HNYB05_ALLOWED") === "1";
    const cachedUsername = readStore("HNYB05_USERNAME");
    const cachedDisplay = readStore("HNYB05_DISPLAY_NAME");
    const lastSyncTs = Number(readStore("HNYB05_PROFILE_SYNC_TS") || "0");

    // Nếu chưa được duyệt (pending/mới cài/mới bị xóa trên admin) -> đồng bộ ngay (cooldown 8s)
    // Nếu thiếu tên/@username -> đồng bộ (cooldown 30s)
    // Nếu đã active đủ thông tin -> đồng bộ định kỳ mỗi 5 phút
    const needSync =
      (!isAllowed && now - lastSyncTs > 8 * 1000) ||
      ((!cachedUsername || !cachedDisplay) && now - lastSyncTs > 30 * 1000) ||
      now - lastSyncTs > 5 * 60 * 1000;

    if (!needSync) {
      return $done({});
    }

    // Đặt mốc thời gian ngay lập tức để các request song song cùng lúc bỏ qua
    writeStore("HNYB05_PROFILE_SYNC_TS", String(now));

    const authHeaders = {
      "Content-Type": "application/json",
      Authorization: rawAuth,
    };
    const rawAppCheck = reqHeaders["x-firebase-appcheck"] || reqHeaders["X-Firebase-AppCheck"];
    if (rawAppCheck) authHeaders["x-firebase-appcheck"] = rawAppCheck;
    const rawUa = reqHeaders["User-Agent"] || reqHeaders["user-agent"];
    if (rawUa) authHeaders["User-Agent"] = rawUa;

    const jwtName = jwt && typeof jwt.name === "string" ? jwt.name.trim() : "";

    $httpClient.post(
      {
        url: AUTH_URL,
        headers: authHeaders,
        body: JSON.stringify({
          uid,
          displayName: jwtName,
        }),
        timeout: 5,
      },
      (err, resp, respBody) => {
        if (!err && respBody) {
          try {
            const auth = JSON.parse(respBody);
            writeStore("HNYB05_ALLOWED", auth.allowed ? "1" : "0");
            writeStore("HNYB05_STATUS", auth.status || "");
            writeStore("HNYB05_AUTH_TS", String(Date.now()));
            if (auth.username) writeStore("HNYB05_USERNAME", auth.username);
            if (auth.displayName) writeStore("HNYB05_DISPLAY_NAME", auth.displayName);
          } catch {}
        }
        return $done({});
      },
    );
  } catch {
    return $done({});
  }
})();
