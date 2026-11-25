---
date: 2026-11-25
type: internal
attendees: [Kevin]
---

# Join option under pricing — 2026-11-25

Kevin asked on 2026-11-25, on PR #33, for a way to join directly under the prices on Home, with
clearer instructions (for example "sign up through this link"), and for the unconfirmed wording to
be removed. Three mock-ups were shown in the browser (a dark "Ready to join?" panel, a three-step
"How to join", and an instruction with the button above the cards); Kevin picked the panel.

## Decisions

| ID | Decision | Source |
|---|---|---|
| D1 | The memberships section on Home ends with a dark "Ready to join?" panel under the day and weekly passes: "Sign up online through our Debit Success form, which also sets up your billing and terms", the Join GS Gym button (same label and Debit Success link as everywhere else, same tab), and a "Questions first? Contact us" link. Still no per-plan buttons. Supersedes "no standalone Join button" in the memberships section (`five-page-journey.md` §6, `requirements.md`). | Kevin (option A) |
| D2 | The intro reads "Compare the plans below, then sign up online through the Join GS Gym link at the end." | Kevin ("make instruction clearer") |
| D3 | The unconfirmed wording is removed from the preview: the "Unconfirmed prices and terms — preview only. Confirm current details with the gym." line and the sample cards' "Confirm the minimum term with the gym." lines. This departs from ADR-006, which labels preview prices as samples; see Q1. The live site is unaffected: it shows no prices until `prices.json` is confirmed, and "Contact us for pricing" until then. | Kevin |

## Open questions

- **Q1** — Without the label, anyone viewing the preview (including the client) may read the sample
  prices as real. Either accept that in a superseding ADR, or bring back a quieter label. (needs: Kevin)
- **Q2** — `requirements.md` is mirrored in the client's Google Doc; the memberships paragraph there
  needs the same change before they disagree. (needs: Kevin)

## Promoted to

- D1, D2 → `frontend/components/PriceList.tsx`, `frontend/app/globals.css` (`.join-panel`),
  `docs/requirements.md` (memberships paragraph) and `docs/design/five-page-journey.md` §6, §7
- D3 → `frontend/components/PriceList.tsx`, `frontend/content/prices.sample.json`
- Q1, Q2 → open; not promoted
