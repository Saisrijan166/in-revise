"use client";

import { useEffect, type ReactNode } from "react";
import { useCurrentTech, type TechLite } from "./useCurrentTech";

/**
 * Applies the current deck's accent colour. The wrapper is correct in server HTML; the effect
 * mirrors it onto <html> so portalled dialogs and popovers (rendered in <body>) match too.
 */
export function AccentScope({ techs, children }: { techs: TechLite[]; children: ReactNode }) {
  const tech = useCurrentTech(techs);
  const accent = tech?.accent ?? techs[0]?.accent ?? "blue";
  useEffect(() => {
    document.documentElement.dataset.accent = accent;
  }, [accent]);
  return (
    <div data-accent={accent} className="flex min-h-dvh flex-col">
      {children}
    </div>
  );
}
