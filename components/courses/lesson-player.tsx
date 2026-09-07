"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  SkipBack,
  SkipForward,
  Volume2,
  X,
  Zap,
} from "lucide-react";

import { Abacus } from "@/components/abacus/abacus";
import { AnimatedAbacus, DemoScene } from "@/components/abacus/animated-abacus";
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
  demoVisible,
  demoIndex,
}: {
  block: LessonBlock;
  solved: boolean;
  attempted: boolean;
  taskRef: RefObject<TaskHandle | null>;
  onHasSelection: (has: boolean) => void;
  demoVisible?: boolean;
  demoIndex?: number;
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
      return (
        <div className="flex flex-col items-center gap-4">
          <p className="mx-auto max-w-xl text-center text-lg leading-relaxed text-foreground/85">
            {block.text}
          </p>
          {block.demo && demoVisible ? (
            <DemoScene
              frames={block.demo.frames}
              captions={block.demo.captions}
              index={demoIndex ?? 0}
              label={block.demo.label ?? "Example"}
            />
          ) : null}
        </div>
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
            <AnimatedAbacus
              key={`abacus-anim-${current}`}
              frames={visual.frames}
              captions={visual.captions}
              label={visual.label ?? "Example"}
              scale={0.75}
              controls={false}
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

function DemoControls({
  index,
  total,
  playing,
  onStep,
  onToggle,
  onReplay,
}: {
  index: number;
  total: number;
  playing: boolean;
  onStep: (dir: -1 | 1) => void;
  onToggle: () => void;
  onReplay: () => void;
}) {
  const btn =
    "flex size-12 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors " +
    "hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35";
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onStep(-1)}
        disabled={index === 0}
        aria-label="Previous step"
        className={btn}
      >
        <SkipBack className="size-5" />
      </button>
      <button
        type="button"
        onClick={onToggle}
        aria-label={playing ? "Pause" : "Play"}
        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105"
      >
        {playing ? <Pause className="size-5" /> : <Play className="size-5 translate-x-[1px]" />}
      </button>
      <button
        type="button"
        onClick={() => onStep(1)}
        disabled={index === total - 1}
        aria-label="Next step"
        className={btn}
      >
        <SkipForward className="size-5" />
      </button>
      <button type="button" onClick={onReplay} aria-label="Replay" className={btn}>
        <RotateCcw className="size-5" />
      </button>
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
  const [showDemo, setShowDemo] = useState(false);
  const [demoIdx, setDemoIdx] = useState(0);
  const [demoPlaying, setDemoPlaying] = useState(true);
  const taskRef = useRef<TaskHandle | null>(null);

  const total = blocks.length;
  const block = blocks[current];
  const isLast = current === total - 1;
  const isTask =
    block?.type === "build" || block?.type === "read" || block?.type === "quiz";
  const demo = block?.type === "paragraph" ? block.demo : undefined;
  const hasDemo = Boolean(demo);
  const demoTot = demo?.frames.length ?? 0;
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

  const resetDemo = () => {
    setShowDemo(false);
    setDemoIdx(0);
    setDemoPlaying(true);
  };

  const revealDemo = () => {
    setShowDemo(true);
    setDemoIdx(0);
    setDemoPlaying(true);
  };

  // Reveals the animation first, then advances past the step.
  const advance = () => {
    if (hasDemo && !showDemo) {
      revealDemo();
      return;
    }
    if (!ready) return;
    if (current < total - 1) {
      setSolved(false);
      setAttempted(false);
      setHasSel(false);
      resetDemo();
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
    setShowDemo(false);
    setDemoIdx(0);
    setDemoPlaying(true);
    setResetKey((k) => k + 1);
  }, []);

  const goPrevStep = useCallback(() => {
    if (current <= 0) return;
    setSolved(false);
    setAttempted(false);
    setHasSel(false);
    setShowDemo(false);
    setDemoIdx(0);
    setDemoPlaying(true);
    setCurrent((c) => c - 1);
  }, [current]);

  const goNextStep = useCallback(() => {
    if (hasDemo && !showDemo) {
      setShowDemo(true);
      setDemoIdx(0);
      setDemoPlaying(true);
      return;
    }
    if (current >= total - 1) return;
    setSolved(false);
    setAttempted(false);
    setHasSel(false);
    setShowDemo(false);
    setDemoIdx(0);
    setDemoPlaying(true);
    setCurrent((c) => c + 1);
  }, [current, total, hasDemo, showDemo]);

  const retryTask = useCallback(() => {
    setSolved(false);
    setAttempted(false);
    setHasSel(false);
    setResetKey((k) => k + 1);
  }, []);

  // Auto-advance the revealed demonstration while it is playing.
  useEffect(() => {
    if (!hasDemo || !showDemo || !demoPlaying || demoTot <= 1) return;
    const t = window.setTimeout(() => {
      if (demoIdx < demoTot - 1) {
        setDemoIdx((i) => Math.min(demoTot - 1, i + 1));
      } else {
        setDemoPlaying(false);
      }
    }, 1400);
    return () => window.clearTimeout(t);
  }, [hasDemo, showDemo, demoPlaying, demoIdx, demoTot]);

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
          <div className="flex items-center gap-1 opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 group-hover:pointer-events-auto">
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
          </div>
          <div className="h-2 w-full max-w-xl overflow-hidden rounded-full bg-muted">
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
              attempted={attempted}
              taskRef={taskRef}
              onHasSelection={setHasSel}
              demoVisible={showDemo}
              demoIndex={demoIdx}
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
            {hasDemo && showDemo ? (
              <DemoControls
                index={demoIdx}
                total={demoTot}
                playing={demoPlaying}
                onStep={(dir) => {
                  setDemoPlaying(false);
                  setDemoIdx((i) => Math.min(demoTot - 1, Math.max(0, i + dir)));
                }}
                onToggle={() => {
                  if (!demoPlaying && demoIdx >= demoTot - 1) {
                    setDemoIdx(0);
                    setDemoPlaying(true);
                    return;
                  }
                  setDemoPlaying((p) => !p);
                }}
                onReplay={() => {
                  setDemoIdx(0);
                  setDemoPlaying(true);
                }}
              />
            ) : null}
            <Button
              size="lg"
              disabled={isTask && !attempted && !hasSel}
              onClick={handleButton}
              className="min-w-64 px-12 py-4 text-base shadow-sm h-12"
            >
              {isTask && !attempted
                ? "Check"
                : hasDemo && !showDemo
                  ? "Next"
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
