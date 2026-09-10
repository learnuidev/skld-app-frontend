"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, X } from "lucide-react";

import { Abacus } from "@/components/abacus/abacus";
import { DemoPanel } from "@/components/abacus/animated-abacus";
import { PillButton } from "@/components/courses/lesson/pill-button";
import { cn } from "@/lib/utils";
import type { ExplanationStep, ExplanationVisual, LessonExplanation } from "@/modules/course/types";

function StepVisual({ visual }: { visual: ExplanationVisual }) {
  switch (visual.kind) {
    case "abacus":
      return <Abacus digits={visual.digits} readOnly scale={0.62} label="Explanation" />;
    case "abacus-anim":
      return (
        <DemoPanel
          frames={visual.frames}
          captions={visual.captions}
          label={visual.label ?? "Example"}
          scale={0.62}
          controls
          loop
        />
      );
    case "image":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={visual.src} alt={visual.alt ?? "Explanation"} className="max-h-64 rounded-xl" />
      );
    default:
      return null;
  }
}

/**
 * "Why?" — the answer explained like a chat with the tutor. Each line stays
 * where it landed, and "next" appends the following instruction underneath, so
 * the earlier reasoning is still there to read while the new line arrives.
 */
export function ExplanationRail({
  explanation,
  onClose,
  active = true,
  className,
}: {
  explanation: LessonExplanation;
  onClose: () => void;
  /** Whether the rail is on screen: reopening follows the latest line again. */
  active?: boolean;
  className?: string;
}) {
  const steps: ExplanationStep[] = explanation.steps?.length
    ? explanation.steps
    : [{ text: explanation.text ?? "", visual: explanation.visual }];
  const [index, setIndex] = useState(0);
  const last = index >= steps.length - 1;
  const reduceMotion = useReducedMotion();
  const endRef = useRef<HTMLDivElement | null>(null);

  // The transcript only ever grows, so keep the newest instruction in view.
  useEffect(() => {
    const el = endRef.current;
    if (!active || !el || typeof el.scrollIntoView !== "function") return;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "end" });
  }, [active, index, reduceMotion]);

  /** Everything said so far — the previous instructions plus the current one. */
  const transcript = steps.slice(0, index + 1);

  return (
    <aside
      aria-label="Why this is the answer"
      className={cn(
        "flex min-h-0 flex-col rounded-2xl border border-lesson-line bg-card sm:rounded-3xl",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-3 px-4 pt-4 pb-2">
        <div className="min-w-0">
          <h2 className="text-base font-bold">Why this is the answer</h2>
          {steps.length > 1 ? (
            <p className="text-xs text-muted-foreground">
              Step {index + 1} of {steps.length}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close explanation"
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-lesson-soft hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </header>

      <div
        role="log"
        aria-live="polite"
        className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4 sm:px-5"
      >
        {transcript.map((step, i) => {
          const latest = i === index;
          return (
            <motion.div
              key={i}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex items-start gap-2.5"
            >
              <span
                aria-hidden
                className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-lesson-soft text-muted-foreground"
              >
                <Sparkles className="size-3.5" />
              </span>

              <div className="flex min-w-0 flex-1 flex-col items-start gap-3">
                {/* The board only belongs to the line being explained now; older
                    lines keep their words rather than replaying their animation. */}
                {latest && step.visual ? (
                  <div className="flex w-full justify-center">
                    <StepVisual visual={step.visual} />
                  </div>
                ) : null}

                {step.text ? (
                  <div
                    className={cn(
                      "rounded-2xl rounded-bl-sm border px-4 py-2.5 transition-colors",
                      latest
                        ? "border-lesson-quip-line bg-lesson-quip"
                        : "border-lesson-line bg-lesson-soft",
                    )}
                  >
                    <p
                      className={cn(
                        "text-base leading-6",
                        latest ? "text-foreground" : "text-foreground/75",
                      )}
                    >
                      {step.text}
                    </p>
                  </div>
                ) : null}
              </div>
            </motion.div>
          );
        })}

        {/* The scroll target: the newest line always lands here. */}
        <div ref={endRef} aria-hidden className="h-px shrink-0" />
      </div>

      <footer className="flex shrink-0 items-center justify-between gap-3 px-4 pt-3 pb-4">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          aria-label="Previous step"
          className="flex size-11 items-center justify-center rounded-full border-2 border-lesson-line text-foreground transition-colors hover:bg-lesson-soft disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="flex items-center gap-1.5" aria-hidden>
          {steps.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-5 bg-lesson-correct" : "w-1.5 bg-lesson-dot-todo",
              )}
            />
          ))}
        </div>

        {last ? (
          <PillButton variant="secondary" onClick={onClose} className="h-11 min-w-24">
            Got it
          </PillButton>
        ) : (
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(steps.length - 1, i + 1))}
            aria-label="Next step"
            className="flex size-11 items-center justify-center rounded-full bg-lesson-cta text-lesson-cta-fg shadow-[0_4px_0_0_var(--lesson-cta-shadow)] transition-colors active:translate-y-0.5 active:shadow-[0_2px_0_0_var(--lesson-cta-shadow)]"
          >
            <ChevronRight className="size-5" />
          </button>
        )}
      </footer>
    </aside>
  );
}
