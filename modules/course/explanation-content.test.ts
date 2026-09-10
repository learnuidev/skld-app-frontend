import { describe, expect, it } from "vitest";

import { courseContentRegistry } from "@/modules/course/content";
import type { ExplanationVisual, LessonBlock } from "@/modules/course/types";

/** Every explanation step in every course, tagged with where it came from. */
function explanationSteps(): { where: string; block: LessonBlock; visual: ExplanationVisual }[] {
  const out: { where: string; block: LessonBlock; visual: ExplanationVisual }[] = [];

  for (const [course, levels] of Object.entries(courseContentRegistry)) {
    for (const [level, lessons] of Object.entries(levels)) {
      for (const [lesson, blocks] of Object.entries(lessons)) {
        (Array.isArray(blocks) ? blocks : []).forEach((block, i) => {
          if (block.type !== "build" && block.type !== "read" && block.type !== "quiz") return;
          (block.explanation?.steps ?? []).forEach((step, s) => {
            if (step.visual) {
              out.push({ where: `${course}/${level}/${lesson} block ${i} step ${s}`, block, visual: step.visual });
            }
          });
        });
      }
    }
  }

  return out;
}

/** A rod never holds more than nine beads, and always holds a whole number of them. */
function expectRodCounts(digits: number[], where: string) {
  expect(digits.length, `${where}: rods`).toBeGreaterThan(0);
  digits.forEach((d) => {
    expect(Number.isInteger(d), `${where}: ${d} is not a whole number`).toBe(true);
    expect(d, `${where}: rod shows ${d}`).toBeGreaterThanOrEqual(0);
    expect(d, `${where}: rod shows ${d}`).toBeLessThanOrEqual(9);
  });
}

describe("explanation visuals", () => {
  const steps = explanationSteps();

  it("has a visual to check at all", () => {
    expect(steps.length).toBeGreaterThan(0);
  });

  it("draws every board with rods a bead frame can actually hold", () => {
    for (const { where, visual } of steps) {
      if (visual.kind === "abacus") {
        expectRodCounts(visual.digits, where);
      } else if (visual.kind === "abacus-anim") {
        expect(visual.frames.length, `${where}: frames`).toBeGreaterThan(0);
        const rods = visual.frames[0].length;
        visual.frames.forEach((frame, f) => {
          expect(frame.length, `${where}: frame ${f} has a different rod count`).toBe(rods);
          expectRodCounts(frame, `${where} frame ${f}`);
        });
        if (visual.captions) {
          expect(visual.captions.length, `${where}: captions`).toBe(visual.frames.length);
        }
      } else {
        expect(visual.src, `${where}: image src`).toBeTruthy();
      }
    }
  });

  it("draws on as many rods as the task hands the student", () => {
    for (const { where, block, visual } of steps) {
      if (block.type !== "build" || !block.rods) continue;
      const rods = block.rods;
      const drawn = visual.kind === "abacus" ? [visual.digits] : visual.kind === "abacus-anim" ? visual.frames : [];
      drawn.forEach((digits, f) => {
        expect(digits.length, `${where}: board ${f} against ${rods} rods`).toBe(rods);
      });
    }
  });
});
