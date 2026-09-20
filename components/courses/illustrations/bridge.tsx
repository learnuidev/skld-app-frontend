/**
 * Course artwork for "Bridge Engineering": a stone arch bridge — one wide
 * segmental span, a gently cambered deck and a fine parapet — standing in an
 * ink-wash landscape, after the Zhaozhou bridge the course opens with.
 *
 * It is built the way a painting is built rather than the way an icon is: two
 * pale ridges behind the bridge with mist dissolving their feet, the water
 * below a low horizon as a neutral wash with a few pale ripples over it, and
 * the composition's single warm note left in the full moon above. The sky is
 * otherwise empty, so the fog plate it sits on reads as rice paper.
 *
 * Nothing is drawn as text and nothing is drawn in a colour of its own, so it
 * reads the same on a course card, a path icon and the course hero — and the
 * bridge is carried by two bold shapes, a stone body with the arch cut out of
 * it and the deck inked along its crown, which is what survives at 56px.
 */

import { PALETTE } from "./palette";

/** The inked structure: the deck slab, the arch ring, the parapet. */
const STONE = PALETTE.ink;
/** The stone body it is drawn over, and everything in the near water. */
const MASONRY = PALETTE.charcoal;
/** Quiet neutral detail: the ranges behind, and the ripples on the water. */
const DISTANCE = PALETTE.gray;
/** The plate's own grey, used for mist — and for the cloud over the moon. */
const MIST = PALETTE.fog;
/** The light neutral: the joints cut into the stonework. */
const JOINT = PALETTE.paper;
/** The one bright note, spent on the moon and nothing else. */
const MOON = PALETTE.yellow;
/** The pale wash: the moon's halo, and its whisper on the water. */
const GLOW = PALETTE.butter;

/** The horizon: water is the bottom third, the way a landscape sets it low. */
const WATER_Y = 68;

/**
 * The stone body runs bank to bank, on a deck that is long and nearly level —
 * just enough camber to read as a road carried over an arch.
 */
const DECK_LEFT = 4;
const DECK_RIGHT = 96;
const DECK_END_Y = 47.5;
const DECK_CROWN_Y = 44;
const DECK_CONTROL_X = (DECK_LEFT + DECK_RIGHT) / 2;
/** The control that lifts the quadratic so its crown lands on DECK_CROWN_Y. */
const DECK_CONTROL_Y = 2 * DECK_CROWN_Y - DECK_END_Y;
/** The deck slab, inked: the thickness of the roadway itself. */
const DECK_THICK = 3;

/**
 * One wide segmental arch — 66 across and 15 high, the famously flat profile
 * of the Zhaozhou bridge — springing out of the water at both banks, with its
 * stone ring inked around the soffit.
 */
const ARCH_LEFT = 17;
const ARCH_RIGHT = 83;
const ARCH_CROWN_Y = 53;
const ARCH_CONTROL_X = (ARCH_LEFT + ARCH_RIGHT) / 2;
const ARCH_CONTROL_Y = 2 * ARCH_CROWN_Y - WATER_Y;
/** The depth of the arch ring: the stones that carry the span. */
const RING_DEPTH = 3.6;

/** The parapet: one thin rail, held above the deck by a post every bay. */
const PARAPET_RISE = 3.6;
/** Where the posts stand, as fractions of the span from the left bank. */
const POSTS = [0.06, 0.22, 0.36, 0.5, 0.64, 0.78, 0.94];

/** Stone joints off the arch: how far they reach, and where they sit. */
const JOINT_DEPTH = 3.4;
const JOINTS = [0.1, 0.27, 0.44, 0.61, 0.78, 0.93];

/** How far the abutments lean in as they fall to the water: a batter. */
const BATTER = 1.4;

/** The bridge's body: bank to bank, with the arch cut out of it. */
const MASONRY_MASS = [
  `M ${DECK_LEFT} ${DECK_END_Y}`,
  `Q ${DECK_CONTROL_X} ${DECK_CONTROL_Y} ${DECK_RIGHT} ${DECK_END_Y}`,
  `L ${DECK_RIGHT - BATTER} ${WATER_Y}`,
  `L ${ARCH_RIGHT} ${WATER_Y}`,
  `Q ${ARCH_CONTROL_X} ${ARCH_CONTROL_Y} ${ARCH_LEFT} ${WATER_Y}`,
  `L ${DECK_LEFT + BATTER} ${WATER_Y}`,
  "Z",
].join(" ");

