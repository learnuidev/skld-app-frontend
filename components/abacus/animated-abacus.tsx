"use client";

import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";

import { Abacus, digitsToValue } from "./abacus";
import { cn } from "@/lib/utils";

export interface AnimatedAbacusProps {
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
  className?: string;
}

function displayValue(digits: number[]): string {
  return digitsToValue(digits).toLocaleString("en-US");
}

/**
 * An abacus that plays through a sequence of bead states, animating the move
 * between each frame. Used to illustrate an explanation: the beads slide toward
 * and away from the beam so the learner can see what a step actually does.
 */
export function AnimatedAbacus({
  frames,
  captions,
  label = "Example",
  scale = 0.8,
  interval = 1300,
  loop = false,
  autoPlay = true,
  className,
}: AnimatedAbacusProps) {
  const safeFrames = useMemo(
    () => (frames && frames.length > 0 ? frames : [Array.from({ length: 1 }, () => 0)]),
    [frames],
  );
  const total = safeFrames.length;
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const current = Math.min(Math.max(idx, 0), total - 1);
  const digits = safeFrames[current] ?? [];
  const caption = captions?.[current];

  // Auto-advance while playing; stop (or loop) at the last frame.
  useEffect(() => {
    if (!playing) return;
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
  }, [playing, current, total, interval, loop]);

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
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <Abacus digits={digits} readOnly scale={scale} label={label} />

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-1.5" aria-hidden>
          {safeFrames.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === current ? "w-5 bg-foreground" : "w-1.5 bg-muted-foreground/30",
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => stepTo(-1)}
            disabled={current === 0}
            aria-label="Previous frame"
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            <SkipBack className="size-4" />
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause animation" : "Play animation"}
            className="flex size-10 items-center justify-center rounded-full bg-foreground text-background transition-colors hover:opacity-90"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4 translate-x-[1px]" />}
          </button>
          <button
            type="button"
            onClick={() => stepTo(1)}
            disabled={current === total - 1}
            aria-label="Next frame"
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            <SkipForward className="size-4" />
          </button>
          <button
            type="button"
            onClick={restart}
            aria-label="Replay"
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <RotateCcw className="size-4" />
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold tabular-nums">
            {displayValue(digits)}
            <span className="font-normal text-muted-foreground">
              {" · "}Step {current + 1} of {total}
            </span>
          </p>
          {caption ? (
            <p className="mt-1 max-w-xs text-sm leading-relaxed text-muted-foreground">{caption}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
