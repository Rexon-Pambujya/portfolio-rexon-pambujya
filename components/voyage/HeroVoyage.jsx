"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { useMotionPref } from "../motion/MotionPreference";
import useIntroDone from "../motion/useIntroDone";
import { ArrowDown } from "lucide-react";

import Socials from "@/components/Socials";
import HeroMedia from "./HeroMedia";
import { hero, hasHeroPoster } from "@/content/hero";
import { profile, yearsOfExperience } from "@/content/profile";

/**
 * Words animate in one at a time.
 *
 * The markup is identical whether or not motion is reduced — only the
 * timing changes. Branching the DOM on useMotionPref() is a hydration
 * mismatch waiting to happen, because the server has no way to know the
 * visitor's preference and renders the wrong branch every time.
 */
function SplitHeadline({ text, reduced, started }) {
  return (
    <h1 className="h1 text-balance">
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex flex-wrap gap-x-[0.25em]">
        {text.split(" ").map((word, i) => (
          <span key={`${word}-${i}`} className="overflow-hidden py-[0.06em]">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={started ? { y: 0 } : { y: "110%" }}
              transition={{
                duration: reduced ? 0 : 0.85,
                delay: reduced ? 0 : 0.15 + i * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </h1>
  );
}

export default function HeroVoyage() {
  const reduced = useMotionPref();
  // Entrance animations hold until the curtain is out of the way, so the
  // reveal is seen rather than played behind the cover.
  const started = useIntroDone();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scene drifts down slower than the page; copy lifts away faster.
  //
  // Reduced motion collapses the output range rather than dropping the
  // `style` prop. Both variants evaluate to the same value at scroll
  // position 0, so the server-rendered transform matches the client's on
  // hydration — dropping the prop entirely does not.
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-28%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, reduced ? 1 : 0]);

  const years = yearsOfExperience();

  const stats = [{ value: years, suffix: "+", label: "Years of experience" }];

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col justify-center
                 overflow-hidden pb-16 pt-28 sm:pb-20"
    >
      {/* Media layer.
          With no video configured this is empty on purpose — the ocean
          lives in VoyageBackground, fixed behind the whole document, so
          it keeps sailing as you scroll instead of ending with the hero.
          A configured poster covers it for the first screen only. */}
      {hasHeroPoster ? (
        <motion.div
          style={{ y: sceneY }}
          className="absolute inset-0 -z-10 will-change-transform"
        >
          <HeroMedia />
        </motion.div>
      ) : null}

      {/* Scrim — keeps the headline legible over the scene.
          Stops short of the right edge so the moon and the glitter path
          stay visible; a full-width wash flattens the hero to near-black.
          On phones the copy is full-bleed, so it runs top-down instead. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10
                   bg-gradient-to-b from-background via-background/75 to-background/45
                   sm:bg-gradient-to-r sm:from-background sm:via-background/55
                   sm:via-40% sm:to-transparent sm:to-70%"
        style={{ opacity: hero.scrim / 100 }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-56
                   bg-gradient-to-t from-background via-background/70 to-transparent"
      />
      {/* extra bed under the CTAs and stats — they sit over the brightest
          part of the glitter path and lose contrast without it */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 hidden w-full max-w-3xl sm:block
                   bg-[radial-gradient(ellipse_at_left_center,hsl(var(--background)/0.85),transparent_70%)]"
      />

      {/* ── copy ────────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="container relative"
      >
        <div className="max-w-2xl">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0 }}
            animate={started ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.6 }}
          >
            {profile.kicker}
          </motion.p>

          <SplitHeadline text={profile.headline} reduced={reduced} started={started} />

          <motion.p
            className="subtitle mt-6 max-w-xl text-balance"
            initial={{ opacity: 0, y: 16 }}
            animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.5 }}
          >
            {profile.tagline}
          </motion.p>

          {/* No CTAs here on purpose. Résumé lives in the header where
              it's reachable from every page, and the single "start a
              conversation" call sits at journey's end — a hero button
              duplicating it just competed with itself. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={started ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.65 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-6"
          >
            <Socials
              containerStyles="flex items-center -ml-3"
              iconsStyles="text-xl text-muted-foreground hover:text-primary hover:bg-muted"
            />

            <ul className="flex items-center gap-6">
              {stats.map((stat) => (
                <li key={stat.label}>
                  <p className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="font-mono text-[0.625rem] uppercase tracking-wider text-muted-foreground sm:text-xs">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* ── scroll cue ──────────────────────────────────────────────── */}
      {hero.scrollCue ? (
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 1.1 }}
          className="absolute inset-x-0 bottom-6 mx-auto flex w-fit flex-col
                     items-center gap-2 font-mono text-[0.625rem] uppercase
                     tracking-[0.2em] text-muted-foreground
                     transition-colors hover:text-primary"
        >
          {hero.scrollCue}
          <ArrowDown size={14} className="anim:animate-bounce" />
        </motion.a>
      ) : null}
    </section>
  );
}
