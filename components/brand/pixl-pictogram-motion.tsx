"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useAnimate, useInView, useReducedMotion } from "motion/react";
import { PixlWordmark } from "@/components/brand/pixl-mark";
import { cn } from "@/lib/utils";

export const PICTOGRAM_ROUTE = "M224 403H403V45H45V505L128 425L175 403H224";
export const PICTOGRAM_PATH = "M51 0h346v51h51v346h-51v51H210L99 550H0V51h51V0Zm39 90v343l70-73h198V90H90Z";

const UNIT_ROUTE = "M224 220V403H403V45H45V505L128 425L175 403H224";
const EXTRACTION_END = "10.43%";
// Same command structure as PICTOGRAM_PATH so only corner coordinates move at lock.
const PROGRESS_SHAPE_PATH = "M0 0h448v0h0v448h-90v0H175L95 550H0V0h0V0Zm90 90v326l53-58h215V90H90Z";

type PixlPictogramMotionProps = {
  className?: string;
  color?: string;
  replayKey?: number;
  title?: string;
};

export function PixlPictogramMotion({
  className,
  color,
  replayKey = 0,
  title = "Animated Pixl pictogram",
}: PixlPictogramMotionProps) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { amount: 0.45 });
  const shouldReduceMotion = useReducedMotion();
  const playedRun = useRef(-1);
  const controls = useRef<{ stop: () => void } | null>(null);
  const reduced = Boolean(shouldReduceMotion);

  useEffect(() => {
    if (!isInView || shouldReduceMotion || playedRun.current === replayKey) return;
    playedRun.current = replayKey;
    let cancelled = false;
    let phaseTimer: ReturnType<typeof setTimeout> | undefined;

    const play = async () => {
      controls.current?.stop();
      await Promise.all([
        animate(".pixl-motion-terminal", { opacity: 0, scale: 0.94 }, { duration: 0 }),
        animate(".pixl-motion-unit", { opacity: 1, visibility: "hidden", scale: 1, offsetDistance: "0%" }, { duration: 0 }),
        animate(".pixl-motion-route", { opacity: 1, visibility: "hidden", pathLength: 0 }, { duration: 0 }),
        animate(".pixl-motion-shape", { opacity: 0, d: PROGRESS_SHAPE_PATH }, { duration: 0 }),
      ]);
      if (cancelled) return;

      const wait = (milliseconds: number) => new Promise<void>((resolve) => {
        phaseTimer = setTimeout(resolve, milliseconds);
      });

      controls.current = animate(
        ".pixl-motion-terminal",
        { opacity: [0, 1, 0, 1, 0, 1], scale: [0.94, 1, 0.94, 1, 0.94, 1] },
        { delay: 0.1, duration: 1.8, times: [0, 0.16, 0.32, 0.48, 0.64, 1], ease: "easeInOut" },
      );
      await wait(1620);
      if (cancelled) return;

      await animate(".pixl-motion-unit", { visibility: "visible" }, { duration: 0 });
      if (cancelled) return;
      controls.current = animate(
        ".pixl-motion-unit",
        { offsetDistance: ["0%", EXTRACTION_END] },
        { duration: 1.02, type: "spring", bounce: 0.12 },
      );
      await wait(1020);
      if (cancelled) return;

      await animate(".pixl-motion-route", { visibility: "visible" }, { duration: 0 });
      controls.current = animate(
        ".pixl-motion-route",
        { pathLength: [0, 1] },
        { duration: 2.85, ease: "linear" },
      );
      animate(
        ".pixl-motion-unit",
        { offsetDistance: [EXTRACTION_END, "100%"] },
        { duration: 2.85, ease: "linear" },
      );
      await wait(2850);
      if (cancelled) return;

      await Promise.all([
        animate(".pixl-motion-shape", { opacity: 1, d: PROGRESS_SHAPE_PATH }, { duration: 0 }),
        animate(".pixl-motion-route", { visibility: "hidden" }, { duration: 0 }),
        animate(".pixl-motion-unit", { visibility: "hidden" }, { duration: 0 }),
      ]);
      if (cancelled) return;

      controls.current = animate(".pixl-motion-shape", { d: PICTOGRAM_PATH }, { duration: 0.62, ease: "easeInOut" });
    };

    void play();
    return () => {
      cancelled = true;
      if (phaseTimer) clearTimeout(phaseTimer);
      controls.current?.stop();
    };
  }, [animate, isInView, replayKey, shouldReduceMotion]);

  return (
    <svg
      key={replayKey}
      ref={scope}
      className={className}
      viewBox="0 0 448 550"
      role="img"
      aria-label={title}
      focusable="false"
      style={{ color, overflow: "visible" }}
    >
      <path
        className="pixl-motion-route"
        d={PICTOGRAM_ROUTE}
        opacity="1"
        visibility="hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="90"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
      <rect
        className="pixl-motion-unit"
        opacity="1"
        visibility="hidden"
        x="-46.5"
        y="-46.5"
        width="93"
        height="93"
        rx="8"
        fill="currentColor"
        style={{ offsetPath: `path("${UNIT_ROUTE}")`, offsetDistance: "0%", offsetRotate: "0deg" } as CSSProperties}
      />
      <path
        className="pixl-motion-shape"
        opacity={reduced ? "1" : "0"}
        fill="currentColor"
        fillRule="evenodd"
        d={PICTOGRAM_PATH}
      />
      <rect
        className="pixl-motion-terminal"
        opacity={reduced ? "1" : "0"}
        x="178"
        y="174"
        width="93"
        height="93"
        rx="8"
        fill="currentColor"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
    </svg>
  );
}

type AnimatedPixlLockupProps = {
  className?: string;
  size?: "nav" | "footer";
  tone?: "signal" | "white";
};

export function AnimatedPixlLockup({ className, size = "nav", tone = "white" }: AnimatedPixlLockupProps) {
  const colorClass = tone === "signal" ? "text-primary" : "text-foreground";
  return (
    <span className={cn("inline-flex items-center", size === "nav" ? "gap-1.5" : "gap-3", colorClass, className)} aria-hidden="true">
      <PixlPictogramMotion className={size === "nav" ? "h-6 w-auto" : "h-16 sm:h-20 w-auto"} title="Pixl" />
      <PixlWordmark className={size === "nav" ? "h-5 w-auto" : "h-12 sm:h-16 w-auto"} />
    </span>
  );
}
