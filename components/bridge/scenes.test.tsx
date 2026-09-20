import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PALETTE } from "@/components/courses/illustrations/palette";
import {
  SCENE_HEIGHT,
  SCENE_LABELS,
  SCENE_PARTS,
  SCENES,
  SCENE_WIDTH,
  type SceneShapes,
} from "@/components/bridge/scenes";
import type { BridgeScene } from "@/modules/course/types";

const NAMES = Object.keys(SCENES) as BridgeScene[];

/** Every scene, drawn inside a plain svg so it can be inspected. */
function draw(name: BridgeScene, shapes: SceneShapes = {}) {
  return render(<svg>{SCENES[name](shapes)}</svg>);
}

/** Elements painted in a colour — the palette's parts, counted exactly. */
function painted(container: HTMLElement, fill: string) {
  return [...container.querySelectorAll(`[fill="${fill}"]`)];
}

describe("bridge scenes", () => {
  it("draws something for every named scene", () => {
    for (const name of NAMES) {
      const { container, unmount } = draw(name);
      const svg = container.querySelector("svg");
      const shapes = svg?.querySelectorAll("rect, path, line, polygon, circle, text") ?? [];

      expect(shapes.length, `${name} draws nothing`).toBeGreaterThan(4);
      unmount();
    }
  });

  it("keeps every scene on its own light plate", () => {
    for (const name of NAMES) {
      const { container, unmount } = draw(name);
      const plate = painted(container, PALETTE.fog);

      expect(plate.length, `${name} has no plate`).toBeGreaterThan(0);
      expect(plate[0].getAttribute("width")).toBe(String(SCENE_WIDTH));
      expect(plate[0].getAttribute("height")).toBe(String(SCENE_HEIGHT));
      unmount();
    }
  });

  it("gives every scene a description for screen readers", () => {
    for (const name of NAMES) {
      expect(SCENE_LABELS[name]?.length ?? 0, `${name} has no label`).toBeGreaterThan(10);
    }
  });

  it("describes each scene as its own drawing", () => {
    const labels = NAMES.map((name) => SCENE_LABELS[name]);

    expect(new Set(labels).size).toBe(labels.length);
  });

  it("draws the part it is told to point at in the bright note", () => {
    const { container } = draw("overview", { highlight: ["superstructure"] });

    expect(painted(container, PALETTE.yellow).length).toBeGreaterThan(0);
    // Everything else fades back so the eye lands on the named part.
    expect(container.querySelectorAll('[opacity="0.3"]').length).toBeGreaterThan(0);
  });

  it("writes the names on only when asked", () => {
    const quiet = draw("bearings", { labels: false });
    const named = draw("bearings", { labels: true });

    expect(quiet.container.querySelectorAll("text")).toHaveLength(0);
    expect(named.container.querySelectorAll("text").length).toBeGreaterThan(0);
  });

  it("keeps a plain figure free of annotations", () => {
    const plain = draw("cable-stayed", {});
    const annotated = draw("cable-stayed", { labels: true });

    expect(plain.container.querySelectorAll("text")).toHaveLength(0);
    expect(annotated.container.querySelectorAll("text").length).toBeGreaterThan(0);
  });
});

describe("scene parts", () => {
  it("names the parts of every scene", () => {
    for (const name of NAMES) {
      expect(SCENE_PARTS[name].length, `${name} has no parts`).toBeGreaterThan(1);
    }
  });

  it("keeps part ids unique within a scene", () => {
    for (const name of NAMES) {
      const ids = SCENE_PARTS[name].map((part) => part.id);
      expect(new Set(ids).size, `${name} repeats a part id`).toBe(ids.length);
    }
  });

  it("pins every part on the drawing, not off the edge", () => {
    for (const name of NAMES) {
      for (const part of SCENE_PARTS[name]) {
        const [x, y] = part.at;
        expect(x, `${name}/${part.id} is pinned off the drawing`).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThanOrEqual(SCENE_WIDTH);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThanOrEqual(SCENE_HEIGHT);
      }
    }
  });

  it("gives every part a name and something to say", () => {
    for (const name of NAMES) {
      for (const part of SCENE_PARTS[name]) {
        expect(part.label.length, `${name}/${part.id} has no label`).toBeGreaterThan(2);
        expect(part.note.length, `${name}/${part.id} has no note`).toBeGreaterThan(20);
      }
    }
  });

  it("keeps two pins of one scene apart enough to tap", () => {
    for (const name of NAMES) {
      const parts = SCENE_PARTS[name];
      for (let i = 0; i < parts.length; i += 1) {
        for (let j = i + 1; j < parts.length; j += 1) {
          const [ax, ay] = parts[i].at;
          const [bx, by] = parts[j].at;
          const apart = Math.hypot(ax - bx, ay - by);
          expect(
            apart,
            `${name}: ${parts[i].id} and ${parts[j].id} are ${apart.toFixed(1)} apart`,
          ).toBeGreaterThan(20);
        }
      }
    }
  });
});
