import { countLevelExercises } from "./utils";
import { zhuxinsuanContent } from "./zhuxinsuan-content";
import type { Course, CourseLesson, CourseLevel, LessonKind } from "./types";

function lesson(
  title: string,
  slug: string,
  blurb: string,
  options: { kind?: LessonKind; minutes?: number; exercises?: number } = {},
): CourseLesson {
  return {
    kind: options.kind ?? "lesson",
    slug,
    title,
    blurb,
    minutes: options.minutes ?? 3,
    exercises: options.exercises ?? 0,
  };
}

function level(slug: string, name: string, description: string, lessons: CourseLesson[]): CourseLevel {
  return { slug, name, description, lessons };
}

const levels: CourseLevel[] = [
  level("meet-the-suanpan", "Meet the Suanpan (认识算盘)", "Learn the parts and values of the Chinese abacus — and the road from 珠算 to 心算.", [
    lesson("What Is 珠心算?", "what-is-zhuxinsuan", "Abacus beadwork — 珠算 — trained until it runs on an abacus in your mind."),
    lesson("The Parts of the 算盘", "suanpan-parts", "Frame, beam, rods and beads — named the Chinese way."),
    lesson("Fingers and Values", "fingers-and-values", "Which finger moves which bead, and what every bead is worth."),
    lesson("From 珠算 to 心算", "from-abacus-to-mind", "The graded path that carries you from real beads to imagined ones."),
    lesson("Level Check", "meet-the-suanpan-check", "Level check: read and build numbers on your 算盘.", {
      kind: "level_check",
      minutes: 5,
    }),
  ]),
  level("direct-add-subtract", "Direct Addition & Subtraction (直加直减)", "The simplest 口诀: move beads straight to the beam or straight away from it.", [
    lesson("直加: Direct Addition", "direct-add", "一上一, 二上二 — adding with beads that slide straight up."),
    lesson("直减: Direct Subtraction", "direct-subtract", "一去一, 二去二 — taking beads straight off the beam."),
    lesson("读得准，拨得快", "accurate-quick", "Read precisely and move quickly — two habits to build now."),
    lesson("Two-Digit 直加减", "two-digit-direct", "Direct sums and differences across two rods."),
    lesson("Level Check", "direct-check", "Level check: direct addition and subtraction.", {
      kind: "level_check",
      minutes: 5,
    }),
  ]),
  level("friends-of-five", "Friends of Five (凑五)", "The 下五去… and 上…去五 formulas for when the lower beads run out.", [
    lesson("Complements to Five", "complement-to-five", "The 凑数 pairs that hide inside every five."),
    lesson("满五加: Adding with the Five", "add-with-five", "一下五去四, 二下五去三 — the formulas for adding 1 to 4."),
    lesson("破五减: Breaking the Five", "subtract-with-five", "一上四去五, 二上三去五 — subtract by breaking the upper bead."),
    lesson("凑五 练习", "friends-of-five-drill", "Mix both formula families until they feel like reflexes."),
    lesson("Level Check", "friends-of-five-check", "Level check: 满五加 and 破五减.", {
      kind: "level_check",
      minutes: 5,
    }),
  ]),
  level("carry-borrow", "Carry & Borrow (进退位)", "十的补数 and the 进位/退位 formulas that move tens between rods.", [
    lesson("Complements to Ten", "complement-ten", "The pairs that add up to ten, and why carrying needs them."),
    lesson("进位加: Carrying", "carry-add", "一去九进一 through 九去一进一 — carrying when a rod fills past nine."),
    lesson("退位减: Borrowing", "borrow-subtract", "一退一还九 — borrowing from the rod on the left."),
    lesson("Mixed 进退位", "mixed-carry-borrow", "Problems that carry and borrow in the same sum."),
    lesson("Level Check", "carry-borrow-check", "Level check: carrying and borrowing.", {
      kind: "level_check",
      minutes: 5,
    }),
  ]),
  level("multi-digit-listening", "Multi-Digit & Listening (多位数与听算)", "Longer numbers, the 打百子 drill, and training your ear.", [
    lesson("打百子: The 1-to-100 Drill", "da-baizi", "Add 1 through 100 and land on 5,050 — the classic endurance drill."),
    lesson("Multi-Digit 加减", "multi-digit-add-sub", "Carry and borrow across three rods."),
    lesson("听算训练: Listening Drills", "listening-drills", "Compute from numbers you hear, not numbers you see."),
    lesson("Level Check", "multi-digit-check", "Level check: three-rod problems and listening-style sums.", {
      kind: "level_check",
      minutes: 5,
    }),
  ]),
  level("mental-beadwork", "Abacus in the Mind (珠心算)", "Leave the real board behind with 看心算, 听心算 and a grading challenge.", [
    lesson("Picture Your 算盘", "imagined-abacus", "Carry the five-bead board into your mind."),
    lesson("看心算: Visual Mental Math", "kan-xinsuan", "Run written problems on your inner 算盘."),
    lesson("听心算: Listening Mental Math", "ting-xinsuan", "Hear each number once, place it, and keep going."),
    lesson("闪电算入门: Flash Anzan", "flash-mental", "Numbers at lightning speed, added to one running total."),
    lesson("Final: 定级 Challenge", "grading-challenge", "The course finale — your first taste of a graded 珠心算 test.", {
      kind: "level_check",
      minutes: 6,
    }),
  ]),
];

export const zhuxinsuanCourse: Course = {
  slug: "zhuxinsuan",
  title: "珠心算: Chinese Mental Abacus",
  tagline: "Formulas first, then a mind full of beads.",
  description:
    "Learn the Chinese art of abacus mental arithmetic — 珠心算. Master the 口诀 (kǒujué) formulas on a real 算盘, then run the same beadwork on an abacus you picture in your head.",
  introText:
    "珠心算 is the Chinese tradition of abacus mental math: first you learn precise finger work and oral formulas (口诀) on a real 算盘, then you 'see' the beads in your mind and compute without the board. This course follows that graded path — from your first 上珠 to your first mental flash set.",
  conceptsInclude: [
    "算盘 anatomy & finger work",
    "口诀 formulas (kǒujué)",
    "直加直减 · direct addition",
    "满五加 · friends of five",
    "进位退位 · carry & borrow",
    "听心算 & 看心算",
  ],
  levels,
  lessonCount: levels.reduce((total, lvl) => total + lvl.lessons.length, 0),
  exerciseCount: countLevelExercises(levels, zhuxinsuanContent),
  lessonMinutes: levels.reduce(
    (total, lvl) => total + lvl.lessons.reduce((sum, l) => sum + l.minutes, 0),
    0,
  ),
  accent: "bg-gradient-to-br from-teal-100 to-cyan-100",
  heroAccent: "from-teal-400 via-cyan-300 to-sky-200",
  sample: [6, 1, 4, 2],
};
