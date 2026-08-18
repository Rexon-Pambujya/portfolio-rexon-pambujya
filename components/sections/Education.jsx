"use client";

import Reveal from "@/components/motion/Reveal";
import { education } from "@/content/education";

export default function Education() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {education.map((item, i) => (
        <Reveal
          as="li"
          key={`${item.institution}-${item.start}`}
          from={i % 2 ? "right" : "left"}
          delay={i * 0.08}
          className="rounded-2xl border border-border bg-surface/60 p-5"
        >
          <p className="mb-3 font-mono text-xs text-muted-foreground">
            {item.start} – {item.end}
          </p>
          <h3 className="h4 mb-1 text-balance">{item.qualification}</h3>
          <p className="text-sm text-muted-foreground">{item.institution}</p>
          <p className="mt-1 text-sm text-muted-foreground/70">
            {item.location}
          </p>
          {item.note ? (
            <p className="mt-3 text-sm text-muted-foreground">{item.note}</p>
          ) : null}
        </Reveal>
      ))}
    </ul>
  );
}
