"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useMotionPref } from "@/components/motion/MotionPreference";

import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/motion/Reveal";
import { projects, categories } from "@/content/projects";

export default function ProjectsPage() {
  const [active, setActive] = useState("all");
  const reduced = useMotionPref();

  const filtered = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((p) => p.category === active),
    [active],
  );

  // Hide a filter that would return nothing.
  const shown = useMemo(
    () =>
      categories.filter(
        (c) => c.id === "all" || projects.some((p) => p.category === c.id),
      ),
    [],
  );

  return (
    <section className="deck my-5 max-w-6xl py-20 sm:my-8 sm:py-28">
      <div className="container">
        <Reveal from="fade" className="mb-10 sm:mb-14">
          <p className="eyebrow mb-3">Portfolio</p>
          <h1 className="section-title">Projects</h1>
          <p className="subtitle mt-4 max-w-xl">
            Things I've designed, built, or broken and rebuilt. Most have source
            on GitHub.
          </p>
        </Reveal>

        {/* Was a 6-column grid of fixed 162px tabs — 972px of triggers
            stacked into a very tall block on any phone. Now a snap rail. */}
        <div className="chip-row mask-fade-x mb-10 sm:mb-12" role="tablist">
          {shown.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={active === cat.id}
              data-active={active === cat.id}
              onClick={() => setActive(cat.id)}
              className="chip"
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.ul
          layout={!reduced}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.li
                key={project.slug}
                layout={!reduced}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: reduced ? 0 : 0.25 }}
              >
                <ProjectCard project={project} index={i} priority={i < 3} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            Nothing here yet.
          </p>
        ) : null}
      </div>
    </section>
  );
}
