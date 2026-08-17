"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { useMotionPref } from "./MotionPreference";

/**
 * Wave curtain that draws off the screen after a route change.
 *
 * Lives in the layout rather than template.jsx on purpose. template.jsx
 * re-mounts on every navigation, so it has no stable place to remember
 * whether this is the first load — the obvious fix, a module-level flag
 * set during render, breaks hydration outright because React renders
 * twice in development and the second pass sees a different value.
 * usePathname in a component that never unmounts gives a real answer.
 *
 * Nothing renders on first load: covering the page on first paint would
 * make the curtain the LCP element.
 */
export default function RouteCurtain() {
  const pathname = usePathname();
  const previous = useRef(null);
  const [run, setRun] = useState(0);
  const reduced = useMotionPref();

  useEffect(() => {
    // first commit — record where we are, don't animate
    if (previous.current === null) {
      previous.current = pathname;
      return;
    }
    if (previous.current === pathname) return;
    previous.current = pathname;
    setRun((n) => n + 1);
  }, [pathname]);

  if (run === 0) return null;

  return (
    <motion.div
      key={run}
      aria-hidden
      data-route-curtain=""
      className="pointer-events-none fixed inset-0 z-[65]"
      /* Reduced motion cross-fades rather than travelling. Returning null
         removed the transition entirely, which is a worse answer than a
         movement-free one. */
      initial={reduced ? { opacity: 1 } : { y: 0 }}
      animate={reduced ? { opacity: 0 } : { y: "-102%" }}
      /* Strong ease-OUT, not ease-in-out. The curtain only mounts once
         the new route is already rendered behind it, so any time it
         spends fully covering is latency this adds rather than hides.
         Moving immediately and clearing fast reads as a wipe; a slow
         start reads as the page being stuck. */
      transition={{ duration: reduced ? 0.4 : 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-curtain-from to-curtain-to" />

      {/* crest trailing the bottom edge, so it reads as water draining off
          the screen rather than a rectangle sliding away */}
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-full h-[9vh] w-full text-curtain-to"
      >
        <path
          d="M0 0 Q100 92 200 40 T400 42 T600 8 T800 44 T1000 22 T1200 0 V0 H0 Z"
          fill="currentColor"
        />
      </svg>
    </motion.div>
  );
}
