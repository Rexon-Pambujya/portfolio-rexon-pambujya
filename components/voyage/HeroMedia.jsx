"use client";

import Image from "next/image";
import { useState } from "react";

import useHeroVideo from "./useHeroVideo";
import { hero, hasHeroVideo } from "@/content/hero";

/**
 * The cinematic path. Only mounts when content/hero.js has a poster.
 *
 * The poster is a real next/image with `priority`, so it is the LCP
 * element and gets AVIF/WebP + a preload hint. The <video> is layered on
 * top and cross-fades in only once useHeroVideo says it is allowed to —
 * see that hook for the exact conditions.
 *
 * Because the video's first frame IS the poster (generate the still,
 * then use it as first and last frame of the image-to-video run), the
 * cross-fade is invisible.
 */
export default function HeroMedia() {
  const allowed = useHeroVideo(hasHeroVideo);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="absolute inset-0">
      <Image
        src={hero.media.poster}
        alt={hero.media.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {allowed ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 h-full w-full object-cover object-center
                      transition-opacity duration-1000
                      ${playing ? "opacity-100" : "opacity-0"}`}
        >
          {hero.media.webm ? (
            <source src={hero.media.webm} type="video/webm" />
          ) : null}
          {hero.media.mp4 ? (
            <source src={hero.media.mp4} type="video/mp4" />
          ) : null}
        </video>
      ) : null}
    </div>
  );
}
