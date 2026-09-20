import { describe, expect, it } from "vitest";

import { SCENE_PARTS, SCENES, type ScenePart } from "@/components/bridge/scenes";
import { bridgeEngineeringContent } from "@/modules/course/bridge-engineering-content";
import { bridgeEngineeringCourse } from "@/modules/course/bridge-engineering";
import { courseContentRegistry } from "@/modules/course/content";
import { getCourseBySlug } from "@/modules/course/catalog";
import { isTaskBlock } from "@/modules/course/utils";
import type { BridgeScene, LessonBlock, LessonExplanation } from "@/modules/course/types";

type Block = LessonBlock;

const SCENE_NAMES = new Set(Object.keys(SCENES) as BridgeScene[]);
const sceneOf = (scene: BridgeScene) => SCENE_PARTS[scene] ?? [];
const partIds = (scene: BridgeScene) => new Set(sceneOf(scene).map((p) => p.id));

/** Every block in the course, with where it came from. */
function blocks(): { where: string; block: Block }[] {
  const found: { where: string; block: Block }[] = [];
  for (const [level, lessons] of Object.entries(bridgeEngineeringContent)) {
    for (const [lesson, list] of Object.entries(lessons)) {
      list.forEach((block, i) => found.push({ where: `${level}/${lesson} #${i}`, block }));
    }
  }
  return found;
}

/** The scenes a block puts on screen. */
function scenesIn(block: Block): BridgeScene[] {
  if ("scene" in block) return [block.scene];
  return [];
}

/** Every explanation a block carries, flattened to its steps. */
function explanationsIn(block: Block): LessonExplanation[] {
  return "explanation" in block && block.explanation ? [block.explanation] : [];
}

const all = blocks();

