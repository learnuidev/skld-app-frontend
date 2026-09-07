import Link from "next/link";
import { ArrowRight, Clock, Lock, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";
import { Abacus } from "@/components/abacus/abacus";
import { courseCatalog } from "@/modules/course/catalog";
import type { CourseSummary } from "@/modules/course/types";

function meta({ lessonCount, exerciseCount, lessonMinutes }: CourseSummary) {
  const hours = Math.round(lessonMinutes / 60);
  return `${lessonCount} lessons · ${exerciseCount} exercises · ${
    hours > 0 ? `${hours}h` : `${lessonMinutes}m`
  } of play`;
}

function FeaturedCard({ course }: { course: CourseSummary }) {
  return (
    <section className="grid overflow-hidden rounded-[2rem] border border-border bg-white shadow-lg lg:grid-cols-2">
      <div className="flex flex-col justify-center gap-6 p-8 sm:p-12">
      <div>
        <p className="mb-3 inline-block rounded-full bg-black px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          {course.subject} · Available now
        </p>
        <h2 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">{course.title}</h2>
        <p className="mt-2 text-lg font-medium text-muted-foreground">{course.tagline}</p>
      </div>
        <p className="max-w-lg leading-relaxed text-muted-foreground">{course.description}</p>
        <div className="flex flex-wrap items-center gap-4">
          <Button asChild size="lg" className="px-6 py-5 text-base shadow-md">
            <Link href={`/courses/${course.slug}`}>
              <Play data-icon="inline-start" />
              Start learning
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Clock data-icon="inline-start" className="size-4" />
            {meta(course)}
          </div>
        </div>
      </div>
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${course.heroAccent}`}
      >
        <div className="absolute -left-16 -top-16 size-56 rounded-full bg-white/30" />
        <div className="absolute -bottom-20 -right-12 size-64 rounded-full bg-white/20" />
        <div className="relative scale-100 rotate-2 rounded-3xl bg-white/60 p-4 shadow-2xl backdrop-blur-sm sm:p-6">
          <Abacus digits={course.sample} readOnly scale={0.82} label="Course preview" />
        </div>
      </div>
    </section>
  );
}

function TeaserCard({ course }: { course: CourseSummary }) {
  const available = course.status === "available";
  const card = (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div
        className={`relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br ${course.heroAccent} opacity-90`}
      >
        {course.subject === "Abacus" ? (
          <div className="scale-75 rounded-2xl bg-white/60 p-3 shadow-lg">
            <Abacus digits={course.sample} readOnly scale={0.5} label={course.title} />
          </div>
        ) : (
          <span className="font-serif text-7xl font-bold text-white/80 drop-shadow">
            {course.subject.slice(0, 1)}
          </span>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/80 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-gray-700 backdrop-blur">
          {course.subject}
        </span>
        {available ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black px-3 py-1 text-xs font-bold text-white">
            <Play className="size-3.5" />
            Available
          </span>
        ) : (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white backdrop-blur">
            <Lock className="size-3.5" />
            Coming soon
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-xl font-bold tracking-tight">{course.title}</h3>
        <p className="text-sm font-medium text-muted-foreground">{course.tagline}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground/80">{course.description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          <p className="text-xs font-medium text-muted-foreground">{meta(course)}</p>
          {available ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700">
              Start learning
              <ArrowRight className="size-4" />
            </span>
          ) : (
            <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground/70">
              Coming soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
  return available ? (
    <Link href={`/courses/${course.slug}`} className="block h-full">
      {card}
    </Link>
  ) : (
    card
  );
}

export default function CoursesPage() {
  const available = courseCatalog.filter((course) => course.status === "available");
  const teasers = courseCatalog.filter((course) => course.status === "coming-soon");
  const featured = available[0];
  const moreAvailable = available.slice(1);

  return (
    <div className="min-h-screen bg-gray-100">
      <SiteNav className="lg:px-10" />
      <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="mb-10 pt-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">Courses</p>
          <h1 className="mt-3 font-serif text-5xl font-bold tracking-tight sm:text-6xl">
            Explore courses.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            The abacus is just one of the paths on peony. Every subject — math, coding, science —
            is taught the same way: short, interactive lessons that make you think.
          </p>
        </div>

        {featured ? <FeaturedCard course={featured} /> : null}

        {moreAvailable.length > 0 ? (
          <section className="mt-16">
            <h2 className="mb-2 font-serif text-3xl font-bold tracking-tight">More available now</h2>
            <p className="mb-6 max-w-2xl text-muted-foreground">
              The abacus path continues: sharpen your beadwork into a mental superpower.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {moreAvailable.map((course) => (
                <TeaserCard key={course.slug} course={course} />
              ))}
            </div>
          </section>
        ) : null}

        {teasers.length > 0 ? (
          <section className="mt-16">
            <h2 className="mb-2 font-serif text-3xl font-bold tracking-tight">More on the way</h2>
            <p className="mb-6 max-w-2xl text-muted-foreground">
              From fractions to programming logic — new courses across every subject are in the works.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teasers.map((course) => (
                <TeaserCard key={course.slug} course={course} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
