"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AbacusExplorer, BuildTask, QuizTask, ReadTask } from "@/components/abacus/practice";
import { cn } from "@/lib/utils";
import { flattenCourse, nodeKey } from "@/modules/course/utils";
import { readProgress, writeProgress } from "@/modules/course/progress";
import type { Course, LessonBlock } from "@/modules/course/types";

function TaskAware({ block, onSolved }: { block: Extract<LessonBlock, { type: "build" | "read" | "quiz" }>; onSolved: () => void }) {
  if (block.type === "build") {
    return <BuildTask prompt={block.prompt} target={block.target} rods={block.rods ?? 2} onSolved={onSolved} />;
  }
  if (block.type === "read") {
    return <ReadTask prompt={block.prompt} digits={block.digits} choices={block.choices} onSolved={onSolved} />;
  }
  return <QuizTask prompt={block.prompt} choices={block.choices} answer={block.answer} onSolved={onSolved} />;
}

export default function LessonPlayer({
  course,
  levelSlug,
  lessonSlug,
  blocks,
}: {
  course: Course;
  levelSlug: string;
  lessonSlug: string;
  blocks: LessonBlock[];
}) {
  const router = useRouter();

  const nodes = useMemo(() => flattenCourse(course), [course]);
  const currentIndex = nodes.findIndex((n) => n.level.slug === levelSlug && n.lesson.slug === lessonSlug);
  const level = nodes[currentIndex]?.level;
  const lesson = nodes[currentIndex]?.lesson;

  const taskIndexes = useMemo(
    () => blocks.map((b, i) => ({ i, isTask: b.type === "build" || b.type === "read" || b.type === "quiz" })).filter((x) => x.isTask).map((x) => x.i),
    [blocks],
  );
  const [solved, setSolved] = useState<number[]>([]);
  const solvedCount = solved.length;
  const totalTasks = taskIndexes.length;
  const ready = totalTasks === 0 || solvedCount === totalTasks;

  if (!level || !lesson) {
    return null;
  }

  const coursePath = `/courses/${course.slug}`;
  const key = nodeKey(level, lesson);
  const next = currentIndex >= 0 && currentIndex < nodes.length - 1 ? nodes[currentIndex + 1] : null;
  const lessonNumber = currentIndex + 1;
  const totalLessons = nodes.length;

  const completeAndGo = (path: string) => {
    const existing = readProgress(course.slug);
    const nextCompleted = existing.includes(key) ? existing : [...existing, key];
    writeProgress(course.slug, nextCompleted);
    router.push(path);
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-24 sm:px-6">
      <div className="flex items-center justify-between gap-4 pt-8">
        <button
          type="button"
          onClick={() => router.push(coursePath)}
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to course
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {lessonNumber} of {totalLessons}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-700">
          Level {nodes[currentIndex].levelIndex + 1} · {level.name}
        </p>
        {lesson.kind === "level_check" ? (
          <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-violet-700">
            Level check
          </span>
        ) : null}
      </div>

      <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight sm:text-5xl">{lesson.title}</h1>

      {totalTasks > 0 ? (
        <div className="mt-5 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${(solvedCount / totalTasks) * 100}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-muted-foreground">
            {solvedCount} of {totalTasks} solved
          </span>
        </div>
      ) : null}

      <div className="mt-10 space-y-8">
        {blocks.map((block, index) => {
          if (block.type === "heading") {
            return (
              <h2 key={index} className="font-serif text-2xl font-bold tracking-tight">
                {block.text}
              </h2>
            );
          }
          if (block.type === "paragraph") {
            return (
              <p key={index} className="text-lg leading-relaxed text-foreground/85">
                {block.text}
              </p>
            );
          }
          if (block.type === "list") {
            return (
              <ul key={index} className="space-y-3">
                {block.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-lg leading-relaxed">
                    <span className="mt-2.5 size-2 shrink-0 rounded-full bg-amber-500" />
                    <span className="text-foreground/85">{item}</span>
                  </li>
                ))}
              </ul>
            );
          }
          if (block.type === "explore") {
            return (
              <div key={index} className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
                <p className="mb-6 text-lg font-semibold">{block.label}</p>
                <AbacusExplorer rods={block.rods} initial={block.initial} />
              </div>
            );
          }
          return (
            <TaskAware
              key={index}
              block={block}
              onSolved={() => {
                setSolved((prev) => (prev.includes(index) ? prev : [...prev, index]));
              }}
            />
          );
        })}
      </div>

      <div
        className={cn(
          "mt-12 flex flex-col items-center gap-4 rounded-3xl border p-6",
          ready ? "border-emerald-200 bg-emerald-50/70" : "border-border bg-white",
        )}
      >
        {ready ? (
          <div className="flex items-center gap-2 font-semibold text-emerald-800">
            <span className="flex size-7 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="size-4" />
            </span>
            {totalTasks === 0 ? "Nice work — you're ready to continue." : "All practice solved!"}
          </div>
        ) : (
          <p className="text-center text-sm font-medium text-muted-foreground">
            Solve the practice above to unlock the next lesson. (You can reveal answers if you get
            stuck.)
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {next ? (
            <Button
              size="lg"
              className="px-6 py-5 text-base shadow-md"
              disabled={!ready}
              onClick={() => completeAndGo(`/courses/${course.slug}/${next.level.slug}/${next.lesson.slug}`)}
            >
              {ready ? (next.lesson.kind === "level_check" ? "Next: Level check" : "Next lesson") : "Almost there"}
              <ArrowRight data-icon="inline-end" />
            </Button>
          ) : (
            <Button
              size="lg"
              className="px-6 py-5 text-base shadow-md"
              disabled={!ready}
              onClick={() => completeAndGo(coursePath)}
            >
              {ready ? "Finish course" : "Almost there"}
              <ArrowRight data-icon="inline-end" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
