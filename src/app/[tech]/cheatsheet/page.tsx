import type { Metadata } from "next";
import Link from "next/link";
import { getDeck, getDecks } from "@/lib/content";
import type { Deck, TreeNode } from "@/lib/content/load";
import { nodeHref } from "@/lib/content/nav";
import { renderInline } from "@/lib/inline";
import { urls } from "@/lib/urls";
import { topicColor } from "@/lib/ui";
import { KeyPoints } from "@/components/card/Blocks";
import { CompareGist } from "@/components/compare/CompareView";
import { PageHeader } from "@/components/ui/Breadcrumbs";
import { IconCheck, IconClose } from "@/components/ui/icons";
import { PrintButton } from "@/components/ui/PrintButton";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().map((d) => ({ tech: d.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[tech]/cheatsheet">): Promise<Metadata> {
  const { tech } = await params;
  return {
    title: `Cheat sheet (${getDeck(tech).name})`,
    description: "The whole tech on one page.",
  };
}

function Row({ deck, tech, n }: { deck: Deck; tech: string; n: TreeNode }) {
  const card = n.cardId ? deck.cardById.get(n.cardId) : undefined;
  return (
    <li className="print-card py-4 first:pt-1">
      <div className="grid gap-x-6 gap-y-2 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
        <div>
          <Link
            href={nodeHref(tech, n)}
            className={
              card
                ? "font-display text-lg font-extrabold text-ink hover:text-accent-ink"
                : "font-bold text-ink hover:text-accent-ink"
            }
          >
            {n.label}
          </Link>
          {n.children.length > 0 && (
            <p className="mt-1 text-sm text-ink-3">
              {n.children.map((c, i) => (
                <span key={c.id}>
                  {i > 0 && <span aria-hidden="true"> · </span>}
                  <Link
                    href={nodeHref(tech, c)}
                    className={c.cardId ? "font-bold text-ink-2 hover:text-ink" : "hover:text-ink"}
                  >
                    {c.label}
                  </Link>
                </span>
              ))}
            </p>
          )}
        </div>
        <div className="min-w-0">
          <p className={card ? "font-semibold text-ink" : "text-ink-2"}>
            {card?.meta.hook ?? n.note}
          </p>
          {card && (
            <div className="mt-2.5">
              <KeyPoints points={card.meta.points} compact />
            </div>
          )}
          {card?.meta.trap && (
            <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.95rem]">
              <span className="inline-flex items-center gap-1 font-bold text-bad">
                <IconClose size={14} /> {renderInline(card.meta.trap.wrong)}
              </span>
              <span className="inline-flex items-center gap-1 text-good">
                <IconCheck size={14} />
                <span className="text-ink">{renderInline(card.meta.trap.right)}</span>
              </span>
            </p>
          )}
        </div>
      </div>
      {/* Concepts nested deeper (e.g. a strategy inside a group) get their own row too. */}
      {!card && n.children.some((c) => c.cardId) && (
        <ul className="mt-3 border-l-2 border-line pl-4">
          {n.children
            .filter((c) => c.cardId)
            .map((c) => (
              <Row key={c.id} deck={deck} tech={tech} n={c} />
            ))}
        </ul>
      )}
    </li>
  );
}

/**
 * The whole tech on one continuous page (CLAUDE.md 5.2 #6): every concept as one line,
 * its types, its key points and its trap. Built to be scanned, not read.
 */
export default async function CheatSheetPage({ params }: PageProps<"/[tech]/cheatsheet">) {
  const { tech } = await params;
  const deck = getDeck(tech);

  return (
    <div className="mx-auto max-w-5xl px-4 pt-4 pb-12 sm:px-6 lg:px-10 print:max-w-none print:p-0">
      <PageHeader
        crumbs={[
          { label: "Home", href: urls.home() },
          { label: deck.name, href: urls.overview(tech) },
          { label: "Cheat sheet" },
        ]}
        eyebrow={`${deck.name} · all on one page`}
        title="Cheat sheet"
        lead="Every concept in one line, its types, what to remember, and the trap to avoid. Scroll top to bottom once before an interview."
      >
        <div className="no-print mt-4 flex flex-wrap items-center gap-2">
          <PrintButton />
          {deck.tree.map(({ topic }) => (
            <a
              key={topic.id}
              href={`#cs-${topic.id}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-sm font-semibold text-ink-2 hover:border-accent hover:text-ink"
            >
              <span
                aria-hidden="true"
                className="h-2 w-5 rounded-full"
                style={{ background: topicColor(topic.index) }}
              />
              {topic.title}
            </a>
          ))}
        </div>
      </PageHeader>

      <div className="flex flex-col gap-10">
        {deck.tree.map(({ topic, nodes }) => {
          const comps = deck.comparisons.filter((c) =>
            c.compares.some((id) => deck.nodeById.get(id)?.topicId === topic.id),
          );
          return (
            <section
              key={topic.id}
              id={`cs-${topic.id}`}
              aria-labelledby={`csh-${topic.id}`}
              className="scroll-mt-20"
            >
              <h2
                id={`csh-${topic.id}`}
                className="mb-1 flex items-center gap-2.5 border-b-4 pb-2 text-2xl font-extrabold"
                style={{ borderColor: topicColor(topic.index) }}
              >
                {topic.title}
              </h2>
              <ul className="divide-y divide-line">
                {nodes.map((n) => (
                  <Row key={n.id} deck={deck} tech={tech} n={n} />
                ))}
              </ul>
              {comps.length > 0 && (
                <div className="print-card mt-3 flex flex-col gap-3 rounded-2xl bg-surface-2/60 p-4">
                  {comps.map((c) => (
                    <div key={c.id}>
                      <p className="mb-1.5 font-bold text-ink">
                        <Link href={urls.compare(tech, c.id)} className="hover:text-accent-ink">
                          {c.title}
                        </Link>
                      </p>
                      <CompareGist deck={deck} c={c} size="sm" />
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
      <p className="mt-8 hidden text-xs text-ink-3 print:block">
        inrevise · {deck.name} cheat sheet
      </p>
    </div>
  );
}
