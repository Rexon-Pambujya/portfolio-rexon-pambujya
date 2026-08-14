"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { useMotionPref } from "./motion/MotionPreference";

import { navLinks } from "@/content/site";

export default function Navbar({ containerStyles = "", onNavigate }) {
  const pathname = usePathname();
  const reduced = useMotionPref();

  return (
    <nav className={containerStyles}>
      {navLinks.map((link) => {
        const active = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`relative inline-flex min-h-[44px] items-center text-base
                        transition-colors lg:min-h-0 ${
                          active
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
          >
            {link.label}
            {active ? (
              <motion.span
                layoutId={reduced ? undefined : "nav-underline"}
                className="absolute -bottom-1 left-0 h-px w-full bg-primary"
              />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
