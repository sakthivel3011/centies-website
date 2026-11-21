import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ALBUMS, DOCS, DOC_CATEGORIES } from "../src/content/data";
import { EDITIONS } from "../src/content/history";
import { RESULTS_2020, titleLeaders } from "../src/content/results2020";
import { EVENTS } from "../src/content/sports";

const pub = (p: string) => join(__dirname, "..", "public", p);

describe("site content", () => {
  it("every download link points to a file that exists on this site", () => {
    for (const d of DOCS) {
      expect(d.file.startsWith("/docs/"), d.file).toBe(true);
      expect(existsSync(pub(d.file)), d.file).toBe(true);
    }
  });

  it("every category has documents, and fixtures cover 5–64 (knockout) and 4–8 (league) teams", () => {
    for (const c of DOC_CATEGORIES) expect(DOCS.some((d) => d.category === c.key), c.key).toBe(true);
    const ko = DOCS.filter((d) => d.category === "knockout").map((d) => d.teams);
    const league = DOCS.filter((d) => d.category === "league").map((d) => d.teams);
    expect(ko).toEqual(Array.from({ length: 60 }, (_, i) => i + 5));
    expect(league).toEqual([4, 5, 6, 7, 8]);
  });

  it("every gallery photo and thumbnail exists", () => {
    expect(ALBUMS.reduce((n, a) => n + a.photos.length, 0)).toBe(65);
    for (const a of ALBUMS)
      for (const p of a.photos) {
        expect(existsSync(pub(p.src)), p.src).toBe(true);
        expect(existsSync(pub(p.thumb)), p.thumb).toBe(true);
      }
  });

  it("every sport has its illustration", () => {
    for (const s of [...EVENTS.M, ...EVENTS.W]) expect(existsSync(pub(`images/sports/${s.code}.webp`)), s.code).toBe(true);
  });

  it("history covers 2010–2020 with a results PDF for each year", () => {
    expect(EDITIONS.map((e) => e.year)).toEqual(Array.from({ length: 11 }, (_, i) => 2010 + i));
    for (const e of EDITIONS) expect(DOCS.some((d) => d.category === "results" && d.year === e.year), String(e.year)).toBe(true);
  });

  it("2020 results list 13 men's and 9 women's events with four places each", () => {
    expect(RESULTS_2020.M).toHaveLength(13);
    expect(RESULTS_2020.W).toHaveLength(9);
    for (const p of [...RESULTS_2020.M, ...RESULTS_2020.W]) expect([p.winner, p.runner, p.third, p.fourth].every(Boolean)).toBe(true);
    expect(titleLeaders(1)[0].college).toContain("Kongu");
  });

  it("hero images, icons, manifest and security.txt are present", () => {
    for (const f of ["images/bg/1.webp", "images/bg/1-md.webp", "images/bg/1-sm.webp", "gallery/centies-2020-women/03-md.webp", "images/logo/centies-logo-96.webp", "images/logo/centies-logo-512.png", "images/og-image.jpg", ".well-known/security.txt"])
      expect(existsSync(pub(f)), f).toBe(true);
    const manifest = JSON.parse(readFileSync(pub("site.webmanifest"), "utf8")) as { icons: { src: string }[] };
    for (const i of manifest.icons) expect(existsSync(pub(i.src.slice(1))), i.src).toBe(true);
  });
});
