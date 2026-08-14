import Link from "next/link";

import { profile } from "@/content/profile";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label={`${profile.name} — home`}
      // min-h-11: below sm the wordmark is hidden, leaving only the 36px
      // badge, which is under the 44px touch-target minimum
      className="group inline-flex min-h-11 items-center gap-2.5"
    >
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-full border border-primary/40
                   bg-primary/10 font-display text-sm font-semibold text-primary
                   transition-colors group-hover:bg-primary
                   group-hover:text-primary-foreground"
      >
        RP
      </span>
      <span className="hidden font-display text-base font-semibold tracking-tight sm:inline">
        {profile.name}
      </span>
    </Link>
  );
}
