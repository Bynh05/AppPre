/**
 * Locket_Profile_Auth.js — Bắt UID/Username/DisplayName từ api.locketcamera.com,
 * đồng bộ lên https://hnyb05-locket.vercel.app/api/auth và gắn huy hiệu vàng P2P cho vipUids.
 */
(() => {
  const AUTH_URL = "https://hnyb05-locket.vercel.app/api/auth";
  const AUTH_SYNC_INTERVAL_MS = 30 * 1000;

  // Pure-JS Base64URL decoder (tương thích 100% JavaScriptCore trên Shadowrocket)
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
  const reqUrl = (typeof $request !== "undefined" && $request && $request.url) || "";
  const jwtUid = decodeUidFromAuth(reqHeaders);
  const uid = jwtUid || readStore("HNYB05_UID");

  if (jwtUid) {
    writeStore("HNYB05_UID", jwtUid);
  }

  // --- MODE 1: http-request (mock changeProfileInfo khi đổi badge Gold) ---
  if (typeof $response === "undefined") {
    if (/\/changeProfileInfo/i.test(reqUrl) && readStore("HNYB05_ALLOWED") === "1") {
      const rawBody = ($request && $request.body) || "";
      if (/"badge"|"celebrity"|"locket_gold_badge"/i.test(rawBody)) {
        return $done({
          response: {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ result: { status: 200 } }),
          },
        });
      }
    }
    return $done({});
  }

  // --- MODE 2: http-response (api.locketcamera.com) ---
  if (!$response || !$response.body) {
    return $done({});
  }

  let data;
  try {
    data = JSON.parse($response.body);
  } catch {
    return $done({});
  }

  if (!uid) {
    return $done({});
  }

  // Trích username & displayName chỉ khi khớp đúng UID của chủ máy
  function extractOwnProfile(node, targetUid, depth) {
    if (!node || typeof node !== "object" || depth > 5) return null;
    if (Array.isArray(node)) {
      for (const item of node) {
        const found = extractOwnProfile(item, targetUid, depth + 1);
        if (found) return found;
      }
      return null;
    }

    const nodeUid = node.uid || node.user_uid || node.userId || "";
    const isSelf =
      nodeUid === targetUid ||
      (!nodeUid && /getAccountInfo|fetchUser|getLatestUser/i.test(reqUrl) && (node.username || node.first_name));

    if (isSelf && (node.username || node.first_name || node.last_name || node.display_name || node.displayName)) {
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

  function applyVipPatches(node, vipSet, depth) {
    if (!node || typeof node !== "object" || depth > 8) return false;
    let changed = false;

    if (Array.isArray(node)) {
      for (const item of node) {
        if (applyVipPatches(item, vipSet, depth + 1)) changed = true;
      }
      return changed;
    }

    const nodeUid = node.uid || node.user_uid || node.userId;
    if (typeof nodeUid === "string" && vipSet.has(nodeUid)) {
      node.badge = "locket_gold_badge";
      node.is_gold = true;
      node.has_gold = true;
      if ("subscription_badge" in node) node.subscription_badge = "gold";
      changed = true;
    }

    if (node.is_blurred === true) {
      node.is_blurred = false;
      changed = true;
    }
    if (node.blurred === true) {
      node.blurred = false;
      changed = true;
    }
    if (node.is_locked === true) {
      node.is_locked = false;
      changed = true;
    }
    if (node.requires_gold === true) {
      node.requires_gold = false;
      changed = true;
    }

    for (const key of Object.keys(node)) {
      const val = node[key];
      if (val && typeof val === "object") {
        if (applyVipPatches(val, vipSet, depth + 1)) changed = true;
      }
    }
    return changed;
  }

  function finish(allowed, vipUids) {
    if (!allowed) {
      return $done({});
    }
    const vipSet = new Set([uid, ...(Array.isArray(vipUids) ? vipUids : [])]);
    const modified = applyVipPatches(data, vipSet, 0);

    if (!modified && $response.status !== 402 && $response.status !== 403) {
      return $done({});
    }

    const result = { body: JSON.stringify(data) };
    if (($response.status === 402 || $response.status === 403) && modified) {
      result.status = 200;
    }
    return $done(result);
  }

  const profile = extractOwnProfile(data, uid, 0);
  const cachedUsername = readStore("HNYB05_USERNAME");
  const cachedDisplay = readStore("HNYB05_DISPLAY_NAME");
  const profileChanged =
    profile &&
    ((profile.username && profile.username !== cachedUsername) ||
      (profile.displayName && profile.displayName !== cachedDisplay));

  const lastTs = Number(readStore("HNYB05_AUTH_TS") || "0");
  const isStale = !lastTs || Date.now() - lastTs > AUTH_SYNC_INTERVAL_MS;

  if (!profileChanged && !isStale) {
    let cachedVips = [];
    try {
      cachedVips = JSON.parse(readStore("HNYB05_VIP_UIDS") || "[]");
    } catch {
      cachedVips = [];
    }
    return finish(readStore("HNYB05_ALLOWED") === "1", cachedVips);
  }

  const authHeaders = { "Content-Type": "application/json" };
  const rawAuth = reqHeaders["Authorization"] || reqHeaders["authorization"];
  if (rawAuth) authHeaders["Authorization"] = rawAuth;

  const payload = { uid };
  if (profile && profile.username) payload.username = profile.username;
  if (profile && profile.displayName) payload.displayName = profile.displayName;

  $httpClient.post(
    {
      url: AUTH_URL,
      headers: authHeaders,
      body: JSON.stringify(payload),
      timeout: 6,
    },
    (err, resp, respBody) => {
      if (!err && respBody) {
        try {
          const auth = JSON.parse(respBody);
          writeStore("HNYB05_ALLOWED", auth.allowed ? "1" : "0");
          writeStore("HNYB05_STATUS", auth.status || "");
          writeStore("HNYB05_AUTH_TS", String(Date.now()));
          if (Array.isArray(auth.vipUids)) {
            writeStore("HNYB05_VIP_UIDS", JSON.stringify(auth.vipUids));
          }
          if (profile && profile.username) writeStore("HNYB05_USERNAME", profile.username);
          if (profile && profile.displayName) writeStore("HNYB05_DISPLAY_NAME", profile.displayName);
          return finish(auth.allowed === true, auth.vipUids);
        } catch {
          // fall through to cached state
        }
      }

      let fallbackVips = [];
      try {
        fallbackVips = JSON.parse(readStore("HNYB05_VIP_UIDS") || "[]");
      } catch {
        fallbackVips = [];
      }
      return finish(readStore("HNYB05_ALLOWED") === "1", fallbackVips);
    },
  );
})();
