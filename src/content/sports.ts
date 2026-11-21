export type Gender = "M" | "W";

export type Sport = {
  code: string;
  name: string;
  format: string;
  squad: string;
  /** Athletics asks for the number of athletes instead of being a single team. */
  needsCount?: boolean;
};

const ALL: Record<string, Sport> = {
  athletics: { code: "athletics", name: "Athletics", format: "2 events + 2 relays per athlete", squad: "2 entries + 1 reserve per event", needsCount: true },
  badminton: { code: "badminton", name: "Badminton", format: "Singles, Doubles & Singles", squad: "2–4 players" },
  "ball-badminton": { code: "ball-badminton", name: "Ball Badminton", format: "Best of 3 sets", squad: "Max 10 players" },
  basketball: { code: "basketball", name: "Basketball", format: "4 quarters × 10 min", squad: "Max 12 players" },
  chess: { code: "chess", name: "Chess", format: "Swiss system, 30 min each", squad: "Max 5 players" },
  cricket: { code: "cricket", name: "Cricket", format: "As per fixture", squad: "As per rules" },
  football: { code: "football", name: "Football", format: "30–10–30 min, penalties if tied", squad: "Max 20 players" },
  handball: { code: "handball", name: "Handball", format: "20–10–20 min", squad: "Max 14 players" },
  hockey: { code: "hockey", name: "Hockey", format: "30–10–30 min, penalties if tied", squad: "Max 18 players" },
  kabaddi: { code: "kabaddi", name: "Kabaddi", format: "20–5–20 min", squad: "Max 12 players" },
  "kho-kho": { code: "kho-kho", name: "Kho-Kho", format: "9–3–9–6–9–3–9 min", squad: "Max 12 players" },
  "table-tennis": { code: "table-tennis", name: "Table Tennis", format: "3 singles + 2 reverse singles", squad: "3–5 players" },
  tennis: { code: "tennis", name: "Tennis", format: "Singles, Doubles & Singles", squad: "Max 4 players" },
  throwball: { code: "throwball", name: "Throwball", format: "Best of 3 sets", squad: "9 + 5 = 14 players" },
  volleyball: { code: "volleyball", name: "Volleyball", format: "Best of 3 sets", squad: "Max 12 players" },
};

/** Events for the 15th CENTIES Championship 2026 (14 men + 10 women), in the order of the paper form. */
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
