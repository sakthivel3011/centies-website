/**
 * Smooth (eased) scrolling with the mouse wheel and trackpad, using Lenis. Loaded after the page is ready, so it never
 * delays the first paint. Phones and tablets keep their own native touch scrolling, and visitors who switch on
 * "reduce motion" get normal scrolling (Lenis honours that setting).
 *
 * - Anchor links (#…) are left to the browser: they still scroll smoothly (index.css), stop below the sticky header
 *   (scroll-mt) and move keyboard focus, which the "Skip to content" link needs.
 * - Clicking a link to another page, or Back/Forward, stops any leftover glide so the new page starts in the right place.
 * - Pop-ups that scroll on their own (the phone menu, the photo viewer) carry `data-lenis-prevent`.
 */
let started = false;

export async function initSmoothScroll() {
  if (started || typeof window === "undefined") return;
  started = true;
  const { default: Lenis } = await import("lenis"); // its few CSS rules are in index.css
  const lenis = new Lenis({ autoRaf: true, lerp: 0.1, stopInertiaOnNavigate: true });
  window.addEventListener("popstate", () => {
    lenis.stop();
    requestAnimationFrame(() => lenis.start());
  });
}
