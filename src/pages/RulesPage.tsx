import { DOCS, fileSize } from "../content/data";
import { GENERAL_RULES as RULES, HOST_GUIDELINE, RULES_CONTACT, RULES_DOC } from "../content/rules";
import { EVENTS, formatFor, GENDER_LABEL, type Gender } from "../content/sports";
import { btn, Decor, Icon, PageHero, Reveal, SectionHead } from "../components/ui";

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
              <p className="mt-5 text-[14.5px] text-muted">{RULES_CONTACT}</p>
            </div>
            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start" data-aos="fade-left">
              <div className="rounded-xl border border-line border-l-2 border-l-royal-600 bg-white p-5">
                <p className="font-semibold text-ink">Official notice</p>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">“In all the above cases, the Executive Committee will be the final deciding authority.”</p>
              </div>
              <div className="rounded-xl border border-line bg-white p-5">
                <p className="font-semibold text-ink">Official rules document</p>
                <p className="mt-1 text-[14px] text-muted">{RULES_DOC.title}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href={RULES_DOC.pdf} download className={btn("primary", "sm")}>
                    <Icon name="download" className="size-4" /> Download PDF · {RULES_DOC.pdfSize}
                  </a>
                </div>
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

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <SectionHead eyebrow="Men & women" title="System of play" intro="Format and the most players a college may enter for every event." />
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            {(["M", "W"] as Gender[]).map((g) => (
              <Reveal key={g}>
                <h3 className="text-[15px] font-semibold text-ink">
                  {GENDER_LABEL[g]} <span className="font-normal text-muted">· {EVENTS[g].length} events</span>
                </h3>
                <div className="mt-3 overflow-x-auto rounded-xl border border-line bg-white">
                  <table className="w-full min-w-[440px] text-left text-[14px]">
                    <caption className="sr-only">System of play — {GENDER_LABEL[g]}</caption>
                    <thead className="border-b border-line text-[12.5px] text-muted">
                      <tr>
                        <th scope="col" className="px-4 py-2.5 font-semibold">Event</th>
                        <th scope="col" className="px-4 py-2.5 font-semibold">Format / duration</th>
                        <th scope="col" className="px-4 py-2.5 font-semibold">Players</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {EVENTS[g].map((s) => (
                        <tr key={s.code}>
                          <th scope="row" className="px-4 py-2.5 font-medium text-ink">{s.name}</th>
                          <td className="px-4 py-2.5 text-ink/80">{formatFor(s, g)}</td>
                          <td className="px-4 py-2.5 text-ink/80">{s.squad}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-[14.5px] leading-relaxed text-muted">
            Athletics: an athlete can take part in 2 events and 2 relays. A college can make 3 entries and 2 reserves per event.
          </p>
          <Reveal className="mt-8 rounded-xl border border-line border-l-2 border-l-royal-600 bg-white p-5">
            <p className="font-semibold text-ink">Guideline for host institutions</p>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{HOST_GUIDELINE}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
