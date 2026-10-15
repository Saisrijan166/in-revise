import type { Metadata } from "next";
import Link from "next/link";
import { getDeck, getDecks } from "@/lib/content";
import { urls } from "@/lib/urls";
import { resolveSide } from "@/components/compare/CompareView";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { IconArrowRight, IconColumns } from "@/components/ui/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().map((d) => ({ tech: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[tech]/compare">): Promise<Metadata> {
  const { tech } = await params;
  return { title: `Compare (${getDeck(tech).name})` };
}

export default async function CompareIndexPage({ params }: PageProps<"/[tech]/compare">) {
  const { tech } = await params;
  const deck = getDeck(tech);
  return (
    <div className="mx-auto max-w-5xl px-4 pt-5 pb-12 sm:px-6 lg:px-10">
      <Breadcrumbs items={[{ label: "Home", href: urls.home() }, { label: deck.name, href: urls.deck(tech) }, { label: "Compare" }]} />
      <h1 className="text-3xl font-extrabold sm:text-4xl">Often confused</h1>
      <p className="mt-1 mb-6 text-ink-2">Pairs that people mix up in interviews, side by side, with a one-line verdict.</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {deck.comparisons.map((c) => (
          <li key={c.id}>
            <Link href={urls.compare(tech, c.id)} className="group flex h-full flex-col rounded-2xl border border-dashed border-line-strong bg-surface p-5 hover:border-accent">
              <span className="flex items-center gap-2 font-display text-xl font-bold group-hover:text-accent-ink">
                <IconColumns size={20} className="text-accent" /> {c.title}
              </span>
              <span className="mt-1 text-sm text-ink-3">{c.compares.map((id) => resolveSide(deck, id).title).join(" · ")} · {c.rows.length} aspects</span>
              <span className="mt-2 text-ink-2">{c.verdict}</span>
              <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-bold text-accent-ink">
                Side by side <IconArrowRight size={15} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
