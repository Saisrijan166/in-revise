"use client";

import "@xyflow/react/dist/style.css";
import {
  Background,
  BackgroundVariant,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import type { EdgeKind, MapData, MapNode } from "@/lib/content/graph";
import { useHydrated, useProgress } from "@/lib/store/progress";
import { useResolvedTheme } from "@/lib/store/prefs";
import { cardKey } from "@/lib/urls";
import { LEVEL_LABEL, cx, topicColor } from "@/lib/ui";
import { StationMark } from "@/components/deck/StatusDot";
import { HeatChip, LevelChip } from "@/components/ui/chips";
import {
  IconArrowRight,
  IconClose,
  IconColumns,
  IconFit,
  IconList,
  IconMap,
  IconMinus,
  IconPlus,
} from "@/components/ui/icons";

/**
 * Interactive concept graph (CLAUDE.md 5.2 #4). Pan, pinch-zoom and tap work on touch.
 * Tap a station to preview it; the preview links to the card. A List view is the text alternative.
 */

type Orientation = "LR" | "TB";
const WIDE = "(min-width: 768px)";
const noopSubscribe = () => () => {};
type ConceptNodeData = MapNode & {
  vertical: boolean;
  dim: boolean;
  status?: "known" | "shaky" | "unknown";
  selected: boolean;
} & Record<string, unknown>;

const EDGE_STYLE: Record<
  EdgeKind,
  { label: string; hint: string; stroke: string; dash?: string; width: number; arrow: boolean }
> = {
  needs: { label: "Needs", hint: "learn first", stroke: "var(--ink-3)", width: 2.5, arrow: true },
  leadsTo: {
    label: "Leads to",
    hint: "learn next",
    stroke: "var(--accent)",
    dash: "7 6",
    width: 2.5,
    arrow: true,
  },
  related: {
    label: "Related",
    hint: "same family",
    stroke: "var(--line-strong)",
    dash: "2 7",
    width: 2.5,
    arrow: false,
  },
};

function ConceptNode({ data }: NodeProps<Node<ConceptNodeData>>) {
  const color = topicColor(data.topicIndex);
  return (
    <div
      className={cx(
        "map-node w-[210px] cursor-pointer overflow-hidden rounded-2xl border-2 bg-surface text-left shadow-[var(--shadow)] transition-opacity duration-200",
        data.selected ? "border-accent" : "border-line",
        data.dim && "opacity-30",
      )}
    >
      <Handle
        type="target"
        position={data.vertical ? Position.Top : Position.Left}
        isConnectable={false}
      />
      <div className="h-2" style={{ background: color }} aria-hidden="true" />
      <div className="flex items-start gap-2 px-3 pt-2.5 pb-3">
        <span className="mt-1">
          <StationMark status={data.status} color={color} size={15} />
        </span>
        <div className="min-w-0">
          <p className="font-display text-[0.98rem] leading-tight font-bold text-ink">
            {data.title}
          </p>
          <p className="mt-1 text-[0.72rem] font-semibold text-ink-3">
            {data.topicTitle} · {LEVEL_LABEL[data.level]} · {"●".repeat(data.heat)}
            <span className="opacity-40">{"●".repeat(3 - data.heat)}</span>
          </p>
        </div>
      </div>
      <Handle
        type="source"
        position={data.vertical ? Position.Bottom : Position.Right}
        isConnectable={false}
      />
    </div>
  );
}

const nodeTypes = { concept: ConceptNode };

function layout(data: MapData, o: Orientation) {
  const pos = new Map<string, { x: number; y: number }>();
  const colSize = new Map<number, number>();
  for (const n of data.nodes) colSize.set(n.depth, (colSize.get(n.depth) ?? 0) + 1);
  const maxRows = Math.max(...colSize.values());
  for (const n of data.nodes) {
    const offset = (maxRows - colSize.get(n.depth)!) / 2;
    if (o === "LR") pos.set(n.id, { x: n.depth * 290, y: (n.row + offset) * 130 });
    else pos.set(n.id, { x: (n.row + offset) * 236, y: n.depth * 170 });
  }
  return pos;
}

function MapControls({ onList }: { onList: () => void }) {
  const rf = useReactFlow();
  const btn =
    "touch-target grid place-items-center rounded-xl border border-line bg-surface text-ink-2 shadow-[var(--shadow)] hover:text-ink";
  return (
    <div className="absolute right-3 bottom-3 z-10 flex flex-col gap-1.5">
      <button
        type="button"
        className={btn}
        onClick={() => rf.zoomIn({ duration: 200 })}
        aria-label="Zoom in"
      >
        <IconPlus size={20} />
      </button>
      <button
        type="button"
        className={btn}
        onClick={() => rf.zoomOut({ duration: 200 })}
        aria-label="Zoom out"
      >
        <IconMinus size={20} />
      </button>
      <button
        type="button"
        className={btn}
        onClick={() => rf.fitView({ padding: 0.15, duration: 300 })}
        aria-label="Fit the whole map"
      >
        <IconFit size={20} />
      </button>
      <button type="button" className={btn} onClick={onList} aria-label="Show as a list">
        <IconList size={20} />
      </button>
    </div>
  );
}

function Flow({
  data,
  tech,
  selected,
  setSelected,
  kinds,
  onList,
  initialFocus,
}: {
  data: MapData;
  tech: string;
  initialFocus: string | null;
  selected: string | null;
  setSelected: (id: string | null) => void;
  kinds: Record<EdgeKind, boolean>;
  onList: () => void;
}) {
  const theme = useResolvedTheme();
  const hydrated = useHydrated();
  const statuses = useProgress((s) => s.statuses);
  const wide = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(WIDE);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(WIDE).matches,
    () => true,
  );
  const orientation: Orientation = wide ? "LR" : "TB";
  const rf = useReactFlow();

  const visibleEdges = useMemo(() => data.edges.filter((e) => kinds[e.kind]), [data.edges, kinds]);
  const neighbours = useMemo(() => {
    if (!selected) return null;
    const set = new Set([selected]);
    for (const e of visibleEdges) {
      if (e.source === selected) set.add(e.target);
      if (e.target === selected) set.add(e.source);
    }
    return set;
  }, [selected, visibleEdges]);

  const nodes: Node<ConceptNodeData>[] = useMemo(() => {
    const pos = layout(data, orientation);
    return data.nodes.map((n) => ({
      id: n.id,
      type: "concept",
      position: pos.get(n.id)!,
      ariaLabel: `${n.title}. ${n.topicTitle}, ${LEVEL_LABEL[n.level]}. Press Enter to preview.`,
      data: {
        ...n,
        vertical: orientation === "TB",
        dim: Boolean(neighbours && !neighbours.has(n.id)),
        status: hydrated ? statuses[cardKey(tech, n.id)] : undefined,
        selected: n.id === selected,
      },
    }));
  }, [data, orientation, neighbours, hydrated, statuses, tech, selected]);

  const edges: Edge[] = useMemo(
    () =>
      visibleEdges.map((e) => {
        const s = EDGE_STYLE[e.kind];
        const touches = selected && (e.source === selected || e.target === selected);
        const faded = selected && !touches;
        const stroke = touches ? "var(--accent)" : s.stroke;
        return {
          id: e.id,
          source: e.source,
          target: e.target,
          type: "smoothstep",
          focusable: false,
          selectable: false,
          style: {
            stroke,
            strokeWidth: touches ? 3.5 : s.width,
            strokeDasharray: s.dash,
            opacity: faded ? 0.18 : 1,
            strokeLinecap: "round",
          },
          markerEnd: s.arrow
            ? { type: MarkerType.ArrowClosed, color: stroke, width: 16, height: 16 }
            : undefined,
        } satisfies Edge;
      }),
    [visibleEdges, selected],
  );

  // Re-fit when the layout direction changes; centre on the focused card when there is one.
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (selected) {
        const n = rf.getNode(selected);
        if (n) rf.setCenter(n.position.x + 105, n.position.y + 40, { zoom: 1, duration: 400 });
      } else rf.fitView({ padding: 0.15, duration: 300 });
    }, 60);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-run on layout change or deep-link focus, not on every selection
  }, [orientation, initialFocus]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      colorMode={theme}
      fitView
      fitViewOptions={{ padding: 0.15 }}
      minZoom={0.3}
      maxZoom={2}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable
      zoomOnDoubleClick={false}
      onNodeClick={(_, n) => setSelected(n.id)}
      onPaneClick={() => setSelected(null)}
      onSelectionChange={({ nodes: sel }) => {
        if (sel[0] && sel[0].id !== selected) setSelected(sel[0].id);
      }}
      proOptions={{ hideAttribution: false }}
      aria-label="Concept map. Use Tab to move between concepts and Enter to preview one."
    >
      <Background variant={BackgroundVariant.Dots} gap={28} size={1.6} color="var(--line-strong)" />
      <MapControls onList={onList} />
    </ReactFlow>
  );
}

