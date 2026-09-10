# Peony — Frontend Rules

## Fonts

- **Use the serif font ONLY on the landing page** (`app/page.tsx`).
- **Never** apply `font-serif` (Playfair Display) anywhere else in the app — not on the courses page, course detail, lesson player, welcome, or any component.
- All other pages use the default sans font (Geist), which is already set on `<html>` via `font-sans`.

To add a heading style on a non-landing page, use sans font classes only (e.g. `text-3xl font-bold tracking-tight`) and do not add `font-serif`.

## Colour

**Every course illustration uses one palette: black in shades, with yellow as the bright note.** No illustration may pick its own colours.

Import `PALETTE` from `components/courses/illustrations/palette.ts`. The neutral scale runs from black up to paper — `ink` → `charcoal` → `gray` → `paper` — and yellow sits on top of it in three strengths. Give each token its fixed job:

| Token | Job |
| --- | --- |
| `ink` | The subject: boards and frames, symbols, numerals, filled slices |
| `charcoal` | The lighter black: tiles and structure beside the subject |
| `gray` | Quiet neutral detail: rods and ghost lines |
| `fog` | Light grey: the plate every illustration sits on |
| `paper` | The light neutral: beads, chips, highlights that must read on ink |
| `butter` | Pale yellow: beams and quiet washes |
| `yellow` | The bright note: heaven beads, symbols, the spark |
| `yellowDeep` | Deeper yellow: shading, and the Chinese board's beads |

Never hard-code a hex value in an illustration — add it to the palette instead.

**Illustrations sit on `fog`.** Both the course card artwork and the path icon are drawn on the same light grey plate, never on a per-course gradient — course colours belong to the course, not behind its artwork.
