"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { useProgress, type Status } from "@/lib/store/progress";
import { cardKey } from "@/lib/urls";
import { cx } from "@/lib/ui";
import { IconArrowLeft, IconArrowRight, IconRestart } from "@/components/ui/icons";
import { Flashcard } from "./Flashcard";

export interface DrillItem {
  key: string;
  cardId: string;
  cardTitle: string;
  cardHref: string;
  eyebrow: string;
  q: ReactNode;
  a: ReactNode;
}

const RANK: Record<Status, number> = { unknown: 0, shaky: 1, known: 2 };
const RATE: { status: Status; label: string; key: string; cls: string }[] = [
  { status: "unknown", label: "Missed", key: "1", cls: "border-bad text-bad hover:bg-bad-soft" },
  { status: "shaky", label: "Shaky", key: "2", cls: "border-warn text-warn hover:bg-warn-soft" },
  { status: "known", label: "Got it", key: "3", cls: "border-good text-good hover:bg-good-soft" },
];

/**
 * Flashcard run. Rating an answer updates the card's Known/Shaky/Unknown status:
 * the card keeps the weakest rating it got in this session.
 */
export function DrillSession({
  tech,
  items,
  onRestart,
}: {
  tech: string;
  items: DrillItem[];
  onRestart?: () => void;
}) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [rated, setRated] = useState<Record<string, Status>>({});
  const worst = useRef<Record<string, Status>>({});
  const setStatus = useProgress((s) => s.setStatus);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const done = i >= items.length;
  const item = items[i];

  const go = (n: number) => {
    setFlipped(false);
    setI(Math.max(0, Math.min(items.length, n)));
  };

  const rate = (status: Status) => {
    if (!item) return;
    const prev = worst.current[item.cardId];
    const next = prev && RANK[prev] < RANK[status] ? prev : status;
    worst.current[item.cardId] = next;
    setStatus(cardKey(tech, item.cardId), next);
    setRated((r) => ({ ...r, [item.key]: status }));
    go(i + 1);
  };

  const restart = () => {
    worst.current = {};
    setRated({});
    go(0);
    onRestart?.();
  };

  if (!items.length) {
    return (
      <p className="rounded-2xl border border-dashed border-line p-6 text-ink-2">
        No questions match these filters.
      </p>
    );
  }

  if (done) {
    const counts = { known: 0, shaky: 0, unknown: 0 };
    Object.values(rated).forEach((s) => counts[s]++);
    const weak = [
      ...new Map(
        items
          .filter((it) => rated[it.key] && rated[it.key] !== "known")
          .map((it) => [it.cardId, it]),
      ).values(),
    ];
    return (
      <div
        className="rounded-3xl border border-line bg-surface p-6 text-center shadow-[var(--shadow)]"
        aria-live="polite"
      >
        <p className="font-display text-2xl font-extrabold">Run complete</p>
        <p className="mt-2 text-ink-2">
          {counts.known} got it · {counts.shaky} shaky · {counts.unknown} missed
        </p>
        {weak.length > 0 && (
          <div className="mt-5 text-left">
            <p className="mb-2 text-sm font-bold text-ink-3">Worth another look</p>
            <ul className="flex flex-wrap gap-2">
              {weak.map((w) => (
                <li key={w.cardId}>
                  <Link
                    href={w.cardHref}
                    className="inline-flex min-h-11 items-center rounded-xl border border-line px-3 font-semibold text-accent-ink hover:bg-accent-soft"
                  >
                    {w.cardTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="button"
          onClick={restart}
          className="touch-target mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-4 font-bold text-on-accent"
        >
          <IconRestart size={18} /> Run again
        </button>
      </div>
    );
  }

  return (
    <div
      data-no-swipe
      className="outline-none"
      onKeyDown={(e) => {
        if (e.target instanceof HTMLElement && /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName))
          return;
        if (e.key === "ArrowRight") go(i + 1);
        else if (e.key === "ArrowLeft") go(i - 1);
        else if (flipped && ["1", "2", "3"].includes(e.key))
          rate(RATE.find((r) => r.key === e.key)!.status);
      }}
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={(e) => {
        const s = touch.current;
        touch.current = null;
        if (!s) return;
        const dx = e.changedTouches[0].clientX - s.x;
        const dy = e.changedTouches[0].clientY - s.y;
        if (Math.abs(dx) > 70 && Math.abs(dy) < Math.abs(dx) * 0.6) go(dx < 0 ? i + 1 : i - 1);
      }}
    >
      <div className="mb-3 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-ink-2" aria-live="polite">
          Card {i + 1} of {items.length}
        </span>
        <Link
          href={item.cardHref}
          className="inline-flex min-h-11 min-w-0 items-center truncate font-semibold text-accent-ink hover:underline"
        >
          {item.cardTitle}
        </Link>
      </div>
      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-surface-2" aria-hidden="true">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300"
          style={{ width: `${(i / items.length) * 100}%` }}
        />
      </div>

      <Flashcard
        key={item.key}
        front={item.q}
        back={item.a}
        eyebrow={item.eyebrow}
        flipped={flipped}
        onFlip={() => setFlipped((f) => !f)}
      />

      <div className="mt-4 min-h-[52px]">
        {flipped ? (
          <div role="group" aria-label="How did you do?" className="grid grid-cols-3 gap-2">
            {RATE.map((r) => (
              <button
                key={r.status}
                type="button"
                onClick={() => rate(r.status)}
                className={cx(
                  "min-h-12 rounded-xl border-2 bg-surface font-bold transition-colors",
                  r.cls,
                )}
              >
                {r.label}
                <span className="ml-1.5 hidden font-mono text-xs opacity-70 sm:inline">
                  {r.key}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => go(i - 1)}
              disabled={i === 0}
              className="touch-target inline-flex items-center gap-1.5 rounded-xl border border-line px-3 font-semibold text-ink-2 hover:text-ink disabled:opacity-40"
            >
              <IconArrowLeft size={18} /> Back
            </button>
            <p className="hidden text-xs text-ink-3 sm:block">
              Space or Enter flips · 1 2 3 rate · ← → move
            </p>
            <button
              type="button"
              onClick={() => go(i + 1)}
              className="touch-target inline-flex items-center gap-1.5 rounded-xl border border-line px-3 font-semibold text-ink-2 hover:text-ink"
            >
              Skip <IconArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
