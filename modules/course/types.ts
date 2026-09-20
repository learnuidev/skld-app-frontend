export type LessonKind = "lesson" | "level_check";

export interface CourseLesson {
  kind: LessonKind;
  slug: string;
  title: string;
  blurb: string;
  minutes: number;
  exercises: number;
}

export interface CourseLevel {
  slug: string;
  name: string;
  description: string;
  lessons: CourseLesson[];
}

export interface Course {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  introText: string;
  conceptsInclude: string[];
  levels: CourseLevel[];
  lessonCount: number;
  exerciseCount: number;
  lessonMinutes: number;
  accent: string;
  heroAccent: string;
  /** Optional abacus digits shown in the course hero preview. */
  sample?: number[];
  /** Bespoke artwork for the course card and hero; courses without one fall back to `sample`. */
  art?: ArtName;
}

/**
 * An animated abacus demonstration: a sequence of abacus states (frames) that
 * plays through to illustrate a move step by step. `frames[i]` holds the digits
 * for state `i` (digits[0] is the units rod). All frames should use the same
 * number of rods.
 */
export interface AbacusDemo {
  frames: number[][];
  /** Optional caption per frame, shown alongside the current step. */
  captions?: string[];
  /** Optional accessible label for the abacus. */
  label?: string;
}

/**
 * The bridge drawings a lesson can put on screen. Each name is one scene in
 * `components/bridge/scenes`, drawn in engineering elevation on the shared
 * light plate; content refers to them by name so the geometry lives in one place.
 */
export type BridgeScene =
  | "overview"
  | "superstructure"
  | "bearings"
  | "supports"
  | "foundations"
  | "fittings"
  | "levels"
  | "dimensions"
  | "carries"
  | "deck-position"
  | "beam"
  | "arch"
  | "frame"
  | "cable-stayed"
  | "suspension"
  | "composite";

/**
 * Every named concept drawing a step can put on screen: one name per drawing in
 * `components/courses/figures`, painted in the shared course palette. Each name
 * is a different idea, and the numbers and words it works with are passed in
 * beside it —
 *
 *  - `soroban`           the whole board, its parts named
 *  - `one-rod`           one rod drawn large, showing `numbers[0]`
 *  - `bead-values`       a heaven bead worth 5 and four earth beads worth 1 each
 *  - `clear-board`       every bead resting away from the beam: the board at zero
 *  - `place-value`       the rods named by place — ones, tens, hundreds, thousands
 *  - `zero-rod`          a number with an empty rod inside it (`numbers` = digits)
 *  - `two-rods`          a two-digit number on two rods (`numbers` = digits)
 *  - `big-board`         a wide board carrying a big number (`numbers` = digits)
 *  - `board-vs-numeral`  the board and the same number written as digits
 *  - `number-line`       the `numbers` marked in order on a line
 *  - `five-complement`   the pairs that make 5 (1+4, 2+3)
 *  - `ten-complement`    the pairs that make 10
 *  - `carry-over`        ten ones becoming one bead on the next rod
 *  - `borrow-ten`        one ten broken back into ten ones
 *  - `column-add`        two numbers added down the columns (`numbers` = [a, b])
 *  - `column-subtract`   one number taken from another (`numbers` = [a, b])
 *  - `money`             notes and coins held as beads (`numbers` = the amount)
 *  - `compare-methods`   one sum worked twice, on paper and on the beads (`numbers` = [a, b])
 *  - `multiply-array`    rows × columns of dots (`numbers` = [rows, columns])
 *  - `multiply-table`    the 9×9 table with one fact picked out (`numbers` = [a, b])
 *  - `divide-share`      a pile shared into equal groups (`numbers` = [total, groups])
 *  - `remainder`         equal groups and what is left over (`numbers` = [total, groups])
 *  - `square-grid`       an n×n square of dots (`numbers[0]` = n)
 *  - `root-between`      a square root between two perfect squares (`numbers[0]` = n)
 *  - `running-total`     a column of numbers and the total it runs to
 *  - `da-baizi`          1+2+3+… climbing to 100
 *  - `mental-board`      the board drawn as a ghost: the picture in the mind
 *  - `photo-snap`        a real board captured as a mental picture
 *  - `image-to-number`   beads on one side, the number they make on the other
 *  - `ghost-carry`       a carry happening on the ghost board
 *  - `flash-drill`       a number shown for a moment and then gone
 *  - `listening-drill`   numbers arriving one at a time into the board
 *  - `two-rods-at-once`  two rods moved together in one motion
 *  - `vivid-image`       a sharp mental board beside a blurred one
 *  - `focus-lamp`        a lamp on the board while distractions sit in the dark
 *  - `numerals`         一 二 三 beside 1 2 3 (`labels` = the characters)
 *  - `wan`               the character 万 with the zeros it stands for
 *  - `unit-ladder`       个 十 百 千 万 亿 兆 climbing, right to left
 *  - `groups-of-four`    digits split into groups of four, each group named
 *  - `zero-in-group`     零 written inside a group of digits
 *  - `koujue`            a card of the spoken formulas, 口诀
 *  - `chinese-board`     the traditional two-and-five suanpan beside the modern one
 *  - `fingers`           thumb and index working the beads
 *  - `kan-xinsuan`       a number seen and read straight into the mind, 看心算
 *  - `ting-xinsuan`      numbers heard and read straight into the mind, 听心算
 *  - `number-sprint`     a run of numbers feeding one board
 *  - `speed-clock`       a stopwatch beside the board
 *  - `progress-ladder`   three rungs: see it, picture it, speed it up
 *  - `daily-practice`    a week of practice marks
 *  - `level-check`       a checklist card with the level's ticks
 *  - `championship`      a medal for the final challenge
 *  - `accuracy-target`   a target: hits near the middle, misses outside
 *  - `drill-rhythm`      a beat with numbers arriving on it
 *  - `exam-paper`        a timed paper of sums
 */
