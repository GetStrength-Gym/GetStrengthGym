---
date: 2026-11-23
type: internal
attendees: [Kevin]
---

# Coach Joe Mundey profile — 2026-11-23

Content Kevin supplied when a second coach was added on PR #33. Not a client meeting; it adds a gym
fact from the client's album and the coach's own Instagram. Follows `2026-11-23-head-coach-profile.md`.

## Purpose
Add coach Joe Mundey under the head coach on Home and About.

## Discussion

### The ask
- Kevin asked for Joe Mundey to be added under the head coach on Home and About, with a portrait
  from the client's shared album and a biography from his Instagram.

### Evidence
- The client's shared Google Photos album "GET STRENGTH GYM": a portrait of Joe leaning on a squat
  rack in an SBD T-shirt, photographed by qbkl.media (link held by Kevin, not in the public repo).
- Joe's public Instagram, `https://www.instagram.com/joemundey/`, read 2026-11-23: display name
  "Joseph Mundey"; no profile bio. Post captions record novice powerlifting competitions in New
  South Wales from April 2022 and a first sanctioned competition in December 2022 (under 120 kg);
  a post in April 2024 after a month in New Zealand (visiting Piha, Auckland); his "first
  Nationals" in October 2025; and "Nats 2026" in November 2026, a 680 kg total, described as a
  105 kg personal best after dropping a weight class. Posts tag @getstrengthgym.

## Decisions
- **D1** — Joe's portrait is the one Kevin linked from the album, shown on Home and About.
  (decided by: Kevin)
- **D2** — He is shown as **Joe Mundey**, role **Coach** ("the other coach", per Kevin). The docs
  record Joe as the owner (brief Q1); the site says coach only, as for Raynan. (decided by: Kevin)
- **D3** — Joe's row sits under Raynan's, with the photo on the right and the biography on the
  left on wide screens. (decided by: Kevin)
- **D4** — Biography: a competitive powerlifter in the under-105 kg class who started competing in
  Australia in 2022, moved to Auckland in 2024, and competed at the New Zealand Nationals in 2025
  and 2026, totalling 680 kg. From his Instagram captions; personal posts (health, family, pets)
  are left out. (decided by: Kevin)
- **D5** — Changes the role part of D2 the same day: the role line under each coach's name ("Head
  coach", "Coach") is removed from Home and About. Raynan's biography still names him head coach.
  (decided by: Kevin)
- **D6** — Changes the wording of D4 the same day, after a self-review: the biography now says the
  680 kg total was at the 2026 Nationals; the earlier wording read as both years (his 2025
  Nationals total was in the heavier class). Proposed by Claude from his Instagram captions.
  (decided by: Kevin)

## Actions
| # | Action | Owner | Due |
|---|--------|-------|-----|
| A1 | Ask Joe to confirm his biography (Q1) | Kevin | before launch |

## Open questions
- **Q1** — Confirm the biography with Joe, in particular that "Nats" is the New Zealand Nationals,
  the under-105 kg class, and the 2024 move to Auckland. (needs: Kevin)

## Client-supplied facts
- Coach: Joe Mundey; portrait in the client's shared album, photographed by qbkl.media.

## Promoted to
- D1–D4, D6 → `frontend/content/site.json` `coaches` (photo, name, biography)
- D3, D5 → `frontend/components/Coaches.tsx` and `docs/design/five-page-journey.md` §7
- Q1 → project brief Q21
