"use client";

import { useEffect, useState } from "react";

/**
 * Decides whether the hero video is allowed to download.
 *
 * The video must never be the LCP element and must never cost a visitor
 * on cellular several MB they did not ask for. So it only attaches once
 * ALL of these hold:
 *
 *   - the page has painted (we wait for load + one idle callback)
 *   - the visitor has not asked for reduced motion
 *   - Data Saver is off
 *   - the connection is not 2g/3g
 *   - on a coarse pointer (phone/tablet) the connection reports wifi-class
 *     downlink, otherwise the poster is the whole experience
 *
 * Returns false forever if `enabled` is false, so callers can skip all of
 * this when no video is configured.
 */
export default function useHeroVideo(enabled) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const conn =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    if (conn?.saveData) return;

    const slow = /(^|-)(2g|slow-2g|3g)$/.test(conn?.effectiveType ?? "");
    if (slow) return;

    // Phones and tablets only get the video on a genuinely fast link.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) {
      const downlink = conn?.downlink ?? 0;
      // No Network Information API (Safari) → stay on the poster.
      if (downlink < 5) return;
    }

    let idleHandle;
    let cancelled = false;

    const schedule = () => {
      if (cancelled) return;
      const run = () => !cancelled && setShouldLoad(true);
      if ("requestIdleCallback" in window) {
        idleHandle = window.requestIdleCallback(run, { timeout: 2500 });
      } else {
        idleHandle = window.setTimeout(run, 1200);
      }
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      if (idleHandle == null) return;
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleHandle);
      else window.clearTimeout(idleHandle);
    };
  }, [enabled]);

  return shouldLoad;
}
