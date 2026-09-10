"use client";

import { Sparkles, X } from "lucide-react";

import { ThemeSelector } from "@/components/courses/lesson/theme-selector";
import { cn } from "@/lib/utils";

/** Beyond this the trailing dots stop reading as a count. */
const MAX_DOTS = 6;

/**
 * The lesson navbar: leave the lesson, watch the bar, see what's left.
 *
 * The bar tracks where you are in the lesson; the dots beside it are the steps
 * still ahead, and the sparkle counts the steps you got right.
 */
export function LessonNavBar({
  current,
  total,
  done,
  onExit,
  className,
}: {
  /** Zero-based index of the step on screen. */
  current: number;
  total: number;
  /** Steps answered correctly in this lesson. */
  done: number;
  onExit: () => void;
  className?: string;
}) {
  const percent = total === 0 ? 0 : Math.round(((current + 1) / total) * 100);
  const remaining = Math.max(0, total - current - 1);
  const dots = Math.min(remaining, MAX_DOTS);
  const overflow = remaining - dots;

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
          aria-valuenow={current + 1}
          className="h-3 w-full max-w-[592px] overflow-hidden rounded-full bg-lesson-dot-todo"
        >
          <div
            className="h-full rounded-full bg-lesson-correct transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${percent}%` }}
          />
        </div>

        {dots > 0 ? (
          <div className="hidden shrink-0 items-center gap-1.5 lg:flex" aria-hidden>
            {Array.from({ length: dots }, (_, i) => (
              <span key={i} className="h-3 w-4 rounded-full bg-lesson-dot-todo" />
            ))}
            {overflow > 0 ? (
              <span className="text-xs font-medium text-muted-foreground">+{overflow}</span>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <span
          className="hidden items-center gap-1.5 text-base font-medium text-muted-foreground sm:flex"
          title={`${done} of ${total} steps done`}
        >
          <Sparkles className="size-5 text-lesson-correct" aria-hidden />
          <span className="tabular-nums">
            {done}
            <span className="sr-only"> of {total} steps done</span>
          </span>
        </span>
        <ThemeSelector />
      </div>
    </header>
  );
}
