/**
 * Locket_Photobooth.js — Chuyển hướng /generateFilteredImage sang Backend Vercel
 * Giữ nguyên Authorization JWT & body, cập nhật Host header khớp domain đích.
 */
(() => {
  const TARGET_HOST = "hnyb05-locket.vercel.app";
  const TARGET_URL = `https://${TARGET_HOST}/api/generateFilteredImage`;

  if (typeof $request === "undefined" || !$request) {
    return $done({});
  }

  try {
    const headers = {};
    const srcHeaders = $request.headers || {};
    for (const key of Object.keys(srcHeaders)) {
      if (key.toLowerCase() === "host") continue;
      headers[key] = srcHeaders[key];
    }
    headers["Host"] = TARGET_HOST;

    return $done({
      url: TARGET_URL,
      headers,
      body: $request.body,
    });
  } catch {
    return $done({});
  }
})();
