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
  // Kept under ~160 characters so search engines show it whole.
  // Names both target roles — the <title> stays the single clean role, so
  // this is the only place "Data Scientist" can surface in search results.
  description:
    "AI/ML Engineer and Data Scientist in Mumbai. 3+ years building ML models, LLM applications, RAG systems and AI agents. Python, LangChain, FastAPI.",

  // Ordered by the roles being targeted, then the tools recruiters filter on.
  keywords: [
    "Rexon Pambujya",
    "AI/ML Engineer",
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
    "Generative AI",
    "AI Agents",
    "RAG",
    "LLM",
    "LangChain",
    "LangGraph",
    "Fine-tuning",
    "Python",
    "FastAPI",
    "PyTorch",
    "Data Science",
    "Mumbai",
  ],

  locale: "en_IN",
};

/** Also drives the sitemap and the footer — add a route here, not there. */
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

export default site;
