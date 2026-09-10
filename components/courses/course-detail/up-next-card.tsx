import { Play } from "lucide-react";
import type { ReactNode } from "react";

import {
  HideOnScroll,
  type ScrollHideOptions,
} from "@/components/courses/course-detail/hide-on-scroll";
import { PathButton } from "@/components/courses/course-detail/path-button";
import type { PathLesson, ProgressSummary } from "@/modules/course/path";

function Card({
  children,
  ...scroll
}: { children: ReactNode } & ScrollHideOptions) {
  return (
    // z-40 keeps the floating card above the sticky level headers (z-30): as a
    // level scrolls past, its header tucks behind the card instead of over it.
    <HideOnScroll className="sticky bottom-10 z-40" {...scroll}>
      <div className="rounded-[44px] border-2 border-border bg-background/95 px-5 pb-5 pt-5 shadow-xl backdrop-blur">
        <div className="flex flex-col items-center gap-3 pt-4 text-center">
          {children}
        </div>
      </div>
    </HideOnScroll>
  );
}

export interface UpNextCardProps extends ScrollHideOptions {
  courseTitle: string;
  /** The lesson to continue with; null once every lesson is done. */
  lesson: PathLesson | null;
  progress: ProgressSummary;
  /** Where "Review course" goes when the course is complete. */
  reviewHref: string;
}

/**
 * The sticky card at the foot of the path: the next lesson, or a wrap-up with
 * a link back into the course once everything is finished. It slides out of
 * the way as the reader scrolls past `hideAfterPx` and returns within
 * `showBeforePx`; both default to the values in `hide-on-scroll`.
 */
export function UpNextCard({
  courseTitle,
  lesson,
  progress,
  reviewHref,
  ...scroll
}: UpNextCardProps) {
  if (progress.complete) {
    return (
      <Card {...scroll}>
        <h3 className="text-xl font-bold tracking-tight text-balance">
          You finished {courseTitle}
        </h3>
        <p className="text-sm text-muted-foreground">
          Beautiful work. Every master started with a single bead — replay any
          lesson to keep it sharp.
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
      <Card {...scroll}>
        <h3 className="text-xl font-bold tracking-tight">No lessons yet</h3>
      </Card>
    );
  }

  return (
    <Card {...scroll}>
      <h3 className="text-xl font-bold tracking-tight text-balance pb-2">
        {lesson.title}
      </h3>

      <div className="flex w-full items-center gap-2">
        <PathButton href={lesson.href} tone="violet" className="flex-1">
          {lesson.kind === "level_check" ? "Start level check" : "Continue"}
        </PathButton>
      </div>
    </Card>
  );
}
