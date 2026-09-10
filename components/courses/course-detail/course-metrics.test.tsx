import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CourseMetrics } from "@/components/courses/course-detail/course-metrics";

describe("CourseMetrics", () => {
  it("lists lessons, exercises and whole hours", () => {
    render(<CourseMetrics lessonCount={26} exerciseCount={74} lessonMinutes={90} />);

    expect(screen.getByText("26 Lessons")).toBeInTheDocument();
    expect(screen.getByText("74 Exercises")).toBeInTheDocument();
    expect(screen.getByText("2h")).toBeInTheDocument();
  });

  it("never shows a course shorter than an hour as zero", () => {
    render(<CourseMetrics lessonCount={3} exerciseCount={0} lessonMinutes={10} />);

    expect(screen.getByText("1h")).toBeInTheDocument();
  });
});
