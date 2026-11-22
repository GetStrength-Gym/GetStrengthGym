---
date: 2026-11-23
type: internal
attendees: [Kevin]
---

# Head coach profile — 2026-11-23

Kevin supplied these on 2026-11-23 while the head coach was added to the site (PR #33). The
2026-11-16 client meeting said the client would send the head coach's portrait and biography
(`docs/meetings/2026-11-16-client-meeting.md` D2); Kevin reported they are in the shared album
and pointed to the coach's own Instagram for the biography.

## Evidence

- The client's shared Google Photos album "GET STRENGTH GYM": six portraits of the head coach
  added 2026-11-16 (link held by Kevin, not in the public repo).
- The coach's public Instagram, `https://www.instagram.com/raynan_mishra/`, read 2026-11-23:
  display name "Raynan"; bio "U93", "Co-Owner & Coach @getstrengthgym"; story highlights titled
  "Japan 25", "CW 22" and "UAE 23".

## Decisions

| ID | Decision | Source |
|---|---|---|
| D1 | The head coach photo on Home and About is the seated portrait in a GetStrength shirt: the warmest expression and eye contact of the six, and centred, so it crops cleanly to the coach slot. | Chosen by Claude, approved by Kevin (commit `59fae11`) |
| D2 | The head coach is **Raynan Mishra**, shown as **Head coach**. His Instagram says "Co-Owner & Coach"; the site says head coach only (the docs name Joe as owner, brief Q1). | Kevin |
| D3 | Biography: a competitive powerlifter in the under-93 kg class who has competed at international powerlifting competitions, including in the UAE (2023) and Japan (2025). | His Instagram; Kevin confirmed the international competitions |
| D4 | With name, role, biography and photo settled, the coach section is shown on the live site, not only in preview. | Kevin |

## Open questions

- **Q1** — Should Raynan read the wording before launch? (needs: Kevin)
- **Q2** — "Mishra" comes from his Instagram handle, not a display name. Confirm the spelling with
  him. (needs: Kevin)

## Promoted to

- D1 → `frontend/content/photos.json` `headCoach`
- D2, D3 → `frontend/content/site.json` `coach`
- D4 → `frontend/app/page.tsx` and `frontend/app/about/page.tsx` (coach sections no longer preview-only)
- D2–D4 → project brief Q12 (resolved), `docs/design/five-page-journey.md` §7 and §13, runbook
- Q1, Q2 → open; not promoted
