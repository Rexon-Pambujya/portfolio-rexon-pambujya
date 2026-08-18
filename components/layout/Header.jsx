"use client";

import { useEffect, useState } from "react";

import { Download } from "lucide-react";

import Logo from "./Logo";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";
import ThemeToggler from "./ThemeToggler";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // The old version had no dependency array and returned its cleanup from
    // *inside* the listener callback, so every render added another scroll
    // listener and none were ever removed.
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 py-3 backdrop-blur-xl"
          : "border-b border-transparent py-5"
      }`}
    >
      {/* Unscrolled, the header floats straight over the sky. This scrim
          guarantees separation whatever colour the voyage is passing
          through, in either theme. */}
      {!scrolled ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[160%]
                     bg-gradient-to-b from-background/85 via-background/45 to-transparent"
        />
      ) : null}

      <div className="container flex items-center justify-between gap-4">
        <Logo />

        <div className="flex items-center gap-2 sm:gap-4">
          {/* was `hidden xl:flex`, which handed every tablet and small
              laptop the hamburger menu on a 1024px-wide screen */}
          <Navbar containerStyles="hidden lg:flex items-center gap-x-8" />

          {/* Reachable from every page, rather than only the homepage hero.
              The leading slash matters — a relative href resolves against
              the current route and 404s from /projects and /contact. */}
          <Button
            asChild
            size="sm"
            variant="outline"
            className="hidden sm:inline-flex transition-all duration-300
                       hover:border-primary hover:text-primary
                       hover:shadow-[0_0_22px_-4px_hsl(var(--primary)/0.75)]"
          >
            <a href={profile.resume} target="_blank" rel="noopener" download className="gap-2">
              Résumé
              <Download size={15} />
            </a>
          </Button>

          <ThemeToggler />

          <div className="lg:hidden">
            <MobileNavbar />
          </div>
        </div>
      </div>
    </header>
  );
}
