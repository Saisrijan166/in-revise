"use client";

/** Expand / collapse every section in the full cheat sheet. */
export function CheatDocControls() {
  function setAll(open: boolean) {
    document
      .querySelectorAll<HTMLDetailsElement>("details[data-cs]")
      .forEach((d) => (d.open = open));
  }
  const btn =
    "rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-ink-2 hover:border-line-strong hover:text-ink";
  return (
    <div className="flex gap-2 print:hidden">
      <button type="button" className={btn} onClick={() => setAll(true)}>
        Expand all
      </button>
      <button type="button" className={btn} onClick={() => setAll(false)}>
        Collapse all
      </button>
    </div>
  );
}
