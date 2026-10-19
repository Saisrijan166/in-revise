"use client";

import { useMemo, useState } from "react";
import { cx, plural } from "@/lib/ui";
import { IconShuffle } from "@/components/ui/icons";
import { QuizSession, type QuizItem } from "./QuizSession";

const CHIP_ROW =
  "-my-1 flex min-w-0 flex-1 gap-1.5 overflow-x-auto overscroll-x-contain px-0.5 py-1 sm:flex-wrap sm:overflow-visible";

export interface QuizDeckItem extends QuizItem {
  topic: string;
  kind: "one-liner" | "trap" | "question";
}

const KINDS: { value: "all" | QuizDeckItem["kind"]; label: string }[] = [
  { value: "all", label: "Everything" },
  { value: "one-liner", label: "One-liners" },
  { value: "question", label: "Interview Qs" },
  { value: "trap", label: "Traps" },
];

/** Whole-tech quiz: pick a topic and a kind of question, shuffle if you like. */
export function QuizDeck({
  topics,
  items,
}: {
  topics: { id: string; title: string }[];
  items: QuizDeckItem[];
}) {
  const [topic, setTopic] = useState("all");
  const [kind, setKind] = useState<(typeof KINDS)[number]["value"]>("all");
  const [seed, setSeed] = useState(0);

  const list = useMemo(() => {
    let out = items.filter(
      (it) => (topic === "all" || it.topic === topic) && (kind === "all" || it.kind === kind),
    );
    if (seed) {
      let x = seed;
      const rand = () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648;
      out = [...out];
      for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
      }
    }
    return out;
  }, [items, topic, kind, seed]);

  const pill = (on: boolean) =>
    cx(
      "min-h-10 shrink-0 rounded-full border px-3 text-sm font-semibold whitespace-nowrap transition-colors",
      on
        ? "border-accent bg-accent text-on-accent"
        : "border-line bg-surface text-ink-2 hover:border-line-strong hover:text-ink",
    );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2.5 rounded-2xl border border-line bg-surface p-3 sm:p-4">
        <div role="group" aria-label="Topic" className="flex items-center gap-1.5">
          <span className="mr-1 w-14 shrink-0 text-xs font-bold tracking-wider text-ink-3 uppercase">
            Topic
          </span>
          {/* One row that scrolls sideways on phones (no 5-row wall of chips); wraps from sm up. */}
          <div data-no-swipe className={CHIP_ROW}>
            <button
              type="button"
              aria-pressed={topic === "all"}
              className={pill(topic === "all")}
              onClick={() => setTopic("all")}
            >
              All
            </button>
            {topics.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={topic === t.id}
                className={pill(topic === t.id)}
                onClick={() => setTopic(t.id)}
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>
        <div role="group" aria-label="Kind of question" className="flex items-center gap-1.5">
          <span className="mr-1 w-14 shrink-0 text-xs font-bold tracking-wider text-ink-3 uppercase">
            Ask
          </span>
          <div data-no-swipe className={CHIP_ROW}>
            {KINDS.map((k) => (
              <button
                key={k.value}
                type="button"
                aria-pressed={kind === k.value}
                className={pill(kind === k.value)}
                onClick={() => setKind(k.value)}
              >
                {k.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm text-ink-3">{plural(list.length, "question")}</span>
          <button
            type="button"
            onClick={() => setSeed((s) => (s + 7919) % 2147483647 || 1)}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-line px-3 text-sm font-bold text-ink-2 hover:border-line-strong hover:text-ink"
          >
            <IconShuffle size={16} /> Shuffle
          </button>
        </div>
      </div>
      <QuizSession key={`${topic}|${kind}|${seed}`} items={list} />
    </div>
  );
}
