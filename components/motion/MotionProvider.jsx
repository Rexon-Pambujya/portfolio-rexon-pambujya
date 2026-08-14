"use client";

import { MotionConfig } from "framer-motion";

/**
 * reducedMotion="never" stops framer from silently rewriting animations
 * when the OS asks for reduced motion.
 *
 * That auto-adjustment sounds helpful but it only kicks in on the client,
 * so the server renders the un-adjusted initial style and hydration
 * mismatches. We handle the preference ourselves instead — every motion
 * component collapses its duration to 0 via useReducedMotion(), and
 * globals.css neutralises CSS keyframes under the same media query. Same
 * outcome, no mismatch.
 */
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
