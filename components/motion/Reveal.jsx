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
/**
 * Travel is deliberately short. At 28px the movement was long enough to
 * read as the text shaking into place rather than easing in, especially
 * for anything already near the viewport when it triggers.
 *
 * For anything on screen the moment a page opens, don't reach for `fade`
 * — pass `immediate`. `fade` still server-renders at opacity 0, so the
 * text is invisible until the observer fires, which reads as a blink.
 */
const FROM = {
  bottom: { y: 10, x: 0 },
  top: { y: -10, x: 0 },
  left: { x: -14, y: 0 },
  right: { x: 14, y: 0 },
  scale: { x: 0, y: 0, scale: 0.98 },
  fade: { x: 0, y: 0 },
};

export default function Reveal({
  children,
  as = "div",
  from = "bottom",
  delay = 0,
  duration = 0.45,
  className = "",
  once = true,
  /* A full screen of lead time on the bottom edge, so the entrance is
     over well before the element is in front of you.

     The old -70px did the exact opposite — nothing moved until it was
     already 70px *inside* the viewport, so you sat and watched every
     block fade up. Measured at 160px it was still being caught
     mid-flight, because arriving at a section fast covers that in a
     frame or two. Only the bottom edge is expanded: with once:true,
     anything re-entering from the top has already played. */
  margin = "0px 0px 800px 0px",
  immediate = false,
}) {
  const reduced = useMotionPref();
  const MotionTag = motion[as] ?? motion.div;
  const offset = FROM[from] ?? FROM.bottom;

  /* First-screen content renders as plain markup with no entrance at all.
     A motion element would ship opacity:0 in the SSR HTML and stay
     invisible until hydration + the observer callback — and under
     StrictMode's double mount the fade restarts, so the text appears,
     hides, and appears again. Nothing to restart if nothing animates. */
  if (immediate) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

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