/** The roadway, inked along the crown: the one edge the eye reads as deck. */
const DECK_SLAB = [
  `M ${DECK_LEFT} ${DECK_END_Y}`,
  `Q ${DECK_CONTROL_X} ${DECK_CONTROL_Y} ${DECK_RIGHT} ${DECK_END_Y}`,
  `L ${DECK_RIGHT} ${DECK_END_Y + DECK_THICK}`,
  `Q ${DECK_CONTROL_X} ${DECK_CONTROL_Y + DECK_THICK} ${DECK_LEFT} ${DECK_END_Y + DECK_THICK}`,
  "Z",
].join(" ");

/** The arch ring: a band of voussoirs around the soffit, drawn in ink. */
const ARCH_RING = [
  `M ${ARCH_LEFT} ${WATER_Y}`,
  `Q ${ARCH_CONTROL_X} ${ARCH_CONTROL_Y} ${ARCH_RIGHT} ${WATER_Y}`,
  `L ${ARCH_RIGHT} ${WATER_Y - RING_DEPTH}`,
  `Q ${ARCH_CONTROL_X} ${ARCH_CONTROL_Y - RING_DEPTH} ${ARCH_LEFT} ${WATER_Y - RING_DEPTH}`,
  "Z",
].join(" ");

/** The parapet rail, a parapet's height above the deck, end to end. */
const RAIL = [
  `M ${DECK_LEFT} ${DECK_END_Y - PARAPET_RISE}`,
  `Q ${DECK_CONTROL_X} ${DECK_CONTROL_Y - PARAPET_RISE} ${DECK_RIGHT} ${DECK_END_Y - PARAPET_RISE}`,
].join(" ");

/**
 * The two ranges behind the bridge, as summits rather than as sawteeth: a tall
 * peak left of centre in the nearer one, and softer ground running right, where
 * the moon is left its air.
 */
const NEAR_RIDGE = [
  "M -6 63",
  "C 4 61 13 56 21 49",
  "C 29 42 35 34 46 33",
  "C 57 32 63 40 71 47",
  "C 81 55 93 61 106 63",
  "Z",
].join(" ");
const FAR_RIDGE = [
  "M -6 55",
  "C 14 53 30 46 47 43",
  "C 59 41 71 41 81 43",
  "C 92 45 100 48 106 50",
  "Z",
].join(" ");

/** The moon, high in the empty right-hand sky. */
const MOON_X = 72.5;
const MOON_Y = 23.5;
const MOON_R = 9.6;
/** How far the halo reaches past the disc. */
const HALO_R = 16.5;

/** The moon's whisper on the water: four glints, thinning as they fall. */
const MOON_WHISPER = [
  "M 67 72.6 Q 73.5 71.7 80 72.6 Q 73.5 73.5 67 72.6 Z",
  "M 68.5 77 Q 73.5 76.2 78.5 77 Q 73.5 77.8 68.5 77 Z",
  "M 69.5 81.5 Q 73.5 80.8 77.5 81.5 Q 73.5 82.2 69.5 81.5 Z",
  "M 70.5 86.5 Q 73.5 85.9 76.5 86.5 Q 73.5 87.1 70.5 86.5 Z",
].join(" ");

/**
 * The ripples: a few broad pale strokes with a few short darker ones laid over
 * them, long near the horizon and shorter as they come forward. Water is never
 * ruled, so nothing here repeats a length, a weight or a gap.
 */
const RIPPLES = [
  { y: 69.8, from: 36, to: 52, bow: 0.5, opacity: 0.4, width: 1 },
  { y: 70.4, from: 58, to: 70, bow: 0.4, opacity: 0.34, width: 1 },
  { y: 71.6, from: 4, to: 46, bow: -1, opacity: 0.22, width: 1.4 },
  { y: 73.2, from: 66, to: 88, bow: 0.8, opacity: 0.3, width: 1.1 },
  { y: 75.8, from: 20, to: 38, bow: -0.6, opacity: 0.3, width: 1 },
  { y: 78.4, from: 12, to: 62, bow: 1.2, opacity: 0.16, width: 1.6 },
  { y: 82.5, from: 58, to: 74, bow: -0.5, opacity: 0.22, width: 1 },
  { y: 86.5, from: 30, to: 88, bow: 1.4, opacity: 0.13, width: 1.8 },
  { y: 92, from: 8, to: 34, bow: -0.8, opacity: 0.16, width: 1.2 },
];

