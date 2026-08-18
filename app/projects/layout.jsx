import { profile } from "@/content/profile";

/**
 * The page itself is a client component (it owns the category filter
 * state), and client components can't export `metadata` — hence this
 * layout, mirroring app/writing/layout.jsx.
 *
 * Without it the route inherited the root layout's metadata wholesale,
 * so /projects shipped the homepage's exact <title> and description, and
 * a canonical pointing at "/" — which tells search engines this page is
 * a duplicate of the homepage and shouldn't be indexed on its own.
 */
export const metadata = {
  title: "Projects",
  description: `Machine learning, LLM and full-stack projects built by ${profile.name} — RAG systems, AI agents, fine-tuned models and production APIs.`,
  alternates: { canonical: "/projects" },
  openGraph: { url: "/projects" },
};

export default function ProjectsLayout({ children }) {
  return children;
}
