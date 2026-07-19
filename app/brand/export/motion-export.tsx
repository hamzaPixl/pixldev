"use client";

import { useState } from "react";
import { PixlPictogramMotion } from "@/components/brand/pixl-pictogram-motion";

export function MotionExport({ color }: { color: string }) {
  const [run, setRun] = useState(0);

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        background: "#08090A",
      }}
    >
      <PixlPictogramMotion
        replayKey={run}
        color={color}
        className="brand-export-pictogram"
        title="Pixl pictogram motion export"
      />
      <button
        type="button"
        data-export-replay
        aria-label="Replay export"
        onClick={() => setRun((value) => value + 1)}
        style={{ position: "fixed", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
      />
      <style>{`.brand-export-pictogram { width: 280px; height: auto; display: block; }`}</style>
    </main>
  );
}
