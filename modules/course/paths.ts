import { courseCatalog } from "./catalog";
import type { ArtName, CourseSummary } from "./types";

/**
 * A group of courses that share a theme, rendered as one row on the courses
 * page: a header (badge, title, blurb, progress) above a horizontal strip of
 * course cards. Mirrors the "learning path" rows on Brilliant's courses page.
 */
export interface LearningPath {
  slug: string;
  /** Small uppercase label above the title, e.g. "ABACUS · 4 COURSES". */
  badge: string;
  title: string;
  description: string;
  /** Catalog slugs that appear as cards in this path, in display order. */
  courseSlugs: string[];
  /**
   * Artwork for the path's own icon. Without it the icon borrows the first
   * course's art, so a path usually matches its lead course.
   */
  art?: ArtName;
}

/**
 * The slice of a course the courses page needs. Deliberately smaller than
 * `Course` so the browser bundle never carries lesson content.
 */
export interface PathCourse {
  slug: string;
  title: string;
  tagline: string;
  subject: string;
  status: CourseSummary["status"];
  sample: number[];
  accent: string;
  heroAccent: string;
  /** Bespoke SVG artwork; falls back to the abacus preview when absent. */
  art?: CourseSummary["art"];
  /** Total lessons, used with the locally stored completion count for progress. */
  lessonCount: number;
}

export interface PathWithCourses {
  path: LearningPath;
  courses: PathCourse[];
}

/** Paths the learner is enrolled in by default — the ones shown as starred. */
export const primaryPaths: LearningPath[] = [
  {
    slug: "abacus-mastery",
    badge: "Abacus · 4 courses",
    title: "Abacus Mastery",
    description:
      "From your first bead to lightning-fast mental math. Four courses walk the soroban and the Chinese suanpan, then move the whole board into your head.",
    courseSlugs: [
      "understanding-abacus",
      "anzan-mental-math",
      "zhuxinsuan",
      "chinese-numbers",
    ],
  },
];

/** Paths that are still being built; shown under "Other learning paths". */
export const otherPaths: LearningPath[] = [
  {
    slug: "math-fundamentals",
    badge: "Math",
    title: "Math Fundamentals",
    description:
      "Start with the parts of a whole, then build up to ratios and real number sense.",
    courseSlugs: ["fractions"],
    art: "operators",
  },
];

function toPathCourse(summary: CourseSummary): PathCourse {
  return {
    slug: summary.slug,
    title: summary.title,
    tagline: summary.tagline,
    subject: summary.subject,
    status: summary.status,
    sample: summary.sample,
    accent: summary.accent,
    heroAccent: summary.heroAccent,
    art: summary.art,
    lessonCount: summary.lessonCount,
  };
}

/** Resolve a path's course slugs against the catalog, dropping unknown ones. */
export function resolvePath(path: LearningPath): PathWithCourses {
  const courses = path.courseSlugs
    .map((slug) => courseCatalog.find((course) => course.slug === slug))
    .filter((course): course is CourseSummary => Boolean(course))
    .map(toPathCourse);

  return { path, courses };
}

/** Every path on the page: the enrolled ones first, then the rest. */
export function buildLearningPaths(): {
  paths: PathWithCourses[];
  defaultStarred: string[];
} {
  return {
    paths: [...primaryPaths, ...otherPaths].map(resolvePath),
    defaultStarred: primaryPaths.map((path) => path.slug),
  };
}
