import { useSyncExternalStore } from "react";

// A shared one-minute clock. The server snapshot is null, so pre-rendered HTML and the first
// client render match exactly; the live countdown appears right after hydration.
const subscribe = (tick: () => void) => {
  const t = setInterval(tick, 30_000);
  return () => clearInterval(t);
};
const nowMinute = () => Math.floor(Date.now() / 60_000);
const serverNow = () => null;

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });

export function Countdown({ to, label, tone = "dark" }: { to: string; label: string; tone?: "dark" | "light" }) {
  const minute = useSyncExternalStore(subscribe, nowMinute, serverNow);
  const end = new Date(to).getTime();
  const left = minute === null ? null : Math.max(0, end - minute * 60_000);
  const days = left === null ? 0 : Math.floor(left / 86_400_000);
  const hours = left === null ? 0 : Math.floor((left % 86_400_000) / 3_600_000);
  const muted = tone === "dark" ? "text-white/70" : "text-muted";

  if (left === 0) return <p className={`text-sm font-semibold ${muted}`}>{label} closed on {fmt(to)}.</p>;
  return (
    <div className="flex flex-wrap items-center gap-3" role="timer" aria-live="off">
      {left !== null && (
        <span className="flex gap-1.5" aria-hidden>
          {[
            [days, "days"],
            [hours, "hrs"],
          ].map(([v, u]) => (
            <span key={u} className={`min-w-14 rounded-lg px-2.5 py-1.5 text-center ${tone === "dark" ? "bg-white/10 ring-1 ring-white/15" : "bg-royal-50"}`}>
              <span className="block font-display text-2xl font-extrabold leading-none tabular-nums">{v}</span>
              <span className={`text-[10.5px] font-semibold uppercase tracking-wider ${muted}`}>{u}</span>
            </span>
          ))}
        </span>
      )}
      <span className={`text-sm ${muted}`}>
        {label} closes on <b className={tone === "dark" ? "text-white" : "text-ink"}>{fmt(to)}</b>
        {left !== null && <span className="sr-only">, {days} days and {hours} hours left</span>}
      </span>
    </div>
  );
}
