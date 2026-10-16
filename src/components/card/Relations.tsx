import Link from "next/link";
import type { Deck, ResolvedRelation, TreeNode } from "@/lib/content/load";
import { nodeHref } from "@/lib/content/nav";
import { RELATION_TYPES, type RelationType } from "@/lib/content/schema";
import { urls } from "@/lib/urls";
import { cx } from "@/lib/ui";
import { IconArrowRight, IconColumns, IconTree } from "@/components/ui/icons";

/** Colour per relation type, so the same verb always looks the same everywhere. */
export const RELATION_TONE: Record<RelationType, string> = {
  needs: "bg-accent text-on-accent",
  uses: "bg-accent-soft text-accent-ink",
  solves: "bg-good-soft text-good",
  causes: "bg-warn-soft text-warn",
  limits: "bg-bad-soft text-bad",
  vs: "bg-surface-2 text-ink border border-line-strong",
  pairs: "bg-surface-2 text-ink-2 border border-line",
};

export function Verb({ type }: { type: RelationType }) {
  return (
    <span
      className={cx(
        "inline-flex min-h-7 flex-none items-center gap-1 rounded-full px-2.5 text-xs font-bold whitespace-nowrap",
        RELATION_TONE[type],
      )}
    >
      {RELATION_TYPES[type].label}
      <IconArrowRight size={12} />
    </span>
  );
}

function NodeChip({ deck, node, current }: { deck: Deck; node: TreeNode; current?: boolean }) {
  return (
    <Link
      href={nodeHref(deck.slug, node)}
      className={cx(
        "inline-flex min-h-9 items-center rounded-lg px-2.5 text-[0.95rem] font-bold",
        current
          ? "bg-ink text-bg"
          : "border border-line bg-surface text-ink hover:border-accent hover:text-accent-ink",
      )}
    >
      {node.label}
    </Link>
  );
}

/** One relation as a sentence: [From] verb → [To], then why. */
export function RelationRow({
  deck,
  r,
  currentIds,
}: {
  deck: Deck;
  r: ResolvedRelation;
  currentIds: Set<string>;
}) {
  const from = deck.nodeById.get(r.from)!;
  const to = deck.nodeById.get(r.to)!;
  return (
    <li className="px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
        <NodeChip deck={deck} node={from} current={currentIds.has(from.id)} />
        <Verb type={r.type} />
        <NodeChip deck={deck} node={to} current={currentIds.has(to.id)} />
      </div>
      <p className="mt-1.5 text-ink-2">
        {r.why}
        {r.comparison && (
          <Link
            href={urls.compare(deck.slug, r.comparison)}
            className="hit-44 ml-2 inline-flex items-center gap-1 text-sm font-bold whitespace-nowrap text-accent-ink hover:underline"
          >
            <IconColumns size={14} /> Compare
          </Link>
        )}
      </p>
    </li>
  );
}

/** Relations that touch a concept or any type inside it. */
export function relationsFor(deck: Deck, cardId: string): ResolvedRelation[] {
  const inside = (id: string) => id === cardId || deck.nodeById.get(id)?.ownerCardId === cardId;
  return deck.relations.filter((r) => inside(r.from) || inside(r.to));
}

/** "How it connects": where the concept sits (part of, types) and how it relates in practice. */
export function HowItConnects({ deck, cardId }: { deck: Deck; cardId: string }) {
  const node = deck.nodeById.get(cardId);
  if (!node) return null;
  const rels = relationsFor(deck, cardId);
  const current = new Set([cardId]);
  const parent = node.parentId ? deck.nodeById.get(node.parentId) : undefined;
  return (
    <div className="flex flex-col gap-3">
      {(parent || node.children.length > 0) && (
        <div className="flex flex-col gap-2 rounded-2xl border border-line bg-surface px-4 py-3">
          {parent && (
            <p className="flex flex-wrap items-center gap-2">
              <span className="w-16 flex-none text-sm font-bold text-ink-3">Part of</span>
              <NodeChip deck={deck} node={parent} />
            </p>
          )}
          {node.children.length > 0 && (
            <div className="flex flex-wrap items-start gap-2">
              <span className="mt-1.5 w-16 flex-none text-sm font-bold text-ink-3">Types</span>
              <ul className="flex flex-1 flex-wrap gap-1.5">
                {node.children.map((c) => (
                  <li key={c.id}>
                    <NodeChip deck={deck} node={c} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {rels.length > 0 && (
        <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
          {rels.map((r, i) => (
            <RelationRow key={i} deck={deck} r={r} currentIds={current} />
          ))}
        </ul>
      )}
      <Link
        href={urls.tree(deck.slug, cardId)}
        className="inline-flex min-h-11 items-center gap-2 self-start rounded-xl bg-accent-soft px-3 text-sm font-bold text-accent-ink hover:bg-accent hover:text-on-accent"
      >
        <IconTree size={17} /> See it in the tree
      </Link>
    </div>
  );
}
