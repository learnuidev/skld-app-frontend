import type { DiagramName } from "@/modules/course/types";

import {
  Arrow,
  Board,
  Box,
  Dot,
  DotRow,
  FigurePlate,
  Label,
  Numeral,
  Rule,
  TONE,
  boardGeometry,
  boardValue,
  type FigureComponent,
  type FigureProps,
} from "./kit";

/**
 * The drawings of the board held in the mind: what a ghost board looks like,
 * the moment a real board is caught as a picture, and the drills that feed one.
 *
 * A **ghost board** is a board remembered rather than a board in front of you.
 * `Board` draws it with `ghost`, so its frame is a quiet dashed outline, its
 * rods and beam are grey and every bead is charcoal on fog — the picture in the
 * head beside the solid board the hands are on. Nothing here blurs anything:
 * a faded board is the same tones at lower opacity, never a new colour and
 * never a filter.
 */

/** The digits a drawing was handed, or its own example, clamped to a rod. */
function digitsOf(numbers: number[] | undefined, fallback: number[], rods = 4): number[] {
  const source = numbers?.length ? numbers : fallback;
  return source.slice(0, rods).map((digit) => Math.min(9, Math.max(0, Math.round(digit))));
}

/** One digit, with the drawing's own example when nothing was handed in. */
function digitAt(numbers: number[] | undefined, index: number, fallback: number): number {
  const raw = numbers?.[index];
  const value = typeof raw === "number" && Number.isFinite(raw) ? raw : fallback;
  return Math.min(9, Math.max(0, Math.round(value)));
}

/** A whole number broken onto rods — units first, the way `Board` reads them. */
function rodsOf(value: number, rods = 2): number[] {
  const total = Math.max(0, Math.round(value));
  return Array.from({ length: rods }, (_, rod) => Math.floor(total / 10 ** rod) % 10);
}

/** The words a drawing was handed, or its own. */
function wordAt(labels: string[] | undefined, index: number, fallback: string): string {
  const word = labels?.[index];
  return word && word.trim() ? word.trim() : fallback;
}

/** `count` places evenly spread from `first` to `last`; a lone one sits between. */
function spread(first: number, last: number, count: number, index: number): number {
  if (count <= 1) return (first + last) / 2;
  return first + ((last - first) * index) / (count - 1);
}

/** A short arc of a circle: the sliver of time a flash lasts, never a clock. */
function Arc({
  cx,
  cy,
  r,
  from,
  to,
  tone = "yellowDeep",
  width = 2.6,
}: {
  cx: number;
  cy: number;
  r: number;
  /** Degrees, screen-wise: -90 is the top of the circle, 0 the right. */
  from: number;
  to: number;
  tone?: "yellow" | "yellowDeep";
  width?: number;
}) {
  const at = (degrees: number): [number, number] => {
    const radians = (degrees * Math.PI) / 180;
    return [cx + r * Math.cos(radians), cy + r * Math.sin(radians)];
  };
  const [x1, y1] = at(from);
  const [x2, y2] = at(to);
  const large = Math.abs(to - from) > 180 ? 1 : 0;

  return (
    <path
      d={`M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2}`}
      fill="none"
      stroke={TONE[tone]}
      strokeWidth={width}
      strokeLinecap="round"
    />
  );
}

/** A flash: the instant a picture is taken. */
function Burst({ cx, cy, r = 8, rays = 6 }: { cx: number; cy: number; r?: number; rays?: number }) {
  return (
    <>
      {Array.from({ length: rays }, (_, ray) => {
        const radians = ((-90 + (360 / rays) * ray) * Math.PI) / 180;
        return (
          <Rule
            key={ray}
            from={[cx + Math.cos(radians) * (r + 3), cy + Math.sin(radians) * (r + 3)]}
            to={[cx + Math.cos(radians) * (r + 7), cy + Math.sin(radians) * (r + 7)]}
            tone="yellow"
            width={1.6}
          />
        );
      })}
      <Dot cx={cx} cy={cy} r={r} fill="yellow" />
    </>
  );
}

