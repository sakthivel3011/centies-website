import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation, useNavigation } from "react-router";
import { btn, Icon, IconFire } from "./ui";
import { REGISTER_URL } from "../lib/config";

type Item = { to: string; label: string; desc?: string };
type Group = { label: string; base: string; items: Item[] };

export const NAV: (Item | Group)[] = [
  {
    label: "About",
    base: "/about",
    items: [
      { to: "/about", label: "About CENTIES", desc: "Our story since 2009" },
      { to: "/about/office-bearers", label: "Office bearers", desc: "The executive committee" },
    ],
  },
  {
    label: "Championship",
    base: "/championship",
    items: [
      { to: "/championship", label: "2026 Championship", desc: "Events, fee and registration" },
      { to: "/championship/results", label: "Results", desc: "Champions since 2010" },
      { to: "/championship/rules", label: "Rules & regulations", desc: "Eligibility and general rules" },
      { to: "/championship/organizers", label: "Organisers", desc: "Host colleges by year" },
      { to: "/championship/sponsors", label: "Sponsors", desc: "Trophy sponsors" },
      { to: "/championship/grants", label: "Awards", desc: "Trophies and Fair Play Award" },
    ],
  },
  { to: "/gallery", label: "Gallery" },
  { to: "/downloads", label: "Downloads" },
  { to: "/contact", label: "Contact" },
];

const isGroup = (n: Item | Group): n is Group => "items" in n;

