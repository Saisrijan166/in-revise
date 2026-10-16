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
import { useMemo } from "react";
import type { MapData, MapNode } from "@/lib/content/graph";
import type { RelationType } from "@/lib/content/schema";
import { useResolvedTheme } from "@/lib/store/prefs";
import { cx, topicColor } from "@/lib/ui";
import { IconFit, IconMinus, IconPlus } from "@/components/ui/icons";

/**
 * Everything at once: concepts and the parts that have relations, grouped in topic columns,
 * with the relation verb on every line. Tap any station to focus on it.
 */

type StationData = MapNode & { selected: boolean } & Record<string, unknown>;

const STROKE: Record<RelationType, string> = {
  needs: "var(--accent)",
  uses: "var(--ink-3)",
  solves: "var(--good)",
  causes: "var(--warn)",
  limits: "var(--bad)",
  vs: "var(--ink-2)",
  pairs: "var(--line-strong)",
};

function Station({ data }: NodeProps<Node<StationData>>) {
  const color = topicColor(data.topicIndex);
  return (
    <div
      className={cx(
        "map-node cursor-pointer rounded-xl border-2 bg-surface px-3 py-2 text-left shadow-[var(--shadow)]",
        data.isConcept ? "w-[200px]" : "w-[170px]",
        data.selected ? "border-accent" : "border-line",
      )}
      style={data.isConcept ? { borderTopColor: color, borderTopWidth: 6 } : undefined}
    >
      <Handle type="target" position={Position.Left} isConnectable={false} />
      <p
        className={cx(
          "leading-tight text-ink",
          data.isConcept ? "font-display text-[0.98rem] font-bold" : "text-sm font-semibold",
        )}
      >
        {data.label}
      </p>
      {!data.isConcept && data.path.length > 0 && (
        <p className="mt-0.5 truncate text-[0.7rem] text-ink-3">{data.path.at(-1)}</p>
      )}
      <Handle type="source" position={Position.Right} isConnectable={false} />
    </div>
  );
}

const nodeTypes = { station: Station };

function Controls() {
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
        onClick={() => rf.fitView({ padding: 0.12, duration: 300 })}
        aria-label="Fit the whole map"
      >
        <IconFit size={20} />
      </button>
    </div>
  );
}

function Flow({
  data,
  selected,
  onSelect,
}: {
  data: MapData;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const theme = useResolvedTheme();
  const { nodes, edges } = useMemo(() => {
    const used = new Set<string>();
    data.edges.forEach((e) => {
      used.add(e.from);
      used.add(e.to);
    });
    const shown = data.nodes.filter((n) => n.isConcept || used.has(n.id));
    const rowInTopic = new Map<string, number>();
    const nodes: Node<StationData>[] = shown.map((n) => {
      const row = rowInTopic.get(n.topicId) ?? 0;
      rowInTopic.set(n.topicId, row + 1);
      return {
        id: n.id,
        type: "station",
        position: { x: n.topicIndex * 300 + (n.isConcept ? 0 : 24), y: row * 84 },
        ariaLabel: `${n.label}, ${n.topicTitle}. Press Enter to focus.`,
        data: { ...n, selected: n.id === selected },
      };
    });
    const edges: Edge[] = data.edges.map((e) => {
      const touches = e.from === selected || e.to === selected;
      return {
        id: e.id,
        source: e.from,
        target: e.to,
        type: "smoothstep",
        label: e.label,
        labelStyle: { fill: "var(--ink)", fontWeight: 700, fontSize: 11 },
        labelBgStyle: { fill: "var(--surface)" },
        labelBgPadding: [4, 2] as [number, number],
        focusable: false,
        selectable: false,
        style: {
          stroke: STROKE[e.type],
          strokeWidth: touches ? 3.5 : 2,
          opacity: selected && !touches ? 0.35 : 1,
        },
        markerEnd:
          e.type === "vs" || e.type === "pairs"
            ? undefined
            : { type: MarkerType.ArrowClosed, color: STROKE[e.type] },
      } satisfies Edge;
    });
    return { nodes, edges };
  }, [data, selected]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      colorMode={theme}
      fitView
      fitViewOptions={{ padding: 0.12 }}
      minZoom={0.25}
      maxZoom={2}
      nodesDraggable={false}
      nodesConnectable={false}
      zoomOnDoubleClick={false}
      onNodeClick={(_, n) => onSelect(n.id)}
      onSelectionChange={({ nodes: sel }) => {
        if (sel[0] && sel[0].id !== selected) onSelect(sel[0].id);
      }}
      aria-label="Whole map. Use Tab to move between items and Enter to focus on one."
    >
      <Background variant={BackgroundVariant.Dots} gap={28} size={1.6} color="var(--line-strong)" />
      <Controls />
    </ReactFlow>
  );
}

export function WholeMap(props: {
  data: MapData;
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      className="relative h-[calc(100dvh-17rem)] min-h-[440px] overflow-hidden rounded-3xl border border-line bg-surface md:h-[calc(100dvh-14rem)]"
      data-no-swipe
    >
      <ReactFlowProvider>
        <Flow {...props} />
      </ReactFlowProvider>
      <ul
        className="pointer-events-none absolute top-3 left-3 z-10 hidden flex-col gap-1 rounded-xl border border-line bg-surface/90 px-3 py-2 text-xs font-semibold text-ink-2 sm:flex"
        aria-label="Topic colours"
      >
        {props.data.topics.map((t) => (
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
    </div>
  );
}
