# Updating your site

Everything on the site reads from this folder. You should never need to open a
component file to change your own details.

Edit a file → `git commit` → `git push` → Vercel redeploys in ~40 seconds.

| I want to change... | Open |
| --- | --- |
| Name, role, bio, email, resume, hero headline | `profile.js` |
| A job (add / edit / remove) | `experience.js` |
| Degrees and schools | `education.js` |
| Skills and soft skills | `skills.js` |
| Projects and the category filter | `projects.js` |
| LinkedIn / GitHub / LeetCode links | `socials.js` |
| Page titles, meta description, nav | `site.js` |
| The hero video | `hero.js` |

---

## Add a job

Copy this to the **top** of the array in `experience.js` — the list renders in
array order, so newest first.

```js
{
  company: "Company Name",
  role: "Your Title",
  location: "Mumbai",
  start: "Mar 2027",
  end: "Present",
  current: true,          // pins it top and shows the live dot
  url: "https://example.com",
  summary: "One line on what the work was.",
  highlights: [
    "A thing you shipped and what it changed.",
    "Another thing.",
  ],
  stack: ["Python", "React"],
},
```

Set `current: false` and give the old job a real `end` date when you move on.

## Add a project

```js
{
  slug: "unique-id",        // also the React key — must be unique
  name: "Project Name",
  category: "react",        // must match an id in `categories` below
  description: "Two sentences, max.",
  image: "/work/16.webp",   // run the optimiser first, see below
  github: "https://github.com/...",
  live: "https://...",      // optional
  tags: ["React"],
  featured: true,           // shows on the homepage
},
```

### Adding a project image

Drop the raw screenshot (PNG/JPG, any size) into `public/work/`, then:

```bash
npm run optimize:images
```

It resizes to 1200px wide, writes a `.webp` next to it, and leaves the
original alone. Reference the `.webp` path in `projects.js`, then delete
the original PNG so it doesn't ship.

## Bold text in your bio

`profile.js` bio paragraphs support markdown-style bold:

```js
"I work mainly in **Python** and **React**."
```

Do **not** paste Unicode bold characters (`𝗣𝘆𝘁𝗵𝗼𝗻`) — they look right but
screen readers read them out as individual math symbols and Google can't
index them.

---

## The hero video

The hero currently renders a code-drawn animated ocean. That's the intended
default and it needs no assets. To swap in cinematic footage:

### 1. Generate one still image

Midjourney, Flux, or Imagen. Starting prompt:

> Cinematic aerial drone shot, photoreal. A wooden tall ship with billowing
> sails cuts through a deep indigo ocean at golden hour. A stout bearded
> dwarven captain in leather and iron stands at the helm. Far in the distance
> a great dragon banks slowly across the sky, silhouetted against low sun.
> Bioluminescent whales breach alongside the hull, trailing teal light.
> Volumetric god rays, sea spray, slow push-in. Anamorphic, shallow depth of
> field, 35mm.

Compose it with **empty space in the left third** — that's where the headline
sits. Aspect 16:9.

### 2. Animate it into a seamless loop

Use that still as **both the first and last frame** of an image-to-video
generation. Kling and Runway both support start+end frame conditioning. This
is what makes the loop seamless without any crossfade, and it means the poster
and the video's first frame match exactly, so there's no flash on load.

Ask for 8–10 seconds of *slow ambient motion only* — drifting sails, rolling
swell, the dragon banking once. Fast motion makes the loop point obvious and
balloons the file size.

Cost at time of writing: Kling 3.0 is ~$0.10/sec and is the right place to
iterate; Veo 3.1 at $0.15/sec fast mode is the right place to do the final
render. Budget $25–40 including re-rolls. Avoid Sora 2 — the API is scheduled
to shut down 24 Sept 2026.

### 3. Encode

```bash
# AV1 / WebM — desktop primary. Target ≤ 2.5 MB.
ffmpeg -i src.mp4 -vf "scale=1920:-2,fps=30" \
  -c:v libsvtav1 -crf 40 -preset 6 -g 120 -an public/hero/voyage.webm

# H.264 / MP4 — universal fallback. Target ≤ 4 MB.
ffmpeg -i src.mp4 -vf "scale=1600:-2,fps=30" \
  -c:v libx264 -crf 28 -preset slow -profile:v high -pix_fmt yuv420p \
  -an -movflags +faststart public/hero/voyage.mp4

# Poster — from your original still, not from the video.
npx @squoosh/cli --avif '{"cqLevel":34}' -d public/hero still.png
```

Check the sizes. If the WebM is over ~3 MB, raise `-crf` to 44 and re-encode;
ocean footage is forgiving because the motion is soft.

### 4. Point `hero.js` at them

```js
media: {
  poster: "/hero/voyage-poster.avif",
  webm:   "/hero/voyage.webm",
  mp4:    "/hero/voyage.mp4",
  alt:    "A tall ship under sail on open ocean at dusk.",
}
```

Done. The component handles the rest — the video only downloads after the
page has painted, on a fast connection, with Data Saver off, and with
"reduce motion" off. On mobile cellular, visitors get the still, which is
deliberate: it keeps the page fast where it matters most.
