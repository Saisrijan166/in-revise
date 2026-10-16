import type { ComponentType, ReactNode } from "react";
import { renderInline } from "@/lib/inline";
import type { Point } from "@/lib/content/schema";
import { cx } from "@/lib/ui";
import {
  IconAlert,
  IconCheck,
  IconClose,
  IconPlus,
  IconQuote,
  IconSliders,
} from "@/components/ui/icons";

/**
 * Concept building blocks, shared by the concept page and the cheat sheet. One visual
 * language everywhere: same spacing, same headings, boxes only where they help.
 */

export function Section({
  id,
  title,
  show,
  icon: Icon,
  children,
  className,
}: {
  id: string;
  title: string;
  show?: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section data-show={show} aria-labelledby={id} className={cx("mt-10 scroll-mt-24", className)}>
      <h2 id={id} className="mb-3 flex items-center gap-2 text-xl font-extrabold text-ink">
        {Icon && <Icon size={19} className="text-accent" />}
        {title}
      </h2>
      {children}
    </section>
  );
}

const KIND: Record<
  Point["kind"],
  { label: string; icon: ComponentType<{ size?: number }>; cls: string }
> = {
  key: { label: "Key idea", icon: IconCheck, cls: "bg-accent-soft text-accent-ink" },
  plus: { label: "Strength", icon: IconPlus, cls: "bg-good-soft text-good" },
  minus: { label: "Watch out", icon: IconAlert, cls: "bg-warn-soft text-warn" },
  default: { label: "Default", icon: IconSliders, cls: "bg-surface-2 text-ink-2" },
};

/** Key points: "keyword → meaning", readable at a glance. */
export function KeyPoints({ points, compact }: { points: Point[]; compact?: boolean }) {
  return (
    <ul
      className={cx(
        "flex flex-col",
        compact ? "gap-1.5" : "divide-y divide-line rounded-2xl border border-line bg-surface",
      )}
    >
      {points.map((p) => {
        const k = KIND[p.kind];
        const Icon = k.icon;
        return (
          <li key={p.k} className={cx("flex items-start gap-3", compact ? "" : "px-4 py-3")}>
            <span
              className={cx("mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full", k.cls)}
              title={k.label}
            >
              <Icon size={14} />
              <span className="sr-only">{k.label}: </span>
            </span>
            <span className="min-w-0 leading-snug sm:flex sm:gap-2">
              <strong className="block font-bold text-ink sm:inline sm:flex-none">
                {renderInline(p.k)}
              </strong>
              <span className="hidden text-ink-3 sm:inline" aria-hidden="true">
                →
              </span>
              <span className="text-ink-2">{renderInline(p.v)}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** The common wrong answer, and the right one, side by side. */
export function Trap({
  wrong,
  right,
  compact,
}: {
  wrong: string;
  right: string;
  compact?: boolean;
}) {
  return (
    <div className={cx("grid gap-2", !compact && "sm:grid-cols-2")}>
      <p className="flex gap-2.5 rounded-2xl border border-[color-mix(in_oklab,var(--bad)_35%,var(--line))] bg-bad-soft px-4 py-3 text-ink">
        <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-bad text-on-accent">
          <IconClose size={14} />
        </span>
        <span>
          <span className="block text-xs font-bold tracking-wider text-bad uppercase">Wrong</span>
          {renderInline(wrong)}
        </span>
      </p>
      <p className="flex gap-2.5 rounded-2xl border border-[color-mix(in_oklab,var(--good)_35%,var(--line))] bg-good-soft px-4 py-3 text-ink">
        <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-good text-on-accent">
          <IconCheck size={14} />
        </span>
        <span>
          <span className="block text-xs font-bold tracking-wider text-good uppercase">Right</span>
          {renderInline(right)}
        </span>
      </p>
    </div>
  );
}

export function SayIt({ text }: { text: string }) {
  return (
    <blockquote className="relative rounded-2xl bg-accent-soft py-4 pr-4 pl-12 font-medium text-ink">
      <IconQuote size={22} className="absolute top-4 left-4 text-accent" />
      {text}
    </blockquote>
  );
}
