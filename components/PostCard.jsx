"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { useMotionPref } from "./motion/MotionPreference";
import { formatPostDate } from "@/content/posts";

/**
 * forwardRef matters here: AnimatePresence measures its children to run
 * exit animations, and a plain function component silently drops the ref
 * it passes down — the card would just disappear instead of fading.
 */
const PostCard = forwardRef(function PostCard({ post, index = 0 }, ref) {
  const reduced = useMotionPref();

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: reduced ? 0 : 0.45,
        delay: reduced ? 0 : Math.min(index * 0.06, 0.3),
      }}
      className="group relative rounded-2xl border border-border bg-surface/60
                 transition-colors hover:border-primary/40"
    >
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col gap-3 p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          {post.readingTime ? (
            <>
              <span aria-hidden className="opacity-40">/</span>
              <span>{post.readingTime}</span>
            </>
          ) : null}
          {post.source ? (
            <span className="rounded-full border border-border px-2 py-0.5 uppercase tracking-wider">
              {post.source}
            </span>
          ) : null}
        </div>

        <h2 className="h4 flex items-start gap-2 text-balance">
          <span className="transition-colors group-hover:text-primary">
            {post.title}
          </span>
          <ArrowUpRight
            aria-hidden
            size={18}
            className="mt-1 shrink-0 text-muted-foreground transition-all
                       group-hover:-translate-y-0.5 group-hover:translate-x-0.5
                       group-hover:text-primary"
          />
        </h2>

        <p className="line-clamp-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          {post.excerpt}
        </p>

        {post.tags?.length ? (
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-muted px-2.5 py-1 font-mono
                           text-[0.625rem] uppercase tracking-wider text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        <span className="sr-only">(opens on {post.source ?? "an external site"})</span>
      </a>
    </motion.li>
  );
});

export default PostCard;
