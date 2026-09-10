import type { CourseContentMap, LessonBlock } from "./types";

export type { LessonBlock };

export const understandingAbacusContent: CourseContentMap = {
  "meet-the-soroban": {
    "what-is-an-abacus": [
      { type: "heading", text: "What is an abacus?" },
      {
        type: "paragraph",
        text: "An abacus is a frame of sliding beads used to do arithmetic by hand. For thousands of years — before paper, before calculators — people around the world counted on beads strung on rods.",
      },
      {
        type: "paragraph",
        text: "In this course you'll learn the soroban, the Japanese abacus. It's beautifully simple: every bead has a value, and every rod holds one digit. Learn to read the beads and you can add, subtract, and multiply at astonishing speed.",
      },
    ],
    anatomy: [
      { type: "heading", text: "Meet the parts" },
      {
        type: "paragraph",
        text: "A soroban has a wooden frame, vertical rods, and a horizontal bar across the middle called the beam. Beads that touch the beam are the ones that count.",
      },
      {
        type: "list",
        items: [
          "Beam — the bar across the middle. Beads touching the beam are counted.",
          "Rods — one rod per digit. The rightmost rod is the ones place.",
          "Heaven — the bead above the beam. Each heaven bead is worth 5.",
          "Earth — the four beads below the beam. Each earth bead is worth 1.",
        ],
      },
      {
        type: "explore",
        label: "Try it: click the beads and watch them move toward the beam.",
        rods: 3,
        initial: [0, 0, 0],
      },
    ],
    "beads-worth": [
      { type: "heading", text: "What each bead is worth" },
      {
        type: "paragraph",
        text: "Earth beads below the beam each count 1. Slide one up to the beam and the rod shows 1. Slide all four and it shows 4.",
        demo: {
          frames: [[0], [1], [2], [3], [4]],
          captions: ["0", "1: one earth bead", "2: two earth beads", "3: three earth beads", "4: all four earth beads"],
        },
      },
      {
        type: "paragraph",
        text: "The single heaven bead above the beam counts 5 all by itself. When it touches the beam, the rod is worth 5 — even though it's only one bead.",
        demo: {
          frames: [[0], [5]],
          captions: ["0", "heaven bead down → 5"],
        },
      },
      {
        type: "read",
        prompt: "Which number is this abacus showing?",
        digits: [1],
        choices: [1, 2, 5, 10],
        explanation: {
          steps: [
            {
              text: "One earth bead is touching the beam.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [1]],
                captions: ["Empty rod", "One earth bead up → 1"],
              },
            },
            {
              text: "Each earth bead counts as 1, so the rod shows 1.",
              visual: { kind: "abacus", digits: [1] },
            },
          ],
        },
      },
      {
        type: "read",
        prompt: "What about this one?",
        digits: [5],
        choices: [5, 1, 4, 10],
        explanation: {
          steps: [
            {
              text: "Only the heaven bead is touching the beam.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [5]],
                captions: ["Empty rod", "Heaven bead down → 5"],
              },
            },
            {
              text: "A single heaven bead is worth 5, so the rod shows 5.",
              visual: { kind: "abacus", digits: [5] },
            },
          ],
        },
      },
      {
        type: "read",
        prompt: "This rod uses both kinds of beads. What number is it?",
        digits: [6],
        choices: [6, 5, 4, 7],
        explanation: {
          steps: [
            {
              text: "The heaven bead touching the beam is worth 5.",
              visual: { kind: "abacus", digits: [5] },
            },
            {
              text: "The one earth bead touching the beam is worth 1.",
              visual: {
                kind: "abacus-anim",
                frames: [[5], [6]],
                captions: ["Heaven bead: 5", "One earth bead joins → 6"],
              },
            },
            {
              text: "5 + 1 = 6, so the rod shows 6.",
              visual: { kind: "abacus", digits: [6] },
            },
          ],
        },
      },
    ],
    "reset-and-clean": [
      { type: "heading", text: "Zero: clearing the board" },
      {
        type: "paragraph",
        text: "Before a calculation you clear the abacus: every heaven bead pushed up, every earth bead pushed down. With no bead touching the beam, every rod shows 0.",
      },
      {
        type: "paragraph",
        text: "Make clearing automatic — always push beads away from the beam, using your thumb for earth beads and your index finger for the heaven bead. Muscle memory pays off later.",
      },
      {
        type: "read",
        prompt: "Both rods are cleared. Which number does this abacus show?",
        digits: [0, 0],
        choices: [0, 11, 1, 5],
        explanation: {
          steps: [
            {
              text: "No bead is touching the beam on either rod.",
              visual: { kind: "abacus", digits: [0, 0] },
            },
            {
              text: "So the tens rod shows 0 and the ones rod shows 0, making 0.",
              visual: { kind: "abacus", digits: [0, 0] },
            },
          ],
        },
      },
    ],
    "meet-the-soroban-check": [
      { type: "heading", text: "Level check" },
      {
        type: "paragraph",
        text: "Show what you know. Solve each question to finish the level.",
      },
      {
        type: "read",
        prompt: "Which number is shown?",
        digits: [3],
        choices: [3, 5, 2, 4],
        explanation: {
          steps: [
            {
              text: "Three earth beads are touching the beam.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [3]],
                captions: ["Empty rod", "Three earth beads up → 3"],
              },
            },
            {
              text: "Each counts as 1, so the rod shows 3.",
              visual: { kind: "abacus", digits: [3] },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "Slide the beads to show 7.",
        target: 7,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "7 is a heaven bead (5) plus two earth beads (2).",
              visual: { kind: "abacus", digits: [7] },
            },
            {
              text: "Slide the heaven bead down to the beam for 5.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [5]],
                captions: ["Empty rod", "Heaven bead down → 5"],
              },
            },
            {
              text: "Push up two earth beads to add the extra 2, showing 7.",
              visual: {
                kind: "abacus-anim",
                frames: [[5], [7]],
                captions: ["5 on the rod", "Push up two earth beads → 7"],
              },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "Now show 9 on the rod.",
        target: 9,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "9 is a heaven bead (5) plus four earth beads (4).",
              visual: { kind: "abacus", digits: [9] },
            },
            {
              text: "Slide the heaven bead down to the beam for 5.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [5]],
                captions: ["Empty rod", "Heaven bead down → 5"],
              },
            },
            {
              text: "Push all four earth beads up to add 4, showing 9.",
              visual: {
                kind: "abacus-anim",
                frames: [[5], [9]],
                captions: ["5 on the rod", "Push up four earth beads → 9"],
              },
            },
          ],
        },
      },
    ],
  },

  "counting-with-beads": {
    "one-to-four": [
      { type: "heading", text: "One to four" },
      {
        type: "paragraph",
        text: "Earth beads count 1, 2, 3, 4. Slide them up to the beam one at a time. Slide one bead and the rod shows 1; slide four and it shows 4.",
        demo: {
          frames: [[0], [1], [2], [3], [4]],
          captions: ["0", "1", "2", "3", "4"],
        },
      },
      {
        type: "build",
        prompt: "Slide the beads to show 4.",
        target: 4,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "4 needs four earth beads, each worth 1.",
              visual: { kind: "abacus", digits: [4] },
            },
            {
              text: "Push all four earth beads up to the beam to show 4.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [4]],
                captions: ["Empty rod", "Four earth beads up → 4"],
              },
            },
          ],
        },
      },
      {
        type: "read",
        prompt: "Which number is this rod showing?",
        digits: [2],
        choices: [2, 4, 1, 6],
        explanation: {
          steps: [
            {
              text: "Two earth beads are touching the beam.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [2]],
                captions: ["Empty rod", "Two earth beads up → 2"],
              },
            },
            {
              text: "Each counts as 1, so the rod shows 2.",
              visual: { kind: "abacus", digits: [2] },
            },
          ],
        },
      },
    ],
    "five-and-friends": [
      { type: "heading", text: "Five and its friends" },
      {
        type: "paragraph",
        text: "To show 5, don't try to invent a fifth earth bead — slide the heaven bead down to the beam instead. It is worth 5 on its own.",
        demo: {
          frames: [[0], [4], [5]],
          captions: ["0", "4: all four earth beads", "5: slide the heaven bead down instead"],
        },
      },
      {
        type: "paragraph",
        text: "Now combine the two kinds of beads. 6 is heaven plus one earth. 9 is heaven plus all four earth beads. The heaven bead's five friends are the earth beads below it.",
        demo: {
          frames: [[0], [5], [6], [9]],
          captions: ["0", "5: heaven bead", "6: heaven + 1 earth", "9: heaven + all four earth"],
        },
      },
      {
        type: "read",
        prompt: "Heaven plus one earth. What number is this?",
        digits: [6],
        choices: [6, 5, 1, 9],
        explanation: {
          steps: [
            {
              text: "The heaven bead is worth 5.",
              visual: { kind: "abacus", digits: [5] },
            },
            {
              text: "The one earth bead is worth 1.",
              visual: {
                kind: "abacus-anim",
                frames: [[5], [6]],
                captions: ["Heaven bead: 5", "One earth bead joins → 6"],
              },
            },
            {
              text: "5 + 1 = 6, so the rod shows 6.",
              visual: { kind: "abacus", digits: [6] },
            },
          ],
        },
      },
      {
        type: "read",
        prompt: "Heaven plus all four earth beads. What number is this?",
        digits: [9],
        choices: [9, 4, 6, 8],
        explanation: {
          steps: [
            {
              text: "The heaven bead is worth 5.",
              visual: { kind: "abacus", digits: [5] },
            },
            {
              text: "The four earth beads are worth 4 in total.",
              visual: {
                kind: "abacus-anim",
                frames: [[5], [9]],
                captions: ["Heaven bead: 5", "All four earth beads up → 9"],
              },
            },
            {
              text: "5 + 4 = 9, so the rod shows 9.",
              visual: { kind: "abacus", digits: [9] },
            },
          ],
        },
      },
    ],
    "read-any-number": [
      { type: "heading", text: "Read any number from 1 to 9" },
      {
        type: "paragraph",
        text: "Read a rod the way you'd read a number: check the heaven bead first (that's 5), then add the earth beads touching the beam.",
      },
      {
        type: "read",
        prompt: "Heaven bead down, three earth beads up. What number?",
        digits: [8],
        choices: [8, 3, 5, 4],
        explanation: {
          steps: [
            {
              text: "The heaven bead is worth 5.",
              visual: { kind: "abacus", digits: [5] },
            },
            {
              text: "The three earth beads are worth 3.",
              visual: {
                kind: "abacus-anim",
                frames: [[5], [8]],
                captions: ["Heaven bead: 5", "Three earth beads up → 8"],
              },
            },
            {
              text: "5 + 3 = 8, so the rod shows 8.",
              visual: { kind: "abacus", digits: [8] },
            },
          ],
        },
      },
      {
        type: "read",
        prompt: "No heaven bead, four earth beads up. What number?",
        digits: [4],
        choices: [4, 5, 9, 1],
        explanation: {
          steps: [
            {
              text: "There is no heaven bead, so the rod has no 5.",
              visual: { kind: "abacus", digits: [0] },
            },
            {
              text: "Four earth beads, each worth 1, show 4.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [4]],
                captions: ["No heaven bead on the rod", "Four earth beads up → 4"],
              },
            },
          ],
        },
      },
      {
        type: "read",
        prompt: "Heaven bead down, two earth beads up. What number?",
        digits: [7],
        choices: [7, 2, 5, 9],
        explanation: {
          steps: [
            {
              text: "The heaven bead is worth 5.",
              visual: { kind: "abacus", digits: [5] },
            },
            {
              text: "The two earth beads are worth 2.",
              visual: {
                kind: "abacus-anim",
                frames: [[5], [7]],
                captions: ["Heaven bead: 5", "Two earth beads up → 7"],
              },
            },
            {
              text: "5 + 2 = 7, so the rod shows 7.",
              visual: { kind: "abacus", digits: [7] },
            },
          ],
        },
      },
    ],
    "build-a-number": [
      { type: "heading", text: "Build a number" },
      {
        type: "paragraph",
        text: "Building is reading in reverse: figure out how many earth beads and whether you need the heaven bead, then slide them to the beam.",
      },
      { type: "build", prompt: "Show 5 on the rod.", target: 5, rods: 1,
        explanation: {
          steps: [
            {
              text: "5 needs only the heaven bead, worth 5 on its own.",
              visual: { kind: "abacus", digits: [5] },
            },
            {
              text: "Slide it down to the beam and leave the earth beads down.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [5]],
                captions: ["Empty rod", "Heaven bead down → 5"],
              },
            },
          ],
        },
      },
      { type: "build", prompt: "Show 8 on the rod.", target: 8, rods: 1,
        explanation: {
          steps: [
            {
              text: "8 is 5 plus 3.",
              visual: { kind: "abacus", digits: [8] },
            },
            {
              text: "Slide the heaven bead down for the 5.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [5]],
                captions: ["Empty rod", "Heaven bead down → 5"],
              },
            },
            {
              text: "Push three earth beads up to add the 3.",
              visual: {
                kind: "abacus-anim",
                frames: [[5], [8]],
                captions: ["5 on the rod", "Push up three earth beads → 8"],
              },
            },
          ],
        },
      },
      { type: "build", prompt: "Show 6 on the rod.", target: 6, rods: 1,
        explanation: {
          steps: [
            {
              text: "6 is the heaven bead (5) plus one earth bead (1).",
              visual: { kind: "abacus", digits: [6] },
            },
            {
              text: "Slide both to the beam to show 6.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [6]],
                captions: ["Empty rod", "Heaven (5) + one earth (1) → 6"],
              },
            },
          ],
        },
      },
    ],
    "counting-with-beads-check": [
      { type: "heading", text: "Level check" },
      { type: "paragraph", text: "Read it, then build it. Solve every question to finish." },
      {
        type: "read",
        prompt: "What number is this rod showing?",
        digits: [7],
        choices: [7, 2, 6, 5],
        explanation: {
          steps: [
            {
              text: "The heaven bead is worth 5.",
              visual: { kind: "abacus", digits: [5] },
            },
            {
              text: "The two earth beads are worth 2.",
              visual: {
                kind: "abacus-anim",
                frames: [[5], [7]],
                captions: ["Heaven bead: 5", "Two earth beads up → 7"],
              },
            },
            {
              text: "5 + 2 = 7, so the rod shows 7.",
              visual: { kind: "abacus", digits: [7] },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "Show 3 on the rod.",
        target: 3,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "3 needs three earth beads, each worth 1.",
              visual: { kind: "abacus", digits: [3] },
            },
            {
              text: "Push three beads up to the beam to show 3.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [3]],
                captions: ["Empty rod", "Three earth beads up → 3"],
              },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "Show 9 on the rod.",
        target: 9,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "9 is 5 plus 4.",
              visual: { kind: "abacus", digits: [9] },
            },
            {
              text: "Slide the heaven bead down for the 5.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [5]],
                captions: ["Empty rod", "Heaven bead down → 5"],
              },
            },
            {
              text: "Push all four earth beads up to add the 4.",
              visual: {
                kind: "abacus-anim",
                frames: [[5], [9]],
                captions: ["5 on the rod", "Push up four earth beads → 9"],
              },
            },
          ],
        },
      },
    ],
  },

  "tens-and-beyond": {
    "rods-are-places": [
      { type: "heading", text: "Rods are places" },
      {
        type: "paragraph",
        text: "One rod can only hold a single digit, so bigger numbers use more rods. The rightmost rod is the ones place, the next rod to the left is the tens place, and the one after that is the hundreds place.",
      },
      {
        type: "paragraph",
        text: "Two beads on the tens rod and three beads on the ones rod mean 20 + 3 = 23. The abacus is place value you can hold in your hands.",
      },
      {
        type: "read",
        prompt: "4 ones and 2 tens. What number is this abacus showing?",
        digits: [4, 2],
        choices: [24, 42, 6, 204],
        explanation: {
          steps: [
            {
              text: "The tens rod shows 2, which is worth 20.",
              visual: { kind: "abacus", digits: [0, 2] },
            },
            {
              text: "The ones rod shows 4.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 2], [4, 2]],
                captions: ["The tens rod: 20", "The ones rod adds 4 → 24"],
              },
            },
            {
              text: "20 + 4 = 24, so the abacus shows 24.",
              visual: { kind: "abacus", digits: [4, 2] },
            },
          ],
        },
      },
      {
        type: "read",
        prompt: "No ones and 3 tens. What number is this?",
        digits: [0, 3],
        choices: [30, 3, 33, 300],
        explanation: {
          steps: [
            {
              text: "Three tens are worth 30.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0], [0, 3]],
                captions: ["Empty abacus", "Three earth beads on the tens rod → 30"],
              },
            },
            {
              text: "There are no ones, so the number is 30.",
              visual: { kind: "abacus", digits: [0, 3] },
            },
          ],
        },
      },
    ],
    "building-two-digit": [
      { type: "heading", text: "Building two-digit numbers" },
      {
        type: "paragraph",
        text: "To build a two-digit number, take the number apart by place value. For 47 you need 4 tens on the left rod and 7 ones on the right rod.",
        demo: {
          frames: [[0, 0], [0, 4], [7, 4]],
          captions: ["0", "4 on the tens rod → 40", "7 on the ones rod → 47"],
        },
      },
      {
        type: "build",
        prompt: "Build 23 on the abacus.",
        target: 23,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "23 is 2 tens and 3 ones.",
              visual: { kind: "abacus", digits: [3, 2] },
            },
            {
              text: "Put 2 on the tens rod.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0], [0, 2]],
                captions: ["Empty abacus", "Two earth beads on the tens rod → 20"],
              },
            },
            {
              text: "Put 3 on the ones rod, and the abacus shows 23.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 2], [3, 2]],
                captions: ["20 on the abacus", "Three earth beads on the ones rod → 23"],
              },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "Build 47 on the abacus.",
        target: 47,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "47 is 4 tens and 7 ones.",
              visual: { kind: "abacus", digits: [7, 4] },
            },
            {
              text: "Put 4 on the tens rod.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0], [0, 4]],
                captions: ["Empty abacus", "Four earth beads on the tens rod → 40"],
              },
            },
            {
              text: "Put 7 on the ones rod, and the abacus shows 47.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 4], [7, 4]],
                captions: ["40 on the abacus", "Heaven (5) + two earth (2) on the ones rod → 47"],
              },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "Build 52 on the abacus.",
        target: 52,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "52 is 5 tens and 2 ones.",
              visual: { kind: "abacus", digits: [2, 5] },
            },
            {
              text: "Show 5 on the tens rod using the heaven bead.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0], [0, 5]],
                captions: ["Empty abacus", "Heaven bead on the tens rod → 50"],
              },
            },
            {
              text: "Show 2 on the ones rod, and the abacus shows 52.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 5], [2, 5]],
                captions: ["50 on the abacus", "Two earth beads on the ones rod → 52"],
              },
            },
          ],
        },
      },
    ],
    "zeros-matter": [
      { type: "heading", text: "Hold the zeros" },
      {
        type: "paragraph",
        text: "A resting rod still takes up a place — it just means zero. 3 tens and 0 ones is 30, not 3. If you skip the tens rod's place, the number quietly shrinks by ten times.",
      },
      {
        type: "read",
        prompt: "1 ten and 0 ones. What number is this?",
        digits: [0, 1],
        choices: [10, 1, 11, 100],
        explanation: {
          steps: [
            {
              text: "One ten is worth 10.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0], [0, 1]],
                captions: ["Empty abacus", "One earth bead on the tens rod → 10"],
              },
            },
            {
              text: "Zero ones add nothing, so the abacus shows 10.",
              visual: { kind: "abacus", digits: [0, 1] },
            },
          ],
        },
      },
      {
        type: "read",
        prompt: "7 tens and 0 ones. What number is this?",
        digits: [0, 7],
        choices: [70, 7, 77, 700],
        explanation: {
          steps: [
            {
              text: "Seven tens are worth 70.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0], [0, 7]],
                captions: ["Empty abacus", "Heaven (5) + two earth (2) on the tens rod → 70"],
              },
            },
            {
              text: "Zero ones add nothing, so the abacus shows 70.",
              visual: { kind: "abacus", digits: [0, 7] },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "Build 40 on the abacus.",
        target: 40,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "40 is 4 tens and 0 ones.",
              visual: { kind: "abacus", digits: [0, 4] },
            },
            {
              text: "Show 4 on the tens rod and leave the ones rod empty.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0], [0, 4]],
                captions: ["Empty abacus", "Four earth beads on the tens rod → 40"],
              },
            },
          ],
        },
      },
    ],
    "reading-big-numbers": [
      { type: "heading", text: "Reading big numbers" },
      {
        type: "paragraph",
        text: "Add a third rod and you're reading hundreds. Read each rod from left to right — hundreds, tens, ones — and say the number in the usual way.",
      },
      {
        type: "read",
        prompt: "2 hundreds, 3 tens, 4 ones. What number is this?",
        digits: [4, 3, 2],
        choices: [234, 432, 204, 2340],
        explanation: {
          steps: [
            {
              text: "The hundreds rod shows 2, worth 200.",
              visual: { kind: "abacus", digits: [0, 0, 2] },
            },
            {
              text: "The tens rod shows 3 (30) and the ones rod shows 4.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 2], [4, 3, 2]],
                captions: ["200 on the hundreds rod", "+3 tens and 4 ones → 234"],
              },
            },
            {
              text: "200 + 30 + 4 = 234.",
              visual: { kind: "abacus", digits: [4, 3, 2] },
            },
          ],
        },
      },
      {
        type: "read",
        prompt: "0 ones, 0 tens, 4 hundreds. What number is this?",
        digits: [0, 0, 4],
        choices: [400, 4, 44, 444],
        explanation: {
          steps: [
            {
              text: "The hundreds rod shows 4, worth 400.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0], [0, 0, 4]],
                captions: ["Empty abacus", "Four earth beads on the hundreds rod → 400"],
              },
            },
            {
              text: "The tens and ones rods are empty, so the number is 400.",
              visual: { kind: "abacus", digits: [0, 0, 4] },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "Build 305 on the abacus.",
        target: 305,
        rods: 3,
        explanation: {
          steps: [
            {
              text: "305 is 3 hundreds, 0 tens, and 5 ones.",
              visual: { kind: "abacus", digits: [5, 0, 3] },
            },
            {
              text: "Show 3 on the hundreds rod and leave the tens rod empty.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0], [0, 0, 3]],
                captions: ["Empty abacus", "Three earth beads on the hundreds rod → 300"],
              },
            },
            {
              text: "Show 5 on the ones rod to finish 305.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 3], [5, 0, 3]],
                captions: ["300 on the abacus", "Heaven bead on the ones rod → 305"],
              },
            },
          ],
        },
      },
    ],
    "tens-and-beyond-check": [
      { type: "heading", text: "Level check" },
      { type: "paragraph", text: "Build and read your way through the level." },
      {
        type: "build",
        prompt: "Build 57 on the abacus.",
        target: 57,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "57 is 5 tens and 7 ones.",
              visual: { kind: "abacus", digits: [7, 5] },
            },
            {
              text: "Show 5 on the tens rod using the heaven bead.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0], [0, 5]],
                captions: ["Empty abacus", "Heaven bead on the tens rod → 50"],
              },
            },
            {
              text: "Show 7 on the ones rod, and the abacus shows 57.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 5], [7, 5]],
                captions: ["50 on the abacus", "Heaven (5) + two earth (2) on the ones rod → 57"],
              },
            },
          ],
        },
      },
      {
        type: "read",
        prompt: "4 hundreds, 0 tens, 5 ones. What number is this?",
        digits: [5, 0, 4],
        choices: [405, 54, 450, 45],
        explanation: {
          steps: [
            {
              text: "The hundreds rod shows 4, worth 400.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0], [0, 0, 4]],
                captions: ["Empty abacus", "Four earth beads on the hundreds rod → 400"],
              },
            },
            {
              text: "The tens rod is empty and the ones rod shows 5, so the number is 405.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 4], [5, 0, 4]],
                captions: ["400 with an empty tens rod", "Heaven bead on the ones rod → 405"],
              },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "Build 120 on the abacus.",
        target: 120,
        rods: 3,
        explanation: {
          steps: [
            {
              text: "120 is 1 hundred, 2 tens, and 0 ones.",
              visual: { kind: "abacus", digits: [0, 2, 1] },
            },
            {
              text: "Show 1 on the hundreds rod and 2 on the tens rod.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0], [0, 2, 1]],
                captions: ["Empty abacus", "One earth on the hundreds, two on the tens → 120"],
              },
            },
            {
              text: "Leave the ones rod empty to finish 120.",
              visual: { kind: "abacus", digits: [0, 2, 1] },
            },
          ],
        },
      },
    ],
  },

  "adding-on-the-beads": {
    "add-without-trading": [
      { type: "heading", text: "Add without trading" },
      {
        type: "paragraph",
        text: "Adding on an abacus is just sliding beads. To add a small number, slide that many earth beads toward the beam — as long as the rod has room.",
      },
      {
        type: "paragraph",
        text: "Add place by place: ones to ones, tens to tens. When no rod ever fills past nine, there's nothing to carry — the beads do the arithmetic for you.",
      },
      {
        type: "build",
        prompt: "12 + 13. Slide the beads to show the sum.",
        target: 25,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "12 + 13 = 25, so show 2 tens and 5 ones.",
              visual: { kind: "abacus", digits: [5, 2] },
            },
            {
              text: "Set 2 on the tens rod using two earth beads.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0], [0, 2]],
                captions: ["Empty abacus", "Two earth beads on the tens rod → 20"],
              },
            },
            {
              text: "Set 5 on the ones rod using the heaven bead.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 2], [5, 2]],
                captions: ["20 on the abacus", "Heaven bead on the ones rod → 25"],
              },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "31 + 22. Show the sum on the abacus.",
        target: 53,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "31 + 22 = 53, so show 5 tens and 3 ones.",
              visual: { kind: "abacus", digits: [3, 5] },
            },
            {
              text: "Set 5 on the tens rod using the heaven bead.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0], [0, 5]],
                captions: ["Empty abacus", "Heaven bead on the tens rod → 50"],
              },
            },
            {
              text: "Set 3 on the ones rod using three earth beads.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 5], [3, 5]],
                captions: ["50 on the abacus", "Three earth beads on the ones rod → 53"],
              },
            },
          ],
        },
      },
    ],
    "friends-of-five": [
      { type: "heading", text: "Friends of five" },
      {
        type: "paragraph",
        text: "There are only four earth beads, so you can't add 4 by sliding four more beads when the rod is already busy. Instead, think in fives: to add 4, slide the heaven bead down (+5) and take one earth bead away (−1).",
        demo: {
          frames: [[3], [8], [7]],
          captions: [
            "Start: 3 — only one earth bead is free",
            "+5: slide the heaven bead down → 8",
            "−1: take one earth bead away → 7",
          ],
        },
      },
      {
        type: "paragraph",
        text: "The earth bead you remove is the addend's friend of five. The pairs are 1 ↔ 4 and 2 ↔ 3. So to add 4 you use +5 −1; to add 3 you use +5 −2.",
        demo: {
          frames: [[2], [7], [5]],
          captions: [
            "Start: 2",
            "+5: slide the heaven bead down → 7",
            "−2: take two earth beads away → 5",
          ],
        },
      },
      {
        type: "build",
        prompt: "2 + 4 = 6. Slide the beads to show the sum.",
        target: 6,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "2 + 4 = 6, so the rod must show 6.",
              visual: { kind: "abacus", digits: [6] },
            },
            {
              text: "Show 6 as the heaven bead (5) plus one earth bead (1).",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [5], [6]],
                captions: ["0", "5: heaven bead", "+1 earth bead → 6"],
              },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "4 + 4 + 4 = 12. Show the total on the abacus.",
        target: 12,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "4 + 4 + 4 = 12, so show 1 ten and 2 ones.",
              visual: { kind: "abacus", digits: [2, 1] },
            },
            {
              text: "Set 1 on the tens rod and 2 on the ones rod.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0], [2, 1]],
                captions: ["Empty abacus", "One ten and two ones → 12"],
              },
            },
          ],
        },
      },
    ],
    carrying: [
      { type: "heading", text: "Carrying over" },
      {
        type: "paragraph",
        text: "When a rod runs out of room, you carry — exactly like written arithmetic. To add 8 + 5 you can't fit 13 ones on one rod, so you record 3 on the ones rod and carry 1 to the tens rod: 13.",
        demo: {
          frames: [[8, 0], [3, 1]],
          captions: [
            "Start: 8 ones — no room for 5 more",
            "Carry: record 3 ones, carry 1 ten → 13",
          ],
        },
      },
      {
        type: "paragraph",
        text: "Carrying is a sign that you've filled a rod to its limit: four earth beads plus a heaven bead is the most a rod can show, which is 9.",
        demo: {
          frames: [[0], [5], [9]],
          captions: ["0", "5: heaven bead", "9: heaven + all four earth — the rod's limit"],
        },
      },
      {
        type: "build",
        prompt: "8 + 5. Show the sum on the abacus.",
        target: 13,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "8 + 5 = 13, so show 1 ten and 3 ones.",
              visual: { kind: "abacus", digits: [3, 1] },
            },
            {
              text: "The ones rod fills past 9, so you carry 1 to the tens rod.",
              visual: {
                kind: "abacus-anim",
                frames: [[8, 0], [9, 0]],
                captions: ["8 + 5 overflows the ones rod", "9 ones — 4 still to add"],
              },
            },
            {
              text: "Set the carried 1 on the tens rod and 3 on the ones rod.",
              visual: {
                kind: "abacus-anim",
                frames: [[8, 0], [3, 1]],
                captions: ["8 ones — can't fit 5 more", "carry 1 ten → 13"],
              },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "9 + 9 = 18. Show the sum on the abacus.",
        target: 18,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "9 + 9 = 18, so show 1 ten and 8 ones.",
              visual: { kind: "abacus", digits: [8, 1] },
            },
            {
              text: "The ones rod is full, so the extra 10 carries over.",
              visual: {
                kind: "abacus-anim",
                frames: [[9, 0], [8, 1]],
                captions: ["9 ones — the rod is full", "Carry one ten: 8 ones and 1 ten → 18"],
              },
            },
            {
              text: "Set the carried 1 on the tens rod and 8 on the ones rod.",
              visual: { kind: "abacus", digits: [8, 1] },
            },
          ],
        },
      },
    ],
    "add-two-digit": [
      { type: "heading", text: "Adding two-digit numbers" },
      {
        type: "paragraph",
        text: "Line up the rods by place value and add from the right, carrying whenever a rod overflows. Keep your eyes on the beam — with practice your fingers learn the moves before you think about them.",
      },
      {
        type: "build",
        prompt: "27 + 15 = 42. Show the sum on the abacus.",
        target: 42,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "27 + 15 = 42, so show 4 tens and 2 ones.",
              visual: { kind: "abacus", digits: [2, 4] },
            },
            {
              text: "The ones add up past 9, so carry 1 to the tens place.",
              visual: {
                kind: "abacus-anim",
                frames: [[9, 2], [2, 3]],
                captions: ["7 + 5 fills the ones rod: 9 ones, 3 left over", "Carry 1 ten: 2 ones and 3 tens → 32"],
              },
            },
            {
              text: "Set 4 on the tens rod and 2 on the ones rod.",
              visual: {
                kind: "abacus-anim",
                frames: [[2, 3], [2, 4]],
                captions: ["32 so far", "Add the last ten → 42"],
              },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "58 + 27. Show the sum on the abacus.",
        target: 85,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "58 + 27 = 85, so show 8 tens and 5 ones.",
              visual: { kind: "abacus", digits: [5, 8] },
            },
            {
              text: "The ones add past 9, so carry 1 to the tens place.",
              visual: {
                kind: "abacus-anim",
                frames: [[9, 5], [5, 6]],
                captions: ["8 + 7 fills the ones rod: 9 ones, 6 left over", "Carry 1 ten: 5 ones and 6 tens → 65"],
              },
            },
            {
              text: "Set 8 on the tens rod and 5 on the ones rod.",
              visual: {
                kind: "abacus-anim",
                frames: [[5, 6], [5, 8]],
                captions: ["65 so far", "Add the last two tens → 85"],
              },
            },
          ],
        },
      },
    ],
    "adding-on-the-beads-check": [
      { type: "heading", text: "Level check" },
      { type: "paragraph", text: "Add, carry, and show each sum to finish the level." },
      {
        type: "build",
        prompt: "3 + 8. Show the sum on the abacus.",
        target: 11,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "3 + 8 = 11, so show 1 ten and 1 one.",
              visual: { kind: "abacus", digits: [1, 1] },
            },
            {
              text: "The ones rod fills past 9, so the extra ten carries.",
              visual: {
                kind: "abacus-anim",
                frames: [[9, 0], [1, 1]],
                captions: ["3 + 8 fills the ones rod: 9 ones, 2 left over", "Carry 1 ten: 1 one and 1 ten → 11"],
              },
            },
            {
              text: "Set the carried 1 on the tens rod and 1 on the ones rod.",
              visual: { kind: "abacus", digits: [1, 1] },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "4 + 5 + 6. Show the total on the abacus.",
        target: 15,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "4 + 5 + 6 = 15, so show 1 ten and 5 ones.",
              visual: { kind: "abacus", digits: [5, 1] },
            },
            {
              text: "Set 1 on the tens rod and 5 on the ones rod.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0], [5, 1]],
                captions: ["Empty abacus", "One ten and five ones → 15"],
              },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "18 + 8. Show the sum on the abacus.",
        target: 26,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "18 + 8 = 26, so show 2 tens and 6 ones.",
              visual: { kind: "abacus", digits: [6, 2] },
            },
            {
              text: "The ones rod fills past 9, so the extra ten carries.",
              visual: {
                kind: "abacus-anim",
                frames: [[9, 1], [6, 2]],
                captions: ["8 + 8 fills the ones rod: 9 ones, 7 left over", "Carry 1 ten: 6 ones and 2 tens → 26"],
              },
            },
            {
              text: "Set 2 on the tens rod and 6 on the ones rod.",
              visual: { kind: "abacus", digits: [6, 2] },
            },
          ],
        },
      },
    ],
  },

  "subtracting-on-the-beads": {
    "take-away-ones": [
      { type: "heading", text: "Take away ones" },
      {
        type: "paragraph",
        text: "Subtraction is addition in reverse: instead of sliding beads up to the beam, slide them away. To subtract a small number, remove that many earth beads from the beam.",
      },
      {
        type: "build",
        prompt: "9 − 3. Slide the beads to show the difference.",
        target: 6,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "9 take away 3 is 6.",
              visual: { kind: "abacus", digits: [6] },
            },
            {
              text: "Slide three earth beads away from the beam to remove the 3.",
              visual: {
                kind: "abacus-anim",
                frames: [[9], [6]],
                captions: ["9 on the rod", "Slide three earth beads off the beam → 6"],
              },
            },
            {
              text: "The heaven bead plus one remaining earth bead shows 6.",
              visual: {
                kind: "abacus-anim",
                frames: [[9], [6]],
                captions: ["Heaven (5) + one earth (1)", "Six left on the rod"],
              },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "7 − 2. Show the difference on the rod.",
        target: 5,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "7 take away 2 is 5.",
              visual: { kind: "abacus", digits: [5] },
            },
            {
              text: "Slide two earth beads away, leaving the heaven bead alone to show 5.",
              visual: {
                kind: "abacus-anim",
                frames: [[7], [5]],
                captions: ["7 on the rod", "Slide two earth beads off the beam → 5"],
              },
            },
          ],
        },
      },
    ],
    borrowing: [
      { type: "heading", text: "Borrowing" },
      {
        type: "paragraph",
        text: "What if the ones rod doesn't have enough beads? Borrow from the tens rod: take 1 ten away, which adds 10 ones' worth to the rod on its right.",
      },
      {
        type: "paragraph",
        text: "For 13 − 5 the ones can't lose 5, so you borrow: the tens rod loses one (13 → 3) and you add the friend of ten back. 13 − 5 = 8.",
        demo: {
          frames: [[3, 1], [8, 0]],
          captions: [
            "Start: 13 (1 ten + 3 ones)",
            "Borrow 1 ten, then 13 − 5 = 8",
          ],
        },
      },
      {
        type: "build",
        prompt: "13 − 5. Show the difference on the abacus.",
        target: 8,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "13 take away 5: the ones rod only has 3, not enough for 5.",
              visual: { kind: "abacus", digits: [3, 1] },
            },
            {
              text: "Borrow 1 ten from the tens rod, leaving the tens rod empty.",
              visual: {
                kind: "abacus-anim",
                frames: [[3, 1], [3, 0]],
                captions: ["13 on the abacus: 1 ten + 3 ones", "Borrow the ten: 3 ones left → 3"],
              },
            },
            {
              text: "Now the ones rod has 13, and 13 - 5 = 8.",
              visual: {
                kind: "abacus-anim",
                frames: [[3, 0], [8, 0]],
                captions: ["Take 5 away from the 13 ones", "3 + 5 = 8, the abacus shows 8"],
              },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "12 − 7. Show the difference on the abacus.",
        target: 5,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "12 take away 7: the ones rod only has 2, not enough for 7.",
              visual: { kind: "abacus", digits: [2, 1] },
            },
            {
              text: "Borrow 1 ten, so the ones rod has 12.",
              visual: {
                kind: "abacus-anim",
                frames: [[2, 1], [2, 0]],
                captions: ["12 on the abacus: 1 ten + 2 ones", "Borrow the ten: 2 ones left → 2"],
              },
            },
            {
              text: "12 - 7 = 5, so the abacus shows 5.",
              visual: {
                kind: "abacus-anim",
                frames: [[2, 0], [5, 0]],
                captions: ["Take 7 away from the 12 ones", "2 + 3 = 5, the abacus shows 5"],
              },
            },
          ],
        },
      },
    ],
    "subtract-two-digit": [
      { type: "heading", text: "Subtracting two-digit numbers" },
      {
        type: "paragraph",
        text: "Subtract place by place from right to left, borrowing from the next rod whenever a place comes up short. Do it on the beads a few times and the pattern sticks forever.",
      },
      {
        type: "build",
        prompt: "52 − 28. Show the difference on the abacus.",
        target: 24,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "52 take away 28: the ones can't lose 8, so borrow from the tens rod.",
              visual: { kind: "abacus", digits: [2, 5] },
            },
            {
              text: "Borrow 1 ten, turning the ones into 12 and the tens into 4.",
              visual: {
                kind: "abacus-anim",
                frames: [[2, 5], [2, 4]],
                captions: ["52 on the abacus: 5 tens + 2 ones", "Borrow the ten: 4 tens and 12 ones to take from"],
              },
            },
            {
              text: "12 - 8 = 4 ones and 4 - 2 = 2 tens, giving 24.",
              visual: {
                kind: "abacus-anim",
                frames: [[2, 4], [4, 2]],
                captions: ["12 − 8 = 4 ones, 4 − 2 = 2 tens", "The abacus shows 24"],
              },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "81 − 36. Show the difference on the abacus.",
        target: 45,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "81 take away 36: the ones can't lose 6, so borrow from the tens rod.",
              visual: { kind: "abacus", digits: [1, 8] },
            },
            {
              text: "Borrow 1 ten, turning the ones into 11 and the tens into 7.",
              visual: {
                kind: "abacus-anim",
                frames: [[1, 8], [1, 7]],
                captions: ["81 on the abacus: 8 tens + 1 one", "Borrow the ten: 7 tens and 11 ones to take from"],
              },
            },
            {
              text: "11 - 6 = 5 ones and 7 - 3 = 4 tens, giving 45.",
              visual: {
                kind: "abacus-anim",
                frames: [[1, 7], [5, 4]],
                captions: ["11 − 6 = 5 ones, 7 − 3 = 4 tens", "The abacus shows 45"],
              },
            },
          ],
        },
      },
    ],
    "subtracting-on-the-beads-check": [
      { type: "heading", text: "Level check" },
      { type: "paragraph", text: "Subtract and borrow your way to the finish." },
      {
        type: "build",
        prompt: "34 − 15. Show the difference on the abacus.",
        target: 19,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "34 take away 15: the ones can't lose 5, so borrow from the tens rod.",
              visual: { kind: "abacus", digits: [4, 3] },
            },
            {
              text: "Borrow 1 ten, turning the ones into 14 and the tens into 2.",
              visual: {
                kind: "abacus-anim",
                frames: [[4, 3], [4, 2]],
                captions: ["34 on the abacus: 3 tens + 4 ones", "Borrow the ten: 2 tens and 14 ones to take from"],
              },
            },
            {
              text: "14 - 5 = 9 ones and 2 - 1 = 1 ten, giving 19.",
              visual: {
                kind: "abacus-anim",
                frames: [[4, 2], [9, 1]],
                captions: ["14 − 5 = 9 ones, 2 − 1 = 1 ten", "The abacus shows 19"],
              },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "40 − 6. Show the difference on the abacus.",
        target: 34,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "40 take away 6: the ones rod is empty, so borrow from the tens rod.",
              visual: { kind: "abacus", digits: [0, 4] },
            },
            {
              text: "Borrow 1 ten, turning the ones into 10 and the tens into 3.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 4], [0, 3]],
                captions: ["40 on the abacus: 4 tens, empty ones", "Borrow the ten: 3 tens and 10 ones to take from"],
              },
            },
            {
              text: "10 - 6 = 4 ones, and the 3 tens remain, giving 34.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 3], [4, 3]],
                captions: ["10 − 6 = 4 ones, 3 tens remain", "The abacus shows 34"],
              },
            },
          ],
        },
      },
    ],
  },

  "beyond-the-beads": {
    "imagine-the-beads": [
      { type: "heading", text: "Imagine the beads" },
      {
        type: "paragraph",
        text: "This is where abacus training becomes superpower: anzan, or mental abacus. With enough practice, your brain keeps a picture of the beads, and you can run calculations on that mental abacus — no frame required.",
      },
      {
        type: "paragraph",
        text: "Start small. Build a number on the real abacus, close your eyes, and try to see it. Then do an addition on the beads once, clear it, and repeat the same moves in your head.",
      },
      {
        type: "build",
        prompt: "Add 23 + 41 in your mind, then show your answer on the abacus.",
        target: 64,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "23 + 41 = 64, so show 6 tens and 4 ones.",
              visual: { kind: "abacus", digits: [4, 6] },
            },
            {
              text: "Set 6 on the tens rod and 4 on the ones rod.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0], [4, 6]],
                captions: ["Empty abacus", "Six tens and four ones → 64"],
              },
            },
          ],
        },
      },
    ],
    "speed-and-focus": [
      { type: "heading", text: "Train for speed" },
      {
        type: "paragraph",
        text: "Competitive abacus students race against the clock. Start with this drill: build a number, clear the board, and build it again until you can do it in under five seconds.",
      },
      {
        type: "paragraph",
        text: "Aim for a few focused minutes every day rather than one long weekly session. Speed comes from clean finger habits and instant bead-reading — exactly what this course has been training.",
      },
      {
        type: "read",
        prompt: "Warm up: what number is on the board?",
        digits: [5, 7, 3],
        choices: [375, 573, 357, 735],
        explanation: {
          steps: [
            {
              text: "The hundreds rod has 3 beads up, worth 300.",
              visual: { kind: "abacus", digits: [0, 0, 3] },
            },
            {
              text: "The tens rod has 7 beads up, worth 70.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 3], [0, 7, 3]],
                captions: ["300 on the hundreds rod", "+7 tens → 370"],
              },
            },
            {
              text: "The ones rod has 5 beads up, so 300 + 70 + 5 = 375.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 7, 3], [5, 7, 3]],
                captions: ["370 so far", "Heaven bead on the ones rod → 375"],
              },
            },
          ],
        },
      },
      {
        type: "build",
        prompt: "Final drill: build 246 on the abacus.",
        target: 246,
        rods: 3,
        explanation: {
          steps: [
            {
              text: "246 is 2 hundreds, 4 tens, and 6 ones.",
              visual: { kind: "abacus", digits: [6, 4, 2] },
            },
            {
              text: "Show 2 on the hundreds rod and 4 on the tens rod.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0], [0, 4, 2]],
                captions: ["Empty abacus", "Two hundreds and four tens → 240"],
              },
            },
            {
              text: "Show 6 on the ones rod to finish 246.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 4, 2], [6, 4, 2]],
                captions: ["240 on the abacus", "Heaven (5) + one earth (1) on the ones rod → 246"],
              },
            },
          ],
        },
      },
    ],
  },
};
