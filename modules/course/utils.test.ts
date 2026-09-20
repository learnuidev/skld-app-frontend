import { describe, expect, it } from "vitest";

import { lessonStepUrl, lessonUrl, stepIdFromLessonPath, stepIndex } from "@/modules/course/utils";
import type { LessonBlock } from "@/modules/course/types";
import { makeCourse } from "@/test/fixtures";

const course = makeCourse();
const base = "/courses/test-course/foundations/first-bead";

const blocks = [
  { id: "meet-the-parts", type: "heading", text: "Meet the parts" },
  { id: "practice-on-the-beads", type: "explore", label: "Try it", rods: 3, initial: [0, 0, 0] },
] as LessonBlock[];

describe("lessonStepUrl", () => {
  it("hangs a step's own id off the lesson's URL", () => {
    expect(lessonUrl(course, "foundations", "first-bead")).toBe(base);
    expect(lessonStepUrl(course, "foundations", "first-bead", "meet-the-parts")).toBe(
      `${base}/meet-the-parts`,
    );
  });
});

describe("stepIndex", () => {
  it("finds the step an id names", () => {
    expect(stepIndex(blocks, "meet-the-parts")).toBe(0);
    expect(stepIndex(blocks, "practice-on-the-beads")).toBe(1);
  });

  it("has nothing for an id the lesson does not have", () => {
    expect(stepIndex(blocks, "no-such-step")).toBe(-1);
    expect(stepIndex(blocks, "1")).toBe(-1);
    expect(stepIndex(blocks, "")).toBe(-1);
  });
});

describe("stepIdFromLessonPath", () => {
  it("reads the step out of a link into the lesson", () => {
    expect(stepIdFromLessonPath(base, `${base}/meet-the-parts`)).toBe("meet-the-parts");
    expect(stepIdFromLessonPath(base, `${base}/practice-on-the-beads/`)).toBe(
      "practice-on-the-beads",
    );
  });

  it("ignores paths that do not name a step of this lesson", () => {
    // The lesson itself, a neighbouring lesson, another level, an odd link.
    expect(stepIdFromLessonPath(base, base)).toBeNull();
    expect(stepIdFromLessonPath(base, "/courses/test-course/foundations/second-bead/2")).toBeNull();
    expect(stepIdFromLessonPath(base, "/courses/test-course/fluency/first-bead/2")).toBeNull();
    expect(stepIdFromLessonPath(base, `${base}/meet-the-parts/notes`)).toBeNull();
    expect(stepIdFromLessonPath(base, `${base}/Meet-The-Parts`)).toBeNull();
    expect(stepIdFromLessonPath(base, `${base}/meet%20the%20parts`)).toBeNull();
    expect(stepIdFromLessonPath(base, "/")).toBeNull();
  });
});
