import type { DiagramName } from "@/modules/course/types";

import {
  Arrow,
  Board,
  Box,
  Chip,
  FigurePlate,
  Label,
  Numeral,
  Rule,
  TONE,
  boardGeometry,
  boardValue,
  type FigureComponent,
  type FigureProps,
  type Tone,
} from "./kit";

/**
 * The drawings of the Chinese course: the characters a number is written with,
 * the places 个十百千万亿兆, the 口诀 a learner chants, the suanpan beside the
 * soroban, and the two ways of working without a board — 看心算 from what you
 * see, 听心算 from what you hear. One idea per plate.
 *
 * The characters are drawn as text, the same as every other word on these
 * plates: the course already writes 珠心算, 算盘 and 口诀 in its lesson text, so
 * a drawing that sets 万 beside 10000 says the thing the lesson says. A
 * character a drawing is *about* — 一, 万, 零, 个 — is never set below 14, which
 * is where, on the plate and in a lesson card, it stops being a smudge.
 */

/** The digits a drawing was handed, or its own example, clamped to a rod. */
function digitsOf(numbers: number[] | undefined, fallback: number[], rods: number): number[] {
  const source = numbers?.length ? numbers : fallback;
  return source.slice(0, rods).map((digit) => Math.min(9, Math.max(0, Math.round(digit))));
}

/** A written value as rods, units first — what a board would show. */
function rodsOf(value: number, rods: number): number[] {
  return String(Math.max(0, Math.round(value)))
    .split("")
    .reverse()
    .slice(0, rods)
    .map((digit) => Number(digit));
}

/** A board's rods, with cleared rods added so the frame always reads as a board
 * rather than as one lonely rod. A cleared rod changes no number. */
function boardRods(digits: number[], least: number): number[] {
  const rods = [...digits];
  while (rods.length < Math.min(least, 6)) rods.push(0);
  return rods;
}

/** A whole number, held inside a range a plate can draw. */
function valueOf(number: number | undefined, fallback: number, max: number): number {
  if (number === undefined || !Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(0, Math.round(number)));
}

const CN_DIGIT = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
/** 十百千 — the places inside one group of four. */
const CN_PLACE = ["", "十", "百", "千"];
/** The ladder of places, units first. */
const PLACES = ["个", "十", "百", "千", "万", "亿", "兆"];
/** The name a whole group of four takes, counted from the right. */
const GROUP_NAME = ["", "万", "亿", "兆"];

const CJK = /[\u3000-\u303f\u3400-\u9fff\uff00-\uffef]/;

/** The largest size a line may be drawn at and still fit the room it is given.
 * A Chinese character takes a full em and a Latin one about six tenths of it,
 * so a run of characters is measured before it is placed. */
function fitSize(text: string, room: number, max: number, min = 7): number {
  const em = CJK.test(text) ? 1 : 0.62;
  return Math.max(min, Math.min(max, room / Math.max(1, text.length) / em));
}

/**
 * A group of at most four digits said aloud, units first: 二千八百零五. A run
 * of empty places is said once, with a single 零, and a lone ten is 十 and not
 * 一十 — the two rules the Chinese reading turns on.
 */
function readGroup(digits: number[]): string {
  let said = "";
  let zeroWaiting = false;

  for (let place = digits.length - 1; place >= 0; place -= 1) {
    const digit = digits[place];
    if (digit === 0) {
      if (said) zeroWaiting = true;
      continue;
    }
    if (zeroWaiting) {
      said += CN_DIGIT[0];
      zeroWaiting = false;
    }
    const lone = place === 1 && digit === 1 && said === "";
    said += (lone ? "" : CN_DIGIT[digit]) + CN_PLACE[place];
  }

  return said || CN_DIGIT[0];
}

