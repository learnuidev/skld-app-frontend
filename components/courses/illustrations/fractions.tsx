/**
 * Course artwork for "Fractions": a circle cut into four equal quarters with
 * three of them filled — three quarters, drawn flat in the same bold style as
 * the rest of the app's course art.
 */

import { PALETTE } from "./palette";

const CENTER = 50;
const RADIUS = 42;
/** Degrees of white space between neighbouring quarters. */
const GAP = 2.6;

/** The shaded quarters are black; the one left empty is a pale yellow wash. */
const FILLED = PALETTE.ink;
const EMPTY = PALETTE.butter;

/** A point on the circle, measured clockwise from the top. */
function polar(angle: number, radius = RADIUS) {
  const radians = ((angle - 90) * Math.PI) / 180;
  const x = CENTER + radius * Math.cos(radians);
  const y = CENTER + radius * Math.sin(radians);
  return `${x.toFixed(2)} ${y.toFixed(2)}`;
}

/** One pie slice, from `start` to `end` degrees. */
function wedge(start: number, end: number) {
  const largeArc = end - start > 180 ? 1 : 0;
  return `M ${CENTER} ${CENTER} L ${polar(start)} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${polar(end)} Z`;
}

const QUARTERS = [0, 90, 180, 270].map((start) =>
  wedge(start + GAP / 2, start + 90 - GAP / 2),
);

/** The first three quarters are shaded, so the shape reads as 3/4. */
const FILLED_QUARTERS = 3;

export function FractionsArt({
  className,
  label = "A circle split into quarters, three of them filled",
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
      {QUARTERS.map((path, index) => (
        <path key={path} d={path} fill={index < FILLED_QUARTERS ? FILLED : EMPTY} />
      ))}
    </svg>
  );
}

export default FractionsArt;
