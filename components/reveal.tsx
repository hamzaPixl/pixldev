"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Fade + rise the children in once they scroll into view.
 *
 * Fail-visible by design: the server and first client render output the
 * content fully visible. Only once JS has confirmed it is running — in a
 * layout effect, before paint, so there is no flash — do we arm the hidden
 * pre-reveal state and start observing. If JS never runs, hydration dies, or a
 * bot renders without scrolling and without executing our effects, the content
 * stays visible instead of collapsing into a blank void. Reduced motion skips
 * the animation entirely.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [armed]);

  const hidden = armed && !shown;

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(0.25,0,0.1,1)] motion-reduce:transition-none",
        hidden ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0",
        className
      )}
    >
      {children}
    </Tag>
  );
}