/** A character beside the digit it stands for: 一 = 1. */
function Numerals({ numbers, labels, named = true }: FigureProps) {
  const values = digitsOf(numbers, [1, 2, 3], 3);
  const words = (labels?.length ? labels : values.map((digit) => CN_DIGIT[digit])).slice(0, 3);
  const pairs = Math.max(1, Math.min(values.length, words.length));

  return (
    <FigurePlate
      label={`The Chinese characters ${words.slice(0, pairs).join(" ")} beside the digits ${values
        .slice(0, pairs)
        .join(" ")} they stand for`}
    >
      {named ? (
        <Label x={160} y={26} size={9} tone="gray">
          one character, one digit — the same number twice
        </Label>
      ) : null}

      {Array.from({ length: pairs }, (_, index) => {
        const cx = 160 + (index - (pairs - 1) / 2) * 104;
        const word = words[index];
        return (
          <g key={index}>
            <Box x={cx - 48} y={46} width={96} height={78} fill="paper" stroke="gray" radius={10} />
            <Label x={cx - 26} y={85} size={fitSize(word, 32, 30, 10)} tone="ink" weight={600}>
              {word}
            </Label>
            <Label x={cx + 2} y={85} size={12} tone="gray">
              =
            </Label>
            <Numeral x={cx + 28} y={85} value={values[index]} size={24} />
          </g>
        );
      })}

      {named ? (
        <Label x={160} y={146} size={9} tone="gray">
          the character is read as the digit
        </Label>
      ) : null}
    </FigurePlate>
  );
}

/** 万 beside the number it stands for, with the four zeros it saves marked. */
function Wan({ numbers, named = true }: FigureProps) {
  const value = valueOf(numbers?.[0], 10000, 99999999);
  const written = String(value);
  const zeros = written.length - written.replace(/0+$/, "").length;
  const counted = zeros > 0 && value >= 10000;
  const share = value >= 10000 && value % 10000 === 0 && value / 10000 <= 99 ? value / 10000 : null;

  const start = 132;
  const span = 304 - start;
  const cell = span / written.length;
  const size = Math.min(26, cell * 0.82);
  const zerosLeft = start + cell * (written.length - zeros);

  return (
    <FigurePlate
      label={`万, ten thousand, beside the number ${value} written out in full`}
    >
      {share === null ? (
        <Label x={66} y={84} size={52} tone="ink" weight={600}>
          万
        </Label>
      ) : (
        <>
          <Numeral x={72} y={84} value={share} size={30} anchor="end" />
          <Label x={76} y={84} size={30} tone="ink" weight={600} anchor="start">
            万
          </Label>
        </>
      )}

      <Rule from={[118, 40]} to={[118, 132]} tone="gray" width={1} dashed />

      {counted ? (
        <Box
          x={zerosLeft - 4}
          y={61}
          width={308 - zerosLeft}
          height={46}
          fill="butter"
          stroke="yellowDeep"
          radius={8}
        />
      ) : null}

      {written.split("").map((digit, index) => (
        <Numeral key={index} x={start + cell * (index + 0.5)} y={84} value={digit} size={size} />
      ))}

      {named ? (
        <>
          <Label x={60} y={130} size={9} tone="gray">
            万 = ten thousand
          </Label>
          {counted ? (
            <Label x={(zerosLeft + 304) / 2} y={40} size={9} tone="gray">
              the zeros 万 stands for
            </Label>
          ) : null}
        </>
      ) : null}
    </FigurePlate>
  );
}

/** The seven places as a staircase: 个 at the foot, 兆 at the top left. */
function UnitLadder({ labels, named = true }: FigureProps) {
  const places = (labels?.length ? labels : PLACES).slice(0, 7);
  const step = 42;
  const width = 38;
  const total = places.length * step - (step - width);
  const left = (320 - total) / 2;
  const top = (index: number) => 146 - 15 * index;
  const chipX = (index: number) => left + (places.length - 1 - index) * step;

  return (
    <FigurePlate label={`The places climbing from the units: ${places.join(", ")}`}>
      {named ? (
        <Label x={160} y={28} size={9} tone="gray">
          each step to the left is ten times the one before
        </Label>
      ) : null}

      {/* The climb itself: one dashed line the chips are threaded on. */}
      <Rule
        from={[chipX(places.length - 1) + width / 2, top(places.length - 1) + 12]}
        to={[chipX(0) + width / 2, top(0) + 12]}
        tone="gray"
        width={1}
        dashed
      />

      {places.map((place, index) => (
        <g key={index}>
          <Box
            x={chipX(index)}
            y={top(index)}
            width={width}
            height={24}
            radius={7}
            fill={index === 0 ? "butter" : "paper"}
            stroke={index === 0 ? "yellowDeep" : "gray"}
          />
          <Label
            x={chipX(index) + width / 2}
            y={top(index) + 12}
            size={fitSize(place, width - 8, 15, 8)}
            tone="ink"
            weight={600}
          >
            {place}
          </Label>
        </g>
      ))}
    </FigurePlate>
  );
}

