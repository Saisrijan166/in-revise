"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, useSyncExternalStore } from "react";
import type { NavNode, TechNav } from "@/lib/content";
import { cx, topicColor } from "@/lib/ui";
import { IconChevronRight } from "@/components/ui/icons";

/** Node id from a Tree page link (#node-<id>). Updated on in-app navigation via "cm:hash". */
export function useHashId(): string | null {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("hashchange", cb);
      window.addEventListener("cm:hash", cb);
      return () => {
        window.removeEventListener("hashchange", cb);
        window.removeEventListener("cm:hash", cb);
      };
    },
    () => (window.location.hash.startsWith("#node-") ? window.location.hash.slice(6) : null),
    () => null,
  );
}

/** Tell hash listeners (sidebar, Tree page) that the URL changed, once Next has updated it. */
export function announceHash() {
  window.setTimeout(() => window.dispatchEvent(new Event("cm:hash")), 60);
}

function findPath(nodes: NavNode[], id: string, trail: string[] = []): string[] | null {
  for (const n of nodes) {
    if (n.id === id) return [...trail, n.id];
    const hit = findPath(n.children, id, [...trail, n.id]);
    if (hit) return hit;
  }
  return null;
}

/**
 * The tech as a tree: topic → concept → types → subtypes. The current item is clearly
 * highlighted and its branch is open; every other branch can be opened with one tap.
 */
export function TreeNav({ nav, onNavigate }: { nav: TechNav; onNavigate?: () => void }) {
  const pathname = usePathname() ?? "";
  const hashId = useHashId();
  const segs = pathname.split("/").filter(Boolean);
  const currentId = segs[1] === "tree" ? hashId : segs.length === 2 ? segs[1] : null;
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});

  const openPath = useMemo(() => {
    if (!currentId) return new Set<string>();
    for (const t of nav.topics) {
      const p = findPath(t.nodes, currentId);
      if (p) return new Set(p);
    }
    return new Set<string>();
  }, [nav, currentId]);

  const isOpen = (id: string) => overrides[id] ?? openPath.has(id);

  const renderNodes = (nodes: NavNode[], depth: number, color: string) => (
    <ul className={cx(depth > 0 && "ml-3 border-l border-line pl-2")}>
      {nodes.map((n) => {
        const active = n.id === currentId;
        const open = isOpen(n.id);
        return (
          <li key={n.id}>
            <div className="flex items-center">
              {n.children.length > 0 ? (
                <button
                  type="button"
                  aria-expanded={open}
                  aria-label={`${open ? "Hide" : "Show"} types of ${n.label}`}
                  onClick={() => setOverrides((o) => ({ ...o, [n.id]: !open }))}
                  className="grid h-11 w-9 flex-none place-items-center rounded-md text-ink-3 hover:bg-surface-2 hover:text-ink lg:h-10"
                >
                  <IconChevronRight
                    size={15}
                    className={cx("transition-transform", open && "rotate-90")}
                  />
                </button>
              ) : (
                <span className="w-9 flex-none" aria-hidden="true" />
              )}
              <Link
                href={n.href}
                onClick={() => {
                  announceHash();
                  onNavigate?.();
                }}
                aria-current={active ? "page" : undefined}
                className={cx(
                  "flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-lg px-2 py-1 leading-snug lg:min-h-10",
                  active
                    ? "bg-accent font-bold text-on-accent"
                    : n.isConcept
                      ? "font-semibold text-ink hover:bg-surface-2"
                      : "text-[0.95rem] text-ink-2 hover:bg-surface-2 hover:text-ink",
                )}
              >
                {n.isConcept && (
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 flex-none rounded-full border-2"
                    style={{ borderColor: active ? "currentColor" : color }}
                  />
                )}
                <span className="min-w-0">{n.label}</span>
              </Link>
            </div>
            {/* Closed branches render nothing: the full tree is ~500 nodes, far too much DOM for every page. */}
            {open && n.children.length > 0 && renderNodes(n.children, depth + 1, color)}
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav aria-label={`${nav.name} topics`} className="flex flex-col gap-5">
      {nav.topics.map((t) => (
        <section key={t.id} aria-labelledby={`tn-${t.id}`}>
          <h2
            id={`tn-${t.id}`}
            className="mb-1 flex items-center gap-2 px-1 text-xs font-bold tracking-wider text-ink-3 uppercase"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-5 rounded-full"
              style={{ background: topicColor(t.index) }}
            />
            {t.title}
          </h2>
          {renderNodes(t.nodes, 0, topicColor(t.index))}
        </section>
      ))}
    </nav>
  );
}
