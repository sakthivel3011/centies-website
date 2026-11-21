import { Link } from "react-router";
import { OFFICE_BEARERS, ORG, SECRETARY, WEBSITE_SUPPORT } from "../content/site";
import { btn, ButtonLink, Icon, PageHero, Reveal, SectionHead } from "../components/ui";
import { REGISTER_URL } from "../lib/config";

export function ContactPage() {
  const officers = OFFICE_BEARERS.filter((o) => ["President", "Secretary", "Treasurer"].includes(o.role));

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        intro="Sponsors and sports enthusiasts — reach the CENTIES organising committee directly."
        crumbs={[{ to: "/contact", label: "Contact" }]}
      />

      <section className="relative isolate overflow-clip">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <SectionHead eyebrow="Reach the committee" title="Who to contact" />
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Reveal as="li" className="flex flex-col rounded-xl border border-line bg-white p-6">
              <p className="flex items-center gap-2 text-[13px] font-semibold text-muted">
                <Icon name="pin" className="size-[18px] text-royal-600" /> CENTIES office
              </p>
              <address className="mt-2 not-italic text-[15.5px] leading-relaxed text-ink">
                <span className="font-semibold">{ORG.name}</span>
                <br />
                {ORG.address[0]}
                <br />
                {ORG.address[1]}
              </address>
              <p className="mt-3 flex items-center gap-2 text-[14.5px] text-ink/85">
                <Icon name="clock" className="size-4 text-royal-600" /> {ORG.hours}
              </p>
              <div className="mt-auto pt-5">
                <a href={ORG.mapsHref} target="_blank" rel="noopener noreferrer" className={btn("secondary", "sm")}>
                  Open in Google Maps <Icon name="external" className="size-3.5" />
                </a>
              </div>
            </Reveal>
            <Reveal as="li" className="flex flex-col rounded-xl border border-line bg-white p-6">
              <p className="flex items-center gap-2 text-[13px] font-semibold text-muted">
                <Icon name="mail" className="size-[18px] text-royal-600" /> Championship correspondence
              </p>
              <p className="mt-2 text-[15.5px] font-semibold text-ink">{SECRETARY.name}</p>
              <p className="text-[14px] text-muted">{SECRETARY.role}</p>
              <address className="mt-2 not-italic text-[15px] leading-relaxed text-ink/85">
                {SECRETARY.address[0]}
                <br />
                {SECRETARY.address[1]}
              </address>
              <p className="mt-3 text-[14.5px] leading-6">
                <a href={ORG.phoneHref} className="font-medium text-ink hover:text-royal-700">
                  {ORG.phone}
                </a>
                <br />
                <a href={`mailto:${ORG.email}`} className="break-all font-medium text-ink hover:text-royal-700">
                  {ORG.email}
                </a>
              </p>
            </Reveal>
            {/* Website & registration support (same details as the Support page) */}
            <Reveal as="li" className="flex flex-col rounded-xl border border-line bg-white p-6">
              <p className="flex items-center gap-2 text-[13px] font-semibold text-muted">
                <Icon name="users" className="size-[18px] text-royal-600" /> Website & registration support
              </p>
              <p className="mt-2 text-[15.5px] font-semibold text-ink">{WEBSITE_SUPPORT.name}</p>
              <p className="mt-1 text-[14px] leading-6 text-muted">{WEBSITE_SUPPORT.helpsWith}</p>
              <p className="mt-3 text-[14.5px] leading-6">
                <a href={WEBSITE_SUPPORT.phoneHref} className="font-medium text-ink hover:text-royal-700">
                  {WEBSITE_SUPPORT.phone}
                </a>
                {WEBSITE_SUPPORT.emails.map((e) => (
                  <span key={e}>
                    <br />
                    <a href={`mailto:${e}`} className="break-all font-medium text-ink hover:text-royal-700">
                      {e}
                    </a>
                  </span>
                ))}
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full bg-ok-50 px-2.5 py-1 text-[12.5px] font-semibold text-ok">
                <Icon name="clock" className="size-3.5" /> {WEBSITE_SUPPORT.hours}
              </p>
            </Reveal>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <SectionHead
          eyebrow="Executive committee"
          title="Office bearers"
          action={
            <ButtonLink to="/about/office-bearers" variant="secondary" size="sm">
              Full committee
            </ButtonLink>
          }
        />
        <dl className="mt-8 grid border-t border-line sm:grid-cols-3" data-aos="fade-up">
          {officers.map((o) => (
            <div key={o.name} className="border-b border-line py-5 sm:pr-6">
              <dt className="text-[13px] text-muted">{o.role}</dt>
              <dd className="mt-0.5 font-semibold text-ink">{o.name}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-line p-6" data-aos="fade-up">
            <p className="font-semibold text-ink">Registering a college?</p>
            <p className="mt-1 text-[14.5px] text-muted">Registration and payment for 2026 are online, and the confirmation is emailed instantly.</p>
            <a href={REGISTER_URL} className={`${btn("accent")} mt-5`}>
              Go to registration
            </a>
          </div>
          <div className="rounded-xl border border-line p-6" data-aos="fade-up">
            <p className="font-semibold text-ink">Looking for forms or fixtures?</p>
            <p className="mt-1 text-[14.5px] text-muted">Eligibility forms, knockout and league fixtures, score sheets and past results.</p>
            <Link to="/downloads" className={`${btn("primary")} mt-5`}>
              Open downloads
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
