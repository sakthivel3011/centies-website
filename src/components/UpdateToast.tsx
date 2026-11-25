import { useEffect, useState } from "react";
import { justUpdated, startUpdateChecks } from "../lib/update";

/**
 * Starts the "new version" checks (src/lib/update.ts) and, right after an automatic update, shows a small message in
 * the top-right corner for 3 seconds. Renders nothing on the server, so pre-rendered pages hydrate cleanly.
 */
export function UpdateToast() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    startUpdateChecks();
    if (!justUpdated()) return;
    // Shown once the page has settled, for 3 seconds.
    const on = window.setTimeout(() => setShow(true), 250);
    const off = window.setTimeout(() => setShow(false), 3250);
    return () => {
      window.clearTimeout(on);
      window.clearTimeout(off);
    };
  }, []);
  if (!show) return null;
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed right-4 top-4 z-[100] sm:right-6 sm:top-6">
      <div className="pointer-events-auto flex animate-[toast-in_0.3s_ease-out] items-center gap-2.5 rounded-xl border border-ok/30 bg-white py-2.5 pl-3 pr-2 text-[13.5px] text-ink shadow-lg">
        <svg viewBox="0 0 20 20" className="size-4 shrink-0 text-ok" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 10.5 8 14l8-8" />
        </svg>
        <span className="font-medium">Website updated to the latest version</span>
        <button type="button" onClick={() => setShow(false)} aria-label="Close" className="px-1 text-muted transition-colors hover:text-ink">
          <svg viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
            <path d="M5 5l10 10M15 5 5 15" />
          </svg>
        </button>
      </div>
    </div>
  );
}
