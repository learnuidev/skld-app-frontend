import { describe, expect, it } from "vitest";

import { courseContentRegistry } from "@/modules/course/content";
import { DIAGRAM_NAMES, type LessonBlock, type LessonFigure } from "@/modules/course/types";

/**
 * The rule this suite exists for: **no step is words alone.** Every heading,
 * paragraph and list in every course carries a picture — a drawing, a live
 * board, a bridge scene, or (for a paragraph) an example animation.
 */
const DIAGRAMS = new Set<string>(DIAGRAM_NAMES);

/** The picture a text step carries; question steps carry none. */
function figureOf(block: LessonBlock): LessonFigure | undefined {
  if (block.type === "heading" || block.type === "paragraph" || block.type === "list") {
    return block.figure;
  }
  return undefined;
}

function blocksOf(course: string): { where: string; block: LessonBlock }[] {
  const levels = courseContentRegistry[course] ?? {};
  const found: { where: string; block: LessonBlock }[] = [];

  for (const [level, lessons] of Object.entries(levels)) {
    for (const [lesson, blocks] of Object.entries(lessons)) {
      (Array.isArray(blocks) ? blocks : []).forEach((block, i) => {
        found.push({
          where: `${course}/${level}/${lesson} block ${i} (${block.type} ${block.id})`,
          block,
        });
      });
    }
  }

  return found;
}

/** Text blocks are every step that is not a question. */
function isText(block: LessonBlock): boolean {
  return block.type === "heading" || block.type === "paragraph" || block.type === "list";
}

const courses = Object.keys(courseContentRegistry);

describe.each(courses)("%s text steps", (course) => {
  const blocks = blocksOf(course);
  const text = blocks.filter(({ block }) => isText(block));

  it("has text steps to illustrate at all", () => {
    expect(text.length).toBeGreaterThan(0);
  });

  it("gives every heading, paragraph and list a picture", () => {
    const missing = text
      .filter(({ block }) => {
        if (block.type === "paragraph") return !figureOf(block) && !block.demo;
        return !figureOf(block);
      })
      .map(({ where }) => where);

    expect(missing).toEqual([]);
  });

  it("names only drawings that exist", () => {
    const problems: string[] = [];

    for (const { where, block } of text) {
      const visual = figureOf(block)?.visual;
      if (!visual || visual.kind !== "diagram") continue;
      if (!DIAGRAMS.has(visual.name)) problems.push(`${where}: unknown drawing "${visual.name}"`);
    }

    expect(problems).toEqual([]);
  });

  it("hands each drawing numbers it can work with", () => {
    const problems: string[] = [];

    for (const { where, block } of text) {
      const visual = figureOf(block)?.visual;
      if (!visual || visual.kind !== "diagram" || !visual.numbers) continue;

      if (visual.numbers.length > 6) problems.push(`${where}: ${visual.numbers.length} numbers`);
      visual.numbers.forEach((number, i) => {
        if (!Number.isInteger(number) || number < 0 || number > 999999) {
          problems.push(`${where}: numbers[${i}] is ${number}`);
        }
      });
      if (visual.name === "one-rod" && (visual.numbers[0] ?? 0) > 9) {
        problems.push(`${where}: one rod cannot show ${visual.numbers[0]}`);
      }
    }

    expect(problems).toEqual([]);
  });

  it("writes a caption a learner can read on its own", () => {
    const problems: string[] = [];

    for (const { where, block } of text) {
      const caption = figureOf(block)?.caption;
      if (!caption) continue;

      if (caption.length > 140) problems.push(`${where}: ${caption.length} characters`);
      if (!caption.endsWith(".")) problems.push(`${where}: no full stop — "${caption}"`);
      if (/\b(image|picture|figure|illustration|shown below|above)\b/i.test(caption)) {
        problems.push(`${where}: caption talks about the drawing — "${caption}"`);
      }
    }

    expect(problems).toEqual([]);
  });

  it("draws any board with beads a rod can hold", () => {
    const problems: string[] = [];

    for (const { where, block } of text) {
      const visual = figureOf(block)?.visual;
      if (!visual) continue;

      if (visual.kind === "image" && !visual.src) problems.push(`${where}: image without a src`);

      const boards =
        visual.kind === "abacus" ? [visual.digits] : visual.kind === "abacus-anim" ? visual.frames : [];

      boards.forEach((board, frame) => {
        if (board.length === 0) problems.push(`${where} board ${frame}: no rods`);
        board.forEach((digit) => {
          if (!Number.isInteger(digit) || digit < 0 || digit > 9) {
            problems.push(`${where} board ${frame}: a rod cannot show ${digit}`);
          }
        });
      });
    }

    expect(problems).toEqual([]);
  });
});
