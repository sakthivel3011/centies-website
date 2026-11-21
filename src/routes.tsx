import { useEffect, type ComponentType } from "react";
import { Outlet, ScrollRestoration, useLocation, useMatches, useNavigation, type Params, type RouteObject } from "react-router";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { LoadingScreen } from "./components/LoadingScreen";
import { ALBUMS, DOC_ALIASES, DOC_CATEGORIES } from "./content/data";
import { initAos } from "./lib/aos";
import { initSmoothScroll } from "./lib/smooth";

/** Each page is its own JavaScript chunk, loaded on demand (the first page is loaded before hydration in main.tsx). */
const page =
  <M extends Record<string, unknown>>(load: () => Promise<M>, name: keyof M & string) =>
  async () => ({ Component: (await load())[name] as ComponentType });
const home = () => import("./pages/HomePage");
const about = () => import("./pages/AboutPages");
const archive = () => import("./pages/ArchivePages");
const gallery = () => import("./pages/GalleryPages");
const legal = () => import("./pages/LegalPages");
import { SITE_URL } from "./lib/config";

export type Meta = { title: string; description: string };
type Handle = { meta: Meta | ((params: Params) => Meta) };

const NOT_FOUND: Meta = { title: "Page not found", description: "The page you are looking for does not exist." };

function Layout() {
  // Show the loading page only while a *different* page is being fetched (not for same-page hash or search changes).
  const navigation = useNavigation();
  const { pathname } = useLocation();
  const loading = navigation.state === "loading" && navigation.location.pathname !== pathname;
  // Once, after the page is interactive: AOS-style scroll animations and smooth wheel scrolling
  useEffect(() => {
    initAos();
    void initSmoothScroll();
  }, []);
  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-md focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      <RouteMeta />
      <SiteHeader />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      {loading && <LoadingScreen />}
      <SiteFooter />
      <ScrollRestoration />
    </div>
  );
}

export function metaFor(matches: { params: Params; handle: unknown }[]): Meta {
  const m = [...matches].reverse().find((x) => (x.handle as Handle | undefined)?.meta);
  if (!m) return NOT_FOUND;
  const meta = (m.handle as Handle).meta;
  return typeof meta === "function" ? meta(m.params) : meta;
}

export function documentTitle(meta: Meta) {
  return meta.title === "Home" ? "CENTIES — Inter Engineering Sports Championship since 2010" : `${meta.title} · CENTIES`;
}

/** Keeps the tab title, description and canonical link in sync on client-side navigation. */
function RouteMeta() {
  const matches = useMatches();
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = metaFor(matches);
    document.title = documentTitle(meta);
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", SITE_URL + (pathname === "/" ? "/" : pathname));
  }, [matches, pathname]);
  return null;
}

const albumMeta = (p: Params): Meta => {
  const a = ALBUMS.find((x) => x.slug === p.album);
  return a ? { title: `${a.title} — Gallery`, description: `${a.photos.length} photos from the ${a.title} championship at ${a.venue}.` } : NOT_FOUND;
};

