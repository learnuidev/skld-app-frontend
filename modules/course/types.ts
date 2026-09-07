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

export type LessonBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "explore"; label: string; rods: number; initial: number[] }
  | { type: "build"; prompt: string; target: number; rods?: number }
  | { type: "read"; prompt: string; digits: number[]; choices: number[] }
  | { type: "quiz"; prompt: string; choices: number[]; answer: number };

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
}
