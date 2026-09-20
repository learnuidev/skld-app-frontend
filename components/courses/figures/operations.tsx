import { Fragment } from "react";

import type { DiagramName } from "@/modules/course/types";

import {
  Arrow,
  Box,
  Chip,
  Dot,
  FigurePlate,
  Label,
  Numeral,
  Rule,
  type FigureComponent,
  type FigureProps,
} from "./kit";

/**
 * The drawings of the four ways numbers combine: an array that multiplies, the
 * table a single fact lives in, a pile shared into equal groups (and what is
 * left when it does not divide), a number squared and a root that falls between
 * two squares, a column that runs to its total, and the old Chinese climb of
 * adding 1 + 2 + 3 … up to a hundred. One idea per plate, yellow on the one
 * thing the words are about.
 */

/** A count a drawing was handed, or its own example, rounded and held inside
 * what a plate can actually show. */
function count(
  numbers: number[] | undefined,
  index: number,
  fallback: number,
  low: number,
  high: number,
): number {
  const handed = numbers?.[index];
  const wanted = typeof handed === "number" && Number.isFinite(handed) ? handed : fallback;
  return Math.min(high, Math.max(low, Math.round(wanted)));
}

/** A column of numbers a drawing was handed, or its own example, each one a
 * small whole number. */
function column(numbers: number[] | undefined, fallback: number[], most: number): number[] {
  const source = numbers?.length ? numbers : fallback;
  const kept = source
    .slice(0, most)
    .map((value) => (Number.isFinite(value) ? Math.min(99, Math.max(0, Math.round(value))) : 0));
  return kept.length ? kept : fallback;
}

/**
 * How many marks to a row: a handful reads best as one line, a bigger pile is
 * packed as squarely as its box allows. Keeps every pile countable.
 */
function perRow(count: number): number {
  if (count <= 5) return Math.max(1, count);
  if (count % 4 === 0) return 4;
  if (count % 3 === 0) return 3;
  if (count % 5 === 0) return 5;
  return Math.max(3, Math.round(Math.sqrt(count)));
}

/** A pile of dots packed into a box: equal groups, shared out. */
function DotPile({
  x,
  y,
  width,
  height,
  count: marks,
  fill = "ink",
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  count: number;
  fill?: "ink" | "charcoal" | "yellowDeep";
}) {
  if (marks <= 0) return null;

  const across = Math.min(marks, perRow(marks));
  const down = Math.ceil(marks / across);
  const step = Math.min(
    22,
    width / Math.max(1, across - 1),
    height / Math.max(1, down - 1),
  );
  const r = Math.min(5, step * 0.36);
  const left = x + (width - (across - 1) * step) / 2;
  const top = y + (height - (down - 1) * step) / 2;

  return (
    <>
      {Array.from({ length: down }, (_, row) => (
        <Fragment key={row}>
          {Array.from({ length: Math.min(across, marks - row * across) }, (_, col) => (
            <Dot
              key={col}
              cx={left + col * step}
              cy={top + row * step}
              r={r}
              fill={fill}
            />
          ))}
        </Fragment>
      ))}
    </>
  );
}

/**
 * A rows × columns array: dots while a line of them stays countable, small
 * blocks once it would not.
 */
function Marks({
  x,
  y,
  width,
  height,
  rows,
  columns,
  most = 18,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  rows: number;
  columns: number;
  most?: number;
}) {
  const step = Math.min(
    most,
    width / Math.max(1, columns - 1),
    height / Math.max(1, rows - 1),
  );
  const left = x + (width - (columns - 1) * step) / 2;
  const top = y + (height - (rows - 1) * step) / 2;
  const blocky = rows > 12 || columns > 12;
  const r = Math.min(4.6, step * 0.36);
  const side = step * 0.74;

  return (
    <>
      {Array.from({ length: rows }, (_, row) => (
        <Fragment key={row}>
          {Array.from({ length: columns }, (_, col) => {
            const cx = left + col * step;
            const cy = top + row * step;
            return blocky ? (
              <Box
                key={col}
                x={cx - side / 2}
                y={cy - side / 2}
                width={side}
                height={side}
                fill="ink"
                radius={1}
              />
            ) : (
              <Dot key={col} cx={cx} cy={cy} r={r} />
            );
          })}
        </Fragment>
      ))}
    </>
  );
}

