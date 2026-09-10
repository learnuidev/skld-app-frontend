import { describe, expect, it } from "vitest";

import { courseContentRegistry } from "@/modules/course/content";
import type {
  CourseContentMap,
  ExplanationStep,
  LessonBlock,
  LessonExplanation,
} from "@/modules/course/types";

type TaskBlock = Extract<LessonBlock, { type: "build" | "read" | "quiz" }>;

interface Walkthrough {
  where: string;
  block: TaskBlock;
  steps: ExplanationStep[];
}

/** The steps a "Why?" walks through — authored ones, or one built from `text`/`visual`. */
function stepsOf(explanation: LessonExplanation): ExplanationStep[] {
  if (explanation.steps?.length) return explanation.steps;
  return [{ text: explanation.text ?? "", visual: explanation.visual }];
}

function value(digits: number[]): number {
  return digits.reduce((total, digit, rod) => total + digit * 10 ** rod, 0);
}

/** The number the student has to reach, whichever kind of task asked. */
function answerOf(block: TaskBlock): number {
  return block.type === "build" ? block.target : block.type === "read" ? value(block.digits) : block.answer;
}

/** How many rods the task puts on screen, or undefined when it never says. */
function rodCountOf(block: TaskBlock): number | undefined {
  if (block.type === "build") return block.rods ?? 2;
  if (block.type === "read") return block.digits.length;
  return undefined;
}

function walkthroughsOf(levels: CourseContentMap): Walkthrough[] {
  const found: Walkthrough[] = [];
  for (const [level, lessons] of Object.entries(levels)) {
    for (const [lesson, blocks] of Object.entries(lessons)) {
      (Array.isArray(blocks) ? blocks : []).forEach((block, i) => {
        if (block.type !== "build" && block.type !== "read" && block.type !== "quiz") return;
        if (!block.explanation) return;
        found.push({
          where: `${level}/${lesson} block ${i} (${block.type})`,
          block,
          steps: stepsOf(block.explanation),
        });
      });
    }
  }
  return found;
}

/** The board a visual leaves on screen. */
function endBoard(visual: ExplanationStep["visual"]): number[] | null {
  if (!visual) return null;
  if (visual.kind === "abacus") return visual.digits;
  if (visual.kind === "abacus-anim") return visual.frames[visual.frames.length - 1] ?? null;
  return null;
}

const courses = Object.entries(courseContentRegistry);

/**
 * Courses whose walkthroughs are all boarded. The others still have text-only
 * steps, so their completeness is not asserted yet — their boards, where they
 * exist, are checked like everyone else's.
 */
const FULLY_BOARDED = new Set(["understanding-abacus"]);

describe.each(courses)("%s explanation boards", (course, levels) => {
  const walkthroughs = walkthroughsOf(levels);

  it.skipIf(!FULLY_BOARDED.has(course))("gives every instruction a board to point at", () => {
    const missing = walkthroughs.flatMap(({ where, steps }) =>
      steps.filter((step) => !step.visual).map((step) => `${where}: ${step.text}`),
    );
    expect(missing).toEqual([]);
  });

  it("draws every board with beads a rod can hold", () => {
    const problems: string[] = [];

    for (const { where, steps } of walkthroughs) {
      steps.forEach((step, s) => {
        const { visual } = step;
        if (!visual) return;
        const context = `${where} step ${s}`;

        if (visual.kind === "image") {
          if (!visual.src) problems.push(`${context}: image without a src`);
          return;
        }

        const boards = visual.kind === "abacus" ? [visual.digits] : visual.frames;
        if (boards.length === 0) problems.push(`${context}: no frames`);

        const rods = boards[0]?.length ?? 0;
        boards.forEach((board, f) => {
          if (board.length !== rods) problems.push(`${context} frame ${f}: ${board.length} rods, expected ${rods}`);
          board.forEach((digit) => {
            if (!Number.isInteger(digit) || digit < 0 || digit > 9) {
              problems.push(`${context} frame ${f}: a rod cannot show ${digit}`);
            }
          });
        });

        if (visual.kind === "abacus-anim" && visual.captions && visual.captions.length !== boards.length) {
          problems.push(`${context}: ${visual.captions.length} captions for ${boards.length} frames`);
        }
      });
    }

    expect(problems).toEqual([]);
  });

  it("uses the rods the task hands the student", () => {
    const problems: string[] = [];

    for (const { where, block, steps } of walkthroughs) {
      const rods = rodCountOf(block);
      if (!rods) continue;

      steps.forEach((step, s) => {
        const { visual } = step;
        if (!visual || visual.kind === "image") return;
        const boards = visual.kind === "abacus" ? [visual.digits] : visual.frames;
        boards.forEach((board, f) => {
          if (board.length !== rods) {
            problems.push(`${where} step ${s} frame ${f}: ${board.length} rods, task gives ${rods}`);
          }
        });
      });
    }

    expect(problems).toEqual([]);
  });

  it("walks the explanation to the answer", () => {
    const problems: string[] = [];

    for (const { where, block, steps } of walkthroughs) {
      const last = [...steps].reverse().find((step) => step.visual);
      const board = endBoard(last?.visual);
      if (!board) continue;
      const answer = answerOf(block);
      if (value(board) !== answer) {
        problems.push(`${where}: ends on ${value(board)}, not ${answer} — "${last?.text}"`);
      }
    }

    expect(problems).toEqual([]);
  });
});
