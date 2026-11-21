/** 11th CENTIES Championship 2020 — team results, transcribed from the official results PDF (names normalised). */
export type Podium = { event: string; winner: string; runner: string; third: string; fourth: string };

const KEC = "Kongu Engineering College, Perundurai";
const PSG = "PSG College of Technology, Coimbatore";
const KCT = "Kumaraguru College of Technology, Coimbatore";
const BIT = "Bannari Amman Institute of Technology, Sathyamangalam";
const SSIET = "Sri Sakthi Institute of Engineering and Technology, Coimbatore";
const CIT = "Coimbatore Institute of Technology, Coimbatore";
const HCET = "Hindusthan College of Engineering and Technology, Coimbatore";
const SNSCT = "SNS College of Technology, Coimbatore";
const KIT = "Kalaignar Karunanidhi Institute of Technology, Coimbatore";
const GCT = "Government College of Technology, Coimbatore";
const SVS = "SVS College of Engineering, Coimbatore";
const VCET = "Velalar College of Engineering and Technology, Erode";
const ACET = "Akshaya College of Engineering and Technology, Coimbatore";

export const RESULTS_2020: { M: Podium[]; W: Podium[] } = {
  M: [
    { event: "Athletics", winner: KEC, runner: CIT, third: SSIET, fourth: BIT },
    { event: "Badminton", winner: KCT, runner: KEC, third: SSIET, fourth: PSG },
    { event: "Ball Badminton", winner: ACET, runner: KEC, third: "Karpagam College of Engineering, Coimbatore", fourth: KCT },
    { event: "Basketball", winner: PSG, runner: SSIET, third: KCT, fourth: HCET },
    { event: "Chess", winner: PSG, runner: BIT, third: KCT, fourth: KEC },
    { event: "Football", winner: PSG, runner: HCET, third: "Nehru Institute of Engineering and Technology, Coimbatore", fourth: KEC },
    { event: "Handball", winner: KEC, runner: KCT, third: PSG, fourth: SSIET },
    { event: "Hockey", winner: KEC, runner: SSIET, third: GCT, fourth: KCT },
    { event: "Kabaddi", winner: KEC, runner: KIT, third: HCET, fourth: ACET },
    { event: "Kho-Kho", winner: CIT, runner: KEC, third: SNSCT, fourth: KIT },
    { event: "Table Tennis", winner: KEC, runner: KCT, third: PSG, fourth: SSIET },
    { event: "Tennis", winner: PSG, runner: KEC, third: KCT, fourth: BIT },
    { event: "Volleyball", winner: KEC, runner: SVS, third: SSIET, fourth: KCT },
  ],
  W: [
    { event: "Athletics", winner: KEC, runner: SSIET, third: BIT, fourth: "Government College of Engineering, Coimbatore" },
    { event: "Badminton", winner: PSG, runner: BIT, third: SNSCT, fourth: KCT },
    { event: "Ball Badminton", winner: BIT, runner: VCET, third: SNSCT, fourth: CIT },
    { event: "Basketball", winner: KCT, runner: KEC, third: PSG, fourth: BIT },
    { event: "Chess", winner: PSG, runner: BIT, third: KEC, fourth: VCET },
    { event: "Kho-Kho", winner: SNSCT, runner: KEC, third: GCT, fourth: VCET },
    { event: "Table Tennis", winner: "Sri Krishna College of Technology, Coimbatore", runner: KEC, third: PSG, fourth: SNSCT },
    { event: "Throwball", winner: PSG, runner: KEC, third: BIT, fourth: KIT },
    { event: "Volleyball", winner: KEC, runner: SVS, third: PSG, fourth: "Jansons Institute of Technology, Coimbatore" },
  ],
};

/** Colleges ranked by number of 2020 titles (men + women). */
export function titleLeaders(limit = 3) {
  const counts = new Map<string, number>();
  for (const p of [...RESULTS_2020.M, ...RESULTS_2020.W]) counts.set(p.winner, (counts.get(p.winner) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([college, titles]) => ({ college, titles }));
}
