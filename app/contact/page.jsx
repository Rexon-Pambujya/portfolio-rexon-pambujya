import { Linkedin, MailIcon, MapPin, PhoneCall } from "lucide-react";
import Link from "next/link";

import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/motion/Reveal";
import Socials from "@/components/Socials";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";

export const metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} — ${profile.role} based in ${profile.location}.`,
};

const linkedin = socials.find((s) => s.icon === "linkedin");

export default function ContactPage() {
  return (
    <section className="deck my-5 max-w-6xl py-20 sm:my-8 sm:py-28">
      <div className="container">
        {/* was `grid xl:grid-cols-2` with zero sm/md/lg classes, so it was a
            single narrow column from 0 to 1279px */}
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow mb-4">Say hello</p>
              <h1 className="h1 text-balance">Let's work together</h1>
              <p className="subtitle mt-6 max-w-md">
                Reach out about a role, a project, or anything you think I'd
                find interesting. I read every message and reply to most within
                a couple of days.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-10 space-y-5">
                <li>
                  <Link
                    href={`mailto:${profile.email}`}
                    className="group flex items-center gap-4"
                  >
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full
                                 border border-border text-primary transition-colors
                                 group-hover:border-primary/50 group-hover:bg-primary/10"
                    >
                      <MailIcon size={17} />
                    </span>
                    <span className="break-all text-sm sm:text-base">
                      {profile.email}
                    </span>
                  </Link>
                </li>

                {linkedin ? (
                  <li>
                    <Link
                      href={linkedin.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4"
                    >
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full
                                   border border-border text-primary transition-colors
                                   group-hover:border-primary/50 group-hover:bg-primary/10"
                      >
                        <Linkedin size={17} />
                      </span>
                      <span className="text-sm sm:text-base">
                        /in/rexon-pambujya
                      </span>
                    </Link>
                  </li>
                ) : null}

                {/* the old page rendered a phone icon next to an empty div */}
                {profile.phone ? (
                  <li>
                    <Link
                      href={`tel:${profile.phone.replace(/\s/g, "")}`}
                      className="group flex items-center gap-4"
                    >
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full
                                   border border-border text-primary transition-colors
                                   group-hover:border-primary/50 group-hover:bg-primary/10"
                      >
                        <PhoneCall size={17} />
                      </span>
                      <span className="text-sm sm:text-base">{profile.phone}</span>
                    </Link>
                  </li>
                ) : null}

                <li className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-primary">
                    <MapPin size={17} />
                  </span>
                  <span className="text-sm text-muted-foreground sm:text-base">
                    {profile.location}
                  </span>
                </li>
              </ul>

              <Socials
                containerStyles="mt-8 flex items-center -ml-3"
                iconsStyles="text-xl text-muted-foreground hover:text-primary hover:bg-muted"
              />
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
