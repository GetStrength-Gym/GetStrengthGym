---
date: 2026-11-25
type: design-review
attendees: [Kevin]
---

# About gallery animation — 2026-11-25

A design fix Kevin asked for on PR #33. Not a client meeting; nothing here changes scope, price or
gym facts.

## Purpose
Fix the "Inside the gym" gallery animation on About, which Kevin found awkward.

## Discussion

### What was wrong
- Measured at 1440px. The card stagger, written for a row of four, ran out of order in the mosaic:
  photo 5 started before photo 4.
- The section and each photo both rose at once, so the photos moved twice.
- The double-height first photo was still fading after its neighbours had finished.

### Options shown
- A replayable sketch of today's motion beside two fixes: (A) a tidy rise, CSS only; (B) a photo
  reveal started once by a few lines of script. Kevin picked A.

## Decisions
- **D1** — The gallery moves once: its section no longer rises as a block; the heading rises,
  then each photo rises over the same short scroll (160px), row by row and left to right across
  the mosaic. Still CSS only and scroll-linked, off under reduced motion. Changes the gallery part
  of `2026-11-23-visual-polish.md` D2 (cards in a row rise one after another). (decided by: Kevin)

## Actions
| # | Action | Owner | Due |
|---|--------|-------|-----|
| A1 | Scroll the About gallery on a real phone and desktop to check the motion by eye | Team | before launch |

## Open questions
- None.

## Client-supplied facts
- None.

## Promoted to
- D1 → `frontend/app/globals.css` (motion block) and `docs/design/visual-direction.md` §4
