"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { Reorder } from "framer-motion";
import { ArrowDown, ArrowUp, Check, GripVertical } from "lucide-react";

import type { TaskHandle } from "@/components/abacus/practice";
import { PALETTE } from "@/components/courses/illustrations/palette";
import { SceneBoard } from "@/components/bridge/scene-board";
import { SCENE_PARTS, type ScenePart } from "@/components/bridge/scenes";
import { cn } from "@/lib/utils";
import type { BridgeScene } from "@/modules/course/types";

/** The lesson design's prompt line: bold, centred, a touch larger than body text. */
const PROMPT = "text-center text-[1.15625rem] leading-[1.5] font-bold";

/**
 * A drawing the learner simply looks at, with the lesson's own naming on it.
 * `highlight` picks out the parts the caption is talking about.
 */
export function SceneFigure({
  scene,
  caption,
  highlight,
  labels = true,
}: {
  scene: BridgeScene;
  caption?: string;
  highlight?: string[];
  labels?: boolean;
}) {
  return (
    <figure className="flex w-full flex-col items-center gap-3">
      <SceneBoard scene={scene} highlight={highlight} labels={labels} className="max-w-xl" />
      {caption ? (
        <figcaption className="max-w-lg text-center text-sm leading-5 text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** The parts a block names, in the order it named them. */
function partsOf(scene: BridgeScene, ids: string[]): ScenePart[] {
  const known = SCENE_PARTS[scene] ?? [];
  return ids
    .map((id) => known.find((part) => part.id === id))
    .filter((part): part is ScenePart => Boolean(part));
}

/**
 * A guided tour of one drawing: tap each pin to learn what that part is and
 * what it does. Nothing is marked right or wrong — the point is to look.
 */
export function PartsExplore({
  prompt,
  scene,
  parts,
  hint,
}: {
  prompt: string;
  scene: BridgeScene;
  parts?: string[];
  hint?: string;
}) {
  const all = SCENE_PARTS[scene] ?? [];
  const pins = parts?.length ? partsOf(scene, parts) : all;
  const [found, setFound] = useState<string[]>([]);
  const [active, setActive] = useState<ScenePart | null>(null);

  const tap = (id: string) => {
    const part = pins.find((p) => p.id === id) ?? null;
    setActive(part);
    if (part) setFound((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <p className={PROMPT}>{prompt}</p>

      <SceneBoard
        scene={scene}
        pins={pins}
        picked={active?.id ?? null}
        solved={found}
        onPick={tap}
        className="max-w-xl"
      />

      <div className="flex flex-wrap justify-center gap-2">
        {pins.map((part) => {
          const seen = found.includes(part.id);
          return (
            <span
              key={part.id}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                seen
                  ? "border-lesson-correct bg-lesson-correct-bg text-lesson-correct-fg"
                  : "border-lesson-line text-muted-foreground",
              )}
            >
              {seen ? part.label : "?"}
            </span>
          );
        })}
      </div>

      <div className="flex min-h-16 w-full max-w-xl items-center rounded-2xl bg-lesson-soft px-4 py-3">
        {active ? (
          <p className="text-sm leading-5">
            <span className="font-bold">{active.label}.</span>{" "}
            <span className="text-foreground/80">{active.note}</span>
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            {hint ?? "Tap a numbered pin on the drawing to see what it is."}
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {found.length} of {pins.length} parts found
      </p>
    </div>
  );
}

/**
 * "Tap this part of the bridge." The pins are numbered, not named, so the
 * learner has to recognise the part from the drawing.
 */
export const HotspotTask = forwardRef<
  TaskHandle,
  {
    prompt: string;
    scene: BridgeScene;
    parts: string[];
    answer: string;
    labels?: boolean;
    solved: boolean;
    locked?: boolean;
    onHasSelection: (has: boolean) => void;
  }
>(function HotspotTask(
  { prompt, scene, parts, answer, labels = false, solved, locked = false, onHasSelection },
  ref,
) {
  const pins = partsOf(scene, parts);
  const [picked, setPicked] = useState<string | null>(null);
  const [missed, setMissed] = useState<string[]>([]);
  const answerPart = pins.find((part) => part.id === answer);

  useImperativeHandle(
    ref,
    () => ({
      check() {
        if (picked === null) return false;
        if (picked === answer) return true;
        setMissed((prev) => (prev.includes(picked) ? prev : [...prev, picked]));
        // Ruling a pin out hands the learner back an empty hand.
        setPicked(null);
        return false;
      },
    }),
    [picked, answer],
  );

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <p className={PROMPT}>{prompt}</p>

      <SceneBoard
        scene={scene}
        pins={pins}
        picked={picked}
        solved={solved ? [answer] : []}
        ruledOut={solved ? [] : missed}
        labels={labels}
        locked={locked}
        onPick={(id) => {
          setPicked(id);
          onHasSelection(true);
        }}
        className="max-w-xl"
      />

      {solved && answerPart ? (
        <p className="max-w-xl rounded-2xl bg-lesson-soft px-4 py-3 text-sm leading-5">
          <span className="font-bold">{answerPart.label}.</span>{" "}
          <span className="text-foreground/80">{answerPart.note}</span>
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">
          Pins are numbered in no particular order — tap the one you think is right.
        </p>
      )}
    </div>
  );
});

/** One answer card, in words rather than on beads. */
function WordChoice({
  label,
  state,
  disabled,
  onClick,
}: {
  label: string;
  state: "idle" | "picked" | "wrong" | "correct";
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={state === "picked" || state === "correct"}
      onClick={onClick}
      className={cn(
        "relative flex min-h-14 items-center justify-center rounded-2xl border px-5 py-3 text-base font-medium transition-colors",
        state === "correct"
          ? "border-2 border-lesson-correct bg-lesson-correct-bg text-lesson-correct-fg"
          : state === "wrong"
            ? "border-lesson-line text-muted-foreground line-through"
            : state === "picked"
              ? "border-2 border-foreground text-foreground"
              : "border-lesson-line text-foreground/80 hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {label}
      {state === "correct" ? (
        <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-lg bg-lesson-correct text-white">
          <Check className="size-4" aria-hidden />
        </span>
      ) : null}
    </button>
  );
}

/** Multiple choice in words: the workhorse question of this course. */
export const ChooseTask = forwardRef<
  TaskHandle,
  {
    prompt: string;
    choices: string[];
    answer: number;
    solved: boolean;
    locked?: boolean;
    onHasSelection: (has: boolean) => void;
  }
>(function ChooseTask({ prompt, choices, answer, solved, locked = false, onHasSelection }, ref) {
  const [picked, setPicked] = useState<number | null>(null);
  const [wrong, setWrong] = useState<number[]>([]);
  // Long answers get a column of their own; short ones pair up.
  const twoUp = choices.every((choice) => choice.length <= 28);

  useImperativeHandle(
    ref,
    () => ({
      check() {
        if (picked === null) return false;
        if (picked === answer) return true;
        setWrong((prev) => (prev.includes(picked) ? prev : [...prev, picked]));
        return false;
      },
    }),
    [picked, answer],
  );

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <p className={PROMPT}>{prompt}</p>
      <div className={cn("grid w-full max-w-xl gap-3", twoUp && "sm:grid-cols-2")}>
        {choices.map((choice, index) => (
          <WordChoice
            key={choice}
            label={choice}
            disabled={locked || wrong.includes(index)}
            state={
              solved && index === answer
                ? "correct"
                : wrong.includes(index)
                  ? "wrong"
                  : picked === index
                    ? "picked"
                    : "idle"
            }
            onClick={() => {
              setPicked(index);
              onHasSelection(true);
            }}
          />
        ))}
      </div>
    </div>
  );
});

/**
 * Sorting bridges into boxes: pick a card, then pick the box it belongs in.
 * Everything has to be filed before it can be checked.
 */
export const SortTask = forwardRef<
  TaskHandle,
  {
    prompt: string;
    buckets: { id: string; label: string }[];
    items: { id: string; label: string; bucket: string }[];
    solved: boolean;
    locked?: boolean;
    onHasSelection: (has: boolean) => void;
  }
>(function SortTask({ prompt, buckets, items, solved, locked = false, onHasSelection }, ref) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [held, setHeld] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string[]>([]);

  const loose = items.filter((item) => !(item.id in placed));
  const complete = loose.length === 0 && held === null;

  useImperativeHandle(
    ref,
    () => ({
      check() {
        if (!complete) return false;
        const missed = items.filter((item) => placed[item.id] !== item.bucket).map((i) => i.id);
        setWrong(missed);
        return missed.length === 0;
      },
    }),
    [complete, items, placed],
  );

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <p className={PROMPT}>{prompt}</p>

      <div className="flex min-h-14 w-full max-w-xl flex-wrap justify-center gap-2">
        {loose.length === 0 ? (
          <p className="text-sm text-muted-foreground">Every card is filed.</p>
        ) : (
          loose.map((item) => (
            <button
              key={item.id}
              type="button"
              disabled={locked}
              aria-pressed={held === item.id}
              onClick={() => {
                setHeld((current) => (current === item.id ? null : item.id));
                onHasSelection(true);
              }}
              className={cn(
                "rounded-2xl border px-4 py-2.5 text-sm font-medium transition-colors",
                held === item.id
                  ? "border-2 border-foreground bg-lesson-soft"
                  : "border-lesson-line hover:border-foreground/40",
              )}
            >
              {item.label}
            </button>
          ))
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {held ? "Now tap the box it belongs in." : "Tap a card, then tap the box it belongs in."}
      </p>

      <div className="grid w-full max-w-xl gap-3 sm:grid-cols-2">
        {buckets.map((bucket) => {
          const filed = items.filter((item) => placed[item.id] === bucket.id);
          const active = held !== null;
          return (
            <button
              key={bucket.id}
              type="button"
              // Still clickable with an empty hand: that is how a filed card
              // gets taken back out.
              disabled={locked}
              onClick={(event) => {
                if (locked) return;
                // A tap on a card that is already filed takes it back out.
                const chip = (event.target as HTMLElement).closest("[data-item]");
                const filedId = chip?.getAttribute("data-item");
                if (filedId) {
                  setPlaced((prev) => {
                    const next = { ...prev };
                    delete next[filedId];
                    return next;
                  });
                  setWrong([]);
                  return;
                }
                if (!held) return;
                const id = held;
                setPlaced((prev) => ({ ...prev, [id]: bucket.id }));
                setHeld(null);
                setWrong([]);
              }}
              className={cn(
                "flex min-h-24 flex-col items-start gap-2 rounded-2xl border-2 border-dashed border-lesson-line p-3 text-left transition-colors",
                active && "border-foreground/40 hover:border-foreground",
              )}
            >
              <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {bucket.label}
              </span>
              <span className="flex flex-wrap gap-2">
                {filed.map((item) => (
                  <span
                    key={item.id}
                    data-item={item.id}
                    title={locked ? undefined : `Take back ${item.label}`}
                    className={cn(
                      "rounded-xl border px-3 py-1.5 text-sm transition-colors",
                      wrong.includes(item.id)
                        ? "border-destructive text-destructive"
                        : solved && placed[item.id] === item.bucket
                          ? "border-lesson-correct bg-lesson-correct-bg text-lesson-correct-fg"
                          : "border-lesson-line bg-card",
                    )}
                  >
                    {item.label}
                  </span>
                ))}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
});

/** A fixed shuffle: the same scramble on the server and in the browser. */
function scramble<T>(items: T[]): T[] {
  if (items.length < 2) return [...items];
  const mid = Math.ceil(items.length / 2);
  return [...items.slice(mid), ...items.slice(0, mid)];
}

/** Move one card to a new position, leaving the order of the rest alone. */
export function reorder<T>(items: T[], from: number, to: number): T[] {
  if (from === to) return items;
  if (from < 0 || to < 0 || from >= items.length || to >= items.length) return items;
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

/**
 * Put the steps in order: the river's levels, or the path a load takes.
 *
 * The cards are dragged into place — with a mouse or a finger, since the drag
 * is a pointer gesture rather than the browser's mouse-only drag-and-drop. Each
 * card also carries a pair of arrow buttons, which is how a keyboard, or anyone
 * who would rather tap, gets the same job done.
 */
export const OrderTask = forwardRef<
  TaskHandle,
  {
    prompt: string;
    items: { id: string; label: string }[];
    solved: boolean;
    locked?: boolean;
    onHasSelection: (has: boolean) => void;
  }
>(function OrderTask({ prompt, items, solved, locked = false, onHasSelection }, ref) {
  const [order, setOrder] = useState(() => scramble(items));

  useImperativeHandle(
    ref,
    () => ({
      check() {
        return order.every((item, index) => item.id === items[index]?.id);
      },
    }),
    [order, items],
  );

  const moveTo = (from: number, to: number) => {
    setOrder((current) => reorder(current, from, to));
    onHasSelection(true);
  };

  /** Dragging is a pointer gesture; the arrows stay for everything else. */
  const arrowsEnabled = !locked && order.length > 1;

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <p className={PROMPT}>{prompt}</p>

      <Reorder.Group
        axis="y"
        values={order}
        onReorder={(next) => {
          setOrder(next);
          onHasSelection(true);
        }}
        className="flex w-full max-w-lg list-none flex-col gap-2"
      >
        {order.map((item, index) => {
          const right = solved && items[index]?.id === item.id;
          return (
            <Reorder.Item
              key={item.id}
              value={item}
              drag={locked ? false : "y"}
              whileDrag={locked ? undefined : { scale: 1.02, zIndex: 2 }}
              className={cn(
                "flex items-center gap-2 rounded-2xl border bg-card px-3 py-2",
                !locked && "cursor-grab active:cursor-grabbing",
                right ? "border-2 border-lesson-correct" : "border-lesson-line",
              )}
            >
              <GripVertical
                aria-hidden
                className={cn("size-4 shrink-0 text-muted-foreground", locked && "opacity-30")}
              />
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-lesson-soft text-sm font-bold tabular-nums">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1 text-sm font-medium sm:text-base">{item.label}</span>
              <span className="flex shrink-0 flex-col">
                <button
                  type="button"
                  aria-label={`Move ${item.label} up`}
                  disabled={!arrowsEnabled || index === 0}
                  onClick={() => moveTo(index, index - 1)}
                  className="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-lesson-soft hover:text-foreground disabled:opacity-30"
                >
                  <ArrowUp className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label={`Move ${item.label} down`}
                  disabled={!arrowsEnabled || index === order.length - 1}
                  onClick={() => moveTo(index, index + 1)}
                  className="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-lesson-soft hover:text-foreground disabled:opacity-30"
                >
                  <ArrowDown className="size-4" />
                </button>
              </span>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>

      {!solved ? (
        <p className="text-xs text-muted-foreground">
          Drag a card where it belongs, or use the arrows.
        </p>
      ) : null}
    </div>
  );
});

/**
 * Build the bridge: drop each part onto the place it belongs on the drawing.
 * Every part that lands lights up on the drawing, so the whole structure
 * assembles itself as the learner works.
 */
export const AssembleTask = forwardRef<
  TaskHandle,
  {
    prompt: string;
    scene: BridgeScene;
    slots: { id: string; label: string; at: [number, number] }[];
    solved: boolean;
    locked?: boolean;
    onHasSelection: (has: boolean) => void;
  }
>(function AssembleTask({ prompt, scene, slots, solved, locked = false, onHasSelection }, ref) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [held, setHeld] = useState<string | null>(null);

  const loose = slots.filter((slot) => !(slot.id in placed));
  const complete = loose.length === 0;

  useImperativeHandle(
    ref,
    () => ({
      check() {
        if (!complete) return false;
        return slots.every((slot) => placed[slot.id] === slot.id);
      },
    }),
    [complete, slots, placed],
  );

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <p className={PROMPT}>{prompt}</p>

      <div className="relative w-full max-w-xl">
        <SceneBoard scene={scene} highlight={Object.values(placed)} labels={solved} locked />
        {slots.map((slot, index) => {
          const filled = slot.id in placed;
          return (
            <button
              key={slot.id}
              type="button"
              disabled={locked}
              // An empty spot is named by its place in the list, never by the
              // part that belongs on it — that is the question.
              aria-label={filled ? `Take back ${slot.label}` : `Empty spot ${index + 1}`}
              onClick={() => {
                if (locked) return;
                if (filled) {
                  setPlaced((prev) => {
                    const next = { ...prev };
                    delete next[slot.id];
                    return next;
                  });
                  return;
                }
                if (!held) return;
                const id = held;
                setPlaced((prev) => ({ ...prev, [id]: slot.id }));
                setHeld(null);
              }}
              style={
                filled
                  ? {
                      left: `${(slot.at[0] / 320) * 100}%`,
                      top: `${(slot.at[1] / 180) * 100}%`,
                      background: PALETTE.paper,
                      borderColor: PALETTE.ink,
                      color: PALETTE.ink,
                    }
                  : {
                      left: `${(slot.at[0] / 320) * 100}%`,
                      top: `${(slot.at[1] / 180) * 100}%`,
                      borderColor: held ? PALETTE.yellowDeep : PALETTE.gray,
                      color: PALETTE.gray,
                    }
              }
              className={cn(
                "absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border-2 text-[10px] font-bold shadow-sm transition-colors sm:text-xs",
                filled ? "px-2 py-1" : "size-7 border-dashed bg-transparent",
                !filled && held ? "animate-pulse" : null,
              )}
            >
              {filled ? slot.label : "＋"}
            </button>
          );
        })}
      </div>

      <div className="flex min-h-12 w-full max-w-xl flex-wrap justify-center gap-2">
        {loose.length === 0 ? (
          <p className="text-sm text-muted-foreground">Every part is on the bridge.</p>
        ) : (
          loose.map((slot) => (
            <button
              key={slot.id}
              type="button"
              disabled={locked}
              aria-pressed={held === slot.id}
              onClick={() => {
                setHeld((current) => (current === slot.id ? null : slot.id));
                onHasSelection(true);
              }}
              className={cn(
                "rounded-2xl border px-4 py-2.5 text-sm font-medium transition-colors",
                held === slot.id
                  ? "border-2 border-foreground bg-lesson-soft"
                  : "border-lesson-line hover:border-foreground/40",
              )}
            >
              {slot.label}
            </button>
          ))
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {held
          ? "Now tap the spot on the drawing where it belongs."
          : "Tap a part, then tap where it belongs on the drawing."}
      </p>
    </div>
  );
});
