"use client";

import { useEffect, useRef } from "react";

import { createOceanProgram, seaPointAt, swellAt } from "./oceanShader";
import { Ship, DOCKS } from "./shapes";
import Birds from "./Birds";
import { useMotionPref } from "@/components/motion/MotionPreference";
import { voyageStops } from "@/content/voyage";

/* ── helpers ─────────────────────────────────────────────────────── */

/** "#1E5A6B" → [r,g,b] 0..1 */
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(
    h.length === 3 ? h.split("").map((c) => c + c).join("") : h,
    16
  );
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

const lerp = (a, b, t) => a + (b - a) * t;
const lerp3 = (a, b, t, out) => {
  out[0] = lerp(a[0], b[0], t);
  out[1] = lerp(a[1], b[1], t);
  out[2] = lerp(a[2], b[2], t);
  return out;
};
const smooth = (t) => t * t * (3 - 2 * t);

/* The static anchor baked into the ship element's inline left/bottom.
   Every per-frame movement is expressed as a transform delta from here,
   so the render loop never writes a layout-triggering property. */
const ANCHOR_X = 0.46;
const ANCHOR_Y = 0.43;
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Pre-parse every stop's colours once, for both themes. */
const PARSED = voyageStops.map((s) => ({
  ...s,
  dark: Object.fromEntries(Object.entries(s.dark).map(([k, v]) => [k, hexToRgb(v)])),
  light: Object.fromEntries(Object.entries(s.light).map(([k, v]) => [k, hexToRgb(v)])),
}));

/**
 * The whole voyage, fixed behind the page.
 *
 * Everything is driven from one number: how far down the document you
 * are. Each frame we find the two stops bracketing that position, ease
 * between them, and push the result into the shader uniforms and
 * directly into the overlay elements' styles.
 *
 * Overlay positions are written straight to `style` rather than through
 * React state — this runs every frame, and a setState per frame would
 * re-render the tree 60 times a second for no reason.
 */
