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

/** An optional visual shown inside an explanation dialog. */
export type ExplanationVisual =
  | { kind: "abacus"; digits: number[] }
  | ({ kind: "abacus-anim" } & AbacusDemo)
  | { kind: "scene"; scene: BridgeScene; highlight?: string[]; labels?: boolean; caption?: string }
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
  | { type: "quiz"; prompt: string; choices: number[]; answer: number; explanation?: LessonExplanation }
  // ── Bridge engineering ──────────────────────────────────────────────────
  // A labelled drawing, a clickable drawing, and four ways to be asked about
  // one. `scene` names the geometry; part ids come from that scene's registry.
  | { type: "figure"; scene: BridgeScene; caption?: string; highlight?: string[]; labels?: boolean }
  | {
      type: "parts";
      prompt: string;
      scene: BridgeScene;
      /** The parts to hunt for; defaults to every part the scene draws. */
      parts?: string[];
      hint?: string;
    }
  | { type: "span"; prompt: string }
  | {
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
      type: "choose";
      prompt: string;
      choices: string[];
      answer: number;
      explanation?: LessonExplanation;
    }
  | {
      type: "sort";
      prompt: string;
      buckets: { id: string; label: string }[];
      items: { id: string; label: string; bucket: string }[];
      explanation?: LessonExplanation;
    }
  | {
      type: "order";
      prompt: string;
      /** Authored in the correct order; the card shuffles them for the learner. */
      items: { id: string; label: string }[];
      explanation?: LessonExplanation;
    }
  | {
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
