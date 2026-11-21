import type { ReactNode } from "react";
import { Link } from "react-router";

/** Scroll-in animation names (AOS style); see src/lib/aos.ts and index.css. */
export type Aos = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "fade";

type IconName = "arrow" | "download" | "file" | "phone" | "mail" | "pin" | "clock" | "whatsapp" | "trophy" | "users" | "calendar" | "search" | "close" | "chevron" | "menu" | "external" | "photo";

const PATHS: Record<IconName, ReactNode> = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  download: <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" />,
  file: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  whatsapp: <path d="M4 20l1.3-3.9A8.5 8.5 0 1 1 8 19zM9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 1a5 5 0 0 1-3-3l1-1-1-2z" />,
  trophy: <path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4m8-4h3a3 3 0 0 1-3 4m-4 3v4m-4 3h8m-6 0 1-3h2l1 3" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7m2.5 8.5a6.5 6.5 0 0 0-3-5.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4m8-4v4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevron: <path d="m7 10 5 5 5-5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  external: <path d="M14 5h5v5m0-5-8 8M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4" />,
  photo: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.8" />
      <path d="m3 17 5-5 4 4 3-3 6 6" />
    </>
  ),
};

export function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {PATHS[name]}
    </svg>
  );
}

/* Decorative artwork (bg 3, 4, 6 and 9–15 with the background removed; made by scripts/make-decor.mjs). */
const DECOR = {
  arc: { src: "/images/decor/arc.webp", w: 618, h: 325 },
  wave: { src: "/images/decor/wave.webp", w: 736, h: 368 },
  ribbon: { src: "/images/decor/ribbon.webp", w: 597, h: 225 },
  flow: { src: "/images/decor/flow.webp", w: 656, h: 233 }, // bg 9: rainbow wave
  arrow: { src: "/images/decor/arrow.webp", w: 519, h: 736 }, // bg 10: yellow and navy arrow
  swells: { src: "/images/decor/swells.webp", w: 661, h: 331 }, // bg 11: navy waves
  streaks: { src: "/images/decor/streaks.webp", w: 556, h: 585 }, // bg 12: blue and green streaks
  comet: { src: "/images/decor/comet.webp", w: 449, h: 443 }, // bg 13: orange streaks
  fan: { src: "/images/decor/fan.webp", w: 586, h: 496 }, // bg 14: blue fan
  banner: { src: "/images/decor/banner.webp", w: 294, h: 111 }, // bg 15: red ribbon
} as const;

/**
 * A colourful accent in the side space of a white section, behind the content.
 * The section needs `relative isolate overflow-clip`. Shown from laptop width up (`from="xl"`: wide screens only), so phones and tablets stay clean.
 */
export function Decor({ name, className, from = "lg" }: { name: keyof typeof DECOR; className: string; from?: "lg" | "xl" }) {
  const d = DECOR[name];
  const show = from === "xl" ? "hidden xl:block" : "hidden lg:block";
  return (
    <img
      src={d.src}
      alt=""
      width={d.w}
      height={d.h}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={`pointer-events-none absolute -z-10 h-auto max-w-none select-none ${show} ${className}`}
    />
  );
}

/** Page header band used by every inner page. */
export function PageHero({ eyebrow, title, intro, crumbs, children }: { eyebrow: string; title: ReactNode; intro?: string; crumbs?: { to: string; label: string }[]; children?: ReactNode }) {
  return (
    <section className="hero-pattern relative overflow-hidden text-white">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-10 sm:pt-14">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-white/60">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.to} className="flex items-center gap-1.5">
                  <span aria-hidden>/</span>
                  <Link to={c.to} className="hover:text-white">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300">{eyebrow}</p>
        <h1 className="mt-2 max-w-3xl font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-wide sm:text-6xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/80">{intro}</p>}
        {children}
      </div>
      <div className="beads opacity-90" aria-hidden />
    </section>
  );
}

export function SectionHead({ eyebrow, title, intro, action }: { eyebrow?: string; title: string; intro?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4" data-aos="fade-up">
      <div className="max-w-2xl">
        {eyebrow && <p className="text-[13px] font-semibold text-royal-600">{eyebrow}</p>}
        <h2 className="mt-1.5 text-[28px] font-semibold leading-tight tracking-tight text-ink sm:text-[32px]">{title}</h2>
        {intro && <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{intro}</p>}
      </div>
      {action}
    </div>
  );
}

/** Glides in the first time it scrolls into view (default: fade up). Items that appear together are staggered. */
export function Reveal({ children, className, as: Tag = "div", aos = "fade-up", delay }: { children: ReactNode; className?: string; as?: "div" | "section" | "li"; aos?: Aos; delay?: number }) {
  return (
    <Tag className={className} data-aos={aos} data-aos-delay={delay}>
      {children}
    </Tag>
  );
}

/* Buttons: one compact style across the site.
   primary = blue (most actions) · accent = orange (registration) · secondary = white with a border · ghost = on dark bands */
type BtnVariant = "primary" | "accent" | "secondary" | "ghost";
type BtnSize = "sm" | "md";
const BTN_SIZE: Record<BtnSize, string> = { sm: "h-8 px-3 text-[13px]", md: "h-9 px-4 text-sm" };
const BTN_VARIANT: Record<BtnVariant, string> = {
  primary: "bg-royal-700 text-white shadow-[var(--shadow-xs)] hover:bg-royal-800",
  accent: "bg-flame-500 text-white shadow-[var(--shadow-xs)] hover:bg-flame-600",
  secondary: "bg-white text-ink shadow-[var(--shadow-xs)] ring-1 ring-inset ring-line hover:bg-surface hover:ring-slate-300",
  ghost: "bg-white/10 text-white ring-1 ring-inset ring-white/25 hover:bg-white/15",
};

/** Class names for a button-styled link or button. */
export const btn = (variant: BtnVariant = "primary", size: BtnSize = "md") =>
  `inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg font-semibold transition-colors ${BTN_SIZE[size]} ${BTN_VARIANT[variant]}`;

export function ButtonLink({ to, children, variant = "primary", size = "md", className = "" }: { to: string; children: ReactNode; variant?: BtnVariant; size?: BtnSize; className?: string }) {
  return (
    <Link to={to} className={`${btn(variant, size)} ${className}`}>
      {children}
    </Link>
  );
}

/** One downloadable document row. Files are served from this site (no external links). */
export function DocRow({ title, file, size, type, note }: { title: string; file: string; size: string; type: string; note?: string }) {
  return (
    <li className="flex items-center gap-3.5 rounded-xl border border-line bg-white px-4 py-3.5 transition-colors hover:border-slate-300" data-aos="fade-up">
      <Icon name="file" className={`size-5 shrink-0 ${type === "PDF" ? "text-flame-500" : "text-royal-600"}`} />
      <div className="min-w-0 flex-1">
        <p className="text-[14.5px] font-medium leading-snug text-ink">{title}</p>
        <p className="mt-0.5 text-[13px] text-muted">
          {type} · {size}
          {note ? ` · ${note}` : ""}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {type === "PDF" && (
          <span className="hidden sm:inline-flex">
            <a href={file} target="_blank" rel="noopener" className={btn("secondary", "sm")}>
              View
            </a>
          </span>
        )}
        <a href={file} download className={btn("primary", "sm")} aria-label={`Download ${title}`}>
          <Icon name="download" className="size-4" />
          <span className="hidden sm:inline">Download</span>
        </a>
      </div>
    </li>
  );
}
