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
      },
      {
        type: "paragraph",
        text: "The single heaven bead above the beam counts 5 all by itself. When it touches the beam, the rod is worth 5 — even though it's only one bead.",
      },
      {
        type: "read",
        prompt: "Which number is this abacus showing?",
        digits: [1],
        choices: [1, 2, 5, 10],
        explanation: { text: "One earth bead is touching the beam, and each earth bead counts as 1, so the rod shows 1." },
      },
      {
        type: "read",
        prompt: "What about this one?",
        digits: [5],
        choices: [5, 1, 4, 10],
        explanation: { text: "Only the heaven bead touches the beam, and a single heaven bead is worth 5, so the rod shows 5." },
      },
      {
        type: "read",
        prompt: "This rod uses both kinds of beads. What number is it?",
        digits: [6],
        choices: [6, 5, 4, 7],
        explanation: { text: "The heaven bead is worth 5 and the one earth bead is worth 1, so 5 + 1 = 6." },
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
        explanation: { text: "With no bead touching the beam, every rod reads 0, so 0 tens and 0 ones make 0." },
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
        explanation: { text: "Three earth beads are touching the beam, and each counts as 1, so the rod shows 3." },
      },
      {
        type: "build",
        prompt: "Slide the beads to show 7.",
        target: 7,
        rods: 1,
        explanation: { text: "To show 7, slide the heaven bead down for 5, then push up two earth beads for the extra 2." },
      },
      {
        type: "build",
        prompt: "Now show 9 on the rod.",
        target: 9,
        rods: 1,
        explanation: { text: "To show 9, slide the heaven bead down (5) and push all four earth beads up (4), making 5 + 4 = 9." },
      },
    ],
  },

  "counting-with-beads": {
    "one-to-four": [
      { type: "heading", text: "One to four" },
      {
        type: "paragraph",
        text: "Earth beads count 1, 2, 3, 4. Slide them up to the beam one at a time. Slide one bead and the rod shows 1; slide four and it shows 4.",
      },
      {
        type: "build",
        prompt: "Slide the beads to show 4.",
        target: 4,
        rods: 1,
        explanation: { text: "Four earth beads each count 1, so push all four up to the beam to show 4." },
      },
      {
        type: "read",
        prompt: "Which number is this rod showing?",
        digits: [2],
        choices: [2, 4, 1, 6],
        explanation: { text: "Two earth beads are by the beam and each counts 1, so together the rod shows 2." },
      },
    ],
    "five-and-friends": [
      { type: "heading", text: "Five and its friends" },
      {
        type: "paragraph",
        text: "To show 5, don't try to invent a fifth earth bead — slide the heaven bead down to the beam instead. It is worth 5 on its own.",
      },
      {
        type: "paragraph",
        text: "Now combine the two kinds of beads. 6 is heaven plus one earth. 9 is heaven plus all four earth beads. The heaven bead's five friends are the earth beads below it.",
      },
      {
        type: "read",
        prompt: "Heaven plus one earth. What number is this?",
        digits: [6],
        choices: [6, 5, 1, 9],
        explanation: { text: "The heaven bead is 5 and the one earth bead is 1, so 5 + 1 = 6." },
      },
      {
        type: "read",
        prompt: "Heaven plus all four earth beads. What number is this?",
        digits: [9],
        choices: [9, 4, 6, 8],
        explanation: { text: "The heaven bead is 5 and four earth beads are 4, so 5 + 4 = 9." },
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
        explanation: { text: "The heaven bead is 5 and the three earth beads are 3, so 5 + 3 = 8." },
      },
      {
        type: "read",
        prompt: "No heaven bead, four earth beads up. What number?",
        digits: [4],
        choices: [4, 5, 9, 1],
        explanation: { text: "With no heaven bead, only the four earth beads count, and each is 1, so the rod shows 4." },
      },
      {
        type: "read",
        prompt: "Heaven bead down, two earth beads up. What number?",
        digits: [7],
        choices: [7, 2, 5, 9],
        explanation: { text: "The heaven bead is 5 and the two earth beads are 2, so 5 + 2 = 7." },
      },
    ],
    "build-a-number": [
      { type: "heading", text: "Build a number" },
      {
        type: "paragraph",
        text: "Building is reading in reverse: figure out how many earth beads and whether you need the heaven bead, then slide them to the beam.",
      },
      { type: "build", prompt: "Show 5 on the rod.", target: 5, rods: 1, explanation: { text: "5 needs only the heaven bead, so slide it down to the beam and leave the earth beads down." } },
      { type: "build", prompt: "Show 8 on the rod.", target: 8, rods: 1, explanation: { text: "8 is 5 plus 3, so slide the heaven bead down and push up three earth beads to the beam." } },
      { type: "build", prompt: "Show 6 on the rod.", target: 6, rods: 1, explanation: { text: "6 is the heaven bead (5) plus one earth bead (1), so slide both to the beam." } },
    ],
    "counting-with-beads-check": [
      { type: "heading", text: "Level check" },
      { type: "paragraph", text: "Read it, then build it. Solve every question to finish." },
      {
        type: "read",
        prompt: "What number is this rod showing?",
        digits: [7],
        choices: [7, 2, 6, 5],
        explanation: { text: "The heaven bead is 5 and the two earth beads are 2, so the rod shows 5 + 2 = 7." },
      },
      {
        type: "build",
        prompt: "Show 3 on the rod.",
        target: 3,
        rods: 1,
        explanation: { text: "Three earth beads each count 1, so push three beads up to the beam to show 3." },
      },
      {
        type: "build",
        prompt: "Show 9 on the rod.",
        target: 9,
        rods: 1,
        explanation: { text: "9 is 5 plus 4, so slide the heaven bead down and push all four earth beads up to show 9." },
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
        explanation: { text: "The tens rod shows 2 (which is 20) and the ones rod shows 4, so 20 + 4 = 24." },
      },
      {
        type: "read",
        prompt: "No ones and 3 tens. What number is this?",
        digits: [0, 3],
        choices: [30, 3, 33, 300],
        explanation: { text: "Three tens are worth 30 and there are no ones, so the number is 30." },
      },
    ],
    "building-two-digit": [
      { type: "heading", text: "Building two-digit numbers" },
      {
        type: "paragraph",
        text: "To build a two-digit number, take the number apart by place value. For 47 you need 4 tens on the left rod and 7 ones on the right rod.",
      },
      {
        type: "build",
        prompt: "Build 23 on the abacus.",
        target: 23,
        rods: 2,
        explanation: { text: "23 is 2 tens and 3 ones, so put 2 on the tens rod and 3 on the ones rod." },
      },
      {
        type: "build",
        prompt: "Build 47 on the abacus.",
        target: 47,
        rods: 2,
        explanation: { text: "47 is 4 tens and 7 ones, so put 4 on the tens rod and 7 on the ones rod." },
      },
      {
        type: "build",
        prompt: "Build 52 on the abacus.",
        target: 52,
        rods: 2,
        explanation: { text: "52 is 5 tens and 2 ones, so show 5 on the tens rod and 2 on the ones rod." },
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
        explanation: { text: "One ten is 10 and zero ones add nothing, so the abacus shows 10." },
      },
      {
        type: "read",
        prompt: "7 tens and 0 ones. What number is this?",
        digits: [0, 7],
        choices: [70, 7, 77, 700],
        explanation: { text: "Seven tens are 70 and zero ones add nothing, so the abacus shows 70." },
      },
      {
        type: "build",
        prompt: "Build 40 on the abacus.",
        target: 40,
        rods: 2,
        explanation: { text: "40 is 4 tens and 0 ones, so show 4 on the tens rod and leave the ones rod empty." },
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
        explanation: { text: "2 hundreds (200), 3 tens (30), and 4 ones make 234." },
      },
      {
        type: "read",
        prompt: "0 ones, 0 tens, 4 hundreds. What number is this?",
        digits: [0, 0, 4],
        choices: [400, 4, 44, 444],
        explanation: { text: "Four hundreds are 400, and the empty tens and ones places add nothing." },
      },
      {
        type: "build",
        prompt: "Build 305 on the abacus.",
        target: 305,
        rods: 3,
        explanation: { text: "305 is 3 hundreds, 0 tens, and 5 ones, so show 3 on the hundreds rod, leave the tens rod empty, and show 5 on the ones rod." },
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
        explanation: { text: "57 is 5 tens and 7 ones, so show 5 on the tens rod and 7 on the ones rod." },
      },
      {
        type: "read",
        prompt: "4 hundreds, 0 tens, 5 ones. What number is this?",
        digits: [5, 0, 4],
        choices: [405, 54, 450, 45],
        explanation: { text: "4 hundreds (400), 0 tens, and 5 ones make 405." },
      },
      {
        type: "build",
        prompt: "Build 120 on the abacus.",
        target: 120,
        rods: 3,
        explanation: { text: "120 is 1 hundred, 2 tens, and 0 ones, so show 1 on the hundreds rod, 2 on the tens rod, and leave the ones rod empty." },
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
        explanation: { text: "12 + 13 is 25, so show 2 tens and 5 ones; the ones place needs the heaven bead plus one earth bead." },
      },
      {
        type: "build",
        prompt: "31 + 22. Show the sum on the abacus.",
        target: 53,
        rods: 2,
        explanation: { text: "31 + 22 is 53, so show 5 tens and 3 ones on the rods." },
      },
    ],
    "friends-of-five": [
      { type: "heading", text: "Friends of five" },
      {
        type: "paragraph",
        text: "There are only four earth beads, so you can't add 4 by sliding four more beads when the rod is already busy. Instead, think in fives: to add 4, slide the heaven bead down (+5) and take one earth bead away (−1).",
      },
      {
        type: "paragraph",
        text: "The earth bead you remove is the addend's friend of five. The pairs are 1 ↔ 4 and 2 ↔ 3. So to add 4 you use +5 −1; to add 3 you use +5 −2.",
      },
      {
        type: "build",
        prompt: "2 + 4 = 6. Slide the beads to show the sum.",
        target: 6,
        rods: 1,
        explanation: { text: "2 + 4 = 6, and 6 is the heaven bead (5) plus one earth bead (1)." },
      },
      {
        type: "build",
        prompt: "4 + 4 + 4 = 12. Show the total on the abacus.",
        target: 12,
        rods: 2,
        explanation: { text: "Four added three times is 12, so show 1 ten and 2 ones on the rods." },
      },
    ],
    carrying: [
      { type: "heading", text: "Carrying over" },
      {
        type: "paragraph",
        text: "When a rod runs out of room, you carry — exactly like written arithmetic. To add 8 + 5 you can't fit 13 ones on one rod, so you record 3 on the ones rod and carry 1 to the tens rod: 13.",
      },
      {
        type: "paragraph",
        text: "Carrying is a sign that you've filled a rod to its limit: four earth beads plus a heaven bead is the most a rod can show, which is 9.",
      },
      {
        type: "build",
        prompt: "8 + 5. Show the sum on the abacus.",
        target: 13,
        rods: 2,
        explanation: { text: "8 + 5 is 13, so show 1 ten and 3 ones; the ones rod fills past 9 so you carry 1 to the tens rod." },
      },
      {
        type: "build",
        prompt: "9 + 9 = 18. Show the sum on the abacus.",
        target: 18,
        rods: 2,
        explanation: { text: "9 + 9 is 18, so show 1 ten and 8 ones; the extra ten is the carry from the full ones rod." },
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
        explanation: { text: "27 + 15 is 42, so show 4 tens and 2 ones after carrying from the ones place." },
      },
      {
        type: "build",
        prompt: "58 + 27. Show the sum on the abacus.",
        target: 85,
        rods: 2,
        explanation: { text: "58 + 27 is 85, so show 8 tens and 5 ones after carrying." },
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
        explanation: { text: "3 + 8 is 11, so show 1 ten and 1 one; the ones rod fills past 9 and the extra ten carries." },
      },
      {
        type: "build",
        prompt: "4 + 5 + 6. Show the total on the abacus.",
        target: 15,
        rods: 2,
        explanation: { text: "4 + 5 + 6 is 15, so show 1 ten and 5 ones." },
      },
      {
        type: "build",
        prompt: "18 + 8. Show the sum on the abacus.",
        target: 26,
        rods: 2,
        explanation: { text: "18 + 8 is 26, so show 2 tens and 6 ones; the ones rod fills past 9 and the extra ten carries." },
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
        explanation: { text: "9 take away 3 is 6, so slide three earth beads away from the beam and the heaven bead remains." },
      },
      {
        type: "build",
        prompt: "7 − 2. Show the difference on the rod.",
        target: 5,
        rods: 1,
        explanation: { text: "7 take away 2 is 5, so slide two earth beads away and the heaven bead alone shows 5." },
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
      },
      {
        type: "build",
        prompt: "13 − 5. Show the difference on the abacus.",
        target: 8,
        rods: 2,
        explanation: { text: "13 take away 5 is 8; you borrow 1 ten from the tens rod and the ones rod can then lose 5." },
      },
      {
        type: "build",
        prompt: "12 − 7. Show the difference on the abacus.",
        target: 5,
        rods: 2,
        explanation: { text: "12 take away 7 is 5; borrow 1 ten so the ones rod has 12, then 12 − 7 leaves 5." },
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
        explanation: { text: "52 take away 28 is 24; borrow from the tens rod and subtract place by place." },
      },
      {
        type: "build",
        prompt: "81 − 36. Show the difference on the abacus.",
        target: 45,
        rods: 2,
        explanation: { text: "81 take away 36 is 45; borrow from the tens rod and subtract place by place." },
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
        explanation: { text: "34 take away 15 is 19; borrow 1 ten from the tens rod and subtract place by place." },
      },
      {
        type: "build",
        prompt: "40 − 6. Show the difference on the abacus.",
        target: 34,
        rods: 2,
        explanation: { text: "40 take away 6 is 34; borrow 1 ten so the ones rod has 10, then 10 − 6 leaves 4." },
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
        explanation: { text: "23 + 41 is 64, so show 6 tens and 4 ones on the rods." },
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
        explanation: { text: "Read the rods left to right: 3 hundreds, 7 tens, and 5 ones make 375." },
      },
      {
        type: "build",
        prompt: "Final drill: build 246 on the abacus.",
        target: 246,
        rods: 3,
        explanation: { text: "246 is 2 hundreds, 4 tens, and 6 ones, so show each digit on its own rod left to right." },
      },
    ],
  },
};
