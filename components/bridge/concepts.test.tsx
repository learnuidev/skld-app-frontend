import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ConceptCards, type Concept } from "@/components/bridge/concepts";

const concepts: Concept[] = [
  {
    id: "material",
    label: "By material",
    summary: "What the load-bearing structure is made of.",
    scene: "superstructure",
    highlight: ["main-girder"],
  },
  {
    id: "purpose",
    label: "By purpose",
    summary: "Who or what the bridge exists for.",
    scene: "carries",
    highlight: ["footpath"],
  },
  {
    id: "span",
    label: "By span",
    summary: "How far one span reaches.",
    scene: "dimensions",
  },
];

const next = () => screen.getByRole("button", { name: /next/i });
const back = () => screen.getByRole("button", { name: /back/i });

describe("ConceptCards", () => {
  it("opens on the first idea, with the ones to come held back", () => {
    render(<ConceptCards prompt="Meet the six ways." concepts={concepts} />);

    expect(screen.getByText("Meet the six ways.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "By material" })).toBeInTheDocument();
    expect(screen.getByText("What the load-bearing structure is made of.")).toBeInTheDocument();
    expect(screen.getByText("1 of 3")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "By purpose" })).not.toBeInTheDocument();
  });

  it("pages forward and back, one idea at a time", async () => {
    const user = userEvent.setup();
    render(<ConceptCards prompt="Meet the six ways." concepts={concepts} />);

    await user.click(next());
    expect(await screen.findByRole("heading", { name: "By purpose" })).toBeInTheDocument();
    expect(screen.getByText("2 of 3")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "By material" })).not.toBeInTheDocument();

    await user.click(next());
    expect(await screen.findByRole("heading", { name: "By span" })).toBeInTheDocument();

    await user.click(back());
    expect(await screen.findByRole("heading", { name: "By purpose" })).toBeInTheDocument();
  });

  it("stops at the ends, and offers a way back to the start", async () => {
    const user = userEvent.setup();
    render(<ConceptCards prompt="Meet the six ways." concepts={concepts} />);

    expect(back()).toBeDisabled();

    await user.click(next());
    await user.click(next());
    expect(screen.getByText("3 of 3")).toBeInTheDocument();
    // The last idea has nowhere further to go, so it offers a rerun instead.
    expect(screen.queryByRole("button", { name: /next/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /start again/i }));
    expect(screen.getByRole("heading", { name: "By material" })).toBeInTheDocument();
  });

  it("draws the idea, and lets its parts be read one by one", async () => {
    const user = userEvent.setup();
    render(<ConceptCards prompt="Meet the six ways." concepts={concepts} />);

    // The drawing for this idea, with its own part pinned.
    expect(screen.getByRole("img", { name: /section through a bridge deck showing the wearing surface/i })).toBeInTheDocument();
    const pin = screen.getByRole("button", { name: "Main girder" });

    await user.click(pin);

    // The line under the drawing becomes that part's story.
    expect(screen.getByText(/the deep beam along the bridge/i)).toBeInTheDocument();
    expect(screen.queryByText("What the load-bearing structure is made of.")).not.toBeInTheDocument();

    // Tapping again puts the idea's own line back.
    await user.click(screen.getByRole("button", { name: "Main girder" }));
    expect(screen.getByText("What the load-bearing structure is made of.")).toBeInTheDocument();
  });

  it("leaves an idea without pins as a plain drawing", async () => {
    const user = userEvent.setup();
    render(<ConceptCards prompt="Meet the six ways." concepts={concepts} />);

    await user.click(next());
    await user.click(next());

    expect(await screen.findByRole("heading", { name: "By span" })).toBeInTheDocument();
    expect(within(screen.getByRole("img")).queryByRole("button")).not.toBeInTheDocument();
  });
});
