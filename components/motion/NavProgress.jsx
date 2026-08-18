"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { useMotionPref } from "./MotionPreference";

/**
 * Navigation progress bar.
 *
 * Next 14 gives no hook for "a navigation is in flight" (useLinkStatus
 * landed in 15), so this watches clicks on internal links and clears
 * itself when the pathname actually changes.
 *
 * It creeps to 90% and waits — never reaching 100% until the new route
 * is really mounted — because a bar that completes early and then sits
 * there is worse than no bar at all.
 */
export default function NavProgress() {
  const pathname = usePathname();
  const reduced = useMotionPref();
  const [active, setActive] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      // let the browser handle anything that isn't a plain left click
      if (e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = e.target.closest?.("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      let url;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      // external links, hash jumps and same-page clicks aren't navigations
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      setActive(true);
      // safety net: if a navigation somehow never lands, don't leave the
      // bar stuck on screen forever
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setActive(false), 8000);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(timer.current);
    };
  }, []);

  // the new route has mounted — finish
  useEffect(() => {
    setActive(false);
    clearTimeout(timer.current);
  }, [pathname]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key="nav-progress"
          aria-hidden
          data-nav-progress=""
          className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left
                     bg-gradient-to-r from-primary via-primary to-lantern"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 0.9 }}
          exit={{ scaleX: 1, opacity: 0 }}
          transition={{
            scaleX: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.25, delay: 0.1 },
          }}
        />
      ) : null}
    </AnimatePresence>
  );
}
