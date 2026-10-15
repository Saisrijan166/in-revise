"use client";

import { STATUS_META, useHydrated, useStatus, type Status } from "@/lib/store/progress";
import { cardKey } from "@/lib/urls";
import { cx } from "@/lib/ui";

/** A station marker: hollow = not marked, filled = known, half = shaky, red ring = unknown. */
export function StationMark({
  status,
  color,
  size = 14,
}: {
  status?: Status;
  color?: string;
  size?: number;
}) {
  const ring =
    status === "known"
      ? "var(--good)"
      : status === "shaky"
        ? "var(--warn)"
        : status === "unknown"
          ? "var(--bad)"
          : (color ?? "var(--line-strong)");
  const fill =
    status === "known"
      ? "var(--good)"
      : status === "shaky"
        ? "linear-gradient(90deg, var(--warn) 50%, var(--surface) 50%)"
        : "var(--surface)";
  return (
    <span
      aria-hidden="true"
      className="inline-block flex-none rounded-full"
      style={{ width: size, height: size, border: `3px solid ${ring}`, background: fill }}
    />
  );
}

export function StatusDot({
  tech,
  id,
  color,
  size,
  withLabel,
}: {
  tech: string;
  id: string;
  color?: string;
  size?: number;
  withLabel?: boolean;
}) {
  const hydrated = useHydrated();
  const status = useStatus(cardKey(tech, id));
  const s = hydrated ? status : undefined;
  return (
    <span className="inline-flex items-center gap-1.5">
      <StationMark status={s} color={color} size={size} />
      {withLabel ? (
        <span className={cx("text-xs font-semibold", s ? "text-ink-2" : "text-ink-3")}>
          {s ? STATUS_META[s].label : "Not marked"}
        </span>
      ) : (
        <span className="sr-only">{s ? STATUS_META[s].label : "Not marked"}</span>
      )}
    </span>
  );
}
