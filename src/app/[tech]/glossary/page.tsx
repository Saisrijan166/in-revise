import type { Metadata } from "next";
import { getDeck, getDecks } from "@/lib/content";
import { urls } from "@/lib/urls";
import { GlossaryList, type GlossaryEntry } from "@/components/deck/GlossaryList";
import { PageHeader } from "@/components/ui/Breadcrumbs";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDecks().map((d) => ({ tech: d.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[tech]/glossary">): Promise<Metadata> {
  const { tech } = await params;
  return {
    title: `Glossary (${getDeck(tech).name})`,
    description: "Interviewer terms in one line each.",
  };
}

export default async function GlossaryPage({ params }: PageProps<"/[tech]/glossary">) {
  const { tech } = await params;
  const deck = getDeck(tech);
  const entries: GlossaryEntry[] = deck.glossary.map((t) => {
    const see = t.see ? deck.cardById.get(t.see) : undefined;
    return {
      id: t.id,
      term: t.term,
      aka: t.aka,
      definition: t.definition,
      seeHref: see ? urls.concept(tech, see.meta.id) : undefined,
      seeTitle: see ? see.meta.title : undefined,
      sourceTitle: t.source.title,
      sourceUrl: t.source.url,
    };
  });
  return (
    <div className="mx-auto max-w-4xl px-4 pt-4 pb-12 sm:px-6 lg:px-10">
      <PageHeader
        crumbs={[
          { label: "Home", href: urls.home() },
          { label: deck.name, href: urls.overview(tech) },
          { label: "Glossary" },
        ]}
        title="Glossary"
        lead="Words an interviewer may use, in one line each. Terms inside concepts link here automatically."
      />
      <GlossaryList entries={entries} />
    </div>
  );
}
