import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LevelHeader } from "@/components/courses/course-detail/level-header";

describe("LevelHeader", () => {
  it("shows the level number and name", () => {
    render(<LevelHeader number={2} name="Fluency" status="active" />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Level 2");
    expect(heading).toHaveTextContent("Fluency");
  });

  it("marks the active level in violet", () => {
    const { container } = render(<LevelHeader number={1} name="Foundations" status="active" />);

    expect(container.querySelector(".bg-violet-400")).toBeInTheDocument();
    expect(screen.queryByText("Done")).not.toBeInTheDocument();
  });

  it("marks completed levels in emerald with a Done badge", () => {
    const { container } = render(<LevelHeader number={1} name="Foundations" status="done" />);

    expect(container.querySelector(".bg-emerald-400")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("leaves upcoming levels neutral", () => {
    const { container } = render(<LevelHeader number={3} name="Mastery" status="upcoming" />);

    expect(container.querySelector(".bg-border")).toBeInTheDocument();
    expect(screen.queryByText("Done")).not.toBeInTheDocument();
  });
});
