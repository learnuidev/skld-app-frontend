"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { SceneBoard } from "@/components/bridge/scene-board";
import { PillButton } from "@/components/courses/lesson/pill-button";
import { SCENE_PARTS, type ScenePart } from "@/components/bridge/scenes";
import { cn } from "@/lib/utils";
import type { BridgeScene } from "@/modules/course/types";

const PROMPT = "text-center text-[1.15625rem] leading-[1.5] font-bold";

export interface Concept {
  id: string;
  label: string;
  summary: string;
  scene: BridgeScene;
  highlight?: string[];
}

/**
 * A run of ideas, shown one at a time — a name, a line about it, and a drawing
 * that shows it. The learner pages through at their own pace, and can tap the
 * pins on the drawing to read what that part does, so the picture is something
 * to explore rather than an illustration to glance at.
 */
export function ConceptCards({ prompt, concepts }: { prompt: string; concepts: Concept[] }) {
  const [index, setIndex] = useState(0);
  const [reading, setReading] = useState<ScenePart | null>(null);
  const reduceMotion = useReducedMotion();
  const total = concepts.length;
  const concept = concepts[Math.min(index, total - 1)];

  const goTo = (next: number) => {
    setIndex(Math.min(Math.max(next, 0), total - 1));
    setReading(null);
  };

  if (!concept) return null;

  const pins = (concept.highlight ?? [])
    .map((id) => SCENE_PARTS[concept.scene].find((part) => part.id === id))
    .filter((part): part is ScenePart => Boolean(part));

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <p className={PROMPT}>{prompt}</p>

      <div className="flex w-full max-w-xl items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {index + 1} of {total}
        </span>
        <span className="flex items-center gap-1.5" aria-hidden>
          {concepts.map((entry, dot) => (
            <span
              key={entry.id}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                dot === index ? "w-5 bg-foreground" : "w-1.5 bg-lesson-dot-todo",
              )}
            />
          ))}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={concept.id}
          initial={reduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="flex w-full flex-col items-center gap-4"
        >
          <h3 className="text-center text-xl font-bold tracking-tight sm:text-2xl">
            {concept.label}
          </h3>

          <SceneBoard
            scene={concept.scene}
            pins={pins}
            picked={reading?.id ?? null}
            // Every pinned part of this idea is already known; the one being
            // read is the one holding the bright note.
            solved={pins.map((part) => part.id)}
            // The parts this idea is about take the bright note on the drawing
            // itself, so the concept is something you can point at.
            highlight={concept.highlight}
            // The drawing is the teaching, so its pins stay open to a second tap.
            revisitable
            onPick={(id) => {
              const part = pins.find((entry) => entry.id === id) ?? null;
              setReading((current) => (current?.id === id ? null : part));
            }}
            labels
            className="max-w-xl"
          />

          {/* A fixed box for the line under the drawing: whether a summary
              runs to two lines or three, the buttons below never move. */}
          <div className="flex h-20 w-full max-w-lg items-center justify-center">
            <p className="text-center text-sm leading-5 text-foreground/85 sm:text-base sm:leading-6">
              {reading ? `${reading.label}. ${reading.note}` : concept.summary}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* The lesson's own pill, and a fixed width on each side: the buttons sit
          exactly where the card's Continue button does, and neither the drawing
          nor the hint can move them as the ideas change. */}
      <div className="flex min-h-12 w-full max-w-xl items-center justify-between gap-3">
        <PillButton
          variant="secondary"
          className="w-32 gap-2"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back
        </PillButton>

        <span className="min-w-0 flex-1 truncate text-center text-xs text-muted-foreground">
          {pins.length > 0 ? "Tap a pin on the drawing" : ""}
        </span>

        {index === total - 1 ? (
          <PillButton variant="secondary" className="w-32 gap-2" onClick={() => goTo(0)}>
            Start again
          </PillButton>
        ) : (
          <PillButton className="w-32 gap-2" onClick={() => goTo(index + 1)}>
            Next
            <ArrowRight className="size-4" aria-hidden />
          </PillButton>
        )}
      </div>
    </div>
  );
}

export default ConceptCards;
