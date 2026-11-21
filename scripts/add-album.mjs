// Adds a photo album to the gallery: converts photos to WebP (1600px + 640px thumbnails), strips
// location/camera data, and registers the album in src/content/gallery.json.
//
//   npm run add-album -- <folder-with-photos> --slug centies-2025 --title "XIV CENTIES 2025" --year 2025 --edition 14 \
//        --venue "Kongu Engineering College, Perundurai" --about "Matches and prize distribution"
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";
import sharp from "sharp";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    slug: { type: "string" },
    title: { type: "string" },
    year: { type: "string" },
    edition: { type: "string" },
    venue: { type: "string", default: "" },
    about: { type: "string", default: "Matches and prize distribution" },
  },
});
const [folder] = positionals;
if (!folder || !values.slug || !values.title || !values.year) {
  console.error('Usage: npm run add-album -- <folder> --slug centies-2025 --title "XIV CENTIES 2025" --year 2025 [--edition 14] [--venue "..."] [--about "..."]');
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(values.slug)) throw new Error("slug may only contain a-z, 0-9 and -");

const root = resolve(import.meta.dirname, "..");
const dataFile = join(root, "src/content/gallery.json");
const albums = JSON.parse(readFileSync(dataFile, "utf8"));
if (albums.some((a) => a.slug === values.slug)) throw new Error(`album ${values.slug} already exists`);

const files = readdirSync(folder)
  .filter((f) => /\.(jpe?g|png|webp|heic)$/i.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
if (!files.length) throw new Error("no photos found in " + folder);

const out = join(root, "public/gallery", values.slug);
mkdirSync(out, { recursive: true });
const photos = [];
for (const [i, f] of files.entries()) {
  const name = String(i + 1).padStart(2, "0");
  const input = sharp(join(folder, f)).rotate(); // apply EXIF orientation; metadata is not copied to the output
  const big = await input.clone().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).webp({ quality: 76 }).toFile(join(out, `${name}.webp`));
  await input.clone().resize({ width: 640, height: 640, fit: "inside", withoutEnlargement: true }).webp({ quality: 70 }).toFile(join(out, `${name}-sm.webp`));
  photos.push({ src: `/gallery/${values.slug}/${name}.webp`, thumb: `/gallery/${values.slug}/${name}-sm.webp`, w: big.width, h: big.height });
  process.stdout.write(`\r${i + 1}/${files.length} photos`);
}

albums.unshift({
  slug: values.slug,
  title: values.title,
  year: Number(values.year),
  edition: Number(values.edition ?? 0),
  venue: values.venue,
  about: values.about,
  photos,
});
albums.sort((a, b) => a.year - b.year || a.slug.localeCompare(b.slug));
writeFileSync(dataFile, JSON.stringify(albums, null, 1) + "\n");
console.log(`\nAdded album "${values.title}" (${photos.length} photos). Run "npm run build" to publish.`);
