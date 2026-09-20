import { describe, expect, it } from "vitest";

import { availableCourses } from "./catalog";
import { getLessonView } from "./lesson-view";
import { blockText, buildSearchIndex, getSearchIndex, makeSnippet, searchContent, tokenize } from "./search";
import { stepIndex } from "./utils";
import type { SearchKind } from "./types";

/** Whether a hit's URL is a page this app can actually open. */
function opens(hit: { kind: SearchKind; href: string }): boolean {
  const parts = hit.href.split("/").filter(Boolean);
  if (parts[0] !== "courses") return false;

  const course = availableCourses.find((entry) => entry.slug === parts[1]);
  if (!course) return false;
  if (hit.kind === "course") return parts.length === 2;

  const level = course.levels.find((entry) => entry.slug === parts[2]);
  if (!level) return false;
  if (hit.kind === "level") return parts.length === 3;

  const lesson = level.lessons.find((entry) => entry.slug === parts[3]);
  if (!lesson) return false;
  if (hit.kind === "lesson") return parts.length === 4;

  const view = getLessonView(course.slug, level.slug, lesson.slug);
  return parts.length === 5 && Boolean(view) && stepIndex(view!.blocks, parts[4]) >= 0;
}

describe("search index", () => {
  it("indexes every course, level and lesson in the catalog", () => {
    const index = buildSearchIndex();
    const levels = availableCourses.flatMap((course) => course.levels);
    const lessons = levels.flatMap((level) => level.lessons);

    expect(index.filter((entry) => entry.kind === "course")).toHaveLength(availableCourses.length);
    expect(index.filter((entry) => entry.kind === "level")).toHaveLength(levels.length);
    expect(index.filter((entry) => entry.kind === "lesson")).toHaveLength(lessons.length);
    // Every lesson plays at least one block, so there are always more steps.
    expect(index.filter((entry) => entry.kind === "step").length).toBeGreaterThan(lessons.length);
  });

  it("gives every entry a URL that opens the thing it names", () => {
    const index = buildSearchIndex();
    for (const entry of index) {
      expect(opens(entry), `${entry.kind} ${entry.title} -> ${entry.href}`).toBe(true);
    }

    // The check above only means something if it can fail.
    expect(opens({ kind: "step", href: "/courses/understanding-abacus/meet-the-soroban/anatomy/nope" })).toBe(
      false,
    );
    expect(opens({ kind: "course", href: "/courses/not-a-course" })).toBe(false);
  });

  it("is built once and then reused", () => {
    expect(getSearchIndex()).toBe(getSearchIndex());
  });

  it("reads the words out of every kind of block", () => {
    expect(blockText({ id: "a", type: "heading", text: "Reading a rod" })).toBe("Reading a rod");
    expect(blockText({ id: "b", type: "list", items: ["Beam", "Rods"] })).toBe("Beam Rods");
    expect(
      blockText({
        id: "c",
        type: "quiz",
        prompt: "Which number?",
        choices: [1, 2],
        answer: 1,
        explanation: { steps: [{ text: "One earth bead is touching the beam." }] },
      }),
    ).toBe("Which number? One earth bead is touching the beam.");
    expect(
      blockText({
        id: "d",
        type: "concepts",
        prompt: "How are bridges classified?",
        concepts: [{ id: "material", label: "By material", summary: "Steel, concrete, timber.", scene: "beam" }],
      }),
    ).toBe("How are bridges classified? By material Steel, concrete, timber.");
  });
});

