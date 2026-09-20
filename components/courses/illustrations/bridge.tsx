/**
 * Course artwork for "Bridge Engineering": a suspension bridge drawn flat in
 * the shared palette — charcoal towers, an ink cable and deck, and the bright
 * note on the roadway traffic actually runs on.
 *
 * Drawn without text or colour of its own so it reads the same on a course
 * card, a path icon, and the course hero.
 */

import { PALETTE } from "./palette";

/** Tower positions, by their left edge in the 100 × 100 viewBox. */
const TOWER_LEFT = [28, 65];
const TOWER_WIDTH = 7;
const TOWER_TOP = 16;
const TOWER_BOTTOM = 74;
const DECK_TOP = 58;
const DECK_BOTTOM = 66;
const WATER_Y = 74;

/** The main cable, slung from tower top to tower top and anchored at the ends. */
const CABLE_START = TOWER_LEFT[0] + TOWER_WIDTH / 2;
const CABLE_END = TOWER_LEFT[1] + TOWER_WIDTH / 2;
const CABLE_DROP = 22;
const CABLE_SAG_CONTROL = TOWER_TOP + CABLE_DROP * 2;

/** A point on the sagging main cable, for hangers to hang from. */
function cableY(t: number) {
  const top = TOWER_TOP;
  const control = CABLE_SAG_CONTROL;
  return (1 - t) ** 2 * top + 2 * t * (1 - t) * control + t ** 2 * top;
}

/** Hangers, evenly spread across the main span. */
const HANGERS = [0.2, 0.35, 0.5, 0.65, 0.8];

export function BridgeArt({
  className,
  label = "A suspension bridge with two towers and a sagging main cable",
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
      {/* The water the bridge crosses. */}
      <rect x={0} y={WATER_Y} width={100} height={100 - WATER_Y} fill={PALETTE.butter} />
      <line
        x1={0}
        y1={WATER_Y}
        x2={100}
        y2={WATER_Y}
        stroke={PALETTE.yellowDeep}
        strokeWidth={1.6}
        strokeDasharray="7 5"
      />

      {/* Anchorages, holding the cable's pull at each end. */}
      <rect x={0} y={44} width={9} height={16} rx={2} fill={PALETTE.charcoal} />
      <rect x={91} y={44} width={9} height={16} rx={2} fill={PALETTE.charcoal} />

      {/* Towers, standing in the water. */}
      {TOWER_LEFT.map((left) => (
        <rect
          key={left}
          x={left}
          y={TOWER_TOP}
          width={TOWER_WIDTH}
          height={TOWER_BOTTOM - TOWER_TOP}
          rx={2}
          fill={PALETTE.charcoal}
        />
      ))}

      {/* The main cable and its hangers. */}
      <path
        d={`M 9 50 L ${CABLE_START} ${TOWER_TOP} Q ${(CABLE_START + CABLE_END) / 2} ${CABLE_SAG_CONTROL} ${CABLE_END} ${TOWER_TOP} L 91 50`}
        fill="none"
        stroke={PALETTE.ink}
        strokeWidth={3.4}
        strokeLinecap="round"
      />
      {HANGERS.map((t) => {
        const x = CABLE_START + t * (CABLE_END - CABLE_START);
        return (
          <line
            key={t}
            x1={x}
            y1={cableY(t)}
            x2={x}
            y2={DECK_TOP}
            stroke={PALETTE.gray}
            strokeWidth={1.4}
          />
        );
      })}

      {/* The stiffening girder, with the roadway as the bright note. */}
      <rect
        x={4}
        y={DECK_TOP}
        width={92}
        height={DECK_BOTTOM - DECK_TOP}
        rx={2}
        fill={PALETTE.ink}
      />
      <rect x={4} y={DECK_TOP} width={92} height={3} rx={1.5} fill={PALETTE.yellow} />
    </svg>
  );
}

export default BridgeArt;
