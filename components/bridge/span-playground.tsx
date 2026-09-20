"use client";

import { useId, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { PALETTE } from "@/components/courses/illustrations/palette";
import { SceneBoard } from "@/components/bridge/scene-board";
import { cn } from "@/lib/utils";
import type { BridgeScene } from "@/modules/course/types";

const PROMPT = "text-center text-[1.15625rem] leading-[1.5] font-bold";

/** The shortest and longest main spans this playground travels between. */
const MIN_SPAN = 20;
const MAX_SPAN = 2300;

/**
 * The four systems, in the span ranges they are actually chosen for. The
 * drawing behind the slider changes with the band, so dragging the handle
 * morphs a beam bridge into an arch, then into a cable-stayed bridge, then
 * into a suspension bridge.
 */
const BANDS: {
  scene: BridgeScene;
  name: string;
  max: number;
  why: string;
}[] = [
  {
    scene: "beam",
    name: "Beam",
    max: 100,
    why: "Beams bend, and concrete and steel are strong in bending — so a beam bridge is the simple, cheap choice for a short span. The standard spans of concrete beam bridges are mostly under 30 m.",
  },
  {
    scene: "arch",
    name: "Arch",
    max: 400,
    why: "An arch works in compression, and the thrust at its feet cancels the bending: much greater spanning capacity than a beam of the same span.",
  },
  {
    scene: "cable-stayed",
    name: "Cable-stayed",
    max: 1000,
    why: "Stay cables hold the girder up at many points, like a row of invisible piers. The girder can be lighter, so the span can grow.",
  },
  {
    scene: "suspension",
    name: "Suspension",
    max: MAX_SPAN,
    why: "One main cable carries the deck on hangers. It is the strongest spanning system of all — and beyond about 1000 m usually the most economical.",
  },
];

/** Real bridges from the lessons, to anchor the scale in something concrete. */
const MILESTONES: { span: number; label: string }[] = [
  { span: 330, label: "Shibanpo Bridge · 330 m rigid frame" },
  { span: 575, label: "Pingnan Third Bridge · 575 m composite arch" },
  { span: 1100, label: "World's longest cable-stayed · over 1100 m" },
  { span: 1700, label: "Yangsigang Bridge · 1700 m suspension" },
  { span: 2300, label: "Zhanggao crossing · 2300 m planned" },
];

/** The slider is logarithmic: the interesting spans are not evenly spread. */
const RATIO = MAX_SPAN / MIN_SPAN;
const spanFromSlider = (value: number) => MIN_SPAN * RATIO ** (value / 100);
const sliderFromSpan = (span: number) => (Math.log(span / MIN_SPAN) / Math.log(RATIO)) * 100;

function bandFor(span: number) {
  return BANDS.find((band) => span <= band.max) ?? BANDS[BANDS.length - 1];
}

function nearestMilestone(span: number) {
  return MILESTONES.reduce((best, item) =>
    Math.abs(item.span - span) < Math.abs(best.span - span) ? item : best,
  );
}

/**
 * "How far can a bridge reach?" — a slider over the whole range of bridge
 * spans, with a drawing that changes system as the span grows and the two
 * design terms that decide the answer.
 */
export function SpanPlayground({ prompt }: { prompt: string }) {
  const [value, setValue] = useState(() => sliderFromSpan(120));
  const raw = spanFromSlider(value);
  const span = Math.round(raw / 5) * 5;
  const band = bandFor(span);
  const milestone = nearestMilestone(span);
  const reduceMotion = useReducedMotion();
  const id = useId();

  const bandIndex = BANDS.indexOf(band);
  const marks = useMemo(
    () => BANDS.map((item, index) => ({ name: item.name, index })),
    [],
  );

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <p className={PROMPT}>{prompt}</p>

      <div className="flex flex-col items-center gap-1">
        <output
          aria-label="Selected main span"
          className="text-4xl font-bold tabular-nums"
        >
          {span} m
        </output>
        <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          main span
        </span>
      </div>

      <motion.div
        key={band.scene}
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-xl"
      >
        <SceneBoard scene={band.scene} labels />
      </motion.div>

      <div className="w-full max-w-xl">
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          aria-label="Main span in metres"
          aria-valuetext={`${span} metres`}
          className="h-3 w-full cursor-pointer appearance-none rounded-full bg-lesson-dot-todo accent-[var(--color-lesson-cta)]"
          style={{
            background: `linear-gradient(to right, ${PALETTE.yellow} ${
              sliderFromSpan(span)
            }%, var(--color-lesson-dot-todo) ${sliderFromSpan(span)}%)`,
          }}
        />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{MIN_SPAN} m</span>
          <span>{MAX_SPAN} m</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {marks.map(({ name, index }) => (
          <span
            key={name}
            className={cn(
              "rounded-full border-2 px-3 py-1.5 text-sm font-semibold transition-colors",
              index === bandIndex
                ? "border-transparent bg-foreground text-background"
                : "border-lesson-line text-muted-foreground",
            )}
          >
            {name}
          </span>
        ))}
      </div>

      <div className="w-full max-w-xl rounded-2xl bg-lesson-soft px-4 py-3">
        <p className="text-sm leading-5">
          <span className="font-bold">{band.name} bridge.</span>{" "}
          <span className="text-foreground/80">{band.why}</span>
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Nearest record: {milestone.label}
        </p>
      </div>
    </div>
  );
}

export default SpanPlayground;
