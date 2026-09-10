# Peony — Frontend Rules

## Fonts

- **Use the serif font ONLY on the landing page** (`app/page.tsx`).
- **Never** apply `font-serif` (Playfair Display) anywhere else in the app — not on the courses page, course detail, lesson player, welcome, or any component.
- All other pages use the default sans font (Geist), which is already set on `<html>` via `font-sans`.

To add a heading style on a non-landing page, use sans font classes only (e.g. `text-3xl font-bold tracking-tight`) and do not add `font-serif`.

## Colour

**Every course illustration uses one purple-led palette.** Purple is the lead colour, and the colours that go with it are the neutrals (cream, gray), the bright contrasts (yellow, gold) and the rich tones (teal, green). No illustration may pick its own colours.

Import `PALETTE` from `components/courses/illustrations/palette.ts` and give each colour its fixed job:

| Token | Job |
| --- | --- |
| `purple` | The subject: filled slices, symbols, numerals, the ghost outline |
| `purpleDeep` | The dark behind the subject — abacus frames and boards |
| `cream` | Neutral surfaces: chips, beams, empty slices, highlights |
| `gray` | Neutral detail: rods and other quiet structure |
| `gold` | The one bright contrast in a picture: heaven beads, the spark |
| `teal` / `green` | Rich supporting tones: earth beads |

Never hard-code a hex value in an illustration — add it to the palette instead.
