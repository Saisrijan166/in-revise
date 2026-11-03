import type { Blueprint, BpNode, BpTone } from "@/lib/blueprint";

/* Tier tones map to the site's theme-aware topic tokens (AA in light and dark). */
const TONE: Record<BpTone, string> = {
  fundamentals: "var(--t6)", // green
  core: "var(--t1)", // blue
  advanced: "var(--t7)", // violet
};
const FLOW = "var(--t4)"; // amber

const soft = (c: string) => `color-mix(in oklab, ${c} 15%, var(--surface))`;
const tint = (c: string) => `color-mix(in oklab, ${c} 10%, var(--surface))`;
const ink = (c: string) => `color-mix(in oklab, ${c} 60%, var(--ink))`;

function Node({ node, color }: { node: BpNode; color: string }) {
  if (node.wide) {
    return (
      <div
        className="col-span-full rounded-xl border border-line p-3"
        style={{ background: tint(color), borderLeft: `4px solid ${color}` }}
      >
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <h4 className="font-display text-sm font-bold text-ink">{node.title}</h4>
          {node.tag && (
            <span className="font-mono text-[11px]" style={{ color: ink(color) }}>
              {node.tag}
            </span>
          )}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {node.parts?.map((part, i) => (
            <span key={part} className="contents">
              {i > 0 && (
                <span className="font-mono text-sm font-bold" style={{ color: ink(color) }}>
                  {node.sep}
                </span>
              )}
              <span className="rounded-lg border border-line bg-surface px-2.5 py-1 font-mono text-[11.5px] font-semibold text-ink">
                {part}
              </span>
            </span>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div
      className="min-w-0 rounded-xl border border-line bg-surface p-3"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="flex flex-wrap items-baseline gap-x-2">
        <h4 className="font-display text-[13.5px] font-bold text-ink">{node.title}</h4>
        {node.tag && (
          <span
            className="rounded px-1.5 py-px font-mono text-[10px] font-medium"
            style={{ background: soft(color), color: ink(color) }}
          >
            {node.tag}
          </span>
        )}
      </div>
      {node.chips && node.chips.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {node.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-md px-1.5 py-0.5 text-[11.5px] font-medium text-ink-2"
              style={{ background: soft(color) }}
            >
              {chip}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Connector({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 py-2 text-ink-3" aria-hidden="true">
      <span className="font-mono text-[10.5px] tracking-[0.1em] uppercase">{label}</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 4v15M6 13l6 6 6-6" />
      </svg>
    </div>
  );
}

/** One connected, color-coded map of a tech: pillars → 3 tiers → the two execution flows. */
export function BlueprintMap({ bp }: { bp: Blueprint }) {
  return (
    <div className="flex flex-col">
      {/* Legend */}
      <div className="flex flex-wrap gap-2">
        {[
          ["Fundamentals", TONE.fundamentals],
          ["Core Concepts", TONE.core],
          ["Advanced", TONE.advanced],
          ["Execution Flow", FLOW],
        ].map(([label, c]) => (
          <span
            key={label}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-2.5 py-1 text-[12.5px] font-semibold text-ink"
          >
            <span
              className="h-2.5 w-2.5 rounded-[3px]"
              style={{ background: c }}
              aria-hidden="true"
            />
            {label}
          </span>
        ))}
      </div>

      {/* Pillars */}
      <p className="mt-7 mb-3 font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase">
        {bp.pillarsLabel}
      </p>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        {bp.pillars.map((p) => (
          <div
            key={p.title}
            className="min-w-0 rounded-xl border border-line bg-surface p-3"
            style={{ borderTop: "3px solid var(--accent)" }}
          >
            <h3 className="font-display text-sm font-bold text-ink">{p.title}</h3>
            <p className="mt-0.5 text-xs text-ink-2">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Tiers */}
      <p className="mt-7 mb-1 font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase">
        The learning path
      </p>
      {bp.tiers.map((tier, ti) => {
        const color = TONE[tier.tone];
        return (
          <div key={tier.num}>
            <section className="mt-2 overflow-hidden rounded-2xl border border-line">
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ background: soft(color) }}
              >
                <span
                  className="font-mono text-xl font-bold"
                  style={{ color: ink(color) }}
                  aria-hidden="true"
                >
                  {tier.num}
                </span>
                <span
                  className="h-9 w-1 rounded-full"
                  style={{ background: color }}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <h2 className="font-display text-lg font-extrabold text-ink sm:text-xl">
                    {tier.title}
                  </h2>
                  <p className="text-[12.5px] text-ink-2">{tier.sub}</p>
                </div>
              </div>
              <div
                className="grid gap-2.5 p-3.5"
                style={{
                  background: "var(--surface-2)",
                  gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
                }}
              >
                {tier.nodes.map((n) => (
                  <Node key={n.title} node={n} color={color} />
                ))}
              </div>
            </section>
            {ti < bp.tiers.length - 1 && <Connector label={ti === 0 ? "builds on" : "scale up"} />}
          </div>
        );
      })}

      {/* Flows */}
      <p className="mt-8 mb-1 font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase">
        How it runs · the two flows to remember
      </p>
      <div className="flex flex-col gap-3">
        {bp.flows.map((flow) => (
          <div
            key={flow.title}
            className="rounded-xl border border-line bg-surface p-3.5"
            style={{ borderTop: `3px solid ${FLOW}` }}
          >
            <h3 className="flex flex-wrap items-center gap-2 font-display text-[15px] font-bold text-ink">
              <span
                className="rounded-md px-1.5 py-0.5 font-mono text-[11px] font-semibold"
                style={{ background: soft(FLOW), color: ink(FLOW) }}
              >
                {flow.label}
              </span>
              {flow.title}
            </h3>
            <p className="mt-0.5 mb-2.5 text-xs text-ink-2">{flow.caption}</p>
            <ol className="flex flex-wrap items-stretch gap-1.5">
              {flow.steps.map((step, i) => (
                <li key={step.main} className="contents">
                  {i > 0 && (
                    <span
                      className="self-center text-[15px] font-bold max-[640px]:rotate-90"
                      style={{ color: FLOW }}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                  <div
                    className="flex min-w-0 flex-1 flex-col justify-center rounded-lg px-2.5 py-2 text-center text-xs font-semibold max-[640px]:basis-full"
                    style={{ background: soft(FLOW), color: ink(FLOW) }}
                  >
                    {step.main}
                    {step.sub && (
                      <span className="mt-px block font-mono text-[10px] font-medium opacity-80">
                        {step.sub}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <p className="mt-7 text-center text-xs text-ink-3">
        Fundamentals → Core → Advanced · one picture to revise at a glance. Baseline{" "}
        <span className="font-mono" style={{ color: "var(--accent-ink)" }}>
          {bp.baseline}
        </span>
        .
      </p>
    </div>
  );
}
