import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDeck, getDecks } from "@/lib/content";
import { renderCard } from "@/lib/content/render";
import { urls } from "@/lib/urls";
import { topicColor } from "@/lib/ui";
import { ReviseBody } from "@/components/card/Blocks";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PrintButton } from "@/components/ui/PrintButton";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().flatMap((d) => d.topics.map((t) => ({ tech: d.slug, topic: t.id })));
}

export async function generateMetadata({ params }: PageProps<"/[tech]/cheatsheet/[topic]">): Promise<Metadata> {
  const { tech, topic } = await params;
  const deck = getDeck(tech);
  const t = deck.topics.find((x) => x.id === topic);
  return { title: `${t?.title ?? "Topic"} cheat sheet (${deck.name})` };
}

/** Topic cheat sheet (CLAUDE.md 5.2 #6): topic → subtopics with one-line definitions → example, then the Revise view. */
export default async function CheatSheetPage({ params }: PageProps<"/[tech]/cheatsheet/[topic]">) {
  const { tech, topic: topicId } = await params;
  const deck = getDeck(tech);
  const topic = deck.topics.find((t) => t.id === topicId);
  if (!topic) notFound();
  const cards = deck.cards.filter((c) => c.meta.topic === topic.id);
  const rendered = await Promise.all(cards.map((c) => renderCard(deck, c)));

  return (
    <div className="mx-auto max-w-4xl px-4 pt-5 pb-12 sm:px-6 lg:px-10 print:max-w-none print:p-0">
      <Breadcrumbs
        items={[
          { label: "Home", href: urls.home() },
          { label: deck.name, href: urls.deck(tech) },
          { label: "Cheat sheets", href: urls.cheatsheetIndex(tech) },
          { label: topic.title },
        ]}
      />
      <header className="flex flex-wrap items-end justify-between gap-3 border-b-4 pb-4" style={{ borderColor: topicColor(topic.index) }}>
        <div>
          <p className="text-xs font-bold tracking-widest text-ink-3 uppercase">{deck.name} · cheat sheet</p>
          <h1 className="text-3xl font-extrabold sm:text-4xl">{topic.title}</h1>
          {topic.blurb && <p className="mt-1 text-ink-2">{topic.blurb}</p>}
        </div>
        <PrintButton />
      </header>

      <nav aria-label="In this sheet" className="no-print mt-4">
        <ol className="flex flex-wrap gap-2 text-sm">
          {cards.map((c, i) => (
            <li key={c.meta.id}>
              <a href={`#cs-${c.meta.id}`} className="inline-flex min-h-10 items-center rounded-full border border-line bg-surface px-3 font-semibold text-ink-2 hover:text-ink">
                {i + 1}. {c.meta.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-6 flex flex-col gap-6">
        {cards.map((c, i) => {
          const r = rendered[i];
          return (
            <article key={c.meta.id} id={`cs-${c.meta.id}`} className="print-card scroll-mt-32 rounded-3xl border border-line bg-surface p-5 print:rounded-none print:border-0 print:border-t print:p-0 print:pt-4">
              <h2 className="text-2xl font-extrabold">
                <span className="text-accent">{i + 1}.</span>{" "}
                <Link href={urls.card(tech, c.meta.id)} className="hover:text-accent-ink">
                  {c.meta.title}
                </Link>
              </h2>
              <p className="mt-1 font-display text-lg leading-snug font-semibold text-ink">{c.meta.hook}</p>
              {r.example && (
                <div className="mt-4">
                  <h3 className="mb-2 text-base font-extrabold text-ink-2">Example</h3>
                  <div className="prose-card">{r.example}</div>
                </div>
              )}
              <div className="mt-4">
                <ReviseBody r={r} />
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-8 hidden text-xs text-ink-3 print:block">Printed from Concept Map · {deck.name} · {topic.title}</p>
    </div>
  );
}
