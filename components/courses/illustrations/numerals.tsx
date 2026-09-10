/**
 * Course artwork for "Chinese Numbers": the numerals 一, 二 and 三 (one, two,
 * three) as three brush-like strokes, each longer than the last. Drawn as
 * strokes rather than text so the shapes never depend on a CJK font.
 */

import { PALETTE } from "./palette";

const INK = PALETTE.ink;

/** y, and the half-width, of each stroke from the top. */
const STROKES = [
  { y: 30, half: 11 },
  { y: 50, half: 18 },
  { y: 70, half: 25 },
];

export function NumeralsArt({
  className,
  label = "The Chinese numerals one, two and three",
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
      {STROKES.map(({ y, half }) => (
        <line
          key={y}
          x1={50 - half}
          y1={y}
          x2={50 + half}
          y2={y}
          stroke={INK}
          strokeWidth={9}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export default NumeralsArt;
