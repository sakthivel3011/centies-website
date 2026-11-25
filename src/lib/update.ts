/**
 * Keeps an open page on the latest deployed version, without the visitor having to refresh:
 *  - checks /version.json now and then (every 2 minutes while the tab is open, and when it comes back to the tab or online);
 *  - once a newer version is out, the next click to another page opens it fresh (a full load) instead of in-page, so it
 *    comes from the new version — no blank page from files the new deploy has removed;
 *  - a tab in the background is quietly reloaded straight away;
 *  - after such an update, "Website updated" shows briefly in the top-right corner (UpdateToast).
 */

declare const __BUILD_ID__: string;

const UPDATED_FLAG = "centies:updated";
const CHECK_EVERY_MS = 2 * 60 * 1000;

let newer = false;
let started = false;
let lastCheck = 0;

/** True once a newer version than this page has been deployed. */
export const updateReady = () => newer;

async function check() {
  if (newer || !navigator.onLine) return;
  lastCheck = Date.now();
  try {
    const res = await fetch("/version.json", { cache: "no-store" });
    if (!res.ok) return;
    const { id } = (await res.json()) as { id?: string };
    if (id && id !== __BUILD_ID__) {
      newer = true;
      document.documentElement.dataset.updateReady = id; // visible in dev tools: a newer version is waiting
      if (document.visibilityState === "hidden") reloadWhileHidden();
    }
  } catch {
    /* offline or a hiccup: try again later */
  }
}

/** Loads `url` fresh from the server (the new version), and remembers to say so after loading. */
export function reloadTo(url: string) {
  try {
    sessionStorage.setItem(UPDATED_FLAG, "1");
  } catch {
    /* private mode: just no message */
  }
  if (url === window.location.href) window.location.reload();
  else window.location.assign(url);
}

/**
 * Reloads a tab that is in the background once it has stayed hidden for a few seconds. (Chrome also reports a page as
 * hidden while it is leaving for the next page; that page is gone before the timer runs, so it never gets in the way.)
 */
let hiddenTimer = 0;
function reloadWhileHidden() {
  window.clearTimeout(hiddenTimer);
  hiddenTimer = window.setTimeout(() => {
    if (document.visibilityState === "hidden") reloadTo(window.location.href);
  }, 5000);
}

/** True (once) when this page load came from an automatic update. */
export function justUpdated() {
  try {
    if (sessionStorage.getItem(UPDATED_FLAG) !== "1") return false;
    sessionStorage.removeItem(UPDATED_FLAG);
    return true;
  } catch {
    return false;
  }
}

/** Where the page is going (set while a link is being opened), for the fallback below. */
let goingTo: string | null = null;
export const setGoingTo = (url: string | null) => {
  goingTo = url;
};

export function startUpdateChecks() {
  if (started || import.meta.env.DEV) return;
  started = true;
  window.setTimeout(check, 15_000);
  window.setInterval(() => document.visibilityState === "visible" && check(), CHECK_EVERY_MS);
  const soon = () => Date.now() - lastCheck > 20_000 && check();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      window.clearTimeout(hiddenTimer);
      soon();
    } else if (newer) reloadWhileHidden(); // left the tab: update while nobody is looking
  });
  window.addEventListener("focus", soon);
  window.addEventListener("online", soon);
  // Newer version out: a click on a link to another page of this site becomes a normal full page load. This runs before
  // the router sees the click (capture phase on document), so the browser simply follows the link.
  document.addEventListener(
    "click",
    (e) => {
      if (!newer || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || (url.pathname === window.location.pathname && url.search === window.location.search)) return;
      e.stopPropagation();
      try {
        sessionStorage.setItem(UPDATED_FLAG, "1");
      } catch {
        /* no message then */
      }
    },
    true,
  );
  // A page's code file is gone (a new version was deployed meanwhile): open that page fresh instead of failing.
  window.addEventListener("vite:preloadError", (e) => {
    e.preventDefault();
    reloadTo(goingTo ?? window.location.href);
  });
}
