import type { Metadata } from "next";
import Link from "next/link";
import { getDeck, getDecks } from "@/lib/content";
import type { Deck, TreeNode } from "@/lib/content/load";
import { nodeHref } from "@/lib/content/nav";
import { urls } from "@/lib/urls";
import { cx, formatDate, topicColor } from "@/lib/ui";
import { PageHeader } from "@/components/ui/Breadcrumbs";
import { IconLink, IconMap } from "@/components/ui/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().map((d) => ({ tech: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[tech]/tree">): Promise<Metadata> {
  const { tech } = await params;
  return {
    title: `Tree (${getDeck(tech).name})`,
    description: "Every concept, type and subtype in one tree.",
  };
}

function Branch({
  deck,
  nodes,
  color,
  depth,
}: {
  deck: Deck;
  nodes: TreeNode[];
  color: string;
  depth: number;
}) {
  return (
    <ul
      className={cx("flex flex-col", depth > 0 && "mt-1 ml-[11px] border-l-2 pl-4")}
      style={
        depth > 0 ? { borderColor: `color-mix(in oklab, ${color} 45%, var(--line))` } : undefined
      }
    >
      {nodes.map((n) => {
        const card = n.cardId ? deck.cardById.get(n.cardId) : undefined;
        return (
          <li
            key={n.id}
            id={`node-${n.id}`}
            className="relative scroll-mt-24 py-1.5 target:rounded-lg target:bg-accent-soft"
          >
            {depth > 0 && (
              <span
                aria-hidden="true"
                className="absolute top-[1.15rem] -left-4 h-[2px] w-3"
                style={{ background: `color-mix(in oklab, ${color} 45%, var(--line))` }}
              />
            )}
            <div className="flex flex-wrap items-baseline gap-x-2">
              {card && (
                <span
                  aria-hidden="true"
                  className="relative top-[1px] inline-block h-3 w-3 flex-none rounded-full border-[3px]"
                  style={{ borderColor: color }}
                />
              )}
              <Link
                href={nodeHref(deck.slug, n)}
                className={
                  card
                    ? "inline-flex min-h-10 items-center font-display text-lg font-extrabold text-ink hover:text-accent-ink"
                    : "inline-flex min-h-10 min-w-11 items-center font-bold text-ink hover:text-accent-ink"
                }
              >
                {n.label}
              </Link>
              {(card?.meta.hook ?? n.note) && (
                <span className="text-ink-2">{card ? card.meta.hook : n.note}</span>
              )}
            </div>
            {n.children.length > 0 && (
              <Branch deck={deck} nodes={n.children} color={color} depth={depth + 1} />
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** The complete hierarchy of the tech: topic → concept → types → subtypes, all open. */
export default async function TreePage({ params }: PageProps<"/[tech]/tree">) {
  const { tech } = await params;
  const deck = getDeck(tech);
  return (
    <div className="mx-auto max-w-5xl px-4 pt-4 pb-12 sm:px-6 lg:px-10">
      <PageHeader
        crumbs={[
          { label: "Home", href: urls.home() },
          { label: deck.name, href: urls.overview(tech) },
          { label: "Tree" },
        ]}
        title={`${deck.name} as a tree`}
        lead="Every concept, its types and their subtypes, each in one line. Concepts open their page; everything else opens on the map."
      >
        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full border-[3px] border-accent" aria-hidden="true" />{" "}
            Concept with its own page
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconMap size={15} /> Other items open on the map
          </span>
        </p>
      </PageHeader>
      <div className="flex flex-col gap-8">
        {deck.tree.map(({ topic, nodes }) => (
          <section
            key={topic.id}
            aria-labelledby={`tr-${topic.id}`}
            className="rounded-2xl border border-line bg-surface p-4 sm:p-5"
          >
            <h2
              id={`tr-${topic.id}`}
              className="mb-2 flex items-center gap-2.5 text-xl font-extrabold"
            >
              <span
                aria-hidden="true"
                className="h-2.5 w-8 rounded-full"
                style={{ background: topicColor(topic.index) }}
              />
              {topic.title}
            </h2>
            <Branch deck={deck} nodes={nodes} color={topicColor(topic.index)} depth={0} />
          </section>
        ))}
      </div>
      <details className="mt-8 rounded-2xl border border-line bg-surface">
        <summary className="flex min-h-12 cursor-pointer items-center gap-2 px-4 text-sm font-semibold text-ink-2 hover:text-ink">
          <IconLink size={16} /> Sources for the tree ({deck.treeSources.length})
        </summary>
        <ul className="flex flex-col gap-2 border-t border-line px-4 py-3 text-sm">
          {deck.treeSources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent-ink underline underline-offset-2"
              >
                {s.title}
              </a>
              <span className="text-ink-3"> · checked {formatDate(s.verifiedOn)}</span>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
