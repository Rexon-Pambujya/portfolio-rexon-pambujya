"use client";

import { motion, useScroll, useSpring } from "framer-motion";

import { useMotionPref } from "./MotionPreference";

/**
 * Page-progress bar pinned to the top edge.
 *
 * Was a right-edge span driven by a resize/scroll hook and a 700ms CSS
 * transition, which lagged noticeably. A spring on scrollYProgress tracks
 * the real position and costs no layout work.
 */
export default function ScrollProgress() {
  const reduced = useMotionPref();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: reduced ? scrollYProgress : scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left
                 bg-gradient-to-r from-primary to-lantern"
    />
  );
}
