"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play, PlayCircle } from "lucide-react";

import { Abacus } from "@/components/abacus/abacus";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { readProgress } from "@/modules/course/progress";
import { flattenCourse, lessonUrl, nodeKey } from "@/modules/course/utils";
import type { Course } from "@/modules/course/types";

export default function LearningPath({
  courses,
  title = "Abacus",
  description = "Master the soroban and the Chinese suanpan, then move the whole board into your head. Three abacus traditions on one path — from your first bead to lightning-fast mental math.",
}: {
  courses: Course[];
  title?: string;
  description?: string;
}) {
  const [completed, setCompleted] = useState<Set<string> | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const set = new Set<string>();
      courses.forEach((course) => readProgress(course.slug).forEach((key) => set.add(key)));
      setCompleted(set);
    }, 0);
    return () => window.clearTimeout(id);
  }, [courses]);

  const completedSet = useMemo(() => completed ?? new Set<string>(), [completed]);

  const nodes = useMemo(
    () =>
      courses.flatMap((course) =>
        flattenCourse(course).map((n) => {
          const key = nodeKey(n.level, n.lesson);
          const done = completedSet.has(key);
          return { course, level: n.level, lesson: n.lesson, done };
        }),
      ),
    [courses, completedSet],
  );

  const doneCount = nodes.filter((n) => n.done).length;
  const total = nodes.length;
  const percent = doneCount === 0 ? 0 : Math.round((doneCount / total) * 100);
  const started = doneCount > 0;

  const current = nodes.find((n, index) => {
    if (n.done) return false;
    const unlocked =
      index === 0 ||
      nodes.slice(0, index).every((m) => completedSet.has(nodeKey(m.level, m.lesson)));
    return unlocked;
  });
  const href = current
    ? lessonUrl(current.course, current.level.slug, current.lesson.slug)
    : `/courses/${courses[0]?.slug ?? ""}`;

  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-7">
      {/* Path header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div
          className={cn(
            "flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br",
            courses[0]?.heroAccent ?? "from-orange-400 via-amber-300 to-yellow-200",
          )}
        >
          <span className="flex items-center justify-center rounded-xl bg-white/70 p-1">
            <Abacus
              digits={courses[0]?.sample ?? [0, 0, 0, 0]}
              readOnly
              scale={0.14}
              label={title}
            />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {title} · {courses.length} courses
          </p>
          <Link
            href={href}
            className="group/title mt-1 inline-flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground transition-colors hover:text-foreground/80"
          >
            {title}
            <ArrowRight className="size-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover/title:translate-x-0 group-hover/title:opacity-100" />
          </Link>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
            {started ? (
              <>
                <PlayCircle className="size-3.5 text-emerald-600" />
                {percent}% complete
              </>
            ) : (
              "Not started"
            )}
          </span>
          <Button asChild size="sm" className="px-3">
            <Link href={href}>
              <Play data-icon="inline-start" />
              {started ? "Continue" : "Start"}
            </Link>
          </Button>
        </div>
      </div>

      {/* Course modules */}
      <div className="mt-6 overflow-x-auto rounded-2xl bg-muted p-4">
        <div className="flex items-start">
          {courses.map((course, index) => (
            <div key={course.slug} className="flex shrink-0 items-start">
              <Link href={`/courses/${course.slug}`} className="flex w-28 flex-col items-center">
                <div
                  className={cn(
                    "relative flex aspect-square w-full items-center justify-center rounded-2xl shadow-sm",
                    "bg-gradient-to-br",
                    course.heroAccent,
                  )}
                >
                  <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur">
                    Course {index + 1}
                  </span>
                  {index === 0 ? (
                    <span className="absolute right-2 top-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      NEW
                    </span>
                  ) : null}
                  <span className="flex items-center justify-center rounded-xl bg-white/70 p-1">
                    <Abacus digits={course.sample ?? [0, 0, 0, 0]} readOnly scale={0.18} label={course.title} />
                  </span>
                </div>
                <p className="mt-2 text-center text-xs font-semibold leading-tight text-foreground">
                  {course.title}
                </p>
              </Link>

              {index < courses.length - 1 ? (
                <div className="flex h-28 items-center self-start pl-2 pr-2">
                  <div className="h-px w-6 bg-border" />
                  <ArrowRight className="size-3.5 -ml-1 text-muted-foreground/60" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
