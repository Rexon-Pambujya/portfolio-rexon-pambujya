/**
 * Writing.
 *
 * Posts live wherever you publish them — Medium for now — and this file
 * is the index. Nothing here renders article bodies; each card links out.
 *
 * To add a post: copy a block, fill it in, done. Order doesn't matter,
 * `posts` below sorts by date descending so the newest is always first.
 *
 * `tags` drive the filter row, so keep them consistent between posts —
 * "AI Agents" and "Agents" would show up as two separate filters.
 *
 * @type {import('./types').Post[]}
 */
const entries = [
  {
    slug: "designing-production-ready-agentic-ai-systems",
    title: "Designing Production-Ready Agentic AI Systems",
    excerpt:
      "A practical reference architecture for building reliable, observable and scalable AI agents — and the mental model for deciding what belongs in the agent versus around it.",
    url: "https://medium.com/@rexonpambujya2001_23092/mental-model-for-designing-production-ready-agentic-ai-systems-4a73a16abddd",
    date: "2026-07-01",
    readingTime: "4 min read",
    tags: ["AI Agents", "LLM", "Architecture"],
    source: "Medium",
  },
];

/** Newest first. Sorted here so no page has to remember to do it. */
export const posts = [...entries].sort((a, b) => b.date.localeCompare(a.date));

/**
 * Every tag in use, ordered by how many posts carry it, then
 * alphabetically. Keeps the busiest filters nearest the front.
 */
export const postTags = Object.entries(
  posts.reduce((counts, post) => {
    for (const tag of post.tags ?? []) counts[tag] = (counts[tag] ?? 0) + 1;
    return counts;
  }, {})
)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([tag, count]) => ({ tag, count }));

/**
 * Deterministic date formatting.
 *
 * toLocaleDateString() reads the runtime's locale and timezone, which
 * differ between the server and the visitor's browser — that renders two
 * different strings and trips a hydration mismatch.
 */
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatPostDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export default posts;
