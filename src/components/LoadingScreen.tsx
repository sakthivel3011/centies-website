/**
 * Simple loading page shown while the next page's code downloads: a small blue spinning circle in the middle of the screen.
 * It fades in after a short delay, so fast page changes never flash it; the header stays visible above it.
 */
export function LoadingScreen() {
  return (
    <div role="status" aria-live="polite" className="fixed inset-0 z-30 grid place-items-center bg-white [animation:fade-in_0.2s_0.25s_both]">
      <span className="size-9 animate-spin rounded-full border-[3px] border-royal-100 border-t-royal-700" aria-hidden />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