/** A number cut into fours from the right, each group taking its own name. */
function GroupsOfFour({ numbers, named = true }: FigureProps) {
  const digits = digitsOf(numbers, [3, 4, 0, 6, 2, 1], 6);
  const count = digits.length;
  const cell = 40;
  const gap = 14;
  const groups = Math.ceil(count / 4);
  const total = count * cell + (groups - 1) * gap;
  const left = (320 - total) / 2;
  /** Rods counted from the units, which sits at the right-hand end. */
  const x = (rod: number) => left + total - cell / 2 - rod * cell - Math.floor(rod / 4) * gap;

  const read = Array.from({ length: groups }, (_, index) => {
    const rods = digits
      .slice(index * 4, index * 4 + 4)
      .reverse()
      .join("");
    return `${rods}${GROUP_NAME[index] ?? ""}`;
  })
    .reverse()
    .join("");

  return (
    <FigurePlate
      label={`The digits ${digits.slice().reverse().join("")} split into groups of four from the right, named 万, 亿 and 兆`}
    >
      {named ? (
        <Label x={160} y={24} size={9} tone="gray">
          every four digits take a name, counted from the right
        </Label>
      ) : null}

      {Array.from({ length: groups }, (_, index) => {
        const first = index * 4;
        const last = Math.min(first + 3, count - 1);
        const name = GROUP_NAME[index];

        return (
          <g key={index}>
            {/* One bar under each four: the bar is the group. */}
            <Rule from={[x(last) - 22, 104]} to={[x(first) + 22, 104]} tone="charcoal" width={1.4} />
            {name ? (
              <Chip
                x={(x(first) + x(last)) / 2 - 17}
                y={44}
                width={34}
                height={20}
                text={name}
                size={12}
                fill="butter"
              />
            ) : null}
          </g>
        );
      })}

      {digits.map((digit, rod) => (
        <Numeral key={rod} x={x(rod)} y={84} value={digit} size={26} />
      ))}

      {named ? (
        <Label x={160} y={140} size={16} tone="ink" weight={600}>
          {read}
        </Label>
      ) : null}
    </FigurePlate>
  );
}

/** 零 standing where a place inside a group of four is empty. */
function ZeroInGroup({ numbers, named = true }: FigureProps) {
  const digits = digitsOf(numbers, [5, 0, 8, 2], 4);
  const count = digits.length;
  const cell = 56;
  const left = 160 - (count * cell) / 2;
  /** Rods counted from the units, which sits at the right-hand end. */
  const x = (rod: number) => left + cell / 2 + (count - 1 - rod) * cell;
  const emptyRod = digits.findIndex((digit) => digit === 0);
  const empty = emptyRod < 0 ? null : x(emptyRod);

  return (
    <FigurePlate
      label={`A group of digits read aloud, with 零 standing in for the empty place: ${readGroup(digits)}`}
    >
      {named && empty !== null ? (
        <Label x={160} y={18} size={9} tone="gray">
          an empty place is read 零
        </Label>
      ) : null}

      {empty === null ? null : (
        <>
          <Label x={empty} y={42} size={24} tone="ink" weight={600}>
            零
          </Label>
          <Arrow from={[empty, 57]} to={[empty, 69]} tone="charcoal" head={4} />
          <Box x={empty - 26} y={72} width={52} height={52} fill="butter" stroke="yellowDeep" radius={8} />
        </>
      )}

      {digits.map((digit, rod) => (
        <Numeral key={rod} x={x(rod)} y={104} value={digit} size={30} />
      ))}

      <Rule from={[left + 10, 128]} to={[left + count * cell - 10, 128]} tone="charcoal" width={1.4} />

      {named ? (
        <Label x={160} y={152} size={16} tone="ink" weight={600}>
          {readGroup(digits)}
        </Label>
      ) : null}
    </FigurePlate>
  );
}

