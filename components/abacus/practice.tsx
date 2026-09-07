"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Abacus, digitsToValue, valueToDigits } from "./abacus";

export interface TaskHandle {
  /** Verify the current selection. Returns true when it is correct. */
  check(): boolean;
}

function clearDigits(rods: number) {
  return valueToDigits(0, rods);
}

function placeLabel(value: number) {
  return value.toLocaleString("en-US");
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
    onHasSelection: (has: boolean) => void;
  }
>(function BuildTask({ prompt, target, rods = 2, solved, onHasSelection }, ref) {
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
      <p className="text-center text-lg font-semibold">{prompt}</p>
      <Abacus digits={digits} onChange={change} readOnly={solved} label="Your abacus" />
      <div className="flex h-10 items-center">
        {wrong ? (
          <p className="rounded-2xl bg-orange-50 px-4 py-3 text-sm font-medium text-orange-700">
            That board shows {placeLabel(shown)}. Remember: heaven = 5, earth beads = 1.
          </p>
        ) : solved ? (
          <p className="text-sm font-medium text-emerald-700">That&apos;s {placeLabel(target)}!</p>
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
      <p className="text-center text-lg font-semibold">{prompt}</p>
      <Abacus digits={digits} readOnly scale={1} label="Read this abacus" />
      <div className="grid w-full max-w-md gap-2 sm:grid-cols-2">
        {choices.map((option) => {
          const isWrong = wrong.has(option);
          const isRight = solved && option === answer;
          return (
            <button
              key={option}
              type="button"
              disabled={locked || isWrong}
              onClick={() => {
                setPicked(option);
                onHasSelection(true);
              }}
              className={cn(
                "rounded-2xl border px-5 py-3 text-left text-lg font-semibold transition-colors",
                isRight
                  ? "border-emerald-300 bg-emerald-100 text-emerald-800"
                  : isWrong
                    ? "border-red-200 bg-red-50 text-red-400 line-through"
                    : picked === option
                      ? "border-foreground bg-card"
                      : "border-border bg-card hover:bg-muted",
              )}
            >
              {placeLabel(option)}
            </button>
          );
        })}
      </div>
      {solved ? (
        <p className="text-sm font-medium text-emerald-700">That&apos;s {placeLabel(answer)}!</p>
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
      <p className="text-center text-lg font-semibold">{prompt}</p>
      <div className="grid w-full max-w-md gap-2 sm:grid-cols-2">
        {choices.map((option) => {
          const isWrong = wrong.has(option);
          const isRight = solved && option === answer;
          return (
            <button
              key={option}
              type="button"
              disabled={locked || isWrong}
              onClick={() => {
                setPicked(option);
                onHasSelection(true);
              }}
              className={cn(
                "rounded-2xl border px-5 py-3 text-left text-lg font-semibold transition-colors",
                isRight
                  ? "border-emerald-300 bg-emerald-100 text-emerald-800"
                  : isWrong
                    ? "border-red-200 bg-red-50 text-red-400 line-through"
                    : picked === option
                      ? "border-foreground bg-card"
                      : "border-border bg-card hover:bg-muted",
              )}
            >
              {placeLabel(option)}
            </button>
          );
        })}
      </div>
      {solved ? (
        <p className="text-sm font-medium text-emerald-700">That&apos;s {placeLabel(answer)}!</p>
      ) : null}
    </div>
  );
});
