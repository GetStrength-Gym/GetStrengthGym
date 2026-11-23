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
| D8 | Later the same day: About's separate photo header (D5) is removed. Its thin strip cut through two people's faces and sat directly on the dark story photo. The kicker and H1 move into the top of the story band, above a smaller "Our story". Kevin chose this from three browser previews (merge into the story, a banner photo, a light header). Contact keeps its header. | Kevin |
| D9 | The map in Home's Find GS Gym is larger and tighter: on desktop the heading moves into the left column, so the map lines up with "Come train with us" at the top and keeps a 16:9 shape (never shorter than the text beside it), across two-thirds of the row (was just over half, below the heading). Phones show it 360px tall (was 240px). Contact's map is unchanged. | Kevin |
| D10 | About's preview-only "What we offer" placeholder (three unconfirmed service cards) is removed, with its `aboutOffers` photo slot and three photos used only there. A services section comes back only once the gym confirms its services. | Kevin |
| D11 | Home's preview-only partners band (Auckland Powerlifting Association, SBD New Zealand, New Zealand Powerlifting Federation) is removed, with its `partners` list in `site.json`, the band component and styles, and the three logo files. The gym never confirmed the list or the logo permissions (brief Q18, now withdrawn). | Kevin |

## Open questions

- **Q1** — D7 changes the footer from the Figma design. Mention it to the client at the next
  review. (needs: Kevin)

## Promoted to

- D1, D2 → `frontend/app/globals.css`; `docs/design/visual-direction.md` §4
- D3 → `frontend/app/globals.css` (every border-radius above 4px set to 4px); `docs/design/visual-direction.md` §4
- D4 → `frontend/components/PriceList.tsx` and `frontend/app/globals.css` (an unset price keeps "Contact us for pricing", at a smaller size)
- D5 → `frontend/components/PageHero.tsx`, `photos.json` `aboutHero` and `contactHero`; the Events
  header's styles are renamed `page-hero` and shared
- D6 → `frontend/app/globals.css` (`.gallery-grid`: first photo double width, and double height on desktop; last photo double width)
- D8 → `frontend/app/about/page.tsx`, `frontend/app/globals.css` (`.story h1`); `photos.json` `aboutHero` removed
- D11 → `frontend/app/page.tsx`, `site.json`, `frontend/lib/content.ts`; Marquee component, its styles and `public/images/partners/` deleted; brief Q18, design docs
- D10 → `frontend/app/about/page.tsx`, `photos.json`, `frontend/lib/content.ts`; `docs/design/five-page-journey.md` §7, runbook
- D9 → `frontend/app/page.tsx` and `frontend/app/globals.css` (`.location-row`)
- D7 → `frontend/components/SiteFooter.tsx`; `docs/design/five-page-journey.md` §3 and §6
