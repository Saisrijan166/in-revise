import type { ComponentType, ReactNode } from "react";
import type { RenderedCard } from "@/lib/content/render";
import { cx } from "@/lib/ui";
import { IconAlert, IconCheck, IconClose, IconQuote } from "@/components/ui/icons";

/** Card building blocks shared by the concept page, cheat sheets and the review list. */

export function Section({
  id,
  title,
  show,
  icon: Icon,
  children,
  className,
}: {
  id: string;
  title: string;
  show?: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section data-show={show} aria-labelledby={id} className={cx("mt-9 scroll-mt-32", className)}>
      <h2 id={id} className="mb-3 flex items-center gap-2 text-[1.35rem] font-extrabold text-ink">
        {Icon && <Icon size={20} className="text-accent" />}
        {title}
      </h2>
      {children}
    </section>
  );
}

export function CanCannot({
  can,
  cannot,
  compact,
}: {
  can?: ReactNode;
  cannot?: ReactNode;
  compact?: boolean;
}) {
  if (!can && !cannot) return null;
  return (
    <div className={cx("grid gap-3", !compact && "sm:grid-cols-2")}>
      {can && (
        <div className="rounded-2xl border border-line bg-surface p-4">
          <p className="mb-2 flex items-center gap-2 font-display font-bold text-good">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-good-soft">
              <IconCheck size={15} />
            </span>
            Can
          </p>
          <div className="prose-card text-[1rem] [&_ul>li::before]:border-good">{can}</div>
        </div>
      )}
      {cannot && (
        <div className="rounded-2xl border border-line bg-surface p-4">
          <p className="mb-2 flex items-center gap-2 font-display font-bold text-bad">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-bad-soft">
              <IconClose size={15} />
            </span>
            Cannot
          </p>
          <div className="prose-card text-[1rem] [&_ul>li::before]:border-bad">{cannot}</div>
        </div>
      )}
    </div>
  );
}

/** The label doubles as the section heading when `headingId` is given (no repeated titles). */
function BoxLabel({
  id,
  className,
  children,
}: {
  id?: string;
  className: string;
  children: ReactNode;
}) {
  return id ? (
    <h2 id={id} className={cx(className, "scroll-mt-32 font-sans")}>
      {children}
    </h2>
  ) : (
    <p className={className}>{children}</p>
  );
}

export function MistakeBox({ children, headingId }: { children: ReactNode; headingId?: string }) {
  return (
    <div className="rounded-2xl border border-[color-mix(in_oklab,var(--warn)_45%,var(--line))] bg-warn-soft p-4">
      <BoxLabel
        id={headingId}
        className="mb-1.5 flex items-center gap-2 text-sm font-bold tracking-wide text-warn uppercase"
      >
        <IconAlert size={17} /> Mistake alert: the common wrong answer
      </BoxLabel>
      <div className="prose-card">{children}</div>
    </div>
  );
}

export function SayItBox({ children, headingId }: { children: ReactNode; headingId?: string }) {
  return (
    <div className="relative rounded-2xl bg-accent-soft p-4 pl-12">
      <IconQuote size={22} className="absolute top-4 left-4 text-accent" />
      <BoxLabel
        id={headingId}
        className="mb-1 text-sm font-bold tracking-wide text-accent-ink uppercase"
      >
        Say it like this
      </BoxLabel>
      <blockquote className="prose-card font-medium text-ink [&_p]:m-0">{children}</blockquote>
    </div>
  );
}

/** The Revise view of a card: rules, can/cannot, mistake, say-it. Hook is shown by the caller. */
export function ReviseBody({ r, headingLevel = 3 }: { r: RenderedCard; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="flex flex-col gap-4">
      {r.rules && (
        <div>
          <H className="mb-2 text-base font-extrabold text-ink-2">Rules & defaults</H>
          <div className="prose-card">{r.rules}</div>
        </div>
      )}
      <CanCannot can={r.can} cannot={r.cannot} />
      {r.mistake && <MistakeBox>{r.mistake}</MistakeBox>}
      {r.sayIt && <SayItBox>{r.sayIt}</SayItBox>}
    </div>
  );
}