const downloadsMeta = (p: Params): Meta => {
  const key = p.category ? (DOC_ALIASES[p.category] ?? p.category) : undefined;
  const c = DOC_CATEGORIES.find((x) => x.key === key);
  return c ? { title: `${c.label} — Downloads`, description: c.blurb } : NOT_FOUND;
};

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: "/", lazy: page(home, "HomePage"), handle: { meta: { title: "Home", description: "CENTIES — the Coimbatore, Erode, Nilgiris and Tiruppur District Inter Engineering Sports Championship. 15th edition in 2026 with 24 events." } } },
      { path: "/about", lazy: page(about, "AboutPage"), handle: { meta: { title: "About CENTIES", description: "How CENTIES began in 2009, how the championship has grown since 2010, and what it stands for." } } },
      { path: "/about/office-bearers", lazy: page(about, "OfficeBearersPage"), handle: { meta: { title: "Office bearers", description: "The executive committee leading the CENTIES Association." } } },
      { path: "/championship", lazy: page(() => import("./pages/ChampionshipPage"), "ChampionshipPage"), handle: { meta: { title: "15th CENTIES Championship 2026", description: "Events, registration fee and how to register your college for the 15th CENTIES Championship 2026." } } },
      { path: "/championship/results", lazy: page(() => import("./pages/ResultsPage"), "ResultsPage"), handle: { meta: { title: "Results", description: "CENTIES champions and official results from every edition since 2010." } } },
      { path: "/championship/organizers", lazy: page(archive, "OrganizersPage"), handle: { meta: { title: "Organisers", description: "Engineering colleges that have hosted CENTIES events since 2010." } } },
      { path: "/championship/sponsors", lazy: page(archive, "SponsorsPage"), handle: { meta: { title: "Sponsors", description: "Trophy sponsors who support the CENTIES Championship." } } },
      { path: "/championship/rules", lazy: page(() => import("./pages/RulesPage"), "RulesPage"), handle: { meta: { title: "Rules & regulations", description: "Eligibility, protests and the general rules for every CENTIES event." } } },
      { path: "/championship/grants", lazy: page(archive, "GrantsPage"), handle: { meta: { title: "Awards & grants", description: "Trophies, certificates and the Fair Play Award at the CENTIES Championship." } } },
      { path: "/gallery", lazy: page(gallery, "GalleryPage"), handle: { meta: { title: "Gallery", description: "Photos from CENTIES championships — matches, ceremonies and champions." } } },
      { path: "/gallery/:album", lazy: page(gallery, "AlbumPage"), handle: { meta: albumMeta } },
      { path: "/downloads", lazy: page(() => import("./pages/DownloadsPage"), "DownloadsPage"), handle: { meta: { title: "Downloads", description: "Forms, fixtures, score sheets, results and sponsor lists for the CENTIES Championship." } } },
      { path: "/downloads/:category", lazy: page(() => import("./pages/DownloadsPage"), "DownloadsPage"), handle: { meta: downloadsMeta } },
      { path: "/contact", lazy: page(() => import("./pages/ContactPage"), "ContactPage"), handle: { meta: { title: "Contact", description: "Phone, email and address of the CENTIES Association, Coimbatore." } } },
      { path: "/terms", lazy: page(legal, "TermsPage"), handle: { meta: { title: "Terms of Service", description: "The terms for using the CENTIES Association website and its downloads." } } },
      { path: "/privacy", lazy: page(legal, "PrivacyPage"), handle: { meta: { title: "Privacy policy", description: "What information the CENTIES website collects — very little — and how it is handled." } } },
      { path: "/cookie-policy", lazy: page(legal, "CookiePage"), handle: { meta: { title: "Cookie policy", description: "The CENTIES website sets no cookies and uses no tracking. Here is exactly what it stores." } } },
      { path: "/security", lazy: page(legal, "SecurityPage"), handle: { meta: { title: "Security", description: "How the CENTIES website is protected, and how to report a security problem." } } },
      { path: "/support", lazy: page(legal, "SupportPage"), handle: { meta: { title: "Support", description: "Who to contact for help with the CENTIES website, registration or the championship." } } },
      { path: "*", lazy: page(() => import("./pages/NotFoundPage"), "NotFoundPage"), handle: { meta: NOT_FOUND } },
    ],
  },
];

/** Every URL that is pre-rendered to static HTML (also used for the sitemap). */
export function staticPaths() {
  return [
    "/",
    "/about",
    "/about/office-bearers",
    "/championship",
    "/championship/results",
    "/championship/organizers",
    "/championship/sponsors",
    "/championship/rules",
    "/championship/grants",
    "/gallery",
    ...ALBUMS.map((a) => `/gallery/${a.slug}`),
    "/downloads",
    ...DOC_CATEGORIES.map((c) => `/downloads/${c.key}`),
    "/contact",
    "/terms",
    "/privacy",
    "/cookie-policy",
    "/security",
    "/support",
  ];
}
