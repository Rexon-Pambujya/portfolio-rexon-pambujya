/**
 * Visual check harness.
 *
 *   npm run shots
 *
 * Renders the site at several viewports, themes and scroll positions,
 * then reports WebGL state, horizontal overflow and hydration errors.
 * Uses the locally installed Chrome (channel: "chrome") so there is no
 * browser download.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = process.argv[2] || ".screenshots";
const BASE = process.env.BASE_URL || "http://localhost:3001";

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({
  channel: "chrome",
  args: [
    "--enable-unsafe-swiftshader",
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--ignore-gpu-blocklist",
  ],
});

const runs = [
  { name: "desktop-dark", scheme: "dark", w: 1440, h: 900, scrolls: [0, 0.32, 0.64, 1] },
  { name: "desktop-light", scheme: "light", w: 1440, h: 900, scrolls: [0, 0.64] },
  { name: "mobile-dark", scheme: "dark", w: 390, h: 844, scrolls: [0, 0.5] },
  { name: "reduced", scheme: "dark", w: 1440, h: 900, scrolls: [0], motion: "reduce" },
];

let bad = false;

for (const run of runs) {
  const ctx = await browser.newContext({
    viewport: { width: run.w, height: run.h },
    colorScheme: run.scheme,
    reducedMotion: run.motion || "no-preference",
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") errors.push(`${m.type()}: ${m.text()}`);
  });
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 90000 });

  // next-themes defaults to dark; force light explicitly when asked
  if (run.scheme === "light") {
    await page.evaluate(() => {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    });
    await page.waitForTimeout(400);
  }

  await page.waitForTimeout(2500);

  const gl = await page.evaluate(() => {
    const root = document.querySelector("[data-gl]");
    const c = document.querySelector("canvas");
    return { mode: root?.dataset.gl ?? "missing", canvas: !!c, w: c?.width, h: c?.height };
  });

  for (const s of run.scrolls) {
    await page.evaluate((frac) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: max * frac, behavior: "instant" });
    }, s);
    // let the eased scene catch up to the new position
    await page.waitForTimeout(1600);
    await page.screenshot({ path: path.join(OUT, `${run.name}-s${String(s).replace(".", "")}.png`) });
  }

  const overflow = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    overflowing: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  }));

  const hyd = errors.filter((e) => /hydrat|did not match|server-rendered/i.test(e));
  if (hyd.length || overflow.overflowing || gl.mode !== "on") bad = true;

  console.log(`\n=== ${run.name} (${run.w}x${run.h} ${run.scheme}${run.motion ? " reduce" : ""}) ===`);
  console.log("webgl    :", JSON.stringify(gl));
  console.log("overflow :", overflow.overflowing ? `YES ${overflow.scrollW}>${overflow.clientW}` : "none");
  console.log("hydration:", hyd.length ? "MISMATCH\n  " + hyd.slice(0, 3).join("\n  ") : "clean");
  const other = errors.filter((e) => !hyd.includes(e));
  if (other.length) console.log("other    :\n  " + other.slice(0, 5).join("\n  "));

  await ctx.close();
}

await browser.close();
console.log(`\n${bad ? "!! issues above" : "all clean"} — images in ${OUT}/`);
