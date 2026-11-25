export type Gender = "M" | "W";

export type Sport = {
  code: string;
  name: string;
  /** System of play (men's, or both when formatW is not set). */
  format: string;
  /** Women's system of play, when it differs from the men's (Kho-Kho). */
  formatW?: string;
  squad: string;
  /** Most players a college may register for the team (not set for Athletics). */
  max?: number;
  /** Athletics asks for the number of athletes instead of being a single team. */
  needsCount?: boolean;
};

/** System of play and squad sizes from "16th CENTIES Championship — Rules & Regulations". */
const ALL: Record<string, Sport> = {
  athletics: { code: "athletics", name: "Athletics", format: "2 events + 2 relays per athlete", squad: "3 entries + 2 reserves per event", needsCount: true },
  badminton: { code: "badminton", name: "Badminton", format: "Singles, Doubles & Singles", squad: "Min 2, max 5 players", max: 5 },
  "ball-badminton": { code: "ball-badminton", name: "Ball Badminton", format: "Best of 3 sets", squad: "Max 10 players", max: 10 },
  basketball: { code: "basketball", name: "Basketball", format: "4 quarters × 10 min", squad: "Max 12 players", max: 12 },
  chess: { code: "chess", name: "Chess", format: "Swiss system, team event", squad: "Max 6 players", max: 6 },
  cricket: { code: "cricket", name: "Cricket", format: "T20 rules", squad: "Max 16 players", max: 16 },
  football: { code: "football", name: "Football", format: "30–10–30 min, penalty shootout if tied", squad: "Max 20 players", max: 20 },
  handball: { code: "handball", name: "Handball", format: "20–10–20 min", squad: "Max 16 players", max: 16 },
  hockey: { code: "hockey", name: "Hockey", format: "30–10–30 min, penalty shootout if tied", squad: "Max 18 players", max: 18 },
  kabaddi: { code: "kabaddi", name: "Kabaddi", format: "20–5–20 min", squad: "Max 12 players", max: 12 },
  "kho-kho": { code: "kho-kho", name: "Kho-Kho", format: "9–3–9–6–9–3–9 min", formatW: "7–3–7–6–7–3–7 min", squad: "Max 15 players", max: 15 },
  "table-tennis": { code: "table-tennis", name: "Table Tennis", format: "3 singles + 2 reverse singles", squad: "Min 3, max 5 players", max: 5 },
  tennis: { code: "tennis", name: "Tennis", format: "Singles, Doubles & Singles", squad: "Min 2, max 5 players", max: 5 },
  throwball: { code: "throwball", name: "Throwball", format: "Best of 3 sets", squad: "9 + 5 = 14 players", max: 14 },
  volleyball: { code: "volleyball", name: "Volleyball", format: "Best of 3 sets", squad: "Max 14 players", max: 14 },
};

/** System of play for one category. */
export function formatFor(sport: Sport, gender: Gender) {
  return gender === "W" && sport.formatW ? sport.formatW : sport.format;
}

/** System of play for every category the sport is held in: "Men: … · Women: …" when they differ. */
export function formatAll(sport: Sport, genders: Gender[]) {
  if (!sport.formatW || genders.length < 2) return genders.length === 1 ? formatFor(sport, genders[0]) : sport.format;
  return genders.map((g) => `${GENDER_LABEL[g]}: ${formatFor(sport, g)}`).join(" · ");
}

/** Events for the 16th CENTIES Championship 2026 (14 men + 10 women), in the order of the paper form. */
export const EVENTS: Record<Gender, Sport[]> = {
  M: ["athletics", "badminton", "ball-badminton", "basketball", "chess", "cricket", "football", "handball", "hockey", "kabaddi", "kho-kho", "table-tennis", "tennis", "volleyball"].map((c) => ALL[c]),
  W: ["athletics", "badminton", "ball-badminton", "basketball", "chess", "kabaddi", "kho-kho", "table-tennis", "throwball", "volleyball"].map((c) => ALL[c]),
};

export const MAX_TEAMS = EVENTS.M.length + EVENTS.W.length;

export const GENDER_LABEL: Record<Gender, string> = { M: "Men", W: "Women" };

export function entryKey(gender: Gender, code: string) {
  return `${gender}:${code}`;
}

export function isValidEntry(gender: Gender, code: string) {
  return EVENTS[gender].some((s) => s.code === code);
}

export function sportName(code: string) {
  return ALL[code]?.name ?? code;
}

/**
 * Sport illustration (transparent WebP, ≤640px) at /public/images/sports/<code>.webp.
 * To change one, replace that file — keep the same name.
 */
export function sportImage(code: string) {
  return `/images/sports/${code}.webp`;
}

/** Small thumbnails (lists, rules page) use the same file. */
export const sportThumb = sportImage;
