"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import {
  AbacusExplorer,
  BuildTask,
  QuizTask,
  ReadTask,
  type TaskHandle,
} from "@/components/abacus/practice";
import { DemoPanel } from "@/components/abacus/animated-abacus";
import { LessonNavBar } from "@/components/courses/lesson/nav-bar";
import { ExplanationRail } from "@/components/courses/lesson/explanation-rail";
import { PillButton } from "@/components/courses/lesson/pill-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { flattenCourse, lessonUrl, nodeKey } from "@/modules/course/utils";
import { readProgress, writeProgress } from "@/modules/course/progress";
import type { Course, LessonBlock } from "@/modules/course/types";

/** How the card's border answers the student. */
type Verdict = "pending" | "correct" | "incorrect" | "retry";

const VERDICT_BORDER: Record<Verdict, string> = {
  pending: "border-lesson-line",
  correct: "border-lesson-correct animate-[lesson-border-glow_1s_ease-out]",
  incorrect: "border-lesson-line",
  retry: "border-lesson-warn",
};

/** The explanation rail's width from `lg` up, where it sits beside the card. */
const RAIL_WIDTH = 380;
const RAIL_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

/** `lg` and up: the rail shares the row with the card instead of stacking. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return isDesktop;
}

/** The step's question, as the tutor would repeat it back. */
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
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-[1.75rem] sm:leading-tight">
          {block.text}
        </h2>
      );
    case "paragraph":
      // With an example animation, split into two columns: text | animation.
      if (block.demo) {
        return (
          <div className="grid gap-6 sm:grid-cols-2 sm:items-center sm:gap-8 lg:gap-16">
            <p className="mx-auto max-w-4xl text-center text-base leading-6 text-foreground/85 sm:mx-0 sm:max-w-none sm:text-left sm:text-lg sm:leading-7">
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
        <p className="mx-auto max-w-xl text-center text-base leading-6 text-foreground/85 sm:text-lg sm:leading-7">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="mx-auto max-w-xl space-y-4">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base leading-6 sm:text-lg">
              <span className="mt-2.5 size-2 shrink-0 rounded-full bg-lesson-correct" />
              <span className="text-foreground/85">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "explore":
      return (
        <div className="flex flex-col items-center gap-5">
          <p className="text-center text-[1.15625rem] leading-[1.5] font-bold">{block.label}</p>
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
  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion();
  const railTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: RAIL_EASE };
  const nodes = useMemo(() => flattenCourse(course), [course]);
  const currentGlobal = nodes.findIndex(
    (n) => n.level.slug === levelSlug && n.lesson.slug === lessonSlug,
  );
  const next =
    currentGlobal >= 0 && currentGlobal < nodes.length - 1 ? nodes[currentGlobal + 1] : null;
  const progressKey = nodes[currentGlobal]
    ? nodeKey(nodes[currentGlobal].level, nodes[currentGlobal].lesson)
    : `${levelSlug}:${lessonSlug}`;

  const [current, setCurrent] = useState(0);
  const [solved, setSolved] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [hasSel, setHasSel] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [showQuit, setShowQuit] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  /** Wrong checks on this step: the second one turns the card yellow. */
  const [misses, setMisses] = useState(0);
  /** Steps answered correctly so far — the navbar's tally. */
  const [done, setDone] = useState<Set<number>>(new Set());
  const taskRef = useRef<TaskHandle | null>(null);

  const total = blocks.length;
  const block = blocks[current];
  const isLast = current === total - 1;
  const isTask = block?.type === "build" || block?.type === "read" || block?.type === "quiz";
  const answered = isTask ? attempted : true;
  const ready = answered;
  const verdict: Verdict = solved
    ? "correct"
    : attempted && isTask
      ? misses >= 2
        ? "retry"
        : "incorrect"
      : "pending";

  const coursePath = `/courses/${course.slug}`;

  const completeAndGo = (path: string) => {
    const existing = readProgress(course.slug);
    const nextCompleted = existing.includes(progressKey)
      ? existing
      : [...existing, progressKey];
    writeProgress(course.slug, nextCompleted);
    router.push(path);
  };

  const goToStep = useCallback((step: number) => {
    setSolved(false);
    setAttempted(false);
    setHasSel(false);
    setShowWhy(false);
    setMisses(0);
    setCurrent(Math.max(0, step));
  }, []);

  const advance = () => {
    if (!ready) return;
    if (current < total - 1) {
      goToStep(current + 1);
    } else if (next) {
      completeAndGo(lessonUrl(course, next.level.slug, next.lesson.slug));
    } else {
      completeAndGo(coursePath);
    }
  };

  const handleButton = () => {
    if (isTask && !attempted) {
      setAttempted(true);
      if (taskRef.current?.check()) {
        setSolved(true);
        setDone((prev) => new Set(prev).add(current));
      } else {
        setMisses((m) => m + 1);
      }
      return;
    }
    advance();
  };

  const startOver = useCallback(() => {
    setDone(new Set());
    goToStep(0);
    setResetKey((k) => k + 1);
  }, [goToStep]);

  const retryTask = useCallback(() => {
    setSolved(false);
    setAttempted(false);
    setHasSel(false);
    setResetKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (showQuit) return;
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) {
        return;
      }
      const key = e.key.toLowerCase();
      if (key === "p") {
        e.preventDefault();
        if (current > 0) goToStep(current - 1);
      } else if (key === "n") {
        e.preventDefault();
        if (current < total - 1) goToStep(current + 1);
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
  }, [showQuit, current, total, goToStep, retryTask, startOver]);

  if (!block) {
    return null;
  }

  const taskBlock =
    block.type === "build" || block.type === "read" || block.type === "quiz" ? block : null;
  const canAskWhy = Boolean(taskBlock?.explanation);
  const primaryLabel = isTask && !attempted
    ? "Check"
    : isLast && ready
      ? next
        ? "Next lesson"
        : "Finish course"
      : "Continue";

  return (
    <div className="flex h-dvh flex-col bg-background">
      <LessonNavBar
        current={current}
        total={total}
        done={done.size}
        onExit={() => setShowQuit(true)}
      />

      <div className="flex min-h-0 flex-1 flex-col-reverse gap-3 px-3 pb-3 sm:gap-4 sm:px-8 sm:pb-8 lg:flex-row">
        {taskBlock?.explanation ? (
          <motion.div
            key={current}
            initial={false}
            // Beside the card on wide screens, below it on narrow ones — so the
            // panel claims width there and height here. Either way the card
            // takes up the slack in step, and the whole row glides.
            animate={
              showWhy
                ? isDesktop
                  ? { width: RAIL_WIDTH, opacity: 1 }
                  : { height: "auto", opacity: 1 }
                : isDesktop
                  ? { width: 0, opacity: 0 }
                  : { height: 0, opacity: 0 }
            }
            transition={railTransition}
            aria-hidden={!showWhy}
            inert={!showWhy}
            className="shrink-0 overflow-hidden"
          >
            <ExplanationRail
              className={isDesktop ? "h-full w-[380px]" : "max-h-[45vh]"}
              explanation={taskBlock.explanation}
              active={showWhy}
              onClose={() => setShowWhy(false)}
            />
          </motion.div>
        ) : null}

        <main
          className={cn(
            "flex min-h-0 flex-1 flex-col rounded-2xl border-2 bg-card transition-colors duration-300 sm:rounded-3xl",
            VERDICT_BORDER[verdict],
          )}
        >
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-10">
            <div className="flex min-h-full items-center justify-center">
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
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[367px] shrink-0 items-center justify-center gap-2 px-5 pt-4 pb-5">
            {isTask && attempted && !solved ? (
              <PillButton variant="secondary" onClick={retryTask}>
                Try again
              </PillButton>
            ) : null}

            {canAskWhy && attempted && !showWhy ? (
              <PillButton variant="secondary" onClick={() => setShowWhy(true)}>
                Why?
              </PillButton>
            ) : null}

            <PillButton
              variant={solved ? "success" : "primary"}
              className="flex-1"
              disabled={isTask && !attempted && !hasSel}
              onClick={handleButton}
            >
              {primaryLabel}
            </PillButton>
          </div>
        </main>
      </div>

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
            <Button className="h-12 w-full py-4" onClick={() => setShowQuit(false)}>
              Keep learning
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push(coursePath)}
              className="h-12 w-full py-4 text-destructive"
            >
              Quit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
