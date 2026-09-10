import { act, render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  DIRECTION_THRESHOLD,
  HIDE_AFTER_PX,
  HideOnScroll,
  SHOW_BEFORE_PX,
  shouldHideOnScroll,
  useHiddenOnScroll,
} from "@/components/courses/course-detail/hide-on-scroll";

/** Midway between the thresholds, where only the scroll direction decides. */
const IN_BAND = (HIDE_AFTER_PX + SHOW_BEFORE_PX) / 2;
/** Past the show threshold, so the card is hidden whichever way the reader moves. */
const PAST_SHOW = SHOW_BEFORE_PX + 100;
/** A backwards totter smaller than the direction threshold. */
const JITTER = Math.floor(DIRECTION_THRESHOLD / 2);

/** Move the page and let the scroll listener react. */
function scrollTo(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true, writable: true });
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

describe("shouldHideOnScroll", () => {
  it("stays visible up to the hide threshold", () => {
    expect(shouldHideOnScroll(0, "down")).toBe(false);
    expect(shouldHideOnScroll(HIDE_AFTER_PX / 2, "up")).toBe(false);
    expect(shouldHideOnScroll(HIDE_AFTER_PX, "down")).toBe(false);
  });

  it("is hidden from the show threshold onwards", () => {
    expect(shouldHideOnScroll(SHOW_BEFORE_PX, "up")).toBe(true);
    expect(shouldHideOnScroll(PAST_SHOW, "up")).toBe(true);
  });

  it("lets the scroll direction decide between the two thresholds", () => {
    expect(shouldHideOnScroll(IN_BAND, "down")).toBe(true);
    expect(shouldHideOnScroll(IN_BAND, "up")).toBe(false);
  });

  it("accepts its own thresholds", () => {
    const custom = { hideAfterPx: 500, showBeforePx: 1000 };
    const band = (custom.hideAfterPx + custom.showBeforePx) / 2;

    expect(shouldHideOnScroll(custom.hideAfterPx, "down", custom)).toBe(false);
    expect(shouldHideOnScroll(band, "down", custom)).toBe(true);
    expect(shouldHideOnScroll(band, "up", custom)).toBe(false);
    expect(shouldHideOnScroll(custom.showBeforePx, "up", custom)).toBe(true);
  });
});

describe("useHiddenOnScroll", () => {
  it("starts visible", () => {
    scrollTo(0);

    const { result } = renderHook(() => useHiddenOnScroll());

    expect(result.current).toBe(false);
  });

  it("hides once the reader scrolls past the hide threshold", () => {
    scrollTo(0);
    const { result } = renderHook(() => useHiddenOnScroll());

    scrollTo(IN_BAND);

    expect(result.current).toBe(true);
  });

  it("comes back once the reader scrolls up inside the show threshold", () => {
    scrollTo(0);
    const { result } = renderHook(() => useHiddenOnScroll());

    scrollTo(PAST_SHOW);
    expect(result.current).toBe(true);

    scrollTo(IN_BAND);
    expect(result.current).toBe(false);
  });

  it("stays hidden while the reader keeps diving deeper", () => {
    scrollTo(0);
    const { result } = renderHook(() => useHiddenOnScroll());

    scrollTo(PAST_SHOW);
    scrollTo(PAST_SHOW * 2);

    expect(result.current).toBe(true);
  });

  it("ignores scroll jitter below the direction threshold", () => {
    // Inside the band, but far enough past the hide threshold to totter back from.
    const from = Math.max(IN_BAND, HIDE_AFTER_PX + JITTER + 1);

    scrollTo(0);
    const { result } = renderHook(() => useHiddenOnScroll());

    scrollTo(from);
    expect(result.current).toBe(true);

    scrollTo(from - JITTER);

    expect(result.current).toBe(true);
  });

  it("accepts its own thresholds", () => {
    const custom = { hideAfterPx: HIDE_AFTER_PX, showBeforePx: SHOW_BEFORE_PX * 2 };
    const band = (custom.hideAfterPx + custom.showBeforePx) / 2;
    // Past the default show threshold, but still inside this card's own one.
    const aboveDefaultShow = (SHOW_BEFORE_PX + custom.showBeforePx) / 2;

    scrollTo(0);
    const { result } = renderHook(() => useHiddenOnScroll(custom));

    scrollTo(custom.hideAfterPx / 2);
    expect(result.current).toBe(false);

    scrollTo(band);
    expect(result.current).toBe(true);

    // Dive past this card's own show threshold, then climb back up to an offset
    // where the default thresholds would still have kept it hidden.
    scrollTo(custom.showBeforePx);
    expect(result.current).toBe(true);

    scrollTo(aboveDefaultShow);
    expect(result.current).toBe(false);
  });
});

describe("HideOnScroll", () => {
  it("renders its children", () => {
    scrollTo(0);

    render(
      <HideOnScroll className="sticky bottom-10">
        <button type="button">Continue</button>
      </HideOnScroll>,
    );

    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
  });

  it("keeps the wrapper reachable while near the top", () => {
    scrollTo(0);
    const { container } = render(
      <HideOnScroll>
        <button type="button">Continue</button>
      </HideOnScroll>,
    );

    const wrapper = container.firstElementChild;

    expect(wrapper).not.toHaveAttribute("aria-hidden");
    expect(wrapper).not.toHaveClass("pointer-events-none");
    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
  });

  it("takes the wrapper out of reach once it is off-screen", () => {
    scrollTo(0);
    const { container } = render(
      <HideOnScroll>
        <button type="button">Continue</button>
      </HideOnScroll>,
    );

    scrollTo(PAST_SHOW);

    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveAttribute("aria-hidden", "true");
    expect(wrapper).toHaveAttribute("inert");
    expect(wrapper).toHaveClass("pointer-events-none");
    expect(screen.queryByRole("button", { name: "Continue" })).not.toBeInTheDocument();
  });

  it("comes back into reach when the reader returns to the top", () => {
    scrollTo(0);
    render(
      <HideOnScroll>
        <button type="button">Continue</button>
      </HideOnScroll>,
    );

    scrollTo(PAST_SHOW);
    scrollTo(0);

    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
  });
});
