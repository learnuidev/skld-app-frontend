import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import CourseDetail from "@/components/courses/course-detail";
import { makeCourse } from "@/test/fixtures";

const course = makeCourse();
const storeKey = "peony.course-progress.test-course";

beforeEach(() => {
  window.localStorage.clear();
});

describe("CourseDetail", () => {
  it("starts a fresh course on its first lesson", async () => {
    render(<CourseDetail course={course} />);

    expect(await screen.findByText("0 of 6 lessons done")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "First Bead" })).toBeInTheDocument();
  });

  it("restores stored progress", async () => {
    window.localStorage.setItem(storeKey, JSON.stringify(["foundations:first-bead"]));

    render(<CourseDetail course={course} />);

    expect(await screen.findByText("1 of 6 lessons done")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "First Bead — completed" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Second Bead" })).toBeInTheDocument();
  });

  it("stores the lesson when it is marked done", async () => {
    render(<CourseDetail course={course} />);
    await screen.findByText("0 of 6 lessons done");

    await userEvent.click(screen.getByRole("button", { name: /mark this lesson as done/i }));

    expect(await screen.findByText("1 of 6 lessons done")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Second Bead" })).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem(storeKey) ?? "[]")).toEqual([
      "foundations:first-bead",
    ]);
  });

  it("clears stored progress on reset", async () => {
    window.localStorage.setItem(storeKey, JSON.stringify(["foundations:first-bead"]));

    render(<CourseDetail course={course} />);
    await screen.findByText("1 of 6 lessons done");

    await userEvent.click(screen.getByRole("button", { name: /reset progress/i }));

    expect(await screen.findByText("0 of 6 lessons done")).toBeInTheDocument();
    expect(window.localStorage.getItem(storeKey)).toBeNull();
  });

  it("ignores a corrupt progress entry", async () => {
    window.localStorage.setItem(storeKey, "{not json");

    render(<CourseDetail course={course} />);

    expect(await screen.findByText("0 of 6 lessons done")).toBeInTheDocument();
  });

  it("celebrates a finished course", async () => {
    const keys = course.levels.flatMap((level) =>
      level.lessons.map((lesson) => `${level.slug}:${lesson.slug}`),
    );
    window.localStorage.setItem(storeKey, JSON.stringify(keys));

    render(<CourseDetail course={course} />);

    expect(await screen.findByText("You finished Test Course")).toBeInTheDocument();
    expect(screen.getAllByText("Course complete")).toHaveLength(2);
    expect(screen.getByRole("link", { name: /review course/i })).toHaveAttribute(
      "href",
      "/courses/test-course/foundations/first-bead",
    );
  });
});