export default function VoyageBackground() {
  const rootRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const shipRef = useRef(null);
  const hullRef = useRef(null);
  const dockRefs = useRef({});

  // Read through a ref so the render loop picks up a preference change
  // without tearing down and rebuilding the WebGL context.
  const reducedPref = useMotionPref();
  const reducedRef = useRef(reducedPref);
  reducedRef.current = reducedPref;

  useEffect(() => {
    const root = rootRef.current;
    const wrap = canvasWrapRef.current;
    if (!root || !wrap) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const octaves = coarse ? 3 : 5;
    const scale = coarse ? 0.55 : 0.72;
    const dprCap = coarse ? 1.5 : 1.75;

    // Fresh canvas per effect run: a canvas hands out exactly one WebGL
    // context for its lifetime, so StrictMode's mount → cleanup → mount
    // would otherwise hand the second mount the context we just killed.
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "display:block;width:100%;height:100%";
    wrap.appendChild(canvas);

    let handle;
    try {
      handle = createOceanProgram(canvas, { octaves });
    } catch (err) {
      console.warn("[voyage] WebGL unavailable, using CSS backdrop:", err.message);
      canvas.remove();
      root.dataset.gl = "off";
      // still announce, or the intro curtain waits on a frame that will
      // never come and sits until its timeout
      window.__voyageReady = true;
      window.dispatchEvent(new Event("voyage:ready"));
      return;
    }
    root.dataset.gl = "on";

    const { gl, u } = handle;
    let raf = 0;
    let lost = false;
    // the intro curtain waits on this before lifting
    let announced = false;
    const start = performance.now();
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    // eased scroll — the raw value is already smooth under Lenis, but this
    // keeps the scene from snapping on wheel-jumps and anchor jumps
    let progress = 0;
    let last = start;

    // low-passed hull motion, so the ship settles onto the swell instead
    // of tracking every sample exactly
    let shipRise = 0;
    let shipPitch = 0;
    // The ship's own station, easing toward the scroll-derived one. Its x
    // used to be a pure function of scroll, so it slid exactly as fast as
    // the wheel turned and stopped dead the instant you did — towed, not
    // sailing. null until the first frame so it starts on station rather
    // than gliding in from the anchor.
    let shipX = null;

    const cDeep = [0, 0, 0];
    const cShallow = [0, 0, 0];
    const cSkyHigh = [0, 0, 0];
    const cSkyLow = [0, 0, 0];
    const cSun = [0, 0, 0];

    const onLost = (e) => {
      e.preventDefault();
      lost = true;
      cancelAnimationFrame(raf);
      raf = 0;
    };
    canvas.addEventListener("webglcontextlost", onLost);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const w = Math.max(1, Math.round(wrap.clientWidth * dpr * scale));
      const h = Math.max(1, Math.round(wrap.clientHeight * dpr * scale));
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };

    const readScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? clamp01(window.scrollY / max) : 0;
    };

    const draw = (now) => {
      raf = 0;
      if (lost) return;

      const t = (now - start) / 1000;
      // Frame-time based easing. The old form moved a fixed fraction per
      // *frame*, so the scene eased at one speed on 60Hz and twice that on
      // 120Hz, and fell behind badly whenever the frame rate dipped —
      // exactly when it most looked like the ship was under tow. Clamped
      // so a stalled tab doesn't teleport the scene on the next frame.
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const ease = (tau) => 1 - Math.exp(-dt / tau);
      const reduced = reducedRef.current;
      const dark = document.documentElement.classList.contains("dark");
      const narrow = wrap.clientWidth < 640;

      // ease toward the true scroll position
      const target = readScroll();
      progress += (target - progress) * (reduced ? 1 : ease(0.13));

      // find the two stops we're between
      let i = 0;
      while (i < PARSED.length - 2 && progress > PARSED[i + 1].at) i += 1;
      const a = PARSED[i];
      const b = PARSED[i + 1] ?? a;
      const span = Math.max(b.at - a.at, 0.0001);
      const k = smooth(clamp01((progress - a.at) / span));

      const ca = dark ? a.dark : a.light;
      const cb = dark ? b.dark : b.light;

      lerp3(ca.seaNear, cb.seaNear, k, cDeep);
      lerp3(ca.seaFar, cb.seaFar, k, cShallow);
      lerp3(ca.skyHigh, cb.skyHigh, k, cSkyHigh);
      lerp3(ca.skyLow, cb.skyLow, k, cSkyLow);
      lerp3(ca.sun, cb.sun, k, cSun);

      // Narrow layouts get a much higher horizon. The headline runs
      // full-bleed there, so the ship can't be moved clear of it
      // sideways — lifting the waterline puts the ship in the sky band
      // above the copy instead, and the text sits over open water.
      const horizon = lerp(a.horizon, b.horizon, k) + (narrow ? 0.14 : 0);
      const wind = lerp(a.wind, b.wind, k);
      const advance = lerp(a.advance, b.advance, k);
      let sunX = lerp(a.sun[0], b.sun[0], k);
      const sunY = lerp(a.sun[1], b.sun[1], k);
      // narrow layouts run copy full-bleed; keep the sun out from behind it
      if (narrow) sunX = 0.5 + (sunX - 0.5) * 0.55 + 0.22;

      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      // Computed once and shared with the ship placement below, so the
      // hull is sampling exactly the surface the shader is drawing.
      //
      // Reduced motion slows the sea rather than freezing it: a still
      // ocean under a ship reads as broken, and gentle undulation is not
      // what the preference guards against — the scroll parallax is, and
      // that we do disable.
      const timeNow = reduced ? t * 0.3 : t;
      // Scroll-driven distance plus a constant drift, so the ship is
      // always making way even when the visitor stops scrolling.
      const advanceNow = advance + t * (reduced ? 0.07 : 0.22);

      gl.uniform2f(u.uRes, canvas.width, canvas.height);
      gl.uniform1f(u.uTime, timeNow);
      gl.uniform1f(u.uWind, wind);
      gl.uniform2f(u.uPointer, pointer.x, pointer.y);
      gl.uniform1f(u.uHorizon, horizon);
      gl.uniform1f(u.uAdvance, advanceNow);
      gl.uniform3fv(u.uDeep, cDeep);
      gl.uniform3fv(u.uShallow, cShallow);
      gl.uniform3fv(u.uSkyHigh, cSkyHigh);
      gl.uniform3fv(u.uSkyLow, cSkyLow);
      gl.uniform3fv(u.uSun, cSun);
      gl.uniform2f(u.uSunPos, sunX, sunY);
      gl.uniform1f(u.uDark, dark ? 1 : 0);

      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // Announce once the ocean has actually painted a frame. Lifting the
      // curtain before this shows the flat CSS fallback and an unlit
      // scene, which is what "it reveals unloaded things" looks like.
      if (!announced) {
        announced = true;
        // Latch as well as dispatch: a listener attached after this point
        // would otherwise wait forever on an event that already fired.
        window.__voyageReady = true;
        window.dispatchEvent(new Event("voyage:ready"));
      }

      /* ---- overlays ---- */
      const ship = shipRef.current;
      if (ship) {
        let x = lerp(a.ship.x, b.ship.x, k);
        let s = lerp(a.ship.scale, b.ship.scale, k);

        // Narrow layouts run the headline full-bleed, so the ship has to
        // move out to the edge and shrink or it lands on top of the name.
        // 0.86 keeps the hull fully on screen: the container floors at
        // 118px wide, so at 0.75 scale its half-width is ~11% of a 390px
        // viewport and anything further right clips the bow.
        if (narrow) {
          x = Math.min(0.86, x + 0.18);
          s *= 0.75;
        }

        // Ease onto that station rather than snapping to it, then add a
        // slow surge so the hull is never completely still. The lag is
        // what separates "under way" from "under tow": stop scrolling and
        // the ship carries its own way through the last of the distance.
        // Longer tau than the scene itself, so it visibly trails the
        // water rather than moving in lockstep with the wheel.
        if (shipX === null) shipX = x;
        shipX += (x - shipX) * (reduced ? 1 : ease(0.42));
        x = reduced
          ? shipX
          : shipX + Math.sin(t * 0.5) * 0.004 + Math.sin(t * 0.23) * 0.006;

        // Sample the surface under the hull so the ship rides the same
        // swell the shader draws, rather than bobbing on its own clock.
        //
        // Deliberately sampled WITHOUT uAdvance. Advance runs 0→88 across
        // the page, which is ~14 wave periods, so folding it in made the
        // hull pitch fourteen times over during a single scroll. The
        // water legitimately streams past; the ship should still ride a
        // steady swell while it does.
        const waterUvY = horizon - 0.025;
        const aspect = canvas.width / canvas.height;
        const sea = seaPointAt(x, waterUvY, horizon, aspect, 0);
        const { h, slope } = swellAt(sea.x, sea.y, timeNow);

        // amplitude scales with the ship so a docked (larger) ship moves
        // proportionally rather than twitching
        const targetRise = h * 7 * s;
        const targetPitch = Math.max(-6, Math.min(6, -slope * 4.5));

        shipRise += (targetRise - shipRise) * ease(0.23);
        shipPitch += (targetPitch - shipPitch) * ease(0.23);

        // Position on the outer element, pitch on the hull only — a wake
        // that rolls with the ship looks painted on.
        //
        // Transform only. left and bottom were being rewritten every
        // frame and both trigger layout, so the hull was relaid out 60
        // times a second while the rest of the scene merely composited —
        // which is precisely what made it read as being towed a step
        // behind the water. The element's static left/bottom stay as the
        // anchor and this expresses the offset from it.
        const dx = (x - ANCHOR_X) * wrap.clientWidth;
        const dy =
          -((horizon - 0.025 - ANCHOR_Y) * wrap.clientHeight) + shipRise;
        ship.style.transform =
          `translateX(-50%) translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) ` +
          `scale(${s.toFixed(3)})`;

        const hull = hullRef.current;
        if (hull) hull.style.transform = `rotate(${shipPitch.toFixed(2)}deg)`;
      }

      for (const stop of PARSED) {
        const el = dockRefs.current[stop.id];
        if (!el) continue;
        // fade in as we approach this stop, out as we leave it
        const dist = Math.abs(progress - stop.at);
        const vis = clamp01(1 - dist / 0.26);
        el.style.opacity = String(smooth(vis) * 0.9);
        el.style.bottom = `${horizon * 100 - 0.5}%`;
        // drift sideways so it reads as passing by, not fading in place
        el.style.transform = `translateX(${((progress - stop.at) * -160).toFixed(1)}%)`;
      }

      // Previously this bailed out entirely under reduced motion, which
      // left the sea on a single frozen frame for the whole session.
      raf = requestAnimationFrame(draw);
    };

    const kick = () => {
      if (!raf && !lost) raf = requestAnimationFrame(draw);
    };

    resize();
    kick();

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else kick();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => {
      resize();
      kick();
    });
    ro.observe(wrap);

    const onPointer = (e) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!coarse) window.addEventListener("pointermove", onPointer, { passive: true });

    const mo = new MutationObserver(kick);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-gl="off"
      {...{ "data-ambient": "" }}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden
                 bg-gradient-to-b from-sky-high via-sky-low to-sea-near"
    >
      <div ref={canvasWrapRef} className="absolute inset-0" />

      {/* stars, dark theme only */}
      <div
        className="absolute inset-x-0 top-0 hidden h-[45%] opacity-70 dark:block"
        style={{
          backgroundImage:
            "radial-gradient(1.4px 1.4px at 12% 22%, hsl(0 0% 100%/0.5) 50%, transparent 50%)," +
            "radial-gradient(1.4px 1.4px at 78% 12%, hsl(0 0% 100%/0.38) 50%, transparent 50%)," +
            "radial-gradient(1px 1px at 34% 38%, hsl(0 0% 100%/0.42) 50%, transparent 50%)," +
            "radial-gradient(1.4px 1.4px at 58% 26%, hsl(0 0% 100%/0.32) 50%, transparent 50%)," +
            "radial-gradient(1px 1px at 88% 40%, hsl(0 0% 100%/0.36) 50%, transparent 50%)," +
            "radial-gradient(1px 1px at 46% 15%, hsl(0 0% 100%/0.3) 50%, transparent 50%)",
        }}
      />

      <Birds />

      {/* docks — one per stop that declares one */}
      {voyageStops
        .filter((s) => s.dock)
        .map((s) => {
          const Dock = DOCKS[s.dock];
          if (!Dock) return null;
          return (
            <div
              key={s.id}
              ref={(el) => {
                dockRefs.current[s.id] = el;
              }}
              className="absolute inset-x-0 h-[16vmin] min-h-[90px] opacity-0
                         text-[hsl(215_45%_7%)] dark:text-[hsl(218_60%_4%)]"
              style={{ bottom: "46%" }}
            >
              <Dock className="h-full w-full" />
            </div>
          );
        })}

      {/* the ship, riding the swell */}
      <div
        ref={shipRef}
        className="absolute h-[17vmin] min-h-[84px] w-[24vmin] min-w-[118px]"
        /* left/bottom match ANCHOR_X/ANCHOR_Y and are never rewritten —
           the loop moves the ship with transform alone. */
        style={{
          left: "46%",
          bottom: "43%",
          transform: "translateX(-50%)",
          willChange: "transform",
        }}
      >
        {/* No bob keyframe here — the hull's rise and pitch are driven
            from the shader's own wave height in the render loop. */}
        <div
          ref={hullRef}
          className="h-full w-full origin-bottom text-[hsl(215_50%_8%)] dark:text-[hsl(218_60%_3%)]"
        >
          <Ship className="h-full w-full" />
        </div>

        {/* Wake and reflection smeared on the water directly beneath.
            Without something breaking the waterline the hull reads as
            hovering, however well it's positioned. */}
        <div
          className="absolute inset-x-[14%] top-full h-[26%] -translate-y-[38%]
                     rounded-[50%] bg-[hsl(215_50%_8%)]/35 blur-[6px]
                     dark:bg-[hsl(218_60%_3%)]/45"
        />
        <div
          className="absolute inset-x-[26%] top-full h-[14%] -translate-y-[10%]
                     rounded-[50%] bg-foreground/15 blur-[5px]"
        />
      </div>

    </div>
  );
}
