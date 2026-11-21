import { useCallback, useState } from "react";
import { Link, useParams } from "react-router";
import { ALBUMS, ALBUM_COVER } from "../content/data";
import { Lightbox } from "../components/Lightbox";
import { Decor, Icon, PageHero, Reveal } from "../components/ui";
import { NotFoundPage } from "./NotFoundPage";

export function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Championship gallery"
        intro="Relive CENTIES — matches, ceremonies and champions."
        crumbs={[{ to: "/gallery", label: "Gallery" }]}
      />
      <section className="relative isolate overflow-clip">
        <Decor name="streaks" from="xl" className="-right-24 top-16 w-[220px]" />
        <div className="mx-auto max-w-6xl px-4 py-20">
          <ul className="grid gap-6 sm:grid-cols-2">
            {ALBUMS.map((a) => {
              const cover = a.photos[ALBUM_COVER[a.slug] ?? 0];
              const strip = a.photos.filter((p) => p !== cover).slice(0, 3);
              return (
                <Reveal as="li" key={a.slug}>
                  <Link to={`/gallery/${a.slug}`} className="group block overflow-hidden rounded-xl border border-line bg-white transition-shadow hover:shadow-[var(--shadow-card)]">
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                      <img src={cover.src} alt="" loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-105" />
                      <span className="absolute left-4 top-4 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                        <Icon name="photo" className="mr-1 inline size-3.5" />
                        {a.photos.length} photos
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 p-1">
                      {strip.map((p) => (
                        <img key={p.thumb} src={p.thumb} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover" />
                      ))}
                    </div>
                    <div className="flex items-center justify-between gap-4 px-5 pb-5 pt-3">
                      <div>
                        <p className="text-lg font-semibold tracking-tight text-ink">{a.title}</p>
                        <p className="text-[13.5px] text-muted">{a.venue}</p>
                      </div>
                      <Icon name="arrow" className="size-5 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-royal-700" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

export function AlbumPage() {
  const { album } = useParams();
  const a = ALBUMS.find((x) => x.slug === album);
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), [setOpen]);
  if (!a) return <NotFoundPage />;
  const others = ALBUMS.filter((x) => x.slug !== a.slug);

  return (
    <>
      <PageHero
        eyebrow={`${a.year} · Gallery`}
        title={a.title}
        intro={`${a.about} at ${a.venue}. ${a.photos.length} photos — tap any photo to view it full screen.`}
        crumbs={[
          { to: "/gallery", label: "Gallery" },
          { to: `/gallery/${a.slug}`, label: a.title },
        ]}
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <ul className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>li]:mb-3">
          {a.photos.map((p, i) => (
            <li key={p.src} className="break-inside-avoid" data-aos="fade-up">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group block w-full overflow-hidden rounded-lg bg-surface focus-visible:ring-4 focus-visible:ring-royal-200"
                aria-label={`Open photo ${i + 1} of ${a.photos.length}`}
              >
                <img
                  src={p.thumb}
                  alt={`${a.title}, photo ${i + 1}`}
                  width={p.w}
                  height={p.h}
                  loading={i < 8 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-auto w-full transition duration-500 group-hover:scale-[1.03]"
                />
              </button>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 text-xl font-semibold tracking-tight text-ink">More albums</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug} data-aos="fade-up">
              <Link to={`/gallery/${o.slug}`} className="group flex items-center gap-3 rounded-xl border border-line bg-white p-3 transition-colors hover:border-slate-300">
                <img src={o.photos[ALBUM_COVER[o.slug] ?? 0].thumb} alt="" loading="lazy" className="size-16 rounded-lg object-cover" />
                <span>
                  <span className="block font-semibold text-ink">{o.title}</span>
                  <span className="text-[13px] text-muted">{o.photos.length} photos</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {open !== null && <Lightbox photos={a.photos} index={open} title={a.title} onIndex={setOpen} onClose={close} />}
    </>
  );
}
