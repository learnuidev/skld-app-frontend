/**
 * The bridge drawings: every scene a lesson can put on screen, drawn in
 * engineering elevation and washed in ink, the way a Chinese landscape is
 * painted. Tone carries the depth — the water, the banks, the distance — and
 * line carries the structure, so a figure reads as a bridge before a single
 * name is written on it. What is left unpainted is sky, and that empty paper
 * is doing as much work as the strokes.
 *
 * Each scene is a pure function of `SceneShapes` — which parts are being
 * pointed at, and whether the names are written on — so one drawing can serve
 * as a quiet figure, a labelled diagram, a "find this part" puzzle, or the
 * board behind a "Why?" explanation. Every scene also declares its parts:
 * where each one sits on the drawing, what it is called, and what it does. The
 * geometry and the vocabulary therefore live together, and lesson content only
 * has to name the scene and the part ids it wants.
 *
 * These are still engineering drawings, and the atmosphere never gets to cost
 * a learner the answer: the geometry, the pins and the vocabulary are
 * untouched, every part still fades back when another is in hand, and `yellow`
 * still means exactly one thing — the part being read. The rest of the colour
 * comes from the one course palette, black in shades, so these drawings belong
 * to the same set as the abacus art.
 */

import type { ReactNode } from "react";

import { PALETTE } from "@/components/courses/illustrations/palette";
import type { BridgeScene } from "@/modules/course/types";

/** The drawing's coordinate space; every scene is authored inside it. */
export const SCENE_WIDTH = 320;
export const SCENE_HEIGHT = 180;

/** One named piece of a drawing: a pin position, a name, and its job. */
export interface ScenePart {
  id: string;
  label: string;
  /**
   * The name the drawing writes for this part, when the full label will not
   * fit there — "High water level" is drawn as "high water". Defaults to
   * `label`. Every part is named on its drawing when the names are on, and
   * this is the name it is written under.
   */
  tag?: string;
  /** What the part does, in one sentence — shown when the learner finds it. */
  note: string;
  /** Where its pin sits, in scene coordinates. */
  at: [number, number];
}

export interface SceneShapes {
  /** Part ids to light up in the bright note; everything else fades back. */
  highlight?: string[];
  /** Whether the parts are named on the drawing. */
  labels?: boolean;
}

// ── Shared drawing kit ─────────────────────────────────────────────────────

/**
 * When a scene is pointing at particular parts, those parts take the bright
 * note and everything else fades back, so the learner's eye lands where the
 * lesson wants it.
 */
function painter(shapes: SceneShapes) {
  const fade = (id: string) =>
    shapes.highlight?.length && !shapes.highlight.includes(id) ? 0.3 : 1;
  return { fade };
}

/** A structural block in the drawing: yellow when it is the part in hand. */
function blockColour(lit: boolean, dark: boolean) {
  if (lit) return dark ? PALETTE.yellowDeep : PALETTE.yellow;
  return dark ? PALETTE.charcoal : PALETTE.ink;
}

/** A surface layer — paving, waterproofing — a quiet wash until it is the subject. */
function washColour(lit: boolean) {
  return lit ? PALETTE.yellow : PALETTE.butter;
}

/**
 * The washes that have to fade rather than stop: sky, water and mist. Every
 * scene defines them and every definition is identical, so a page carrying
 * several drawings shares one gradient without the copies ever disagreeing.
 */
function Washes() {
  return (
    <defs>
      {/* Paper catching the light, so the top of a drawing breathes. */}
      <linearGradient id="bridge-wash-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={PALETTE.paper} stopOpacity="0.92" />
        <stop offset="1" stopColor={PALETTE.paper} stopOpacity="0" />
      </linearGradient>
      {/* Water: palest at the far bank, deepening towards the viewer. */}
      <linearGradient id="bridge-wash-water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={PALETTE.charcoal} stopOpacity="0.05" />
        <stop offset="1" stopColor={PALETTE.charcoal} stopOpacity="0.13" />
      </linearGradient>
      {/* Air: paper laid back over the distance until the distance dissolves. */}
      <linearGradient id="bridge-wash-mist" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={PALETTE.fog} stopOpacity="0" />
        <stop offset="0.7" stopColor={PALETTE.fog} stopOpacity="0.7" />
        <stop offset="1" stopColor={PALETTE.fog} stopOpacity="1" />
      </linearGradient>
    </defs>
  );
}

/** A wash of tone, the way a loaded brush lays one down. */
function Wash({
  y,
  height,
  x = 0,
  width = SCENE_WIDTH,
  tone = PALETTE.charcoal,
  opacity = 0.07,
}: {
  y: number;
  height: number;
  x?: number;
  width?: number;
  tone?: string;
  opacity?: number;
}) {
  return <rect x={x} y={y} width={width} height={height} fill={tone} opacity={opacity} />;
}

/** Paper catching the light across the top of an outdoor drawing. */
function Sky({ height = 104 }: { height?: number }) {
  return (
    <rect x={0} y={0} width={SCENE_WIDTH} height={height} fill="url(#bridge-wash-sky)" />
  );
}

/** Air laid over the distance: a band of mist that dissolves what stands behind it. */
function Mist({ y, height = 24, opacity = 1 }: { y: number; height?: number; opacity?: number }) {
  return (
    <path
      d={`M 0 ${y} H ${SCENE_WIDTH} V ${y + height} H 0 Z`}
      fill="url(#bridge-wash-mist)"
      opacity={opacity}
    />
  );
}

/**
 * A distant range, built from one fixed profile so every scene's hills belong
 * to the same landscape, and slid sideways by `shift` so two ranges standing
 * behind one another never line up. Heights are read as fractions of the
 * tallest peak, which is `height` above the line the hills are set down on.
 */
const RIDGE = [0, 0.44, 0.16, 0.8, 0.32, 1, 0.38, 0.62, 0.12, 0.56, 0.24, 0.46, 0];

function ridgePath(base: number, height: number, shift: number): string {
  const last = RIDGE.length - 1;
  const points = RIDGE.map((_, index) => {
    const rise = RIDGE[(index + shift) % RIDGE.length];
    return [(index / last) * SCENE_WIDTH, base - rise * height] as const;
  });

  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const [x, y] = points[index];
    const [nextX, nextY] = points[index + 1];
    // Each curve aims at the midpoint of its pair, which rounds the peaks off.
    d += ` Q ${x} ${y} ${(x + nextX) / 2} ${(y + nextY) / 2}`;
  }

  return `${d} L ${SCENE_WIDTH} ${base} L 0 ${base} Z`;
}

/**
 * Two ranges and the mist between them — which is the whole of aerial
 * perspective, and it costs two shapes. The far range is taller and paler
 * than the near one, so the drawing gains depth without gaining detail.
 */
/**
 * Two ranges and the mist between them — which is the whole of aerial
 * perspective, and it costs two shapes. The far range is taller and paler
 * than the near one, and only their feet dissolve: the peaks have to stay
 * above the mist or the distance stops reading as distance.
 */
function Distance({ base, height = 30 }: { base: number; height?: number }) {
  return (
    <>
      <path d={ridgePath(base, height, 4)} fill={PALETTE.charcoal} opacity={0.07} />
      <path d={ridgePath(base, height * 0.68, 9)} fill={PALETTE.charcoal} opacity={0.11} />
      <Mist y={base - height * 0.26} height={height * 0.26} />
    </>
  );
}

/**
 * Still water, drawn the way a brush draws it: rows of short strokes that grow
 * longer and further apart as they come towards the viewer, each one sitting a
 * little off its own line. Nothing runs the full width of the drawing — water
 * is suggested here, not ruled.
 */
const RIPPLE_ROWS = [
  { dy: 6, length: 13, gap: 29, width: 1.1, opacity: 0.34, offset: 13 },
  { dy: 15, length: 19, gap: 43, width: 1.3, opacity: 0.3, offset: 33 },
  { dy: 26, length: 26, gap: 57, width: 1.5, opacity: 0.25, offset: 9 },
  { dy: 39, length: 33, gap: 75, width: 1.7, opacity: 0.2, offset: 29 },
];

/** How far each stroke in a row sits off the row's own line. */
const RIPPLE_JITTER = [0, 1.4, -1, 0.7, -1.5, 1.1];

/** How much longer or shorter than its row each stroke is drawn. */
const RIPPLE_REACH = [1, 0.64, 1.24, 0.82, 1.1, 0.72];

/** And how much darker or lighter: no two strokes in a row carry the same ink. */
const RIPPLE_INK = [1, 0.78, 1.14, 0.68, 0.92, 0.84];

function Ripples({ y, x1 = 0, x2 = SCENE_WIDTH }: { y: number; x1?: number; x2?: number }) {
  const strokes: ReactNode[] = [];

  RIPPLE_ROWS.forEach((row, rowIndex) => {
    const at = y + row.dy;
    if (at > SCENE_HEIGHT - 3) return;

    let stroke = 0;
    for (let x = x1 + row.offset; x < x2 - 12; x += row.gap) {
      const turn = stroke % RIPPLE_REACH.length;
      const length = row.length * RIPPLE_REACH[turn];
      if (x + length > x2 - 5) break;

      strokes.push(
        <line
          key={`${rowIndex}-${x}`}
          x1={x}
          y1={at + RIPPLE_JITTER[turn]}
          x2={x + length}
          y2={at + RIPPLE_JITTER[turn]}
          stroke={PALETTE.charcoal}
          strokeWidth={row.width}
          strokeLinecap="round"
          opacity={row.opacity * RIPPLE_INK[turn]}
        />,
      );
      stroke += 1;
    }
  });

  return <>{strokes}</>;
}

/** A structure's reflection: a few pale strokes beneath it, never a mirror. */
function Reflection({
  cx,
  y,
  width = 14,
  opacity = 0.16,
}: {
  cx: number;
  y: number;
  width?: number;
  opacity?: number;
}) {
  return (
    <g stroke={PALETTE.charcoal} strokeLinecap="round" opacity={opacity}>
      <line x1={cx - width / 2} y1={y + 3} x2={cx + width / 2} y2={y + 3} strokeWidth={1.4} />
      <line x1={cx - width / 3} y1={y + 8} x2={cx + width / 3} y2={y + 8} strokeWidth={1.2} />
      <line x1={cx - width / 4.5} y1={y + 12} x2={cx + width / 4.5} y2={y + 12} strokeWidth={1} />
    </g>
  );
}

/** The river: a graded wash, its waterline, and a few strokes of ripple. */
function Water({ y, x1 = 0, x2 = SCENE_WIDTH }: { y: number; x1?: number; x2?: number }) {
  return (
    <>
      <path d={`M ${x1} ${y} H ${x2} V ${SCENE_HEIGHT} H ${x1} Z`} fill="url(#bridge-wash-water)" />
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={PALETTE.ink} strokeWidth={1.2} opacity={0.42} />
      <Ripples y={y} x1={x1} x2={x2} />
    </>
  );
}

