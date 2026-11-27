import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ALBUMS, DOCS, DOC_CATEGORIES } from "../src/content/data";
import { EDITIONS } from "../src/content/history";
import { RESULTS, titleLeaders } from "../src/content/results";
import { EVENTS } from "../src/content/sports";

const pub = (p: string) => join(__dirname, "..", "public", p);

describe("site content", () => {
  it("every download link points to a file that exists on this site", () => {
    for (const d of DOCS) {
      expect(d.file.startsWith("/docs/"), d.file).toBe(true);
      expect(existsSync(pub(d.file)), d.file).toBe(true);
    }
  });

  it("every category has documents, and knockout fixtures cover 4–64 teams", () => {
    for (const c of DOC_CATEGORIES) expect(DOCS.some((d) => d.category === c.key), c.key).toBe(true);
    const ko = DOCS.filter((d) => d.category === "knockout").map((d) => d.teams);
    expect(ko).toEqual(Array.from({ length: 61 }, (_, i) => i + 4));
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

  it("history covers 2010–2020 and 2023–2026, with a results PDF for each year up to 2025", () => {
    expect(EDITIONS.map((e) => e.year)).toEqual([...Array.from({ length: 11 }, (_, i) => 2010 + i), 2023, 2024, 2025, 2026]);
    for (const e of EDITIONS.filter((e) => e.year <= 2025)) expect(DOCS.some((d) => d.category === "results" && d.year === e.year), String(e.year)).toBe(true);
  });

  it("2020 results list 13 men's and 9 women's events with four places each", () => {
    const r2020 = RESULTS.find((r) => r.year === 2020)!;
    expect(r2020.M).toHaveLength(13);
    expect(r2020.W).toHaveLength(9);
    for (const p of [...r2020.M, ...r2020.W]) expect([p.winner, p.runner, p.third, p.fourth].every(Boolean)).toBe(true);
    expect(titleLeaders(r2020, 1)[0].college).toContain("Kongu");
  });

  it("results are newest first, one entry per year, with a winner and runner for every event", () => {
    const years = RESULTS.map((r) => r.year);
    expect(years).toEqual([...years].sort((a, b) => b - a));
    expect(new Set(years).size).toBe(years.length);
    for (const r of RESULTS) for (const p of [...r.M, ...r.W]) expect(p.winner && p.runner, `${r.year} ${p.event}`).toBeTruthy();
  });

  it("hero images, icons, manifest and security.txt are present", () => {
    for (const f of ["images/bg/1.webp", "images/bg/1-md.webp", "images/bg/1-sm.webp", "gallery/centies-2020-women/03-md.webp", "images/logo/centies-logo-96.webp", "images/logo/centies-logo-512.png", "images/og-image.jpg", ".well-known/security.txt"])
      expect(existsSync(pub(f)), f).toBe(true);
    const manifest = JSON.parse(readFileSync(pub("site.webmanifest"), "utf8")) as { icons: { src: string }[] };
    for (const i of manifest.icons) expect(existsSync(pub(i.src.slice(1))), i.src).toBe(true);
  });
});
