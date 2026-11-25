---
date: 2026-11-23
type: design-review
attendees: [Kevin]
---

# Visual polish — 2026-11-23

A review of the site's animation, style and look that Kevin asked for on PR #33. Not a client
meeting; no price or gym fact changes, but D7 departs from Figma and D12, D13 put unconfirmed
content on the live site.

## Purpose
Find animation, style and aesthetic improvements across the site, and build the ones Kevin picks.

## Discussion

### How it was reviewed
- Claude walked Home, About, Events and Contact at desktop width, compared them with
  `docs/design/visual-direction.md`, and showed eight suggestions as before-and-after mock-ups.
- One suggestion (an underline for the current page in the header) was withdrawn: the header
  already does it. Kevin chose to build the other seven, one commit each.

### Evidence
- Corner radius measured on Home: buttons 4px, price cards 8px, benefit cards, member cards and
  coach photos 16px. The visual direction (§4) says about 2–4px.
- About and Contact open with a plain neutral band; Home and Events open with a dark photo.
- The "Find your membership" band's Join button is followed directly by the footer's Join button.

### Later the same day
- About's new photo header (D5) cut through two people's faces; three browser previews were shown
  and Kevin picked merging the title into the story band (D8).
- Kevin asked for a larger map on Home (D9).
- Kevin asked for the "What we offer" and partners placeholders to be removed (D10, D11), then
  clarified he meant only their placeholder status, not the content (D12, D13).

## Decisions
- **D1** — Buttons press in slightly (scale 0.97) when clicked, and a trailing arrow nudges
  forward on hover. CSS only; off under reduced motion. (decided by: Kevin)
- **D2** — Cards in a row (Why GS Gym, prices, passes, gallery) rise in one after another as they
  scroll into view. Side by side only; on phones each card rises on its own. (decided by: Kevin)
- **D3** — One corner size, 4px, on buttons, cards and photos, as the visual direction says.
  (decided by: Kevin)
- **D4** — Price cards show the price large and the period small, with each detail on its own
  line. (decided by: Kevin)
- **D5** — About and Contact open with a dark gym photo header, like Events. (decided by: Kevin)
- **D6** — The About gallery becomes a mosaic led by one large photo, using the same eight photos.
  (decided by: Kevin)
- **D7** — The footer's Join button is removed; the Join band above it and the header keep
  theirs. (decided by: Kevin)
- **D8** — Changes D5 for About the same day: About's separate photo header is removed. Its thin
  strip cut through two people's faces and sat directly on the dark story photo. The kicker and H1
  move into the top of the story band, above a smaller "Our story". Kevin chose this from three
  browser previews (merge into the story, a banner photo, a light header). Contact keeps its
  header. (decided by: Kevin)
- **D9** — The map in Home's Find GS Gym is larger and tighter: on desktop the heading moves into
  the left column, so the map lines up with "Come train with us" at the top and keeps a 16:9 shape
  (never shorter than the text beside it), across two-thirds of the row (was just over half, below
  the heading). Phones show it 360px tall (was 240px). Contact's map is unchanged.
  (decided by: Kevin)
- **D10** — About's preview-only "What we offer" placeholder (three unconfirmed service cards) is
  removed, with its `aboutOffers` photo slot and three photos used only there. A services section
  comes back only once the gym confirms its services. (decided by: Kevin)
- **D11** — Home's preview-only partners band (Auckland Powerlifting Association, SBD New Zealand,
  New Zealand Powerlifting Federation) is removed, with its `partners` list in `site.json`, the
  band component and styles, and the three logo files. The gym never confirmed the list or the
  logo permissions (brief Q18, then withdrawn). (decided by: Kevin)
- **D12** — Changes D11 the same day, reversing it. Kevin wanted the band kept and only its
  placeholder status removed, so the partners band, list, component, styles and logos are
  restored, and the band now shows on the live site as well as in preview. Brief Q18 is reopened:
  the gym still has to confirm the names and logo permission before launch. (decided by: Kevin)
- **D13** — Changes D10 the same day, reversing it as D12 reversed D11. Kevin wanted the "What we
  offer" content kept and only its placeholder removed, so the three service cards, the
  `aboutOffers` photo slot and its three photos are restored, the "Services to confirm with the
  gym — preview only." label is dropped, and the section shows on the live site.
  (decided by: Kevin)

## Actions
| # | Action | Owner | Due |
|---|--------|-------|-----|
| A1 | Mention the footer change (D7), which departs from Figma, to the client at the next review (Q1) | Kevin | next client review |
| A2 | Ask the gym to confirm the partner names and logo permission (Q2) and the three services (Q3) | Kevin | before launch |

## Open questions
- **Q1** — D7 changes the footer from the Figma design. Mention it to the client at the next
  review. (needs: Kevin)
- **Q2** — D12 shows the partner logos on the live site before the gym has confirmed them (brief
  Q18). Confirm before launch. (needs: Kevin)
- **Q3** — D13 puts three service descriptions on the live site that the gym has not confirmed.
  `docs/requirements.md` says About shows "confirmed coaches/services", so confirm them with the
  gym before launch. (needs: Kevin)

## Client-supplied facts
- None. No gym fact was added; D12 and D13 put existing, unconfirmed content on the live site.

## Promoted to
- D1, D2 → `frontend/app/globals.css`; `docs/design/visual-direction.md` §4
- D3 → `frontend/app/globals.css` (every border-radius above 4px set to 4px);
  `docs/design/visual-direction.md` §4
- D4 → `frontend/components/PriceList.tsx` and `frontend/app/globals.css` (an unset price keeps
  "Contact us for pricing", at a smaller size)
- D5 → `frontend/components/PageHero.tsx`, `photos.json` `aboutHero` and `contactHero`; the Events
  header's styles are renamed `page-hero` and shared
- D6 → `frontend/app/globals.css` (`.gallery-grid`: first photo double width, and double height on
  desktop; last photo double width)
- D7 → `frontend/components/SiteFooter.tsx`; `docs/design/five-page-journey.md` §3 and §6
- D8 → `frontend/app/about/page.tsx`, `frontend/app/globals.css` (`.story h1`); `photos.json`
  `aboutHero` removed
- D9 → `frontend/app/page.tsx` and `frontend/app/globals.css` (`.location-row`)
- D10 → `frontend/app/about/page.tsx`, `photos.json`, `frontend/lib/content.ts`;
  `docs/design/five-page-journey.md` §7, runbook
- D11 → `frontend/app/page.tsx`, `site.json`, `frontend/lib/content.ts`; Marquee component, its
  styles and `public/images/partners/` deleted; brief Q18, design docs
- D12 → `frontend/app/page.tsx` (band no longer preview-only); D11's removal reverted; brief Q18,
  `docs/design/five-page-journey.md`
- D13 → `frontend/app/about/page.tsx` (section no longer preview-only, label removed); D10's
  removal reverted; `docs/design/five-page-journey.md` §7
- Q1 → action A1; not promoted
- Q2 → project brief Q18
- Q3 → project brief Q20
