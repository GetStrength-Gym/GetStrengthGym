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
- Gym staff can publish a blog article and change prices without a developer.
- Nobody can lose this site again: every account in GetStrength's name, documented.
- TODO(confirm) — a number the client cares about (enquiries? trial sign-ups?). Never established.

## Scope (in)
Five pages — Home, Blog, The Gym, About Us, Contact — plus outbound links to the merch
store, Front Squat Harness, YouTube and Facebook. Blog editable by staff. Contact form.
Domain switch-over with email preserved. How-to guide and a training session.

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
- **Maintained afterwards by non-technical gym staff.** This decides the stack: the blog
  must be editable without a developer, and any web developer must be able to pick the
  site up later.
- **Hosting must be free** — the client's running costs are part of the pitch.
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

## Changelog
- 2026-08-30 — created; site audited, "static site" assumption disproved
- 2026-09-22 — price agreed at $1,500; scope reduced to five pages plus outbound links
- 2026-09-23 — client accepted; agile cycles, 1-year monitoring, payment on completion
- 2026-09-25 — client supplied membership sign-up URL; brief finalised for handover
- 2026-10-05 — sign-up URL recorded and verified live
