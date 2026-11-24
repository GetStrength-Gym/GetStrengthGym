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

## Decisions

| ID | Decision | Source |
|---|---|---|
| D1 | The hero's dark overlay now sits only behind the text: the lower part of the hero on phones, the left side on wide screens (from 960px), fading to clear on the right. White hero text stays readable over the darker part; the rest of the gym floor shows through. | Kevin (ask 1) |

## Open questions

- None.

## Promoted to

- D1 → `frontend/app/globals.css` (`.home-hero::after`) and `docs/design/five-page-journey.md` §7
