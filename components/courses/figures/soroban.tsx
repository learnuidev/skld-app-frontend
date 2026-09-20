import {
  Arrow,
  Board,
  Callout,
  Chip,
  FigurePlate,
  Label,
  Numeral,
  Rule,
  TONE,
  boardGeometry,
  boardValue,
  type FigureProps,
} from "./kit";

/**
 * The drawings of the board itself: its parts, what one bead is worth, where
 * the places sit along the rods, and what the board looks like beside the
 * number written in figures. One idea per plate.
 */

/** The digits a drawing was handed, or its own example, clamped to a rod. */
function digitsOf(numbers: number[] | undefined, fallback: number[], rods = 4): number[] {
  const source = numbers?.length ? numbers : fallback;
  return source
    .slice(0, rods)
    .map((digit) => Math.min(9, Math.max(0, Math.round(digit))));
}

/** The whole board, with every part named. */
function Soroban({ named = true }: FigureProps) {
  // One rod working (7: the heaven bead down and two earth beads up) and two rods
  // cleared, so the drawing shows both what a counted bead looks like and what a
  // bead at rest looks like.
  const digits = [7, 0, 0];
  const board = { x: 126, y: 18, width: 76, height: 144 };
  const geometry = boardGeometry(board.x, board.y, board.width, board.height, digits);
  const units = geometry.rodX(0);
  const middle = geometry.rodX(1);

  return (
    <FigurePlate label="A soroban: a frame, vertical rods, a beam across the middle, one heaven bead above it and four earth beads below">
      <Board {...board} digits={digits} />
      {named ? (
        <>
          <Callout at={[middle, geometry.bottom - 4]} anchor={[104, 140]} side="left" text="rod" />
          <Callout at={[units, geometry.heavenCy(0)]} anchor={[216, 26]} side="right" text="heaven bead = 5" />
          <Callout
            at={[units, geometry.beamY + geometry.beamH / 2]}
            anchor={[216, geometry.beamY + 22]}
            side="right"
            text="beam"
          />
          <Callout
            at={[units, geometry.earthCy(0, 0)]}
            anchor={[216, 154]}
            side="right"
            text="earth beads = 1 each"
          />
          <Callout at={[middle, board.y + board.height]} anchor={[middle, 174]} text="frame" />
        </>
      ) : null}
    </FigurePlate>
  );
}

/** One rod drawn large, so a single digit can be read off it. */
function OneRod({ numbers, named = true }: FigureProps) {
  const digit = digitsOf(numbers, [7], 1)[0];
  const board = { x: 126, y: 22, width: 52, height: 136 };
  const geometry = boardGeometry(board.x, board.y, board.width, board.height, [digit]);
  const rod = geometry.rodX(0);

  return (
    <FigurePlate label={`One rod showing ${digit}: the heaven bead counts 5 and each earth bead counts 1`}>
      <Board {...board} digits={[digit]} />
      {named ? (
        <>
          <Callout at={[rod, geometry.heavenCy(0)]} anchor={[106, 48]} side="left" text="heaven bead = 5" />
          <Callout
            at={[rod, geometry.earthCy(0, 0)]}
            anchor={[106, geometry.earthCy(0, 0) + 16]}
            side="left"
            text="each earth bead = 1"
          />
        </>
      ) : null}
      <Numeral x={248} y={88} value={digit} size={46} />
      <Label x={248} y={124} size={9} tone="gray">
        this rod
      </Label>
    </FigurePlate>
  );
}

/** What each kind of bead is worth, side by side. */
function BeadValues({ named = true }: FigureProps) {
  const heaven = { x: 34, y: 34, width: 48, height: 116 };
  const earth = { x: 196, y: 34, width: 48, height: 116 };

  return (
    <FigurePlate label="A heaven bead is worth five; four earth beads are worth one each, so they make four">
      {named ? (
        <>
          <Label x={58} y={22} size={10}>
            the heaven bead
          </Label>
          <Label x={220} y={22} size={10}>
            the four earth beads
          </Label>
        </>
      ) : null}

      <Board {...heaven} digits={[5]} />
      <Board {...earth} digits={[4]} />

      <Numeral x={58} y={166} value={5} size={22} />
      <Numeral x={220} y={166} value={4} size={22} />
    </FigurePlate>
  );
}

