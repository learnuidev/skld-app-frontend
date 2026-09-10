import Link from "next/link";

import { PathNode } from "@/components/courses/path-node";
import { cn } from "@/lib/utils";
import type { PathLesson } from "@/modules/course/path";

/**
 * The path snakes down the page: centre, left, centre, right — the rhythm the
 * reference course page uses to keep a long list of lessons interesting.
 */
const ROW_ALIGN = ["justify-center", "justify-start", "justify-center", "justify-end"] as const;

export function rowAlignmentClass(position: number): string {
  return ROW_ALIGN[position % ROW_ALIGN.length];
}

const STATUS_LABEL: Record<PathLesson["status"], string> = {
  done: "completed",
  current: "up next",
  upcoming: "not started",
};

export interface LessonNodeRowProps {
  lesson: PathLesson;
  /** 0-based position of the lesson within its level; drives the zig-zag. */
  position: number;
  className?: string;
}

/** One lesson on the path: a 3D pebble plus its label, linked to the lesson. */
export function LessonNodeRow({ lesson, position, className }: LessonNodeRowProps) {
  const emphasised = lesson.status === "done" || lesson.status === "current";

  return (
    <div className={cn("flex w-full max-w-[392px]", rowAlignmentClass(position), className)}>
      <Link
        href={lesson.href}
        aria-label={`${lesson.title} — ${STATUS_LABEL[lesson.status]}`}
        className="group flex items-end gap-2"
      >
        <PathNode
          state={lesson.status}
          index={lesson.index}
          kind={lesson.kind}
          className="transition-transform duration-200 group-hover:-translate-y-1"
        />
        <span className="flex min-h-[55px] w-[138px] items-end pb-[29.5px]">
          <span
            className={cn(
              "line-clamp-3 text-base leading-snug text-pretty",
              emphasised ? "font-medium text-foreground" : "text-muted-foreground group-hover:text-foreground",
            )}
          >
            {lesson.title}
          </span>
        </span>
      </Link>
    </div>
  );
}
