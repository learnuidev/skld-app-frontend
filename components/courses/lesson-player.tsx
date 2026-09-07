"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Monitor,
  Moon,
  RefreshCw,
  RotateCcw,
  Sun,
  X,
} from "lucide-react";

import { Abacus } from "@/components/abacus/abacus";
import { DemoPanel } from "@/components/abacus/animated-abacus";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AbacusExplorer,
  BuildTask,
  QuizTask,
  ReadTask,
  type TaskHandle,
} from "@/components/abacus/practice";
import { flattenCourse, lessonUrl, nodeKey } from "@/modules/course/utils";
import { readProgress, writeProgress } from "@/modules/course/progress";
import type {
  Course,
  LessonBlock,
  LessonExplanation,
} from "@/modules/course/types";

function BlockContent({
  block,
  solved,
  attempted,
  taskRef,
  onHasSelection,
}: {
  block: LessonBlock;
  solved: boolean;
  attempted: boolean;
  taskRef: RefObject<TaskHandle | null>;
  onHasSelection: (has: boolean) => void;
}) {
  const locked = solved || attempted;

  switch (block.type) {
    case "heading":
      return (
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {block.text}
        </h2>
      );
    case "paragraph":
      // With an example animation, split into two columns: text | animation.
      if (block.demo) {
        return (
          <div className="grid gap-6 sm:grid-cols-2 sm:items-center sm:gap-8 lg:gap-16">
            <p className="mx-auto max-w-4xl text-center text-lg leading-relaxed text-foreground/85 sm:mx-0 sm:max-w-none sm:text-left">
              {block.text}
            </p>
            <DemoPanel
              frames={block.demo.frames}
              captions={block.demo.captions}
              label={block.demo.label ?? "Example"}
              scale={0.75}
            />
          </div>
        );
      }
      return (
        <p className="mx-auto max-w-xl text-center text-lg leading-relaxed text-foreground/85">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="mx-auto max-w-xl space-y-4">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-lg leading-relaxed"
            >
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
          locked={locked}
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
          locked={locked}
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
          locked={locked}
          onHasSelection={onHasSelection}
        />
      );
    default:
      return null;
  }
}

function ExplanationDialog({
  explanation,
  onClose,
}: {
  explanation: LessonExplanation;
  onClose: () => void;
}) {
  const steps = useMemo(
    () =>
      explanation.steps && explanation.steps.length > 0
        ? explanation.steps
        : [{ text: explanation.text ?? "", visual: explanation.visual }],
    [explanation],
  );
  const total = steps.length;
  const [idx, setIdx] = useState(0);
  const current = Math.min(idx, total - 1);
  const step = steps[current];
  const visual = step?.visual;

  const goPrev = () => setIdx((i) => Math.max(0, i - 1));
  const goNext = () => setIdx((i) => Math.min(total - 1, i + 1));

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-md rounded-3xl bg-card p-6 gap-0 sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <DialogTitle className="text-xl font-bold">Explanation</DialogTitle>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close explanation"
            className="-mr-1 -mt-1 flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        {visual?.kind === "abacus" ? (
          <div className="mt-6 flex justify-center">
            <Abacus
              digits={visual.digits}
              readOnly
              scale={0.8}
              label="Explanation"
            />
          </div>
        ) : visual?.kind === "abacus-anim" ? (
          <div className="mt-6 flex justify-center">
            <DemoPanel
              key={`abacus-anim-${current}`}
              frames={visual.frames}
              captions={visual.captions}
              label={visual.label ?? "Example"}
              scale={0.75}
              controls={true}
              showCaption={false}
            />
          </div>
        ) : visual?.kind === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={visual.src}
            alt={visual.alt ?? "Explanation"}
            className="mx-auto mt-6 max-h-64 rounded-2xl"
          />
        ) : null}

        <div className="relative mt-6 min-h-20">
          <AnimatePresence mode="wait">
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-base leading-relaxed text-foreground/85"
            >
              {step?.text}
            </motion.p>
          </AnimatePresence>
        </div>

        {total > 1 ? (
          <div className="mt-6 flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={goPrev}
              disabled={current === 0}
            >
              Back
            </Button>
            <div className="flex items-center gap-1.5">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-5 bg-foreground"
                      : "w-1.5 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            {current < total - 1 ? (
              <Button variant="outline" size="sm" onClick={goNext}>
                Next
              </Button>
            ) : (
              <Button size="sm" onClick={onClose}>
                Done
              </Button>
            )}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function TaskExplainer({
  task,
  onShow,
}: {
  task: LessonBlock & {
    type: "build" | "read" | "quiz";
    explanation?: LessonExplanation;
  };
  onShow: () => void;
}) {
  if (!task.explanation) return null;
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={onShow}
      className="min-w-24 px-8 py-4 text-base h-12"
    >
      Why?
    </Button>
  );
}

