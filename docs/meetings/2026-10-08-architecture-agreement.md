---
date: 2026-10-08
type: internal
attendees: [Johnson Zhang, Desmond Li, Jayden Pham, Kevin Wang]
duration: TODO(confirm)
---

# Architecture agreement — 2026-10-08

> **How these minutes were made:** reconstructed on 2026-10-10 from the lead's account. No raw
> notes or recording exist. The record covers **what was agreed**, not the discussion. Anything
> said in the room that isn't below was not reported, so it isn't recorded.

## Attendees
- Johnson Zhang (lead)
- Desmond Li (developer)
- Jayden Pham (developer)
- Kevin Wang (developer)

Attendance as reported by the lead: "everyone". TODO(confirm) if anyone was absent.

## Purpose
Get the whole development team to agree the architecture the lead designed before any site
pages are built.

## Discussion
Not recorded. See the note at the top.

## Decisions
All four agreed unanimously to the architecture the lead designed (decided by: whole team).

- **D1** — **No CMS.** Gym staff never edit the site. Content changes are requested from the
  team, which edits Markdown/JSON files in the repo.
- **D2** — **Next.js with static export** is the framework. No server runtime.
- **D3** — **AWS hosting, in GetStrength's own account:** Route 53 (DNS) → CloudFront (CDN, with
  an ACM certificate) → S3 (private bucket).
- **D4** — **Docker is for local development and testing only.** Nothing runs in containers in
  production.

## Actions
| # | Action | Owner | Due |
|---|--------|-------|-----|
| A1 | Ask the client to create the AWS account in GetStrength's name, or approve us creating it. This is the only thing blocking the week-1 preview (GS-16) | Johnson | Before the preview |
| A2 | Agree the AWS running cost and the change-request ("just ask") terms with the client | Johnson | Week-2 review, 2026-10-12–18 |

## Open questions
- **Q1** — Contact-form mechanism (must stay free; the client document promises it). (needs: team)
- **Q2** — Who handles change requests, from which email, and how fast. (needs: Johnson, with the client)

## Client-supplied facts
None. Internal meeting.

## Promoted to
- D1 → `docs/context/decisions/ADR-003-maintenance-team-editing.md` (accepted 2026-10-05)
- D2 → `docs/context/decisions/ADR-005-nextjs-static-export.md` (accepted 2026-10-05)
- D3 → `docs/context/decisions/ADR-004-hosting-on-aws.md` and `ADR-007-aws-delivery-route53-oac.md`
  (the lead's diagram, written up 2026-10-10, including the CloudFront Function and the 403 → 404
  mapping that working through the design turned up)
- D4 → `docs/context/decisions/ADR-004-hosting-on-aws.md`
- Q1, Q2 → project brief, Open questions (Q7, Q6)

## Raw source
None. Reconstructed from the lead's account on 2026-10-10.
