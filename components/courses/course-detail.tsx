"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, Clock, Dumbbell, Play, RotateCcw } from "lucide-react";

import { Abacus } from "@/components/abacus/abacus";
import { PathNode, type PathNodeState } from "@/components/courses/path-node";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { flattenCourse, lessonUrl, nodeKey } from "@/modules/course/utils";
import { clearProgress, readProgress, writeProgress } from "@/modules/course/progress";
import type { Course } from "@/modules/course/types";

/**
 * The path snakes down the page: centre, left, centre, right — the same rhythm
 * the reference course page uses to keep a long list of lessons interesting.
 */
const ROW_ALIGN = ["justify-center", "justify-start", "justify-center", "justify-end"] as const;

function Meta({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
      {icon}
      {children}
    </span>
  );
}

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

  const nodeState = nodes.map((node, index) => {
    const key = nodeKey(node.level, node.lesson);
    return { node, key, index, done: completedSet.has(key) };
  });

  const doneCount = nodeState.filter((s) => s.done).length;
  const percent = doneCount === 0 ? 0 : Math.round((doneCount / nodes.length) * 100);
  const complete = nodes.length > 0 && doneCount === nodes.length;
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
    <div className="mx-auto w-full max-w-[1100px] px-4 pb-32 pt-8 sm:px-6 xl:px-8">
      <Link
        href="/courses"
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowRight className="size-4 rotate-180" />
        All courses
      </Link>

      <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-center xl:gap-8">
        {/* Course card */}
        <aside className="xl:sticky xl:top-[88px] xl:w-[487px] xl:shrink-0">
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
                <p className="mt-2 text-base font-medium text-muted-foreground">{course.tagline}</p>
              </div>

              <p className="leading-relaxed text-muted-foreground">{course.introText}</p>

              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <Meta icon={<BookOpen className="size-4" />}>{course.lessonCount} Lessons</Meta>
                <Meta icon={<Dumbbell className="size-4" />}>{course.exerciseCount} Exercises</Meta>
                <Meta icon={<Clock className="size-4" />}>
                  {Math.max(1, Math.round(course.lessonMinutes / 60))}h
                </Meta>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-7 border-t-2 border-border pt-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold">
                  {complete ? "Course complete" : `${doneCount} of ${nodes.length} lessons done`}
                </p>
                <span className="text-sm font-bold tabular-nums text-muted-foreground">
                  {percent}%
                </span>
              </div>
              <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: hydrated ? `${percent}%` : "0%" }}
                />
              </div>
              {doneCount > 0 ? (
                <button
                  type="button"
                  onClick={reset}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  <RotateCcw className="size-3" />
                  Reset progress
                </button>
              ) : null}
            </div>
          </div>
        </aside>

        {/* Learning path */}
        <div className="min-w-0 flex-1 xl:max-w-[488px]">
          {course.levels.map((level, levelIndex) => {
            const levelState = nodeState.filter((s) => s.node.level.slug === level.slug);
            const levelDone = levelState.length > 0 && levelState.every((s) => s.done);
            const levelActive = !levelDone && levelState.some((s) => s.key === current?.key);

            return (
              <section key={level.slug}>
                {/* Sticky level header */}
                <div className="sticky top-[72px] z-30">
                  <div className="relative">
                    <div
                      aria-hidden
                      className={cn(
                        "absolute left-1/2 top-0 h-[72px] w-[calc(100%-28px)] -translate-x-1/2 rounded-[18px]",
                        levelDone ? "bg-emerald-400" : levelActive ? "bg-violet-400" : "bg-border",
                      )}
                    />
                    <div className="relative z-10 flex h-16 w-full items-center justify-center rounded-[18px] bg-background px-4">
                      <h2 className="flex flex-col items-center gap-0.5 text-center">
                        <span
                          className={cn(
                            "text-[11px] font-bold uppercase tracking-[0.18em]",
                            levelDone
                              ? "text-emerald-700"
                              : levelActive
                                ? "text-violet-700"
                                : "text-muted-foreground",
                          )}
                        >
                          Level {levelIndex + 1}
                        </span>
                        <span className="text-sm font-medium">{level.name}</span>
                      </h2>
                      {levelDone ? (
                        <span className="absolute right-4 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                          <Check className="size-3" strokeWidth={3} />
                          Done
                        </span>
                      ) : null}
                    </div>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-full h-8 bg-gradient-to-b from-background to-transparent"
                    />
                  </div>
                </div>

                {/* Lesson nodes */}
                <div className="flex flex-col items-center gap-[30px] pb-[60px] pt-[45px]">
                  {levelState.map((state, i) => {
                    const nodeVisual: PathNodeState = state.done
                      ? "done"
                      : state.key === current?.key
                        ? "current"
                        : "upcoming";

                    return (
                      <div
                        key={state.key}
                        className={cn("flex w-full max-w-[392px]", ROW_ALIGN[i % ROW_ALIGN.length])}
                      >
                        <Link
                          href={lessonUrl(course, level.slug, state.node.lesson.slug)}
                          aria-label={`${state.node.lesson.title} — ${
                            state.done ? "completed" : nodeVisual === "current" ? "up next" : "not started"
                          }`}
                          className="group flex items-end gap-2"
                        >
                          <PathNode
                            state={nodeVisual}
                            index={state.index + 1}
                            kind={state.node.lesson.kind}
                            className="transition-transform duration-200 group-hover:-translate-y-1"
                          />
                          <span className="flex min-h-[55px] w-[138px] items-end pb-[29.5px]">
                            <span
                              className={cn(
                                "line-clamp-3 text-base leading-snug text-pretty",
                                state.done || nodeVisual === "current"
                                  ? "font-medium text-foreground"
                                  : "text-muted-foreground group-hover:text-foreground",
                              )}
                            >
                              {state.node.lesson.title}
                            </span>
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {/* Sticky up-next card */}
          <div className="sticky bottom-6 z-20">
            <div className="rounded-[28px] border-2 border-border bg-background/95 px-5 pb-5 pt-5 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between gap-3 border-b-2 border-border pb-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {complete ? "Course complete" : "Up next"}
                </span>
                <span className="text-xs font-bold tabular-nums text-muted-foreground">
                  {doneCount} / {nodes.length}
                </span>
              </div>

              <div className="flex flex-col items-center gap-3 pt-3 text-center">
                {complete ? (
                  <>
                    <h3 className="text-xl font-bold tracking-tight text-balance">
                      You finished {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Beautiful work. Every master started with a single bead — replay any lesson to
                      keep it sharp.
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="h-12 w-full rounded-full bg-emerald-500 text-base font-semibold text-white shadow-[0_4px_0_0_#047857] transition-all hover:bg-emerald-500/90 active:translate-y-1 active:shadow-none"
                    >
                      <Link href={lessonUrl(course, course.levels[0].slug, course.levels[0].lessons[0].slug)}>
                        <Play data-icon="inline-start" />
                        Review course
                      </Link>
                    </Button>
                  </>
                ) : current ? (
                  <>
                    <h3 className="text-xl font-bold tracking-tight text-balance">
                      {current.node.lesson.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {current.node.lesson.blurb}
                      <span className="mt-1 block font-medium">
                        {current.node.level.name} · {current.node.lesson.minutes} min
                        {current.node.lesson.exercises > 0
                          ? ` · ${current.node.lesson.exercises} exercises`
                          : ""}
                      </span>
                    </p>
                    <div className="flex w-full items-center gap-2">
                      <Button
                        asChild
                        size="lg"
                        className="h-12 flex-1 rounded-full bg-violet-500 text-base font-semibold text-white shadow-[0_4px_0_0_#6d28d9] transition-all hover:bg-violet-500/90 active:translate-y-1 active:shadow-none"
                      >
                        <Link href={startHref}>
                          <Play data-icon="inline-start" />
                          {current.node.lesson.kind === "level_check" ? "Start level check" : "Continue"}
                        </Link>
                      </Button>
                      <button
                        type="button"
                        onClick={() => markComplete(current.key)}
                        title="Mark this lesson as done"
                        aria-label="Mark this lesson as done"
                        className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-border text-muted-foreground transition-colors hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Check className="size-5" strokeWidth={3} />
                      </button>
                    </div>
                  </>
                ) : (
                  <h3 className="text-xl font-bold tracking-tight">No lessons yet</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
