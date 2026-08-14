/**
 * Generates the social card as a static PNG.
 *
 *   npm run og
 *
 * Next.js picks up app/opengraph-image.png automatically and wires the
 * og:image / twitter:image metadata for every route.
 *
 * Why not next/og's ImageResponse? It renders through @vercel/og, whose
 * font resolution throws "Invalid URL" when prerendering on Windows, and
 * forcing the edge runtime to dodge that opts the route out of static
 * generation entirely. The card is fixed content, so baking it once is
 * both simpler and free at runtime.
 *
 * Re-run this after changing your name, role or tagline in profile.js.
 */
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

/**
 * The content files use ESM syntax but package.json has no `type:
 * "module"`, so Node loads them as CJS and importing them here throws.
 * Rather than change the whole project's module system for one script,
 * pull the handful of strings out of the source directly.
 */
const readField = (src, key) => {
  const m = src.match(new RegExp(`${key}:\\s*(?:"((?:[^"\\\\]|\\\\.)*)"|\`([^\`]*)\`)`));
  return (m?.[1] ?? m?.[2] ?? "").replace(/\\"/g, '"');
};

const profileSrc = await readFile("content/profile.js", "utf8");
const siteSrc = await readFile("content/site.js", "utf8");

const profile = {
  name: readField(profileSrc, "name"),
  role: readField(profileSrc, "role"),
  location: readField(profileSrc, "location"),
  tagline: readField(profileSrc, "tagline"),
};
const site = {
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    siteSrc.match(/"(https:\/\/[^"]+)"/)?.[1] ||
    "",
};

for (const [k, v] of Object.entries(profile)) {
  if (!v) throw new Error(`could not read "${k}" from content/profile.js`);
}

const W = 1200;
const H = 630;

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c])
  );

/** Crude wrap — good enough for a two-line tagline at a known size. */
function wrap(text, maxChars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxChars) {
      lines.push(line.trim());
      line = w;
    } else {
      line += " " + w;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

const taglineLines = wrap(profile.tagline, 52).slice(0, 2);
const host = site.url.replace(/^https?:\/\//, "");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#060B14"/>
      <stop offset="60%"  stop-color="#11263C"/>
      <stop offset="100%" stop-color="#1B3A52"/>
    </linearGradient>
    <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#2A6076"/>
      <stop offset="100%" stop-color="#06111C"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%"   stop-color="#FFDCA4" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#FFDCA4" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <circle cx="905" cy="196" r="230" fill="url(#glow)"/>
  <circle cx="905" cy="196" r="52" fill="#FFE7BE"/>

  <rect x="0" y="392" width="${W}" height="${H - 392}" fill="url(#sea)"/>
  <rect x="0" y="390" width="${W}" height="2" fill="#35E0C8" opacity="0.5"/>

  <!-- No moon path on the water here: warm ellipses at low opacity over
       the teal desaturate to grey bars. The glow alone reads better. -->

  <!-- ship silhouette -->
  <g fill="#050C15" transform="translate(1010 302) scale(0.42)">
    <path d="M48 174 C92 188 142 193 192 193 C244 193 290 184 318 168 L322 180
             C316 200 296 214 266 219 C204 226 112 224 76 213 C56 207 48 192 48 174 Z"/>
    <path d="M48 174 L52 150 L78 148 L80 178 Z"/>
    <path d="M316 170 L374 140 L377 148 L319 178 Z"/>
    <rect x="107.6" y="82" width="4.8" height="111"/>
    <rect x="175.2" y="42" width="5.6" height="151"/>
    <rect x="245.6" y="68" width="5" height="125"/>
    <path d="M88 88 H132 L136 118 Q110 126 84 118 Z"/>
    <path d="M85 130 H135 L139 160 Q110 168 81 160 Z"/>
    <path d="M151 50 H205 L209 84 Q178 92 147 84 Z"/>
    <path d="M148 96 H208 L212 130 Q178 139 144 130 Z"/>
    <path d="M145 142 H211 L215 176 Q178 185 141 176 Z"/>
    <path d="M222 76 H274 L278 108 Q248 116 218 108 Z"/>
    <path d="M219 120 H277 L281 152 Q248 161 215 152 Z"/>
    <path d="M252 92 L360 132 L338 142 L252 118 Z"/>
    <path d="M107.6 100 L107.6 190 L58 192 L66 108 Z"/>
  </g>

  <text x="72" y="74" font-family="Consolas, monospace" font-size="23" fill="#8FA6BD">${esc(host)}</text>

  <text x="72" y="424" font-family="Consolas, monospace" font-size="24"
        letter-spacing="6" fill="#35E0C8">${esc(`${profile.role} · ${profile.location}`).toUpperCase()}</text>

  <text x="72" y="510" font-family="Georgia, 'Times New Roman', serif" font-size="88"
        font-weight="bold" fill="#E8F1F8">${esc(profile.name)}</text>

  ${taglineLines
    .map(
      (l, i) =>
        `<text x="72" y="${554 + i * 38}" font-family="Segoe UI, Arial, sans-serif" font-size="29" fill="#93A9BF">${esc(l)}</text>`
    )
    .join("\n  ")}
</svg>`;

const out = "app/opengraph-image.png";
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
await writeFile("app/opengraph-image.alt.txt", `${profile.name} — ${profile.role}\n`);

console.log(`wrote ${out} (${W}x${H}) and its alt text`);
