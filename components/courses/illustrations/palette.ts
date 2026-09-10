/**
 * The palette every course illustration draws from. Purple leads, and each
 * colour keeps the same job everywhere so the artwork reads as one set:
 *
 *  - purple / purpleDeep  the subject itself, and the darks beneath it
 *  - cream / gray         neutrals: surfaces, quiet details, empty space
 *  - gold                 the one bright contrast in a picture
 *  - teal / green         rich supporting tones
 *
 * Cream and gold are warm neighbours of purple; teal and green sit opposite it
 * on the wheel, which is what makes them read as accents rather than noise.
 */
export const PALETTE = {
  /** Filled slices, symbols, numerals, the ghost outline. */
  purple: "#7c3aed",
  /** The dark behind the subject — abacus frames and boards. */
  purpleDeep: "#4c1d95",
  /** Neutral surfaces: chips, beams, empty slices, highlights. */
  cream: "#fffbeb",
  /** Neutral detail: rods and other quiet structure. */
  gray: "#a8a29e",
  /** The single bright contrast: heaven beads and the spark. */
  gold: "#f59e0b",
  /** Rich tone: the soroban's earth beads. */
  teal: "#0d9488",
  /** Rich tone: the Chinese board's beads. */
  green: "#10b981",
} as const;
