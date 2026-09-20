"use client";

import { Sparkles, X } from "lucide-react";

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
 * The lesson navbar: leave the lesson, watch the bar, see how the questions
 * went.
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
        <div
          role="progressbar"
          aria-label="Lesson progress"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={behind}
          aria-valuetext={`${behind} of ${total} steps done`}
          className="h-3 w-full max-w-[592px] overflow-hidden rounded-full bg-lesson-dot-todo"
        >
          <div
            className="h-full rounded-full bg-lesson-correct transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${percent}%` }}
          />
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
