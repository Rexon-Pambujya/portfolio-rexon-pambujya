/**
 * The voyage hero.
 *
 * ── HOW TO SWITCH ON THE CINEMATIC VIDEO ────────────────────────────
 *
 * Until `media.poster` is set, the hero renders a code-drawn animated
 * ocean (components/voyage/OceanFallback.jsx). Nothing is broken — that
 * is the designed default.
 *
 * When your clips are ready:
 *   1. Drop these three files into public/hero/
 *        voyage-poster.avif   the generated still  (≤ 80 KB)
 *        voyage.webm          AV1                  (≤ 2.5 MB)
 *        voyage.mp4           H.264 fallback       (≤ 4 MB)
 *   2. Fill in the three paths below.
 *   3. That's it. No component changes.
 *
 * Generate the STILL first, then feed it as both the first AND last
 * frame of an image-to-video run (Kling and Runway both support this).
 * You get a seamless loop, and the still doubles as the poster so there
 * is no flash when the video swaps in.
 *
 * ffmpeg recipes are in content/README.md.
 */

export const hero = {
  media: {
    /** Still frame. Also the LCP element — keep it small. */
    poster: "",
    /** AV1 in WebM. Primary for Chrome/Firefox/modern Safari. */
    webm: "",
    /** H.264 in MP4. Universal fallback. */
    mp4: "",
    /** Describes the scene for screen readers. */
    alt: "A tall ship under sail on open ocean at dusk, a dragon circling far overhead.",
  },

  /** Overlay strength behind the copy, 0–100. Higher = more readable text,
   *  less visible ocean. 40–55 is the usable band. */
  scrim: 46,

  /** Scroll cue under the headline. Set to "" to hide. */
  scrollCue: "Scroll",
};

/** True once there is something to play. */
export const hasHeroVideo = Boolean(hero.media.webm || hero.media.mp4);

/** True once there is at least a still to show. */
export const hasHeroPoster = Boolean(hero.media.poster);

export default hero;
