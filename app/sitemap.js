import { site, navLinks } from "@/content/site";

/** Generated at build time from the nav, so a new route can't be forgotten. */
export default function sitemap() {
  const now = new Date();

  return navLinks.map((link) => ({
    url: new URL(link.href, site.url).toString(),
    lastModified: now,
    changeFrequency: link.href === "/" ? "monthly" : "yearly",
    priority: link.href === "/" ? 1 : 0.8,
  }));
}
