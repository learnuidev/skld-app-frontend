import { FigureDrawing } from "@/components/courses/figures";
import { DIAGRAM_NAMES, type DiagramName } from "@/modules/course/types";

export const metadata = { title: "Figures · peony" };

/**
 * Every concept drawing on one page, for looking at them side by side while
 * they are being drawn. `?only=a,b,c` narrows the page to those drawings, which
 * is how one file's work is checked without scrolling past everyone else's.
 */
export default async function FiguresPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const requested = typeof params.only === "string" ? params.only.split(",") : null;
  const shown: DiagramName[] = requested
    ? DIAGRAM_NAMES.filter((name) => requested.includes(name))
    : [...DIAGRAM_NAMES];

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-2 text-2xl font-bold tracking-tight">Concept figures</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        {shown.length} of {DIAGRAM_NAMES.length} drawings, each on the plate every figure is drawn
        on.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((name) => (
          <figure key={name} className="flex flex-col gap-2">
            <div className="rounded-2xl border bg-card p-3">
              <FigureDrawing name={name} />
            </div>
            <figcaption className="text-xs font-medium text-muted-foreground">{name}</figcaption>
          </figure>
        ))}
      </div>

      <h2 className="mt-14 mb-6 text-xl font-bold tracking-tight">With content&rsquo;s own words</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { name: "one-rod" as const, numbers: [7] },
          { name: "carry-over" as const, numbers: [10] },
          { name: "multiply-array" as const, numbers: [3, 4] },
          { name: "column-add" as const, numbers: [48, 27] },
          { name: "divide-share" as const, numbers: [12, 3] },
          { name: "square-grid" as const, numbers: [6] },
          { name: "unit-ladder" as const, labels: ["个", "十", "百", "千", "万"] },
          { name: "groups-of-four" as const, numbers: [3, 4, 0, 6, 2, 1] },
          { name: "koujue" as const, labels: ["一下五去四", "一去九进一"] },
          { name: "flash-drill" as const, numbers: [86] },
          { name: "numerals" as const, labels: ["一", "二", "三"] },
          { name: "place-value" as const, labels: ["ones", "tens", "hundreds", "thousands"] },
          { name: "listening-drill" as const, numbers: [7, 5, 8] },
          { name: "number-sprint" as const, numbers: [9, 4, 6, 7, 2] },
          { name: "money" as const, numbers: [2, 5, 0] },
        ]
          .filter((spec) => !requested || requested.includes(spec.name))
          .map((spec) => (
            <figure key={spec.name} className="flex flex-col gap-2">
              <div className="rounded-2xl border bg-card p-3">
                <FigureDrawing {...spec} />
              </div>
              <figcaption className="text-xs font-medium text-muted-foreground">
                {spec.name} {JSON.stringify({ numbers: spec.numbers, labels: spec.labels })}
              </figcaption>
            </figure>
          ))}
      </div>
    </main>
  );
}
