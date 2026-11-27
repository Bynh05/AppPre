/**
 * Locket_Unlocked.js — Firebase Remote Config (hnyb05 Self-Hosted)
 * Check quyền qua https://hnyb05-locket.vercel.app/api/auth
 * Giữ nguyên toàn bộ 48 link cdn.upanhlaylink.com, captions & popup hnyb05.
 */
(() => {
  const AUTH_URL = "https://hnyb05-locket.vercel.app/api/auth";
  const CACHE_FALLBACK_MS = 15 * 60 * 1000;

  if (typeof $response === "undefined" || !$response || !$response.body) {
    return $done({});
  }

  const headers = (typeof $request !== "undefined" && $request && $request.headers) || {};
  const userAgent = headers["User-Agent"] || headers["user-agent"] || "";
  if (!/locket/i.test(userAgent)) {
    return $done({});
  }

  let config = {};
  try {
    config = JSON.parse($response.body);
  } catch {
    return $done({});
  }

  function applyUnlockedConfig(studioData) {
    const studio = studioData && typeof studioData === "object" ? studioData : {};
    const studioTitle =
      typeof studio.studioTitle === "string" && studio.studioTitle.trim()
        ? studio.studioTitle.trim()
        : "Của tôi";
    const studioUrl = typeof studio.studioUrl === "string" ? studio.studioUrl.trim() : "";
    const customCaptions = Array.isArray(studio.customCaptions) ? studio.customCaptions : [];
    const customFrames = Array.isArray(studio.customFrames) ? studio.customFrames : [];

    config.state = "UPDATE";
    config.templateVersion = String(Date.now());
    Object.assign(config, {
      "Attention": "Hi! This was made by hnyb05."
    });
    config.entries = config.entries || {};

    // Trộn trực tiếp toàn bộ key mới nhất từ máy chủ Firebase khu vực Mỹ (iad1) do deleteHeader.js lấy về
    try {
      const rawUs = typeof $persistentStore !== "undefined" && $persistentStore.read("HNYB05_US_RC_ENTRIES");
      if (rawUs) {
        const usEntries = JSON.parse(rawUs);
        if (usEntries && typeof usEntries === "object" && !Array.isArray(usEntries)) {
          Object.assign(config.entries, usEntries);
        }
      }
    } catch { }

    Object.assign(config.entries, {
      "cache_ttl_seconds": "0",
      "client_cache_ttl_sec": "0",
      "camera_filter_gold_only": "false",
      "require_gold_for_filters": "false",
      "all_filters_free": "true",
      "android_subscribe_gold_button_enabled": "false",
      "profile_badge_visible": "true",
      "lunar_new_year_app_icon_enabled": "true",
      "settings_instagram_url": "https://hnyb05.vercel.app",
      "settings_tiktok_url": studioUrl || "https://hnyb05-locket.vercel.app/studio",
      "star_sign_caption_image_url": "https://storage.googleapis.com/locket-public/overlays/star_signs",
      "history_ads_mode": "off",
      "history_ads_prefetch_count": "0",
      "history_ads_prefetch_immediate": "false",
      "history_ads_prefetch_reroute": "false",
      "history_ads_dynamic_insertion": "false",
      "history_ads_refresh_prefetch_on_foreground": "false",
      "history_ads_floor_price": "0",
      "history_ads_floor_price_att": "0",
      "history_ad_log_displayed_on_background": "false",
      "history_ads_debug_menu": "false",
      "sentry_sample_rate": "0",
      "sentry_network_tracing": "false",
      "sentry_performance_tracking": "false",
      "sentry_trace_sample_rate": "0",
      "sentry_profiles_sample_rate": "0",
      "nimbus_cancellable_requests": "true",
      "camera_filter_fetch_cache_max_age_seconds": "0",
      "camera_roll_preview_enabled": "true",
      "camera_roll_video_enabled": "true",
      "camera_roll_video_upload_enabled": "true",
      "internal_camera_roll_video_upload_enabled": "true",
      "longer_camera_roll_videos_enabled": "true",
      "video_sound_enabled": "true",
      "microphone_enabled": "true",
      "camera_microphone_enabled": "true",
      "audio_session_deactivation_enabled": "true",
      "zoom_enabled": "true",
      "upload_main": "false",
      "upload_main_image_quality": "0.6",
      "upload_main_image_size": "1440",
      "upload_thumbnail_image_quality": "0.8",
      "upload_thumbnail_image_size": "1020",
      "max_friends_count": "999999999",
      "friend_limit_mode": "0",
      "soft_friend_limit_threshold_count": "999999999",
      "show_friend_limit_on_cam": "false",
      "signup_max_friends_count": "999999999",
      "celebrity_inbox_limit": "999999999",
      "celebrity_inbox_enabled": "false",
      "celebrity_vip_qr_redemption_enabled": "false",
      "new_friends_monitoring_enabled": "true",
      "improved_friend_suggestions": "true",
      "show_friend_suggestions_by_default": "true",
      "emoji_friend_suggestions": "true",
      "friend_suggestions_v2": "true",
      "prompt_contact_permissions_on_search": "true",
      "populate_phone_numbers_from_suggest_friends": "true",
      "hide_friends_enabled": "true",
      "hide_invite_links": "false",
      "hide_skip_contacts": "true",
      "show_all_contacts": "true",
      "show_invite_suggestions": "true",
      "show_no_friends_bottom_sheet": "false",
      "signup_allow_skip_add_friends": "true",
      "signup_custom_profile_picture": "true",
      "user_data_export_enabled": "true",
      "username_suggestions_enabled": "true",
      "moment_views_enabled": "true",
      "moment_views_v2": "true",
      "record_moment_views": "true",
      "notify_moment_views": "true",
      "get_moment_views_as_cloud_function": "true",
      "moment_reactions_v2": "true",
      "chat_reactions_enabled": "true",
      "conversation_reactions": "true",
      "typing_indicators_enabled": "true",
      "unsend_message_enabled": "true",
      "reply_prototype_enabled": "true",
      "reply_moment_photo_enabled": "true",
      "streak_reminders": "true",
      "join_community_enabled": "true",
      "messages_integration": "true",
      "conversations_enabled": "true",
      "fetch_moments_in_conversation": "true",
      "hide_chat_button": "false",
      "groups_enabled": "true",
      "group_contact_invites_enabled": "true",
      "groups_onboarding_accept_invite_preview_enabled": "true",
      "chat_hyperlink_enabled_mode": "always_enabled",
      "send_to_self_only_mode": "always_enabled",
      "time_travel_rewind_v2_enabled": "true",
      "conversation_drafts_enabled": "1",
      "calendar_delete_moment_enabled": "true",
      "calendar_rewind_enabled": "true",
      "audio_enabled": "true",
      "audio_playback_enabled": "true",
      "video_audio_enabled": "true",
      "chat_read_receipts": "true",
      "chat_read_receipts_mark_as_delivered_extension": "true",
      "chat_mode": "5",
      "rollcall_memories_streaks_enabled": "true",
      "year_of_the_horse_icon_enabled": "true",
      "camera_timer_enabled": "true",
      "self_timer_enabled": "true",
      "camera_themes": "[\"sakura\",\"snowflake\",\"sunset\",\"surfboard\",\"ootd\"]",
      "camera_themes_config": "{\"enabled\":true,\"themes\":[\"sakura\",\"snowflake\",\"sunset\",\"surfboard\",\"ootd\"]}",
      "camera_video_recording": "{\"default\":{\"maximum_duration\":60000,\"size\":1080,\"file_type\":\"mp4\",\"video_codec\":\"h265\"},\"gold\":{\"maximum_duration\":60000,\"size\":1080,\"file_type\":\"mp4\",\"video_codec\":\"h265\"}}",
      "time_travel_rewind_v2_share_templates": "{\"templates\":[\"rounded_square\",\"grid_collage\",\"cutout_collage\",\"rounded_square_bold\",\"wall_calendar\"],\"random_order\":false}",
      "locket_yearbook_story_sharing_encouraged": "true",
      "rollcall_enabled": "true",
      "rollcall_comment_actions": "true",
      "rollcall_profile_button": "true",
      "rollcall_prompt_export_after_share": "true",
      "rollcall_confirm_skip_tagging": "false",
      "rollcall_tap_to_tag_enabled": "false",
      "moment_upload_queue_persistence_v2": "1",
      "widget_frame_event_max_images": "5",
      "android_widget_frame_event_enabled": "true",
      "widget_badge_enabled": "true",
      "widget_badge_v2": "true",
      "widget_stale_state_enabled": "false",
      "widget_last_sent_indicator": "false",
      "widget_sync_token_reload_mode": "clearTokenNever",
      "live_activity_onboarding": "true",
      "live_activity_onboarding_variant": "setup_ready_on_background",
      "register_live_activity_push_to_start_token": "true",
      "live_activity_remove_stale_start_token": "true",
      "notification_preferences_live_activities": "true",
      "notification_preferences": "true",
      "notification_reply_body_visible": "true",
      "prompt_notification_permissions_after_friending": "true",
      "activity_bar_enabled": "true",
      "journal_activity_bar_enabled": "true",
      "custom_profile_pics": "true",
      "profile_menu_v2_enabled": "true",
      "cdn_domain_replacements_video": "true",
      "storage_bucket": "gs://locket-img",
      "storage_bucket_video": "gs://locket-video",
      "camera_filter_storage_bucket": "gs://locket-filters",
      "image_cache_max_age_sec": "157680000",
      "image_cache_max_size": "400000000",
      "history_cache_age_days": "1000",
      "user_cache_max_age_sec": "691200",
      "friends_cache_max_age_sec": "2592000",
      "image_fetch_cache": "true",
      "image_cache_use_shared": "true",
      "use_doc_dir_for_image_cache": "true",
      "efficient_history_cache_invalidation": "true",
      "timestamp_based_history_fetches": "true",
      "get_latest_moment_v2": "true",
      "fetch_users_from_cloud_function": "true",
      "refresh_interval": "60",
      "firestore_refresh_v2": "true",
      "firestore_refresh_v3": "true",
      "keychain_access_retries": "true",
      "blocked_users_cached_sync_enabled": "true",
      "beta_features_enabled": "true",
      "join_testflight_enabled": "true",
      "safety_center": "true",
      "help_center": "true",
      "support_v2": "true",
      "privacy_choices_setting": "true",
      "request_att_permission": "true",
      "invite_link_preview_variant": "4",
      "share_history_prompt_enabled": "false",
      "use_thumbnails_for_sharing": "true",
      "use_thumbnails_in_timeline": "true",
      "upload_use_webp_thumbnails": "true",
      "persist_onboarding_step": "true",
      "onboarding_contact_permission_step": "true",
      "overlay_navigator_enabled": "true",
      "captions_enabled": "true",
      "music_caption_enabled": "true",
      "music_caption_song_preview_enabled": "true",
      "link_caption_link_enabled": "true"
    });

    const jsonConfigs = {
      "feature_gates": {
        "app_icon_picker": "enabled",
        "camera_roll": "enabled",
        "camera_theme": "enabled",
        "locket_views": "enabled",
        "long_captions": "enabled",
        "longer_video": "enabled",
        "unlimited_friends": "enabled",
        "priority_support": "enabled",
        "profile_badge": "enabled",
        "remove_ads": "enabled",
        "video": "enabled",
        "custom_widget_frames": "enabled",
        "camera_filter_sheet": "enabled",
        "streak_recovery": "enabled",
        "streak_reminders": "enabled",
        "audio": "enabled",
        "audio_playback": "enabled",
        "video_audio": "enabled",
        "camera_timer": "enabled",
        "self_timer": "enabled",
        "timer": "enabled",
        "camera_themes": "enabled",
        "ai_generation": "enabled",
        "locket_ai_generation": "enabled",
        "holiday_filters": "enabled",
        "widget_frames": "enabled"
      },
      "upsell_features": {
        "app_icon_picker": false,
        "camera_roll": false,
        "camera_theme": false,
        "locket_views": false,
        "remove_ads": false,
        "custom_widget_frames": false
      },
      "paywall_presentation_config": {
        "uid": "paywall_testflight",
        "onboarding": false,
        "after_sent_moment": false,
        "on_foreground": false,
        "interval": 2592000,
        "profile_banner": false
      },
      "feature_discovery_popup_config": {
        "tag": "LOCKET GOLD!",
        "tag_gradient": true,
        "tag_style": "gold_gradient",
        "title": "Lên Locket Gold rùi <3",
        "feature_set": [
          {
            "title": "Author: hnyb05",
            "body": "https://hnyb05.vercel.app",
            "imageURL": "https://cdn.upanhlaylink.com/i/GSfYXmKd.png"
          }
        ],
        "primary_button_title": "Xong!",
        "campaign": "locket_gold_welcome_v3",
        "start_at": "2020-01-01T00:00:00",
        "end_at": "2099-12-31T23:59:59",
        "use_local_time_zone": true
      },
      "history_ads_nimbus_interceptors": [],
      "history_ads_nimbus_formats": [],
      "nimbus_errors_logged_override": {
        "NimbusFetchError": 0,
        "NimbusRateLimitError": 0
      },
      "camera": {
        "gold_max_duration": 60,
        "max_duration": 60,
        "ultra_wide": true,
        "volume_button": true,
        "flash_button": true,
        "telephoto": true,
        "srgb": true,
        "lanczos": true,
        "timer": true,
        "timer_button": true,
        "self_timer": true,
        "countdown": true,
        "countdown_timer": true,
        "quality_mbps": 0.6
      },
      "camera_roll": {
        "gold_max_duration": 30,
        "video_max_duration": 30,
        "max_duration": 30,
        "trim_max_duration": 30,
        "camera_roll_max_duration": 30,
        "quality_mbps": 0.6,
        "flash_button": true
      },
      "live_photos": {
        "capture": true,
        "video": true,
        "viewing": true,
        "catch_up": true,
        "widget_playback": true,
        "widget_looping_mode": "unseen"
      },
      "camera_filter_config": {
        "allows_custom_filters": true,
        "show_filter_button": true,
        "sheet_enabled": true,
        "open_sheet_immediately": true,
        "sheet_filters": [
          {
            "id": "group_dazz_cam",
            "title": {
              "en": "Dazz Cam 🎞️"
            },
            "filter_ids": [
              "dazz_cpm35",
              "dazz_classic_u",
              "dazz_d_half",
              "dazz_inst_c",
              "dazz_135_ne"
            ]
          },
          {
            "id": "group_camera_filters",
            "title": {
              "en": "Camera Filter 🎞️"
            },
            "filter_ids": [
              "photo_effect_co_dien",
              "photo_effect_dem_xanh",
              "photo_effect_film",
              "photo_effect_matte",
              "photo_effect_nhat",
              "photo_effect_pastel",
              "photo_effect_teal_va_cam",
              "photo_effect_trang_den",
              "photo_effect_tuong_phan",
              "photo_effect_am_ap",
              "photo_effect_mat_lanh",
              "photo_effect_am_mat_ong",
              "photo_effect_blue_hour",
              "photo_effect_film_nau",
              "photo_effect_hong_milk",
              "photo_effect_lo_sang_film",
              "photo_effect_matcha",
              "photo_effect_tim_y2k",
              "photo_effect_xanh_film"
            ]
          },
          {
            "id": "group_photobooth",
            "title": {
              "en": "PhotoBooth 4 ảnh 📸"
            },
            "filter_ids": [
              "pb_khung4_scrapbook_do",
              "pb_khung4_inspire_arena",
              "pb_khung4_my_vault",
              "pb_khung4_cham_bi",
              "pb_khung4_cham_bi_den",
              "pb_khung4_likeble",
              "pb_khung4_razzle",
              "pb_khung4_your_title",
              "pb_khung4_soulmate_film",
              "pb_khung4_mimi",
              "pb_khung4_fairy_film",
              "pb_khung4_foto_lush",
              "pb_khung4_photoism",
              "pb_khung4_twinkle_booth",
              "pb_khung4_equinox",
              "pb_khung4_i_love_you",
              "pb_khung4_film",
              "pb_khung4_dream_cream",
              "frame_berry_days",
              "pb_khung4_scrapbook",
              "pb_khung4_so_cool",
              "frame_happy_snap",
              "frame_sky_diary",
              "photobooth_4cut",
              "pb_holo_4cut",
              "pb_scrapbook_ripped_4cut",
              "pb_ripped_paper_4cut",
              "pb_denim_ripped_2x2",
              "pb_khung2_khi_tinh_iu_den"
            ]
          },
          {
            "id": "group_photobooth_2",
            "title": {
              "en": "Hai Đứa Một Khung 💞"
            },
            "filter_ids": [
              "pb_khung2_soulmate",
              "pb_khung2_love_postcard",
              "pb_khung2_camera_pic",
              "pb_khung2_anhdep",
              "pb_khung2_anhco",
              "pb_khung2_di_choi_thoi",
              "pb_khung2_thelove",
              "pb_khung2_outfit",
              "pb_khung2_thu_tinh",
              "pb_khung2_len_do",
              "pb_khung2_tin_nong",
              "pb_khung2_thang_ngay_ben_nhau",
              "pb_khung2_may_anh",
              "pb_khung2_ki_niem",
              "pb_khung2_khi_e_vang",
              "pb_khung2_dieu_em_uoc_ao"
            ]
          },
          {
            "id": "group_photobooth_3",
            "title": {
              "en": "Bộ Ba Bá Đạo 🤟"
            },
            "filter_ids": [
              "pb_khung3_photo_iphone",
              "pb_khung3_polaroid2",
              "pb_khung3_da_bao",
              "pb_khung3_mothaiba",
              "pb_khung3_ngay_mai_tuoi_sang",
              "pb_khung3_memory",
              "pb_khung3_Vinyl",
              "pb_khung3_Polaroid",
              "pb_khung3_photodump",
              "pb_khung3_love_so_much",
              "pb_khung3_hoi_ban_than",
              "pb_khung3_hen_nha"
            ]
          },
          {
            "id": "group_single_frame",
            "title": {
              "en": "Khung Viền Hot Trend 🖼️"
            },
            "filter_ids": [
              "pb_khung1_locket_camera",
              "pb_khung1_spotifyPC",
              "pb_khung1_spotify_hong",
              "pb_khung1_camfuji",
              "pb_khung1_menu_ios",
              "pb_khung1_iphone",
              "pb_khung1_tivi",
              "pb_khung1_the_gioi_cua_2_ta",
              "pb_khung1_Camera_iPhone",
              "pb_khung1_khong_buong",
              "pb_khung1_selflove",
              "pb_khung1_thu_tinh",
              "pb_khung1_ptb",
              "pb_khung1_oi_tinh_yeu",
              "pb_khung1_card",
              "pb_khung1_love_e_nhiu",
              "pb_khung1_ki_niem_tuoi_dep",
              "pb_khung1_ins",
              "pb_khung1_hoi_chieu_troi_mua",
              "pb_khung1_dia",
              "pb_khung1_chuong_cuoi",
              "pb_khung1_maytinh",
              "pb_khung1_mat_tin_hieu"
            ]
          },
          {
            "id": "group_trend",
            "title": {
              "en": "Trend Hot 🔥"
            },
            "filter_ids": [
              "weekday_depth",
              "pb_khung1_chua_som",
              "trend_bang_tin_khan",
              "trend_ve_giu_xe",
              "trend_vo_hoc_sinh",
              "trend_giao_vien_cham_bai",
              "trend_nhiem_vu_hom_nay_la",
              "trend_hoa_don_di_choi",
              "trend_binh_luan_duoc_ghim",
              "trend_camera_an_ninh",
              "trend_thong_bao_ngan_hang",
              "trend_chat_nhom_leak"
            ]
          },
          {
            "id": "group_trend_comment_tiktok",
            "title": {
              "en": "Cư Dân Mạng Nói Gì 💬"
            },
            "filter_ids": [
              "cmt_siuu",
              "cmt_sontung",
              "cmt_locket",
              "sticker_binh_luan_minh_tue",
              "cmt_xinh",
              "cmt_posst",
              "cmt_flash",
              "cmt_duanma",
              "cmt_dichup",
              "cmt_chuano",
              "cmt_anhdim"
            ]
          },
          {
            "id": "group_goofy",
            "title": {
              "en": "Rạp Xiếc Trung Ương 🤪"
            },
            "filter_ids": [
              "pb_khung3_fruit",
              "pb_khung1_mona_lisa",
              "pb_khung2_monkey",
              "pb_khung1_messi",
              "pb_khung1_ronaldo_cup",
              "pb_khung2_cuoi_vespa",
              "pb_khung1_anh_tho",
              "pb_khung1_the_hinh",
              "pb_khung1_matmoc"
            ]
          },
          {
            "id": "group_frames",
            "title": {
              "en": "Khung Xinh Hết Cứu 🎀"
            },
            "filter_ids": [
              "pb_khung1_cute",
              "pb_khung1_luffy",
              "frame_classic_pb",
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
              "photobooth_cute"
            ]
          },
          {
            "id": "group_hot_ai_3d",
            "title": {
              "en": "AI 3D Hot 🔥"
            },
            "filter_ids": [
              "fireworks",
              "harry_potter",
              "minecraft",
              "fire_flame",
              "giant_spider",
              "ocean_underwater",
              "ufo_alien",
              "sweat_hearts",
              "volcano_lava",
              "rain_storm",
              "fortnite_llama",
              "watercolor_art",
              "golden_hour"
            ]
          },
          {
            "id": "group_mischief",
            "title": {
              "en": "Hài hước"
            },
            "filter_ids": [
              "okay_wig",
              "influencer",
              "looks_maxxing",
              "toothless",
              "bye_brows",
              "spooky_ghost",
              "cute_zombie"
            ]
          },
          {
            "id": "group_appearance",
            "title": {
              "en": "Ngoại hình"
            },
            "filter_ids": [
              "bowling_ball",
              "blonde_bleached",
              "beard",
              "bob_cut",
              "buns",
              "tatted",
              "mohawk",
              "braces",
              "bye_brows",
              "rose_flower",
              "jungle_leaf"
            ]
          },
          {
            "id": "group_event",
            "title": {
              "en": "Sự kiện"
            },
            "filter_ids": [
              "locket",
              "slimed",
              "princess",
              "disco_lights",
              "cash_money",
              "happy_birthday"
            ]
          },
          {
            "id": "group_cute",
            "title": {
              "en": "Dễ thương"
            },
            "filter_ids": [
              "cutesy",
              "sticker_face",
              "flower_crown",
              "love_bug"
            ]
          },
          {
            "id": "group_costume",
            "title": {
              "en": "Trang phục"
            },
            "filter_ids": [
              "wedding",
              "cowboy_cowgirl",
              "giraffe",
              "clown",
              "shrek_ogre",
              "superhero_cape",
              "pirate_hat"
            ]
          },
          {
            "id": "group_holiday",
            "title": {
              "en": "Ngày lễ"
            },
            "filter_ids": [
              "easter_bunney_cutout",
              "easter_chick_cutout",
              "bearded",
              "leprechaun",
              "lucky_face",
              "sweat_hearts",
              "elf_cutout",
              "santa_cutout",
              "frosty"
            ]
          }
        ],
        "filter_groups": [
          {
            "id": "group_dazz_cam",
            "title": {
              "en": "Dazz Cam 🎞️"
            },
            "filter_ids": [
              "dazz_cpm35",
              "dazz_classic_u",
              "dazz_d_half",
              "dazz_inst_c",
              "dazz_135_ne"
            ]
          },
          {
            "id": "group_camera_filters",
            "title": {
              "en": "Camera Filter 🎞️"
            },
            "filter_ids": [
              "photo_effect_co_dien",
              "photo_effect_dem_xanh",
              "photo_effect_film",
              "photo_effect_matte",
              "photo_effect_nhat",
              "photo_effect_pastel",
              "photo_effect_teal_va_cam",
              "photo_effect_trang_den",
              "photo_effect_tuong_phan",
              "photo_effect_am_ap",
              "photo_effect_mat_lanh",
              "photo_effect_am_mat_ong",
              "photo_effect_blue_hour",
              "photo_effect_film_nau",
              "photo_effect_hong_milk",
              "photo_effect_lo_sang_film",
              "photo_effect_matcha",
              "photo_effect_tim_y2k",
              "photo_effect_xanh_film"
            ]
          },
          {
            "id": "group_photobooth",
            "title": {
              "en": "PhotoBooth 4 ảnh 📸"
            },
            "filter_ids": [
              "pb_khung4_scrapbook_do",
              "pb_khung4_inspire_arena",
              "pb_khung4_my_vault",
              "pb_khung4_cham_bi",
              "pb_khung4_cham_bi_den",
              "pb_khung4_likeble",
              "pb_khung4_razzle",
              "pb_khung4_your_title",
              "pb_khung4_soulmate_film",
              "pb_khung4_mimi",
              "pb_khung4_fairy_film",
              "pb_khung4_foto_lush",
              "pb_khung4_photoism",
              "pb_khung4_twinkle_booth",
              "pb_khung4_equinox",
              "pb_khung4_i_love_you",
              "pb_khung4_film",
              "pb_khung4_dream_cream",
              "frame_berry_days",
              "pb_khung4_scrapbook",
              "pb_khung4_so_cool",
              "frame_happy_snap",
              "frame_sky_diary",
              "photobooth_4cut",
              "pb_holo_4cut",
              "pb_scrapbook_ripped_4cut",
              "pb_ripped_paper_4cut",
              "pb_denim_ripped_2x2",
              "pb_khung2_khi_tinh_iu_den"
            ]
          },
          {
            "id": "group_photobooth_2",
            "title": {
              "en": "Hai Đứa Một Khung 💞"
            },
            "filter_ids": [
              "pb_khung2_soulmate",
              "pb_khung2_love_postcard",
              "pb_khung2_camera_pic",
              "pb_khung2_anhdep",
              "pb_khung2_anhco",
              "pb_khung2_di_choi_thoi",
              "pb_khung2_thelove",
              "pb_khung2_outfit",
              "pb_khung2_thu_tinh",
              "pb_khung2_len_do",
              "pb_khung2_tin_nong",
              "pb_khung2_thang_ngay_ben_nhau",
              "pb_khung2_may_anh",
              "pb_khung2_ki_niem",
              "pb_khung2_khi_e_vang",
              "pb_khung2_dieu_em_uoc_ao"
            ]
          },
          {
            "id": "group_photobooth_3",
            "title": {
              "en": "Bộ Ba Bá Đạo 🤟"
            },
            "filter_ids": [
              "pb_khung3_photo_iphone",
              "pb_khung3_polaroid2",
              "pb_khung3_da_bao",
              "pb_khung3_mothaiba",
              "pb_khung3_ngay_mai_tuoi_sang",
              "pb_khung3_memory",
              "pb_khung3_Vinyl",
              "pb_khung3_Polaroid",
              "pb_khung3_photodump",
              "pb_khung3_love_so_much",
              "pb_khung3_hoi_ban_than",
              "pb_khung3_hen_nha"
            ]
          },
          {
            "id": "group_single_frame",
            "title": {
              "en": "Khung Viền Hot Trend 🖼️"
            },
            "filter_ids": [
              "pb_khung1_locket_camera",
              "pb_khung1_spotifyPC",
              "pb_khung1_spotify_hong",
              "pb_khung1_camfuji",
              "pb_khung1_menu_ios",
              "pb_khung1_iphone",
              "pb_khung1_tivi",
              "pb_khung1_the_gioi_cua_2_ta",
              "pb_khung1_Camera_iPhone",
              "pb_khung1_khong_buong",
              "pb_khung1_selflove",
              "pb_khung1_thu_tinh",
              "pb_khung1_ptb",
              "pb_khung1_oi_tinh_yeu",
              "pb_khung1_card",
              "pb_khung1_love_e_nhiu",
              "pb_khung1_ki_niem_tuoi_dep",
              "pb_khung1_ins",
              "pb_khung1_hoi_chieu_troi_mua",
              "pb_khung1_dia",
              "pb_khung1_chuong_cuoi",
              "pb_khung1_maytinh",
              "pb_khung1_mat_tin_hieu"
            ]
          },
          {
            "id": "group_trend",
            "title": {
              "en": "Trend Hot 🔥"
            },
            "filter_ids": [
              "weekday_depth",
              "pb_khung1_chua_som",
              "trend_bang_tin_khan",
              "trend_ve_giu_xe",
              "trend_vo_hoc_sinh",
              "trend_giao_vien_cham_bai",
              "trend_nhiem_vu_hom_nay_la",
              "trend_hoa_don_di_choi",
              "trend_binh_luan_duoc_ghim",
              "trend_camera_an_ninh",
              "trend_thong_bao_ngan_hang",
              "trend_chat_nhom_leak"
            ]
          },
          {
            "id": "group_trend_comment_tiktok",
            "title": {
              "en": "Cư Dân Mạng Nói Gì 💬"
            },
            "filter_ids": [
              "cmt_siuu",
              "cmt_sontung",
              "cmt_locket",
              "sticker_binh_luan_minh_tue",
              "cmt_xinh",
              "cmt_posst",
              "cmt_flash",
              "cmt_duanma",
              "cmt_dichup",
              "cmt_chuano",
              "cmt_anhdim"
            ]
          },
          {
            "id": "group_goofy",
            "title": {
              "en": "Rạp Xiếc Trung Ương 🤪"
            },
            "filter_ids": [
              "pb_khung3_fruit",
              "pb_khung1_mona_lisa",
              "pb_khung2_monkey",
              "pb_khung1_messi",
              "pb_khung1_ronaldo_cup",
              "pb_khung2_cuoi_vespa",
              "pb_khung1_anh_tho",
              "pb_khung1_the_hinh",
              "pb_khung1_matmoc"
            ]
          },
          {
            "id": "group_frames",
            "title": {
              "en": "Khung Xinh Hết Cứu 🎀"
            },
            "filter_ids": [
              "pb_khung1_cute",
              "pb_khung1_luffy",
              "frame_classic_pb",
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
              "photobooth_cute"
            ]
          },
          {
            "id": "group_hot_ai_3d",
            "title": {
              "en": "AI 3D Hot 🔥"
            },
            "filter_ids": [
              "fireworks",
              "harry_potter",
              "minecraft",
              "fire_flame",
              "giant_spider",
              "ocean_underwater",
              "ufo_alien",
              "sweat_hearts",
              "volcano_lava",
              "rain_storm",
              "fortnite_llama",
              "watercolor_art",
              "golden_hour"
            ]
          },
          {
            "id": "group_mischief",
            "title": {
              "en": "Hài hước"
            },
            "filter_ids": [
              "okay_wig",
              "influencer",
              "looks_maxxing",
              "toothless",
              "bye_brows",
              "spooky_ghost",
              "cute_zombie"
            ]
          },
          {
            "id": "group_appearance",
            "title": {
              "en": "Ngoại hình"
            },
            "filter_ids": [
              "bowling_ball",
              "blonde_bleached",
              "beard",
              "bob_cut",
              "buns",
              "tatted",
              "mohawk",
              "braces",
              "bye_brows",
              "rose_flower",
              "jungle_leaf"
            ]
          },
          {
            "id": "group_event",
            "title": {
              "en": "Sự kiện"
            },
            "filter_ids": [
              "locket",
              "slimed",
              "princess",
              "disco_lights",
              "cash_money",
              "happy_birthday"
            ]
          },
          {
            "id": "group_cute",
            "title": {
              "en": "Dễ thương"
            },
            "filter_ids": [
              "cutesy",
              "sticker_face",
              "flower_crown",
              "love_bug"
            ]
          },
          {
            "id": "group_costume",
            "title": {
              "en": "Trang phục"
            },
            "filter_ids": [
              "wedding",
              "cowboy_cowgirl",
              "giraffe",
              "clown",
              "shrek_ogre",
              "superhero_cape",
              "pirate_hat"
            ]
          },
          {
            "id": "group_holiday",
            "title": {
              "en": "Ngày lễ"
            },
            "filter_ids": [
              "easter_bunney_cutout",
              "easter_chick_cutout",
              "bearded",
              "leprechaun",
              "lucky_face",
              "sweat_hearts",
              "elf_cutout",
              "santa_cutout",
              "frosty"
            ]
          }
        ],
        "picker_filters": [
          "dazz_cpm35",
          "dazz_classic_u",
          "dazz_d_half",
          "dazz_inst_c",
          "dazz_135_ne",
          "photo_effect_co_dien",
          "photo_effect_dem_xanh",
          "photo_effect_film",
          "photo_effect_matte",
          "photo_effect_nhat",
          "photo_effect_pastel",
          "photo_effect_teal_va_cam",
          "photo_effect_trang_den",
          "photo_effect_tuong_phan",
          "photo_effect_am_ap",
          "photo_effect_mat_lanh",
          "photo_effect_am_mat_ong",
          "photo_effect_blue_hour",
          "photo_effect_film_nau",
          "photo_effect_hong_milk",
          "photo_effect_lo_sang_film",
          "photo_effect_matcha",
          "photo_effect_tim_y2k",
          "photo_effect_xanh_film",
          "pb_khung4_scrapbook_do",
          "pb_khung4_inspire_arena",
          "pb_khung4_my_vault",
          "pb_khung4_cham_bi",
          "pb_khung4_cham_bi_den",
          "pb_khung4_likeble",
          "pb_khung4_razzle",
          "pb_khung4_your_title",
          "pb_khung4_soulmate_film",
          "pb_khung4_mimi",
          "pb_khung4_fairy_film",
          "pb_khung4_foto_lush",
          "pb_khung4_photoism",
          "pb_khung4_twinkle_booth",
          "pb_khung4_equinox",
          "pb_khung4_i_love_you",
          "pb_khung4_film",
          "pb_khung4_dream_cream",
          "frame_berry_days",
          "pb_khung4_scrapbook",
          "pb_khung4_so_cool",
          "frame_happy_snap",
          "frame_sky_diary",
          "photobooth_4cut",
          "pb_holo_4cut",
          "pb_scrapbook_ripped_4cut",
          "pb_ripped_paper_4cut",
          "pb_denim_ripped_2x2",
          "pb_khung2_khi_tinh_iu_den",
          "pb_khung2_soulmate",
          "pb_khung2_love_postcard",
          "pb_khung2_camera_pic",
          "pb_khung2_anhdep",
          "pb_khung2_anhco",
          "pb_khung2_di_choi_thoi",
          "pb_khung2_thelove",
          "pb_khung2_outfit",
          "pb_khung2_thu_tinh",
          "pb_khung2_len_do",
          "pb_khung2_tin_nong",
          "pb_khung2_thang_ngay_ben_nhau",
          "pb_khung2_may_anh",
          "pb_khung2_ki_niem",
          "pb_khung2_khi_e_vang",
          "pb_khung2_dieu_em_uoc_ao",
          "pb_khung3_photo_iphone",
          "pb_khung3_polaroid2",
          "pb_khung3_da_bao",
          "pb_khung3_mothaiba",
          "pb_khung3_ngay_mai_tuoi_sang",
          "pb_khung3_memory",
          "pb_khung3_Vinyl",
          "pb_khung3_Polaroid",
          "pb_khung3_photodump",
          "pb_khung3_love_so_much",
          "pb_khung3_hoi_ban_than",
          "pb_khung3_hen_nha",
          "pb_khung1_locket_camera",
          "pb_khung1_spotifyPC",
          "pb_khung1_spotify_hong",
          "pb_khung1_camfuji",
          "pb_khung1_menu_ios",
          "pb_khung1_iphone",
          "pb_khung1_tivi",
          "pb_khung1_the_gioi_cua_2_ta",
          "pb_khung1_Camera_iPhone",
          "pb_khung1_khong_buong",
          "pb_khung1_selflove",
          "pb_khung1_thu_tinh",
          "pb_khung1_ptb",
          "pb_khung1_oi_tinh_yeu",
          "pb_khung1_card",
          "pb_khung1_love_e_nhiu",
          "pb_khung1_ki_niem_tuoi_dep",
          "pb_khung1_ins",
          "pb_khung1_hoi_chieu_troi_mua",
          "pb_khung1_dia",
          "pb_khung1_chuong_cuoi",
          "pb_khung1_maytinh",
          "pb_khung1_mat_tin_hieu",
          "weekday_depth",
          "pb_khung1_chua_som",
          "trend_bang_tin_khan",
          "trend_ve_giu_xe",
          "trend_vo_hoc_sinh",
          "trend_giao_vien_cham_bai",
          "trend_nhiem_vu_hom_nay_la",
          "trend_hoa_don_di_choi",
          "trend_binh_luan_duoc_ghim",
          "trend_camera_an_ninh",
          "trend_thong_bao_ngan_hang",
          "trend_chat_nhom_leak",
          "cmt_siuu",
          "cmt_sontung",
          "cmt_locket",
          "sticker_binh_luan_minh_tue",
          "cmt_xinh",
          "cmt_posst",
          "cmt_flash",
          "cmt_duanma",
          "cmt_dichup",
          "cmt_chuano",
          "cmt_anhdim",
          "pb_khung3_fruit",
          "pb_khung1_mona_lisa",
          "pb_khung2_monkey",
          "pb_khung1_messi",
          "pb_khung1_ronaldo_cup",
          "pb_khung2_cuoi_vespa",
          "pb_khung1_anh_tho",
          "pb_khung1_the_hinh",
          "pb_khung1_matmoc",
          "pb_khung1_cute",
          "pb_khung1_luffy",
          "frame_classic_pb",
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
          "photobooth_cute",
          "fireworks",
          "harry_potter",
          "minecraft",
          "fire_flame",
          "giant_spider",
          "ocean_underwater",
          "ufo_alien",
          "sweat_hearts",
          "volcano_lava",
          "rain_storm",
          "fortnite_llama",
          "watercolor_art",
          "golden_hour",
          "okay_wig",
          "influencer",
          "looks_maxxing",
          "toothless",
          "bye_brows",
          "spooky_ghost",
          "cute_zombie",
          "bowling_ball",
          "blonde_bleached",
          "beard",
          "bob_cut",
          "buns",
          "tatted",
          "mohawk",
          "braces",
          "rose_flower",
          "jungle_leaf",
          "locket",
          "slimed",
          "princess",
          "disco_lights",
          "cash_money",
          "happy_birthday",
          "cutesy",
          "sticker_face",
          "flower_crown",
          "love_bug",
          "wedding",
          "cowboy_cowgirl",
          "giraffe",
          "clown",
          "shrek_ogre",
          "superhero_cape",
          "pirate_hat",
          "easter_bunney_cutout",
          "easter_chick_cutout",
          "bearded",
          "leprechaun",
          "lucky_face",
          "elf_cutout",
          "santa_cutout",
          "frosty"
        ],
        "remote_filters": [
          {
            "uid": "dazz_cpm35",
            "id": "dazz_cpm35",
            "name": "CPM35",
            "category": "Dazz Cam",
            "prompt": "dazz_cpm35",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_cpm35.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_cpm35.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_cpm35.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/dazz_cpm35.png",
            "tintColor": "#FF8C3B",
            "colors": [
              "#FF8C3B",
              "#B83B1D"
            ],
            "captureButtonColors": [
              "#FF8C3B",
              "#B83B1D"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/dazz_cpm35.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_cpm35.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/dazz_cpm35.png",
              "sfSymbol": "camera.aperture",
              "symbol": "camera.aperture",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "dazz_classic_u",
            "id": "dazz_classic_u",
            "name": "Classic U",
            "category": "Dazz Cam",
            "prompt": "dazz_classic_u",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_classic_u.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_classic_u.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_classic_u.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/dazz_classic_u.png",
            "tintColor": "#2BB3A3",
            "colors": [
              "#2BB3A3",
              "#124E5B"
            ],
            "captureButtonColors": [
              "#2BB3A3",
              "#124E5B"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/dazz_classic_u.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_classic_u.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/dazz_classic_u.png",
              "sfSymbol": "camera.aperture",
              "symbol": "camera.aperture",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "dazz_d_half",
            "id": "dazz_d_half",
            "name": "D Half",
            "category": "Dazz Cam",
            "prompt": "dazz_d_half",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_d_half.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_d_half.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_d_half.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/dazz_d_half.png",
            "tintColor": "#F6AD55",
            "colors": [
              "#F6AD55",
              "#9C4221"
            ],
            "captureButtonColors": [
              "#F6AD55",
              "#9C4221"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/dazz_d_half.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_d_half.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/dazz_d_half.png",
              "sfSymbol": "rectangle.split.2x1.fill",
              "symbol": "rectangle.split.2x1.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "dazz_inst_c",
            "id": "dazz_inst_c",
            "name": "Inst C",
            "category": "Dazz Cam",
            "prompt": "dazz_inst_c",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_inst_c.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_inst_c.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_inst_c.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/dazz_inst_c.png",
            "tintColor": "#E6DAC8",
            "colors": [
              "#E6DAC8",
              "#E0631F"
            ],
            "captureButtonColors": [
              "#E6DAC8",
              "#E0631F"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/dazz_inst_c.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_inst_c.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/dazz_inst_c.png",
              "sfSymbol": "photo.on.rectangle.angled",
              "symbol": "photo.on.rectangle.angled",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "dazz_135_ne",
            "id": "dazz_135_ne",
            "name": "135 NE",
            "category": "Dazz Cam",
            "prompt": "dazz_135_ne",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_135_ne.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_135_ne.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_135_ne.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/dazz_135_ne.png",
            "tintColor": "#E53E3E",
            "colors": [
              "#E53E3E",
              "#5B1228"
            ],
            "captureButtonColors": [
              "#E53E3E",
              "#5B1228"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/dazz_135_ne.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/dazz_135_ne.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/dazz_135_ne.png",
              "sfSymbol": "film.fill",
              "symbol": "film.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "rose_flower",
            "id": "rose_flower",
            "name": "Ngậm Hoa Hồng",
            "prompt": "Show the person in the photo with the exact same pose and background, but have them with a single rose in their mouth. If no person is present in the input, do not add anything to the output.",
            "productUrl": null,
            "colors": [
              "#E11D48",
              "#FB7185"
            ],
            "captureButtonColors": [
              "#E11D48",
              "#FB7185"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/BK4BNlDb.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/BK4BNlDb.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/BK4BNlDb.png",
              "sfSymbol": "camera.macro",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": true,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/BK4BNlDb.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/BK4BNlDb.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/BK4BNlDb.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/BK4BNlDb.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "normal"
          },
          {
            "uid": "shrek_ogre",
            "id": "shrek_ogre",
            "name": "Tai Ogre Shrek",
            "prompt": "Show the person in the photo with the exact same pose and background, but transform them into Shrek with rounded ears, and rustic clothing while preserving the pose. Keep their hairstyle, but make it look natural in the Shrek style.",
            "productUrl": null,
            "colors": [
              "#84CC16",
              "#65A30D"
            ],
            "captureButtonColors": [
              "#84CC16",
              "#65A30D"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/A7XjgjXm.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/A7XjgjXm.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/A7XjgjXm.png",
              "sfSymbol": "ear",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": true,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/A7XjgjXm.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/A7XjgjXm.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/A7XjgjXm.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/A7XjgjXm.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "normal"
          },
          {
            "uid": "superhero_cape",
            "id": "superhero_cape",
            "name": "Siêu Anh Hùng",
            "prompt": "Show the person in the photo with the exact same pose and background, but suit them up like a superhero in a blue and red outfit with a flowing cape while keeping their pose and framing identical.",
            "productUrl": null,
            "colors": [
              "#DC2626",
              "#FBBF24"
            ],
            "captureButtonColors": [
              "#DC2626",
              "#FBBF24"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/RAOMbtpc.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/RAOMbtpc.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/RAOMbtpc.png",
              "sfSymbol": "shield.fill",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": true,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/RAOMbtpc.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/RAOMbtpc.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/RAOMbtpc.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/RAOMbtpc.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "normal"
          },
          {
            "uid": "spooky_ghost",
            "id": "spooky_ghost",
            "name": "Bóng Ma Nhỏ",
            "prompt": "Show the person in the photo with the exact same pose, expression, and background, but subtly insert a realistic-looking ghost somewhere in the background. If no person is present, do not add any people to the output.",
            "productUrl": null,
            "colors": [
              "#38BDF8",
              "#818CF8"
            ],
            "captureButtonColors": [
              "#38BDF8",
              "#818CF8"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/v6H7SoQw.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/v6H7SoQw.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/v6H7SoQw.png",
              "sfSymbol": "moon.stars.fill",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": true,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/v6H7SoQw.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/v6H7SoQw.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/v6H7SoQw.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/v6H7SoQw.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "normal"
          },
          {
            "uid": "pirate_hat",
            "id": "pirate_hat",
            "name": "Mũ Cướp Biển",
            "prompt": "Show the person in the photo with the exact same pose and background, but dress them like a pirate from Pirates of the Caribbean while keeping their pose and facial expression identical.",
            "productUrl": null,
            "colors": [
              "#0F172A",
              "#E2E8F0"
            ],
            "captureButtonColors": [
              "#0F172A",
              "#E2E8F0"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/DgoIoU3M.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/DgoIoU3M.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/DgoIoU3M.png",
              "sfSymbol": "flag.fill",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": true,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/DgoIoU3M.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/DgoIoU3M.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/DgoIoU3M.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/DgoIoU3M.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "normal"
          },
          {
            "uid": "volcano_lava",
            "id": "volcano_lava",
            "name": "Núi Lửa Dung Nham",
            "prompt": "Show the person in the photo with the exact same pose, background, and facial expression, but replace the ground with molten lava, glowing magma cracks, and volcanic sparks while keeping them rooted to the spot. If no face is present, do not show any people in the output, only ever show people who were in the original input image.",
            "productUrl": null,
            "colors": [
              "#EA580C",
              "#EF4444"
            ],
            "captureButtonColors": [
              "#EA580C",
              "#EF4444"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/q4nXD6Jo.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/q4nXD6Jo.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/q4nXD6Jo.png",
              "sfSymbol": "flame.fill",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": true,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/q4nXD6Jo.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/q4nXD6Jo.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/q4nXD6Jo.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/q4nXD6Jo.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "normal"
          },
          {
            "uid": "rain_storm",
            "id": "rain_storm",
            "name": "Mưa Bão Sấm Sét",
            "prompt": "Retain the exact pose, facial features, distance, and background from the original image. Dress the subject as a character from the Wuthering Heights movie.\n\nFor Men: Dress them in the Jacob Elordi style with matching hair and outfit.\n\nFor Women: Dress them in the Margot Robbie style: A dramatic, historical-inspired red gown with a high-gloss, lacquered red skirt that is extremely voluminous and structured, forming a full bell shape from the waist down if that part is visible in the initial image. The skirt looks stiff and reflective, almost like polished vinyl. The bodice is corset-style, fitted tightly to the torso in the same glossy red material, with thin shoulder straps, a wide scoop rounded neckline, and the dress cinching the waist and creating a structured, corset-inspired silhouette WITHOUT visible boning, lacing or busks, and featuring a sheer billowing white long puffed sleeve shirt worn underneath with a scooped neckline for the white undershirt peeking out from behind the dress.\n\nConstraints: Do not modify the person's physical features, body shape, or positioning. Keep the framing and background 100% unchanged. If no person is present, return the image unaltered. Do not include Jacob Elordi or Margot Robbie themselves in the output image.",
            "productUrl": null,
            "colors": [
              "#3B82F6",
              "#6366F1"
            ],
            "captureButtonColors": [
              "#3B82F6",
              "#6366F1"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/kY7CANZp.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/kY7CANZp.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/kY7CANZp.png",
              "sfSymbol": "cloud.bolt.rain.fill",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": true,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/kY7CANZp.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/kY7CANZp.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/kY7CANZp.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/kY7CANZp.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "normal"
          },
          {
            "uid": "fortnite_llama",
            "id": "fortnite_llama",
            "name": "Llama Fortnite",
            "prompt": "Show the person in the photo with the exact same pose, expression, and background, but make the entire scene look like it was rendered inside a video game, similar to the style of Fortnite. Show no extra overlays or text on top of the photo. If no person is present, do not add any people to the output.",
            "productUrl": null,
            "colors": [
              "#A855F7",
              "#EC4899"
            ],
            "captureButtonColors": [
              "#A855F7",
              "#EC4899"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/Mw2lEyZa.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/Mw2lEyZa.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/Mw2lEyZa.png",
              "sfSymbol": "gamecontroller.fill",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": true,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/Mw2lEyZa.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/Mw2lEyZa.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/Mw2lEyZa.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/Mw2lEyZa.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "normal"
          },
          {
            "uid": "watercolor_art",
            "id": "watercolor_art",
            "name": "Tranh Màu Nước",
            "prompt": "Show the person in the photo with the exact same pose, expression, and background, but render the entire scene as a watercolor painting with flowing brush strokes. If no person is present, do not add any people to the output.",
            "productUrl": null,
            "colors": [
              "#06B6D4",
              "#F43F5E"
            ],
            "captureButtonColors": [
              "#06B6D4",
              "#F43F5E"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/YatSePfJ.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/YatSePfJ.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/YatSePfJ.png",
              "sfSymbol": "paintpalette.fill",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": true,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/YatSePfJ.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/YatSePfJ.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/YatSePfJ.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/YatSePfJ.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "normal"
          },
          {
            "uid": "golden_hour",
            "id": "golden_hour",
            "name": "Nắng Hoàng Hôn",
            "prompt": "Show the person in the photo with the exact same pose, expression, and background, but make the scene look like it was captured during peak golden hour with warm sunlight and long shadows. If no person is present, do not add any people to the output.",
            "productUrl": null,
            "colors": [
              "#F59E0B",
              "#F97316"
            ],
            "captureButtonColors": [
              "#F59E0B",
              "#F97316"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/Kl3WF7kN.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/Kl3WF7kN.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/Kl3WF7kN.png",
              "sfSymbol": "sun.max.fill",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": true,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/Kl3WF7kN.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/Kl3WF7kN.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/Kl3WF7kN.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/Kl3WF7kN.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "normal"
          },
          {
            "uid": "jungle_leaf",
            "id": "jungle_leaf",
            "name": "Rừng Nhiệt Đới",
            "prompt": "Show the person in the photo with the exact same pose, background, and facial expression, but with their background surroundings overgrown with plants in a seamless way. The person and their background should remain in the same positions. If no face is present, do not show any people in the output, only ever show people who were in the original input image.",
            "productUrl": null,
            "colors": [
              "#16A34A",
              "#15803D"
            ],
            "captureButtonColors": [
              "#16A34A",
              "#15803D"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/Ca6bMpOL.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/Ca6bMpOL.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/Ca6bMpOL.png",
              "sfSymbol": "leaf.fill",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": true,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/Ca6bMpOL.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/Ca6bMpOL.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/Ca6bMpOL.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/Ca6bMpOL.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "normal"
          },
          {
            "uid": "cute_zombie",
            "id": "cute_zombie",
            "name": "Zombie Chibi",
            "prompt": "Show the person in the photo with the exact same pose and background, but turn them into a zombie while keeping their pose and expression identical.",
            "productUrl": null,
            "colors": [
              "#10B981",
              "#8B5CF6"
            ],
            "captureButtonColors": [
              "#10B981",
              "#8B5CF6"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/aAvLUQ2t.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/aAvLUQ2t.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/aAvLUQ2t.png",
              "sfSymbol": "person.fill",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": true,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/aAvLUQ2t.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/aAvLUQ2t.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/aAvLUQ2t.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/aAvLUQ2t.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "normal"
          },
          {
            "uid": "fireworks",
            "id": "fireworks",
            "name": "Pháo Hoa Rực Rỡ",
            "prompt": "Show the person in the photo with the exact same pose and background, but fill the scene with fireworks exploding in the night sky and reflecting colorful light onto the subject. Ensure the person is in the exact same pose and positioning within the frame. If no face is present, do not show any people in the output, only ever show people who were in the original input image.",
            "productUrl": null,
            "colors": [
              "#EC4899",
              "#8B5CF6"
            ],
            "captureButtonColors": [
              "#EC4899",
              "#8B5CF6"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/WlnPm8fN.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/WlnPm8fN.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/WlnPm8fN.png",
              "sfSymbol": "sparkles",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": false,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/WlnPm8fN.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/WlnPm8fN.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/WlnPm8fN.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/WlnPm8fN.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "normal"
          },
          {
            "uid": "harry_potter",
            "id": "harry_potter",
            "name": "Phù Thủy Hogwarts",
            "prompt": "Show the person in the photo with the exact same pose and background, but show them as a character from Harry Potter wearing a robe of one of the four houes. Keep the pose and framing identical and do not change the background.",
            "productUrl": null,
            "colors": [
              "#740001",
              "#D3A625"
            ],
            "captureButtonColors": [
              "#740001",
              "#D3A625"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/Tu7Dt4le.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/Tu7Dt4le.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/Tu7Dt4le.png",
              "sfSymbol": "wand.and.stars",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": false,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/Tu7Dt4le.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/Tu7Dt4le.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/Tu7Dt4le.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/Tu7Dt4le.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "normal"
          },
          {
            "uid": "minecraft",
            "id": "minecraft",
            "name": "Minecraft 3D",
            "prompt": "Show the person in the photo with the exact same pose, expression, and background, but make everything in the scene look like it was created from Minecraft-style blocks and show people as Minecraft characters. If no person is present, do not add any people to the output.",
            "productUrl": null,
            "colors": [
              "#22C55E",
              "#0EA5E9"
            ],
            "captureButtonColors": [
              "#22C55E",
              "#0EA5E9"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/LQWMIicB.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/LQWMIicB.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/LQWMIicB.png",
              "sfSymbol": "cube.fill",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": false,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/LQWMIicB.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/LQWMIicB.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/LQWMIicB.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/LQWMIicB.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "normal"
          },
          {
            "uid": "fire_flame",
            "id": "fire_flame",
            "name": "Ngọn Lửa Rực Cháy",
            "prompt": "Show the persons in the photo with the exact same pose and background, but with a dramatic theatrical flame effect appearing just in front of the subject's face, as if they are performing a fantasy fire-breathing act, captured with a modern iPhone camera look.\n\nThe flame should appear as a staged visual effect, suspended in front of the mouth area without showing fire originating from inside the body. Keep the effect believable and cinematic, with a bright yellow-white core, orange and red edges, subtle motion blur, and gentle heat distortion in the nearby air.\n\nAdd a soft warm glow on nearby facial features and clothing, consistent with the flame's position, while preserving the original lighting of the scene. Do not show burns, smoke inhalation, injury, pain, damage, or distress. Do not alter the person's face, expression, identity, or pose.\n\nKeep the background, framing, depth of field, and image quality identical to the original, with the flame effect appearing as a safe staged performance element captured in-camera. Do not change the overall compsition of the photo, do not add new people to the photo, only show each person in the photo one time.",
            "productUrl": null,
            "colors": [
              "#F97316",
              "#EAB308"
            ],
            "captureButtonColors": [
              "#F97316",
              "#EAB308"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/E84woLlh.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/E84woLlh.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/E84woLlh.png",
              "sfSymbol": "flame.fill",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": false,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/E84woLlh.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/E84woLlh.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/E84woLlh.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/E84woLlh.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "normal"
          },
          {
            "uid": "giant_spider",
            "id": "giant_spider",
            "name": "Nhện Khổng Lồ",
            "prompt": "Show the person in the photo with the exact same pose, expression, and background, but place a realistic spider perched on them somewhere, such as their shoulder or head. If no person is present, do not add any people to the output.",
            "productUrl": null,
            "colors": [
              "#334155",
              "#EF4444"
            ],
            "captureButtonColors": [
              "#334155",
              "#EF4444"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/p4ARtqG1.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/p4ARtqG1.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/p4ARtqG1.png",
              "sfSymbol": "ant.fill",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": false,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/p4ARtqG1.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/p4ARtqG1.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/p4ARtqG1.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/p4ARtqG1.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "normal"
          },
          {
            "uid": "ocean_underwater",
            "id": "ocean_underwater",
            "name": "Thủy Cung Đại Dương",
            "prompt": "Show the person in the photo with the exact same pose, background, and facial expression, but as if them and their surrounding environment was underwater. If no face is present, do not show any people in the output, only ever show people who were in the original input image.",
            "productUrl": null,
            "colors": [
              "#06B6D4",
              "#3B82F6"
            ],
            "captureButtonColors": [
              "#06B6D4",
              "#3B82F6"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/jKae4Rkw.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/jKae4Rkw.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/jKae4Rkw.png",
              "sfSymbol": "drop.fill",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": false,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/jKae4Rkw.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/jKae4Rkw.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/jKae4Rkw.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/jKae4Rkw.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "normal"
          },
          {
            "uid": "ufo_alien",
            "id": "ufo_alien",
            "name": "UFO & Alien",
            "prompt": "Show the person in the photo with the exact same pose and background, but show a subtle UFO hovering in the sky or an alien somewhere hidden somewhere in the user's background. If no face is present, do not show any people in the output, only ever show people who were in the original input image.",
            "productUrl": null,
            "colors": [
              "#10B981",
              "#8B5CF6"
            ],
            "captureButtonColors": [
              "#10B981",
              "#8B5CF6"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/b3e5SMT6.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/b3e5SMT6.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/b3e5SMT6.png",
              "sfSymbol": "sparkles",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": false,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/b3e5SMT6.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/b3e5SMT6.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/b3e5SMT6.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/b3e5SMT6.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "normal"
          },
          {
            "uid": "sweat_hearts",
            "id": "sweat_hearts",
            "name": "Sweet Hearts",
            "prompt": "sweet_hearts",
            "productUrl": null,
            "colors": [
              "#FB7185",
              "#FCE7F3"
            ],
            "captureButtonColors": [
              "#FB7185",
              "#FCE7F3"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/KKHQjVIP.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/KKHQjVIP.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/KKHQjVIP.png",
              "sfSymbol": "sparkles",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": true,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/KKHQjVIP.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/KKHQjVIP.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/KKHQjVIP.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/KKHQjVIP.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "cutout"
          },
          {
            "uid": "frame_berry_days",
            "id": "frame_berry_days",
            "name": "Photobooth Berry Days",
            "category": "Photobooth",
            "prompt": "pb_strawberry",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/gxzBXrkx.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/gxzBXrkx.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/gxzBXrkx.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/gxzBXrkx.png",
            "tintColor": "#FFB6C1",
            "colors": [
              "#FFB6C1",
              "#FF69B4"
            ],
            "captureButtonColors": [
              "#FFB6C1",
              "#FF69B4"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/gxzBXrkx.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/gxzBXrkx.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/gxzBXrkx.png",
              "sfSymbol": "square.grid.2x2",
              "symbol": "square.grid.2x2",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "frame_happy_snap",
            "id": "frame_happy_snap",
            "name": "Photobooth Happy Snap",
            "category": "Photobooth",
            "prompt": "pb_vintage",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/Ya9kkP4b.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/Ya9kkP4b.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/Ya9kkP4b.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/Ya9kkP4b.png",
            "tintColor": "#A8E6CF",
            "colors": [
              "#A8E6CF",
              "#88D49E"
            ],
            "captureButtonColors": [
              "#A8E6CF",
              "#88D49E"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/Ya9kkP4b.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/Ya9kkP4b.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/Ya9kkP4b.png",
              "sfSymbol": "square.grid.2x2",
              "symbol": "square.grid.2x2",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "frame_sky_diary",
            "id": "frame_sky_diary",
            "name": "Photobooth Sky Diary",
            "category": "Photobooth",
            "prompt": "pb_galaxy",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/WXQ5IJRY.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/WXQ5IJRY.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/WXQ5IJRY.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/WXQ5IJRY.png",
            "tintColor": "#D8B4F8",
            "colors": [
              "#D8B4F8",
              "#C3B1E1"
            ],
            "captureButtonColors": [
              "#D8B4F8",
              "#C3B1E1"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/WXQ5IJRY.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/WXQ5IJRY.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/WXQ5IJRY.png",
              "sfSymbol": "square.grid.2x2",
              "symbol": "square.grid.2x2",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photobooth_4cut",
            "id": "photobooth_4cut",
            "name": "Photobooth 4 ô",
            "category": "Photobooth",
            "prompt": "photobooth_4cut",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/I3P77Cgk.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/I3P77Cgk.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/I3P77Cgk.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/I3P77Cgk.png",
            "tintColor": "#FFD6E0",
            "colors": [
              "#FFD6E0",
              "#FFE4EC"
            ],
            "captureButtonColors": [
              "#FFD6E0",
              "#FFE4EC"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/I3P77Cgk.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/I3P77Cgk.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/I3P77Cgk.png",
              "sfSymbol": "square.grid.2x2",
              "symbol": "square.grid.2x2",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photobooth_cute",
            "id": "photobooth_cute",
            "name": "Photobooth Cute",
            "category": "Photobooth",
            "prompt": "photobooth_cute",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/QjqQ20hC.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/QjqQ20hC.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/QjqQ20hC.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/QjqQ20hC.png",
            "tintColor": "#FFD6E0",
            "colors": [
              "#FFD6E0",
              "#FFE4EC"
            ],
            "captureButtonColors": [
              "#FFD6E0",
              "#FFE4EC"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/QjqQ20hC.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/QjqQ20hC.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/QjqQ20hC.png",
              "sfSymbol": "square.grid.2x2",
              "symbol": "square.grid.2x2",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_holo_4cut",
            "id": "pb_holo_4cut",
            "name": "Photobooth Y2K Holo",
            "category": "Photobooth",
            "prompt": "pb_holo_4cut",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/2LCkIMOS.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/2LCkIMOS.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/2LCkIMOS.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/2LCkIMOS.png",
            "tintColor": "#C4B5FD",
            "colors": [
              "#C4B5FD",
              "#E0E7FF"
            ],
            "captureButtonColors": [
              "#C4B5FD",
              "#E0E7FF"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/2LCkIMOS.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/2LCkIMOS.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/2LCkIMOS.png",
              "sfSymbol": "square.grid.2x2",
              "symbol": "square.grid.2x2",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_scrapbook_ripped_4cut",
            "id": "pb_scrapbook_ripped_4cut",
            "name": "Photobooth Scrapbook",
            "category": "Photobooth",
            "prompt": "pb_scrapbook_ripped_4cut",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/EO18VJqL.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/EO18VJqL.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/EO18VJqL.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/EO18VJqL.png",
            "tintColor": "#D6A36A",
            "colors": [
              "#D6A36A",
              "#FDE68A"
            ],
            "captureButtonColors": [
              "#D6A36A",
              "#FDE68A"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/EO18VJqL.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/EO18VJqL.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/EO18VJqL.png",
              "sfSymbol": "square.grid.2x2",
              "symbol": "square.grid.2x2",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_ripped_paper_4cut",
            "id": "pb_ripped_paper_4cut",
            "name": "Photobooth Ripped Paper",
            "category": "Photobooth",
            "prompt": "pb_ripped_paper_4cut",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/xBNYQv0A.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/xBNYQv0A.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/xBNYQv0A.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/xBNYQv0A.png",
            "tintColor": "#EF4444",
            "colors": [
              "#EF4444",
              "#FCA5A5"
            ],
            "captureButtonColors": [
              "#EF4444",
              "#FCA5A5"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/xBNYQv0A.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/xBNYQv0A.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/xBNYQv0A.png",
              "sfSymbol": "square.grid.2x2",
              "symbol": "square.grid.2x2",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_denim_ripped_2x2",
            "id": "pb_denim_ripped_2x2",
            "name": "Photobooth Denim 4 ô",
            "category": "Photobooth",
            "prompt": "pb_denim_ripped_2x2",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/sKn1mwH3.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/sKn1mwH3.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/sKn1mwH3.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/sKn1mwH3.png",
            "tintColor": "#38BDF8",
            "colors": [
              "#38BDF8",
              "#93C5FD"
            ],
            "captureButtonColors": [
              "#38BDF8",
              "#93C5FD"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/sKn1mwH3.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/sKn1mwH3.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/sKn1mwH3.png",
              "sfSymbol": "square.grid.2x2",
              "symbol": "square.grid.2x2",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "frame_classic_pb",
            "id": "frame_classic_pb",
            "name": "Photobooth Cổ Điển",
            "category": "Photobooth",
            "prompt": "photoboot",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/bjXF2O5d.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/bjXF2O5d.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/bjXF2O5d.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/bjXF2O5d.png",
            "tintColor": "#FF758C",
            "colors": [
              "#FF758C",
              "#FF7EB3"
            ],
            "captureButtonColors": [
              "#FF758C",
              "#FF7EB3"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/bjXF2O5d.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/bjXF2O5d.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/bjXF2O5d.png",
              "sfSymbol": "square.grid.2x2",
              "symbol": "square.grid.2x2",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "sticker_binh_luan_minh_tue",
            "id": "sticker_binh_luan_minh_tue",
            "name": "Trend Tíc Tóc",
            "category": "Frames",
            "prompt": "sticker_binh_luan_minh_tue",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/kSaUH2JF.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/kSaUH2JF.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/kSaUH2JF.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/kSaUH2JF.png",
            "tintColor": "#FF758C",
            "colors": [
              "#FF758C",
              "#FF7EB3"
            ],
            "captureButtonColors": [
              "#FF758C",
              "#FF7EB3"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/kSaUH2JF.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/kSaUH2JF.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/kSaUH2JF.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "cmt_locket",
            "id": "cmt_locket",
            "name": "Locket Việt Nam",
            "category": "Frames",
            "prompt": "cmt_locket",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/xxXEkGa0.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/xxXEkGa0.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/xxXEkGa0.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/xxXEkGa0.png",
            "tintColor": "#FF758C",
            "colors": [
              "#FF758C",
              "#FF7EB3"
            ],
            "captureButtonColors": [
              "#FF758C",
              "#FF7EB3"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/xxXEkGa0.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/xxXEkGa0.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/xxXEkGa0.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "khung_hello_kitty_pastel_ngot_ngao",
            "id": "khung_hello_kitty_pastel_ngot_ngao",
            "name": "Hello Kitty Ngọt Ngào",
            "category": "Frames",
            "prompt": "khung_hello_kitty_pastel_ngot_ngao",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/YYMilOf6.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/YYMilOf6.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/YYMilOf6.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/YYMilOf6.png",
            "tintColor": "#FF758C",
            "colors": [
              "#FF758C",
              "#FF7EB3"
            ],
            "captureButtonColors": [
              "#FF758C",
              "#FF7EB3"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/YYMilOf6.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/YYMilOf6.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/YYMilOf6.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "khung_hello_kitty_hong_pastel",
            "id": "khung_hello_kitty_hong_pastel",
            "name": "Khung Hello Kitty Hồng",
            "category": "Frames",
            "prompt": "khung_hello_kitty_hong_pastel",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/3lS0E28Z.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/3lS0E28Z.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/3lS0E28Z.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/3lS0E28Z.png",
            "tintColor": "#FF758C",
            "colors": [
              "#FF758C",
              "#FF7EB3"
            ],
            "captureButtonColors": [
              "#FF758C",
              "#FF7EB3"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/3lS0E28Z.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/3lS0E28Z.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/3lS0E28Z.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "khung_pastel_vien_ren",
            "id": "khung_pastel_vien_ren",
            "name": "Nơ Pastel Viền Ren",
            "category": "Frames",
            "prompt": "khung_pastel_vien_ren",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/itGU69Tn.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/itGU69Tn.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/itGU69Tn.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/itGU69Tn.png",
            "tintColor": "#FF758C",
            "colors": [
              "#FF758C",
              "#FF7EB3"
            ],
            "captureButtonColors": [
              "#FF758C",
              "#FF7EB3"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/itGU69Tn.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/itGU69Tn.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/itGU69Tn.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "khung_hoa_pastel_vien_xanh_xinh",
            "id": "khung_hoa_pastel_vien_xanh_xinh",
            "name": "Hoa Xinh Pastel",
            "category": "Frames",
            "prompt": "khung_hoa_pastel_vien_xanh_xinh",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/HmfZ08L9.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/HmfZ08L9.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/HmfZ08L9.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/HmfZ08L9.png",
            "tintColor": "#51e6e4",
            "colors": [
              "#51e6e4",
              "#fce03f"
            ],
            "captureButtonColors": [
              "#51e6e4",
              "#fce03f"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/HmfZ08L9.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/HmfZ08L9.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/HmfZ08L9.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "khung_spiderred",
            "id": "khung_spiderred",
            "name": "Nhện Đỏ",
            "category": "Frames",
            "prompt": "khung_spiderred",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/IlejAWVQ.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/IlejAWVQ.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/IlejAWVQ.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/IlejAWVQ.png",
            "tintColor": "#b3001e",
            "colors": [
              "#b3001e",
              "#b3001e"
            ],
            "captureButtonColors": [
              "#b3001e",
              "#b3001e"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/IlejAWVQ.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/IlejAWVQ.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/IlejAWVQ.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "khung_khong_gian_xanh_pastel",
            "id": "khung_khong_gian_xanh_pastel",
            "name": "Không Gian Xanh",
            "category": "Frames",
            "prompt": "khung_khong_gian_xanh_pastel",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/KMjL2bn1.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/KMjL2bn1.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/KMjL2bn1.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/KMjL2bn1.png",
            "tintColor": "#65d9fc",
            "colors": [
              "#65d9fc",
              "#65d9fc"
            ],
            "captureButtonColors": [
              "#65d9fc",
              "#65d9fc"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/KMjL2bn1.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/KMjL2bn1.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/KMjL2bn1.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "khung_ngoi_sao_hong_pastel",
            "id": "khung_ngoi_sao_hong_pastel",
            "name": "Ngôi Sao Hồng",
            "category": "Frames",
            "prompt": "khung_ngoi_sao_hong_pastel",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/JNBpQnLu.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/JNBpQnLu.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/JNBpQnLu.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/JNBpQnLu.png",
            "tintColor": "#FF758C",
            "colors": [
              "#FF758C",
              "#FF7EB3"
            ],
            "captureButtonColors": [
              "#FF758C",
              "#FF7EB3"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/JNBpQnLu.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/JNBpQnLu.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/JNBpQnLu.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "khung_pastel_so_hai_cau",
            "id": "khung_pastel_so_hai_cau",
            "name": "Sò Hải Cẩu Pastel",
            "category": "Frames",
            "prompt": "khung_pastel_so_hai_cau",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/Gm6AI5Vf.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/Gm6AI5Vf.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/Gm6AI5Vf.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/Gm6AI5Vf.png",
            "tintColor": "#cfedfc",
            "colors": [
              "#cfedfc",
              "#cfedfc"
            ],
            "captureButtonColors": [
              "#cfedfc",
              "#cfedfc"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/Gm6AI5Vf.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/Gm6AI5Vf.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/Gm6AI5Vf.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "khung_shin_chan",
            "id": "khung_shin_chan",
            "name": "Shin-Chan",
            "category": "Frames",
            "prompt": "khung_shin_chan",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/ERSGe9wZ.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/ERSGe9wZ.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/ERSGe9wZ.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/ERSGe9wZ.png",
            "tintColor": "#f00008",
            "colors": [
              "#f00008",
              "#faed32"
            ],
            "captureButtonColors": [
              "#f00008",
              "#faed32"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/ERSGe9wZ.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/ERSGe9wZ.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/ERSGe9wZ.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "khung_anh_hellokitty_v_sao",
            "id": "khung_anh_hellokitty_v_sao",
            "name": "Hello Kitty & Sao",
            "category": "Frames",
            "prompt": "khung_anh_hellokitty_v_sao",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/ckAcbUl1.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/ckAcbUl1.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/ckAcbUl1.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/ckAcbUl1.png",
            "tintColor": "#780c23",
            "colors": [
              "#780c23",
              "#a94770"
            ],
            "captureButtonColors": [
              "#780c23",
              "#a94770"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/ckAcbUl1.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/ckAcbUl1.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/ckAcbUl1.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "khung_xanh_tay_sao_vang",
            "id": "khung_xanh_tay_sao_vang",
            "name": "Sao Vàng Xanh",
            "category": "Frames",
            "prompt": "khung_xanh_tay_sao_vang",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/GcdaJHFy.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/GcdaJHFy.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/GcdaJHFy.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/GcdaJHFy.png",
            "tintColor": "#6fb1d3",
            "colors": [
              "#6fb1d3",
              "#cdd64c"
            ],
            "captureButtonColors": [
              "#6fb1d3",
              "#cdd64c"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/GcdaJHFy.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/GcdaJHFy.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/GcdaJHFy.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "sinh_nhat_hello_kitty",
            "id": "sinh_nhat_hello_kitty",
            "name": "Sinh Nhật Hello Kitty",
            "category": "Frames",
            "prompt": "sinh_nhat_hello_kitty",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/eIXwHlV5.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/eIXwHlV5.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/eIXwHlV5.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/eIXwHlV5.png",
            "tintColor": "#FF758C",
            "colors": [
              "#FF758C",
              "#FF7EB3"
            ],
            "captureButtonColors": [
              "#FF758C",
              "#FF7EB3"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/eIXwHlV5.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/eIXwHlV5.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/eIXwHlV5.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_single_y2k_silver_holo",
            "id": "pb_single_y2k_silver_holo",
            "name": "Khung Y2K Silver Holo",
            "category": "Frames",
            "prompt": "pb_single_y2k_silver_holo",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/x84e4vYZ.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/x84e4vYZ.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/x84e4vYZ.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/x84e4vYZ.png",
            "tintColor": "#C4B5FD",
            "colors": [
              "#C4B5FD",
              "#E0E7FF"
            ],
            "captureButtonColors": [
              "#C4B5FD",
              "#E0E7FF"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/x84e4vYZ.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/x84e4vYZ.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/x84e4vYZ.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_single_denim_ripped",
            "id": "pb_single_denim_ripped",
            "name": "Khung Denim Cá Tính",
            "category": "Frames",
            "prompt": "pb_single_denim_ripped",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/77T1zXKS.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/77T1zXKS.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/77T1zXKS.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/77T1zXKS.png",
            "tintColor": "#38BDF8",
            "colors": [
              "#38BDF8",
              "#93C5FD"
            ],
            "captureButtonColors": [
              "#38BDF8",
              "#93C5FD"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/77T1zXKS.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/77T1zXKS.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/77T1zXKS.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_single_film_nostalgia",
            "id": "pb_single_film_nostalgia",
            "name": "Khung Film Hoài Cổ",
            "category": "Frames",
            "prompt": "pb_single_film_nostalgia",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://cdn.upanhlaylink.com/i/gphwGSQG.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/gphwGSQG.png",
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/gphwGSQG.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/gphwGSQG.png",
            "tintColor": "#D6A36A",
            "colors": [
              "#D6A36A",
              "#FDE68A"
            ],
            "captureButtonColors": [
              "#D6A36A",
              "#FDE68A"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/gphwGSQG.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/gphwGSQG.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/gphwGSQG.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "locket",
            "id": "locket",
            "name": "Practical Magic 2",
            "prompt": "locket",
            "productUrl": null,
            "colors": [
              "#7C3AED",
              "#C4B5FD"
            ],
            "captureButtonColors": [
              "#7C3AED",
              "#C4B5FD"
            ],
            "icon": {
              "url": "https://cdn.upanhlaylink.com/i/kyzGgnKy.png",
              "iconUrl": "https://cdn.upanhlaylink.com/i/kyzGgnKy.png",
              "remoteImage": "https://cdn.upanhlaylink.com/i/kyzGgnKy.png",
              "sfSymbol": "sparkles",
              "emoji": ""
            },
            "textColor": "#FFFFFF",
            "style": "cutout",
            "overlay": true,
            "overlayImageUrl": "https://cdn.upanhlaylink.com/i/kyzGgnKy.png",
            "overlayImageURL": "https://cdn.upanhlaylink.com/i/kyzGgnKy.png",
            "imageUrl": "https://cdn.upanhlaylink.com/i/kyzGgnKy.png",
            "iconUrl": "https://cdn.upanhlaylink.com/i/kyzGgnKy.png",
            "referenceImages": [],
            "type": "normal",
            "filterType": "cutout"
          },
          {
            "uid": "pb_khung4_scrapbook_do",
            "id": "pb_khung4_scrapbook_do",
            "name": "Scrapbook Đỏ",
            "category": "PhotoBooth 4 ảnh",
            "prompt": "pb_khung4_scrapbook_do",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_scrapbook_do.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_scrapbook_do.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_scrapbook_do.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_scrapbook_do.png",
            "tintColor": "#671C2A",
            "colors": [
              "#671C2A",
              "#E7E1D8"
            ],
            "captureButtonColors": [
              "#671C2A",
              "#E7E1D8"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_scrapbook_do.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_scrapbook_do.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_scrapbook_do.png",
              "sfSymbol": "square.grid.2x2.fill",
              "symbol": "square.grid.2x2.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung4_inspire_arena",
            "id": "pb_khung4_inspire_arena",
            "name": "Inspire Arena",
            "category": "PhotoBooth 4 ảnh",
            "prompt": "pb_khung4_inspire_arena",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_inspire_arena.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_inspire_arena.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_inspire_arena.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_inspire_arena.png",
            "tintColor": "#267BB5",
            "colors": [
              "#267BB5",
              "#B7D8F0"
            ],
            "captureButtonColors": [
              "#267BB5",
              "#B7D8F0"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_inspire_arena.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_inspire_arena.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_inspire_arena.png",
              "sfSymbol": "music.note",
              "symbol": "music.note",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung4_my_vault",
            "id": "pb_khung4_my_vault",
            "name": "My Vault",
            "category": "PhotoBooth 4 ảnh",
            "prompt": "pb_khung4_my_vault",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_my_vault.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_my_vault.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_my_vault.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_my_vault.png",
            "tintColor": "#292929",
            "colors": [
              "#292929",
              "#C4C8CE"
            ],
            "captureButtonColors": [
              "#292929",
              "#C4C8CE"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_my_vault.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_my_vault.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_my_vault.png",
              "sfSymbol": "bolt.fill",
              "symbol": "bolt.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung4_cham_bi",
            "id": "pb_khung4_cham_bi",
            "name": "Chấm Bi",
            "category": "PhotoBooth 4 ảnh",
            "prompt": "pb_khung4_cham_bi",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_cham_bi.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_cham_bi.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_cham_bi.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_cham_bi.png",
            "tintColor": "#694A4B",
            "colors": [
              "#694A4B",
              "#F0D4DE"
            ],
            "captureButtonColors": [
              "#694A4B",
              "#F0D4DE"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_cham_bi.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_cham_bi.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_cham_bi.png",
              "sfSymbol": "circle.grid.2x2.fill",
              "symbol": "circle.grid.2x2.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung4_cham_bi_den",
            "id": "pb_khung4_cham_bi_den",
            "name": "Chấm Bi Đen",
            "category": "PhotoBooth 4 ảnh",
            "prompt": "pb_khung4_cham_bi_den",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_cham_bi_den.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_cham_bi_den.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_cham_bi_den.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_cham_bi_den.png",
            "tintColor": "#242424",
            "colors": [
              "#242424",
              "#ECECEC"
            ],
            "captureButtonColors": [
              "#242424",
              "#ECECEC"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_cham_bi_den.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_cham_bi_den.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_cham_bi_den.png",
              "sfSymbol": "circle.grid.2x2.fill",
              "symbol": "circle.grid.2x2.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung4_likeble",
            "id": "pb_khung4_likeble",
            "name": "Likeble",
            "category": "PhotoBooth 4 ảnh",
            "prompt": "pb_khung4_likeble",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_likeble.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_likeble.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_likeble.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_likeble.png",
            "tintColor": "#B39C57",
            "colors": [
              "#B39C57",
              "#F6ECD0"
            ],
            "captureButtonColors": [
              "#B39C57",
              "#F6ECD0"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_likeble.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_likeble.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_likeble.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung4_razzle",
            "id": "pb_khung4_razzle",
            "name": "Razzle Dazzle",
            "category": "PhotoBooth 4 ảnh",
            "prompt": "pb_khung4_razzle",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_razzle.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_razzle.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_razzle.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_razzle.png",
            "tintColor": "#806044",
            "colors": [
              "#806044",
              "#D3BB91"
            ],
            "captureButtonColors": [
              "#806044",
              "#D3BB91"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_razzle.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_razzle.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_razzle.png",
              "sfSymbol": "camera.fill",
              "symbol": "camera.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung4_your_title",
            "id": "pb_khung4_your_title",
            "name": "Your Title",
            "category": "PhotoBooth 4 ảnh",
            "prompt": "pb_khung4_your_title",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_your_title.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_your_title.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_your_title.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_your_title.png",
            "tintColor": "#60462D",
            "colors": [
              "#60462D",
              "#ECD1A2"
            ],
            "captureButtonColors": [
              "#60462D",
              "#ECD1A2"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_your_title.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_your_title.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_your_title.png",
              "sfSymbol": "newspaper.fill",
              "symbol": "newspaper.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung4_soulmate_film",
            "id": "pb_khung4_soulmate_film",
            "name": "Soulmate Film",
            "category": "PhotoBooth 4 ảnh",
            "prompt": "pb_khung4_soulmate_film",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_soulmate_film.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_soulmate_film.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_soulmate_film.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_soulmate_film.png",
            "tintColor": "#8C2937",
            "colors": [
              "#8C2937",
              "#F1E7DB"
            ],
            "captureButtonColors": [
              "#8C2937",
              "#F1E7DB"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_soulmate_film.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_soulmate_film.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_soulmate_film.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung4_mimi",
            "id": "pb_khung4_mimi",
            "name": "Mimi Say Cheese",
            "category": "PhotoBooth 4 ảnh",
            "prompt": "pb_khung4_mimi",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_mimi.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_mimi.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_mimi.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_mimi.png",
            "tintColor": "#5D8DBA",
            "colors": [
              "#5D8DBA",
              "#F6B8D3"
            ],
            "captureButtonColors": [
              "#5D8DBA",
              "#F6B8D3"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_mimi.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_mimi.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_mimi.png",
              "sfSymbol": "camera.fill",
              "symbol": "camera.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung4_fairy_film",
            "id": "pb_khung4_fairy_film",
            "name": "Fairy Film",
            "category": "PhotoBooth 4 ảnh",
            "prompt": "pb_khung4_fairy_film",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_fairy_film.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_fairy_film.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_fairy_film.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_fairy_film.png",
            "tintColor": "#344F7B",
            "colors": [
              "#344F7B",
              "#D9BF94"
            ],
            "captureButtonColors": [
              "#344F7B",
              "#D9BF94"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_fairy_film.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_fairy_film.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_fairy_film.png",
              "sfSymbol": "envelope.fill",
              "symbol": "envelope.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung4_foto_lush",
            "id": "pb_khung4_foto_lush",
            "name": "Foto Lush",
            "category": "PhotoBooth 4 ảnh",
            "prompt": "pb_khung4_foto_lush",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_foto_lush.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_foto_lush.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_foto_lush.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_foto_lush.png",
            "tintColor": "#6F6A63",
            "colors": [
              "#6F6A63",
              "#E9DFCA"
            ],
            "captureButtonColors": [
              "#6F6A63",
              "#E9DFCA"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_foto_lush.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_foto_lush.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_foto_lush.png",
              "sfSymbol": "square.grid.2x2",
              "symbol": "square.grid.2x2",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung4_photoism",
            "id": "pb_khung4_photoism",
            "name": "Photoism",
            "category": "PhotoBooth 4 ảnh",
            "prompt": "pb_khung4_photoism",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_photoism.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_photoism.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_photoism.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_photoism.png",
            "tintColor": "#242424",
            "colors": [
              "#242424",
              "#B9A2BC"
            ],
            "captureButtonColors": [
              "#242424",
              "#B9A2BC"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_photoism.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_photoism.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_photoism.png",
              "sfSymbol": "camera.fill",
              "symbol": "camera.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung4_twinkle_booth",
            "id": "pb_khung4_twinkle_booth",
            "name": "Twinkle Booth",
            "category": "PhotoBooth 4 ảnh",
            "prompt": "pb_khung4_twinkle_booth",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_twinkle_booth.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_twinkle_booth.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_twinkle_booth.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_twinkle_booth.png",
            "tintColor": "#674323",
            "colors": [
              "#674323",
              "#EAD298"
            ],
            "captureButtonColors": [
              "#674323",
              "#EAD298"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_twinkle_booth.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_twinkle_booth.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_twinkle_booth.png",
              "sfSymbol": "star.fill",
              "symbol": "star.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung4_equinox",
            "id": "pb_khung4_equinox",
            "name": "Equinox Studio",
            "category": "PhotoBooth 4 ảnh",
            "prompt": "pb_khung4_equinox",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_equinox.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_equinox.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_equinox.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_equinox.png",
            "tintColor": "#174C9B",
            "colors": [
              "#174C9B",
              "#B62432"
            ],
            "captureButtonColors": [
              "#174C9B",
              "#B62432"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_equinox.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_equinox.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_equinox.png",
              "sfSymbol": "square.grid.2x2",
              "symbol": "square.grid.2x2",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung4_i_love_you",
            "id": "pb_khung4_i_love_you",
            "name": "I Love You",
            "category": "PhotoBooth 4 ảnh",
            "prompt": "pb_khung4_i_love_you",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_i_love_you.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_i_love_you.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_i_love_you.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_i_love_you.png",
            "tintColor": "#795D3D",
            "colors": [
              "#795D3D",
              "#DCCBAA"
            ],
            "captureButtonColors": [
              "#795D3D",
              "#DCCBAA"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_i_love_you.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_i_love_you.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_i_love_you.png",
              "sfSymbol": "square.grid.2x2",
              "symbol": "square.grid.2x2",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung4_film",
            "id": "pb_khung4_film",
            "name": "Cuộn Phim 35mm",
            "category": "Photobooth",
            "prompt": "pb_khung4_film",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_film.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_film.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_film.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_film.png",
            "tintColor": "#1C1C1C",
            "colors": [
              "#1C1C1C",
              "#B8B8B8"
            ],
            "captureButtonColors": [
              "#1C1C1C",
              "#B8B8B8"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_film.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_film.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_film.png",
              "sfSymbol": "square.grid.2x2",
              "symbol": "square.grid.2x2",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung4_dream_cream",
            "id": "pb_khung4_dream_cream",
            "name": "Denim & Kem",
            "category": "Photobooth",
            "prompt": "pb_khung4_dream_cream",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_dream_cream.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_dream_cream.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_dream_cream.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_dream_cream.png",
            "tintColor": "#405978",
            "colors": [
              "#405978",
              "#F3E7D7"
            ],
            "captureButtonColors": [
              "#405978",
              "#F3E7D7"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_dream_cream.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_dream_cream.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_dream_cream.png",
              "sfSymbol": "square.grid.2x2",
              "symbol": "square.grid.2x2",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung4_scrapbook",
            "id": "pb_khung4_scrapbook",
            "name": "Scrapbook Kỷ Niệm",
            "category": "PhotoBooth 4 ảnh",
            "prompt": "pb_khung4_scrapbook",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_scrapbook.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_scrapbook.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_scrapbook.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_scrapbook.png",
            "tintColor": "#C9B08A",
            "colors": [
              "#C9B08A",
              "#EADCC2"
            ],
            "captureButtonColors": [
              "#C9B08A",
              "#EADCC2"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_scrapbook.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_scrapbook.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_scrapbook.png",
              "sfSymbol": "square.grid.2x2",
              "symbol": "square.grid.2x2",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung4_so_cool",
            "id": "pb_khung4_so_cool",
            "name": "So Cool",
            "category": "PhotoBooth 4 ảnh",
            "prompt": "pb_khung4_so_cool",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_so_cool.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_so_cool.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_so_cool.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung4_so_cool.png",
            "tintColor": "#D85C9A",
            "colors": [
              "#D85C9A",
              "#F3B9D2"
            ],
            "captureButtonColors": [
              "#D85C9A",
              "#F3B9D2"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung4_so_cool.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung4_so_cool.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung4_so_cool.png",
              "sfSymbol": "square.grid.2x2",
              "symbol": "square.grid.2x2",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "cmt_siuu",
            "id": "cmt_siuu",
            "name": "Ronaldo SIUUU",
            "category": "Trend Comment TikTok",
            "prompt": "cmt_siuu",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/cmt_siuu.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/cmt_siuu.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/cmt_siuu.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/cmt_siuu.png",
            "tintColor": "#344B5B",
            "colors": [
              "#344B5B",
              "#E84B60"
            ],
            "captureButtonColors": [
              "#344B5B",
              "#E84B60"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/cmt_siuu.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/cmt_siuu.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/cmt_siuu.png",
              "sfSymbol": "bubble.left.fill",
              "symbol": "bubble.left.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "cmt_sontung",
            "id": "cmt_sontung",
            "name": "Sơn Tùng MTP",
            "category": "Trend Comment TikTok",
            "prompt": "cmt_sontung",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/cmt_sontung.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/cmt_sontung.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/cmt_sontung.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/cmt_sontung.png",
            "tintColor": "#344C47",
            "colors": [
              "#344C47",
              "#DF5B69"
            ],
            "captureButtonColors": [
              "#344C47",
              "#DF5B69"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/cmt_sontung.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/cmt_sontung.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/cmt_sontung.png",
              "sfSymbol": "bubble.left.fill",
              "symbol": "bubble.left.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "cmt_xinh",
            "id": "cmt_xinh",
            "name": "Ai Cho Xinh Vậy",
            "category": "Trend Comment TikTok",
            "prompt": "cmt_xinh",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/cmt_xinh.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/cmt_xinh.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/cmt_xinh.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/cmt_xinh.png",
            "tintColor": "#F43F5E",
            "colors": [
              "#F43F5E",
              "#FB7185"
            ],
            "captureButtonColors": [
              "#F43F5E",
              "#FB7185"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/cmt_xinh.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/cmt_xinh.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/cmt_xinh.png",
              "sfSymbol": "bubble.left.fill",
              "symbol": "bubble.left.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "cmt_posst",
            "id": "cmt_posst",
            "name": "Tấm Cuối Đáng Đăng",
            "category": "Trend Comment TikTok",
            "prompt": "cmt_posst",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/cmt_posst.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/cmt_posst.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/cmt_posst.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/cmt_posst.png",
            "tintColor": "#EF4444",
            "colors": [
              "#EF4444",
              "#60A5FA"
            ],
            "captureButtonColors": [
              "#EF4444",
              "#60A5FA"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/cmt_posst.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/cmt_posst.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/cmt_posst.png",
              "sfSymbol": "bubble.left.fill",
              "symbol": "bubble.left.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "cmt_flash",
            "id": "cmt_flash",
            "name": "Flash Đổi Nhân Cách",
            "category": "Trend Comment TikTok",
            "prompt": "cmt_flash",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/cmt_flash.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/cmt_flash.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/cmt_flash.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/cmt_flash.png",
            "tintColor": "#06B6D4",
            "colors": [
              "#06B6D4",
              "#EF4444"
            ],
            "captureButtonColors": [
              "#06B6D4",
              "#EF4444"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/cmt_flash.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/cmt_flash.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/cmt_flash.png",
              "sfSymbol": "bubble.left.fill",
              "symbol": "bubble.left.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "cmt_duanma",
            "id": "cmt_duanma",
            "name": "Dự án ma",
            "category": "Trend Comment TikTok",
            "prompt": "cmt_duanma",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/cmt_duanma.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/cmt_duanma.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/cmt_duanma.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/cmt_duanma.png",
            "tintColor": "#EF4444",
            "colors": [
              "#EF4444",
              "#60A5FA"
            ],
            "captureButtonColors": [
              "#EF4444",
              "#60A5FA"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/cmt_duanma.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/cmt_duanma.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/cmt_duanma.png",
              "sfSymbol": "bubble.left.fill",
              "symbol": "bubble.left.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "cmt_dichup",
            "id": "cmt_dichup",
            "name": "Chụp 3 Tấm Lựa 3 Tiếng",
            "category": "Trend Comment TikTok",
            "prompt": "cmt_dichup",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/cmt_dichup.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/cmt_dichup.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/cmt_dichup.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/cmt_dichup.png",
            "tintColor": "#06B6D4",
            "colors": [
              "#06B6D4",
              "#FB7185"
            ],
            "captureButtonColors": [
              "#06B6D4",
              "#FB7185"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/cmt_dichup.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/cmt_dichup.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/cmt_dichup.png",
              "sfSymbol": "bubble.left.fill",
              "symbol": "bubble.left.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "cmt_chuano",
            "id": "cmt_chuano",
            "name": "Đừng Khinh Thường Hoa Chưa Nở",
            "category": "Trend Comment TikTok",
            "prompt": "cmt_chuano",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/cmt_chuano.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/cmt_chuano.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/cmt_chuano.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/cmt_chuano.png",
            "tintColor": "#06B6D4",
            "colors": [
              "#06B6D4",
              "#EF4444"
            ],
            "captureButtonColors": [
              "#06B6D4",
              "#EF4444"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/cmt_chuano.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/cmt_chuano.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/cmt_chuano.png",
              "sfSymbol": "bubble.left.fill",
              "symbol": "bubble.left.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "cmt_anhdim",
            "id": "cmt_anhdim",
            "name": "Bạn Thân Giữ Ảnh Dìm",
            "category": "Trend Comment TikTok",
            "prompt": "cmt_anhdim",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/cmt_anhdim.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/cmt_anhdim.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/cmt_anhdim.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/cmt_anhdim.png",
            "tintColor": "#EF4444",
            "colors": [
              "#EF4444",
              "#22D3EE"
            ],
            "captureButtonColors": [
              "#EF4444",
              "#22D3EE"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/cmt_anhdim.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/cmt_anhdim.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/cmt_anhdim.png",
              "sfSymbol": "bubble.left.fill",
              "symbol": "bubble.left.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung2_soulmate",
            "id": "pb_khung2_soulmate",
            "name": "Soulmate",
            "category": "PhotoBooth 2 ảnh",
            "prompt": "pb_khung2_soulmate",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_soulmate.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_soulmate.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_soulmate.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung2_soulmate.png",
            "tintColor": "#353535",
            "colors": [
              "#353535",
              "#D6CBB8"
            ],
            "captureButtonColors": [
              "#353535",
              "#D6CBB8"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung2_soulmate.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_soulmate.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung2_soulmate.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung2_monkey",
            "id": "pb_khung2_monkey",
            "name": "Đôi Bạn Monkey",
            "category": "Khung 2 ảnh",
            "prompt": "pb_khung2_monkey",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_monkey.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_monkey.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_monkey.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung2_monkey.png",
            "tintColor": "#514D29",
            "colors": [
              "#514D29",
              "#A77B56"
            ],
            "captureButtonColors": [
              "#514D29",
              "#A77B56"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung2_monkey.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_monkey.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung2_monkey.png",
              "sfSymbol": "face.smiling.fill",
              "symbol": "face.smiling.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung2_love_postcard",
            "id": "pb_khung2_love_postcard",
            "name": "Love Postcard",
            "category": "PhotoBooth 2 ảnh",
            "prompt": "pb_khung2_love_postcard",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_love_postcard.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_love_postcard.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_love_postcard.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung2_love_postcard.png",
            "tintColor": "#673C52",
            "colors": [
              "#673C52",
              "#DAB8C8"
            ],
            "captureButtonColors": [
              "#673C52",
              "#DAB8C8"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung2_love_postcard.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_love_postcard.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung2_love_postcard.png",
              "sfSymbol": "envelope.fill",
              "symbol": "envelope.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung2_camera_pic",
            "id": "pb_khung2_camera_pic",
            "name": "Camera Kỷ Niệm",
            "category": "PhotoBooth 2 ảnh",
            "prompt": "pb_khung2_camera_pic",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_camera_pic.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_camera_pic.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_camera_pic.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung2_camera_pic.png",
            "tintColor": "#11182C",
            "colors": [
              "#11182C",
              "#CBD0D9"
            ],
            "captureButtonColors": [
              "#11182C",
              "#CBD0D9"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung2_camera_pic.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_camera_pic.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung2_camera_pic.png",
              "sfSymbol": "camera.fill",
              "symbol": "camera.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung2_anhdep",
            "id": "pb_khung2_anhdep",
            "name": "Hai Tấm Xinh Xinh",
            "category": "PhotoBooth 2 ảnh",
            "prompt": "pb_khung2_anhdep",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_anhdep.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_anhdep.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_anhdep.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung2_anhdep.png",
            "tintColor": "#7F0000",
            "colors": [
              "#7F0000",
              "#D9A0A0"
            ],
            "captureButtonColors": [
              "#7F0000",
              "#D9A0A0"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung2_anhdep.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_anhdep.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung2_anhdep.png",
              "sfSymbol": "camera.fill",
              "symbol": "camera.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung2_anhco",
            "id": "pb_khung2_anhco",
            "name": "Ký Ức Polaroid",
            "category": "PhotoBooth 2 ảnh",
            "prompt": "pb_khung2_anhco",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_anhco.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_anhco.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_anhco.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung2_anhco.png",
            "tintColor": "#303030",
            "colors": [
              "#303030",
              "#D6D3CE"
            ],
            "captureButtonColors": [
              "#303030",
              "#D6D3CE"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung2_anhco.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_anhco.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung2_anhco.png",
              "sfSymbol": "photo.on.rectangle",
              "symbol": "photo.on.rectangle",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung2_di_choi_thoi",
            "id": "pb_khung2_di_choi_thoi",
            "name": "Hẹn Nhau Đi Chơi",
            "category": "PhotoBooth 2 ảnh",
            "prompt": "pb_khung2_di_choi_thoi",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_di_choi_thoi.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_di_choi_thoi.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_di_choi_thoi.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung2_di_choi_thoi.png",
            "tintColor": "#9B292D",
            "colors": [
              "#9B292D",
              "#EAD4B5"
            ],
            "captureButtonColors": [
              "#9B292D",
              "#EAD4B5"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung2_di_choi_thoi.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_di_choi_thoi.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung2_di_choi_thoi.png",
              "sfSymbol": "camera.fill",
              "symbol": "camera.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung2_len_do",
            "id": "pb_khung2_len_do",
            "name": "Lên Đồ Đi Chơi",
            "category": "PhotoBooth 2 ảnh",
            "prompt": "pb_khung2_len_do",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_len_do.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_len_do.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_len_do.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung2_len_do.png",
            "tintColor": "#300020",
            "colors": [
              "#300020",
              "#B01060"
            ],
            "captureButtonColors": [
              "#300020",
              "#B01060"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung2_len_do.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_len_do.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung2_len_do.png",
              "sfSymbol": "tshirt.fill",
              "symbol": "tshirt.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung2_tin_nong",
            "id": "pb_khung2_tin_nong",
            "name": "Tin Nóng Hôm Nay",
            "category": "PhotoBooth 2 ảnh",
            "prompt": "pb_khung2_tin_nong",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_tin_nong.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_tin_nong.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_tin_nong.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung2_tin_nong.png",
            "tintColor": "#E0C080",
            "colors": [
              "#E0C080",
              "#F0D8B0"
            ],
            "captureButtonColors": [
              "#E0C080",
              "#F0D8B0"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung2_tin_nong.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_tin_nong.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung2_tin_nong.png",
              "sfSymbol": "newspaper.fill",
              "symbol": "newspaper.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung2_thang_ngay_ben_nhau",
            "id": "pb_khung2_thang_ngay_ben_nhau",
            "name": "Tháng Ngày Bên Nhau",
            "category": "PhotoBooth 2 ảnh",
            "prompt": "pb_khung2_thang_ngay_ben_nhau",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thang_ngay_ben_nhau.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thang_ngay_ben_nhau.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thang_ngay_ben_nhau.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thang_ngay_ben_nhau.png",
            "tintColor": "#C00000",
            "colors": [
              "#C00000",
              "#F02000"
            ],
            "captureButtonColors": [
              "#C00000",
              "#F02000"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thang_ngay_ben_nhau.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thang_ngay_ben_nhau.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thang_ngay_ben_nhau.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung2_may_anh",
            "id": "pb_khung2_may_anh",
            "name": "Góc Máy Thanh Xuân",
            "category": "PhotoBooth 2 ảnh",
            "prompt": "pb_khung2_may_anh",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_may_anh.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_may_anh.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_may_anh.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung2_may_anh.png",
            "tintColor": "#77776F",
            "colors": [
              "#77776F",
              "#D1CEC1"
            ],
            "captureButtonColors": [
              "#77776F",
              "#D1CEC1"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung2_may_anh.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_may_anh.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung2_may_anh.png",
              "sfSymbol": "camera.fill",
              "symbol": "camera.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung2_ki_niem",
            "id": "pb_khung2_ki_niem",
            "name": "Kỷ Niệm Chúng Mình",
            "category": "PhotoBooth 2 ảnh",
            "prompt": "pb_khung2_ki_niem",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_ki_niem.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_ki_niem.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_ki_niem.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung2_ki_niem.png",
            "tintColor": "#E080F0",
            "colors": [
              "#E080F0",
              "#F0B0F0"
            ],
            "captureButtonColors": [
              "#E080F0",
              "#F0B0F0"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung2_ki_niem.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_ki_niem.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung2_ki_niem.png",
              "sfSymbol": "photo.on.rectangle",
              "symbol": "photo.on.rectangle",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung2_khi_tinh_iu_den",
            "id": "pb_khung2_khi_tinh_iu_den",
            "name": "Khi Tình Yêu Đến",
            "category": "PhotoBooth 4 ảnh",
            "prompt": "pb_khung2_khi_tinh_iu_den",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_khi_tinh_iu_den.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_khi_tinh_iu_den.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_khi_tinh_iu_den.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung2_khi_tinh_iu_den.png",
            "tintColor": "#0040E0",
            "colors": [
              "#0040E0",
              "#70A0F0"
            ],
            "captureButtonColors": [
              "#0040E0",
              "#70A0F0"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung2_khi_tinh_iu_den.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_khi_tinh_iu_den.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung2_khi_tinh_iu_den.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung2_khi_e_vang",
            "id": "pb_khung2_khi_e_vang",
            "name": "Khi Em Vắng Anh",
            "category": "PhotoBooth 2 ảnh",
            "prompt": "pb_khung2_khi_e_vang",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_khi_e_vang.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_khi_e_vang.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_khi_e_vang.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung2_khi_e_vang.png",
            "tintColor": "#252525",
            "colors": [
              "#252525",
              "#E5E5E5"
            ],
            "captureButtonColors": [
              "#252525",
              "#E5E5E5"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung2_khi_e_vang.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_khi_e_vang.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung2_khi_e_vang.png",
              "sfSymbol": "heart",
              "symbol": "heart",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung2_dieu_em_uoc_ao",
            "id": "pb_khung2_dieu_em_uoc_ao",
            "name": "Điều Em Ước Ao",
            "category": "PhotoBooth 2 ảnh",
            "prompt": "pb_khung2_dieu_em_uoc_ao",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_dieu_em_uoc_ao.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_dieu_em_uoc_ao.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_dieu_em_uoc_ao.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung2_dieu_em_uoc_ao.png",
            "tintColor": "#B66ABB",
            "colors": [
              "#B66ABB",
              "#EAD4E9"
            ],
            "captureButtonColors": [
              "#B66ABB",
              "#EAD4E9"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung2_dieu_em_uoc_ao.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_dieu_em_uoc_ao.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung2_dieu_em_uoc_ao.png",
              "sfSymbol": "star.fill",
              "symbol": "star.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung2_thelove",
            "id": "pb_khung2_thelove",
            "name": "The Love Times",
            "category": "PhotoBooth 2 ảnh",
            "prompt": "pb_khung2_thelove",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thelove.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thelove.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thelove.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thelove.png",
            "tintColor": "#111111",
            "colors": [
              "#111111",
              "#EAEAEA"
            ],
            "captureButtonColors": [
              "#111111",
              "#EAEAEA"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thelove.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thelove.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thelove.png",
              "sfSymbol": "newspaper.fill",
              "symbol": "newspaper.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung2_outfit",
            "id": "pb_khung2_outfit",
            "name": "Outfit Check",
            "category": "PhotoBooth 2 ảnh",
            "prompt": "pb_khung2_outfit",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_outfit.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_outfit.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_outfit.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung2_outfit.png",
            "tintColor": "#2C2C2C",
            "colors": [
              "#2C2C2C",
              "#D8C6A3"
            ],
            "captureButtonColors": [
              "#2C2C2C",
              "#D8C6A3"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung2_outfit.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_outfit.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung2_outfit.png",
              "sfSymbol": "tshirt.fill",
              "symbol": "tshirt.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung2_thu_tinh",
            "id": "pb_khung2_thu_tinh",
            "name": "Thư Tình Ngọt Ngào",
            "category": "PhotoBooth 2 ảnh",
            "prompt": "pb_khung2_thu_tinh",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thu_tinh.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thu_tinh.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thu_tinh.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thu_tinh.png",
            "tintColor": "#F3C7CF",
            "colors": [
              "#F3C7CF",
              "#F8E4E8"
            ],
            "captureButtonColors": [
              "#F3C7CF",
              "#F8E4E8"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thu_tinh.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thu_tinh.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung2_thu_tinh.png",
              "sfSymbol": "envelope.fill",
              "symbol": "envelope.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung3_photo_iphone",
            "id": "pb_khung3_photo_iphone",
            "name": "Photo iPhone",
            "category": "PhotoBooth 3 ảnh",
            "prompt": "pb_khung3_photo_iphone",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_photo_iphone.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_photo_iphone.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_photo_iphone.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung3_photo_iphone.png",
            "tintColor": "#CAC9D2",
            "colors": [
              "#CAC9D2",
              "#EE7472"
            ],
            "captureButtonColors": [
              "#CAC9D2",
              "#EE7472"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung3_photo_iphone.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_photo_iphone.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung3_photo_iphone.png",
              "sfSymbol": "photo.on.rectangle.angled",
              "symbol": "photo.on.rectangle.angled",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung3_polaroid2",
            "id": "pb_khung3_polaroid2",
            "name": "Polaroid Kỷ Niệm",
            "category": "PhotoBooth 3 ảnh",
            "prompt": "pb_khung3_polaroid2",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_polaroid2.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_polaroid2.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_polaroid2.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung3_polaroid2.png",
            "tintColor": "#32312E",
            "colors": [
              "#32312E",
              "#B99A7F"
            ],
            "captureButtonColors": [
              "#32312E",
              "#B99A7F"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung3_polaroid2.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_polaroid2.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung3_polaroid2.png",
              "sfSymbol": "photo.stack.fill",
              "symbol": "photo.stack.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung3_fruit",
            "id": "pb_khung3_fruit",
            "name": "Hội Trái Cây",
            "category": "Khung 3 ảnh",
            "prompt": "pb_khung3_fruit",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_fruit.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_fruit.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_fruit.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung3_fruit.png",
            "tintColor": "#E97B91",
            "colors": [
              "#E97B91",
              "#B9D89F"
            ],
            "captureButtonColors": [
              "#E97B91",
              "#B9D89F"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung3_fruit.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_fruit.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung3_fruit.png",
              "sfSymbol": "face.smiling.fill",
              "symbol": "face.smiling.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung3_da_bao",
            "id": "pb_khung3_da_bao",
            "name": "Da Báo",
            "category": "PhotoBooth 3 ảnh",
            "prompt": "pb_khung3_da_bao",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_da_bao.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_da_bao.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_da_bao.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung3_da_bao.png",
            "tintColor": "#694C35",
            "colors": [
              "#694C35",
              "#8C2834"
            ],
            "captureButtonColors": [
              "#694C35",
              "#8C2834"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung3_da_bao.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_da_bao.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung3_da_bao.png",
              "sfSymbol": "camera.fill",
              "symbol": "camera.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung3_mothaiba",
            "id": "pb_khung3_mothaiba",
            "name": "Một Hai Ba",
            "category": "PhotoBooth 3 ảnh",
            "prompt": "pb_khung3_mothaiba",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_mothaiba.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_mothaiba.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_mothaiba.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung3_mothaiba.png",
            "tintColor": "#7296BE",
            "colors": [
              "#7296BE",
              "#EACAD8"
            ],
            "captureButtonColors": [
              "#7296BE",
              "#EACAD8"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung3_mothaiba.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_mothaiba.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung3_mothaiba.png",
              "sfSymbol": "camera.fill",
              "symbol": "camera.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung3_ngay_mai_tuoi_sang",
            "id": "pb_khung3_ngay_mai_tuoi_sang",
            "name": "Ngày Mai Tươi Sáng",
            "category": "PhotoBooth 3 ảnh",
            "prompt": "pb_khung3_ngay_mai_tuoi_sang",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_ngay_mai_tuoi_sang.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_ngay_mai_tuoi_sang.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_ngay_mai_tuoi_sang.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung3_ngay_mai_tuoi_sang.png",
            "tintColor": "#242424",
            "colors": [
              "#242424",
              "#D9D9D9"
            ],
            "captureButtonColors": [
              "#242424",
              "#D9D9D9"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung3_ngay_mai_tuoi_sang.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_ngay_mai_tuoi_sang.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung3_ngay_mai_tuoi_sang.png",
              "sfSymbol": "sun.max.fill",
              "symbol": "sun.max.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung3_memory",
            "id": "pb_khung3_memory",
            "name": "Memory Lane",
            "category": "PhotoBooth 3 ảnh",
            "prompt": "pb_khung3_memory",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_memory.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_memory.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_memory.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung3_memory.png",
            "tintColor": "#103020",
            "colors": [
              "#103020",
              "#508060"
            ],
            "captureButtonColors": [
              "#103020",
              "#508060"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung3_memory.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_memory.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung3_memory.png",
              "sfSymbol": "photo.on.rectangle",
              "symbol": "photo.on.rectangle",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung3_Vinyl",
            "id": "pb_khung3_Vinyl",
            "name": "Vinyl Memories 🎵",
            "category": "PhotoBooth 3 ảnh",
            "prompt": "pb_khung3_Vinyl",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_Vinyl.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_Vinyl.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_Vinyl.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung3_Vinyl.png",
            "tintColor": "#581C24",
            "colors": [
              "#581C24",
              "#A33A42"
            ],
            "captureButtonColors": [
              "#581C24",
              "#A33A42"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung3_Vinyl.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_Vinyl.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung3_Vinyl.png",
              "sfSymbol": "music.note",
              "symbol": "music.note",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung3_Polaroid",
            "id": "pb_khung3_Polaroid",
            "name": "Polaroid Nhật Ký 📸",
            "category": "PhotoBooth 3 ảnh",
            "prompt": "pb_khung3_Polaroid",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_Polaroid.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_Polaroid.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_Polaroid.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung3_Polaroid.png",
            "tintColor": "#DC2626",
            "colors": [
              "#DC2626",
              "#F5F5F5"
            ],
            "captureButtonColors": [
              "#DC2626",
              "#F5F5F5"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung3_Polaroid.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_Polaroid.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung3_Polaroid.png",
              "sfSymbol": "camera.fill",
              "symbol": "camera.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung3_photodump",
            "id": "pb_khung3_photodump",
            "name": "Photo Dump Hôm Nay ✨",
            "category": "PhotoBooth 3 ảnh",
            "prompt": "pb_khung3_photodump",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_photodump.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_photodump.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_photodump.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung3_photodump.png",
            "tintColor": "#C49A6C",
            "colors": [
              "#C49A6C",
              "#F5DEB3"
            ],
            "captureButtonColors": [
              "#C49A6C",
              "#F5DEB3"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung3_photodump.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_photodump.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung3_photodump.png",
              "sfSymbol": "photo.on.rectangle",
              "symbol": "photo.on.rectangle",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung3_hoi_ban_than",
            "id": "pb_khung3_hoi_ban_than",
            "name": "Hội Bạn Thân",
            "category": "PhotoBooth 3 ảnh",
            "prompt": "pb_khung3_hoi_ban_than",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_hoi_ban_than.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_hoi_ban_than.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_hoi_ban_than.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung3_hoi_ban_than.png",
            "tintColor": "#A0B060",
            "colors": [
              "#A0B060",
              "#F0C0C0"
            ],
            "captureButtonColors": [
              "#A0B060",
              "#F0C0C0"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung3_hoi_ban_than.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_hoi_ban_than.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung3_hoi_ban_than.png",
              "sfSymbol": "person.3.fill",
              "symbol": "person.3.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung3_hen_nha",
            "id": "pb_khung3_hen_nha",
            "name": "Hẹn Nhau Nha",
            "category": "PhotoBooth 3 ảnh",
            "prompt": "pb_khung3_hen_nha",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_hen_nha.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_hen_nha.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_hen_nha.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung3_hen_nha.png",
            "tintColor": "#E0B0B0",
            "colors": [
              "#E0B0B0",
              "#F0A0A0"
            ],
            "captureButtonColors": [
              "#E0B0B0",
              "#F0A0A0"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung3_hen_nha.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_hen_nha.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung3_hen_nha.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung3_love_so_much",
            "id": "pb_khung3_love_so_much",
            "name": "Love So Much",
            "category": "PhotoBooth 3 ảnh",
            "prompt": "pb_khung3_love_so_much",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_love_so_much.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_love_so_much.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_love_so_much.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung3_love_so_much.png",
            "tintColor": "#7A0010",
            "colors": [
              "#7A0010",
              "#C0182B"
            ],
            "captureButtonColors": [
              "#7A0010",
              "#C0182B"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung3_love_so_much.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung3_love_so_much.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung3_love_so_much.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_mona_lisa",
            "id": "pb_khung1_mona_lisa",
            "name": "Mona Lisa",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_mona_lisa",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_mona_lisa.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_mona_lisa.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_mona_lisa.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_mona_lisa.png",
            "tintColor": "#5D512B",
            "colors": [
              "#5D512B",
              "#B5A06A"
            ],
            "captureButtonColors": [
              "#5D512B",
              "#B5A06A"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_mona_lisa.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_mona_lisa.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_mona_lisa.png",
              "sfSymbol": "person.crop.rectangle.fill",
              "symbol": "person.crop.rectangle.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_locket_camera",
            "id": "pb_khung1_locket_camera",
            "name": "Locket Camera",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_locket_camera",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_locket_camera.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_locket_camera.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_locket_camera.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_locket_camera.png",
            "tintColor": "#202020",
            "colors": [
              "#202020",
              "#E7B439"
            ],
            "captureButtonColors": [
              "#202020",
              "#E7B439"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_locket_camera.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_locket_camera.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_locket_camera.png",
              "sfSymbol": "camera.fill",
              "symbol": "camera.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_spotifyPC",
            "id": "pb_khung1_spotifyPC",
            "name": "Spotify PC",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_spotifyPC",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_spotifyPC.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_spotifyPC.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_spotifyPC.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_spotifyPC.png",
            "tintColor": "#23282B",
            "colors": [
              "#23282B",
              "#22C55E"
            ],
            "captureButtonColors": [
              "#23282B",
              "#22C55E"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_spotifyPC.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_spotifyPC.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_spotifyPC.png",
              "sfSymbol": "music.note",
              "symbol": "music.note",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_spotify_hong",
            "id": "pb_khung1_spotify_hong",
            "name": "Spotify Hồng",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_spotify_hong",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_spotify_hong.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_spotify_hong.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_spotify_hong.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_spotify_hong.png",
            "tintColor": "#C83978",
            "colors": [
              "#C83978",
              "#F5A8CC"
            ],
            "captureButtonColors": [
              "#C83978",
              "#F5A8CC"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_spotify_hong.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_spotify_hong.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_spotify_hong.png",
              "sfSymbol": "music.note",
              "symbol": "music.note",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_camfuji",
            "id": "pb_khung1_camfuji",
            "name": "Fuji Film",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_camfuji",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_camfuji.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_camfuji.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_camfuji.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_camfuji.png",
            "tintColor": "#161616",
            "colors": [
              "#161616",
              "#EAA32B"
            ],
            "captureButtonColors": [
              "#161616",
              "#EAA32B"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_camfuji.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_camfuji.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_camfuji.png",
              "sfSymbol": "camera.fill",
              "symbol": "camera.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_messi",
            "id": "pb_khung1_messi",
            "name": "Messi Cúp",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_messi",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_messi.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_messi.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_messi.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_messi.png",
            "tintColor": "#258599",
            "colors": [
              "#258599",
              "#D5AF49"
            ],
            "captureButtonColors": [
              "#258599",
              "#D5AF49"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_messi.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_messi.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_messi.png",
              "sfSymbol": "trophy.fill",
              "symbol": "trophy.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_ronaldo_cup",
            "id": "pb_khung1_ronaldo_cup",
            "name": "Ronaldo Cúp",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_ronaldo_cup",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ronaldo_cup.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ronaldo_cup.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ronaldo_cup.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ronaldo_cup.png",
            "tintColor": "#A82432",
            "colors": [
              "#A82432",
              "#C8CED3"
            ],
            "captureButtonColors": [
              "#A82432",
              "#C8CED3"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ronaldo_cup.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ronaldo_cup.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ronaldo_cup.png",
              "sfSymbol": "trophy.fill",
              "symbol": "trophy.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_menu_ios",
            "id": "pb_khung1_menu_ios",
            "name": "Menu iOS",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_menu_ios",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_menu_ios.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_menu_ios.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_menu_ios.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_menu_ios.png",
            "tintColor": "#36343D",
            "colors": [
              "#36343D",
              "#96909F"
            ],
            "captureButtonColors": [
              "#36343D",
              "#96909F"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_menu_ios.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_menu_ios.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_menu_ios.png",
              "sfSymbol": "square.and.arrow.up",
              "symbol": "square.and.arrow.up",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung2_cuoi_vespa",
            "id": "pb_khung2_cuoi_vespa",
            "name": "Cưới Vespa",
            "category": "Khung 2 ảnh",
            "prompt": "pb_khung2_cuoi_vespa",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_cuoi_vespa.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_cuoi_vespa.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_cuoi_vespa.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung2_cuoi_vespa.png",
            "tintColor": "#159AAF",
            "colors": [
              "#159AAF",
              "#F5E4CB"
            ],
            "captureButtonColors": [
              "#159AAF",
              "#F5E4CB"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung2_cuoi_vespa.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung2_cuoi_vespa.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung2_cuoi_vespa.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_the_hinh",
            "id": "pb_khung1_the_hinh",
            "name": "Thể Hình 💪",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_the_hinh",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_the_hinh.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_the_hinh.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_the_hinh.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_the_hinh.png",
            "tintColor": "#6E4634",
            "colors": [
              "#6E4634",
              "#B58B6C"
            ],
            "captureButtonColors": [
              "#6E4634",
              "#B58B6C"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_the_hinh.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_the_hinh.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_the_hinh.png",
              "sfSymbol": "dumbbell.fill",
              "symbol": "dumbbell.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_iphone",
            "id": "pb_khung1_iphone",
            "name": "Now Playing",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_iphone",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_iphone.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_iphone.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_iphone.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_iphone.png",
            "tintColor": "#303A43",
            "colors": [
              "#303A43",
              "#9AA9B2"
            ],
            "captureButtonColors": [
              "#303A43",
              "#9AA9B2"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_iphone.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_iphone.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_iphone.png",
              "sfSymbol": "music.note",
              "symbol": "music.note",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_tivi",
            "id": "pb_khung1_tivi",
            "name": "Ký Ức Màn Hình",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_tivi",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_tivi.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_tivi.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_tivi.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_tivi.png",
            "tintColor": "#686962",
            "colors": [
              "#686962",
              "#CBC4AD"
            ],
            "captureButtonColors": [
              "#686962",
              "#CBC4AD"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_tivi.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_tivi.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_tivi.png",
              "sfSymbol": "tv.fill",
              "symbol": "tv.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_the_gioi_cua_2_ta",
            "id": "pb_khung1_the_gioi_cua_2_ta",
            "name": "Thế Giới Của Hai Ta",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_the_gioi_cua_2_ta",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_the_gioi_cua_2_ta.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_the_gioi_cua_2_ta.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_the_gioi_cua_2_ta.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_the_gioi_cua_2_ta.png",
            "tintColor": "#222222",
            "colors": [
              "#222222",
              "#E5E5E5"
            ],
            "captureButtonColors": [
              "#222222",
              "#E5E5E5"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_the_gioi_cua_2_ta.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_the_gioi_cua_2_ta.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_the_gioi_cua_2_ta.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_selflove",
            "id": "pb_khung1_selflove",
            "name": "Self Love Club",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_selflove",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_selflove.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_selflove.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_selflove.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_selflove.png",
            "tintColor": "#383530",
            "colors": [
              "#383530",
              "#DED6C8"
            ],
            "captureButtonColors": [
              "#383530",
              "#DED6C8"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_selflove.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_selflove.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_selflove.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_ptb",
            "id": "pb_khung1_ptb",
            "name": "MIXTAPE VOIL.1",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_ptb",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ptb.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ptb.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ptb.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ptb.png",
            "tintColor": "#222222",
            "colors": [
              "#222222",
              "#E5E5E5"
            ],
            "captureButtonColors": [
              "#222222",
              "#E5E5E5"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ptb.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ptb.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ptb.png",
              "sfSymbol": "music.note",
              "symbol": "music.note",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_oi_tinh_yeu",
            "id": "pb_khung1_oi_tinh_yeu",
            "name": "Ôi, Tình Yêu!",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_oi_tinh_yeu",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_oi_tinh_yeu.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_oi_tinh_yeu.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_oi_tinh_yeu.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_oi_tinh_yeu.png",
            "tintColor": "#90F000",
            "colors": [
              "#90F000",
              "#306000"
            ],
            "captureButtonColors": [
              "#90F000",
              "#306000"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_oi_tinh_yeu.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_oi_tinh_yeu.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_oi_tinh_yeu.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_card",
            "id": "pb_khung1_card",
            "name": "Thẻ Thanh Xuân",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_card",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_card.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_card.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_card.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_card.png",
            "tintColor": "#103060",
            "colors": [
              "#103060",
              "#4060A0"
            ],
            "captureButtonColors": [
              "#103060",
              "#4060A0"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_card.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_card.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_card.png",
              "sfSymbol": "person.crop.rectangle",
              "symbol": "person.crop.rectangle",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_love_e_nhiu",
            "id": "pb_khung1_love_e_nhiu",
            "name": "Love Em Nhiều",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_love_e_nhiu",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_love_e_nhiu.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_love_e_nhiu.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_love_e_nhiu.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_love_e_nhiu.png",
            "tintColor": "#E77C30",
            "colors": [
              "#E77C30",
              "#CA58B5"
            ],
            "captureButtonColors": [
              "#E77C30",
              "#CA58B5"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_love_e_nhiu.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_love_e_nhiu.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_love_e_nhiu.png",
              "sfSymbol": "heart.fill",
              "symbol": "heart.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_ki_niem_tuoi_dep",
            "id": "pb_khung1_ki_niem_tuoi_dep",
            "name": "Kỷ Niệm Tươi Đẹp",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_ki_niem_tuoi_dep",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ki_niem_tuoi_dep.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ki_niem_tuoi_dep.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ki_niem_tuoi_dep.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ki_niem_tuoi_dep.png",
            "tintColor": "#252525",
            "colors": [
              "#252525",
              "#DAD7CE"
            ],
            "captureButtonColors": [
              "#252525",
              "#DAD7CE"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ki_niem_tuoi_dep.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ki_niem_tuoi_dep.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ki_niem_tuoi_dep.png",
              "sfSymbol": "photo.on.rectangle",
              "symbol": "photo.on.rectangle",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_ins",
            "id": "pb_khung1_ins",
            "name": "Instagram Moments",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_ins",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ins.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ins.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ins.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ins.png",
            "tintColor": "#343434",
            "colors": [
              "#343434",
              "#F05B65"
            ],
            "captureButtonColors": [
              "#343434",
              "#F05B65"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ins.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ins.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_ins.png",
              "sfSymbol": "camera.fill",
              "symbol": "camera.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_hoi_chieu_troi_mua",
            "id": "pb_khung1_hoi_chieu_troi_mua",
            "name": "Hồi Chiều Trời Mưa",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_hoi_chieu_troi_mua",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_hoi_chieu_troi_mua.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_hoi_chieu_troi_mua.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_hoi_chieu_troi_mua.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_hoi_chieu_troi_mua.png",
            "tintColor": "#C02030",
            "colors": [
              "#C02030",
              "#E0D0B0"
            ],
            "captureButtonColors": [
              "#C02030",
              "#E0D0B0"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_hoi_chieu_troi_mua.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_hoi_chieu_troi_mua.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_hoi_chieu_troi_mua.png",
              "sfSymbol": "cloud.rain.fill",
              "symbol": "cloud.rain.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_dia",
            "id": "pb_khung1_dia",
            "name": "Chiếc Đĩa Kỷ Niệm",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_dia",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_dia.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_dia.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_dia.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_dia.png",
            "tintColor": "#8B641E",
            "colors": [
              "#8B641E",
              "#D4C6A1"
            ],
            "captureButtonColors": [
              "#8B641E",
              "#D4C6A1"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_dia.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_dia.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_dia.png",
              "sfSymbol": "opticaldisc",
              "symbol": "opticaldisc",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_chuong_cuoi",
            "id": "pb_khung1_chuong_cuoi",
            "name": "Chương Cuối Thanh Xuân",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_chuong_cuoi",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_chuong_cuoi.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_chuong_cuoi.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_chuong_cuoi.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_chuong_cuoi.png",
            "tintColor": "#515151",
            "colors": [
              "#515151",
              "#D1D1D1"
            ],
            "captureButtonColors": [
              "#515151",
              "#D1D1D1"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_chuong_cuoi.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_chuong_cuoi.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_chuong_cuoi.png",
              "sfSymbol": "book.closed.fill",
              "symbol": "book.closed.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_maytinh",
            "id": "pb_khung1_maytinh",
            "name": "Màn Hình Hoài Niệm",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_maytinh",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_maytinh.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_maytinh.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_maytinh.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_maytinh.png",
            "tintColor": "#706050",
            "colors": [
              "#706050",
              "#C0A080"
            ],
            "captureButtonColors": [
              "#706050",
              "#C0A080"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_maytinh.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_maytinh.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_maytinh.png",
              "sfSymbol": "desktopcomputer",
              "symbol": "desktopcomputer",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_mat_tin_hieu",
            "id": "pb_khung1_mat_tin_hieu",
            "name": "No Signal",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_mat_tin_hieu",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_mat_tin_hieu.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_mat_tin_hieu.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_mat_tin_hieu.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_mat_tin_hieu.png",
            "tintColor": "#402060",
            "colors": [
              "#402060",
              "#8050B0"
            ],
            "captureButtonColors": [
              "#402060",
              "#8050B0"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_mat_tin_hieu.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_mat_tin_hieu.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_mat_tin_hieu.png",
              "sfSymbol": "antenna.radiowaves.left.and.right",
              "symbol": "antenna.radiowaves.left.and.right",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_Camera_iPhone",
            "id": "pb_khung1_Camera_iPhone",
            "name": "Camera iPhone",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_Camera_iPhone",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_Camera_iPhone.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_Camera_iPhone.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_Camera_iPhone.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_Camera_iPhone.png",
            "tintColor": "#7A1F1F",
            "colors": [
              "#7A1F1F",
              "#C84B4B"
            ],
            "captureButtonColors": [
              "#7A1F1F",
              "#C84B4B"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_Camera_iPhone.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_Camera_iPhone.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_Camera_iPhone.png",
              "sfSymbol": "camera.fill",
              "symbol": "camera.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_khong_buong",
            "id": "pb_khung1_khong_buong",
            "name": "Không Buông",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_khong_buong",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_khong_buong.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_khong_buong.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_khong_buong.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_khong_buong.png",
            "tintColor": "#355C7D",
            "colors": [
              "#355C7D",
              "#6C8FA8"
            ],
            "captureButtonColors": [
              "#355C7D",
              "#6C8FA8"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_khong_buong.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_khong_buong.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_khong_buong.png",
              "sfSymbol": "music.note",
              "symbol": "music.note",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "weekday_depth",
            "id": "weekday_depth",
            "name": "Thứ Sau Chủ Thể",
            "category": "Trend",
            "prompt": "weekday_depth",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/weekday_depth.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/weekday_depth.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/weekday_depth.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/weekday_depth.png",
            "tintColor": "#243B53",
            "colors": [
              "#243B53",
              "#FFFFFF"
            ],
            "captureButtonColors": [
              "#243B53",
              "#FFFFFF"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/weekday_depth.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/weekday_depth.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/weekday_depth.png",
              "sfSymbol": "calendar",
              "symbol": "calendar",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_chua_som",
            "id": "pb_khung1_chua_som",
            "name": "Chửa Sớm",
            "category": "Trend",
            "prompt": "pb_khung1_chua_som",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_chua_som.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_chua_som.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_chua_som.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_chua_som.png",
            "tintColor": "#252525",
            "colors": [
              "#252525",
              "#D8C6B1"
            ],
            "captureButtonColors": [
              "#252525",
              "#D8C6B1"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_chua_som.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_chua_som.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_chua_som.png",
              "sfSymbol": "text.bubble.fill",
              "symbol": "text.bubble.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "trend_bang_tin_khan",
            "id": "trend_bang_tin_khan",
            "name": "Bảng Tin Khẩn",
            "category": "Khung 1 ảnh",
            "prompt": "trend_bang_tin_khan",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/trend_bang_tin_khan.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_bang_tin_khan.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/trend_bang_tin_khan.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/trend_bang_tin_khan.png",
            "tintColor": "#D62828",
            "colors": [
              "#D62828",
              "#1D4ED8"
            ],
            "captureButtonColors": [
              "#D62828",
              "#1D4ED8"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/trend_bang_tin_khan.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_bang_tin_khan.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/trend_bang_tin_khan.png",
              "sfSymbol": "newspaper.fill",
              "symbol": "newspaper.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "trend_ve_giu_xe",
            "id": "trend_ve_giu_xe",
            "name": "Vé Gửi Xe",
            "category": "Khung 1 ảnh",
            "prompt": "trend_ve_giu_xe",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/trend_ve_giu_xe.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_ve_giu_xe.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/trend_ve_giu_xe.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/trend_ve_giu_xe.png",
            "tintColor": "#6F8750",
            "colors": [
              "#6F8750",
              "#CDDAB6"
            ],
            "captureButtonColors": [
              "#6F8750",
              "#CDDAB6"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/trend_ve_giu_xe.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_ve_giu_xe.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/trend_ve_giu_xe.png",
              "sfSymbol": "car.fill",
              "symbol": "car.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "trend_vo_hoc_sinh",
            "id": "trend_vo_hoc_sinh",
            "name": "Vở Học Sinh",
            "category": "Khung 1 ảnh",
            "prompt": "trend_vo_hoc_sinh",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/trend_vo_hoc_sinh.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_vo_hoc_sinh.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/trend_vo_hoc_sinh.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/trend_vo_hoc_sinh.png",
            "tintColor": "#D94742",
            "colors": [
              "#D94742",
              "#E9C85E"
            ],
            "captureButtonColors": [
              "#D94742",
              "#E9C85E"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/trend_vo_hoc_sinh.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_vo_hoc_sinh.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/trend_vo_hoc_sinh.png",
              "sfSymbol": "book.closed.fill",
              "symbol": "book.closed.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "trend_giao_vien_cham_bai",
            "id": "trend_giao_vien_cham_bai",
            "name": "Giáo Viên Chấm Bài",
            "category": "Khung 1 ảnh",
            "prompt": "trend_giao_vien_cham_bai",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/trend_giao_vien_cham_bai.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_giao_vien_cham_bai.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/trend_giao_vien_cham_bai.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/trend_giao_vien_cham_bai.png",
            "tintColor": "#C83232",
            "colors": [
              "#C83232",
              "#F2C7BD"
            ],
            "captureButtonColors": [
              "#C83232",
              "#F2C7BD"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/trend_giao_vien_cham_bai.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_giao_vien_cham_bai.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/trend_giao_vien_cham_bai.png",
              "sfSymbol": "pencil",
              "symbol": "pencil",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "trend_nhiem_vu_hom_nay_la",
            "id": "trend_nhiem_vu_hom_nay_la",
            "name": "Nhiệm Vụ Hôm Nay",
            "category": "Khung 1 ảnh",
            "prompt": "trend_nhiem_vu_hom_nay_la",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/trend_nhiem_vu_hom_nay_la.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_nhiem_vu_hom_nay_la.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/trend_nhiem_vu_hom_nay_la.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/trend_nhiem_vu_hom_nay_la.png",
            "tintColor": "#65846A",
            "colors": [
              "#65846A",
              "#F0E3CC"
            ],
            "captureButtonColors": [
              "#65846A",
              "#F0E3CC"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/trend_nhiem_vu_hom_nay_la.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_nhiem_vu_hom_nay_la.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/trend_nhiem_vu_hom_nay_la.png",
              "sfSymbol": "checkmark.square.fill",
              "symbol": "checkmark.square.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "trend_hoa_don_di_choi",
            "id": "trend_hoa_don_di_choi",
            "name": "Hóa Đơn Đi Chơi",
            "category": "Khung 1 ảnh",
            "prompt": "trend_hoa_don_di_choi",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/trend_hoa_don_di_choi.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_hoa_don_di_choi.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/trend_hoa_don_di_choi.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/trend_hoa_don_di_choi.png",
            "tintColor": "#A67C52",
            "colors": [
              "#A67C52",
              "#E5E7EB"
            ],
            "captureButtonColors": [
              "#A67C52",
              "#E5E7EB"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/trend_hoa_don_di_choi.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_hoa_don_di_choi.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/trend_hoa_don_di_choi.png",
              "sfSymbol": "doc.text.fill",
              "symbol": "doc.text.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "trend_binh_luan_duoc_ghim",
            "id": "trend_binh_luan_duoc_ghim",
            "name": "Bình Luận Được Ghim",
            "category": "Khung 1 ảnh",
            "prompt": "trend_binh_luan_duoc_ghim",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/trend_binh_luan_duoc_ghim.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_binh_luan_duoc_ghim.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/trend_binh_luan_duoc_ghim.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/trend_binh_luan_duoc_ghim.png",
            "tintColor": "#9CA3AF",
            "colors": [
              "#9CA3AF",
              "#111827"
            ],
            "captureButtonColors": [
              "#9CA3AF",
              "#111827"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/trend_binh_luan_duoc_ghim.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_binh_luan_duoc_ghim.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/trend_binh_luan_duoc_ghim.png",
              "sfSymbol": "pin.fill",
              "symbol": "pin.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "trend_camera_an_ninh",
            "id": "trend_camera_an_ninh",
            "name": "Camera An Ninh",
            "category": "Khung 1 ảnh",
            "prompt": "trend_camera_an_ninh",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/trend_camera_an_ninh.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_camera_an_ninh.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/trend_camera_an_ninh.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/trend_camera_an_ninh.png",
            "tintColor": "#374151",
            "colors": [
              "#374151",
              "#EF4444"
            ],
            "captureButtonColors": [
              "#374151",
              "#EF4444"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/trend_camera_an_ninh.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_camera_an_ninh.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/trend_camera_an_ninh.png",
              "sfSymbol": "video.fill",
              "symbol": "video.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "trend_thong_bao_ngan_hang",
            "id": "trend_thong_bao_ngan_hang",
            "name": "Thông Báo Ngân Hàng",
            "category": "Khung 1 ảnh",
            "prompt": "trend_thong_bao_ngan_hang",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/trend_thong_bao_ngan_hang.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_thong_bao_ngan_hang.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/trend_thong_bao_ngan_hang.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/trend_thong_bao_ngan_hang.png",
            "tintColor": "#16A34A",
            "colors": [
              "#16A34A",
              "#E5E7EB"
            ],
            "captureButtonColors": [
              "#16A34A",
              "#E5E7EB"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/trend_thong_bao_ngan_hang.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_thong_bao_ngan_hang.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/trend_thong_bao_ngan_hang.png",
              "sfSymbol": "creditcard.fill",
              "symbol": "creditcard.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "trend_chat_nhom_leak",
            "id": "trend_chat_nhom_leak",
            "name": "Chat Nhóm Leak",
            "category": "Khung 1 ảnh",
            "prompt": "trend_chat_nhom_leak",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/trend_chat_nhom_leak.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_chat_nhom_leak.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/trend_chat_nhom_leak.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/trend_chat_nhom_leak.png",
            "tintColor": "#1559E8",
            "colors": [
              "#1559E8",
              "#D5E3FF"
            ],
            "captureButtonColors": [
              "#1559E8",
              "#D5E3FF"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/trend_chat_nhom_leak.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/trend_chat_nhom_leak.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/trend_chat_nhom_leak.png",
              "sfSymbol": "bubble.left.and.bubble.right.fill",
              "symbol": "bubble.left.and.bubble.right.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_thu_tinh",
            "id": "pb_khung1_thu_tinh",
            "name": "Thư Tình Gửi Cậu 💌",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_thu_tinh",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_thu_tinh.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_thu_tinh.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_thu_tinh.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_thu_tinh.png",
            "tintColor": "#E8A9B5",
            "colors": [
              "#E8A9B5",
              "#F8D9D9"
            ],
            "captureButtonColors": [
              "#E8A9B5",
              "#F8D9D9"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_thu_tinh.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_thu_tinh.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_thu_tinh.png",
              "sfSymbol": "envelope.fill",
              "symbol": "envelope.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_cute",
            "id": "pb_khung1_cute",
            "name": "Cute Hết Cứu 🎀",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_cute",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_cute.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_cute.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_cute.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_cute.png",
            "tintColor": "#FF9BCB",
            "colors": [
              "#FF9BCB",
              "#F9D5EA"
            ],
            "captureButtonColors": [
              "#FF9BCB",
              "#F9D5EA"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_cute.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_cute.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_cute.png",
              "sfSymbol": "sparkles",
              "symbol": "sparkles",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_anh_tho",
            "id": "pb_khung1_anh_tho",
            "name": "Ảnh Thờ 🤡",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_anh_tho",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_anh_tho.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_anh_tho.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_anh_tho.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_anh_tho.png",
            "tintColor": "#C78B38",
            "colors": [
              "#C78B38",
              "#E5B96E"
            ],
            "captureButtonColors": [
              "#C78B38",
              "#E5B96E"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_anh_tho.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_anh_tho.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_anh_tho.png",
              "sfSymbol": "photo",
              "symbol": "photo",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_matmoc",
            "id": "pb_khung1_matmoc",
            "name": "Mặt Mộc 🤪",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_matmoc",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_matmoc.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_matmoc.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_matmoc.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_matmoc.png",
            "tintColor": "#383538",
            "colors": [
              "#383538",
              "#C4A374"
            ],
            "captureButtonColors": [
              "#383538",
              "#C4A374"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_matmoc.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_matmoc.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_matmoc.png",
              "sfSymbol": "person.fill",
              "symbol": "person.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "pb_khung1_luffy",
            "id": "pb_khung1_luffy",
            "name": "Truy Nã",
            "category": "Khung 1 ảnh",
            "prompt": "pb_khung1_luffy",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_luffy.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_luffy.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_luffy.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/frames/pb_khung1_luffy.png",
            "tintColor": "#D9C3A7",
            "colors": [
              "#D9C3A7",
              "#FFF1D8"
            ],
            "captureButtonColors": [
              "#D9C3A7",
              "#FFF1D8"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/frames/pb_khung1_luffy.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/frames/pb_khung1_luffy.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/frames/pb_khung1_luffy.png",
              "sfSymbol": "flag.fill",
              "symbol": "flag.fill",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photo_effect_co_dien",
            "id": "photo_effect_co_dien",
            "name": "Nâu Cổ Điển",
            "category": "Camera Filters",
            "prompt": "photo_effect_co_dien",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_co_dien.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_co_dien.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_co_dien.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_co_dien.png",
            "tintColor": "#8B5E3C",
            "colors": [
              "#8B5E3C",
              "#D6B990"
            ],
            "captureButtonColors": [
              "#8B5E3C",
              "#D6B990"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_co_dien.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_co_dien.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_co_dien.png",
              "sfSymbol": "camera.filters",
              "symbol": "camera.filters",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photo_effect_dem_xanh",
            "id": "photo_effect_dem_xanh",
            "name": "Đêm Xanh",
            "category": "Camera Filters",
            "prompt": "photo_effect_dem_xanh",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_dem_xanh.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_dem_xanh.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_dem_xanh.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_dem_xanh.png",
            "tintColor": "#172554",
            "colors": [
              "#172554",
              "#3B82A6"
            ],
            "captureButtonColors": [
              "#172554",
              "#3B82A6"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_dem_xanh.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_dem_xanh.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_dem_xanh.png",
              "sfSymbol": "camera.filters",
              "symbol": "camera.filters",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photo_effect_film",
            "id": "photo_effect_film",
            "name": "Film 35mm",
            "category": "Camera Filters",
            "prompt": "photo_effect_film",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_film.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_film.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_film.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_film.png",
            "tintColor": "#777B68",
            "colors": [
              "#777B68",
              "#E1CFAD"
            ],
            "captureButtonColors": [
              "#777B68",
              "#E1CFAD"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_film.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_film.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_film.png",
              "sfSymbol": "camera.filters",
              "symbol": "camera.filters",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photo_effect_matte",
            "id": "photo_effect_matte",
            "name": "Xám Matte",
            "category": "Camera Filters",
            "prompt": "photo_effect_matte",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_matte.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_matte.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_matte.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_matte.png",
            "tintColor": "#74706D",
            "colors": [
              "#74706D",
              "#B7AEA5"
            ],
            "captureButtonColors": [
              "#74706D",
              "#B7AEA5"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_matte.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_matte.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_matte.png",
              "sfSymbol": "camera.filters",
              "symbol": "camera.filters",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photo_effect_nhat",
            "id": "photo_effect_nhat",
            "name": "Tông Phai",
            "category": "Camera Filters",
            "prompt": "photo_effect_nhat",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_nhat.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_nhat.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_nhat.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_nhat.png",
            "tintColor": "#B7A99F",
            "colors": [
              "#B7A99F",
              "#E7DDD5"
            ],
            "captureButtonColors": [
              "#B7A99F",
              "#E7DDD5"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_nhat.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_nhat.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_nhat.png",
              "sfSymbol": "camera.filters",
              "symbol": "camera.filters",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photo_effect_pastel",
            "id": "photo_effect_pastel",
            "name": "Pastel Dịu",
            "category": "Camera Filters",
            "prompt": "photo_effect_pastel",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_pastel.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_pastel.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_pastel.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_pastel.png",
            "tintColor": "#F2B9CF",
            "colors": [
              "#F2B9CF",
              "#C7C3F3"
            ],
            "captureButtonColors": [
              "#F2B9CF",
              "#C7C3F3"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_pastel.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_pastel.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_pastel.png",
              "sfSymbol": "camera.filters",
              "symbol": "camera.filters",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photo_effect_teal_va_cam",
            "id": "photo_effect_teal_va_cam",
            "name": "Xanh Teal & Cam",
            "category": "Camera Filters",
            "prompt": "photo_effect_teal_va_cam",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_teal_va_cam.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_teal_va_cam.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_teal_va_cam.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_teal_va_cam.png",
            "tintColor": "#0F766E",
            "colors": [
              "#0F766E",
              "#F59E42"
            ],
            "captureButtonColors": [
              "#0F766E",
              "#F59E42"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_teal_va_cam.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_teal_va_cam.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_teal_va_cam.png",
              "sfSymbol": "camera.filters",
              "symbol": "camera.filters",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photo_effect_trang_den",
            "id": "photo_effect_trang_den",
            "name": "Trắng Đen",
            "category": "Camera Filters",
            "prompt": "photo_effect_trang_den",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_trang_den.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_trang_den.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_trang_den.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_trang_den.png",
            "tintColor": "#222222",
            "colors": [
              "#222222",
              "#E5E5E5"
            ],
            "captureButtonColors": [
              "#222222",
              "#E5E5E5"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_trang_den.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_trang_den.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_trang_den.png",
              "sfSymbol": "camera.filters",
              "symbol": "camera.filters",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photo_effect_tuong_phan",
            "id": "photo_effect_tuong_phan",
            "name": "Tương Phản Cao",
            "category": "Camera Filters",
            "prompt": "photo_effect_tuong_phan",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_tuong_phan.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_tuong_phan.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_tuong_phan.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_tuong_phan.png",
            "tintColor": "#292524",
            "colors": [
              "#292524",
              "#F5E8D5"
            ],
            "captureButtonColors": [
              "#292524",
              "#F5E8D5"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_tuong_phan.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_tuong_phan.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_tuong_phan.png",
              "sfSymbol": "camera.filters",
              "symbol": "camera.filters",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photo_effect_am_ap",
            "id": "photo_effect_am_ap",
            "name": "Nắng Ấm",
            "category": "Camera Filters",
            "prompt": "photo_effect_am_ap",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_am_ap.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_am_ap.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_am_ap.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_am_ap.png",
            "tintColor": "#D97745",
            "colors": [
              "#D97745",
              "#F9C784"
            ],
            "captureButtonColors": [
              "#D97745",
              "#F9C784"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_am_ap.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_am_ap.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_am_ap.png",
              "sfSymbol": "camera.filters",
              "symbol": "camera.filters",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photo_effect_mat_lanh",
            "id": "photo_effect_mat_lanh",
            "name": "Xanh Mát Lạnh",
            "category": "Camera Filters",
            "prompt": "photo_effect_mat_lanh",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_mat_lanh.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_mat_lanh.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_mat_lanh.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_mat_lanh.png",
            "tintColor": "#4D83A8",
            "colors": [
              "#4D83A8",
              "#BCE4EF"
            ],
            "captureButtonColors": [
              "#4D83A8",
              "#BCE4EF"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_mat_lanh.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_mat_lanh.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_mat_lanh.png",
              "sfSymbol": "camera.filters",
              "symbol": "camera.filters",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photo_effect_am_mat_ong",
            "id": "photo_effect_am_mat_ong",
            "name": "Vàng Mật Ong",
            "category": "Camera Filters",
            "prompt": "photo_effect_am_mat_ong",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_am_mat_ong.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_am_mat_ong.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_am_mat_ong.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_am_mat_ong.png",
            "tintColor": "#B6946F",
            "colors": [
              "#B6946F",
              "#EFDBC2"
            ],
            "captureButtonColors": [
              "#B6946F",
              "#EFDBC2"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_am_mat_ong.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_am_mat_ong.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_am_mat_ong.png",
              "sfSymbol": "camera.filters",
              "symbol": "camera.filters",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photo_effect_blue_hour",
            "id": "photo_effect_blue_hour",
            "name": "Blue Hour",
            "category": "Camera Filters",
            "prompt": "photo_effect_blue_hour",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_blue_hour.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_blue_hour.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_blue_hour.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_blue_hour.png",
            "tintColor": "#616D9E",
            "colors": [
              "#616D9E",
              "#BEC7E8"
            ],
            "captureButtonColors": [
              "#616D9E",
              "#BEC7E8"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_blue_hour.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_blue_hour.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_blue_hour.png",
              "sfSymbol": "camera.filters",
              "symbol": "camera.filters",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photo_effect_film_nau",
            "id": "photo_effect_film_nau",
            "name": "Film Nâu",
            "category": "Camera Filters",
            "prompt": "photo_effect_film_nau",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_film_nau.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_film_nau.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_film_nau.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_film_nau.png",
            "tintColor": "#694733",
            "colors": [
              "#694733",
              "#BF9470"
            ],
            "captureButtonColors": [
              "#694733",
              "#BF9470"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_film_nau.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_film_nau.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_film_nau.png",
              "sfSymbol": "camera.filters",
              "symbol": "camera.filters",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photo_effect_hong_milk",
            "id": "photo_effect_hong_milk",
            "name": "Hồng Sữa",
            "category": "Camera Filters",
            "prompt": "photo_effect_hong_milk",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_hong_milk.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_hong_milk.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_hong_milk.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_hong_milk.png",
            "tintColor": "#E9A2B8",
            "colors": [
              "#E9A2B8",
              "#FCE2E9"
            ],
            "captureButtonColors": [
              "#E9A2B8",
              "#FCE2E9"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_hong_milk.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_hong_milk.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_hong_milk.png",
              "sfSymbol": "camera.filters",
              "symbol": "camera.filters",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photo_effect_lo_sang_film",
            "id": "photo_effect_lo_sang_film",
            "name": "Film Lộ Sáng",
            "category": "Camera Filters",
            "prompt": "photo_effect_lo_sang_film",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_lo_sang_film.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_lo_sang_film.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_lo_sang_film.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_lo_sang_film.png",
            "tintColor": "#E46D45",
            "colors": [
              "#E46D45",
              "#FFD286"
            ],
            "captureButtonColors": [
              "#E46D45",
              "#FFD286"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_lo_sang_film.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_lo_sang_film.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_lo_sang_film.png",
              "sfSymbol": "camera.filters",
              "symbol": "camera.filters",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photo_effect_matcha",
            "id": "photo_effect_matcha",
            "name": "Xanh Matcha",
            "category": "Camera Filters",
            "prompt": "photo_effect_matcha",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_matcha.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_matcha.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_matcha.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_matcha.png",
            "tintColor": "#71854B",
            "colors": [
              "#71854B",
              "#C6D5A0"
            ],
            "captureButtonColors": [
              "#71854B",
              "#C6D5A0"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_matcha.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_matcha.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_matcha.png",
              "sfSymbol": "camera.filters",
              "symbol": "camera.filters",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photo_effect_tim_y2k",
            "id": "photo_effect_tim_y2k",
            "name": "Tím Y2K",
            "category": "Camera Filters",
            "prompt": "photo_effect_tim_y2k",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_tim_y2k.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_tim_y2k.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_tim_y2k.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_tim_y2k.png",
            "tintColor": "#8B5CF6",
            "colors": [
              "#8B5CF6",
              "#E7B5FF"
            ],
            "captureButtonColors": [
              "#8B5CF6",
              "#E7B5FF"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_tim_y2k.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_tim_y2k.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_tim_y2k.png",
              "sfSymbol": "camera.filters",
              "symbol": "camera.filters",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          },
          {
            "uid": "photo_effect_xanh_film",
            "id": "photo_effect_xanh_film",
            "name": "Xanh Film",
            "category": "Camera Filters",
            "prompt": "photo_effect_xanh_film",
            "style": "cutout",
            "type": "normal",
            "filterType": "cutout",
            "overlay": true,
            "imageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_xanh_film.png",
            "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_xanh_film.png",
            "overlayImageUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_xanh_film.png",
            "overlayImageURL": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_xanh_film.png",
            "tintColor": "#50828B",
            "colors": [
              "#50828B",
              "#B5D9D5"
            ],
            "captureButtonColors": [
              "#50828B",
              "#B5D9D5"
            ],
            "icon": {
              "url": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_xanh_film.png",
              "iconUrl": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_xanh_film.png",
              "remoteImage": "https://hnyb05-locket.vercel.app/filter-icons/photo_effect_xanh_film.png",
              "sfSymbol": "camera.filters",
              "symbol": "camera.filters",
              "emoji": ""
            },
            "outputUrl": null,
            "productUrl": null,
            "textColor": "#FFFFFF",
            "referenceImages": []
          }
        ]
      },
      "capture_classification_config": {
        "detection": true,
        "debug_caption": false,
        "expanded_sheet_legacy_support": true,
        "display_reaction_suggestions": true
      },
      "friend_limit_geo_override": {
        "experiments": {},
        "area_code_overrides": {}
      },
      "friends_sheet_locket_count_config": {
        "items": [
          {
            "threshold": 0,
            "icon_name": "heart"
          },
          {
            "threshold": 1,
            "icon_name": "heart.fill"
          },
          {
            "threshold": 10,
            "emoji": "🤍"
          },
          {
            "threshold": 100,
            "emoji": "💛"
          },
          {
            "threshold": 500,
            "emoji": "❤️‍🔥"
          },
          {
            "threshold": 1000,
            "emoji": "🌟🫶🌟"
          },
          {
            "threshold": 2000,
            "emoji": "✨💟✨"
          },
          {
            "threshold": 5000,
            "emoji": "⚡️😵‍💫⚡"
          },
          {
            "threshold": 10000,
            "emoji": "✨⚡️😱⚡✨"
          }
        ]
      },
      "friend_locket_count_config": {
        "items": [
          {
            "threshold": 0,
            "icon_name": "heart"
          },
          {
            "threshold": 1,
            "icon_name": "heart.fill"
          },
          {
            "threshold": 10,
            "emoji": "🤍"
          },
          {
            "threshold": 100,
            "emoji": "💛"
          },
          {
            "threshold": 500,
            "emoji": "❤️‍🔥"
          },
          {
            "threshold": 1000,
            "emoji": "✨💗✨"
          },
          {
            "threshold": 2000,
            "emoji": "✨️⭐️✨"
          },
          {
            "threshold": 5000,
            "emoji": "✨💎✨"
          },
          {
            "threshold": 10000,
            "emoji": "✨🔐💛✨"
          }
        ]
      },
      "daily_reminder_config": {
        "is_time_sensitive": true,
        "items": [
          {
            "day": 1,
            "title_string": {
              "en": "Vô chụp Locket đi ba 💛"
            },
            "streak_body_string": {
              "en": "Lên hình giữ chuỗi ngày đi nào • 🔥#streak#"
            },
            "body_string": {
              "en": "Chụp một phát cho bạn bè lác mắt ⭐️"
            },
            "body_string_plural": {
              "en": "Chụp một phát cho bạn bè lác mắt ⭐️"
            }
          },
          {
            "day": 3,
            "hour": 10,
            "title_string": {
              "en": "Này, nhớ bạn bè không vậy? 💛"
            },
            "body_string": {
              "en": "Gửi cho họ một phát bất ngờ đi! Đã #day# ngày rồi đó."
            },
            "body_string_plural": {
              "en": "Gửi cho họ một phát bất ngờ đi! Đã #day# ngày rồi đó."
            }
          },
          {
            "day": 7,
            "hour": 19,
            "title_string": {
              "en": "Bạn bè đang ngóng mày kìa 💛"
            },
            "body_string": {
              "en": "Họ thương mày lắm đó. Đã #day# ngày rồi."
            },
            "body_string_plural": {
              "en": "Họ thương mày lắm đó. Đã #day# ngày rồi."
            }
          },
          {
            "day": 14,
            "hour": 10,
            "title_string": {
              "en": "Lâu rồi đó nha, chụp đi 💛"
            },
            "body_string": {
              "en": "Đã #day# ngày rồi! Không sài thì xoá app đi 🫶"
            },
            "body_string_plural": {
              "en": "Đã #day# ngày rồi! Không sài thì xoá app đi 🫶"
            }
          }
        ]
      },
      "group_scrapbook_config": {
        "enabled": true,
        "moment_limit": 999999999,
        "default_layout": {
          "show_member_joined": true,
          "parallax_percentage": 50,
          "is_device_tilt_enabled": false,
          "cutout_percentage": 100
        },
        "photos_button_enabled": true
      },
      "journal_settings": {
        "debug_menu_enabled": false,
        "focus_animation": false,
        "compact_header": true,
        "friends_button": false,
        "reverse_scroll_direction": false,
        "streak_visualization": true,
        "streak_visualization_style": "gradient",
        "streak_header_minimum_count": 0,
        "streak_visualization_minimum_count": 2,
        "overlay_indicators": {
          "location": false,
          "music": true,
          "static_content": true,
          "weather": true
        }
      },
      "qr_code_config": {
        "profile_enabled": true,
        "scanning_enabled": true
      },
      "birthday_feature_config": {
        "profile_menu": true,
        "prompt_interval": 1209600,
        "show_frame": true
      },
      "calendar_friend_birthdays": {
        "fetching": true,
        "calendar_display": true,
        "feature_popup": true,
        "settings_visibility_toggle_enabled": true,
        "fetch_ttl_seconds": 86400
      },
      "cdn_domain_replacements": {
        "firebasestorage.googleapis.com": "cdn.locketcamera.com"
      },
      "share_history_config": {
        "prompt_enabled": false,
        "fetching_enabled": true
      },
      "overlays_v2_config": {
        "suggestions_enabled": true
      },
      "overlay_dynamic_captions": [
        "standard",
        "poll",
        "color_palette",
        "review",
        "music",
        "location",
        "weather",
        "time",
        "streak",
        "star_sign",
        "party_time",
        "locket_count",
        "good_morning",
        "goodnight",
        "ootd",
        "miss_you",
        "custom",
        "halloween_2026"
      ],
      "overlay_items": [
        {
          "section": "🎨 General",
          "items": [
            {
              "overlay_id": "caption:standard",
              "source": "local",
              "caption": {
                "type": "standard"
              },
              "sort_order": 0
            },
            {
              "overlay_id": "caption:poll",
              "source": "local",
              "caption": {
                "type": "poll"
              },
              "sort_order": 1
            },
            {
              "overlay_id": "caption:color_palette",
              "source": "local",
              "caption": {
                "type": "color_palette"
              },
              "sort_order": 2
            },
            {
              "overlay_id": "caption:review",
              "source": "local",
              "caption": {
                "type": "review"
              },
              "sort_order": 3
            },
            {
              "overlay_id": "caption:music",
              "source": "local",
              "caption": {
                "type": "music"
              },
              "sort_order": 4
            },
            {
              "overlay_id": "caption:location",
              "source": "local",
              "caption": {
                "type": "location"
              },
              "sort_order": 5
            },
            {
              "overlay_id": "caption:weather",
              "source": "local",
              "caption": {
                "type": "weather"
              },
              "sort_order": 6
            },
            {
              "overlay_id": "caption:time",
              "source": "local",
              "caption": {
                "type": "time"
              },
              "sort_order": 7
            },
            {
              "overlay_id": "caption:streak",
              "source": "local",
              "caption": {
                "type": "streak"
              },
              "sort_order": 8
            },
            {
              "overlay_id": "caption:star_sign",
              "source": "local",
              "caption": {
                "type": "star_sign"
              },
              "sort_order": 9
            },
            {
              "overlay_id": "caption:quote",
              "source": "local",
              "caption": {
                "type": "quote"
              },
              "sort_order": 10
            },
            {
              "overlay_id": "caption:breaking_news",
              "source": "local",
              "caption": {
                "type": "breaking_news"
              },
              "sort_order": 11
            }
          ]
        },
        {
          "section": "🎨 Holiday Caption",
          "items": [
            {
              "overlay_id": "caption:halloween_2026",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#150804",
                    "#C8540D"
                  ]
                },
                "icon": {
                  "type": "image",
                  "data": "https://storage.googleapis.com/locket-public/journal_calendar_assets/holiday_indicators/halloween_indicator%403x.png",
                  "source": "url"
                },
                "max_lines": 1,
                "text": "Halloween",
                "localized_text": {
                  "en": "Halloween",
                  "vn": "Halloween"
                },
                "text_color": "#FFB182",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:autumn_2026",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFE0A0",
                    "#F6A53A"
                  ]
                },
                "icon": {
                  "data": "🍂",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Xin chào Mùa Thu",
                "localized_text": {
                  "en": "Xin chào Mùa Thu",
                  "vn": "Xin chào Mùa Thu"
                },
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:election_day_vote_2026",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#3B5BDB",
                    "#E64980"
                  ]
                },
                "icon": {
                  "data": "🇺🇸",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "VOTE",
                "text_color": "#FFFFFF",
                "type": "static_content"
              },
              "region": [
                "VN"
              ]
            },
            {
              "overlay_id": "caption:election_day_i_voted_2026",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFFFFF",
                    "#BBC3DD"
                  ]
                },
                "icon": {
                  "data": "🗳️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "I voted!",
                "text_color": "#000000",
                "type": "static_content"
              },
              "region": [
                "VN"
              ]
            },
            {
              "overlay_id": "caption:diwali_2026",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FD8205",
                    "#FED78B"
                  ]
                },
                "icon": {
                  "data": "🪔",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Diwali",
                "text_color": "#731B0D",
                "type": "static_content"
              },
              "region": [
                "VN"
              ]
            },
            {
              "overlay_id": "caption:veterans_day_2026",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFFBF8",
                    "#E6DDD8"
                  ]
                },
                "icon": {
                  "data": "🇺🇸",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Thank You Veterans",
                "text_color": "#2C5E8F",
                "type": "static_content"
              },
              "region": [
                "VN"
              ]
            },
            {
              "overlay_id": "caption:thanksgiving_2026",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#CEAF76",
                    "#91643E"
                  ]
                },
                "icon": {
                  "data": "🦃",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Happy Thanksgiving!",
                "text_color": "#FFFFFF",
                "type": "static_content"
              },
              "region": [
                "VN"
              ]
            },
            {
              "overlay_id": "caption:black_friday_2026",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#1A1A1A",
                    "#454545"
                  ]
                },
                "icon": {
                  "data": "🛍️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Black Friday",
                "text_color": "#FFFFFF",
                "type": "static_content"
              },
              "region": [
                "VN"
              ]
            },
            {
              "overlay_id": "caption:hanukkah_2026",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#2539B6",
                    "#4862F7"
                  ]
                },
                "icon": {
                  "data": "🕎",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Happy Hanukkah!",
                "text_color": "#FFFFFF",
                "type": "static_content"
              },
              "region": [
                "VN"
              ]
            },
            {
              "overlay_id": "caption:christmas_eve_2026",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#2FA85F",
                    "#176B3A"
                  ]
                },
                "icon": {
                  "data": "🕯️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Christmas Eve",
                "text_color": "#FFFFFF",
                "type": "static_content"
              },
              "region": [
                "VN"
              ]
            },
            {
              "overlay_id": "caption:christmas_eve_2026",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#2FA85F",
                    "#176B3A"
                  ]
                },
                "icon": {
                  "data": "🕯️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Giáng sinh an lành",
                "localized_text": {
                  "en": "Giáng sinh an lành",
                  "vn": "Giáng sinh an lành"
                },
                "text_color": "#FFFFFF",
                "type": "static_content"
              },
              "region": [
                "VN"
              ]
            },
            {
              "overlay_id": "caption:christmas_day_2026",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#E53935",
                    "#A81818"
                  ]
                },
                "icon": {
                  "data": "🎄",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Merry Christmas!",
                "text_color": "#FFFFFF",
                "type": "static_content"
              },
              "region": [
                "VN"
              ]
            },
            {
              "overlay_id": "caption:christmas_day_2026",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#E53935",
                    "#A81818"
                  ]
                },
                "icon": {
                  "data": "🎄",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Giáng sinh an lành",
                "localized_text": {
                  "en": "Giáng sinh an lành",
                  "vn": "Giáng sinh an lành"
                },
                "text_color": "#FFFFFF",
                "type": "static_content"
              },
              "region": [
                "VN"
              ]
            },
            {
              "overlay_id": "caption:new_years_eve_2026",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFC64B",
                    "#FFEDBF"
                  ]
                },
                "icon": {
                  "data": "🥂",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "New Year's Eve",
                "localized_text": {
                  "en": "New Year's Eve",
                  "vi": "Xin chào 2027!"
                },
                "text_color": "#643F00",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:new_years_day_2027",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#3B00EC",
                    "#823FFF"
                  ]
                },
                "icon": {
                  "data": "💫",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Happy New Year!",
                "localized_text": {
                  "en": "Happy New Year!",
                  "vi": "Xin chào 2027!"
                },
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:new_years_day_2027_alternate",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF0062",
                    "#FF783F"
                  ]
                },
                "max_lines": 1,
                "text": "2027",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:no_memory",
              "source": "remote",
              "caption": {
                "background": {
                  "image": {
                    "type": "image",
                    "data": "https://public.locketcamera.com/locket-public/overlays/forgotten_island/forgotten_island_bg.png",
                    "source": "url"
                  },
                  "colors": [
                    "#1A1A2E",
                    "#16213E"
                  ]
                },
                "max_lines": 1,
                "text": "NO MEMORY LEFT BEHIND",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            }
          ]
        },
        {
          "section": "🎨 Decorative by Locket",
          "items": [
            {
              "overlay_id": "caption:toi_nho_em",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFFFFF",
                    "#6D9EEB"
                  ]
                },
                "max_lines": 1,
                "text": "보고 싶어 🥺",
                "text_color": "#000000E6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:party_time",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#5EFFF5",
                    "#FCFF57"
                  ]
                },
                "icon": {
                  "data": "🪩",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Party Time!",
                "text_color": "#000000E6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:good_morning",
              "source": "remote",
              "daily_start_hour": 5,
              "daily_end_hour": 10,
              "caption": {
                "background": {
                  "colors": [
                    "#EF7402",
                    "#EABF0F"
                  ]
                },
                "icon": {
                  "data": "☀️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Good morning",
                "text_color": "#FFFFFFE5",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:goodnight",
              "source": "remote",
              "daily_start_hour": 19.5,
              "daily_end_hour": 24,
              "caption": {
                "background": {
                  "colors": [
                    "#370C6F",
                    "#575CD4"
                  ]
                },
                "icon": {
                  "data": "🌙",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Goodnight",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:miss_you",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#EC0C00",
                    "#FF493F"
                  ]
                },
                "icon": {
                  "data": "🥰",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Miss you",
                "text_color": "#FFFFFFDB",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ootd",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFFFFF",
                    "#DBDBDB"
                  ]
                },
                "icon": {
                  "data": "🕶",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "OOTD",
                "text_color": "#101010E6",
                "type": "static_content"
              }
            }
          ]
        },
        {
          "section": "🎨 Made by hnyb05",
          "items": [
            {
              "overlay_id": "caption:hnyb05",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#B8E7FF",
                    "#A8F5D0",
                    "#DCCBFF"
                  ]
                },
                "icon": {
                  "data": "tortoise.fill",
                  "type": "sf_symbol",
                  "color": "#183153"
                },
                "max_lines": 1,
                "text": "hnyb05",
                "text_color": "#183153",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:cu",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFD6A5",
                    "#FFF1A8",
                    "#FFC4D6"
                  ]
                },
                "max_lines": 1,
                "text": "Cu 🐎",
                "text_color": "#633B24",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:tuat",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#2C1A0E",
                    "#5D4037",
                    "#D7A86E"
                  ]
                },
                "icon": {
                  "data": "🐕",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Tuất",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:snake_vibes",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#2E7D32",
                    "#66BB6A"
                  ]
                },
                "icon": {
                  "data": "🐍",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Snake Vibes",
                "localized_text": {
                  "en": "Snake Vibes",
                  "vn": "Chất rắn"
                },
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:du_an_ma",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#263238",
                    "#455A64"
                  ]
                },
                "icon": {
                  "data": "👻",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "dự án ma",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:love_vietnam",
              "source": "remote",
              "alt_text": "Tôi yêu Việt Nam",
              "caption": {
                "background": {
                  "image": {
                    "type": "image",
                    "data": "star_sign_background",
                    "source": "local"
                  },
                  "colors": [
                    "#DA251D",
                    "#DA251D"
                  ]
                },
                "icon": {
                  "type": "image",
                  "data": "https://storage.googleapis.com/locket-public/journal_calendar_assets/holiday_indicators/valentines_indicator%403x.png",
                  "source": "url"
                },
                "max_lines": 1,
                "text": "Tôi yêu Việt Nam",
                "text_color": "#FFFF00",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:film_diary",
              "source": "remote",
              "alt_text": "Một ngày rất chill",
              "caption": {
                "background": {
                  "image": {
                    "type": "image",
                    "data": "https://public.locketcamera.com/locket-public/gold_promos/gold_promo_camera_roll.png",
                    "source": "url"
                  },
                  "colors": [
                    "#D2B48C",
                    "#8B4513"
                  ]
                },
                "icon": {
                  "type": "image",
                  "data": "https://public.locketcamera.com/locket-public/journal_calendar_assets/holiday_indicators/st_patricks_indicator%403x.png",
                  "source": "url"
                },
                "max_lines": 1,
                "text": "Một ngày rất chill",
                "text_color": "#FFFDD0",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:strangers",
              "source": "remote",
              "alt_text": "Người lạ",
              "caption": {
                "background": {
                  "image": {
                    "type": "image",
                    "data": "https://public.locketcamera.com/locket-public/gold_promos/gold_promo_views.png",
                    "source": "url"
                  },
                  "colors": [
                    "#1C1C1E",
                    "#2C2C2E"
                  ]
                },
                "icon": {
                  "data": "eye.fill",
                  "type": "sf_symbol",
                  "color": "#0A84FF"
                },
                "max_lines": 1,
                "text": "Người lạ",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:genz_flex",
              "source": "remote",
              "alt_text": "Mood: Chill",
              "caption": {
                "background": {
                  "image": {
                    "type": "image",
                    "data": "https://public.locketcamera.com/locket-public/gold_promos/gold_promo_widgets.png",
                    "source": "url"
                  },
                  "colors": [
                    "#FF9A9E",
                    "#FECFEF"
                  ]
                },
                "icon": {
                  "data": "camera.fill",
                  "type": "sf_symbol",
                  "color": "#FF007F"
                },
                "max_lines": 1,
                "text": "Mood: Chill 💅",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            }
          ]
        },
        {
          "section": "🎨 Tình yêu & Thả thính 💕",
          "items": [
            {
              "overlay_id": "caption:em_nho_anhh",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF6B81",
                    "#FF8E9E",
                    "#FFB3C6"
                  ]
                },
                "icon": {
                  "data": "🥺",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "em nhớ anhh",
                "text_color": "#8C1938",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:nho_anh_phien",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F0B5CB",
                    "#F6D0DF",
                    "#DCCAF0"
                  ]
                },
                "icon": {
                  "data": "🥺",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "nhớ anh tới mức hơi phiền",
                "text_color": "#70445A",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:i_love_you",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF8FAB",
                    "#FFC2D1",
                    "#FFE5EC"
                  ]
                },
                "icon": {
                  "data": "💗",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "i love you",
                "text_color": "#8A304F",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:yeu_cuc_dang",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F2B5C8",
                    "#F8D5D9",
                    "#F6E5D2"
                  ]
                },
                "icon": {
                  "data": "🎀",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "yêu cục dàng",
                "text_color": "#754454",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:yeu_emmm",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F2AFC6",
                    "#F7C9D9",
                    "#E5CFF4"
                  ]
                },
                "icon": {
                  "data": "💗",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Yeu Emmm",
                "text_color": "#70445C",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:yeu_anhhh",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#B8C9F2",
                    "#D5DDF8",
                    "#E8CFF0"
                  ]
                },
                "icon": {
                  "data": "🫶",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Yeu Anhhh",
                "text_color": "#414C72",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:baby_love",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFB6C1",
                    "#FF69B4",
                    "#FF1493"
                  ]
                },
                "icon": {
                  "data": "🧸",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Baby Love 💖",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:muon_duoc_om",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF9A9E",
                    "#FECFEF"
                  ]
                },
                "icon": {
                  "data": "🫂",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Muốn được ôm",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:cho_hun_mieng",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F3AFC7",
                    "#F8D0D8",
                    "#F4C9BB"
                  ]
                },
                "icon": {
                  "data": "😘",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "cho hun miếng coi",
                "text_color": "#754252",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:me_anh_me_ngu",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#C4C8EF",
                    "#DED3F4",
                    "#EBCDE4"
                  ]
                },
                "icon": {
                  "data": "💤",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "mê anh hơn mê ngủ",
                "text_color": "#4F4770",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:be_be_can_do",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF8FAB",
                    "#FFC2D1",
                    "#FFE5EC"
                  ]
                },
                "icon": {
                  "data": "🎀",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "em bé cần được dỗ",
                "text_color": "#812D4A",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:iu_thi_noi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFD166",
                    "#FFE8A3",
                    "#FFF3D0"
                  ]
                },
                "icon": {
                  "data": "🤭",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "iu thì nói, đừng có ngại",
                "text_color": "#704510",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:iu_hong_thi_bao",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF6B6B",
                    "#FF9999",
                    "#FFD1C9"
                  ]
                },
                "icon": {
                  "data": "🎀",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "iu hong thì bảo",
                "text_color": "#812626",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:anh_thuong_em",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#A0C4FF",
                    "#BDE0FE",
                    "#DFF3FF"
                  ]
                },
                "icon": {
                  "data": "🥹",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "anh có thương em thiệt hong",
                "text_color": "#23466F",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:yeu_em_nhiem_vu",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#B7E4C7",
                    "#D8F3DC",
                    "#F0FFF1"
                  ]
                },
                "icon": {
                  "data": "🫡",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "yêu em là nhiệm vụ cả đời",
                "text_color": "#24563A",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:crush_nhin",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#CDB4DB",
                    "#E2CFEA",
                    "#F3E5F5"
                  ]
                },
                "icon": {
                  "data": "🫠",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "crush nhìn em một cái là xong",
                "text_color": "#593B68",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ngoai_le_cua_em",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#80CBC4",
                    "#B2DFDB",
                    "#E0F2F1"
                  ]
                },
                "icon": {
                  "data": "🫶",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "anh là ngoại lệ của em",
                "text_color": "#205953",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:dang_ban_tuong_tu",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#1A2980",
                    "#26D0CE"
                  ]
                },
                "icon": {
                  "data": "💭",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Đang bận tương tư",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:mac_bay_tinh_yeu",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#EE9CA7",
                    "#FFDDE1"
                  ]
                },
                "icon": {
                  "data": "💘",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Mắc bẫy tình yêu",
                "text_color": "#000000E6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:minh_cuoi_nhau",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F0B8CD",
                    "#F7D4DF",
                    "#E7C9EF"
                  ]
                },
                "icon": {
                  "data": "💍",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "hông ấy mình cưới nhau đi",
                "text_color": "#70465B",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:wedding_time",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFE4E1",
                    "#E73C7E"
                  ]
                },
                "icon": {
                  "data": "💍",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Wedding Time!",
                "localized_text": {
                  "en": "Wedding Time!",
                  "vn": "Đám cưới nè!"
                },
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:dating_time",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#E91E63",
                    "#F44336"
                  ]
                },
                "icon": {
                  "data": "💕",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Dating Time!",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:tuong_love_hoa_ra_lop",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#C9184A",
                    "#FF4D6D",
                    "#FFB3C6"
                  ]
                },
                "icon": {
                  "data": "❤️‍🩹",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Tưởng love hoá ra lốp",
                "text_color": "#64152F",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:cam_thay_hanh_phuc",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#EC407A",
                    "#F8BBD0"
                  ]
                },
                "icon": {
                  "data": "🇻🇳",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Cảm thấy hạnh phúc",
                "localized_text": {
                  "en": "Feeling Happy",
                  "vn": "Cảm thấy hạnh phúc"
                },
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:cho_anh_chut_thoi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F4A6B7",
                    "#F6BFA6",
                    "#F8D9A0"
                  ]
                },
                "icon": {
                  "data": "heart.fill",
                  "type": "sf_symbol",
                  "color": "#E85D75"
                },
                "max_lines": 1,
                "text": "Chờ anh chút thôi",
                "text_color": "#593744",
                "type": "static_content"
              }
            }
          ]
        },
        {
          "section": "🎨 Gen Z & Flex 💅",
          "items": [
            {
              "overlay_id": "caption:feeling_cute",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F8BBD0",
                    "#E91E63"
                  ]
                },
                "icon": {
                  "data": "🌷",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Feeling Cute",
                "localized_text": {
                  "en": "Feeling Cute",
                  "vn": "Cảm thấy dthw"
                },
                "text_color": "#FFFFFFE5",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:cutie_pie",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFDEE9",
                    "#FFB6C1",
                    "#FF9AA2"
                  ]
                },
                "icon": {
                  "data": "🎀",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Cutie Pie 🌸",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:hello_kitty",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFD1DC",
                    "#FFB7C5",
                    "#FFC0CB"
                  ]
                },
                "icon": {
                  "data": "🌸",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Hello Kitty 🐱",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ngoan_xinh_iu",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F3C1D4",
                    "#F8DDE5",
                    "#E8CFF0"
                  ]
                },
                "icon": {
                  "data": "💗",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "ngoan xinh iu của ai đây",
                "text_color": "#71465D",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:xinh_dep_tuyet_voi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FC5C7D",
                    "#6A82FB"
                  ]
                },
                "icon": {
                  "data": "💅",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Xinh đẹp tuyệt vời",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:hom_nay_slay",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#C5B5E8",
                    "#DDD0F2",
                    "#F0C9DD"
                  ]
                },
                "icon": {
                  "type": "sf_symbol",
                  "data": "sparkles",
                  "color": "#514368"
                },
                "max_lines": 1,
                "text": "hôm nay cũng slay",
                "text_color": "#514368",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:tinh_hoa_hoi_tu",
              "source": "remote",
              "caption": {
                "background": {
                  "image": {
                    "type": "image",
                    "data": "star_sign_background",
                    "source": "local"
                  },
                  "colors": [
                    "#FFD700",
                    "#FF8C00"
                  ]
                },
                "icon": {
                  "type": "sf_symbol",
                  "data": "wand.and.sparkles",
                  "color": "#000000E6"
                },
                "max_lines": 1,
                "text": "Tinh hoa hội tụ",
                "text_color": "#000000E6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:xinh_gai_an_phim_1",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F77062",
                    "#FE5196"
                  ]
                },
                "icon": {
                  "data": "💅",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Xinh gái ấn phím 1",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:xinh_la_tai_nang",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F0B5CA",
                    "#F5D2DD",
                    "#EAD1F0"
                  ]
                },
                "icon": {
                  "data": "🎀",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "xinh là một loại tài năng",
                "text_color": "#70435B",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:dep_trai_co_gi_sai",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF5722",
                    "#FFC107"
                  ]
                },
                "icon": {
                  "data": "😎",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Đẹp trai có gì sai",
                "text_color": "#000000E6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:dep_khong_ly_do",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#E5B7CD",
                    "#F0D0DC",
                    "#DCCCF0"
                  ]
                },
                "icon": {
                  "data": "🪞",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "đẹp không cần lý do",
                "text_color": "#67455C",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:cha_nay_tu_luyen_ghe",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFDEE9",
                    "#B5FFFC",
                    "#FAD0C4",
                    "#FFD1FF"
                  ]
                },
                "icon": {
                  "data": "🪞",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Cha này tự luyến ghê",
                "text_color": "#000000E6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:phu_tinh_khong_phu_ban",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#8E2DE2",
                    "#4A00E0"
                  ]
                },
                "icon": {
                  "data": "🕶️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Phụ tình không phụ bản",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:main_character",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#D6B8E8",
                    "#E8CDEB",
                    "#F3D2D9"
                  ]
                },
                "icon": {
                  "type": "sf_symbol",
                  "data": "movieclapper.fill",
                  "color": "#5A4366"
                },
                "max_lines": 1,
                "text": "main character của cuộc đời mình",
                "text_color": "#5A4366",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:vibe_khong_phai_ai",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#80D8FF",
                    "#A0F0E0",
                    "#D9FFF5"
                  ]
                },
                "icon": {
                  "data": "🪩",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "vibe này ko phải ai cũng có",
                "text_color": "#174C58",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:khi_chat",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFB36B",
                    "#FFD49B",
                    "#FFF0C2"
                  ]
                },
                "icon": {
                  "data": "😎",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "không hoàn hảo nhưng có khí chất",
                "text_color": "#713D20",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:sieu_cap_ba_khi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#EC407A",
                    "#F44336"
                  ]
                },
                "icon": {
                  "data": "🐉",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "siêu cấp bá khí",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:bung_no",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF6B6B",
                    "#FF8E53",
                    "#FFD166"
                  ]
                },
                "icon": {
                  "data": "💥",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Bùng nổ",
                "text_color": "#702B16",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ba_khi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#8EACCD",
                    "#B5C8DE",
                    "#D7C7E6"
                  ]
                },
                "icon": {
                  "data": "😎",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "bá khí ngang ngược",
                "text_color": "#35475D",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:du_ba_khi_chua",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#CBB4DE",
                    "#DFCBEA",
                    "#F2E3F7"
                  ]
                },
                "icon": {
                  "data": "👑",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Đủ bá khí chưa?",
                "text_color": "#4C385C",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:oach_xa_lach",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#11998E",
                    "#38EF7D"
                  ]
                },
                "icon": {
                  "data": "🥬",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "oách xà lách",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:cung_cung_di",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF7043",
                    "#FF8A50",
                    "#FFCA70"
                  ]
                },
                "icon": {
                  "data": "🚀",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Cũng cứng đi",
                "text_color": "#592313",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ra_duong_ne_moi_anh",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#BCC5D6",
                    "#D7DEEA",
                    "#EDE8F5"
                  ]
                },
                "icon": {
                  "data": "🕶️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Ra đường nể mỗi anh",
                "text_color": "#384358",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:nhin_la_biet_uy_tin",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#2980B9",
                    "#2C3E50"
                  ]
                },
                "icon": {
                  "data": "👌",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Nhìn là biết uy tín",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:flex_den_hoi_tho_cuoi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#00BFA5",
                    "#64E8C8",
                    "#C4FFF0"
                  ]
                },
                "icon": {
                  "data": "💎",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Flex đến hơi thở cuối",
                "text_color": "#064D43",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:tui_khong_hon_thua",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#8E2430",
                    "#C0394B",
                    "#F08A8E"
                  ]
                },
                "icon": {
                  "data": "😎",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "tui không hơn thua, tui hơn hẳn",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:hon_hom_qua",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#B9D7D0",
                    "#D6E6D7",
                    "#E8DFC6"
                  ]
                },
                "icon": {
                  "data": "🫶",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "tui không hơn ai, tui hơn hôm qua",
                "text_color": "#3F554E",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:khong_phai_gu",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF6F91",
                    "#FF9A9E",
                    "#FFD1BA"
                  ]
                },
                "icon": {
                  "data": "💅",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "không phải gu của tất cả, may quá",
                "text_color": "#70243D",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:quan_trong_lam",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#7566D9",
                    "#9B8AFB",
                    "#D2C8FF"
                  ]
                },
                "icon": {
                  "data": "💅",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "ủa tưởng mình quan trọng lắm?",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:cai_net_ky",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#B7D96C",
                    "#D9ED9A",
                    "#F1F7C8"
                  ]
                },
                "icon": {
                  "data": "😒",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "cái nết kỳ ghê",
                "text_color": "#35451B",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ghet_dua_kia_ghe",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#52647A",
                    "#7D91A8",
                    "#BBC9D8"
                  ]
                },
                "icon": {
                  "data": "😒",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "ghét đứa kia ghê 😒",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:khong_ghet_khong_ua",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFAB40",
                    "#FFD180",
                    "#FFF0C2"
                  ]
                },
                "icon": {
                  "data": "😒",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "không ghét, chỉ không ưa",
                "text_color": "#633B12",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:toi_song_the_day",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#202124",
                    "#525866",
                    "#AAB2C0"
                  ]
                },
                "icon": {
                  "data": "😎",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Tôi sống thế đấy",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:che_manh",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF4E50",
                    "#F9D423"
                  ]
                },
                "icon": {
                  "data": "👎",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Chê mạnh",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:chua_du_wow",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFD1DC",
                    "#FFB7C5",
                    "#FFE4E1"
                  ]
                },
                "icon": {
                  "data": "🎀",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Chưa đủ wow",
                "text_color": "#6E4254",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:roi_let_luon",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF9A9E",
                    "#FECFEF",
                    "#FBC2EB",
                    "#A6C1EE"
                  ]
                },
                "icon": {
                  "data": "💅",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "rồi lét luôn",
                "text_color": "#000000E6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:roi_gay_luon",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF6EC7",
                    "#7873F5",
                    "#4ADEDE",
                    "#FFE66D"
                  ]
                },
                "icon": {
                  "data": "🌈",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "rồi gay luôn",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:dang_truc_tiep",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#0000001A",
                    "#0000001A"
                  ],
                  "material_blur": "regular"
                },
                "icon": {
                  "data": "circle.fill",
                  "type": "sf_symbol",
                  "color": "#FF3B5C"
                },
                "max_lines": 1,
                "text": "ĐANG TRỰC TIẾP",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ae_san_san",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#C5DDF1",
                    "#C9E8E9",
                    "#D8EAD8"
                  ]
                },
                "icon": {
                  "data": "🚀",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "ae sãn sàn",
                "text_color": "#405D70",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ae_tao_ma_cao",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#C7D5ED",
                    "#D2D1ED",
                    "#E0CDEB"
                  ]
                },
                "icon": {
                  "data": "✈️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "ae tao ma cao",
                "text_color": "#4F5879",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:quay_rua_fen",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#C8E1D2",
                    "#D2E8C9",
                    "#E3E9C5"
                  ]
                },
                "icon": {
                  "data": "🎉",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "quậy rứa fen",
                "text_color": "#49664E",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:cung_fomo",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#E6C8E7",
                    "#EBD0E5",
                    "#EFD6D8"
                  ]
                },
                "icon": {
                  "data": "👀",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "cũng fomo theo =))",
                "text_color": "#654B69",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:the_ma_lai_hay",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#D1D8EA",
                    "#DCD6EC",
                    "#E9D9E8"
                  ]
                },
                "icon": {
                  "data": "lightbulb.fill",
                  "type": "sf_symbol",
                  "color": "#9295BE"
                },
                "max_lines": 1,
                "text": "thế mà lại hay",
                "text_color": "#545677",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:10_diem",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F6D9A8",
                    "#F4D1B0",
                    "#EFD0C7"
                  ]
                },
                "icon": {
                  "data": "🏆",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "10 điểm không có nhưng",
                "text_color": "#6D5436",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:co_tai_tai_lanh",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F2C8B8",
                    "#F0D0B1",
                    "#E9D8B8"
                  ]
                },
                "icon": {
                  "data": "crown.fill",
                  "type": "sf_symbol",
                  "color": "#BE8C62"
                },
                "max_lines": 1,
                "text": "có tài ghê, tài lanh",
                "text_color": "#6A503B",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:noi_it_lam_nhieu",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#C4DFD6",
                    "#CDE6D5",
                    "#E0E9C9"
                  ]
                },
                "icon": {
                  "data": "target",
                  "type": "sf_symbol",
                  "color": "#6F9C84"
                },
                "max_lines": 1,
                "text": "nói ít thôi, làm nhiều lên",
                "text_color": "#426450",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:quyet_khong_mat_chuoi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#C6E2D2",
                    "#D1E8C9",
                    "#E2E9BD"
                  ]
                },
                "icon": {
                  "data": "flame.fill",
                  "type": "sf_symbol",
                  "color": "#78A77E"
                },
                "max_lines": 1,
                "text": "quyết k để mất chuỗi :))",
                "text_color": "#46664C",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:tru_diem_aura",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#D2C6EA",
                    "#DCCAE9",
                    "#EACBE0"
                  ]
                },
                "icon": {
                  "data": "📉",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "trừ điểm aura",
                "text_color": "#5F4C70",
                "type": "static_content"
              }
            }
          ]
        },
        {
          "section": "🎨 Meme & Xà lơ 🤡",
          "items": [
            {
              "overlay_id": "caption:cuoi_vcl_m_oi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F7971E",
                    "#FFD200",
                    "#FFEE58"
                  ]
                },
                "icon": {
                  "data": "😂",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Cười vcl m oi",
                "text_color": "#000000E6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:cuoi_xiu",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFEB3B",
                    "#FF9800"
                  ]
                },
                "icon": {
                  "data": "😎",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Cười xỉu",
                "text_color": "#000000E6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:luon_vui_tuoi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#00F2FE",
                    "#4FACFE"
                  ]
                },
                "icon": {
                  "data": "🤡",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Luôn vui tươi",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:nau_xoi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#B8E04A",
                    "#D9F477",
                    "#F5FFB8"
                  ]
                },
                "icon": {
                  "data": "🙀",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Nấu xói",
                "text_color": "#394713",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:con_vien_la_lan",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#A8C3A0",
                    "#DCE5D1"
                  ]
                },
                "icon": {
                  "data": "🍂",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "côn viên lá làn",
                "text_color": "#344536",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:gian_dang_iu_hong",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#A8E6CF",
                    "#D4F1BE",
                    "#FFF1B6"
                  ]
                },
                "icon": {
                  "data": "🪳",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Gián đáng iu hong",
                "text_color": "#315847",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:am_cha_hui",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F1C0D2",
                    "#F5D9E1",
                    "#E7D1F2"
                  ]
                },
                "icon": {
                  "data": "🎀",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "ăm chã húi, bà chã hơm",
                "text_color": "#70475C",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:hong_drama",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#8A2387",
                    "#E94057",
                    "#F27121"
                  ]
                },
                "icon": {
                  "data": "🍿",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Hóng drama",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ke_chuyen_nghe_choi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#8A2387",
                    "#E94057"
                  ]
                },
                "icon": {
                  "data": "🍿",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Kể chuyện nghe chơi",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:drama_ai_hong",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F0C4A8",
                    "#F3D8B8",
                    "#D8C6E5"
                  ]
                },
                "icon": {
                  "data": "🍿",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "thân ai nấy lo, drama ai nấy hóng",
                "text_color": "#624736",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:check_var",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#11998E",
                    "#38EF7D"
                  ]
                },
                "icon": {
                  "data": "📺",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Check VAR liền",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:co_bien_co_bien",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF512F",
                    "#F09819",
                    "#FFD200"
                  ]
                },
                "icon": {
                  "type": "sf_symbol",
                  "data": "light.beacon.max.fill",
                  "color": "#FFFFFFE6"
                },
                "max_lines": 1,
                "text": "Có biến có biến",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:so_ho_la_bao",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F5B8A9",
                    "#F6D0B2",
                    "#E8BFCB"
                  ]
                },
                "icon": {
                  "data": "🚨",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "sơ hở là báo",
                "text_color": "#713F40",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:bot_bao",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#7AA6C2",
                    "#B0C9D9",
                    "#DCE8EF"
                  ]
                },
                "icon": {
                  "data": "🚨",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "bớt báo giùm cái",
                "text_color": "#29485D",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ai_so_thi_di_ve",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#B71C1C",
                    "#FF5722"
                  ]
                },
                "icon": {
                  "data": "🏃",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "ai sợ thì đi về",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:chay_ngay_di",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#D31027",
                    "#EA384D"
                  ]
                },
                "icon": {
                  "data": "🏃💨",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Chạy ngay đi",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:len_chua_khong_biet_lay_ai",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#D7CCC8",
                    "#EFEBE9",
                    "#F5F5F0"
                  ]
                },
                "icon": {
                  "data": "🙏🥺",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "lên chùa không biết lạy ai",
                "text_color": "#5D4037",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:dam_nhau_khong",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#E53935",
                    "#FF7043"
                  ]
                },
                "icon": {
                  "data": "🥊",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "đấm nhau không",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:hao_han",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#292E49",
                    "#8E3B46",
                    "#E09F3E"
                  ]
                },
                "icon": {
                  "data": "🗡️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Hảo hán",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:mong_ton_hoa_sen",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#D8B4E2",
                    "#F8BBD0"
                  ]
                },
                "icon": {
                  "data": "🪷",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Mong tôn hoa sen thấy cảnh này",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:con_cai_nit",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#D7CCC8",
                    "#8D6E63"
                  ]
                },
                "icon": {
                  "data": "🧶",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "còn cái nịt",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:minh_la_lop",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#263238",
                    "#455A64"
                  ]
                },
                "icon": {
                  "data": "🛞",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Mình là lốp",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:hay_ra_de_qua_a",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFF59D",
                    "#80DEEA"
                  ]
                },
                "icon": {
                  "data": "🥺",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Hay ra dẻ quá à!",
                "text_color": "#000000E6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:mac_co_qua_hai_oi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFB74D",
                    "#F8BBD0"
                  ]
                },
                "icon": {
                  "data": "😭",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Mắc cỡ quá hai ơi",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:than_chua_ma_don",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#607D8B",
                    "#37474F"
                  ]
                },
                "icon": {
                  "data": "😔",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Thân chưa mà dỡn",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ai_muon",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF6B35",
                    "#FF9F1C",
                    "#FFE0A3"
                  ]
                },
                "icon": {
                  "data": "🤨",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "ủa rồi ai mượn?",
                "text_color": "#6B2814",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:co_ra_dai_khong",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF4D6D",
                    "#FF8E72",
                    "#FFD6A5"
                  ]
                },
                "icon": {
                  "data": "😭",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "có ra dại không",
                "text_color": "#6B1833",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:he_dieu_hanh_la",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#287271",
                    "#57A99A",
                    "#B5E5D5"
                  ]
                },
                "icon": {
                  "data": "🤨",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "bạn mình nhưng hệ điều hành lạ",
                "text_color": "#153F3D",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ai_cung_khac",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#343A40",
                    "#59636E",
                    "#AAB4BE"
                  ]
                },
                "icon": {
                  "data": "🤡",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "ai rồi cũng khác, riêng bạn thì lạ",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:tuong_tuong",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#3977D5",
                    "#78A9F5",
                    "#D0E4FF"
                  ]
                },
                "icon": {
                  "data": "🤡",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "tưởng gì, hóa ra tưởng tượng",
                "text_color": "#173767",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:be_hong_sai",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F4A7C3",
                    "#FFD1DC",
                    "#FFF0F3"
                  ]
                },
                "icon": {
                  "data": "😌",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "bé hông có sai, tại đời sai",
                "text_color": "#802D50",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:khong_vua_long",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#D5A64B",
                    "#E8C979",
                    "#FFF0BF"
                  ]
                },
                "icon": {
                  "data": "😌",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "sống sao cho vừa lòng thiên hạ? thôi khỏi",
                "text_color": "#594015",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:boc_trung_sit_rit",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#9C27B0",
                    "#7B1FA2"
                  ]
                },
                "icon": {
                  "data": "🎁",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Bóc trúng sít rịt",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:hen_lam_moi_xui_duoc_vay_a",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#00BCD4",
                    "#0097A7"
                  ]
                },
                "icon": {
                  "data": "😅",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Hên lắm mới xui được vậy á",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:giam_suc_manh_con_tuong",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#4CAF50",
                    "#00BCD4"
                  ]
                },
                "icon": {
                  "data": "🎮",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Giảm sức mạnh con tướng",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:phu_huynh_dung_xem",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF0844",
                    "#FFB199"
                  ]
                },
                "icon": {
                  "data": "🙈",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Phụ huynh đừng xem",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:khong_van_de_gi_luon",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#087E8B",
                    "#39B8A5",
                    "#B8F2E6"
                  ]
                },
                "icon": {
                  "data": "👌",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Không vấn đề gì luôn",
                "text_color": "#103F43",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:xin_vinh_biet_cu",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#232526",
                    "#414345"
                  ]
                },
                "icon": {
                  "data": "🕯️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Xin vĩnh biệt cụ",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:et_o_et",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F3C4C4",
                    "#F1C9B9",
                    "#EED9B9"
                  ]
                },
                "icon": {
                  "data": "sos.circle.fill",
                  "type": "sf_symbol",
                  "color": "#C77D78"
                },
                "max_lines": 1,
                "text": "ét ô ét",
                "text_color": "#704B48",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:nao_khong_treu_ban",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#C9DCEB",
                    "#D1E5E7",
                    "#DDE9D8"
                  ]
                },
                "icon": {
                  "data": "hand.raised.fill",
                  "type": "sf_symbol",
                  "color": "#719BAA"
                },
                "max_lines": 1,
                "text": "nào không trêu bạn",
                "text_color": "#47616B",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:than_chua_ma_gion",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#D5D1C4",
                    "#DFD8C8",
                    "#E9DDC9"
                  ]
                },
                "icon": {
                  "data": "hand.raised.slash.fill",
                  "type": "sf_symbol",
                  "color": "#A18E72"
                },
                "max_lines": 1,
                "text": "thân chưa mà giỡn 🤨",
                "text_color": "#5F5646",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:an_noi_xa_lo",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#E8C6C6",
                    "#EACBC1",
                    "#EBD8C7"
                  ]
                },
                "icon": {
                  "data": "🤡",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "ăn nói xà lơ 🤡",
                "text_color": "#684B4B",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:tuong_ai_cung_co",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F2D2B7",
                    "#EED1C8",
                    "#E8D2DF"
                  ]
                },
                "icon": {
                  "data": "💅",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "tôi tưởng ai cũng có chứ taa 💅",
                "text_color": "#6B5148",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ve_ke_kh_ai_tin",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#E7C9DF",
                    "#E9CDE8",
                    "#D9D0EF"
                  ]
                },
                "icon": {
                  "data": "🤫",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "về kể kh ai tin :))",
                "text_color": "#644C68",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:mac_co_qua",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F4BDD0",
                    "#EEC5DD",
                    "#E2C8ED"
                  ]
                },
                "icon": {
                  "data": "🥹",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "mắc cỡ quá m ơi :))",
                "text_color": "#694A67",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ilove_lapxuong",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F3C4B9",
                    "#F1C9C1",
                    "#EBCFD0"
                  ]
                },
                "icon": {
                  "data": "heart.fill",
                  "type": "sf_symbol",
                  "color": "#D66F78"
                },
                "max_lines": 1,
                "text": "i love lạp xưởng ❤️❤️❤️",
                "text_color": "#70474B",
                "type": "static_content"
              }
            }
          ]
        },
        {
          "section": "🎨 Tâm trạng & Bất ổn 🫠",
          "items": [
            {
              "overlay_id": "caption:bat_on_that_su",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#636363",
                    "#A2AB58"
                  ]
                },
                "icon": {
                  "data": "🫠",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Bất ổn thật sự",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:nay_la_het_cuu",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#607D8B",
                    "#455A64"
                  ]
                },
                "icon": {
                  "type": "sf_symbol",
                  "data": "bolt.badge.xmark",
                  "color": "#FFFFFFE6"
                },
                "max_lines": 1,
                "text": "Này là hết cứu",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:het_cuu_thiet",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#B8C9E8",
                    "#D5D5F0",
                    "#E9CDE0"
                  ]
                },
                "icon": {
                  "data": "🫠",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "hết cứu thiệt chứ",
                "text_color": "#454660",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:toi_cong_chuyen",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F2B5A7",
                    "#F6D1B5",
                    "#E9C2D5"
                  ]
                },
                "icon": {
                  "data": "💀",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "tới công chuyện nữa rồi",
                "text_color": "#634044",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:toang_that_roi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F44336",
                    "#B71C1C"
                  ]
                },
                "icon": {
                  "data": "🐉",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Toang thật rồi",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:toi_roi_toi_roi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F7253E",
                    "#FF6B35",
                    "#FFC857"
                  ]
                },
                "icon": {
                  "data": "❗",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Tới rồi tới rồi",
                "text_color": "#58151B",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:goi_xong_lun",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F3B6AF",
                    "#F6D2C2",
                    "#EAC8D9"
                  ]
                },
                "icon": {
                  "data": "😭",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "gòi xong lun á",
                "text_color": "#6A4549",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:xiu_ngang",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#C0B7E5",
                    "#D8D0F0",
                    "#EACDE2"
                  ]
                },
                "icon": {
                  "data": "💀",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "xĩu ngang xĩu dọc",
                "text_color": "#504567",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:guc_nga",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#3A1C71",
                    "#D76D77"
                  ]
                },
                "icon": {
                  "data": "📉",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Gục ngã",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:bat_luc",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#2C3E50",
                    "#3498DB"
                  ]
                },
                "icon": {
                  "data": "🏳️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Bất lực",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:rot_nuoc_mat",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#1CB5E0",
                    "#000046"
                  ]
                },
                "icon": {
                  "data": "😭",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Rớt nước mắt",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:tien_dinh",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF9A8B",
                    "#FF6A88"
                  ]
                },
                "icon": {
                  "data": "🌪️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Tiền đình",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:nao_bao_tri",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#B8E0D2",
                    "#D8EAD8",
                    "#C9D9F0"
                  ]
                },
                "icon": {
                  "data": "🧠",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "não đang bảo trì",
                "text_color": "#35564F",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:overthinking_vai_chuong",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#2C3E50",
                    "#4CA1AF"
                  ]
                },
                "icon": {
                  "data": "🤯",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Overthinking vai chưởng",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:tram_cam_nhe",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#1F1C2C",
                    "#928DAB"
                  ]
                },
                "icon": {
                  "data": "🫠",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Trầm cảm nhẹ",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:khong_cam_xuc",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#434343",
                    "#000000"
                  ]
                },
                "icon": {
                  "data": "🗿",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Không cảm xúc",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:mieng_cuoi_long_khong",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#526A82",
                    "#8CA6B8",
                    "#D5E3E8"
                  ]
                },
                "icon": {
                  "data": "🙂",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "miệng cười nhưng lòng thì không",
                "text_color": "#233746",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:hom_nay_toi_buon",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#141E30",
                    "#243B55"
                  ]
                },
                "icon": {
                  "data": "🥀",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "hôm nay tôi buồn",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:dem_nay_noi_buon",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#283B66",
                    "#526C9E",
                    "#A9C1D9"
                  ]
                },
                "icon": {
                  "data": "🌙",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "đêm nay ai ôm nỗi buồn",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:em_on_ap_luc",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFB26B",
                    "#FFD08A",
                    "#FFF0B5"
                  ]
                },
                "icon": {
                  "data": "🥲",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "em ổn, ổn áp lực",
                "text_color": "#70401F",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:mot_minh",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#AEB8D1",
                    "#C7C7DF",
                    "#DED0E0"
                  ]
                },
                "icon": {
                  "data": "🫂",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "thôi thì mình lại một mình",
                "text_color": "#45475F",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:nan_nhan",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F3C7D9",
                    "#F6D9D0",
                    "#E5CFF0"
                  ]
                },
                "icon": {
                  "data": "🥹",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "tui là nạn nhân",
                "text_color": "#70495D",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ai_cuu_tui",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F0B6B6",
                    "#F5D0C3",
                    "#E8C6DE"
                  ]
                },
                "icon": {
                  "data": "sos",
                  "type": "sf_symbol",
                  "color": "#6A4248"
                },
                "max_lines": 1,
                "text": "òi ai cứu tui",
                "text_color": "#6A4248",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:song_gio_phu_doi_trai",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#3A1C71",
                    "#D76D77"
                  ]
                },
                "icon": {
                  "data": "🌪️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Sóng gió phủ đời trai",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:thuong_nguoi_khong_thuong",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#C8A6C4",
                    "#D9B9D0",
                    "#E7C8D6"
                  ]
                },
                "icon": {
                  "data": "💔",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "thương người không thương mình",
                "text_color": "#5D3F59",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:tu_da_tinh",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#52658F",
                    "#9A8FBF",
                    "#F2B6B8"
                  ]
                },
                "icon": {
                  "data": "🫠",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "lại tự mình đa tình",
                "text_color": "#373653",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:khong_du_tot",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#AFC6D8",
                    "#C8D5E2",
                    "#E0D1DE"
                  ]
                },
                "icon": {
                  "type": "sf_symbol",
                  "data": "cloud.sun.rain.fill",
                  "color": "#455467"
                },
                "max_lines": 1,
                "text": "chắc tại mình không đủ tốt",
                "text_color": "#455467",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:hy_vong_that_vong",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#8E354A",
                    "#C45D69",
                    "#F0B6A8"
                  ]
                },
                "icon": {
                  "data": "🥀",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "một chút hy vọng, một đống thất vọng",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:het_duyen_het_thuong",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#334E68",
                    "#627D98",
                    "#BCCCDC"
                  ]
                },
                "icon": {
                  "data": "💭",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "hết duyên hay hết thương?",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:nguoi_vui_nho",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#455A64",
                    "#78909C",
                    "#CFD8DC"
                  ]
                },
                "icon": {
                  "data": "🩶",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "người vui có nhớ người buồn không",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:da_xem_chua_rep",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#2979FF",
                    "#64B5F6",
                    "#BBDEFB"
                  ]
                },
                "icon": {
                  "data": "📱",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "đã xem, chưa rep, đã đau",
                "text_color": "#15345C",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:dung_im_lang",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF8FA3",
                    "#FFB3C6",
                    "#FFE0E9"
                  ]
                },
                "icon": {
                  "data": "🥺",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "đừng im lặng với em mà",
                "text_color": "#812D49",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:nho_thi_nho",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#E5A642",
                    "#F4CB78",
                    "#FFF0C2"
                  ]
                },
                "icon": {
                  "data": "🙂",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "nhớ thì nhớ, quay lại thì thôi",
                "text_color": "#633F13",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:em_hong_doi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#65A30D",
                    "#A3C957",
                    "#E2F0B0"
                  ]
                },
                "icon": {
                  "data": "🥲",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "em hong có dỗi, em chỉ buồn",
                "text_color": "#2F4712",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:doi_roi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF5F6D",
                    "#FFC371"
                  ]
                },
                "icon": {
                  "data": "😤",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Dỗi rồi",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:dung_choc_be",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F1BDD0",
                    "#F8DCE5",
                    "#E8D1F2"
                  ]
                },
                "icon": {
                  "data": "🥺",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "thui mừ đừng có chọc bé",
                "text_color": "#70475D",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:dung_lam_be_quao",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF8A5B",
                    "#FFB36B",
                    "#FFE3A3"
                  ]
                },
                "icon": {
                  "data": "😾",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "đừng có làm bé quạo",
                "text_color": "#71351F",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:xin_lui_duoc_chua",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F6D365",
                    "#FDA085"
                  ]
                },
                "icon": {
                  "data": "🥺",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Xin lũi được chưa",
                "text_color": "#000000",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:biet_roi_kho",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF7A59",
                    "#FFAD73",
                    "#FFE0A3"
                  ]
                },
                "icon": {
                  "data": "🥲",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "bíc gòi khổ lém",
                "text_color": "#71351F",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:hong_be_oi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#58C9A5",
                    "#A4E6C8",
                    "#E0F7D9"
                  ]
                },
                "icon": {
                  "data": "🥹",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "hong bé ơi",
                "text_color": "#205844",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:khum_biet_nua",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#5367C5",
                    "#8F9FE8",
                    "#D5D8FF"
                  ]
                },
                "icon": {
                  "data": "🫠",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "khum có bíc nữa",
                "text_color": "#29346F",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:cai_deo_ma",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF6B6B",
                    "#FF8E53",
                    "#FFD166"
                  ]
                },
                "icon": {
                  "data": "🤬",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "cái đéo má ??",
                "text_color": "#542323",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:cai_gi_vay_troi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF512F",
                    "#FF8C42",
                    "#FFD166"
                  ]
                },
                "icon": {
                  "data": "❗",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Cái gì vậy trời",
                "text_color": "#672016",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:khong_the_tin_noi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#3867FF",
                    "#725CFF",
                    "#B9A5FF"
                  ]
                },
                "icon": {
                  "data": "❓",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Không thể tin nổi",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:vl_m_oi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#20212D",
                    "#51566D",
                    "#A8B4C9"
                  ]
                },
                "icon": {
                  "data": "😳",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "vl m ơi?",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ua_alo",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFB347",
                    "#FFD166",
                    "#FFF0A8"
                  ]
                },
                "icon": {
                  "data": "questionmark",
                  "type": "sf_symbol",
                  "color": "#654018"
                },
                "max_lines": 1,
                "text": "Ủa alo",
                "text_color": "#654018",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:alo_gi_da",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#00A896",
                    "#55CDB5",
                    "#B8F0D8"
                  ]
                },
                "icon": {
                  "data": "😭",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Ủa alo, gì dạ?",
                "text_color": "#104B45",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ho",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#E63946",
                    "#F07167",
                    "#FFB4A2"
                  ]
                },
                "icon": {
                  "data": "🤨",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "hỏ?",
                "text_color": "#681D2A",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:lai_phai_lo",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#70C1B3",
                    "#B7E4A8",
                    "#F9F7A8"
                  ]
                },
                "icon": {
                  "data": "🫠",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "lại phải lọ",
                "text_color": "#294B42",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:noi_chuyen_met",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#6D597A",
                    "#9A789D",
                    "#D5B8D2"
                  ]
                },
                "icon": {
                  "data": "🫠",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "nói chuyện nghe mắc mệt",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:het_noi_noi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#52734D",
                    "#86A873",
                    "#D5E6A8"
                  ]
                },
                "icon": {
                  "data": "🙄",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "đúng là hết nói nổi",
                "text_color": "#263D27",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:chan_bo_may_di",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#6A0572",
                    "#AB1745",
                    "#FF7B54"
                  ]
                },
                "icon": {
                  "data": "🙄",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Chan bố mày đi",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:tuyet_doi_khong_nghe",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF416C",
                    "#FF4B2B"
                  ]
                },
                "icon": {
                  "data": "🙉",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Tuyệt đối không nghe",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:khong_thay_khong_nghe",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#C4D9CB",
                    "#E5E6D0",
                    "#F3D9C5"
                  ]
                },
                "icon": {
                  "data": "🙈",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "không biết, không thấy, không nghe",
                "text_color": "#425348",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:noi_it_lo",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#145A64",
                    "#398A8C",
                    "#B8E0D2"
                  ]
                },
                "icon": {
                  "data": "🤫",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "nói ít thôi, lộ hết bây giờ",
                "text_color": "#12383D",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:nguoi_im_lang_gap_nguoi_hay_noi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#232526",
                    "#414345",
                    "#6C7A89",
                    "#B0BEC5"
                  ]
                },
                "icon": {
                  "data": "🤐",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Người im lặng gặp người hay nói",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:noi_het_bi_mat_thi_co_yeu_hong",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#D8B4E2",
                    "#EAC7D8",
                    "#C4D7F2"
                  ]
                },
                "icon": {
                  "data": "🤫",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Nói hết bí mật thì có yêu hong",
                "text_color": "#55415F",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:eh_nha_ma",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F6C5B9",
                    "#F2BFC8",
                    "#E9C6DB"
                  ]
                },
                "icon": {
                  "data": "exclamationmark.bubble.fill",
                  "type": "sf_symbol",
                  "color": "#C47C89"
                },
                "max_lines": 1,
                "text": "ê nha má",
                "text_color": "#70454D",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:e_question",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#C8DDEB",
                    "#D4E3EB",
                    "#E2DCE9"
                  ]
                },
                "icon": {
                  "data": "questionmark.circle.fill",
                  "type": "sf_symbol",
                  "color": "#789CB5"
                },
                "max_lines": 1,
                "text": "ê ????",
                "text_color": "#4B5E70",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:chiu_luon_a",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#D3D0E8",
                    "#DCD2E9",
                    "#E8D9E6"
                  ]
                },
                "icon": {
                  "data": "🤷",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "chịu luôn á",
                "text_color": "#5B5472",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:dien_dau",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#D2C8E8",
                    "#DEC9E4",
                    "#EBCBD8"
                  ]
                },
                "icon": {
                  "data": "brain.head.profile",
                  "type": "sf_symbol",
                  "color": "#A07DAD"
                },
                "max_lines": 1,
                "text": "điên đầu quá đi mất",
                "text_color": "#624C6B",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:mac_met",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#D8C8E8",
                    "#E2CBE6",
                    "#EBCFDF"
                  ]
                },
                "icon": {
                  "data": "battery.0percent",
                  "type": "sf_symbol",
                  "color": "#A183B3"
                },
                "max_lines": 1,
                "text": "mắc mệt quá m ơi",
                "text_color": "#604D6C",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:y_la_met",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#C7DCE8",
                    "#D2E2E8",
                    "#E0E5E3"
                  ]
                },
                "icon": {
                  "data": "cloud.fill",
                  "type": "sf_symbol",
                  "color": "#7D9EAB"
                },
                "max_lines": 1,
                "text": "ý là mệt á 🥲",
                "text_color": "#4B626B",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:lai_mot_minh",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#C9CEE3",
                    "#D5D0E8",
                    "#E2D7E8"
                  ]
                },
                "icon": {
                  "data": "🥲",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "lại một mình nầy",
                "text_color": "#51546E",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:alone",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#C9CDE2",
                    "#D5CDE5",
                    "#E3D2E4"
                  ]
                },
                "icon": {
                  "data": "🌙",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "alone 😭",
                "text_color": "#505571",
                "type": "static_content"
              }
            }
          ]
        },
        {
          "section": "🎨 Deadline, Học hành & Tiền 💸",
          "items": [
            {
              "overlay_id": "caption:deadline_ruot",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#ED213A",
                    "#93291E"
                  ]
                },
                "icon": {
                  "data": "🔥",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Deadline dí tụt quần",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:doi_tru_deadline",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F0D1A4",
                    "#F5E2BD",
                    "#D5D9EF"
                  ]
                },
                "icon": {
                  "data": "📚",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "đời cho gì nhận nấy, trừ deadline",
                "text_color": "#5B4A35",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:di_lam_vi_dam_me",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FDC830",
                    "#F37335"
                  ]
                },
                "icon": {
                  "data": "🤡",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Đi làm vì đam mê",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ca_o_ran_doc",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#0F2027",
                    "#1B5E20",
                    "#66BB6A"
                  ]
                },
                "icon": {
                  "data": "🐍",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Cả ổ rắn độc",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:nghien_cuu_khoa_hoc",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#0F2027",
                    "#2C5364"
                  ]
                },
                "icon": {
                  "data": "☕",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Cần nạp cafein gấp",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:tien_dau_ma_tieu",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#11998E",
                    "#38EF7D"
                  ]
                },
                "icon": {
                  "data": "💸",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Tiền đâu mà tiêu",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:luc_nao_co_tien_thi_moi_di_a",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#0F2027",
                    "#203A43",
                    "#2C5364"
                  ]
                },
                "icon": {
                  "data": "💸",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Lúc nào có tiền thì mới đi á",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:doc_so_tai_khoan",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#1E90FF",
                    "#00D4FF"
                  ]
                },
                "icon": {
                  "data": "💳",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "đọc số tài khoản",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:co_tien_lam_phien_thien_ha",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#BFA06A",
                    "#E8D5AD",
                    "#F6EBDD"
                  ]
                },
                "icon": {
                  "data": "💰",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Có tiền làm phiền thiên hạ",
                "text_color": "#493824",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:co_tien_noi_tiep",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#075E54",
                    "#16A085",
                    "#B7E4C7"
                  ]
                },
                "icon": {
                  "data": "💸",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "có tiền thì nói chuyện tiếp",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:doc_lap_tai_chinh",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#B8C8B3",
                    "#D9DFC5",
                    "#EAD9B7"
                  ]
                },
                "icon": {
                  "data": "💰",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "độc lập tài chính, độc thân tình cảm",
                "text_color": "#405340",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:cu_tu_tu_khoai_se_nhu",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#56AB2F",
                    "#A8E063"
                  ]
                },
                "icon": {
                  "data": "🥔",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Cứ từ từ khoai sẽ nhừ",
                "text_color": "#000000E6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:kiem_tra_nhan_pham",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#654EA3",
                    "#EAAFC8"
                  ]
                },
                "icon": {
                  "data": "🎲",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Kiểm tra nhân phẩm",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:gac_buon_ngu",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#C9D5EE",
                    "#D8D5F0",
                    "#E9D9EF"
                  ]
                },
                "icon": {
                  "data": "moon.zzz.fill",
                  "type": "sf_symbol",
                  "color": "#7888BD"
                },
                "max_lines": 1,
                "text": "gấc buồn ngủ",
                "text_color": "#424B70",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:luoi_hoc_quaa",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#D4C6F0",
                    "#E2CBEF",
                    "#F0D5E8"
                  ]
                },
                "icon": {
                  "data": "📚",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "lười học quáa",
                "text_color": "#59476F",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:deadline_di",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F1C6B8",
                    "#EDCDB4",
                    "#E7D8B8"
                  ]
                },
                "icon": {
                  "data": "figure.run",
                  "type": "sf_symbol",
                  "color": "#C18A6E"
                },
                "max_lines": 1,
                "text": "+1 máy bị deadline dí 🏃🏾‍♂️💨",
                "text_color": "#694F40",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:chay_vi",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F2C4B6",
                    "#EFC8B1",
                    "#E9D2B8"
                  ]
                },
                "icon": {
                  "data": "💸",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "cháy ví",
                "text_color": "#6B4B3E",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:het_tien_vi_cai_nay",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F4C6B4",
                    "#EFC2B5",
                    "#E6C8C9"
                  ]
                },
                "icon": {
                  "data": "wallet.bifold.fill",
                  "type": "sf_symbol",
                  "color": "#C17F72"
                },
                "max_lines": 1,
                "text": "hết tiền vì cái này =))",
                "text_color": "#704C47",
                "type": "static_content"
              }
            }
          ]
        },
        {
          "section": "🎨 Daily & Đời thường ☕",
          "items": [
            {
              "overlay_id": "caption:ngay_moi_vui_ve",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFB703",
                    "#FFD166",
                    "#FFF0A8"
                  ]
                },
                "icon": {
                  "data": "☀️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Ngày mới vui vẻ",
                "text_color": "#69420A",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:coffee_time",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#4E342E",
                    "#8D6E63"
                  ]
                },
                "icon": {
                  "data": "☕",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Coffee Time!",
                "localized_text": {
                  "en": "Coffee Time!",
                  "vn": "Giờ uống cà phê!"
                },
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:matcha_latte",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#C8E6C9",
                    "#A5D6A7",
                    "#81C784"
                  ]
                },
                "icon": {
                  "data": "🍃",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Matcha Latte 🍵",
                "text_color": "#1B5E20E6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:mixue_time",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFF9C4",
                    "#F8BBD0"
                  ]
                },
                "icon": {
                  "data": "🍦",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Mixue Time!",
                "localized_text": {
                  "en": "Mixue Time!",
                  "vn": "Giờ Mixue!"
                },
                "text_color": "#000000E6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:tien_mua_tra_sua",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#D7B77D",
                    "#EAD6AA",
                    "#F5E7CC"
                  ]
                },
                "icon": {
                  "data": "🧋",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "tiền không mua được tất cả, nhưng mua được trà sữa",
                "text_color": "#5D472B",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:an_com_chua",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF9800",
                    "#F57C00"
                  ]
                },
                "icon": {
                  "data": "🍽️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Ăn cơm chưa?",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:dinner_time",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFCCBC",
                    "#FF8A80"
                  ]
                },
                "icon": {
                  "data": "🍽️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Dinner Time!",
                "localized_text": {
                  "en": "Dinner Time!",
                  "vn": "Giờ ăn tối!"
                },
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:di_choi_khong",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#E91E63",
                    "#C2185B"
                  ]
                },
                "icon": {
                  "data": "✈️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Đi chơi không?",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:tuyet_voi_uong_nao",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F0C58E",
                    "#F5D9A9",
                    "#EBC6B8"
                  ]
                },
                "icon": {
                  "data": "🥂",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "tuyệt vời, uống nào!",
                "text_color": "#65462D",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:shopping_time",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#B3E5FC",
                    "#FFFFFF"
                  ]
                },
                "icon": {
                  "data": "🛍️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Shopping Time!",
                "localized_text": {
                  "en": "Shopping Time!",
                  "vn": "Giờ mua sắm!"
                },
                "text_color": "#000000E6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:cinema_time",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#1A237E",
                    "#455A64"
                  ]
                },
                "icon": {
                  "data": "🎬",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Cinema Time!",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:tuyet_doi_dien_anh",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#455A64",
                    "#263238"
                  ]
                },
                "icon": {
                  "data": "📷",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Tuyệt đối điện ảnh",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:qua_la_dien_anh",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#26A69A",
                    "#00897B"
                  ]
                },
                "icon": {
                  "data": "📷",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Quá là điện ảnh",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:locket_time",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#ECEFF1",
                    "#B3E5FC"
                  ]
                },
                "icon": {
                  "data": "📷",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Locket Time!",
                "text_color": "#000000E6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:chilling_time",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#E1BEE7",
                    "#F8BBD0"
                  ]
                },
                "icon": {
                  "data": "🌴",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Chilling Time!",
                "localized_text": {
                  "en": "Chilling Time!",
                  "vn": "Giờ thư giãn!"
                },
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:graduation_day",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#1A237E",
                    "#283593"
                  ]
                },
                "icon": {
                  "data": "🎓",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Happy Graduation Day!",
                "localized_text": {
                  "en": "Happy Graduation Day!",
                  "vn": "Chúc mừng tốt nghiệp!"
                },
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:bien_oiiii",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#56CFE1",
                    "#72EFDD",
                    "#B8F3FF"
                  ]
                },
                "icon": {
                  "data": "🌊",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Biển ơiiii",
                "text_color": "#124559",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:hoi_chieu_troi_mua",
              "source": "remote",
              "caption": {
                "background": {
                  "image": {
                    "type": "image",
                    "data": "cloud_cover",
                    "source": "local"
                  },
                  "colors": [
                    "#546E7A",
                    "#263238"
                  ]
                },
                "icon": {
                  "data": "🌧️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Hồi chiều trời mưa...",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:rainy_day",
              "source": "remote",
              "caption": {
                "background": {
                  "image": {
                    "type": "image",
                    "data": "cloud_cover",
                    "source": "local"
                  },
                  "colors": [
                    "#6D4C41",
                    "#8D6E63",
                    "#BCAAA4"
                  ]
                },
                "icon": {
                  "data": "☕",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Rainy Day ☕🌧️",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:cam_lanh",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#2193B0",
                    "#6DD5ED"
                  ]
                },
                "icon": {
                  "data": "🤧",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Cảm lạnh",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:bau_troi_da_ly_huong",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#B8A1D9",
                    "#D8C6E8",
                    "#A9B8E8"
                  ]
                },
                "icon": {
                  "type": "sf_symbol",
                  "data": "cloud.moon.fill",
                  "color": "#FFFFFF"
                },
                "max_lines": 1,
                "text": "nhìn bầu trời màu dạ lý hương",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:night_vibes",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#B993D6",
                    "#8CA6DB",
                    "#C9B1FF"
                  ]
                },
                "icon": {
                  "data": "🪐",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Night Vibes 🌌",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:2am_thoughts",
              "source": "remote",
              "daily_start_hour": 1,
              "daily_end_hour": 3,
              "caption": {
                "background": {
                  "colors": [
                    "#0F2027",
                    "#203A43",
                    "#2C5364"
                  ]
                },
                "icon": {
                  "type": "sf_symbol",
                  "data": "cloud.bolt.fill",
                  "color": "#FFFFFFE6"
                },
                "max_lines": 1,
                "text": "2:00 AM Thoughts 🌙",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ngu_ngon",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#3F51B5",
                    "#1A237E"
                  ]
                },
                "icon": {
                  "type": "sf_symbol",
                  "data": "moon.zzz.fill",
                  "color": "#FFFFFFE6"
                },
                "max_lines": 1,
                "text": "Ngủ ngon",
                "text_color": "#FFFFFFE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:sweet_dream",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#A1C4FD",
                    "#C2E9FB",
                    "#E0F7FA"
                  ]
                },
                "icon": {
                  "data": "☁️",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "Sweet Dream 🧊",
                "text_color": "#1A237EE6",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:nhiem_vu_di_ngu",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#172554",
                    "#334EAC",
                    "#91A7FF"
                  ]
                },
                "icon": {
                  "data": "🫡",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "nhiệm vụ hệ thống: đi ngủ",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:da_den_luc_tat_nguon",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#283593",
                    "#5C6BC0",
                    "#B3C5FF"
                  ]
                },
                "icon": {
                  "data": "😴",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "đã đến lúc tắt nguồn",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:nao_nghi_lam_tay_van_online",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF6B35",
                    "#FF9F1C",
                    "#FFE0A3"
                  ]
                },
                "icon": {
                  "data": "🤡",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "não nghỉ làm, tay vẫn online",
                "text_color": "#672812",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:buon_ngu_chua_chiu_ngu",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#7B2CBF",
                    "#B185DB",
                    "#E0C3FC"
                  ]
                },
                "icon": {
                  "data": "🫠",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "buồn ngủ nhưng chưa chịu ngủ",
                "text_color": "#39204F",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:pin_nguoi_dung_con_1",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#D62828",
                    "#F77F00",
                    "#FCBF49"
                  ]
                },
                "icon": {
                  "data": "🚨",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "cảnh báo: pin người dùng còn 1%",
                "text_color": "#651515",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:nhiem_vu_hom_nay_nam_im",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#168AAD",
                    "#52B69A",
                    "#D9ED92"
                  ]
                },
                "icon": {
                  "data": "🛌",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "nhiệm vụ hôm nay: nằm im",
                "text_color": "#17483F",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:mai_tinh_nay_ngu",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#343A40",
                    "#6C757D",
                    "#ADB5BD"
                  ]
                },
                "icon": {
                  "data": "💀",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "mai tính, nay ngủ",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:offline_de_hoi_sinh",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#006D77",
                    "#83C5BE",
                    "#EDF6F9"
                  ]
                },
                "icon": {
                  "data": "💤",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "offline để hồi sinh",
                "text_color": "#164E52",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:xin_moii",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F6B6C8",
                    "#EBC6E8",
                    "#D8C8F4"
                  ]
                },
                "icon": {
                  "data": "👋",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "xin mờii",
                "text_color": "#633F59",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:helo_ca_nha_iu",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F4C3D5",
                    "#EBC6E8",
                    "#D8D1F2"
                  ]
                },
                "icon": {
                  "data": "💗",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "hé lô cả nhà iu",
                "text_color": "#694A68",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:ca_nha_thay_em_cute",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F4C5D9",
                    "#F5D2C8",
                    "#F7DFCA"
                  ]
                },
                "icon": {
                  "data": "face.smiling.fill",
                  "type": "sf_symbol",
                  "color": "#C77F9B"
                },
                "max_lines": 1,
                "text": "cả nhà thấy em cute hong ạ",
                "text_color": "#704B59",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:com_nuoc_chua",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F5C9B8",
                    "#F4D5B6",
                    "#F4E1C5"
                  ]
                },
                "icon": {
                  "data": "🍚",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "cơm nước gì chưa người đẹp",
                "text_color": "#6D5140",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:an_nho",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F8D5A8",
                    "#F6C6A8",
                    "#F3B9A9"
                  ]
                },
                "icon": {
                  "data": "🍜",
                  "type": "emoji"
                },
                "max_lines": 1,
                "text": "ăn nhó",
                "text_color": "#704A36",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:chup_moi_cho_an",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F5C5A9",
                    "#F5D5B6",
                    "#F8E2BE"
                  ]
                },
                "icon": {
                  "data": "camera.fill",
                  "type": "sf_symbol",
                  "color": "#C27F5E"
                },
                "max_lines": 1,
                "text": "chụp mới cho ăn",
                "text_color": "#684B3D",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:nham_nham",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#F8D7A7",
                    "#F5CBA1",
                    "#F2BDA5"
                  ]
                },
                "icon": {
                  "data": "birthday.cake.fill",
                  "type": "sf_symbol",
                  "color": "#D18D59"
                },
                "max_lines": 1,
                "text": "nhăm nhăm",
                "text_color": "#704D35",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:lanh_thay_me",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#BEDCEB",
                    "#C9E5EE",
                    "#D9E9EF"
                  ]
                },
                "icon": {
                  "data": "snowflake",
                  "type": "sf_symbol",
                  "color": "#6D9DB8"
                },
                "max_lines": 1,
                "text": "lạnh thấy mẹ 🥶",
                "text_color": "#405D70",
                "type": "static_content"
              }
            }
          ]
        },
        {
          "section": "🎨 Chứng nhận của Locket",
          "items": [
            {
              "overlay_id": "caption:locket_cuti",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#35B5E8",
                    "#19A1D8"
                  ]
                },
                "icon": {
                  "data": "checkmark.seal.fill",
                  "type": "sf_symbol"
                },
                "max_lines": 1,
                "text": "Locket xác nhận bạn cutii",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:locket_xinh",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FFD45C",
                    "#F5B91E"
                  ]
                },
                "icon": {
                  "data": "checkmark.seal.fill",
                  "type": "sf_symbol"
                },
                "max_lines": 1,
                "text": "Locket xác nhận bạn xjnh gái",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:locket_dep",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#258DEB",
                    "#1672D4"
                  ]
                },
                "icon": {
                  "data": "checkmark.seal.fill",
                  "type": "sf_symbol"
                },
                "max_lines": 1,
                "text": "Locket xác nhận bạn đẹp chai",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:locket_dangiu",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF638B",
                    "#F44772"
                  ]
                },
                "icon": {
                  "data": "checkmark.seal.fill",
                  "type": "sf_symbol"
                },
                "max_lines": 1,
                "text": "Locket xác nhận bạn dangiu",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:gai_dep",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#FF91AE",
                    "#F8759B"
                  ]
                },
                "icon": {
                  "data": "checkmark.seal.fill",
                  "type": "sf_symbol"
                },
                "max_lines": 1,
                "text": "Đã xác minh bạn là gái đẹp",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:trai_dep",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#4A9FEF",
                    "#267DD7"
                  ]
                },
                "icon": {
                  "data": "checkmark.seal.fill",
                  "type": "sf_symbol"
                },
                "max_lines": 1,
                "text": "Đã xác minh bạn là trai đẹp",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:be_ngoan",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#E9B9C5",
                    "#D9A4B3"
                  ]
                },
                "icon": {
                  "data": "checkmark.seal.fill",
                  "type": "sf_symbol"
                },
                "max_lines": 1,
                "text": "Đã xác nhận bạn là bé ngoan",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            },
            {
              "overlay_id": "caption:tuyen_duong",
              "source": "remote",
              "caption": {
                "background": {
                  "colors": [
                    "#D94A77",
                    "#B82D59"
                  ]
                },
                "icon": {
                  "data": "checkmark.seal.fill",
                  "type": "sf_symbol"
                },
                "max_lines": 1,
                "text": "Locket tuyên dương bạn cute",
                "text_color": "#FFFFFF",
                "type": "static_content"
              }
            }
          ]
        }
      ]
    };
    if (
      customCaptions.length > 0 &&
      Array.isArray(jsonConfigs.overlay_items)
    ) {
      const insertIdx = jsonConfigs.overlay_items.length > 0 ? 1 : 0;
      jsonConfigs.overlay_items.splice(insertIdx, 0, {
        section: studioTitle,
        items: customCaptions,
      });
    }

    if (
      customFrames.length > 0 &&
      jsonConfigs.camera_filter_config
    ) {
      const customIds = customFrames
        .map((f) => (f && typeof f.id === "string" ? f.id : ""))
        .filter(Boolean);
      if (customIds.length > 0) {
        const customGroup = {
          id: "group_user_custom",
          title: { en: studioTitle },
          filter_ids: customIds,
        };
        if (Array.isArray(jsonConfigs.camera_filter_config.sheet_filters)) {
          jsonConfigs.camera_filter_config.sheet_filters.unshift(customGroup);
        }
        if (Array.isArray(jsonConfigs.camera_filter_config.filter_groups)) {
          jsonConfigs.camera_filter_config.filter_groups.unshift(customGroup);
        }
        if (Array.isArray(jsonConfigs.camera_filter_config.picker_filters)) {
          jsonConfigs.camera_filter_config.picker_filters = [
            ...customIds,
            ...jsonConfigs.camera_filter_config.picker_filters,
          ];
        }
        if (Array.isArray(jsonConfigs.camera_filter_config.remote_filters)) {
          jsonConfigs.camera_filter_config.remote_filters = [
            ...customFrames,
            ...jsonConfigs.camera_filter_config.remote_filters,
          ];
        }
      }
    }

    if (
      jsonConfigs.camera_filter_config &&
      Array.isArray(jsonConfigs.camera_filter_config.remote_filters)
    ) {
      jsonConfigs.camera_filter_config.remote_filters.forEach((f) => {
        Object.assign(f, {
          overlay: true,
          filterType: "cutout",
          style: f.style || "cutout",
          type: f.type || "normal",
          tintColor: f.tintColor || (Array.isArray(f.colors) && f.colors[0]) || "#F5B82E",
          category: f.category || "AI Filter",
          outputUrl: f.outputUrl ?? null,
          requires_gold: false,
          requiresGold: false,
          is_gold: false,
          isGold: false,
          unlocked: true,
          is_unlocked: true,
          isUnlocked: true,
          free: true,
          allowsTryFilter: true,
          allows_try_filter: true,
        });
        if (f.icon && typeof f.icon === "object" && !f.icon.symbol && f.icon.sfSymbol) {
          f.icon.symbol = f.icon.sfSymbol;
        }
      });
    }

    const DEEP_MERGE_KEYS = new Set([
      "feature_gates",
      "camera",
      "camera_roll",
      "live_photos",
      "overlays_v2_config",
      "capture_classification_config",
      "journal_settings",
    ]);

    for (const [key, value] of Object.entries(jsonConfigs)) {
      if (DEEP_MERGE_KEYS.has(key) && typeof config.entries[key] === "string") {
        try {
          const upstream = JSON.parse(config.entries[key]);
          if (upstream && typeof upstream === "object" && !Array.isArray(upstream)) {
            config.entries[key] = JSON.stringify(Object.assign({}, upstream, value));
            continue;
          }
        } catch { }
      }
      config.entries[key] = JSON.stringify(value);
    }

    try {
      const streak = JSON.parse(config.entries.streak_config || "{}");
      Object.assign(streak, {
        "enabled": true,
        "free_recovery": true,
        "widget_streak_style": "hourglass_spinning",
        "widget_streak_visibility_setting_enabled": true,
        "calendar_minimum_streak_visualization_count": 1,
        "minimum_recovery_count": 0,
        "minimum_display_count": 0,
      });
      config.entries.streak_config = JSON.stringify(streak);
    } catch { }

    const respHeaders = {};
    const origHeaders = ($response && $response.headers) || {};
    for (const k of Object.keys(origHeaders)) {
      const lk = k.toLowerCase();
      if (lk === "etag" || lk === "cache-control" || lk === "content-length") continue;
      respHeaders[k] = origHeaders[k];
    }
    respHeaders["ETag"] = `"hnyb05-${Date.now()}"`;
    respHeaders["Cache-Control"] = "no-store, max-age=0";

    console.log(
      `[hnyb05-rc] applied title=${studioTitle} captions=${customCaptions.length} frames=${customFrames.length}`,
    );

    return $done({ headers: respHeaders, body: JSON.stringify(config) });
  }

  function readCachedStudio() {
    try {
      const raw =
        typeof $persistentStore !== "undefined" && $persistentStore.read("HNYB05_STUDIO_DATA");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  const uid = (typeof $persistentStore !== "undefined" && $persistentStore.read("HNYB05_UID")) || "";
  const cachedAllowed =
    (typeof $persistentStore !== "undefined" && $persistentStore.read("HNYB05_ALLOWED")) === "1";
  const lastAuthTs = Number(
    (typeof $persistentStore !== "undefined" && $persistentStore.read("HNYB05_AUTH_TS")) || "0",
  );

  if (!uid) {
    return cachedAllowed && Date.now() - lastAuthTs < CACHE_FALLBACK_MS
      ? applyUnlockedConfig(readCachedStudio())
      : $done({});
  }

  function buildRcDebugSnapshot() {
    try {
      const SKIP_LARGE = new Set([
        "overlay_items",
        "camera_filter_config",
        "history_gold_upsell_design_variants",
        "invite_link_config",
        "paywall_config",
        "report_problem_suggestions",
        "android_report_problem_suggestions",
        "remotely_enabled_amplitude_events",
      ]);
      const rawEntries = config && config.entries && typeof config.entries === "object" ? config.entries : {};
      const entries = {};
      for (const k of Object.keys(rawEntries)) {
        if (SKIP_LARGE.has(k)) {
          entries[k] = `<omitted len=${String(rawEntries[k]).length}>`;
          continue;
        }
        const v = String(rawEntries[k]);
        entries[k] = v.length > 600 ? `${v.slice(0, 600)}…` : v;
      }
      const reqMeta = {};
      if (typeof $request !== "undefined" && $request && typeof $request.body === "string") {
        try {
          const rb = JSON.parse($request.body);
          for (const f of ["countryCode", "country_code", "languageCode", "language_code", "timeZone", "time_zone", "appVersion", "app_version", "platformVersion", "sdkVersion"]) {
            if (rb && rb[f] !== undefined) reqMeta[f] = rb[f];
          }
        } catch {}
      }
      return {
        state: config.state || null,
        templateVersion: config.templateVersion || null,
        totalKeys: Object.keys(rawEntries).length,
        reqMeta,
        entries,
      };
    } catch {
      return null;
    }
  }

  $httpClient.post(
    {
      url: AUTH_URL,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, rcDebug: buildRcDebugSnapshot() }),
      timeout: 6,
    },
    (err, resp, data) => {
      if (!err && data) {
        try {
          const auth = JSON.parse(data);
          const studioPayload = {
            studioTitle: auth.studioTitle || "",
            studioUrl: auth.studioUrl || "",
            customCaptions: Array.isArray(auth.customCaptions) ? auth.customCaptions : [],
            customFrames: Array.isArray(auth.customFrames) ? auth.customFrames : [],
          };
          if (typeof $persistentStore !== "undefined") {
            $persistentStore.write(auth.allowed ? "1" : "0", "HNYB05_ALLOWED");
            $persistentStore.write(String(auth.status || ""), "HNYB05_STATUS");
            $persistentStore.write(String(Date.now()), "HNYB05_AUTH_TS");
            if (Array.isArray(auth.vipUids)) {
              $persistentStore.write(JSON.stringify(auth.vipUids), "HNYB05_VIP_UIDS");
            }
            if (auth.allowed === true) {
              $persistentStore.write(JSON.stringify(studioPayload), "HNYB05_STUDIO_DATA");
            }
          }
          return auth.allowed === true ? applyUnlockedConfig(studioPayload) : $done({});
        } catch {
          return $done({});
        }
      }

      return cachedAllowed && Date.now() - lastAuthTs < CACHE_FALLBACK_MS
        ? applyUnlockedConfig(readCachedStudio())
        : $done({});
    },
  );
})();
