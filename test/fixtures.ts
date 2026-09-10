import type { Course, CourseLesson, CourseLevel, LessonKind } from "@/modules/course/types";

export function makeLesson(
  slug: string,
  title: string,
  overrides: Partial<Omit<CourseLesson, "slug" | "title">> = {},
): CourseLesson {
  return {
    kind: (overrides.kind ?? "lesson") as LessonKind,
    slug,
    title,
    blurb: `${title} blurb`,
    minutes: 3,
    exercises: 0,
    ...overrides,
  };
}

export function makeLevel(slug: string, name: string, lessons: CourseLesson[]): CourseLevel {
  return { slug, name, description: `${name} description`, lessons };
}

/** A small two-level course: 6 lessons, one of them a level check. */
export function makeCourse(overrides: Partial<Course> = {}): Course {
  const levels = overrides.levels ?? [
    makeLevel("foundations", "Foundations", [
      makeLesson("first-bead", "First Bead"),
      makeLesson("second-bead", "Second Bead", { exercises: 4 }),
      makeLesson("foundations-check", "Level Check", { kind: "level_check", minutes: 5 }),
    ]),
    makeLevel("fluency", "Fluency", [
      makeLesson("speed-drill", "Speed Drill"),
      makeLesson("mental-math", "Mental Math"),
      makeLesson("fluency-check", "Final Check", { kind: "level_check", minutes: 5 }),
    ]),
  ];

  return {
    slug: "test-course",
    title: "Test Course",
    tagline: "A course for tests",
    description: "A course used by unit tests.",
    introText: "Every lesson here exists only to be asserted on.",
    conceptsInclude: ["Testing"],
    levels,
    lessonCount: 6,
    exerciseCount: 24,
    lessonMinutes: 90,
    accent: "from-amber-200 to-amber-50",
    heroAccent: "from-amber-400 via-amber-300 to-yellow-200",
    sample: [1, 2, 3, 4],
    ...overrides,
  };
}