/** The ground line, with the little ticks that read as earth in section. */
function Ground({ y, x1 = 0, x2 = SCENE_WIDTH }: { y: number; x1?: number; x2?: number }) {
  const ticks: ReactNode[] = [];
  for (let x = x1 + 8; x < x2; x += 14) {
    ticks.push(<line key={x} x1={x} y1={y} x2={x - 7} y2={y + 8} />);
  }
  return (
    <>
      {/* Earth reads as a thin mass under the line rather than as a rule. */}
      <rect x={x1} y={y} width={x2 - x1} height={4} fill={PALETTE.charcoal} opacity={0.07} />
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={PALETTE.ink} strokeWidth={1.4} opacity={0.55} />
      <g stroke={PALETTE.gray} strokeWidth={1} opacity={0.42}>
        {ticks}
      </g>
    </>
  );
}

/**
 * A bank: a wash of tone that stops being painted where the water begins. The
 * wash is one shape and the shore is another, because a stroke around a closed
 * bank would draw the frame of the drawing instead of the edge of the land.
 */
function Land({ d, shore, opacity = 0.11 }: { d: string; shore?: string; opacity?: number }) {
  return (
    <>
      <path d={d} fill={PALETTE.charcoal} opacity={opacity} />
      {shore ? (
        <path d={shore} fill="none" stroke={PALETTE.ink} strokeWidth={1.3} opacity={0.4} />
      ) : null}
    </>
  );
}

/**
 * A structural mass. A flat block reads as a block; the same block given a lit
 * crest, a shaded foot and a drawn edge reads as something built. The body is
 * laid on slightly translucent, because ink on paper is never quite opaque —
 * that is what stops the deck of a bridge reading as a black bar. Anything too
 * thin to carry the shading stays a plain drawn block, since a bearing four
 * units tall has no room to be a solid.
 */
function Mass({
  x,
  y,
  width,
  height,
  fill,
  rx = 0,
  opacity = 1,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  rx?: number;
  opacity?: number;
}) {
  const solid = height >= 7;

  return (
    <g opacity={opacity}>
      {/* A big mass is ink laid on clean paper: the primer keeps the distance
          behind it from showing through, and the wash on top keeps the deck of
          a bridge from becoming a black bar. */}
      {solid ? (
        <rect x={x} y={y} width={width} height={height} rx={rx} fill={PALETTE.paper} opacity={0.95} />
      ) : null}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={rx}
        fill={fill}
        opacity={solid ? 0.85 : 0.96}
      />
      {solid ? (
        <>
          {/* Both bands are capped in size: on a tall, narrow pile a band
              scaled to its height would read as three stacked blocks. */}
          <rect
            x={x}
            y={y + height - Math.min(5, height * 0.4)}
            width={width}
            height={Math.min(5, height * 0.4)}
            rx={rx}
            fill={PALETTE.ink}
            opacity={0.16}
          />
          <rect
            x={x}
            y={y}
            width={width}
            height={Math.min(3.2, Math.max(1.4, height * 0.24))}
            rx={rx}
            fill={PALETTE.paper}
            opacity={0.3}
          />
        </>
      ) : null}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={rx}
        fill="none"
        stroke={PALETTE.ink}
        strokeWidth={solid ? 1.3 : 1.1}
        opacity={solid ? 0.6 : 0.45}
      />
    </g>
  );
}

function Deck({
  x1,
  x2,
  y,
  height = 10,
  fill = PALETTE.ink,
  opacity = 1,
}: {
  x1: number;
  x2: number;
  y: number;
  height?: number;
  fill?: string;
  opacity?: number;
}) {
  return <Mass x={x1} y={y} width={x2 - x1} height={height} rx={1.5} fill={fill} opacity={opacity} />;
}

/**
 * A pier or an abutment: a block that widens as it reaches the ground, with
 * the foot it stands on shaded, the light it catches at its head, and the cap
 * its load arrives through. Its sides stay straight, so a learner can still
 * read the batter that tells an abutment from a pier.
 */
function Support({
  cx,
  top,
  bottom,
  topWidth = 13,
  bottomWidth = 18,
  fill,
  opacity = 1,
}: {
  cx: number;
  top: number;
  bottom: number;
  topWidth?: number;
  bottomWidth?: number;
  fill: string;
  opacity?: number;
}) {
  const widthAt = (t: number) => topWidth + (bottomWidth - topWidth) * t;
  const yAt = (t: number) => top + (bottom - top) * t;

  /** The block between two heights, as a slice across the taper. */
  const slice = (from: number, to: number) =>
    [
      `M ${cx - widthAt(from) / 2} ${yAt(from)}`,
      `L ${cx + widthAt(from) / 2} ${yAt(from)}`,
      `L ${cx + widthAt(to) / 2} ${yAt(to)}`,
      `L ${cx - widthAt(to) / 2} ${yAt(to)}`,
      "Z",
    ].join(" ");

  const body = slice(0, 1);
  const capX = cx - topWidth / 2 - 1.6;
  const capWidth = topWidth + 3.2;

  return (
    <g opacity={opacity}>
      <path d={body} fill={fill} opacity={0.92} />
      <path d={slice(0.74, 1)} fill={PALETTE.ink} opacity={0.15} />
      <rect x={capX} y={top - 3} width={capWidth} height={3} rx={0.8} fill={fill} opacity={0.92} />
      <path d={body} fill="none" stroke={PALETTE.ink} strokeWidth={1.2} opacity={0.55} />
      <rect
        x={capX}
        y={top - 3}
        width={capWidth}
        height={3}
        rx={0.8}
        fill="none"
        stroke={PALETTE.ink}
        strokeWidth={1.1}
        opacity={0.55}
      />
    </g>
  );
}

/** The arch curve and the height of any point on it, so hangers can land on it. */
function archPath(x1: number, x2: number, base: number, rise: number) {
  const mid = (x1 + x2) / 2;
  return `M ${x1} ${base} Q ${mid} ${base - 2 * rise} ${x2} ${base}`;
}

function archPoint(x: number, x1: number, x2: number, base: number, rise: number) {
  const t = (x - x1) / (x2 - x1);
  return base - 4 * rise * t * (1 - t);
}

/**
 * The band of an arch ring, between the curve it springs from and the curve it
 * carries. Written as a closed shape between two parallel quadratics, so the
 * ring has both its edge lines instead of being one fat stroke.
 */
function archRingPath(x1: number, x2: number, base: number, rise: number, thickness: number) {
  const mid = (x1 + x2) / 2;
  const foot = base + thickness;
  return [
    `M ${x1} ${base}`,
    `Q ${mid} ${base - 2 * rise} ${x2} ${base}`,
    `L ${x2} ${foot}`,
    `Q ${mid} ${foot - 2 * rise} ${x1} ${foot}`,
    "Z",
  ].join(" ");
}

function Arch({
  x1,
  x2,
  base,
  rise,
  stroke = PALETTE.ink,
  width = 6,
  opacity = 1,
}: {
  x1: number;
  x2: number;
  base: number;
  rise: number;
  stroke?: string;
  width?: number;
  opacity?: number;
}) {
  return (
    <g opacity={opacity}>
      <path d={archRingPath(x1, x2, base, rise, width)} fill={stroke} />
      {/* Both edges of the ring drawn, the way an arch is set out on paper. */}
      <path
        d={archPath(x1, x2, base, rise)}
        fill="none"
        stroke={PALETTE.ink}
        strokeWidth={1}
        opacity={0.3}
      />
      <path
        d={archPath(x1, x2, base + width, rise)}
        fill="none"
        stroke={PALETTE.ink}
        strokeWidth={1}
        opacity={0.3}
      />
    </g>
  );
}

/** A cable sagging between two towers. */
function Cable({
  x1,
  y1,
  x2,
  y2,
  controlY,
  stroke = PALETTE.ink,
  width = 4,
  opacity = 1,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  controlY: number;
  stroke?: string;
  width?: number;
  opacity?: number;
}) {
  const d = `M ${x1} ${y1} Q ${(x1 + x2) / 2} ${controlY} ${x2} ${y2}`;
  return (
    <g opacity={opacity}>
      <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" />
      {/* A cable catches the light along its length, which is what makes it read as wire. */}
      <path
        d={d}
        fill="none"
        stroke={PALETTE.paper}
        strokeWidth={width * 0.3}
        strokeLinecap="round"
        opacity={0.3}
      />
    </g>
  );
}

/** A point on a cable drawn by `Cable`, so hangers can hang from it. */
function cablePoint(x: number, x1: number, x2: number, y1: number, controlY: number) {
  const t = (x - x1) / (x2 - x1);
  const end = y1;
  return (1 - t) ** 2 * end + 2 * t * (1 - t) * controlY + t ** 2 * end;
}

/** A cross-brace or hanger: the quiet ties that make parts work together. */
function Tie({ x1, y1, x2, y2, opacity = 1 }: { x1: number; y1: number; x2: number; y2: number; opacity?: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={PALETTE.gray} strokeWidth={1.4} opacity={opacity} />;
}

/** A load or thrust arrow — the bright note, because forces are the lesson. */
function Arrow({
  x1,
  y1,
  x2,
  y2,
  colour = PALETTE.yellow,
  width = 2.4,
  head = 6,
  opacity = 1,
  dashed,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  colour?: string;
  width?: number;
  head?: number;
  opacity?: number;
  dashed?: boolean;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const wing = 0.42;
  const left = `${x2 - head * Math.cos(angle - wing)} ${y2 - head * Math.sin(angle - wing)}`;
  const right = `${x2 - head * Math.cos(angle + wing)} ${y2 - head * Math.sin(angle + wing)}`;
  const tail = `${x2 - head * Math.cos(angle) * 0.85} ${y2 - head * Math.sin(angle) * 0.85}`;
  return (
    <g opacity={opacity}>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={colour}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashed ? "5 4" : undefined}
      />
      <polygon points={`${x2} ${y2} ${left} ${right} ${tail}`} fill={colour} />
    </g>
  );
}

/** A dimension line: the arrows and ticks an engineer expects to see. */
function DimensionLine({
  x1,
  y,
  x2,
  label,
  opacity = 1,
}: {
  x1: number;
  y: number;
  x2: number;
  label: string;
  opacity?: number;
}) {
  return (
    <g opacity={opacity}>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={PALETTE.yellow} strokeWidth={1.3} />
      <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} stroke={PALETTE.yellow} strokeWidth={1.3} />
      <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} stroke={PALETTE.yellow} strokeWidth={1.3} />
      <Tag x={(x1 + x2) / 2} y={y - 3}>
        {label}
      </Tag>
    </g>
  );
}

