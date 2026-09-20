"use client";

import { Abacus } from "@/components/abacus/abacus";
import { DemoPanel } from "@/components/abacus/animated-abacus";
import { SceneBoard } from "@/components/bridge/scene-board";
import { FigureDrawing } from "@/components/courses/figures";
import { cn } from "@/lib/utils";
import type { LessonFigure, LessonVisual } from "@/modules/course/types";

/**
 * Every drawing a step can put on screen, drawn from the one visual vocabulary:
 * the live board, an animated board, a bridge scene, a named concept diagram or
 * an image. Text steps, "Why?" walkthroughs and bridge content all come through
 * here, so a learner meets the same pictures wherever they are in a lesson.
 */
export function LessonVisualView({
  visual,
  scale = 0.8,
  controls = false,
  abacusLabel = "Abacus",
  className,
}: {
  visual: LessonVisual;
  /** How big the board is drawn; the drawings scale themselves. */
  scale?: number;
  /** Whether an animated board brings its own play controls. */
  controls?: boolean;
  abacusLabel?: string;
  className?: string;
}) {
  switch (visual.kind) {
    case "abacus":
      return <Abacus digits={visual.digits} readOnly scale={scale} label={abacusLabel} />;
    case "abacus-anim":
      return (
        <DemoPanel
          frames={visual.frames}
          captions={visual.captions}
          label={visual.label ?? "Example"}
          scale={scale}
          controls={controls}
          loop={controls}
        />
      );
    case "scene":
      return visual.caption ? (
        <div className="flex w-full flex-col items-center gap-3">
          <SceneBoard
            scene={visual.scene}
            highlight={visual.highlight}
            labels={visual.labels ?? true}
            className={className}
          />
          <p className="max-w-sm text-center text-sm leading-5 text-muted-foreground">
            {visual.caption}
          </p>
        </div>
      ) : (
        <SceneBoard
          scene={visual.scene}
          highlight={visual.highlight}
          labels={visual.labels ?? true}
          className={className}
        />
      );
    case "diagram":
      return (
        <FigureDrawing
          name={visual.name}
          numbers={visual.numbers}
          labels={visual.labels}
          named={visual.named}
        />
      );
    case "image":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={visual.src}
          alt={visual.alt ?? "Explanation"}
          className="max-h-72 rounded-xl"
        />
      );
    default:
      return null;
  }
}

/**
 * A picture beside a text step: the drawing and its one line. Every heading,
 * paragraph and list on the card carries one, so no step is words alone.
 */
export function TextFigure({
  figure,
  scale = 0.72,
  className,
}: {
  figure: LessonFigure;
  scale?: number;
  className?: string;
}) {
  return (
    <figure className={cn("flex w-full flex-col items-center gap-3", className)}>
      <LessonVisualView visual={figure.visual} scale={scale} className="max-w-md" />
      {figure.caption ? (
        <figcaption className="max-w-sm text-center text-sm leading-5 text-muted-foreground">
          {figure.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