function Dropdown({ group }: { group: Group }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const active = pathname.startsWith(group.base);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 rounded-lg px-3 py-2 text-[14px] font-medium transition-colors ${active ? "text-royal-700" : "text-ink/75 hover:text-ink"}`}
      >
        {group.label}
        <Icon name="chevron" className={`size-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-2">
          <ul className="animate-rise rounded-xl border border-line bg-white p-1.5 shadow-lg">
            {group.items.map((i) => (
              <li key={i.to}>
                <NavLink end to={i.to} onClick={() => setOpen(false)} className={({ isActive }) => `block rounded-lg px-3 py-2.5 transition-colors ${isActive ? "bg-royal-50" : "hover:bg-surface"}`}>
                  <span className="block text-[14px] font-medium text-ink">{i.label}</span>
                  {i.desc && <span className="block text-[12.5px] text-muted">{i.desc}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const ROW = "flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-[15px] font-medium text-ink transition-colors";
const ROW_ON = "bg-royal-50 text-royal-700";

/**
 * A menu section (About, Championship) that opens and closes with a tap; the arrow turns when open.
 * The section holding the current page starts open. Closed links are hidden from keyboard and screen readers (`inert`).
 */
function MenuGroup({ group }: { group: Group }) {
  const { pathname } = useLocation();
  const here = pathname === group.base || pathname.startsWith(`${group.base}/`);
  const [open, setOpen] = useState(here);
  const id = `menu-${group.base.slice(1)}`;
  return (
    <>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls={id} className={`${ROW} ${here ? "text-royal-700" : ""} hover:bg-surface`}>
        {group.label}
        <Icon name="chevron" className={`size-5 text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {/* Smooth open/close: the row height animates from 0 to the links' natural height */}
      <div id={id} inert={!open} className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <ul className="ml-3 overflow-hidden border-l border-line pl-2">
          {group.items.map((i) => (
            <li key={i.to}>
              <NavLink end to={i.to} className={({ isActive }) => `block rounded-lg px-3 py-2.5 text-[14.5px] ${isActive ? `${ROW_ON} font-medium` : "text-ink/80 hover:bg-surface"}`}>
                {i.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/**
 * Phone and tablet menu: slides in from the right, and slides back out (with the dark background fading) before it is
 * removed — whether closed with ✕, Escape, a tap outside, or by choosing a link. With "reduce motion" it opens and closes at once.
 */
function MobileMenu({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [closing, setClosing] = useState(false);
  const close = useCallback(() => {
    setClosing((was) => {
      if (!was) window.setTimeout(onClose, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 260);
      return true;
    });
  }, [onClose]);

  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [close]);

  // Numbers each link for the one-after-another glide-in
  let item = 0;
  const step = () => ({ "--i": item++ }) as CSSProperties;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu" data-lenis-prevent>
      <div className={`absolute inset-0 bg-ink/50 ${closing ? "menu-backdrop-out" : "menu-backdrop-in"}`} onClick={close} />
      <nav
        className={`absolute inset-y-0 right-0 flex w-[min(88vw,360px)] flex-col overflow-y-auto bg-white shadow-2xl ${closing ? "menu-panel-out" : "menu-panel-in"}`}
        onClick={(e) => (e.target as HTMLElement).closest("a") && close()}
      >
        {/* Just a close button at the top, no title bar */}
        <div className="flex justify-end px-3 pt-3">
          <button ref={closeRef} type="button" onClick={close} className="grid size-10 place-items-center rounded-lg hover:bg-surface" aria-label="Close menu">
            <Icon name="close" />
          </button>
        </div>
        <ul className="space-y-0.5 px-4">
          <li className="menu-item" style={step()}>
            <NavLink to="/" end className={({ isActive }) => `${ROW} ${isActive ? ROW_ON : "hover:bg-surface"}`}>
              Home
            </NavLink>
          </li>
          {NAV.map((n) => (
            <li key={isGroup(n) ? n.label : n.to} className="menu-item" style={step()}>
              {isGroup(n) ? (
                <MenuGroup group={n} />
              ) : (
                <NavLink to={n.to} className={({ isActive }) => `${ROW} ${isActive ? ROW_ON : "hover:bg-surface"}`}>
                  {n.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
        {/* Right under the links, not pinned to the bottom */}
        <div className="menu-item px-4 pb-8 pt-4" style={step()}>
          <a href={REGISTER_URL} className={`${btn("primary")} text-base`}>
            <IconFire />
            Register your college
          </a>
        </div>
      </nav>
    </div>
  );
}

// Has the page scrolled away from the top? Server snapshot is false (page starts at the top).
const onScroll = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
};
const isScrolled = () => window.scrollY > 8;
const notScrolled = () => false;

export function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const closeMenu = useCallback(() => setMenu(false), []);
  // On the home page the header floats transparent over the hero, then turns solid once you scroll.
  const overlay = useLocation().pathname === "/";
  const scrolled = useSyncExternalStore(onScroll, isScrolled, notScrolled);
  const navigating = useNavigation().state === "loading"; // solid while the loading page shows
  const clear = overlay && !scrolled && !menu && !navigating;

  return (
    <header
      className={`${overlay ? "fixed inset-x-0" : "sticky"} top-0 z-40 border-b transition-[background-color,border-color] duration-300 ${
        clear ? "border-transparent bg-transparent" : "border-line bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 lg:h-[72px]">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/images/logo/centies-logo-96.webp" alt="" width={44} height={44} className="size-10 lg:size-11" />
          <span className="leading-none">
            <span className="block font-display text-[23px] font-extrabold tracking-wide text-royal-700">CENTIES</span>
            <span className="hidden text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted sm:block">Inter Engineering Sports</span>
          </span>
        </Link>

        <nav
          aria-label="Main"
          className={`ml-auto hidden items-center gap-0.5 rounded-full transition-[background-color,box-shadow] duration-300 lg:flex ${
            clear ? "bg-white/80 px-1.5 py-1 shadow-sm ring-1 ring-black/5 backdrop-blur" : ""
          }`}
        >
          {NAV.map((n) =>
            isGroup(n) ? (
              <Dropdown key={n.label} group={n} />
            ) : (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) => `rounded-lg px-3 py-2 text-[14px] font-medium transition-colors ${isActive ? "text-royal-700" : "text-ink/75 hover:text-ink"}`}
              >
                {n.label}
              </NavLink>
            ),
          )}
        </nav>

        {/* Over the dark artwork of the home hero (wide screens) the link is white, like on the dark page banners */}
        <a href={REGISTER_URL} className={`${btn("primary")} ml-auto lg:ml-4 ${clear ? "lg:text-white lg:hover:text-gold-300" : ""}`}>
          <IconFire className={clear ? "text-flame-500 lg:text-gold-400" : undefined} />
          Register
        </a>
        <button type="button" onClick={() => setMenu(true)} className="grid size-10 place-items-center rounded-lg text-ink hover:bg-surface lg:hidden" aria-label="Open menu" aria-expanded={menu}>
          <Icon name="menu" className="size-6" />
        </button>
      </div>
      {/* Drawn on <body>, not inside the header: the header's backdrop blur would otherwise shrink the full-screen menu to the header's height */}
      {menu && createPortal(<MobileMenu onClose={closeMenu} />, document.body)}
    </header>
  );
}
