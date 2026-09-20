import type { DiagramName } from "@/modules/course/types";

import {
  Arrow,
  Board,
  Box,
  Chip,
  Dot,
  DotRow,
  FigurePlate,
  Label,
  Numeral,
  Rule,
  TONE,
  boardGeometry,
  type FigureComponent,
  type FigureProps,
} from "./kit";

/**
 * The drawings of the numbers themselves: a line of them, the pairs that fill
 * five and the pairs that fill ten, a ten carrying out of the ones rod and a
 * ten breaking back into ones, a sum and a difference set out down the columns,
 * an amount of money held as beads, and one sum worked twice — on paper and on
 * the board. One idea per plate, and the plate's one bright note is always the
 * number the plate is about: the destination, the five, the ten, the answer,
 * the amount.
 */

/** The digit standing in a place: place 0 is the ones. */
function digitAt(value: number, place: number): number {
  return Math.floor(value / 10 ** place) % 10;
}

/** How many places a whole number needs, at least one. */
function placeCount(value: number): number {
  return String(Math.max(0, Math.round(value))).length;
}

/** A number handed in, or the drawing's own example, clamped to what it draws. */
function whole(value: number | undefined, fallback: number, most = 9999): number {
  return Math.min(most, Math.max(0, Math.round(value ?? fallback)));
}

/** The numbers a drawing was handed, or its own example, at most `marks` of them. */
function marksOf(numbers: number[] | undefined, fallback: number[], marks: number): number[] {
  return (numbers?.length ? numbers : fallback).slice(0, marks).map((value) => whole(value, 0, 999));
}

/** The words a drawing was handed, or its own, when it needs a pair of them. */
function pairOf(labels: string[] | undefined, fallback: [string, string]): [string, string] {
  return labels && labels.length >= 2 ? [labels[0], labels[1]] : fallback;
}

