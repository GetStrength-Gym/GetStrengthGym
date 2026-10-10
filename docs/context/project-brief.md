# Project brief — GetStrength Gym website

**Status: agreed with client, not yet started building.** Last updated 2026-09-25.

## One-liner
Replace the lost GetStrength website with a small, fast, maintainable site that puts the
Onehunga gym first and sends members to the gym's existing membership and store systems.

## Why now
The old site (WordPress, ~2,725 URLs) can no longer be edited — nobody holds wp-admin or
hosting credentials. It also presents GetStrength as a blog and merch store, with the gym
fourth in the navigation, and its homepage has no title tag and no H1.

## Success looks like
- A visitor looking for a gym in Onehunga can reach the membership sign-up in one click.
- Gym staff get a blog article or a price change live by sending us one email (ADR-003).
- Nobody can lose this site again: every account in GetStrength's name, documented.
- TODO(confirm) — a number the client cares about (enquiries? trial sign-ups?). Never established.

## Scope (in)
Five pages — Home, Blog, The Gym, About Us, Contact — plus outbound links to the merch
store, Front Squat Harness, YouTube, Facebook and the membership sign-up. A blog our team
updates on request (no CMS). Contact form. Domain switch-over with email preserved. A
change-request guide and a written developer handover.

## Scope (out)
Shop, cart, checkout, member login, payments, class booking, timetable, phone app,
replacing the merch store, migrating the old blog articles or forum.

## Audiences
1. Prospective members in Onehunga comparing gyms *(assumed — the reordering of the nav rests on this)*
2. Existing members and the wider strength-training audience reading the blog

## Current site
- URL: https://getstrength.com/ — still publicly live and readable, but **not editable**
- Platform: WordPress 7.0.1 + Elementor 4.0.9 + WooCommerce + bbPress, theme `blogus`
- Host: WPX Cloud (Sydney). Nameservers `ns38/ns39.wpxhosting.com`
- Scale: ~2,725 indexed URLs (66 pages, 323 posts, 1,758 forum replies)
- Access: **registrar/domain login only.** Treated as unrecoverable — we are not attempting recovery.
- Full detail: `current-site-audit.md`

## Constraints
- **Budget: $1,500 fixed, no GST**, one payment on completion. Nothing up front.
- **Timeline: ~5 weeks.** Team capacity 21.5 h/week (~107 h total).
- **Maintained afterwards by our team, on request** (ADR-003). Gym staff do not edit the
  site. Any web developer must still be able to pick it up later — Next.js (ADR-005) and a
  written handover are how that promise is kept.
- **Hosting is AWS (S3 + CloudFront) in the client's own account, with their billing**
  (ADR-004, 2026-10-05). The original "hosting must be free" constraint is superseded;
  the client-facing running-cost wording was corrected to match. Keep the bill small and
  visible — low running cost is still part of the pitch, zero is no longer promised.
- **The site must store no member, customer or payment data.**

## Third-party systems
| System | Used for | Owner | Keep? |
|---|---|---|---|
| [Membership sign-up](https://oc.debitsuccess.com/DirectEntry/DirectDebitRequest/Form?brandtemplateid=9adb8b79-828d-4c8b-af23-7b7d6b5cabde) — Debitsuccess direct-debit form, recorded 2026-10-05 | Joining the gym | GetStrength | Link out |
| Teespring | Merch store | GetStrength | Link out |
| Amazon | Front Squat Harness sales | affiliate | Link out |
| YouTube / Facebook | Videos, photos | GetStrength | Link out |
| Google Workspace | Gym email — MX records live in WPX DNS | GetStrength | **Must not break** |
| WooCommerce store on old site | Unknown if still taking orders | — | Unresolved (D1) |

## Open questions
- **Q1** Who at GetStrength signs off? John Strachan is the published contact; the owner may differ.
- **Q2** Is the old WooCommerce store still taking real orders?
- **Q3** Old blog articles — migrate all, migrate the best, or start fresh?
- **Q4** Old forum (1,758 replies) — keep, archive, or retire?
- **Q5** Does the client agree to a small monthly AWS bill on their own account, and to the
  $110 line becoming a change-request guide plus developer handover? (Not yet asked.)
- **Q6** "Just ask" content updates — what is an included change, how fast, and what gets quoted?
- **Q7** Contact-form mechanism. Must stay free; the client doc promises it.
- **Q8** Week-1 preview on AWS — mechanism, and is 2026-10-11 still realistic?
- **Q9** Members' login URL — GS-9 is marked Done but nothing was recorded.

## Changelog
- 2026-08-30 — created; site audited, "static site" assumption disproved
- 2026-09-22 — price agreed at $1,500; scope reduced to five pages plus outbound links
- 2026-09-23 — client accepted; agile cycles, 1-year monitoring, payment on completion
- 2026-09-25 — client supplied membership sign-up URL; brief finalised for handover
- 2026-10-05 — sign-up URL recorded and verified live
- 2026-10-05 — no CMS (ADR-003), AWS S3 + CloudFront (ADR-004), Next.js static export (ADR-005);
  AWS account in GetStrength's name on their billing; $1,500 unchanged
- 2026-10-09 — logo suite received; open questions Q5–Q9 added
- 2026-10-10 — scaffold merged (PR #1); AWS delivery recorded (ADR-007: Route 53, OAC, CloudFront
  Function, ~US$1/month); architecture agreed by the whole team on 2026-10-08 (minutes);
  Dependabot security updates on
