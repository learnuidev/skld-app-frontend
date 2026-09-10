import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { CoursesBrowser } from "@/components/courses/courses-browser";
import type { PathWithCourses } from "@/modules/course/paths";

function makeCourse(slug: string, title: string, lessonCount = 10) {
  return {
    slug,
    title,
    tagline: `${title} tagline`,
    subject: "Abacus",
    status: "available" as const,
    sample: [1, 2, 3, 4],
    accent: "bg-gradient-to-br from-orange-100 to-amber-100",
    heroAccent: "from-orange-400 via-amber-300 to-yellow-200",
    lessonCount,
  };
}

const paths: PathWithCourses[] = [
  {
    path: {
      slug: "abacus-mastery",
      badge: "Abacus",
      title: "Abacus Mastery",
      description: "Beads, then mental math.",
      courseSlugs: ["understanding-abacus", "anzan-mental-math"],
    },
    courses: [makeCourse("understanding-abacus", "Understanding Abacus", 10), makeCourse("anzan-mental-math", "Anzan: Mental Math", 5)],
  },
  {
    path: {
      slug: "middle-school-math",
      badge: "Math",
      title: "Middle School Math",
      description: "Fractions and equations.",
      courseSlugs: ["math-fundamentals"],
    },
    courses: [makeCourse("math-fundamentals", "Math Fundamentals", 4)],
  },
];

const defaultStarred = ["abacus-mastery"];

function renderBrowser() {
  return render(<CoursesBrowser paths={paths} defaultStarred={defaultStarred} />);
}

describe("CoursesBrowser", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("introduces the page and splits paths into starred and other", async () => {
    renderBrowser();

    expect(screen.getByRole("heading", { name: "Learning Paths" })).toBeInTheDocument();

    const starred = await screen.findByRole("region", { name: "Your learning paths" });
    const other = screen.getByRole("region", { name: "Other learning paths" });

    expect(within(starred).getByText("Abacus Mastery")).toBeInTheDocument();
    expect(within(other).getByText("Middle School Math")).toBeInTheDocument();
  });

  it("filters paths and courses as the learner types", async () => {
    renderBrowser();
    await screen.findByRole("region", { name: "Your learning paths" });

    await userEvent.type(screen.getByRole("searchbox", { name: "Search learning paths" }), "anzan");

    expect(screen.queryByText("Middle School Math")).not.toBeInTheDocument();
    expect(screen.getByText("Anzan: Mental Math")).toBeInTheDocument();
    expect(screen.queryByText("Math Fundamentals")).not.toBeInTheDocument();
  });

  it("says so when nothing matches", async () => {
    renderBrowser();
    await screen.findByRole("region", { name: "Your learning paths" });

    await userEvent.type(screen.getByRole("searchbox", { name: "Search learning paths" }), "zzz");

    expect(screen.getByText(/no learning paths match/i)).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Your learning paths" })).not.toBeInTheDocument();
  });

  it("moves a path between sections when its star is toggled", async () => {
    renderBrowser();
    await screen.findByRole("region", { name: "Your learning paths" });

    await userEvent.click(screen.getByRole("button", { name: "Unstar Abacus Mastery" }));

    expect(screen.queryByRole("region", { name: "Your learning paths" })).not.toBeInTheDocument();
    expect(
      within(screen.getByRole("region", { name: "Other learning paths" })).getByText(
        "Abacus Mastery",
      ),
    ).toBeInTheDocument();
    expect(window.localStorage.getItem("peony.starred-paths")).toBe("[]");
  });

  it("stars a path from the other section", async () => {
    renderBrowser();
    await screen.findByRole("region", { name: "Other learning paths" });

    await userEvent.click(screen.getByRole("button", { name: "Star Middle School Math" }));

    expect(
      within(screen.getByRole("region", { name: "Your learning paths" })).getByText(
        "Middle School Math",
      ),
    ).toBeInTheDocument();
  });

  it("remembers starred paths from an earlier visit", async () => {
    window.localStorage.setItem("peony.starred-paths", JSON.stringify(["middle-school-math"]));

    renderBrowser();

    // The star only moves once the stored list has been read after mount.
    await screen.findByRole("button", { name: "Unstar Middle School Math" });

    const starred = screen.getByRole("region", { name: "Your learning paths" });
    expect(within(starred).getByText("Middle School Math")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Other learning paths" })).toHaveTextContent(
      "Abacus Mastery",
    );
  });

  it("shows stored progress on the path and its courses", async () => {
    window.localStorage.setItem(
      "peony.course-progress.understanding-abacus",
      JSON.stringify(["a:b", "c:d", "e:f", "g:h", "i:j"]),
    );
    window.localStorage.setItem(
      "peony.course-progress.anzan-mental-math",
      JSON.stringify(["a:b"]),
    );

    renderBrowser();

    // 6 of 15 lessons done across the path.
    expect((await screen.findAllByText("40% complete")).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("progressbar", { name: "Understanding Abacus progress" }),
    ).toHaveAttribute("aria-valuenow", "50");
  });
});