/** The numbers marked off in order along a line, the last one the destination. */
function NumberLine({ numbers, labels, named = true }: FigureProps) {
  const marks = marksOf(numbers, [0, 1, 2, 3, 4, 5], 7);
  const last = marks.length - 1;
  const from = 46;
  const to = 280;
  // Evenly spaced whatever the numbers are: the plate shows the order they come
  // in, and a mark placed by its value would read as a graph rather than a line.
  const at = (index: number) =>
    marks.length === 1 ? (from + to) / 2 : from + (index * (to - from)) / (marks.length - 1);
  const words = labels?.length === marks.length ? labels : null;
  const destination = marks[last];

  return (
    <FigurePlate
      label={`The numbers ${marks.join(", ")} marked in order along a line, the destination ${destination}`}
    >
      <Arrow from={[30, 96]} to={[296, 96]} tone="charcoal" />

      {marks.map((_, index) => (
        <Rule
          key={`tick-${index}`}
          from={[at(index), index === last ? 88 : 91]}
          to={[at(index), index === last ? 104 : 101]}
          tone={index === last ? "yellow" : "ink"}
          width={index === last ? 2.4 : 1.4}
        />
      ))}

      {/* The one bright note: where the counting is going. */}
      <Dot cx={at(last)} cy={96} r={5.5} fill="yellow" />

      {marks.map((value, index) =>
        words ? (
          <Label key={`mark-${index}`} x={at(index)} y={118} size={11} anchor="middle">
            {words[index]}
          </Label>
        ) : (
          <Numeral
            key={`mark-${index}`}
            x={at(index)}
            y={118}
            value={value}
            size={index === last ? 13 : 12}
            tone={index === last ? "ink" : "charcoal"}
            weight={index === last ? 700 : 500}
          />
        ),
      )}

      {named && marks.length > 1 ? (
        <>
          <Label x={at(0)} y={140} size={9} tone="gray">
            start
          </Label>
          <Label x={at(last)} y={140} size={9} tone="gray">
            finish
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/** One rod's worth of beads: the pair of numbers that fill five, twice over. */
function FiveComplement({ named = true }: FigureProps) {
  const pairs: [number, number][] = [
    [1, 4],
    [2, 3],
  ];
  const rows = [62, 118];
  const bead = 6.5;
  const step = 17;
  // The first group grows from the left, the second is hung from the right, so
  // both pairs fill the same run of beads — the whole point of a complement.
  const firstX = 70;
  const lastX = 200;
  const plusX = 118;
  const five = { x: 240, y: 77, width: 44, height: 26 };

  return (
    <FigurePlate label="The pairs that make five: one and four, two and three, each pair on one rod of five">
      {named ? (
        <Label x={152} y={24} size={10}>
          the pairs that make five
        </Label>
      ) : null}

      {pairs.map(([left, right], row) => {
        const y = rows[row];
        const firstEnd = firstX + (left - 1) * step;
        const lastStart = lastX - (right - 1) * step;

        return (
          <g key={`pair-${row}`}>
            <Rule from={[firstX - 9, y]} to={[firstEnd + 9, y]} tone="gray" width={1.2} opacity={0.7} />
            <Rule from={[lastStart - 9, y]} to={[lastX + 9, y]} tone="gray" width={1.2} opacity={0.7} />
            <DotRow x={firstX} y={y} count={left} gap={step} r={bead} />
            <DotRow x={lastStart} y={y} count={right} gap={step} r={bead} />
            <Numeral x={firstX} y={y + 24} value={left} size={12} tone="charcoal" />
            <Numeral x={(lastStart + lastX) / 2} y={y + 24} value={right} size={12} tone="charcoal" />
          </g>
        );
      })}

      <Label x={plusX} y={rows[0]} size={16} tone="gray">
        +
      </Label>
      <Label x={plusX} y={rows[1]} size={16} tone="gray">
        +
      </Label>

      {/* A brace gathers both pairs into the single yellow five. */}
      <Rule from={[216, rows[0]]} to={[232, rows[0]]} tone="gray" width={1.2} />
      <Rule from={[216, rows[1]]} to={[232, rows[1]]} tone="gray" width={1.2} />
      <Rule from={[232, rows[0]]} to={[232, rows[1]]} tone="gray" width={1.2} />
      <Rule from={[232, 90]} to={[238, 90]} tone="gray" width={1.2} />
      <Chip x={five.x} y={five.y} width={five.width} height={five.height} text="5" size={15} fill="yellow" tone="ink" />
    </FigurePlate>
  );
}

/** The pairs that make ten, a pair on two rods facing each other. */
function TenComplement({ numbers, named = true }: FigureProps) {
  // The pair is picked out by its first number; the second is what is left of
  // the ten, so the two rods always show a pair that really does make ten.
  const first = Math.min(9, Math.max(1, whole(numbers?.[0], 3, 9)));
  const second = 10 - first;
  const left = { x: 26, y: 44, width: 58, height: 104 };
  const right = { x: 112, y: 44, width: 58, height: 104 };
  const ten = { x: 198, y: 83, width: 52, height: 26 };

  return (
    <FigurePlate label={`${first} and ${second} make ten, held on two rods facing each other`}>
      <Board {...left} digits={[first]} />
      <Board {...right} digits={[second]} />
      <Numeral x={boardGeometry(left.x, left.y, left.width, left.height, [first]).rodX(0)} y={34} value={first} size={12} />
      <Numeral x={boardGeometry(right.x, right.y, right.width, right.height, [second]).rodX(0)} y={34} value={second} size={12} />

      <Label x={98} y={96} size={16} tone="gray">
        +
      </Label>
      <Label x={184} y={96} size={16} tone="gray">
        =
      </Label>
      <Chip x={ten.x} y={ten.y} width={ten.width} height={ten.height} text="10" size={15} fill="yellow" tone="ink" />

      {named ? (
        <Label x={160} y={164} size={9} tone="gray">
          two rods facing each other
        </Label>
      ) : null}
    </FigurePlate>
  );
}

/** The bead a plate is about, ringed in the one bright yellow. */
function ringedBead(cx: number, cy: number, r: number) {
  return <circle cx={cx} cy={cy} r={r + 2.8} fill="none" stroke={TONE.yellow} strokeWidth={2.2} />;
}

/** Ten ones on the units rod carrying into one bead on the next rod. */
function CarryOver({ numbers, labels, named = true }: FigureProps) {
  const tens = Math.min(9, Math.max(1, Math.floor(whole(numbers?.[0], 10, 99) / 10)));
  const left = { x: 20, y: 40, width: 104, height: 104 };
  const right = { x: 190, y: 40, width: 76, height: 104 };
  const nearGeometry = boardGeometry(left.x, left.y, left.width, left.height, [9, 0]);
  const farGeometry = boardGeometry(right.x, right.y, right.width, right.height, [0, tens]);
  const landed = tens >= 5 ? farGeometry.heavenCy(1) : farGeometry.earthCy(1, Math.max(0, (tens % 5) - 1));
  const words = pairOf(labels, ["ten ones", "one ten"]);

  return (
    <FigurePlate
      label={
        tens === 1
          ? "Ten ones on the units rod carry into one bead on the tens rod"
          : `${tens} tens carry out of the units rod onto the tens rod`
      }
    >
      <Board {...left} digits={[9, 0]} />
      <Board {...right} digits={[0, tens]} />
      {ringedBead(farGeometry.rodX(1), landed, farGeometry.r)}

      <Numeral x={nearGeometry.rodX(0)} y={28} value={9} size={12} />
      <Numeral x={farGeometry.rodX(1)} y={28} value={tens} size={12} />

      <Arrow from={[136, 92]} to={[178, 92]} width={1.8} head={6} />
      {named ? (
        <Label x={157} y={74} size={9} tone="gray">
          carry
        </Label>
      ) : null}

      {named ? (
        <>
          <Label x={72} y={158} size={9.5}>
            {words[0]}
          </Label>
          <Label x={228} y={158} size={9.5}>
            {words[1]}
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/** One ten broken back into ten ones. The carry-over, walked the other way. */
function BorrowTen({ numbers, labels, named = true }: FigureProps) {
  const tens = Math.min(9, Math.max(1, Math.floor(whole(numbers?.[0], 10, 99) / 10)));
  const left = { x: 20, y: 40, width: 76, height: 104 };
  const right = { x: 190, y: 40, width: 104, height: 104 };
  const farGeometry = boardGeometry(left.x, left.y, left.width, left.height, [0, tens]);
  const nearGeometry = boardGeometry(right.x, right.y, right.width, right.height, [9, 0]);
  const broken = tens >= 5 ? farGeometry.heavenCy(1) : farGeometry.earthCy(1, Math.max(0, (tens % 5) - 1));
  const words = pairOf(labels, ["one ten", "ten ones"]);

  return (
    <FigurePlate
      label={
        tens === 1
          ? "One ten on the tens rod breaks back into ten ones on the units rod"
          : `${tens} tens break back into ones on the units rod`
      }
    >
      <Board {...left} digits={[0, tens]} />
      <Board {...right} digits={[9, 0]} />
      {ringedBead(farGeometry.rodX(1), broken, farGeometry.r)}

      <Numeral x={farGeometry.rodX(1)} y={28} value={tens} size={12} />
      <Numeral x={nearGeometry.rodX(0)} y={28} value={9} size={12} />

      <Arrow from={[136, 92]} to={[178, 92]} width={1.8} head={6} />
      {named ? (
        <Label x={157} y={74} size={9} tone="gray">
          break
        </Label>
      ) : null}

      {named ? (
        <>
          <Label x={58} y={158} size={9.5}>
            {words[0]}
          </Label>
          <Label x={242} y={158} size={9.5}>
            {words[1]}
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/**
 * A sum set out on paper: the ones under the ones and the tens under the tens,
 * with whatever the working leaves above the numbers — a carried one, or the
 * number a digit becomes once a ten has been taken out of it — and the answer
 * under the rule.
 */
function PaperSum({
  cx,
  top,
  a,
  b,
  minus = false,
  size = 17,
  names = true,
  labels,
  named,
}: {
  cx: number;
  top: number;
  a: number;
  b: number;
  minus?: boolean;
  size?: number;
  names?: boolean;
  labels?: string[];
  named: boolean;
}) {
  const column = size * 1.7;
  const gap = 26;
  const total = minus ? a - b : a + b;
  const columns = Math.max(placeCount(a), placeCount(b), placeCount(total));
  const onesX = cx + ((columns - 1) / 2) * column;
  const colX = (place: number) => onesX - place * column;
  const bY = top + gap;
  const ruleY = bY + 14;
  const answerY = ruleY + gap;
  const places = labels?.length ? labels : ["ones", "tens", "hundreds", "thousands"];

  // What the working writes above each column, and which digits it strikes out.
  const above: (number | null)[] = Array.from({ length: columns }, () => null);
  const struck: boolean[] = Array.from({ length: columns }, () => false);

  if (minus) {
    let borrow = 0;
    for (let place = 0; place < columns; place += 1) {
      const carried = digitAt(a, place) - borrow;
      borrow = carried < digitAt(b, place) ? 1 : 0;
      const working = carried + borrow * 10;
      if (working !== digitAt(a, place)) {
        above[place] = working;
        struck[place] = true;
      }
    }
  } else {
    let carry = 0;
    for (let place = 0; place < columns; place += 1) {
      const sum = digitAt(a, place) + digitAt(b, place) + carry;
      carry = Math.floor(sum / 10);
      if (carry > 0 && place + 1 < columns) above[place + 1] = carry;
    }
  }

  return (
    <>
      {/* Four columns of digits leave no room for the place names: the drawing
          writes the sum and drops the words rather than let them touch. */}
      {named && names && columns <= 2
        ? places.slice(0, columns).map((place, index) => (
            <Label key={`place-${index}`} x={colX(index)} y={top - 52} size={9} tone="gray">
              {place}
            </Label>
          ))
        : null}

      {above.map((value, place) =>
        value === null ? null : (
          <Numeral
            key={`above-${place}`}
            x={colX(place)}
            y={top - (minus ? 17 : 26)}
            value={value}
            size={minus ? 10 : 9}
            tone="charcoal"
          />
        ),
      )}

      {struck.map((isStruck, place) =>
        isStruck ? (
          <Rule
            key={`strike-${place}`}
            from={[colX(place) - 6, top]}
            to={[colX(place) + 6, top]}
            tone="gray"
            width={1.2}
          />
        ) : null,
      )}

      {[a, b].map((value, row) => (
        <g key={`row-${row}`}>
          {Array.from({ length: placeCount(value) }, (_, place) => (
            <Numeral key={place} x={colX(place)} y={row === 0 ? top : bY} value={digitAt(value, place)} size={size} />
          ))}
        </g>
      ))}

      <Numeral x={colX(columns - 1) - column} y={bY} value={minus ? "−" : "+"} size={size} tone="charcoal" />

      <Rule from={[colX(columns - 1) - column * 0.8, ruleY]} to={[onesX + column * 0.55, ruleY]} tone="ink" width={1.6} />

      {/* The answer is what the plate is for, so the answer is the yellow. */}
      <Box
        x={colX(columns - 1) - column * 0.62}
        y={answerY - 13}
        width={(columns - 1) * column + column * 1.24}
        height={26}
        fill="yellow"
        radius={5}
      />
      {Array.from({ length: placeCount(total) }, (_, place) => (
        <Numeral key={`answer-${place}`} x={colX(place)} y={answerY} value={digitAt(total, place)} size={size} />
      ))}
    </>
  );
}

/** Two numbers added down the columns. */
function ColumnAdd({ numbers, labels, named = true }: FigureProps) {
  const a = whole(numbers?.[0], 48);
  const b = whole(numbers?.[1], 27);

  return (
    <FigurePlate
      label={`${a} plus ${b} set out in columns: ones under ones and tens under tens, the answer ${a + b} under the rule`}
    >
      <PaperSum cx={164} top={74} a={a} b={b} labels={labels} named={named} />
    </FigurePlate>
  );
}

/** One number taken from another down the columns. */
function ColumnSubtract({ numbers, labels, named = true }: FigureProps) {
  const handed = [whole(numbers?.[0], 52), whole(numbers?.[1], 27)];
  // The larger number is written on top, the way a difference is set out, so the
  // answer never has to be drawn below zero.
  const [top, bottom] = handed[0] >= handed[1] ? handed : [handed[1], handed[0]];

  return (
    <FigurePlate
      label={`${top} take away ${bottom} set out in columns, ones under ones and tens under tens, the answer ${top - bottom}`}
    >
      <PaperSum cx={164} top={74} a={top} b={bottom} minus labels={labels} named={named} />
    </FigurePlate>
  );
}

/** An amount of money and the same amount held as beads. */
function Money({ numbers, named = true }: FigureProps) {
  const amount = whole(numbers?.[0], 25, 99);
  const digits = [amount % 10, Math.floor(amount / 10)];
  const board = { x: 166, y: 32, width: 88, height: 104 };
  const geometry = boardGeometry(board.x, board.y, board.width, board.height, digits);

  return (
    <FigurePlate label={`${amount} as money, and the same amount held on the beads`}>
      {/* The one bright note: the amount itself, a coin with the number on it. */}
      <Dot cx={74} cy={92} r={42} fill="yellow" stroke="ink" />
      <circle cx={74} cy={92} r={33} fill="none" stroke={TONE.ink} strokeWidth={1} />
      <Numeral x={74} y={92} value={amount} size={30} />

      <Label x={140} y={92} size={20} tone="gray">
        =
      </Label>

      <Board {...board} digits={digits} />
      {digits.map((digit, rod) => (
        <Numeral
          key={rod}
          x={geometry.rodX(rod)}
          y={26}
          value={digit}
          size={11}
          tone={digit === 0 ? "gray" : "ink"}
        />
      ))}

      {named ? (
        <>
          <Label x={74} y={152} size={9} tone="gray">
            as money
          </Label>
          <Label x={210} y={152} size={9} tone="gray">
            as beads
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/** The same sum worked twice: down the columns, and on the beads. */
function CompareMethods({ numbers, labels, named = true }: FigureProps) {
  const a = whole(numbers?.[0], 48);
  const b = whole(numbers?.[1], 27);
  const total = a + b;
  const columns = Math.max(placeCount(a), placeCount(b), placeCount(total));
  // Smaller digits as the sum grows, so the paper half never reaches the board.
  const size = columns <= 2 ? 15 : columns <= 3 ? 13 : 11;
  const digits = String(total).split("").reverse().map(Number).slice(0, 5);
  const board = { x: 176, y: 26, width: 80, height: 84 };
  const geometry = boardGeometry(board.x, board.y, board.width, board.height, digits);
  const answer = String(total);
  const chipWidth = Math.max(44, answer.length * 9 + 16);
  const words = pairOf(labels, ["on paper", "on the beads"]);

  return (
    <FigurePlate
      label={`${a} plus ${b} worked twice: ${total} down the columns on paper, and ${total} on the beads`}
    >
      <PaperSum cx={106} top={48} a={a} b={b} size={size} names={false} named={named} />

      <Rule from={[160, 22]} to={[160, 158]} tone="gray" dashed width={1} />

      <Board {...board} digits={digits} />
      {digits.map((digit, rod) => (
        <Numeral
          key={rod}
          x={geometry.rodX(rod)}
          y={18}
          value={digit}
          size={11}
          tone={digit === 0 ? "gray" : "ink"}
        />
      ))}

      {/* The same answer the paper reached, so the same yellow. */}
      <Chip
        x={216 - chipWidth / 2}
        y={112}
        width={chipWidth}
        height={24}
        text={answer}
        size={14}
        fill="yellow"
        tone="ink"
      />

      {named ? (
        <>
          <Label x={106} y={152} size={9} tone="gray">
            {words[0]}
          </Label>
          <Label x={216} y={152} size={9} tone="gray">
            {words[1]}
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/**
 * The drawings this file owns, all of them named in `DIAGRAM_NAMES`.
 *
 *  - the numbers themselves: `number-line`
 *  - what a pair fills: `five-complement`, `ten-complement`
 *  - a ten crossing a rod, one way and the other: `carry-over`, `borrow-ten`
 *  - the working set out on paper: `column-add`, `column-subtract`
 *  - the amount, as money and as beads: `money`
 *  - the paper and the board, side by side: `compare-methods`
 */
export const arithmeticFigures = {
  "number-line": NumberLine,
  "five-complement": FiveComplement,
  "ten-complement": TenComplement,
  "carry-over": CarryOver,
  "borrow-ten": BorrowTen,
  "column-add": ColumnAdd,
  "column-subtract": ColumnSubtract,
  money: Money,
  "compare-methods": CompareMethods,
} satisfies Partial<Record<DiagramName, FigureComponent>>;
