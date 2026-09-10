import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CourseArt } from "@/components/courses/course-art";
import {
  AbacusArt,
  BeadArt,
  MentalArt,
  SuanpanArt,
} from "@/components/courses/illustrations/abacus";
import { FractionsArt } from "@/components/courses/illustrations/fractions";
import { NumeralsArt } from "@/components/courses/illustrations/numerals";
import { OperatorsArt } from "@/components/courses/illustrations/operators";
import { PALETTE } from "@/components/courses/illustrations/palette";
import type { PathCourse } from "@/modules/course/paths";

const base: PathCourse = {
  slug: "understanding-abacus",
  title: "Understanding Abacus",
  tagline: "From your first bead to fast mental math.",
  subject: "Abacus",
  status: "available",
  sample: [4, 3, 2, 1],
  lessonCount: 12,
};

describe("CourseArt", () => {
  it("draws a course's own artwork when it has some", () => {
    render(<CourseArt course={{ ...base, slug: "fractions", title: "Fractions", art: "fractions" }} />);

    const art = screen.getByRole("img", { name: "Fractions illustration" });

    expect(art.tagName.toLowerCase()).toBe("svg");
  });

  it("falls back to the abacus preview", () => {
    render(<CourseArt course={base} />);

    expect(
      screen.getByRole("img", { name: "Understanding Abacus illustration" }),
    ).toBeInTheDocument();
  });

  it("draws a blank board for a path with no courses", () => {
    render(<CourseArt />);

    expect(screen.getByRole("img", { name: "Course illustration" })).toBeInTheDocument();
  });

  it("lets the caller name the art, as a path icon needs", () => {
    render(
      <CourseArt
        course={{ ...base, slug: "fractions", title: "Fractions", art: "fractions" }}
        label="Math Fundamentals illustration"
      />,
    );

    expect(
      screen.getByRole("img", { name: "Math Fundamentals illustration" }),
    ).toBeInTheDocument();
  });

  it("lets a path override its lead course's artwork", () => {
    const { container } = render(<CourseArt course={{ ...base, art: "fractions" }} art="operators" />);

    // The four operator tiles, not the pie.
    expect(container.querySelectorAll("rect")).toHaveLength(4);
    expect(screen.getByRole("img")).toHaveAccessibleName("Understanding Abacus illustration");
  });
});

describe("OperatorsArt", () => {
  it("draws one tile per operation", () => {
    const { container } = render(<OperatorsArt />);

    expect(container.querySelectorAll("rect")).toHaveLength(4);
  });

  it("draws the four symbols from strokes, never text", () => {
    const { container } = render(<OperatorsArt />);

    expect(container.querySelectorAll("text")).toHaveLength(0);

    const lines = [...container.querySelectorAll("line")];
    // plus (2) + minus (1) + multiply (2) + divide (1)
    expect(lines).toHaveLength(6);
    // the divide sign's two dots
    expect(container.querySelectorAll("circle")).toHaveLength(2);
  });

  it("keeps every tile the same size, in a 2×2 grid", () => {
    const { container } = render(<OperatorsArt />);
    const tiles = [...container.querySelectorAll("rect")];
    const boxes = tiles.map((tile) => [
      tile.getAttribute("x"),
      tile.getAttribute("y"),
      tile.getAttribute("width"),
      tile.getAttribute("height"),
    ]);

    expect(new Set(boxes.map((box) => `${box[2]}x${box[3]}`)).size).toBe(1);
    expect(new Set(boxes.map((box) => box[0])).size).toBe(2);
    expect(new Set(boxes.map((box) => box[1])).size).toBe(2);
  });

  it("is described for screen readers", () => {
    render(<OperatorsArt />);

    expect(screen.getByRole("img")).toHaveAccessibleName(/add, subtract, multiply and divide/i);
  });
});

