import type { Course, LessonKind } from "./types";
import { lessonUrl, nodeKey } from "./utils";

/**
 * A lesson as the course page renders it: the lesson plus everything the UI
 * needs to draw one node on the path. Derived once from a course and a set of
 * completed lesson keys, so every component below is a pure function of props.
 */
export interface PathLesson {
  key: string;
  slug: string;
  title: string;
  blurb: string;
  kind: LessonKind;
  minutes: number;
  exercises: number;
  /** 1-based position of this lesson within the whole course. */
  index: number;
  status: LessonStatus;
  href: string;
  levelSlug: string;
  levelName: string;
  /** 1-based number of the level this lesson belongs to. */
  levelNumber: number;
}

export type LessonStatus = "done" | "current" | "upcoming";

export interface PathLevel {
  slug: string;
  name: string;
  description: string;
  /** 1-based level number. */
  number: number;
  status: LevelStatus;
  lessons: PathLesson[];
}

export type LevelStatus = "done" | "active" | "upcoming";

export interface ProgressSummary {
  done: number;
  total: number;
  /** Whole-number percentage, 0 when the course has no lessons. */
  percent: number;
  complete: boolean;
}

/**
 * Turn a course into the level/lesson path the page draws. The first lesson
 * that is not complete becomes `current`; every later lesson is `upcoming`.
 */
export function buildCoursePath(course: Course, completedKeys: Iterable<string>): PathLevel[] {
  const completed = new Set(completedKeys);
  let position = 0;
  let currentSeen = false;

  return course.levels.map((level, levelIndex) => {
    const levelNumber = levelIndex + 1;

    const lessons = level.lessons.map((lesson): PathLesson => {
      const key = nodeKey(level, lesson);
      position += 1;

      let status: LessonStatus = "upcoming";
      if (completed.has(key)) {
        status = "done";
      } else if (!currentSeen) {
        status = "current";
        currentSeen = true;
      }

      return {
        key,
        slug: lesson.slug,
        title: lesson.title,
        blurb: lesson.blurb,
        kind: lesson.kind,
        minutes: lesson.minutes,
        exercises: lesson.exercises,
        index: position,
        status,
        href: lessonUrl(course, level.slug, lesson.slug),
        levelSlug: level.slug,
        levelName: level.name,
        levelNumber,
      };
    });

    const status: LevelStatus = levelStatus(lessons);

    return {
      slug: level.slug,
      name: level.name,
      description: level.description,
      number: levelNumber,
      status,
      lessons,
    };
  });
}

function levelStatus(lessons: PathLesson[]): LevelStatus {
  if (lessons.length > 0 && lessons.every((lesson) => lesson.status === "done")) {
    return "done";
  }
  if (lessons.some((lesson) => lesson.status === "current")) {
    return "active";
  }
  return "upcoming";
}

/** The single lesson marked `current`, or null when the course is finished or empty. */
export function findCurrentLesson(levels: PathLevel[]): PathLesson | null {
  for (const level of levels) {
    const lesson = level.lessons.find((candidate) => candidate.status === "current");
    if (lesson) {
      return lesson;
    }
  }
  return null;
}

export function summarizeProgress(levels: PathLevel[]): ProgressSummary {
  let done = 0;
  let total = 0;

  for (const level of levels) {
    for (const lesson of level.lessons) {
      total += 1;
      if (lesson.status === "done") {
        done += 1;
      }
    }
  }

  return {
    done,
    total,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
    complete: total > 0 && done === total,
  };
}

/** Whole hours spent on a course's lessons, never below one. */
export function courseHours(lessonMinutes: number): number {
  return Math.max(1, Math.round(lessonMinutes / 60));
}
