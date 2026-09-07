"use client";

import { useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Volume2, X, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AbacusExplorer, BuildTask, QuizTask, ReadTask, type TaskHandle } from "@/components/abacus/practice";
import { flattenCourse, lessonUrl, nodeKey } from "@/modules/course/utils";
import { readProgress, writeProgress } from "@/modules/course/progress";
import type { Course, LessonBlock } from "@/modules/course/types";

function BlockContent({
  block,
  solved,
  taskRef,
  onHasSelection,
}: {
  block: LessonBlock;
  solved: boolean;
  taskRef: RefObject<TaskHandle | null>;
  onHasSelection: (has: boolean) => void;
}) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">{block.text}</h2>
      );
    case "paragraph":
      return (
        <p className="mx-auto max-w-xl text-center text-lg leading-relaxed text-foreground/85">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="mx-auto max-w-xl space-y-4">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-lg leading-relaxed">
              <span className="mt-2.5 size-2 shrink-0 rounded-full bg-amber-500" />
              <span className="text-foreground/85">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "explore":
      return (
        <div className="flex flex-col items-center gap-5">
          <p className="text-center text-lg font-semibold">{block.label}</p>
          <AbacusExplorer rods={block.rods} initial={block.initial} />
        </div>
      );
    case "build":
      return (
        <BuildTask
          ref={taskRef}
          prompt={block.prompt}
          target={block.target}
          rods={block.rods ?? 2}
          solved={solved}
          onHasSelection={onHasSelection}
        />
      );
    case "read":
      return (
        <ReadTask
          ref={taskRef}
          prompt={block.prompt}
          digits={block.digits}
          choices={block.choices}
          solved={solved}
          onHasSelection={onHasSelection}
        />
      );
    case "quiz":
      return (
        <QuizTask
          ref={taskRef}
          prompt={block.prompt}
          choices={block.choices}
          answer={block.answer}
          solved={solved}
          onHasSelection={onHasSelection}
        />
      );
    default:
      return null;
  }
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
  const currentGlobal = nodes.findIndex((n) => n.level.slug === levelSlug && n.lesson.slug === lessonSlug);
  const next = currentGlobal >= 0 && currentGlobal < nodes.length - 1 ? nodes[currentGlobal + 1] : null;
  const progressKey = nodes[currentGlobal]
    ? nodeKey(nodes[currentGlobal].level, nodes[currentGlobal].lesson)
    : `${levelSlug}:${lessonSlug}`;

  const [current, setCurrent] = useState(0);
  const [solved, setSolved] = useState(false);
  const [hasSel, setHasSel] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [showQuit, setShowQuit] = useState(false);
  const taskRef = useRef<TaskHandle | null>(null);

  const total = blocks.length;
  const block = blocks[current];
  const isLast = current === total - 1;
  const isTask = block?.type === "build" || block?.type === "read" || block?.type === "quiz";
  const ready = isTask ? solved : block !== undefined;
  const progress = total === 0 ? 0 : Math.round(((current + 1) / total) * 100);

  const coursePath = `/courses/${course.slug}`;

  const completeAndGo = (path: string) => {
    const existing = readProgress(course.slug);
    const nextCompleted = existing.includes(progressKey) ? existing : [...existing, progressKey];
    writeProgress(course.slug, nextCompleted);
    router.push(path);
  };

  const advance = () => {
    if (!ready) return;
    if (current < total - 1) {
      setSolved(false);
      setHasSel(false);
      setCurrent((c) => c + 1);
    } else if (next) {
      completeAndGo(lessonUrl(course, next.level.slug, next.lesson.slug));
    } else {
      completeAndGo(coursePath);
    }
  };

  const handleButton = () => {
    if (isTask && !solved) {
      if (taskRef.current?.check()) setSolved(true);
      return;
    }
    advance();
  };

  const startOver = () => {
    setCurrent(0);
    setSolved(false);
    setHasSel(false);
    setResetKey((k) => k + 1);
  };

  if (!block) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Top bar */}
      <header className="flex items-center gap-3 px-4 py-4 sm:px-8">
        <button
          type="button"
          onClick={() => setShowQuit(true)}
          aria-label="Exit lesson"
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="size-5" />
        </button>
        <div className="flex flex-1 justify-center">
          <div className="h-2 w-full max-w-xl overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1 text-muted-foreground">
          <button
            type="button"
            aria-label="Audio"
            className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-muted hover:text-foreground"
          >
            <Volume2 className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Streak"
            className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-muted hover:text-foreground"
          >
            <Zap className="size-5" />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex flex-1 items-center justify-center px-4 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current}-${resetKey}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-2xl"
          >
            <BlockContent
              block={block}
              solved={solved}
              taskRef={taskRef}
              onHasSelection={setHasSel}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom controls */}
      <footer className="px-4 pb-10">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4">
          <button
            type="button"
            onClick={startOver}
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="size-4" />
            Start over
          </button>
          <Button
            size="lg"
            disabled={isTask && !hasSel && !solved}
            onClick={handleButton}
            className="min-w-64 px-12 py-4 text-base shadow-sm"
          >
            {isTask && !solved
              ? "Check"
              : isLast && ready
                ? next
                  ? "Next lesson"
                  : "Finish course"
                : "Continue"}
          </Button>
        </div>
      </footer>

      {/* Quit confirmation */}
      <Dialog open={showQuit} onOpenChange={setShowQuit}>
        <DialogContent showCloseButton={false} className="max-w-sm rounded-3xl p-0 text-center">
          <DialogHeader className="gap-2 p-6 pb-0">
            <DialogTitle className="text-center text-xl font-bold">Are you sure?</DialogTitle>
            <DialogDescription className="text-center">
              If you quit, you will lose your progress and XP.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 p-6">
            <Button className="w-full py-3" onClick={() => setShowQuit(false)}>
              Keep learning
            </Button>
            <button
              type="button"
              onClick={() => router.push(coursePath)}
              className="px-2 py-1 text-sm font-semibold text-red-600 transition-colors hover:text-red-700"
            >
              Quit
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
