import { getCourseBySlug } from "./catalog";
import { getLessonContent } from "./content";
import type { Course, CourseLesson, CourseLevel, LessonBlock } from "./types";

/** A lesson, resolved from the URL, with the steps to play. */
export interface LessonView {
  course: Course;
  level: CourseLevel;
  lesson: CourseLesson;
  /** The steps in order — one per block. */
  blocks: LessonBlock[];
}

/** A lesson without authored content still plays: a line about it, then a board. */
function fallbackContent(lesson: CourseLesson): LessonBlock[] {
  return [
    {
      id: "about-this-lesson",
      type: "paragraph",
      text: `${lesson.blurb} Take a look below, then try it yourself on the beads.`,
    },
    {
      id: "practice-on-the-beads",
      type: "explore",
      label: "Practice here: click the beads to build numbers.",
      rods: 3,
      initial: [0, 0, 0],
    },
  ];
}

/**
 * The lesson a URL names, or null when the course, level or lesson does not
 * exist. Every page that plays a lesson resolves it here, so the lesson URL and
 * its step URLs agree on what is on screen.
 */
export function getLessonView(
  courseSlug: string,
  levelSlug: string,
  lessonSlug: string,
): LessonView | null {
  const course = getCourseBySlug(courseSlug);
  if (!course) return null;
  const level = course.levels.find((entry) => entry.slug === levelSlug);
  if (!level) return null;
  const lesson = level.lessons.find((entry) => entry.slug === lessonSlug);
  if (!lesson) return null;

  const authored = getLessonContent(course.slug, level.slug, lesson.slug);
  return { course, level, lesson, blocks: authored?.length ? authored : fallbackContent(lesson) };
}
