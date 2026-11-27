/**
 * Championship results.
 * - RESULTS: team results per year, from the official results PDFs in public/docs/results (2025, 2024, 2023: winner and
 *   runner; 2020: the first four places).
 * - ROLL: winner and runner of every event, every year since 2010, for the "Roll of champions" table. 2010 – 2019 come from
 *   the "15th CENTIES Championship 2026" booklet; 2020 onwards are taken from RESULTS (the official PDFs), so the two
 *   always agree.
 * Colleges are stored by their short code (COLLEGES below has the full names).
 */
import type { Gender } from "./sports";

/** Full college names for the short codes used in the results and the booklet. Codes not listed are shown as written. */
export const COLLEGES: Record<string, string> = {
  ACET: "Akshaya College of Engineering and Technology, Coimbatore",
  BIT: "Bannari Amman Institute of Technology, Sathyamangalam",
  CIT: "Coimbatore Institute of Technology, Coimbatore",
  "Dr.NGP": "Dr. N.G.P. Institute of Technology, Coimbatore",
  ESEC: "Erode Sengunthar Engineering College, Erode",
  GCE: "Government College of Engineering, Coimbatore",
  GCT: "Government College of Technology, Coimbatore",
  HCET: "Hindusthan College of Engineering and Technology, Coimbatore",
  HIT: "Hindusthan Institute of Technology, Coimbatore",
  JIT: "Jansons Institute of Technology, Coimbatore",
  KCE: "Karpagam College of Engineering, Coimbatore",
  KCT: "Kumaraguru College of Technology, Coimbatore",
  KEC: "Kongu Engineering College, Perundurai",
  KGISL: "KGISL Institute of Technology, Coimbatore",
  KKIT: "Kalaignar Karunanidhi Institute of Technology, Coimbatore",
  KPRIET: "KPR Institute of Engineering and Technology, Coimbatore",
  NIET: "Nehru Institute of Engineering and Technology, Coimbatore",
  PSGCT: "PSG College of Technology, Coimbatore",
  SKCT: "Sri Krishna College of Technology, Coimbatore",
  SNSCE: "SNS College of Engineering, Coimbatore",
  SNSCT: "SNS College of Technology, Coimbatore",
  SREC: "Sri Ramakrishna Engineering College, Coimbatore",
  SRIT: "Sri Ramakrishna Institute of Technology, Coimbatore",
  SSIET: "Sri Sakthi Institute of Engineering and Technology, Coimbatore",
  SVSCE: "SVS College of Engineering, Coimbatore",
  VCET: "Velalar College of Engineering and Technology, Erode",
};

/** Full name for a code (or the code itself when it is not in the list). */
export const college = (code: string) => COLLEGES[code] ?? code;
/** Name without the town ("Kongu Engineering College"), for tight tables. */
export const collegeShort = (code: string) => college(code).split(",")[0];

export type Podium = { event: string; winner: string; runner: string; third?: string; fourth?: string };
export type YearResults = { year: number; edition: number; M: Podium[]; W: Podium[] };

const p = (event: string, winner: string, runner: string, third?: string, fourth?: string): Podium => ({ event, winner, runner, third, fourth });

