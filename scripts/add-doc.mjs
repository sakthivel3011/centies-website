// Adds a downloadable document (PDF / Word / Excel) and lists it on the Downloads page.
//
//   npm run add-doc -- <file> --category results --title "14th CENTIES Championship 2025 — results" --year 2025
//   categories: results, organizers, sponsors, forms, score-sheets, knockout, league
import { copyFileSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";
import { parseArgs } from "node:util";

const CATEGORIES = ["results", "organizers", "sponsors", "forms", "score-sheets", "knockout", "league"];
const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { category: { type: "string" }, title: { type: "string" }, year: { type: "string" }, note: { type: "string" }, name: { type: "string" } },
});
const [file] = positionals;
if (!file || !CATEGORIES.includes(values.category ?? "") || !values.title) {
  console.error(`Usage: npm run add-doc -- <file> --category <${CATEGORIES.join("|")}> --title "..." [--year 2025] [--note "..."] [--name file-name]`);
  process.exit(1);
}
const ext = extname(file).toLowerCase();
if (![".pdf", ".docx", ".doc", ".xlsx", ".xls"].includes(ext)) throw new Error("only PDF, Word or Excel files can be added");

const root = resolve(import.meta.dirname, "..");
const slug = (values.name ?? basename(file, ext)).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const folder = values.category === "knockout" || values.category === "league" ? "fixtures" : values.category;
const rel = `/docs/${folder}/${slug}${ext}`;
mkdirSync(join(root, "public/docs", folder), { recursive: true });
copyFileSync(file, join(root, "public", rel));

const dataFile = join(root, "src/content/downloads.json");
const docs = JSON.parse(readFileSync(dataFile, "utf8")).filter((d) => d.file !== rel);
docs.push({
  category: values.category,
  title: values.title,
  file: rel,
  bytes: statSync(file).size,
  type: ext.slice(1).toUpperCase(),
  ...(values.year ? { year: Number(values.year) } : {}),
  ...(values.note ? { note: values.note } : {}),
});
writeFileSync(dataFile, JSON.stringify(docs, null, 1) + "\n");
console.log(`Added ${rel}. Run "npm run build" to publish.`);
