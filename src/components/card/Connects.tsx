import Link from "next/link";
import type { Card, Deck } from "@/lib/content/load";
import { urls } from "@/lib/urls";
import { topicColor } from "@/lib/ui";
import { IconColumns, IconMap } from "@/components/ui/icons";
import { StatusDot } from "@/components/deck/StatusDot";

/** "Connects to" panel (CLAUDE.md 3.4): needs, leads to, related, confused with, and the story step. */
export function ConnectsPanel({ deck, card }: { deck: Deck; card: Card }) {
  const m = card.meta;
  const groups: { title: string; hint: string; ids: string[] }[] = [
    { title: "Learn first", hint: "You need these to follow this card", ids: m.needs },
    { title: "Learn next", hint: "Where this leads", ids: m.leadsTo },
    { title: "Same family", hint: "Related ideas", ids: m.related },
  ];
  const comparisons = m.confusedWith.map((id) => deck.comparisonById.get(id)!).filter(Boolean);
  const steps = deck.spine.filter((s) => s.cards.includes(m.id));

  return (
    <div className="flex flex-col gap-5">
      <p className="font-display text-lg font-extrabold">Connects to</p>
      {groups
        .filter((g) => g.ids.length)
        .map((g) => (
          <section key={g.title} aria-label={g.title}>
            <p className="text-xs font-bold tracking-wider text-ink-3 uppercase">{g.title}</p>
            <p className="mb-2 text-xs text-ink-3">{g.hint}</p>
            <ul className="flex flex-col gap-1.5">
              {g.ids.map((id) => {
                const c = deck.cardById.get(id)!;
                const topic = deck.topics.find((t) => t.id === c.meta.topic)!;
                return (
                  <li key={id}>
                    <Link
                      href={urls.card(deck.slug, id)}
                      className="group flex min-h-11 items-start gap-2.5 rounded-xl border border-line bg-surface px-3 py-2 hover:border-line-strong"
                    >
                      <span className="mt-1">
                        <StatusDot tech={deck.slug} id={id} color={topicColor(topic.index)} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold text-ink group-hover:text-accent-ink">
                          {c.meta.title}
                        </span>
                        <span className="line-clamp-2 text-sm text-ink-2">{c.meta.hook}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

      {comparisons.length > 0 && (
        <section aria-label="Often confused">
          <p className="mb-2 text-xs font-bold tracking-wider text-ink-3 uppercase">
            Often confused
          </p>
          <ul className="flex flex-col gap-1.5">
            {comparisons.map((c) => (
              <li key={c.id}>
                <Link
                  href={urls.compare(deck.slug, c.id)}
                  className="group flex min-h-11 items-start gap-2.5 rounded-xl border border-dashed border-line-strong bg-surface px-3 py-2 hover:border-accent"
                >
                  <IconColumns size={18} className="mt-0.5 flex-none text-accent" />
                  <span className="min-w-0">
                    <span className="block font-semibold text-ink group-hover:text-accent-ink">
                      {c.title}
                    </span>
                    <span className="line-clamp-2 text-sm text-ink-2">{c.verdict}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {steps.length > 0 && (
        <section aria-label="On the story">
          <p className="mb-2 text-xs font-bold tracking-wider text-ink-3 uppercase">On the story</p>
          {steps.map((s) => (
            <Link
              key={s.index}
              href={`${urls.deck(deck.slug)}#story-${s.index + 1}`}
              className="flex gap-3 rounded-xl border border-line bg-surface px-3 py-2.5 hover:border-line-strong"
            >
              <span className="grid h-7 w-7 flex-none place-items-center rounded-full border-[3px] border-accent font-display text-xs font-bold text-accent-ink">
                {s.index + 1}
              </span>
              <span className="text-sm">
                <span className="text-ink-2">{s.problem}</span>
                <span className="block font-semibold text-ink">→ {s.fix}</span>
              </span>
            </Link>
          ))}
        </section>
      )}

      <Link
        href={urls.map(deck.slug, m.id)}
        className="inline-flex min-h-11 items-center gap-2 self-start rounded-xl bg-accent-soft px-3 text-sm font-bold text-accent-ink hover:bg-accent hover:text-on-accent"
      >
        <IconMap size={17} /> See it on the map
      </Link>
    </div>
  );
}
