// Accessibility audit: runs axe-core (WCAG 2.2 A/AA) on every pre-rendered page in a headless Chromium browser.
// Usage: npm run build && npm run preview   (in another terminal)  then:
//        node scripts/audit-a11y.mjs "<path to chrome or msedge>" [http://localhost:4174]
import { spawn } from "node:child_process";
import { readFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [, , browser, base = "http://localhost:4174"] = process.argv;
if (!browser) throw new Error("pass the path to chrome.exe or msedge.exe");
const axe = readFileSync(new URL("../node_modules/axe-core/axe.min.js", import.meta.url), "utf8");
const sitemap = readFileSync(new URL("../dist/sitemap.xml", import.meta.url), "utf8");
const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);

const port = 9336;
const proc = spawn(browser, ["--headless=new", "--disable-gpu", `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "axe-"))}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
for (let i = 0; i < 40; i++) {
  await sleep(250);
  if (await fetch(`http://127.0.0.1:${port}/json/version`).then(() => true, () => false)) break;
}
const target = (await fetch(`http://127.0.0.1:${port}/json`).then((r) => r.json())).find((t) => t.type === "page");
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) pending.get(m.id)(m), pending.delete(m.id);
};
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result?.result?.value;

await send("Page.enable");
await send("Page.setBypassCSP", { enabled: true }); // lets the audit script run; the site itself keeps its strict CSP
let total = 0;
for (const width of [390, 1280]) {
  await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 });
  for (const p of paths) {
    await send("Page.navigate", { url: base + p });
    await sleep(1500);
    // Show scroll-revealed content so contrast is measured on the final state.
    // (animations are switched off first so nothing is measured half-faded)
    await evaluate("document.head.insertAdjacentHTML('beforeend', '<style>*,*::before,*::after{transition:none!important;animation:none!important}</style>'); document.querySelectorAll('[data-aos]').forEach(e => { e.setAttribute('data-aos-in', ''); e.setAttribute('data-aos-done', ''); }); document.querySelectorAll('img').forEach(e => { e.setAttribute('data-loaded', ''); e.setAttribute('data-img-done', ''); })");
    await sleep(700);
    await evaluate(axe);
    const res = await evaluate(`axe.run(document, { runOnly: { type: "tag", values: ["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa","best-practice"] } })
      .then(r => r.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 3).map(n => n.target.join(" ") + " :: " + (n.failureSummary || "").split("\\n").slice(1, 2).join("")) , count: v.nodes.length })))`);
    total += res?.length ?? 0;
    console.log(`[${width}] ${p}: ${res?.length ? res.length + " issue(s)" : "OK"}`);
    for (const v of res ?? []) console.log(`   - ${v.impact} ${v.id} (${v.count}): ${v.help}\n       ${v.nodes.join("\n       ")}`);
  }
}
ws.close();
proc.kill();
console.log(total ? `\n${total} accessibility issue(s) found` : "\nNo accessibility issues found");
process.exit(total ? 1 : 0);
