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
  description:
    "AI/ML Engineer in Mumbai with 3+ years building LLM applications, RAG systems, AI agents and production ML. Python, LangChain, LangGraph, FastAPI.",

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

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default site;
