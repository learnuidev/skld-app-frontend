import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CourseSummaryCard } from "@/components/courses/course-detail/course-summary-card";
import { makeCourse } from "@/test/fixtures";

const course = makeCourse();
const progress = { done: 2, total: 6, percent: 33, complete: false };

describe("CourseSummaryCard", () => {
  it("introduces the course", () => {
    render(<CourseSummaryCard course={course} progress={progress} />);

    expect(screen.getByRole("heading", { level: 1, name: "Test Course" })).toBeInTheDocument();
    expect(screen.getByText("A course for tests")).toBeInTheDocument();
    expect(screen.getByText(course.introText)).toBeInTheDocument();
  });

  it("reveals the whole introduction on hover, since it is clamped to two lines", async () => {
    render(<CourseSummaryCard course={course} progress={progress} />);

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    await userEvent.hover(screen.getByText(course.introText));

    expect(await screen.findByRole("tooltip")).toHaveTextContent(course.introText);
  });

  it("draws the course preview with an accessible label", () => {
    render(<CourseSummaryCard course={course} progress={progress} />);

    expect(screen.getByRole("img", { name: "Test Course course preview" })).toBeInTheDocument();
  });

  it("lists the course metrics", () => {
    render(<CourseSummaryCard course={course} progress={progress} />);

    expect(screen.getByText("6 Lessons")).toBeInTheDocument();
    expect(screen.getByText("24 Exercises")).toBeInTheDocument();
    expect(screen.getByText("2h")).toBeInTheDocument();
  });

  it("passes progress and the reset handler down to the progress block", () => {
    render(<CourseSummaryCard course={course} progress={progress} onReset={() => {}} />);

    expect(screen.getByText("2 of 6 lessons done")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset progress/i })).toBeInTheDocument();
  });

  it("hides the reset affordance when no handler is given", () => {
    render(<CourseSummaryCard course={course} progress={progress} />);

    expect(screen.queryByRole("button", { name: /reset progress/i })).not.toBeInTheDocument();
  });
});
