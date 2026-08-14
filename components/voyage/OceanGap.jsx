"use client";

import { motion } from "framer-motion";

import { useMotionPref } from "../motion/MotionPreference";

/**
 * Open water between two decks.
 *
 * Without these the decks butt up against each other and the ship spends
 * the whole voyage hidden behind content. The gap is the part of the page
 * where you actually watch it make way toward the next dock.
 */
export default function OceanGap({ label, tall = false }) {
  const reduced = useMotionPref();

  return (
    <div
      className={`relative flex items-center justify-center ${
        tall ? "h-[70vh] sm:h-[85vh]" : "h-[46vh] sm:h-[58vh]"
      }`}
      aria-hidden
    >
      {label ? (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-25%" }}
          transition={{ duration: reduced ? 0 : 0.9 }}
          className="rounded-full border border-border/40 bg-background/35 px-4 py-1.5
                     font-mono text-[0.625rem] uppercase tracking-[0.28em]
                     text-foreground/70 backdrop-blur-md"
        >
          {label}
        </motion.p>
      ) : null}
    </div>
  );
}
