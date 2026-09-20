import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { getLessonView } from "@/modules/course/lesson-view";
import { lessonStepUrl } from "@/modules/course/utils";

type LessonParams = { slug: string; level: string; lesson: string };

export async function generateMetadata(props: { params: Promise<LessonParams> }): Promise<Metadata> {
  const { slug, level: levelSlug, lesson: lessonSlug } = await props.params;
  const view = getLessonView(slug, levelSlug, lessonSlug);
  if (!view) {
    return { title: "Lesson not found · peony" };
  }
  return {
    title: `${view.lesson.title} · ${view.course.title} · peony`,
    description: view.lesson.blurb,
  };
}

/**
 * A lesson opens on its first step, so this URL has nothing of its own to show:
 * it hands over to the first step's own link, and every step has one from there.
 */
export default async function LessonPage(props: { params: Promise<LessonParams> }) {
  const { slug, level: levelSlug, lesson: lessonSlug } = await props.params;
  const view = getLessonView(slug, levelSlug, lessonSlug);
  if (!view) notFound();

  redirect(
    lessonStepUrl(view.course, view.level.slug, view.lesson.slug, view.blocks[0].id),
  );
}
