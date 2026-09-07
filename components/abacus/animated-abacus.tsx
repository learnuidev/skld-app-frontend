"use client";

import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";

import { Abacus, digitsToValue } from "./abacus";
import { cn } from "@/lib/utils";

function displayValue(digits: number[]): string {
  return digitsToValue(digits).toLocaleString("en-US");
}

export interface DemoSceneProps {
  /** Ordered abacus states; frames[0] is the units rod. Each frame is one step. */
  frames: number[][];
  /** Optional caption per frame. */
  captions?: string[];
  /** Which frame to render. */
  index: number;
  label?: string;
  scale?: number;
  /** Show the per-step caption (or the current value). */
  showCaption?: boolean;
  className?: string;
}

/**
 * A presentational abacus snapshot for one step of a demonstration. It does not
 * own playback state — the parent drives `index`.
 */
export function DemoScene({
  frames,
  captions,
  index,
  label = "Example",
  scale = 0.7,
  showCaption = true,
  className,
}: DemoSceneProps) {
  const safeFrames = frames && frames.length > 0 ? frames : [[0]];
  const current = Math.min(Math.max(index, 0), safeFrames.length - 1);
  const digits = safeFrames[current] ?? [];
  const caption = captions?.[current];

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <Abacus digits={digits} readOnly scale={scale} label={label} />
      {showCaption ? (
        <p className="max-w-[280px] text-center text-sm leading-snug text-foreground/80">
          {caption ?? displayValue(digits)}
        </p>
      ) : null}
    </div>
  );
}

const CONTROL_BUTTON =
  "flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors " +
  "hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35";

export interface DemoPanelProps {
  /** Ordered abacus states; frames[0] is the units rod. Each frame is one step. */
  frames: number[][];
  /** Optional caption per frame. */
  captions?: string[];
  label?: string;
  scale?: number;
  /** Milliseconds to hold each frame while auto-playing. */
  interval?: number;
  /** Repeat forever instead of stopping on the last frame. */
  loop?: boolean;
  /** Begin playing as soon as the component mounts. */
  autoPlay?: boolean;
  /** Show the play/step/replay controls. Set false to play silently on its own. */
  controls?: boolean;
  /** Show the per-step caption (or current value). */
  showCaption?: boolean;
  className?: string;
}

/**
 * A self-contained animated abacus demonstration. It plays through a sequence of
 * bead states on its own, showing the abacus, its per-step caption, and the
 * playback controls beneath. Used inline to illustrate an explanation.
 */
export function DemoPanel({
  frames,
  captions,
  label = "Example",
  scale = 0.75,
  interval = 1400,
  loop = false,
  autoPlay = true,
  controls = true,
  showCaption = true,
  className,
}: DemoPanelProps) {
  const safeFrames = useMemo(
    () =>
      frames && frames.length > 0
        ? frames
        : [Array.from({ length: 1 }, () => 0)],
    [frames],
  );
  const total = safeFrames.length;
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const current = Math.min(Math.max(idx, 0), total - 1);
  const single = total === 1;

  useEffect(() => {
    if (!playing || single) return;
    const t = window.setTimeout(() => {
      if (current < total - 1) {
        setIdx((i) => Math.min(total - 1, i + 1));
      } else if (loop) {
        setIdx(0);
      } else {
        setPlaying(false);
      }
    }, interval);
    return () => window.clearTimeout(t);
  }, [playing, current, total, interval, loop, single]);

  const restart = () => {
    setIdx(0);
    setPlaying(true);
  };

  const toggle = () => {
    if (!playing && current >= total - 1) {
      setIdx(0);
      setPlaying(true);
      return;
    }
    setPlaying((p) => !p);
  };

  const stepTo = (dir: -1 | 1) => {
    setPlaying(false);
    setIdx((i) => Math.min(total - 1, Math.max(0, i + dir)));
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 bg-gray-50 p-4 rounded-2xl w-full",
        className,
      )}
    >
      <DemoScene
        frames={safeFrames}
        captions={captions}
        index={current}
        label={label}
        scale={scale}
        showCaption={showCaption}
      />

      {controls && !single ? (
        <div className="flex flex-col items-center gap-3 mt-4">
          <div className="flex items-center gap-1.5" aria-hidden>
            {safeFrames.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === current
                    ? "w-5 bg-foreground"
                    : "w-1.5 bg-muted-foreground/30",
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5 mt-4">
            <button
              type="button"
              onClick={() => stepTo(-1)}
              disabled={current === 0}
              aria-label="Previous step"
              className={CONTROL_BUTTON}
            >
              <SkipBack className="size-4" />
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause" : "Play"}
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105"
            >
              {playing ? (
                <Pause className="size-4" />
              ) : (
                <Play className="size-4 translate-x-[1px]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => stepTo(1)}
              disabled={current === total - 1}
              aria-label="Next step"
              className={CONTROL_BUTTON}
            >
              <SkipForward className="size-4" />
            </button>
            {/* <button
              type="button"
              onClick={restart}
              aria-label="Replay"
              className={CONTROL_BUTTON}
            >
              <RotateCcw className="size-4" />
            </button> */}
          </div>
        </div>
      ) : null}
    </div>
  );
}
