import { Link } from "react-router";
import { EVENTS, GENDER_LABEL, sportThumb, type Gender } from "../content/sports";
import { FEE_SLABS, inr } from "../content/fees";
import { DOCS } from "../content/data";
import { btn, Decor, Icon, PageHero, Reveal, SectionHead } from "../components/ui";
import { DEMO_URL, REGISTER_URL } from "../lib/config";
import { EVENT } from "../content/event";
import { Countdown } from "../components/Countdown";

const STEPS = [
  { t: "Fill the online form", d: "College, Principal and Physical Director details — about 3 minutes, saved automatically." },
  { t: "Tick your teams", d: "Choose the men’s and women’s events. The fee is calculated as you go." },
  { t: "Pay securely", d: "UPI, cards or net banking. Gateway charges and GST are borne by CENTIES." },
  { t: "Get your registration ID", d: "Confirmation is emailed to the Physical Director and the Principal." },
];

export function ChampionshipPage() {
  const eligibility = DOCS.find((d) => d.file.endsWith("eligibility-form.pdf"));
  return (
    <>
      <PageHero
        eyebrow="Championship 2026"
        title={
          <>
            15<sup className="relative top-[0.12em] ml-0.5 align-top text-[0.42em] normal-case leading-none">th</sup> CENTIES Championship
          </>
        }
        intro={`${EVENTS.M.length} events for men and ${EVENTS.W.length} for women.`}
        crumbs={[{ to: "/championship", label: "Championship 2026" }]}
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={REGISTER_URL} className={btn("accent")}>
            Register your college
          </a>
          <a href={DEMO_URL} className={btn("ghost")}>
            See the demo form
          </a>
        </div>
        {EVENT.registrationDeadline && (
          <div className="mt-6">
            <Countdown to={EVENT.registrationDeadline} label="Registration" />
          </div>
        )}
      </PageHero>

      <section className="relative isolate overflow-clip">
        <Decor name="wave" className="-right-20 -top-6 w-[380px]" />
        <div className="mx-auto max-w-6xl px-4 py-20">
          <SectionHead eyebrow="How to register" title="Four simple steps" />
          <ol className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.t} className="border-t border-line pt-5">
                <span className="text-[13px] font-semibold text-royal-600 tabular-nums">Step {i + 1}</span>
                <p className="mt-1.5 font-semibold text-ink">{s.t}</p>
                <p className="mt-1 text-[14.5px] leading-relaxed text-muted">{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative isolate overflow-clip border-t border-line py-20">
        <Decor name="arrow" from="xl" className="-left-28 top-12 w-[180px] min-[1360px]:-left-20" />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1fr_340px]">
          <div>
            <SectionHead eyebrow="24 events" title="Events" />
            {(["M", "W"] as Gender[]).map((g) => (
              <div key={g} className="mt-8">
                <h3 className="text-[15px] font-semibold text-ink">
                  {GENDER_LABEL[g]} <span className="font-normal text-muted">· {EVENTS[g].length} events</span>
                </h3>
                <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {EVENTS[g].map((s) => (
                    <li key={s.code} className="flex items-center gap-2 rounded-xl border border-line bg-white p-2 sm:gap-3 sm:pr-3" data-aos="fade-up">
                      <img src={sportThumb(s.code)} alt="" loading="lazy" width={44} height={44} className="size-9 shrink-0 object-contain sm:size-11" />
                      <span className="min-w-0">
                        <span className="block text-[14px] font-medium leading-snug text-ink [overflow-wrap:anywhere] sm:text-[14.5px]">{s.name}</span>
                        <span className="block text-[12px] leading-snug text-muted">{s.squad}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start" data-aos="fade-left">
            <div className="overflow-hidden rounded-xl border border-line">
              <p className="bg-royal-900 px-5 py-3 font-semibold text-white">Registration fee</p>
              <table className="w-full text-[14.5px]">
                <caption className="sr-only">Registration fee by number of teams</caption>
                <tbody className="divide-y divide-line">
                  {FEE_SLABS.map((s) => (
                    <tr key={s.label}>
                      <td className="px-5 py-2.5 text-muted">{s.label}</td>
                      <td className="px-5 py-2.5 text-right font-semibold text-ink tabular-nums">{inr(s.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="border-t border-line px-5 py-3 text-[12.5px] text-muted">Each event ticked for men or women counts as one team. No extra charges.</p>
            </div>
            <div className="rounded-xl border border-line p-5">
              <p className="font-semibold text-ink">Before the matches</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-4 text-[14px] text-muted">
                <li>Players list signed by the Principal and the Physical Director</li>
                <li>College ID card and recent hall ticket or mark sheet</li>
                <li>A DPE or teaching faculty member must accompany the team</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {eligibility && (
                  <a href={eligibility.file} download className={btn("primary", "sm")}>
                    <Icon name="download" className="size-4" /> Eligibility form
                  </a>
                )}
                <Link to="/championship/rules" className={btn("secondary", "sm")}>
                  Full rules
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid overflow-hidden rounded-xl border border-line md:grid-cols-[1fr_320px]" data-aos="fade-up">
          <div className="p-6 sm:p-8">
            <p className="text-xl font-semibold tracking-tight text-ink">Dates &amp; venues</p>
            <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-muted">
              {EVENT.startDate
                ? `The championship runs from ${new Date(EVENT.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", timeZone: "Asia/Kolkata" })}${EVENT.endDate ? ` to ${new Date(EVENT.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" })}` : ""}. Fixtures and host colleges for each event are shared with registered colleges.`
                : "Fixtures, host colleges and dates for each event will be announced by the organising committee and shared with registered colleges."}
            </p>
            <Link to="/contact" className={`${btn("primary")} mt-5`}>
              Ask the committee
            </Link>
          </div>
          <img src="/images/decor/pattern.webp" alt="" width={736} height={368} loading="lazy" decoding="async" className="hidden h-full w-full object-cover md:block" />
        </div>
      </section>
    </>
  );
}
