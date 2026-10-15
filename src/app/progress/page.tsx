import type { Metadata } from "next";
import { getDecks } from "@/lib/content";
import { urls } from "@/lib/urls";
import { ProgressManager } from "@/components/site/ProgressManager";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = { title: "My progress" };

export default function ProgressPage() {
  const decks = getDecks().map((d) => ({
    slug: d.slug,
    name: d.name,
    accent: d.accent,
    cardIds: d.cards.map((c) => c.meta.id),
  }));
  return (
    <div className="mx-auto max-w-3xl px-4 pt-5 pb-12 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", href: urls.home() }, { label: "My progress" }]} />
      <h1 className="text-3xl font-extrabold sm:text-4xl">My progress</h1>
      <p className="mt-1 mb-6 text-ink-2">
        No account, no server: your marks are saved in this browser only.
      </p>
      <ProgressManager decks={decks} />
    </div>
  );
}