/** Three distant birds, small enough to read as marks rather than drawings. */
const BIRDS = [
  { x: 27, y: 18, scale: 1 },
  { x: 36, y: 13.5, scale: 0.8 },
  { x: 43, y: 19.5, scale: 0.7 },
];

/**
 * A point on the arch soffit, with the direction of the curve there — enough
 * to stand a stone joint square on the arch.
 */
function soffit(t: number) {
  const rest = 1 - t;

  return {
    x: rest ** 2 * ARCH_LEFT + 2 * t * rest * ARCH_CONTROL_X + t ** 2 * ARCH_RIGHT,
    y: rest ** 2 * WATER_Y + 2 * t * rest * ARCH_CONTROL_Y + t ** 2 * WATER_Y,
    dx: 2 * rest * (ARCH_CONTROL_X - ARCH_LEFT) + 2 * t * (ARCH_RIGHT - ARCH_CONTROL_X),
    dy: 2 * rest * (ARCH_CONTROL_Y - WATER_Y) + 2 * t * (WATER_Y - ARCH_CONTROL_Y),
  };
}

/** A point on the deck's crown curve, for a post to stand on. */
function deckAt(t: number) {
  const rest = 1 - t;

  return {
    x: rest ** 2 * DECK_LEFT + 2 * t * rest * DECK_CONTROL_X + t ** 2 * DECK_RIGHT,
    y: rest ** 2 * DECK_END_Y + 2 * t * rest * DECK_CONTROL_Y + t ** 2 * DECK_END_Y,
  };
}

/** The washes and the clip every copy of this drawing shares, under its own prefix. */
function Washes() {
  return (
    <defs>
      <linearGradient id="bridge-art-mist" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={MIST} stopOpacity={0} />
        <stop offset="0.35" stopColor={MIST} stopOpacity={0.45} />
        <stop offset="0.7" stopColor={MIST} stopOpacity={0.9} />
        <stop offset="1" stopColor={MIST} stopOpacity={1} />
      </linearGradient>
      <linearGradient id="bridge-art-ridge" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={DISTANCE} stopOpacity={0.85} />
        <stop offset="0.5" stopColor={DISTANCE} stopOpacity={0.45} />
        <stop offset="1" stopColor={DISTANCE} stopOpacity={0.06} />
      </linearGradient>
      <linearGradient id="bridge-art-stone" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={MASONRY} stopOpacity={0} />
        <stop offset="0.55" stopColor={MASONRY} stopOpacity={0.22} />
        <stop offset="1" stopColor={MASONRY} stopOpacity={0.5} />
      </linearGradient>
      <linearGradient id="bridge-art-water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={MASONRY} stopOpacity={0.22} />
        <stop offset="0.6" stopColor={MASONRY} stopOpacity={0.12} />
        <stop offset="1" stopColor={MASONRY} stopOpacity={0.05} />
      </linearGradient>
      {/* The bridge's own silhouette, so its wash can be laid inside it. */}
      <clipPath id="bridge-art-body">
        <path d={MASONRY_MASS} />
      </clipPath>
      <radialGradient id="bridge-art-moon-halo">
        <stop offset="0" stopColor={GLOW} stopOpacity={0.55} />
        <stop offset="0.55" stopColor={GLOW} stopOpacity={0.2} />
        <stop offset="1" stopColor={GLOW} stopOpacity={0} />
      </radialGradient>
    </defs>
  );
}

/** A bird: two brush flicks meeting in a shallow dip, the way distance reads. */
function Birds() {
  return (
    <>
      {BIRDS.map(({ x, y, scale }) => {
        const wing = 4.2 * scale;
        const lift = 2.6 * scale;

        return (
          <path
            key={x}
            d={[
              `M ${x - wing} ${y}`,
              `Q ${x - wing / 2} ${y - lift} ${x} ${y + 0.4 * scale}`,
              `Q ${x + wing / 2} ${y - lift} ${x + wing} ${y}`,
            ].join(" ")}
            fill="none"
            stroke={MASONRY}
            strokeWidth={1.2}
            strokeLinecap="round"
            opacity={0.6}
          />
        );
      })}
    </>
  );
}