/** A leader line from a dimension down to the faces it measures. */
function Leader({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  return (
    <line
      x1={x}
      y1={y1}
      x2={x}
      y2={y2}
      stroke={PALETTE.gray}
      strokeWidth={1}
      strokeDasharray="4 4"
      opacity={0.8}
    />
  );
}

/** A name written on the drawing. */
function Tag({
  x,
  y,
  children,
  anchor = "middle",
  colour = PALETTE.ink,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  colour?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={7}
      fontWeight={700}
      fill={colour}
      textAnchor={anchor}
      dominantBaseline="middle"
    >
      {children}
    </text>
  );
}

/**
 * The frame a comparison draws inside: one sheet per system, on the same
 * paper. A sheet is lighter than the plate and only faintly ruled, so three
 * systems read as three drawings rather than three grey boxes.
 */
function Panels({ count }: { count: number }) {
  const gap = 4;
  const height = (SCENE_HEIGHT - gap * (count + 1)) / count;
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const y = gap + i * (height + gap);
        return (
          <g key={i}>
            <rect
              x={gap}
              y={y}
              width={SCENE_WIDTH - gap * 2}
              height={height}
              rx={6}
              fill={PALETTE.paper}
              opacity={0.72}
            />
            <rect
              x={gap}
              y={y}
              width={SCENE_WIDTH - gap * 2}
              height={height}
              rx={6}
              fill="none"
              stroke={PALETTE.ink}
              strokeWidth={1}
              opacity={0.1}
            />
          </g>
        );
      })}
    </>
  );
}

/** The top of panel `i` when a scene is split into `count` stacked comparisons. */
function panelTop(count: number, i: number) {
  const gap = 4;
  const height = (SCENE_HEIGHT - gap * (count + 1)) / count;
  return gap + i * (height + gap);
}

/**
 * The paper every scene is drawn on, and always the first thing a scene draws.
 * It carries the washes with it, so no drawing can reach for a gradient the
 * page has not defined, and it lays the paper's own light across the top:
 * `sky` is how far down that light reaches before it gives out.
 */
function Plate({ sky = 104 }: { sky?: number }) {
  return (
    <>
      <Washes />
      <rect x={0} y={0} width={SCENE_WIDTH} height={SCENE_HEIGHT} fill={PALETTE.fog} />
      <Sky height={sky} />
    </>
  );
}

// ── Scenes ─────────────────────────────────────────────────────────────────

/** Everything a bridge is made of, on one elevation. */
function Overview({ highlight, labels }: SceneShapes) {
  const { fade } = painter({ highlight, labels });
  return (
    <>
      <Plate sky={122} />
      {/* A river crossing: a far range, the water, the banks it runs between. */}
      <Distance base={126} />
      <Water y={126} />
      <Land
        d="M 0 110 Q 14 110 24 120 Q 36 130 42 144 Q 50 164 64 180 L 0 180 Z"
        shore="M 0 110 Q 14 110 24 120 Q 36 130 42 144 Q 50 164 64 180"
        opacity={0.19}
      />
      <Land
        d="M 320 110 Q 306 110 296 120 Q 284 130 278 144 Q 270 164 256 180 L 320 180 Z"
        shore="M 320 110 Q 306 110 296 120 Q 284 130 278 144 Q 270 164 256 180"
        opacity={0.19}
      />
      <g opacity={fade("foundation")}>
        {/* Set into the bed, so they are read through the water rather than on it. */}
        <Mass x={104} y={156} width={28} height={11} rx={2} fill={blockColour(highlight?.includes("foundation") ?? false, true)} opacity={0.6} />
        <Mass x={188} y={156} width={28} height={11} rx={2} fill={blockColour(highlight?.includes("foundation") ?? false, true)} opacity={0.6} />
        <Mass x={24} y={138} width={30} height={11} rx={2} fill={blockColour(highlight?.includes("foundation") ?? false, true)} opacity={0.6} />
        <Mass x={266} y={138} width={30} height={11} rx={2} fill={blockColour(highlight?.includes("foundation") ?? false, true)} opacity={0.6} />
      </g>
      {/* The piers stand in the river, so the river answers them. */}
      <Reflection cx={118} y={166} width={22} />
      <Reflection cx={202} y={166} width={22} />
      <g opacity={fade("abutment")}>
        <Support cx={40} top={100} bottom={138} topWidth={26} bottomWidth={34} fill={blockColour(highlight?.includes("abutment") ?? false, true)} />
        <Support cx={280} top={100} bottom={138} topWidth={26} bottomWidth={34} fill={blockColour(highlight?.includes("abutment") ?? false, true)} />
      </g>
      <g opacity={fade("pier")}>
        <Support cx={118} top={100} bottom={157} topWidth={14} bottomWidth={20} fill={blockColour(highlight?.includes("pier") ?? false, true)} />
        <Support cx={202} top={100} bottom={157} topWidth={14} bottomWidth={20} fill={blockColour(highlight?.includes("pier") ?? false, true)} />
      </g>
      <g opacity={fade("superstructure")}>
        <Deck x1={22} x2={298} y={90} height={10} fill={blockColour(highlight?.includes("superstructure") ?? false, false)} />
      </g>
      {/* The bearings sit where the deck meets its supports. */}
      <g opacity={fade("bearing")}>
        <rect x={112} y={98} width={12} height={4} rx={1} fill={blockColour(highlight?.includes("bearing") ?? false, true)} />
        <rect x={196} y={98} width={12} height={4} rx={1} fill={blockColour(highlight?.includes("bearing") ?? false, true)} />
        <rect x={33} y={98} width={14} height={4} rx={1} fill={blockColour(highlight?.includes("bearing") ?? false, true)} />
        <rect x={273} y={98} width={14} height={4} rx={1} fill={blockColour(highlight?.includes("bearing") ?? false, true)} />
      </g>
      {labels ? (
        <>
          <Tag x={160} y={110} colour={PALETTE.gray}>
            span
          </Tag>
          <Tag x={40} y={82}>
            abutment
          </Tag>
          <Tag x={202} y={82}>
            pier
          </Tag>
          {/* The deck names itself on its own length. */}
          <Tag x={160} y={95} colour={PALETTE.paper}>
            superstructure
          </Tag>
          {/* The bearing is a small block between deck and pier, so it is named
              beside the deck and joined to it by a short line. */}
          <Tag x={100} y={108} anchor="end">
            bearing
          </Tag>
          <Tie x1={103} y1={106} x2={112} y2={101} opacity={0.9} />
          {/* The buried work, named in the bank the abutment stands on. */}
          <Tag x={40} y={156}>
            foundation
          </Tag>
          <Tie x1={40} y1={151} x2={40} y2={145} opacity={0.9} />
        </>
      ) : null}
    </>
  );
}

/** The superstructure up close: surface, slab, girder, and the beam that ties them. */
function Superstructure({ highlight, labels }: SceneShapes) {
  const { fade } = painter({ highlight, labels });
  const on = (id: string) => highlight?.includes(id) ?? false;
  return (
    <>
      <Plate />
      <g opacity={fade("railing")}>
        {[30, 64, 98].map((post) => (
          <line
            key={post}
            x1={post}
            y1={58}
            x2={post}
            y2={68}
            stroke={blockColour(on("railing"), true)}
            strokeWidth={2.2}
            strokeLinecap="round"
          />
        ))}
        <line
          x1={24}
          y1={58}
          x2={104}
          y2={58}
          stroke={blockColour(on("railing"), true)}
          strokeWidth={2.2}
          strokeLinecap="round"
        />
      </g>
      <g opacity={fade("paving")}>
        <Mass x={30} y={68} width={260} height={7} fill={washColour(on("paving"))} />
      </g>
      <g opacity={fade("deck-slab")}>
        {/* A shade lighter than the girder, so the three layers read apart. */}
        <Mass x={30} y={75} width={260} height={10} fill={blockColour(on("deck-slab"), true)} />
      </g>
      <g opacity={fade("main-girder")}>
        <Mass x={30} y={85} width={260} height={22} fill={blockColour(on("main-girder"), false)} />
        <line
          x1={38}
          y1={96}
          x2={282}
          y2={96}
          stroke={PALETTE.gray}
          strokeWidth={0.8}
          strokeDasharray="9 8"
          opacity={0.85}
        />
      </g>
      <g opacity={fade("cross-beam")}>
        <Mass x={244} y={85} width={12} height={22} fill={blockColour(on("cross-beam"), true)} />
      </g>
      {/* The shadow the deck lays on the paper, so the drawing sits rather than floats. */}
      <Wash y={107} height={7} opacity={0.05} />
      {labels ? (
        <>
          {/* The railing stands on its own above the deck, so it is named above
              it, inside the frame. */}
          <Tag x={64} y={46}>
            railing
          </Tag>
          <Tag x={40} y={140}>
            wearing surface
          </Tag>
          <Tag x={200} y={150}>
            deck slab
          </Tag>
          <Tag x={120} y={160}>
            main girder
          </Tag>
          <Tag x={250} y={140}>
            cross beam
          </Tag>
          <Tie x1={250} y1={110} x2={250} y2={134} opacity={0.9} />
          <Tie x1={140} y1={112} x2={120} y2={154} opacity={0.9} />
        </>
      ) : null}
    </>
  );
}

/** A bearing, and the two things it has to allow. */
function Bearings({ highlight, labels }: SceneShapes) {
  const { fade } = painter({ highlight, labels });
  const on = (id: string) => highlight?.includes(id) ?? false;
  const bearing = blockColour(on("bearing"), true);
  return (
    <>
      <Plate />
      <g opacity={fade("main-girder")}>
        <Mass x={30} y={78} width={260} height={22} fill={blockColour(on("main-girder"), false)} />
      </g>
      <g opacity={fade("bearing")}>
        {/* The bearing is small and it is the subject, so it is drawn sharp. */}
        <Mass x={118} y={100} width={24} height={16} rx={2} fill={bearing} />
        <Mass x={198} y={100} width={24} height={16} rx={2} fill={bearing} />
      </g>
      <g opacity={fade("pier-cap")}>
        <Mass x={96} y={116} width={148} height={14} fill={blockColour(on("pier-cap"), true)} />
      </g>
      <g opacity={fade("pier")}>
        <Support cx={170} top={130} bottom={180} topWidth={46} bottomWidth={58} fill={blockColour(on("pier"), true)} />
      </g>
      {labels ? (
        <>
          {/* The girder names itself along its own length, the way the deck is
              named in the other sections. */}
          <Tag x={250} y={89} colour={PALETTE.paper}>
            main girder
          </Tag>
          <Arrow x1={156} y1={70} x2={156} y2={30} colour={PALETTE.gray} dashed />
          <Tag x={156} y={24} colour={PALETTE.gray}>
            traffic load
          </Tag>
          {/* The bearing is small and the pier cap is wide, so each name sits
              beside its own part with a short line to it. */}
          <Tag x={112} y={108} anchor="end">
            bearing
          </Tag>
          <Tie x1={115} y1={108} x2={122} y2={108} opacity={0.9} />
          <Tag x={250} y={124} anchor="start">
            pier cap
          </Tag>
          <Tie x1={247} y1={124} x2={238} y2={124} opacity={0.9} />
          <Tag x={212} y={152} anchor="start">
            pier
          </Tag>
          <Arrow x1={226} y1={108} x2={252} y2={108} />
          <Arrow x1={252} y1={116} x2={226} y2={116} />
          <Tag x={262} y={112} anchor="start" colour={PALETTE.yellowDeep}>
            slide
          </Tag>
          <path
            d="M 130 92 A 12 12 0 0 1 148 96"
            fill="none"
            stroke={PALETTE.yellow}
            strokeWidth={2}
            strokeLinecap="round"
          />
          <Tag x={92} y={88} anchor="end" colour={PALETTE.yellowDeep}>
            rotate
          </Tag>
        </>
      ) : null}
    </>
  );
}