describe("FractionsArt", () => {
  /** Fill colours, in the order the quarters are drawn from the top. */
  function fills(container: HTMLElement) {
    return [...container.querySelectorAll("path")].map((path) => path.getAttribute("fill"));
  }

  it("splits the circle into four quarters", () => {
    const { container } = render(<FractionsArt />);

    expect(container.querySelectorAll("path")).toHaveLength(4);
    expect(new Set([...container.querySelectorAll("path")].map((p) => p.getAttribute("d"))).size).toBe(4);
  });

  it("shades three of the four quarters", () => {
    const { container } = render(<FractionsArt />);
    const colours = fills(container);

    expect(colours.filter((fill) => fill === PALETTE.ink)).toHaveLength(3);
    expect(colours.filter((fill) => fill === PALETTE.butter)).toHaveLength(1);
    // The unshaded quarter is the last one drawn — the top-left slice.
    expect(colours[3]).toBe(PALETTE.butter);
  });

  it("draws every quarter as an equal slice of the same circle", () => {
    const { container } = render(<FractionsArt />);

    for (const path of container.querySelectorAll("path")) {
      const d = path.getAttribute("d") ?? "";
      // A straight edge to the centre, then a minor arc (large-arc-flag 0) of
      // the shared radius: every quarter spans the same 90 degrees.
      expect(d.startsWith("M 50 50 L ")).toBe(true);
      expect(d).toContain("A 42 42 0 0 1 ");
    }
  });

  it("is described for screen readers", () => {
    render(<FractionsArt />);

    expect(screen.getByRole("img")).toHaveAccessibleName(/three of them filled/i);
  });
});

/** Beads are the only shapes painted in these colours, so they count exactly. */
function painted(container: HTMLElement, fill: string) {
  return [...container.querySelectorAll("[fill]")].filter(
    (shape) => shape.getAttribute("fill") === fill,
  );
}

describe("abacus artwork", () => {
  it("draws the soroban as one heaven bead and four earth beads per rod", () => {
    const { container } = render(<AbacusArt />);

    expect(painted(container, PALETTE.ink)).toHaveLength(1);
    expect(painted(container, PALETTE.yellow)).toHaveLength(3);
    expect(painted(container, PALETTE.paper)).toHaveLength(12);
  });

  it("draws the Chinese suanpan with its two and five beads", () => {
    const { container } = render(<SuanpanArt />);

    expect(painted(container, PALETTE.ink)).toHaveLength(1);
    // Two heaven and five earth beads, on each of three rods.
    expect(painted(container, PALETTE.yellow)).toHaveLength(6);
    expect(painted(container, PALETTE.yellowDeep)).toHaveLength(15);
    // The suanpan is never mistaken for the soroban.
    expect(painted(container, PALETTE.paper)).toHaveLength(0);
  });

  it("draws one rod up close for the bead lesson", () => {
    const { container } = render(<BeadArt />);

    expect(painted(container, PALETTE.yellow)).toHaveLength(1);
    expect(painted(container, PALETTE.paper)).toHaveLength(3);
    // A halo picks out the bead being explained.
    expect(container.querySelectorAll("circle")).toHaveLength(1);
  });

  it("draws the mental board as a dashed ghost with a spark", () => {
    const { container } = render(<MentalArt />);

    const dashed = [...container.querySelectorAll("rect")].filter((rect) =>
      rect.getAttribute("stroke-dasharray"),
    );

    expect(dashed).toHaveLength(1);
    expect(container.querySelectorAll("path")).toHaveLength(1);
    expect(container.querySelectorAll("rect")).toHaveLength(5);
  });

  it("gives every piece of abacus art its own look", () => {
    const looks = [AbacusArt, BeadArt, MentalArt, SuanpanArt, NumeralsArt].map((Art) => {
      const { container } = render(<Art />);
      return container.querySelector("svg")?.innerHTML;
    });

    expect(new Set(looks).size).toBe(looks.length);
  });
});

describe("NumeralsArt", () => {
  it("draws one, two, three as strokes of increasing length", () => {
    const { container } = render(<NumeralsArt />);
    const lines = [...container.querySelectorAll("line")];

    expect(lines).toHaveLength(3);

    const widths = lines.map(
      (line) => Number(line.getAttribute("x2")) - Number(line.getAttribute("x1")),
    );
    expect(widths[0]).toBeLessThan(widths[1]);
    expect(widths[1]).toBeLessThan(widths[2]);
    // Every stroke shares the centre line, like the characters do.
    expect(new Set(lines.map((line) => Number(line.getAttribute("y1")))).size).toBe(3);
  });

  it("draws the numerals, never text", () => {
    const { container } = render(<NumeralsArt />);

    expect(container.querySelectorAll("text")).toHaveLength(0);
    expect(screen.getByRole("img")).toHaveAccessibleName(/one, two and three/i);
  });
});
