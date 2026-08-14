"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { useMotionPref } from "./MotionPreference";

/**
 * Pulls its child toward the cursor.
 *
 * Always renders the same wrapper so hydration matches; when motion is
 * reduced (or the pointer is coarse) the handlers simply never move it.
 */
export default function MagneticButton({ children, strength = 0.32, className = "" }) {
  const reduced = useMotionPref();
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={`w-fit ${className}`}
    >
      {children}
    </motion.div>
  );
}
