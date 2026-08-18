"use client";

import { useEffect, useRef, useState } from "react";

import { profile } from "@/content/profile";

/**
 * Cover shown on document load, lifted once the page is genuinely ready.
 *
 * Split responsibility, because neither half can do the job alone:
 *
 *   CSS owns the creep. The real wait is hydration and shader boot, and
 *   JavaScript cannot report progress across the window before it runs.
 *   Measuring from inside this effect showed the bar jumping straight
 *   from its start value to done — by the time the effect executed,
 *   every milestone had already been met.
 *
 *   JS owns the completion. `finish` fires on the genuine signals —
 *   fonts loaded, window `load`, and the WebGL ocean painting its first
 *   frame — takes the bar off its animation, drives it to 100%, then
 *   lifts. So the creep is an estimate but the finish is real, and the
 *   curtain never clears while the shader is still booting.
 *
 * Three guards:
 *   - MAX_WAIT so a stalled resource can never trap the visitor.
 *   - MIN_SHOW so a warm cache doesn't produce a single-frame flash.
 *   - <noscript> hides it outright; without JS nothing would lift it.
 *
 * Measured in production, software renderer: bar completes ~2.2s and the
 * curtain lifts ~2.6s. Real GPUs compile the shader considerably faster.
 */
const MIN_SHOW = 650;
const MAX_WAIT = 4000;

export default function IntroCurtain() {
  const [ready, setReady] = useState(false);
  const fillRef = useRef(null);

  useEffect(() => {
    const started = performance.now();
    const fill = fillRef.current;
    let settled = false;

    const fonts = document.fonts?.ready ?? Promise.resolve();

    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((r) => window.addEventListener("load", r, { once: true }));

    // Check the latch before subscribing. VoyageBackground's first frame
    // often lands before this effect runs, and a listener added after the
    // event already fired would wait forever — leaving this milestone
    // permanently unmet and the timeout doing all the work.
    const scene = window.__voyageReady
      ? Promise.resolve()
      : new Promise((r) => window.addEventListener("voyage:ready", r, { once: true }));

    const finish = () => {
      if (settled) return;
      settled = true;

      // Take the bar off its CSS creep and complete it. Then hold briefly
      // so the completion is actually seen — lifting immediately reads as
      // the bar breaking off part-way rather than finishing.
      if (fill) {
        fill.style.animation = "none";
        fill.style.transition = "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)";
        fill.style.transform = "scaleX(1)";
      }

      const elapsed = performance.now() - started;
      setTimeout(() => {
        setReady(true);
        // Hero entrance animations wait on this. Latched as well as
        // dispatched, since a consumer may subscribe after it fires.
        window.__introDone = true;
        window.dispatchEvent(new Event("intro:done"));
      }, Math.max(340, MIN_SHOW - elapsed));
    };

    Promise.race([
      Promise.all([fonts, loaded, scene]),
      new Promise((r) => setTimeout(r, MAX_WAIT)),
    ]).then(finish);

    return () => {
      settled = true;
    };
  }, []);

  return (
    <>
      <noscript>
        <style>{`.intro-curtain{display:none}`}</style>
      </noscript>

      <div className="intro-curtain" data-ready={ready ? "true" : "false"} aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-curtain-from to-curtain-to" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
          <span
            className="font-display text-2xl font-semibold tracking-tight
                       text-white/90 sm:text-3xl"
          >
            {profile.name}
          </span>

          <div className="intro-bar">
            <span ref={fillRef} className="intro-bar-fill" />
          </div>

          <span className="font-mono text-[0.625rem] uppercase tracking-[0.28em] text-white/55">
            {profile.role}
          </span>
        </div>

        {/* crest trailing the bottom edge, so it reads as water draining off
            the screen rather than a panel sliding away */}
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-full h-[9vh] w-full text-curtain-to"
        >
          <path
            d="M0 0 Q100 92 200 40 T400 42 T600 8 T800 44 T1000 22 T1200 0 V0 H0 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </>
  );
}