export const DIAGRAM_NAMES = [
  "soroban",
  "one-rod",
  "bead-values",
  "clear-board",
  "place-value",
  "zero-rod",
  "two-rods",
  "big-board",
  "board-vs-numeral",
  "number-line",
  "five-complement",
  "ten-complement",
  "carry-over",
  "borrow-ten",
  "column-add",
  "column-subtract",
  "money",
  "compare-methods",
  "multiply-array",
  "multiply-table",
  "divide-share",
  "remainder",
  "square-grid",
  "root-between",
  "running-total",
  "da-baizi",
  "mental-board",
  "photo-snap",
  "image-to-number",
  "ghost-carry",
  "flash-drill",
  "listening-drill",
  "two-rods-at-once",
  "vivid-image",
  "focus-lamp",
  "numerals",
  "wan",
  "unit-ladder",
  "groups-of-four",
  "zero-in-group",
  "koujue",
  "chinese-board",
  "fingers",
  "kan-xinsuan",
  "ting-xinsuan",
  "number-sprint",
  "speed-clock",
  "progress-ladder",
  "daily-practice",
  "level-check",
  "championship",
  "accuracy-target",
  "drill-rhythm",
  "exam-paper",
] as const;

export type DiagramName = (typeof DIAGRAM_NAMES)[number];

/**
 * A concept drawing named by content rather than authored in it: the geometry
 * lives in `components/courses/figures`, exactly as a bridge scene names its
 * drawing. The drawing decides what its `numbers` and `labels` mean.
 */
export interface DiagramVisual {
  kind: "diagram";
  name: DiagramName;
  /** The numbers the drawing works with — digits, counts, addends. */
  numbers?: number[];
  /** Short words the drawing writes, when the drawing does not fix them itself. */
  labels?: string[];
  /** Whether the drawing writes its own part names. Defaults to true. */
  named?: boolean;
}

/**
 * The drawings a step can show: the live board, a bridge scene, a named concept
 * diagram, or an image. Text steps, "Why?" walkthroughs and bridge content all
 * draw from this one set, so a learner meets the same pictures everywhere.
 */
export type LessonVisual =
  | { kind: "abacus"; digits: number[] }
  | ({ kind: "abacus-anim" } & AbacusDemo)
  | { kind: "scene"; scene: BridgeScene; highlight?: string[]; labels?: boolean; caption?: string }
  | DiagramVisual
  | { kind: "image"; src: string; alt?: string };

/** An optional visual shown inside an explanation dialog. */
export type ExplanationVisual = LessonVisual;

/**
 * A picture a text step puts beside its words. Every heading, paragraph and
 * list in a lesson carries one, so no step is words alone.
 */
export interface LessonFigure {
  /** What to draw. */
  visual: LessonVisual;
  /** One line under the drawing: what to look at, never what the text says. */
  caption?: string;
}

/** One animated step of an explanation walkthrough. */
export interface ExplanationStep {
  text: string;
  visual?: ExplanationVisual;
}

/** Optional per-exercise explanation revealed by the "Why?" button. When `steps` is set it renders an animated, navigable walkthrough; otherwise it falls back to a single step built from `text`/`visual`. */
export interface LessonExplanation {
  /** Short summary; used as the single step when `steps` is absent. */
  text?: string;
  /** Ordered steps for an animated back/forward walkthrough. */
  steps?: ExplanationStep[];
  visual?: ExplanationVisual;
}

