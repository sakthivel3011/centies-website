import { Link } from "react-router";
import { EVENTS, sportImage } from "../content/sports";
import { RESULTS_2020, titleLeaders } from "../content/results2020";
import { ALBUMS, ALBUM_COVER } from "../content/data";
import { ButtonLink, Decor, Icon, Reveal, SectionHead } from "../components/ui";
import { DEMO_URL, REGISTER_URL } from "../lib/config";
import { EVENT } from "../content/event";
import { Countdown } from "../components/Countdown";
const SPORTS = [...new Map([...EVENTS.M, ...EVENTS.W].map((s) => [s.code, s])).values()];
const genders = (code: string) => [EVENTS.M.some((s) => s.code === code) && "Men", EVENTS.W.some((s) => s.code === code) && "Women"].filter(Boolean).join(" · ");
/** Latest champions cards: 1st blue, 2nd yellow, 3rd red (panel colour, and the matching place label). */
const PODIUM = [
  { place: "1st", panel: "bg-royal-700 text-white", label: "text-royal-700" },
  { place: "2nd", panel: "bg-gold-400 text-ink", label: "text-gold-700" },
  { place: "3rd", panel: "bg-flame-500 text-white", label: "text-flame-600" },
];

export function HomePage() {
  const leaders = titleLeaders(3);
  return (
    <>
      {/* Hero — bg 1 artwork (athletes on the right, light space on the left for the copy) */}
      <section className="relative isolate overflow-hidden bg-white pt-16 text-royal-900 lg:pt-[72px]">
        <img
          src="/images/bg/1.webp"
          srcSet="/images/bg/1-sm.webp 768w, /images/bg/1-md.webp 1280w, /images/bg/1.webp 2172w"
          sizes="100vw"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 -z-20 size-full object-cover object-left lg:object-right"
        />
        {/* Keeps the copy readable where it crosses the blue diagonal */}
        <div className="absolute inset-0 -z-10 bg-white/40 lg:bg-transparent lg:bg-gradient-to-r lg:from-white lg:from-30% lg:via-white/70 lg:via-50% lg:to-transparent lg:to-70%" />
        <div className="mx-auto flex max-w-6xl items-center px-4 pb-16 pt-16 sm:pb-24 sm:pt-24 lg:min-h-[600px]">
          <div className="animate-rise min-w-0 max-w-2xl">
            <h1 className="font-display text-[clamp(40px,14.5vw,56px)] font-extrabold uppercase leading-[0.88] tracking-wide sm:text-[84px]">
              15<sup className="relative top-[0.12em] ml-0.5 align-top text-[0.42em] normal-case leading-none">th</sup> CENTIES
              <br />
              <span className="text-flame-500">Championship</span>
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink/80">
              Inter engineering sports championship of Coimbatore, Erode,
              <br className="hidden sm:inline" /> Nilgiris &amp; Tiruppur — since 2010.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={REGISTER_URL} className="inline-flex h-11 items-center rounded-lg bg-flame-500 px-5 text-sm font-bold text-white shadow-md transition hover:bg-flame-600">
                Register your college
              </a>
              <Link to="/championship" className="inline-flex h-11 items-center rounded-lg bg-royal-700 px-5 text-sm font-bold text-white transition hover:bg-royal-800">
                2026 events &amp; fee
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted">
              Want to see how registration works?{" "}
              <a href={DEMO_URL} className="font-semibold text-royal-700 underline-offset-2 hover:underline">
                View the demo
              </a>
            </p>
            {EVENT.registrationDeadline && (
              <div className="mt-6">
                <Countdown to={EVENT.registrationDeadline} label="Registration" tone="light" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="relative isolate overflow-clip">
        <Decor name="ribbon" className="-right-20 top-6 w-[300px]" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <img
              src="/gallery/centies-2020-women/03.webp"
              srcSet="/gallery/centies-2020-women/03-sm.webp 640w, /gallery/centies-2020-women/03-md.webp 1024w, /gallery/centies-2020-women/03.webp 1600w"
              sizes="(min-width: 1024px) 560px, 92vw"
              alt="Opening ceremony march past at the XI CENTIES Championship 2020"
              loading="lazy"
              width={1600}
              height={1067}
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
          </Reveal>
          <Reveal>
            <SectionHead eyebrow="About CENTIES" title="More than a championship" />
            <p className="mt-5 text-[15.5px] leading-7 text-muted">
              CENTIES began on 22 November 2009 as a conversation between physical education directors at a zonal athletic meet. The first championship in 2010 had two games. Today it brings
              engineering colleges from four districts together every year.
            </p>
            <blockquote className="mt-6 border-l-2 border-royal-600 pl-5 text-[15.5px] leading-7 text-ink/85">
              “The sports field is where a person learns life skills — respecting, reciprocating and appreciating fellow human beings. That is why CENTIES matters.”
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <ButtonLink to="/about" size="sm">
                Read our story
              </ButtonLink>
              <ButtonLink to="/about/office-bearers" variant="secondary" size="sm">
                Office bearers
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sports */}
      <section className="relative isolate overflow-clip border-t border-line py-24">
        <Decor name="comet" from="xl" className="-left-36 top-8 w-[220px] min-[1360px]:-left-28" />
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_440px] lg:gap-16">
            <div>
              <SectionHead
                eyebrow={`${SPORTS.length} sports · 24 events`}
                title="The sports of CENTIES"
                intro="14 events for men, 10 for women. Enter as many as you like."
              />
              <ButtonLink to="/championship/rules" variant="secondary" size="sm" className="mt-6">
                Rules
              </ButtonLink>
            </div>
            <img data-aos="zoom-in" src="/images/decor/players.webp" alt="" width={735} height={420} loading="lazy" decoding="async" className="aspect-[7/4] w-full rounded-xl object-cover" />
          </div>
          {/* Every sport at a glance: small illustration, name, and who plays it */}
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {SPORTS.map((s) => (
              <li key={s.code} className="flex items-center gap-2 rounded-xl border border-slate-400 bg-white p-2 sm:gap-3 sm:p-2.5" data-aos="fade-up">
                <img src={sportImage(s.code)} alt="" loading="lazy" decoding="async" width={44} height={44} className="size-9 shrink-0 object-contain sm:size-11" />
                <span className="min-w-0">
                  <span className="block text-[14px] font-medium leading-snug text-ink [overflow-wrap:anywhere] sm:text-[14.5px]">{s.name}</span>
                  <span className="block text-[12px] leading-snug text-muted sm:text-[12.5px]">{genders(s.code)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Latest champions */}
      <section className="relative isolate overflow-clip border-t border-line py-24">
        <Decor name="arc" className="-right-24 -top-8 w-[340px]" />
        <div className="mx-auto max-w-6xl px-4">
          <SectionHead
            eyebrow="XI CENTIES · 2020"
            title="Latest champions"
            intro="Team title winners from the most recent published results."
            action={
              <ButtonLink to="/championship/results" variant="secondary" size="sm">
                All results
              </ButtonLink>
            }
          />
          <ol className="mt-10 grid gap-4 lg:grid-cols-3">
            {leaders.map((l) => {
              const rank = leaders.filter((x) => x.titles > l.titles).length;
              const p = PODIUM[rank];
              return (
                <Reveal as="li" key={l.college} className="relative overflow-hidden rounded-xl border border-line bg-white p-6">
                  {/* Coloured half on the right, cut on a diagonal, with fine cross lines and the place number */}
                  <div
                    aria-hidden
                    className={`absolute inset-y-0 right-0 grid w-[34%] place-items-center pl-[11%] [clip-path:polygon(34%_0,100%_0,100%_100%,0_100%)] bg-[repeating-linear-gradient(135deg,rgb(255_255_255/0.16)_0_2px,transparent_2px_11px)] ${p.panel}`}
                  >
                    <span className="text-6xl font-extrabold leading-none tracking-tight">{rank + 1}</span>
                  </div>
                  <div className="relative max-w-[62%]">
                    <p className={`text-[13px] font-semibold ${p.label}`}>{p.place} in team titles</p>
                    <p className="mt-3 text-4xl font-extrabold leading-none tracking-tight text-ink tabular-nums">
                      {l.titles} <span className="text-base font-normal tracking-normal text-muted">titles</span>
                    </p>
                    <p className="mt-3 font-semibold leading-snug text-ink">{l.college}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {(["M", "W"] as const).map((g) => (
              <Reveal key={g} className="overflow-hidden rounded-xl border border-line bg-white">
                <table className="w-full text-left text-[14.5px]">
                  <caption className="sr-only">{g === "M" ? "Men" : "Women"}: 2020 winners</caption>
                  <thead className="bg-surface text-[12.5px] font-semibold uppercase tracking-[0.06em] text-muted">
                    <tr>
                      <th scope="col" className="px-5 py-2.5">
                        {g === "M" ? "Men" : "Women"}
                      </th>
                      <th scope="col" className="px-5 py-2.5 text-right">
                        Winner
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {RESULTS_2020[g].slice(0, 5).map((p) => (
                      <tr key={p.event}>
                        <td className="px-5 py-2.5 font-medium text-ink">{p.event}</td>
                        <td className="px-5 py-2.5 text-right text-muted">{p.winner.split(",")[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="relative isolate overflow-clip border-t border-line py-24">
        <Decor name="wave" className="-right-16 -top-16 w-[320px]" />
        <div className="mx-auto max-w-6xl px-4">
          <SectionHead
            eyebrow="Gallery"
            title="Moments from the field"
            action={
              <ButtonLink to="/gallery" variant="secondary" size="sm">
                All albums
              </ButtonLink>
            }
          />
          <ul className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {ALBUMS.map((a) => {
              const cover = a.photos[ALBUM_COVER[a.slug] ?? 0];
              return (
                <li key={a.slug} data-aos="fade-up">
                  <Link to={`/gallery/${a.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-xl bg-surface">
                    <img src={cover.thumb} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105" />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <span className="absolute inset-x-4 bottom-4 text-white">
                      <span className="block text-[17px] font-semibold leading-snug">{a.title}</span>
                      <span className="mt-0.5 block text-[12.5px] text-white/80">{a.photos.length} photos</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Quick links */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { to: "/downloads/forms", t: "Forms & fixtures", d: "Eligibility form, knockout and league fixtures, score sheets.", icon: "download" as const },
            { to: "/championship/rules", t: "Rules & regulations", d: "Eligibility, protests and the general rules for every college.", icon: "file" as const },
            { to: "/contact", t: "Contact the committee", d: "Call or email the CENTIES office.", icon: "phone" as const },
          ].map((q) => (
            <Link key={q.to} to={q.to} className="group flex gap-3.5 rounded-xl border border-line bg-white p-5 transition-colors hover:border-slate-300 hover:bg-surface" data-aos="fade-up">
              <Icon name={q.icon} className="mt-0.5 size-5 shrink-0 text-royal-600" />
              <span>
                <span className="flex items-center gap-1.5 font-semibold text-ink">
                  {q.t} <Icon name="arrow" className="size-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-royal-700" />
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">{q.d}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
