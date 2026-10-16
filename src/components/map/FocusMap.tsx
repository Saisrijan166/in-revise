"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import type { MapData, MapEdge, MapNode } from "@/lib/content/graph";
import type { RelationType } from "@/lib/content/schema";
import { cx, topicColor } from "@/lib/ui";
import { HeatChip, LevelChip } from "@/components/ui/chips";
import { IconArrowRight, IconColumns } from "@/components/ui/icons";

const TONE: Record<RelationType, string> = {
  needs: "bg-accent text-on-accent",
  uses: "bg-accent-soft text-accent-ink",
  solves: "bg-good-soft text-good",
  causes: "bg-warn-soft text-warn",
  limits: "bg-bad-soft text-bad",
  vs: "bg-surface-2 text-ink border border-line-strong",
  pairs: "bg-surface-2 text-ink-2 border border-line",
};

function Verb({ e }: { e: MapEdge }) {
  return (
    <span
      className={cx(
        "inline-flex min-h-7 items-center gap-1 rounded-full px-2.5 text-xs font-bold whitespace-nowrap",
        TONE[e.type],
      )}
    >
      {e.label}
      <IconArrowRight size={12} />
    </span>
  );
}

function NodeButton({ n, onSelect }: { n: MapNode; onSelect: (id: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(n.id)}
      className={cx(
        "inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-left font-bold",
        n.isConcept
          ? "border-2 border-accent bg-surface text-ink hover:bg-accent-soft"
          : "border border-line bg-surface text-ink hover:border-accent",
      )}
      title={`Focus on ${n.label}`}
    >
      {n.isConcept && (
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full"
          style={{ background: topicColor(n.topicIndex) }}
        />
      )}
      {n.label}
    </button>
  );
}

function Self({
  n,
  focusId,
  onSelect,
}: {
  n: MapNode;
  focusId: string;
  onSelect: (id: string) => void;
}) {
  return n.id === focusId ? (
    <span className="text-sm font-semibold text-ink-3">this</span>
  ) : (
    <NodeButton n={n} onSelect={onSelect} />
  );
}

function Item({
  e,
  side,
  byId,
  focusId,
  onSelect,
}: {
  e: MapEdge;
  side: "in" | "out";
  byId: Map<string, MapNode>;
  focusId: string;
  onSelect: (id: string) => void;
}) {
  const other = byId.get(side === "in" ? e.from : e.to)!;
  const self = byId.get(side === "in" ? e.to : e.from)!;
  return (
    <li
      data-side={side}
      className="rounded-2xl border border-line bg-surface p-3 shadow-[var(--shadow)]"
    >
      <div className={cx("flex flex-wrap items-center gap-2", side === "in" && "lg:justify-end")}>
        {side === "in" ? (
          <>
            <NodeButton n={other} onSelect={onSelect} />
            <Verb e={e} />
            <Self n={self} focusId={focusId} onSelect={onSelect} />
          </>
        ) : (
          <>
            <Self n={self} focusId={focusId} onSelect={onSelect} />
            <Verb e={e} />
            <NodeButton n={other} onSelect={onSelect} />
          </>
        )}
      </div>
      <p className={cx("mt-1.5 text-[0.95rem] text-ink-2", side === "in" && "lg:text-right")}>
        {e.why}
      </p>
      {e.compareHref && (
        <Link
          href={e.compareHref}
          className="mt-1 inline-flex min-h-9 items-center gap-1 text-sm font-bold text-accent-ink hover:underline"
        >
          <IconColumns size={14} /> Compare them
        </Link>
      )}
    </li>
  );
}

/**
 * One concept in the middle; what points to it on the left, what it points to on the right,
 * its types underneath. Every relation reads as a sentence with its reason.
 */
