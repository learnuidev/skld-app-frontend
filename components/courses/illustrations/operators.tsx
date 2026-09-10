/**
 * Path artwork for "Math Fundamentals": the four operations — add, subtract,
 * multiply, divide — as bold tiles. The symbols are drawn as strokes rather
 * than text so they look the same everywhere and stay crisp at icon sizes.
 */

import { PALETTE } from "./palette";

/** Symbols are the subject, so they carry the purple; the tiles are neutral. */
const INK = PALETTE.purple;
const CHIP = PALETTE.cream;
const CHIP_SIZE = 40;
const CHIP_RADIUS = 11;
const STROKE = 6;
/** Half-length of the plus and minus arms. */
const ARM = 10;
const DOT_RADIUS = 3.4;

export type OperatorKind = "plus" | "minus" | "multiply" | "divide";

const TILES: { x: number; y: number; kind: OperatorKind }[] = [
  { x: 6, y: 6, kind: "plus" },
  { x: 54, y: 6, kind: "minus" },
  { x: 6, y: 54, kind: "multiply" },
  { x: 54, y: 54, kind: "divide" },
];

function Operator({ kind, cx, cy }: { kind: OperatorKind; cx: number; cy: number }) {
  const stroke = {
    stroke: INK,
    strokeWidth: STROKE,
    strokeLinecap: "round",
  } as const;

  if (kind === "plus") {
    return (
      <>
        <line x1={cx - ARM} y1={cy} x2={cx + ARM} y2={cy} {...stroke} />
        <line x1={cx} y1={cy - ARM} x2={cx} y2={cy + ARM} {...stroke} />
      </>
    );
  }

  if (kind === "minus") {
    return <line x1={cx - ARM} y1={cy} x2={cx + ARM} y2={cy} {...stroke} />;
  }

  if (kind === "multiply") {
    const reach = 7;
    return (
      <>
        <line x1={cx - reach} y1={cy - reach} x2={cx + reach} y2={cy + reach} {...stroke} />
        <line x1={cx + reach} y1={cy - reach} x2={cx - reach} y2={cy + reach} {...stroke} />
      </>
    );
  }

  return (
    <>
      <line x1={cx - ARM} y1={cy} x2={cx + ARM} y2={cy} {...stroke} />
      <circle cx={cx} cy={cy - ARM} r={DOT_RADIUS} fill={INK} />
      <circle cx={cx} cy={cy + ARM} r={DOT_RADIUS} fill={INK} />
    </>
  );
}

export function OperatorsArt({
  className,
  label = "Add, subtract, multiply and divide symbols",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={label}
      focusable="false"
    >
      {TILES.map(({ x, y, kind }) => (
        <g key={kind}>
          <rect
            x={x}
            y={y}
            width={CHIP_SIZE}
            height={CHIP_SIZE}
            rx={CHIP_RADIUS}
            fill={CHIP}
          />
          <Operator kind={kind} cx={x + CHIP_SIZE / 2} cy={y + CHIP_SIZE / 2} />
        </g>
      ))}
    </svg>
  );
}

export default OperatorsArt;
