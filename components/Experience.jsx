"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { useMotionPref } from "./motion/MotionPreference";

import Reveal from "./motion/Reveal";
import { experience } from "@/content/experience";

/**
 * A node on the rail.
 *
 * Each one fills as the rail's fill line reaches it, rather than being
 * statically styled by whether the job is current. Previously the current
 * job had a filled pulsing dot and the rest were permanently hollow, so
 * the dots and the line told two different stories.
 *
 * `mark` is where this node sits along the rail, 0..1.
 */
function RailNode({ progress, mark }) {
  // fill over a short band ending at the node, so the dot completes just
  // as the line passes it rather than lagging behind
  const range = [Math.max(0, mark - 0.08), mark];

  const fill = useTransform(progress, range, [0, 1], { clamp: true });
  const scale = useTransform(fill, [0, 1], [0.55, 1]);
  const ringOpacity = useTransform(fill, [0, 1], [0.35, 1]);

  return (
    <span
      aria-hidden
      className="absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center sm:h-[19px] sm:w-[19px]"
    >
      {/* These stay scroll-linked even under reduced motion: the values
          are derived from scroll position, not time, and swapping them
          for constants would render a different style on the client than
          the server produced. */}
      <motion.span
        style={{ opacity: ringOpacity }}
        className="absolute inset-0 rounded-full border-2 border-primary bg-background"
      />
      <motion.span
        style={{ scale, opacity: fill }}
        className="absolute inset-[3px] rounded-full bg-primary"
      />
    </span>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const reduced = useMotionPref();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 65%"],
  });
  const railProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  const n = experience.length;

  return (
    <div ref={ref} className="relative">
      {/* rail track. Was `hidden xl:flex`, so it never appeared below
          1280px — which is where most people actually read this. */}
      <div
        aria-hidden
        className="absolute bottom-2 left-[7px] top-2 w-px bg-border sm:left-[9px]"
      />
      <motion.div
        aria-hidden
        style={{ scaleY: reduced ? scrollYProgress : railProgress }}
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top
                   bg-gradient-to-b from-primary to-lantern sm:left-[9px]"
      />

      <ol className="space-y-10 sm:space-y-14">
        {experience.map((job, i) => (
          <Reveal as="li" key={`${job.company}-${job.start}`} from="left" delay={i * 0.08}>
            <article className="relative max-w-[70ch] pl-8 sm:pl-12">
              <RailNode
                progress={reduced ? scrollYProgress : railProgress}
                mark={n > 1 ? i / (n - 1) : 0}
              />

              <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
                <h3 className="h4">{job.role}</h3>
                <span className="text-muted-foreground">at</span>
                {job.url ? (
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {job.company}
                  </a>
                ) : (
                  <span className="font-medium text-primary">{job.company}</span>
                )}
                {job.current ? (
                  <span
                    className="ml-1 rounded-full bg-primary/15 px-2 py-0.5 font-mono
                               text-[0.625rem] uppercase tracking-wider text-primary"
                  >
                    Current
                  </span>
                ) : null}
              </div>

              <p className="mb-4 font-mono text-xs text-muted-foreground">
                {job.start} – {job.end}
                <span className="mx-2 opacity-40">/</span>
                {job.location}
              </p>

              {job.summary ? (
                <p className="mb-3 text-pretty text-muted-foreground">
                  {job.summary}
                </p>
              ) : null}

              {job.highlights?.length ? (
                <ul className="space-y-2">
                  {job.highlights.map((point, j) => (
                    <li
                      key={j}
                      className="relative pl-5 text-pretty text-sm leading-relaxed
                                 text-muted-foreground sm:text-base"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-primary/60"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}

              {job.stack?.length ? (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {job.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border px-2.5 py-1
                                 font-mono text-[0.625rem] uppercase tracking-wider
                                 text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
