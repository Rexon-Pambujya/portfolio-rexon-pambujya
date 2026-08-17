"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Motion preference, with a visitor-facing override.
 *
 * The OS setting is the default, but it's a blunt instrument: someone who
 * turned off Windows animation effects years ago to speed up an old
 * laptop still gets a completely frozen site, with no way to ask for the
 * animation back. This layers an explicit choice on top, remembered in
 * localStorage.
 *
 * Both the server and the client's first render return `reduced: false`,
 * so hydration always matches; the real preference is applied in an
 * effect immediately afterwards. That's safer than framer's
 * useReducedMotion, which resolves the media query during the first
 * client render and mismatches whatever the server assumed.
 */
const MotionCtx = createContext({
  reduced: false,
  override: null,
  setOverride: () => {},
  systemReduced: false,
});

const STORAGE_KEY = "motion-preference";

export function MotionPreferenceProvider({ children }) {
  const [systemReduced, setSystemReduced] = useState(false);
  // null = follow the OS, "full" = always animate, "reduced" = never
  const [override, setOverrideState] = useState(null);
  // false until the real preference has been read — see the write effect
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setSystemReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "full" || saved === "reduced") setOverrideState(saved);
    } catch {
      /* private mode — just follow the OS */
    }

    setResolved(true);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const setOverride = useCallback((next) => {
    setOverrideState(next);
    try {
      if (next) localStorage.setItem(STORAGE_KEY, next);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const reduced = override ? override === "reduced" : systemReduced;

  /**
   * Lets CSS respond to the override, not just the media query.
   *
   * Gated on `resolved` deliberately. The inline script in layout.jsx has
   * already written the correct value before first paint; writing the
   * hydration-safe default here first would set data-motion to "full",
   * then correct it back a tick later. Every change to the attribute
   * restarts any CSS animation keyed on it, so that flip-flop replayed
   * the intro curtain — visible only to reduced-motion visitors, since
   * for everyone else both values happened to agree.
   */
  useEffect(() => {
    if (!resolved) return;
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
  }, [resolved, reduced]);

  const value = useMemo(
    () => ({ reduced, override, setOverride, systemReduced }),
    [reduced, override, setOverride, systemReduced]
  );

  return <MotionCtx.Provider value={value}>{children}</MotionCtx.Provider>;
}

/** Drop-in replacement for framer's useReducedMotion. */
export function useMotionPref() {
  return useContext(MotionCtx).reduced;
}

export function useMotionControls() {
  return useContext(MotionCtx);
}
