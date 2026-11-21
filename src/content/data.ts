import galleryJson from "./gallery.json";
import downloadsJson from "./downloads.json";

export type Photo = { src: string; thumb: string; w: number; h: number };
export type Album = { slug: string; title: string; year: number; edition: number; venue: string; about: string; photos: Photo[] };

export type DocCategory = "results" | "organizers" | "sponsors" | "forms" | "score-sheets" | "knockout" | "league";
export type Doc = { category: DocCategory; title: string; file: string; bytes: number; type: string; year?: number; teams?: number; sport?: string; note?: string };

export const ALBUMS = galleryJson as Album[];
export const DOCS = downloadsJson as Doc[];

/** Cover photo index per album (chosen to show action, not only podium shots). */
export const ALBUM_COVER: Record<string, number> = { "centies-2018": 5, "centies-2019": 4, "centies-2020-men": 1, "centies-2020-women": 13 };

export const DOC_CATEGORIES: { key: DocCategory; label: string; blurb: string }[] = [
  { key: "forms", label: "Forms", blurb: "Eligibility form, organiser booklet and report form." },
  { key: "knockout", label: "Knockout fixtures", blurb: "Blank knockout brackets for 5 to 64 teams." },
  { key: "league", label: "League fixtures", blurb: "Blank league schedules for 4 to 8 teams." },
  { key: "score-sheets", label: "Score sheets", blurb: "Official match recording sheets for officials and scorers." },
  { key: "results", label: "Results", blurb: "Official results of every championship since 2010." },
  { key: "organizers", label: "Organisers", blurb: "Hosting colleges and events for each year." },
  { key: "sponsors", label: "Sponsors", blurb: "Trophy sponsors for men’s and women’s events." },
];

/** Old site paths (/downloads/score-sheets, /downloads/knockout …) map onto these keys. */
export const DOC_ALIASES: Record<string, DocCategory> = { "score-sheet": "score-sheets", fixtures: "knockout" };

export function fileSize(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
