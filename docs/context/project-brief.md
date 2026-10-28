# Project brief — GetStrength Gym website

**Design scope updated 2026-10-28.** See `../meetings/2026-10-28-design-reconciliation.md`.
GS-15 contains a partial implementation; the current migration reference is the user's
GetStrength MVP. Historical infrastructure/audit notes below are not a fresh live check.

## One-liner
Replace the lost GetStrength website with a small, fast, maintainable site that puts the
Penrose gym first and sends members to the current gym's external membership signup.

## Why now
The old site (WordPress, ~2,725 URLs) can no longer be edited — nobody holds wp-admin or
hosting credentials. It also presents GetStrength as a blog and merch store, with the gym
fourth in the navigation, and its homepage has no title tag and no H1.

## Success looks like
- A visitor looking for a gym in Penrose can compare memberships on Home and reach signup.
- Gym staff get a blog article or a price change live by sending us one email (ADR-003).
- Nobody can lose this site again: every account in GetStrength's name, documented.
- TODO(confirm) — a number the client cares about (enquiries? trial sign-ups?). Never established.

## Scope (in)
Four primary pages in order: Home, About Us, Blog, Contact. Home serves as The Gym and
contains location and four membership cards plus the day-pass block; cards have no
per-plan buttons. One shared bottom Join CTA and header/footer Join actions use Debit
Success. Video testimonials retain placeholders until approved footage arrives. Blog
keeps a basic newest-first list and existing article routes; enhanced features are deferred.

The current address is **20/10 Olive Road, Penrose, Auckland 1061**, confirmed in Figma's
2026-10-12 notes. Instagram is `https://www.instagram.com/getstrengthgym/`. Remove Facebook;
YouTube needs a confirmed current-gym destination. The site is gym-only, without merch,
harness, Record Board or Amazon links. Contact form, email-preserving domain work,
change-request guide and developer handover remain in scope.

## Scope (out)
Shop, cart, checkout, member login, payments, class booking, timetable, phone app,
replacing the merch store, migrating the old blog articles or forum.

## Audiences
1. Prospective members comparing the Penrose gym
2. Existing members and the wider strength-training audience reading the blog

## Legacy site — historical audit

The old-owner site is not current-gym evidence. Do not reuse its address, history, coach,
contacts or account ownership without current-owner confirmation.
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
| Teespring / Amazon | Old-owner product sales | Old business | Excluded from gym-only site |
| YouTube | Videos/testimonials | Current-gym ownership unconfirmed | Use only a confirmed destination; embed, do not self-host |
| Instagram — `https://www.instagram.com/getstrengthgym/` | Current gym profile, recorded in Figma | Current gym | Link out; no Facebook |
| WPX hosting | Old site + **the DNS zone holding the email records** (~$40/month) | GetStrength | **Cancel only after DNS has moved to Route 53** |
| Google Workspace | Gym email — MX records live in WPX DNS | GetStrength | **Must not break** |
| WooCommerce store on old site | Unknown if still taking orders | — | Unresolved (D1) |

## Open questions
- **Q1** Joe is the new owner (Johnson's 2026-10-26 PR #7 approval). Confirm his full name,
  exact sign-off authority and contact channel; do not use the old-owner contact by default.
- **Q2** Is the old WooCommerce store still taking real orders?
- **Q3** Old blog articles — migrate all, migrate the best, or start fresh?
- **Q4** Old forum (1,758 replies) — keep, archive, or retire?
- **Q5** Does the client agree to a small monthly AWS bill on their own account, and to the
  $110 line becoming a change-request guide plus developer handover? (Not yet asked.)
- **Q6** "Just ask" content updates — what is an included change, how fast, and what gets quoted?
- **Q7** Contact-form mechanism. Must stay free; the client doc promises it.
- **Q8** Week-1 preview on AWS — mechanism, and is 2026-10-11 still realistic?
- **Q9** Members' login URL — GS-9 is marked Done but nothing was recorded.
- **Q10** Domain: keep getstrength.com (recommended; it's in the signed document, it carries the gym's
  email, and it costs ~US$0.50/month in Route 53) or move to a new domain such as getstrengthstream.com
  (a scope change)? Raised 2026-10-11; not decided.
- **Q11** Privacy policy — the client was asked to supply one. Writing it is outside scope.
- **Q12** Owner identity is settled as Joe; the current coach's exact name, role, biography
  and credentials remain unconfirmed. Keep the generic coach slot.
- **Q13 — resolved 2026-10-28:** Home serves as The Gym. Follow Figma's four-page nav;
  memberships live on Home, with no per-plan buttons or separate Gym page.

## Changelog
- 2026-10-28 — Figma migration reconciled: Penrose, four-page structure, memberships on
  Home, video placeholders, minimal Blog, no Facebook; Joe/gym-only confirmed by PR #7.
- 2026-08-30 — created; site audited, "static site" assumption disproved
- 2026-09-22 — price agreed at $1,500; scope reduced to five pages plus outbound links
- 2026-09-23 — client accepted; agile cycles, 1-year monitoring, payment on completion
- 2026-09-25 — client supplied membership sign-up URL; brief finalised for handover
- 2026-10-05 — sign-up URL recorded and verified live
- 2026-10-05 — no CMS (ADR-003), AWS S3 + CloudFront (ADR-004), Next.js static export (ADR-005);
  AWS account in GetStrength's name on their billing; $1,500 unchanged
- 2026-10-09 — logo suite received; open questions Q5–Q9 added
- 2026-10-11 — client sprint review: designs approved; video testimonials, Instagram, prices on the
  site; domain strategy and privacy policy open; WPX cancellation risk flagged
- 2026-10-10 — scaffold merged (PR #1); AWS delivery recorded (ADR-007: Route 53, OAC, CloudFront
  Function, ~US$1/month); architecture agreed by the whole team on 2026-10-08 (minutes);
  Dependabot security updates on
