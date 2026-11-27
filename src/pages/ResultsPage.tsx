import { useState } from "react";
import { college, collegeShort, RESULTS, ROLL_EVENTS, rollFor } from "../content/results";
import { EDITIONS } from "../content/history";
import { DOCS, fileSize } from "../content/data";
import { GENDER_LABEL, type Gender } from "../content/sports";
import { btn, Decor, Icon, IconNext, PageHero, Reveal, SectionHead } from "../components/ui";
import { Switch } from "../components/Switch";

const ORD = (n: number) => (n % 10 === 1 && n !== 11 ? `${n}st` : n % 10 === 2 && n !== 12 ? `${n}nd` : n % 10 === 3 && n !== 13 ? `${n}rd` : `${n}th`);

/** A college in a table: short name, full name on hover. */
function College({ code, strong = false }: { code: string; strong?: boolean }) {
  return (
    <span title={college(code)} className={strong ? "font-medium text-ink" : "text-muted"}>
      {collegeShort(code)}
    </span>
  );
}

export function ResultsPage() {
  const [year, setYear] = useState(RESULTS[0].year);
  const [g, setG] = useState<Gender>("M");
  const [anim, setAnim] = useState(""); // slide the list in from the side of the tab picked; nothing on first load
  const r = RESULTS.find((x) => x.year === year)!;
  const places = r[g].some((x) => x.third); // 2020 lists the first four places
  const results = DOCS.filter((d) => d.category === "results").sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  return (
    <>
      <PageHero
        eyebrow="Championship"
        title="Results"
        intro="Official results of every edition since 2010."
        crumbs={[
          { to: "/championship", label: "Championship" },
          { to: "/championship/results", label: "Results" },
        ]}
      />

      <section className="relative isolate overflow-clip">
        <Decor name="arc" className="-right-24 -top-6 w-[330px]" />
        <div className="mx-auto max-w-6xl px-4 py-20">
          <SectionHead eyebrow={`${ORD(r.edition)} CENTIES Championship · ${r.year}`} title={`${r.year} champions`} />
          <div className="mt-8 flex flex-wrap items-center gap-3" data-aos="fade-up">
            <Switch
              label="Year"
              options={RESULTS.map((x) => ({ key: x.year, label: String(x.year) }))}
              value={year}
              onChange={(y) => {
                setAnim(y < year ? "animate-slide-from-right" : "animate-slide-from-left");
                setYear(y);
              }}
            />
            <Switch
              label="Category"
              options={(["M", "W"] as Gender[]).map((k) => ({ key: k, label: `${GENDER_LABEL[k]} · ${r[k].length}` }))}
              value={g}
              onChange={(k) => {
                setAnim(k === "W" ? "animate-slide-from-right" : "animate-slide-from-left");
                setG(k);
              }}
            />
          </div>

          <div role="tabpanel" aria-label={`${r.year} ${GENDER_LABEL[g]} results`} className="mt-5 overflow-hidden rounded-xl border border-line bg-white" data-aos="fade-up">
            <div className={`hidden gap-4 border-b border-line bg-surface px-5 py-3 text-[12.5px] font-semibold uppercase tracking-[0.06em] text-muted md:grid ${places ? "grid-cols-[150px_1fr_1fr_1fr_1fr]" : "grid-cols-[180px_1fr_1fr]"}`}>
              <span>Event</span>
              <span>Winner</span>
              <span>Runner-up</span>
              {places && <span>Third</span>}
              {places && <span>Fourth</span>}
            </div>
            <ul key={`${year}-${g}`} className={`divide-y divide-line ${anim}`}>
              {r[g].map((x) => (
                <li key={x.event} className={`grid gap-x-4 gap-y-1.5 px-5 py-4 text-[14.5px] md:items-center ${places ? "md:grid-cols-[150px_1fr_1fr_1fr_1fr]" : "md:grid-cols-[180px_1fr_1fr]"}`}>
                  <span className="font-semibold text-ink">{x.event}</span>
                  <span className="flex items-center gap-2">
                    <Icon name="trophy" className="size-4 shrink-0 text-gold-600" />
                    <span>
                      <span className="mr-1 text-xs font-semibold text-muted md:hidden">Winner:</span>
                      <College code={x.winner} strong />
                    </span>
                  </span>
                  <span>
                    <span className="mr-1 text-xs font-semibold text-muted md:hidden">Runner-up:</span>
                    <College code={x.runner} />
                  </span>
                  {x.third && (
                    <span>
                      <span className="mr-1 text-xs font-semibold text-muted md:hidden">Third:</span>
                      <College code={x.third} />
                    </span>
                  )}
                  {x.fourth && (
                    <span>
                      <span className="mr-1 text-xs font-semibold text-muted md:hidden">Fourth:</span>
                      <College code={x.fourth} />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-3 text-[13px] text-muted">From the official {r.year} results. The full PDF is in the archive below.</p>
        </div>
      </section>

      <RollOfChampions />

      <section className="relative isolate overflow-clip border-t border-line py-20">
        <Decor name="swells" from="xl" className="-right-32 top-10 w-[300px]" />
        <div className="mx-auto max-w-6xl px-4">
          <SectionHead eyebrow="Archive" title="Every edition" intro="Official result sheets from the first championship in 2010 onwards." />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((d) => {
              const ed = EDITIONS.find((e) => e.year === d.year);
              return (
                <Reveal as="li" key={d.file} className="flex flex-col rounded-xl border border-line p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-3xl font-semibold leading-none tracking-tight text-royal-700 tabular-nums">{d.year}</p>
                      <p className="mt-1.5 text-sm font-medium text-ink">{ed ? `${ORD(ed.edition)} CENTIES Championship` : d.title}</p>
                    </div>
                    {ed?.colleges && <span className="pt-1 text-[13px] text-muted">{ed.colleges} colleges</span>}
                  </div>
                  {ed && ed.hosts.length > 0 && <p className="mt-3 line-clamp-2 text-[13px] text-muted">Hosted by {ed.hosts.join(", ")}</p>}
                  <div className="mt-auto flex items-center justify-between gap-2 pt-5">
                    <a href={d.file} target="_blank" rel="noopener" className={btn("primary", "sm")}>
                      View results
                      <IconNext className="size-3.5" />
                    </a>
                    <a
                      href={d.file}
                      download
                      className="grid size-8 shrink-0 place-items-center rounded-sm text-ink/60 transition-colors duration-300 hover:text-royal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-200"
                      aria-label={`Download ${d.year} results (${fileSize(d.bytes)})`}
                    >
                      <Icon name="download" className="size-4" />
                    </a>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

/** Roll of champions: pick men or women and an event, and see its winner and runner-up for every year since 2010. */
function RollOfChampions() {
  const [g, setG] = useState<Gender>("M");
  const [event, setEvent] = useState(ROLL_EVENTS.M[0]);
  const ev = ROLL_EVENTS[g].includes(event) ? event : ROLL_EVENTS[g][0];
  const rows = rollFor(g, ev);
  return (
    <section className="relative isolate overflow-clip border-t border-line py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow={`2010 – ${RESULTS[0].year}`} title="Roll of champions" intro="The winner and runner-up of every event, every year since the first championship." />
        <div className="mt-8" data-aos="fade-up">
          <Switch label="Category" options={(["M", "W"] as Gender[]).map((k) => ({ key: k, label: GENDER_LABEL[k] }))} value={g} onChange={setG} />
          <div role="group" aria-label="Event" className="mt-4 flex flex-wrap gap-2">
            {ROLL_EVENTS[g].map((e) => (
              <button
                key={e}
                type="button"
                aria-pressed={e === ev}
                onClick={() => setEvent(e)}
                className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors duration-200 ${e === ev ? "border-royal-900 bg-royal-900 text-white" : "border-line bg-white text-ink/75 hover:border-slate-400 hover:text-ink"}`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-line bg-white" data-aos="fade-up">
          <table key={`${g}-${ev}`} className="w-full animate-rise text-left text-[14px] sm:text-[14.5px]">
            <caption className="sr-only">
              {GENDER_LABEL[g]} {ev}: winner and runner-up by year
            </caption>
            <thead className="border-b border-line bg-surface text-[12px] font-semibold uppercase tracking-[0.06em] text-muted sm:text-[12.5px]">
              <tr>
                <th scope="col" className="w-24 px-4 py-3 sm:w-40 sm:px-5">Year</th>
                <th scope="col" className="px-4 py-3 sm:px-5">Winner</th>
                <th scope="col" className="px-4 py-3 sm:px-5">Runner-up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((x) => (
                <tr key={x.year} className="align-top">
                  <th scope="row" className="px-4 py-3 font-normal sm:px-5">
                    <span className="block font-semibold text-ink tabular-nums">{x.year}</span>
                    <span className="block text-[12.5px] text-muted">
                      {ORD(x.edition)} edition{x.combined ? " · M & W" : ""}
                    </span>
                  </th>
                  <td className="px-4 py-3 sm:px-5">
                    <College code={x.winner} strong />
                  </td>
                  <td className="px-4 py-3 sm:px-5">{x.runner ? <College code={x.runner} /> : <span className="text-muted">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-muted">
          2010 – 2019 from the CENTIES Championship booklet; 2020 onwards from the official results. From 2014 to 2018 Chess was one event for men and women together (marked M &amp; W). There
          were no championships in 2021 and 2022. Some older colleges are shown by their short code, as in the booklet.
        </p>
      </div>
    </section>
  );
}
