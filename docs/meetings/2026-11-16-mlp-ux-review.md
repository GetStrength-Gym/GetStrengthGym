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
- **D5** — The navigation stays Home, About Us, Events, Contact. A "Memberships" link to Home's
  price section was tried and dropped the same day; memberships stay a section of Home, and the
  hero's "See memberships" button leads to them. (decided by: Johnson)
- **D6** — Oversized images are resized in place (logo to 480px wide, two photos to 1920px).
  Build-time WebP variants are not added now; revisit if page weight is still a problem.
  (decided by: Johnson)
- **D7** — The map keeps loading by itself; a click-to-load version was tried and dropped the
  same day. The slot shows the address until the map paints. (decided by: Johnson)
- **D8** — The testimonial row advances by itself every 6 seconds, waits on hover or focus, and
  has a pause button. (decided by: Johnson)
- **D9** — Changes D4 the same day: add four light, CSS-based motions (scroll reveal, a looping
  band under the hero, photo zoom on hover, a hero entrance). Six of twelve large gym sites
  checked use scroll reveal and four use a text band. Still no animation library, parallax or
  count-up statistics; the last would need gym figures nobody has confirmed. (decided by: Johnson)
- **D10** — The band under the hero shows the gym's partners and sponsors: Auckland Powerlifting
  Association, SBD New Zealand and New Zealand Powerlifting Federation (per Johnson). The list lives in `frontend/content/site.json`. Until
  Q1 is answered it is preview-only. Each partner shows its logo and name. The APA and NZPF logo
  files were supplied by Johnson on 2026-11-16; SBD's red logo was taken from sbdapparel.com the
  same day.
  (decided by: Johnson)

## Actions
| # | Action | Owner | Due |
|---|--------|-------|-----|
| A1 | Review and merge the refinements PR | Team | — |
| A2 | Try "Play gym video", the Menu and a shared event link on a real phone on the preview | Team | after merge |

## Open questions
- **Q1** — Does the gym confirm these four as its partners and sponsors, with their exact names,
  and can it supply each logo file with permission to show it? (needs: the gym)

## Client-supplied facts
- None. No gym fact was added or changed. The hero sentence now ends "in Penrose, Auckland",
  the address already on the site.

## Promoted to
- D1, D5 → `docs/design/five-page-journey.md` §13
- D2–D4, D6 → `docs/design/five-page-journey.md` §13
- D7–D10 → `docs/design/five-page-journey.md` §13
- Q1 → open; not yet in the project brief
