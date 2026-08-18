import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Reveal from "@/components/motion/Reveal";
import MagneticButton from "@/components/motion/MagneticButton";
import { profile } from "@/content/profile";

// Narrower than the other decks so the ship coming alongside stays visible.
export default function ContactCta() {
  return (
    <section className="deck max-w-3xl py-20 sm:py-24">
      {/* a last glimpse of water before the footer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3
                   bg-gradient-to-t from-primary/[0.07] to-transparent"
      />

      <div className="container relative text-center">
        <Reveal from="scale">
          <p className="eyebrow mb-4 justify-center">Say hello</p>
          <h2 className="h2 mx-auto max-w-2xl text-balance">
            Have something you'd like to build?
          </h2>
          <p className="subtitle mx-auto mt-5 max-w-lg">
            I'm open to new roles and interesting problems. The fastest way to
            reach me is email — I read everything.
          </p>
        </Reveal>

        <Reveal from="bottom" delay={0.14}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 xs:flex-row">
            <MagneticButton>
              <Button asChild size="lg">
                <Link href="/contact" className="gap-2">
                  Start a conversation
                  <ArrowRight size={17} />
                </Link>
              </Button>
            </MagneticButton>

            <MagneticButton>
              <Button asChild variant="ghost" size="lg">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </Button>
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
