import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { DOC_ALIASES, DOC_CATEGORIES, DOCS, fileSize, type DocCategory } from "../content/data";
import { btn, Decor, DocRow, Icon, PageHero } from "../components/ui";
import { NotFoundPage } from "./NotFoundPage";

const KO_MIN = 5;
const KO_MAX = 64;

function FixturePicker() {
  const [teams, setTeams] = useState(16);
  const kind = teams <= 8 ? "both" : "knockout";
  const ko = DOCS.find((d) => d.category === "knockout" && d.teams === teams);
  const league = DOCS.find((d) => d.category === "league" && d.teams === teams);
  return (
    <div className="rounded-xl border border-line p-6 sm:p-8" data-aos="fade-up">
      <p className="text-xl font-semibold tracking-tight text-ink">Find a fixture</p>
      <p className="mt-1 text-[15px] text-muted">How many teams are in your event? We’ll pick the right blank fixture.</p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label htmlFor="teams" className="sr-only">
          Number of teams
        </label>
        <div className="flex items-center overflow-hidden rounded-lg border border-line text-ink">
          <button
            type="button"
            onClick={() => setTeams((t) => Math.max(4, t - 1))}
            className="grid size-10 place-items-center text-xl font-medium hover:bg-surface hover:text-royal-600"
            aria-label="Fewer teams"
          >
            −
          </button>
          <input
            id="teams"
            type="number"
            inputMode="numeric"
            min={4}
            max={KO_MAX}
            value={teams}
            onChange={(e) => setTeams(Math.min(KO_MAX, Math.max(4, Number(e.target.value) || 4)))}
            className="h-10 w-14 border-x border-line text-center text-lg font-semibold tabular-nums outline-none"
          />
          <button
            type="button"
            onClick={() => setTeams((t) => Math.min(KO_MAX, t + 1))}
            className="grid size-10 place-items-center text-xl font-medium hover:bg-surface hover:text-royal-600"
            aria-label="More teams"
          >
            +
          </button>
        </div>
        <span className="text-[15px] text-muted">teams</span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {ko && teams >= KO_MIN && (
          <a href={ko.file} download className={btn("primary")}>
            <Icon name="download" className="size-4" /> Knockout · {teams} teams <span className="font-normal opacity-80">({fileSize(ko.bytes)})</span>
          </a>
        )}
        {league && (
          <a href={league.file} download className={btn(kind === "both" && ko ? "secondary" : "primary")}>
            <Icon name="download" className="size-4" /> League · {teams} teams <span className="font-normal opacity-80">({fileSize(league.bytes)})</span>
          </a>
        )}
      </div>
      <p className="mt-3 text-[12.5px] text-muted">Knockout fixtures: 5 – 64 teams · League fixtures: 4 – 8 teams</p>
    </div>
  );
}

export function DownloadsPage() {
  const params = useParams();
  const raw = params.category;
  const category = raw ? ((DOC_ALIASES[raw] ?? raw) as DocCategory) : undefined;
  const [q, setQ] = useState("");
  const valid = !category || DOC_CATEGORIES.some((c) => c.key === category);

  const list = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return DOCS.filter((d) => (!category || d.category === category) && words.every((w) => `${d.title} ${d.category} ${d.year ?? ""}`.toLowerCase().includes(w)));
  }, [category, q]);

  if (!valid) return <NotFoundPage />;
  const current = DOC_CATEGORIES.find((c) => c.key === category);
  const fixtures = category === "knockout" || category === "league";

  return (
    <>
      <PageHero
        eyebrow="Downloads"
        title={current ? current.label : "Downloads"}
        intro={current ? current.blurb : `All ${DOCS.length} official CENTIES documents in one place.`}
        crumbs={[{ to: "/downloads", label: "Downloads" }, ...(current ? [{ to: `/downloads/${current.key}`, label: current.label }] : [])]}
      />
      <section className="relative isolate overflow-clip">
        <Decor name="banner" from="xl" className="-right-10 top-6 w-[220px]" />
        <div className="mx-auto max-w-6xl px-4 py-12">
          <nav aria-label="Categories" className="-mx-4 overflow-x-auto px-4">
            <ul className="flex w-max gap-2">
              <li>
                <Link
                  to="/downloads"
                  className={`inline-flex h-8 items-center rounded-full px-3.5 text-[13px] font-medium ring-1 ring-inset transition-colors ${!category ? "bg-royal-700 text-white ring-royal-700" : "bg-white text-ink/80 ring-line hover:bg-surface"}`}
                >
                  All <span className={`ml-1.5 ${!category ? "text-white/75" : "text-muted"}`}>{DOCS.length}</span>
                </Link>
              </li>
              {DOC_CATEGORIES.map((c) => (
                <li key={c.key}>
                  <Link
                    to={`/downloads/${c.key}`}
                    className={`inline-flex h-8 items-center rounded-full px-3.5 text-[13px] font-medium ring-1 ring-inset transition-colors ${category === c.key ? "bg-royal-700 text-white ring-royal-700" : "bg-white text-ink/80 ring-line hover:bg-surface"}`}
                  >
                    {c.label} <span className={`ml-1.5 ${category === c.key ? "text-white/75" : "text-muted"}`}>{DOCS.filter((d) => d.category === c.key).length}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {(!category || fixtures) && (
            <div className="mt-8">
              <FixturePicker />
            </div>
          )}

          <div className="mt-8 flex items-center gap-2.5 rounded-lg border border-line bg-white px-3.5 focus-within:border-royal-500 focus-within:ring-4 focus-within:ring-royal-100">
            <Icon name="search" className="size-[18px] text-muted" />
            <label htmlFor="doc-search" className="sr-only">
              Search documents
            </label>
            <input
              id="doc-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search, e.g. “2019 results”, “football”, “eligibility”"
              className="h-11 flex-1 bg-transparent text-[15px] outline-none placeholder:text-slate-500"
            />
          </div>

          {list.length === 0 ? (
            <p className="mt-10 text-center text-muted">No documents match “{q}”.</p>
          ) : category ? (
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {list.map((d) => (
                <DocRow key={d.file} title={d.title} file={d.file} size={fileSize(d.bytes)} type={d.type} note={d.note} />
              ))}
            </ul>
          ) : (
            DOC_CATEGORIES.map((c) => {
              const items = list.filter((d) => d.category === c.key);
              if (!items.length) return null;
              const preview = q ? items : items.slice(0, c.key === "knockout" ? 4 : 6);
              return (
                <section key={c.key} className="mt-10">
                  <div className="flex items-end justify-between gap-4">
                    <h2 className="text-xl font-semibold tracking-tight text-ink">{c.label}</h2>
                    {preview.length < items.length && (
                      <Link to={`/downloads/${c.key}`} className="text-sm font-semibold text-royal-600 hover:underline">
                        All {items.length} →
                      </Link>
                    )}
                  </div>
                  <ul className="mt-4 grid gap-3 md:grid-cols-2">
                    {preview.map((d) => (
                      <DocRow key={d.file} title={d.title} file={d.file} size={fileSize(d.bytes)} type={d.type} note={d.note} />
                    ))}
                  </ul>
                </section>
              );
            })
          )}

          <div className="mt-14 rounded-xl border border-line p-6 text-[15px] text-muted">
            Can’t find a document?{" "}
            <Link to="/contact" className="font-medium text-royal-600 underline underline-offset-2">
              Contact the committee
            </Link>
            . Registration for 2026 is done online.
          </div>
        </div>
      </section>
    </>
  );
}
