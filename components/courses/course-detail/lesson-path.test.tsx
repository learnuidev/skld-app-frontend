import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LessonPath } from "@/components/courses/course-detail/lesson-path";
import { buildCoursePath } from "@/modules/course/path";
import { makeCourse } from "@/test/fixtures";

const course = makeCourse();

describe("LessonPath", () => {
  it("renders one labelled section per level", () => {
    render(<LessonPath levels={buildCoursePath(course, [])} />);

    expect(screen.getByRole("region", { name: "Level 1: Foundations" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Level 2: Fluency" })).toBeInTheDocument();
  });

  it("renders a link for every lesson in the course", () => {
    render(<LessonPath levels={buildCoursePath(course, [])} />);

    expect(screen.getAllByRole("link")).toHaveLength(6);
  });

  it("renders its children after the last level", () => {
    render(
      <LessonPath levels={buildCoursePath(course, [])}>
        <div data-testid="footer">Up next card</div>
      </LessonPath>,
    );

    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders nothing but its children for a course with no levels", () => {
    render(
      <LessonPath levels={[]}>
        <div data-testid="footer">Up next card</div>
      </LessonPath>,
    );

    expect(screen.queryAllByRole("region")).toHaveLength(0);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
