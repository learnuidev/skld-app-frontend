"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Abacus, digitsToValue, valueToDigits } from "./abacus";

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
        <div className="flex items-end gap-2 rounded-2xl border bg-white p-4 shadow-sm">
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

export function BuildTask({
  prompt,
  target,
  rods = 2,
  onSolved,
}: {
  prompt: string;
  target: number;
  rods?: number;
  onSolved: () => void;
}) {
  const [digits, setDigits] = useState<number[]>(() => clearDigits(rods));
  const [state, setState] = useState<"idle" | "wrong" | "right">("idle");

  const shown = digitsToValue(digits);

  const check = () => {
    if (shown === target) {
      setState("right");
      onSolved();
    } else {
      setState("wrong");
    }
  };

  const reveal = () => {
    setDigits(valueToDigits(target, rods));
    setState("right");
    onSolved();
  };

  const solved = state === "right";

  return (
    <div className={cn("rounded-3xl border p-6 sm:p-8", solved ? "border-emerald-300 bg-emerald-50" : "bg-white")}>
      <div className="flex items-start justify-between gap-4">
        <p className="text-lg font-semibold">{prompt}</p>
        {solved ? <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">Solved</span> : null}
      </div>

      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">
        <Abacus
          digits={digits}
          onChange={(i, d) => setDigits((prev) => prev.map((v, j) => (j === i ? d : v)))}
          label="Your abacus"
        />
        <div className="flex w-full max-w-60 flex-col gap-3 sm:pt-1">
          <Button onClick={check} size="lg" variant={solved ? "outline" : "default"} disabled={solved}>
            {solved ? "Correct!" : "Check my beads"}
          </Button>
          {!solved && (
            <Button variant="ghost" size="sm" onClick={reveal}>
              Show me the answer
            </Button>
          )}
          {state === "wrong" && (
            <p className="rounded-2xl bg-orange-50 px-4 py-3 text-sm font-medium text-orange-700">
              That board shows {placeLabel(shown)}. Remember: heaven = 5, earth beads = 1.
            </p>
          )}
          {solved && <p className="text-sm font-medium text-emerald-700">That&apos;s {placeLabel(target)}!</p>}
        </div>
      </div>
    </div>
  );
}

export function ReadTask({
  prompt,
  digits,
  choices,
  onSolved,
}: {
  prompt: string;
  digits: number[];
  choices: number[];
  onSolved: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [wrong, setWrong] = useState<Set<number>>(new Set());

  const answer = digitsToValue(digits);
  const solved = picked === answer;

  const choose = (option: number) => {
    if (option === answer) {
      setPicked(option);
      onSolved();
    } else {
      setWrong((prev) => new Set(prev).add(option));
    }
  };

  return (
    <div className={cn("rounded-3xl border p-6 sm:p-8", solved ? "border-emerald-300 bg-emerald-50" : "bg-white")}>
      <div className="flex items-start justify-between gap-4">
        <p className="text-lg font-semibold">{prompt}</p>
        {solved ? <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">Solved</span> : null}
      </div>

      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">
        <Abacus digits={digits} readOnly scale={1} label="Read this abacus" />
        <div className="flex w-full max-w-60 flex-col gap-2 sm:pt-1">
          {choices.map((option) => {
            const isWrong = wrong.has(option);
            const isRight = solved && option === answer;
            return (
              <button
                key={option}
                type="button"
                disabled={solved || isWrong}
                onClick={() => choose(option)}
                className={cn(
                  "rounded-2xl border px-5 py-3 text-left text-lg font-semibold transition-colors",
                  isRight
                    ? "border-emerald-300 bg-emerald-100 text-emerald-800"
                    : isWrong
                      ? "border-red-200 bg-red-50 text-red-400 line-through"
                      : "border-border bg-white hover:bg-muted",
                )}
              >
                {placeLabel(option)}
              </button>
            );
          })}
          {solved && <p className="mt-2 text-sm font-medium text-emerald-700">That&apos;s {placeLabel(answer)}!</p>}
        </div>
      </div>
    </div>
  );
}

export function QuizTask({
  prompt,
  choices,
  answer,
  onSolved,
}: {
  prompt: string;
  choices: number[];
  answer: number;
  onSolved: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [wrong, setWrong] = useState<Set<number>>(new Set());

  const solved = picked === answer;

  const choose = (option: number) => {
    if (option === answer) {
      setPicked(option);
      onSolved();
    } else {
      setWrong((prev) => new Set(prev).add(option));
    }
  };

  return (
    <div className={cn("rounded-3xl border p-6 sm:p-8", solved ? "border-emerald-300 bg-emerald-50" : "bg-white")}>
      <div className="flex items-start justify-between gap-4">
        <p className="text-lg font-semibold">{prompt}</p>
        {solved ? <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">Solved</span> : null}
      </div>

      <div className="mt-6">
        <div className="grid max-w-md gap-2 sm:grid-cols-2">
          {choices.map((option) => {
            const isWrong = wrong.has(option);
            const isRight = solved && option === answer;
            return (
              <button
                key={option}
                type="button"
                disabled={solved || isWrong}
                onClick={() => choose(option)}
                className={cn(
                  "rounded-2xl border px-5 py-3 text-left text-lg font-semibold transition-colors",
                  isRight
                    ? "border-emerald-300 bg-emerald-100 text-emerald-800"
                    : isWrong
                      ? "border-red-200 bg-red-50 text-red-400 line-through"
                      : "border-border bg-white hover:bg-muted",
                )}
              >
                {placeLabel(option)}
              </button>
            );
          })}
        </div>
        {solved && <p className="mt-3 text-sm font-medium text-emerald-700">That&apos;s {placeLabel(answer)}!</p>}
      </div>
    </div>
  );
}
