import type { Metadata } from "next";
import Link from "next/link";
import { getDeck, getDecks } from "@/lib/content";
import { urls } from "@/lib/urls";
import { topicColor } from "@/lib/ui";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { IconArrowRight } from "@/components/ui/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().map((d) => ({ tech: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[tech]/cheatsheet">): Promise<Metadata> {
  const { tech } = await params;
  return { title: `Cheat sheets (${getDeck(tech).name})` };
}

export default async function CheatSheetIndex({ params }: PageProps<"/[tech]/cheatsheet">) {
  const { tech } = await params;
  const deck = getDeck(tech);
  return (
    <div className="mx-auto max-w-4xl px-4 pt-5 pb-12 sm:px-6 lg:px-10">
      <Breadcrumbs items={[{ label: "Home", href: urls.home() }, { label: deck.name, href: urls.deck(tech) }, { label: "Cheat sheets" }]} />
      <h1 className="text-3xl font-extrabold sm:text-4xl">Cheat sheets</h1>
      <p className="mt-1 mb-6 text-ink-2">One page per topic: each idea in one line, a tiny example, then the rules and the common mistake. Print-friendly.</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {deck.topics.map((t) => {
          const cards = deck.cards.filter((c) => c.meta.topic === t.id);
          return (
            <li key={t.id}>
              <Link href={urls.cheatsheet(tech, t.id)} className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 hover:border-accent">
                <span className="flex items-center gap-2.5 font-display text-xl font-bold group-hover:text-accent-ink">
                  <span aria-hidden="true" className="h-2.5 w-7 rounded-full" style={{ background: topicColor(t.index) }} />
                  {t.title}
                </span>
                <span className="mt-1 text-sm text-ink-3">{cards.map((c) => c.meta.title).join(" · ")}</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-bold text-accent-ink">
                  Open sheet <IconArrowRight size={15} />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
