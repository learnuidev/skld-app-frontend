import type { CourseContentMap, LessonBlock } from "./types";

export type { LessonBlock };

export const chineseNumbersContent: CourseContentMap = {
  "number-words": {
    "one-to-ten": [
      {
        id: "one-to-ten",
        type: "heading",
        text: "一 to 十 · One to Ten",
        figure: {
          visual: {
            kind: "diagram",
            name: "numerals",
            numbers: [1, 2, 3],
            labels: ["一", "二", "三"],
          },
          caption: "The first three characters carry as many strokes as the number they name.",
        },
      },
      {
        id: "every-digit-chinese-character",
        type: "paragraph",
        text: "Every digit has its own Chinese character: 一 (1), 二 (2), 三 (3), 四 (4), 五 (5), 六 (6), 七 (7), 八 (8), 九 (9) — and 十 (10) starts the big units. On the abacus each rod holds exactly one digit, so small numbers are just beads on a single rod.",
        demo: {
          frames: [[0], [1], [2], [3]],
          captions: ["0 = 零 líng", "1 = 一 yī", "2 = 二 èr", "3 = 三 sān"],
        },
      },
      {
        id: "read-a-single-rod",
        type: "paragraph",
        text: "To read a single rod, check the heaven bead first. It is worth 五 (5); each earth bead below is worth 一 (1). So the rod shows the heaven bead plus the earth beads touching the beam.",
        demo: {
          frames: [[0], [5], [6], [9]],
          captions: ["0 = 零", "五: the heaven bead alone", "六: heaven + one earth", "九: heaven + all four earth"],
        },
      },
      {
        id: "click-the-beads",
        type: "explore",
        label: "Play: click the beads and watch each number's Chinese name appear.",
        rods: 2,
        initial: [0, 0],
      },
      {
        id: "read-the-rod-seven",
        type: "read",
        prompt: "Read the rod.",
        digits: [7],
        choices: [7, 2, 5, 4],
        explanation: {
          steps: [
            {
              text: "The heaven bead is worth 五 (5).",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
            {
              text: "Two earth beads add 二 (2).",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
            {
              text: "5 + 2 = 七 (7).",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
          ],
        },
      },
      {
        id: "build-eight-on-the-rod",
        type: "build",
        prompt: "Show 八 (8) on the rod.",
        target: 8,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "八 (8) is the heaven bead (五) plus three earth beads (三).",
              visual: {
                kind: "abacus",
                digits: [8],
              },
            },
            {
              text: "Slide the heaven bead down, then push three earth beads up.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [5], [8]],
                captions: ["0", "5", "8"],
                label: "Building eight",
              },
            },
          ],
        },
      },
    ],
    "read-the-rods": [
      {
        id: "read-the-rods",
        type: "heading",
        text: "Read the Rods",
        figure: {
          visual: {
            kind: "diagram",
            name: "one-rod",
            numbers: [7],
          },
          caption: "One heaven bead down and two earth beads up is how this rod shows seven.",
        },
      },
      {
        id: "reading-a-rod-two-questions",
        type: "paragraph",
        text: "Reading a rod is two quick questions: is the heaven bead on the beam (that's 5)? And how many earth beads are touching it? Add the two to get your digit.",
        demo: {
          frames: [[5], [6], [8]],
          captions: ["五 (5): the heaven bead alone", "六 (6): heaven + one earth", "八 (8): heaven + three earth"],
        },
      },
      {
        id: "read-the-rod-three",
        type: "read",
        prompt: "Read the rod.",
        digits: [3],
        choices: [3, 5, 2, 4],
        explanation: {
          steps: [
            {
              text: "Three earth beads are touching the beam.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
            {
              text: "Each earth bead counts as 一 (1), so the rod shows 三 (3).",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
          ],
        },
      },
      {
        id: "read-the-rod-five",
        type: "read",
        prompt: "Read the rod.",
        digits: [5],
        choices: [5, 1, 10, 4],
        explanation: {
          steps: [
            {
              text: "Only the heaven bead is on the beam.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
            {
              text: "A single heaven bead is 五 (5).",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
          ],
        },
      },
      {
        id: "read-the-rod-seven",
        type: "read",
        prompt: "Read the rod.",
        digits: [7],
        choices: [7, 2, 5, 9],
        explanation: {
          steps: [
            {
              text: "The heaven bead is 五 (5).",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
            {
              text: "Two earth beads add 二 (2).",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
            {
              text: "5 + 2 = 七 (7).",
              visual: {
                kind: "abacus",
                digits: [7],
              },
            },
          ],
        },
      },
      {
        id: "read-two-rods-ten",
        type: "read",
        prompt: "This one uses two rods. Read it.",
        digits: [0, 1],
        choices: [10, 1, 11, 5],
        explanation: {
          steps: [
            {
              text: "The tens rod has one bead up: that's 十 (10).",
              visual: {
                kind: "abacus",
                digits: [0, 1],
              },
            },
            {
              text: "The ones rod is empty.",
              visual: {
                kind: "abacus",
                digits: [0, 1],
              },
            },
            {
              text: "10 + 0 = 十 (10).",
              visual: {
                kind: "abacus",
                digits: [0, 1],
              },
            },
          ],
        },
      },
    ],
    "build-the-rods": [
      {
        id: "build-the-rods",
        type: "heading",
        text: "Build the Rods",
        figure: {
          visual: {
            kind: "diagram",
            name: "bead-values",
          },
          caption: "Every bead on the board is worth five or one, and no bead has any other value.",
        },
      },
      {
        id: "to-build-a-number",
        type: "paragraph",
        text: "To build a number, split it into a heaven bead (5) and a handful of earth beads (1). Slide the heaven bead down for the 5, then push up the earth beads you need.",
        demo: {
          frames: [[0], [5], [7]],
          captions: ["0 = 零", "五: slide the heaven bead down", "七: push two earth beads up"],
        },
      },
      {
        id: "build-two-on-the-rod",
        type: "build",
        prompt: "Show 二 (2) on the rod.",
        target: 2,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "2 only needs two earth beads.",
              visual: {
                kind: "abacus",
                digits: [2],
              },
            },
            {
              text: "Push two earth beads up to the beam — that's 二 (2).",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [1], [2]],
                captions: ["0", "1", "2"],
                label: "Building two",
              },
            },
          ],
        },
      },
      {
        id: "build-five-on-the-rod",
        type: "build",
        prompt: "Show 五 (5) on the rod.",
        target: 5,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "五 (5) needs only the heaven bead, which is worth 5 on its own.",
              visual: {
                kind: "abacus",
                digits: [5],
              },
            },
            {
              text: "Slide the heaven bead down and leave the earth beads down.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [5]],
                captions: ["0", "5"],
                label: "Building five",
              },
            },
          ],
        },
      },
      {
        id: "build-six-on-the-rod",
        type: "build",
        prompt: "Show 六 (6) on the rod.",
        target: 6,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "六 (6) is the heaven bead (五) plus one earth bead (一).",
              visual: {
                kind: "abacus",
                digits: [6],
              },
            },
            {
              text: "Slide both to the beam to show 6.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [5], [6]],
                captions: ["0", "5", "6"],
                label: "Building six",
              },
            },
          ],
        },
      },
      {
        id: "build-nine-on-the-rod",
        type: "build",
        prompt: "Show 九 (9) on the rod.",
        target: 9,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "九 (9) is the heaven bead (五) plus all four earth beads (四).",
              visual: {
                kind: "abacus",
                digits: [9],
              },
            },
            {
              text: "5 + 4 = 9, so slide the heaven bead down and all four earth beads up.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [5], [9]],
                captions: ["0", "5", "9"],
                label: "Building nine",
              },
            },
          ],
        },
      },
    ],
    "number-words-check": [
      {
        id: "level-check",
        type: "heading",
        text: "Level check",
        figure: {
          visual: {
            kind: "diagram",
            name: "level-check",
            labels: ["count 一 to 十", "read a rod", "build a rod"],
          },
          caption: "Nothing here goes past ten, so every answer fits on a single rod.",
        },
      },
      {
        id: "read-then-build-it",
        type: "paragraph",
        text: "Read it, then build it. Solve every question to finish.",
        figure: {
          visual: {
            kind: "diagram",
            name: "board-vs-numeral",
            numbers: [8],
          },
          caption: "On one rod, eight is one heaven bead and three earth beads.",
        },
      },
      {
        id: "check-read-the-rod-four",
        type: "read",
        prompt: "What number is this rod?",
        digits: [4],
        choices: [4, 5, 3, 9],
        explanation: {
          steps: [
            {
              text: "Four earth beads are touching the beam.",
              visual: {
                kind: "abacus",
                digits: [4],
              },
            },
            {
              text: "Each counts as 一, so the rod shows 四 (4).",
              visual: {
                kind: "abacus",
                digits: [4],
              },
            },
          ],
        },
      },
      {
        id: "check-build-eight",
        type: "build",
        prompt: "Show 八 (8) on the rod.",
        target: 8,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "八 (8) is the heaven bead (五) plus three earth beads (三).",
              visual: {
                kind: "abacus",
                digits: [8],
              },
            },
            {
              text: "Slide the heaven bead down, then push three earth beads up.",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [5], [8]],
                captions: ["0", "5", "8"],
                label: "Building eight",
              },
            },
          ],
        },
      },
      {
        id: "check-read-two-rods-ten",
        type: "read",
        prompt: "Two rods — what number is this?",
        digits: [0, 1],
        choices: [10, 1, 11, 101],
        explanation: {
          steps: [
            {
              text: "The tens rod shows one bead, worth 十 (10).",
              visual: {
                kind: "abacus",
                digits: [0, 1],
              },
            },
            {
              text: "The ones rod is empty.",
              visual: {
                kind: "abacus",
                digits: [0, 1],
              },
            },
            {
              text: "10 + 0 = 十 (10).",
              visual: {
                kind: "abacus",
                digits: [0, 1],
              },
            },
          ],
        },
      },
      {
        id: "check-build-three",
        type: "build",
        prompt: "Show 三 (3) on the rod.",
        target: 3,
        rods: 1,
        explanation: {
          steps: [
            {
              text: "三 needs three earth beads, each worth 一.",
              visual: {
                kind: "abacus",
                digits: [3],
              },
            },
            {
              text: "Push three beads up to the beam to show 三 (3).",
              visual: {
                kind: "abacus-anim",
                frames: [[0], [1], [2], [3]],
                captions: ["0", "1", "2", "3"],
                label: "Building three",
              },
            },
          ],
        },
      },
    ],
  },

  "tens-hundreds-thousands": {
    tens: [
      {
        id: "tens-overview",
        type: "heading",
        text: "十 · Tens",
        figure: {
          visual: {
            kind: "diagram",
            name: "two-rods",
            numbers: [0, 1],
          },
          caption: "Ten lives on a rod of its own, and the ones rod stays empty.",
        },
      },
      {
        id: "shi-means-ten",
        type: "paragraph",
        text: "十 (shí) means ten, and it is one of the two big-unit characters. To write a two-digit number you put a digit, then 十, then the ones digit: 21 = 二十一 (èr shí yī). The pattern is [digit]十[digit].",
        figure: {
          visual: {
            kind: "diagram",
            name: "two-rods",
            numbers: [1, 2],
          },
          caption: "The left rod carries the 二 and the right rod carries the 一, with 十 between them.",
        },
      },
      {
        id: "ten-to-nineteen",
        type: "paragraph",
        text: "For ten to nineteen, drop the little 一 at the front. 11 = 十一 (shí yī) — literally \"ten one\". And 10 is simply 十, never 一十.",
        demo: {
          frames: [[0, 0], [0, 1], [3, 2]],
          captions: ["0 = 零", "十 (10): one bead on the tens rod", "二十三 (23): 2 tens + 3 ones"],
        },
      },
      {
        id: "build-twenty-three",
        type: "build",
        prompt: "Build 二十三 (23).",
        target: 23,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "23 is 2 tens and 3 ones → 二十三 (èr shí sān).",
              visual: {
                kind: "abacus",
                digits: [3, 2],
              },
            },
            {
              text: "Put 2 on the tens rod.",
              visual: {
                kind: "abacus",
                digits: [0, 2],
              },
            },
            {
              text: "Put 3 on the ones rod, and the abacus shows 23.",
              visual: {
                kind: "abacus",
                digits: [3, 2],
              },
            },
          ],
        },
      },
      {
        id: "read-twenty-five",
        type: "read",
        prompt: "Read this two-rod number.",
        digits: [5, 2],
        choices: [25, 52, 205, 27],
        explanation: {
          steps: [
            {
              text: "The tens rod shows 2, worth 二十 (20).",
              visual: {
                kind: "abacus",
                digits: [0, 2],
              },
            },
            {
              text: "The ones rod shows 5, worth 五 (5).",
              visual: {
                kind: "abacus",
                digits: [5, 2],
              },
            },
            {
              text: "20 + 5 = 二十五 (25).",
              visual: {
                kind: "abacus",
                digits: [5, 2],
              },
            },
          ],
        },
      },
      {
        id: "build-forty-seven",
        type: "build",
        prompt: "Build 四十七 (47).",
        target: 47,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "47 is 4 tens and 7 ones → 四十七 (sì shí qī).",
              visual: {
                kind: "abacus",
                digits: [7, 4],
              },
            },
            {
              text: "Show 4 on the tens rod.",
              visual: {
                kind: "abacus",
                digits: [0, 4],
              },
            },
            {
              text: "Show 7 on the ones rod (heaven + 2 earth).",
              visual: {
                kind: "abacus",
                digits: [7, 4],
              },
            },
          ],
        },
      },
    ],
    hundreds: [
      {
        id: "hundreds-overview",
        type: "heading",
        text: "百 · Hundreds",
        figure: {
          visual: {
            kind: "diagram",
            name: "number-line",
            numbers: [100, 200, 300],
          },
          caption: "Each mark is one more hundred, and the line keeps going that way.",
        },
      },
      {
        id: "bai-means-hundred",
        type: "paragraph",
        text: "百 (bǎi) means a hundred. 100 = 一百 (yī bǎi). Read a three-digit number by splitting it into hundreds, tens and ones: 321 = 三百二十一 (sān bǎi èr shí yī).",
        demo: {
          frames: [[0, 0, 0], [0, 0, 1], [4, 3, 2]],
          captions: ["0 = 零", "一百 (100): one bead on the hundreds rod", "二百三十四 (234): 2 hundreds + 3 tens + 4 ones"],
        },
      },
      {
        id: "build-two-hundred-forty-six",
        type: "build",
        prompt: "Build 二百四十六 (246).",
        target: 246,
        rods: 3,
        explanation: {
          steps: [
            {
              text: "246 is 2 hundreds, 4 tens and 6 ones.",
              visual: {
                kind: "abacus",
                digits: [6, 4, 2],
              },
            },
            {
              text: "Show 2 on the hundreds rod, 4 on the tens rod, 6 on the ones rod.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0], [0, 0, 2], [0, 4, 2], [6, 4, 2]],
                captions: ["0", "200", "240", "246"],
                label: "Building 246",
              },
            },
          ],
        },
      },
      {
        id: "read-three-hundred-forty-six",
        type: "read",
        prompt: "Read this three-rod number.",
        digits: [6, 4, 3],
        choices: [346, 643, 364, 3046],
        explanation: {
          steps: [
            {
              text: "The hundreds rod shows 3, worth 三百 (300).",
              visual: {
                kind: "abacus",
                digits: [0, 0, 3],
              },
            },
            {
              text: "The tens rod shows 4 (四十) and the ones rod shows 6 (六).",
              visual: {
                kind: "abacus",
                digits: [6, 4, 3],
              },
            },
            {
              text: "300 + 40 + 6 = 三百四十六 (346).",
              visual: {
                kind: "abacus",
                digits: [6, 4, 3],
              },
            },
          ],
        },
      },
      {
        id: "read-five-hundred-empty-rods",
        type: "read",
        prompt: "This one has empty rods. Read it.",
        digits: [0, 0, 5],
        choices: [500, 5, 50, 505],
        explanation: {
          steps: [
            {
              text: "The hundreds rod shows 5, worth 五百 (500).",
              visual: {
                kind: "abacus",
                digits: [0, 0, 5],
              },
            },
            {
              text: "The tens and ones rods are empty.",
              visual: {
                kind: "diagram",
                name: "zero-rod",
                numbers: [0, 0, 5],
              },
            },
            {
              text: "So the number is 五百 (500).",
              visual: {
                kind: "abacus",
                digits: [0, 0, 5],
              },
            },
          ],
        },
      },
    ],
    thousands: [
      {
        id: "thousands-overview",
        type: "heading",
        text: "千 · Thousands",
        figure: {
          visual: {
            kind: "diagram",
            name: "image-to-number",
            numbers: [8, 7, 6, 5],
          },
          caption: "Four rods of beads on one side spell 5678 on the other.",
        },
      },
      {
        id: "qian-means-thousand",
        type: "paragraph",
        text: "千 (qiān) means a thousand. 1000 = 一千 (yī qiān). For four-digit numbers, read thousands first, then hundreds, tens and ones: 5678 = 五千六百七十八 (wǔ qiān liù bǎi qī shí bā).",
        demo: {
          frames: [[0, 0, 0, 0], [0, 0, 0, 1], [8, 7, 6, 5]],
          captions: ["0 = 零", "一千 (1000): one bead on the thousands rod", "五千六百七十八 (5678)"],
        },
      },
      {
        id: "build-five-six-seven-eight",
        type: "build",
        prompt: "Build 五千六百七十八 (5678).",
        target: 5678,
        rods: 4,
        explanation: {
          steps: [
            {
              text: "5678 is 5 thousands, 6 hundreds, 7 tens and 8 ones.",
              visual: {
                kind: "abacus",
                digits: [8, 7, 6, 5],
              },
            },
            {
              text: "Set the four rods left to right: 5, 6, 7, 8.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0, 0], [0, 0, 0, 5], [0, 0, 6, 5], [0, 7, 6, 5], [8, 7, 6, 5]],
                captions: ["0", "5000", "5600", "5670", "5678"],
                label: "Building 5678",
              },
            },
          ],
        },
      },
      {
        id: "read-six-five-four-three",
        type: "read",
        prompt: "Read this four-rod number.",
        digits: [3, 4, 5, 6],
        choices: [6543, 3456, 6345, 60543],
        explanation: {
          steps: [
            {
              text: "The thousands rod shows 6, worth 六千 (6000).",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 6],
              },
            },
            {
              text: "Then 5 hundreds (五百), 4 tens (四十), 3 ones (三).",
              visual: {
                kind: "abacus",
                digits: [3, 4, 5, 6],
              },
            },
            {
              text: "6000 + 500 + 40 + 3 = 六千五百四十三 (6543).",
              visual: {
                kind: "abacus",
                digits: [3, 4, 5, 6],
              },
            },
          ],
        },
      },
      {
        id: "read-two-thousand",
        type: "read",
        prompt: "Read this four-rod number.",
        digits: [0, 0, 0, 2],
        choices: [2000, 2, 200, 20000],
        explanation: {
          steps: [
            {
              text: "The thousands rod shows 2, worth 二千 (2000).",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 2],
              },
            },
            {
              text: "The other three rods are empty.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 2],
              },
            },
            {
              text: "So the number is 二千 (2000).",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 2],
              },
            },
          ],
        },
      },
    ],
    zero: [
      {
        id: "zero-overview",
        type: "heading",
        text: "零 · The Zero",
        figure: {
          visual: {
            kind: "diagram",
            name: "zero-rod",
            numbers: [5, 0, 1],
          },
          caption: "The bare rod in the middle is where 零 goes when the number is written.",
        },
      },
      {
        id: "when-a-place-is-empty",
        type: "paragraph",
        text: "When a place has nothing in it, keep its spot and write 零 (líng) once for the whole empty stretch. 105 is 一百零五 (yī bǎi líng wǔ), never 一百五. The empty rod on the abacus is exactly that zero.",
        demo: {
          frames: [[0, 0, 0], [5, 0, 1]],
          captions: ["0 = 零", "一百零五 (105): the empty tens rod is 零"],
        },
      },
      {
        id: "one-zero-covers-empty-places",
        type: "paragraph",
        text: "One 零 covers the whole run of empty places, however long. 1001 = 一千零一 (yī qiān líng yī): the empty hundreds and tens rods together are just one 零.",
        demo: {
          frames: [[0, 0, 0, 0], [1, 0, 0, 1]],
          captions: ["0 = 零", "一千零一 (1001): one 零 bridges the empty middle"],
        },
      },
      {
        id: "read-hundred-zero-five",
        type: "read",
        prompt: "Read this number.",
        digits: [5, 0, 1],
        choices: [105, 15, 150, 1005],
        explanation: {
          steps: [
            {
              text: "The hundreds rod shows 1 (一百).",
              visual: {
                kind: "abacus",
                digits: [0, 0, 1],
              },
            },
            {
              text: "The tens rod is empty → 零.",
              visual: {
                kind: "diagram",
                name: "zero-in-group",
                numbers: [5, 0, 1],
              },
            },
            {
              text: "So 105 = 一百零五 (yī bǎi líng wǔ).",
              visual: {
                kind: "abacus",
                digits: [5, 0, 1],
              },
            },
          ],
        },
      },
      {
        id: "read-thousand-zero-two",
        type: "read",
        prompt: "Read this number.",
        digits: [2, 0, 0, 1],
        choices: [1002, 120, 102, 2100],
        explanation: {
          steps: [
            {
              text: "The thousands rod shows 1 (一千).",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 1],
              },
            },
            {
              text: "The hundreds and tens rods are both empty, so one 零 bridges them.",
              visual: {
                kind: "diagram",
                name: "zero-in-group",
                numbers: [2, 0, 0, 1],
              },
            },
            {
              text: "1002 = 一千零二 (yī qiān líng èr).",
              visual: {
                kind: "abacus",
                digits: [2, 0, 0, 1],
              },
            },
          ],
        },
      },
      {
        id: "build-thousand-zero-one",
        type: "build",
        prompt: "Build 一千零一 (1001).",
        target: 1001,
        rods: 4,
        explanation: {
          steps: [
            {
              text: "1001 is one thousand and one, with the middle two places empty.",
              visual: {
                kind: "diagram",
                name: "zero-in-group",
                numbers: [1, 0, 0, 1],
              },
            },
            {
              text: "Put 1 on the thousands rod and 1 on the ones rod.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0, 0], [0, 0, 0, 1], [1, 0, 0, 1]],
                captions: ["0", "1000", "1001"],
                label: "Building 1001",
              },
            },
            {
              text: "Leave the hundreds and tens rods empty — that's the 零.",
              visual: {
                kind: "abacus",
                digits: [1, 0, 0, 1],
              },
            },
          ],
        },
      },
    ],
    "tens-hundreds-thousands-check": [
      {
        id: "level-check",
        type: "heading",
        text: "Level check",
        figure: {
          visual: {
            kind: "diagram",
            name: "level-check",
            labels: ["十 百 千", "read a number", "build a number"],
          },
          caption: "Three units, three rods, and this check walks up them one at a time.",
        },
      },
      {
        id: "build-and-read-units",
        type: "paragraph",
        text: "Build and read your way through ten, hundred and thousand.",
        figure: {
          visual: {
            kind: "diagram",
            name: "place-value",
            numbers: [0, 0, 0, 1],
            labels: ["个", "十", "百", "千"],
          },
          caption: "The 1 of 1000 stands three places left of the ones, with empty rods behind it.",
        },
      },
      {
        id: "check-build-twenty-eight",
        type: "build",
        prompt: "Build 二十八 (28).",
        target: 28,
        rods: 2,
        explanation: {
          steps: [
            {
              text: "28 is 2 tens and 8 ones → 二十八 (èr shí bā).",
              visual: {
                kind: "abacus",
                digits: [8, 2],
              },
            },
            {
              text: "Show 2 on the tens rod and 8 on the ones rod.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0], [0, 2], [8, 2]],
                captions: ["0", "20", "28"],
                label: "Building 28",
              },
            },
          ],
        },
      },
      {
        id: "check-read-hundred-twenty",
        type: "read",
        prompt: "Read this three-rod number.",
        digits: [0, 2, 1],
        choices: [120, 210, 12, 102],
        explanation: {
          steps: [
            {
              text: "The hundreds rod shows 1 (一百).",
              visual: {
                kind: "abacus",
                digits: [0, 0, 1],
              },
            },
            {
              text: "The tens rod shows 2 (二十) and the ones rod is empty.",
              visual: {
                kind: "abacus",
                digits: [0, 2, 1],
              },
            },
            {
              text: "120 = 一百二十 (yī bǎi èr shí).",
              visual: {
                kind: "abacus",
                digits: [0, 2, 1],
              },
            },
          ],
        },
      },
      {
        id: "check-build-three-zero-six",
        type: "build",
        prompt: "Build 三百零六 (306).",
        target: 306,
        rods: 3,
        explanation: {
          steps: [
            {
              text: "306 is 3 hundreds, 0 tens and 6 ones.",
              visual: {
                kind: "abacus",
                digits: [6, 0, 3],
              },
            },
            {
              text: "Show 3 on the hundreds rod and 6 on the ones rod.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0], [0, 0, 3], [6, 0, 3]],
                captions: ["0", "300", "306"],
                label: "Building 306",
              },
            },
            {
              text: "The empty tens rod is 零 → 三百零六.",
              visual: {
                kind: "abacus",
                digits: [6, 0, 3],
              },
            },
          ],
        },
      },
      {
        id: "check-read-thousand-four",
        type: "read",
        prompt: "Read this four-rod number.",
        digits: [4, 0, 0, 1],
        choices: [1004, 104, 1400, 4001],
        explanation: {
          steps: [
            {
              text: "The thousands rod shows 1 (一千).",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 1],
              },
            },
            {
              text: "The hundreds and tens rods are empty → one 零.",
              visual: {
                kind: "diagram",
                name: "zero-in-group",
                numbers: [4, 0, 0, 1],
              },
            },
            {
              text: "1004 = 一千零四 (yī qiān líng sì).",
              visual: {
                kind: "abacus",
                digits: [4, 0, 0, 1],
              },
            },
          ],
        },
      },
    ],
  },

  "the-myriad": {
    "why-wan": [
      {
        id: "why-wan",
        type: "heading",
        text: "Why 万?",
        figure: {
          visual: {
            kind: "diagram",
            name: "wan",
            numbers: [10000],
          },
          caption: "Count the four zeros behind the 1 — that row of zeros is what 万 covers.",
        },
      },
      {
        id: "west-groups-by-thousands",
        type: "paragraph",
        text: "In the West, numbers are grouped by thousands: 10,000 is \"ten thousand\". Chinese groups by ten-thousands instead. The unit is 万 (wàn), and it is the pivot of the whole system: after 千 (thousand) the next big unit is not a phrase but its own character, 万.",
        figure: {
          visual: {
            kind: "diagram",
            name: "groups-of-four",
            numbers: [0, 0, 0, 0, 1],
          },
          caption: "Read in fours from the right and the lone 1 lands in the 万 group.",
        },
      },
      {
        id: "wan-on-the-fifth-rod",
        type: "paragraph",
        text: "So 10,000 = 一万 (yī wàn), 100,000 = 十万 (shí wàn), 1,000,000 = 一百万 (yī bǎi wàn). On the abacus, 万 arrives on the fifth rod: 个, 十, 百, 千, 万.",
        demo: {
          frames: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 1]],
          captions: ["0 = 零", "一万 (10,000): one bead on the fifth rod"],
        },
      },
      {
        id: "quiz-wan-value",
        type: "quiz",
        prompt: "万 (wàn) is worth which number?",
        choices: [1000, 10000, 100000, 100],
        answer: 10000,
        explanation: {
          steps: [
            {
              text: "万 = 10⁴ = 10,000.",
              visual: {
                kind: "diagram",
                name: "wan",
                numbers: [10000],
              },
            },
            {
              text: "It's a group of ten thousand — the pivot of the Chinese system.",
              visual: {
                kind: "diagram",
                name: "unit-ladder",
                labels: ["个", "十", "百", "千", "万"],
              },
            },
          ],
        },
      },
      {
        id: "read-wan-rod-ten-thousand",
        type: "read",
        prompt: "The fifth rod is 万. What number is shown?",
        digits: [0, 0, 0, 0, 1],
        choices: [10000, 1000, 100000, 100000000],
        explanation: {
          steps: [
            {
              text: "One bead on the 万 rod (the fifth rod).",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 1],
              },
            },
            {
              text: "That bead is worth 一万 (10,000).",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 1],
              },
            },
          ],
        },
      },
    ],
    "wan-family": [
      {
        id: "the-wan-family",
        type: "heading",
        text: "The 万 Family",
        figure: {
          visual: {
            kind: "diagram",
            name: "wan",
            numbers: [100000],
          },
          caption: "The unit 万 stays the same; only the number in front of it changes.",
        },
      },
      {
        id: "once-wan-is-your-unit",
        type: "paragraph",
        text: "Once 万 is your unit, the family is easy: 一万 (10,000), 十万 (100,000), 一百万 (1,000,000), 一千万 (10,000,000). The same digits 一, 十, 百, 千 come first, and 万 comes last as the unit.",
        demo: {
          frames: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 1], [0, 0, 0, 0, 2], [0, 0, 0, 0, 3]],
          captions: ["0 = 零", "一万 (10,000): one bead on the 万 rod", "二万 (20,000)", "三万 (30,000)"],
        },
      },
      {
        id: "powers-of-wan-list",
        type: "list",
        items: [
          "一万 (yī wàn) = 10,000",
          "十万 (shí wàn) = 100,000",
          "一百万 (yī bǎi wàn) = 1,000,000",
          "一千万 (yī qiān wàn) = 10,000,000",
        ],
        figure: {
          visual: {
            kind: "diagram",
            name: "unit-ladder",
            labels: ["万", "十万", "百万", "千万"],
          },
          caption: "Every rung is 万 with a number in front, and ten moves you one rung up.",
        },
      },
      {
        id: "read-four-wan",
        type: "read",
        prompt: "Read the 万 rod.",
        digits: [0, 0, 0, 0, 4],
        choices: [40000, 4000, 400000, 40000000],
        explanation: {
          steps: [
            {
              text: "Four beads on the 万 rod.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 4],
              },
            },
            {
              text: "Each is worth 一万, so four are 四万 (40,000).",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 4],
              },
            },
          ],
        },
      },
      {
        id: "build-five-wan",
        type: "build",
        prompt: "Build 五万 (50,000).",
        target: 50000,
        rods: 5,
        explanation: {
          steps: [
            {
              text: "50,000 is 5 groups of ten thousand → 五万 (wǔ wàn).",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 5],
              },
            },
            {
              text: "Put 5 on the 万 rod (the fifth rod).",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 5]],
                captions: ["0", "50000"],
                label: "Building 50,000",
              },
            },
            {
              text: "Leave the other four rods empty.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 5],
              },
            },
          ],
        },
      },
      {
        id: "quiz-ten-wan",
        type: "quiz",
        prompt: "十万 (shí wàn) is which number?",
        choices: [10000, 100000, 1000000, 10],
        answer: 100000,
        explanation: {
          steps: [
            {
              text: "十万 = 10 × 万.",
              visual: {
                kind: "diagram",
                name: "wan",
                numbers: [100000],
              },
            },
            {
              text: "10 × 10,000 = 100,000.",
              visual: {
                kind: "diagram",
                name: "unit-ladder",
                labels: ["万", "十万"],
              },
            },
          ],
        },
      },
      {
        id: "quiz-thousand-wan",
        type: "quiz",
        prompt: "一千万 (yī qiān wàn) is which number?",
        choices: [1000000, 10000000, 100000000, 100000],
        answer: 10000000,
        explanation: {
          steps: [
            {
              text: "一千万 = 1000 × 万.",
              visual: {
                kind: "diagram",
                name: "wan",
                numbers: [10000000],
              },
            },
            {
              text: "1000 × 10,000 = 10,000,000.",
              visual: {
                kind: "diagram",
                name: "unit-ladder",
                labels: ["万", "十万", "百万", "千万"],
              },
            },
          ],
        },
      },
    ],
    "compose-wan": [
      {
        id: "compose-a-myriad-number",
        type: "heading",
        text: "Compose a Myriad Number",
        figure: {
          visual: {
            kind: "diagram",
            name: "big-board",
            numbers: [5, 4, 3, 2, 1],
          },
          caption: "On the board 12345 takes five rods, and the top rod is the 万 rod.",
        },
      },
      {
        id: "wan-part-then-the-rest",
        type: "paragraph",
        text: "Any number under 100 million is two pieces: the 万 part, then the rest. Read the 万 part as its own number and tag 万 on the end, then read whatever is left under 10,000. 12,345 = 一万 + 2345 = 一万二千三百四十五 (yī wàn èr qiān sān bǎi sì shí wǔ).",
        demo: {
          frames: [[0, 0, 0, 0, 0], [5, 4, 3, 2, 1]],
          captions: ["0 = 零", "一万二千三百四十五 (12,345): 万 part + the rest"],
        },
      },
      {
        id: "read-twelve-thousand",
        type: "read",
        prompt: "Read this five-rod number.",
        digits: [5, 4, 3, 2, 1],
        choices: [12345, 54321, 10203, 2345],
        explanation: {
          steps: [
            {
              text: "The 万 rod shows 1 → 一万.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 1],
              },
            },
            {
              text: "The rest, 2345, reads 二千三百四十五.",
              visual: {
                kind: "abacus",
                digits: [5, 4, 3, 2, 1],
              },
            },
            {
              text: "Together: 一万二千三百四十五 (12,345).",
              visual: {
                kind: "abacus",
                digits: [5, 4, 3, 2, 1],
              },
            },
          ],
        },
      },
      {
        id: "build-twenty-three-thousand",
        type: "build",
        prompt: "Build 二万三千四百五十六 (23,456).",
        target: 23456,
        rods: 5,
        explanation: {
          steps: [
            {
              text: "23,456 splits as 2 万 + 3456.",
              visual: {
                kind: "abacus",
                digits: [6, 5, 4, 3, 2],
              },
            },
            {
              text: "Put 2 on the 万 rod, then 3456 on the four lower rods.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 2], [6, 5, 4, 3, 2]],
                captions: ["0", "20000", "23456"],
                label: "Building 23,456",
              },
            },
          ],
        },
      },
      {
        id: "read-thirty-four-thousand",
        type: "read",
        prompt: "Read this five-rod number.",
        digits: [0, 6, 5, 4, 3],
        choices: [34560, 3456, 35460, 304560],
        explanation: {
          steps: [
            {
              text: "The 万 rod shows 3 → 三万.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 3],
              },
            },
            {
              text: "The rest, 4560, reads 四千五百六十.",
              visual: {
                kind: "abacus",
                digits: [0, 6, 5, 4, 3],
              },
            },
            {
              text: "Together: 三万四千五百六十 (34,560).",
              visual: {
                kind: "abacus",
                digits: [0, 6, 5, 4, 3],
              },
            },
          ],
        },
      },
      {
        id: "build-forty-five-thousand",
        type: "build",
        prompt: "Build 四万五千 (45,000).",
        target: 45000,
        rods: 5,
        explanation: {
          steps: [
            {
              text: "45,000 splits as 4 万 + 5 千.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 5, 4],
              },
            },
            {
              text: "Put 4 on the 万 rod and 5 on the thousands rod.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 4], [0, 0, 0, 5, 4]],
                captions: ["0", "40000", "45000"],
                label: "Building 45,000",
              },
            },
          ],
        },
      },
    ],
    "the-myriad-check": [
      {
        id: "level-check",
        type: "heading",
        text: "Level check",
        figure: {
          visual: {
            kind: "diagram",
            name: "level-check",
            labels: ["count in 万", "read 万 numbers", "build 万 numbers"],
          },
          caption: "Every answer in this check runs into the ten-thousands, so 万 appears in each one.",
        },
      },
      {
        id: "read-and-build-wan-numbers",
        type: "paragraph",
        text: "Read and build numbers built on 万.",
        figure: {
          visual: {
            kind: "abacus",
            digits: [1, 2, 3, 4, 5],
          },
          caption: "The fifth rod from the right is the 万 rod, and its beads say how many 万 you have.",
        },
      },
      {
        id: "check-build-twelve-thousand",
        type: "build",
        prompt: "Build 一万二千三百 (12,300).",
        target: 12300,
        rods: 5,
        explanation: {
          steps: [
            {
              text: "12,300 splits as 1 万 + 2300.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 3, 2, 1],
              },
            },
            {
              text: "Put 1 on the 万 rod, then 2 on the thousands and 3 on the hundreds rods.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 1], [0, 0, 3, 2, 1]],
                captions: ["0", "10000", "12300"],
                label: "Building 12,300",
              },
            },
          ],
        },
      },
      {
        id: "check-read-wan-zero-five",
        type: "read",
        prompt: "Read this five-rod number.",
        digits: [5, 0, 0, 0, 2],
        choices: [20005, 205, 2005, 2000005],
        explanation: {
          steps: [
            {
              text: "The 万 rod shows 2 → 二万.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 2],
              },
            },
            {
              text: "The lower four rods are empty except the ones rod, which shows 5.",
              visual: {
                kind: "abacus",
                digits: [5, 0, 0, 0, 2],
              },
            },
            {
              text: "One 零 bridges: 二万零五 (20,005).",
              visual: {
                kind: "abacus",
                digits: [5, 0, 0, 0, 2],
              },
            },
          ],
        },
      },
      {
        id: "check-build-ninety-nine-thousand",
        type: "build",
        prompt: "Build 九万九千九百九十九 (99,999).",
        target: 99999,
        rods: 5,
        explanation: {
          steps: [
            {
              text: "99,999 fills every rod: 九万九千九百九十九.",
              visual: {
                kind: "abacus",
                digits: [9, 9, 9, 9, 9],
              },
            },
            {
              text: "Set 9 on all five rods.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 9], [0, 0, 0, 9, 9], [9, 9, 9, 9, 9]],
                captions: ["0", "90000", "99000", "99999"],
                label: "Building 99,999",
              },
            },
          ],
        },
      },
    ],
  },

  "yi-and-zhao": {
    yi: [
      {
        id: "yi-overview",
        type: "heading",
        text: "亿 · One Hundred Million",
        figure: {
          visual: {
            kind: "abacus",
            digits: [0, 0, 0, 0, 0, 0, 0, 0, 1],
          },
          caption: "Rods are counted from the right, and the ninth one is the 亿 rod.",
        },
      },
      {
        id: "yi-on-the-ninth-rod",
        type: "paragraph",
        text: "亿 (yì) is 100,000,000 — a group of ten thousand 万. It arrives on the ninth rod: 个, 十, 百, 千, 万, 十万, 百万, 千万, 亿.",
        demo: {
          frames: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 1], [0, 0, 0, 0, 9]],
          captions: ["0 = 零", "一万: one bead on the 万 rod", "九万 — keep sliding left and you reach 亿, the ninth rod"],
        },
      },
      {
        id: "past-hundred-million-chunks",
        type: "paragraph",
        text: "100,000,000 = 一亿 (yī yì). Past a hundred million, a number reads in chunks: the 亿 part first, then the 万 part, then the rest. 1,2345,6789 = 一亿 二千三百四十五万 六千七百八十九.",
        figure: {
          visual: {
            kind: "diagram",
            name: "groups-of-four",
            numbers: [0, 9, 8, 7, 6, 5],
          },
          caption: "Two chunks meet here: the 万 part first, then the 7890 that follows it.",
        },
      },
      {
        id: "quiz-yi-value",
        type: "quiz",
        prompt: "亿 (yì) is worth which number?",
        choices: [10000, 100000000, 10000000, 1000000000],
        answer: 100000000,
        explanation: {
          steps: [
            {
              text: "亿 = 10⁸ = 100,000,000.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 0, 0, 0, 0, 1],
              },
            },
            {
              text: "It's a group of ten thousand 万.",
              visual: {
                kind: "diagram",
                name: "unit-ladder",
                labels: ["万", "亿"],
                named: false,
              },
            },
          ],
        },
      },
      {
        id: "quiz-wan-per-yi",
        type: "quiz",
        prompt: "How many 万 make one 亿?",
        choices: [10, 100, 1000, 10000],
        answer: 10000,
        explanation: {
          steps: [
            {
              text: "一亿 = 100,000,000.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 0, 0, 0, 0, 1],
              },
            },
            {
              text: "100,000,000 ÷ 10,000 = 10,000 万.",
              visual: {
                kind: "diagram",
                name: "groups-of-four",
                numbers: [0, 0, 0, 0, 1],
              },
            },
            {
              text: "So 一亿 = 一万个万 (ten thousand 万).",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["一万个万 = 一亿"],
                named: false,
              },
            },
          ],
        },
      },
      {
        id: "quiz-five-yi",
        type: "quiz",
        prompt: "Which number is 五亿 (wǔ yì)?",
        choices: [500000000, 5000000, 500000, 50000000],
        answer: 500000000,
        explanation: {
          steps: [
            {
              text: "五亿 = 5 × 亿.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 0, 0, 0, 0, 5],
              },
            },
            {
              text: "5 × 100,000,000 = 500,000,000.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 0, 0, 0, 0, 5],
              },
            },
          ],
        },
      },
      {
        id: "read-all-nines",
        type: "read",
        prompt: "Read the number on these five rods.",
        digits: [9, 9, 9, 9, 9],
        choices: [99999, 9999, 999, 999999],
        explanation: {
          steps: [
            {
              text: "Every rod is full: 九万九千九百九十九 (99,999).",
              visual: {
                kind: "abacus",
                digits: [9, 9, 9, 9, 9],
              },
            },
            {
              text: "Keep sliding to the left and the rods name 十万, 百万, 千万, then 亿.",
              visual: {
                kind: "diagram",
                name: "unit-ladder",
                labels: ["万", "十万", "百万", "千万", "亿"],
                named: false,
              },
            },
          ],
        },
      },
      {
        id: "build-five-wan",
        type: "build",
        prompt: "Build 五万 (50,000).",
        target: 50000,
        rods: 5,
        explanation: {
          steps: [
            {
              text: "50,000 is 5 on the 万 rod.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 5],
              },
            },
            {
              text: "That's 五万 — and the same pattern continues to the left up to 亿.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 1], [0, 0, 0, 0, 5]],
                captions: ["0", "10000", "50000"],
                label: "Building 50,000",
              },
            },
          ],
        },
      },
    ],
    zhao: [
      {
        id: "zhao-overview",
        type: "heading",
        text: "兆 · One Trillion",
        figure: {
          visual: {
            kind: "diagram",
            name: "unit-ladder",
            labels: ["万", "亿", "兆"],
            named: false,
          },
          caption: "兆 is the third name on this ladder, ten thousand times the one below it.",
        },
      },
      {
        id: "zhao-one-trillion",
        type: "paragraph",
        text: "兆 (zhào) is 1,000,000,000,000 — one trillion, the top of this course. It is a group of ten thousand 亿, and the old saying puts it plainly: 万亿为兆, \"ten-thousand 亿 make a 兆\".",
        figure: {
          visual: {
            kind: "diagram",
            name: "koujue",
            labels: ["万亿为兆"],
          },
          caption: "Four characters say the whole relation: ten thousand 亿 make one 兆.",
        },
      },
      {
        id: "zhao-four-places-left",
        type: "paragraph",
        text: "On the number line, 亿 is at 10⁸ and 兆 is at 10¹² — exactly four more places, the next group of four. Read from the biggest unit down: 兆, then 亿, then 万, then the rest.",
        demo: {
          frames: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 1], [0, 0, 0, 0, 2]],
          captions: ["0 = 零", "一万: the 万 rod", "二万 — jump left by groups of four to reach 亿, then 兆"],
        },
      },
      {
        id: "quiz-zhao-value",
        type: "quiz",
        prompt: "兆 (zhào) is worth which number?",
        choices: [100000000000, 1000000000, 1000000000000, 1000000],
        answer: 1000000000000,
        explanation: {
          steps: [
            {
              text: "兆 = 10¹² = 1,000,000,000,000.",
              visual: {
                kind: "diagram",
                name: "unit-ladder",
                labels: ["个", "万", "亿", "兆"],
                named: false,
              },
            },
            {
              text: "That's one trillion.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["万亿为兆"],
                named: false,
              },
            },
          ],
        },
      },
      {
        id: "quiz-yi-per-zhao",
        type: "quiz",
        prompt: "How many 亿 make one 兆?",
        choices: [10, 100, 1000, 10000],
        answer: 10000,
        explanation: {
          steps: [
            {
              text: "万亿为兆: one 兆 = 一万 亿.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["万亿为兆"],
                named: false,
              },
            },
            {
              text: "1 兆 = 10,000 亿 = 10¹².",
              visual: {
                kind: "diagram",
                name: "groups-of-four",
                numbers: [0, 0, 0, 0, 1],
              },
            },
          ],
        },
      },
      {
        id: "quiz-thousand-yi",
        type: "quiz",
        prompt: "Which number is 一千亿 (yī qiān yì)?",
        choices: [100000000000, 10000000000, 1000000000, 1000000000000],
        answer: 100000000000,
        explanation: {
          steps: [
            {
              text: "千亿 = 1000 × 亿.",
              visual: {
                kind: "diagram",
                name: "unit-ladder",
                labels: ["亿", "十亿", "百亿", "千亿"],
                named: false,
              },
            },
            {
              text: "1000 × 10⁸ = 100,000,000,000 — the step just below 兆.",
              visual: {
                kind: "diagram",
                name: "unit-ladder",
                labels: ["千亿", "兆"],
                named: false,
              },
            },
          ],
        },
      },
      {
        id: "read-forty-five-thousand",
        type: "read",
        prompt: "Read the number on these five rods.",
        digits: [8, 7, 6, 5, 4],
        choices: [45678, 87654, 4567, 456789],
        explanation: {
          steps: [
            {
              text: "The 万 rod shows 4 → 四万.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 4],
              },
            },
            {
              text: "The rest, 5678, reads 五千六百七十八.",
              visual: {
                kind: "abacus",
                digits: [8, 7, 6, 5, 4],
              },
            },
            {
              text: "Together: 四万五千六百七十八 (45,678).",
              visual: {
                kind: "abacus",
                digits: [8, 7, 6, 5, 4],
              },
            },
          ],
        },
      },
      {
        id: "build-ninety-eight-thousand",
        type: "build",
        prompt: "Build 九万八千七百六十五 (98,765).",
        target: 98765,
        rods: 5,
        explanation: {
          steps: [
            {
              text: "98,765 splits as 9 万 + 8765.",
              visual: {
                kind: "abacus",
                digits: [5, 6, 7, 8, 9],
              },
            },
            {
              text: "Put 9 on the 万 rod, then 8765 on the four lower rods.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 9], [5, 6, 7, 8, 9]],
                captions: ["0", "90000", "98765"],
                label: "Building 98,765",
              },
            },
            {
              text: "Keep going left by groups of four and you reach 兆.",
              visual: {
                kind: "diagram",
                name: "groups-of-four",
                numbers: [5, 6, 7, 8, 9],
              },
            },
          ],
        },
      },
    ],
    ladder: [
      {
        id: "wan-jin-ladder",
        type: "heading",
        text: "The 万进 Ladder",
        figure: {
          visual: {
            kind: "diagram",
            name: "wan",
            numbers: [10000],
          },
          caption: "The four zeros inside 万 are the ten thousand times that 万进 names.",
        },
      },
      {
        id: "the-wan-jin-rule",
        type: "paragraph",
        text: "Here is the rule that builds the whole ladder: after 千, every next big unit is ten thousand times the one before it. This is called 万进 (wàn jìn) — \"myriad progression\".",
        demo: {
          frames: [[0, 0, 0, 0, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 1]],
          captions: ["0 = 零", "一千 (10³): the 4th rod", "一万 (10⁴): the 5th rod — the ×10,000 leap of 万进"],
        },
      },
      {
        id: "big-unit-values-list",
        type: "list",
        items: [
          "万 (wàn) = 10⁴ = 10,000",
          "亿 (yì) = 10⁸ = 100,000,000",
          "兆 (zhào) = 10¹² = 1,000,000,000,000",
        ],
        figure: {
          visual: {
            kind: "diagram",
            name: "koujue",
            labels: ["万 = 10⁴", "亿 = 10⁸", "兆 = 10¹²"],
            named: false,
          },
          caption: "Read each line as a 1 with that many zeros behind it.",
        },
      },
      {
        id: "four-places-between-units",
        type: "paragraph",
        text: "Between 万 and 亿 sit four places (万, 十万, 百万, 千万); between 亿 and 兆 sit four more (亿, 十亿, 百亿, 千亿). One 兆 = 一万 亿 = 10,000 × 10⁸ = 10¹².",
        figure: {
          visual: {
            kind: "diagram",
            name: "unit-ladder",
            labels: ["万", "十万", "百万", "千万", "亿"],
            named: false,
          },
          caption: "The 万 rod and the 亿 rod sit four places apart, with a name on each.",
        },
      },
      {
        id: "quiz-unit-multiplier",
        type: "quiz",
        prompt: "Each big unit is how many times the one before it?",
        choices: [10, 100, 1000, 10000],
        answer: 10000,
        explanation: {
          steps: [
            {
              text: "万进 means every big unit is ten thousand times the previous.",
              visual: {
                kind: "diagram",
                name: "unit-ladder",
                labels: ["万", "亿", "兆"],
                named: false,
              },
            },
            {
              text: "万 → 亿 → 兆 each multiply by 10,000.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["万 = 10⁴", "亿 = 10⁸", "兆 = 10¹²"],
                named: false,
              },
            },
          ],
        },
      },
      {
        id: "quiz-zhao-times-unit",
        type: "quiz",
        prompt: "兆 is 10,000 × what unit?",
        choices: [10000, 100000, 1000000, 100000000],
        answer: 100000000,
        explanation: {
          steps: [
            {
              text: "兆 = 10,000 × 亿.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["兆 = 10⁴ × 亿"],
                named: false,
              },
            },
            {
              text: "亿 = 10⁸, so 兆 = 10⁴ × 10⁸ = 10¹².",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["亿 = 10⁸", "兆 = 10¹²"],
                named: false,
              },
            },
          ],
        },
      },
      {
        id: "read-one-thousand",
        type: "read",
        prompt: "Read the number on these five rods.",
        digits: [0, 0, 0, 1, 0],
        choices: [1000, 10000, 100, 100000],
        explanation: {
          steps: [
            {
              text: "One bead is on the 4th rod (千).",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 1, 0],
              },
            },
            {
              text: "So the number is 一千 (10³ = 1,000).",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 1, 0],
              },
            },
          ],
        },
      },
      {
        id: "build-ten-thousand-leap",
        type: "build",
        prompt: "Build 一万 (10,000) — the 万进 leap.",
        target: 10000,
        rods: 5,
        explanation: {
          steps: [
            {
              text: "10,000 is one bead on the 5th rod (万).",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 1],
              },
            },
            {
              text: "Moving from the 4th rod (千) to the 5th rod (万) is the ×10,000 leap of 万进.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 1],
              },
            },
          ],
        },
      },
    ],
    "yi-and-zhao-check": [
      {
        id: "level-check",
        type: "heading",
        text: "Level check",
        figure: {
          visual: {
            kind: "diagram",
            name: "progress-ladder",
          },
          caption: "Reading a unit and holding it in mind both come before any speed work.",
        },
      },
      {
        id: "match-units-then-build",
        type: "paragraph",
        text: "Match the units, then read and build the smaller pieces.",
        figure: {
          visual: {
            kind: "diagram",
            name: "image-to-number",
          },
          caption: "Three rods of beads on one side spell one number on the other.",
        },
      },
      {
        id: "check-quiz-one-yi",
        type: "quiz",
        prompt: "Which is 一亿 (yī yì)?",
        choices: [100000000, 10000000, 1000000000, 1000],
        answer: 100000000,
        explanation: {
          steps: [
            {
              text: "一亿 = 10⁸ = 100,000,000.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 0, 0, 0, 0, 1],
              },
            },
          ],
        },
      },
      {
        id: "check-quiz-ten-yi",
        type: "quiz",
        prompt: "Which number is 十亿 (shí yì)?",
        choices: [1000000000, 100000000, 10000000000, 100000],
        answer: 1000000000,
        explanation: {
          steps: [
            {
              text: "十亿 = 10 × 亿.",
              visual: {
                kind: "diagram",
                name: "unit-ladder",
                labels: ["亿", "十亿"],
                named: false,
              },
            },
            {
              text: "10 × 10⁸ = 1,000,000,000.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["十亿 = 10 × 10⁸"],
                named: false,
              },
            },
          ],
        },
      },
      {
        id: "check-read-thirty-four-thousand",
        type: "read",
        prompt: "Read this five-rod number.",
        digits: [0, 6, 5, 4, 3],
        choices: [34560, 3456, 35460, 304560],
        explanation: {
          steps: [
            {
              text: "The 万 rod shows 3 → 三万.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 3],
              },
            },
            {
              text: "The rest, 4560, reads 四千五百六十.",
              visual: {
                kind: "abacus",
                digits: [0, 6, 5, 4, 3],
              },
            },
            {
              text: "Together: 三万四千五百六十 (34,560).",
              visual: {
                kind: "abacus",
                digits: [0, 6, 5, 4, 3],
              },
            },
          ],
        },
      },
      {
        id: "check-build-ninety-eight-thousand",
        type: "build",
        prompt: "Build 九万八千 (98,000).",
        target: 98000,
        rods: 5,
        explanation: {
          steps: [
            {
              text: "98,000 splits as 9 万 + 8 千.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 8, 9],
              },
            },
            {
              text: "Put 9 on the 万 rod and 8 on the thousands rod.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 9], [0, 0, 0, 8, 9]],
                captions: ["0", "90000", "98000"],
                label: "Building 98,000",
              },
            },
          ],
        },
      },
    ],
  },

  "read-everything": {
    "group-of-four": [
      {
        id: "split-into-groups-of-four",
        type: "heading",
        text: "Split into Groups of Four",
        figure: {
          visual: {
            kind: "diagram",
            name: "groups-of-four",
            numbers: [8, 7, 6, 5, 4, 3],
          },
          caption: "Two groups here: the left one takes the name 万, the right one takes none.",
        },
      },
      {
        id: "mark-off-four-digits",
        type: "paragraph",
        text: "Because Chinese leaps by 万 (10⁴), you read a big number by marking off every four digits from the right. The first four are plain (个 十 百 千); the next group gets 万; then 亿; then 兆.",
        demo: {
          frames: [[0, 0, 0, 0, 0], [5, 4, 3, 2, 1]],
          captions: ["0 = 零", "12,345: the rightmost four rods are one group, the 万 rod starts the next"],
        },
      },
      {
        id: "group-names-list",
        type: "list",
        items: [
          "Group 0 (rightmost 4 digits) — plain 个 十 百 千",
          "Group 1 — 万 (10⁴)",
          "Group 2 — 亿 (10⁸)",
          "Group 3 — 兆 (10¹²)",
        ],
        figure: {
          visual: {
            kind: "diagram",
            name: "place-value",
            numbers: [6, 5, 4, 3],
            labels: ["个", "十", "百", "千"],
          },
          caption: "However high a group sits, its four rods keep these same four names.",
        },
      },
      {
        id: "example-split-groups",
        type: "paragraph",
        text: "Example: 567,890,123,456 splits into 5678 | 9012 | 3456. Mark every four digits back from the ones and the groups are 5678 亿, 9012 万 and 3456. One group further left, 1,000,000,000,000 is just 1 兆 — the top of this course.",
        figure: {
          visual: {
            kind: "diagram",
            name: "big-board",
            numbers: [0, 9, 8, 7, 6, 5],
          },
          caption: "Six rods hold all of 567890, and the two leftmost rods are the 万 chunk.",
        },
      },
      {
        id: "quiz-group-boundary",
        type: "quiz",
        prompt: "From the right, every fourth digit starts a new group named by what?",
        choices: [100, 1000, 10000, 10],
        answer: 10000,
        explanation: {
          steps: [
            {
              text: "The group boundary is the 万 (10⁴) leap.",
              visual: {
                kind: "diagram",
                name: "groups-of-four",
                numbers: [0, 0, 0, 0, 1],
              },
            },
            {
              text: "So every 4 digits = a new 万-based unit.",
              visual: {
                kind: "diagram",
                name: "groups-of-four",
                numbers: [0, 9, 8, 7, 6, 5],
              },
            },
          ],
        },
      },
      {
        id: "quiz-digits-per-group",
        type: "quiz",
        prompt: "How many digits make one full group?",
        choices: [2, 3, 4, 5],
        answer: 4,
        explanation: {
          steps: [
            {
              text: "Each 万-unit spans 4 digits.",
              visual: {
                kind: "diagram",
                name: "groups-of-four",
                numbers: [8, 7, 6, 5, 4, 3],
              },
            },
            {
              text: "That's why Chinese groups by four, not three.",
              visual: {
                kind: "diagram",
                name: "place-value",
                numbers: [6, 5, 4, 3],
                labels: ["个", "十", "百", "千"],
              },
            },
          ],
        },
      },
      {
        id: "read-and-spot-split",
        type: "read",
        prompt: "Read this five-rod number and spot the group split.",
        digits: [5, 4, 3, 2, 1],
        choices: [12345, 54321, 1234, 10234],
        explanation: {
          steps: [
            {
              text: "The 万 rod holds 1 → 一万.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 1],
              },
            },
            {
              text: "The four rods to its right hold 2345.",
              visual: {
                kind: "abacus",
                digits: [5, 4, 3, 2, 1],
              },
            },
            {
              text: "So the number splits 1 | 2345 = 一万二千三百四十五 (12,345).",
              visual: {
                kind: "abacus",
                digits: [5, 4, 3, 2, 1],
              },
            },
          ],
        },
      },
      {
        id: "build-and-mark-split",
        type: "build",
        prompt: "Build 二万三千四百五十六 (23,456) and mark the group split.",
        target: 23456,
        rods: 5,
        explanation: {
          steps: [
            {
              text: "23,456 splits at the 万 rod: 2 | 3456.",
              visual: {
                kind: "abacus",
                digits: [6, 5, 4, 3, 2],
              },
            },
            {
              text: "Put 2 on the 万 rod, then 3456 on the four rods to its right.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 2], [6, 5, 4, 3, 2]],
                captions: ["0", "20000", "23456"],
                label: "Building 23,456",
              },
            },
          ],
        },
      },
    ],
    "read-big": [
      {
        id: "read-a-big-number",
        type: "heading",
        text: "Read a Big Number",
        figure: {
          visual: {
            kind: "diagram",
            name: "big-board",
            numbers: [6, 5, 4, 3, 2, 1],
          },
          caption: "Six rods hold six digits, and the largest unit always sits on the left.",
        },
      },
      {
        id: "read-in-layers",
        type: "paragraph",
        text: "Read a big number in layers, biggest unit first: say the 兆 group (tag 兆), then the 亿 group (tag 亿), then the 万 group (tag 万), then whatever is left. Each group is read like a normal four-digit number, with its unit tagged on.",
        demo: {
          frames: [[0, 0, 0, 0, 0], [9, 8, 7, 6, 5]],
          captions: ["0 = 零", "五万六千七百八十九 (56,789): read the 万 group first, then the rest"],
        },
      },
      {
        id: "whole-ladder-at-once",
        type: "paragraph",
        text: "Here is the whole ladder at once: 1,000,000,000,000 = 一兆, one trillion — the top of this course. And 567,890,123,456 = 五千六百七十八亿 九千零一十二万 三千四百五十六, one step below the trillion mark.",
        figure: {
          visual: {
            kind: "diagram",
            name: "unit-ladder",
            labels: ["个", "万", "亿", "兆"],
            named: false,
          },
          caption: "Every fourth place keeps a name of its own: 个, 万, 亿, 兆.",
        },
      },
      {
        id: "quiz-one-zhao",
        type: "quiz",
        prompt: "Which number is 一兆 (one trillion)?",
        choices: [1000000000000, 1000000000, 100000000000, 10000000000],
        answer: 1000000000000,
        explanation: {
          steps: [
            {
              text: "一兆 = 10¹² = 1,000,000,000,000.",
              visual: {
                kind: "diagram",
                name: "unit-ladder",
                labels: ["个", "万", "亿", "兆"],
                named: false,
              },
            },
          ],
        },
      },
      {
        id: "quiz-group-2345-yi",
        type: "quiz",
        prompt: "The 亿 group reads 2345亿. What number is that?",
        choices: [234500000000, 2345000000, 23450000, 2345000],
        answer: 234500000000,
        explanation: {
          steps: [
            {
              text: "2345亿 = 2345 × 10⁸.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["2345亿 = 2345 × 10⁸"],
                named: false,
              },
            },
            {
              text: "2345 × 100,000,000 = 234,500,000,000.",
              visual: {
                kind: "diagram",
                name: "groups-of-four",
                numbers: [5, 4, 3, 2],
              },
            },
          ],
        },
      },
      {
        id: "read-thirty-four-thousand",
        type: "read",
        prompt: "Read this five-rod number.",
        digits: [0, 6, 5, 4, 3],
        choices: [34560, 3456, 35460, 304560],
        explanation: {
          steps: [
            {
              text: "万 rod = 3 → 三万.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 3],
              },
            },
            {
              text: "Rest 4560 → 四千五百六十.",
              visual: {
                kind: "abacus",
                digits: [0, 6, 5, 4, 3],
              },
            },
            {
              text: "三万四千五百六十 (34,560).",
              visual: {
                kind: "abacus",
                digits: [0, 6, 5, 4, 3],
              },
            },
          ],
        },
      },
    ],
    "zero-group": [
      {
        id: "zero-inside-a-group",
        type: "heading",
        text: "Zero Inside a Group",
        figure: {
          visual: {
            kind: "diagram",
            name: "zero-in-group",
            numbers: [5, 0, 4],
          },
          caption: "The empty rod in 405 is written as 零 when the number is said aloud.",
        },
      },
      {
        id: "zero-rule-per-group",
        type: "paragraph",
        text: "Each group is read like its own four-digit number, so the 零 rule works the same way inside a group. If a group's middle is empty, write 零. If a whole group is empty, skip it entirely.",
        demo: {
          frames: [[0, 0, 0, 0, 0], [1, 0, 0, 0, 1]],
          captions: ["0 = 零", "一万零一 (10,001): the empty rods in the middle are the 零"],
        },
      },
      {
        id: "skip-empty-wan-group",
        type: "paragraph",
        text: "100,000,001 = 1,0000,0001. The 亿 group is 1, the 万 group is empty, and the ones are 0001. The empty 万 group is skipped, and one 零 bridges the gap: 一亿零一.",
        figure: {
          visual: {
            kind: "abacus",
            digits: [1, 0, 0, 0, 0, 0, 0, 0, 1],
          },
          caption: "The four rods of the 万 group stand empty, and one 零 covers them.",
        },
      },
      {
        id: "quiz-hundred-million-one",
        type: "quiz",
        prompt: "100,000,001 in Chinese reads...",
        choices: [100000001, 101, 1000001, 100001],
        answer: 100000001,
        explanation: {
          steps: [
            {
              text: "Split: 1 | 0000 | 0001 → 亿 group 1, 万 group empty, ones 0001.",
              visual: {
                kind: "abacus",
                digits: [1, 0, 0, 0, 0, 0, 0, 0, 1],
              },
            },
            {
              text: "The empty 万 group is skipped.",
              visual: {
                kind: "diagram",
                name: "unit-ladder",
                labels: ["个", "万", "亿"],
                named: false,
              },
            },
            {
              text: "One 零 bridges, giving 一亿零一.",
              visual: {
                kind: "abacus",
                digits: [1, 0, 0, 0, 0, 0, 0, 0, 1],
              },
            },
          ],
        },
      },
      {
        id: "read-ten-thousand-one",
        type: "read",
        prompt: "Read this five-rod number.",
        digits: [1, 0, 0, 0, 1],
        choices: [10001, 1001, 101, 11000],
        explanation: {
          steps: [
            {
              text: "The 万 rod shows 1 → 一万.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 1],
              },
            },
            {
              text: "The lower rods are empty except the ones rod, which shows 1.",
              visual: {
                kind: "abacus",
                digits: [1, 0, 0, 0, 1],
              },
            },
            {
              text: "One 零 bridges: 一万零一 (10,001).",
              visual: {
                kind: "abacus",
                digits: [1, 0, 0, 0, 1],
              },
            },
          ],
        },
      },
      {
        id: "build-ten-thousand-one",
        type: "build",
        prompt: "Build 一万零一 (10,001).",
        target: 10001,
        rods: 5,
        explanation: {
          steps: [
            {
              text: "10,001 splits as 1 万 + 1 one, with the middle empty.",
              visual: {
                kind: "abacus",
                digits: [1, 0, 0, 0, 1],
              },
            },
            {
              text: "Put 1 on the 万 rod and 1 on the ones rod.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 1], [1, 0, 0, 0, 1]],
                captions: ["0", "10000", "10001"],
                label: "Building 10,001",
              },
            },
            {
              text: "The empty rods between are the 零.",
              visual: {
                kind: "abacus",
                digits: [1, 0, 0, 0, 1],
              },
            },
          ],
        },
      },
    ],
    "abacus-connection": [
      {
        id: "the-abacus-connection",
        type: "heading",
        text: "The Abacus Connection",
        figure: {
          visual: {
            kind: "diagram",
            name: "soroban",
          },
          caption: "The frame, the beam and the rods stay put, so a bead's place never changes.",
        },
      },
      {
        id: "every-rod-is-a-place",
        type: "paragraph",
        text: "Every rod on the abacus is one place: 个 十 百 千 万 十万 百万 千万 亿 十亿 百亿 千亿 兆. The abacus is purely positional — the beads have no idea which unit they are, you read them by their rod.",
        demo: {
          frames: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 1]],
          captions: ["0 = 零", "One bead on the fifth rod = 万 — every fourth rod is a new unit"],
        },
      },
      {
        id: "words-agree-with-abacus",
        type: "paragraph",
        text: "Chinese number words do the same job, but they draw a line every four rods and name those lines 万, 亿, 兆. So the abacus and the words always agree: one rod is one place, and every fourth rod names a whole group.",
        figure: {
          visual: {
            kind: "diagram",
            name: "chinese-board",
          },
          caption: "Both boards carry the same number, rod for rod, however many beads each rod holds.",
        },
      },
      {
        id: "click-the-fifth-wan-rod",
        type: "explore",
        label: "Explore: click the fifth (万) rod and watch the abacus value leap by ten thousand.",
        rods: 5,
        initial: [0, 0, 0, 0, 1],
      },
      {
        id: "read-wan-rod-two-beads",
        type: "read",
        prompt: "The fifth rod is 万. Read this number.",
        digits: [0, 0, 0, 0, 2],
        choices: [20000, 2000, 200000, 2],
        explanation: {
          steps: [
            {
              text: "Two beads on the 万 rod.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 2],
              },
            },
            {
              text: "That's 二万 (20,000) — the 万 leap.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 2],
              },
            },
          ],
        },
      },
    ],
    "read-everything-check": [
      {
        id: "the-finale",
        type: "heading",
        text: "The Finale",
        figure: {
          visual: {
            kind: "diagram",
            name: "championship",
          },
          caption: "One medal for the finale, after every unit from 一 to 兆 has been read.",
        },
      },
      {
        id: "read-build-decode-to-zhao",
        type: "paragraph",
        text: "Read, build and decode your way all the way to 兆.",
        figure: {
          visual: {
            kind: "diagram",
            name: "exam-paper",
          },
          caption: "The clock beside the sheet sets the pace for every answer on it.",
        },
      },
      {
        id: "finale-quiz-zhao-worth",
        type: "quiz",
        prompt: "What is 兆 (zhào) worth?",
        choices: [1000000000000, 100000000, 100000, 10000000000],
        answer: 1000000000000,
        explanation: {
          steps: [
            {
              text: "兆 = 10¹² = 1,000,000,000,000 = one trillion.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["兆 = 10¹²"],
                named: false,
              },
            },
          ],
        },
      },
      {
        id: "finale-quiz-yi-value",
        type: "quiz",
        prompt: "Which unit is worth 100,000,000?",
        choices: [100000000, 10000, 100000, 1000000000],
        answer: 100000000,
        explanation: {
          steps: [
            {
              text: "亿 (yì) = 10⁸ = 100,000,000.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 0, 0, 0, 0, 1],
              },
            },
          ],
        },
      },
      {
        id: "finale-read-fifty-six-thousand",
        type: "read",
        prompt: "Read this five-rod number.",
        digits: [0, 8, 7, 6, 5],
        choices: [56780, 5678, 57680, 50000],
        explanation: {
          steps: [
            {
              text: "The 万 rod shows 5 → 五万.",
              visual: {
                kind: "abacus",
                digits: [0, 0, 0, 0, 5],
              },
            },
            {
              text: "The rest, 6780, reads 六千七百八十.",
              visual: {
                kind: "abacus",
                digits: [0, 8, 7, 6, 5],
              },
            },
            {
              text: "Together: 五万六千七百八十 (56,780).",
              visual: {
                kind: "abacus",
                digits: [0, 8, 7, 6, 5],
              },
            },
          ],
        },
      },
      {
        id: "finale-build-forty-five-thousand",
        type: "build",
        prompt: "Build 四万五千六百七十八 (45,678).",
        target: 45678,
        rods: 5,
        explanation: {
          steps: [
            {
              text: "45,678 splits as 4 万 + 5678.",
              visual: {
                kind: "abacus",
                digits: [8, 7, 6, 5, 4],
              },
            },
            {
              text: "Put 4 on the 万 rod, then 5678 on the four lower rods.",
              visual: {
                kind: "abacus-anim",
                frames: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 4], [8, 7, 6, 5, 4]],
                captions: ["0", "40000", "45678"],
                label: "Building 45,678",
              },
            },
          ],
        },
      },
      {
        id: "finale-quiz-wan-yi",
        type: "quiz",
        prompt: "Which number is 一万亿 (wàn yì)?",
        choices: [1000000000000, 100000000, 100000000000, 10000000000],
        answer: 1000000000000,
        explanation: {
          steps: [
            {
              text: "万亿为兆: 一万 亿 = 兆.",
              visual: {
                kind: "diagram",
                name: "koujue",
                labels: ["万亿为兆"],
                named: false,
              },
            },
            {
              text: "So 一万亿 = 10¹² = 1,000,000,000,000 = one trillion.",
              visual: {
                kind: "diagram",
                name: "unit-ladder",
                labels: ["亿", "兆"],
                named: false,
              },
            },
          ],
        },
      },
    ],
  },
};
