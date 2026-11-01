---
date: 2026-10-18
type: client
attendees: [TODO(confirm)]
duration: TODO(confirm)
---

# Website launch and feature review — 2026-10-18

Written up on 2026-11-01 from an AI-generated meeting summary (raw source below). Kevin
confirmed on 2026-11-01 that the client and team made the blog decision. The summary has
obvious transcription errors, flagged below; anything flagged is not treated as fact.

## Attendees
- TODO(confirm): the summary does not list them.

## Purpose
Review progress on the gym website, membership wording and pricing, launch timing, and
what replaces the blog.

## Discussion

### Blog
- The client and team agreed the blog section goes. A placeholder photo album or photo
  drive was suggested as its replacement; nobody settled what that should be ("I'll have a
  think").

### Membership page
- The client gave feedback on membership wording, including whether the casual day pass is
  a fixed price.
- A pricing statement was recorded, but the summary garbles it (see Client-supplied facts).

### Deployment and running costs
- The team will deploy the site and run it live for one to two weeks to measure the real
  hosting cost, which is expected to be very low.

### Privacy policy
- The site needs its own privacy or cookie policy. Debit Success's policy does not cover
  this website.

### Photography
- Interim photos will be used until professional photos are available after "November
  (Nats)", presumably after the nationals competition. TODO(confirm).

### Mobile and polish
- The mobile version was reviewed and confirmed working for MVP functionality.
- An interactive animation (a model lifting weights following the mouse cursor) was shown
  as possible final polish, to be dropped if not wanted. Animations are future work.

## Decisions
- **D1** — Remove the blog section from the site. Its replacement (photo album or photo
  drive) is still to be decided. (decided by: client and team; confirmed by Kevin 2026-11-01)
- **D2** — Deploy the site within a week and measure running costs over one to two weeks.
  (decided by: team)
- **D3** — The site gets its own privacy or cookie policy. (decided by: client and team)
- **D4** — Use interim photos until professional photos are available. (decided by: client and team)

**Note on later records:** the 2026-10-28 design reconciliation (its D5) kept a minimal
blog. It was written without this meeting's decision. D1 here supersedes it, per Kevin on
2026-11-01.

## Actions
| # | Action | Owner | Due |
|---|--------|-------|-----|
| A1 | Update the membership-page wording from the client's feedback | Team | Immediate |
| A2 | Choose and build a replacement for the blog section, e.g. a photo album | Team | Immediate |
| A3 | Deploy the site and monitor running costs for one to two weeks | Team | 2026-10-25 |
| A4 | Get a privacy/cookie policy written for the website ("chase Monarchy": TODO(confirm) who) | Team | Pending |
| A5 | Get initial interim photos for the photo-album placeholder | Team | Pending |
| A6 | Animations or polish (moving slides, video) as a future enhancement | Team | Future |

## Open questions
- **Q1** — What exactly replaces the blog: an on-site photo album page, or a link out to a
  shared photo drive? (needs: client and team)
- **Q2** — What were the confirmed prices? The summary's line is garbled. (needs: client)
- **Q3** — Who is "Monarchy" in A4? (needs: team)

## Client-supplied facts
- Pricing, **verbatim and not usable as stated**: "Confirmed standard flexible coaching
  prices are $30 (with discounts for Australian students and Black members)". The gym is in
  Auckland, so "Australian" and "Black members" are very likely mis-transcriptions. **Do not
  publish or put into `prices.json` until the client confirms the figures in writing.**

## Promoted to
- D1 → `docs/requirements.md` (pages, scope and quote wording), `docs/design/five-page-journey.md`,
  `docs/design/README.md`, `docs/context/project-brief.md`, `HANDOVER.md`, `README.md`,
  `CLAUDE.md`, maintenance runbooks and an amendment note on ADR-006. Code removed in PR #11 (GS-19).
- D2 → not promoted; the GS-16 preview is live, and the cost check is A3.
- D3 → already in `docs/requirements.md` ("Your privacy policy"); the website-specific point is A4.
- D4 → not promoted; the photo checklist in `docs/requirements.md` still applies.
- Q1 → project brief Q14; Q2 → project brief Q15.
- **Still owed:** re-upload the client Google Doc copy of `docs/requirements.md`.

## Raw source
`raw/2026-10-18-website-launch-feature-review-summary.md`
