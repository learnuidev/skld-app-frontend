import type { DiagramName } from "@/modules/course/types";

import {
  Arrow,
  Board,
  Box,
  Chip,
  Dot,
  FigurePlate,
  Label,
  Numeral,
  Rule,
  Tick,
  TONE,
  type FigureComponent,
  type FigureProps,
} from "./kit";

/**
 * The drawings of practice itself: the card a level check is, the medal at the
 * end of the course, and the pictures of hitting a target, keeping a beat,
 * sitting a timed paper, watching the clock, climbing three rungs and marking
 * off a week. One idea per plate, black for the structure, yellow for the one
 * thing the words are about.
 *
 * Every drawing here is handed `numbers` and `labels` by content and clamps
 * them to what the plate can hold: three checklist lines, eight beats, seven
 * days, four sums.
 */

/** The list a drawing was handed, or its own example, kept to what fits. */
function listOf<T>(values: T[] | undefined, fallback: T[], most: number): T[] {
  const source = values?.length ? values : fallback;
  return source.slice(0, most);
}

/** A word written short enough to stay on its plate. */
function shorten(text: string, most: number): string {
  const clean = String(text).trim();
  return clean.length > most ? `${clean.slice(0, most - 1)}…` : clean;
}

/** One number off the list content handed, or the drawing's own, clamped. */
function count(numbers: number[] | undefined, at: number, fallback: number, least: number, most: number) {
  const raw = numbers?.[at];
  const value = typeof raw === "number" && Number.isFinite(raw) ? Math.round(raw) : fallback;
  return Math.min(most, Math.max(least, value));
}

/** Digits read off a list of numbers, each one clamped to a rod. */
function digitsOf(values: number[], most: number): number[] {
  return values.slice(0, most).map((digit) => Math.min(9, Math.max(0, Math.round(digit))));
}

// ── Level check ─────────────────────────────────────────────────────────────

const CHECKS = ["Read any rod", "Build any number", "Clear the board"];

/** The card a level check is: what the learner can now do, each line ticked. */
function LevelCheck({ labels, named = true }: FigureProps) {
  const lines = listOf(labels, CHECKS, 3).map((line) => shorten(line, 20));
  // With the card's heading on, the ticks start lower; without it they sit on
  // the middle of the card on their own.
  const first = named ? 70 : 56;

  return (
    <FigurePlate label={`A level check card: ${lines.join(", ")}, each line ticked`}>
      <Box x={36} y={18} width={248} height={144} fill="paper" stroke="gray" radius={10} />

      {/* The heading is chipped on `fog`, the one tone that reads on the card's
          paper without being a second bright note. */}
      {named ? (
        <Chip x={119} y={28} width={82} height={22} text="you can now" size={10} fill="fog" />
      ) : null}

      {lines.map((line, row) => {
        const y = first + row * 32;
        return (
          <g key={row}>
            {/* The ticks are the one bright thing: the card is about what is done. */}
            <Tick x={64} y={y} size={5.5} tone="yellowDeep" />
            <Label x={80} y={y} anchor="start" size={11} weight={500}>
              {line}
            </Label>
          </g>
        );
      })}
    </FigurePlate>
  );
}

// ── Championship ────────────────────────────────────────────────────────────

/** The points of a star, so the medal is geometry and not a character. */
function starPoints(cx: number, cy: number, outer: number, inner: number, points = 5): string {
  return Array.from({ length: points * 2 }, (_, i) => {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = -Math.PI / 2 + (i * Math.PI) / points;
    return `${(cx + Math.cos(angle) * radius).toFixed(2)},${(cy + Math.sin(angle) * radius).toFixed(2)}`;
  }).join(" ");
}

/** A medal for the final challenge: a ribbon and a medal, all drawn. */
function Championship({ named = true }: FigureProps) {
  return (
    <FigurePlate label="A medal hanging on a ribbon: the final challenge of the course">
      {/* The two straps run down behind the medal, so their ends are hidden by
          the disc rather than stopped short of it. */}
      <polygon points="126,18 152,18 160,72 134,80" fill={TONE.charcoal} />
      <polygon points="168,18 194,18 186,80 160,72" fill={TONE.charcoal} />

      <Dot cx={160} cy={100} r={42} fill="yellowDeep" />
      <Dot cx={160} cy={100} r={33} fill="yellow" />
      <polygon points={starPoints(160, 100, 21, 9.5)} fill={TONE.ink} />

      {named ? (
        <Label x={160} y={162} size={10} tone="gray">
          the final challenge
        </Label>
      ) : null}
    </FigurePlate>
  );
}

