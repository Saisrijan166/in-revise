import type { Blueprint } from "@/lib/blueprint";
import { Mermaid } from "@/components/mdx/Mermaid";

/**
 * One connected system map of a tech: a single Mermaid flowchart showing how the
 * parts connect and how execution flows (startup + request lifecycle + branches).
 */
export function BlueprintMap({ bp }: { bp: Blueprint }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Colour key */}
      <div className="flex flex-wrap gap-2">
        {bp.legend.map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-2.5 py-1 text-[12.5px] font-semibold text-ink"
          >
            <span
              className="h-3 w-3 rounded-[3px]"
              style={{ background: item.color }}
              aria-hidden="true"
            />
            {item.label}
          </span>
        ))}
      </div>

      {/* The diagram: one connected flowchart, scrolls inside its own box */}
      <div className="overflow-x-auto rounded-2xl border border-line bg-surface p-2 sm:p-4">
        <Mermaid chart={bp.chart} alt={bp.alt} bare />
      </div>

      <p className="text-center text-xs text-ink-3">
        Solid arrows = execution flow · dotted = wiring and relationships · grouped 1&ndash;4,
        beginner to advanced. Baseline{" "}
        <span className="font-mono" style={{ color: "var(--accent-ink)" }}>
          {bp.baseline}
        </span>
        .
      </p>

      <details className="rounded-xl border border-line bg-surface">
        <summary className="flex min-h-11 cursor-pointer items-center px-4 text-sm font-semibold text-ink-3 hover:text-ink">
          Text version of this diagram
        </summary>
        <p className="border-t border-line px-4 py-3 text-sm leading-relaxed text-ink-2">
          {bp.alt}
        </p>
      </details>
    </div>
  );
}
