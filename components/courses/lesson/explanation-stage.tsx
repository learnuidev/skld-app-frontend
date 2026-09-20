"use client";

import { LessonVisualView } from "@/components/courses/lesson/figure";
import { cn } from "@/lib/utils";
import type { ExplanationStep, LessonExplanation } from "@/modules/course/types";

/** The ordered walkthrough behind a "Why?": its steps, or one step built from `text`/`visual`. */
export function explanationSteps(explanation: LessonExplanation): ExplanationStep[] {
  if (explanation.steps?.length) return explanation.steps;
  return [{ text: explanation.text ?? "", visual: explanation.visual }];
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
      <LessonVisualView
        visual={step.visual}
        scale={step.visual.kind === "abacus" ? 0.95 : 0.85}
        controls
        abacusLabel="Explanation"
        className="max-w-xl"
      />
    </div>
  );
}
