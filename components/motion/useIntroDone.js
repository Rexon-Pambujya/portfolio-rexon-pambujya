"use client";

import { useEffect, useState } from "react";

/**
 * True once the intro curtain has lifted.
 *
 * The hero's entrance animations used to start on mount, which put them
 * in a race with hydration and with the curtain: they ran while still
 * covered, and the tagline was measured going 0.79 -> 0.00 -> 1.00 as
 * the two interleaved. Giving them a single, well-defined start removes
 * the race and means the reveal is actually seen rather than played to
 * nobody behind the cover.
 *
 * Latched as well as evented, since the curtain can finish before a
 * consumer subscribes.
 *
 * Returns false on the server and on the first client render, so
 * hydration matches; the safety timeout guarantees the hero animates
 * even if the curtain never reports.
 */
export default function useIntroDone(safetyMs = 6000) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.__introDone) {
      setDone(true);
      return;
    }

    const onDone = () => setDone(true);
    window.addEventListener("intro:done", onDone, { once: true });
    const t = setTimeout(() => setDone(true), safetyMs);

    return () => {
      window.removeEventListener("intro:done", onDone);
      clearTimeout(t);
    };
  }, [safetyMs]);

  return done;
}
