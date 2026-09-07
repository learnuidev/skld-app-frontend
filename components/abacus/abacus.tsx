"use client";

import { Fragment } from "react";
import { cn } from "@/lib/utils";

export function digitsToValue(digits: number[]) {
  return digits.reduce((acc, d, index) => acc + d * Math.pow(10, index), 0);
}

export function valueToDigits(value: number, rods: number) {
  const out = Array.from({ length: rods }, () => 0);
  let rest = Math.max(0, Math.floor(value));
  for (let i = 0; i < rods && rest > 0; i += 1) {
    out[i] = rest % 10;
    rest = Math.floor(rest / 10);
  }
  return out;
}

const ROD_W = 42;
const HEIGHT = 300;
const BEAM_Y = 104;
const BEAM_H = 8;
const HEAVEN_D = 30;
const EARTH_D = 26;
const STEP = 30;
const HEAVEN_COUNTED_TOP = BEAM_Y - HEAVEN_D - 2;
const HEAVEN_REST_TOP = 12;
const EARTH_COUNTED_BASE = BEAM_Y + BEAM_H + 4;
const EARTH_REST_BOTTOM = HEIGHT - EARTH_D - 6;
const HIT_PAD = 12;

function px(value: number, scale: number) {
  return `${(value * scale).toFixed(1)}px`;
}

export interface AbacusProps {
  /** digits[0] is the units rod; the last element is the most significant rod. */
  digits: number[];
  /** Required to make the board interactive. Called with (rodIndex, digit). */
  onChange?: (rodIndex: number, digit: number) => void;
  readOnly?: boolean;
  scale?: number;
  className?: string;
  label?: string;
}

function beadTop(bead: number, earthCount: number) {
  if (bead <= earthCount) return EARTH_COUNTED_BASE + (bead - 1) * STEP;
  return EARTH_REST_BOTTOM - (4 - bead) * STEP;
}

function Rod({
  digit,
  interactive,
  onDigit,
  scale,
}: {
  digit: number;
  interactive: boolean;
  onDigit: (digit: number) => void;
  scale: number;
}) {
  const heaven = digit >= 5;
  const earthCount = digit % 5;
  const heavenTop = heaven ? HEAVEN_COUNTED_TOP : HEAVEN_REST_TOP;

  const setHeaven = () => onDigit(digit >= 5 ? digit - 5 : digit + 5);

  const setEarth = (bead: number) => {
    const current = digit % 5;
    onDigit((digit >= 5 ? 5 : 0) + (bead <= current ? bead - 1 : bead));
  };

  const hitButton = (extra: string) =>
    cn(
      "absolute left-1/2 -translate-x-1/2 cursor-pointer rounded-full outline-none",
      "focus-visible:ring-3 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900",
      extra,
    );

  return (
    <div className="relative shrink-0" style={{ width: px(ROD_W, scale), height: px(HEIGHT, scale) }}>
      <div className="absolute left-1/2 top-0 h-full -translate-x-1/2 bg-white/10" style={{ width: px(2, scale) }} />
      <div
        aria-hidden
        className="absolute left-0 right-0 rounded-[2px] bg-amber-400/90"
        style={{ top: px(BEAM_Y, scale), height: px(BEAM_H, scale) }}
      />

      {/* Heaven bead */}
      <div
        aria-hidden
        className={cn(
          "absolute left-1/2 -translate-x-1/2 rounded-full shadow-[0_3px_4px_rgba(0,0,0,0.4)] transition-all duration-200 ease-out",
          heaven ? "bg-red-400" : "bg-neutral-700",
        )}
        style={{ width: px(HEAVEN_D, scale), height: px(HEAVEN_D, scale), top: px(heavenTop, scale) }}
      />
      {interactive && (
        <button
          type="button"
          aria-label="Toggle heaven bead (5)"
          aria-pressed={heaven}
          onClick={setHeaven}
          className={hitButton("transition-transform duration-200 hover:scale-110")}
          style={{
            width: px(HEAVEN_D + HIT_PAD, scale),
            height: px(HEAVEN_D + HIT_PAD, scale),
            top: px(heavenTop - HIT_PAD / 2, scale),
          }}
        />
      )}

      {/* Earth beads */}
      {[1, 2, 3, 4].map((bead) => {
        const counted = bead <= earthCount;
        const top = beadTop(bead, earthCount);
        return (
          <Fragment key={bead}>
            <div
              aria-hidden
              className={cn(
                "absolute left-1/2 -translate-x-1/2 rounded-full shadow-[0_3px_4px_rgba(0,0,0,0.4)] transition-all duration-200 ease-out",
                counted ? "bg-sky-400" : "bg-neutral-700",
              )}
              style={{ width: px(EARTH_D, scale), height: px(EARTH_D, scale), top: px(top, scale) }}
            />
            {interactive && (
              <button
                type="button"
                aria-label={`Set ${counted ? "" : "or "}${bead} earth bead${bead > 1 ? "s" : ""}`}
                aria-pressed={counted}
                onClick={() => setEarth(bead)}
                className={hitButton("transition-transform duration-200 hover:scale-110")}
                style={{
                  width: px(EARTH_D + HIT_PAD, scale),
                  height: px(EARTH_D + HIT_PAD, scale),
                  top: px(top - HIT_PAD / 2, scale),
                }}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

export function Abacus({ digits, onChange, readOnly = false, scale = 1, className, label }: AbacusProps) {
  const interactive = !readOnly && !!onChange;
  const count = digits.length;
  const ordered = Array.from({ length: count }, (_, displayIndex) => count - 1 - displayIndex);

  return (
    <div
      className={cn("inline-block rounded-2xl bg-neutral-900 align-middle shadow-inner", className)}
      style={{ padding: px(10, scale) }}
      role="img"
      aria-label={label ?? "Abacus"}
    >
      <div className="flex">
        {ordered.map((sourceIndex) => (
          <Rod
            key={sourceIndex}
            digit={digits[sourceIndex]}
            interactive={interactive}
            scale={scale}
            onDigit={(next) => {
              if (next >= 0 && next <= 9 && next !== digits[sourceIndex]) {
                onChange?.(sourceIndex, next);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
