---
date: 2026-11-12
type: technical
attendees: [Kevin]
---

# GS-23 review follow-up — 2026-11-12

Records the response to Johnson's 2026-11-11 review of PR #15 (GS-23), applied by Kevin on
2026-11-12. Review comments are evidence; this is not a client meeting.

## Decisions

| ID | Decision | Source |
|---|---|---|
| D1 | The member testimonials section on Home uses native CSS scroll-snap (a plain list of photo cards) instead of a client-side carousel. | Johnson's review, change 1 |
| D2 | The **video testimonials** promised in `docs/requirements.md` remain the deliverable. Until the client supplies the footage, the preview placeholder is a row of five member photo cards labelled "[Member testimonial to be supplied]" instead of grey video boxes; the section stays out of production. When footage arrives, the cards are replaced by the videos. | Kevin, following Johnson's review note |
| D3 | Why GS Gym icons are chosen by card position in `app/page.tsx`, not by a field in `site.json`. | Johnson's review, change 2 |
| D4 | Unused `.text-link` removed; `SocialIcon` reduced to one Instagram check with sizes in CSS. | Johnson's review, changes 3–4 |

## Open questions

- **Q1** — The privacy policy (brief Q11) must mention the Google Maps embed on Home and
  Contact, a third-party service that may set cookies. (needs: client, with the policy)
- **Q2** — "#1 ranked powerlifting team in Auckland" (the gym's Instagram bio) and "since 2001"
  (per Kevin) need a source the gym approves before launch. (needs: client)
- **Q3** — The hero video (5.6 MB) also downloads on phones; a poster-only hero on small
  screens would avoid it. Left as is for now. (needs: team)

## Promoted to

- D1, D3, D4 → code on `feature/GS-23-gym-photos` (commits `7632a4c`, `f58d837`, `17e8771`)
- D2 → no requirements change (the promise is unchanged); `frontend/content/photos.json` `homeMembers`
- Q1 → project brief Q11
- Q2 → project brief Q16
- Q3 → open; not promoted
