# CENTIES — main website

React 19 + Vite 8 + React Router 7 + Tailwind 4. **No backend**: every page is pre-rendered to static HTML at build
time (fast, works for search engines), then React takes over in the browser.

Registration and payment live in the separate **`../form`** project. This site links to it with `VITE_FORM_URL`.

## Run

```bash
npm install
npm run dev        # http://localhost:5174   (run ../form on :5173 for the Register buttons)
npm test           # checks every download, photo and data file exists
npm run build      # type-check → client build → server render of every page → dist/ (+ sitemap.xml, robots.txt)
npm run preview    # serve dist/ with the production security headers on :4174
```

## Pages (all content from the old centies.in, plus more)

| URL | Content |
|---|---|
| `/` | Hero artwork, stats, story, 15 sports, 2020 champions, albums |
| `/about`, `/about/office-bearers` | Origin story, values, milestones; executive committee |
| `/championship` | 2026 events (14 men + 10 women), fee slabs, how to register |
| `/championship/results` | 2020 champions table (men/women) + result PDFs 2010–2020 |
| `/championship/organizers` | Host colleges and participation for every year 2010–2020 + PDFs |
| `/championship/sponsors`, `/championship/grants` | Trophy sponsors; trophies, certificates, Fair Play Award |
| `/championship/rules` | 11 rules + system of play for every sport |
| `/gallery`, `/gallery/:album` | 4 albums, 65 photos, full-screen viewer (keyboard + swipe) |
| `/downloads`, `/downloads/:category` | 96 files with search, categories and a “how many teams?” fixture finder |
| `/contact` | Phone, WhatsApp, email, office address & hours, Secretary’s address |
| `/terms`, `/privacy`, `/cookie-policy`, `/security`, `/support` | Legal and help pages for this website (left sidebar with “On this page” links). The registration site has its own. |

Old site URLs keep working (`/downloads/score-sheet` redirects to `/downloads/score-sheets`).

## Phase 3 (done): quality and launch readiness

| Check | Result |
|---|---|
| Accessibility (axe-core, WCAG 2.2 AA, 26 pages × phone/desktop) | **0 issues**: `npm run audit:a11y` |
| Lighthouse, simulated slow phone | Accessibility, Best practices and SEO **100** on every page tested. Performance: Home 89–94, inner pages 96–99. CLS 0. |
| Page check (17 pages × 2 widths) | 0 console errors, 0 CSP violations, 0 horizontal overflow, 0 broken images |
| Dependencies | `npm audit`: 0 vulnerabilities |

What Phase 3 added:
- Each page is its own small JS chunk.
- Responsive hero and gallery images, plus preloaded fonts and hero image.
- The brand orange is deepened to `#cc3d14` to meet contrast rules.
- A javelin animation in the hero (the site respects "reduce motion").
- A registration countdown, which appears when dates are set.
- Breadcrumb and event data for Google.
- An installable web app manifest, `security.txt`, and an absolute social share image.
- The `add-album` and `add-doc` tools, and the committee guide (`CONTENT-GUIDE.md`).

## Editing content

See **[CONTENT-GUIDE.md](CONTENT-GUIDE.md)** for step-by-step instructions (dates, albums, documents, office bearers, new year).


- Contact details, office bearers, values: `src/content/site.ts`
- Edition history and milestones: `src/content/history.ts`
- 2020 results: `src/content/results2020.ts`
- Documents and albums: `src/content/downloads.json`, `src/content/gallery.json`, files in `public/docs` and `public/gallery`
- Legal and help pages: `src/pages/LegalPages.tsx` (change `UPDATED` when the wording changes); website support contact: `WEBSITE_SUPPORT` in `src/content/site.ts`
- Decorative artwork: put the original (e.g. `3.jpg`, `9.jpg`; names are listed in the script) in `assets-src/bg/` — not in `public/`, so it is not published — and run `node scripts/make-decor.mjs` (removes the background and writes the WebP copy to `public/images/decor/`)
- Link-preview picture (`public/images/og-image.jpg`, 1200×630): the artwork is `assets-src/og-art.png`; the name and subtitle are in `scripts/make-og.mjs`. Run `node scripts/make-og.mjs "<path to chrome.exe or msedge.exe>"` after changing either

## Design

All-white pages, Inter for text, Barlow Condensed only for hero titles and the wordmark. Buttons come from `btn()` / `ButtonLink` in
`src/components/ui.tsx` (primary blue, accent orange for registration, secondary white). Corner artwork is the `Decor` component.

Motion:
- Scroll animations work like AOS: add `data-aos="fade-up"` (or `fade-down`, `fade-left`, `fade-right`, `zoom-in`, `fade`) to any
  element, or wrap it in `<Reveal>`; `data-aos-delay="150"` adds a delay in ms. Items that come into view together are staggered
  automatically. Driven by one IntersectionObserver in `src/lib/aos.ts`; the looks are in `src/index.css`. Lazy images fade in once loaded.
- Smooth mouse-wheel scrolling is Lenis (`src/lib/smooth.ts`), loaded after the page is ready; touch scrolling stays native.
  Give any pop-up that scrolls on its own the `data-lenis-prevent` attribute.
- Everything is visible without JavaScript, and "reduce motion" in the device settings turns all of it off.

## Deploy (Vercel)

Import this folder as its own project (framework: Vite). Set `VITE_FORM_URL` (e.g. `https://register.centies.in`) and
`VITE_SITE_URL` (`https://www.centies.in`). Security headers, caching and clean URLs are in `vercel.json`.
