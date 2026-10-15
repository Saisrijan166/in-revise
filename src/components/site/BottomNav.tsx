"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import { useUi } from "@/lib/store/ui";
import { urls } from "@/lib/urls";
import { cx } from "@/lib/ui";
import { IconCards, IconHome, IconMap, IconSearch } from "@/components/ui/icons";
import { useContextTech, type TechLite } from "./useCurrentTech";

/** Mobile tab bar (CLAUDE.md 5.4): Home, Map, Drill, Search. Hidden from md up. */
export function BottomNav({ techs }: { techs: TechLite[] }) {
  const pathname = usePathname() ?? "/";
  const tech = useContextTech(techs);
  const paletteOpen = useUi((s) => s.paletteOpen);

  const tabs: { label: string; href?: string; icon: ComponentType<{ size?: number }>; active: boolean; onClick?: () => void }[] = [
    { label: "Home", href: urls.home(), icon: IconHome, active: pathname === "/" },
    { label: "Map", href: tech ? urls.map(tech.slug) : undefined, icon: IconMap, active: /\/map\/?$/.test(pathname) },
    { label: "Drill", href: tech ? urls.drill(tech.slug) : undefined, icon: IconCards, active: /\/drill\/?$/.test(pathname) },
    { label: "Search", icon: IconSearch, active: paletteOpen, onClick: () => useUi.getState().setPaletteOpen(true) },
  ];

  return (
    <nav
      aria-label="Main"
      className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-line bg-[color-mix(in_oklab,var(--surface)_94%,transparent)] pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {tabs.map((t) => {
          const Icon = t.icon;
          const inner = (
            <>
              <span
                className={cx(
                  "grid h-8 w-14 place-items-center rounded-full transition-colors",
                  t.active ? "bg-accent-soft text-accent-ink" : "text-ink-3",
                )}
              >
                <Icon size={21} />
              </span>
              <span className={cx("text-[0.72rem] font-semibold", t.active ? "text-ink" : "text-ink-3")}>{t.label}</span>
            </>
          );
          const cls = "flex min-h-16 w-full flex-col items-center justify-center gap-0.5";
          return (
            <li key={t.label}>
              {t.href ? (
                <Link href={t.href} className={cls} aria-current={t.active ? "page" : undefined}>
                  {inner}
                </Link>
              ) : (
                <button type="button" className={cls} onClick={t.onClick} aria-label="Search">
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
