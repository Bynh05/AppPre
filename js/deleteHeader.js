/**
 * deleteHeader.js — hnyb05 Self-Hosted
 * Xóa các header cache có điều kiện để tránh phản hồi 304 Not Modified
 * trên RevenueCat và Firebase Remote Config.
 */
(() => {
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

  $done({ headers });
})();
