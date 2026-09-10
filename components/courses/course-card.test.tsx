import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CourseCard } from "@/components/courses/course-card";
import type { PathCourse } from "@/modules/course/paths";

const base: PathCourse = {
  slug: "understanding-abacus",
  title: "Understanding Abacus",
  tagline: "From your first bead to fast mental math.",
  subject: "Abacus",
  status: "available",
  sample: [4, 3, 2, 1],
  accent: "bg-gradient-to-br from-orange-100 to-amber-100",
  heroAccent: "from-orange-400 via-amber-300 to-yellow-200",
  lessonCount: 12,
};

describe("CourseCard", () => {
  it("labels the card with the course subject and name", () => {
    render(
      <ul>
        <CourseCard course={base} percent={25} />
      </ul>,
    );

    expect(screen.getByText("Abacus")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Understanding Abacus" })).toHaveAttribute(
      "href",
      "/courses/understanding-abacus",
    );
  });

  it("paints the progress bar for an available course", () => {
    const { container } = render(
      <ul>
        <CourseCard course={base} percent={25} />
      </ul>,
    );

    expect(screen.getByRole("progressbar", { name: "Understanding Abacus progress" })).toHaveAttribute(
      "aria-valuenow",
      "25",
    );
    expect(container.querySelector('[role="progressbar"] > span')).toHaveStyle({ width: "25%" });
  });

  it("holds the bar at zero until progress has been read", () => {
    const { container } = render(
      <ul>
        <CourseCard course={base} percent={25} hydrated={false} />
      </ul>,
    );

    expect(container.querySelector('[role="progressbar"] > span')).toHaveStyle({ width: "0%" });
  });

  it("marks a course that is still being written", () => {
    render(
      <ul>
        <CourseCard course={{ ...base, status: "coming-soon" }} />
      </ul>,
    );

    expect(screen.getByText("Soon")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("links cards with the connector rule between them", () => {
    const { container } = render(
      <ul>
        <CourseCard course={base} showConnector />
      </ul>,
    );

    expect(container.querySelector("span[aria-hidden]")).toBeInTheDocument();
  });

  it("omits the connector on the last card", () => {
    const { container } = render(
      <ul>
        <CourseCard course={base} />
      </ul>,
    );

    expect(container.querySelector("span[aria-hidden]")).not.toBeInTheDocument();
  });
});
