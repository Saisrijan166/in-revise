"use client";

import Fuse from "fuse.js";
import { useRouter } from "next/navigation";
import { Dialog } from "radix-ui";
import { useEffect, useId, useMemo, useRef, useState, type ComponentType } from "react";
import {
  SEARCH_INDEX_URL,
  SEARCH_KEYS,
  relevance,
  type SearchDoc,
  type SearchKind,
} from "@/lib/search";
import { paletteStore } from "@/lib/store/ui";
import { urls } from "@/lib/urls";
import { cx } from "@/lib/ui";
import {
  IconBook,
  IconCards,
  IconColumns,
  IconSearch,
  IconSheet,
  IconTree,
} from "@/components/ui/icons";
import { useContextTech, type TechLite } from "./useCurrentTech";

/** Search / command palette (CLAUDE.md 5.2 #9). Index is built at build time and fetched on first open. */

let indexPromise: Promise<{ docs: SearchDoc[]; fuse: Fuse<SearchDoc> }> | null = null;
function loadIndex() {
  indexPromise ??= fetch(SEARCH_INDEX_URL)
    .then((r) => {
      if (!r.ok) throw new Error(`search index: HTTP ${r.status}`);
      return r.json() as Promise<{ docs: SearchDoc[]; index: unknown }>;
    })
    .then(({ docs, index }) => ({
      docs,
      fuse: new Fuse(
        docs,
        {
          keys: SEARCH_KEYS,
          // Fuse is used only for recall (finding candidates, including small typos). The final
          // order comes from relevance() in src/lib/search.ts, which puts exact matches first.
          threshold: 0.32,
          ignoreLocation: true,
          minMatchCharLength: 2,
          includeScore: true,
        },
        Fuse.parseIndex(index as Parameters<typeof Fuse.parseIndex>[0]),
      ),
    }))
    .catch((err) => {
      indexPromise = null;
      throw err;
    });
  return indexPromise;
}

const KIND_LABEL: Record<SearchKind, string> = {
  card: "Concepts",
  node: "Types and parts",
  compare: "Comparisons",
  term: "Glossary",
};
const KIND_ICON: Record<SearchKind, ComponentType<{ size?: number; className?: string }>> = {
  card: IconCards,
  node: IconTree,
  compare: IconColumns,
  term: IconBook,
};

interface Item {
  key: string;
  title: string;
  sub: string;
  href: string;
  group: string;
  /** Shown as a small chip on search results (where rows are ranked, not grouped). */
  tag?: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}

