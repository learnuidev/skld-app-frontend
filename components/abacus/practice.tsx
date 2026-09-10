"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Abacus, digitsToValue, valueToDigits } from "./abacus";

export interface TaskHandle {
  /** Verify the current selection. Returns true when it is correct. */
  check(): boolean;
}

/** The lesson design's prompt line: bold, centred, a touch larger than body text. */
const PROMPT = "text-center text-[1.15625rem] leading-[1.5] font-bold";

function clearDigits(rods: number) {
  return valueToDigits(0, rods);
}

function placeLabel(value: number) {
  return value.toLocaleString("en-US");
}

/**
 * One answer card. The design keeps them quiet until they matter: a hairline
 * border while you choose, a green fill and a corner tick once the answer is in.
 */
function ChoiceButton({
  label,
  state,
  disabled,
  onClick,
}: {
  label: string;
  state: "idle" | "picked" | "wrong" | "correct";
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={state === "picked" || state === "correct"}
      onClick={onClick}
      className={cn(
        "relative flex h-14 items-center justify-center rounded-2xl border bg-card px-5 text-lg font-medium transition-colors",
        state === "correct"
          ? "border-2 border-lesson-correct bg-lesson-correct-bg text-lesson-correct-fg"
          : state === "wrong"
            ? "border-lesson-line text-muted-foreground line-through"
            : state === "picked"
              ? "border-2 border-foreground text-foreground"
              : "border-lesson-line text-foreground/70 hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {label}
      {state === "correct" ? (
        <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-lg bg-lesson-correct text-white">
          <Check className="size-4" aria-hidden />
        </span>
      ) : null}
    </button>
  );
}

/** The 2×2 (or stacked) answer grid shared by the reading and quiz tasks. */
function ChoiceGrid({
  options,
  picked,
  wrong,
  solved,
  answer,
  locked,
  onPick,
}: {
  options: number[];
  picked: number | null;
  wrong: Set<number>;
  solved: boolean;
  answer: number;
  locked: boolean;
  onPick: (option: number) => void;
}) {
  return (
    <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
      {options.map((option) => (
        <ChoiceButton
          key={option}
          label={placeLabel(option)}
          disabled={locked || wrong.has(option)}
          state={
            solved && option === answer
              ? "correct"
              : wrong.has(option)
                ? "wrong"
                : picked === option
                  ? "picked"
                  : "idle"
          }
          onClick={() => onPick(option)}
        />
      ))}
    </div>
  );
}

/** Free-play board with a live value readout. */
export function AbacusExplorer({
  label,
  rods,
  initial,
  prompt,
}: {
  label?: string;
  rods: number;
  initial?: number[];
  prompt?: string;
}) {
  const [digits, setDigits] = useState<number[]>(() => {
    const out = Array.from({ length: rods }, () => 0);
    initial?.forEach((d, i) => {
      if (i < rods) out[i] = Math.max(0, Math.min(9, Math.round(d)));
    });
    return out;
  });

  const value = digitsToValue(digits);

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8">
      <Abacus
        digits={digits}
        onChange={(i, d) => setDigits((prev) => prev.map((v, j) => (j === i ? d : v)))}
        label={label}
      />
      <div className="w-full max-w-60 sm:pt-2">
        {prompt ? <p className="mb-3 text-sm text-muted-foreground">{prompt}</p> : null}
        <div className="flex items-end gap-2 rounded-2xl border bg-card p-4 shadow-sm">
          <span className="text-4xl font-bold tabular-nums">{placeLabel(value)}</span>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Only beads touching the beam count. Heaven beads are worth 5; earth beads are worth 1.
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-3"
          onClick={() => setDigits(clearDigits(rods))}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

export const BuildTask = forwardRef<
  TaskHandle,
  {
    prompt: string;
    target: number;
    rods?: number;
    solved: boolean;
    locked?: boolean;
    onHasSelection: (has: boolean) => void;
  }
>(function BuildTask({ prompt, target, rods = 2, solved, locked = false, onHasSelection }, ref) {
  const [digits, setDigits] = useState<number[]>(() => clearDigits(rods));
  const [wrong, setWrong] = useState(false);
  const shown = digitsToValue(digits);

  useImperativeHandle(
    ref,
    () => ({
      check() {
        if (shown === target) return true;
        setWrong(true);
        return false;
      },
    }),
    [shown, target],
  );

  const change = (i: number, d: number) => {
    setDigits((prev) => prev.map((v, j) => (j === i ? d : v)));
    setWrong(false);
    onHasSelection(true);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className={PROMPT}>{prompt}</p>
      <Abacus digits={digits} onChange={change} readOnly={solved || locked} label="Your abacus" />
      <div className="flex h-10 items-center">
        {wrong ? (
          <p className="rounded-2xl bg-lesson-soft px-4 py-3 text-sm font-medium text-foreground/70">
            That board shows {placeLabel(shown)}. Remember: heaven = 5, earth beads = 1.
          </p>
        ) : solved ? (
          <p className="text-sm font-medium text-lesson-correct-fg">That&apos;s {placeLabel(target)}!</p>
        ) : null}
      </div>
    </div>
  );
});

export const ReadTask = forwardRef<
  TaskHandle,
  {
    prompt: string;
    digits: number[];
    choices: number[];
    solved: boolean;
    locked?: boolean;
    onHasSelection: (has: boolean) => void;
  }
>(function ReadTask({ prompt, digits, choices, solved, locked = false, onHasSelection }, ref) {
  const [picked, setPicked] = useState<number | null>(null);
  const [wrong, setWrong] = useState<Set<number>>(new Set());
  const answer = digitsToValue(digits);

  useImperativeHandle(
    ref,
    () => ({
      check() {
        if (picked == null) return false;
        if (picked === answer) return true;
        setWrong((prev) => new Set(prev).add(picked));
        return false;
      },
    }),
    [picked, answer],
  );

  return (
    <div className="flex flex-col items-center gap-6">
      <p className={PROMPT}>{prompt}</p>
      <Abacus digits={digits} readOnly scale={0.85} label="Read this abacus" />
      <ChoiceGrid
        options={choices}
        picked={picked}
        wrong={wrong}
        solved={solved}
        answer={answer}
        locked={locked}
        onPick={(option) => {
          setPicked(option);
          onHasSelection(true);
        }}
      />
      {solved ? (
        <p className="text-sm font-medium text-lesson-correct-fg">
          That&apos;s {placeLabel(answer)}!
        </p>
      ) : null}
    </div>
  );
});

export const QuizTask = forwardRef<
  TaskHandle,
  {
    prompt: string;
    choices: number[];
    answer: number;
    solved: boolean;
    locked?: boolean;
    onHasSelection: (has: boolean) => void;
  }
>(function QuizTask({ prompt, choices, answer, solved, locked = false, onHasSelection }, ref) {
  const [picked, setPicked] = useState<number | null>(null);
  const [wrong, setWrong] = useState<Set<number>>(new Set());

  useImperativeHandle(
    ref,
    () => ({
      check() {
        if (picked == null) return false;
        if (picked === answer) return true;
        setWrong((prev) => new Set(prev).add(picked));
        return false;
      },
    }),
    [picked, answer],
  );

  return (
    <div className="flex flex-col items-center gap-6">
      <p className={PROMPT}>{prompt}</p>
      <ChoiceGrid
        options={choices}
        picked={picked}
        wrong={wrong}
        solved={solved}
        answer={answer}
        locked={locked}
        onPick={(option) => {
          setPicked(option);
          onHasSelection(true);
        }}
      />
      {solved ? (
        <p className="text-sm font-medium text-lesson-correct-fg">
          That&apos;s {placeLabel(answer)}!
        </p>
      ) : null}
    </div>
  );
});
