import { MAX_TEAMS } from "./sports";

/**
 * Registration fee in rupees for the number of teams entered.
 * Slabs from the 2026 form: below 3 teams ₹2000 per team; 3 → ₹5000; 4–6 → ₹7500;
 * 7–10 → ₹10000; 11–15 → ₹13000; above 15 → ₹15000.
 * Used by the browser for display and by the server for charging; the server never trusts a client amount.
 */
export function feeFor(teams: number): number {
  if (!Number.isInteger(teams) || teams < 1 || teams > MAX_TEAMS) throw new RangeError("invalid team count");
  if (teams <= 2) return 2000 * teams;
  if (teams === 3) return 5000;
  if (teams <= 6) return 7500;
  if (teams <= 10) return 10000;
  if (teams <= 15) return 13000;
  return 15000;
}

export const FEE_SLABS = [
  { label: "1 team", amount: 2000 },
  { label: "2 teams", amount: 4000 },
  { label: "3 teams", amount: 5000 },
  { label: "4 – 6 teams", amount: 7500 },
  { label: "7 – 10 teams", amount: 10000 },
  { label: "11 – 15 teams", amount: 13000 },
  { label: "16 + teams", amount: 15000 },
];

export function slabLabel(teams: number): string {
  if (teams <= 2) return "₹2,000 per team (below 3 teams)";
  if (teams === 3) return "3 teams";
  if (teams <= 6) return "4 – 6 teams";
  if (teams <= 10) return "7 – 10 teams";
  if (teams <= 15) return "11 – 15 teams";
  return "16 or more teams";
}

/** A gentle nudge shown under the fee bar, e.g. "Add 2 more teams at no extra cost". */
export function freeTeamsLeft(teams: number): number {
  if (teams < 3) return 0;
  const top = teams === 3 ? 3 : teams <= 6 ? 6 : teams <= 10 ? 10 : teams <= 15 ? 15 : MAX_TEAMS;
  return top - teams;
}

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
