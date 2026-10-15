"use client";

import { Children, cloneElement, isValidElement, useEffect, useState, type ReactElement, type ReactNode } from "react";
import { IconArrowLeft, IconArrowRight, IconPlay, IconRestart } from "@/components/ui/icons";
import { cx } from "@/lib/ui";

/**
 * Stepwise flow diagram: steps are stations on a line. "Walk through" highlights one
 * step at a time (manual or auto). Plain ordered list underneath, so it reads without JS.
 */

interface StepProps {
  title: string;
  children?: ReactNode;
  index?: number;
  state?: "idle" | "active" | "done" | "todo";
}

export function Step({ title, children, index = 0, state = "idle" }: StepProps) {
  return (
    <li
      className={cx(
        "relative pb-5 pl-12 transition-opacity duration-300 last:pb-0",
        state === "todo" && "opacity-40",
      )}
      aria-current={state === "active" ? "step" : undefined}
    >
      <span
        aria-hidden="true"
        className={cx(
          "absolute top-0 left-0 grid h-8 w-8 place-items-center rounded-full border-[3px] font-display text-sm font-bold transition-colors duration-300",
          state === "active"
            ? "border-accent bg-accent text-on-accent"
            : state === "done"
              ? "border-accent bg-accent-soft text-accent-ink"
              : "border-accent bg-surface text-accent-ink",
        )}
      >
        {index + 1}
      </span>
      <p className="font-display text-[1.05rem] leading-8 font-bold text-ink">{title}</p>
      <div className="mt-0.5 text-ink-2 [&>p]:m-0">{children}</div>
    </li>
  );
}

export function Steps({ label, children }: { label?: string; children: ReactNode }) {
  const steps = Children.toArray(children).filter(isValidElement) as ReactElement<StepProps>[];
  const [active, setActive] = useState<number | null>(null);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    if (!auto || active === null) return;
    const t = window.setTimeout(() => {
      if (active >= steps.length - 1) setAuto(false);
      else setActive(active + 1);
    }, 1700);
    return () => window.clearTimeout(t);
  }, [auto, active, steps.length]);

  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <figure className="my-5 rounded-2xl border border-line bg-surface p-4 sm:p-5" aria-label={label}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        {label && <figcaption className="text-sm font-semibold text-ink-3">{label}</figcaption>}
        <div className="flex items-center gap-1">
          {active === null ? (
            <button
              type="button"
              onClick={() => {
                setActive(0);
                setAuto(!reduced());
              }}
              className="touch-target inline-flex items-center gap-1.5 rounded-xl bg-accent-soft px-3 text-sm font-semibold text-accent-ink hover:bg-accent hover:text-on-accent"
            >
              <IconPlay size={15} /> Walk through
            </button>
          ) : (
            <>
              <button
                type="button"
                aria-label="Previous step"
                disabled={active === 0}
                onClick={() => {
                  setAuto(false);
                  setActive((a) => Math.max(0, (a ?? 0) - 1));
                }}
                className="touch-target grid place-items-center rounded-xl border border-line text-ink-2 hover:text-ink disabled:opacity-40"
              >
                <IconArrowLeft size={18} />
              </button>
              <span className="min-w-14 text-center text-sm font-semibold text-ink-2" aria-live="polite">
                {active + 1} / {steps.length}
              </span>
              <button
                type="button"
                aria-label={active >= steps.length - 1 ? "Show all steps" : "Next step"}
                onClick={() => {
                  setAuto(false);
                  setActive((a) => (a === null || a >= steps.length - 1 ? null : a + 1));
                }}
                className="touch-target grid place-items-center rounded-xl border border-line text-ink-2 hover:text-ink"
              >
                {active >= steps.length - 1 ? <IconRestart size={18} /> : <IconArrowRight size={18} />}
              </button>
            </>
          )}
        </div>
      </div>
      <ol className="relative m-0 list-none p-0 before:absolute before:top-4 before:bottom-4 before:left-[15px] before:w-[3px] before:rounded-full before:bg-accent/30">
        {steps.map((s, i) =>
          cloneElement(s, {
            key: i,
            index: i,
            state: active === null ? "idle" : i === active ? "active" : i < active ? "done" : "todo",
          }),
        )}
      </ol>
    </figure>
  );
}
