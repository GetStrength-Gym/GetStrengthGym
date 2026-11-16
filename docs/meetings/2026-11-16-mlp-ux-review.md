---
date: 2026-11-16
type: design-review
attendees: [Johnson]
---

# MLP UI/UX review — 2026-11-16

A design review of the current site by Johnson (lead), moving it from a working MVP towards a
more polished product. Not a client meeting; nothing here changes scope, price or gym facts.

## Purpose
Find and fix the UI/UX and quality-of-life problems a visitor meets on the current build.

## Discussion

### How it was reviewed
- Every page of the `main` build (commit `89e7264`) was captured at 375px and 1440px and read
  against the page sources and `globals.css`.
- Preview placeholders (coach, testimonials, the disabled form) were excluded; only the layout
  they sit in was reviewed.
- Proposed designs are in a Figma file held by the lead.

### What visitors hit
- Membership prices sat below five other sections on Home, with no navigation link.
- The 5.5 MB hero video downloaded and played on phones.
- On phone Contact, the phone number and address sat under the whole form.
- Benefit cards were three 420px photo cards on phones, with descriptions behind hover on desktop.
- The red eyebrow was as loud as the heading under it.
- On phone Events, the month grid came before the first event; picking a date gave no visible
  result and repeat clicks cycled silently; a shared link lost the chosen event.
- The phone header was two rows (128px) and scrolled away.

## Decisions
- **D1** — Build the fourteen refinements listed in `docs/design/five-page-journey.md` §13.
  (decided by: Johnson)
- **D2** — Keep Inter and the charcoal and red palette; no new display font. (decided by: Johnson)
- **D3** — No per-plan Join buttons and no "most popular" badge: the first is the client's
  earlier decision, the second would invent evidence. (decided by: Johnson)
- **D4** — No scroll animations, carousel library or fixed bottom action bar. (decided by: Johnson)
- **D5** — "Memberships" joins the navigation as a link to Home's price section. It is not a new
  page, so the page list in `docs/requirements.md` is unchanged. (decided by: Johnson)
- **D6** — Oversized images are resized in place (logo to 480px wide, two photos to 1920px).
  Build-time WebP variants are not added now; revisit if page weight is still a problem.
  (decided by: Johnson)

## Actions
| # | Action | Owner | Due |
|---|--------|-------|-----|
| A1 | Review and merge the refinements PR | Team | — |
| A2 | Try "Play gym video", the Menu and a shared event link on a real phone on the preview | Team | after merge |

## Open questions
- **Q1** — The map now loads Google only on request. Does that change what the privacy policy
  must say about Maps? (needs: brief Q11 owner)

## Client-supplied facts
- None. No gym fact was added or changed. The hero sentence now ends "in Penrose, Auckland",
  the address already on the site.

## Promoted to
- D1, D5 → `docs/design/five-page-journey.md` §3 and §13; `HANDOVER.md` (nav)
- D2–D4, D6 → `docs/design/five-page-journey.md` §13
- Q1 → open; relates to project brief Q11
