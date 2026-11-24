---
date: 2026-11-25
type: internal
attendees: [Kevin]
---

# Hero video and testimonial row — 2026-11-25

Kevin asked on 2026-11-25, on PR #33:

1. The Home hero video is hard to see; make it more visible.
2. In "What our lifters say", move the pause/play button to the side of the screen, keep the cards
   scrolling by themselves, and show the previous/next arrows only while the mouse is over the
   section. While the cursor is on the section the scrolling stops, and the current card is
   enlarged with the others smaller.
3. Later the same day, before the testimonial change was pushed: show the cards as a cycle with the
   current card in the middle and the others at the sides; clicking the next card moves the focus
   to it. Remove the pause button.

## Decisions

| ID | Decision | Source |
|---|---|---|
| D1 | The hero's dark overlay now sits only behind the text: the lower part of the hero on phones, the left side on wide screens (from 960px), fading to clear on the right. White hero text stays readable over the darker part; the rest of the gym floor shows through. | Kevin (ask 1) |
| D2 | The testimonial row's pause/play button moves off the bar under the row onto the row itself, at its right-hand side (top right). It stays visible at all times (WCAG 2.2.2). The bar under the row is gone. | Kevin (ask 2) |
| D3 | The previous/next arrows sit on the left and right edges of the row and show only while the mouse is over it, or while it has keyboard focus. Phones swipe and show no arrows. Clicking an arrow no longer stops the automatic scrolling for good; it carries on once the mouse leaves. A swipe on a phone still stops it. | Kevin (ask 2) |
| D4 | While the mouse or keyboard focus is on the row, it stops scrolling, the current card grows slightly and the other cards shrink and dim. The current card is the one at the start of the row, or the last card once the row reaches its end. No transition under reduced motion. | Kevin (ask 2) |
| D5 | The testimonials become a cycle: the current card sits in the middle, its neighbours smaller and dimmed on either side, and it loops. Clicking a side card, an arrow or the arrow keys, or a swipe, makes the next card current. The arrows (D3) and the pause while the mouse or keyboard focus is on it (D4) stay; a swipe still stops it for good. The current card is always the large one, not only while hovered. Supersedes the row layout of D2–D4. | Kevin (ask 3) |
| D6 | The testimonials' pause button is removed. The cycle still waits while the mouse or keyboard focus is on it, a swipe stops it, and it never moves under reduced motion. Supersedes D2. | Kevin (ask 3) |

## Open questions

- **Q1** — WCAG 2.2.2 (Pause, Stop, Hide) asks for a way to pause content that moves by itself for
  more than 5 seconds. Without a pause button (D6) the cycle relies on pausing while hovered or
  focused, a swipe stopping it, and reduced motion. An accessibility check may count that short;
  revisit before launch, while the testimonials are still preview-only. (needs: Kevin)

## Promoted to

- D1 → `frontend/app/globals.css` (`.home-hero::after`) and `docs/design/five-page-journey.md` §7
- Q1 → open; not promoted
- D2–D6 → `frontend/components/MemberRow.tsx`, `frontend/app/globals.css` (`.member-*`) and
  `docs/design/five-page-journey.md` §7
