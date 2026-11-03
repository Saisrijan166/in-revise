import type { SyntaxSheet } from "@/lib/syntax";

function anchor(title: string): string {
  return (
    "g-" +
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

/** A daily-use syntax reference: jump chips, then grouped (syntax, does, example) tables. */
export function SyntaxSheet({ sheet }: { sheet: SyntaxSheet }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Jump-to chips */}
      <nav aria-label="Categories" className="flex flex-wrap gap-1.5">
        {sheet.groups.map((g) => (
          <a
            key={g.title}
            href={`#${anchor(g.title)}`}
            className="rounded-full border border-line bg-surface px-2.5 py-1 text-[12.5px] font-semibold text-ink-2 hover:border-line-strong hover:text-ink"
          >
            {g.title}
          </a>
        ))}
      </nav>

      {sheet.groups.map((g) => (
        <section key={g.title} id={anchor(g.title)} className="scroll-mt-24">
          <h2 className="mb-2 font-display text-xl font-extrabold text-ink">{g.title}</h2>

          <div className="overflow-hidden rounded-xl border border-line">
            <div className="hidden grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.5fr)] gap-x-4 bg-surface-2 px-3 py-2 text-[11px] font-semibold tracking-wide text-ink-3 uppercase sm:grid">
              <span>Syntax</span>
              <span>Does</span>
              <span>Example</span>
            </div>
            {g.rows.map((r, i) => (
              <div
                key={r.syntax + i}
                className="grid grid-cols-1 gap-x-4 gap-y-1 border-t border-line px-3 py-2.5 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.5fr)]"
              >
                <code className="block min-w-0 overflow-x-auto font-mono text-[13px] font-semibold whitespace-pre text-accent-ink">
                  {r.syntax}
                </code>
                <span className="text-sm text-ink-2">{r.what}</span>
                <code className="block min-w-0 overflow-x-auto font-mono text-[13px] whitespace-pre text-ink">
                  {r.example}
                </code>
              </div>
            ))}
          </div>

          {g.combos?.map((c, i) => (
            <figure key={i} className="mt-3">
              {c.label && (
                <figcaption className="mb-1 text-sm font-medium text-ink-2">{c.label}</figcaption>
              )}
              <pre className="overflow-x-auto rounded-xl border border-line bg-surface-2 p-3 text-[13px] leading-relaxed">
                <code className="font-mono text-ink">{c.code}</code>
              </pre>
            </figure>
          ))}
        </section>
      ))}

      <p className="text-center text-xs text-ink-3">
        Daily-use syntax for quick revision. Baseline{" "}
        <span className="font-mono" style={{ color: "var(--accent-ink)" }}>
          {sheet.baseline}
        </span>
        .
      </p>
    </div>
  );
}
