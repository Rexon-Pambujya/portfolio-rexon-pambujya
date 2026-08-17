"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import PostCard from "@/components/PostCard";
import Reveal from "@/components/motion/Reveal";
import { useMotionPref } from "@/components/motion/MotionPreference";
import { posts, postTags } from "@/content/posts";

export default function WritingPage() {
  const [active, setActive] = useState("all");
  const reduced = useMotionPref();

  // `posts` already arrives newest-first, and filter() preserves order.
  const filtered = useMemo(
    () => (active === "all" ? posts : posts.filter((p) => p.tags?.includes(active))),
    [active]
  );

  return (
    <section className="deck my-5 max-w-4xl py-20 sm:my-8 sm:py-28">
      <div className="container">
        <Reveal from="fade" className="mb-10 sm:mb-14">
          <p className="eyebrow mb-3">Writing</p>
          <h1 className="section-title">Notes from the work</h1>
          <p className="subtitle mt-4 max-w-xl">
            Things I've figured out building AI systems, written down so I
            don't have to figure them out twice. Newest first.
          </p>
        </Reveal>

        {posts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border px-6 py-16 text-center text-muted-foreground">
            First post is on its way.
          </p>
        ) : (
          <>
            {postTags.length > 1 ? (
              <div className="chip-row mask-fade-x mb-10 sm:mb-12" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={active === "all"}
                  data-active={active === "all"}
                  onClick={() => setActive("all")}
                  className="chip"
                >
                  All
                  <span className="ml-1.5 opacity-50">{posts.length}</span>
                </button>

                {postTags.map(({ tag, count }) => (
                  <button
                    key={tag}
                    type="button"
                    role="tab"
                    aria-selected={active === tag}
                    data-active={active === tag}
                    onClick={() => setActive(tag)}
                    className="chip"
                  >
                    {tag}
                    <span className="ml-1.5 opacity-50">{count}</span>
                  </button>
                ))}
              </div>
            ) : null}

            <motion.ul layout={!reduced} className="grid gap-4 sm:gap-5">
              <AnimatePresence mode="popLayout">
                {filtered.map((post, i) => (
                  <PostCard key={post.slug} post={post} index={i} />
                ))}
              </AnimatePresence>
            </motion.ul>

            {filtered.length === 0 ? (
              <p className="py-16 text-center text-muted-foreground">
                Nothing tagged “{active}” yet.
              </p>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
