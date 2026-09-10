import Link from "next/link";

import { CourseArt } from "@/components/courses/course-art";
import { PALETTE } from "@/components/courses/illustrations/palette";
import { cn } from "@/lib/utils";
import type { PathCourse } from "@/modules/course/paths";

export interface CourseCardProps {
  course: PathCourse;
  /** Whole-number completion percentage; only painted for available courses. */
  percent?: number;
  /** Stored progress is only painted once the client has read it. */
  hydrated?: boolean;
  /** Draws the 2px rule that links this card to the next one in the strip. */
  showConnector?: boolean;
}

/**
 * One square course card on a learning path: a white tile with a hard 4px
 * shadow, the course illustration, and a progress bar pinned near the bottom.
 * Matches the course cards on Brilliant's courses page.
 */
export function CourseCard({
  course,
  percent = 0,
  hydrated = true,
  showConnector = false,
}: CourseCardProps) {
  const available = course.status === "available";
  const width = "w-[168px] sm:w-[176px]";

  const card = (
    <div
      className={cn(
        "relative size-[168px] shrink-0 rounded-[20px] border-2 border-border bg-card p-[38px] sm:size-[176px] sm:p-[40px]",
        "-translate-y-1 shadow-[0_4px_0_0_var(--color-border)]",
        "transition-[transform,box-shadow,border-color] duration-100 ease-out",
        "group-hover:border-ring group-hover:shadow-[0_4px_0_0_var(--color-ring)]",
      )}
    >
      <span className="absolute left-3 top-3 z-10 text-xs font-bold uppercase tracking-[0.04em] text-muted-foreground">
        {course.subject}
      </span>
      {available ? null : (
        <span className="absolute right-2.5 top-2.5 z-10 rounded-full bg-muted px-2 py-1 text-xs font-bold uppercase tracking-[0.04em] text-muted-foreground">
          Soon
        </span>
      )}

      {/* Every illustration sits on the same light grey plate. */}
      <span
        className="flex size-full items-center justify-center rounded-xl"
        style={{ backgroundColor: PALETTE.fog }}
      >
        <CourseArt course={course} />
      </span>

      {available ? (
        <span
          role="progressbar"
          aria-label={`${course.title} progress`}
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="absolute inset-x-[9.09%] bottom-[9.09%] block h-1.5 overflow-hidden rounded-full bg-border"
        >
          <span
            className="block h-full rounded-full bg-foreground transition-[width] duration-500"
            style={{ width: hydrated ? `${percent}%` : "0%" }}
          />
        </span>
      ) : null}
    </div>
  );

  return (
    <li className="group relative flex shrink-0 flex-col items-center">
      <div className="relative flex flex-col items-center">
        <div className="relative">
          {card}
          {showConnector ? (
            <span
              aria-hidden
              className="absolute left-full top-1/2 h-0.5 w-4 -translate-y-1/2 bg-border"
            />
          ) : null}
        </div>

        {available ? (
          // The anchor's ::after stretches back over the card, so clicking the
          // artwork opens the course too — the pattern Brilliant's cards use.
          <Link
            href={`/courses/${course.slug}`}
            className={cn(
              "mt-6 rounded-sm px-1 text-center text-base text-foreground underline-offset-4",
              "after:absolute after:inset-0 after:content-[''] hover:underline",
              width,
            )}
          >
            {course.title}
          </Link>
        ) : (
          <span className={cn("mt-6 px-1 text-center text-base text-muted-foreground", width)}>
            {course.title}
          </span>
        )}
      </div>
    </li>
  );
}
