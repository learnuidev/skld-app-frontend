import { countLevelExercises } from "./utils";
import { anzanContent } from "./anzan-content";
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
  level("picture-the-soroban", "Picture the Soroban", "Build the mental board that lets you calculate with no abacus in front of you.", [
    lesson("What Is Anzan?", "what-is-anzan", "Anzan (暗算) means mental calculation — the art of running a soroban you can't touch."),
    lesson("A Board in Your Head", "mental-board", "The three things every mental soroban needs: rods, beads, and a beam."),
    lesson("Snap a Mental Photo", "snap-a-photo", "Look once at the beads, then rebuild what you saw from memory."),
    lesson("From Picture to Number", "image-to-number", "Read the beads in your mind's eye back into ordinary digits."),
    lesson("Level Check", "picture-the-soroban-check", "Level check: hold and read numbers on your mental board.", {
      kind: "level_check",
      minutes: 5,
    }),
  ]),
  level("mental-addition", "Mental Addition", "Slide invisible beads to add — no friends of five, no carries left behind.", [
    lesson("Add Without Trading", "add-without-trading", "The easiest sums need only earth beads."),
    lesson("Friends of Five", "five-friends", "When earth beads run low, let the heaven bead lend a hand."),
    lesson("Carry in Your Head", "carry-in-your-head", "When a rod fills past nine, carry one to the next."),
    lesson("Two-Digit Addition", "two-digit-mental-add", "Add bigger numbers rod by rod on the invisible board."),
    lesson("Add a Few in a Row", "mental-add-string", "Chain small numbers into one running sum."),
    lesson("Level Check", "mental-addition-check", "Level check: single- and two-digit mental addition.", {
      kind: "level_check",
      minutes: 5,
    }),
  ]),
  level("mental-subtraction", "Mental Subtraction", "Take beads away on the invisible board, borrowing when you must.", [
    lesson("Subtract Without Trading", "subtract-without-trading", "Slide earth beads away from the beam, in your head."),
    lesson("Break Five Mentally", "break-five", "Out of earth beads? Break the heaven bead instead."),
    lesson("Borrow in Your Head", "borrow-in-your-head", "When a rod comes up short, borrow one ten from its neighbour."),
    lesson("Two-Digit Subtraction", "two-digit-mental-sub", "Subtract place by place, borrowing as the beads demand."),
    lesson("Level Check", "mental-subtraction-check", "Level check: mental subtraction with breaking and borrowing.", {
      kind: "level_check",
      minutes: 5,
    }),
  ]),
  level("strings-and-speed", "Strings and Speed", "Add long lists to one running total and start thinking like a flash-anzan competitor.", [
    lesson("Running Totals", "running-totals", "Keep one running total and never go back to restart."),
    lesson("Spot the Carry", "spot-the-carry", "See a carry coming by watching the rod fill toward nine."),
    lesson("Two Rods at Once", "two-rods-at-once", "Read tens and ones together for faster two-digit sums."),
    lesson("Flash Anzan", "flash-anzan", "The showpiece skill: add numbers shown one after another."),
    lesson("Level Check", "strings-speed-check", "Level check: chained additions to a running total.", {
      kind: "level_check",
      minutes: 5,
    }),
  ]),
  level("big-numbers", "Big Boards & Mixed Numbers", "Move up to three rods, then throw addition, subtraction and decimals together.", [
    lesson("Three-Digit Addition", "three-digit-add", "Give your mental board a third rod and add hundreds."),
    lesson("Three-Digit Subtraction", "three-digit-sub", "Subtract across hundreds, borrowing across rods."),
    lesson("Decimals and Money", "decimals-money", "Fix an imaginary decimal point and handle cents."),
    lesson("Mixed-Up Math", "mixed-operations", "One running total, additions and subtractions in a row."),
    lesson("Level Check", "big-numbers-check", "Level check: three-digit sums, differences and money.", {
      kind: "level_check",
      minutes: 5,
    }),
  ]),
  level("anzan-mastery", "Anzan Mastery", "Turn practiced moves into speed with drills and a final sprint.", [
    lesson("Speed-Training Habits", "speed-habits", "Short, focused sessions build speed faster than long ones."),
    lesson("Stronger Mental Images", "stronger-images", "Make the picture in your head vivid enough to hold."),
    lesson("The Ten-Number Sprint", "ten-number-sprint", "The classic drill: add ten numbers to one running total."),
    lesson("Final Challenge", "anzan-mastery-check", "The course finale: a championship-style mixed set.", {
      kind: "level_check",
      minutes: 6,
    }),
  ]),
];

export const anzanCourse: Course = {
  slug: "anzan-mental-math",
  title: "Anzan: Mental Math",
  tagline: "Calculate on a board only you can see.",
  description:
    "Run soroban calculations on an imaginary abacus. Build a vivid mental board, then add, subtract and chain numbers faster than you can reach for a calculator.",
  introText:
    "The fastest abacus students don't carry a frame — they carry a picture of one. Anzan (暗算) turns your mind's eye into the board: with each lesson you make that picture sharper, until entire columns of numbers move across it like beads on a real soroban.",
  conceptsInclude: [
    "Mental imaging",
    "Mental addition & subtraction",
    "Friends of five & ten complements",
    "Running totals",
    "Flash anzan",
    "Decimals & money",
  ],
  levels,
  lessonCount: levels.reduce((total, lvl) => total + lvl.lessons.length, 0),
  exerciseCount: countLevelExercises(levels, anzanContent),
  lessonMinutes: levels.reduce(
    (total, lvl) => total + lvl.lessons.reduce((sum, l) => sum + l.minutes, 0),
    0,
  ),
  accent: "bg-gradient-to-br from-violet-100 to-purple-100",
  heroAccent: "from-violet-400 via-purple-300 to-fuchsia-200",
  sample: [0, 7, 5, 2],
};
