import Image from "next/image";

import Reveal from "./motion/Reveal";
import RichText from "./RichText";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import { profile, yearsOfExperience } from "@/content/profile";

/**
 * Experience / Education / Skills used to sit behind three tabs whose
 * triggers were fixed at 162px each — 486px of tabs on a 375px phone.
 *
 * They're stacked sections now: nothing is hidden from a recruiter
 * skimming on a phone, everything is in the DOM for search, and the
 * overflow problem disappears rather than being worked around.
 */

function SectionHead({ eyebrow, title, id }) {
  return (
    <Reveal from="left" className="mb-8 sm:mb-12">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 id={id} className="section-title scroll-mt-24">
        {title}
      </h2>
    </Reveal>
  );
}

export default function About() {
  const years = yearsOfExperience();

  return (
    <section id="about" className="deck max-w-6xl scroll-mt-24 py-20 sm:py-28">
      <div className="container">
        {/* ── intro ── */}
        <div className="mb-20 grid items-start gap-10 lg:mb-28 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
          <Reveal from="left">
            <p className="eyebrow mb-3">About</p>
            <h2 className="section-title mb-8 text-balance">
              {profile.aboutHeading}
            </h2>

            <div className="relative mx-auto w-full max-w-[340px] lg:mx-0">
              {/* offset frame behind the portrait */}
              <div
                aria-hidden
                className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-primary/40"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted">
                <Image
                  src={profile.avatar}
                  alt={`${profile.name}, ${profile.role}`}
                  fill
                  sizes="(min-width: 1024px) 340px, (min-width: 640px) 340px, 80vw"
                  className="object-cover object-top"
                />
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-surface/50 px-4 py-3">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-wider text-muted-foreground">
                    Based in
                  </dt>
                  <dd className="mt-1 text-sm font-medium">{profile.location}</dd>
                </div>
                <div className="rounded-xl border border-border bg-surface/50 px-4 py-3">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-wider text-muted-foreground">
                    Experience
                  </dt>
                  <dd className="mt-1 text-sm font-medium">{years}+ years</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <Reveal from="right" delay={0.1} className="max-w-[64ch] space-y-4 lg:pt-16">
            {profile.bio.map((paragraph, i) => (
              <p key={i} className="subtitle">
                <RichText>{paragraph}</RichText>
              </p>
            ))}
          </Reveal>
        </div>

        {/* ── experience ── */}
        <div className="mb-20 lg:mb-28">
          <SectionHead eyebrow="Where I've worked" title="Experience" id="experience" />
          <Experience />
        </div>

        {/* ── education ── */}
        <div className="mb-20 lg:mb-28">
          <SectionHead eyebrow="Background" title="Education" id="education" />
          <Education />
        </div>

        {/* ── skills ── */}
        <div>
          <SectionHead eyebrow="What I work with" title="Skills" id="skills" />
          <Skills />
        </div>
      </div>
    </section>
  );
}
