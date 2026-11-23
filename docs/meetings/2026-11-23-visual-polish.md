---
date: 2026-11-23
type: internal
attendees: [Kevin]
---

# Visual polish — 2026-11-23

Kevin asked for a review of the whole site for animation, style and aesthetic improvements
(PR #33). Claude walked Home, About, Events and Contact at desktop width, compared them with
`docs/design/visual-direction.md`, and showed eight suggestions as before-and-after mockups.
One (an underline for the current page in the header) was withdrawn: the header already does it.
Kevin chose to build the other seven, one commit each.

## Evidence

- Corner radius measured on Home: buttons 4px, price cards 8px, benefit cards, member cards and
  coach photos 16px. The visual direction (§4) says about 2–4px.
- About and Contact open with a plain neutral band; Home and Events open with a dark photo.
- The "Find your membership" band's Join button is followed directly by the footer's Join button.

## Decisions

| ID | Decision | Source |
|---|---|---|
| D1 | Buttons press in slightly (scale 0.97) when clicked, and a trailing arrow nudges forward on hover. CSS only; off under reduced motion. | Kevin |
| D2 | Cards in a row (Why GS Gym, prices, passes, gallery) rise in one after another as they scroll into view. Side by side only; on phones each card rises on its own. | Kevin |
| D3 | One corner size, 4px, on buttons, cards and photos, as the visual direction says. | Kevin |
| D4 | Price cards show the price large and the period small, with each detail on its own line. | Kevin |
| D5 | About and Contact open with a dark gym photo header, like Events. | Kevin |
| D6 | The About gallery becomes a mosaic led by one large photo, using the same eight photos. | Kevin |
| D7 | The footer's Join button is removed; the Join band above it and the header keep theirs. | Kevin |

## Open questions

- **Q1** — D7 changes the footer from the Figma design. Mention it to the client at the next
  review. (needs: Kevin)

## Promoted to

- D1, D2 → `frontend/app/globals.css`; `docs/design/visual-direction.md` §4
- D3 → `frontend/app/globals.css` (every border-radius above 4px set to 4px); `docs/design/visual-direction.md` §4
- D4 → `frontend/components/PriceList.tsx` and `frontend/app/globals.css` (an unset price keeps "Contact us for pricing", at a smaller size)
- D5 → `frontend/components/PageHero.tsx`, `photos.json` `aboutHero` and `contactHero`; the Events
  header's styles are renamed `page-hero` and shared
- D6, D7 → recorded as each is built
