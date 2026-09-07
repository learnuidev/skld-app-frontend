"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Award, Check, Play, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Abacus } from "@/components/abacus/abacus";
import { flattenCourse, lessonUrl, nodeKey } from "@/modules/course/utils";
import { clearProgress, readProgress, writeProgress } from "@/modules/course/progress";
import type { Course } from "@/modules/course/types";

export default function CourseExplorer({ course }: { course: Course }) {
  const nodes = useMemo(() => flattenCourse(course), [course]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setCompleted(readProgress(course.slug));
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, [course.slug]);

  const completedSet = useMemo(() => new Set(completed), [completed]);

  const nodeState = nodes.map((node) => {
    const key = nodeKey(node.level, node.lesson);
    const done = completedSet.has(key);
    return { node, key, done };
  });

  const doneCount = nodeState.filter((s) => s.done).length;
  const percent = doneCount === 0 ? 0 : Math.round((doneCount / nodes.length) * 100);
  const complete = doneCount === nodes.length;
  const current = nodeState.find((s) => !s.done);

  const startHref = current
    ? lessonUrl(course, current.node.level.slug, current.node.lesson.slug)
    : `/courses/${course.slug}`;

  const markComplete = (key: string) => {
    const next = completed.includes(key) ? completed : [...completed, key];
    setCompleted(next);
    writeProgress(course.slug, next);
  };

  const reset = () => {
    clearProgress(course.slug);
    setCompleted([]);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      {/* Hero */}
      <div className={cn("relative mt-8 overflow-hidden rounded-[2rem] bg-gradient-to-br p-8 sm:p-12", course.accent)}>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-800 transition-colors hover:text-amber-950"
            >
              <ArrowRight className="size-4 rotate-180" />
              All courses
            </Link>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{course.title}</h1>
            <p className="mt-3 text-lg font-medium text-muted-foreground">{course.tagline}</p>
            <p className="mt-6 max-w-xl leading-relaxed text-foreground/80">{course.introText}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {course.conceptsInclude.map((concept) => (
                <span
                  key={concept}
                  className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-sm font-semibold backdrop-blur"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden justify-center lg:flex">
            <div className="rotate-2 rounded-3xl bg-white/70 p-4 shadow-2xl backdrop-blur">
              <Abacus
                digits={course.sample ?? [4, 3, 2, 1]}
                readOnly
                scale={0.75}
                label={`${course.title} course preview`}
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Button asChild size="lg" className="px-6 py-5 text-base shadow-md">
            <Link href={startHref}>
              <Play data-icon="inline-start" />
              {complete ? "Review course" : doneCount > 0 ? "Continue" : "Start learning"}
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span>
              {course.lessonCount} lessons · {course.exerciseCount} exercises ·{" "}
              {Math.round(course.lessonMinutes / 60)}h of play
            </span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">Your progress</h2>
            <p className="text-sm text-muted-foreground">
              {complete
                ? "Course complete — fantastic beadwork!"
                : `${nodes.length - doneCount} lessons to go`}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw data-icon="inline-start" />
            Reset
          </Button>
        </div>
        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: hydrated ? `${percent}%` : "0%" }}
          />
        </div>
      </div>

      {complete ? (
        <div className="mt-8 flex items-center gap-4 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
          <Award className="size-8 shrink-0 text-emerald-600" />
          <div>
            <h3 className="font-bold text-emerald-800">You finished {course.title}</h3>
            <p className="text-sm text-emerald-700">
              Beautiful work. Every master started with a single bead — keep practising and your
              mental board will only get faster.
            </p>
          </div>
        </div>
      ) : null}

      {/* Curriculum */}
      <div className="mt-10 space-y-6">
        {course.levels.map((level, levelIndex) => {
          const levelState = nodeState.filter((s) => s.node.level.slug === level.slug);
          const levelDone = levelState.every((s) => s.done);

          return (
            <section
              key={level.slug}
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/70 bg-gradient-to-r from-gray-50 to-transparent px-6 py-5 sm:px-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-700">
                    Level {levelIndex + 1}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold tracking-tight">{level.name}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{level.description}</p>
                </div>
                {levelDone ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                    <Check className="size-3.5" />
                    Complete
                  </span>
                ) : null}
              </div>

              <ul className="divide-y divide-border/70">
                {levelState.map((state) => {
                  const { node, done } = state;
                  return (
                    <li key={state.key}>
                      <Link
                        href={lessonUrl(course, node.level.slug, node.lesson.slug)}
                        className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/60 sm:px-8"
                      >
                        <span
                          className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-full",
                            done ? "bg-emerald-100 text-emerald-600" : "bg-black text-white",
                          )}
                        >
                          {done ? <Check className="size-5" /> : <Play className="size-4 translate-x-[1px]" />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold">{node.lesson.title}</span>
                            {node.lesson.kind === "level_check" ? (
                              <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-violet-700">
                                Level check
                              </span>
                            ) : null}
                          </span>
                          <span className="block text-sm text-muted-foreground">{node.lesson.blurb}</span>
                        </span>
                        <span className="hidden shrink-0 items-center gap-3 sm:flex">
                          <span className="text-sm font-medium text-muted-foreground">
                            {done ? "Done" : "Start"} · {node.lesson.minutes} min
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      {current && !complete ? (
        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="px-6 py-5 text-base shadow-md">
            <Link href={startHref}>
              <Play data-icon="inline-start" />
              {current.node.lesson.kind === "level_check"
                ? "Start level check"
                : `Start: ${current.node.lesson.title}`}
            </Link>
          </Button>
        </div>
      ) : null}

      {current ? (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => markComplete(current.key)}
            className="text-sm font-semibold text-muted-foreground underline-offset-4 hover:underline"
          >
            Mark this lesson as done
          </button>
        </div>
      ) : null}
    </div>
  );
}
