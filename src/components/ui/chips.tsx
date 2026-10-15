import type { Level } from "@/lib/content/schema";
import { LEVEL_LABEL, cx } from "@/lib/ui";
import { IconFlame } from "./icons";

/** Level chip. Signal bars (1–3) + label, so the level is never colour-only. */
export function LevelChip({ level, className }: { level: Level; className?: string }) {
  const bars = level === "beginner" ? 1 : level === "intermediate" ? 2 : 3;
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs font-semibold text-ink-2",
        className,
      )}
    >
      <span aria-hidden="true" className="inline-flex items-end gap-[2px]">
        {[1, 2, 3].map((b) => (
          <span
            key={b}
            className={cx("w-[3px] rounded-sm", b <= bars ? "bg-accent" : "bg-line-strong")}
            style={{ height: 4 + b * 3 }}
          />
        ))}
      </span>
      {LEVEL_LABEL[level]}
    </span>
  );
}

/** Heat: how often interviewers ask it (1–3 flames). */
export function HeatChip({ heat, className, compact }: { heat: number; className?: string; compact?: boolean }) {
  const label = heat === 3 ? "Asked a lot" : heat === 2 ? "Asked often" : "Asked sometimes";
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2 py-0.5 text-xs font-semibold text-ink-2",
        className,
      )}
      title={`${label} (heat ${heat} of 3)`}
    >
      <span aria-hidden="true" className="inline-flex" style={{ color: "var(--flame)" }}>
        {[1, 2, 3].map((f) => (
          <IconFlame key={f} size={13} filled={f <= heat} className={f <= heat ? "" : "opacity-35"} />
        ))}
      </span>
      {compact ? <span className="sr-only">{label}</span> : <span>{label}</span>}
    </span>
  );
}

export function TopicChip({ title, color, href }: { title: string; color: string; href?: string }) {
  const inner = (
    <>
      <span aria-hidden="true" className="h-2.5 w-5 rounded-full" style={{ background: color }} />
      {title}
    </>
  );
  const cls =
    "inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs font-semibold text-ink-2";
  return href ? (
    <a href={href} className={cx(cls, "hover:border-line-strong hover:text-ink")}>
      {inner}
    </a>
  ) : (
    <span className={cls}>{inner}</span>
  );
}
