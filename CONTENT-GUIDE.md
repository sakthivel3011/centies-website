# CENTIES website — content guide

How to keep the site up to date. Each change is: **edit → `npm run build` → publish**. Publishing happens automatically when the
change is pushed to GitHub (Vercel rebuilds the site), or you can upload `dist/` to any static host.

> One-time setup on a computer: install Node.js 20 or newer, open a terminal in the `website` folder and run `npm install`.
> To preview your change before publishing: `npm run dev` and open http://localhost:5174

---

## 1. Announce dates and the registration deadline

Open `src/content/event.ts` and fill in the dates (keep the quotes and the `+05:30`):

```ts
registrationDeadline: "2026-12-31T23:59:00+05:30",
startDate: "2027-01-20T09:00:00+05:30",
endDate: "2027-02-28T18:00:00+05:30",
```

The home page and the Championship page then show a live countdown. Search engines also get the event dates.
To hide them again, set the value back to `null`.

## 2. Add a photo album

Put the photos (JPG/PNG straight from the camera is fine) in one folder, then run:

```bash
npm run add-album -- "D:\Photos\CENTIES 2025" --slug centies-2025 --title "XIV CENTIES 2025" --year 2025 --edition 14 --venue "Kongu Engineering College, Perundurai" --about "Matches and prize distribution"
```

The script makes web-sized copies (1600px and 640px WebP) and **removes GPS location and camera data**. The album appears on
`/gallery/centies-2025`. Photos are shown in file-name order. To choose the cover photo, add the slug and photo number
(starting at 0) to `ALBUM_COVER` in `src/content/data.ts`.

## 3. Add a document (results, forms, fixtures, sponsors…)

```bash
npm run add-doc -- "D:\Docs\Results 2025.pdf" --category results --title "14th CENTIES Championship 2025 — results" --year 2025
```

Categories: `results`, `organizers`, `sponsors`, `forms`, `score-sheets`, `knockout`, `league`.
Use `--note "..."` for a short description, and `--name` to choose the file name in the link.
To **remove** a document, delete its entry in `src/content/downloads.json` and the file in `public/docs/`.

## 4. Office bearers, phone, email, address

All in `src/content/site.ts`:

- `ORG`: email, phone, WhatsApp link, address, office hours
- `SECRETARY`: championship correspondence address
- `OFFICE_BEARERS`: name, role and institution code (codes are explained in `INSTITUTIONS`)

## 5. A new championship year

1. `src/content/history.ts`: add the edition to `EDITIONS` (year, hosts, number of colleges, a short note). Optionally add a
   milestone to `MILESTONES`.
2. Results PDF: `npm run add-doc` with `--category results --year 2025`.
3. To show the new champions as a table (like 2020), copy `src/content/results2020.ts` to `results2025.ts`, fill it in, and
   update the imports in `src/pages/ResultsPage.tsx` and `src/pages/HomePage.tsx`.
4. Update `src/content/event.ts` (edition, year, name, dates).

## 6. Before publishing — checks

```bash
npm test          # every document, photo and data entry exists
npm run build     # must end with "prerendered … pages"
```

Optional: `npm run preview`, then in a second terminal
`npm run audit:a11y -- "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"` runs the accessibility audit on every page.

## Settings (Vercel → Project → Environment Variables)

| Name | Value |
|---|---|
| `VITE_FORM_URL` | Address of the registration site, e.g. `https://register.centies.in` |
| `VITE_SITE_URL` | `https://www.centies.in` |
