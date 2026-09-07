import type { Course, CourseContentMap, CourseLesson, CourseLevel } from "./types";

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

/** Number of interactive tasks (build/read/quiz) authored across a course's content. */
export function countLevelExercises(levels: CourseLevel[], content: CourseContentMap): number {
  return levels.reduce((total, level) => {
    return (
      total +
      level.lessons.reduce((sum, lesson) => {
        const blocks = content[level.slug]?.[lesson.slug] ?? [];
        return sum + blocks.filter((b) => b.type === "build" || b.type === "read" || b.type === "quiz").length;
      }, 0)
    );
  }, 0);
}

export function countExercises(course: Course, content: CourseContentMap): number {
  return countLevelExercises(course.levels, content);
}
