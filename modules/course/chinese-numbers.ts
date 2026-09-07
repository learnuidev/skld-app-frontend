import { countLevelExercises } from "./utils";
import { chineseNumbersContent } from "./chinese-numbers-content";
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
  level("number-words", "个位 · The Number Words", "Meet 零一二三四五六七八九十 and the first rule of the abacus: one rod, one digit.", [
    lesson("一 to 十 · One to Ten", "one-to-ten", "The ten numerals and the character 十 for ten."),
    lesson("Read the Rods", "read-the-rods", "Read any rod at a glance — heaven bead first."),
    lesson("Build the Rods", "build-the-rods", "Slide beads to build a number and say its Chinese name."),
    lesson("Level Check", "number-words-check", "Level check: read and build the digits 1–10.", {
      kind: "level_check",
      minutes: 5,
    }),
  ]),
  level("tens-hundreds-thousands", "十 · 百 · 千", "Compose two-, three- and four-digit numbers — and the little word 零 that holds skipped places.", [
    lesson("十 · Tens", "tens", "Make 11 to 99: a digit, then 十, then the rest."),
    lesson("百 · Hundreds", "hundreds", "Make 100 to 999 with the character 百."),
    lesson("千 · Thousands", "thousands", "Make 1,000 to 9,999 with the character 千."),
    lesson("零 · The Zero", "zero", "Slide past an empty place? Write 零."),
    lesson("Level Check", "tens-hundreds-thousands-check", "Level check: build and read numbers under 10,000.", {
      kind: "level_check",
      minutes: 5,
    }),
  ]),
  level("the-myriad", "万 · The Myriad", "The big idea: Chinese counts in groups of ten thousand, not a thousand.", [
    lesson("Why 万?", "why-wan", "10,000 is 万 — the pivot that makes Chinese numbers different."),
    lesson("The 万 Family", "wan-family", "一万, 十万, 一百万, 一千万 — the same digits, a new unit."),
    lesson("Compose a Myriad Number", "compose-wan", "12,345 is 一万二千三百四十五 — split it in two."),
    lesson("Level Check", "the-myriad-check", "Level check: read and build numbers with 万.", {
      kind: "level_check",
      minutes: 5,
    }),
  ]),
  level("yi-and-zhao", "亿 and 兆", "Climb the ladder to one trillion: 亿 (10⁸) and 兆 (10¹²).", [
    lesson("亿 · One Hundred Million", "yi", "A group of ten thousand ten-thousands is 亿."),
    lesson("兆 · One Trillion", "zhao", "A group of ten thousand hundred-millions is 兆 — the top of this course."),
    lesson("The 万进 Ladder", "ladder", "Each unit is ten thousand times the one before it."),
    lesson("Level Check", "yi-and-zhao-check", "Level check: match the unit names to the right magnitude.", {
      kind: "level_check",
      minutes: 5,
    }),
  ]),
  level("read-everything", "Read Everything", "Read any number up to 1 trillion by splitting it into groups of four.", [
    lesson("Split into Groups of Four", "group-of-four", "Mark every fourth digit — 万, 亿, 兆 — from the right."),
    lesson("Read a Big Number", "read-big", "Put the groups back together, right to left."),
    lesson("Zero Inside a Group", "zero-group", "Keep 零 honest when a group has an empty middle."),
    lesson("The Abacus Connection", "abacus-connection", "Rods are place value; the words group them by four."),
    lesson("Level Check", "read-everything-check", "The finale: read, build and decode a number up to 兆.", {
      kind: "level_check",
      minutes: 6,
    }),
  ]),
];

export const chineseNumbersCourse: Course = {
  slug: "chinese-numbers",
  title: "中文数字 · Chinese Numbers",
  tagline: "Count from 一 to one trillion the Chinese way.",
  description:
    "Learn the Chinese number system the abacus way. Start with the ten numerals, compose them with 十 百 千, then discover 万 — the ten-thousand unit that makes Chinese numbers unique — and climb to 亿 and 兆, one trillion. Every number is shown on real abacus beads so place value is something you can see and touch.",
  introText:
    "Chinese reads numbers in a beautifully regular way — once you know the units, any number up to a trillion falls apart into pieces you already know. This course teaches those pieces on the abacus: each rod is a place, and the words 万 亿 兆 name the big jumps between groups of four.",
  conceptsInclude: [
    "The ten numerals 零一二三四五六七八九十",
    "Place value on the abacus",
    "Composing with 十 百 千",
    "零 — the zero that holds a place",
    "万 · the ten-thousand unit",
    "亿 and 兆 · up to one trillion",
    "The 万进 ladder",
  ],
  levels,
  lessonCount: levels.reduce((total, lvl) => total + lvl.lessons.length, 0),
  exerciseCount: countLevelExercises(levels, chineseNumbersContent),
  lessonMinutes: levels.reduce(
    (total, lvl) => total + lvl.lessons.reduce((sum, l) => sum + l.minutes, 0),
    0,
  ),
  accent: "bg-gradient-to-br from-red-100 to-amber-100",
  heroAccent: "from-red-400 via-rose-300 to-amber-200",
  sample: [4, 3, 2, 1],
};
