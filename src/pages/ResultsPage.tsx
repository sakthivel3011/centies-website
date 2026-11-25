import { useState } from "react";
import { RESULTS_2020 } from "../content/results2020";
import { EDITIONS } from "../content/history";
import { DOCS, fileSize } from "../content/data";
import { btn, Decor, Icon, IconNext, PageHero, Reveal, SectionHead } from "../components/ui";

const ORD = (n: number) => (n === 1 ? "1st" : n === 2 ? "2nd" : n === 3 ? "3rd" : `${n}th`);
const short = (college: string) => college.split(",")[0];

export function ResultsPage() {
  const [g, setG] = useState<"M" | "W">("M");
  const [switched, setSwitched] = useState(false); // animate the list only after the first tab change, not on page load
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
          <SectionHead eyebrow="11th CENTIES Championship · 2020" title="2020 champions" />
          {/* Men / Women switch: a dark pill slides under the chosen tab */}
          <div role="tablist" aria-label="Category" data-aos="fade-up" className="relative mt-8 inline-grid grid-cols-2 gap-1 rounded-lg bg-surface p-1 ring-1 ring-inset ring-line">
            <span
              aria-hidden
              className={`absolute bottom-1 left-1 top-1 w-[calc(50%-6px)] rounded-md bg-royal-900 shadow-[var(--shadow-xs)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${g === "W" ? "translate-x-[calc(100%+4px)]" : ""}`}
            />
            {(["M", "W"] as const).map((k) => (
              <button
                key={k}
                role="tab"
                type="button"
                aria-selected={g === k}
                onClick={() => {
                  if (k !== g) setSwitched(true);
                  setG(k);
                }}
                className={`relative h-8 rounded-md px-5 text-[13px] font-semibold transition-colors duration-300 ${g === k ? "text-white" : "text-muted hover:text-ink"}`}
              >
                {k === "M" ? "Men" : "Women"} · {RESULTS_2020[k].length}
              </button>
            ))}
          </div>

          <div role="tabpanel" className="mt-5 overflow-hidden rounded-xl border border-line bg-white" data-aos="fade-up">
            <div className="hidden grid-cols-[150px_1fr_1fr_1fr_1fr] gap-4 border-b border-line bg-surface px-5 py-3 text-[12.5px] font-semibold uppercase tracking-[0.06em] text-muted md:grid">
              <span>Event</span>
              <span>Winner</span>
              <span>Runner-up</span>
              <span>Third</span>
              <span>Fourth</span>
            </div>
            <ul key={g} className={`divide-y divide-line ${switched ? (g === "W" ? "animate-slide-from-right" : "animate-slide-from-left") : ""}`}>
              {RESULTS_2020[g].map((p) => (
                <li key={p.event} className="grid gap-x-4 gap-y-1.5 px-5 py-4 text-[14.5px] md:grid-cols-[150px_1fr_1fr_1fr_1fr] md:items-center">
                  <span className="font-semibold text-ink">{p.event}</span>
                  <span className="flex items-center gap-2 font-medium text-ink">
                    <Icon name="trophy" className="size-4 shrink-0 text-gold-600" />
                    <span>
                      <span className="mr-1 text-xs font-semibold text-muted md:hidden">Winner:</span>
                      {short(p.winner)}
                    </span>
                  </span>
                  <span className="text-muted">
                    <span className="mr-1 text-xs font-semibold md:hidden">Runner-up:</span>
                    {short(p.runner)}
                  </span>
                  <span className="text-muted">
                    <span className="mr-1 text-xs font-semibold md:hidden">Third:</span>
                    {short(p.third)}
                  </span>
                  <span className="text-muted">
                    <span className="mr-1 text-xs font-semibold md:hidden">Fourth:</span>
                    {short(p.fourth)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-3 text-[13px] text-muted">Transcribed from the official 2020 results. Individual athletics results are in the full PDF below.</p>
        </div>
      </section>

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
                  {ed && <p className="mt-3 line-clamp-2 text-[13px] text-muted">Hosted by {ed.hosts.join(", ")}</p>}
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
