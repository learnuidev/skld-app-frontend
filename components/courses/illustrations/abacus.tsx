/**
 * Abacus artwork for the abacus courses. The palette mirrors the interactive
 * board used in lessons — dark frame, amber beam, red heaven bead, sky earth
 * beads — while each piece of art shows a different idea:
 *
 *  - `abacus`  the whole soroban (the path icon)
 *  - `bead`    one rod up close, for learning what a single bead is worth
 *  - `mental`  the board as a dashed ghost, for mental arithmetic
 *  - `suanpan` the Chinese board, which carries two heaven beads and five earth
 *              beads per rod instead of one and four
 */

const FRAME = "#171717";
const FRAME_JADE = "#115e59";
const BEAM = "#fbbf24";
const BEAM_JADE = "#5eead4";
const HEAVEN = "#f87171";
const EARTH = "#38bdf8";
const JADE = "#67e8f9";
const GHOST = "#7c3aed";

const INNER_TOP = 18;
const INNER_BOTTOM = 82;
const BEAM_HEIGHT = 3.5;
/** Breathing room between the bead stacks and the beam. */
const HEAVEN_GAP = 3;
const EARTH_GAP = 2.5;
const RODS = [33, 50, 67];
const BEAD_WIDTH = 13;

interface BoardSpec {
  frame: string;
  beam: string;
  rods: number[];
  heaven: { fill: string; count: number };
  earth: { fill: string; count: number };
}

/** Beads shrink as they get more numerous, so a stack always fits its frame. */
function beadHeight(count: number, heaven: boolean) {
  if (heaven) return count <= 1 ? 10 : 8;
  if (count <= 3) return 9;
  if (count <= 4) return 7.5;
  return 6.5;
}

function stackHeight(count: number, height: number, gap: number) {
  return count * height + Math.max(0, count - 1) * gap;
}

/** A single column of beads, centred on its rod. */
function Beads({
  rodX,
  top,
  count,
  height,
  fill,
}: {
  rodX: number;
  top: number;
  count: number;
  height: number;
  fill: string;
}) {
  const gap = 1.2;

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <rect
          key={index}
          x={rodX - BEAD_WIDTH / 2}
          y={top + index * (height + gap)}
          width={BEAD_WIDTH}
          height={height}
          rx={height / 2.2}
          fill={fill}
        />
      ))}
    </>
  );
}

/** A framed board with a beam, rods and the two bead stacks. */
function Board({ frame, beam, rods, heaven, earth }: BoardSpec) {
  const heavenHeight = beadHeight(heaven.count, true);
  const earthHeight = beadHeight(earth.count, false);
  const heavenStack = stackHeight(heaven.count, heavenHeight, 1.5);
  const earthStack = stackHeight(earth.count, earthHeight, 1.2);

  const block =
    heavenStack + HEAVEN_GAP + BEAM_HEIGHT + EARTH_GAP + earthStack;
  const top = INNER_TOP + (INNER_BOTTOM - INNER_TOP - block) / 2;
  const beamY = top + heavenStack + HEAVEN_GAP;
  const earthTop = beamY + BEAM_HEIGHT + EARTH_GAP;

  return (
    <>
      <rect x={8} y={12} width={84} height={76} rx={13} fill={frame} />

      {rods.map((rodX) => (
        <rect
          key={rodX}
          x={rodX - 0.9}
          y={INNER_TOP}
          width={1.8}
          height={INNER_BOTTOM - INNER_TOP}
          fill="#ffffff"
          opacity={0.12}
        />
      ))}

      <rect x={13} y={beamY} width={74} height={BEAM_HEIGHT} rx={BEAM_HEIGHT / 2} fill={beam} />

      {rods.map((rodX) => (
        <Beads
          key={`heaven-${rodX}`}
          rodX={rodX}
          top={top}
          count={heaven.count}
          height={heavenHeight}
          fill={heaven.fill}
        />
      ))}

      {rods.map((rodX) => (
        <Beads
          key={`earth-${rodX}`}
          rodX={rodX}
          top={earthTop}
          count={earth.count}
          height={earthHeight}
          fill={earth.fill}
        />
      ))}
    </>
  );
}

function Art({
  className,
  label,
  children,
}: {
  className?: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={label} focusable="false">
      {children}
    </svg>
  );
}

/** The whole soroban: three rods, one heaven bead and four earth beads each. */
export function AbacusArt({
  className,
  label = "A soroban with three rods of beads",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <Art className={className} label={label}>
      <Board
        frame={FRAME}
        beam={BEAM}
        rods={RODS}
        heaven={{ fill: HEAVEN, count: 1 }}
        earth={{ fill: EARTH, count: 4 }}
      />
    </Art>
  );
}

/** One rod up close, with the bead under the spotlight. */
export function BeadArt({
  className,
  label = "A single abacus rod with one bead highlighted",
}: {
  className?: string;
  label?: string;
}) {
  const rodX = 50;

  return (
    <Art className={className} label={label}>
      <rect x={16} y={10} width={68} height={80} rx={14} fill={FRAME} />
      <rect x={rodX - 1} y={16} width={2} height={68} fill="#ffffff" opacity={0.12} />
      <rect x={22} y={42} width={56} height={4} rx={2} fill={BEAM} />

      {/* Heaven bead, pushed down to the beam: it is worth five. */}
      <rect x={rodX - 15} y={28} width={30} height={13} rx={6} fill={HEAVEN} />

      {/* The middle earth bead is lit up — the one being explained. */}
      <circle cx={rodX} cy={65} r={22} fill="#ffffff" opacity={0.16} />
      {[48, 60, 72].map((y) => (
        <rect key={y} x={rodX - 15} y={y} width={30} height={10.5} rx={5} fill={EARTH} />
      ))}
    </Art>
  );
}

/** The board as a ghost: mental arithmetic, with a spark of speed. */
export function MentalArt({
  className,
  label = "A dashed abacus with a lightning bolt",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <Art className={className} label={label}>
      <rect
        x={8}
        y={12}
        width={84}
        height={76}
        rx={13}
        fill="none"
        stroke={GHOST}
        strokeWidth={4.5}
        strokeDasharray="10 7"
        strokeLinecap="round"
      />

      {RODS.map((rodX) => (
        <rect
          key={rodX}
          x={rodX - 1}
          y={22}
          width={2}
          height={56}
          fill={GHOST}
          opacity={0.3}
        />
      ))}

      <rect
        x={15}
        y={44}
        width={70}
        height={3}
        rx={1.5}
        fill={GHOST}
        opacity={0.55}
      />

      <g transform="translate(46 42) scale(1.7)">
        <path
          d="M13 2 4.1 12.6a1 1 0 0 0 .8 1.6h4.6l-1.7 7.2a1 1 0 0 0 1.7.9L18.4 11a1 1 0 0 0-.8-1.6h-4.4l1.6-6.6a1 1 0 0 0-1.8-.8Z"
          fill={GHOST}
          stroke="#ffffff"
          strokeWidth={1.6}
          strokeLinejoin="round"
        />
      </g>
    </Art>
  );
}

/** The Chinese suanpan: two heaven beads and five earth beads per rod. */
export function SuanpanArt({
  className,
  label = "A Chinese suanpan with two heaven beads and five earth beads per rod",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <Art className={className} label={label}>
      <Board
        frame={FRAME_JADE}
        beam={BEAM_JADE}
        rods={RODS}
        heaven={{ fill: JADE, count: 2 }}
        earth={{ fill: JADE, count: 5 }}
      />
    </Art>
  );
}
