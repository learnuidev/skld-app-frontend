import { Abacus } from "@/components/abacus/abacus";
import { CourseMetrics } from "@/components/courses/course-detail/course-metrics";
import { CourseProgress } from "@/components/courses/course-detail/course-progress";
import { cn } from "@/lib/utils";
import type { Course } from "@/modules/course/types";
import type { ProgressSummary } from "@/modules/course/path";

export interface CourseSummaryCardProps {
  course: Course;
  progress: ProgressSummary;
  hydrated?: boolean;
  onReset?: () => void;
}

/** The sticky card that introduces the course next to its learning path. */
export function CourseSummaryCard({
  course,
  progress,
  hydrated = true,
  onReset,
}: CourseSummaryCardProps) {
  return (
    <div className="rounded-[22px] border-2 border-border bg-background px-6 pb-6 pt-8 xl:px-8 xl:pb-8">
      <div className="flex flex-col items-start gap-6">
        <div
          className={cn(
            "flex size-[100px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br",
            course.heroAccent,
          )}
        >
          <span className="flex items-center justify-center rounded-xl bg-white/75 p-1.5">
            <Abacus
              digits={course.sample ?? [4, 3, 2, 1]}
              readOnly
              scale={0.24}
              label={`${course.title} course preview`}
            />
          </span>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {course.title}
          </h1>
          <p className="mt-2 text-base font-medium text-muted-foreground">
            {course.tagline}
          </p>
        </div>

        <p className="leading-relaxed text-muted-foreground line-clamp-2">
          {course.introText}
        </p>

        <CourseMetrics
          lessonCount={course.lessonCount}
          exerciseCount={course.exerciseCount}
          lessonMinutes={course.lessonMinutes}
        />
      </div>

      <CourseProgress
        done={progress.done}
        total={progress.total}
        percent={progress.percent}
        complete={progress.complete}
        hydrated={hydrated}
        onReset={onReset}
      />
    </div>
  );
}
