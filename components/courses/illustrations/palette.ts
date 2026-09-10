/**
 * The palette every course illustration draws from: black in shades, with
 * yellow as the one bright note. Each token keeps the same job everywhere, so
 * the artwork reads as a single set.
 *
 * The neutral scale runs from black up to paper —
 *
 *   ink  →  charcoal  →  gray  →  paper
 *
 * — and yellow sits on top of it in three strengths: `butter` for quiet
 * washes, `yellow` for the bright note, `yellowDeep` for shading.
 */
export const PALETTE = {
  /** The subject: boards and frames, symbols, numerals, filled slices. */
  ink: "#171717",
  /** The lighter black: tiles and structure that sit beside the subject. */
  charcoal: "#404040",
  /** Quiet neutral detail: rods and ghost lines. */
  gray: "#a3a3a3",
  /** Light grey: the plate every illustration sits on. */
  fog: "#ededed",
  /** The light neutral: beads, chips, highlights that must read on ink. */
  paper: "#fafafa",
  /** Pale yellow: beams and quiet washes. */
  butter: "#fef08a",
  /** The bright note: heaven beads, symbols, the spark. */
  yellow: "#facc15",
  /** Deeper yellow: shading, and the Chinese board's beads. */
  yellowDeep: "#eab308",
} as const;
