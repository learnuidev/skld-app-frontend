"use client";

import { useEffect, useMemo, useState } from "react";

import { CourseSummaryCard } from "@/components/courses/course-detail/course-summary-card";
import { LessonPath } from "@/components/courses/course-detail/lesson-path";
import { UpNextCard } from "@/components/courses/course-detail/up-next-card";
import { clearProgress, readProgress } from "@/modules/course/progress";
import {
  buildCoursePath,
  findCurrentLesson,
  summarizeProgress,
} from "@/modules/course/path";
import type { Course } from "@/modules/course/types";

/**
 * Course overview page: a sticky course card beside the level-by-level path.
 * All state lives here; every child component is a pure function of props.
 */
export function CourseDetail({ course }: { course: Course }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setCompleted(readProgress(course.slug));
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, [course.slug]);

  const levels = useMemo(
    () => buildCoursePath(course, completed),
    [course, completed],
  );
  const progress = useMemo(() => summarizeProgress(levels), [levels]);
  const currentLesson = useMemo(() => findCurrentLesson(levels), [levels]);
  const reviewHref = levels[0]?.lessons[0]?.href ?? `/courses/${course.slug}`;

  const reset = () => {
    clearProgress(course.slug);
    setCompleted([]);
  };

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 pb-32 pt-8 sm:px-6 xl:px-8">
      <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-center xl:gap-8">
        <aside className="xl:sticky xl:top-[88px] xl:w-[487px] xl:shrink-0">
          <CourseSummaryCard
            course={course}
            progress={progress}
            hydrated={hydrated}
            onReset={reset}
          />
        </aside>

        <LessonPath levels={levels}>
          <UpNextCard
            courseTitle={course.title}
            lesson={currentLesson}
            progress={progress}
            reviewHref={reviewHref}
          />
        </LessonPath>
      </div>
    </div>
  );
}

export default CourseDetail;
