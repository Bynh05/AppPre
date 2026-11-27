/**
 * deleteHeader.js — hnyb05 Self-Hosted
 * 1. Xóa header cache có điều kiện để tránh phản hồi 304 Not Modified trên RevenueCat & Firebase RC.
 * 2. Trên Firebase Remote Config fetch (locket-4252a), gắn thêm cờ khu vực US & TestFlight/Gold
 *    để nhận sớm các tính năng mới nhất từ máy chủ Locket (nút hẹn giờ, rewind, audio, UI mới...).
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

  const reqUrl = String($request.url || "");
  if (
    /firebaseremoteconfig\.googleapis\.com\/v1\/projects\/locket-4252a\//i.test(reqUrl) &&
    typeof $request.body === "string" &&
    $request.body.trim().startsWith("{")
  ) {
    try {
      const bodyObj = JSON.parse($request.body);
      if (bodyObj && typeof bodyObj === "object" && !Array.isArray(bodyObj)) {
        // Yêu cầu cấu hình khu vực US + TestFlight/Gold (vẫn giữ nguyên app_id, instance_id, app_version thật)
        if ("countryCode" in bodyObj || !("country_code" in bodyObj)) {
          bodyObj.countryCode = "US";
        }
        if ("country_code" in bodyObj) {
          bodyObj.country_code = "us";
        }

        const extraProps = {
          testflight: "true",
          tesflight: "true",
          gold_member: "true",
          is_gold: "true",
          subscriber: "true",
          is_subscriber: "true",
          gold: "true",
          vip: "true",
          subscription_status: "active",
        };
        if ("analyticsUserProperties" in bodyObj || !("analytics_user_properties" in bodyObj)) {
          bodyObj.analyticsUserProperties = Object.assign(
            {},
            bodyObj.analyticsUserProperties || {},
            extraProps,
          );
        }
        if ("analytics_user_properties" in bodyObj) {
          bodyObj.analytics_user_properties = Object.assign(
            {},
            bodyObj.analytics_user_properties || {},
            extraProps,
          );
        }

        // Xóa Content-Length cũ vì độ dài body vừa thay đổi
        for (const k of Object.keys(headers)) {
          if (k.toLowerCase() === "content-length") delete headers[k];
        }
        return $done({ headers, body: JSON.stringify(bodyObj) });
      }
    } catch {
      // Fallback: chỉ strip headers
    }
  }

  return $done({ headers });
})();
