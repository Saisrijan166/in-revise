"use client";

import { useEffect } from "react";
import { useHashId } from "./TreeNav";

/**
 * Tree page: highlight the node named in the URL (#node-id) and bring it into view.
 * Needed because in-app navigation does not update CSS :target.
 */
export function TreeTarget() {
  const id = useHashId();
  useEffect(() => {
    document.querySelectorAll("[data-hl]").forEach((el) => el.removeAttribute("data-hl"));
    if (!id) return;
    const el = document.getElementById(`node-${id}`);
    if (!el) return;
    el.setAttribute("data-hl", "");
    el.scrollIntoView({
      block: "center",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [id]);
  return null;
}
