/**
 * Locket_Photobooth.js — Proxy /generateFilteredImage sang Backend Vercel qua $httpClient.post
 * Dùng $httpClient.post + $done({ response }) thay cho $done({ url }) để tránh lỗi
 * tái sử dụng kết nối HTTP/2 / TLS SNI lệch host từ lần chụp thứ 2 trở đi trên Shadowrocket.
 */
(() => {
  const TARGET_URL = "https://hnyb05-locket.vercel.app/api/generateFilteredImage";
  const CUSTOM_FRAMES = new Set([
    // 8 khung Photobooth 4 ô + aliases
    "frame_berry_days",
    "pb_strawberry",
    "frame_happy_snap",
    "pb_vintage",
    "frame_sky_diary",
    "pb_galaxy",
    "photobooth_4cut",
    "pb_holo_4cut",
    "pb_scrapbook_ripped_4cut",
    "pb_ripped_paper_4cut",
    "pb_denim_ripped_2x2",
    // 19 khung đơn / overlay + alias
    "frame_classic_pb",
    "photoboot",
    "photobooth_cute",
    "sticker_binh_luan_minh_tue",
    "cmt_locket",
    "khung_hello_kitty_pastel_ngot_ngao",
    "khung_hello_kitty_hong_pastel",
    "khung_pastel_vien_ren",
    "khung_hoa_pastel_vien_xanh_xinh",
    "khung_spiderred",
    "khung_khong_gian_xanh_pastel",
    "khung_ngoi_sao_hong_pastel",
    "khung_pastel_so_hai_cau",
    "khung_shin_chan",
    "khung_anh_hellokitty_v_sao",
    "khung_xanh_tay_sao_vang",
    "sinh_nhat_hello_kitty",
    "pb_single_y2k_silver_holo",
    "pb_single_denim_ripped",
    "pb_single_film_nostalgia",
  ]);

  const FORWARD_HEADERS = {
    authorization: "Authorization",
    "content-type": "Content-Type",
    "user-agent": "User-Agent",
    "accept-language": "Accept-Language",
    "firebase-instance-id-token": "firebase-instance-id-token",
    "x-firebase-appcheck": "x-firebase-appcheck",
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

  // Chỉ chuyển hướng các khung custom của hnyb05; filter AI gốc của Locket đi thẳng không bị chặn
  try {
    const parsed = JSON.parse(rawBody);
    const data = parsed && typeof parsed.data === "object" && parsed.data ? parsed.data : parsed;
    if (data && typeof data === "object") {
      const candidates = [
        data.filter_id,
        data.filterId,
        data.frame_id,
        data.frameId,
        data.prompt,
        data.filter_name,
        data.filterName,
        data.id,
      ]
        .filter((v) => typeof v === "string" && v.trim().length > 0)
        .map((v) => v.trim().toLowerCase());

      if (candidates.length > 0 && !candidates.some((c) => CUSTOM_FRAMES.has(c))) {
        return $done({});
      }
    }
  } catch {
    // Nếu không parse được JSON vẫn forward về backend để xử lý/debug
  }

  const headers = { "Content-Type": "application/json" };
  const srcHeaders = $request.headers || {};
  for (const key of Object.keys(srcHeaders)) {
    const canonical = FORWARD_HEADERS[key.toLowerCase()];
    if (canonical && srcHeaders[key] !== undefined && srcHeaders[key] !== null) {
      headers[canonical] = String(srcHeaders[key]);
    }
  }

  $httpClient.post(
    {
      url: TARGET_URL,
      headers,
      body: rawBody,
      timeout: 45,
    },
    (err, resp, data) => {
      if (err || !resp) {
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
