import type { Course, CourseContentMap, CourseLesson, CourseLevel, LessonBlock } from "./types";

export interface CourseNode {
  level: CourseLevel;
  levelIndex: number;
  lesson: CourseLesson;
  lessonIndex: number;
}

export function flattenCourse(course: Course): CourseNode[] {
  const nodes: CourseNode[] = [];
  course.levels.forEach((lvl, levelIndex) => {
    lvl.lessons.forEach((l, lessonIndex) => {
      nodes.push({ level: lvl, levelIndex, lesson: l, lessonIndex });
    });
  });
  return nodes;
}

export function nodeKey(level: CourseLevel, lesson: CourseLesson) {
  return `${level.slug}:${lesson.slug}`;
}

export function lessonUrl(course: Course, levelSlug: string, lessonSlug: string) {
  return `/courses/${course.slug}/${levelSlug}/${lessonSlug}`;
}

/**
 * URL of one step of a lesson — the block's own id, hung off the lesson's URL.
 * Ids are authored, so a link keeps pointing at the step it was copied from
 * however the lesson is edited around it, and a reader can see where it goes.
 * The lesson's own URL is not a step: it redirects to this, the first one.
 */
export function lessonStepUrl(
  course: Course,
  levelSlug: string,
  lessonSlug: string,
  stepId: string,
) {
  return `${lessonUrl(course, levelSlug, lessonSlug)}/${stepId}`;
}

/** Where a step id sits in a lesson, or -1 when the lesson has no such step. */
export function stepIndex(blocks: LessonBlock[], stepId: string): number {
  return blocks.findIndex((block) => block.id === stepId);
}

/** An id as a URL writes it: one kebab-case segment, nothing else. */
const STEP_ID = /^[a-z0-9][a-z0-9-]*$/;

/**
 * The step a path names below a lesson, or null when the path is not one — a
 * different lesson, the lesson itself, or something that is not an id at all.
 * Used to follow the address bar back and forth.
 */
export function stepIdFromLessonPath(basePath: string, pathname: string): string | null {
  const prefix = `${basePath}/`;
  if (!pathname.startsWith(prefix)) return null;
  const id = pathname.slice(prefix.length).replace(/\/+$/, "");
  return STEP_ID.test(id) ? id : null;
}

/** The first lesson that is not yet complete and is unlocked, or null when the course is finished. */
export function getContinueTarget(course: Course, completed: string[]): CourseNode | null {
  const nodes = flattenCourse(course);
  const completedSet = new Set(completed);
  return (
    nodes.find((node, index) => {
      const done = completedSet.has(nodeKey(node.level, node.lesson));
      const unlocked =
        done ||
        index === 0 ||
        nodes.slice(0, index).every((n) => completedSet.has(nodeKey(n.level, n.lesson)));
      return !done && unlocked;
    }) ?? null
  );
}

/** URL of the next lesson to continue, or the course overview when nothing is next. */
export function continueHref(course: Course, completed: string[]): string {
  const target = getContinueTarget(course, completed);
  return target ? lessonUrl(course, target.level.slug, target.lesson.slug) : `/courses/${course.slug}`;
}

/** Every block the learner has to answer, across both course families. */
export const TASK_BLOCK_TYPES = [
  "build",
  "read",
  "quiz",
  "hotspot",
  "choose",
  "sort",
  "order",
  "assemble",
] as const;

export type TaskBlock = Extract<LessonBlock, { type: (typeof TASK_BLOCK_TYPES)[number] }>;

/** Whether a block asks a question — the ones that gate the Check button. */
export function isTaskBlock(block: LessonBlock): block is TaskBlock {
  return (TASK_BLOCK_TYPES as readonly string[]).includes(block.type);
}

/** Number of interactive tasks authored across a course's content. */
export function countLevelExercises(levels: CourseLevel[], content: CourseContentMap): number {
  return levels.reduce((total, level) => {
    return (
      total +
      level.lessons.reduce((sum, lesson) => {
        const blocks = content[level.slug]?.[lesson.slug] ?? [];
        return sum + blocks.filter(isTaskBlock).length;
      }, 0)
    );
  }, 0);
}

export function countExercises(course: Course, content: CourseContentMap): number {
  return countLevelExercises(course.levels, content);
}
