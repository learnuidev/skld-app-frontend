import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { LearningPathRow } from "@/components/courses/learning-path-row";
import type { LearningPath, PathCourse } from "@/modules/course/paths";

const path: LearningPath = {
  slug: "abacus-mastery",
  badge: "Abacus · 2 courses",
  title: "Abacus Mastery",
  description: "From your first bead to lightning-fast mental math.",
  courseSlugs: ["understanding-abacus", "anzan-mental-math"],
};

const courses: PathCourse[] = [
  {
    slug: "understanding-abacus",
    title: "Understanding Abacus",
    tagline: "From your first bead to fast mental math.",
    subject: "Abacus",
    status: "available",
    sample: [4, 3, 2, 1],
    lessonCount: 12,
  },
  {
    slug: "anzan-mental-math",
    title: "Anzan: Mental Math",
    tagline: "Calculate on a board only you can see.",
    subject: "Abacus",
    status: "coming-soon",
    sample: [0, 7, 5, 2],
    lessonCount: 8,
  },
];

function renderRow(overrides: Partial<Parameters<typeof LearningPathRow>[0]> = {}) {
  return render(
    <ul>
      <LearningPathRow
        path={path}
        courses={courses}
        percent={0}
        coursePercents={{}}
        starred
        onToggleStar={vi.fn()}
        {...overrides}
      />
    </ul>,
  );
}

describe("LearningPathRow", () => {
  it("introduces the path with its badge, title and description", () => {
    renderRow();

    expect(screen.getByText("Abacus · 2 courses")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Abacus Mastery" })).toBeInTheDocument();
    expect(
      screen.getAllByText("From your first bead to lightning-fast mental math.").length,
    ).toBeGreaterThan(0);
  });

  it("renders a card per course", () => {
    renderRow();

    expect(screen.getByRole("link", { name: "Understanding Abacus" })).toBeInTheDocument();
    expect(screen.getByText("Anzan: Mental Math")).toBeInTheDocument();
    expect(screen.getByText("Soon")).toBeInTheDocument();
  });

  it("passes per-course progress down to the cards", () => {
    renderRow({ coursePercents: { "understanding-abacus": 40 } });

    expect(
      screen.getByRole("progressbar", { name: "Understanding Abacus progress" }),
    ).toHaveAttribute("aria-valuenow", "40");
  });

  it("stays quiet about progress until the path has been started", () => {
    renderRow({ percent: 0 });

    expect(screen.queryByText(/complete/)).not.toBeInTheDocument();
  });

  it("summarises the path once there is progress to show", () => {
    renderRow({ percent: 14 });

    expect(screen.getAllByText("14% complete").length).toBeGreaterThan(0);
  });

  it("draws the path's own artwork for its icon", () => {
    renderRow({ path: { ...path, art: "operators" } });

    const icon = screen.getByRole("img", { name: "Abacus Mastery illustration" });

    expect(icon.tagName.toLowerCase()).toBe("svg");
    // Four operator tiles.
    expect(icon.querySelectorAll("rect")).toHaveLength(4);
  });

  it("borrows the lead course's artwork when the path has none", () => {
    renderRow({ courses: [{ ...courses[0], art: "fractions" }, courses[1]] });

    const icon = screen.getByRole("img", { name: "Abacus Mastery illustration" });

    // The fractions pie: four quarters.
    expect(icon.querySelectorAll("path")).toHaveLength(4);
  });

  it("toggles the star and reflects the current state", async () => {
    const onToggleStar = vi.fn();
    renderRow({ starred: false, onToggleStar });

    const star = screen.getByRole("button", { name: "Star Abacus Mastery" });
    expect(star).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(star);

    expect(onToggleStar).toHaveBeenCalledWith("abacus-mastery");
  });

  it("offers to unstar a starred path", () => {
    renderRow({ starred: true });

    expect(screen.getByRole("button", { name: "Unstar Abacus Mastery" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
