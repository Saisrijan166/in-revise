import { getDeck, getDecks, techNav } from "@/lib/content";
import { NavSheet } from "@/components/nav/NavSheet";
import { SidebarShell } from "@/components/nav/SidebarShell";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().map((d) => ({ tech: d.slug }));
}

/**
 * Tech shell. Desktop: a collapsible left sidebar with the study mode (Learn / Revise / Quiz)
 * and the whole tree. Phones and tablets: the same in a sheet (Topics tab / menu button).
 */
export default async function TechLayout({ children, params }: LayoutProps<"/[tech]">) {
  const { tech } = await params;
  const deck = getDeck(tech);
  const nav = techNav(deck);
  const techs = getDecks().map((d) => ({ slug: d.slug, name: d.name, accent: d.accent }));
  return (
    <div data-accent={deck.accent}>
      <SidebarShell nav={nav}>{children}</SidebarShell>
      <NavSheet nav={nav} techs={techs} />
    </div>
  );
}
