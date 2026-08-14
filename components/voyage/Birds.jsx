import { memo } from "react";

/**
 * Gulls wheeling over the water.
 *
 * They used to track in a straight line from one edge to the other, which
 * reads as a screensaver rather than a bird. Each one now rides an
 * ellipse — `soar-x` and `soar-y` are a cosine and a sine of the same
 * period, composed on nested elements — so it banks, slows through the
 * turns and comes back around.
 *
 * The silhouette is deliberately symmetric (wings out, no beak or tail),
 * which is how a gull reads at distance and means nothing has to flip
 * when the bird changes direction.
 *
 * SVG path data can't be tweened in CSS, so each wing is its own <g>
 * rotating about the body. `transform-box: fill-box` is what makes
 * transform-origin resolve against the shape rather than the SVG
 * viewport — without it the wings pivot around the canvas corner.
 */
const WING_L = { transformBox: "fill-box", transformOrigin: "100% 50%" };
const WING_R = { transformBox: "fill-box", transformOrigin: "0% 50%" };

function Bird({ flap }) {
  return (
    <svg
      viewBox="0 0 44 22"
      className="h-full w-full overflow-visible"
      fill="currentColor"
      aria-hidden
    >
      <g className="animate-flap-l" style={{ ...WING_L, animationDuration: flap }}>
        <path d="M22 11 C16 6 9 4 2 6 C9 8 15 10 22 13 Z" />
      </g>
      <g className="animate-flap-r" style={{ ...WING_R, animationDuration: flap }}>
        <path d="M22 11 C28 6 35 4 42 6 C35 8 29 10 22 13 Z" />
      </g>
      <ellipse cx="22" cy="11.5" rx="2.4" ry="1.4" />
    </svg>
  );
}

/**
 * Hand-placed rather than random, so the flock reads as a composition and
 * renders identically on server and client.
 */
const FLOCK = [
  { left: "24%", top: "15%", size: 26, ax: "9vw", ay: "3.2vh", dur: 27, delay: 0, flap: "0.85s", opacity: 0.42 },
  { left: "52%", top: "11%", size: 19, ax: "12vw", ay: "2.4vh", dur: 34, delay: -11, flap: "1.05s", opacity: 0.32 },
  { left: "70%", top: "19%", size: 15, ax: "7vw", ay: "3.8vh", dur: 22, delay: -6, flap: "0.72s", opacity: 0.26 },
];

function Birds() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[45%]" aria-hidden>
      {FLOCK.map((b, i) => (
        <div key={i} className="absolute" style={{ left: b.left, top: b.top }}>
          <div
            className="animate-soar-x"
            style={{
              "--ax": b.ax,
              animationDuration: `${b.dur}s`,
              animationDelay: `${b.delay}s`,
            }}
          >
            <div
              className="animate-soar-y"
              style={{
                "--ay": b.ay,
                animationDuration: `${b.dur}s`,
                animationDelay: `${b.delay}s`,
              }}
            >
              <div
                className="text-[hsl(215_35%_25%)] dark:text-[hsl(206_30%_70%)]"
                style={{ width: b.size, height: b.size / 2, opacity: b.opacity }}
              >
                <Bird flap={b.flap} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(Birds);
