"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DeckNav } from "@/lib/content";
import { urls } from "@/lib/urls";
import { cx, topicColor } from "@/lib/ui";
import { IconBook, IconCards, IconColumns, IconHome, IconMap, IconSheet } from "@/components/ui/icons";
import { ProgressBar } from "./ProgressBar";
import { StatusDot } from "./StatusDot";

/**
 * Deck navigation: tech → topic → card. Each topic is drawn as a transit line and
 * each card as a station whose marker shows your status.
 */
export function DeckNavList({ nav, onNavigate }: { nav: DeckNav; onNavigate?: () => void }) {
  const pathname = usePathname() ?? "";
  const tools = [
    { label: "Overview", href: urls.deck(nav.slug), icon: IconHome },
    { label: "Map", href: urls.map(nav.slug), icon: IconMap },
    { label: "Drill", href: urls.drill(nav.slug), icon: IconCards },
    { label: "Compare", href: urls.compareIndex(nav.slug), icon: IconColumns },
    { label: "Cheat sheets", href: urls.cheatsheetIndex(nav.slug), icon: IconSheet },
    { label: "Glossary", href: urls.glossary(nav.slug), icon: IconBook },
  ];
  const isActive = (href: string) => pathname === href || pathname === href.replace(/\/$/, "");

  return (
    <nav aria-label={`${nav.name} contents`} className="flex flex-col gap-5 p-4">
      <div>
        <Link href={urls.deck(nav.slug)} onClick={onNavigate} className="font-display text-lg font-extrabold text-ink hover:text-accent-ink">
          {nav.name}
        </Link>
        <ProgressBar tech={nav.slug} ids={nav.cardIds} compact className="mt-2" />
      </div>

      <ul className="grid grid-cols-2 gap-1">
        {tools.map((t) => {
          const Icon = t.icon;
          const active = isActive(t.href) || (t.label !== "Overview" && pathname.startsWith(t.href));
          return (
            <li key={t.label}>
              <Link
                href={t.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cx(
                  "flex min-h-11 items-center gap-2 rounded-xl px-2.5 text-sm font-semibold",
                  active ? "bg-accent-soft text-accent-ink" : "text-ink-2 hover:bg-surface-2 hover:text-ink",
                )}
              >
                <Icon size={17} /> {t.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col gap-4">
        {nav.topics.map((topic) => (
          <section key={topic.id} aria-labelledby={`nav-topic-${topic.id}`}>
            <h2 id={`nav-topic-${topic.id}`} className="mb-1.5 flex items-center gap-2 text-xs font-bold tracking-wider text-ink-3 uppercase">
              <span aria-hidden="true" className="h-1.5 w-5 rounded-full" style={{ background: topicColor(topic.index) }} />
              {topic.title}
            </h2>
            <ul className="relative ml-[9px] border-l-[3px] pl-0" style={{ borderColor: topicColor(topic.index) }}>
              {topic.cards.map((c) => {
                const active = isActive(c.href);
                return (
                  <li key={c.id} className="relative -ml-[10px]">
                    <Link
                      href={c.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cx(
                        "flex min-h-11 items-center gap-2.5 rounded-xl py-1.5 pr-2 pl-0 text-[0.95rem]",
                        active ? "font-bold text-ink" : "text-ink-2 hover:text-ink",
                      )}
                    >
                      <StatusDot tech={nav.slug} id={c.id} color={topicColor(topic.index)} size={17} />
                      <span className={cx("rounded-lg px-1.5 py-0.5", active && "bg-accent-soft")}>{c.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </nav>
  );
}
