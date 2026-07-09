"use client";

import { useEffect, useRef } from "react";

/**
 * Animated hero backdrop:
 * - parallax: image drifts slower than scroll (rAF, reduced-motion aware)
 * - ambient Ken-Burns drift so it's never static
 * - pixel-dissolve overlay (Pixl motif) + film grain for texture
 * - scrims for text contrast over the green glow
 */
export function HeroBackground() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        // The image lags the scroll for depth. Factor 0.2 is matched to the
        // -inset-y-[22%] headroom so the translate never uncovers an edge while
        // the hero is on screen. Only translate here — scale/drift live on the
        // child so the CSS animation and this transform never fight.
        el.style.transform = `translate3d(0, ${y * 0.2}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Parallax layer (JS translateY) — oversized top/bottom for headroom */}
      <div
        ref={parallaxRef}
        className="absolute -inset-y-[22%] inset-x-0 will-change-transform"
      >
        {/* Ambient drift (CSS) — a separate element so it never fights the
            parallax transform above it. */}
        <div className="absolute inset-0 hero-drift">
          <img
            src="/hero-horizon.jpg"
            alt=""
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover scale-110"
          />
        </div>
      </div>

      {/* Pixel-dissolve overlay — denser at the edges, animates subtly */}
      <div className="pointer-events-none absolute inset-0 hero-pixels" aria-hidden />

      {/* Film grain — oversized past the drift amplitude so the stepped jitter
          never uncovers an edge (parent clips the overflow). */}
      <div className="pointer-events-none absolute -inset-[12%] hero-grain opacity-[0.06]" aria-hidden />

      {/* Contrast scrims: radial behind text + edges */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(8,9,10,0.72),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  );
}