/**
 * A small perfect square of dots — or of blocks, once the side is long enough
 * that its dots would smear into a patch.
 */
function MiniSquare({ cx, cy, side }: { cx: number; cy: number; side: number }) {
  const step = side > 1 ? Math.min(8, 30 / (side - 1)) : 0;
  const span = (side - 1) * step;
  const left = cx - span / 2;
  const top = cy - span / 2;

  if (side > 7) {
    const block = step * 0.78;
    return (
      <>
        {Array.from({ length: side }, (_, row) => (
          <Fragment key={row}>
            {Array.from({ length: side }, (_, col) => (
              <Box
                key={col}
                x={left + col * step - block / 2}
                y={top + row * step - block / 2}
                width={block}
                height={block}
                fill="charcoal"
                radius={0.5}
              />
            ))}
          </Fragment>
        ))}
      </>
    );
  }

  return (
    <>
      {Array.from({ length: side }, (_, row) => (
        <Fragment key={row}>
          {Array.from({ length: side }, (_, col) => (
            <Dot
              key={col}
              cx={left + col * step}
              cy={top + row * step}
              r={Math.min(2.6, Math.max(1.2, step * 0.34))}
              fill="charcoal"
            />
          ))}
        </Fragment>
      ))}
    </>
  );
}

/** Rows of dots, and the product they make written out beside them. */
function MultiplyArray({ numbers, named = true }: FigureProps) {
  const rows = count(numbers, 0, 3, 1, 24);
  const columns = count(numbers, 1, 4, 1, 24);
  const product = rows * columns;
  const sum = `${rows} × ${columns} = ${product}`;
  const chipWidth = Math.max(74, sum.length * 6.2 + 16);

  return (
    <FigurePlate
      label={`${rows} rows of ${columns} dots make ${product}: ${rows} times ${columns} is ${product}`}
    >
      <Marks x={22} y={28} width={150} height={122} rows={rows} columns={columns} />

      {named ? (
        <Label x={248} y={66} size={9} tone="gray">
          {rows} rows of {columns}
        </Label>
      ) : null}

      {/* The product, on the one quiet wash: the answer the plate is about. */}
      <Chip
        x={248 - chipWidth / 2}
        y={80}
        width={chipWidth}
        height={24}
        text={sum}
        fill="butter"
      />

      {named ? (
        <Label x={248} y={122} size={9} tone="gray">
          dots altogether
        </Label>
      ) : null}
    </FigurePlate>
  );
}