/** Newest first. */
export const RESULTS: YearResults[] = [
  {
    year: 2025,
    edition: 14,
    M: [
      p("Athletics", "KEC", "KPRIET"),
      p("Badminton", "KCT", "PSGCT"),
      p("Ball Badminton", "KEC", "SSIET"),
      p("Basketball", "KCT", "KPRIET"),
      p("Chess", "KCT", "PSGCT"),
      p("Football", "KPRIET", "KEC"),
      p("Handball", "SSIET", "KEC"),
      p("Hockey", "SSIET", "KEC"),
      p("Kabaddi", "HCET", "KGISL"),
      p("Kho-Kho", "KEC", "PSGCT"),
      p("Table Tennis", "KEC", "KCT"),
      p("Tennis", "KEC", "KCT"),
      p("Volleyball", "KEC", "SSIET"),
    ],
    W: [
      p("Athletics", "KEC", "SSIET"),
      p("Badminton", "KEC", "KCT"),
      p("Ball Badminton", "KPRIET", "SRIT"),
      p("Basketball", "KPRIET", "KEC"),
      p("Chess", "KEC", "KCT"),
      p("Kho-Kho", "GCT", "SNSCT"),
      p("Table Tennis", "KEC", "KCT"),
      p("Throwball", "KKIT", "SNSCT"),
      p("Volleyball", "KPRIET", "KGISL"),
    ],
  },
  {
    year: 2024,
    edition: 13,
    M: [
      p("Athletics", "CIT", "KPRIET"),
      p("Badminton", "SNSCT", "SKCT"),
      p("Ball Badminton", "KEC", "SSIET"),
      p("Basketball", "KCT", "KPRIET"),
      p("Chess", "PSGCT", "SNSCT"),
      p("Football", "KPRIET", "NIET"),
      p("Handball", "SSIET", "KEC"),
      p("Hockey", "KEC", "SSIET"),
      p("Kabaddi", "HCET", "SSIET"),
      p("Kho-Kho", "SSIET", "KCT"),
      p("Table Tennis", "KEC", "KCT"),
      p("Tennis", "PSGCT", "SKCT"),
      p("Volleyball", "SSIET", "HCET"),
    ],
    W: [
      p("Athletics", "KEC", "BIT"),
      p("Badminton", "KEC", "CIT"),
      p("Ball Badminton", "SSIET", "KPRIET"),
      p("Basketball", "KEC", "KPRIET"),
      p("Chess", "CIT", "PSGCT"),
      p("Kho-Kho", "GCT", "SNSCT"),
      p("Table Tennis", "KEC", "KCT"),
      p("Throwball", "KKIT", "SNSCT"),
      p("Volleyball", "KEC", "KGISL"),
    ],
  },
  {
    year: 2023,
    edition: 12,
    M: [
      p("Athletics", "KEC", "KPRIET"),
      p("Badminton", "KCT", "BIT"),
      p("Ball Badminton", "KEC", "BIT"),
      p("Basketball", "KCT", "KPRIET"),
      p("Chess", "PSGCT", "KCT"),
      p("Football", "KPRIET", "NIET"),
      p("Handball", "KEC", "KCT"),
      p("Hockey", "KEC", "SSIET"),
      p("Kabaddi", "HCET", "SRIT"),
      p("Kho-Kho", "SSIET", "KCT"),
      p("Table Tennis", "KEC", "PSGCT"),
      p("Tennis", "KCT", "BIT"),
      p("Volleyball", "KEC", "HCET"),
    ],
    W: [
      p("Athletics", "KEC", "BIT"),
      p("Badminton", "KEC", "SSIET"),
      p("Ball Badminton", "SSIET", "SRIT"),
      p("Basketball", "KEC", "PSGCT"),
      p("Chess", "KCT", "KEC"),
      p("Kho-Kho", "SNSCT", "KCT"),
      p("Table Tennis", "KEC", "PSGCT"),
      p("Throwball", "PSGCT", "GCT"),
      p("Volleyball", "KEC", "KGISL"),
    ],
  },
  {
    year: 2020,
    edition: 11,
    M: [
      p("Athletics", "KEC", "CIT", "SSIET", "BIT"),
      p("Badminton", "KCT", "KEC", "SSIET", "PSGCT"),
      p("Ball Badminton", "ACET", "KEC", "KCE", "KCT"),
      p("Basketball", "PSGCT", "SSIET", "KCT", "HCET"),
      p("Chess", "PSGCT", "BIT", "KCT", "KEC"),
      p("Football", "PSGCT", "HCET", "NIET", "KEC"),
      p("Handball", "KEC", "KCT", "PSGCT", "SSIET"),
      p("Hockey", "KEC", "SSIET", "GCT", "KCT"),
      p("Kabaddi", "KEC", "KKIT", "HCET", "ACET"),
      p("Kho-Kho", "CIT", "KEC", "SNSCT", "KKIT"),
      p("Table Tennis", "KEC", "KCT", "PSGCT", "SSIET"),
      p("Tennis", "PSGCT", "KEC", "KCT", "BIT"),
      p("Volleyball", "KEC", "SVSCE", "SSIET", "KCT"),
    ],
    W: [
      p("Athletics", "KEC", "SSIET", "BIT", "GCE"),
      p("Badminton", "PSGCT", "BIT", "SNSCT", "KCT"),
      p("Ball Badminton", "BIT", "VCET", "SNSCT", "CIT"),
      p("Basketball", "KCT", "KEC", "PSGCT", "BIT"),
      p("Chess", "PSGCT", "BIT", "KEC", "VCET"),
      p("Kho-Kho", "SNSCT", "KEC", "GCT", "VCET"),
      p("Table Tennis", "SKCT", "KEC", "PSGCT", "SNSCT"),
      p("Throwball", "PSGCT", "KEC", "BIT", "KKIT"),
      p("Volleyball", "KEC", "SVSCE", "PSGCT", "JIT"),
    ],
  },
];

export const LATEST = RESULTS[0];

