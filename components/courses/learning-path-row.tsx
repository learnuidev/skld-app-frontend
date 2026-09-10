import { Star } from "lucide-react";

import { Abacus } from "@/components/abacus/abacus";
import { CourseCard } from "@/components/courses/course-card";
import { cn } from "@/lib/utils";
import type { LearningPath, PathCourse } from "@/modules/course/paths";

export interface LearningPathRowProps {
  path: LearningPath;
  courses: PathCourse[];
  /** Whole-number completion across every course in the path. */
  percent: number;
  /** Per-course completion, keyed by course slug. */
  coursePercents: Record<string, number>;
  /** Stored progress is only painted once the client has read it. */
  hydrated?: boolean;
  starred: boolean;
  onToggleStar: (slug: string) => void;
}

function ProgressPill({ percent, className }: { percent: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-muted px-4 py-2.5 text-sm font-semibold text-muted-foreground",
        className,
      )}
    >
      {percent}% complete
    </span>
  );
}

/**
 * One learning path: a header (art, badge, title, blurb, progress, star toggle)
 * above a full-bleed grey strip of course cards that scrolls sideways on small
 * screens — the layout used by Brilliant's courses page.
 */
export function LearningPathRow({
  path,
  courses,
  percent,
  coursePercents,
  hydrated = true,
  starred,
  onToggleStar,
}: LearningPathRowProps) {
  const lead = courses[0];

  return (
    <li>
      <div className="pb-0 pt-6 lg:pb-6 lg:pl-6">
        <div className="flex items-center gap-4 lg:gap-10">
          <div
            className={cn(
              "flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br lg:size-20",
              lead?.heroAccent ?? "from-orange-400 via-amber-300 to-yellow-200",
            )}
          >
            <Abacus
              digits={lead?.sample ?? [0, 0, 0, 0]}
              readOnly
              scale={0.13}
              label={`${path.title} preview`}
            />
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
            <div className="min-w-0 lg:max-w-[580px]">
              <span className="block truncate text-xs font-bold uppercase tracking-[0.04em] text-muted-foreground">
                {path.badge}
              </span>
              <h3 className="mt-0.5 text-xl font-bold tracking-tight">{path.title}</h3>
              <p className="mt-1 hidden text-base text-muted-foreground lg:block">
                {path.description}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 lg:h-12">
              {percent > 0 ? (
                <ProgressPill percent={percent} className="hidden lg:inline-flex" />
              ) : null}
              <button
                type="button"
                onClick={() => onToggleStar(path.slug)}
                aria-pressed={starred}
                aria-label={starred ? `Unstar ${path.title}` : `Star ${path.title}`}
                className="rounded-full bg-muted p-2.5 text-muted-foreground transition-colors hover:bg-border"
              >
                <Star className={cn("size-5", starred ? "fill-amber-400 text-amber-400" : null)} />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm text-muted-foreground lg:hidden">{path.description}</p>

        <div className="mt-3 flex lg:hidden">
          {percent > 0 ? <ProgressPill percent={percent} className="w-full justify-center" /> : null}
        </div>
      </div>

      <div className="mt-5 -mx-4 bg-muted sm:-mx-6 lg:mx-0 lg:mt-3 lg:rounded-[12px]">
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-10 pt-[50px] sm:px-6 lg:pt-[74px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {courses.map((course, index) => (
            <CourseCard
              key={course.slug}
              course={course}
              percent={coursePercents[course.slug] ?? 0}
              hydrated={hydrated}
              showConnector={index < courses.length - 1}
            />
          ))}
        </ul>
      </div>
    </li>
  );
}
