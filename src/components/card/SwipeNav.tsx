"use client";

import { useRouter } from "next/navigation";
import { useRef, type ReactNode } from "react";

interface Target {
  href: string;
  title: string;
}

/**
 * Horizontal swipe between cards of the same topic (touch only). Ignores swipes that start
 * inside scrollable boxes (tables, code, diagrams) and mostly-vertical gestures.
 */
export function SwipeNav({ prev, next, children }: { prev: Target | null; next: Target | null; children: ReactNode }) {
  const router = useRouter();
  const start = useRef<{ x: number; y: number; t: number } | null>(null);

  return (
    <div
      className="min-w-0"
      onTouchStart={(e) => {
        const target = e.target as HTMLElement;
        if (e.touches.length !== 1 || target.closest(".scroll-box, [data-no-swipe], input, textarea, button[role=slider]")) {
          start.current = null;
          return;
        }
        const t = e.touches[0];
        start.current = { x: t.clientX, y: t.clientY, t: Date.now() };
      }}
      onTouchEnd={(e) => {
        const s = start.current;
        start.current = null;
        if (!s) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - s.x;
        const dy = t.clientY - s.y;
        if (Date.now() - s.t > 700 || Math.abs(dx) < 70 || Math.abs(dy) > Math.abs(dx) * 0.6) return;
        if (window.getSelection()?.toString()) return;
        const dest = dx < 0 ? next : prev;
        if (dest) router.push(dest.href);
      }}
    >
      {children}
    </div>
  );
}
