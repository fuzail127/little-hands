/*
  Little Hands — build step
  ------------------------------------------------------------
  Writes the pieces, workshops and contact details from assets/*.js into
  index.html and ar/index.html, so search engines and AI assistants (which
  often don't run JavaScript) can read the whole shop. Also refreshes
  llms.txt and the sitemap date.

  Run after editing config.js, products.js or workshops.js:
      node build.js
*/
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = __dirname;
const SITE = "https://littlehands.art/";
const PLACEHOLDER_WA = "966000000000";
const PLACEHOLDER_EMAIL = "hello@example.com";

const sandbox = { window: {}, globalThis: {} };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
for (const f of ["config.js", "products.js", "workshops.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, "assets", f), "utf8"), sandbox, { filename: f });
}
const cfg = sandbox.window.LH_CONFIG;
const products = sandbox.window.LH_PRODUCTS;
const workshops = sandbox.window.LH_WORKSHOPS;
const R = require("./assets/render.js");

function between(html, name, content) {
  const re = new RegExp("(<!-- " + name + ":start -->)[\\s\\S]*?(<!-- " + name + ":end -->)");
  if (!re.test(html)) throw new Error("Marker '" + name + "' missing");
  return html.replace(re, (_, a, b) => a + "\n" + content + "\n" + b);
}

for (const page of [{ file: "index.html", lang: "en", assets: "assets/" }, { file: "ar/index.html", lang: "ar", assets: "../assets/" }]) {
  const p = path.join(root, page.file);
  let html = fs.readFileSync(p, "utf8");
  html = between(html, "pieces", R.pieces(products, page.lang, cfg, page.assets));
  html = between(html, "workshops", R.workshops(workshops, page.lang, cfg, page.assets));
  html = between(html, "contacts", R.contacts(cfg, page.lang));
  const links = R.links(cfg, page.lang);
  html = html.replace(/data-wa="(\w+)" href="[^"]*"/g, (m, kind) =>
    links[kind] ? 'data-wa="' + kind + '" href="' + R.esc(links[kind]) + '"' : m);
  fs.writeFileSync(p, html);
  console.log("built " + page.file);
}

/* llms.txt — facts only. Contacts are included once they are real. */
const realWa = cfg.whatsapp && cfg.whatsapp !== PLACEHOLDER_WA;
const realEmail = cfg.email && cfg.email !== PLACEHOLDER_EMAIL;
const lines = [
  "# Little Hands (ليتل هاندز)",
  "",
  "> Handmade clocks, natural wax candles and wax scent pouches, made by one maker in Al Khobar,",
  "> Eastern Province, Saudi Arabia. Custom orders, wedding and occasion favours, and small",
  "> hands-on workshops. Orders and sign-ups are taken by message.",
  "",
  "## Pieces",
  ...products.map((p) => "- " + p.en.name + ": " + p.en.desc + (p.price ? " From SAR " + p.price + "." : "")),
  "",
  "## Workshops",
  ...workshops.map((w) => "- " + w.en.name + ": " + w.en.desc + " Runs once " + (w.minimum || 4) + " people sign up." + (w.price ? " SAR " + w.price + " per person." : "")),
  "- Private classes for groups of four or more.",
  "",
  "## Where",
  "Al Khobar, Eastern Province, Saudi Arabia. Pickup or delivery is arranged when you order.",
  "",
  "## Contact",
  ...(realWa ? ["WhatsApp: " + (cfg.whatsappDisplay || "+" + cfg.whatsapp)] : []),
  ...(realEmail ? ["Email: " + cfg.email] : []),
  ...(cfg.instagram ? ["Instagram: https://instagram.com/" + String(cfg.instagram).replace(/^@/, "")] : []),
  ...(!realWa && !realEmail ? ["See the contact section: " + SITE + "#contact"] : []),
  "",
  "## Pages",
  "- English: " + SITE,
  "- Arabic: " + SITE + "ar/",
  ""
];
fs.writeFileSync(path.join(root, "llms.txt"), lines.join("\n"));
console.log("built llms.txt" + (realWa || realEmail ? "" : " (contacts still placeholders, left out)"));

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(root, "sitemap.xml"),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${SITE}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${SITE}ar/"/>
  </url>
  <url>
    <loc>${SITE}ar/</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${SITE}ar/"/>
  </url>
</urlset>
`);
console.log("built sitemap.xml");
if (!realWa) console.warn("NOTE: WhatsApp number in assets/config.js is still the placeholder.");
