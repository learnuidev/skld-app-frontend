import type { ReactNode } from "react";

import { PALETTE } from "@/components/courses/illustrations/palette";

/**
 * The kit every concept figure is drawn with. A figure is one idea on a fog
 * plate, painted in the one course palette — black in shades, with yellow as
 * the bright note — so the drawings belong to the same set as the course art
 * and the bridge scenes.
 *
 * The rules a drawing keeps:
 *
 *  - **one idea per plate.** If the picture needs two, it is two drawings.
 *  - **black is structure, yellow is the point.** `ink` draws the board, the
 *    frame, the thing being looked at; `yellow` marks the one part the words
 *    are about, and nothing else is ever yellow.
 *  - **the plate is `fog`** and everything sits on it; nothing is painted to
 *    the edge of the box.
 *  - **nothing is hard-coded.** Every colour comes from `TONE` (the palette),
 *    and every figure keeps the plate's own proportions.
 *
 * A drawing is a plain function of `FigureProps` that returns plate children:
 *
 * ```tsx
 * function CarryOver({ numbers = [10] }: FigureProps) {
 *   return (
 *     <FigurePlate label={`${numbers[0]} ones carrying into one ten`}>
 *       <Board x={30} y={40} width={120} height={100} digits={[9, 0]} />
 *       <Arrow from={[160, 90]} to={[210, 90]} />
 *       <Board x={220} y={40} width={70} height={100} digits={[0, 1]} />
 *     </FigurePlate>
 *   );
 * }
 * ```
 */
export const TONE = {
  ink: PALETTE.ink,
  charcoal: PALETTE.charcoal,
  gray: PALETTE.gray,
  fog: PALETTE.fog,
  paper: PALETTE.paper,
  butter: PALETTE.butter,
  yellow: PALETTE.yellow,
  yellowDeep: PALETTE.yellowDeep,
} as const;

export type Tone = keyof typeof TONE;

/** The box every drawing is authored in. Figures keep this shape so a lesson
 * card can lay any of them out without measuring anything. */
export const FIGURE_WIDTH = 320;
export const FIGURE_HEIGHT = 180;

/** What content may hand a drawing: the numbers it works with, the words it
 * writes, and whether its own names are on. Every field is optional — a
 * drawing that is handed nothing still draws its own example. */
export interface FigureProps {
  numbers?: number[];
  labels?: string[];
  named?: boolean;
}

/** What a drawing is: a function of the numbers and words it was handed,
 * returning the marks it puts on its plate. */
export type FigureComponent = (props: FigureProps) => ReactNode;

/** The one line weight the drawings share. */
const LINE = 1.4;
const DASH = "4 3";
const ROD_OPACITY = 0.5;

/** A figure: a fog plate with the drawing on it, and a name for the reader's
 * screen reader. Every drawing starts here. */