export function ConceptMap({ tech, data }: { tech: string; data: MapData }) {
  const [view, setView] = useState<"map" | "list">("map");
  // undefined = nothing picked yet, so fall back to the ?focus= deep link.
  const [picked, setPicked] = useState<string | null | undefined>(undefined);
  const [kinds, setKinds] = useState<Record<EdgeKind, boolean>>({
    needs: true,
    leadsTo: true,
    related: true,
  });
  const nodeById = useMemo(() => new Map(data.nodes.map((n) => [n.id, n])), [data.nodes]);
  // Deep link: /map/?focus=card-id (shareable URL). Read once from the address bar.
  const urlFocus = useSyncExternalStore(
    noopSubscribe,
    () => new URLSearchParams(window.location.search).get("focus"),
    () => null,
  );
  const initialFocus = urlFocus && nodeById.has(urlFocus) ? urlFocus : null;
  const selected = picked === undefined ? initialFocus : picked;
  const sel = selected ? nodeById.get(selected) : undefined;

  const setSelected = useCallback((id: string | null) => {
    setPicked(id);
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("focus", id);
    else url.searchParams.delete("focus");
    window.history.replaceState(window.history.state, "", url);
  }, []);

  const links = (id: string) => {
    const out: { kind: EdgeKind; dir: "in" | "out"; node: MapNode }[] = [];
    for (const e of data.edges) {
      if (e.source === id) out.push({ kind: e.kind, dir: "out", node: nodeById.get(e.target)! });
      if (e.target === id) out.push({ kind: e.kind, dir: "in", node: nodeById.get(e.source)! });
    }
    return out;
  };
  const relLabel = (kind: EdgeKind, dir: "in" | "out") =>
    kind === "related"
      ? "Related"
      : kind === "needs"
        ? dir === "in"
          ? "Needs"
          : "Needed by"
        : dir === "out"
          ? "Leads to"
          : "Comes after";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div
          role="group"
          aria-label="View"
          className="inline-flex rounded-2xl border border-line bg-surface-2 p-1"
        >
          {(["map", "list"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={cx(
                "inline-flex min-h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold",
                view === v
                  ? "bg-surface text-ink shadow-[var(--shadow)]"
                  : "text-ink-2 hover:text-ink",
              )}
            >
              {v === "map" ? <IconMap size={16} /> : <IconList size={16} />}
              {v === "map" ? "Map" : "List"}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Show links" className="flex flex-wrap gap-1.5">
          {(Object.keys(EDGE_STYLE) as EdgeKind[]).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kinds[k]}
              onClick={() => setKinds((s) => ({ ...s, [k]: !s[k] }))}
              className={cx(
                "inline-flex min-h-10 items-center gap-2 rounded-full border px-3 text-sm font-semibold",
                kinds[k]
                  ? "border-line-strong bg-surface text-ink"
                  : "border-line bg-transparent text-ink-3 line-through",
              )}
            >
              <svg width="26" height="8" aria-hidden="true">
                <line
                  x1="1"
                  y1="4"
                  x2="25"
                  y2="4"
                  style={{
                    stroke: EDGE_STYLE[k].stroke,
                    strokeWidth: 3,
                    strokeDasharray: EDGE_STYLE[k].dash,
                    strokeLinecap: "round",
                  }}
                />
              </svg>
              {EDGE_STYLE[k].label}
              <span className="hidden text-ink-3 sm:inline">({EDGE_STYLE[k].hint})</span>
            </button>
          ))}
        </div>
      </div>

      {view === "map" ? (
        <div
          className="relative h-[calc(100dvh-15.5rem)] min-h-[420px] overflow-hidden rounded-3xl border border-line bg-surface md:h-[calc(100dvh-13rem)]"
          data-no-swipe
        >
          <ReactFlowProvider>
            <Flow
              data={data}
              tech={tech}
              initialFocus={initialFocus}
              selected={selected}
              setSelected={setSelected}
              kinds={kinds}
              onList={() => setView("list")}
            />
          </ReactFlowProvider>

          <ul
            className="pointer-events-none absolute top-3 left-3 z-10 hidden flex-col gap-1 rounded-xl border border-line bg-surface/90 px-3 py-2 text-xs font-semibold text-ink-2 sm:flex"
            aria-label="Topic colours"
          >
            {data.topics.map((t) => (
              <li key={t.id} className="flex items-center gap-2">
                <span
                  className="h-2 w-5 rounded-full"
                  style={{ background: topicColor(t.index) }}
                  aria-hidden="true"
                />
                {t.title}
              </li>
            ))}
          </ul>

          {sel && (
            <div
              className="sheet-content absolute inset-x-2 bottom-2 z-20 rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow-lg)] sm:inset-x-auto sm:top-3 sm:right-3 sm:bottom-auto sm:w-[340px]"
              role="dialog"
              aria-label={`${sel.title} preview`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  <LevelChip level={sel.level} />
                  <HeatChip heat={sel.heat} compact />
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="touch-target -mt-2 -mr-2 grid place-items-center rounded-xl text-ink-3 hover:text-ink"
                  aria-label="Close preview"
                >
                  <IconClose size={18} />
                </button>
              </div>
              <p className="mt-1 font-display text-xl font-extrabold">{sel.title}</p>
              <p className="mt-1 text-base text-ink-2">{sel.hook}</p>
              {sel.comparisons.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {sel.comparisons.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-dashed border-line-strong px-2.5 text-xs font-semibold text-ink-2 hover:text-ink"
                      >
                        <IconColumns size={14} /> {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href={sel.href}
                className="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-accent px-4 font-bold text-on-accent"
              >
                Open card <IconArrowRight size={17} />
              </Link>
            </div>
          )}
        </div>
      ) : (
        <ol className="grid gap-3 md:grid-cols-2" aria-label="Concepts and their links">
          {data.nodes.map((n) => (
            <li key={n.id} className="rounded-2xl border border-line bg-surface p-4">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-6 rounded-full"
                  style={{ background: topicColor(n.topicIndex) }}
                  aria-hidden="true"
                />
                <span className="text-xs font-bold tracking-wider text-ink-3 uppercase">
                  {n.topicTitle}
                </span>
              </div>
              <Link
                href={n.href}
                className="mt-1 block font-display text-lg font-bold text-ink hover:text-accent-ink"
              >
                {n.title}
              </Link>
              <p className="text-base text-ink-2">{n.hook}</p>
              {links(n.id).length > 0 && (
                <ul className="mt-2 flex flex-col gap-1 text-sm">
                  {links(n.id).map((l, i) => (
                    <li key={i}>
                      <span className="font-semibold text-ink-3">{relLabel(l.kind, l.dir)}: </span>
                      <Link
                        href={l.node.href}
                        className="font-semibold text-accent-ink underline underline-offset-2"
                      >
                        {l.node.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
