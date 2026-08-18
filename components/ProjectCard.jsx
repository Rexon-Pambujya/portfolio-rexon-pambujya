"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { useMotionPref } from "./motion/MotionPreference";
import { ArrowUpRight, Github } from "lucide-react";

/**
 * `priority` is opt-in and should only ever be true for the first card
 * above the fold. The old version set it on all 15.
 */
export default function ProjectCard({ project, priority = false, index = 0 }) {
  const reduced = useMotionPref();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px 800px 0px" }}
      transition={{
        duration: reduced ? 0 : 0.45,
        delay: reduced ? 0 : Math.min(index * 0.05, 0.25),
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl
                 border border-border bg-surface transition-colors
                 hover:border-primary/40"
    >
      {/* aspect ratio instead of a fixed 300px block, so the image scales
          with the card instead of the text getting squeezed out */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500
                       group-hover:scale-[1.03]"
            priority={priority}
          />
        ) : (
          /* Not every project has a screenshot — a CLI tool or a backend
             service has nothing to show. A monogram panel beats either
             crashing next/image on an undefined src or shipping a stock
             placeholder that looks like a broken asset. */
          <div
            aria-hidden
            className="flex h-full w-full items-center justify-center
                       bg-gradient-to-br from-secondary via-sea-near to-surface"
          >
            <span className="font-display text-4xl font-semibold tracking-tight text-foreground/25">
              {project.name
                .split(/\s+/)
                .map((w) => w[0])
                .join("")
                .slice(0, 3)
                .toUpperCase()}
            </span>
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t
                     from-secondary/70 via-transparent to-transparent
                     opacity-0 transition-opacity duration-300
                     group-hover:opacity-100"
        />

        <div className="absolute right-3 top-3 flex gap-2">
          {project.github ? (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub`}
              className="flex h-11 w-11 items-center justify-center rounded-full
                         bg-secondary/90 text-secondary-foreground backdrop-blur
                         transition-transform hover:scale-105
                         anim:sm:scale-90 anim:sm:opacity-0
                         anim:sm:group-hover:scale-100
                         anim:sm:group-focus-within:scale-100
                         anim:sm:group-hover:opacity-100
                         anim:sm:group-focus-within:opacity-100"
            >
              <Github size={18} />
            </Link>
          ) : null}

          {project.live ? (
            <Link
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} live site`}
              className="flex h-11 w-11 items-center justify-center rounded-full
                         bg-primary text-primary-foreground transition-transform
                         hover:scale-105"
            >
              <ArrowUpRight size={18} />
            </Link>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="h4 text-balance">{project.name}</h3>

        {/* clamped — descriptions run 150-250 chars and used to overflow
            the fixed-height card and get silently clipped */}
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {project.tags?.length ? (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-3">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-muted px-2.5 py-1 font-mono
                           text-[0.625rem] uppercase tracking-wider
                           text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </motion.article>
  );
}
