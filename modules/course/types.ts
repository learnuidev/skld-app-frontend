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

/** An optional visual shown inside an explanation dialog. */
export type ExplanationVisual =
  | { kind: "abacus"; digits: number[] }
  | ({ kind: "abacus-anim" } & AbacusDemo)
  | { kind: "image"; src: string; alt?: string };

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

export type LessonBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string; demo?: AbacusDemo }
  | { type: "list"; items: string[] }
  | { type: "explore"; label: string; rods: number; initial: number[] }
  | { type: "build"; prompt: string; target: number; rods?: number; explanation?: LessonExplanation }
  | { type: "read"; prompt: string; digits: number[]; choices: number[]; explanation?: LessonExplanation }
  | { type: "quiz"; prompt: string; choices: number[]; answer: number; explanation?: LessonExplanation };

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
export type ArtName = "fractions" | "operators";