export function CommandPalette({ techs }: { techs: TechLite[] }) {
  const open = paletteStore.use();
  const setOpen = paletteStore.set;
  const router = useRouter();
  const tech = useContextTech(techs);
  const [query, setQuery] = useState("");
  const [data, setData] = useState<{ docs: SearchDoc[]; fuse: Fuse<SearchDoc> } | null>(null);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(0);
  const listId = useId();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open || data) return;
    loadIndex()
      .then((d) => {
        setData(d);
        setError(false);
      })
      .catch(() => setError(true));
  }, [open, data]);

  const items: Item[] = useMemo(() => {
    const q = query.trim();
    if (!q) {
      const quick: Item[] = tech
        ? [
            {
              key: "q-tree",
              title: "Tree",
              sub: `${tech.name}: all types and subtypes`,
              href: urls.tree(tech.slug),
              group: "Go to",
              icon: IconTree,
            },
            {
              key: "q-sheet",
              title: "Cheat sheet",
              sub: `${tech.name} on one page`,
              href: urls.cheatsheet(tech.slug),
              group: "Go to",
              icon: IconSheet,
            },
            {
              key: "q-quiz",
              title: "Quiz",
              sub: `${tech.name}: test yourself`,
              href: urls.quiz(tech.slug),
              group: "Go to",
              icon: IconCards,
            },
            {
              key: "q-gloss",
              title: "Glossary",
              sub: `${tech.name}: terms in one line`,
              href: urls.glossary(tech.slug),
              group: "Go to",
              icon: IconBook,
            },
          ]
        : [];
      const cards = (data?.docs ?? [])
        .filter((d) => d.kind === "card" && (!tech || d.tech === tech.slug))
        .slice(0, 6)
        .map((d) => ({
          key: d.key,
          title: d.title,
          sub: d.text,
          href: d.href,
          group: "Concepts",
          icon: IconCards,
        }));
      return [...quick, ...cards];
    }
    if (!data) return [];
    // Fuse finds candidates (with small typos); relevance() in src/lib/search.ts decides the
    // order, so an exact letter-for-letter title match always ranks first and fuzzy matches last.
    const scored = data.fuse
      .search(q, { limit: 60 })
      .map((r) => ({ doc: r.item, score: relevance(r.item, q, r.score ?? 1) }))
      .filter((s) => s.score > 0)
      .sort(
        (a, b) =>
          b.score - a.score ||
          // Ties: prefer the current tech, then the shorter (closer) title.
          Number(b.doc.tech === tech?.slug) - Number(a.doc.tech === tech?.slug) ||
          a.doc.title.length - b.doc.title.length,
      )
      .slice(0, 24);

    return scored.map(({ doc: d }) => ({
      key: d.key,
      title: d.title,
      sub: techs.length > 1 ? `${d.techName} · ${d.text}` : d.text,
      href: d.href,
      group: "Results",
      tag: KIND_LABEL[d.kind],
      icon: KIND_ICON[d.kind],
    }));
  }, [query, data, tech, techs.length]);

  // The group header shows on the first row of each group; precomputed here so render stays pure.
  const headerAt = useMemo(() => {
    const flags: (string | null)[] = [];
    let prev = "";
    for (const it of items) {
      flags.push(it.group !== prev ? it.group : null);
      prev = it.group;
    }
    return flags;
  }, [items]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (item: Item | undefined) => {
    if (!item) return;
    setOpen(false);
    setQuery("");
    router.push(item.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(items.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(items[active]);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay fixed inset-0 z-50 bg-[rgb(10_10_16/45%)]" />
        <Dialog.Content
          className="sheet-content fixed inset-x-2 top-2 z-50 mx-auto flex max-h-[calc(100dvh-16px)] max-w-2xl flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-lg)] sm:top-[12vh] sm:max-h-[70vh]"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Search</Dialog.Title>
          <div className="flex items-center gap-2 border-b border-line px-3">
            <IconSearch size={20} className="flex-none text-ink-3" />
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              placeholder="Search concepts, types, terms…"
              className="min-h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-3"
              role="combobox"
              aria-expanded={items.length > 0}
              aria-controls={listId}
              aria-activedescendant={items[active] ? `${listId}-${active}` : undefined}
              aria-autocomplete="list"
              aria-label="Search"
            />
            <Dialog.Close className="touch-target rounded-xl px-2 text-sm font-semibold text-ink-3 hover:text-ink">
              Esc
            </Dialog.Close>
          </div>
          <ul
            id={listId}
            ref={listRef}
            role="listbox"
            aria-label="Results"
            className="min-h-0 flex-1 overflow-y-auto p-2"
          >
            {items.map((item, i) => {
              const header = headerAt[i];
              const Icon = item.icon;
              return (
                <li key={item.key} role="presentation">
                  {header && (
                    <p
                      role="presentation"
                      className="px-3 pt-3 pb-1 text-xs font-bold tracking-wider text-ink-3 uppercase"
                    >
                      {header}
                    </p>
                  )}
                  <div
                    id={`${listId}-${i}`}
                    data-index={i}
                    role="option"
                    aria-selected={i === active}
                    onMouseMove={() => setActive(i)}
                    onClick={() => go(item)}
                    className={cx(
                      "flex min-h-12 cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5",
                      i === active ? "bg-accent-soft ring-1 ring-accent/60" : "hover:bg-surface-2",
                    )}
                  >
                    <Icon
                      size={18}
                      className={cx(
                        "mt-0.5 flex-none",
                        i === active ? "text-accent-ink" : "text-ink-3",
                      )}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-ink">{item.title}</span>
                      <span className="line-clamp-1 text-sm text-ink-2">{item.sub}</span>
                    </span>
                    {item.tag && (
                      <span className="mt-0.5 flex-none rounded-md bg-surface-2 px-1.5 py-0.5 text-[0.7rem] font-semibold text-ink-3">
                        {item.tag}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          {query.trim() && data && items.length === 0 && (
            <p className="px-5 pb-6 text-ink-2">
              No matches for “{query.trim()}”. Try a shorter word, like “cache” or “shard”.
            </p>
          )}
          {error && (
            <p className="px-5 pb-6 text-bad">
              The search index could not load. Check your connection and try again.
            </p>
          )}
          <p className="hidden border-t border-line px-4 py-2 text-xs text-ink-3 sm:block">
            <kbd className="font-mono">↑</kbd> <kbd className="font-mono">↓</kbd> to move ·{" "}
            <kbd className="font-mono">Enter</kbd> to open · <kbd className="font-mono">Esc</kbd> to
            close
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
