import { profile } from "@/content/profile";

/**
 * The page itself is a client component (it owns the tag filter state),
 * and client components can't export `metadata` — hence this layout.
 */
export const metadata = {
  title: "Writing",
  description: `Notes on building AI systems by ${profile.name} — agents, RAG, LLM applications and production ML.`,
  alternates: { canonical: "/writing" },
};

export default function WritingLayout({ children }) {
  return children;
}
