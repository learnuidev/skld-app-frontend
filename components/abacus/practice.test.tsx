import { createRef } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { BuildTask, QuizTask, ReadTask, type TaskHandle } from "@/components/abacus/practice";

/** What the lesson player does when the learner presses Check. */
function checked(ref: React.RefObject<TaskHandle | null>) {
  let result = false;
  act(() => {
    result = ref.current?.check() ?? false;
  });
  return result;
}

describe("ReadTask", () => {
  const props = {
    prompt: "Which number is this abacus showing?",
    digits: [1],
    choices: [1, 2, 5, 10],
    solved: false,
    onHasSelection: vi.fn(),
  };

  it("says nothing until the answer lands", () => {
    render(<ReadTask {...props} ref={createRef<TaskHandle>()} />);

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("cheers the number the board is showing", async () => {
    const user = userEvent.setup();
    const ref = createRef<TaskHandle>();
    const { rerender } = render(<ReadTask {...props} ref={ref} />);

    await user.click(screen.getByRole("button", { name: "1" }));
    expect(checked(ref)).toBe(true);

    rerender(<ReadTask {...props} solved ref={ref} />);

    expect(screen.getByRole("status")).toHaveTextContent("That's 1!");
  });

  it("cheers a four-digit reading the way the learner sees it", () => {
    render(
      <ReadTask
        {...props}
        prompt="Which number is this abacus showing?"
        digits={[4, 3, 2, 1]}
        choices={[1234, 4321, 2345, 5432]}
        solved
      />,
    );

    expect(screen.getByRole("status")).toHaveTextContent("That's 1,234!");
  });
});

describe("BuildTask", () => {
  const props = {
    prompt: "Build 6 on the abacus.",
    target: 6,
    solved: false,
    onHasSelection: vi.fn(),
  };

  it("cheers the number that was asked for", () => {
    const { rerender } = render(<BuildTask {...props} />);

    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    rerender(<BuildTask {...props} solved />);

    expect(screen.getByRole("status")).toHaveTextContent("That's 6!");
  });

  it("explains the board when the answer is wrong, instead of cheering", () => {
    const ref = createRef<TaskHandle>();
    render(<BuildTask {...props} ref={ref} />);

    // A fresh board shows 0, which is not the six that was asked for.
    expect(checked(ref)).toBe(false);

    expect(screen.getByText(/that board shows 0/i)).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});

describe("QuizTask", () => {
  const props = {
    prompt: "3 + 1 = ?",
    choices: [4, 3, 5, 6],
    answer: 4,
    solved: false,
    onHasSelection: vi.fn(),
  };

  it("cheers the answer once it is checked", async () => {
    const user = userEvent.setup();
    const ref = createRef<TaskHandle>();
    const { rerender } = render(<QuizTask {...props} ref={ref} />);

    await user.click(screen.getByRole("button", { name: "4" }));
    expect(checked(ref)).toBe(true);

    rerender(<QuizTask {...props} solved ref={ref} />);

    expect(screen.getByRole("status")).toHaveTextContent("That's 4!");
  });

  it("stays quiet on a wrong answer", async () => {
    const user = userEvent.setup();
    const ref = createRef<TaskHandle>();
    const { rerender } = render(<QuizTask {...props} ref={ref} />);

    await user.click(screen.getByRole("button", { name: "5" }));
    expect(checked(ref)).toBe(false);

    rerender(<QuizTask {...props} ref={ref} />);

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
