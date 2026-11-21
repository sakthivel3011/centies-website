// Usage (from the website folder): node scripts/make-decor.mjs
// Makes the web copies of the decorative artwork in public/images/decor/ from the originals in assets-src/bg/
// (kept outside public/ so they are not published; the published site only needs the WebP copies).
// To change a piece of artwork, put its original in assets-src/bg/ under the name below and run this script.
//  - 3, 4, 6 and 9–15: the plain background is removed ("colour to alpha"), so on white they look identical
//    but they can sit over other things; then trimmed to the artwork.
//  - 7, 8: full illustrations, just converted to WebP.
import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";

const SRC = "assets-src/bg";
const OUT = "public/images/decor";
mkdirSync(OUT, { recursive: true });

/**
 * Removes the flat background colour (taken from the top-left pixel: white for most, light grey for bg 10).
 * Opacity is how far each pixel is from that colour (GIMP's colour-to-alpha), slightly boosted so colours stay solid.
 * For a white background this is exactly the old white-to-alpha.
 */
async function toAlpha(file, name) {
  const { data, info } = await sharp(`${SRC}/${file}`).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const bg = [data[0], data[1], data[2]];
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const px = [data[i], data[i + 1], data[i + 2]];
    // Per channel: distance from the background, as a share of the room left towards black (darker) or white (lighter)
    let a = Math.max(...px.map((c, k) => (c >= bg[k] ? (bg[k] === 255 ? 0 : (c - bg[k]) / (255 - bg[k])) : (bg[k] - c) / bg[k])));
    // JPEG noise around a grey background is not artwork
    if (Math.max(...px.map((c, k) => Math.abs(c - bg[k]))) < 15) a = 0;
    a = a < 0.06 ? 0 : Math.min(1, a / 0.8);
    const un = (c, k) => (a === 0 ? 0 : Math.max(0, Math.min(255, Math.round((c - bg[k]) / a + bg[k]))));
    out[j] = un(px[0], 0);
    out[j + 1] = un(px[1], 1);
    out[j + 2] = un(px[2], 2);
    out[j + 3] = Math.round(a * 255);
  }
  const img = await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer();
  const res = await sharp(img).trim({ threshold: 1 }).webp({ quality: 86, alphaQuality: 90 }).toFile(`${OUT}/${name}.webp`);
  console.log(`${name}.webp`, `${res.width}x${res.height}`, `${(res.size / 1024).toFixed(1)} KB`);
}

async function convert(file, name) {
  const res = await sharp(`${SRC}/${file}`).webp({ quality: 82 }).toFile(`${OUT}/${name}.webp`);
  console.log(`${name}.webp`, `${res.width}x${res.height}`, `${(res.size / 1024).toFixed(1)} KB`);
}

const JOBS = [
  ["3.jpg", "arc", toAlpha],
  ["4.webp", "wave", toAlpha],
  ["6.jpg", "ribbon", toAlpha],
  ["7.jpg", "pattern", convert],
  ["8.jpg", "players", convert],
  ["9.jpg", "flow", toAlpha],
  ["10.jpg", "arrow", toAlpha],
  ["11.jpg", "swells", toAlpha],
  ["12.jpg", "streaks", toAlpha],
  ["13.jpg", "comet", toAlpha],
  ["14.jpg", "fan", toAlpha],
  ["15.jpg", "banner", toAlpha],
];
// Only the originals that are present are processed; the existing WebP copies of the others are left as they are.
for (const [file, name, make] of JOBS) {
  if (existsSync(`${SRC}/${file}`)) await make(file, name);
  else console.log(`skipped ${name}.webp (no ${SRC}/${file})`);
}