/** The card of spoken formulas a learner chants while the beads move. */
function Koujue({ labels, named = true }: FigureProps) {
  const lines = (labels?.length ? labels : ["一下五去四", "一去九进一"]).slice(0, 3);
  const longest = lines.reduce((a, b) => (b.length > a.length ? b : a), "");
  const size = fitSize(longest, 198, 22, 9);
  const y = (index: number) => 107 + (index - (lines.length - 1) / 2) * 32;

  return (
    <FigurePlate label={`口诀: the spoken formulas ${lines.join("; ")}`}>
      <Box x={40} y={20} width={240} height={136} fill="paper" stroke="gray" radius={12} />

      {named ? (
        <>
          <Chip x={137} y={30} width={46} height={20} text="口诀" size={11} fill="butter" />
          <Rule from={[64, 58]} to={[256, 58]} tone="gray" width={1} opacity={0.6} />
        </>
      ) : null}

      {lines.map((line, index) => (
        <Label key={index} x={160} y={y(index)} size={size} tone="ink" weight={600}>
          {line}
        </Label>
      ))}
    </FigurePlate>
  );
}

/**
 * A board drawn the Chinese way — bead counts handed in, beads as the rounded
 * blocks the course art draws — so this plate and the `suanpan` artwork read as
 * one object: black frame, grey rods, a pale beam, bright heaven beads and the
 * deeper yellow of the Chinese board's earth beads.
 */
function WideBoard({
  x,
  y,
  width,
  height,
  digits,
  heaven,
  earth,
  heavenFill,
  earthFill,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  digits: number[];
  heaven: number;
  earth: number;
  heavenFill: Tone;
  earthFill: Tone;
}) {
  const pad = 6;
  const rods = Math.max(1, digits.length);
  const top = y + pad;
  const bottom = y + height - pad;
  const beamY = top + (bottom - top) * 0.3;
  const beamH = 4;
  const beadH = 10.5;
  const beadGap = 2;
  const rodGap = (width - pad * 2) / rods;
  const beadW = Math.min(22, rodGap * 0.64);
  const rodX = (rod: number) => x + pad + rodGap / 2 + (rods - 1 - rod) * rodGap;
  const bead = (cx: number, cy: number, fill: Tone, key: string) => (
    <rect
      key={key}
      x={cx - beadW / 2}
      y={cy}
      width={beadW}
      height={beadH}
      rx={beadH / 2.2}
      fill={TONE[fill]}
    />
  );

  return (
    <>
      <rect x={x} y={y} width={width} height={height} rx={Math.max(6, height * 0.14)} fill={TONE.ink} />

      {digits.map((_, rod) => (
        <line
          key={`rod-${rod}`}
          x1={rodX(rod)}
          y1={top}
          x2={rodX(rod)}
          y2={bottom}
          stroke={TONE.gray}
          strokeWidth={1.6}
          opacity={0.5}
        />
      ))}

      <rect
        x={x + pad}
        y={beamY}
        width={width - pad * 2}
        height={beamH}
        rx={beamH / 2}
        fill={TONE.butter}
      />

      {digits.map((digit, rod) => {
        const cx = rodX(rod);
        const down = digit >= 5 ? 1 : 0;
        const up = digit % 5;

        return (
          <g key={`beads-${rod}`}>
            {Array.from({ length: heaven }, (_, index) => {
              const counted = index >= heaven - down;
              const cy = counted ? beamY - beadGap - beadH : top + index * (beadH + beadGap);
              return bead(cx, cy, counted ? heavenFill : "charcoal", `heaven-${index}`);
            })}
            {Array.from({ length: earth }, (_, index) => {
              const counted = index < up;
              const cy = counted
                ? beamY + beamH + beadGap + index * (beadH + beadGap)
                : bottom - beadH - (earth - 1 - index) * (beadH + beadGap);
              return bead(cx, cy, counted ? earthFill : "charcoal", `earth-${index}`);
            })}
          </g>
        );
      })}
    </>
  );
}

