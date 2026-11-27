/**
 * Segmented switch (Men / Women, years): a dark pill slides under the chosen option. Same look as before, for any number
 * of options.
 */
export function Switch<T extends string | number>({ label, options, value, onChange, className = "" }: { label: string; options: { key: T; label: string }[]; value: T; onChange: (v: T) => void; className?: string }) {
  const n = options.length;
  const i = Math.max(0, options.findIndex((o) => o.key === value));
  return (
    <div role="tablist" aria-label={label} className={`relative inline-grid gap-1 rounded-lg bg-surface p-1 ring-1 ring-inset ring-line ${className}`} style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
      <span
        aria-hidden
        className="absolute bottom-1 left-1 top-1 rounded-md bg-royal-900 shadow-[var(--shadow-xs)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ width: `calc((100% - 8px - ${(n - 1) * 4}px) / ${n})`, transform: `translateX(calc(${i} * (100% + 4px)))` }}
      />
      {options.map((o) => (
        <button
          key={o.key}
          role="tab"
          type="button"
          aria-selected={o.key === value}
          onClick={() => onChange(o.key)}
          className={`relative h-8 whitespace-nowrap rounded-md px-4 text-[13px] font-semibold transition-colors duration-300 sm:px-5 ${o.key === value ? "text-white" : "text-muted hover:text-ink"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