/** The board at rest: every bead away from the beam, reading nothing. */
function ClearBoard({ numbers, named = true }: FigureProps) {
  const digits = digitsOf(numbers, [0, 0, 0], 3);
  const board = { x: 96, y: 20, width: 84, height: 140 };

  return (
    <FigurePlate label="A cleared board: every bead rests away from the beam, so the board reads zero">
      <Board {...board} digits={digits} />
      <Arrow from={[190, 90]} to={[216, 90]} tone="gray" dashed />
      <Numeral x={252} y={88} value={0} size={44} />
      {named ? (
        <>
          <Label x={252} y={124} size={10} tone="gray">
            every bead rests
          </Label>
          <Label x={252} y={140} size={10} tone="gray">
            away from the beam
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/** The rods named by the place each one holds. */
function PlaceValue({ numbers, labels, named = true }: FigureProps) {
  const digits = digitsOf(numbers, [7, 0, 5, 2]);
  const places = labels?.length ? labels.slice(0, 4) : ["ones", "tens", "hundreds", "thousands"];
  const board = { x: 24, y: 30, width: 180, height: 104 };
  const geometry = boardGeometry(board.x, board.y, board.width, board.height, digits);

  return (
    <FigurePlate label={`The rods by place, from the right: ${places.join(", ")}`}>
      <Board {...board} digits={digits} />

      {digits.map((digit, rod) => {
        const x = geometry.rodX(rod);
        return (
          <g key={rod}>
            <Numeral x={x} y={16} value={digit} size={13} tone={digit === 0 ? "gray" : "ink"} />
            {/* The place names are written, not chipped: the rods are close
                enough together that four chips would touch. */}
            <Rule from={[x, geometry.bottom]} to={[x, 142]} tone="gray" width={1} dashed />
            <Label x={x} y={152} size={8.5}>
              {places[rod] ?? ""}
            </Label>
          </g>
        );
      })}

      {named ? (
        <>
          <Numeral x={250} y={78} value={boardValue(digits)} size={26} />
          <Label x={250} y={108} size={9} tone="gray">
            the number it holds
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/** A number with an empty rod inside it — the zero that holds a place. */
function ZeroRod({ numbers, named = true }: FigureProps) {
  const digits = digitsOf(numbers, [4, 0, 5], 3);
  const board = { x: 40, y: 30, width: 132, height: 122 };
  const geometry = boardGeometry(board.x, board.y, board.width, board.height, digits);
  const zeroRod = digits.findIndex((digit) => digit === 0);
  const rod = geometry.rodX(zeroRod < 0 ? 1 : zeroRod);

  return (
    <FigurePlate label={`The board shows ${boardValue(digits)}: the empty rod in the middle holds the place`}>
      <Board {...board} digits={digits} />

      {digits.map((digit, index) => (
        <Numeral key={index} x={geometry.rodX(index)} y={18} value={digit} size={13} tone={digit === 0 ? "gray" : "ink"} />
      ))}

      {zeroRod >= 0 ? (
        <rect
          x={rod - geometry.r * 2}
          y={geometry.top - 4}
          width={geometry.r * 4}
          height={geometry.bottom - geometry.top + 8}
          rx={8}
          fill="none"
          stroke={TONE.yellowDeep}
          strokeWidth={1.4}
          strokeDasharray="4 3"
        />
      ) : null}

      {named ? (
        <>
          <Numeral x={248} y={72} value={boardValue(digits)} size={30} />
          <Label x={248} y={104} size={9} tone="gray">
            not {[...digits].reverse().filter((digit) => digit !== 0).join("")}
          </Label>
          <Label x={248} y={124} size={9} tone="gray">
            the empty rod keeps
          </Label>
          <Label x={248} y={138} size={9} tone="gray">
            the other digits in place
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/** A two-digit number: one rod for the tens, one for the units. */
function TwoRods({ numbers, named = true }: FigureProps) {
  const digits = digitsOf(numbers, [3, 4], 2);
  const board = { x: 108, y: 28, width: 68, height: 118 };
  const geometry = boardGeometry(board.x, board.y, board.width, board.height, digits);

  return (
    <FigurePlate label={`Two rods showing ${boardValue(digits)}: the tens rod and the units rod`}>
      <Board {...board} digits={digits} />
      {digits.map((digit, rod) => (
        <Numeral key={rod} x={geometry.rodX(rod)} y={18} value={digit} size={13} />
      ))}

      {named ? (
        <>
          {/* The two names sit on rows of their own: side by side, the rods are
              too close together for two chips not to touch. */}
          <Rule from={[geometry.rodX(1), geometry.bottom]} to={[geometry.rodX(1), 138]} tone="gray" width={1} dashed />
          <Chip x={geometry.rodX(1) - 21} y={138} width={42} height={18} text="tens" size={9} />
          <Rule from={[geometry.rodX(0), geometry.bottom]} to={[geometry.rodX(0), 158]} tone="gray" width={1} dashed />
          <Chip x={geometry.rodX(0) - 21} y={158} width={42} height={18} text="units" size={9} />
        </>
      ) : null}

      <Label x={248} y={78} size={9} tone="gray">
        the board reads
      </Label>
      <Numeral x={248} y={104} value={boardValue(digits)} size={30} />
    </FigurePlate>
  );
}

/** A wide board carrying a big number. */
function BigBoard({ numbers }: FigureProps) {
  const digits = digitsOf(numbers, [7, 0, 4, 2, 9, 1], 6);
  const board = { x: 30, y: 46, width: 260, height: 98 };

  return (
    <FigurePlate label={`A six-rod board holding ${boardValue(digits)}`}>
      <Numeral x={160} y={26} value={boardValue(digits)} size={20} />
      <Board {...board} digits={digits} />
      <Label x={160} y={168} size={9} tone="gray">
        six rods, six digits — one rod each
      </Label>
    </FigurePlate>
  );
}

/** The board and the same number written in figures. */
function BoardVsNumeral({ numbers, named = true }: FigureProps) {
  const digits = digitsOf(numbers, [1, 2, 3, 4]);
  const board = { x: 24, y: 40, width: 116, height: 106 };

  return (
    <FigurePlate label={`The board shows ${boardValue(digits)}, the same number written in figures`}>
      <Board {...board} digits={digits} />
      <Label x={172} y={92} size={24} tone="gray">
        =
      </Label>
      <Numeral x={248} y={86} value={boardValue(digits)} size={32} />
      {named ? (
        <Label x={248} y={120} size={9} tone="gray">
          the same number
        </Label>
      ) : null}
    </FigurePlate>
  );
}

export const sorobanFigures = {
  soroban: Soroban,
  "one-rod": OneRod,
  "bead-values": BeadValues,
  "clear-board": ClearBoard,
  "place-value": PlaceValue,
  "zero-rod": ZeroRod,
  "two-rods": TwoRods,
  "big-board": BigBoard,
  "board-vs-numeral": BoardVsNumeral,
};
