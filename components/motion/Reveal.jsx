"use client";

import { motion } from "framer-motion";

import { useMotionPref } from "./MotionPreference";

/**
 * Scroll-triggered reveal.
 *
 * `from` sets which direction the content enters out of, so a page can
 * vary its rhythm instead of everything sliding up identically.
 *
 * The rendered element and its initial style are the same regardless of
 * the visitor's motion preference — only the duration collapses to zero.
 * Swapping the tag or dropping `initial` based on a client-only media
 * query causes hydration mismatches, because the server always guesses
 * the non-reduced branch.
 */
const FROM = {
  bottom: { y: 28, x: 0 },
  top: { y: -28, x: 0 },
  left: { x: -38, y: 0 },
  right: { x: 38, y: 0 },
  scale: { x: 0, y: 0, scale: 0.94 },
  fade: { x: 0, y: 0 },
};

export default function Reveal({
  children,
  as = "div",
  from = "bottom",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
  margin = "-70px",
}) {
  const reduced = useMotionPref();
  const MotionTag = motion[as] ?? motion.div;
  const offset = FROM[from] ?? FROM.bottom;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, margin }}
      /* Reduced motion keeps the fade but drops the travel to zero, so
         content still arrives rather than snapping into place. A plain
         cross-fade isn't the kind of movement the preference guards
         against — the sliding is. */
      transition={
        reduced
          ? {
              opacity: { duration: 0.45, delay: delay * 0.5 },
              x: { duration: 0 },
              y: { duration: 0 },
              scale: { duration: 0 },
            }
          : { duration, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </MotionTag>
  );
}
