---
date: 2026-11-25
type: design-review
attendees: [Kevin]
---

# Join option under pricing — 2026-11-25

A design change Kevin asked for on PR #33. Not a client meeting; no price or gym fact changes, but
D1 changes the agreed memberships layout in `requirements.md`, which the client reads.

## Purpose
Give visitors a clear way to join right after the prices, and drop the unconfirmed wording.

## Discussion

### The ask
- Kevin asked for a join option under the prices on Home, clearer instructions (for example "sign
  up through this link"), and the unconfirmed wording removed.

### Options shown
- Three mock-ups at tablet width, live in the browser: (A) a dark "Ready to join?" panel under the
  passes; (B) a three-step "How to join"; (C) an instruction and the Join button above the cards,
  with a text link below. Kevin picked A.

### What it conflicts with
- `requirements.md` and `five-page-journey.md` §6 ruled out a standalone Join button and a How
  joining works guide in the memberships section. D1 changes that; there are still no per-plan
  buttons.
- ADR-006 labels the preview's sample prices. D3 removes that label (Q1).

## Decisions
- **D1** — The memberships section on Home ends with a dark "Ready to join?" panel under the day
  and weekly passes: "Sign up online through our Debit Success form, which also sets up your
  billing and terms", the Join GS Gym button (same label and Debit Success link as everywhere
  else, same tab), and a "Questions first? Contact us" link. Still no per-plan buttons. Changes
  "no standalone Join button" in `five-page-journey.md` §6 and `requirements.md`.
  (decided by: Kevin)
- **D2** — The intro reads "Compare the plans below, then sign up online through the Join GS Gym
  link at the end." (decided by: Kevin)
- **D3** — The unconfirmed wording is removed from the preview: the "Unconfirmed prices and terms
  — preview only. Confirm current details with the gym." line and the sample cards' "Confirm the
  minimum term with the gym." lines. This departs from ADR-006 (Q1). The live site is unaffected:
  it shows no prices until `prices.json` is confirmed, and "Contact us for pricing" until then.
  (decided by: Kevin)

## Actions
| # | Action | Owner | Due |
|---|--------|-------|-----|
| A1 | Make the same change to the memberships paragraph in the client's Google Doc copy of `requirements.md` | Kevin | before the client next reads it |

## Open questions
- **Q1** — Without the label, anyone viewing the preview (including the client) may read the
  sample prices as real. Accept that in a superseding ADR, or bring back a quieter label?
  (needs: Kevin)

## Client-supplied facts
- None. No price, term or gym fact was added or changed.

## Promoted to
- D1, D2 → `frontend/components/PriceList.tsx`, `frontend/app/globals.css` (`.join-panel`),
  `docs/requirements.md` (memberships paragraph) and `docs/design/five-page-journey.md` §6, §7
- D3 → `frontend/components/PriceList.tsx`, `frontend/content/prices.sample.json`
- Q1 → project brief Q19
