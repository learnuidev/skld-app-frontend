import { LessonVisualView } from "@/components/courses/lesson/figure";
import { anzanContent } from "@/modules/course/anzan-content";
import type { ExplanationStep } from "@/modules/course/types";

export const metadata = { title: "Anzan boards · scratch" };

/**
 * Scratch page: every "Why?" walkthrough step of the anzan course with the
 * board it now points at, side by side, so the boards can be looked at without
 * clicking through 96 questions. `?from=&to=` slices the list. Temporary.
 */
export default async function AnzanBoardsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const from = Number(typeof params.from === "string" ? params.from : 0) || 0;
  const to = Number(typeof params.to === "string" ? params.to : 60) || 60;

  const rows: { where: string; step: number; text: string; visual: ExplanationStep["visual"] }[] = [];
  for (const [level, lessons] of Object.entries(anzanContent)) {
    for (const [lesson, blocks] of Object.entries(lessons)) {
      blocks.forEach((block, index) => {
        if (block.type !== "build" && block.type !== "read" && block.type !== "quiz") return;
        const steps: ExplanationStep[] = block.explanation?.steps ?? [];
        steps.forEach((step, s) => {
          if (step.visual) {
            rows.push({ where: `${level}/${lesson}/${block.id} ${index}`, step: s, text: step.text, visual: step.visual });
          }
        });
      });
    }
  }

  const shown = rows.slice(from, to);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <h1 className="mb-1 text-xl font-bold">
        {shown.length} of {rows.length} anzan walkthrough boards
      </h1>
      <p className="mb-6 text-xs text-muted-foreground">
        {from}–{to}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((row) => (
          <figure key={`${row.where}-${row.step}`} className="flex flex-col gap-2">
            <div className="flex h-64 items-center justify-center overflow-hidden rounded-2xl border bg-card p-2">
              {row.visual ? <LessonVisualView visual={row.visual} scale={0.42} /> : null}
            </div>
            <figcaption className="text-[11px] leading-4">
              <span className="font-semibold">
                {row.step}. {row.where}
              </span>
              <br />
              <span className="text-muted-foreground">{row.text}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
