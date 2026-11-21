import { Link } from "react-router";
import { ORG } from "../content/site";
import { LEGAL_PAGES } from "../content/legal";

const COLUMNS = [
  {
    title: "Championship",
    links: [
      ["/championship", "2026 Championship"],
      ["/championship/rules", "Rules & regulations"],
      ["/championship/organizers", "Organisers"],
      ["/championship/sponsors", "Sponsors"],
    ],
  },
  {
    title: "Association",
    links: [
      ["/about", "About CENTIES"],
      ["/about/office-bearers", "Office bearers"],
      ["/gallery", "Gallery"],
      ["/downloads", "Downloads"],
    ],
  },
  // Support has its own column below, so it is left out here
  { title: "Legal", links: LEGAL_PAGES.filter((p) => p.to !== "/support").map((p) => [p.to, p.label]) },
  {
    title: "Support",
    links: [
      ["/contact", "Contact"],
      ["/support", "Support page"],
    ],
  },
];

/**
 * Site footer on a royal-blue band (the one dark block on the otherwise white site).
 * Phones: everything centred — brand on top, the four link groups in a 2 × 2 grid, then the copyright line.
 * From 640px up: left-aligned columns (brand row + 4 columns on tablets, 5 columns on laptops).
 */
export function SiteFooter() {
  return (
    <footer className="mt-24 bg-royal-900 text-sm text-white/70">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-9 px-4 py-12 text-center sm:grid-cols-4 sm:gap-x-6 sm:gap-y-10 sm:py-14 sm:text-left lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
        <div className="col-span-2 sm:col-span-4 lg:col-span-1">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <img src="/images/logo/centies-logo-96.webp" alt="" width={40} height={40} className="size-10" loading="lazy" />
            <span className="font-display text-[22px] font-extrabold tracking-wide text-white">CENTIES</span>
          </Link>
          <p className="mx-auto mt-4 max-w-xs leading-relaxed sm:mx-0">{ORG.fullName}.</p>
          <p className="mx-auto mt-3 max-w-xs leading-relaxed sm:mx-0">{ORG.address[1]}</p>
        </div>
        {COLUMNS.map((c) => (
          <nav key={c.title} aria-label={c.title} className="min-w-0">
            <p className="font-semibold text-white">{c.title}</p>
            <ul className="mt-3 space-y-1 sm:mt-3.5 sm:space-y-2.5">
              {c.links.map(([to, label]) => (
                <li key={to}>
                  {/* A taller tap area on phones */}
                  <Link to={to} className="inline-block py-1 transition-colors hover:text-white sm:py-0">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-x-6 gap-y-1.5 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 text-center text-[13px] text-white/60 sm:flex-row sm:flex-wrap sm:justify-between sm:text-left">
          <p suppressHydrationWarning>© 2009 – {new Date().getFullYear()} CENTIES Association. All rights reserved.</p>
          <p>{ORG.regNo}</p>
        </div>
      </div>
    </footer>
  );
}
