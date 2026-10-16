import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDeck, getDecks } from "@/lib/content";
import { urls } from "@/lib/urls";
import { CompareView } from "@/components/compare/CompareView";
import { PageHeader } from "@/components/ui/Breadcrumbs";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().flatMap((d) => d.comparisons.map((c) => ({ tech: d.slug, id: c.id })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[tech]/compare/[id]">): Promise<Metadata> {
  const { tech, id } = await params;
  const c = getDeck(tech).comparisonById.get(id);
  return c ? { title: c.title, description: c.verdict } : {};
}

export default async function ComparePage({ params }: PageProps<"/[tech]/compare/[id]">) {
  const { tech, id } = await params;
  const deck = getDeck(tech);
  const c = deck.comparisonById.get(id);
  if (!c) notFound();
  return (
    <div className="mx-auto max-w-4xl px-4 pt-4 pb-12 sm:px-6 lg:px-10">
      <PageHeader
        crumbs={[
          { label: deck.name, href: urls.overview(tech) },
          { label: "Compare", href: urls.compareIndex(tech) },
          { label: c.title },
        ]}
        eyebrow="Often confused"
        title={c.title}
      />
      <CompareView deck={deck} c={c} />
    </div>
  );
}
