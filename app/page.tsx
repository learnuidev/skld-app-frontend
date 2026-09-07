"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Brain, Eye, Gauge, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";
import { AbacusExplorer } from "@/components/abacus/practice";
import { courseCatalog } from "@/modules/course/catalog";
import type { CourseSummary } from "@/modules/course/types";

const features = [
  {
    icon: Eye,
    title: "See it, don't memorize it",
    text: "Every concept arrives as something you can look at and poke — a bead, a shape, a puzzle — not a rule to parrot.",
  },
  {
    icon: Gauge,
    title: "Progress that fits your day",
    text: "Lessons take minutes, not hours. A little practice, every day, compounds into real mastery.",
  },
  {
    icon: Brain,
    title: "Learn by doing",
    text: "Answer, check, repeat. Peony gives you instant feedback so each idea sticks before the next one starts.",
  },
];

function findTile(subject: string): CourseSummary | undefined {
  return courseCatalog.find((course) => course.subject === subject);
}

function Tile({ course }: { course: CourseSummary }) {
  const available = course.status === "available";
  const inner = (
    <div className="flex h-full flex-col gap-2 rounded-3xl border border-border bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-br px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-gray-800 ${course.heroAccent}`}
        >
          {course.subject}
        </span>
        {!available ? (
          <Lock className="size-4 text-muted-foreground/60" aria-label="Coming soon" />
        ) : null}
      </div>
      <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight">{course.title}</h3>
      <p className="text-sm text-muted-foreground">{course.tagline}</p>
      <p className="mt-auto pt-3 text-xs font-semibold text-muted-foreground">
        {available ? "Start free" : "Coming soon"}
      </p>
    </div>
  );
  if (!available) return inner;
  return <Link href={`/courses/${course.slug}`}>{inner}</Link>;
}

export default function Home() {
  const router = useRouter();

  const subjects = ["Abacus", "Math", "Science", "Coding"];
  const tiles = subjects.map(findTile).filter((course): course is CourseSummary => Boolean(course));
  const spotlight = courseCatalog.find((course) => course.status === "available");

  return (
    <div className="min-h-screen bg-gray-100">
      <SiteNav className="lg:px-10" />

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl gap-12 px-4 pt-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pt-20">
          <div>
            <p className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-bold text-amber-700 shadow-sm">
              Math · Abacus · Coding · Science
            </p>
            <h1 className="mt-6 font-serif text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              A tutor for every curious mind.
            </h1>
            <p className="mt-8 max-w-xl text-xl leading-relaxed text-muted-foreground">
              Peony is a growing library of bite-size, interactive courses. Master the abacus, tame
              fractions, or think like a programmer — a few minutes a day.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="px-8 py-6 text-lg shadow-lg"
                onClick={() => router.push("/courses")}
              >
                Explore courses
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg text-gray-600 shadow-sm"
                onClick={() => router.push("/welcome?persona=learner")}
              >
                I&apos;m a learner
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Free to start. No account needed to play.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-lg rounded-[2.5rem] bg-white p-6 shadow-2xl sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="inline-block rounded-full bg-black px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                    Spotlight course
                  </p>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight">
                    {spotlight?.title ?? "Understanding Abacus"}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    One of peony&apos;s courses — click the beads to play.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <AbacusExplorer rods={4} initial={[4, 3, 2, 1]} label="Your first soroban" />
              </div>
              {spotlight ? (
                <div className="mt-6 flex justify-center">
                  <Button asChild variant="outline">
                    <Link href={`/courses/${spotlight.slug}`}>
                      Open this course
                      <ArrowRight data-icon="inline-end" />
                    </Link>
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6">
          <div className="rounded-[2.5rem] bg-black p-10 text-white sm:p-14">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">How it works</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl font-bold tracking-tight sm:text-5xl">
              Learning that sticks.
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-3xl bg-white/10 p-6">
                  <feature.icon className="size-8 text-amber-300" />
                  <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
                  <p className="mt-2 leading-relaxed text-white/70">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Course subjects */}
        <section className="mx-auto max-w-6xl px-4 pb-28 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">Courses</p>
              <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
                What will you learn next?
              </h2>
            </div>
            <Button asChild variant="outline" className="text-gray-700">
              <Link href="/courses">
                See all courses
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tiles.map((course) => (
              <Tile key={course.slug} course={course} />
            ))}
          </div>

          <div className="mt-16 rounded-[2.5rem] bg-gradient-to-br from-amber-200 via-orange-100 to-rose-100 p-10 text-center sm:p-14">
            <h2 className="font-serif text-4xl font-bold tracking-tight">
              Start your first lesson today.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              No account, no credit card — just you and a frame full of beads.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="px-8 py-6 text-lg shadow-lg"
                onClick={() => router.push("/courses")}
              >
                Browse the courses
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/60 px-8 py-6 text-lg text-gray-700 backdrop-blur"
                onClick={() => router.push("/welcome?persona=parent_teacher")}
              >
                I&apos;m a parent or teacher
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
