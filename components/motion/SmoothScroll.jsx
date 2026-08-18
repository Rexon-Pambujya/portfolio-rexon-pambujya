"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Lenis smooth scroll. Roughly 3 KB and the single biggest change to how
 * the site feels.
 *
 * Deliberately disabled when the visitor asks for reduced motion, and on
 * coarse pointers — momentum scrolling on iOS is already good and Lenis
 * fights it.
 */
export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    if (reduced.matches || coarse.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // in-page anchors have to go through Lenis or they jump
    const onClick = (e) => {
      const anchor = e.target.closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /**
   * Reset to the top through Lenis, not through the window.
   *
   * Lenis tracks its own scroll position, so a bare window.scrollTo(0, 0)
   * left the two disagreeing and Lenis eased back toward where it thought
   * it was — measured as the new page's heading drifting ~28px upward
   * over more than a second after it had already painted. `immediate`
   * makes it a jump rather than an animation, and resize() re-measures
   * because the incoming route is a different height.
   */
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
