import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SearchBox } from "@/components/search/search-box";
import type { SearchHit } from "@/modules/course/types";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

const hits: SearchHit[] = [
  {
    kind: "lesson",
    title: "Imagine the Beads",
    snippet: "See the abacus in your mind's eye and compute without it.",
    href: "/courses/understanding-abacus/beyond-the-beads/imagine-the-beads",
    courseTitle: "Understanding Abacus",
    levelName: "From Beads to Mind",
    lessonTitle: "Imagine the Beads",
    score: 40,
  },
  {
    kind: "step",
    title: "Earth beads below the beam each count 1.",
    snippet: "Slide all four and the rod shows 4.",
    href: "/courses/understanding-abacus/meet-the-soroban/beads-worth/earth-beads-count-one",
    courseTitle: "Understanding Abacus",
    levelName: "Meet the Soroban",
    lessonTitle: "Beads worth",
    score: 12,
  },
];

function answerWith(results: SearchHit[]) {
  fetchMock.mockImplementation(async (input: RequestInfo | URL) => {
    const query = new URL(String(input), "http://localhost").searchParams.get("q") ?? "";
    return {
      ok: true,
      json: async () => ({ query, results }),
    } as Response;
  });
}

function answerWithFailure() {
  fetchMock.mockImplementation(async () => {
    throw new Error("offline");
  });
}

const fetchMock = vi.fn();

beforeEach(() => {
  push.mockClear();
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

function renderBox() {
  return render(<SearchBox />);
}

describe("SearchBox", () => {
  it("shows what the curriculum has to say as the learner types", async () => {
    answerWith(hits);
    renderBox();

    await userEvent.type(screen.getByRole("combobox", { name: "Search lessons and steps" }), "beads");

    const listbox = await screen.findByRole("listbox", { name: "Search results" });
    const options = within(listbox).getAllByRole("option");
    expect(options).toHaveLength(2);

    // Every row says what it is, where it lives, and the words that matched.
    expect(options[0]).toHaveTextContent("Imagine the Beads");
    expect(options[0]).toHaveTextContent("Lesson");
    expect(options[0]).toHaveTextContent("Understanding Abacus › From Beads to Mind");
    expect(options[1]).toHaveTextContent("Step");
    expect(options[1]).toHaveTextContent("Meet the Soroban › Beads worth");

    // A row is a title, a badge and two lines of prose; read aloud it is one
    // sentence naming the lesson and where it sits, not the markup in order.
    expect(options[0]).toHaveAccessibleName(
      "Imagine the Beads — Lesson in Understanding Abacus, From Beads to Mind",
    );
    expect(options[1]).toHaveAccessibleName(
      "Earth beads below the beam each count 1. — Step in Understanding Abacus, Meet the Soroban, Beads worth",
    );
  });

  it("asks the server, and marks the words it asked about", async () => {
    answerWith(hits);
    renderBox();

    await userEvent.type(screen.getByRole("combobox", { name: "Search lessons and steps" }), "beads");

    await screen.findByRole("listbox", { name: "Search results" });
    expect(String(fetchMock.mock.calls[0][0])).toContain("/api/search?q=beads");
    // "Beads" is in the row's own title and snippet, and is marked in both.
    expect(screen.getAllByText("Beads", { selector: "mark" }).length).toBeGreaterThan(0);
  });

  it("opens the lesson the learner clicks", async () => {
    answerWith(hits);
    renderBox();

    const box = screen.getByRole("combobox", { name: "Search lessons and steps" });
    await userEvent.type(box, "beads");
    await userEvent.click(await screen.findByRole("option", { name: /Imagine the Beads/ }));

    expect(push).toHaveBeenCalledWith("/courses/understanding-abacus/beyond-the-beads/imagine-the-beads");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("opens the exact step when the learner picks one from the keyboard", async () => {
    answerWith(hits);
    renderBox();

    const box = screen.getByRole("combobox", { name: "Search lessons and steps" });
    await userEvent.type(box, "beads");
    await screen.findByRole("listbox", { name: "Search results" });

    await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}");

    expect(push).toHaveBeenCalledWith(
      "/courses/understanding-abacus/meet-the-soroban/beads-worth/earth-beads-count-one",
    );
  });

  it("walks the rows with the arrow keys and says which one is picked", async () => {
    answerWith(hits);
    renderBox();

    const box = screen.getByRole("combobox", { name: "Search lessons and steps" });
    await userEvent.type(box, "beads");
    await screen.findByRole("listbox", { name: "Search results" });

    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getAllByRole("option")[0]).toHaveAttribute("aria-selected", "true");
    expect(box).toHaveAttribute("aria-activedescendant", screen.getAllByRole("option")[0].id);

    // Up from the first row wraps to the last.
    await userEvent.keyboard("{ArrowUp}");
    expect(screen.getAllByRole("option")[1]).toHaveAttribute("aria-selected", "true");
  });

  it("puts the dropdown away on Escape", async () => {
    answerWith(hits);
    renderBox();

    await userEvent.type(screen.getByRole("combobox", { name: "Search lessons and steps" }), "beads");
    await screen.findByRole("listbox", { name: "Search results" });

    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Search lessons and steps" })).toHaveValue("beads");
  });

  it("asks once for a word, not once for every letter", async () => {
    answerWith(hits);
    renderBox();

    await userEvent.type(screen.getByRole("combobox", { name: "Search lessons and steps" }), "beads");
    await screen.findByRole("listbox", { name: "Search results" });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("does not search for a query too short to mean anything", async () => {
    answerWith(hits);
    renderBox();

    await userEvent.type(screen.getByRole("combobox", { name: "Search lessons and steps" }), "b");
    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("says so when nothing matches", async () => {
    answerWith([]);
    renderBox();

    await userEvent.type(screen.getByRole("combobox", { name: "Search lessons and steps" }), "zygote");

    expect(await screen.findByText(/no matches for “zygote”/i)).toBeInTheDocument();
  });

  it("says so when the search itself fails, without taking the page down", async () => {
    answerWithFailure();
    renderBox();

    await userEvent.type(screen.getByRole("combobox", { name: "Search lessons and steps" }), "flange");

    expect(await screen.findByText(/search is not available/i)).toBeInTheDocument();
  });

  it("opens the top match when the learner presses Ask", async () => {
    answerWith(hits);
    renderBox();

    await userEvent.type(screen.getByRole("combobox", { name: "Search lessons and steps" }), "beads");
    await screen.findByRole("listbox", { name: "Search results" });

    await userEvent.click(screen.getByRole("button", { name: "Ask" }));

    expect(push).toHaveBeenCalledWith("/courses/understanding-abacus/beyond-the-beads/imagine-the-beads");
  });

  it("hands the query to the caller as it is typed", async () => {
    answerWith(hits);
    const onQueryChange = vi.fn();
    render(<SearchBox onQueryChange={onQueryChange} />);

    await userEvent.type(screen.getByRole("combobox", { name: "Search lessons and steps" }), "beads");

    await waitFor(() => expect(onQueryChange).toHaveBeenLastCalledWith("beads"));
  });
});
