/* Little Hands — shared rendering for pieces, workshops and contacts.
   Used in the browser (window.LH_RENDER) and by build.js (Node), so the
   HTML that search engines read and the page people see always match. */
(function (root) {
  "use strict";

  var STR = {
    en: {
      general: "Hi Little Hands! I saw your website and I'd like to ask about an order.",
      custom: "Hi Little Hands! I'd like a custom order.\nOccasion:\nColours:\nHow many:\nNeeded by:",
      private: "Hi Little Hands! I'd like to book a private class for a group.\nWhich class:\nHow many people:\nOccasion and date:",
      item: function (n) { return "Hi Little Hands! I'd like to ask about the " + n + "."; },
      workshop: function (n) { return "Hi Little Hands! I'd like to sign up for the " + n + " workshop.\nHow many people:\nDays that suit me:"; },
      ask: "Ask about this",
      signUp: "Sign up on WhatsApp",
      from: function (p) { return "From SAR " + p; },
      perPerson: function (p) { return "SAR " + p + " per person"; },
      progress: function (n, m) { return n + " of " + m + " signed up"; },
      first: function (m) { return m + " places. Be the first to sign up."; },
      full: "The class is on. Message to get your spot and the date.",
      runsAt: function (m) { return "Runs once " + m + " people sign up"; },
      noDate: "date set once the group is full",
      sep: ", ",
      subject: "Order enquiry",
      labels: { whatsapp: "WhatsApp", email: "Email", instagram: "Instagram" },
      locale: "en-US"
    },
    ar: {
      general: "مرحبًا ليتل هاندز! شاهدت موقعكم وأود الاستفسار عن طلب.",
      custom: "مرحبًا ليتل هاندز! أود طلب قطعة خاصة.\nالمناسبة:\nالألوان:\nالكمية:\nموعد الاستلام:",
      private: "مرحبًا ليتل هاندز! أود حجز ورشة خاصة لمجموعة.\nالورشة:\nعدد الأشخاص:\nالمناسبة والتاريخ:",
      item: function (n) { return "مرحبًا ليتل هاندز! أود الاستفسار عن " + n + "."; },
      workshop: function (n) { return "مرحبًا ليتل هاندز! أود التسجيل في " + n + ".\nعدد الأشخاص:\nالأيام المناسبة لي:"; },
      ask: "اسألوا عنها",
      signUp: "سجّلوا عبر واتساب",
      from: function (p) { return "يبدأ من " + p + " ر.س"; },
      perPerson: function (p) { return p + " ر.س للشخص"; },
      progress: function (n, m) { return "سجّل " + n + " من " + m; },
      first: function (m) { return m + " أماكن. كونوا أول المسجّلين."; },
      full: "اكتمل العدد وستُقام الورشة. راسلوني لحجز مكانكم ومعرفة الموعد.",
      runsAt: function (m) { return "تُقام الورشة عند تسجيل " + m + " أشخاص"; },
      noDate: "يُحدَّد الموعد عند اكتمال العدد",
      sep: "، ",
      subject: "استفسار عن طلب",
      labels: { whatsapp: "واتساب", email: "البريد الإلكتروني", instagram: "إنستغرام" },
      locale: "ar-SA"
    }
  };

  var CHAT_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8.6 9.4c.3 2.4 2.4 4.6 5 5.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function num(n, lang) { return Number(n).toLocaleString(STR[lang].locale); }
  function waLink(cfg, text) {
    return "https://wa.me/" + String(cfg.whatsapp || "").replace(/\D/g, "") + "?text=" + encodeURIComponent(text);
  }
  function waAnchor(cls, label, href, srName) {
    return '<a class="' + cls + '" href="' + esc(href) + '" target="_blank" rel="noopener">' + CHAT_ICON +
      "<span>" + esc(label) + (srName ? '<span class="sr-only">: ' + esc(srName) + "</span>" : "") + "</span></a>";
  }
  function art(item, lang, assets) {
    var inner = item.photo
      ? '<img src="' + esc(assets + item.photo) + '" alt="' + esc(item[lang].name) + '" loading="lazy" decoding="async">'
      : '<svg viewBox="0 0 240 200" aria-hidden="true" focusable="false"><use href="' + esc(assets + "art.svg#" + item.art) + '"></use></svg>';
    return '<div class="art" style="background:' + esc(item.swatch) + '">' + inner + "</div>";
  }
  function candle(lit) {
    return '<svg viewBox="0 0 24 40" aria-hidden="true" focusable="false">' +
      (lit ? '<path d="M12 2C8 7 8.6 11.5 12 13.5C15.4 11.5 16 7 12 2Z" fill="#E5A233" stroke="#2B1E36" stroke-width="1.6" stroke-linejoin="round"/>' : "") +
      '<path d="M12 13.5V17" stroke="#2B1E36" stroke-width="1.8" stroke-linecap="round"/>' +
      '<rect x="5" y="17" width="14" height="21" rx="4" fill="' + (lit ? "#F6D995" : "none") + '" stroke="#2B1E36" stroke-width="1.8"/></svg>';
  }

  function links(cfg, lang) {
    var t = STR[lang];
    return { general: waLink(cfg, t.general), custom: waLink(cfg, t.custom), private: waLink(cfg, t.private) };
  }

  function pieces(products, lang, cfg, assets) {
    var t = STR[lang];
    return products.map(function (p) {
      var c = p[lang];
      return '<li class="piece">' + art(p, lang, assets) +
        "<h3>" + esc(c.name) + "</h3><p>" + esc(c.desc) + "</p>" +
        (p.price ? '<p class="price">' + esc(t.from(num(p.price, lang))) + "</p>" : "") +
        waAnchor("ask", t.ask, waLink(cfg, t.item(c.name)), c.name) + "</li>";
    }).join("\n");
  }

  function workshops(list, lang, cfg, assets) {
    var t = STR[lang];
    return list.map(function (w) {
      var c = w[lang];
      var min = w.minimum || 4;
      var joined = Math.max(0, w.signedUp || 0);
      var lit = Math.min(joined, min);
      var isOn = joined >= min;
      var status = isOn ? t.full : (joined === 0 ? t.first(num(min, lang)) : t.progress(num(joined, lang), num(min, lang)));
      var meta = [t.runsAt(num(min, lang))];
      if (w.price) meta.push(t.perPerson(num(w.price, lang)));
      meta.push(c.when || t.noDate);
      var candles = "";
      for (var i = 0; i < min; i++) candles += candle(i < lit);
      return '<li class="workshop' + (isOn ? " is-on" : "") + '">' + art(w, lang, assets) +
        '<div class="workshop-body"><h3>' + esc(c.name) + "</h3><p>" + esc(c.desc) + "</p>" +
        '<p class="workshop-meta">' + esc(meta.join(t.sep)) + "</p></div>" +
        '<div class="workshop-join"><div class="meter" role="img" aria-label="' + esc(status) + '">' + candles + "</div>" +
        '<p class="meter-label">' + esc(status) + "</p>" +
        waAnchor("btn btn-small", t.signUp, waLink(cfg, t.workshop(c.name)), c.name) + "</div></li>";
    }).join("\n");
  }

  function contacts(cfg, lang) {
    var t = STR[lang];
    var rows = [];
    if (cfg.whatsapp) rows.push(["whatsapp", waLink(cfg, t.general), cfg.whatsappDisplay || cfg.whatsapp, true]);
    if (cfg.email) rows.push(["email", "mailto:" + cfg.email + "?subject=" + encodeURIComponent(t.subject), cfg.email, false]);
    if (cfg.instagram) {
      var h = String(cfg.instagram).replace(/^@/, "");
      rows.push(["instagram", "https://instagram.com/" + h, "@" + h, true]);
    }
    return rows.map(function (r) {
      return '<li><span class="contact-label">' + esc(t.labels[r[0]]) + '</span><a dir="ltr" href="' + esc(r[1]) + '"' +
        (r[3] ? ' target="_blank" rel="noopener"' : "") + ">" + esc(r[2]) + "</a></li>";
    }).join("\n");
  }

  var api = { STR: STR, esc: esc, waLink: waLink, links: links, pieces: pieces, workshops: workshops, contacts: contacts };
  root.LH_RENDER = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
