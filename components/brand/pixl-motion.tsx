"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { PICTOGRAM_PATH, PICTOGRAM_ROUTE, PixlPictogramMotion } from "@/components/brand/pixl-pictogram-motion";

type StoryboardKind = "blink" | "extract" | "start" | "progress50" | "progress100" | "final";

const STORYBOARD_FRAMES: { id: string; time: string; label: string; kind: StoryboardKind }[] = [
  { id: "01", time: "00.9s", label: "Three blinks", kind: "blink" },
  { id: "02", time: "02.2s", label: "Equal-size child", kind: "extract" },
  { id: "03", time: "02.7s", label: "Route starts right", kind: "start" },
  { id: "04", time: "04.0s", label: "Path at 50%", kind: "progress50" },
  { id: "05", time: "05.5s", label: "Route complete", kind: "progress100" },
  { id: "06", time: "06.2s", label: "Corner lock", kind: "final" },
];

function StoryboardGraphic({ kind }: { kind: StoryboardKind }) {
  const progress = kind === "progress50" ? 50 : kind === "progress100" ? 100 : kind === "start" ? 7 : null;
  return (
    <svg viewBox="-60 -55 568 665" aria-hidden="true" focusable="false">
      {kind === "final" && <path fill="currentColor" fillRule="evenodd" d={PICTOGRAM_PATH} />}
      {progress !== null && <path className="motion-storyboard-route" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - progress} d={PICTOGRAM_ROUTE} />}
      <rect x="178" y="174" width="93" height="93" rx="8" fill="currentColor" />
      {kind === "extract" && <>
        <rect x="178" y="292" width="93" height="93" rx="8" fill="currentColor" />
      </>}
      {kind === "start" && <rect x="177.5" y="356.5" width="93" height="93" rx="8" fill="currentColor" />}
      {kind === "progress50" && <rect x="107.5" y="-1.5" width="93" height="93" rx="8" fill="currentColor" />}
      {kind === "progress100" && <rect x="177.5" y="356.5" width="93" height="93" rx="8" fill="currentColor" />}
    </svg>
  );
}

type PixlMotionProps = {
  variant?: "signal" | "white";
  showStoryboard?: boolean;
};

export function PixlMotion({ variant = "signal", showStoryboard = true }: PixlMotionProps) {
  const [run, setRun] = useState(0);

  return (
    <div className={`brand-motion brand-motion-${variant}`}>
      <div className="brand-motion-stage" data-run={run}>
        <span className="motion-label motion-label-top">Pixl / Pictogram reveal</span>
        <span className="motion-label motion-label-bottom">06.4 sec / Finite</span>

        <div className="motion-pictogram-wrap">
          <PixlPictogramMotion replayKey={run} className="motion-pictogram" title={`Animated Pixl pictogram — ${variant}`} />
        </div>
      </div>
      <div className="brand-motion-controls">
        <div>
          <strong>Pixl pictogram reveal</strong>
          <span>Three blinks. Equal-size extraction. One-unit path progress. Pictogram lock.</span>
        </div>
        <button type="button" onClick={() => setRun((value) => value + 1)}>
          <RotateCcw aria-hidden="true" size={16} />
          Replay sequence
        </button>
      </div>
      {showStoryboard && <div className="motion-storyboard" aria-labelledby="motion-storyboard-title">
        <div className="motion-storyboard-heading">
          <strong id="motion-storyboard-title">Frame by frame</strong>
          <span>Reference a frame number when giving feedback.</span>
        </div>
        <div className="motion-storyboard-list">
          {STORYBOARD_FRAMES.map((frame) => (
            <figure key={frame.id}>
              <div className="motion-storyboard-visual"><StoryboardGraphic kind={frame.kind} /></div>
              <figcaption><span>{frame.id}</span><strong>{frame.label}</strong><time>{frame.time}</time></figcaption>
            </figure>
          ))}
        </div>
      </div>}
    </div>
  );
}