/** The end of a bridge: abutment, embankment, cone slope, transition slab. */
function Supports({ highlight, labels }: SceneShapes) {
  const { fade } = painter({ highlight, labels });
  const on = (id: string) => highlight?.includes(id) ?? false;
  return (
    <>
      <Plate />
      {/* A cutting through the bank: earth on the left, the deck running out of frame. */}
      <Wash y={156} height={24} opacity={0.05} />
      <Land d="M 0 84 L 44 84 L 44 156 L 0 180 Z" opacity={0.16} />
      <line x1={0} y1={84} x2={44} y2={84} stroke={PALETTE.ink} strokeWidth={1.2} opacity={0.3} />
      <Ground y={156} />
      <g opacity={fade("cone-slope")}>
        {/* Stone pitching over the slope, drawn as courses of stone. */}
        <polygon points="82,156 116,156 82,114" fill={PALETTE.gray} opacity={0.42} />
        <g stroke={PALETTE.charcoal} strokeWidth={0.9} opacity={0.5}>
          <line x1={82} y1={128} x2={92} y2={122} />
          <line x1={82} y1={142} x2={104} y2={132} />
          <line x1={82} y1={156} x2={116} y2={144} />
        </g>
      </g>
      <g opacity={fade("abutment")}>
        <Support cx={60} top={94} bottom={156} topWidth={32} bottomWidth={44} fill={blockColour(on("abutment"), true)} />
      </g>
      <g opacity={fade("transition-slab")}>
        <polygon points="2,84 44,88 44,95 2,91" fill={blockColour(on("transition-slab"), false)} />
      </g>
      <g opacity={fade("pier")}>
        <Support cx={250} top={94} bottom={156} topWidth={16} bottomWidth={22} fill={blockColour(on("pier"), true)} />
      </g>
      <g opacity={fade("superstructure")}>
        <Deck x1={40} x2={300} y={84} height={10} fill={blockColour(on("superstructure"), false)} />
      </g>
      {labels ? (
        <>
          {/* Written left to right along the bank, starting inside the frame. */}
          <Tag x={2} y={100} anchor="start">
            embankment
          </Tag>
          <Tag x={60} y={130} colour={PALETTE.paper}>
            abutment
          </Tag>
          <Tag x={102} y={162}>
            cone slope
          </Tag>
          <Tag x={92} y={78}>
            slab
          </Tag>
          <Tag x={250} y={130}>
            pier
          </Tag>
        </>
      ) : null}
    </>
  );
}

/** Under the ground: the pile cap, the piles, and the stratum they stand on. */
function Foundations({ highlight, labels }: SceneShapes) {
  const { fade } = painter({ highlight, labels });
  const on = (id: string) => highlight?.includes(id) ?? false;
  return (
    <>
      <Plate />
      {/* The ground the piles are driven into: a wash for the soil, strokes for its grain. */}
      <Wash y={140} height={40} opacity={0.08} />
      <line x1={0} y1={140} x2={SCENE_WIDTH} y2={140} stroke={PALETTE.ink} strokeWidth={1.1} opacity={0.28} />
      <g stroke={PALETTE.charcoal} strokeWidth={1} opacity={0.35}>
        {Array.from({ length: 12 }, (_, course) => (
          <line key={course} x1={course * 26} y1={152} x2={course * 26 + 26} y2={144} />
        ))}
      </g>
      <Ground y={64} />
      <g opacity={fade("pile")}>
        {[106, 138, 170, 202].map((x) => (
          <Mass key={x} x={x} y={82} width={14} height={66} fill={blockColour(on("pile"), true)} />
        ))}
      </g>
      <g opacity={fade("pile-cap")}>
        <Mass x={100} y={64} width={122} height={18} rx={2} fill={blockColour(on("pile-cap"), true)} />
      </g>
      <g opacity={fade("pier")}>
        <Support cx={160} top={16} bottom={64} topWidth={26} bottomWidth={34} fill={blockColour(on("pier"), true)} />
      </g>
      {labels ? (
        <>
          {/* The pier rises out of the ground, so its name sits beside it. */}
          <Tag x={182} y={40} anchor="start">
            pier
          </Tag>
          <Tag x={232} y={73} anchor="start">
            pile cap
          </Tag>
          <Tie x1={222} y1={73} x2={206} y2={73} opacity={0.9} />
          <Tag x={244} y={116} anchor="start">
            piles
          </Tag>
          <Tie x1={238} y1={116} x2={218} y2={116} opacity={0.9} />
          <Tag x={160} y={170} colour={PALETTE.yellowDeep}>
            bearing stratum
          </Tag>
        </>
      ) : null}
    </>
  );
}

/** Everything bolted on to keep the bridge working, drawn along the deck. */
function Fittings({ highlight, labels }: SceneShapes) {
  const { fade } = painter({ highlight, labels });
  const on = (id: string) => highlight?.includes(id) ?? false;
  return (
    <>
      <Plate />
      <g opacity={fade("lighting")}>
        {/* A lamp at dusk: the one warm note on an otherwise inked deck. */}
        <circle cx={251} cy={60} r={11} fill={PALETTE.butter} opacity={0.22} />
        <line x1={250} y1={52} x2={250} y2={96} stroke={blockColour(on("lighting"), true)} strokeWidth={3} />
        <rect x={242} y={48} width={18} height={5} rx={2} fill={blockColour(on("lighting"), true)} />
        <circle cx={251} cy={60} r={4} fill={PALETTE.yellow} opacity={0.9} />
      </g>
      <g opacity={fade("paving")}>
        <Mass x={20} y={88} width={280} height={9} fill={washColour(on("paving"))} />
      </g>
      <g opacity={fade("drain")}>
        <line x1={128} y1={94} x2={128} y2={126} stroke={blockColour(on("drain"), true)} strokeWidth={3} />
        <circle cx={128} cy={126} r={3.5} fill={PALETTE.butter} stroke={blockColour(on("drain"), true)} strokeWidth={1.5} />
      </g>
      <g opacity={fade("expansion-joint")}>
        <rect x={155} y={86} width={10} height={13} fill={PALETTE.fog} />
        <line x1={155} y1={88} x2={165} y2={97} stroke={PALETTE.yellow} strokeWidth={2} />
        <line x1={165} y1={88} x2={155} y2={97} stroke={PALETTE.yellow} strokeWidth={2} />
      </g>
      <g opacity={fade("superstructure")}>
        <Mass x={20} y={97} width={280} height={16} fill={PALETTE.ink} />
      </g>
      <g opacity={fade("railing")}>
        <line x1={16} y1={74} x2={112} y2={74} stroke={blockColour(on("railing"), true)} strokeWidth={2.6} />
        <line x1={22} y1={74} x2={22} y2={88} stroke={blockColour(on("railing"), true)} strokeWidth={2.6} />
        <line x1={58} y1={74} x2={58} y2={88} stroke={blockColour(on("railing"), true)} strokeWidth={2.6} />
        <line x1={94} y1={74} x2={94} y2={88} stroke={blockColour(on("railing"), true)} strokeWidth={2.6} />
      </g>
      {labels ? (
        <>
          <Tag x={40} y={62}>
            railing
          </Tag>
          <Tag x={78} y={93}>
            paving
          </Tag>
          <Tag x={168} y={78} anchor="start" colour={PALETTE.yellowDeep}>
            expansion joint
          </Tag>
          <Tag x={128} y={140}>
            drain
          </Tag>
          <Tag x={262} y={44} anchor="start">
            lighting
          </Tag>
        </>
      ) : null}
    </>
  );
}

/** A section through a deck, showing everything one bridge can carry at once. */
function Carries({ highlight, labels }: SceneShapes) {
  const { fade } = painter({ highlight, labels });
  const on = (id: string) => highlight?.includes(id) ?? false;
  return (
    <>
      <Plate />
      <Water y={144} />
      <Reflection cx={140} y={164} width={40} opacity={0.13} />
      {/* A boat on the waterway the bridge crosses, drawn as one stroke of a hull. */}
      <g opacity={fade("waterway")}>
        <path
          d="M 108 150 Q 140 148 172 150 Q 166 163 140 164 Q 114 163 108 150 Z"
          fill={PALETTE.ink}
          opacity={0.9}
        />
        <rect x={128} y={141} width={24} height={9} rx={1.5} fill={PALETTE.charcoal} />
      </g>

      {/* The supports, standing in the water. */}
      <rect x={48} y={114} width={24} height={32} fill={PALETTE.charcoal} />
      <rect x={248} y={114} width={24} height={32} fill={PALETTE.charcoal} />

      {/* The deck itself, carrying everything on top of it. */}
      <rect x={20} y={100} width={280} height={16} fill={PALETTE.ink} />

      <g opacity={fade("pipe-duct")}>
        {/* Space left under the deck for pipes and cables. */}
        <rect x={56} y={116} width={56} height={16} rx={3} fill={PALETTE.charcoal} />
        <circle cx={70} cy={124} r={5} fill={PALETTE.butter} stroke={PALETTE.gray} strokeWidth={1} />
        <circle cx={96} cy={124} r={5} fill={PALETTE.butter} stroke={PALETTE.gray} strokeWidth={1} />
      </g>

      <g opacity={fade("roadway")}>
        <rect x={26} y={93} width={124} height={7} fill={washColour(on("roadway"))} />
        <line x1={30} y1={96.5} x2={146} y2={96.5} stroke={PALETTE.paper} strokeWidth={1} strokeDasharray="6 6" />
        <rect x={40} y={84} width={24} height={9} rx={2} fill={on("roadway") ? PALETTE.yellowDeep : PALETTE.charcoal} />
        <rect x={104} y={84} width={24} height={9} rx={2} fill={on("roadway") ? PALETTE.yellowDeep : PALETTE.charcoal} />
      </g>

      <g opacity={fade("railway")}>
        <rect x={180} y={96} width={78} height={4} fill={PALETTE.gray} opacity={0.7} />
        <rect x={198} y={90} width={8} height={8} fill={on("railway") ? PALETTE.yellowDeep : PALETTE.ink} />
        <rect x={234} y={90} width={8} height={8} fill={on("railway") ? PALETTE.yellowDeep : PALETTE.ink} />
      </g>

      <g opacity={fade("footpath")}>
        <Mass x={270} y={93} width={26} height={7} fill={washColour(on("footpath"))} />
        {/* A person on the footpath: the only figure in these drawings, and the
            reason a bridge has a footpath at all. */}
        <g
          stroke={on("footpath") ? PALETTE.yellowDeep : PALETTE.ink}
          strokeWidth={1.6}
          strokeLinecap="round"
        >
          <line x1={283} y1={86} x2={283} y2={91.5} />
          <line x1={283} y1={91.5} x2={280.5} y2={93} />
          <line x1={283} y1={91.5} x2={285.5} y2={93} />
        </g>
        <circle cx={283} cy={83.6} r={2.4} fill={on("footpath") ? PALETTE.yellowDeep : PALETTE.ink} />
      </g>

      {labels ? (
        <>
          <Tag x={70} y={78}>
            roadway
          </Tag>
          <Tag x={220} y={82}>
            railway
          </Tag>
          <Tag x={283} y={74}>
            footpath
          </Tag>
          <Tag x={84} y={140}>
            pipes
          </Tag>
          <Tag x={60} y={170}>
            waterway
          </Tag>
        </>
      ) : null}
    </>
  );
}