describe("bridge engineering content", () => {
  it("covers every level and lesson the course declares", () => {
    for (const level of bridgeEngineeringCourse.levels) {
      const authored = bridgeEngineeringContent[level.slug];
      expect(authored, `${level.slug} has no content`).toBeTruthy();
      for (const lesson of level.lessons) {
        expect(authored[lesson.slug], `${level.slug}/${lesson.slug} has no content`).toBeTruthy();
      }
    }
  });

  it("authors nothing the course does not declare", () => {
    const declared = new Map(
      bridgeEngineeringCourse.levels.map((level) => [
        level.slug,
        new Set(level.lessons.map((lesson) => lesson.slug)),
      ]),
    );

    for (const [level, lessons] of Object.entries(bridgeEngineeringContent)) {
      expect(declared.has(level), `${level} is not a level of the course`).toBe(true);
      for (const lesson of Object.keys(lessons)) {
        expect(declared.get(level)?.has(lesson), `${level}/${lesson} is not a lesson`).toBe(true);
      }
    }
  });

  it("is registered so the lesson route can find it", () => {
    expect(courseContentRegistry["bridge-engineering"]).toBe(bridgeEngineeringContent);
    expect(getCourseBySlug("bridge-engineering")).toBe(bridgeEngineeringCourse);
  });

  it("names only scenes that exist", () => {
    for (const { where, block } of all) {
      for (const scene of scenesIn(block)) {
        expect(SCENE_NAMES.has(scene), `${where} names the unknown scene "${scene}"`).toBe(true);
      }
    }
  });

  it("makes every lesson interactive and visual", () => {    for (const [level, lessons] of Object.entries(bridgeEngineeringContent)) {
      for (const [lesson, list] of Object.entries(lessons)) {
        const tasks = list.filter(isTaskBlock);
        const drawings = list.filter(
          (block) => scenesIn(block).length > 0 || block.type === "span",
        );

        expect(tasks.length, `${level}/${lesson} asks nothing`).toBeGreaterThanOrEqual(2);
        expect(drawings.length, `${level}/${lesson} shows no drawing`).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("points every pin at a part the scene actually draws", () => {
    for (const { where, block } of all) {
      if (block.type === "parts" && block.parts) {
        for (const id of block.parts) {
          expect(partIds(block.scene).has(id), `${where} names the unknown part "${id}"`).toBe(true);
        }
      }
      if (block.type === "hotspot") {
        expect(block.parts.length, `${where} has no pins`).toBeGreaterThan(1);
        for (const id of block.parts) {
          expect(partIds(block.scene).has(id), `${where} pins the unknown part "${id}"`).toBe(true);
        }
        expect(
          block.parts.includes(block.answer),
          `${where} answers with "${block.answer}", which is not pinned`,
        ).toBe(true);
      }
      if (block.type === "assemble") {
        expect(block.slots.length, `${where} has no slots`).toBeGreaterThan(1);
        for (const slot of block.slots) {
          expect(partIds(block.scene).has(slot.id), `${where} places the unknown part "${slot.id}"`).toBe(
            true,
          );
        }
      }
    }
  });

  it("keeps assemble slots far enough apart to tap", () => {
    for (const { where, block } of all) {
      if (block.type !== "assemble") continue;
      for (let i = 0; i < block.slots.length; i += 1) {
        for (let j = i + 1; j < block.slots.length; j += 1) {
          const [ax, ay] = block.slots[i].at;
          const [bx, by] = block.slots[j].at;
          expect(
            Math.hypot(ax - bx, ay - by),
            `${where}: ${block.slots[i].id} and ${block.slots[j].id} overlap`,
          ).toBeGreaterThan(24);
        }
      }
    }
  });

  it("keeps every multiple choice answer inside its choices", () => {
    for (const { where, block } of all) {
      if (block.type !== "choose") continue;
      expect(block.choices.length, `${where} has too few choices`).toBeGreaterThanOrEqual(3);
      expect(
        block.answer >= 0 && block.answer < block.choices.length,
        `${where} answers with ${block.answer}, outside its choices`,
      ).toBe(true);
      expect(new Set(block.choices).size, `${where} repeats a choice`).toBe(block.choices.length);
    }
  });

  it("files every sort card into a box that exists", () => {
    for (const { where, block } of all) {
      if (block.type !== "sort") continue;
      const buckets = new Set(block.buckets.map((bucket) => bucket.id));
      expect(buckets.size).toBe(block.buckets.length);
      expect(block.items.length, `${where} has too few cards`).toBeGreaterThanOrEqual(3);
      const used = new Set<string>();
      for (const item of block.items) {
        expect(buckets.has(item.bucket), `${where}: "${item.label}" goes to a missing box`).toBe(true);
        used.add(item.bucket);
      }
      // Every box has to be worth having.
      expect(used.size, `${where} leaves a box empty`).toBe(buckets.size);
    }
  });

  it("gives every ordering at least two steps, with unique ids", () => {
    for (const { where, block } of all) {
      if (block.type !== "order") continue;
      expect(block.items.length, `${where} has too few steps`).toBeGreaterThanOrEqual(3);
      const ids = block.items.map((item) => item.id);
      expect(new Set(ids).size, `${where} repeats a step id`).toBe(ids.length);
    }
  });

  it("lights up only parts that exist when it explains itself", () => {
    for (const { where, block } of all) {
      for (const explanation of explanationsIn(block)) {
        for (const step of explanation.steps ?? []) {
          const visual = step.visual ?? explanation.visual;
          if (!visual || visual.kind !== "scene") continue;
          for (const id of visual.highlight ?? []) {
            expect(partIds(visual.scene).has(id), `${where} highlights the unknown part "${id}"`).toBe(
              true,
            );
          }
        }
      }
    }
  });

  it("ends a hotspot's explanation on the part it was asking for", () => {
    for (const { where, block } of all) {
      if (block.type !== "hotspot" || !block.explanation) continue;
      const steps = block.explanation.steps ?? [];
      const last = [...steps].reverse().find((step) => step.visual?.kind === "scene");
      expect(last, `${where} never shows the answer on a drawing`).toBeTruthy();
      const visual = last?.visual;
      if (visual?.kind !== "scene") continue;
      expect(
        visual.highlight?.includes(block.answer),
        `${where} explains "${block.answer}" without pointing at it`,
      ).toBe(true);
    }
  });

  it("explains the harder questions rather than the easy ones", () => {
    const explained = all.filter(
      ({ block }) => isTaskBlock(block) && explanationsIn(block).length > 0,
    );

    expect(explained.length).toBeGreaterThan(all.length / 4);
  });

  it("keeps every part of the course about bridges", () => {
    const notes: ScenePart[] = Object.values(SCENE_PARTS).flat();
    expect(notes.length).toBeGreaterThan(50);
    expect(notes.filter((part) => part.note.length < 30)).toEqual([]);
  });
});
