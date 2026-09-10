import { describe, expect, it } from "vitest";

import {
  buildCoursePath,
  courseHours,
  findCurrentLesson,
  summarizeProgress,
} from "@/modules/course/path";
import { nodeKey } from "@/modules/course/utils";
import { makeCourse, makeLevel, makeLesson } from "@/test/fixtures";

const course = makeCourse();

/** Completed keys for the first `count` lessons of the course, in path order. */
function firstKeys(count: number): string[] {
  const keys: string[] = [];
  course.levels.forEach((level) => {
    level.lessons.forEach((lesson) => keys.push(nodeKey(level, lesson)));
  });
  return keys.slice(0, count);
}

describe("buildCoursePath", () => {
  it("marks the first unfinished lesson as current and every later one as upcoming", () => {
    const levels = buildCoursePath(course, []);

    expect(levels[0].lessons[0].status).toBe("current");
    expect(levels[0].lessons.slice(1).map((l) => l.status)).toEqual(["upcoming", "upcoming"]);
    expect(levels[1].lessons.map((l) => l.status)).toEqual([
      "upcoming",
      "upcoming",
      "upcoming",
    ]);
  });

  it("keeps completed lessons done and moves the current marker forward", () => {
    const levels = buildCoursePath(course, firstKeys(2));

    expect(levels[0].lessons.map((l) => l.status)).toEqual(["done", "done", "current"]);
    expect(levels[1].lessons[0].status).toBe("upcoming");
  });

  it("numbers lessons across the whole course", () => {
    const levels = buildCoursePath(course, []);

    expect(levels[0].lessons.map((l) => l.index)).toEqual([1, 2, 3]);
    expect(levels[1].lessons.map((l) => l.index)).toEqual([4, 5, 6]);
  });

  it("numbers levels from one and carries level names onto their lessons", () => {
    const levels = buildCoursePath(course, []);

    expect(levels.map((l) => l.number)).toEqual([1, 2]);
    expect(levels[1].lessons[0]).toMatchObject({
      levelSlug: "fluency",
      levelName: "Fluency",
      levelNumber: 2,
    });
  });

  it("links each lesson to its level and lesson route", () => {
    const levels = buildCoursePath(course, []);

    expect(levels[0].lessons[0].href).toBe("/courses/test-course/foundations/first-bead");
    expect(levels[1].lessons[2].href).toBe("/courses/test-course/fluency/fluency-check");
  });

  it("keeps the lesson kind and metadata", () => {
    const levels = buildCoursePath(course, []);

    expect(levels[0].lessons[2]).toMatchObject({
      kind: "level_check",
      minutes: 5,
      title: "Level Check",
    });
  });

  it("describes level status as done, active or upcoming", () => {
    expect(buildCoursePath(course, []).map((l) => l.status)).toEqual(["active", "upcoming"]);
    expect(buildCoursePath(course, firstKeys(3)).map((l) => l.status)).toEqual([
      "done",
      "active",
    ]);
    expect(buildCoursePath(course, firstKeys(6)).map((l) => l.status)).toEqual(["done", "done"]);
  });

  it("ignores completed keys that do not belong to the course", () => {
    const levels = buildCoursePath(course, ["ghost:lesson"]);

    expect(levels[0].lessons[0].status).toBe("current");
    expect(summarizeProgress(levels).done).toBe(0);
  });

  it("handles a course with no levels", () => {
    const empty = makeCourse({ levels: [] });

    expect(buildCoursePath(empty, [])).toEqual([]);
    expect(findCurrentLesson(buildCoursePath(empty, []))).toBeNull();
  });

  it("handles a level with no lessons", () => {
    const empty = makeCourse({ levels: [makeLevel("empty", "Empty", [])] });
    const levels = buildCoursePath(empty, []);

    expect(levels[0].lessons).toEqual([]);
    expect(levels[0].status).toBe("upcoming");
  });
});

describe("findCurrentLesson", () => {
  it("returns the first unfinished lesson", () => {
    const levels = buildCoursePath(course, firstKeys(2));

    expect(findCurrentLesson(levels)?.title).toBe("Level Check");
  });

  it("returns null once every lesson is done", () => {
    expect(findCurrentLesson(buildCoursePath(course, firstKeys(6)))).toBeNull();
  });

  it("returns null for a course with lessons but no path", () => {
    expect(
      findCurrentLesson(buildCoursePath(makeCourse({ levels: [makeLevel("empty", "Empty", [])] }), [])),
    ).toBeNull();
  });
});

describe("summarizeProgress", () => {
  it("reports zero for a freshly started course", () => {
    expect(summarizeProgress(buildCoursePath(course, []))).toEqual({
      done: 0,
      total: 6,
      percent: 0,
      complete: false,
    });
  });

  it("rounds the percentage", () => {
    expect(summarizeProgress(buildCoursePath(course, firstKeys(1))).percent).toBe(17);
    expect(summarizeProgress(buildCoursePath(course, firstKeys(2))).percent).toBe(33);
  });

  it("reports completion when every lesson is done", () => {
    expect(summarizeProgress(buildCoursePath(course, firstKeys(6)))).toEqual({
      done: 6,
      total: 6,
      percent: 100,
      complete: true,
    });
  });

  it("is never complete when the course has no lessons", () => {
    expect(summarizeProgress([])).toEqual({ done: 0, total: 0, percent: 0, complete: false });
  });

  it("ignores duplicate completed keys", () => {
    const keys = firstKeys(1);

    expect(summarizeProgress(buildCoursePath(course, [...keys, ...keys])).done).toBe(1);
  });
});

describe("courseHours", () => {
  it("rounds to whole hours and never drops below one", () => {
    expect(courseHours(90)).toBe(2);
    expect(courseHours(59)).toBe(1);
    expect(courseHours(0)).toBe(1);
  });
});

describe("makeLesson fixture", () => {
  it("defaults to a three minute lesson with no exercises", () => {
    expect(makeLesson("slug", "Title")).toMatchObject({
      kind: "lesson",
      minutes: 3,
      exercises: 0,
      blurb: "Title blurb",
    });
  });
});
