/* Little Hands — page behaviour: keeps pieces, workshops and contacts in sync
   with the data files, and runs the live clock. */
(function () {
  "use strict";

  var R = window.LH_RENDER;
  var cfg = window.LH_CONFIG || {};
  var lang = document.documentElement.lang === "ar" ? "ar" : "en";
  var assets = new URL(".", document.currentScript.src).href;

  /* Redraw from the data files, so an edit to products.js or workshops.js
     shows up even before build.js has been run again. */
  if (R) {
    var l = R.links(cfg, lang);
    document.querySelectorAll("[data-wa]").forEach(function (a) {
      var kind = a.getAttribute("data-wa");
      if (l[kind]) a.href = l[kind];
    });
    var grid = document.getElementById("pieces-grid");
    if (grid && window.LH_PRODUCTS) grid.innerHTML = R.pieces(window.LH_PRODUCTS, lang, cfg, assets);
    var wl = document.getElementById("workshops-list");
    if (wl && window.LH_WORKSHOPS) wl.innerHTML = R.workshops(window.LH_WORKSHOPS, lang, cfg, assets);
    var cl = document.getElementById("contact-list");
    if (cl) cl.innerHTML = R.contacts(cfg, lang);
  }

  /* ---- live clock, Al Khobar time (UTC+3, no daylight saving) ---- */
  var clock = document.getElementById("clock");
  if (!clock) return;

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var numerals = lang === "ar" ? ["١٢", "٣", "٦", "٩"] : ["12", "3", "6", "9"];
  var brand = lang === "ar" ? "ليتل هاندز" : "Little Hands";
  var timeText = lang === "ar"
    ? function (t) { return "الساعة الآن " + t + " في الخبر"; }
    : function (t) { return "It's " + t + " in Al Khobar"; };

  var seed = 11;
  function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  function r1(v) { return Math.round(v * 10) / 10; }

  /* hand-placed look: every mark is nudged a little, like a face drawn by hand */
  var marks = "";
  for (var i = 0; i < 60; i++) {
    if (i % 15 === 0) continue;
    var a = (i * 6 + (rnd() - 0.5) * 1.8) * Math.PI / 180;
    if (i % 5 === 0) {
      var ro = 151 - rnd() * 3, ri = 135 + rnd() * 3;
      marks += '<line x1="' + r1(200 + ro * Math.sin(a)) + '" y1="' + r1(200 - ro * Math.cos(a)) + '" x2="' + r1(200 + ri * Math.sin(a)) + '" y2="' + r1(200 - ri * Math.cos(a)) + '"/>';
    } else {
      var rd = 149 + (rnd() - 0.5) * 2;
      marks += '<circle cx="' + r1(200 + rd * Math.sin(a)) + '" cy="' + r1(200 - rd * Math.cos(a)) + '" r="1.8" stroke="none"/>';
    }
  }
  var numPos = [[200, 73], [328, 200], [200, 327], [72, 200]];
  var nums = numerals.map(function (n, k) {
    return '<text x="' + numPos[k][0] + '" y="' + numPos[k][1] + '">' + n + "</text>";
  }).join("");

  clock.innerHTML =
    '<svg viewBox="0 0 400 400" direction="ltr" aria-hidden="true" focusable="false">' +
      '<circle cx="210" cy="212" r="170" fill="#E4DCF0"/>' +
      '<circle cx="200" cy="200" r="170" fill="#FCFAFE" stroke="#2B1E36" stroke-width="3.5"/>' +
      '<circle cx="201.6" cy="198.6" r="167" fill="none" stroke="#2B1E36" stroke-width="1.2" opacity=".32"/>' +
      '<g stroke="#2B1E36" stroke-width="4.5" stroke-linecap="round" fill="#66577A">' + marks + "</g>" +
      '<g class="clock-nums" fill="#2B1E36" text-anchor="middle" dominant-baseline="central">' + nums + "</g>" +
      '<text class="clock-brand" x="200" y="262" text-anchor="middle" fill="#66577A">' + brand + "</text>" +
      '<g class="hand hand-h"><path d="M200 216C188 196 187 150 200 106C213 150 212 196 200 216Z" fill="#E5A233" stroke="#2B1E36" stroke-width="3" stroke-linejoin="round"/></g>' +
      '<g class="hand hand-m"><path d="M200 222C194 196 195 120 200 58C205 120 206 196 200 222Z" fill="#2B1E36"/></g>' +
      '<g class="hand hand-s"><line x1="200" y1="234" x2="200" y2="52" stroke="#C76B7A" stroke-width="2.4" stroke-linecap="round"/><circle cx="200" cy="80" r="6" fill="#C76B7A"/></g>' +
      '<circle cx="200" cy="200" r="10" fill="#2B1E36"/><circle cx="200" cy="200" r="4" fill="#E5A233"/>' +
    "</svg>";

  var hH = clock.querySelector(".hand-h"), hM = clock.querySelector(".hand-m"), hS = clock.querySelector(".hand-s");
  var timeEl = document.getElementById("clock-time");
  var fmt = new Intl.DateTimeFormat(lang === "ar" ? "ar-SA" : "en-US", { timeZone: "Asia/Riyadh", hour: "numeric", minute: "2-digit" });

  /* angles only ever grow, so a hand never spins backwards at midnight */
  var t0 = Date.now();
  var s0 = ((t0 / 1000) + 3 * 3600) % 86400;
  var base = { h: (s0 % 43200) / 120, m: (s0 % 3600) * 0.1, s: Math.floor(s0 % 60) * 6 };

  function paint() {
    var dt = (Date.now() - t0) / 1000;
    hH.style.transform = "rotate(" + (base.h + dt / 120) + "deg)";
    hM.style.transform = "rotate(" + (base.m + dt * 0.1) + "deg)";
    hS.style.transform = "rotate(" + (base.s + (Math.floor(s0 + dt) - Math.floor(s0)) * 6) + "deg)";
  }
  var lastLabel = "";
  function label() {
    var text = timeText(fmt.format(new Date()));
    if (timeEl && text !== lastLabel) { timeEl.textContent = text; lastLabel = text; }
  }
  function loop() {
    paint(); label();
    setTimeout(loop, 1000 - (Date.now() % 1000) + 5);
  }

  label();
  if (reduced) {
    paint();
    setInterval(function () { paint(); label(); }, 10000);
  } else {
    /* one sweep from 12 to the real time on load, then ticking.
       The timer is a fallback for tabs that open in the background and draw no frames. */
    var started = false;
    var start = function () {
      if (started) return;
      started = true;
      paint();
      setTimeout(function () {
        clock.classList.remove("sweep");
        clock.classList.add("ticking");
        loop();
      }, 1700);
    };
    clock.classList.add("sweep");
    requestAnimationFrame(function () { requestAnimationFrame(start); });
    setTimeout(start, 250);
  }
})();
