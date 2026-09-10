import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CourseProgress } from "@/components/courses/course-detail/course-progress";

const base = { done: 2, total: 6, percent: 33, complete: false };

describe("CourseProgress", () => {
  it("summarises how far along the course is", () => {
    render(<CourseProgress {...base} />);

    expect(screen.getByText("2 of 6 lessons done")).toBeInTheDocument();
    expect(screen.getByText("33%")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "33");
  });

  it("says the course is complete when every lesson is done", () => {
    render(<CourseProgress done={6} total={6} percent={100} complete />);

    expect(screen.getByText("Course complete")).toBeInTheDocument();
  });

  it("paints the bar at the current percentage once hydrated", () => {
    const { container } = render(<CourseProgress {...base} />);

    expect(container.querySelector('[role="progressbar"] > div')).toHaveStyle({ width: "33%" });
  });

  it("holds the bar at zero until progress has been read", () => {
    const { container } = render(<CourseProgress {...base} hydrated={false} />);

    expect(container.querySelector('[role="progressbar"] > div')).toHaveStyle({ width: "0%" });
  });

  it("offers a reset only when there is progress to clear", async () => {
    const onReset = vi.fn();
    const { rerender } = render(<CourseProgress {...base} done={0} percent={0} onReset={onReset} />);

    expect(screen.queryByRole("button", { name: /reset progress/i })).not.toBeInTheDocument();

    rerender(<CourseProgress {...base} onReset={onReset} />);
    await userEvent.click(screen.getByRole("button", { name: /reset progress/i }));

    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it("hides the reset when no handler is given", () => {
    render(<CourseProgress {...base} />);

    expect(screen.queryByRole("button", { name: /reset progress/i })).not.toBeInTheDocument();
  });
});
