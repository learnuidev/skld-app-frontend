"use client";

import { ChevronLeft, ChevronRight, Sparkles, X } from "lucide-react";

import { ThemeSelector } from "@/components/courses/lesson/theme-selector";
import { cn } from "@/lib/utils";

/** How a question the learner has reached ended up. */
export type QuestionState = "correct" | "wrong" | "todo";

/** One of the lesson's questions, and what became of it. */
export interface QuestionMark {
  /** Zero-based step the question sits on. */
  step: number;
  state: QuestionState;
}

/** The dot colours: answered right, answered wrong, not answered yet. */
const DOT: Record<QuestionState, string> = {
  correct: "bg-lesson-correct",
  wrong: "bg-destructive",
  todo: "bg-lesson-dot-todo",
};

/**
 * A step button at the end of the progress bar. It stays out of the way until
 * the learner reaches for the bar — and on a touch screen, where there is no
 * hover to reveal it, it is simply always there.
 */
function StepArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      aria-label={direction === "previous" ? "Previous step" : "Next step"}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-full border border-lesson-line bg-card text-muted-foreground transition-[opacity,color,background-color] duration-200",
        "hover:bg-lesson-soft hover:text-foreground",
        "disabled:opacity-0 disabled:pointer-events-none",
        // Hidden until the pointer is on the bar — but never hidden from a
        // keyboard, and never hidden where hovering is impossible.
        "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto",
        "focus-visible:opacity-100 focus-visible:pointer-events-auto",
        "[@media(hover:none)]:opacity-100 [@media(hover:none)]:pointer-events-auto",
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}

/**
 * The lesson navbar: leave the lesson, step back and on, watch the bar, see how
 * the questions went.
 *
 * The bar tracks how much of the lesson is behind you — it starts empty and
 * fills as steps are finished. The dots are the lesson's questions, one each,
 * green where the answer was right, red where it was wrong, and grey while it
 * is still waiting.
 */
export function LessonNavBar({
  current,
  total,
  completed,
  questions,
  onExit,
  onPrevious,
  onNext,
  className,
}: {
  /** Zero-based index of the step on screen. */
  current: number;
  total: number;
  /** Steps finished, which is what the bar draws. */
  completed: number;
  /** Every question in the lesson, in the order they are asked. */
  questions: QuestionMark[];
  onExit: () => void;
  /** Step back one, like the "p" key. */
  onPrevious: () => void;
  /** Step on one, like the "n" key. */
  onNext: () => void;
  className?: string;
}) {
  const behind = Math.min(Math.max(completed, 0), total);
  const percent = total === 0 ? 0 : Math.round((behind / total) * 100);
  const correct = questions.filter((question) => question.state === "correct").length;
  const wrong = questions.filter((question) => question.state === "wrong").length;
  const todo = questions.length - correct - wrong;
  const tally = `${correct} answered correctly, ${wrong} answered wrongly, ${todo} not answered`;

  return (
    <header
      className={cn(
        "flex h-12 shrink-0 items-center gap-2 px-2 sm:h-16 sm:gap-6 sm:px-8",
        className,
      )}
    >
      <button
        type="button"
        onClick={onExit}
        aria-label="Exit lesson"
        className="flex size-12 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-lesson-soft hover:text-foreground"
      >
        <X className="size-4" />
      </button>

      <div className="flex min-w-0 flex-1 items-center justify-center gap-4">
        {/* The bar and its two step buttons share one hover target, so reaching
            for the bar is what brings them out. */}
        <div className="group flex w-full min-w-0 max-w-[648px] items-center gap-1">
          <StepArrow
            direction="previous"
            disabled={current === 0}
            onClick={onPrevious}
          />

          <div
            role="progressbar"
            aria-label="Lesson progress"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={behind}
            aria-valuetext={`${behind} of ${total} steps done`}
            className="h-3 w-full min-w-0 overflow-hidden rounded-full bg-lesson-dot-todo"
          >
            <div
              className="h-full rounded-full bg-lesson-correct transition-[width] duration-500 ease-out motion-reduce:transition-none"
              style={{ width: `${percent}%` }}
            />
          </div>

          <StepArrow direction="next" disabled={current >= total - 1} onClick={onNext} />
        </div>

        {questions.length > 0 ? (
          // One dot per question, read out as a tally: the dots themselves are
          // a picture of it, so the label carries the count.
          <div
            role="img"
            aria-label={`Questions: ${tally}`}
            className="hidden shrink-0 items-center gap-1.5 lg:flex"
          >
            {questions.map((question) => (
              <span
                key={question.step}
                className={cn(
                  "h-3 w-4 rounded-full transition-colors",
                  DOT[question.state],
                  question.step === current && "ring-2 ring-foreground/30",
                )}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <span
          className="hidden items-center gap-1.5 text-base font-medium text-muted-foreground sm:flex"
          title={`${correct} of ${total} steps done`}
        >
          <Sparkles className="size-5 text-lesson-correct" aria-hidden />
          <span className="tabular-nums">
            {correct}
            <span className="sr-only"> of {total} steps done</span>
          </span>
        </span>
        <ThemeSelector />
      </div>
    </header>
  );
}