/** A river in section: the water levels that decide how high a bridge must be. */
function Levels({ highlight, labels }: SceneShapes) {
  const { fade } = painter({ highlight, labels });
  const on = (id: string) => highlight?.includes(id) ?? false;
  const water: { id: string; y: number; name: string }[] = [
    { id: "high-water-level", y: 78, name: "high water" },
    { id: "design-flood-level", y: 96, name: "design flood" },
    { id: "navigable-level", y: 114, name: "navigable" },
    { id: "low-water-level", y: 132, name: "low water" },
  ];
  return (
    <>
      <Plate sky={78} />
      {/* The river in section: water down to the bed line, and the bed below it. */}
      <path d="M 0 78 H 320 V 152 Q 160 132 0 152 Z" fill="url(#bridge-wash-water)" />
      <line x1={0} y1={78} x2={SCENE_WIDTH} y2={78} stroke={PALETTE.ink} strokeWidth={1.2} opacity={0.42} />
      {/* Water in section is drawn with short strokes, the way a cut face is. */}
      <Ripples y={78} />
      <path d="M 0 152 Q 160 132 320 152" fill="none" stroke={PALETTE.ink} strokeWidth={1.3} opacity={0.45} />
      <path
        d="M 0 152 Q 160 132 320 152 L 320 180 L 0 180 Z"
        fill={PALETTE.charcoal}
        opacity={0.12}
      />
      <g opacity={fade("clearance")}>
        {/* The space kept clear under the deck: measured, and only washed in
            with the bright note when the clearance is the part being read. */}
        <rect
          x={104}
          y={62}
          width={116}
          height={52}
          fill={on("clearance") ? PALETTE.yellow : "none"}
          fillOpacity={on("clearance") ? 0.2 : 0}
          stroke={PALETTE.yellowDeep}
          strokeWidth={1.1}
          strokeDasharray="7 6"
          strokeOpacity={0.55}
        />
        <Arrow x1={160} y1={112} x2={160} y2={68} head={7} width={1.6} />
        <Arrow x1={160} y1={66} x2={160} y2={110} head={7} width={1.6} />
      </g>
      <g opacity={fade("superstructure")}>
        <Deck x1={20} x2={300} y={52} height={10} />
      </g>
      <g opacity={fade("abutment")}>
        <Mass x={8} y={62} width={22} height={90} fill={PALETTE.charcoal} />
        <Mass x={290} y={62} width={22} height={90} fill={PALETTE.charcoal} />
      </g>
      <g opacity={fade("pier")}>
        <Support cx={92} top={62} bottom={150} topWidth={13} bottomWidth={18} fill={PALETTE.charcoal} />
        <Support cx={228} top={62} bottom={150} topWidth={13} bottomWidth={18} fill={PALETTE.charcoal} />
      </g>
      {water.map(({ id, y, name }) => (
        <g key={id} opacity={fade(id)}>
          {/* A level is a quiet line across the river until it is the one in hand. */}
          <line
            x1={0}
            y1={y}
            x2={SCENE_WIDTH}
            y2={y}
            stroke={on(id) ? PALETTE.yellow : PALETTE.yellowDeep}
            strokeWidth={on(id) ? 2.6 : 0.9}
            opacity={on(id) ? 1 : 0.4}
            strokeDasharray={id === "design-flood-level" ? undefined : "14 9"}
          />
          {labels ? (
            <Tag x={296} y={y - 6} anchor="end" colour={PALETTE.yellowDeep}>
              {name}
            </Tag>
          ) : null}
        </g>
      ))}
      {labels ? (
        <Tag x={162} y={90} colour={PALETTE.ink}>
          clearance
        </Tag>
      ) : null}
    </>
  );
}

/** The words on a bridge drawing: l₀, l, L and h. */
function Dimensions({ highlight, labels }: SceneShapes) {
  const { fade } = painter({ highlight, labels });
  return (
    <>
      <Plate />
      <Ground y={140} />
      <g opacity={fade("abutment")}>
        <Support cx={40} top={106} bottom={140} topWidth={22} bottomWidth={30} fill={PALETTE.charcoal} />
        <Support cx={280} top={106} bottom={140} topWidth={22} bottomWidth={30} fill={PALETTE.charcoal} />
      </g>
      <g opacity={fade("pier")}>
        <Support cx={140} top={106} bottom={140} topWidth={13} bottomWidth={17} fill={PALETTE.charcoal} />
        <Support cx={200} top={106} bottom={140} topWidth={13} bottomWidth={17} fill={PALETTE.charcoal} />
      </g>
      <g opacity={fade("superstructure")}>
        <Deck x1={30} x2={290} y={96} height={10} />
      </g>
      <g opacity={fade("bridge-length")}>
        <Leader x={30} y1={96} y2={84} />
        <Leader x={290} y1={96} y2={84} />
        <DimensionLine x1={30} y={80} x2={290} label="L" />
      </g>
      <g opacity={fade("construction-height")}>
        {/* Left of the deck's own end: written on the deck, "h" was ink on ink. */}
        <DimensionLine x1={22} y={101} x2={22} label="h" />
      </g>
      <g opacity={fade("net-span")}>
        <Leader x={146.5} y1={140} y2={120} />
        <Leader x={193.5} y1={140} y2={120} />
        <DimensionLine x1={146.5} y={118} x2={193.5} label="l₀" />
      </g>
      <g opacity={fade("computed-span")}>
        <Leader x={140} y1={140} y2={136} />
        <Leader x={200} y1={140} y2={136} />
        <DimensionLine x1={140} y={134} x2={200} label="l" />
      </g>
      {labels ? (
        <Tag x={160} y={166} colour={PALETTE.gray}>
          l₀ net · l computed · L total
        </Tag>
      ) : null}
    </>
  );
}

/** Where the deck sits: on top of the arch, through it, or in the middle. */
function DeckPosition({ highlight, labels }: SceneShapes) {
  const { fade } = painter({ highlight, labels });
  const on = (id: string) => highlight?.includes(id) ?? false;
  const deck = (id: string) => blockColour(on(id), false);
  const a = panelTop(3, 0);
  const b = panelTop(3, 1);
  const c = panelTop(3, 2);
  return (
    <>
      <Plate />
      <Panels count={3} />
      {/* Deck bridge: the traffic runs on top of the structure. */}
      <g opacity={fade("deck-bridge")}>
        <Arch x1={44} x2={276} base={a + 40} rise={26} stroke={PALETTE.charcoal} width={5} />
        <Deck x1={30} x2={290} y={a + 2} height={8} fill={deck("deck-bridge")} />
        <Tie x1={160} y1={a + 14} x2={160} y2={a + 10} />
      </g>
      {/* Through bridge: the traffic runs inside the arch, on its lower chord. */}
      <g opacity={fade("through-bridge")}>
        <Arch x1={44} x2={276} base={b + 40} rise={32} stroke={PALETTE.charcoal} width={5} />
        <Deck x1={44} x2={276} y={b + 34} height={8} fill={deck("through-bridge")} />
        {[80, 116, 152, 188, 224, 260].map((x) => (
          <Tie
            key={x}
            x1={x}
            y1={archPoint(x, 44, 276, b + 40, 32)}
            x2={x}
            y2={b + 34}
          />
        ))}
      </g>
      {/* Half-through: the deck cuts across the middle of the arch. */}
      <g opacity={fade("half-through-bridge")}>
        <Arch x1={44} x2={276} base={c + 42} rise={34} stroke={PALETTE.charcoal} width={5} />
        <Deck x1={44} x2={276} y={c + 22} height={8} fill={deck("half-through-bridge")} />
        {[96, 128, 160, 192, 224].map((x) => (
          <Tie
            key={x}
            x1={x}
            y1={archPoint(x, 44, 276, c + 42, 34)}
            x2={x}
            y2={c + 22}
          />
        ))}
      </g>
      {labels ? (
        <>
          {/* Each name is written on the deck of its own drawing, which is
              the whole point of the three panels: where the deck sits. */}
          <Tag x={160} y={a + 6} colour={PALETTE.paper}>
            deck
          </Tag>
          <Tag x={160} y={b + 38} colour={PALETTE.paper}>
            through
          </Tag>
          <Tag x={160} y={c + 26} colour={PALETTE.paper}>
            half-through
          </Tag>
        </>
      ) : null}
    </>
  );
}

