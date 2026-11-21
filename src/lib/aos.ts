/**
 * Scroll animations in the style of AOS ("animate on scroll"), and smooth image loading, for the whole site.
 *
 * - Any element with `data-aos="fade-up"` (or fade-down, fade-left, fade-right, zoom-in, fade) glides in the first time
 *   it scrolls into view. Items that come into view together appear one after another (a short stagger), and
 *   `data-aos-delay="150"` adds an extra delay in ms. The looks are defined in index.css.
 * - Lazy images fade in once they have loaded instead of popping in.
 *
 * Unlike the AOS library (which listens to every scroll event), one shared IntersectionObserver does the watching, and
 * only opacity and transform are animated, so scrolling stays smooth. A MutationObserver picks up the next page's content.
 * Content already on screen when the site starts is shown as is (no flash). Without JavaScript, or with "reduce motion"
 * switched on, everything is simply visible. State lives in data-* attributes React never sets, so re-renders keep it.
 */
const STAGGER_MS = 80;
const MAX_STAGGER_MS = 480;
const DURATION_MS = 700; // the transition length in index.css

let started = false;

export function initAos() {
  if (started || typeof window === "undefined") return;
  started = true;

  const motion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window;

  // Shown straight away, without animating
  const showNow = (el: Element) => {
    el.setAttribute("data-aos-in", "");
    el.setAttribute("data-aos-done", "");
  };
  // Animated in; once finished, the element's own hover transitions apply again
  const animateIn = (el: HTMLElement, delay: number) => {
    el.style.transitionDelay = delay ? `${delay}ms` : "";
    el.setAttribute("data-aos-in", "");
    window.setTimeout(() => {
      el.style.transitionDelay = "";
      el.setAttribute("data-aos-done", "");
    }, delay + DURATION_MS + 100);
  };

  const io = motion
    ? new IntersectionObserver(
        (entries) => {
          const shown = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
          shown.forEach((e, i) => {
            const el = e.target as HTMLElement;
            io!.unobserve(el);
            animateIn(el, (Number(el.dataset.aosDelay) || 0) + Math.min(i * STAGGER_MS, MAX_STAGGER_MS));
          });
        },
        { rootMargin: "0px 0px -8% 0px" },
      )
    : null;
  const watch = (el: Element) => {
    if (el.hasAttribute("data-aos-in")) return;
    if (io) io.observe(el);
    else showNow(el);
  };

  // Images: visible once loaded (fading in when they load later; at once when already loaded or failed)
  const imageLoaded = (img: HTMLImageElement, fade: boolean) => {
    if (img.hasAttribute("data-loaded")) return;
    img.setAttribute("data-loaded", "");
    if (fade) window.setTimeout(() => img.setAttribute("data-img-done", ""), 700);
    else img.setAttribute("data-img-done", "");
  };
  const onImage = (e: Event) => {
    if (e.target instanceof HTMLImageElement) imageLoaded(e.target, e.type === "load");
  };
  document.addEventListener("load", onImage, true);
  document.addEventListener("error", onImage, true);
  const sweepImages = (scope: ParentNode) => scope.querySelectorAll<HTMLImageElement>("img:not([data-loaded])").forEach((img) => img.complete && imageLoaded(img, false));

  // What is on screen now stays as it is; everything further down waits to glide in. Read all positions first, then write.
  sweepImages(document);
  const all = [...document.querySelectorAll("[data-aos]")];
  const onScreen = all.map((el) => {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  });
  all.forEach((el, i) => (onScreen[i] ? showNow(el) : watch(el)));
  // The hidden "before" looks in index.css only apply from here on
  document.documentElement.classList.add("js");

  // New content (another page, a re-mounted list): watch its animated elements and settle images already loaded
  new MutationObserver((records) => {
    for (const r of records)
      for (const node of r.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches("[data-aos]")) watch(node);
        node.querySelectorAll("[data-aos]").forEach(watch);
        if (node instanceof HTMLImageElement && node.complete) imageLoaded(node, false);
        sweepImages(node);
      }
  }).observe(document.body, { childList: true, subtree: true });
}
