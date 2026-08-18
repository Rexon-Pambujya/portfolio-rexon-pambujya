import Link from "next/link";

import Socials from "@/components/common/Socials";
import { profile } from "@/content/profile";
import { navLinks } from "@/content/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-background/85 backdrop-blur-2xl">
      <div className="container py-12">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="font-display text-lg font-semibold">{profile.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {profile.role} · {profile.location}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-3 inline-block text-sm text-primary underline-offset-4 hover:underline"
            >
              {profile.email}
            </a>
          </div>

          <nav className="flex gap-x-6" aria-label="Footer">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center text-sm text-muted-foreground
                           transition-colors hover:text-foreground sm:min-h-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Socials
            containerStyles="flex items-center -mr-3"
            iconsStyles="text-xl text-muted-foreground hover:text-primary hover:bg-muted"
          />
        </div>

        <p className="mt-10 text-center font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