/** The suanpan of two-and-five beside the soroban of one-and-four, one number. */
function ChineseBoard({ numbers, named = true }: FigureProps) {
  // Four rods keep the beads round enough to tell apart at card size.
  const digits = digitsOf(numbers, [4, 3, 2], 4);
  const board = { width: 112, height: 110, y: 30 };

  return (
    <FigurePlate
      label={`The suanpan, two heaven beads and five earth beads on every rod, beside the soroban with one and four — both holding ${boardValue(digits)}`}
    >
      <WideBoard
        x={26}
        {...board}
        digits={digits}
        heaven={2}
        earth={5}
        heavenFill="yellow"
        earthFill="yellowDeep"
      />
      <WideBoard
        x={182}
        {...board}
        digits={digits}
        heaven={1}
        earth={4}
        heavenFill="yellow"
        earthFill="paper"
      />

      <Label x={160} y={84} size={20} tone="gray">
        =
      </Label>

      {named ? (
        <>
          <Numeral x={160} y={112} value={boardValue(digits)} size={12} tone="charcoal" />
          <Label x={82} y={152} size={12} tone="ink">
            算盘
          </Label>
          <Label x={82} y={166} size={8} tone="gray">
            two above, five below
          </Label>
          <Label x={238} y={152} size={12} tone="ink">
            soroban
          </Label>
          <Label x={238} y={166} size={8} tone="gray">
            one above, four below
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/**
 * The two fingers, drawn as marks on the board rather than as a hand: 食指
 * coming down onto the heaven bead, 拇指 coming up under the earth beads. The
 * board is drawn compact, with the heaven bead already down at the beam, so
 * both marks have bare rod to stand on.
 */
function Fingers({ named = true }: FigureProps) {
  const digits = [7, 0];
  const board = { x: 44, y: 14, width: 88, height: 140 };
  const geometry = boardGeometry(board.x, board.y, board.width, board.height, digits);
  const rod = geometry.rodX(0);
  const r = geometry.r;
  const heavenHead = geometry.heavenCy(0) - r - 4;
  const earthFoot = geometry.earthCy(0, 1) + r + 3;
  const finger = { width: 14, length: 30, radius: 7 };

  return (
    <FigurePlate label="The index finger pushing the heaven bead down at the beam, and the thumb pushing the earth beads up">
      <Board {...board} digits={digits} compact />

      {/* 食指: a finger coming down from above onto the heaven bead. */}
      <Box
        x={rod - finger.width / 2}
        y={heavenHead - finger.length}
        width={finger.width}
        height={finger.length}
        radius={finger.radius}
        fill="butter"
        stroke="yellowDeep"
      />

      {/* 拇指: a thumb coming up from below into the earth beads. */}
      <Box
        x={rod - finger.width / 2}
        y={earthFoot}
        width={finger.width}
        height={finger.length}
        radius={finger.radius}
        fill="butter"
        stroke="yellowDeep"
      />

      {named ? (
        <>
          <Label x={138} y={heavenHead - finger.length / 2} size={14} tone="ink" weight={600} anchor="start">
            食指
          </Label>
          <Label x={138} y={heavenHead - finger.length / 2 + 15} size={8.5} tone="gray" anchor="start">
            index pushes the heaven bead down
          </Label>
          <Label x={138} y={earthFoot + finger.length / 2} size={14} tone="ink" weight={600} anchor="start">
            拇指
          </Label>
          <Label x={138} y={earthFoot + finger.length / 2 + 15} size={8.5} tone="gray" anchor="start">
            the thumb pushes the earth beads up
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/** 看心算: the number is read off the page straight onto a board in the mind. */
function KanXinsuan({ numbers, named = true }: FigureProps) {
  const digits = digitsOf(numbers, [4, 3, 2], 5);
  const value = boardValue(digits);
  const written = String(value);

  return (
    <FigurePlate
      label={`看心算, mental arithmetic from what you see: the number ${value} read straight onto a board in the mind`}
    >
      {named ? (
        <Label x={36} y={24} size={14} tone="ink" weight={600}>
          看心算
        </Label>
      ) : null}

      <Box x={26} y={54} width={96} height={72} fill="butter" stroke="yellowDeep" radius={10} />
      <Numeral x={74} y={90} value={written} size={fitSize(written, 76, 32, 12)} />

      <Arrow from={[132, 90]} to={[168, 90]} tone="charcoal" />

      <Board x={180} y={42} width={112} height={104} digits={boardRods(digits, 3)} ghost />

      {named ? (
        <>
          <Label x={78} y={42} size={9} tone="gray">
            what you see
          </Label>
          <Label x={237} y={28} size={9} tone="gray">
            the board in your head
          </Label>
          <Label x={160} y={164} size={9} tone="gray">
            the number read straight onto the mental board
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

/** 听心算: the numbers arrive as sound, and the board keeps the running total. */
function TingXinsuan({ numbers, named = true }: FigureProps) {
  const heard = (numbers?.length ? numbers : [7, 5, 8])
    .slice(0, 4)
    .map((number) => valueOf(number, 0, 999));
  const count = heard.length;
  const spacing = count > 1 ? Math.min(36, 81 / (count - 1)) : 36;
  const x = (index: number) => 62 + index * spacing;
  const total = heard.reduce((sum, number) => sum + number, 0);
  const digits = rodsOf(total, 6);

  return (
    <FigurePlate
      label={`听心算, mental arithmetic from what you hear: the numbers ${heard.join(
        ", ",
      )} heard once and held as ${total} on a board in the mind`}
    >
      {named ? (
        <Label x={36} y={26} size={14} tone="ink" weight={600}>
          听心算
        </Label>
      ) : null}

      {/* The sound the numbers arrive on: three rays, no writing. */}
      {[9, 15, 21].map((radius) => (
        <path
          key={radius}
          d={`M ${24 + radius * 0.62} ${90 - radius * 0.78} A ${radius} ${radius} 0 0 1 ${
            24 + radius * 0.62
          } ${90 + radius * 0.78}`}
          fill="none"
          stroke={TONE.charcoal}
          strokeWidth={1.4}
          strokeLinecap="round"
        />
      ))}

      <Rule from={[56, 112]} to={[x(count - 1) + 14, 112]} tone="gray" width={1} dashed />

      {heard.map((number, index) => (
        <g key={index}>
          <Numeral
            x={x(index)}
            y={90}
            value={number}
            size={fitSize(String(number), spacing * 0.92, 22, 9)}
          />
          <Rule from={[x(index), 106]} to={[x(index), 118]} tone="charcoal" width={1.4} />
        </g>
      ))}

      <Arrow from={[164, 90]} to={[180, 90]} tone="charcoal" />

      <Board x={184} y={42} width={108} height={104} digits={boardRods(digits, 3)} ghost />

      {named ? (
        <>
          <Label x={110} y={24} size={9} tone="gray">
            each number heard once
          </Label>
          <Label x={238} y={28} size={9} tone="gray">
            the running total
          </Label>
          <Label x={160} y={164} size={9} tone="gray">
            heard once, then seen on the mental board
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

export const chineseFigures = {
  numerals: Numerals,
  wan: Wan,
  "unit-ladder": UnitLadder,
  "groups-of-four": GroupsOfFour,
  "zero-in-group": ZeroInGroup,
  koujue: Koujue,
  "chinese-board": ChineseBoard,
  fingers: Fingers,
  "kan-xinsuan": KanXinsuan,
  "ting-xinsuan": TingXinsuan,
} satisfies Partial<Record<DiagramName, FigureComponent>>;
