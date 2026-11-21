import { useEffect, useState, type ReactNode } from "react";
import { NavLink } from "react-router";
import { Decor, PageHero } from "./ui";
import { FORM_URL } from "../lib/config";
import { LEGAL_PAGES } from "../content/legal";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** The registration site is a separate website with its own policies. */
const REGISTRATION_POLICIES = [
  { href: `${FORM_URL}/terms`, label: "Registration terms" },
  { href: `${FORM_URL}/privacy`, label: "Registration privacy" },
  { href: `${FORM_URL}/refund-policy`, label: "Refunds & cancellation" },
];

/**
 * Document page: the usual page hero, then a left sidebar (the legal pages, then "On this page" links
 * that follow your scroll) next to the text.
 */
export function LegalLayout({ eyebrow = "Legal", title, intro, updated, sections }: { eyebrow?: string; title: string; intro: string; updated: string; sections: LegalSection[] }) {
  const [current, setCurrent] = useState(sections[0]?.id);
  const ids = sections.map((s) => s.id).join(" ");

  useEffect(() => {
    const els = ids
      .split(" ")
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setCurrent(top.target.id);
      },
      { rootMargin: "-96px 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} crumbs={[{ to: LEGAL_PAGES.find((p) => p.label === title)?.to ?? "/terms", label: title }]} />

      <div className="relative isolate overflow-x-clip">
        <Decor name="ribbon" from="xl" className="-right-36 top-8 w-[280px]" />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[240px_1fr] lg:gap-14">
          <aside className="lg:sticky lg:top-24 lg:self-start" data-aos="fade-right">
            <nav aria-label="Legal and help pages">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">Legal</p>
              <ul className="flex flex-wrap gap-2 lg:block lg:space-y-0.5">
                {LEGAL_PAGES.map((p) => (
                  <li key={p.to}>
                    <NavLink
                      to={p.to}
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isActive ? "bg-royal-50 text-royal-700" : "text-ink/75 ring-1 ring-inset ring-line hover:bg-surface hover:text-ink lg:ring-0"
                        }`
                      }
                    >
                      {p.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="On this page" className="mt-8 hidden lg:block">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">On this page</p>
              <ul className="border-l border-line">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={current === s.id ? "location" : undefined}
                      className={`-ml-px block border-l-2 py-1.5 pl-3.5 text-[13.5px] transition-colors ${
                        current === s.id ? "border-royal-600 font-medium text-royal-700" : "border-transparent text-muted hover:border-slate-300 hover:text-ink"
                      }`}
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8 hidden rounded-xl border border-line p-4 lg:block">
              <p className="text-[13px] font-semibold text-ink">Registering a college?</p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted">Registration and payment run on our separate registration site, which has its own policies.</p>
              <ul className="mt-2.5 space-y-1.5">
                {REGISTRATION_POLICIES.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="text-[13px] font-medium text-royal-600 hover:underline">
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <article className="min-w-0 max-w-3xl">
            <p className="text-[13px] text-muted">Last updated {updated}</p>
            <div className="mt-6 space-y-10 text-[15px] leading-7 text-ink/85 [&_a]:font-medium [&_a]:text-royal-600 [&_a]:underline [&_a]:underline-offset-2 [&_b]:font-semibold [&_b]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_p+p]:mt-3 [&_p+ul]:mt-3 [&_ul+p]:mt-3 [&_ul]:space-y-1.5">
              {sections.map((s) => (
                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-24" data-aos="fade-up">
                  <h2 id={`${s.id}-h`} className="mb-3 text-xl font-semibold tracking-tight text-ink">
                    {s.title}
                  </h2>
                  {s.body}
                </section>
              ))}
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
