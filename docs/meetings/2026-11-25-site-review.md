---
date: 2026-11-25
type: internal
attendees: [Kevin]
---

# Whole-site UI/UX review — 2026-11-25

Kevin asked on 2026-11-25 for a review of the whole site for design and viewing improvements. All
five pages were checked at 375px, with mock-ups of the three largest changes. The main finding:
phone pages are long (Home about 8,400px, About about 6,100px). Ten improvements were proposed and
Kevin said "Build all"; each lands as its own commit on PR #33.

Proposed: (1) compact prices on phones and "$30" for whole dollars; (2) coaches side by side on
Home; (3) a two-column gallery on phones; (4) the Join band's wording matching the new pricing
panel; (5) the footer's "Contact the team" label and a phone number; (6) clearer viewing wording;
(7) larger Contact tap targets; (8) linked "What we offer" cards; (9) the lone Contact Instagram
icon; (10) lighter About and "Train together" photos.

## Decisions

| ID | Decision | Source |
|---|---|---|
| D1 | On phones (below 600px) each membership plan is a compact row with the name and price on one line, and the day and weekly passes sit side by side; Home's pricing goes from about 2,000px to 1,500px. Whole-dollar prices show without cents everywhere ("$30 / visit"). | Kevin ("Build all", item 1) |

## Open questions

- None yet.

## Promoted to

- D1 → `frontend/app/globals.css` (memberships, phones), `frontend/lib/format.ts` and
  `docs/design/five-page-journey.md` §7
