import { profile } from "./profile";

/**
 * Site-wide metadata and navigation.
 *
 * When rexonpambujya.com goes live, change `url` below — it feeds
 * metadataBase, the sitemap, the OG tags and the JSON-LD all at once.
 */
export const site = {
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://rexonpambujya-rexon-pambujyas-projects.vercel.app",

  title: `${profile.name} — ${profile.role}`,
  shortTitle: profile.name,
  description:
    "Software Engineer in Mumbai building AI systems and web applications. Python, machine learning, React and Next.js.",

  keywords: [
    "Rexon Pambujya",
    "Software Engineer",
    "Machine Learning",
    "Python",
    "React",
    "Next.js",
    "Mumbai",
  ],

  locale: "en_IN",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default site;
