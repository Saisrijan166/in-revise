"use client";

import { useMemo, useState } from "react";
import { useHydrated, useProgress } from "@/lib/store/progress";
import { cardKey } from "@/lib/urls";
import { cx } from "@/lib/ui";
import { IconShuffle } from "@/components/ui/icons";
import { DrillSession, type DrillItem } from "./DrillSession";

type Focus = "all" | "weak" | "unmarked";
type Kind = "both" | "questions" | "hooks";

export interface DeckDrillItem extends DrillItem {
  topic: string;
  kind: "hook" | "question";
}

/** Deck-wide drill with filters (topic, weak cards only, question type) and shuffle. */
export function DeckDrill({ tech, topics, items }: { tech: string; topics: { id: string; title: string }[]; items: DeckDrillItem[] }) {
  const [topic, setTopic] = useState("all");
  const [focus, setFocus] = useState<Focus>("all");
  const [kind, setKind] = useState<Kind>("both");
  const [seed, setSeed] = useState(0);
  const hydrated = useHydrated();
  // Read statuses once per session start, so rating a card mid-run does not reshuffle the deck.
  const [snapshot, setSnapshot] = useState<Record<string, string> | null>(null);
  const statuses = useProgress((s) => s.statuses);
  const frozen = useMemo(() => snapshot ?? (hydrated ? statuses : {}), [snapshot, hydrated, statuses]);

  const list = useMemo(() => {
    let out = items.filter(
      (it) =>
        (topic === "all" || it.topic === topic) &&
        (kind === "both" || (kind === "hooks" ? it.kind === "hook" : it.kind === "question")),
    );
    if (focus !== "all") {
      out = out.filter((it) => {
        const s = frozen[cardKey(tech, it.cardId)];
        return focus === "weak" ? s === "shaky" || s === "unknown" : !s;
      });
    }
    if (seed) {
      // Deterministic shuffle per seed (Fisher–Yates with a small LCG).
      let x = seed;
      const rand = () => ((x = (x * 1103515245 + 12345) % 2147483648) / 2147483648);
      out = [...out];
      for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
      }
    }
    return out;
  }, [items, topic, kind, focus, seed, frozen, tech]);

  const pill = (on: boolean) =>
    cx(
      "min-h-10 rounded-full border px-3 text-sm font-semibold transition-colors",
      on ? "border-accent bg-accent text-on-accent" : "border-line bg-surface text-ink-2 hover:text-ink",
    );
  const runKey = `${topic}|${focus}|${kind}|${seed}`;
  const startOver = () => setSnapshot({ ...statuses });

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="order-2 lg:order-1">
        <DrillSession key={runKey} tech={tech} items={list} onRestart={startOver} />
      </div>
      <div className="order-1 flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 lg:order-2 lg:self-start">
        <div role="group" aria-label="Topic" className="flex flex-wrap gap-1.5">
          <p className="w-full text-xs font-bold tracking-wider text-ink-3 uppercase">Topic</p>
          <button type="button" aria-pressed={topic === "all"} className={pill(topic === "all")} onClick={() => setTopic("all")}>
            All
          </button>
          {topics.map((t) => (
            <button key={t.id} type="button" aria-pressed={topic === t.id} className={pill(topic === t.id)} onClick={() => setTopic(t.id)}>
              {t.title}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Focus" className="flex flex-wrap gap-1.5">
          <p className="w-full text-xs font-bold tracking-wider text-ink-3 uppercase">Focus</p>
          {(
            [
              ["all", "Everything"],
              ["weak", "Shaky + unknown"],
              ["unmarked", "Not marked yet"],
            ] as const
          ).map(([v, label]) => (
            <button
              key={v}
              type="button"
              aria-pressed={focus === v}
              className={pill(focus === v)}
              onClick={() => {
                setSnapshot({ ...statuses });
                setFocus(v);
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Card type" className="flex flex-wrap gap-1.5">
          <p className="w-full text-xs font-bold tracking-wider text-ink-3 uppercase">Cards</p>
          {(
            [
              ["both", "Both"],
              ["questions", "Interview Qs"],
              ["hooks", "One-liners"],
            ] as const
          ).map(([v, label]) => (
            <button key={v} type="button" aria-pressed={kind === v} className={pill(kind === v)} onClick={() => setKind(v)}>
              {label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setSeed((s) => (s + 7919) % 2147483647 || 1)}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border-2 border-line font-bold text-ink-2 hover:border-line-strong hover:text-ink"
        >
          <IconShuffle size={18} /> Shuffle
        </button>
        <p className="text-sm text-ink-3">{list.length} cards in this run. Your ratings update each card&apos;s Known / Shaky / Unknown mark.</p>
      </div>
    </div>
  );
}