export function BridgeArt({
  className,
  label = "A stone arch bridge with a full moon over the water",
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
      <Washes />

      {/* The ranges the mist will dissolve: the paler one first, further off,
          then the nearer one, whose peak gives the left of the frame its
          weight. Both are washes rather than shapes — they thin to nothing at
          their own feet, the way a range does when it stands in cloud. */}
      <path d={FAR_RIDGE} fill="url(#bridge-art-ridge)" opacity={0.6} />
      <path d={NEAR_RIDGE} fill="url(#bridge-art-ridge)" />

      {/* Mist, laid over both so they dissolve long before they reach water:
          the summits are left floating, the way a range does in these paintings. */}
      <rect x={0} y={54} width={100} height={WATER_Y - 54} fill="url(#bridge-art-mist)" />

      {/* The moon, its halo, and the wisp of cloud crossing its lower edge. */}
      <circle cx={MOON_X} cy={MOON_Y} r={HALO_R} fill="url(#bridge-art-moon-halo)" />
      <circle cx={MOON_X} cy={MOON_Y} r={MOON_R} fill={MOON} opacity={0.62} />

      {/* The water: a neutral wash, darkest at the horizon and thinning into
          the near corner, the way a wash of ink runs out. */}
      <rect x={0} y={WATER_Y} width={100} height={100 - WATER_Y} fill="url(#bridge-art-water)" />

      {/* The far bank, drawn by hand: the one line the eye reads as horizon. */}
      <path
        d={`M -1 ${WATER_Y + 0.2} Q 24 ${WATER_Y - 0.4} 50 ${WATER_Y} Q 76 ${WATER_Y + 0.4} 101 ${WATER_Y - 0.2}`}
        fill="none"
        stroke={MASONRY}
        strokeWidth={1.1}
        strokeLinecap="round"
        opacity={0.5}
      />

      {/* The moon's light, arriving on the water. */}
      <path d={MOON_WHISPER} fill={GLOW} opacity={0.26} />

      {RIPPLES.map(({ y, from, to, bow, opacity, width }) => (
        <path
          key={y}
          d={`M ${from} ${y} Q ${(from + to) / 2} ${y + bow} ${to} ${y}`}
          fill="none"
          stroke={DISTANCE}
          strokeWidth={width}
          strokeLinecap="round"
          opacity={opacity}
        />
      ))}

      {/* The bridge: a stone body with the arch cut out of it, the deck slab
          and the arch ring inked over it, and joints square on the soffit so
          the span reads as voussoirs rather than as a hole. */}
      <path d={MASONRY_MASS} fill={MASONRY} opacity={0.5} />
      <g clipPath="url(#bridge-art-body)">
        <rect
          x={0}
          y={DECK_CROWN_Y}
          width={100}
          height={WATER_Y - DECK_CROWN_Y}
          fill="url(#bridge-art-stone)"
        />
      </g>
      <path
        d={MASONRY_MASS}
        fill="none"
        stroke={MASONRY}
        strokeWidth={0.9}
        strokeLinecap="round"
        opacity={0.45}
      />
      <path d={DECK_SLAB} fill={STONE} />
      <path d={ARCH_RING} fill={STONE} opacity={0.72} />
      {JOINTS.map((t) => {
        const { x, y, dx, dy } = soffit(t);
        const length = Math.hypot(dx, dy);

        return (
          <line
            key={t}
            x1={x}
            y1={y}
            x2={x + (dy / length) * JOINT_DEPTH}
            y2={y - (dx / length) * JOINT_DEPTH}
            stroke={JOINT}
            strokeWidth={0.7}
            opacity={0.3}
          />
        );
      })}

      {/* The parapet over the deck: one rail, a post in every bay. */}
      <path d={RAIL} fill="none" stroke={STONE} strokeWidth={1.25} strokeLinecap="round" />
      {POSTS.map((t) => {
        const { x, y } = deckAt(t);

        return (
          <line
            key={t}
            x1={x}
            y1={y - PARAPET_RISE}
            x2={x}
            y2={y}
            stroke={STONE}
            strokeWidth={1.25}
          />
        );
      })}

      <Birds />
    </svg>
  );
}

export default BridgeArt;
