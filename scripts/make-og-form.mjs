// Usage (from the website folder): node scripts/make-og-form.mjs "<path to chrome.exe or msedge.exe>"
// Makes the registration site's link-preview picture ../form/public/images/og-image.jpg (1200×630): the same layout as
// the main website's (scripts/make-og.mjs) — athletes artwork on the right, white left side — but with the registration
// text, in the form site's fonts (Barlow Condensed + Manrope). Lives here because the artwork and sharp are in this project.
import sharp from "sharp";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [, , browser] = process.argv;
if (!browser) throw new Error("pass the path to chrome.exe or msedge.exe");

const W = 1200;
const H = 630;
const ART = "assets-src/og-art.png";
const FORM = "../form";
const OUT = `${FORM}/public/images/og-image.jpg`;
const tmp = mkdtempSync(join(tmpdir(), "og-form-"));
const url = (p) => pathToFileURL(resolve(p)).href;

// Same crops as make-og.mjs: the athletes, and the blue/orange stripes from the artwork's top-left corner
await sharp(ART).extract({ left: 1085, top: 10, width: 1037, height: 710 }).linear(1.01, 0).png().toFile(join(tmp, "athletes.png"));
await sharp(ART).extract({ left: 0, top: 0, width: 202, height: 117 }).linear(1.01, 0).png().toFile(join(tmp, "stripes.png"));

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: "Barlow Condensed"; font-weight: 800; src: url("${url(`${FORM}/node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-800-normal.woff2`)}") format("woff2"); }
@font-face { font-family: "Manrope"; font-weight: 200 800; src: url("${url(`${FORM}/node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2`)}") format("woff2"); }
html, body { margin: 0; width: ${W}px; height: ${H}px; overflow: hidden; background: #fff; }
body { position: relative; font-family: "Manrope", sans-serif; color: #141629; -webkit-font-smoothing: antialiased; }
.stripes { position: absolute; left: 0; top: 0; width: 150px; mix-blend-mode: multiply; }
.art { position: absolute; right: 26px; top: 50%; transform: translateY(-50%); height: 450px; mix-blend-mode: multiply; }
.copy { position: absolute; left: 64px; top: 50%; transform: translateY(-50%); width: 470px; }
.brand { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; }
.brand img { width: 54px; height: 54px; border-radius: 50%; }
.brand b { display: block; font-family: "Barlow Condensed"; font-weight: 800; font-size: 31px; letter-spacing: 0.04em; line-height: 1; color: #1f2e8c; }
.brand small { display: block; margin-top: 4px; font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #5b6070; }
.eyebrow { margin: 0 0 10px; font-size: 15px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; color: #26379f; }
h1 { margin: 0; font-family: "Barlow Condensed"; font-weight: 800; font-size: 78px; line-height: 0.88; letter-spacing: 0.025em; text-transform: uppercase; color: #10184a; }
h1 span { color: #cc3d14; }
p { margin: 22px 0 0; font-size: 20px; line-height: 1.45; color: rgb(20 22 41 / 0.8); text-wrap: balance; }
.site { position: absolute; left: 64px; bottom: 36px; font-size: 16px; font-weight: 700; letter-spacing: 0.02em; color: #1f2e8c; }
</style></head><body>
<img class="stripes" src="${url(join(tmp, "stripes.png"))}" alt="">
<img class="art" src="${url(join(tmp, "athletes.png"))}" alt="">
<div class="copy">
  <div class="brand"><img src="${url(`${FORM}/public/images/logo/centies-logo-192.png`)}" alt=""><span><b>CENTIES</b><small>Inter Engineering Sports</small></span></div>
  <p class="eyebrow">15th CENTIES Championship 2026</p>
  <h1>College<br><span>Registration</span></h1>
  <p>Register your college online. 14 events for men, 10 for women. Fee from ₹2,000, paid securely online.</p>
</div>
<div class="site">centies.in/register</div>
</body></html>`;
writeFileSync(join(tmp, "og.html"), html);

const shot = join(tmp, "og.png");
const res = spawnSync(
  browser,
  ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", `--window-size=${W},${H}`, "--virtual-time-budget=3000", "--allow-file-access-from-files", `--user-data-dir=${join(tmp, "profile")}`, `--screenshot=${shot}`, url(join(tmp, "og.html"))],
  { stdio: "ignore" },
);
if (res.status !== 0) throw new Error(`browser exited with ${res.status}`);

const out = await sharp(shot).resize(W, H, { fit: "cover", position: "left top" }).jpeg({ quality: 86, mozjpeg: true }).toFile(OUT);
console.log(OUT, `${out.width}x${out.height}`, `${(out.size / 1024).toFixed(0)} KB`);
