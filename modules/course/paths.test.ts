import { describe, expect, it } from "vitest";

import { courseCatalog } from "@/modules/course/catalog";
import {
  buildLearningPaths,
  otherPaths,
  primaryPaths,
  resolvePath,
} from "@/modules/course/paths";

describe("learning paths", () => {
  it("resolves every path slug against the catalog", () => {
    for (const path of [...primaryPaths, ...otherPaths]) {
      const { courses } = resolvePath(path);

      expect(courses.map((course) => course.slug)).toEqual(path.courseSlugs);
    }
  });

  it("keeps course slugs unique across all paths", () => {
    const slugs = [...primaryPaths, ...otherPaths].flatMap((path) => path.courseSlugs);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("keeps path slugs unique", () => {
    const slugs = [...primaryPaths, ...otherPaths].map((path) => path.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("starts every learner on the primary paths", () => {
    const { paths, defaultStarred } = buildLearningPaths();

    expect(defaultStarred).toEqual(primaryPaths.map((path) => path.slug));
    expect(paths.map((entry) => entry.path.slug)).toEqual([
      ...primaryPaths.map((path) => path.slug),
      ...otherPaths.map((path) => path.slug),
    ]);
    expect(defaultStarred.every((slug) => paths.some((entry) => entry.path.slug === slug))).toBe(
      true,
    );
  });

  it("only ships the fields the page renders", () => {
    const [course] = resolvePath(primaryPaths[0]).courses;

    expect(course).toEqual({
      slug: expect.any(String),
      title: expect.any(String),
      tagline: expect.any(String),
      subject: expect.any(String),
      status: expect.stringMatching(/^(available|coming-soon)$/),
      sample: expect.any(Array),
      accent: expect.any(String),
      heroAccent: expect.any(String),
      lessonCount: expect.any(Number),
    });
    expect(courseCatalog.some((summary) => summary.slug === course.slug)).toBe(true);
  });
});
