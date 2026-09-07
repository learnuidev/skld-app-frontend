"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Award, Lightbulb, PlayCircle, Sparkles, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";
import { useAuth } from "@/components/auth-provider";
import { getCourseBySlug } from "@/modules/course/catalog";
import { readProgress } from "@/modules/course/progress";

const COURSE_SLUGS = ["understanding-abacus", "anzan-mental-math", "zhuxinsuan"];

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {hint ? <span className="text-xs text-muted-foreground/60">{hint}</span> : null}
      </div>
      <p className="mt-3 text-4xl font-bold tabular-nums">{value}</p>
    </div>
  );
}

function BarChart({ days, values, highlight }: { days: string[]; values: number[]; highlight: number }) {
  const max = Math.max(...values, 12);
  const grid = [0, 3, 6, 9, 12];
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-bold">Problems solved</h3>
      <p className="text-sm text-muted-foreground">This week</p>
      <div className="mt-6 flex h-48 gap-3">
        <div className="flex flex-col justify-between pb-0 text-[11px] text-muted-foreground">
          {[...grid].reverse().map((g) => (
            <span key={g}>{g}</span>
          ))}
        </div>
        <div className="relative flex-1">
          {grid.map((g) => (
            <div key={g} className="absolute inset-x-0 border-t border-border/60" style={{ bottom: `${(g / max) * 100}%` }} />
          ))}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-around gap-2">
            {days.map((day, i) => {
              const height = ((values[i] ?? 0) / max) * 100;
              return (
                <div key={day} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className={
                      i === highlight
                        ? "w-6 rounded-t-md bg-blue-500 dark:bg-sky-500"
                        : "w-6 rounded-t-md bg-[#dbeafe] dark:bg-blue-800/50"
                    }
                    style={{ height: `${height}%` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="absolute inset-x-0 -bottom-6 flex justify-around">
            {days.map((day) => (
              <span key={day} className="flex-1 text-center text-[11px] text-muted-foreground">
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function YouPage() {
  const { user, loading } = useAuth();
  const name = user?.name ?? null;
  const [range, setRange] = useState("");
  const [days, setDays] = useState<string[]>([]);
  const [stats, setStats] = useState<{ completed: number; total: number; started: number } | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      let completed = 0;
      let total = 0;
      let started = 0;
      COURSE_SLUGS.forEach((slug) => {
        const course = getCourseBySlug(slug);
        if (course) total += course.lessonCount;
        const n = readProgress(slug).length;
        if (n > 0) started += 1;
        completed += n;
      });
      setStats({ completed, total, started });

      // Current week Mon..Sun
      const now = new Date();
      const monday = new Date(now);
      monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      setRange(`${fmt(monday)} - ${fmt(sunday)}, ${monday.getFullYear()}`);
      const labels: string[] = [];
      for (let i = 0; i < 7; i += 1) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        labels.push(d.toLocaleDateString("en-US", { weekday: "short" }));
      }
      setDays(labels);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const values = useMemo(() => [1, 1, 1, 1, 1, 2, 11], []);
  const highlight = days.length - 1;
  const percent = stats && stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-muted">
      <SiteNav className="lg:px-10" />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">
        {name ? (
          <>
            {/* Week selector */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-3 text-sm font-semibold">
                <button className="flex size-8 items-center justify-center rounded-full hover:bg-muted">
                  <ArrowRight className="size-4 rotate-180" />
                </button>
                <span>Week of {range}</span>
                <button className="flex size-8 items-center justify-center rounded-full hover:bg-muted">
                  <ArrowRight className="size-4" />
                </button>
              </div>
              <div className="inline-flex rounded-full bg-muted p-1">
                {["Week", "Month"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={
                      opt === "Week"
                        ? "rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-foreground shadow-sm dark:bg-white/15"
                        : "rounded-full px-4 py-1.5 text-sm font-semibold text-muted-foreground"
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Week summary */}
            <section className="mt-6 overflow-hidden rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8 dark:border-emerald-900/60 dark:bg-emerald-950/40">
              <div className="flex flex-wrap items-start gap-6">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-sm">
                  <Sparkles className="size-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">This Week&apos;s Summary</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{range}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground/80">
                    <li>
                      Good momentum! You completed {stats?.completed ?? 0} lesson
                      {stats?.completed === 1 ? "" : "s"} this week.
                    </li>
                    <li>
                      You are practising on {stats?.started ?? 0} abacus path
                      {stats?.started === 1 ? "" : "s"} — keep the streak alive.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Activity snapshot */}
            <section className="mt-8">
              <h2 className="text-lg font-bold">Your activity snapshot</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Stat label="Activities completed" value={String(stats?.completed ?? 0)} />
                <Stat label="Assessment accuracy" value="0.0%" />
              </div>
            </section>

            {/* Problems solved chart */}
            <section className="mt-6">
              <BarChart days={days} values={values} highlight={highlight} />
            </section>

            {/* Learning progress */}
            <section className="mt-8">
              <h2 className="text-lg font-bold">Your learning progress</h2>
              <div className="mt-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 via-amber-300 to-yellow-200">
                    <PlayCircle className="size-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Abacus</p>
                    <h3 className="mt-1 text-xl font-bold">Understanding Abacus</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {stats?.completed ?? 0} / {stats?.total ?? 0} lessons
                    </p>
                    <div className="mt-3 h-2 w-full max-w-md overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: `${percent}%` }} />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {stats?.completed ?? 0} lesson{stats?.completed === 1 ? "" : "s"} completed · {percent}%
                      complete
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                  <span className="text-xs font-semibold text-muted-foreground">Report sent</span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    Starting fractions on the lesson
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    Solving fractions with unrelated parts
                  </span>
                </div>
              </div>
            </section>

            {/* Learning strengths */}
            <section className="mt-8">
              <h2 className="text-lg font-bold">Your learning strengths</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex size-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300">
                    <Lightbulb className="size-5" />
                  </div>
                  <h3 className="mt-4 font-bold">Curiosity</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You skip steps 2 times after getting a right answer.
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex size-10 items-center justify-center rounded-full bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-300">
                    <Award className="size-5" />
                  </div>
                  <h3 className="mt-4 font-bold">Initiative</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You solved your first question on the first try 2 times.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-black text-white">
                  <TrendingUp className="size-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold">Pick up where you left off</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Every bead you move pushes your mental board further.
                  </p>
                </div>
                <Button asChild className="px-4">
                  <Link href="/courses">
                    <ArrowRight data-icon="inline-end" />
                    Open the abacus path
                  </Link>
                </Button>
              </div>
            </section>
          </>
        ) : loading ? (
          <div className="mx-auto mt-8 max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
            <p className="text-sm font-semibold text-muted-foreground">Loading your activity…</p>
          </div>
        ) : (
          <div className="mx-auto mt-8 max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
            <Sparkles className="mx-auto size-8 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-bold">Log in to see your activity</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Click <span className="font-semibold">Login</span> in the header to get started.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