/** The three ways a beam bridge can be put together. */
function Beam({ highlight, labels }: SceneShapes) {
  const { fade } = painter({ highlight, labels });
  const on = (id: string) => highlight?.includes(id) ?? false;
  const a = panelTop(3, 0);
  const b = panelTop(3, 1);
  const c = panelTop(3, 2);
  const triangle = (x: number, y: number, fill: string) => (
    <polygon points={`${x},${y - 8} ${x - 7},${y} ${x + 7},${y}`} fill={fill} />
  );
  return (
    <>
      <Plate />
      <Panels count={3} />
      <g opacity={fade("simply-supported")}>
        <Ground y={a + 36} x1={30} x2={290} />
        {triangle(60, a + 36, PALETTE.charcoal)}
        {triangle(260, a + 36, PALETTE.charcoal)}
        <Deck x1={50} x2={270} y={a + 16} height={8} fill={blockColour(on("simply-supported"), false)} />
        {[110, 160, 210].map((x) => (
          <Arrow key={x} x1={x} y1={a + 2} x2={x} y2={a + 14} head={4} width={2} />
        ))}
      </g>
      <g opacity={fade("continuous")}>
        <Ground y={b + 36} x1={30} x2={290} />
        {[40, 160, 280].map((x) => (
          <g key={x}>{triangle(x, b + 36, PALETTE.charcoal)}</g>
        ))}
        <Deck x1={34} x2={286} y={b + 16} height={8} fill={blockColour(on("continuous"), false)} />
        {[70, 120, 200, 250].map((x) => (
          <Arrow key={x} x1={x} y1={b + 2} x2={x} y2={b + 14} head={4} width={2} />
        ))}
      </g>
      <g opacity={fade("cantilever")}>
        <Ground y={c + 42} x1={30} x2={290} />
        <Support cx={70} top={c + 24} bottom={c + 42} topWidth={12} bottomWidth={16} fill={PALETTE.charcoal} />
        <Support cx={250} top={c + 24} bottom={c + 42} topWidth={12} bottomWidth={16} fill={PALETTE.charcoal} />
        <Deck x1={20} x2={118} y={c + 16} height={8} fill={blockColour(on("cantilever"), false)} />
        <Deck x1={202} x2={300} y={c + 16} height={8} fill={blockColour(on("cantilever"), false)} />
        <Deck x1={126} x2={194} y={c + 16} height={8} fill={blockColour(on("cantilever"), false)} />
        <circle cx={122} cy={c + 20} r={3.5} fill={PALETTE.yellow} />
        <circle cx={198} cy={c + 20} r={3.5} fill={PALETTE.yellow} />
      </g>
      {labels ? (
        <>
          <Tag x={160} y={a + 30}>
            simply supported
          </Tag>
          {/* Stepped left of the middle support, which its own name sat on. */}
          <Tag x={100} y={b + 30}>
            continuous
          </Tag>
          <Tag x={160} y={c + 30}>
            cantilever
          </Tag>
        </>
      ) : null}
    </>
  );
}

/** An arch bridge: compression in the ring, thrust at the feet, and the tied fix. */
function ArchScene({ highlight, labels }: SceneShapes) {
  const { fade } = painter({ highlight, labels });
  const on = (id: string) => highlight?.includes(id) ?? false;
  const ring = blockColour(on("arch-ring"), false);
  return (
    <>
      <Plate sky={88} />
      <Ground y={88} />
      <Ground y={176} />
      <g opacity={fade("thrust")}>
        <Arrow x1={38} y1={82} x2={8} y2={82} head={6} />
        <Arrow x1={282} y1={82} x2={312} y2={82} head={6} />
      </g>
      <g opacity={fade("arch-ring")}>
        <Arch x1={36} x2={284} base={82} rise={46} stroke={ring} width={7} />
        <Support cx={36} top={82} bottom={88} topWidth={22} bottomWidth={30} fill={PALETTE.charcoal} />
        <Support cx={284} top={82} bottom={88} topWidth={22} bottomWidth={30} fill={PALETTE.charcoal} />
        {[80, 118, 202, 240].map((x) => (
          <Tie key={x} x1={x} y1={archPoint(x, 36, 284, 82, 46)} x2={x} y2={30} />
        ))}
      </g>
      <g opacity={fade("superstructure")}>
        <Deck x1={24} x2={296} y={20} height={9} />
      </g>
      <g opacity={fade("tie-rod")}>
        <Arch x1={60} x2={260} base={158} rise={44} stroke={PALETTE.charcoal} width={6} />
        <Deck x1={30} x2={290} y={158} height={10} />
        {[92, 124, 160, 196, 228].map((x) => (
          <Tie key={x} x1={x} y1={archPoint(x, 60, 260, 158, 44)} x2={x} y2={158} />
        ))}
        <line
          x1={60}
          y1={157}
          x2={260}
          y2={157}
          stroke={on("tie-rod") ? PALETTE.yellow : PALETTE.yellowDeep}
          strokeWidth={on("tie-rod") ? 4 : 2.4}
        />
      </g>
      {labels ? (
        <>
          {/* The deck names itself on its own length; it used to be written in
              the opening below, where white on light paper could not be read. */}
          <Tag x={160} y={24} colour={PALETTE.paper}>
            deck
          </Tag>
          <Tag x={12} y={68} anchor="start" colour={PALETTE.yellowDeep}>
            thrust
          </Tag>
          {/* The ring is named in the opening beside it, clear of the ties. */}
          <Tag x={258} y={50}>
            arch ring
          </Tag>
          {/* And the tie is named at its own end, above the tie itself. */}
          <Tag x={54} y={147} anchor="end">
            tie
          </Tag>
          <Tag x={160} y={174}>
            tied arch — the tie pulls the feet together
          </Tag>
        </>
      ) : null}
    </>
  );
}

/** A rigid frame: the pier and the beam are one piece. */
function Frame({ highlight, labels }: SceneShapes) {
  const { fade } = painter({ highlight, labels });
  const on = (id: string) => highlight?.includes(id) ?? false;
  const joint = (x: number, y: number) => (
    <rect x={x - 5} y={y - 5} width={10} height={10} rx={2} fill={PALETTE.yellow} stroke={PALETTE.ink} strokeWidth={1.2} />
  );
  const a = panelTop(3, 0);
  const b = panelTop(3, 1);
  const c = panelTop(3, 2);
  return (
    <>
      <Plate />
      <Panels count={3} />
      <g opacity={fade("portal-frame")}>
        <Support cx={70} top={a + 8} bottom={a + 48} topWidth={13} bottomWidth={17} fill={PALETTE.charcoal} />
        <Support cx={250} top={a + 8} bottom={a + 48} topWidth={13} bottomWidth={17} fill={PALETTE.charcoal} />
        <Deck x1={60} x2={260} y={a + 4} height={9} fill={blockColour(on("portal-frame"), false)} />
        <Ground y={a + 48} x1={40} x2={280} />
      </g>
      <g opacity={fade("rigid-joint")}>
        {joint(70, a + 9)}
        {joint(250, a + 9)}
      </g>
      <g opacity={fade("inclined-leg")}>
        <polygon points={`104,${b + 2} 132,${b + 2} 84,${b + 52} 56,${b + 52}`} fill={PALETTE.charcoal} />
        <polygon points={`188,${b + 2} 216,${b + 2} 244,${b + 52} 216,${b + 52}`} fill={PALETTE.charcoal} />
        <Deck x1={96} x2={224} y={b + 2} height={9} fill={blockColour(on("inclined-leg"), false)} />
        <Ground y={b + 52} x1={40} x2={280} />
      </g>
      <g opacity={fade("continuous-frame")}>
        {[60, 160, 260].map((x) => (
          <Support key={x} cx={x} top={c + 12} bottom={c + 46} topWidth={10} bottomWidth={13} fill={PALETTE.charcoal} />
        ))}
        <Deck x1={50} x2={270} y={c + 6} height={9} fill={blockColour(on("continuous-frame"), false)} />
        <Ground y={c + 46} x1={40} x2={280} />
      </g>
      {labels ? (
        <>
          <Tag x={160} y={a + 46} colour={PALETTE.gray}>
            portal
          </Tag>
          <Tag x={160} y={b + 46} colour={PALETTE.gray}>
            inclined legs
          </Tag>
          <Tag x={160} y={c + 42} colour={PALETTE.gray}>
            continuous
          </Tag>
          <Tag x={94} y={a + 2} anchor="end" colour={PALETTE.yellowDeep}>
            rigid joint
          </Tag>
        </>
      ) : null}
    </>
  );
}

/** A cable-stayed bridge: stays holding the girder up at many points. */
function CableStayed({ highlight, labels }: SceneShapes) {
  const { fade } = painter({ highlight, labels });
  const on = (id: string) => highlight?.includes(id) ?? false;
  const top = 34;
  const deckY = 116;
  const anchors = [40, 72, 104, 136, 184, 216, 248, 280];
  return (
    <>
      <Plate sky={140} />
      {/* A stay-cable span over open country: a far range, then the bridge. */}
      <Distance base={150} height={38} />
      <Ground y={150} />
      <g opacity={fade("anchor")}>
        <Mass x={4} y={138} width={22} height={14} fill={PALETTE.charcoal} />
        <Mass x={294} y={138} width={22} height={14} fill={PALETTE.charcoal} />
      </g>
      <g opacity={fade("stay-cable")}>
        {anchors.map((x) => (
          <line
            key={x}
            x1={160}
            y1={top}
            x2={x}
            y2={deckY}
            stroke={on("stay-cable") ? PALETTE.yellowDeep : PALETTE.gray}
            strokeWidth={on("stay-cable") ? 2.6 : 1.8}
          />
        ))}
        <line x1={160} y1={top} x2={14} y2={150} stroke={on("stay-cable") ? PALETTE.yellowDeep : PALETTE.gray} strokeWidth={1.8} />
        <line x1={160} y1={top} x2={306} y2={150} stroke={on("stay-cable") ? PALETTE.yellowDeep : PALETTE.gray} strokeWidth={1.8} />
      </g>
      <g opacity={fade("tower")}>
        <Support cx={160} top={22} bottom={150} topWidth={12} bottomWidth={22} fill={blockColour(on("tower"), true)} />
      </g>
      <g opacity={fade("main-girder")}>
        <Mass x={20} y={deckY} width={280} height={12} fill={blockColour(on("main-girder"), false)} />
      </g>
      <g opacity={fade("elastic-support")}>
        <Arrow x1={104} y1={148} x2={104} y2={deckY + 14} head={5} />
        <Arrow x1={216} y1={148} x2={216} y2={deckY + 14} head={5} />
      </g>
      {labels ? (
        <>
          <Tag x={176} y={44} anchor="start">
            tower
          </Tag>
          <Tag x={116} y={86} anchor="end">
            stay cable
          </Tag>
          <Tag x={64} y={deckY - 8}>
            main girder
          </Tag>
          {/* The back stays are tied down into these blocks, so each is named
              just above the block it names. */}
          <Tag x={15} y={132}>
            anchor
          </Tag>
          <Tag x={305} y={132}>
            anchor
          </Tag>
          {/* What the fan of stays adds up to: named under the drawing, with
              the lesson's own words for it beneath, in the bright note. */}
          <Tag x={160} y={158}>
            multi-point support
          </Tag>
          <Tag x={160} y={170} colour={PALETTE.yellowDeep}>
            each stay lifts like an invisible pier
          </Tag>
        </>
      ) : null}
    </>
  );
}

