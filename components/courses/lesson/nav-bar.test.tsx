import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LessonNavBar, type QuestionMark } from "@/components/courses/lesson/nav-bar";

function marks(...states: QuestionMark["state"][]): QuestionMark[] {
  return states.map((state, step) => ({ step: step * 2 + 1, state }));
}

function bar() {
  return screen.getByRole("progressbar", { name: "Lesson progress" });
}

/** The dots, read back by the colour they are painted. */
function dots() {
  return [...(screen.getByRole("img", { name: /^Questions:/ }).children as unknown as HTMLElement[])].map(
    (dot) =>
      dot.classList.contains("bg-lesson-correct")
        ? "correct"
        : dot.classList.contains("bg-destructive")
          ? "wrong"
          : "todo",
  );
}

describe("LessonNavBar progress bar", () => {
  it("starts empty, with nothing behind the learner", () => {
    render(<LessonNavBar current={0} total={8} completed={0} questions={[]} onExit={vi.fn()} />);

    expect(bar()).toHaveAttribute("aria-valuenow", "0");
    expect(bar()).toHaveAttribute("aria-valuetext", "0 of 8 steps done");
    expect(bar().firstElementChild).toHaveStyle({ width: "0%" });
  });

  it("fills in step with the steps behind the learner", () => {
    render(<LessonNavBar current={3} total={8} completed={3} questions={[]} onExit={vi.fn()} />);

    expect(bar()).toHaveAttribute("aria-valuenow", "3");
    expect(bar().firstElementChild).toHaveStyle({ width: "38%" });
  });

  it("is full when the last step is done", () => {
    render(<LessonNavBar current={7} total={8} completed={8} questions={[]} onExit={vi.fn()} />);

    expect(bar()).toHaveAttribute("aria-valuenow", "8");
    expect(bar().firstElementChild).toHaveStyle({ width: "100%" });
  });

  it("never counts more steps than the lesson has", () => {
    render(<LessonNavBar current={9} total={8} completed={12} questions={[]} onExit={vi.fn()} />);

    expect(bar()).toHaveAttribute("aria-valuenow", "8");
    expect(bar().firstElementChild).toHaveStyle({ width: "100%" });
  });
});

describe("LessonNavBar question dots", () => {
  it("draws one dot per question, coloured by how it went", () => {
    render(
      <LessonNavBar
        current={1}
        total={8}
        completed={1}
        questions={marks("correct", "wrong", "todo")}
        onExit={vi.fn()}
      />,
    );

    expect(dots()).toEqual(["correct", "wrong", "todo"]);
  });

  it("draws nothing when the lesson asks nothing", () => {
    render(<LessonNavBar current={0} total={2} completed={0} questions={[]} onExit={vi.fn()} />);

    expect(screen.queryByRole("img", { name: /^Questions:/ })).not.toBeInTheDocument();
  });

  it("reads the tally out", () => {
    render(
      <LessonNavBar
        current={1}
        total={8}
        completed={1}
        questions={marks("correct", "correct", "wrong", "todo")}
        onExit={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("img", {
        name: "Questions: 2 answered correctly, 1 answered wrongly, 1 not answered",
      }),
    ).toBeInTheDocument();
  });

  it("counts the right answers beside the sparkle", () => {
    render(
      <LessonNavBar
        current={5}
        total={8}
        completed={5}
        questions={marks("correct", "wrong", "correct")}
        onExit={vi.fn()}
      />,
    );

    expect(screen.getByText("of 8 steps done")).toBeInTheDocument();
    expect(screen.getByTitle("2 of 8 steps done")).toBeInTheDocument();
  });
});