/** Colleges ranked by number of team titles (men + women) in one year. */
export function titleLeaders(r: YearResults = LATEST, limit = 3) {
  const counts = new Map<string, number>();
  for (const x of [...r.M, ...r.W]) counts.set(x.winner, (counts.get(x.winner) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([code, titles]) => ({ college: college(code), titles }));
}

/* ---------- Roll of champions (2010 – 2019 from the booklet) ---------- */

const BOOKLET_YEARS = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];
/** One row per event: winners then runners for 2010 – 2019, "-" where the event was not held. */
const BOOKLET: Record<Gender, Record<string, [string, string]>> = {
  M: {
    Athletics: ["- - - - - KEC SIET KEC KCT KEC", "- - - - - CIT PSGCT GCT KKIT SSIET"],
    Badminton: ["- PSGCT PSGCT KEC HCET KCT KCT SSIET SSIET KCT", "- KEC SRIT SRIT KEC HCET PSGCT KCT SNSCT SSIET"],
    "Ball Badminton": ["- - PSGCT KEC KEC CIT CIT KCT GCT KCE", "- - KEC SREC INFO PSGCT KCT GCT KCT BIT"],
    Basketball: ["- PSGCT KEC KEC CIT KEC SEEC BIT HCET KEC", "- KEC PSGCT RVS KEC CIT KCT KCT KKIT PSGCT"],
    Chess: ["- - - - - - - - - PSGCT", "- - - - - - - - - BIT"],
    Football: ["- - CIT NIET PSGCT Dr.NGP Dr.NGP NIET NIET HCET", "- - KEC GCT Dr.NGP PSGCT PSGCT CIT CIT NIET"],
    Handball: ["- - SEC SEC SREC PSGCT PSGCT SVSEC PSGCT PSGCT", "- - KCE SREC SEC SREC SREC PSGCT KEC KCT"],
    Hockey: ["- - - - - - - - KEC KEC", "- - - - - - - - GCT BIT"],
    Kabaddi: ["- - - - - - - - - BIT", "- - - - - - - - - SNSCT"],
    "Kho-Kho": ["- - PSGCT PSGCT PSGCT PSGCT PSGCT PSGCT PSGCT KCT", "- - SKCT SKCT SKCT ESEC ESEC SNSCT KCT SNSCT"],
    "Table Tennis": ["PSGCT PSGCT PSGCT PSGCT PSGCT KCT PSGCT KEC KEC KEC", "HCET KEC KEC KEC Dr.NGP KEC SREC SREC KCT KCT"],
    Tennis: ["- - - - - - KCT PSGCT PSGCT PSGCT", "- - - - - - BIT SSIET BIT KCT"],
    Volleyball: ["PSGCT KEC KEC KEC KEC KEC KEC KEC KEC KEC", "SKCET SKCT SNSCE PSGCT PSGCT PSGCT HCET KKIT SSIET SVSCE"],
  },
  W: {
    Athletics: ["- - - - - KEC KEC KEC KEC KEC", "- - - - - SSIET SSIET BIT SSIET SSIET"],
    Badminton: ["- PSGCT PSGCT PSGCT SNSCT KCT SNSCT PSGCT BIT PSGCT", "- KEC TEJAA SNSCT PSGCT PSGCT SRIT KCT KCT BIT"],
    "Ball Badminton": ["- - SREC SREC SKCT ESEC CIT SREC GCT SNSCT", "- - SNSCT PSGCT SREC SKCT SREC BIT VCET VCET"],
    Basketball: ["- SREC KEC KEC KEC KEC EBET BEC BEC BEC", "- KEC SREC SKCT HCET CIT CIT CIT CIT PSGCT"],
    Chess: ["- - - - - - - - - BIT", "- - - - - - - - - PSGCT"],
    "Kho-Kho": ["- - PSGCT PSGCT SREC PSGCT PSGCT KCT KCT SNSCT", "- - SREC SREC PSGCT SREC KCT KEC KEC KCT"],
    "Table Tennis": ["HIT SREC SREC SREC SREC KEC KEC KEC KEC BIT", "KCT HIT PSGCT TCE KEC PSGCT PSGCT PSGCT PSGCT KEC"],
    Throwball: ["- - - - - SREC SREC PSGCT KEC PSGCT", "- - - - - PSGCT PSGCT KEC PSGCT KEC"],
    Volleyball: ["BIT KEC KEC KEC KEC KEC KEC KCT KEC KEC", "TCE MCET PSGCT PSGCT HIT SREC PSGCT VCET GCT GCT"],
  },
};
/** Chess for men and women together, 2014 – 2018 (one combined event in those years). */
const CHESS_COMBINED: Record<number, [string, string]> = { 2014: ["PSGCT", "INFO"], 2015: ["PSGCT", "KCT"], 2016: ["KEC", "SIET"], 2017: ["PSGCT", "KEC"], 2018: ["BIT", "PSGCT"] };

export type RollRow = { year: number; edition: number; winner: string; runner: string; combined?: boolean };

/** Every year an event was held for one category, newest first. */
export function rollFor(g: Gender, event: string): RollRow[] {
  const rows: RollRow[] = [];
  for (const r of RESULTS) {
    const x = r[g].find((e) => e.event === event);
    if (x) rows.push({ year: r.year, edition: r.edition, winner: x.winner, runner: x.runner });
  }
  const b = BOOKLET[g][event];
  BOOKLET_YEARS.map((year, i) => ({ year, i }))
    .reverse()
    .forEach(({ year, i }) => {
      const combined = event === "Chess" ? CHESS_COMBINED[year] : undefined;
      const winner = combined?.[0] ?? b?.[0].split(" ")[i];
      const runner = combined?.[1] ?? b?.[1].split(" ")[i];
      if (winner && winner !== "-") rows.push({ year, edition: year - 2009, winner, runner: runner && runner !== "-" ? runner : "", combined: !!combined });
    });
  return rows;
}

/** Events in the roll for each category, in the usual order. */
export const ROLL_EVENTS: Record<Gender, string[]> = { M: Object.keys(BOOKLET.M), W: Object.keys(BOOKLET.W) };
