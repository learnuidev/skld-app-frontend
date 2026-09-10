import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { UpNextCard } from "@/components/courses/course-detail/up-next-card";
import { buildCoursePath, summarizeProgress } from "@/modules/course/path";
import { nodeKey } from "@/modules/course/utils";
import { makeCourse } from "@/test/fixtures";

const course = makeCourse();
const reviewHref = "/courses/test-course/foundations/first-bead";

/** Keys of the first `count` lessons in path order. */
function completedKeys(count: number): string[] {
  const keys: string[] = [];
  course.levels.forEach((level) =>
    level.lessons.forEach((lesson) => keys.push(nodeKey(level, lesson))),
  );
  return keys.slice(0, count);
}

function renderCard(doneCount: number, onMarkComplete?: (key: string) => void) {
  const levels = buildCoursePath(course, completedKeys(doneCount));
  const current = levels.flatMap((level) => level.lessons).find((l) => l.status === "current");

  return render(
    <UpNextCard
      courseTitle={course.title}
      lesson={current ?? null}
      progress={summarizeProgress(levels)}
      reviewHref={reviewHref}
      onMarkComplete={onMarkComplete}
    />,
  );
}

describe("UpNextCard", () => {
  it("describes the lesson to continue with", () => {
    renderCard(0);

    expect(screen.getByText("Up next")).toBeInTheDocument();
    expect(screen.getByText("0 / 6")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "First Bead" })).toBeInTheDocument();
    expect(screen.getByText("First Bead blurb")).toBeInTheDocument();
    expect(screen.getByText("Foundations · 3 min")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /continue/i })).toHaveAttribute(
      "href",
      "/courses/test-course/foundations/first-bead",
    );
  });

  it("calls the level check a level check", () => {
    renderCard(2);

    expect(screen.getByRole("heading", { name: "Level Check" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start level check/i })).toBeInTheDocument();
    expect(screen.getByText("Foundations · 5 min")).toBeInTheDocument();
  });

  it("reports exercises when the lesson has any", () => {
    renderCard(1);

    expect(screen.getByText("Foundations · 3 min · 4 exercises")).toBeInTheDocument();
  });

  it("marks the current lesson done on request", async () => {
    const onMarkComplete = vi.fn();
    renderCard(0, onMarkComplete);

    await userEvent.click(screen.getByRole("button", { name: /mark this lesson as done/i }));

    expect(onMarkComplete).toHaveBeenCalledWith("foundations:first-bead");
  });

  it("hides the mark-done button when there is no handler", () => {
    renderCard(0);

    expect(
      screen.queryByRole("button", { name: /mark this lesson as done/i }),
    ).not.toBeInTheDocument();
  });

  it("wraps up when the course is finished", () => {
    const levels = buildCoursePath(course, completedKeys(6));

    render(
      <UpNextCard
        courseTitle={course.title}
        lesson={null}
        progress={summarizeProgress(levels)}
        reviewHref={reviewHref}
      />,
    );

    expect(screen.getByText("Course complete")).toBeInTheDocument();
    expect(screen.getByText("You finished Test Course")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /review course/i })).toHaveAttribute(
      "href",
      reviewHref,
    );
  });

  it("copes with a course that has no lessons yet", () => {
    render(
      <UpNextCard
        courseTitle={course.title}
        lesson={null}
        progress={{ done: 0, total: 0, percent: 0, complete: false }}
        reviewHref="/courses/test-course"
      />,
    );

    expect(screen.getByText("No lessons yet")).toBeInTheDocument();
  });

  it("counts completed lessons in the header", () => {
    renderCard(3);

    expect(screen.getByText("3 / 6")).toBeInTheDocument();
  });

  it("keeps the first level listed as complete in its facts", () => {
    renderCard(3);

    expect(screen.getByText("Fluency · 3 min")).toBeInTheDocument();
  });
});
