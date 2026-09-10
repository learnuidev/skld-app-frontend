import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PathButton } from "@/components/courses/course-detail/path-button";

describe("PathButton", () => {
  it("renders a link to its destination", () => {
    render(<PathButton href="/courses/test-course">Continue</PathButton>);

    expect(screen.getByRole("link", { name: "Continue" })).toHaveAttribute(
      "href",
      "/courses/test-course",
    );
  });

  it("defaults to the violet call to action", () => {
    render(<PathButton href="/next">Continue</PathButton>);

    expect(screen.getByRole("link")).toHaveClass("bg-violet-500", "shadow-[0_4px_0_0_#6d28d9]");
  });

  it("switches to the emerald tone", () => {
    render(
      <PathButton href="/next" tone="emerald">
        Review course
      </PathButton>,
    );

    expect(screen.getByRole("link")).toHaveClass("bg-emerald-500", "shadow-[0_4px_0_0_#047857]");
  });

  it("accepts extra layout classes", () => {
    render(
      <PathButton href="/next" className="w-full">
        Continue
      </PathButton>,
    );

    expect(screen.getByRole("link")).toHaveClass("w-full");
  });
});
