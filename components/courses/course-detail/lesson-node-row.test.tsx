import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  LessonNodeRow,
  rowAlignmentClass,
} from "@/components/courses/course-detail/lesson-node-row";
import { buildCoursePath } from "@/modules/course/path";
import { nodeKey } from "@/modules/course/utils";
import { makeCourse } from "@/test/fixtures";

const course = makeCourse();
const firstLevel = course.levels[0];

describe("rowAlignmentClass", () => {
  it("cycles centre, left, centre, right", () => {
    expect([0, 1, 2, 3, 4, 5].map(rowAlignmentClass)).toEqual([
      "justify-center",
      "justify-start",
      "justify-center",
      "justify-end",
      "justify-center",
      "justify-start",
    ]);
  });
});

describe("LessonNodeRow", () => {
  it("shows the lesson title and links to the lesson", () => {
    const lesson = buildCoursePath(course, [])[0].lessons[0];

    render(<LessonNodeRow lesson={lesson} position={0} />);

    expect(screen.getByText("First Bead")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "First Bead — up next" })).toHaveAttribute(
      "href",
      "/courses/test-course/foundations/first-bead",
    );
  });

  it("announces completed lessons", () => {
    const levels = buildCoursePath(course, [nodeKey(firstLevel, firstLevel.lessons[0])]);

    render(<LessonNodeRow lesson={levels[0].lessons[0]} position={0} />);

    expect(screen.getByRole("link", { name: "First Bead — completed" })).toBeInTheDocument();
  });

  it("announces lessons that have not started", () => {
    const levels = buildCoursePath(course, []);

    render(<LessonNodeRow lesson={levels[1].lessons[0]} position={0} />);

    expect(screen.getByRole("link", { name: "Speed Drill — not started" })).toBeInTheDocument();
  });

  it("applies the zig-zag alignment for its position in the level", () => {
    const lesson = buildCoursePath(course, [])[0].lessons[1];
    const { container } = render(<LessonNodeRow lesson={lesson} position={1} />);

    expect(container.firstElementChild).toHaveClass("justify-start");
  });

  it("lets the row be extended with extra classes", () => {
    const lesson = buildCoursePath(course, [])[0].lessons[0];
    const { container } = render(
      <LessonNodeRow lesson={lesson} position={0} className="custom-row" />,
    );

    expect(container.firstElementChild).toHaveClass("custom-row", "justify-center");
  });
});