// ── Accuracy target ─────────────────────────────────────────────────────────

const TARGET = { cx: 112, cy: 88, r: 62 };

/** Four hits just off the middle and four in the next ring, never touching. */
const HIT_SLOTS: [number, number][] = [
  [8.5, 0],
  [0, 8.5],
  [-8.5, 0],
  [0, -8.5],
  [13, -13],
  [-13, -13],
  [-13, 13],
  [13, 13],
];

/** Where a miss falls: out in the outer band, well clear of the middle. */
const MISS_SLOTS: [number, number][] = [200, 160, 240, 120, 300, 340].map((degrees) => {
  const angle = (degrees * Math.PI) / 180;
  return [Math.cos(angle) * 52, Math.sin(angle) * 52] as [number, number];
});

/** A target: solid bright hits near the middle, empty rings out wide. */
function AccuracyTarget({ numbers, named = true }: FigureProps) {
  const hits = count(numbers, 0, 7, 0, HIT_SLOTS.length);
  const misses = count(numbers, 1, 1, 0, MISS_SLOTS.length);

  return (
    <FigurePlate
      label={`A target with ${hits} hits near the middle and ${misses} misses outside it`}
    >
      <Dot cx={TARGET.cx} cy={TARGET.cy} r={TARGET.r} fill="paper" />
      <circle
        cx={TARGET.cx}
        cy={TARGET.cy}
        r={TARGET.r}
        fill="none"
        stroke={TONE.ink}
        strokeWidth={1.6}
      />
      <circle cx={TARGET.cx} cy={TARGET.cy} r={46} fill="none" stroke={TONE.gray} strokeWidth={1.2} />
      <circle
        cx={TARGET.cx}
        cy={TARGET.cy}
        r={30}
        fill="none"
        stroke={TONE.charcoal}
        strokeWidth={1.2}
      />
      <circle cx={TARGET.cx} cy={TARGET.cy} r={14} fill="none" stroke={TONE.gray} strokeWidth={1.2} />
      <Dot cx={TARGET.cx} cy={TARGET.cy} r={2.5} fill="ink" />

      {HIT_SLOTS.slice(0, hits).map(([dx, dy], index) => (
        <Dot key={index} cx={TARGET.cx + dx} cy={TARGET.cy + dy} r={3.8} fill="yellow" />
      ))}

      {MISS_SLOTS.slice(0, misses).map(([dx, dy], index) => (
        <circle
          key={index}
          cx={TARGET.cx + dx}
          cy={TARGET.cy + dy}
          r={4.5}
          fill="none"
          stroke={TONE.charcoal}
          strokeWidth={1.4}
        />
      ))}

      {/* The count, kept beside the target with a mark of its own so the number
          still means something when the words are off. */}
      <Dot cx={232} cy={62} r={5} fill="yellow" />
      <Numeral x={256} y={62} value={hits} size={18} />
      <circle cx={232} cy={116} r={5} fill="none" stroke={TONE.charcoal} strokeWidth={1.4} />
      <Numeral x={256} y={116} value={misses} size={18} tone="charcoal" />

      {named ? (
        <>
          <Label x={256} y={82} size={9} tone="gray">
            on the middle
          </Label>
          <Label x={256} y={136} size={9} tone="gray">
            outside
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

// ── Drill rhythm ────────────────────────────────────────────────────────────

const BEATS = [4, 7, 2, 9];

/** A steady beat, with one number landing on each mark. */
function DrillRhythm({ numbers, named = true }: FigureProps) {
  const beats = listOf(numbers, BEATS, 8).map((beat) =>
    Math.min(99, Math.max(0, Math.round(Number.isFinite(beat) ? beat : 0))),
  );
  const step = beats.length > 1 ? 240 / (beats.length - 1) : 0;
  const first = beats.length > 1 ? 40 : 160;

  return (
    <FigurePlate
      label={`A steady beat with the numbers ${beats.join(", ")}, one landing on each beat`}
    >
      <Rule from={[24, 116]} to={[296, 116]} tone="ink" width={1.2} />

      {beats.map((beat, index) => {
        const x = first + index * step;
        return (
          <g key={index}>
            {/* The mark is the bright thing: the beat is what the words are
                about, the numbers only arrive on it. */}
            <Rule from={[x, 104]} to={[x, 128]} tone="yellowDeep" width={2.5} />
            <Dot cx={x} cy={116} r={3} fill="ink" />
            <Numeral x={x} y={88} value={beat} size={20} />
          </g>
        );
      })}

      {named ? (
        <Label x={160} y={150} size={9.5} tone="gray">
          one number arrives on each beat
        </Label>
      ) : null}
    </FigurePlate>
  );
}

// ── Exam paper ──────────────────────────────────────────────────────────────

const ANSWERS = [72, 50, 91, 34];

/** Two addends that make the answer, so a sum can be set out in a column. */
function addendsOf(answer: number): [number, number] {
  const whole = Math.min(99, Math.max(0, Math.round(Number.isFinite(answer) ? answer : 0)));
  const second = whole <= 1 ? whole : Math.max(1, Math.min(whole - 1, Math.round(whole * 0.4)));
  return [whole - second, second];
}

/** A clock face: quarter marks, an hour hand and a second hand running. */
function Clock({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={TONE.paper} stroke={TONE.ink} strokeWidth={1.8} />
      {[0, 90, 180, 270].map((degrees, index) => {
        const angle = (degrees * Math.PI) / 180;
        return (
          <Rule
            key={index}
            from={[cx + Math.cos(angle) * (r - 12), cy + Math.sin(angle) * (r - 12)]}
            to={[cx + Math.cos(angle) * (r - 4), cy + Math.sin(angle) * (r - 4)]}
            tone="gray"
            width={1.5}
          />
        );
      })}
      <Rule from={[cx, cy]} to={[cx, cy - r * 0.45]} tone="ink" width={2.2} />
      {/* The hand moving is the one bright thing: the paper is timed. */}
      <Arrow from={[cx, cy]} to={[cx + r * 0.62, cy + r * 0.36]} tone="yellowDeep" width={2.2} />
      <Dot cx={cx} cy={cy} r={3} fill="ink" />
    </>
  );
}

/** A timed paper of sums: four sums set out in columns, and a clock. */
function ExamPaper({ numbers, named = true }: FigureProps) {
  const answers = listOf(numbers, ANSWERS, 4).map((answer) =>
    Math.min(99, Math.max(0, Math.round(Number.isFinite(answer) ? answer : 0))),
  );
  // Two columns, two rows: read left to right, top to bottom, as on paper. The
  // rows are a sum's height apart so one answer never crowds the next sum.
  const spots: [number, number][] = [
    [92, 36],
    [184, 36],
    [92, 106],
    [184, 106],
  ];

  return (
    <FigurePlate
      label={`A timed paper of sums: the answers ${answers.join(", ")} set out in columns, with a clock beside the sheet`}
    >
      <Box x={20} y={16} width={184} height={152} fill="paper" stroke="gray" radius={10} />

      {spots.map(([x, y], index) => {
        const answer = answers[index];
        if (answer === undefined) return null;
        const [a, b] = addendsOf(answer);
        return (
          <g key={index}>
            <Numeral x={x} y={y} value={a} size={13} tone="charcoal" anchor="end" />
            <Numeral x={x} y={y + 18} value={b} size={13} tone="charcoal" anchor="end" />
            <Label x={x - 27} y={y + 18} size={12} tone="gray">
              +
            </Label>
            {/* The line a column sum is worked over. */}
            <Rule from={[x - 40, y + 28]} to={[x + 6, y + 28]} tone="gray" width={1.2} />
            <Numeral x={x} y={y + 46} value={answer} size={13} anchor="end" />
          </g>
        );
      })}

      <Clock cx={258} cy={92} r={42} />

      {named ? (
        <Label x={258} y={156} size={9} tone="gray">
          on the clock
        </Label>
      ) : null}
    </FigurePlate>
  );
}

// ── Speed clock ─────────────────────────────────────────────────────────────

/** A stopwatch beside the board: the pace a drill is aiming at. */
function SpeedClock({ numbers, named = true }: FigureProps) {
  const seconds = count(numbers, 0, 60, 1, 999);
  const digits = digitsOf(numbers && numbers.length > 1 ? numbers.slice(1) : [4, 7, 2], 3);
  const watch = { cx: 84, cy: 86, r: 42 };
  const board = { x: 152, y: 36, width: 100, height: 108 };

  return (
    <FigurePlate
      label={`A stopwatch reading ${seconds} seconds beside the board: the pace a drill aims at`}
    >
      {/* The crown, sitting on the rim of the case. */}
      <Box x={76} y={30} width={16} height={14} fill="charcoal" radius={4} />

      <circle
        cx={watch.cx}
        cy={watch.cy}
        r={watch.r}
        fill={TONE.paper}
        stroke={TONE.ink}
        strokeWidth={1.8}
      />

      {Array.from({ length: 12 }, (_, mark) => {
        const angle = (mark * Math.PI) / 6;
        return (
          <Rule
            key={mark}
            from={[
              watch.cx + Math.cos(angle) * (watch.r - 9),
              watch.cy + Math.sin(angle) * (watch.r - 9),
            ]}
            to={[
              watch.cx + Math.cos(angle) * (watch.r - 3),
              watch.cy + Math.sin(angle) * (watch.r - 3),
            ]}
            tone="gray"
            width={1.2}
          />
        );
      })}

      {/* The reading is the one bright thing: the time the drill is run to. */}
      <Box x={watch.cx - 28} y={watch.cy - 14} width={56} height={28} fill="yellow" radius={6} />
      <Numeral x={watch.cx} y={watch.cy} value={`${seconds}s`} size={18} />

      <Board {...board} digits={digits} />

      {named ? (
        <>
          <Label x={84} y={148} size={9} tone="gray">
            the pace to keep
          </Label>
          <Label x={202} y={158} size={9} tone="gray">
            the board
          </Label>
        </>
      ) : null}
    </FigurePlate>
  );
}

// ── Progress ladder ─────────────────────────────────────────────────────────

const RUNGS = ["see it", "picture it", "speed it up"];

/** Three rungs of progress, climbed from the bottom up. */
function ProgressLadder({ labels, named = true }: FigureProps) {
  const rungs = listOf(labels, RUNGS, 3).map((rung) => shorten(rung, 14));
  // Bottom rung first, so `labels[0]` is the first step of the ladder.
  const rungY = [144, 106, 68];

  return (
    <FigurePlate label={`Three rungs of progress, bottom to top: ${rungs.join(", ")}`}>
      <Rule from={[112, 26]} to={[112, 158]} tone="ink" width={2.5} />
      <Rule from={[192, 26]} to={[192, 158]} tone="ink" width={2.5} />

      {rungs.map((rung, index) => {
        const y = rungY[index];
        const aimed = index === rungs.length - 1;
        return (
          <g key={index}>
            {/* The top rung is the bright one: the pace is what the words are
                climbing towards. */}
            <Rule
              from={[112, y]}
              to={[192, y]}
              tone={aimed ? "yellowDeep" : "charcoal"}
              width={aimed ? 4 : 3}
            />
            <Label x={204} y={y} anchor="start" size={10}>
              {rung}
            </Label>
            {named ? (
              <Numeral x={100} y={y} value={index + 1} size={10} tone="gray" anchor="end" />
            ) : null}
          </g>
        );
      })}
    </FigurePlate>
  );
}

// ── Daily practice ──────────────────────────────────────────────────────────

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** A week of practice marks: a column a day, some of them done. */
function DailyPractice({ numbers, labels, named = true }: FigureProps) {
  // A day's name is written at the widest that still clears its neighbours:
  // seven columns sit 41 apart, so seven characters is what fits.
  const days = listOf(labels, DAYS, 7).map((day) => shorten(day, 7));
  // `numbers[0]` counts the days marked done; the drawing's own week has five
  // of seven, so a week still reads as half done when content says nothing.
  const counted = numbers?.length ? count(numbers, 0, 5, 0, 7) : 5;
  const done = Math.min(counted, days.length);
  const step = 41.4;
  const first = 160 - ((days.length - 1) * step) / 2;

  return (
    <FigurePlate label={`A week of practice: ${done} of ${days.length} days marked done`}>
      {named ? (
        <Label x={160} y={26} size={10} tone="charcoal">
          {`${done} of ${days.length} days marked`}
        </Label>
      ) : null}

      {days.map((day, index) => {
        const cx = first + index * step;
        const marked = index < done;
        return (
          <g key={index}>
            <Box
              x={cx - 11}
              y={44}
              width={22}
              height={88}
              fill="paper"
              stroke="gray"
              radius={7}
            />
            {marked ? (
              <>
                {/* The mark is the one bright thing on the plate: the day done. */}
                <Box x={cx - 9} y={79} width={18} height={18} fill="yellow" radius={5} />
                <Tick x={cx} y={88} size={5} tone="ink" />
              </>
            ) : (
              <Box x={cx - 9} y={79} width={18} height={18} stroke="gray" dashed radius={5} />
            )}
            <Label x={cx} y={156} size={9} tone="gray">
              {day}
            </Label>
          </g>
        );
      })}
    </FigurePlate>
  );
}

export const practiceFigures = {
  "level-check": LevelCheck,
  championship: Championship,
  "accuracy-target": AccuracyTarget,
  "drill-rhythm": DrillRhythm,
  "exam-paper": ExamPaper,
  "speed-clock": SpeedClock,
  "progress-ladder": ProgressLadder,
  "daily-practice": DailyPractice,
} satisfies Partial<Record<DiagramName, FigureComponent>>;
