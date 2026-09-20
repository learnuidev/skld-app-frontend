import { createRef } from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { TaskHandle } from "@/components/abacus/practice";
import {
  AssembleTask,
  ChooseTask,
  HotspotTask,
  OrderTask,
  PartsExplore,
  SceneFigure,
  SortTask,
} from "@/components/bridge/practice";
import { SpanPlayground } from "@/components/bridge/span-playground";

/** What the lesson player does when the learner presses Check. */
function checked(ref: React.RefObject<TaskHandle | null>) {
  let result = false;
  act(() => {
    result = ref.current?.check() ?? false;
  });
  return result;
}

describe("SceneFigure", () => {
  it("draws the scene with its caption", () => {
    render(<SceneFigure scene="overview" caption="Six parts, one bridge." />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText("Six parts, one bridge.")).toBeInTheDocument();
  });
});

describe("PartsExplore", () => {
  it("names a part only once the learner has found it", async () => {
    const user = userEvent.setup();
    render(<PartsExplore prompt="Tap each pin." scene="bearings" />);

    expect(screen.getByText("0 of 4 parts found")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Part 2" }));

    expect(screen.getByText("1 of 4 parts found")).toBeInTheDocument();
    expect(screen.getByText("Bearing.")).toBeInTheDocument();
  });

  it("keeps the tour to the parts it was asked for", () => {
    render(<PartsExplore prompt="Two parts only" scene="overview" parts={["pier", "abutment"]} />);

    expect(screen.getAllByRole("button")).toHaveLength(2);
    expect(screen.getByText("0 of 2 parts found")).toBeInTheDocument();
  });
});

describe("HotspotTask", () => {
  const props = {
    prompt: "Tap the bearing.",
    scene: "bearings" as const,
    parts: ["main-girder", "bearing", "pier-cap"],
    answer: "bearing",
    solved: false,
    onHasSelection: vi.fn(),
  };

  it("tells the player there is something to check once a pin is tapped", async () => {
    const user = userEvent.setup();
    const onHasSelection = vi.fn();
    const ref = createRef<TaskHandle>();
    render(<HotspotTask {...props} onHasSelection={onHasSelection} ref={ref} />);

    await user.click(screen.getByRole("button", { name: "Part 2" }));

    expect(onHasSelection).toHaveBeenCalledWith(true);
  });

  it("accepts the right part and refuses the wrong one", async () => {
    const user = userEvent.setup();
    const ref = createRef<TaskHandle>();
    render(<HotspotTask {...props} ref={ref} />);

    expect(ref.current?.check()).toBe(false);

    await user.click(screen.getByRole("button", { name: "Part 1" }));
    expect(checked(ref)).toBe(false);

    await user.click(screen.getByRole("button", { name: "Part 2" }));
    expect(checked(ref)).toBe(true);
  });

  it("rules a missed pin out without renumbering the rest, and shows the answer when solved", async () => {
    const user = userEvent.setup();
    const ref = createRef<TaskHandle>();
    const { rerender } = render(<HotspotTask {...props} ref={ref} />);

    await user.click(screen.getByRole("button", { name: "Part 1" }));
    checked(ref);

    // The ruled-out pin is no longer tappable, and Part 2 is still Part 2.
    expect(screen.queryByRole("button", { name: "Part 1" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Part 2" }));
    expect(checked(ref)).toBe(true);

    rerender(<HotspotTask {...props} solved ref={ref} />);

    expect(screen.getByRole("img", { name: "Bearing" })).toBeInTheDocument();
    expect(screen.getByText(/block between girder and pier/i)).toBeInTheDocument();
  });
});

describe("ChooseTask", () => {
  const props = {
    prompt: "What limits a cable-stayed span?",
    choices: ["The weight of the stays", "The colour of the tower", "The width of the deck"],
    answer: 0,
    solved: false,
    onHasSelection: vi.fn(),
  };

  it("checks the chosen answer", async () => {
    const user = userEvent.setup();
    const ref = createRef<TaskHandle>();
    render(<ChooseTask {...props} ref={ref} />);

    await user.click(screen.getByRole("button", { name: "The colour of the tower" }));
    expect(checked(ref)).toBe(false);

    await user.click(screen.getByRole("button", { name: "The weight of the stays" }));
    expect(checked(ref)).toBe(true);
  });

  it("strikes through a wrong answer and marks the right one green", async () => {
    const user = userEvent.setup();
    const ref = createRef<TaskHandle>();
    const { rerender } = render(<ChooseTask {...props} ref={ref} />);

    await user.click(screen.getByRole("button", { name: "The width of the deck" }));
    checked(ref);
    rerender(<ChooseTask {...props} solved ref={ref} />);

    expect(screen.getByRole("button", { name: "The weight of the stays" })).toHaveClass(
      "border-lesson-correct",
    );
  });
});

describe("SortTask", () => {
  const props = {
    prompt: "Sort the supports.",
    buckets: [
      { id: "end", label: "Ends" },
      { id: "middle", label: "Middle" },
    ],
    items: [
      { id: "abutment", label: "Abutment", bucket: "end" },
      { id: "pier", label: "Pier", bucket: "middle" },
    ],
    solved: false,
    onHasSelection: vi.fn(),
  };

  it("will not check until every card is filed", async () => {
    const user = userEvent.setup();
    const ref = createRef<TaskHandle>();
    render(<SortTask {...props} ref={ref} />);

    expect(ref.current?.check()).toBe(false);

    await user.click(screen.getByRole("button", { name: "Abutment" }));
    await user.click(screen.getByRole("button", { name: "Ends" }));

    expect(ref.current?.check()).toBe(false);
  });

  it("refuses a wrong sort, then accepts it once the card is moved", async () => {
    const user = userEvent.setup();
    const ref = createRef<TaskHandle>();
    render(<SortTask {...props} ref={ref} />);

    await user.click(screen.getByRole("button", { name: "Abutment" }));
    await user.click(screen.getByRole("button", { name: /Middle/ }));
    await user.click(screen.getByRole("button", { name: "Pier" }));
    await user.click(screen.getByRole("button", { name: /Middle/ }));

    expect(checked(ref)).toBe(false);

    // Tapping a filed card takes it back out, which is how a sort is corrected.
    await user.click(within(screen.getByRole("button", { name: /Middle/ })).getByText("Abutment"));
    await user.click(screen.getByRole("button", { name: "Abutment" }));
    await user.click(screen.getByRole("button", { name: /Ends/ }));

    expect(checked(ref)).toBe(true);
  });
});

describe("OrderTask", () => {
  const props = {
    prompt: "Order the load path.",
    items: [
      { id: "traffic", label: "Traffic" },
      { id: "deck", label: "Deck" },
      { id: "ground", label: "Ground" },
    ],
    solved: false,
    onHasSelection: vi.fn(),
  };

  it("starts scrambled, and only accepts the authored order", async () => {
    const user = userEvent.setup();
    const ref = createRef<TaskHandle>();
    render(<OrderTask {...props} ref={ref} />);

    expect(ref.current?.check()).toBe(false);

    // The cards start mid-list first: Ground, Traffic, Deck.
    await user.click(screen.getByRole("button", { name: "Move Traffic up" }));
    await user.click(screen.getByRole("button", { name: "Move Deck up" }));

    expect(checked(ref)).toBe(true);
  });

  it("will not move the first card up or the last one down", () => {
    render(<OrderTask {...props} ref={createRef<TaskHandle>()} />);

    const up = screen.getAllByRole("button", { name: /Move .* up/ });
    const down = screen.getAllByRole("button", { name: /Move .* down/ });

    expect(up[0]).toBeDisabled();
    expect(down[down.length - 1]).toBeDisabled();
  });
});

describe("AssembleTask", () => {
  const props = {
    prompt: "Build the bridge.",
    scene: "overview" as const,
    slots: [
      { id: "superstructure", label: "Deck", at: [120, 95] as [number, number] },
      { id: "pier", label: "Pier", at: [202, 131] as [number, number] },
    ],
    solved: false,
    onHasSelection: vi.fn(),
  };

  it("will not check until every part is on the drawing", async () => {
    const user = userEvent.setup();
    const ref = createRef<TaskHandle>();
    render(<AssembleTask {...props} ref={ref} />);

    expect(ref.current?.check()).toBe(false);

    await user.click(screen.getByRole("button", { name: "Deck" }));
    await user.click(screen.getByRole("button", { name: "Empty spot 1" }));

    expect(ref.current?.check()).toBe(false);
  });

  it("places parts, then accepts a complete bridge", async () => {
    const user = userEvent.setup();
    const ref = createRef<TaskHandle>();
    render(<AssembleTask {...props} ref={ref} />);

    await user.click(screen.getByRole("button", { name: "Deck" }));
    await user.click(screen.getByRole("button", { name: "Empty spot 1" }));
    await user.click(screen.getByRole("button", { name: "Pier" }));
    await user.click(screen.getByRole("button", { name: "Empty spot 2" }));

    expect(screen.getByRole("button", { name: "Take back Deck" })).toBeInTheDocument();
    expect(checked(ref)).toBe(true);
  });

  it("lets a placed part be taken back off the drawing", async () => {
    const user = userEvent.setup();
    render(<AssembleTask {...props} ref={createRef<TaskHandle>()} />);

    await user.click(screen.getByRole("button", { name: "Deck" }));
    await user.click(screen.getByRole("button", { name: "Empty spot 1" }));
    await user.click(screen.getByRole("button", { name: "Take back Deck" }));

    expect(screen.queryByRole("button", { name: "Take back Deck" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Deck" })).toBeInTheDocument();
  });
});

describe("SpanPlayground", () => {
  it("opens on a span and names the system that suits it", () => {
    render(<SpanPlayground prompt="Drag the span." />);

    expect(screen.getByRole("status", { name: "Selected main span" })).toHaveTextContent("120 m");
    expect(screen.getByText("Arch bridge.")).toBeInTheDocument();
  });

  it("changes the system as the span grows", () => {
    render(<SpanPlayground prompt="Drag the span." />);
    const slider = screen.getByRole("slider", { name: "Main span in metres" });
    const readout = screen.getByRole("status", { name: "Selected main span" });

    fireEvent.change(slider, { target: { value: "0" } });
    expect(readout).toHaveTextContent("20 m");
    expect(screen.getByText("Beam bridge.")).toBeInTheDocument();

    fireEvent.change(slider, { target: { value: "100" } });
    expect(readout).toHaveTextContent("2300 m");
    expect(screen.getByText("Suspension bridge.")).toBeInTheDocument();
  });

  it("names a real bridge near the span on screen", () => {
    render(<SpanPlayground prompt="Drag the span." />);
    const slider = screen.getByRole("slider", { name: "Main span in metres" });

    fireEvent.change(slider, { target: { value: "71" } });

    expect(screen.getByText(/Pingnan Third Bridge/)).toBeInTheDocument();
  });
});
