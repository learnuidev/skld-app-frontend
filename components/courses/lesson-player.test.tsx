import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import LessonPlayer from "@/components/courses/lesson-player";
import type { LessonBlock } from "@/modules/course/types";
import { makeCourse } from "@/test/fixtures";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

const course = makeCourse();

const blocks: LessonBlock[] = [
  { type: "heading", text: "Reading a rod" },
  {
    type: "read",
    prompt: "Which number is this abacus showing?",
    digits: [1],
    choices: [1, 2, 5, 10],
    explanation: {
      steps: [
        { text: "One earth bead is touching the beam." },
        { text: "Each earth bead counts as 1, so the rod shows 1." },
      ],
    },
  },
  { type: "paragraph", text: "Now read a rod on your own." },
];

function renderLesson(lessonBlocks: LessonBlock[] = blocks, lessonSlug = "first-bead") {
  return render(
    <LessonPlayer
      course={course}
      levelSlug="foundations"
      lessonSlug={lessonSlug}
      blocks={lessonBlocks}
    />,
  );
}

/** The card that holds the step — the thing whose border answers back. */
function card() {
  return screen.getByRole("main");
}

function primaryButton() {
  return screen.getByRole("button", { name: /^(Check|Continue|Next lesson|Finish course)$/ });
}

describe("LessonPlayer", () => {
  it("opens on the first step with the progress bar at the start", () => {
    renderLesson();

    expect(screen.getByRole("heading", { name: "Reading a rod" })).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Lesson progress" })).toHaveAttribute(
      "aria-valuenow",
      "1",
    );
    expect(primaryButton()).toHaveTextContent("Continue");
  });

  it("holds the check button until an answer is picked", async () => {
    const user = userEvent.setup();
    renderLesson();
    await user.click(primaryButton());

    const check = await screen.findByRole("button", { name: "Check" });
    expect(check).toBeDisabled();
  });

  it("answers back with a green card and a green call to action", async () => {
    const user = userEvent.setup();
    renderLesson();
    await user.click(primaryButton());

    await user.click(await screen.findByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "Check" }));

    expect(card()).toHaveClass("border-lesson-correct");
    expect(screen.getByRole("button", { name: "Continue" })).toHaveClass("bg-lesson-correct");
    expect(screen.getByText("That's 1!")).toBeInTheDocument();
  });

  it("keeps the card neutral on a first miss, then flags a second", async () => {
    const user = userEvent.setup();
    renderLesson();
    await user.click(primaryButton());

    await user.click(await screen.findByRole("button", { name: "2" }));
    await user.click(screen.getByRole("button", { name: "Check" }));

    expect(card()).not.toHaveClass("border-lesson-warn");
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Try again" }));

    // "Try again" rebuilds the task, so wait for a fresh, enabled choice to
    // replace the locked one — and re-query it, since the old node is gone.
    await waitFor(() => expect(screen.getByRole("button", { name: "2" })).toBeEnabled());
    await user.click(screen.getByRole("button", { name: "2" }));
    await user.click(screen.getByRole("button", { name: "Check" }));

    expect(card()).toHaveClass("border-lesson-warn");
  });

  it("walks the explanation step by step beside the question", async () => {
    const user = userEvent.setup();
    renderLesson();
    await user.click(primaryButton());
    await user.click(await screen.findByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "Check" }));
    await user.click(screen.getByRole("button", { name: "Why?" }));

    const rail = screen.getByRole("complementary", { name: "Why this is the answer" });
    expect(within(rail).getByText("One earth bead is touching the beam.")).toBeInTheDocument();
    expect(
      within(rail).queryByText("Each earth bead counts as 1, so the rod shows 1."),
    ).not.toBeInTheDocument();

    await user.click(within(rail).getByRole("button", { name: "Next step" }));
    expect(
      within(rail).getByText("Each earth bead counts as 1, so the rod shows 1."),
    ).toBeInTheDocument();

    await user.click(within(rail).getByRole("button", { name: "Got it" }));
    expect(
      screen.queryByRole("complementary", { name: "Why this is the answer" }),
    ).not.toBeInTheDocument();
  });

  it("keeps the earlier explanation on screen while the next one arrives", async () => {
    const user = userEvent.setup();
    renderLesson();
    await user.click(primaryButton());
    await user.click(await screen.findByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "Check" }));
    await user.click(screen.getByRole("button", { name: "Why?" }));

    const rail = screen.getByRole("complementary", { name: "Why this is the answer" });
    await user.click(within(rail).getByRole("button", { name: "Next step" }));

    // A chat, not a slideshow: the new line joins the old one instead of
    // replacing it, and the step count follows along.
    const first = within(rail).getByText("One earth bead is touching the beam.");
    const second = within(rail).getByText("Each earth bead counts as 1, so the rod shows 1.");
    expect(first).toBeInTheDocument();
    expect(second).toBeInTheDocument();
    expect(
      first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(within(rail).getByText("Step 2 of 2")).toBeInTheDocument();
  });

  it("carries the step count in the navbar", async () => {
    const user = userEvent.setup();
    renderLesson();
    await user.click(primaryButton());
    await user.click(await screen.findByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "Check" }));

    expect(screen.getByText("of 3 steps done")).toBeInTheDocument();
  });

  it("advances to the next step and starts it clean", async () => {
    const user = userEvent.setup();
    renderLesson();
    await user.click(primaryButton());
    await user.click(await screen.findByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "Check" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(await screen.findByText("Now read a rod on your own.")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Lesson progress" })).toHaveAttribute(
      "aria-valuenow",
      "3",
    );
    // The step starts fresh: no answer picked, nothing to check yet.
    expect(screen.queryByRole("button", { name: "1" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next lesson" })).toBeInTheDocument();
  });

  it("offers the next lesson when the lesson ends", async () => {
    const user = userEvent.setup();
    renderLesson([{ type: "heading", text: "One step" }]);

    expect(screen.getByRole("button", { name: "Next lesson" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next lesson" }));

    expect(push).toHaveBeenCalledWith("/courses/test-course/foundations/second-bead");
  });

  it("finishes the course from the last step", async () => {
    const user = userEvent.setup();
    renderLesson([{ type: "heading", text: "One step" }], "fluency-check");

    expect(screen.getByRole("button", { name: "Finish course" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Finish course" }));

    expect(push).toHaveBeenCalledWith("/courses/test-course");
  });
});
