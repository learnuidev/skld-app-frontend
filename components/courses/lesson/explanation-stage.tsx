"use client";

import { Abacus } from "@/components/abacus/abacus";
import { DemoPanel } from "@/components/abacus/animated-abacus";
import { cn } from "@/lib/utils";
import type { ExplanationStep, ExplanationVisual, LessonExplanation } from "@/modules/course/types";

/** The ordered walkthrough behind a "Why?": its steps, or one step built from `text`/`visual`. */
export function explanationSteps(explanation: LessonExplanation): ExplanationStep[] {
  if (explanation.steps?.length) return explanation.steps;
  return [{ text: explanation.text ?? "", visual: explanation.visual }];
}

/** The board an explanation step points at, drawn big enough to read from the card. */
function StepVisual({ visual }: { visual: ExplanationVisual }) {
  switch (visual.kind) {
    case "abacus":
      return <Abacus digits={visual.digits} readOnly scale={0.95} label="Explanation" />;
    case "abacus-anim":
      return (
        <DemoPanel
          frames={visual.frames}
          captions={visual.captions}
          label={visual.label ?? "Example"}
          scale={0.85}
          controls
          loop
        />
      );
    case "image":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={visual.src} alt={visual.alt ?? "Explanation"} className="max-h-72 rounded-xl" />
      );
    default:
      return null;
  }
}

/**
 * While "Why?" walks through its steps, the animation for the step in hand takes
 * over the lesson card — the same place the question was — so each instruction
 * arrives with its board rather than in a column beside it.
 */
export function ExplanationStage({ step, className }: { step: ExplanationStep; className?: string }) {
  if (!step.visual) return null;

  return (
    <div className={cn("flex w-full max-w-lg flex-col items-center gap-4", className)}>
      <StepVisual visual={step.visual} />
    </div>
  );
}
