import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import LessonPlayer from "@/components/courses/lesson-player";
import { bridgeEngineeringCourse } from "@/modules/course/bridge-engineering";
import { getLessonContent } from "@/modules/course/content";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

/** The player, running the course's own authored content. */
function renderLesson(levelSlug: string, lessonSlug: string) {
  const blocks = getLessonContent("bridge-engineering", levelSlug, lessonSlug);
  if (!blocks) throw new Error(`no content for ${levelSlug}/${lessonSlug}`);

  return render(
    <LessonPlayer
      course={bridgeEngineeringCourse}
      levelSlug={levelSlug}
      lessonSlug={lessonSlug}
      step={0}
      blocks={blocks}
    />,
  );
}

function primary() {
  return screen.getByRole("button", { name: /^(Check|Continue|Next lesson|Finish course)$/ });
}

function card() {
  return screen.getByRole("main");
}

/**
 * Step forward `times` times, waiting for each step to land. The card swaps
 * its block with an exit animation, so a click that arrives mid-swap is lost.
 */
async function advance(times: number) {
  const user = userEvent.setup();
  const bar = screen.getByRole("progressbar", { name: "Lesson progress" });

  for (let i = 0; i < times; i += 1) {
    const from = Number(bar.getAttribute("aria-valuenow"));
    await user.click(primary());
    await waitFor(() => expect(Number(bar.getAttribute("aria-valuenow"))).toBe(from + 1));
  }
}

const user = userEvent.setup();

describe("Bridge Engineering, in the lesson player", () => {
  it("walks the first lesson from the drawing to the questions", async () => {
    renderLesson("components-of-a-bridge", "what-is-a-bridge");

    // Step 1: the opening heading, with the lesson's real length on the bar.
    expect(screen.getByRole("heading", { name: "What Is a Bridge?" })).toBeInTheDocument();
    expect(screen.getByText("of 8 steps done")).toBeInTheDocument();

    // Step 2: the definition.
    await user.click(primary());
    expect(await screen.findByText(/structure with load-bearing capacity/i)).toBeInTheDocument();

    // Step 3: the drawing, on the card.
    await user.click(primary());
    expect(
      await screen.findByRole("img", { name: /elevation of a bridge crossing a river/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/something that spans the gap/i)).toBeInTheDocument();

    // Step 4: the guided tour — every part has to be found by tapping its pin.
    await user.click(primary());
    expect(await screen.findByText("0 of 6 parts found")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Part 1" }));
    expect(await screen.findByText("1 of 6 parts found")).toBeInTheDocument();
    expect(screen.getByText("Superstructure.")).toBeInTheDocument();
  });

  it("answers a multiple choice question and turns the card green", async () => {
    renderLesson("components-of-a-bridge", "what-is-a-bridge");

    await advance(4);

    expect(await screen.findByText(/NOT what a bridge does/i)).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Removes the obstacle so nothing has to be crossed" }),
    );
    await user.click(screen.getByRole("button", { name: "Check" }));

    expect(card()).toHaveClass("border-lesson-correct");
    expect(screen.getByRole("button", { name: "Continue" })).toHaveClass("bg-lesson-correct");
    // An explained question offers the walkthrough behind it.
    expect(screen.getByRole("button", { name: "Why?" })).toBeInTheDocument();
  });

  it("finds the right part on the drawing, and walks the explanation", async () => {
    renderLesson("components-of-a-bridge", "what-is-a-bridge");

    // Past the heading, the definition, the drawing and the guided tour, and
    // through the multiple choice question that comes before this one.
    await advance(4);
    expect(await screen.findByText(/NOT what a bridge does/i)).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: "Removes the obstacle so nothing has to be crossed" }),
    );
    await user.click(screen.getByRole("button", { name: "Check" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(await screen.findByText(/part that carries the traffic across the gap/i)).toBeInTheDocument();

    // The superstructure is the first pin in this question's list.
    await user.click(screen.getByRole("button", { name: "Part 1" }));
    await user.click(screen.getByRole("button", { name: "Check" }));
    expect(card()).toHaveClass("border-lesson-correct");

    // The explanation arrives as a walkthrough, with its own drawings.
    await user.click(screen.getByRole("button", { name: "Why?" }));
    const rail = screen.getByRole("complementary", { name: "Why this is the answer" });
    expect(within(rail).getByText(/look for what the vehicles/i)).toBeInTheDocument();

    await user.click(within(rail).getByRole("button", { name: "Next step" }));

    expect(within(rail).getByText(/superstructure, or bridge span structure/i)).toBeInTheDocument();
    expect(
      await screen.findByRole("img", { name: /elevation of a bridge crossing a river/i }),
    ).toBeInTheDocument();
  });

  it("builds the bridge in the level check", async () => {
    renderLesson("components-of-a-bridge", "components-check");

    await advance(2);

    expect(await screen.findByText(/put every part where it belongs/i)).toBeInTheDocument();

    // The spots are numbered, not named: the learner has to judge from the drawing.
    const placement: [string, string][] = [
      ["Deck", "Empty spot 1"],
      ["Pier", "Empty spot 2"],
      ["Abutment", "Empty spot 3"],
      ["Foundation", "Empty spot 4"],
    ];

    for (const [part, spot] of placement) {
      await user.click(screen.getByRole("button", { name: part }));
      await user.click(screen.getByRole("button", { name: spot }));
    }

    expect(screen.getByText("Every part is on the bridge.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Check" }));

    expect(card()).toHaveClass("border-lesson-correct");
  });

  it("sorts bridges by structural system in the classification check", async () => {
    renderLesson("bridge-classification", "classification-check");

    // Step 1: the heading, step 2: the framing paragraph, step 3: the hotspot.
    await advance(2);
    expect(await screen.findByText(/carries its load by compression/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Part 1" }));
    await user.click(screen.getByRole("button", { name: "Check" }));
    expect(card()).toHaveClass("border-lesson-correct");

    // Step 4: matching real bridges to their systems.
    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(await screen.findByText(/match each bridge to the system/i)).toBeInTheDocument();

    const filing: [string, string][] = [
      ["Shibanpo Yangtze River Bridge — 330 m, prestressed concrete, continuous", "Rigid frame"],
      ["Pingnan Third Bridge — 575 m steel-concrete composite", "Arch"],
      ["Chaotianmen Yangtze River Bridge — a long-span arch", "Arch"],
      ["Yangsigang Yangtze River Bridge — 1700 m main span", "Cable system"],
      ["Zhanggao Yangtze crossing — 2300 m planned main span", "Cable system"],
      ["A standard span under 30 m in concrete", "Beam"],
    ];

    for (const [item, bucket] of filing) {
      await user.click(screen.getByRole("button", { name: item }));
      await user.click(screen.getByRole("button", { name: new RegExp(`^${bucket}`) }));
    }

    await user.click(screen.getByRole("button", { name: "Check" }));

    expect(card()).toHaveClass("border-lesson-correct");
  });
});
