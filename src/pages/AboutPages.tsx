import { INSTITUTIONS, OFFICE_BEARERS, ORG, SECRETARY, VALUES } from "../content/site";
import { EDITIONS, MILESTONES } from "../content/history";
import { Decor, PageHero, Reveal, SectionHead } from "../components/ui";

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="About CENTIES"
        intro="Bringing engineering college athletes together on one field, every year since 2010."
        crumbs={[{ to: "/about", label: "About" }]}
      />

      {/* Origins */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHead eyebrow="Our origins" title="How it all started" />
            <div className="mt-6 space-y-4 text-[15.5px] leading-7 text-ink/80">
              <p>
                It all happened on <b className="font-semibold text-ink">22 November 2009</b>, during a casual discussion among physical education personnel from different engineering colleges at a
                zonal athletic meet. The goal was to start an association to promote sports and games among engineering students and to carry out other sports-related social activities.
              </p>
              <p>
                Several names were suggested, including “CENT Club”, before a member spontaneously proposed <b className="font-semibold text-ink">CENTIES</b> — Coimbatore, Erode, Nilgiris and Tiruppur
                District Inter Engineering Sports. The name sounded sweet and was readily accepted by all.
              </p>
              <p>
                The forum was named the Engineering Colleges Physical Educationist Club (ECPEC), with CENTIES as its major programme. On <b className="font-semibold text-ink">3 May 2018</b> the
                general body officially renamed the club CENTIES. The association is registered in Tamil Nadu ({ORG.regNo}).
              </p>
            </div>
          </Reveal>
          <Reveal>
            <img
              src="/gallery/centies-2020-women/04.webp"
              alt="Dignitaries at the opening of the XI CENTIES Championship 2020"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
            <dl className="mt-6 grid grid-cols-2 divide-x divide-line border-y border-line">
              <div className="py-5 pr-5">
                <dt className="text-[13px] text-muted">First championship, 2010</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-ink">2 games</dd>
              </div>
              <div className="py-5 pl-5">
                <dt className="text-[13px] text-muted">2026 championship</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-ink">24 events</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Why it matters */}
      <section className="relative isolate overflow-clip border-y border-line">
        <Decor name="arc" className="-bottom-16 -left-28 w-[340px]" />
        <Decor name="ribbon" className="-right-20 top-10 w-[290px]" />
        <div className="mx-auto max-w-3xl px-4 py-20">
          <p className="text-[13px] font-semibold text-royal-600">Why CENTIES matters</p>
          <blockquote className="mt-4 space-y-4 border-l-2 border-royal-600 pl-6 text-[18px] leading-8 text-ink/85">
            <p>
              “We believe that the sports field is where a person learns life skills better, by dealing with the varied emotions of others. It is a training field for every sportsperson to understand
              fellow human beings, where mutual understanding develops irrespective of social differences.”
            </p>
            <p>
              “Everyone learns to respect, reciprocate and appreciate fellow beings spontaneously, without expectation or hesitation. Mutual trust develops and team spirit persists — the joy of
              togetherness stands tall. That is why CENTIES is so important.”
            </p>
          </blockquote>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionHead eyebrow="What we stand for" title="Our core values" />
        <ul className="mt-10 grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <Reveal as="li" key={v.title} className="border-t-2 border-ink pt-5">
              <p className="text-[17px] font-semibold text-ink">{v.title}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{v.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Milestones */}
      <section className="relative isolate overflow-clip">
        <Decor name="flow" from="xl" className="-right-40 top-0 w-[360px]" />
        <div className="mx-auto max-w-6xl px-4">
          <SectionHead eyebrow="Milestones" title="The growth" intro={`From two games and 23 colleges in 2010 to ${EDITIONS.at(-1)!.edition} editions by 2020, with up to 36 colleges taking part.`} />
          <ol className="mt-10 border-t-2 border-ink">
            {MILESTONES.map((m) => (
              <Reveal as="li" key={m.year} className="grid gap-x-10 gap-y-1 border-b border-ink py-6 sm:grid-cols-[120px_1fr]">
                <p className="text-2xl font-semibold tracking-tight text-royal-700 tabular-nums">{m.year}</p>
                <div>
                  <p className="font-semibold text-ink">{m.title}</p>
                  <p className="mt-1 max-w-2xl text-[15px] leading-relaxed text-muted">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

export function OfficeBearersPage() {
  const officers = OFFICE_BEARERS.filter((o) => o.role !== "Executive Member");
  const members = OFFICE_BEARERS.filter((o) => o.role === "Executive Member");
  const groups = [
    { title: "Office bearers", rows: officers },
    { title: "Executive members", rows: members },
  ];

  return (
    <>
      <PageHero
        eyebrow="About"
        title="Office bearers"
        intro="The executive committee guiding the CENTIES Inter Engineering Sports forum."
        crumbs={[
          { to: "/about", label: "About" },
          { to: "/about/office-bearers", label: "Office bearers" },
        ]}
      />
      <section className="relative isolate overflow-clip">
        <Decor name="ribbon" className="-right-20 top-12 w-[300px]" />
        <div className="mx-auto max-w-6xl px-4 py-20">
          <SectionHead
            eyebrow="Executive committee"
            title="Who leads CENTIES"
            intro={`${OFFICE_BEARERS.length} members from our member colleges.`}
          />
          <div className="mt-10 overflow-hidden rounded-xl border border-slate-400 bg-white" data-aos="fade-up">
            <table className="w-full text-left text-[14.5px]">
              <caption className="sr-only">CENTIES executive committee: name, role and institution</caption>
              <thead className="bg-royal-900 text-[12.5px] font-semibold uppercase tracking-[0.06em] text-white">
                <tr>
                  <th scope="col" className="px-5 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Role
                  </th>
                  <th scope="col" className="hidden px-5 py-3 md:table-cell">
                    Institution
                  </th>
                </tr>
              </thead>
              {groups.map((g) => (
                <tbody key={g.title} className="divide-y divide-slate-400 border-t border-slate-400">
                  <tr className="bg-white">
                    <th scope="rowgroup" colSpan={3} className="px-5 pb-2 pt-5 text-[13px] font-semibold text-royal-600">
                      {g.title}
                    </th>
                  </tr>
                  {g.rows.map((o) => (
                    <tr key={o.name}>
                      <td className="px-5 py-3.5 align-top">
                        <span className="font-medium text-ink">{o.name}</span>
                        <span className="mt-0.5 block text-[13px] text-muted md:hidden">{INSTITUTIONS[o.institution] ?? o.institution}</span>
                      </td>
                      <td className="px-5 py-3.5 align-top text-ink/80">{o.role}</td>
                      <td className="hidden px-5 py-3.5 align-top text-muted md:table-cell">{INSTITUTIONS[o.institution] ?? o.institution}</td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>

          <div className="mt-10 w-fit max-w-full rounded-xl border border-line p-6">
            <p className="font-semibold text-ink">Championship correspondence</p>
            <p className="mt-1 text-[14.5px] text-muted">
              {SECRETARY.name}, {SECRETARY.role}
            </p>
            <address className="mt-1 text-[14.5px] not-italic text-muted">{SECRETARY.address.join(", ")}</address>
          </div>
        </div>
      </section>
    </>
  );
}