export function FocusMap({
  data,
  selected,
  onSelect,
}: {
  data: MapData;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const byId = new Map(data.nodes.map((n) => [n.id, n]));
  const node = byId.get(selected) ?? byId.get(data.firstConcept)!;
  // The focused node and everything inside it (its types and subtypes).
  const inside = new Set<string>();
  const collect = (id: string) => {
    inside.add(id);
    byId.get(id)?.childIds.forEach(collect);
  };
  collect(node.id);
  const outgoing = data.edges.filter((e) => inside.has(e.from));
  const incoming = data.edges.filter((e) => inside.has(e.to) && !inside.has(e.from));
  const children = node.childIds.map((id) => byId.get(id)!);
  const parent = node.parentId ? byId.get(node.parentId) : undefined;
  const owner = node.isConcept ? undefined : findOwner(node, byId);

  // Connector lines (wide screens): from each side item to the centre card.
  const wrap = useRef<HTMLDivElement>(null);
  const center = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<{ d: string; key: string }[]>([]);
  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const draw = () => {
      const c = center.current;
      if (!c || window.innerWidth < 1024) return setPaths([]);
      const box = el.getBoundingClientRect();
      const cr = c.getBoundingClientRect();
      const out: { d: string; key: string }[] = [];
      el.querySelectorAll<HTMLElement>("[data-side]").forEach((item, i) => {
        const r = item.getBoundingClientRect();
        const y1 = r.top + r.height / 2 - box.top;
        const y2 = cr.top + cr.height / 2 - box.top;
        if (item.dataset.side === "in") {
          const x1 = r.right - box.left;
          const x2 = cr.left - box.left;
          out.push({
            key: `i${i}`,
            d: `M${x1},${y1} C${x1 + 40},${y1} ${x2 - 40},${y2} ${x2},${y2}`,
          });
        } else {
          const x1 = cr.right - box.left;
          const x2 = r.left - box.left;
          out.push({
            key: `o${i}`,
            d: `M${x1},${y2} C${x1 + 40},${y2} ${x2 - 40},${y1} ${x2},${y1}`,
          });
        }
      });
      setPaths(out);
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    window.addEventListener("resize", draw);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", draw);
    };
  }, [selected]);

  return (
    <div ref={wrap} className="relative">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      >
        {paths.map((p) => (
          <path
            key={p.key}
            d={p.d}
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="2"
            strokeDasharray="4 5"
          />
        ))}
      </svg>

      <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)_minmax(0,1fr)] lg:items-center lg:gap-10">
        {/* Centre (first on phones) */}
        <div className="lg:col-start-2 lg:row-start-1">
          <div
            ref={center}
            className="rounded-3xl border-2 border-accent bg-surface p-5 shadow-[var(--shadow-lg)]"
          >
            {(parent || node.path.length > 0) && (
              <p className="mb-1 flex flex-wrap items-center gap-1 text-sm text-ink-3">
                <span className="font-semibold" style={{ color: topicColor(node.topicIndex) }}>
                  {node.topicTitle}
                </span>
                {node.path
                  .filter((p, i) => !(i === 0 && p === node.topicTitle))
                  .map((p, i) => (
                    <span key={i}>› {p}</span>
                  ))}
              </p>
            )}
            <h2 className="font-display text-2xl leading-tight font-extrabold text-ink">
              {node.label}
            </h2>
            {node.isConcept && node.level && node.heat && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                <LevelChip level={node.level} />
                <HeatChip heat={node.heat} compact />
              </div>
            )}
            <p className="mt-2 text-ink-2">{node.hook ?? node.note}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {node.isConcept ? (
                <Link
                  href={node.href}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-accent px-4 font-bold text-on-accent hover:bg-accent-strong"
                >
                  Open concept <IconArrowRight size={16} />
                </Link>
              ) : (
                owner && (
                  <Link
                    href={owner.href}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-accent px-4 font-bold text-on-accent hover:bg-accent-strong"
                  >
                    Explained in {owner.label} <IconArrowRight size={16} />
                  </Link>
                )
              )}
              {parent && (
                <button
                  type="button"
                  onClick={() => onSelect(parent.id)}
                  className="inline-flex min-h-11 items-center rounded-xl border border-line px-3 text-sm font-semibold text-ink-2 hover:text-ink"
                >
                  Up: {parent.label}
                </button>
              )}
            </div>
          </div>
          {children.length > 0 && (
            <div className="mt-4">
              <p className="mb-1.5 text-xs font-bold tracking-wider text-ink-3 uppercase">
                Types and parts inside
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {children.map((c) => (
                  <li key={c.id}>
                    <NodeButton n={c} onSelect={onSelect} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* What points to it */}
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="mb-2 text-xs font-bold tracking-wider text-ink-3 uppercase lg:text-right">
            What points here
          </p>
          {incoming.length ? (
            <ul className="flex flex-col gap-2.5">
              {incoming.map((e) => (
                <Item
                  key={e.id}
                  e={e}
                  side="in"
                  byId={byId}
                  focusId={node.id}
                  onSelect={onSelect}
                />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-3 lg:text-right">Nothing points here yet.</p>
          )}
        </div>

        {/* What it points to */}
        <div className="lg:col-start-3 lg:row-start-1">
          <p className="mb-2 text-xs font-bold tracking-wider text-ink-3 uppercase">
            What it points to
          </p>
          {outgoing.length ? (
            <ul className="flex flex-col gap-2.5">
              {outgoing.map((e) => (
                <Item
                  key={e.id}
                  e={e}
                  side="out"
                  byId={byId}
                  focusId={node.id}
                  onSelect={onSelect}
                />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-3">No outgoing links yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function findOwner(node: MapNode, byId: Map<string, MapNode>): MapNode | undefined {
  let p = node.parentId ? byId.get(node.parentId) : undefined;
  while (p && !p.isConcept) p = p.parentId ? byId.get(p.parentId) : undefined;
  return p;
}