/** The whole times table, with the one square a fact lives in shaded. */
function MultiplyTable({ numbers, named = true }: FigureProps) {
  const row = count(numbers, 0, 4, 1, 9);
  const pick = count(numbers, 1, 7, 1, 9);
  const cell = 15;
  const grid = { x: 40, y: 34, size: cell * 9 };
  const fact = `${row} × ${pick}`;

  return (
    <FigurePlate
      label={`A nine by nine times table with the square where ${row} times ${pick} lives shaded: ${fact} is ${row * pick}`}
    >
      <Box
        x={grid.x + (pick - 1) * cell}
        y={grid.y + (row - 1) * cell}
        width={cell}
        height={cell}
        fill="butter"
        stroke="yellowDeep"
        radius={3}
      />

      {Array.from({ length: 10 }, (_, line) => (
        <Fragment key={line}>
          <Rule
            from={[grid.x + line * cell, grid.y]}
            to={[grid.x + line * cell, grid.y + grid.size]}
            tone="gray"
            width={1}
            opacity={0.7}
          />
          <Rule
            from={[grid.x, grid.y + line * cell]}
            to={[grid.x + grid.size, grid.y + line * cell]}
            tone="gray"
            width={1}
            opacity={0.7}
          />
        </Fragment>
      ))}

      <Box x={grid.x} y={grid.y} width={grid.size} height={grid.size} stroke="charcoal" radius={2} />

      {Array.from({ length: 9 }, (_, i) => (
        <Fragment key={i}>
          <Numeral
            x={grid.x + (i + 0.5) * cell}
            y={grid.y - 9}
            value={i + 1}
            size={8.5}
            tone={i + 1 === pick ? "ink" : "gray"}
            weight={i + 1 === pick ? 700 : 500}
          />
          <Numeral
            x={grid.x - 9}
            y={grid.y + (i + 0.5) * cell}
            value={i + 1}
            size={8.5}
            anchor="end"
            tone={i + 1 === row ? "ink" : "gray"}
            weight={i + 1 === row ? 700 : 500}
          />
        </Fragment>
      ))}

      <Numeral x={248} y={58} value={fact} size={15} />
      <Numeral x={248} y={90} value={`= ${row * pick}`} size={26} />

      {named ? (
        <>
          <Label x={248} y={118} size={9} tone="gray">
            row {row}, column {pick}
          </Label>
          <Label x={248} y={134} size={9} tone="gray">
            meet in one square
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/** A pile shared into equal groups, and how many each group is handed. */
function DivideShare({ numbers, named = true }: FigureProps) {
  const total = count(numbers, 0, 12, 1, 36);
  const groups = Math.min(count(numbers, 1, 3, 1, 6), total);
  const each = Math.floor(total / groups);
  const sum = `${total} ÷ ${groups} = ${each}`;
  const chipWidth = Math.max(78, sum.length * 6.2 + 16);

  const across = Math.min(groups, 3);
  const down = Math.ceil(groups / across);
  const boxWidth = Math.min(104, (284 - 10 * (across - 1)) / across);
  const boxHeight = down === 1 ? 60 : 50;
  const region = 118;
  const block = down * boxHeight + (down - 1) * 10;
  const top = 26 + (region - block) / 2;

  return (
    <FigurePlate
      label={`${total} dots shared into ${groups} equal groups, so each group holds ${each}`}
    >
      {named ? (
        <Label x={160} y={17} size={9} tone="gray">
          shared into {groups} equal groups
        </Label>
      ) : null}

      {Array.from({ length: groups }, (_, group) => {
        const row = Math.floor(group / across);
        const inRow = Math.min(across, groups - row * across);
        const rowWidth = inRow * boxWidth + (inRow - 1) * 10;
        const x = 160 - rowWidth / 2 + (group % across) * (boxWidth + 10);
        const y = top + row * (boxHeight + 10);

        return (
          <Fragment key={group}>
            <Box x={x} y={y} width={boxWidth} height={boxHeight} fill="paper" stroke="charcoal" radius={8} />
            <DotPile
              x={x + 12}
              y={y + 12}
              width={boxWidth - 24}
              height={boxHeight - 24}
              count={each}
            />
          </Fragment>
        );
      })}

      <Chip
        x={160 - chipWidth / 2}
        y={150}
        width={chipWidth}
        height={22}
        text={sum}
        fill="butter"
      />
    </FigurePlate>
  );
}

/** The same sharing, with what will not divide set apart and counted. */
function Remainder({ numbers, named = true }: FigureProps) {
  const total = count(numbers, 0, 13, 2, 36);
  const groups = Math.min(count(numbers, 1, 3, 1, 5), total - 1);
  const each = Math.floor(total / groups);
  const left = total - groups * each;

  const boxWidth = Math.min(64, (288 - 8 * (groups - 1)) / groups);
  const rowWidth = groups * boxWidth + 8 * (groups - 1);
  const first = 160 - rowWidth / 2;

  return (
    <FigurePlate
      label={`${total} shared into ${groups} equal groups of ${each}, leaving ${left} over`}
    >
      {named ? (
        <Label x={160} y={16} size={9} tone="gray">
          {groups} equal groups
        </Label>
      ) : null}

      {Array.from({ length: groups }, (_, group) => {
        const x = first + group * (boxWidth + 8);
        return (
          <Fragment key={group}>
            <Box x={x} y={24} width={boxWidth} height={52} fill="paper" stroke="charcoal" radius={7} />
            <DotPile x={x + 10} y={34} width={boxWidth - 20} height={32} count={each} />
          </Fragment>
        );
      })}

      {/* The leftovers, drawn apart and marked: the one thing this plate is about. */}
      <Box x={18} y={102} width={78} height={48} stroke="yellowDeep" dashed radius={8} />
      {left > 0 ? (
        <DotPile x={30} y={114} width={54} height={24} count={left} fill="yellowDeep" />
      ) : (
        <Numeral x={57} y={126} value={0} size={16} tone="yellowDeep" />
      )}

      {named ? (
        <Label x={57} y={162} size={9} tone="gray">
          left over
        </Label>
      ) : null}

      <Numeral x={232} y={104} value={`${total} ÷ ${groups} = ${each}`} size={13} />
      {named ? (
        <Label x={232} y={128} size={9} tone="gray">
          remainder
        </Label>
      ) : null}
      <Numeral x={232} y={152} value={left} size={24} tone="yellowDeep" />
    </FigurePlate>
  );
}

/** A number multiplied by itself: a square of dots holding the square's value. */
function SquareGrid({ numbers, named = true }: FigureProps) {
  const side = count(numbers, 0, 6, 1, 24);
  const value = side * side;
  const sum = `${side} × ${side} = ${value}`;
  const chipWidth = Math.max(78, sum.length * 6.2 + 16);

  return (
    <FigurePlate
      label={`A square of ${side} by ${side} dots, ${value} altogether: ${side} times ${side} is ${value}`}
    >
      <Marks x={24} y={28} width={140} height={124} rows={side} columns={side} most={18} />

      <Arrow from={[172, 92]} to={[190, 92]} tone="gray" dashed />

      {named ? (
        <Label x={248} y={64} size={9} tone="gray">
          {side} by {side}
        </Label>
      ) : null}

      <Chip
        x={248 - chipWidth / 2}
        y={80}
        width={chipWidth}
        height={24}
        text={sum}
        fill="butter"
      />

      {named ? (
        <Label x={248} y={122} size={9} tone="gray">
          every dot in the square
        </Label>
      ) : null}
    </FigurePlate>
  );
}

/** A square root that is not a whole number, on the line between two that are. */
function RootBetween({ numbers, named = true }: FigureProps) {
  const under = count(numbers, 0, 20, 2, 99);
  const low = Math.floor(Math.sqrt(under));
  const high = low + 1;
  const exact = low * low === under;
  const line = { from: 44, to: 276, y: 118 };
  const share = exact ? 0 : (under - low * low) / (high * high - low * low);
  const mark = line.from + share * (line.to - line.from);

  return (
    <FigurePlate
      label={`The square root of ${under}: it sits between ${low * low} and ${high * high}, the two whole squares either side of it`}
    >
      <MiniSquare cx={52} cy={52} side={low} />
      <MiniSquare cx={268} cy={52} side={high} />

      <Numeral x={44} y={92} value={`${low}² = ${low * low}`} size={10} />
      <Numeral x={276} y={92} value={`${high}² = ${high * high}`} size={10} />

      <Rule from={[line.from, line.y]} to={[line.to, line.y]} tone="gray" width={1.6} />
      <Dot cx={line.from} cy={line.y} r={3.5} />
      <Dot cx={line.to} cy={line.y} r={3.5} />

      <Rule
        from={[mark, line.y - 6]}
        to={[mark, 134]}
        tone="yellowDeep"
        width={1.2}
        dashed
        opacity={0.85}
      />
      <Dot cx={mark} cy={line.y} r={5.5} fill="yellowDeep" />
      <Numeral x={mark} y={146} value={`√${under}`} size={14} />

      {named ? (
        <Label x={160} y={166} size={10} tone="gray">
          {exact ? `√${under} = ${low}` : `${low} < √${under} < ${high}`}
        </Label>
      ) : null}
    </FigurePlate>
  );
}

/** A column of numbers, with the total each step runs to beside it. */
function RunningTotal({ numbers, named = true }: FigureProps) {
  const addends = column(numbers, [7, 5, 8], 6);
  const running = addends.reduce<number[]>((totals, addend) => {
    totals.push((totals[totals.length - 1] ?? 0) + addend);
    return totals;
  }, []);
  const total = running[running.length - 1];
  const gap = Math.min(28, 92 / Math.max(1, addends.length - 1));
  const first = 48 + (92 - (addends.length - 1) * gap) / 2;

  return (
    <FigurePlate
      label={`Adding ${addends.join(" plus ")} a step at a time, so the running total climbs to ${total}`}
    >
      {named ? (
        <>
          <Label x={132} y={22} size={9} tone="gray" anchor="end">
            the numbers
          </Label>
          <Label x={214} y={22} size={9} tone="gray">
            running total
          </Label>
        </>
      ) : null}

      {addends.map((addend, step) => {
        const y = first + step * gap;
        const last = step === addends.length - 1;
        return (
          <Fragment key={step}>
            <Numeral x={132} y={y} value={addend} size={15} anchor="end" />
            <Rule
              from={[142, y]}
              to={[180, y]}
              tone="gray"
              width={1}
              dashed
              opacity={0.65}
            />
            {last ? (
              <Box x={184} y={y - 10} width={60} height={20} fill="butter" radius={10} />
            ) : null}
            <Numeral
              x={214}
              y={y}
              value={running[step]}
              size={last ? 16 : 15}
              tone={last ? "ink" : "charcoal"}
              weight={last ? 700 : 500}
            />
          </Fragment>
        );
      })}

      <Numeral x={160} y={166} value={`${addends.join(" + ")} = ${total}`} size={11} />
    </FigurePlate>
  );
}

/** The old drill: adding 1, then 2, then 3 … all the way to the last number. */
function DaBaizi({ numbers, named = true }: FigureProps) {
  const last = count(numbers, 0, 100, 3, 999);
  const total = (last * (last + 1)) / 2;
  const steps = Math.min(10, last);
  const gap = 5;
  const barWidth = Math.min(30, (252 - gap * (steps - 1)) / steps);
  const rowWidth = steps * barWidth + gap * (steps - 1);
  const left = 160 - rowWidth / 2;
  const base = 126;
  const tall = 76;

  return (
    <FigurePlate
      label={`The Chinese drill: adding one, then two, then three and on up to ${last}, a climb that runs to ${total}`}
    >
      <Numeral x={160} y={26} value={`1 + 2 + 3 + … + ${last}`} size={12} tone="charcoal" />

      {Array.from({ length: steps }, (_, step) => {
        const value = Math.round((last * (step + 1)) / steps);
        const height = Math.max(4, (tall * value) / last);
        const x = left + step * (barWidth + gap);
        return (
          <Box
            key={step}
            x={x}
            y={base - height}
            width={barWidth}
            height={height}
            fill={step === steps - 1 ? "yellow" : "charcoal"}
            radius={2}
          />
        );
      })}

      <Rule
        from={[Math.max(28, left - 16), base]}
        to={[Math.min(292, left + rowWidth + 16), base]}
        tone="gray"
        width={1.6}
      />

      <Numeral x={left + barWidth / 2} y={134} value={1} size={9} tone="gray" />
      <Numeral x={left + rowWidth - barWidth / 2} y={134} value={last} size={9} tone="gray" />

      <Numeral x={160} y={150} value={total} size={20} />
      {named ? (
        <Label x={160} y={166} size={9} tone="gray">
          the whole climb
        </Label>
      ) : null}
    </FigurePlate>
  );
}

export const operationsFigures = {
  "multiply-array": MultiplyArray,
  "multiply-table": MultiplyTable,
  "divide-share": DivideShare,
  remainder: Remainder,
  "square-grid": SquareGrid,
  "root-between": RootBetween,
  "running-total": RunningTotal,
  "da-baizi": DaBaizi,
} satisfies Partial<Record<DiagramName, FigureComponent>>;
