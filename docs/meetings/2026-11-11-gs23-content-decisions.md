---
date: 2026-11-11
type: internal
attendees: [Kevin]
---

# GS-23 content decisions — 2026-11-11

Decisions supplied by Kevin in the Claude Code chat on 2026-11-10 and 2026-11-11
(Pacific/Auckland) while implementing GS-23. Several were reported from the latest client
meeting; that meeting's date and attendees are TODO(confirm), so this record is not the
client meeting's minutes and not client sign-off beyond what Kevin reported.

## Evidence

- The client's shared Google Photos album "GET STRENGTH GYM" (37 photos and one drone video,
  dated 2026-11-09; link held by Kevin, not in the public repo). Photo metadata credits
  `qbkl.media`.
- The gym's Instagram (`https://www.instagram.com/getstrengthgym/`), read 2026-11-11: bio
  "Home to the #1 ranked Powerlifting team in Auckland"; a 2026-05-10 post announcing
  20/10 Olive Road as the new home.
- The gym's Google Maps listing at 20/10 Olive Road, read 2026-11-11: open 24 hours,
  09 622 2885, getstrength.co.nz.
- The Facebook page `https://www.facebook.com/getstrengthgym`, read 2026-11-11: still lists
  the old Onehunga address and old-owner contacts, so not used as current-gym evidence.

## Decisions

| ID | Decision | Source |
|---|---|---|
| D1 | Casual day pass is **$30 a visit**. How to buy one is unconfirmed. | Kevin, from the latest client meeting |
| D2 | The 2026-11-09 album photos and drone video are approved for use on the site, including the people in them. | Kevin, from the latest client meeting |
| D3 | The blog's replacement is an **events calendar page** working like `https://www.sporty.co.nz/aucklandpowerlifting/events-calendar`; not yet built. Supersedes Q14's photo-album or drive-link options. | Kevin |
| D4 | About's story: open **since 2001**; home to the #1 ranked powerlifting team in Auckland; moved to 20/10 Olive Road in May 2026. | Kevin (2001); gym's Instagram (the rest) |
| D5 | Member access is **24/7**. Staffed/viewing hours remain unknown. | Kevin; Google Maps agrees |
| D6 | The phone number is **09 622 2885**. | Kevin, from the Google Maps listing |
| D7 | Facebook stays off the site. It was re-added and removed again the same day, so 2026-10-28 D4 stands. | Kevin |
| D8 | Member testimonials stay a preview-only carousel with placeholder text until real testimonials and member consent arrive. | Kevin |

## Open questions

- **Q1** — Date and attendees of the client meeting where D1 and D2 were agreed. (needs: Kevin)
- **Q2** — Does the photographer (`qbkl.media`) want a credit on the site? (needs: client)
- **Q3** — How visitors buy a day pass. (needs: client)
- **Q4** — Staffed/viewing hours. (needs: client)
- **Q5** — Which domain the gym uses: Instagram and Google Maps link `getstrength.co.nz`; the
  project assumes `getstrength.com`. (needs: client, before any DNS work)
- **Q6** — Where the events calendar's competitions come from, and who updates them. (needs: team)

## Client-supplied facts

- Day pass: $30 a visit (via Kevin).
- Member access: 24/7 (via Kevin).
- Phone: 09 622 2885 (via Kevin, from Google Maps).
- Open since 2001 (via Kevin).

## Promoted to

- D1 → `docs/requirements.md`, `frontend/content/prices.json` and `prices.sample.json`
- D2 → `HANDOVER.md`, `frontend/content/photos.json`
- D3 → `docs/context/project-brief.md` Q14, `HANDOVER.md`, `CLAUDE.md`, `docs/design/five-page-journey.md` §5
- D4 → `frontend/content/site.json` `about.story`, project brief changelog
- D5 → `docs/requirements.md`, `docs/design/five-page-journey.md`, `frontend/content/site.json`
- D6 → `frontend/content/site.json`, `docs/design/five-page-journey.md`, project brief changelog
- D7 → no change (2026-10-28 D4 stands)
- D8 → `frontend/content/photos.json` `homeMembers`, preview-only in `frontend/app/page.tsx`
- Q1–Q6 → open; Q5 belongs in the project brief's open questions before launch
