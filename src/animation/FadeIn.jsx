import { createContext, useContext, useEffect, useRef, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import { motion } from "../theme/tokens";

// Entrance transition wrapper. A section reveals once, the first time it enters
// the viewport, and never again. While `prefers-reduced-motion: reduce` is
// active, or when the caller asks for an immediate reveal, the children render
// in their final state and no observer is created at all.
//
// The wrapper does not move itself. It publishes the timing and carries the
// state class, and `index.css` reveals the content children of the section in
// sequence off that class, so a heading lands before the cards under it. A
// wrapper nested inside another wrapper has no section content of its own, so
// it reveals itself instead; `InsideFadeIn` is how it knows.

// Per child step of the stagger, derived from the existing delay token. Half a
// delay is enough offset to read as a sequence without holding the last child
// back. Proposed token name: `motion.step`.
export const STAGGER_STEP = Math.round(motion.delay / 2);

// How deep the stagger goes. Past this tier every remaining child shares the
// last delay, which is what keeps the slowest arrival inside `motion.budget`:
// duration + tiers * step. Children beyond the last tier arrive together
// rather than trailing off the budget. Proposed token name: `motion.tiers`.
export const STAGGER_TIERS = Math.max(
  0,
  Math.floor((motion.budget - motion.duration) / STAGGER_STEP)
);

// The slowest a section can finish revealing, start of the reveal to the last
// child settling. `index.css` declares tier rules to `STAGGER_TIERS` depth.
export const STAGGER_TOTAL = motion.duration + STAGGER_TIERS * STAGGER_STEP;

// Timing reaches the stylesheet as custom properties only, so the transition
// cannot drift from the tokens and the stylesheet holds no duration of its own.
const timingStyle = {
  "--motion-duration": `${motion.duration}ms`,
  "--motion-delay": `${motion.delay}ms`,
  "--motion-step": `${STAGGER_STEP}ms`,
};

const InsideFadeIn = createContext(false);

// `id` is optional and lands on the rendered wrapper in every branch, so the
// section stays a react-scroll target whether the transition runs or not. An
// omitted id renders no attribute.
//
// `immediate` renders the final state on the first paint with no observer, for
// content above the fold that must not wait to be seen.
export default function FadeIn({
  children,
  id,
  threshold = 0.2,
  immediate = false,
}) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const nested = useContext(InsideFadeIn);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const skip = reduceMotion || immediate;

  useEffect(() => {
    if (skip) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // one entrance, then done
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold,
      }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, skip]);

  if (skip) {
    return (
      <InsideFadeIn.Provider value={true}>
        <div id={id}>{children}</div>
      </InsideFadeIn.Provider>
    );
  }

  const className = [
    "fade-in",
    nested ? "fade-in-leaf" : null,
    isVisible ? "visible" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <InsideFadeIn.Provider value={true}>
      <div id={id} ref={ref} className={className} style={timingStyle}>
        {children}
      </div>
    </InsideFadeIn.Provider>
  );
}
