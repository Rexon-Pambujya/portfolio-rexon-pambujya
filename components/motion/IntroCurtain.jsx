import { profile } from "@/content/profile";

/**
 * Shown on every document load (including reload), then lifts away.
 *
 * A server component on purpose — see `.intro-curtain` in globals.css.
 * The animation is CSS, so this markup is in the first painted frame
 * and clears itself whether or not JavaScript ever runs.
 *
 * RouteCurtain handles the other case: client-side navigation between
 * routes, where there is no document load to cover.
 */
export default function IntroCurtain() {
  return (
    <div className="intro-curtain" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-sea-near via-sea-near to-sea-far" />

      <div className="absolute inset-0 grid place-items-center">
        <span
          className="font-display text-2xl font-semibold tracking-tight
                     text-foreground/70 sm:text-3xl"
        >
          {profile.name}
        </span>
      </div>

      {/* crest trailing the bottom edge, so it reads as water draining off
          the screen rather than a panel sliding away */}
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-full h-[9vh] w-full text-sea-far"
      >
        <path
          d="M0 0 Q100 92 200 40 T400 42 T600 8 T800 44 T1000 22 T1200 0 V0 H0 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
