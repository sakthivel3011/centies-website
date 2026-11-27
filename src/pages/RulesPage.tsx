import { GENERAL_RULES as RULES, RULES_CONTACT, RULES_DOC } from "../content/rules";
import { btn, Decor, Icon, PageHero, Reveal, SectionHead } from "../components/ui";

export function RulesPage() {
  return (
    <>
      <PageHero
        eyebrow="Championship"
        title="Rules & regulations"
        intro="Mandatory guidelines for all participating institutions and athletes."
        crumbs={[
          { to: "/championship", label: "Championship" },
          { to: "/championship/rules", label: "Rules" },
        ]}
      />
      <section className="relative isolate overflow-clip">
        <Decor name="fan" from="xl" className="-right-24 bottom-10 w-[260px]" />
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
            <div>
              <SectionHead eyebrow={`${RULES.length} rules`} title="General rules" />
              <ol className="mt-8 border-t border-line">
                {RULES.map((r, i) => (
                  <Reveal as="li" key={i} className="flex gap-5 border-b border-line py-5">
                    <span className="w-6 shrink-0 pt-px text-[15px] font-semibold text-royal-600 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[15.5px] leading-relaxed text-ink/85">{r}</span>
                  </Reveal>
                ))}
              </ol>
              <p className="mt-5 text-[14.5px] text-muted">{RULES_CONTACT}</p>
            </div>
            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start" data-aos="fade-left">
              <div className="rounded-xl border border-line border-l-2 border-l-royal-600 bg-white p-5">
                <p className="font-semibold text-ink">Official notice</p>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">“In all the above cases, the Executive Committee will be the final deciding authority.”</p>
              </div>
              <div className="rounded-xl border border-line bg-white p-5">
                <p className="font-semibold text-ink">Official rules document</p>
                <p className="mt-1 text-[14px] text-muted">{RULES_DOC.title}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href={RULES_DOC.pdf} download className={btn("primary", "sm")}>
                    <Icon name="download" className="size-4" /> Download PDF · {RULES_DOC.pdfSize}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
