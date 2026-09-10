import { Check, Play } from "lucide-react";
import type { ReactNode } from "react";

import { PathButton } from "@/components/courses/course-detail/path-button";
import type { PathLesson, ProgressSummary } from "@/modules/course/path";

function Card({ label, counter, children }: { label: string; counter: string; children: ReactNode }) {
  return (
    <div className="sticky bottom-6 z-20">
      <div className="rounded-[28px] border-2 border-border bg-background/95 px-5 pb-5 pt-5 shadow-xl backdrop-blur">
        <div className="flex items-center justify-between gap-3 border-b-2 border-border pb-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {label}
          </span>
          <span className="text-xs font-bold tabular-nums text-muted-foreground">{counter}</span>
        </div>
        <div className="flex flex-col items-center gap-3 pt-3 text-center">{children}</div>
      </div>
    </div>
  );
}

export interface UpNextCardProps {
  courseTitle: string;
  /** The lesson to continue with; null once every lesson is done. */
  lesson: PathLesson | null;
  progress: ProgressSummary;
  /** Where "Review course" goes when the course is complete. */
  reviewHref: string;
  onMarkComplete?: (lessonKey: string) => void;
}

/**
 * The sticky card at the foot of the path: the next lesson, or a wrap-up with
 * a link back into the course once everything is finished.
 */
export function UpNextCard({
  courseTitle,
  lesson,
  progress,
  reviewHref,
  onMarkComplete,
}: UpNextCardProps) {
  const counter = `${progress.done} / ${progress.total}`;

  if (progress.complete) {
    return (
      <Card label="Course complete" counter={counter}>
        <h3 className="text-xl font-bold tracking-tight text-balance">You finished {courseTitle}</h3>
        <p className="text-sm text-muted-foreground">
          Beautiful work. Every master started with a single bead — replay any lesson to keep it
          sharp.
        </p>
        <PathButton href={reviewHref} tone="emerald" className="w-full">
          <Play data-icon="inline-start" />
          Review course
        </PathButton>
      </Card>
    );
  }

  if (!lesson) {
    return (
      <Card label="Up next" counter={counter}>
        <h3 className="text-xl font-bold tracking-tight">No lessons yet</h3>
      </Card>
    );
  }

  const facts = [
    lesson.levelName,
    `${lesson.minutes} min`,
    lesson.exercises > 0 ? `${lesson.exercises} exercises` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Card label="Up next" counter={counter}>
      <h3 className="text-xl font-bold tracking-tight text-balance">{lesson.title}</h3>
      <p className="text-sm text-muted-foreground">
        {lesson.blurb}
        <span className="mt-1 block font-medium">{facts}</span>
      </p>
      <div className="flex w-full items-center gap-2">
        <PathButton href={lesson.href} tone="violet" className="flex-1">
          <Play data-icon="inline-start" />
          {lesson.kind === "level_check" ? "Start level check" : "Continue"}
        </PathButton>
        {onMarkComplete ? (
          <button
            type="button"
            onClick={() => onMarkComplete(lesson.key)}
            title="Mark this lesson as done"
            aria-label="Mark this lesson as done"
            className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-border text-muted-foreground transition-colors hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <Check className="size-5" strokeWidth={3} />
          </button>
        ) : null}
      </div>
    </Card>
  );
}