/** A suspension bridge: one cable across, hangers carrying the deck. */
function Suspension({ highlight, labels }: SceneShapes) {
  const { fade } = painter({ highlight, labels });
  const on = (id: string) => highlight?.includes(id) ?? false;
  const top = 30;
  const control = 118;
  const deckY = 118;
  const hangers = [104, 124, 144, 176, 196, 216];
  return (
    <>
      <Plate sky={142} />
      {/* The longest span there is, over open country. */}
      <Distance base={152} height={38} />
      <Ground y={152} />
      <g opacity={fade("hanger")}>
        {hangers.map((x) => (
          <line
            key={x}
            x1={x}
            y1={cablePoint(x, 84, 236, top, control)}
            x2={x}
            y2={deckY}
            stroke={on("hanger") ? PALETTE.yellowDeep : PALETTE.gray}
            strokeWidth={on("hanger") ? 2.4 : 1.5}
          />
        ))}
      </g>
      <g opacity={fade("main-cable")}>
        {/* One cable: down to the anchorages, over both towers, sagging between them. */}
        <path
          d={`M 15 126 L 84 ${top} Q 160 ${control} 236 ${top} L 305 126`}
          fill="none"
          stroke={on("main-cable") ? PALETTE.yellowDeep : PALETTE.ink}
          strokeWidth={on("main-cable") ? 6 : 4.5}
          strokeLinecap="round"
        />
        <path
          d={`M 15 126 L 84 ${top} Q 160 ${control} 236 ${top} L 305 126`}
          fill="none"
          stroke={PALETTE.paper}
          strokeWidth={1.4}
          strokeLinecap="round"
          opacity={0.28}
        />
      </g>
      <g opacity={fade("tower")}>
        <Support cx={84} top={top - 6} bottom={152} topWidth={12} bottomWidth={20} fill={blockColour(on("tower"), true)} />
        <Support cx={236} top={top - 6} bottom={152} topWidth={12} bottomWidth={20} fill={blockColour(on("tower"), true)} />
      </g>
      <g opacity={fade("stiffening-girder")}>
        <Mass x={18} y={deckY} width={284} height={12} fill={blockColour(on("stiffening-girder"), false)} />
      </g>
      <g opacity={fade("anchorage")}>
        {/* The block the cable's pull is tied down into, standing on the bank. */}
        <Mass x={0} y={122} width={30} height={30} rx={3} fill={blockColour(on("anchorage"), true)} />
        <Mass x={290} y={122} width={30} height={30} rx={3} fill={blockColour(on("anchorage"), true)} />
      </g>
      {labels ? (
        <>
          <Arrow x1={14} y1={14} x2={62} y2={14} colour={PALETTE.yellow} head={5} />
          <Tag x={68} y={14} anchor="start" colour={PALETTE.yellowDeep}>
            wind
          </Tag>
          <Tag x={236} y={14}>
            tower
          </Tag>
          {/* Down the middle of the span in the order the load travels: the
              cable, the hangers that drop from it, the girder they lift. */}
          <Tag x={160} y={62}>
            main cable
          </Tag>
          <Tag x={160} y={94}>
            hanger
          </Tag>
          <Tag x={160} y={124} colour={PALETTE.paper}>
            stiffening girder
          </Tag>
          {/* The block the cable is tied into, named beside it under the deck. */}
          <Tag x={34} y={141} anchor="start">
            anchorage
          </Tag>
        </>
      ) : null}
    </>
  );
}

/** Systems combined: an arch carrying a beam, a few stays, and both cables at once. */
function Composite({ highlight, labels }: SceneShapes) {
  const { fade } = painter({ highlight, labels });
  const on = (id: string) => highlight?.includes(id) ?? false;
  const a = panelTop(3, 0);
  const b = panelTop(3, 1);
  const c = panelTop(3, 2);
  return (
    <>
      <Plate />
      <Panels count={3} />
      <g opacity={fade("beam-arch")}>
        <Arch x1={50} x2={270} base={a + 40} rise={22} stroke={PALETTE.charcoal} width={5} />
        <Deck x1={40} x2={280} y={a + 8} height={8} fill={blockColour(on("beam-arch"), false)} />
        {[90, 130, 190, 230].map((x) => (
          <Tie key={x} x1={x} y1={archPoint(x, 50, 270, a + 40, 22)} x2={x} y2={a + 16} />
        ))}
      </g>
      <g opacity={fade("partial-cable-stayed")}>
        <Support cx={160} top={b + 2} bottom={b + 42} topWidth={10} bottomWidth={16} fill={PALETTE.charcoal} />
        {[100, 130, 190, 220].map((x) => (
          <line key={x} x1={160} y1={b + 6} x2={x} y2={b + 32} stroke={PALETTE.gray} strokeWidth={1.6} />
        ))}
        <rect x={40} y={b + 32} width={240} height={10} fill={blockColour(on("partial-cable-stayed"), false)} />
      </g>
      <g opacity={fade("cable-suspension")}>
        <Support cx={112} top={c + 4} bottom={c + 44} topWidth={9} bottomWidth={14} fill={PALETTE.charcoal} />
        <Support cx={208} top={c + 4} bottom={c + 44} topWidth={9} bottomWidth={14} fill={PALETTE.charcoal} />
        <line x1={112} y1={c + 8} x2={50} y2={c + 34} stroke={PALETTE.gray} strokeWidth={1.6} />
        <line x1={208} y1={c + 8} x2={270} y2={c + 34} stroke={PALETTE.gray} strokeWidth={1.6} />
        <Cable x1={112} y1={c + 8} x2={208} y2={c + 8} controlY={c + 38} stroke={PALETTE.ink} width={3} />
        {[140, 160, 180].map((x) => (
          <Tie key={x} x1={x} y1={cablePoint(x, 112, 208, c + 8, c + 38)} x2={x} y2={c + 34} />
        ))}
        <rect x={40} y={c + 34} width={240} height={10} fill={blockColour(on("cable-suspension"), false)} />
      </g>
      {labels ? (
        <>
          {/* Each system is named on the deck of its own drawing: the three
              panels are small, and a name written across the tower or the
              stays of one drawing could not be read. */}
          <Tag x={160} y={a + 12} colour={PALETTE.paper}>
            beam + arch
          </Tag>
          <Tag x={160} y={b + 37} colour={PALETTE.paper}>
            partial cable-stayed
          </Tag>
          <Tag x={160} y={c + 39} colour={PALETTE.paper}>
            cable-stayed + suspension
          </Tag>
        </>
      ) : null}
    </>
  );
}

/** Every scene, by name. */
export const SCENES: Record<BridgeScene, (shapes: SceneShapes) => ReactNode> = {
  overview: Overview,
  superstructure: Superstructure,
  bearings: Bearings,
  supports: Supports,
  foundations: Foundations,
  fittings: Fittings,
  levels: Levels,
  dimensions: Dimensions,
  carries: Carries,
  "deck-position": DeckPosition,
  beam: Beam,
  arch: ArchScene,
  frame: Frame,
  "cable-stayed": CableStayed,
  suspension: Suspension,
  composite: Composite,
};

/** What each drawing shows, for screen readers. */
export const SCENE_LABELS: Record<BridgeScene, string> = {
  overview: "Elevation of a bridge crossing a river, with deck, bearings, piers, abutments and foundations",
  superstructure: "Section through a bridge deck showing the wearing surface, deck slab, main girder and cross beam",
  bearings: "A bearing between the main girder and the pier cap, with arrows for sliding and rotating",
  supports: "The end of a bridge, showing the abutment, embankment, cone slope and transition slab beside a pier",
  foundations: "A pier on a pile cap with piles driven down to the bearing stratum",
  fittings: "A bridge deck fitted with paving, railing, drainage, an expansion joint and a lamp",
  levels: "A river in section with the low water, navigable, design flood and high water levels marked",
  dimensions: "A two-span bridge dimensioned with net span l-zero, computed span l, total length L and construction height h",
  carries: "A section through a bridge deck showing what it carries: a roadway with cars, a railway track, a footpath with a person, a pipe duct, and the waterway below",
  "deck-position": "Three arch bridges comparing a deck bridge, a through bridge and a half-through bridge",
  beam: "Three beam bridges: simply supported, continuous over three supports, and cantilever with a hanging span",
  arch: "An arch bridge with thrust arrows at its feet, and below it a tied arch whose tie balances the thrust",
  frame: "Three rigid frame bridges — portal, inclined leg and continuous — with their rigid joints marked",
  "cable-stayed": "A cable-stayed bridge with a tower, fan of stay cables, main girder and ground anchors",
  suspension: "A suspension bridge with two towers, a main cable, hangers, a stiffening girder, anchorages and a wind arrow",
  composite: "Three combined systems: a beam and arch, a partial cable-stayed bridge, and a cable-stayed suspension bridge",
};

/**
 * Every part each drawing knows about: the pins a learner can hunt for, and
 * the vocabulary that goes with them. Content names these ids; the geometry
 * stays here so a pin can never drift off the thing it points at.
 */
