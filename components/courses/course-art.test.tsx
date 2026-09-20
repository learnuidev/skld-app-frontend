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
import { BridgeArt } from "@/components/courses/illustrations/bridge";
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

describe("BridgeArt", () => {
  it("draws the bridge as one stone body, with its arch cut into it", () => {
    const { container } = render(<BridgeArt />);
    const stone = painted(container, PALETTE.charcoal);

    // The whole bridge is one silhouette: not a stack of bars.
    expect(stone).toHaveLength(1);
    expect(stone[0].tagName.toLowerCase()).toBe("path");

    const d = stone[0].getAttribute("d") ?? "";
    // The deck crossing the top, and the wide arch cut back beneath it — the
    // two curves that make the shape a bridge rather than a block of stone.
    expect(d).toContain("Q 50 40.5 96 47.5");
    expect(d).toContain("Q 50 38 17 68");
    expect(d.endsWith("Z")).toBe(true);
  });

  it("inks the deck slab and the arch ring over that stone", () => {
    const { container } = render(<BridgeArt />);

    // Two filled shapes in the subject's own ink: the roadway and the ring of
    // stones carrying the span. Everything else the bridge is drawn with is a
    // stroke.
    const inked = painted(container, PALETTE.ink);
    expect(inked).toHaveLength(2);
    for (const shape of inked) {
      expect(shape.tagName.toLowerCase()).toBe("path");
    }

    // Joints square on the soffit, cut into the stone in the paper's tone.
    expect(
      container.querySelectorAll(`[stroke="${PALETTE.paper}"]`).length,
    ).toBeGreaterThan(4);
  });

  it("carries a parapet above the deck, on a post in every bay", () => {
    const { container } = render(<BridgeArt />);
    const ink = [...container.querySelectorAll(`[stroke="${PALETTE.ink}"]`)];
    const posts = ink.filter((stroke) => stroke.tagName.toLowerCase() === "line");

    // One rail, and the posts holding it clear of the deck.
    expect(ink.filter((stroke) => stroke.tagName.toLowerCase() === "path")).toHaveLength(1);
    expect(posts.length).toBeGreaterThan(3);
  });

  it("crosses water painted as a wash, never a coloured band", () => {
    const { container } = render(<BridgeArt />);
    const wash = container.querySelector(`[fill="url(#bridge-art-water)"]`);

    expect(wash).toBeInTheDocument();
    // The horizon is set low, as a landscape sets it: the water is the bottom
    // third of the frame.
    expect(Number(wash!.getAttribute("y"))).toBeGreaterThanOrEqual(60);
    expect(Number(wash!.getAttribute("height"))).toBeGreaterThanOrEqual(25);

    // Nothing warm is laid on it as a band — no mustard stripe, no yellow
    // dashes. The only warm mark in the water is the moon's own whisper.
    for (const rect of container.querySelectorAll("rect")) {
      expect([PALETTE.yellow, PALETTE.butter]).not.toContain(rect.getAttribute("fill"));
    }
    expect(painted(container, PALETTE.yellow)).toHaveLength(1);
  });

  it("textures the water with pale ripples, every one below the horizon", () => {
    const { container } = render(<BridgeArt />);
    const ripples = [...container.querySelectorAll(`[stroke="${PALETTE.gray}"]`)];

    expect(ripples.length).toBeGreaterThanOrEqual(5);
    for (const ripple of ripples) {
      // Its first point: the start of the stroke, which is drawn on the water.
      const [, , y] = (ripple.getAttribute("d") ?? "").split(" ");
      expect(Number(y)).toBeGreaterThanOrEqual(68);
      expect(Number(ripple.getAttribute("opacity"))).toBeLessThan(0.5);
    }
  });

  it("sets the bridge in front of two washed ranges, the far one paler", () => {
    const { container } = render(<BridgeArt />);
    const ranges = [...container.querySelectorAll(`[fill="url(#bridge-art-ridge)"]`)];

    // Two ranges, the further one drawn first and washed more faintly.
    expect(ranges).toHaveLength(2);
    expect(Number(ranges[0].getAttribute("opacity"))).toBeLessThan(
      Number(ranges[1].getAttribute("opacity") ?? 1),
    );
    // And mist, laid between them and the water.
    expect(container.querySelector(`[fill="url(#bridge-art-mist)"]`)).toBeInTheDocument();
  });

  it("keeps the bright note for the moon, high in the empty sky", () => {
    const { container } = render(<BridgeArt />);
    const bright = painted(container, PALETTE.yellow);

    // Exactly one shape in the drawing's warmest colour: the moon's disc.
    expect(bright).toHaveLength(1);
    expect(bright[0].tagName.toLowerCase()).toBe("circle");
    expect(Number(bright[0].getAttribute("cy"))).toBeLessThan(40);
    // With a halo to glow into, rather than a disc sitting flat.
    expect(container.querySelector(`[fill="url(#bridge-art-moon-halo)"]`)).toBeInTheDocument();
  });

  it("paints only in the shared palette, and never draws text", () => {
    const { container } = render(<BridgeArt />);
    const allowed = new Set<string>(Object.values(PALETTE));
    const colours = [...container.querySelectorAll("[fill], [stroke], [stop-color]")]
      .flatMap((shape) => [
        shape.getAttribute("fill"),
        shape.getAttribute("stroke"),
        shape.getAttribute("stop-color"),
      ])
      .filter((colour): colour is string => colour !== null && colour !== "none");

    expect(colours.length).toBeGreaterThan(0);
    for (const colour of colours) {
      // Washes are referenced by id rather than painted directly.
      if (colour.startsWith("url(#")) {
        expect(colour).toMatch(/^url\(#bridge-art-/);
        continue;
      }
      expect(allowed.has(colour)).toBe(true);
    }

    // Every wash is this drawing's own, defined once under its own prefix, so
    // the copies of it that share a page can never disagree.
    const washes = [...container.querySelectorAll("[id]")];
    expect(washes.length).toBeGreaterThan(1);
    for (const wash of washes) {
      expect(wash.getAttribute("id")).toMatch(/^bridge-art-/);
    }
    expect(new Set(washes.map((wash) => wash.getAttribute("id"))).size).toBe(washes.length);

    expect(container.querySelectorAll("text")).toHaveLength(0);
    expect(screen.getByRole("img")).toHaveAccessibleName(/arch bridge/i);
    expect(screen.getByRole("img")).toHaveAccessibleName(/moon/i);
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
