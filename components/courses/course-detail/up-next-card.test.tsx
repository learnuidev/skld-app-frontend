import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  HIDE_AFTER_PX,
  SHOW_BEFORE_PX,
} from "@/components/courses/course-detail/hide-on-scroll";
import { LevelSection } from "@/components/courses/course-detail/level-section";
import { UpNextCard } from "@/components/courses/course-detail/up-next-card";
import { buildCoursePath, summarizeProgress } from "@/modules/course/path";
import { nodeKey } from "@/modules/course/utils";
import { makeCourse } from "@/test/fixtures";

const course = makeCourse();
const reviewHref = "/courses/test-course/foundations/first-bead";

/** Past the card's default show threshold, so it is hidden whichever way you scroll. */
const PAST_SHOW = SHOW_BEFORE_PX + 100;

/** Read the numeric z-index out of a Tailwind `z-*` class. */
function zIndexOf(element: Element | null): number {
  const match = typeof element?.className === "string" ? element.className.match(/\bz-(\d+)/) : null;
  return match ? Number(match[1]) : 0;
}

/** Move the page and let the scroll listener react. */
function scrollTo(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true, writable: true });
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

/** Keys of the first `count` lessons in path order. */
function completedKeys(count: number): string[] {
  const keys: string[] = [];
  course.levels.forEach((level) =>
    level.lessons.forEach((lesson) => keys.push(nodeKey(level, lesson))),
  );
  return keys.slice(0, count);
}

function renderCard(doneCount: number, scroll?: { hideAfterPx?: number; showBeforePx?: number }) {
  const levels = buildCoursePath(course, completedKeys(doneCount));
  const current = levels.flatMap((level) => level.lessons).find((l) => l.status === "current");

  return render(
    <UpNextCard
      courseTitle={course.title}
      lesson={current ?? null}
      progress={summarizeProgress(levels)}
      reviewHref={reviewHref}
      {...scroll}
    />,
  );
}

describe("UpNextCard", () => {
  it("names the lesson to continue with", () => {
    renderCard(0);

    expect(screen.getByRole("heading", { name: "First Bead" })).toBeInTheDocument();
  });

  it("links to the lesson with the violet call to action", () => {
    renderCard(0);

    expect(screen.getByRole("link", { name: /continue/i })).toHaveAttribute(
      "href",
      "/courses/test-course/foundations/first-bead",
    );
    expect(screen.getByRole("link", { name: /continue/i })).toHaveClass("bg-violet-500");
  });

  it("calls a level check a level check", () => {
    renderCard(2);

    expect(screen.getByRole("heading", { name: "Level Check" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start level check/i })).toHaveAttribute(
      "href",
      "/courses/test-course/foundations/foundations-check",
    );
  });

  it("moves on to the next level once the first is finished", () => {
    renderCard(3);

    expect(screen.getByRole("heading", { name: "Speed Drill" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /continue/i })).toHaveAttribute(
      "href",
      "/courses/test-course/fluency/speed-drill",
    );
  });

  it("wraps up when the course is finished", () => {
    renderCard(6);

    expect(screen.getByText("You finished Test Course")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /review course/i })).toHaveAttribute(
      "href",
      reviewHref,
    );
    expect(screen.getByRole("link", { name: /review course/i })).toHaveClass("bg-emerald-500");
  });

  it("copes with a course that has no lessons yet", () => {
    render(
      <UpNextCard
        courseTitle={course.title}
        lesson={null}
        progress={{ done: 0, total: 0, percent: 0, complete: false }}
        reviewHref="/courses/test-course"
      />,
    );

    expect(screen.getByText("No lessons yet")).toBeInTheDocument();
  });

  it("sticks to the foot of the path", () => {
    const { container } = renderCard(0);

    expect(container.firstElementChild).toHaveClass("sticky");
  });

  it("hides itself once the page is scrolled past the default threshold", () => {
    scrollTo(0);
    const { container } = renderCard(0);

    scrollTo(HIDE_AFTER_PX);
    expect(container.firstElementChild).not.toHaveAttribute("aria-hidden");

    scrollTo(PAST_SHOW);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("takes the scroll thresholds it is given", () => {
    const tight = { hideAfterPx: 100, showBeforePx: 200 };

    scrollTo(0);
    const { container } = renderCard(0, tight);

    scrollTo((tight.hideAfterPx + tight.showBeforePx) / 2);

    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("accepts thresholds looser than the defaults", () => {
    const loose = { hideAfterPx: SHOW_BEFORE_PX, showBeforePx: SHOW_BEFORE_PX * 2 };

    scrollTo(0);
    const { container } = renderCard(0, loose);

    // The default thresholds would already have hidden the card here.
    scrollTo(loose.hideAfterPx);

    expect(container.firstElementChild).not.toHaveAttribute("aria-hidden");
  });

  it("still hides within a looser range once you are deep enough", () => {
    const loose = { hideAfterPx: SHOW_BEFORE_PX, showBeforePx: SHOW_BEFORE_PX * 2 };

    scrollTo(0);
    const { container } = renderCard(0, loose);

    scrollTo(loose.showBeforePx);

    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("stacks above the sticky level headers", () => {
    const levels = buildCoursePath(course, []);
    const { container } = render(
      <>
        <LevelSection level={levels[0]} />
        <UpNextCard
          courseTitle={course.title}
          lesson={levels[0].lessons[0]}
          progress={summarizeProgress(levels)}
          reviewHref={reviewHref}
        />
      </>,
    );

    const header = container.querySelector('section[aria-label^="Level"] div.sticky');
    const card = container.querySelector("div.sticky.bottom-10");

    // A level header scrolling past must tuck behind the card, never cover it.
    expect(zIndexOf(header)).toBeGreaterThan(0);
    expect(zIndexOf(card)).toBeGreaterThan(zIndexOf(header));
  });
});
