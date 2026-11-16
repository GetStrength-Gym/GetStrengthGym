---
date: 2026-11-16
type: client
attendees: [Kevin, TODO(confirm) client attendees]
---

# Client meeting — 2026-11-16

Outcomes supplied by Kevin after the client meeting. Kevin prepared it on 2026-11-15 for "tomorrow",
so the date is taken as 2026-11-16; the client attendees are `TODO(confirm)`.

## Purpose
Walk the client through the gym photos and the new events calendar, and get answers to the open
content questions.

## Decisions

| ID | Decision | Source |
|---|---|---|
| D1 | The client will send the privacy policy. | Client, via Kevin |
| D2 | The client will send the head coach's portrait and biography. | Client, via Kevin |
| D3 | Member testimonials will be **written quotes** (sentences), not videos; the client will send them. This replaces the video testimonials in `docs/requirements.md` and `docs/meetings/2026-11-12-gs23-review-follow-up.md` D2. | Client, via Kevin |
| D4 | The events calendar lists **both** APA competitions and the gym's own club events, for now. | Client, via Kevin |
| D5 | There are no set staffed hours: visitors **contact the gym to arrange a viewing**. Resolves `docs/meetings/2026-11-11-gs23-content-decisions.md` Q4. | Client, via Kevin |
| D6 | Casual passes are bought by **walking in, or contacting the gym online** first. Given in answer to how to buy the day pass, together with the weekly pass, so it is applied to both. Resolves `docs/meetings/2026-11-11-gs23-content-decisions.md` Q3. | Client, via Kevin |
| D7 | There is a **weekly pass at $45**, alongside the $30 day pass. | Client, via Kevin |

## Open questions
- **Q1** — The enquiry email was given as "info.getstrengthgym.com", which is not a valid email
  address as written. What is the exact address? Until confirmed it is not shown on the site.
  (needs: Kevin or the client)
- **Q2** — Does the photographer (`qbkl.media`) want a credit on the site? Still to ask.
  (needs: client; carries over `docs/meetings/2026-11-11-gs23-content-decisions.md` Q2)

## Client-supplied facts
- Viewing: by appointment, contact the gym to arrange.
- Casual passes: walk in, or contact the gym online. Day pass $30 (already agreed), weekly pass $45.
- Enquiry email, as given: "info.getstrengthgym.com" (exact address to confirm, Q1).

## Promoted to
- D1 → project brief Q11
- D2 → project brief Q12
- D3 → `docs/requirements.md`, project brief, `HANDOVER.md`, `docs/design/` (visual direction,
  five-page journey, README), content-changes runbook. The client's Google Doc copy of the
  requirements needs re-uploading.
- D4 → no change (`docs/maintenance/content-changes.md` already adds gym events when the gym sends them)
- D5 → `frontend/content/site.json` `staffedHours`, `docs/requirements.md`, design docs
- D6, D7 → `frontend/content/prices.json` and `prices.sample.json` (`dayPass`, new `weeklyPass`),
  `docs/requirements.md`, five-page journey §6, runbook
- Q1, Q2 → open; not promoted
