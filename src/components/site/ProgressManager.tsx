"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { countStatuses, exportProgress, parseProgress, useHydrated, useProgress, type ProgressData } from "@/lib/store/progress";
import { cardKey, urls } from "@/lib/urls";
import { IconDownload, IconTrash, IconUpload } from "@/components/ui/icons";
import { ProgressBar } from "@/components/deck/ProgressBar";

interface DeckLite {
  slug: string;
  name: string;
  accent: string;
  cardIds: string[];
}

/** Progress overview plus JSON export / import / reset (CLAUDE.md 5.6). Everything stays in this browser. */
export function ProgressManager({ decks }: { decks: DeckLite[] }) {
  const hydrated = useHydrated();
  const statuses = useProgress((s) => s.statuses);
  const bookmarks = useProgress((s) => s.bookmarks);
  const importData = useProgress((s) => s.importData);
  const reset = useProgress((s) => s.reset);
  const [pending, setPending] = useState<ProgressData | null>(null);
  const [message, setMessage] = useState<{ tone: "good" | "bad"; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const download = () => {
    const blob = new Blob([exportProgress()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    const d = new Date();
    const stamp = `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
    a.download = `concept-map-progress-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
    setMessage({ tone: "good", text: "Progress file downloaded." });
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    if (file.size > 2_000_000) {
      setMessage({ tone: "bad", text: "That file is too large to be a progress export." });
      return;
    }
    const result = parseProgress(await file.text());
    if (!result.ok) setMessage({ tone: "bad", text: result.error });
    else {
      setPending(result.data);
      setMessage(null);
    }
    if (fileRef.current) fileRef.current.value = "";
  };

  const marked = Object.keys(statuses).length;

  return (
    <div className="flex flex-col gap-8">
      <section aria-labelledby="decks-progress">
        <h2 id="decks-progress" className="mb-3 text-xl font-extrabold">
          By deck
        </h2>
        <ul className="flex flex-col gap-3">
          {decks.map((d) => {
            const c = countStatuses(hydrated ? statuses : {}, d.cardIds.map((id) => cardKey(d.slug, id)));
            const saved = hydrated ? d.cardIds.filter((id) => bookmarks[cardKey(d.slug, id)]).length : 0;
            return (
              <li key={d.slug} data-accent={d.accent} className="rounded-2xl border border-line bg-surface p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <Link href={urls.deck(d.slug)} className="font-display text-lg font-bold hover:text-accent-ink">
                    {d.name}
                  </Link>
                  <Link href={urls.review(d.slug)} className="text-sm font-semibold text-accent-ink underline underline-offset-2">
                    Review shaky cards
                  </Link>
                </div>
                <ProgressBar tech={d.slug} ids={d.cardIds} className="mt-2" />
                {hydrated && (
                  <p className="mt-1 text-sm text-ink-3">
                    {c.unmarked} not marked · {saved} saved
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="backup" className="rounded-2xl border border-line bg-surface p-5">
        <h2 id="backup" className="text-xl font-extrabold">
          Back up or move your progress
        </h2>
        <p className="mt-1 text-ink-2">
          Progress lives only in this browser. Export it as a file to keep a copy or move it to another device, then import it there.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={download}
            disabled={!hydrated}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-4 font-bold text-on-accent disabled:opacity-50"
          >
            <IconDownload size={18} /> Export JSON
          </button>
          <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border-2 border-line px-4 font-bold text-ink-2 focus-within:outline focus-within:outline-3 focus-within:outline-accent hover:text-ink">
            <IconUpload size={18} /> Import JSON
            <input ref={fileRef} type="file" accept="application/json,.json" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
        </div>

        {pending && (
          <div className="mt-4 rounded-xl border-2 border-accent bg-accent-soft p-4" role="alertdialog" aria-label="Confirm import">
            <p className="font-semibold text-ink">
              The file has {Object.keys(pending.statuses).length} marked cards and {Object.keys(pending.bookmarks).length} saved cards. How should it be applied?
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className="min-h-11 rounded-xl bg-accent px-4 font-bold text-on-accent"
                onClick={() => {
                  importData(pending, "merge");
                  setPending(null);
                  setMessage({ tone: "good", text: "Imported and merged with your current progress." });
                }}
              >
                Merge (file wins on conflicts)
              </button>
              <button
                type="button"
                className="min-h-11 rounded-xl border-2 border-line bg-surface px-4 font-bold text-ink-2 hover:text-ink"
                onClick={() => {
                  importData(pending, "replace");
                  setPending(null);
                  setMessage({ tone: "good", text: "Imported. Your previous progress was replaced." });
                }}
              >
                Replace everything
              </button>
              <button type="button" className="min-h-11 rounded-xl px-3 font-semibold text-ink-3 hover:text-ink" onClick={() => setPending(null)}>
                Cancel
              </button>
            </div>
          </div>
        )}
        {message && (
          <p role="status" className={message.tone === "good" ? "mt-3 font-semibold text-good" : "mt-3 font-semibold text-bad"}>
            {message.text}
          </p>
        )}
      </section>

      <section aria-labelledby="reset" className="rounded-2xl border border-dashed border-line-strong p-5">
        <h2 id="reset" className="text-lg font-extrabold">
          Start over
        </h2>
        <p className="mt-1 text-ink-2">Clears every mark, bookmark and &quot;continue&quot; point in this browser. Export first if you might want it back.</p>
        <button
          type="button"
          disabled={!hydrated || (marked === 0 && Object.keys(bookmarks).length === 0)}
          onClick={() => {
            if (window.confirm("Clear all progress in this browser? This cannot be undone.")) {
              reset();
              setMessage({ tone: "good", text: "Progress cleared." });
            }
          }}
          className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-bad px-4 font-bold text-bad hover:bg-bad-soft disabled:opacity-40"
        >
          <IconTrash size={18} /> Clear progress
        </button>
      </section>
    </div>
  );
}
