---
date: 2026-11-25
type: design-review
attendees: [Kevin]
---

# Hero video and testimonials — 2026-11-25

Design changes Kevin asked for on PR #33, worked through in one session. Not a client meeting;
nothing here changes scope, price or gym facts.

## Purpose
Make the Home hero video easier to see, and rework the "What our lifters say" testimonials.

## Discussion

### What Kevin asked for, in order
- The hero video is hard to see; make it more visible.
- In "What our lifters say": move the pause button to the side, keep the cards scrolling by
  themselves, show the arrows only while the mouse is over the section, stop while it is there, and
  enlarge the current card with the others smaller.
- Before that was pushed: show the cards as a cycle, the current card in the middle and the others
  at the sides, clicking the next card to move to it; remove the pause button.
- After that was pushed: add a pause button at the top right after all.
- Before that was pushed: put it in the section's top-right corner, not on the card; then further
  into the corner, as level with the heading it looked like it was floating.
- After a before/after mock-up of possible polish: darker side cards without text, the quote as
  the loudest line, progress dots, and more visible arrows on the sides.

### How it was checked
- The hero at 375, 1024 and 1440px. The testimonials at 375 and 768px, and at 1440px by
  measurement (the browser pane crops wide screenshots).

## Decisions
- **D1** — The hero's dark overlay sits only behind the text: the lower part of the hero on phones,
  the left side from 960px, fading to clear on the right. White hero text stays readable over the
  darker part; the rest of the gym floor shows through. (decided by: Kevin)
- **D2** — The testimonial row's pause button moves off the bar under the row onto the row's
  right-hand side (top right), always visible (WCAG 2.2.2). The bar under the row is gone.
  (decided by: Kevin)
- **D3** — The previous/next arrows sit on the row's left and right edges and show only while the
  mouse or keyboard focus is on it; phones swipe and show none. An arrow click no longer stops the
  automatic scrolling for good; a swipe on a phone still does. (decided by: Kevin)
- **D4** — While the mouse or keyboard focus is on the row it stops, the current card grows
  slightly and the others shrink and dim. The current card is the one at the start of the row, or
  the last once the row reaches its end. No transition under reduced motion. (decided by: Kevin)
- **D5** — Changes D2–D4's row the same day: the testimonials become a cycle. The current card
  sits in the middle, its neighbours smaller and dimmed on either side, and it loops. A side card,
  an arrow, the arrow keys or a swipe make the next card current. The arrows (D3) and the hold
  while the mouse or focus is on it (D4) stay; a swipe still stops it for good. The current card is
  always the large one, not only while hovered. (decided by: Kevin)
- **D6** — Changes D2 the same day: the pause button is removed. The cycle still holds while the
  mouse or focus is on it, a swipe stops it, and it never moves under reduced motion.
  (decided by: Kevin)
- **D7** — Changes D6 the same day: the pause button is back, in the middle card's top-right
  corner. Play moves one card straight away. It is hidden under reduced motion, where nothing
  moves. Answers Q1. (decided by: Kevin)
- **D8** — Changes D7's position the same day: the pause button sits in the section's own
  top-right corner (16px in on phones, 24px from 960px), not on the card and not level with the
  heading. The heading keeps clear of it. (decided by: Kevin)
- **D9** — Changes D3's hover-only arrows the same day. Side cards are darkened instead of faded
  and show only their photo. The quote is the largest line, under a red opening quote mark, with
  the member's name as a small uppercase label. One dot per card sits under the cycle; the current
  one is a red bar that fills over 6 seconds and moves the cycle on when full (it holds while
  hovered, focused or paused, and does not fill under reduced motion); clicking a dot shows that
  card. The arrows are always visible on the sides, larger on desktop, and turn red on hover.
  (decided by: Kevin)

## Actions
| # | Action | Owner | Due |
|---|--------|-------|-----|
| A1 | Try the cycle's swipe, arrows and pause on a real phone on the preview | Team | before launch |

## Open questions
- **Q1** — WCAG 2.2.2 (Pause, Stop, Hide) asks for a way to pause content that moves by itself
  for more than 5 seconds. Without a pause button (D6) the cycle relies on pausing while hovered or
  focused, a swipe stopping it, and reduced motion. An accessibility check may count that short;
  revisit before launch, while the testimonials are still preview-only. (needs: Kevin)
  **Answered the same day by D7:** the pause button is back.

## Client-supplied facts
- None. The testimonials are still preview placeholders until the client sends the quotes
  (`2026-11-16-client-meeting.md` D3).

## Promoted to
- D1 → `frontend/app/globals.css` (`.home-hero::after`) and `docs/design/five-page-journey.md` §7
- D2–D9 → `frontend/components/MemberRow.tsx`, `frontend/app/globals.css` (`.member-*`) and
  `docs/design/five-page-journey.md` §7
- D5, D9 → also `docs/design/visual-direction.md` §4 (motion)
- Q1 → answered by D7; not promoted
