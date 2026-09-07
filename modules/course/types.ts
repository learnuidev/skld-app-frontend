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
}

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
