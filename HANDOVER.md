# Handover — GetStrength Gym website

**As at 2026-09-25.** Client has agreed the quote. Nothing has been built yet.
New session: read this, then `CLAUDE.md`.

## Where the project stands

| | |
|---|---|
| Client | GetStrength Gym, 385B Neilson St, Onehunga, Auckland |
| Contact | John Strachan, (email held by Johnson — not in the public repo) (decision-maker unconfirmed — Q1) |
| Team | Johnson Zhang (lead, 3.5 h/wk), Desmond Li, Jayden Pham, Kevin Wang (6 h/wk each) |
| Price | **$1,500 fixed, no GST**, one payment on completion. No deposit. |
| Timeline | ~5 weeks, ~107 team hours |
| Working style | Agile, two-week cycles. Private preview link from week 1. Progress meetings ~week 2, ~week 4, final review before launch. |
| In-scope feedback | Unlimited and free |
| New features | Fresh quote, agreed before any work starts |
| After launch | We monitor for **1 year** and fix anything we broke, free |
| Status | Quote accepted verbally; signature not yet obtained |

## What we're building
Five pages — Home, Blog, The Gym, About Us, Contact — plus outbound links to Teespring,
the Amazon harness listing, YouTube and Facebook. Blog editable by non-technical staff.
Contact form. Domain switch-over preserving email. How-to guide plus a training session.

**Not** building: shop, cart, checkout, member login, payments, booking, timetable.
Memberships and product sales stay in the client's existing systems; we only link out.

## ⚠️ Blocked — do this first
1. ~~**The membership sign-up URL.**~~ **Done 2026-10-05.** Recorded in
   `docs/requirements.md` and `docs/context/project-brief.md`:
   <https://oc.debitsuccess.com/DirectEntry/DirectDebitRequest/Form?brandtemplateid=9adb8b79-828d-4c8b-af23-7b7d6b5cabde>
   Verified live the same day — GetStrength's own Debitsuccess form. **Its banner image is
   broken ("Banner Image Missing") — tell the client**, this is the page every join button
   will point at. Google Doc still needs the re-upload.
2. **Members' login URL** — still unknown, or confirm there isn't one.
3. **Logo (original file) and recent photos.** Historically the thing that delays these
   projects. A gym site is mostly photography.
4. **Confirm who signs** on the client side, and get the sign-off page signed.

## The stack — partly settled, reconciliation owed (GS-13)
- **ADR-002 (accepted):** Eleventy + Markdown in Git, Nunjucks, plain CSS.
- **ADR-003 (accepted):** no CMS — content changes go through **our maintenance team**,
  because gym staff do not code. Resolves decision 3 in `docs/requirements.md`.
- **ADR-004 (accepted):** **hosting on AWS.** Docker is local dev/test only. Replaces
  ADR-002's Netlify hosting and Netlify Forms.

**Still open — GS-13, don't guess:** generator (Eleventy vs the Next.js in PR #1), whether a
backend exists at all, what replaces Netlify Forms, the week-1 preview mechanism on AWS,
who holds the AWS account and pays the bill, and the ongoing content-update terms.

⚠️ **Two client-facing promises are now wrong and the client hasn't been told:**
`docs/requirements.md` says **"hosting free… only the domain is paid"** (AWS is not free) and
promises **a staff how-to guide and training** for posting blog articles (ADR-003 removed staff
editing). Fix both, re-upload the Google Doc, and get it agreed — **the price does not change.**
Do not treat client silence as agreement.

Constraints the build still has to satisfy:
- Content changes are made by **our maintenance team** — prices in a data file, not in templates
- Hosting must be **free**
- **Standard, common tools** — any web developer must be able to pick it up
- **No member, customer or payment data** stored by the site
- Mobile-first, accessible, unique page titles and one H1 per page

## Watch-outs
- **Email is the biggest hazard.** MX points at Google Workspace, but the DNS zone lives in
  **WPX's** panel, which we cannot open. Reconstruct every record before touching
  nameservers, or the gym's email dies. This is the one irreversible mistake available.
- **"Unlimited feedback" pulls against "5 weeks".** The two-week checkpoints are the
  protection — if direction is still changing at week 4, move the date, not the price.
- **No deposit** means the team carries the full risk. Hold the "Not included" line.
- **1-year monitoring vs. graduation.** Decide who holds the uptime-alert email in 12 months.
- **Don't invent gym facts.** Prices, hours, coach names, class names — if it isn't in
  `docs/`, ask. Scraped facts in the audit are marked as scraped, not confirmed.

## Where everything lives

**Repo** (`~/Library/CloudStorage/OneDrive-EROAD/Desktop/getstrength-gym-website`)
| File | What it is |
|---|---|
| `docs/requirements.md` | **Client-facing requirements + quote.** Single source of truth. |
| `docs/context/project-brief.md` | Scope, constraints, third-party systems, open questions |
| `docs/context/current-site-audit.md` | Technical audit of the old site — evidence behind the decisions |
| `docs/context/decisions/ADR-001-*.md` | Static-site decision (accepted) |
| `docs/context/stakeholders.md` | Team and client roles |
| `docs/pricing.md` | **Internal.** Market research, per-person split, effective rate. Do not share. |
| `docs/quote-GS-001.md` | Quote for the client's records — still needs address/contact details |
| `docs/content/site-inventory.md` | Old-site page inventory and asset checklist |
| `docs/meetings/` | Minutes, template, and the discovery-meeting script |

**Google Drive** — folder [GetStrength Gym — Website Project](https://drive.google.com/drive/folders/1TAPJFB_tZklXGSiQGMkAXj5u-I5E-rdL)
holds the client-facing doc: [What We're Building, and the Quote](https://docs.google.com/document/d/1egfqdMKciEZfsbrsyuy3PE3WXO3GNL8sQtoQbqZIhSA/edit).
The repo copy and the Drive copy are edited separately — **update both**, or the client
reads a stale version. Drive updates are done by re-uploading the full markdown.

## Unresolved client decisions
- **D1** Is the old WooCommerce store still taking orders? (retires ~10 pages if dead)
- **D2** Old forum, 1,758 replies — keep, archive read-only, or retire?
- **D3** Old blog, 323 articles — migrate all, the best, or start fresh? *(quote assumes fresh)*
- **D4** Do the Amazon and ClickBank affiliate links stay?
