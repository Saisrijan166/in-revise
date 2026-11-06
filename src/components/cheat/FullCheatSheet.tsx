import type { Deck } from "@/lib/content/load";
import { getCheatDoc } from "@/lib/cheatsheet";
import { highlightDoc, Blocks } from "@/lib/cheatsheet/render";
import { urls } from "@/lib/urls";
import { PageHeader } from "@/components/ui/Breadcrumbs";
import { IconFlame } from "@/components/ui/icons";
import { PrintButton } from "@/components/ui/PrintButton";

/**
 * Full reference-driven cheat sheet: the whole tech as one vertical document, read top to
 * bottom. Chapters, then each concept stacked one below another as an expandable section.
 * Content is generated from the owner's reference markdown (src/data/<slug>-cheatsheet.ts).
 */
export async function FullCheatSheet({ deck }: { deck: Deck }) {
  const doc = getCheatDoc(deck.slug)!;
  const code = await highlightDoc(doc);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-4 pb-16 sm:px-6 lg:px-8">
      <PageHeader
        crumbs={[
          { label: "Home", href: urls.home() },
          { label: deck.name, href: urls.overview(deck.slug) },
          { label: "Cheat sheet" },
        ]}
        title={`${deck.name} cheat sheet`}
        lead={doc.tagline}
      >
        <div className="mt-2 print:hidden">
          <PrintButton />
        </div>
      </PageHeader>

      {/* Contents */}
      <nav aria-label="Chapters" className="mb-8 flex flex-wrap gap-1.5 print:hidden">
        {doc.chapters.map((ch, i) => (
          <a
            key={ch.id}
            href={`#ch-${ch.id}`}
            className="rounded-full border border-line bg-surface px-2.5 py-1 text-[12.5px] font-semibold text-ink-2 hover:border-line-strong hover:text-ink"
          >
            <span className="mr-1 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
            {ch.title}
          </a>
        ))}
      </nav>

      <div className="flex flex-col gap-10">
        {doc.chapters.map((ch, i) => {
          const sections = doc.sections.filter((s) => s.chapter === ch.id);
          if (sections.length === 0) return null;
          return (
            <section key={ch.id} id={`ch-${ch.id}`} className="scroll-mt-20">
              <h2 className="mb-4 flex items-baseline gap-2.5 border-b border-line pb-2 font-display text-2xl font-extrabold text-ink">
                <span className="font-mono text-base text-accent-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {ch.title}
              </h2>
              <div className="flex flex-col gap-4">
                {sections.map((s) => (
                  <details
                    key={s.id}
                    id={`sec-${s.id}`}
                    open
                    data-cs
                    className="cs-section scroll-mt-20 rounded-2xl border border-line bg-surface"
                  >
                    <summary className="flex cursor-pointer list-none items-center gap-2 rounded-2xl px-4 py-3 font-display text-lg font-bold text-ink select-none hover:bg-surface-2">
                      <span className="flex-1">{s.title}</span>
                      {s.stars > 0 && (
                        <span
                          className="flex items-center text-accent"
                          aria-label={`${s.stars} star importance`}
                        >
                          {Array.from({ length: Math.min(s.stars, 3) }).map((_, k) => (
                            <IconFlame key={k} size={14} />
                          ))}
                        </span>
                      )}
                    </summary>
                    <div className="prose-card cheatdoc border-t border-line px-4 py-3">
                      <Blocks nodes={s.nodes} code={code} />
                    </div>
                  </details>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
