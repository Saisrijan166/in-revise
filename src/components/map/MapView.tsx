"use client";

import { useCallback, useMemo, useState } from "react";
import type { MapData } from "@/lib/content/graph";
import { cx } from "@/lib/ui";
import { IconLinkArrow, IconMap } from "@/components/ui/icons";
import { useFocusParam } from "@/components/nav/TreeNav";
import { FocusMap } from "./FocusMap";
import { WholeMap } from "./WholeMap";

/** Map page: Focus (one concept and its connections) or the Whole map. `?focus=id` is shareable. */
export function MapView({ data }: { data: MapData }) {
  const [view, setView] = useState<"focus" | "whole">("focus");
  const [picked, setPicked] = useState<string | null>(null);
  const urlFocus = useFocusParam();
  const ids = useMemo(() => new Set(data.nodes.map((n) => n.id)), [data.nodes]);
  const selected = picked ?? (urlFocus && ids.has(urlFocus) ? urlFocus : data.firstConcept);

  const select = useCallback((id: string) => {
    setPicked(id);
    const url = new URL(window.location.href);
    url.searchParams.set("focus", id);
    window.history.replaceState(window.history.state, "", url);
    window.dispatchEvent(new Event("cm:focus"));
  }, []);

  const groups = data.topics.map((t) => ({
    ...t,
    nodes: data.nodes.filter((n) => n.topicId === t.id),
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <div
          role="group"
          aria-label="View"
          className="inline-flex rounded-2xl border border-line bg-surface-2 p-1"
        >
          {(
            [
              ["focus", "Focus", IconLinkArrow],
              ["whole", "Whole map", IconMap],
            ] as const
          ).map(([v, label, Icon]) => (
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
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>
        <label className="flex w-full min-w-0 items-center gap-2 sm:w-auto">
          <span className="text-sm font-semibold text-ink-3">Focus on</span>
          <select
            value={selected}
            onChange={(e) => select(e.target.value)}
            className="min-h-11 min-w-0 flex-1 rounded-xl border-2 border-line bg-surface px-3 font-semibold text-ink sm:w-72 sm:flex-none"
          >
            {groups.map((g) => (
              <optgroup key={g.id} label={g.title}>
                {g.nodes.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.isConcept ? `● ${n.label}` : `  ${n.path.length > 1 ? "· " : ""}${n.label}`}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      </div>

      {view === "focus" ? (
        <FocusMap data={data} selected={selected} onSelect={select} />
      ) : (
        <WholeMap
          data={data}
          selected={selected}
          onSelect={(id) => {
            select(id);
            setView("focus");
          }}
        />
      )}
    </div>
  );
}
