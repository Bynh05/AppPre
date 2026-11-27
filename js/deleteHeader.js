/**
 * deleteHeader.js — hnyb05 Self-Hosted
 * 1. Xóa header cache có điều kiện để tránh phản hồi 304 Not Modified trên RevenueCat & Firebase RC.
 * 2. Khi Locket tải Firebase Remote Config, chuyển tiếp bản sao (có giải nén gzip ở server Mỹ iad1)
 *    qua https://hnyb05-locket.vercel.app/api/rc-us để lấy toàn bộ key sớm của khu vực US/TestFlight
 *    và lưu vào $persistentStore cho Locket_Unlocked.js trộn trực tiếp vào cấu hình.
 */
(() => {
  const RC_US_URL = "https://hnyb05-locket.vercel.app/api/rc-us";

  if (typeof $request === "undefined" || !$request || !$request.headers) {
    return $done({});
  }

  const STRIP = new Set([
    "x-revenuecat-etag",
    "if-none-match",
    "if-modified-since",
    "x-goog-if-none-match",
    "x-firebase-etag",
  ]);

  const headers = {};
  for (const key of Object.keys($request.headers)) {
    if (!STRIP.has(key.toLowerCase())) {
      headers[key] = $request.headers[key];
    }
  }

  const reqUrl = String($request.url || "");
  if (
    !/firebaseremoteconfig\.googleapis\.com\/v1\/projects\/locket-4252a\//i.test(reqUrl) ||
    typeof $httpClient === "undefined" ||
    !$request.body
  ) {
    return $done({ headers });
  }

  function bytesToBase64(bytes) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let out = "";
    for (let i = 0; i < bytes.length; i += 3) {
      const a = bytes[i];
      const b = i + 1 < bytes.length ? bytes[i + 1] : 0;
      const c = i + 2 < bytes.length ? bytes[i + 2] : 0;
      const triple = (a << 16) | (b << 8) | c;
      out += alphabet[(triple >> 18) & 63];
      out += alphabet[(triple >> 12) & 63];
      out += i + 1 < bytes.length ? alphabet[(triple >> 6) & 63] : "=";
      out += i + 2 < bytes.length ? alphabet[triple & 63] : "=";
    }
    return out;
  }

  let bodyBase64 = "";
  let bodyText = "";
  try {
    if ($request.body instanceof Uint8Array || ArrayBuffer.isView($request.body)) {
      const view = new Uint8Array(
        $request.body.buffer,
        $request.body.byteOffset,
        $request.body.byteLength,
      );
      bodyBase64 = bytesToBase64(view);
    } else if (typeof $request.body === "string") {
      bodyText = $request.body;
    }
  } catch {
    return $done({ headers });
  }

  if (!bodyBase64 && !bodyText) {
    return $done({ headers });
  }

  const forwardHeaders = {};
  for (const k of Object.keys(headers)) {
    const lk = k.toLowerCase();
    if (
      lk === "x-goog-api-key" ||
      lk === "x-firebase-installations-auth" ||
      lk === "x-goog-firebase-installations-auth" ||
      lk === "x-ios-bundle-identifier" ||
      lk === "x-firebase-appcheck" ||
      lk === "user-agent"
    ) {
      forwardHeaders[k] = String(headers[k]);
    }
  }

  const uid =
    (typeof $persistentStore !== "undefined" && $persistentStore.read("HNYB05_UID")) || "";

  $httpClient.post(
    {
      url: RC_US_URL,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetUrl: reqUrl,
        headers: forwardHeaders,
        bodyBase64,
        bodyText,
        uid,
      }),
      timeout: 5,
    },
    (err, resp, data) => {
      if (!err && data && typeof $persistentStore !== "undefined") {
        try {
          const parsed = JSON.parse(data);
          if (parsed && parsed.ok === true && parsed.entries && typeof parsed.entries === "object") {
            $persistentStore.write(JSON.stringify(parsed.entries), "HNYB05_US_RC_ENTRIES");
            $persistentStore.write(String(Date.now()), "HNYB05_US_RC_TS");
          }
        } catch {}
      }
      return $done({ headers });
    },
  );
})();
