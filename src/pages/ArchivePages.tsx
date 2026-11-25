import { EDITIONS } from "../content/history";
import { DOCS, fileSize } from "../content/data";
import { ButtonLink, Decor, DocRow, Icon, PageHero, Reveal, SectionHead, btn } from "../components/ui";

const ORD = (n: number) => (n === 1 ? "1st" : n === 2 ? "2nd" : n === 3 ? "3rd" : `${n}th`);

export function OrganizersPage() {
  const docs = DOCS.filter((d) => d.category === "organizers").sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  const editions = [...EDITIONS].reverse();
  const hostCount = new Set(EDITIONS.flatMap((e) => e.hosts)).size;
  return (
    <>
      <PageHero
        eyebrow="Championship"
        title="Organisers"
        intro="The member colleges that have hosted CENTIES since 2010."
        crumbs={[
          { to: "/championship", label: "Championship" },
          { to: "/championship/organizers", label: "Organisers" },
        ]}
      />

      <section className="relative isolate overflow-clip">
        <Decor name="ribbon" className="-right-20 top-10 w-[300px]" />
        <div className="mx-auto max-w-6xl px-4 py-20">
          <SectionHead
            eyebrow={`${EDITIONS[0].year} – ${EDITIONS.at(-1)!.year}`}
            title="Host colleges by year"
            intro={`${EDITIONS.length} editions, hosted by ${hostCount} different engineering colleges. Since 2013, each edition has been shared between several host colleges.`}
          />
          <div className="mt-10 overflow-hidden rounded-xl border border-slate-400 bg-white" data-aos="fade-up">
            <table className="w-full text-left text-[14.5px]">
              <caption className="sr-only">CENTIES host colleges and participating colleges for each year</caption>
              <thead className="bg-royal-900 text-[12.5px] font-semibold uppercase tracking-[0.06em] text-white">
                <tr>
                  <th scope="col" className="w-28 px-5 py-3 sm:w-40">
                    Year
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Host colleges
                  </th>
                  <th scope="col" className="hidden w-32 px-5 py-3 text-right md:table-cell">
                    Colleges
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-400">
                {editions.map((e) => (
                  <tr key={e.year} className="align-top">
                    <th scope="row" className="px-5 py-4 font-normal">
                      <span className="block text-[17px] font-semibold tracking-tight text-ink tabular-nums">{e.year}</span>
                      <span className="block text-[13px] text-muted">{ORD(e.edition)} CENTIES</span>
                      {e.colleges && <span className="mt-1 block text-[13px] text-muted md:hidden">{e.colleges} colleges</span>}
                    </th>
                    <td className="px-5 py-4">
                      <ul className="space-y-0.5 text-ink/85">
                        {e.hosts.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                      {e.note && <p className="mt-2 text-[13.5px] text-muted">{e.note}</p>}
                    </td>
                    <td className="hidden px-5 py-4 text-right text-ink/85 tabular-nums md:table-cell">{e.colleges ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[13px] text-muted">“Colleges” is the number of engineering colleges that took part that year.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="Documents" title="Organiser records" intro="Official lists with events and dates for each host college." />
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {docs.map((d) => (
            <DocRow key={d.file} title={d.title} file={d.file} size={fileSize(d.bytes)} type={d.type} />
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line p-6">
          <div>
            <p className="font-semibold text-ink">Would your college like to host a CENTIES event?</p>
            <p className="mt-1 text-[14.5px] text-muted">The organiser booklet explains what is involved.</p>
          </div>
          <a href="/docs/forms/organiser-booklet.pdf" download className={btn("secondary")}>
            <Icon name="download" className="size-4" /> Organiser booklet
          </a>
        </div>
      </section>
    </>
  );
}

export function SponsorsPage() {
  const docs = DOCS.filter((d) => d.category === "sponsors");
  const supporters = [
    { name: "Coimbatore Institute of Technology", what: "Athletics trophies (men)" },
    { name: "National Sports, Coimbatore", what: "Badminton winner’s trophy (men)" },
    { name: "Seagull Sports, Erode", what: "Basketball trophies (men)" },
    { name: "Dr. R. Sambath, DPE, CIT", what: "Football trophies (men)" },
    { name: "Kumaraguru College of Technology", what: "Handball trophies (men)" },
    { name: "Tiruppur Kabaddi Association", what: "Kabaddi trophies (men)" },
    { name: "PSG Tech Kho-Kho Alumni Players", what: "Kho-Kho trophies (men)" },
  ];
  return (
    <>
      <PageHero
        eyebrow="Championship"
        title="Sponsors"
        intro="The people and institutions behind CENTIES trophies."
        crumbs={[
          { to: "/championship", label: "Championship" },
          { to: "/championship/sponsors", label: "Sponsors" },
        ]}
      />
      <section className="relative isolate overflow-clip">
        <Decor name="arc" className="-right-24 -top-6 w-[330px]" />
        <div className="mx-auto max-w-6xl px-4 py-20">
          <SectionHead eyebrow="Since 2020" title="Trophy sponsors" intro="A selection of current men’s event trophy sponsors. The full men’s and women’s lists are in the documents below." />
          <ul className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {supporters.map((s) => (
              <Reveal as="li" key={s.name} className="border-t border-slate-400 py-5">
                <p className="font-semibold text-ink">{s.name}</p>
                <p className="mt-0.5 text-[14px] text-muted">{s.what}</p>
              </Reveal>
            ))}
          </ul>
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {docs.map((d) => (
              <DocRow key={d.file} title={d.title} file={d.file} size={fileSize(d.bytes)} type={d.type} />
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line p-6">
            <div>
              <p className="font-semibold text-ink">Sponsor a trophy</p>
              <p className="mt-1 max-w-xl text-[14.5px] text-muted">Several winner and runner-up trophies are open for sponsorship. Support student athletes across four districts.</p>
            </div>
            <ButtonLink to="/contact">Talk to us</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

export function GrantsPage() {
  const awards = [
    { t: "Winner & runner-up trophies", d: "Trophies for every men’s and women’s event, sponsored by member colleges and well-wishers." },
    { t: "Certificates up to 4th place", d: "Certificates are issued for the first four places in every event." },
    { t: "Fair Play Award", d: "Given to an institution for on-field behaviour and punctuality of its players, team managers and coaches." },
  ];
  return (
    <>
      <PageHero
        eyebrow="Championship"
        title="Awards"
        intro="How CENTIES rewards its champions."
        crumbs={[
          { to: "/championship", label: "Championship" },
          { to: "/championship/grants", label: "Awards" },
        ]}
      />
      <section className="relative isolate overflow-clip">
        <Decor name="ribbon" className="-right-20 top-10 w-[300px]" />
        <div className="mx-auto max-w-6xl px-4 py-20">
          <SectionHead eyebrow="Recognition" title="Trophies, certificates and fair play" />
          <ul className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-3">
            {awards.map((a) => (
              <Reveal as="li" key={a.t} className="border-t border-line pt-5">
                <p className="text-[17px] font-semibold text-ink">{a.t}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{a.d}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-12 rounded-xl border border-line p-6">
            <p className="font-semibold text-ink">Grants and prize details for 2026</p>
            <p className="mt-1 text-[14.5px] text-muted">
              Financial grants and any prize money for the 16th CENTIES Championship will be announced by the Executive Committee. Registered colleges will be informed by email.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
