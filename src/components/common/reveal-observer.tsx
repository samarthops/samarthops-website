"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Reveals `[data-reveal]` blocks once as they near the viewport. Respects reduced motion. */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const blocks = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (blocks.length === 0) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return; // blocks stay visible
    }
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
