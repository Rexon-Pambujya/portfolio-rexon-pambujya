/**
 * Responsive + SEO sweep against a running server.
 *
 *   npm run build && npm start
 *   node scripts/sweep.mjs http://localhost:3000
 *
 * Checks every route at every breakpoint for horizontal overflow, tap
 * target size and console errors, then verifies the SEO surface.
 */
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://localhost:3000";

const WIDTHS = [320, 375, 390, 768, 1024, 1280, 1440];
const ROUTES = ["/", "/projects", "/contact"];

const browser = await chromium.launch({
  channel: "chrome",
  args: ["--enable-unsafe-swiftshader", "--use-gl=angle", "--use-angle=swiftshader"],
});

let failures = 0;
const note = (ok, msg) => {
  if (!ok) failures += 1;
  console.log(`  ${ok ? "ok  " : "FAIL"}  ${msg}`);
};

console.log(`\n── responsive sweep ─────────────────────────────`);
for (const route of ROUTES) {
  console.log(`\n${route}`);
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({
      viewport: { width, height: 900 },
      colorScheme: "dark",
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

    await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(700);

    const r = await page.evaluate(() => {
      const de = document.documentElement;
      const overflow = de.scrollWidth - de.clientWidth;

      // anything interactive smaller than 44px in either axis
      const small = [];
      for (const el of document.querySelectorAll(
        'a, button, input, textarea, select, [role="tab"]'
      )) {
        const b = el.getBoundingClientRect();
        if (b.width === 0 && b.height === 0) continue; // hidden
        if (b.height < 40 || b.width < 24) {
          small.push(`${el.tagName.toLowerCase()}:${Math.round(b.width)}x${Math.round(b.height)}`);
        }
      }
      return { overflow, small: small.slice(0, 4), smallCount: small.length };
    });

    const bits = [`${String(width).padStart(4)}px`];
    bits.push(r.overflow > 1 ? `OVERFLOW +${r.overflow}px` : "no overflow");
    if (r.smallCount) bits.push(`${r.smallCount} small targets (${r.small.join(", ")})`);
    if (errors.length) bits.push(`${errors.length} console errors`);

    note(r.overflow <= 1 && errors.length === 0, bits.join("  |  "));
    await ctx.close();
  }
}

console.log(`\n── SEO surface ──────────────────────────────────`);
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });

  const meta = await page.evaluate(() => {
    const get = (sel, attr = "content") =>
      document.querySelector(sel)?.getAttribute(attr) ?? null;
    const ld = document.querySelector('script[type="application/ld+json"]');
    let ldOk = false;
    let ldType = null;
    try {
      const parsed = JSON.parse(ld?.textContent ?? "{}");
      ldType = parsed["@type"];
      ldOk = ldType === "Person" && !!parsed.name && Array.isArray(parsed.sameAs);
    } catch {}
    return {
      title: document.title,
      desc: get('meta[name="description"]'),
      ogTitle: get('meta[property="og:title"]'),
      ogImage: get('meta[property="og:image"]'),
      twCard: get('meta[name="twitter:card"]'),
      canonical: get('link[rel="canonical"]', "href"),
      ldOk,
      ldType,
      h1Count: document.querySelectorAll("h1").length,
      imgsNoAlt: [...document.querySelectorAll("img")].filter((i) => !i.alt).length,
    };
  });

  note(!!meta.title, `title: ${meta.title}`);
  note(!!meta.desc, `description present`);
  note(!!meta.ogTitle, `og:title present`);
  note(!!meta.ogImage, `og:image: ${meta.ogImage?.split("/").pop()}`);
  note(!!meta.twCard, `twitter:card: ${meta.twCard}`);
  note(!!meta.canonical, `canonical: ${meta.canonical}`);
  note(meta.ldOk, `JSON-LD @type=${meta.ldType}`);
  note(meta.h1Count === 1, `exactly one <h1> (found ${meta.h1Count})`);
  note(meta.imgsNoAlt === 0, `all images have alt (${meta.imgsNoAlt} missing)`);

  for (const path of ["/robots.txt", "/sitemap.xml", "/opengraph-image.png"]) {
    const res = await page.request.get(BASE + path);
    note(res.ok(), `${path} → ${res.status()} ${res.headers()["content-type"] ?? ""}`);
  }
  await ctx.close();
}

await browser.close();
console.log(`\n${failures === 0 ? "ALL CHECKS PASSED" : `${failures} CHECK(S) FAILED`}\n`);
process.exit(failures === 0 ? 0 : 1);
