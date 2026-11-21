// Turns every route into a static HTML file so pages load instantly and are indexed by search engines.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle). No server is needed at runtime.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const site = (process.env.VITE_SITE_URL || "https://www.centies.in").replace(/\/$/, "");
const template = readFileSync(join(dist, "index.html"), "utf8");
const { render, staticPaths, EVENT, ORG } = await import(pathToFileURL(join(root, "dist-ssr", "entry-server.js")).href);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Preload the fonts used above the fold so headings don't flash in a fallback font.
const assets = readdirSync(join(dist, "assets"));
const fontPreloads = [/^inter-latin-wght-normal-.*\.woff2$/, /^barlow-condensed-latin-800-normal-.*\.woff2$/, /^barlow-condensed-latin-700-normal-.*\.woff2$/]
  .map((re) => assets.find((f) => re.test(f)))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`);

// Largest image on the page (the home hero photo) is fetched immediately.
const PAGE_PRELOADS = {
  "/": `<link rel="preload" as="image" href="/images/bg/1.webp" imagesrcset="/images/bg/1-sm.webp 768w, /images/bg/1-md.webp 1280w, /images/bg/1.webp 2172w" imagesizes="100vw" fetchpriority="high" />`,
};

const jsonLd = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
const titles = new Map();

function structuredData(path) {
  const out = [];
  if (path !== "/" && titles.has(path)) {
    const parts = path.split("/").filter(Boolean);
    const items = [{ name: "Home", path: "/" }];
    parts.forEach((_, i) => {
      const p = "/" + parts.slice(0, i + 1).join("/");
      if (titles.has(p)) items.push({ name: titles.get(p), path: p });
    });
    out.push(
      jsonLd({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: site + it.path })),
      }),
    );
  }
  // A SportsEvent is only published once real dates are set in src/content/event.ts.
  if ((path === "/" || path === "/championship") && EVENT.startDate) {
    out.push(
      jsonLd({
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        name: EVENT.name,
        startDate: EVENT.startDate,
        ...(EVENT.endDate ? { endDate: EVENT.endDate } : {}),
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: "Engineering colleges in Coimbatore, Erode, Nilgiris and Tiruppur",
          address: { "@type": "PostalAddress", addressRegion: "Tamil Nadu", addressCountry: "IN" },
        },
        organizer: { "@type": "SportsOrganization", name: ORG.name, url: site + "/" },
        url: site + "/championship",
      }),
    );
  }
  return out;
}

async function page(path) {
  const { html, title, description } = await render(path);
  const canonical = site + (path === "/" ? "/" : path);
  const head = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    ...fontPreloads,
    PAGE_PRELOADS[path],
    ...structuredData(path),
  ].filter(Boolean);
  return template
    .replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(description)}" />`)
    .replace('content="/images/og-image.jpg"', `content="${site}/images/og-image.jpg"`)
    .replace("<!--meta-->", head.join("\n    "))
    .replace(`<div id="root"><!--app--></div>`, `<div id="root">${html}</div>`);
}

const paths = staticPaths();
// First pass collects short page titles (used for breadcrumbs); second pass writes the files.
for (const path of paths) titles.set(path, (await render(path)).shortTitle);
for (const path of paths) {
  // Flat files (about.html, gallery/centies-2018.html) are served at /about, /gallery/centies-2018 with clean URLs.
  const file = path === "/" ? join(dist, "index.html") : join(dist, `${path.slice(1)}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, await page(path));
}
writeFileSync(join(dist, "404.html"), (await page("/__not-found__")).replace(/\n\s*<link rel="canonical"[^>]*>/, ""));

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map((p) => `  <url><loc>${site}${p === "/" ? "/" : p}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`,
);
writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
rmSync(join(root, "dist-ssr"), { recursive: true, force: true });
console.log(`prerendered ${paths.length} pages + 404, sitemap.xml, robots.txt`);