/** The board drawn as a ghost: the picture held in the mind. */
function MentalBoard({ numbers, labels, named = true }: FigureProps) {
  const digits = digitsOf(numbers, [4, 3], 4);
  const board = { x: 112, y: 30, width: 96, height: 120 };

  return (
    <FigurePlate label={`A board drawn as a ghost inside the head: the beads are set to ${boardValue(digits)}`}>
      {/* The wash behind it is the mind's eye, not a board: no frame, no frame colour. */}
      <Box x={100} y={20} width={120} height={140} fill="butter" radius={14} />
      <Board {...board} digits={digits} ghost />
      {named ? (
        <Label x={160} y={170} size={9.5}>
          {wordAt(labels, 0, "the board in your head")}
        </Label>
      ) : null}
    </FigurePlate>
  );
}

/** A real board caught as a mental picture: solid, flashed, then the same as a ghost. */
function PhotoSnap({ numbers, labels, named = true }: FigureProps) {
  const digits = digitsOf(numbers, [4, 3], 2);
  const real = { x: 48, y: 30, width: 84, height: 112 };
  const memory = { x: 188, y: 30, width: 84, height: 112 };

  return (
    <FigurePlate label="A real board in front of you flashed into a picture: the same board, drawn as a ghost, in the mind">
      <Board {...real} digits={digits} />
      <Arrow from={[140, 86]} to={[180, 86]} />
      <Burst cx={160} cy={58} />
      <Board {...memory} digits={digits} ghost />
      {named ? (
        <>
          <Label x={90} y={168} size={9}>
            {wordAt(labels, 0, "in front of you")}
          </Label>
          <Label x={230} y={168} size={9}>
            {wordAt(labels, 1, "in your mind")}
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/** Beads on one side, the number they make on the other. */
function ImageToNumber({ numbers, labels, named = true }: FigureProps) {
  const digits = digitsOf(numbers, [7, 0, 4], 4);
  const value = boardValue(digits);
  const board = { x: 24, y: 34, width: 112, height: 112 };

  return (
    <FigurePlate label={`Beads on the board, and the number they make: ${value}`}>
      <Board {...board} digits={digits} />
      <Arrow from={[146, 90]} to={[176, 90]} tone="yellowDeep" width={1.8} head={6} />
      <Numeral x={238} y={90} value={value} size={34} />
      {named ? (
        <>
          <Label x={80} y={166} size={9.5}>
            {wordAt(labels, 0, "the beads")}
          </Label>
          <Label x={238} y={134} size={9}>
            {wordAt(labels, 1, "the number they make")}
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/** A carry happening on the ghost board. */
function GhostCarry({ numbers, labels, named = true }: FigureProps) {
  const carried = digitAt(numbers, 0, 9);
  const added = digitAt(numbers, 1, 1);
  const total = carried + added;
  const before = [carried, 0];
  const after = rodsOf(total);
  const board = { x: 44, y: 30, width: 88, height: 104 };
  const second = { x: 188, y: 30, width: 88, height: 104 };
  const geometry = boardGeometry(second.x, second.y, second.width, second.height, after);
  const carries = total > 9;

  return (
    <FigurePlate
      label={`A carry on the ghost board: ${carried} and ${added} make ${total}${
        carries ? ", ten ones becoming one bead on the next rod" : ""
      }`}
    >
      <Board {...board} digits={before} ghost />
      <Arrow from={[142, 82]} to={[178, 82]} tone="gray" dashed />
      <Board {...second} digits={after} ghost />

      {carries ? (
        // The ten that carried: the only warm mark on either board.
        <rect
          x={geometry.rodX(1) - geometry.r * 2}
          y={geometry.top - 3}
          width={geometry.r * 4}
          height={geometry.bottom - geometry.top + 6}
          rx={7}
          fill="none"
          stroke={TONE.yellowDeep}
          strokeWidth={1.6}
          strokeDasharray="4 3"
        />
      ) : null}

      <Numeral x={88} y={150} value={carried} size={18} />
      <Numeral x={232} y={150} value={total} size={18} />
      {named ? (
        <>
          <Label x={88} y={170} size={8.5} tone="gray">
            {wordAt(labels, 0, "the board before")}
          </Label>
          <Label x={232} y={170} size={8.5} tone={carries ? "charcoal" : "gray"}>
            {wordAt(labels, 1, carries ? "one ten carried" : "the board after")}
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/** A number shown for a moment and then gone. */
function FlashDrill({ numbers, labels, named = true }: FigureProps) {
  const raw = numbers?.[0];
  const flashed = Math.min(
    99,
    Math.max(0, Math.round(typeof raw === "number" && Number.isFinite(raw) ? raw : 86)),
  );

  return (
    <FigurePlate label={`The number ${flashed} shown for a single moment, then gone`}>
      {/* A dashed ring is how long it is up; the short arc is how little is left. */}
      <circle
        cx={92}
        cy={90}
        r={54}
        fill="none"
        stroke={TONE.gray}
        strokeWidth={1.2}
        strokeDasharray="4 3"
      />
      <Arc cx={92} cy={90} r={54} from={-90} to={-18} />
      <Numeral x={92} y={90} value={flashed} size={40} />
      <Arrow from={[156, 90]} to={[190, 90]} tone="gray" dashed />

      {/* Gone: the same number, the same tones, only faint. */}
      <g opacity={0.4}>
        <Numeral x={252} y={90} value={flashed} size={40} tone="gray" />
      </g>

      {named ? (
        <>
          <Label x={92} y={166} size={9}>
            {wordAt(labels, 0, "shown for a moment")}
          </Label>
          <Label x={252} y={166} size={9} tone="gray">
            {wordAt(labels, 1, "then gone")}
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/** Numbers arriving one at a time into the board. */
function ListeningDrill({ numbers, labels, named = true }: FigureProps) {
  const calls = digitsOf(numbers, [7, 5, 8], 6);
  const total = calls.reduce((sum, call) => sum + call, 0);
  const board = { x: 196, y: 36, width: 88, height: 112 };
  const small = calls.length > 4;

  return (
    <FigurePlate label={`Numbers heard one at a time — ${calls.join(", ")} — arriving into one board`}>
      {calls.map((call, index) => {
        const row = spread(34, 146, calls.length, index);
        const target = spread(74, 112, calls.length, index);
        return (
          <g key={index}>
            <Numeral x={36} y={row} value={call} size={small ? 15 : 18} />
            {/* The beat each number arrives on: the one warm mark on the plate. */}
            <Rule from={[56, row - 6]} to={[56, row + 6]} tone="yellowDeep" width={2.2} />
            <Arrow from={[68, row]} to={[190, target]} tone="gray" width={1.1} dashed />
          </g>
        );
      })}

      <Board {...board} digits={rodsOf(total)} ghost />

      {named ? (
        <>
          <Label x={64} y={168} size={8.5}>
            {wordAt(labels, 0, "one at a time")}
          </Label>
          <Label x={240} y={168} size={9}>
            {wordAt(labels, 1, "the board collects")}
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/** Two rods moved together in one motion. */
function TwoRodsAtOnce({ numbers, labels, named = true }: FigureProps) {
  const digits = digitsOf(numbers, [3, 6], 2);
  const board = { x: 40, y: 26, width: 112, height: 108 };
  const geometry = boardGeometry(board.x, board.y, board.width, board.height, digits);
  const units = geometry.rodX(0);
  const tens = geometry.rodX(1);
  const middle = (units + tens) / 2;

  return (
    <FigurePlate label={`Two rods worked together in one motion: the digits ${digits.join(" and ")}`}>
      <Board {...board} digits={digits} />

      {digits.map((digit, rod) => (
        <Numeral
          key={rod}
          x={geometry.rodX(rod)}
          y={16}
          value={digit}
          size={13}
          tone={digit === 0 ? "gray" : "ink"}
        />
      ))}

      {/* One brace under both rods and one arrow pushing it: the two move as one. */}
      <Rule from={[tens, 152]} to={[units, 152]} tone="yellowDeep" width={2.2} />
      <Rule from={[tens, 152]} to={[tens, 142]} tone="yellowDeep" width={2.2} />
      <Rule from={[units, 152]} to={[units, 142]} tone="yellowDeep" width={2.2} />
      <Arrow from={[middle, 172]} to={[middle, 156]} tone="yellowDeep" width={2.2} head={6} />

      {named ? (
        <>
          <Label x={176} y={80} anchor="start" size={10}>
            {wordAt(labels, 0, "both rods")}
          </Label>
          <Label x={176} y={98} anchor="start" size={10}>
            {wordAt(labels, 1, "move as one")}
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/** A sharp mental board beside a blurred one. */
function VividImage({ numbers, labels, named = true }: FigureProps) {
  const digits = digitsOf(numbers, [4, 3], 2);
  const sharp = { x: 44, y: 48, width: 84, height: 92 };
  const faded = { x: 192, y: 48, width: 84, height: 92 };

  return (
    <FigurePlate
      label={`The same ghost board twice, both holding ${boardValue(digits)}: the first sharp, the second faded`}
    >
      {/* The sharp one sits in a warm wash; the faded one has nothing behind it. */}
      <Box x={32} y={38} width={108} height={112} fill="butter" radius={14} />
      <Board {...sharp} digits={digits} ghost />

      <g opacity={0.38}>
        <Board {...faded} digits={digits} ghost />
      </g>

      {named ? (
        <>
          <Label x={86} y={166} size={9.5}>
            {wordAt(labels, 0, "sharp")}
          </Label>
          <Label x={234} y={166} size={9.5} tone="gray">
            {wordAt(labels, 1, "faded")}
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/** A lamp on the board while distractions sit in the dark. */
function FocusLamp({ numbers, labels, named = true }: FigureProps) {
  const digits = digitsOf(numbers, [4, 3], 4);
  const board = { x: 112, y: 46, width: 96, height: 104 };

  return (
    <FigurePlate
      label={`A lamp over the ghost board holding ${boardValue(digits)}, with quiet grey shapes outside the light`}
    >
      {/* The light first, the board on top of it: the pool is what is looked at. */}
      <ellipse cx={160} cy={104} rx={94} ry={54} fill={TONE.butter} opacity={0.7} />
      {/* The beam the lamp throws: narrow at the shade, wide where it lands. */}
      <polygon points="152,30 168,30 210,112 110,112" fill={TONE.butter} opacity={0.45} />
      <Board {...board} digits={digits} ghost />

      <polygon points="141,10 179,10 170,30 150,30" fill={TONE.charcoal} />

      {/* Everything outside the pool, kept quiet and grey. */}
      <Box x={16} y={18} width={26} height={26} stroke="gray" dashed opacity={0.6} />
      <Box x={280} y={20} width={24} height={22} stroke="gray" dashed opacity={0.6} />
      <DotRow x={20} y={168} count={3} gap={12} r={3.5} fill="gray" opacity={0.6} />
      <DotRow x={282} y={168} count={3} gap={12} r={3.5} fill="gray" opacity={0.6} />

      {named ? (
        <>
          <Label x={28} y={54} size={8.5} tone="gray">
            {wordAt(labels, 0, "noise")}
          </Label>
          <Label x={160} y={170} size={9}>
            {wordAt(labels, 1, "the board in the light")}
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/** A run of numbers feeding one board. */
function NumberSprint({ numbers, labels, named = true }: FigureProps) {
  const run = digitsOf(numbers, [9, 4, 6, 7, 2], 6);
  const total = run.reduce((sum, value) => sum + value, 0);
  const board = { x: 206, y: 36, width: 84, height: 118 };

  return (
    <FigurePlate label={`A run of ${run.join(", ")} in order, all of it feeding one board`}>
      <Rule from={[18, 100]} to={[180, 100]} tone="gray" width={1.4} />

      {run.map((value, index) => {
        const x = spread(30, 170, run.length, index);
        return (
          <g key={index}>
            <Numeral x={x} y={84} value={value} size={17} />
            <Rule from={[x, 94]} to={[x, 100]} tone="gray" width={1.2} />
          </g>
        );
      })}

      <Arrow from={[186, 100]} to={[200, 100]} tone="yellowDeep" width={1.8} head={6} />
      <Board {...board} digits={rodsOf(total)} ghost />

      {named ? (
        <>
          <Label x={99} y={130} size={9} tone="gray">
            {wordAt(labels, 0, "the run, in order")}
          </Label>
          <Label x={248} y={166} size={9}>
            {wordAt(labels, 1, "one board collects them")}
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

export const mentalFigures = {
  "mental-board": MentalBoard,
  "photo-snap": PhotoSnap,
  "image-to-number": ImageToNumber,
  "ghost-carry": GhostCarry,
  "flash-drill": FlashDrill,
  "listening-drill": ListeningDrill,
  "two-rods-at-once": TwoRodsAtOnce,
  "vivid-image": VividImage,
  "focus-lamp": FocusLamp,
  "number-sprint": NumberSprint,
} satisfies Partial<Record<DiagramName, FigureComponent>>;
