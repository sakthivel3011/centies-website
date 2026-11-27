import type { Gender } from "./sports";

/**
 * CENTIES trophy sponsors, from "CENTIES TROPHIES SPONSERS.docx" (also in the 15th CENTIES Championship 2026 booklet).
 * null = the trophy has no sponsor yet ("**********" in the document) and is shown as open for sponsorship.
 */
export type TrophySponsor = { event: string; winner: string | null; runner: string | null };

const same = (event: string, sponsor: string | null): TrophySponsor => ({ event, winner: sponsor, runner: sponsor });

export const TROPHY_SPONSORS: Record<Gender, TrophySponsor[]> = {
  M: [
    same("Athletics", "Coimbatore Institute of Technology, Coimbatore"),
    { event: "Badminton", winner: "National Sports, Coimbatore", runner: null },
    same("Ball Badminton", "P. Dhanasekar, PSGCT Alumni, 2004 Batch"),
    same("Basketball", "Seagull Sports, Erode"),
    same("Chess", null),
    same("Cricket", null),
    same("Football", "Dr. R. Sambath, DPE, CIT, Coimbatore"),
    same("Handball", "Kumaraguru College of Technology, Coimbatore"),
    same("Hockey", null),
    same("Kabaddi", "Tiruppur Kabaddi Association, Tiruppur"),
    same("Kho-Kho", "PSG Tech Kho-Kho Alumni Players"),
    same("Table Tennis", "R. Gangadhar, PSGCT Alumni, 2015 Batch"),
    same("Tennis", null),
    same("Volleyball", "Stadium Sports, Tiruppur"),
  ],
  W: [
    same("Athletics", "CISKA Youth Social Trust"),
    same("Badminton", "SNS Group of Institutions, Coimbatore"),
    same("Ball Badminton", "SNS Group of Institutions, Coimbatore"),
    same("Basketball", "Mr. K. S. Saji, former Basketball player, Kerala"),
    same("Chess", "Bannari Amman Institute of Technology, Sathyamangalam"),
    same("Kabaddi", "Kongu Engineering College Kabaddi Team (2024 – 2025)"),
    same("Kho-Kho", "Mr. J. Jesunsagayam, PSG Tech, 2012 Batch"),
    same("Table Tennis", "SNS Group of Institutions, Coimbatore"),
    same("Throwball", "SNS Group of Institutions, Coimbatore"),
    same("Volleyball", "Kumaraguru College of Technology, Coimbatore"),
  ],
};

/** How many trophies (winner + runner, men + women) still need a sponsor. */
export const OPEN_TROPHIES = [...TROPHY_SPONSORS.M, ...TROPHY_SPONSORS.W].reduce((n, t) => n + (t.winner ? 0 : 1) + (t.runner ? 0 : 1), 0);
