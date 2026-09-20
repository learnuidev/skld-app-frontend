import { describe, expect, it } from "vitest";

import { getCourseBySlug } from "@/modules/course/catalog";
import { courseContentRegistry } from "@/modules/course/content";
import {
  lessonStepUrl,
  lessonUrl,
  stepIdFromLessonPath,
  stepIndex,
} from "@/modules/course/utils";

/** How a URL may write an id: one kebab-case segment, and not just a number. */
const STEP_ID = /^[a-z0-9][a-z0-9-]*$/;

/** Every lesson of every authored course, as its own URL addresses it. */
function everyLesson() {
  return Object.entries(courseContentRegistry).flatMap(([courseSlug, levels]) =>
    Object.entries(levels).flatMap(([levelSlug, lessons]) =>
      Object.entries(lessons).map(([lessonSlug, blocks]) => ({
        where: `${courseSlug}/${levelSlug}/${lessonSlug}`,
        courseSlug,
        levelSlug,
        lessonSlug,
        blocks,
      })),
    ),
  );
}

describe("step ids in the authored content", () => {
  it("gives every step of every lesson an id of its own", () => {
    const problems: string[] = [];

    for (const { where, blocks } of everyLesson()) {
      const seen = new Set<string>();
      blocks.forEach((block, index) => {
        const at = `${where} step ${index + 1}`;
        if (!STEP_ID.test(block.id) || /^\d+$/.test(block.id)) {
          problems.push(`${at}: "${block.id}" is not a kebab-case id`);
        }
        if (seen.has(block.id)) problems.push(`${at}: "${block.id}" is already used`);
        seen.add(block.id);
      });
    }

    expect(problems).toEqual([]);
  });

  it("links to every step by an id the lesson can find again", () => {
    const problems: string[] = [];

    for (const { where, courseSlug, levelSlug, lessonSlug, blocks } of everyLesson()) {
      const course = getCourseBySlug(courseSlug);
      if (!course) {
        problems.push(`${where}: no such course in the catalog`);
        continue;
      }

      const base = lessonUrl(course, levelSlug, lessonSlug);
      blocks.forEach((block, index) => {
        const url = lessonStepUrl(course, levelSlug, lessonSlug, block.id);
        const back = stepIdFromLessonPath(base, url);
        if (back !== block.id) problems.push(`${url}: reads back as ${String(back)}`);
        else if (stepIndex(blocks, back) !== index) problems.push(`${url}: points at the wrong step`);
      });
    }

    expect(problems).toEqual([]);
  });
});
