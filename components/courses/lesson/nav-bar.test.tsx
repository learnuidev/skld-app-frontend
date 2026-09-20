import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { LessonNavBar, type QuestionMark } from "@/components/courses/lesson/nav-bar";

type BarProps = Parameters<typeof LessonNavBar>[0];

/** The navbar, with everything the test does not care about filled in. */
function setup(overrides: Partial<BarProps> = {}) {
  const onPrevious = vi.fn();
  const onNext = vi.fn();

  render(
    <LessonNavBar
      current={0}
      total={8}
      completed={0}
      questions={[]}
      onExit={vi.fn()}
      onPrevious={onPrevious}
      onNext={onNext}
      {...overrides}
    />,
  );

  return { onPrevious, onNext };
}

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
    setup({ total: 8, completed: 0 });

    expect(bar()).toHaveAttribute("aria-valuenow", "0");
    expect(bar()).toHaveAttribute("aria-valuetext", "0 of 8 steps done");
    expect(bar().firstElementChild).toHaveStyle({ width: "0%" });
  });

  it("fills in step with the steps behind the learner", () => {
    setup({ current: 3, total: 8, completed: 3 });

    expect(bar()).toHaveAttribute("aria-valuenow", "3");
    expect(bar().firstElementChild).toHaveStyle({ width: "38%" });
  });

  it("is full when the last step is done", () => {
    setup({ current: 7, total: 8, completed: 8 });

    expect(bar()).toHaveAttribute("aria-valuenow", "8");
    expect(bar().firstElementChild).toHaveStyle({ width: "100%" });
  });

  it("never counts more steps than the lesson has", () => {
    setup({ current: 9, total: 8, completed: 12 });

    expect(bar()).toHaveAttribute("aria-valuenow", "8");
    expect(bar().firstElementChild).toHaveStyle({ width: "100%" });
  });
});

describe("LessonNavBar step buttons", () => {
  it("keeps them out of sight until the bar is reached for", () => {
    setup({ current: 2 });

    for (const name of ["Previous step", "Next step"]) {
      const button = screen.getByRole("button", { name });

      expect(button).toHaveClass("opacity-0");
      expect(button).toHaveClass("group-hover:opacity-100");
      // Nothing to click through when they are not on screen.
      expect(button).toHaveClass("pointer-events-none");
      // A keyboard can still find and see them.
      expect(button).toHaveClass("focus-visible:opacity-100");
      // A touch screen has no hover, so there they are always shown.
      expect(button.className).toContain("[@media(hover:none)]:opacity-100");
    }
  });

  it("steps back and on", async () => {
    const user = userEvent.setup();
    const { onPrevious, onNext } = setup({ current: 2, total: 8 });

    await user.click(screen.getByRole("button", { name: "Previous step" }));
    await user.click(screen.getByRole("button", { name: "Next step" }));

    expect(onPrevious).toHaveBeenCalledOnce();
    expect(onNext).toHaveBeenCalledOnce();
  });

  it("has nothing to step back to on the first step", () => {
    setup({ current: 0, total: 8 });

    expect(screen.getByRole("button", { name: "Previous step" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next step" })).toBeEnabled();
  });

  it("has nothing to step on to on the last step", () => {
    setup({ current: 7, total: 8 });

    expect(screen.getByRole("button", { name: "Next step" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Previous step" })).toBeEnabled();
  });

  it("disables both in a one-step lesson", () => {
    setup({ current: 0, total: 1 });

    expect(screen.getByRole("button", { name: "Previous step" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next step" })).toBeDisabled();
  });
});

describe("LessonNavBar question dots", () => {
  it("draws one dot per question, coloured by how it went", () => {
    setup({ current: 1, completed: 1, questions: marks("correct", "wrong", "todo") });

    expect(dots()).toEqual(["correct", "wrong", "todo"]);
  });

  it("draws nothing when the lesson asks nothing", () => {
    setup({ total: 2, questions: [] });

    expect(screen.queryByRole("img", { name: /^Questions:/ })).not.toBeInTheDocument();
  });

  it("reads the tally out", () => {
    setup({
      current: 1,
      completed: 1,
      questions: marks("correct", "correct", "wrong", "todo"),
    });

    expect(
      screen.getByRole("img", {
        name: "Questions: 2 answered correctly, 1 answered wrongly, 1 not answered",
      }),
    ).toBeInTheDocument();
  });

  it("counts the right answers beside the sparkle", () => {
    setup({ current: 5, completed: 5, questions: marks("correct", "wrong", "correct") });

    expect(screen.getByText("of 8 steps done")).toBeInTheDocument();
    expect(screen.getByTitle("2 of 8 steps done")).toBeInTheDocument();
  });
});
