import { useEffect, useRef } from "react";
import type { Photo } from "../content/data";
import { Icon } from "./ui";

/** Full-screen photo viewer: arrow keys, Esc, swipe, and preloading of neighbouring photos. */
export function Lightbox({ photos, index, title, onIndex, onClose }: { photos: Photo[]; index: number; title: string; onIndex: (i: number) => void; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const startX = useRef<number | null>(null);
  const count = photos.length;
  const go = (d: number) => onIndex((index + d + count) % count);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      opener?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onIndex((index + 1) % count);
      else if (e.key === "ArrowLeft") onIndex((index - 1 + count) % count);
    };
    document.addEventListener("keydown", onKey);
    for (const d of [1, -1]) new Image().src = photos[(index + d + count) % count].src;
    return () => document.removeEventListener("keydown", onKey);
  }, [index, count, photos, onIndex, onClose]);

  const p = photos[index];
  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-black/95 text-white"
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — photo ${index + 1} of ${count}`}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
        <span className="truncate font-semibold">{title}</span>
        <span className="flex items-center gap-3">
          <span className="tabular-nums text-white/70">
            {index + 1} / {count}
          </span>
          <button ref={closeRef} type="button" onClick={onClose} className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Close">
            <Icon name="close" />
          </button>
        </span>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-6 sm:px-16">
        <img key={p.src} src={p.src} alt={`${title}, photo ${index + 1}`} width={p.w} height={p.h} className="max-h-full max-w-full animate-rise select-none object-contain" draggable={false} />
        <button type="button" onClick={() => go(-1)} className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:grid" aria-label="Previous photo">
          <Icon name="chevron" className="size-6 rotate-90" />
        </button>
        <button type="button" onClick={() => go(1)} className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:grid" aria-label="Next photo">
          <Icon name="chevron" className="size-6 -rotate-90" />
        </button>
      </div>
    </div>
  );
}