export function FigurePlate({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${FIGURE_WIDTH} ${FIGURE_HEIGHT}`}
      className="h-auto w-full"
      role="img"
      aria-label={label}
      focusable="false"
    >
      <rect x="0" y="0" width={FIGURE_WIDTH} height={FIGURE_HEIGHT} rx="14" fill={TONE.fog} />
      {children}
    </svg>
  );
}

/** Words on the plate. */
export function Label({
  x,
  y,
  children,
  anchor = "middle",
  size = 10,
  tone = "charcoal",
  weight = 500,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  size?: number;
  tone?: Tone;
  weight?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={weight}
      fill={TONE[tone]}
      dominantBaseline="middle"
    >
      {children}
    </text>
  );
}

/** A number, in the app's own digits. */
export function Numeral({
  x,
  y,
  value,
  size = 16,
  tone = "ink",
  anchor = "middle",
  weight = 600,
}: {
  x: number;
  y: number;
  value: number | string;
  size?: number;
  tone?: Tone;
  anchor?: "start" | "middle" | "end";
  weight?: number;
}) {
  return (
    <Label x={x} y={y} anchor={anchor} size={size} tone={tone} weight={weight}>
      {value}
    </Label>
  );
}

/** A rounded block of colour, optionally with a word on it. */
export function Box({
  x,
  y,
  width,
  height,
  fill,
  stroke,
  dashed = false,
  radius = 6,
  opacity,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: Tone;
  stroke?: Tone;
  dashed?: boolean;
  radius?: number;
  opacity?: number;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={radius}
      fill={fill ? TONE[fill] : "none"}
      stroke={stroke ? TONE[stroke] : undefined}
      strokeWidth={stroke ? LINE : undefined}
      strokeDasharray={dashed ? DASH : undefined}
      opacity={opacity}
    />
  );
}

/** A word on its own chip — how the drawings name a thing without a caption. */
export function Chip({
  x,
  y,
  text,
  width,
  height = 22,
  fill = "paper",
  tone = "ink",
  stroke,
  size = 10,
}: {
  x: number;
  y: number;
  text: string;
  width?: number;
  height?: number;
  fill?: Tone;
  tone?: Tone;
  stroke?: Tone;
  size?: number;
}) {
  const w = width ?? Math.max(34, text.length * size * 0.62 + 14);
  return (
    <>
      <Box x={x} y={y} width={w} height={height} fill={fill} stroke={stroke} radius={height / 2} />
      <Label x={x + w / 2} y={y + height / 2} size={size} tone={tone}>
        {text}
      </Label>
    </>
  );
}

/** A straight line: a rule, a number line, a leader. */
export function Rule({
  from,
  to,
  tone = "gray",
  width = LINE,
  dashed = false,
  opacity,
}: {
  from: [number, number];
  to: [number, number];
  tone?: Tone;
  width?: number;
  dashed?: boolean;
  opacity?: number;
}) {
  return (
    <line
      x1={from[0]}
      y1={from[1]}
      x2={to[0]}
      y2={to[1]}
      stroke={TONE[tone]}
      strokeWidth={width}
      strokeDasharray={dashed ? DASH : undefined}
      strokeLinecap="round"
      opacity={opacity}
    />
  );
}

/** An arrow: movement, a turn, a carry travelling to the next rod. */
export function Arrow({
  from,
  to,
  tone = "charcoal",
  width = LINE,
  dashed = false,
  head = 5,
}: {
  from: [number, number];
  to: [number, number];
  tone?: Tone;
  width?: number;
  dashed?: boolean;
  head?: number;
}) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const back = angle + Math.PI;
  const wing = (offset: number) => [
    x2 + head * Math.cos(back + offset),
    y2 + head * Math.sin(back + offset),
  ];
  const [ax, ay] = wing(0.42);
  const [bx, by] = wing(-0.42);
  const colour = TONE[tone];

  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2 - Math.cos(angle) * head * 0.6}
        y2={y2 - Math.sin(angle) * head * 0.6}
        stroke={colour}
        strokeWidth={width}
        strokeDasharray={dashed ? DASH : undefined}
        strokeLinecap="round"
      />
      <polygon points={`${x2},${y2} ${ax},${ay} ${bx},${by}`} fill={colour} />
    </>
  );
}

/** One dot: a bead counted, a mark made. */
export function Dot({
  cx,
  cy,
  r = 3.5,
  fill = "ink",
  opacity,
  stroke,
}: {
  cx: number;
  cy: number;
  r?: number;
  fill?: Tone;
  opacity?: number;
  stroke?: Tone;
}) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={TONE[fill]}
      opacity={opacity}
      stroke={stroke ? TONE[stroke] : undefined}
      strokeWidth={stroke ? LINE : undefined}
    />
  );
}

/** A row of dots, evenly spaced from `x`. */
export function DotRow({
  x,
  y,
  count,
  gap = 10,
  r = 3.5,
  fill = "ink",
  opacity,
}: {
  x: number;
  y: number;
  count: number;
  gap?: number;
  r?: number;
  fill?: Tone;
  opacity?: number;
}) {
  return (
    <>
      {Array.from({ length: Math.max(0, count) }, (_, i) => (
        <Dot key={i} cx={x + i * gap} cy={y} r={r} fill={fill} opacity={opacity} />
      ))}
    </>
  );
}

/** A grid of dots: an array, a square, a table. */
export function DotGrid({
  x,
  y,
  rows,
  columns,
  gap = 10,
  r = 3,
  fill = "ink",
  opacity,
}: {
  x: number;
  y: number;
  rows: number;
  columns: number;
  gap?: number;
  r?: number;
  fill?: Tone;
  opacity?: number;
}) {
  return (
    <>
      {Array.from({ length: Math.max(0, rows) }, (_, row) => (
        <DotRow
          key={row}
          x={x}
          y={y + row * gap}
          count={columns}
          gap={gap}
          r={r}
          fill={fill}
          opacity={opacity}
        />
      ))}
    </>
  );
}

/** A tick, for a list of things done. */
export function Tick({ x, y, size = 5, tone = "ink" }: { x: number; y: number; size?: number; tone?: Tone }) {
  return (
    <polyline
      points={`${x - size},${y} ${x - size * 0.25},${y + size * 0.7} ${x + size},${y - size * 0.75}`}
      fill="none"
      stroke={TONE[tone]}
      strokeWidth={LINE + 0.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

/**
 * Where everything sits on a small board: the numbers a drawing needs when it
 * points at one bead rather than the whole board. `rodX` is a rod's centre,
 * counted from the units rod, which is the rightmost — the same way round as
 * the live board and every `AbacusDemo`.
 */
export interface BoardGeometry {
  pad: number;
  top: number;
  bottom: number;
  beamY: number;
  beamH: number;
  r: number;
  rodX: (rod: number) => number;
  heavenCy: (rod: number) => number;
  earthCy: (rod: number, bead: number) => number;
}

export function boardGeometry(
  x: number,
  y: number,
  width: number,
  height: number,
  digits: number[],
): BoardGeometry {
  const rods = Math.max(1, digits.length);
  const pad = Math.max(3, Math.min(width, height) * 0.05);
  const top = y + pad;
  const bottom = y + height - pad;
  const rodGap = (width - pad * 2) / rods;
  const beamY = top + (bottom - top) * 0.32;

  const roomy = Math.min(rodGap / 2.9, (bottom - beamY) / 9.6);
  const beamH = Math.max(2, roomy * 0.45);
  const r = Math.max(
    2.2,
    Math.min(rodGap / 2.9, (bottom - beamY - beamH) / 9, (beamY - top) / 2.2),
  );
  const stackStep = r * 2.6;
  const left = x + pad + rodGap / 2;

  return {
    pad,
    top,
    bottom,
    beamY,
    beamH,
    r,
    rodX: (rod) => left + (rods - 1 - rod) * rodGap,
    heavenCy: (rod) => (digits[rod] >= 5 ? beamY - r : top + r),
    earthCy: (rod, bead) => {
      const counted = bead < digits[rod] % 5;
      return counted
        ? beamY + beamH + r + bead * stackStep
        : bottom - r - (4 - bead - 1) * stackStep;
    },
  };
}

/**
 * The board itself, drawn small: a dark frame, grey rods, a pale beam, bright
 * heaven beads and light earth beads, with any bead away from the beam resting
 * dark. It is the same board the learner clicks, only drawn in the palette, so
 * a figure and the lesson's own abacus read as one object.
 *
 * `digits[0]` is the units rod — the same order the live board and every
 * `AbacusDemo` use.
 */
export function Board({
  x,
  y,
  width,
  height,
  digits,
  ghost = false,
  compact = false,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  digits: number[];
  /** Drawn as a memory of a board rather than a board: no fill, quiet outline. */
  ghost?: boolean;
  /** Skips the resting beads above and below, for small drawings. */
  compact?: boolean;
}) {
  const geometry = boardGeometry(x, y, width, height, digits);
  const { pad, top, bottom, beamY, beamH, r } = geometry;

  const frame = ghost ? TONE.gray : TONE.ink;
  const bead: { counted: Tone; resting: Tone } = {
    counted: ghost ? "charcoal" : "paper",
    resting: ghost ? "gray" : "charcoal",
  };

  return (
    <>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={Math.max(6, height * 0.14)}
        fill={ghost ? "none" : frame}
        stroke={ghost ? frame : undefined}
        strokeWidth={ghost ? LINE : undefined}
        strokeDasharray={ghost ? DASH : undefined}
      />

      {digits.map((_, i) => (
        <line
          key={`rod-${i}`}
          x1={geometry.rodX(i)}
          y1={top}
          x2={geometry.rodX(i)}
          y2={bottom}
          stroke={TONE.gray}
          strokeWidth={ghost ? 1 : 1.6}
          opacity={ROD_OPACITY}
        />
      ))}

      <rect
        x={x + pad}
        y={beamY}
        width={width - pad * 2}
        height={beamH}
        rx={beamH / 2}
        fill={ghost ? TONE.gray : TONE.butter}
      />

      {digits.map((digit, i) => {
        const cx = geometry.rodX(i);
        const heaven = digit >= 5;
        const earthCount = digit % 5;

        return (
          <g key={`beads-${i}`}>
            <Dot
              cx={cx}
              cy={geometry.heavenCy(i)}
              r={r}
              fill={heaven ? (ghost ? "charcoal" : "yellow") : bead.resting}
            />
            {Array.from({ length: 4 }, (_, beadIndex) => {
              const counted = beadIndex < earthCount;
              if (!counted && compact) return null;
              return (
                <Dot
                  key={`earth-${beadIndex}`}
                  cx={cx}
                  cy={geometry.earthCy(i, beadIndex)}
                  r={r}
                  fill={counted ? bead.counted : bead.resting}
                />
              );
            })}
          </g>
        );
      })}
    </>
  );
}

/** The number a board shows, from its digits. */
export function boardValue(digits: number[]): number {
  return digits.reduce((total, digit, rod) => total + digit * 10 ** rod, 0);
}

/** Digits written one under the other, as a sum is set out on paper. */
export function DigitStack({
  x,
  y,
  value,
  size = 14,
  gap = 16,
  tone = "ink",
  anchor = "end",
}: {
  x: number;
  y: number;
  value: number;
  size?: number;
  gap?: number;
  tone?: Tone;
  anchor?: "start" | "middle" | "end";
}) {
  const digits = String(value).split("");
  return (
    <>
      {digits.map((digit, i) => (
        <Numeral key={i} x={x} y={y + i * gap} value={digit} size={size} tone={tone} anchor={anchor} />
      ))}
    </>
  );
}

/** A named thing on the plate, tied to the point it names by a leader line. */
export function Callout({
  at,
  text,
  anchor,
  tone = "charcoal",
  size = 10,
  side = "right",
}: {
  at: [number, number];
  text: string;
  /** Where the word sits; a short leader joins it to `at`. */
  anchor: [number, number];
  tone?: Tone;
  size?: number;
  side?: "left" | "right";
}) {
  const [px, py] = at;
  const [tx, ty] = anchor;
  return (
    <>
      <Dot cx={px} cy={py} r={2} fill={tone} />
      <Rule from={[px, py]} to={[tx + (side === "right" ? -4 : 4), ty]} tone="gray" width={1} />
      <Label
        x={tx}
        y={ty}
        size={size}
        tone={tone}
        anchor={side === "right" ? "start" : "end"}
      >
        {text}
      </Label>
    </>
  );
}