export const SCENE_PARTS: Record<BridgeScene, ScenePart[]> = {
  overview: [
    {
      id: "superstructure",
      label: "Superstructure",
      note: "The deck and its beams — the part that carries people and vehicles across the gap.",
      at: [160, 94],
    },
    {
      id: "span",
      label: "Span",
      note: "The clear opening the bridge crosses, measured from one support to the next.",
      at: [160, 124],
    },
    {
      id: "bearing",
      label: "Bearing",
      note: "A block where the deck meets its support: it passes the load down and lets the deck move.",
      at: [118, 100],
    },
    {
      id: "pier",
      label: "Pier",
      note: "An intermediate support, standing in the river or on land between the abutments.",
      at: [202, 124],
    },
    {
      id: "abutment",
      label: "Abutment",
      note: "The support at each end. It carries the deck and holds back the earth of the embankment.",
      at: [40, 116],
    },
    {
      id: "foundation",
      label: "Foundation",
      note: "The buried base that spreads every load into the ground.",
      at: [118, 161],
    },
  ],
  superstructure: [
    {
      id: "paving",
      label: "Wearing surface",
      note: "The paved layer traffic runs on. It takes the wear so the structure underneath does not.",
      at: [80, 71],
    },
    {
      id: "deck-slab",
      label: "Deck slab",
      note: "The flat plate that spreads a wheel load sideways into the girders.",
      at: [170, 80],
    },
    {
      id: "main-girder",
      label: "Main girder",
      note: "The deep beam along the bridge. It spans between supports and bends under load.",
      at: [90, 96],
    },
    {
      id: "cross-beam",
      label: "Cross beam",
      note: "A beam across the width of the bridge, tying the girders together so they share the load.",
      at: [250, 96],
    },
    {
      id: "railing",
      label: "Railing",
      note: "The barrier along the edge that keeps traffic and pedestrians on the bridge.",
      at: [64, 58],
    },
  ],
  bearings: [
    {
      id: "main-girder",
      label: "Main girder",
      note: "The deck's main beam, resting on its bearings.",
      at: [90, 89],
    },
    {
      id: "bearing",
      label: "Bearing",
      note: "The block between girder and pier. It passes the load down, and lets the deck slide and rotate as it stretches.",
      at: [130, 108],
    },
    {
      id: "pier-cap",
      label: "Pier cap",
      note: "The wide top of the pier, spreading the bearing loads across the pier below.",
      at: [170, 123],
    },
    {
      id: "pier",
      label: "Pier",
      note: "The support that takes everything the bearings hand it.",
      at: [170, 155],
    },
  ],
  supports: [
    {
      id: "transition-slab",
      label: "Transition slab",
      tag: "slab",
      note: "A slab between the abutment and the fill. It tilts as the fill settles, so the road stays smooth.",
      at: [22, 88],
    },
    {
      id: "embankment",
      label: "Embankment",
      note: "The raised bank of earth that carries the road up to the bridge.",
      at: [10, 112],
    },
    {
      id: "abutment",
      label: "Abutment",
      note: "The end support. It carries the deck and resists the earth pressure of the embankment.",
      at: [60, 128],
    },
    {
      id: "cone-slope",
      label: "Cone slope",
      note: "Stone protection on the slope beside the abutment, holding the bank in place.",
      at: [104, 140],
    },
    {
      id: "pier",
      label: "Pier",
      note: "A middle support — a single-span bridge has none.",
      at: [250, 128],
    },
  ],
  foundations: [
    {
      id: "pier",
      label: "Pier",
      note: "Everything above the ground, standing on the pile cap.",
      at: [160, 44],
    },
    {
      id: "pile-cap",
      label: "Pile cap",
      note: "A thick block that gathers the pier's load and hands it to every pile at once.",
      at: [160, 73],
    },
    {
      id: "pile",
      label: "Piles",
      note: "Deep columns driven down to carry the load to strong ground. Often built underwater, which is why foundations are the hardest part.",
      at: [178, 112],
    },
    {
      id: "bearing-stratum",
      label: "Bearing stratum",
      note: "The firm layer the piles stand on: rock or hard soil strong enough to hold the bridge.",
      at: [160, 164],
    },
  ],
  fittings: [
    {
      id: "railing",
      label: "Railing",
      note: "A crash barrier or railing along the edge of the deck.",
      at: [58, 74],
    },
    {
      id: "paving",
      label: "Deck paving",
      tag: "paving",
      note: "The running surface, laid over the waterproofing.",
      at: [80, 92],
    },
    {
      id: "expansion-joint",
      label: "Expansion joint",
      note: "A gap that lets the deck grow in summer and shrink in winter without cracking.",
      at: [160, 92],
    },
    {
      id: "drain",
      label: "Drainage",
      tag: "drain",
      note: "Pipes and waterproofing that take rain off the deck before it soaks into the structure.",
      at: [128, 128],
    },
    {
      id: "lighting",
      label: "Lighting",
      note: "Lamps on the deck, so the bridge works at night.",
      at: [251, 56],
    },
  ],
  levels: [
    {
      id: "high-water-level",
      label: "High water level",
      tag: "high water",
      note: "The highest level the river has been seen to reach in flood.",
      at: [70, 78],
    },
    {
      id: "design-flood-level",
      label: "Design flood level",
      tag: "design flood",
      note: "The level the designer calculates the bridge must cope with. Spans are measured at this level.",
      at: [250, 96],
    },
    {
      id: "navigable-level",
      label: "Navigable water level",
      tag: "navigable",
      note: "The level at which boats can still pass under the bridge normally.",
      at: [130, 114],
    },
    {
      id: "low-water-level",
      label: "Low water level",
      tag: "low water",
      note: "The lowest level in the dry season.",
      at: [200, 132],
    },
    {
      id: "clearance",
      label: "Clearance",
      note: "The space kept clear under the deck for boats, vehicles or people.",
      at: [160, 90],
    },
  ],
  dimensions: [
    {
      id: "bridge-length",
      label: "Bridge length L",
      tag: "L",
      note: "The whole bridge, end to end — between the tail ends of the abutment wing walls.",
      at: [160, 80],
    },
    {
      id: "construction-height",
      label: "Construction height h",
      tag: "h",
      note: "From the bottom of the superstructure to the top of the deck. It must never exceed the height the route allows.",
      at: [40, 101],
    },
    {
      id: "net-span",
      label: "Net span l₀",
      tag: "l₀",
      note: "The clear waterway between two piers at the design flood level.",
      at: [155, 118],
    },
    {
      id: "computed-span",
      label: "Computed span l",
      tag: "l",
      note: "Centre to centre of the supports — the span the calculations use.",
      at: [185, 134],
    },
  ],
  carries: [
    {
      id: "roadway",
      label: "Roadway",
      note: "Lanes for vehicles — the purpose most bridges are built for.",
      at: [88, 96],
    },
    {
      id: "railway",
      label: "Railway",
      note: "A track sharing the deck: railway bridges, and bridges that carry road and rail together.",
      at: [220, 95],
    },
    {
      id: "footpath",
      label: "Footpath",
      note: "A path along the edge for people walking across.",
      at: [280, 97],
    },
    {
      id: "pipe-duct",
      label: "Pipe duct",
      tag: "pipes",
      note: "Space left under the deck so pipes and cables can cross with the bridge.",
      at: [84, 126],
    },
    {
      id: "waterway",
      label: "Waterway",
      note: "What passes underneath — the river, or the boats that have to keep their clearance.",
      at: [60, 168],
    },
  ],
  "deck-position": [
    {
      id: "deck-bridge",
      label: "Deck bridge",
      tag: "deck",
      note: "The traffic runs on top of the load-bearing structure.",
      at: [160, 12],
    },
    {
      id: "through-bridge",
      label: "Through bridge",
      tag: "through",
      note: "The traffic runs inside the structure, on its lower chord.",
      at: [160, 103],
    },
    {
      id: "half-through-bridge",
      label: "Half-through bridge",
      tag: "half-through",
      note: "The deck cuts across the middle: part of the structure stands above the traffic.",
      at: [160, 149],
    },
  ],
  beam: [
    {
      id: "simply-supported",
      label: "Simply supported",
      note: "One span resting on two supports. The simplest bridge there is — and the easiest to build.",
      at: [160, 24],
    },
    {
      id: "continuous",
      label: "Continuous",
      note: "The girder runs unbroken over the piers, so the spans help each other and the ride is smoother.",
      at: [160, 82],
    },
    {
      id: "cantilever",
      label: "Cantilever",
      note: "Arms reach out from the piers with a hanging span between them. The joints are a weak point, so it is rare today.",
      at: [160, 140],
    },
  ],
  arch: [
    {
      id: "arch-ring",
      label: "Main arch ring",
      tag: "arch ring",
      note: "The curved member that carries the load in compression.",
      at: [110, 40],
    },
    {
      id: "thrust",
      label: "Horizontal thrust",
      tag: "thrust",
      note: "The push that an arch gives its foundations. Meeting it is what an arch bridge needs from the ground.",
      at: [10, 82],
    },
    {
      id: "tie-rod",
      label: "Tie",
      tag: "tie",
      note: "A tie between the arch feet pulls them together, so the ground no longer has to resist the thrust.",
      at: [160, 157],
    },
    {
      id: "superstructure",
      label: "Deck",
      note: "The traffic surface, carried on columns above the arch.",
      at: [70, 24],
    },
  ],
  frame: [
    {
      id: "portal-frame",
      label: "Portal frame",
      tag: "portal",
      note: "Two legs and a beam cast as one piece. The piers help the beam bend, so it can be shallower.",
      at: [160, a18()],
    },
    {
      id: "rigid-joint",
      label: "Rigid joint",
      note: "Where pier and beam are fixed together. Stiff and strong — but it pulls hard on the concrete.",
      at: [70, 15],
    },
    {
      id: "inclined-leg",
      label: "Inclined leg frame",
      tag: "inclined legs",
      note: "Slanted legs open up more room underneath and give the bridge a lighter look.",
      at: [160, 72],
    },
    {
      id: "continuous-frame",
      label: "Continuous frame",
      tag: "continuous",
      note: "A long frame over several flexible piers — the usual choice for mountain valleys.",
      at: [160, 133],
    },
  ],
  "cable-stayed": [
    {
      id: "tower",
      label: "Tower",
      note: "The pylon the stays hang from. It is mostly in compression.",
      at: [160, 40],
    },
    {
      id: "stay-cable",
      label: "Stay cable",
      note: "High-strength steel in tension. Corrosion and fatigue are the two things to watch.",
      at: [132, 75],
    },
    {
      id: "main-girder",
      label: "Main girder",
      note: "Pushed down by traffic and pulled towards the tower by the stays, so it must take both bending and compression.",
      at: [64, 122],
    },
    {
      id: "anchor",
      label: "Anchor",
      note: "Where the back stays are tied down, holding the tower against the pull of the main span.",
      at: [15, 145],
    },
    {
      id: "elastic-support",
      label: "Multi-point support",
      note: "Each stay's upward pull acts like an invisible pier, so the girder can be lighter and span further.",
      at: [104, 138],
    },
  ],
  suspension: [
    {
      id: "tower",
      label: "Tower",
      note: "Carries the main cable and passes its load straight down.",
      at: [84, 60],
    },
    {
      id: "main-cable",
      label: "Main cable",
      note: "The strongest member in the bridge: high-strength wire in tension, slung between the towers.",
      at: [160, 74],
    },
    {
      id: "hanger",
      label: "Hanger",
      note: "A vertical cable that lifts the deck and hands its load to the main cable.",
      at: [124, 95],
    },
    {
      id: "stiffening-girder",
      label: "Stiffening girder",
      note: "The deck structure. Hangers hold it at many points, so it bends very little.",
      at: [160, 124],
    },
    {
      id: "anchorage",
      label: "Anchorage",
      note: "A huge block that holds the end of the main cable. Without it the cable would simply pull the towers over.",
      at: [15, 138],
    },
  ],
  composite: [
    {
      id: "beam-arch",
      label: "Beam and arch",
      tag: "beam + arch",
      note: "The arch and the beam carry the load together, each doing what it is best at.",
      at: [160, 18],
    },
    {
      id: "partial-cable-stayed",
      label: "Partial cable-stayed",
      note: "A beam bridge given a few stays — the girder stays stiff while the stays take some of the bending.",
      at: [160, 102],
    },
    {
      id: "cable-suspension",
      label: "Cable-stayed + suspension",
      note: "Stays stiffen the ends, a suspended main cable spans the middle.",
      at: [160, 152],
    },
  ],
};

/** A pin position for the portal frame's beam, kept in one place. */
function a18() {
  return panelTop(3, 0) + 8;
}
