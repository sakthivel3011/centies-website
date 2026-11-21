import { DOCS, fileSize } from "../content/data";
import { btn, Decor, Icon, PageHero, Reveal, SectionHead } from "../components/ui";

const RULES = [
  "The participant should be a full-time bonafide student of an engineering college which takes part in this tournament.",
  "Teams should produce a consolidated players list signed by the Principal and the Director of Physical Education, the college ID card and the recent semester hall ticket or mark sheet. If the mark sheet is downloaded without a photo, paste the photo and get it attested by the Physical Director.",
  "The Director of Physical Education (DPE) should accompany the team. In the absence of the DPE, a teaching faculty member should accompany the team; otherwise the team will not be allowed to lodge any protest if a dispute arises.",
  "A protest can be lodged for valid reasons only — a letter addressed to the local organising secretary with a protest fee of ₹500, within one hour of the completion of the match. The fee is refunded only if the protest is proven right.",
  "The organising secretary and the CENTIES Secretary reserve the right to change the venue, date and time.",
  "Coaches are allowed for CENTIES events and should not act as officials in the tournaments.",
  "Outstation teams should inform the local organising secretary two days before the match date for accommodation.",
  "Certificates will be issued for the IV place also.",
  "To encourage sportsmanship, CENTIES presents a FAIR PLAY AWARD to an institution based on the on-field behaviour and punctuality of players, team managers and coaches.",
  "Match dates and timings will be strictly followed in all CENTIES events.",
  "In all the above cases, the Executive Committee will be the final deciding authority.",
];

export function RulesPage() {
  const eligibility = DOCS.find((d) => d.file.endsWith("eligibility-form.pdf"));
  return (
    <>
      <PageHero
        eyebrow="Championship"
        title="Rules & regulations"
        intro="Mandatory guidelines for all participating institutions and athletes."
        crumbs={[
          { to: "/championship", label: "Championship" },
          { to: "/championship/rules", label: "Rules" },
        ]}
      />
      <section className="relative isolate overflow-clip">
        <Decor name="fan" from="xl" className="-right-24 bottom-10 w-[260px]" />
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
            <div>
              <SectionHead eyebrow={`${RULES.length} rules`} title="General rules" />
              <ol className="mt-8 border-t border-line">
                {RULES.map((r, i) => (
                  <Reveal as="li" key={i} className="flex gap-5 border-b border-line py-5">
                    <span className="w-6 shrink-0 pt-px text-[15px] font-semibold text-royal-600 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[15.5px] leading-relaxed text-ink/85">{r}</span>
                  </Reveal>
                ))}
              </ol>
            </div>
            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start" data-aos="fade-left">
              <div className="rounded-xl border border-line border-l-2 border-l-royal-600 bg-white p-5">
                <p className="font-semibold text-ink">Official notice</p>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">“In all the above cases, the Executive Committee will be the final deciding authority.”</p>
              </div>
              {eligibility && (
                <div className="rounded-xl border border-line bg-white p-5">
                  <p className="font-semibold text-ink">Eligibility form</p>
                  <p className="mt-1 text-[14px] text-muted">
                    Players list for every team · {eligibility.type}, {fileSize(eligibility.bytes)}
                  </p>
                  <a href={eligibility.file} download className={`${btn("primary", "sm")} mt-4`}>
                    <Icon name="download" className="size-4" /> Download
                  </a>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