describe("searchContent", () => {
  it("finds a course by its name", () => {
    const hits = searchContent("bridge engineering");

    expect(hits[0].kind).toBe("course");
    expect(hits[0].title).toBe("Bridge Engineering");
    expect(hits[0].href).toBe("/courses/bridge-engineering");
  });

  it("finds a lesson by its name and points at the lesson", () => {
    const hits = searchContent("imagine the beads");
    const lesson = hits.find((hit) => hit.kind === "lesson" && hit.title === "Imagine the Beads");

    expect(lesson).toBeDefined();
    expect(lesson?.href).toBe("/courses/understanding-abacus/beyond-the-beads/imagine-the-beads");
    expect(opens(lesson!)).toBe(true);
  });

  it("finds the step a phrase was written in, and links straight to that step", () => {
    const hits = searchContent("load-bearing capacity");

    expect(hits.length).toBeGreaterThan(0);
    const step = hits.find((hit) => hit.kind === "step");
    expect(step).toBeDefined();
    expect(step!.href.split("/").filter(Boolean)).toHaveLength(5);
    expect(step!.snippet.toLowerCase()).toContain("capacity");
    expect(opens(step!)).toBe(true);
  });

  it("quotes the words that matched rather than the start of the paragraph", () => {
    const hits = searchContent("soil");
    const step = hits.find((hit) => hit.kind === "step");

    expect(step).toBeDefined();
    expect(step!.snippet.toLowerCase()).toContain("soil");
  });

  it("ranks a name that matches above a page that merely mentions the word", () => {
    const hits = searchContent("bearings", { limit: 50 });
    const named = hits.findIndex((hit) => hit.title.toLowerCase().includes("bearings"));
    const mentioned = hits.findIndex(
      (hit) => !hit.title.toLowerCase().includes("bearings") && hit.snippet.toLowerCase().includes("bearings"),
    );

    expect(named).toBe(0);
    expect(mentioned).toBeGreaterThan(named);
  });

  it("needs every word of the query to appear somewhere", () => {
    expect(searchContent("bead xyzzy")).toEqual([]);
    expect(searchContent("bridge unicorn")).toEqual([]);
  });

  it("ignores a query too short to narrow anything down", () => {
    expect(searchContent("")).toEqual([]);
    expect(searchContent("   ")).toEqual([]);
    expect(searchContent("b")).toEqual([]);
  });

  it("returns no more hits than it was asked for", () => {
    expect(searchContent("bead", { limit: 3 })).toHaveLength(3);
    expect(searchContent("bead", { limit: 0 })).toEqual([]);
  });

  it("keeps one row when a lesson and its first step share a name", () => {
    const hits = searchContent("what is a bridge", { limit: 10 });
    const named = hits.filter((hit) => hit.title.toLowerCase().startsWith("what is a bridge"));

    expect(named).toHaveLength(1);
    expect(named[0].kind).toBe("lesson");
    expect(named[0].href).toBe("/courses/bridge-engineering/components-of-a-bridge/what-is-a-bridge");
  });

  it("gives every hit a row that reads on its own", () => {
    for (const hit of searchContent("bead", { limit: 8 })) {
      expect(hit.title.length).toBeGreaterThan(0);
      expect(hit.courseTitle.length).toBeGreaterThan(0);
      expect(hit.snippet.length).toBeGreaterThan(0);
    }
  });
});

describe("tokenize", () => {
  it("splits a query into lowercase words", () => {
    expect(tokenize("  Load-Bearing, Capacity! ")).toEqual(["load", "bearing", "capacity"]);
  });

  it("counts a repeated word once", () => {
    expect(tokenize("bead bead BEAD")).toEqual(["bead"]);
  });

  it("keeps a query to a handful of words", () => {
    expect(tokenize("one two three four five six seven eight")).toHaveLength(6);
  });
});

describe("makeSnippet", () => {
  it("leaves a short line alone", () => {
    expect(makeSnippet("Beads count one.", ["bead"])).toBe("Beads count one.");
  });

  it("windows a long one around the match", () => {
    const snippet = makeSnippet(`${"x".repeat(300)} bead ${"y".repeat(300)}`, ["bead"]);

    expect(snippet).toContain("bead");
    expect(snippet.startsWith("…")).toBe(true);
    expect(snippet.endsWith("…")).toBe(true);
    expect(snippet.length).toBeLessThanOrEqual(162);
  });
});
