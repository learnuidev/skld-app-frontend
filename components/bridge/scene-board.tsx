"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

import { PALETTE } from "@/components/courses/illustrations/palette";
import { cn } from "@/lib/utils";
import type { BridgeScene } from "@/modules/course/types";
import { SCENE_LABELS, SCENES, SCENE_HEIGHT, SCENE_WIDTH, type ScenePart } from "./scenes";

/** What a pin is saying: in hand, read already, ruled out, or still waiting. */
type PinTone = "waiting" | "found" | "seen" | "ruled-out";

type PinPaint = { borderColor?: string; background?: string; color?: string };

/** The bright note is kept for the pin in hand; a part read earlier goes quiet. */
const PIN_COLOUR: Record<PinTone, PinPaint> = {
  waiting: { borderColor: PALETTE.ink, background: PALETTE.paper, color: PALETTE.ink },
  /** The one being read: the green tick. */
  found: {},
  /** Already read, and waiting its turn to be read again: a quiet grey tick. */
  seen: { borderColor: PALETTE.gray, background: PALETTE.paper, color: PALETTE.gray },
  "ruled-out": {},
};

/** A waiting pin that has been tapped, before it is checked. */
const PICKED_COLOUR: PinPaint = {
  borderColor: PALETTE.ink,
  background: PALETTE.yellow,
  color: PALETTE.ink,
};

const PIN_CLASS: Record<PinTone, string> = {
  waiting: "",
  found: "border-lesson-correct bg-lesson-correct text-white",
  seen: "",
  "ruled-out": "border-lesson-line bg-card text-muted-foreground opacity-60 line-through",
};

export interface SceneBoardProps {  scene: BridgeScene;
  /** The drawing's own name; defaults to a description of the scene. */
  label?: string;
  /** Parts to pin on the drawing. Without them the board is a plain figure. */
  pins?: ScenePart[];
  /** Which pin the learner is pointing at. */
  picked?: string | null;
  /** Pins already answered: green, and no longer taking clicks. */
  solved?: string[];
  /** Pins the learner has ruled out: still numbered, but greyed and inert. */
  ruledOut?: string[];
  /**
   * Whether a pin that has already been answered keeps taking taps. A guided
   * tour wants this: the learner can go back and read an earlier part again.
   */
  revisitable?: boolean;
  /** Pins lit up in the bright note, in addition to `picked`. */
  highlight?: string[];
  /** Names written on the drawing. */
  labels?: boolean;
  onPick?: (id: string) => void;
  /** True once the task is locked after an answer. */
  locked?: boolean;
  className?: string;
}

/**
 * One bridge drawing, with the pins a learner can click. The pins are real
 * buttons laid over the artwork rather than SVG shapes, so they are focusable,
 * announce themselves, and stay a comfortable size on a phone.
 */
export function SceneBoard({
  scene,
  label,
  pins = [],
  picked = null,
  solved = [],
  ruledOut = [],
  revisitable = false,
  highlight = [],
  labels = false,
  onPick,
  locked = false,
  className,
}: SceneBoardProps) {
  const reduceMotion = useReducedMotion();
  const draw = SCENES[scene];
  const lit = [...highlight, ...(picked ? [picked] : [])];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-lesson-line",
        className,
      )}
      style={{ aspectRatio: `${SCENE_WIDTH} / ${SCENE_HEIGHT}` }}
    >
      <svg
        viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
        className="absolute inset-0 size-full"
        role="img"
        aria-label={label ?? SCENE_LABELS[scene]}
        focusable="false"
      >
        {draw({ highlight: lit, labels })}
      </svg>

      {pins.map((pin, index) => {
        const [x, y] = pin.at;
        const isSolved = solved.includes(pin.id);
        const isRuledOut = ruledOut.includes(pin.id);
        const isPicked = picked === pin.id;
        const interactive =
          Boolean(onPick) && !locked && !isRuledOut && (revisitable || !isSolved);
        /**
         * What the pin is telling the learner: the part in hand takes the
         * bright note, parts already read are quiet ticks beside it, ruled-out
         * pins stay crossed through, and the rest are still numbered.
         */
        const tone: PinTone = isRuledOut
          ? "ruled-out"
          : isSolved
            ? revisitable && !isPicked
              ? "seen"
              : "found"
            : "waiting";

        const style = {
          left: `${(x / SCENE_WIDTH) * 100}%`,
          top: `${(y / SCENE_HEIGHT) * 100}%`,
          ...PIN_COLOUR[tone],
          ...(tone === "waiting" && isPicked ? PICKED_COLOUR : null),
        } as const;

        const className = cn(
          // Small enough on a phone that two neighbouring pins stay apart.
          "absolute z-10 flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-[10px] font-bold tabular-nums shadow-sm transition-colors sm:size-7 sm:text-xs",
          PIN_CLASS[tone],
          // The pins keep the palette's own colours, so the hover is a wash
          // rather than a new colour.
          interactive ? "cursor-pointer hover:brightness-90" : "cursor-default",
        );

        const face = isSolved ? <Check className="size-3.5" aria-hidden /> : index + 1;

        // Ruled-out and quiet pins still hold their number, so the pins on
        // screen never get renumbered under the learner.
        if (isRuledOut || !interactive) {
          // An answered pin that can no longer be tapped keeps its name on
          // screen: that is the answer.
          return isSolved ? (
            <span key={pin.id} role="img" aria-label={pin.label} style={style} className={className}>
              {face}
            </span>
          ) : (
            <span key={pin.id} aria-hidden style={style} className={className}>
              {face}
            </span>
          );
        }

        return (
          <motion.button
            key={pin.id}
            type="button"
            // Once a part is known, its name is the useful label.
            aria-label={isSolved ? pin.label : `Part ${index + 1}`}
            aria-pressed={isPicked}
            disabled={locked}
            style={style}
            className={className}
            onClick={() => onPick?.(pin.id)}
            animate={isPicked && !reduceMotion ? { scale: [1, 1.18, 1.08] } : { scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {face}
          </motion.button>
        );
      })}
    </div>
  );
}

export default SceneBoard;
