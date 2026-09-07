# Peony — Frontend Rules

## Fonts

- **Use the serif font ONLY on the landing page** (`app/page.tsx`).
- **Never** apply `font-serif` (Playfair Display) anywhere else in the app — not on the courses page, course detail, lesson player, welcome, or any component.
- All other pages use the default sans font (Geist), which is already set on `<html>` via `font-sans`.

To add a heading style on a non-landing page, use sans font classes only (e.g. `text-3xl font-bold tracking-tight`) and do not add `font-serif`.
