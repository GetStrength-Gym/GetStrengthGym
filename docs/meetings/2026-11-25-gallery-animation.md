---
date: 2026-11-25
type: internal
attendees: [Kevin]
---

# About gallery animation — 2026-11-25

Kevin said on 2026-11-25 that the "Inside the gym" gallery animation on About looked awkward. Measured
at 1440px: the card stagger written for a row of four ran out of order in the mosaic (photo 5 before
photo 4), the section and each photo both rose at once, and the double-height first photo was still
fading after its neighbours. Two fixes were shown as a replayable sketch; Kevin picked A.

## Decisions

| ID | Decision | Source |
|---|---|---|
| D1 | The gallery moves once: its section no longer rises as a block; the heading rises, then each photo rises over the same short scroll (160px), row by row and left to right across the mosaic. Still CSS only and scroll-linked, off under reduced motion. Supersedes the gallery part of `2026-11-23-visual-polish.md` D2 (cards in a row rise one after another). | Kevin (option A) |

## Open questions

- None.

## Promoted to

- D1 → `frontend/app/globals.css` (motion block) and `docs/design/visual-direction.md` §4
