/**
 * CENTIES general rules, from "16th CENTIES Championship 2027 — Rules & Regulations". They apply to every event.
 * Each rule has a short headline (for quick reading) and the full wording. Numbers follow the official document.
 * Keep in step with form/content/rules.ts.
 */
export type Rule = { n: number; title: string; text: string };

export const RULES: Rule[] = [
  { n: 1, title: "Full-time students only", text: "The participant should be a full-time bonafide student of an engineering college which takes part in this tournament." },
  { n: 2, title: "Management institutions can take part", text: "All standalone management studies institutions located within the CENTIES jurisdiction are allowed to participate in CENTIES events." },
  {
    n: 3,
    title: "Deemed Universities: engineering students only",
    text: "Deemed Universities may take part in the CENTIES Championship, but only engineering students are permitted to participate. PSG Institute of Advanced Studies, being affiliated to a foreign university, is considered similar to a Deemed University.",
  },
  {
    n: 4,
    title: "Signed players list and college ID card",
    text: "Teams participating in CENTIES events should produce a consolidated players list signed by the Principal and the Director of Physical Education, along with the college ID card.",
  },
  {
    n: 5,
    title: "DPE or a teaching faculty member must come with the team",
    text: "The Director of Physical Education (DPE) should accompany the team. In the absence of the DPE, a teaching faculty member should accompany the team; otherwise the team will not be allowed to lodge any protest if a dispute arises during the tournament.",
  },
  {
    n: 6,
    title: "Protest: ₹1,000 fee, within one hour",
    text: "A protest can be lodged for valid reasons only — a letter of protest addressed to the local organising secretary, with a protest fee of ₹1,000 (Rupees One Thousand only), within one hour of the completion of the match. The fee is refunded only if the protest is proven right.",
  },
  {
    n: 7,
    title: "Venue, date and time may change",
    text: "The organising secretary and the CENTIES Secretary reserve all rights to change the venue, date and time as per the direction given in the AGM.",
  },
  {
    n: 8,
    title: "Coaches are allowed, not as officials",
    text: "Coaches are allowed for CENTIES events and should not act as officials in the tournaments. In the absence of the Director of Physical Education, a coach must submit an authorisation letter (with photo) from the Head of the Institution to act as coach or team manager.",
  },
  { n: 9, title: "Outstation teams: inform 2 days before", text: "Outstation teams should inform the local organising secretary two days before the match date for accommodation." },
  { n: 10, title: "Certificates up to the IV place", text: "Certificates will be issued for the IV place also." },
  { n: 11, title: "Match times are strict", text: "Match dates and timings will be strictly followed in all CENTIES events." },
  { n: 12, title: "Report early — late teams are not entertained", text: "Teams are expected to report for their match well in advance. A team that has not reported at the scheduled time will not be entertained." },
  { n: 13, title: "Qualified officials at every match", text: "The organising institution must engage qualified officials for the CENTIES Championships." },
  { n: 14, title: "Executive Committee decides", text: "In all the above cases, the Executive Committee will be the final deciding authority." },
];

/** Full wording only, in the official order. */
export const GENERAL_RULES = RULES.map((r) => r.text);

/** The rules split by topic, for the rules page. Rule numbers refer to RULES. */
export const RULE_GROUPS: { title: string; sub: string; rules: number[] }[] = [
  { title: "Who can take part", sub: "Eligibility of players and institutions", rules: [1, 2, 3] },
  { title: "Team papers and officials", sub: "What to bring and who comes with the team", rules: [4, 5, 8] },
  { title: "Match day", sub: "Reporting, timings and accommodation", rules: [11, 12, 9, 7] },
  { title: "Protests and decisions", sub: "Disputes, certificates and final authority", rules: [6, 10, 13, 14] },
];

export const ruleByNumber = (n: number) => RULES.find((r) => r.n === n)!;

/** Closing line under the rules. */
export const RULES_CONTACT = "For further details, please contact the respective local organising secretary.";

/** Guideline for the host institution when fixing matches. */
export const HOST_GUIDELINE =
  "For Basketball, Football, Hockey and Handball, the host institution should not fix more than one match per session for a team. For other games, a maximum of three matches per day may be fixed if necessary. There is no such restriction for Ball Badminton, Table Tennis and Chess.";

/** The official rules document, for download (files in public/docs). */
export const RULES_DOC = {
  title: "16th CENTIES Championship 2027 — Rules & Regulations",
  pdf: "/docs/forms/16th-CENTIES-Championship-2027-Rules-and-Regulations.pdf",
  pdfSize: "244 KB",
};
