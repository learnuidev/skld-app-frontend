import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FIGURES } from "@/components/courses/figures";
import { FIGURE_HEIGHT, FIGURE_WIDTH } from "@/components/courses/figures/kit";
import { PALETTE } from "@/components/courses/illustrations/palette";
import { DIAGRAM_NAMES } from "@/modules/course/types";

/** The only colours a drawing may use: the course palette, and nothing at all. */
const PALETTE_VALUES = new Set<string>([...Object.values(PALETTE), "none", "transparent"]);

/** Props a drawing may be handed, in every shape content uses. */
const PROPS_SHAPES = [
  {},
  { numbers: [3, 4, 5] },
  { numbers: [0] },
  { numbers: [9, 0, 7, 2, 1, 5] },
  { labels: ["first", "second", "third"] },
  { named: false },
  { numbers: [2, 3], labels: ["tens", "ones"], named: false },
];

function draw(name: (typeof DIAGRAM_NAMES)[number], props: Record<string, unknown> = {}) {
  const Drawing = FIGURES[name];
  if (!Drawing) throw new Error(`${name} is not drawn`);
  return render(<>{Drawing(props)}</>);
}

describe("concept figures", () => {
  it("draws every diagram content can name", () => {
    const missing = DIAGRAM_NAMES.filter((name) => typeof FIGURES[name] !== "function");
    expect(missing).toEqual([]);
  });

  it("draws one picture on one plate, whatever it is handed", () => {
    const problems: string[] = [];

    for (const name of DIAGRAM_NAMES) {
      for (const props of PROPS_SHAPES) {
        const { container, unmount } = draw(name, props);
        const plates = container.querySelectorAll("svg");
        const context = `${name} ${JSON.stringify(props)}`;

        if (plates.length !== 1) problems.push(`${context}: ${plates.length} plates, expected 1`);
        const plate = plates[0];
        if (plate) {
          if (plate.getAttribute("viewBox") !== `0 0 ${FIGURE_WIDTH} ${FIGURE_HEIGHT}`) {
            problems.push(`${context}: viewBox ${plate.getAttribute("viewBox")}`);
          }
          if (plate.getAttribute("role") !== "img") problems.push(`${context}: no role="img"`);
          const label = plate.getAttribute("aria-label") ?? "";
          if (label.trim().length < 8) problems.push(`${context}: label "${label}"`);
        }
        unmount();
      }
    }

    expect(problems).toEqual([]);
  });

  it("keeps every drawing on the plate", () => {
    const problems: string[] = [];
    const TOLERANCE = 2;

    const num = (element: Element, attribute: string) => {
      const raw = element.getAttribute(attribute);
      return raw === null ? null : Number(raw);
    };

    for (const name of DIAGRAM_NAMES) {
      const { container, unmount } = draw(name, { numbers: [4, 3, 2], labels: ["one", "two"] });

      for (const element of Array.from(container.querySelectorAll("svg *"))) {
        const where = `${name}: ${element.tagName}`;
        const x = num(element, "x");
        const y = num(element, "y");
        const width = num(element, "width");
        const height = num(element, "height");
        const cx = num(element, "cx");
        const cy = num(element, "cy");
        const r = num(element, "r");

        if (x !== null && (x < -TOLERANCE || x > FIGURE_WIDTH + TOLERANCE)) {
          problems.push(`${where} x=${x}`);
        }
        if (y !== null && (y < -TOLERANCE || y > FIGURE_HEIGHT + TOLERANCE)) {
          problems.push(`${where} y=${y}`);
        }
        if (x !== null && width !== null && x + width > FIGURE_WIDTH + TOLERANCE) {
          problems.push(`${where} runs off the right edge (${x} + ${width})`);
        }
        if (y !== null && height !== null && y + height > FIGURE_HEIGHT + TOLERANCE) {
          problems.push(`${where} runs off the bottom edge (${y} + ${height})`);
        }
        if (cx !== null && (cx < -TOLERANCE || cx > FIGURE_WIDTH + TOLERANCE)) {
          problems.push(`${where} cx=${cx}`);
        }
        if (cy !== null && (cy < -TOLERANCE || cy > FIGURE_HEIGHT + TOLERANCE)) {
          problems.push(`${where} cy=${cy}`);
        }
        if (cx !== null && r !== null && (cx - r < -TOLERANCE || cx + r > FIGURE_WIDTH + TOLERANCE)) {
          problems.push(`${where} bead off the side (${cx} ± ${r})`);
        }
        if (cy !== null && r !== null && (cy - r < -TOLERANCE || cy + r > FIGURE_HEIGHT + TOLERANCE)) {
          problems.push(`${where} bead off the top or bottom (${cy} ± ${r})`);
        }
      }
      unmount();
    }

    expect(problems).toEqual([]);
  });

  it("paints in the one course palette and nowhere else", () => {
    const problems: string[] = [];

    for (const name of DIAGRAM_NAMES) {
      const { container, unmount } = draw(name, { numbers: [7, 0, 5, 2], labels: ["a", "b"] });
      for (const element of Array.from(container.querySelectorAll("svg *"))) {
        for (const attribute of ["fill", "stroke"] as const) {
          const value = element.getAttribute(attribute);
          if (value && !PALETTE_VALUES.has(value)) {
            problems.push(`${name}: ${element.tagName} ${attribute}="${value}"`);
          }
        }
      }
      unmount();
    }

    expect(problems).toEqual([]);
  });

  it("hands every drawing a name a reader can hear", () => {
    const labels = new Map<string, string>();

    for (const name of DIAGRAM_NAMES) {
      const { container, unmount } = draw(name);
      const label = container.querySelector("svg")?.getAttribute("aria-label") ?? "";
      labels.set(name, label);
      unmount();
    }

    // The same drawing handed the same facts twice says the same thing.
    for (const name of DIAGRAM_NAMES) {
      const { container, unmount } = draw(name);
      expect(container.querySelector("svg")?.getAttribute("aria-label")).toBe(labels.get(name));
      unmount();
    }
  });
});
