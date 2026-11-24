/**
 * Locket_Photobooth.js — Proxy toàn bộ /generateFilteredImage (27 khung + 56 filter AI)
 * sang Backend Vercel qua $httpClient.post + $done({ response }).
 */
(() => {
  const TARGET_URL = "https://hnyb05-locket.vercel.app/api/generateFilteredImage";
  const FORWARD_HEADERS = {
    authorization: "Authorization",
    "content-type": "Content-Type",
    "user-agent": "User-Agent",
    "accept-language": "Accept-Language",
  };

  if (typeof $request === "undefined" || !$request || typeof $httpClient === "undefined") {
    return $done({});
  }

  const rawBody =
    typeof $request.body === "string"
      ? $request.body
      : $request.body
        ? JSON.stringify($request.body)
        : "{}";

  const headers = {
    "Content-Type": "application/json",
    "X-Hnyb05-Proxy": "httpclient-v4",
  };
  const srcHeaders = $request.headers || {};
  for (const key of Object.keys(srcHeaders)) {
    const canonical = FORWARD_HEADERS[key.toLowerCase()];
    if (canonical && srcHeaders[key] !== undefined && srcHeaders[key] !== null) {
      headers[canonical] = String(srcHeaders[key]);
    }
  }

  console.log(`[hnyb05-pb] forwarding ${rawBody.length} bytes to Vercel`);

  $httpClient.post(
    {
      url: TARGET_URL,
      headers,
      body: rawBody,
      timeout: 50,
    },
    (err, resp, data) => {
      if (err || !resp) {
        console.log(`[hnyb05-pb] upstream error: ${String(err || "empty response")}`);
        return $done({
          response: {
            status: 502,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Cache-Control": "no-store",
            },
            body: JSON.stringify({
              error: "Proxy request to hnyb05 backend failed",
              detail: String(err || "empty response"),
            }),
          },
        });
      }

      const status = Number(resp.status || resp.statusCode || 200);
      console.log(`[hnyb05-pb] upstream status=${status} len=${data ? data.length : 0}`);
      return $done({
        response: {
          status,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store",
          },
          body: typeof data === "string" && data.length > 0 ? data : "{}",
        },
      });
    },
  );
})();
