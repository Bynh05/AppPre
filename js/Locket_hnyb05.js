/**
 * Locket_hnyb05.js — RevenueCat Gold Unlock + Auth Check
 * Backend: https://hnyb05-locket.vercel.app/api/auth
 */
(() => {
  const AUTH_URL = "https://hnyb05-locket.vercel.app/api/auth";
  const FAR_FUTURE = "9999-01-09T10:10:14Z";
  const PAST = "2005-01-09T10:10:14Z";

  if (typeof $response === "undefined" || !$response || !$response.body) {
    return $done({});
  }

  const reqHeaders = (typeof $request !== "undefined" && $request && $request.headers) || {};
  const ua = reqHeaders["User-Agent"] || reqHeaders["user-agent"] || "";
  if (!/locket/i.test(ua)) {
    return $done({});
  }

  let obj = {};
  try {
    obj = JSON.parse($response.body);
  } catch {
    return $done({});
  }

  const reqUrl = (typeof $request !== "undefined" && $request && $request.url) || "";
  const urlMatch = reqUrl.match(/\/subscribers\/([^/?#]+)/i);
  const urlUid = urlMatch ? decodeURIComponent(urlMatch[1]) : "";
  const respUid = (obj.subscriber && obj.subscriber.original_app_user_id) || "";
  const savedUid = ($persistentStore && $persistentStore.read("HNYB05_UID")) || "";

  const uid =
    (urlUid && !urlUid.startsWith("$RCAnonymousID") ? urlUid : "") ||
    (savedUid && !savedUid.startsWith("$RCAnonymousID") ? savedUid : "") ||
    (respUid && !respUid.startsWith("$RCAnonymousID") ? respUid : "") ||
    urlUid ||
    respUid ||
    savedUid;

  if (!uid) {
    return $done({});
  }

  function makeSub(productId, amount, expiresIso) {
    return {
      auto_resume_date: null,
      display_name: productId,
      is_sandbox: true,
      ownership_type: "PURCHASED",
      billing_issues_detected_at: null,
      management_url: "https://apps.apple.com/account/subscriptions",
      period_type: "normal",
      price: { amount, currency: "VND" },
      expires_date: expiresIso,
      grace_period_expires_date: null,
      refunded_at: null,
      unsubscribe_detected_at: null,
      original_purchase_date: PAST,
      purchase_date: PAST,
      store: "app_store",
      store_transaction_id: "2000001108724193",
    };
  }

  function makeEnt(productId, expiresIso) {
    return {
      grace_period_expires_date: null,
      purchase_date: PAST,
      product_identifier: productId,
      expires_date: expiresIso,
    };
  }

  function applyGold(expiresAt) {
    const expiresIso =
      typeof expiresAt === "number" && expiresAt > Date.now()
        ? new Date(expiresAt).toISOString().replace(/\.\d{3}Z$/, "Z")
        : FAR_FUTURE;

    obj.Attention = "Hi! This was made by hnyb05.";
    obj.subscriber = obj.subscriber || {};
    obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
    obj.subscriber.entitlements = obj.subscriber.entitlements || {};

    const goldProduct = "locket_1600_1y";
    obj.subscriber.subscriptions[goldProduct] = makeSub(goldProduct, 399000, expiresIso);
    obj.subscriber.entitlements.Gold = makeEnt(goldProduct, expiresIso);

    const filterPackProduct = "com.locket.Locket.FilterPack_20Photos_500";
    obj.subscriber.subscriptions[filterPackProduct] = makeSub(filterPackProduct, 0, expiresIso);
    obj.subscriber.entitlements.effect_pack_20 = makeEnt(filterPackProduct, expiresIso);

    return $done({ body: JSON.stringify(obj) });
  }

  $httpClient.post(
    {
      url: AUTH_URL,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid }),
      timeout: 8,
    },
    (err, resp, data) => {
      if (err || !data) {
        return $done({});
      }

      try {
        const auth = JSON.parse(data);
        if (typeof $persistentStore !== "undefined") {
          $persistentStore.write(String(uid), "HNYB05_UID");
          $persistentStore.write(auth.allowed ? "1" : "0", "HNYB05_ALLOWED");
          $persistentStore.write(String(auth.status || ""), "HNYB05_STATUS");
          $persistentStore.write(String(Date.now()), "HNYB05_AUTH_TS");
          if (Array.isArray(auth.vipUids)) {
            $persistentStore.write(JSON.stringify(auth.vipUids), "HNYB05_VIP_UIDS");
          }
        }

        if (auth.allowed === true) {
          return applyGold(auth.expiresAt);
        }
      } catch {
        // Invalid auth response -> keep original response
      }

      return $done({});
    },
  );
})();
