"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "./ui/button";
import ProjectCard from "./ProjectCard";
import Reveal from "./motion/Reveal";
import { featuredProjects } from "@/content/projects";

/**
 * Swiper used to own this (a 130 KB dep for one carousel). CSS scroll-snap
 * does the same job natively, keeps keyboard and touch behaviour for free,
 * and degrades to a plain grid on desktop.
 */
export default function Work() {
  return (
    <section id="work" className="deck max-w-6xl scroll-mt-24 py-20 sm:py-28">
      <div className="container">
        <Reveal from="left">
          <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-3">Selected work</p>
              <h2 className="section-title">Things I've built</h2>
            </div>

            <Button asChild variant="outline" size="sm">
              <Link href="/projects" className="gap-2">
                All projects
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </Reveal>

        {/* below lg: horizontal snap rail. lg and up: 3-col grid. */}
        <div
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4
                     [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                     lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {featuredProjects.map((project, i) => (
            <div
              key={project.slug}
              className="w-[85vw] shrink-0 snap-start xs:w-[75vw] sm:w-[55vw]
                         lg:w-auto lg:shrink"
            >
              <ProjectCard project={project} index={i} priority={i === 0} />
            </div>
          ))}
        </div>

        <p className="mt-4 text-center font-mono text-xs text-muted-foreground lg:hidden">
          Swipe for more →
        </p>
      </div>
    </section>
  );
}
