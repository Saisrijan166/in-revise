/** inrevise mark: two lines meeting at an interchange, the way concepts connect. */
export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        d="M4 24 L13 15 L28 15"
        fill="none"
        stroke="var(--t1)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 5 L13 15 L19 27"
        fill="none"
        stroke="var(--t2)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="13" cy="15" r="5.2" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.6" />
      <circle cx="28" cy="15" r="2.6" fill="var(--surface)" stroke="var(--t1)" strokeWidth="2.2" />
    </svg>
  );
}

/** "inrevise" = interview + revise. `compact` hides the word on small screens (mark only). */
export function Wordmark({ compact }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <LogoMark />
      <span
        className={
          compact
            ? "hidden font-display text-[1.2rem] leading-none font-extrabold tracking-tight text-ink sm:inline"
            : "font-display text-[1.2rem] leading-none font-extrabold tracking-tight text-ink"
        }
      >
        <span className="text-accent">in</span>revise
      </span>
    </span>
  );
}
