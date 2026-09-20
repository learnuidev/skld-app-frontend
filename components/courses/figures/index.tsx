import type { DiagramName } from "@/modules/course/types";

import { arithmeticFigures } from "./arithmetic";
import { chineseFigures } from "./chinese";
import type { FigureComponent } from "./kit";
import { mentalFigures } from "./mental";
import { operationsFigures } from "./operations";
import { practiceFigures } from "./practice";
import { sorobanFigures } from "./soroban";

export type { FigureComponent, FigureProps } from "./kit";

/**
 * Every named drawing, in one place. Content names a drawing and nothing else,
 * so the geometry is authored once and a lesson can never draw a broken board.
 */
export const FIGURES: Partial<Record<DiagramName, FigureComponent>> = {
  ...sorobanFigures,
  ...arithmeticFigures,
  ...operationsFigures,
  ...mentalFigures,
  ...chineseFigures,
  ...practiceFigures,
};

/** Whether a drawing is implemented — the coverage suite insists on all of them. */
export function hasFigure(name: DiagramName): boolean {
  return typeof FIGURES[name] === "function";
}

/** The drawing a `{ kind: "diagram" }` visual asks for, drawn on its plate. */
export function FigureDrawing({ name, numbers, labels, named }: { name: DiagramName } & {
  numbers?: number[];
  labels?: string[];
  named?: boolean;
}) {
  const Drawing = FIGURES[name];
  if (!Drawing) return null;
  return <>{Drawing({ numbers, labels, named })}</>;
}