/**
 * One step of a lesson — the smallest part a learner can be sent to. Every block
 * is authored with an `id` of its own, unique within its lesson, and that id is
 * the last segment of the step's URL:
 * `/courses/<course>/<level>/<lesson>/<id>`.
 */
export type LessonBlock =
  | { id: string; type: "heading"; text: string; figure?: LessonFigure }
  | { id: string; type: "paragraph"; text: string; demo?: AbacusDemo; figure?: LessonFigure }
  | { id: string; type: "list"; items: string[]; figure?: LessonFigure }
  | { id: string; type: "explore"; label: string; rods: number; initial: number[] }
  | { id: string; type: "build"; prompt: string; target: number; rods?: number; explanation?: LessonExplanation }
  | { id: string; type: "read"; prompt: string; digits: number[]; choices: number[]; explanation?: LessonExplanation }
  | { id: string; type: "quiz"; prompt: string; choices: number[]; answer: number; explanation?: LessonExplanation }
  // ── Bridge engineering ──────────────────────────────────────────────────
  // A labelled drawing, a clickable drawing, and four ways to be asked about
  // one. `scene` names the geometry; part ids come from that scene's registry.
  | { id: string; type: "figure"; scene: BridgeScene; caption?: string; highlight?: string[]; labels?: boolean }
  | {
      id: string;
      type: "parts";
      prompt: string;
      scene: BridgeScene;
      /** The parts to hunt for; defaults to every part the scene draws. */
      parts?: string[];
      hint?: string;
    }
  | { id: string; type: "span"; prompt: string }
  | {
      id: string;
      type: "concepts";
      prompt: string;
      /** Shown one at a time, each with its own drawing. */
      concepts: {
        id: string;
        /** What the concept is called, e.g. "By material". */
        label: string;
        /** One line of explanation — the drawing does the rest. */
        summary: string;
        scene: BridgeScene;
        /** The parts of the drawing this concept is about. */
        highlight?: string[];
      }[];
    }
  | {
      id: string;
      type: "hotspot";
      prompt: string;
      scene: BridgeScene;
      /** The parts drawn as pins; the answer must be one of them. */
      parts: string[];
      answer: string;
      labels?: boolean;
      explanation?: LessonExplanation;
    }
  | {
      id: string;
      type: "choose";
      prompt: string;
      choices: string[];
      answer: number;
      explanation?: LessonExplanation;
    }
  | {
      id: string;
      type: "sort";
      prompt: string;
      buckets: { id: string; label: string }[];
      items: { id: string; label: string; bucket: string }[];
      explanation?: LessonExplanation;
    }
  | {
      id: string;
      type: "order";
      prompt: string;
      /** Authored in the correct order; the card shuffles them for the learner. */
      items: { id: string; label: string }[];
      explanation?: LessonExplanation;
    }
  | {
      id: string;
      type: "assemble";
      prompt: string;
      scene: BridgeScene;
      /** Where each part belongs on the drawing, in scene coordinates. */
      slots: { id: string; label: string; at: [number, number] }[];
      explanation?: LessonExplanation;
    };

export type LessonContent = LessonBlock[];

/** Content for one course: level slug -> lesson slug -> lesson blocks. */
export type CourseContentMap = Record<string, Record<string, LessonContent>>;

export interface CourseSummary {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  subject: string;
  levelCount: number;
  lessonCount: number;
  exerciseCount: number;
  lessonMinutes: number;
  accent: string;
  heroAccent: string;
  status: "available" | "coming-soon";
  sample: number[];
  /**
   * Bespoke SVG artwork for this course's cards and path icon. Courses without
   * one fall back to the abacus preview built from `sample`.
   */
  art?: ArtName;
}

/** Named pieces of artwork, each with a component in `components/courses/illustrations`. */
export type ArtName =
  | "fractions"
  | "operators"
  | "abacus"
  | "bead"
  | "mental"
  | "suanpan"
  | "numerals"
  | "bridge";

/** What a search hit is about. The dropdown labels every row with this. */
export type SearchKind = "course" | "level" | "lesson" | "step";

/**
 * One row of search results: something the learner can open, with enough of its
 * own words to show why it matched. **Note:** this type is shared with the
 * browser, so it must stay free of imports — the index behind it lives in
 * `search.ts` and is built on the server.
 */
export interface SearchHit {
  kind: SearchKind;
  /** What the row is called. */
  title: string;
  /** The words that matched, quoted back as one line of context. */
  snippet: string;
  /** Where the row goes — a real page, straight to the step when it has one. */
  href: string;
  courseTitle: string;
  /** Empty on course hits, which sit above the levels. */
  levelName: string;
  lessonTitle: string;
  score: number;
}
