import type { ReactNode } from "react";
import { IconBulb } from "@/components/ui/icons";

/** Analogy box. `limit` says where the analogy stops being true (CLAUDE.md 3.6). */
export function Analogy({
  title,
  limit,
  children,
}: {
  title: string;
  limit?: string;
  children: ReactNode;
}) {
  return (
    <aside className="my-5 overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex items-start gap-3 bg-accent-soft px-4 py-3">
        <IconBulb size={22} className="mt-0.5 flex-none text-accent-ink" />
        <div>
          <p className="text-xs font-bold tracking-wider text-accent-ink uppercase">
            Think of it like
          </p>
          <p className="font-display text-lg leading-snug font-bold text-ink">{title}</p>
        </div>
      </div>
      <div className="px-4 py-3 [&>p]:m-0">{children}</div>
      {limit && (
        <p className="m-0 border-t border-dashed border-line px-4 py-3 text-base text-ink-2">
          <strong className="text-ink">Where the analogy breaks: </strong>
          {limit}
        </p>
      )}
    </aside>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <aside className="my-4 rounded-xl border-l-4 border-accent bg-surface-2 px-4 py-3 [&>p]:m-0">
      {children}
    </aside>
  );
}
