"use client";

import { motion } from "framer-motion";

import { useMotionPref } from "./motion/MotionPreference";
import { skillGroups, softSkills } from "@/content/skills";
import { skillIcons } from "./skills/iconMap";

/**
 * Compact inline chips rather than a grid of tiles.
 *
 * There are 40+ skills now and several are multi-word concepts. Square
 * tiles forced every entry into the same footprint, so "AI Agents" and
 * "End-to-End Data Pipelines" got the same box and the long ones wrapped
 * to four lines. A chip sizes to its own label, so the whole set reads as
 * one scannable block at roughly a third of the height.
 */
function SkillChip({ name, icon, index, reduced }) {
  const Icon = skillIcons[icon];

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: reduced ? 0 : 0.3,
        delay: reduced ? 0 : Math.min(index * 0.02, 0.24),
      }}
      className="group inline-flex items-center gap-1.5 rounded-full border
                 border-border bg-surface/50 py-1.5 pl-2.5 pr-3
                 transition-colors hover:border-primary/50"
    >
      {Icon ? (
        <Icon
          aria-hidden
          className="shrink-0 text-[0.95rem] text-muted-foreground
                     transition-colors group-hover:text-primary"
        />
      ) : null}
      <span className="whitespace-nowrap text-xs text-foreground/85 sm:text-[0.8125rem]">
        {name}
      </span>
    </motion.li>
  );
}

export default function Skills() {
  const reduced = useMotionPref();

  return (
    <div className="space-y-8 sm:space-y-10">
      {skillGroups.map((group) => (
        <section key={group.title}>
          <div className="mb-4 flex items-center gap-3">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {group.title}
            </h3>
            <span className="rule" />
          </div>

          <ul className="flex flex-wrap gap-2">
            {group.items.map((skill, i) => (
              <SkillChip
                key={skill.name}
                name={skill.name}
                icon={skill.icon}
                index={i}
                reduced={reduced}
              />
            ))}
          </ul>
        </section>
      ))}

      <section>
        <div className="mb-4 flex items-center gap-3">
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Ways of working
          </h3>
          <span className="rule" />
        </div>
        <ul className="flex flex-wrap gap-2">
          {softSkills.map((skill) => (
            <li
              key={skill}
              className="inline-flex items-center rounded-full bg-muted/60 px-3 py-1.5
                         text-xs text-muted-foreground sm:text-[0.8125rem]"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