function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const mode = theme === "dark" ? "Dark" : theme === "light" ? "Light" : "Auto";
  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  const options = ["Auto", "Light", "Dark"] as const;

  const choose = (option: (typeof options)[number]) => {
    setTheme(
      option === "Dark" ? "dark" : option === "Light" ? "light" : "system",
    );
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Theme"
        className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Icon className="size-5" />
      </button>

      {open ? (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-40 mt-2 w-36 rounded-2xl border border-border bg-card p-1.5 shadow-xl">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => choose(option)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors",
                  mode === option
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
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
  const currentGlobal = nodes.findIndex(
    (n) => n.level.slug === levelSlug && n.lesson.slug === lessonSlug,
  );
  const next =
    currentGlobal >= 0 && currentGlobal < nodes.length - 1
      ? nodes[currentGlobal + 1]
      : null;
  const progressKey = nodes[currentGlobal]
    ? nodeKey(nodes[currentGlobal].level, nodes[currentGlobal].lesson)
    : `${levelSlug}:${lessonSlug}`;

  const [current, setCurrent] = useState(0);
  const [solved, setSolved] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [hasSel, setHasSel] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [showQuit, setShowQuit] = useState(false);
  const [explanation, setExplanation] = useState<LessonExplanation | null>(
    null,
  );
  const taskRef = useRef<TaskHandle | null>(null);

  const total = blocks.length;
  const block = blocks[current];
  const isLast = current === total - 1;
  const isTask =
    block?.type === "build" || block?.type === "read" || block?.type === "quiz";
  const answered = isTask ? attempted : true;
  const ready = answered;
  const progress = total === 0 ? 0 : Math.round(((current + 1) / total) * 100);

  const coursePath = `/courses/${course.slug}`;

  const completeAndGo = (path: string) => {
    const existing = readProgress(course.slug);
    const nextCompleted = existing.includes(progressKey)
      ? existing
      : [...existing, progressKey];
    writeProgress(course.slug, nextCompleted);
    router.push(path);
  };

  const advance = () => {
    if (!ready) return;
    if (current < total - 1) {
      setSolved(false);
      setAttempted(false);
      setHasSel(false);
      setCurrent((c) => c + 1);
    } else if (next) {
      completeAndGo(lessonUrl(course, next.level.slug, next.lesson.slug));
    } else {
      completeAndGo(coursePath);
    }
  };

  const handleButton = () => {
    if (isTask && !attempted) {
      setAttempted(true);
      if (taskRef.current?.check()) setSolved(true);
      return;
    }
    advance();
  };

  const startOver = useCallback(() => {
    setCurrent(0);
    setSolved(false);
    setAttempted(false);
    setHasSel(false);
    setResetKey((k) => k + 1);
  }, []);

  const goPrevStep = useCallback(() => {
    if (current <= 0) return;
    setSolved(false);
    setAttempted(false);
    setHasSel(false);
    setCurrent((c) => c - 1);
  }, [current]);

  const goNextStep = useCallback(() => {
    if (current >= total - 1) return;
    setSolved(false);
    setAttempted(false);
    setHasSel(false);
    setCurrent((c) => c + 1);
  }, [current, total]);

  const retryTask = useCallback(() => {
    setSolved(false);
    setAttempted(false);
    setHasSel(false);
    setResetKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (showQuit || explanation) return;
      const el = e.target as HTMLElement | null;
      if (
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable)
      ) {
        return;
      }
      const key = e.key.toLowerCase();
      if (key === "p") {
        e.preventDefault();
        goPrevStep();
      } else if (key === "n") {
        e.preventDefault();
        goNextStep();
      } else if (key === "r") {
        e.preventDefault();
        retryTask();
      } else if (key === "s") {
        e.preventDefault();
        startOver();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    showQuit,
    explanation,
    current,
    total,
    goPrevStep,
    goNextStep,
    retryTask,
    startOver,
  ]);

  if (!block) {
    return null;
  }

  const taskBlock =
    isTask &&
    (block.type === "build" || block.type === "read" || block.type === "quiz")
      ? block
      : null;

  return (
    <div className="flex min-h-screen flex-col bg-card">
      {/* Top bar */}
      <header className="group flex items-center gap-3 px-4 py-4 sm:px-8">
        <button
          type="button"
          onClick={() => setShowQuit(true)}
          aria-label="Exit lesson"
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="size-5" />
        </button>
        <div className="flex flex-1 items-center justify-center gap-3">
          {/* <div className="flex items-center gap-1 opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 group-hover:pointer-events-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={goPrevStep}
                  disabled={current === 0}
                  aria-label="Previous step"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Previous step</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={startOver}
                  aria-label="Start over"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <RotateCcw className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Start over</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={retryTask}
                  aria-label="Restart step"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <RefreshCw className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Restart step</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={goNextStep}
                  disabled={current === total - 1}
                  aria-label="Next step"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Next step</TooltipContent>
            </Tooltip>
          </div> */}
          <div className="h-2 w-full max-w-xl overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-black dark:bg-white transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="flex shrink-0 items-center">
          <ThemeSelector />
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
            className="w-full max-w-3xl"
          >
            <BlockContent
              block={block}
              solved={solved}
              attempted={attempted}
              taskRef={taskRef}
              onHasSelection={setHasSel}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom controls */}
      <footer className="px-4 pb-10">
        <div className="mx-auto flex w-full max-w-2xl">
          <div className="relative flex w-full items-center justify-center gap-3">
            {isTask && attempted && !solved ? (
              <Button
                variant="ghost"
                size="lg"
                onClick={retryTask}
                className="min-w-24 px-6 py-4 text-base h-12"
              >
                Try again
              </Button>
            ) : null}
            <Button
              size="lg"
              disabled={isTask && !attempted && !hasSel}
              onClick={handleButton}
              className="min-w-64 px-12 py-4 text-base shadow-sm h-12"
            >
              {isTask && !attempted
                ? "Check"
                : isLast && ready
                  ? next
                    ? "Next lesson"
                    : "Finish course"
                  : "Continue"}
            </Button>

            {isTask && attempted && taskBlock?.explanation ? (
              <TaskExplainer
                task={taskBlock}
                onShow={() => setExplanation(taskBlock.explanation!)}
              />
            ) : null}
          </div>
        </div>
      </footer>

      {/* Explanation dialog */}
      {explanation ? (
        <ExplanationDialog
          explanation={explanation}
          onClose={() => setExplanation(null)}
        />
      ) : null}

      {/* Quit confirmation */}
      <Dialog open={showQuit} onOpenChange={setShowQuit}>
        <DialogContent
          showCloseButton={false}
          className="max-w-sm rounded-3xl p-0 text-center"
        >
          <DialogHeader className="gap-2 p-6 pb-0">
            <DialogTitle className="text-center text-xl font-bold">
              Are you sure?
            </DialogTitle>
            <DialogDescription className="text-center">
              If you quit, you will lose your progress and XP.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 p-6">
            <Button
              className="w-full py-4 h-12"
              onClick={() => setShowQuit(false)}
            >
              Keep learning
            </Button>
            <Button
              variant={"outline"}
              type="button"
              onClick={() => router.push(coursePath)}
              className="w-full py-4 h-12 text-destructive"
            >
              Quit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
