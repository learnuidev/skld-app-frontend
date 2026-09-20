import { render } from "@testing-library/react";
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

/** The corners a shape occupies, in scene coordinates. */
function corners(shape: Element): [number, number][] {
  const read = (attribute: string) => {
    const raw = shape.getAttribute(attribute);
    return raw === null ? null : Number(raw);
  };
  const at = (a: string, b: string): [number, number][] => [
    [read(a) ?? 0, read(b) ?? 0],
  ];

  switch (shape.tagName) {
    case "rect": {
      const [x, y] = [read("x") ?? 0, read("y") ?? 0];
      return [
        [x, y],
        [x + (read("width") ?? 0), y + (read("height") ?? 0)],
      ];
    }
    case "line":
      return [
        [read("x1") ?? 0, read("y1") ?? 0],
        [read("x2") ?? 0, read("y2") ?? 0],
      ];
    case "circle": {
      const [cx, cy, r] = [read("cx") ?? 0, read("cy") ?? 0, read("r") ?? 0];
      return [
        [cx - r, cy - r],
        [cx + r, cy + r],
      ];
    }
    case "polygon": {
      const numbers = (shape.getAttribute("points") ?? "")
        .split(/[\s,]+/)
        .map(Number)
        .filter(Number.isFinite);
      const out: [number, number][] = [];
      for (let i = 0; i + 1 < numbers.length; i += 2) out.push([numbers[i], numbers[i + 1]]);
      return out;
    }
    default:
      return at("x", "y");
  }
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

  it("keeps every shape inside the drawing, so nothing is cut off", () => {
    // A shape may overhang the frame by a hair; anything more is a mistake.
    const slack = 8;
    const problems: string[] = [];

    for (const name of NAMES) {
      const { container, unmount } = draw(name);

      for (const shape of container.querySelectorAll("rect, line, circle, polygon, text")) {
        for (const [x, y] of corners(shape)) {
          if (x < -slack || x > SCENE_WIDTH + slack) {
            problems.push(`${name}: ${shape.tagName} reaches x=${x}`);
          }
          if (y < -slack || y > SCENE_HEIGHT + slack) {
            problems.push(`${name}: ${shape.tagName} reaches y=${y}`);
          }
        }
      }

      unmount();
    }

    expect(problems).toEqual([]);
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

  it("names every part of a scene once the names are on", () => {
    const problems: string[] = [];

    for (const name of NAMES) {
      const { container, unmount } = draw(name, { labels: true });
      const written = [...container.querySelectorAll("text")].map((text) =>
        (text.textContent ?? "").trim().toLowerCase(),
      );

      for (const part of SCENE_PARTS[name]) {
        // The part's own name, or the shorter one its drawing has room for.
        const wanted = (part.tag ?? part.label).toLowerCase();
        if (!written.includes(wanted)) {
          problems.push(`${name}: "${wanted}" is never written on the drawing`);
        }
      }

      unmount();
    }

    expect(problems).toEqual([]);
  });

  it("keeps every name written on the drawing inside the frame", () => {
    // jsdom measures no text, so a name is judged by an estimate of its width:
    // 7px bold runs a little under 4.2px a character, which is enough to catch
    // a name that runs off the edge of the drawing.
    const PER_CHARACTER = 4.2;
    const slack = 2;
    const problems: string[] = [];

    for (const name of NAMES) {
      const { container, unmount } = draw(name, { labels: true });

      for (const text of container.querySelectorAll("text")) {
        const written = text.textContent ?? "";
        const x = Number(text.getAttribute("x") ?? 0);
        const y = Number(text.getAttribute("y") ?? 0);
        const width = written.length * PER_CHARACTER;
        const anchor = text.getAttribute("text-anchor") ?? "middle";
        const left = anchor === "start" ? x : anchor === "end" ? x - width : x - width / 2;

        if (left < -slack || left + width > SCENE_WIDTH + slack) {
          problems.push(
            `${name}: "${written}" runs from ${left.toFixed(1)} to ${(left + width).toFixed(1)}`,
          );
        }
        if (y - 6 < -slack || y + 6 > SCENE_HEIGHT + slack) {
          problems.push(`${name}: "${written}" sits at y=${y}`);
        }
      }

      unmount();
    }

    expect(problems).toEqual([]);
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
