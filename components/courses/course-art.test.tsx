import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CourseArt } from "@/components/courses/course-art";
import { FractionsArt } from "@/components/courses/illustrations/fractions";
import { OperatorsArt } from "@/components/courses/illustrations/operators";
import type { PathCourse } from "@/modules/course/paths";

const base: PathCourse = {
  slug: "understanding-abacus",
  title: "Understanding Abacus",
  tagline: "From your first bead to fast mental math.",
  subject: "Abacus",
  status: "available",
  sample: [4, 3, 2, 1],
  accent: "bg-gradient-to-br from-orange-100 to-amber-100",
  heroAccent: "from-orange-400 via-amber-300 to-yellow-200",
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

    expect(colours.filter((fill) => fill === "#4f46e5")).toHaveLength(3);
    expect(colours.filter((fill) => fill === "#c7d2fe")).toHaveLength(1);
    // The unshaded quarter is the last one drawn — the top-left slice.
    expect(colours[3]).toBe("#c7d2fe");
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
