# Handover — GetStrength Gym website

**As at 2026-10-10.** Quote accepted. Stack decided (ADR-003/004/005/007) and agreed by the whole
team on 2026-10-08 (`docs/meetings/2026-10-08-architecture-agreement.md`). Next.js scaffold **merged** (PR #1, 2026-10-10). Dependency
patch open (PR #2, Next.js 16.3.8, needs one approval). No site pages built yet.

**Critical path right now:** the week-1 preview (GS-16) is **blocked on one thing — no AWS
account exists in GetStrength's name.** Nothing else on it waits on the client; it needs no
DNS work (ADR-007). Ask John to create the account, or to approve us creating it in his name.
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
the Amazon harness listing, YouTube, Facebook and the membership sign-up. A blog that **our
team** updates on request — no CMS (ADR-003). Contact form. Domain switch-over preserving
email. A change-request guide for the client plus a written handover for future developers.

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
3. ~~**Logo**~~ **received 2026-10-09** — a full logo suite (primary, secondary, icon, word
   mark) plus a brand PDF, in a Drive folder shared by the client: (link held by Johnson — not in the public repo)
   (owned by a third party, "anyone with the link" — keep the link out of the public repo).
   **Recent photos are still outstanding** — historically the thing that delays these
   projects, and a gym site is mostly photography.
4. **Confirm who signs** on the client side, and get the sign-off page signed.

## The stack — decided
- **ADR-002:** superseded in every part by 003–005. Kept for its reasoning only.
- **ADR-003 (accepted):** no CMS — content changes go through **our maintenance team**,
  because gym staff do not code. Resolves decision 3 in `docs/requirements.md`.
- **ADR-004 (accepted):** **hosting on AWS — S3 + CloudFront.** Docker is local dev/test
  only. Replaces ADR-002's Netlify hosting and Netlify Forms.
- **ADR-007 (accepted 2026-10-10):** Route 53 DNS, ACM cert, private S3 + OAC + a CloudFront
  Function for `/x/` → `/x/index.html`. ~US$1/month. The preview only needs the AWS account;
  Route 53 and the email records matter at launch.
- **ADR-005 (accepted):** **Next.js with static export.** Lead's decision, taken against an
  Eleventy recommendation — the dissent is recorded in the ADR, not hidden.

**Still open — GS-13, don't guess:** whether a backend exists at all (none planned), what
replaces Netlify Forms (must stay free — the client doc promises it), the week-1 preview
mechanism on AWS, and the ongoing content-update terms.

✅ **Both wrong promises are now fixed in `docs/requirements.md` (2026-10-05):**
- Running costs now say a **small monthly AWS bill on GetStrength's own account**, and say
  plainly that this changed from the earlier "free hosting" draft. Account is in the client's
  name, their billing — decided, not optional (ADR-004).
- The **$110 staff how-to guide** became a **change-request guide plus a written handover for
  future developers**. **Total stays $1,500.** Decision 3 is marked resolved: we handle updates.

⚠️ **Still owed: the client has not agreed to either change.** Re-upload the Google Doc, walk
John through both, and get a yes. **Silence is not agreement.** Also still undefined: what
counts as an included "just ask" change versus a quoted job — the one commercial hole left.

Constraints the build still has to satisfy:
- Content changes are made by **our maintenance team** — prices in a data file, not in templates
- Hosting on **AWS in GetStrength's own account**, cost kept small and visible (ADR-004)
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
| `docs/context/decisions/` | ADR-001 to ADR-005 — read the index `README.md` there |
| `docs/context/stakeholders.md` | Team and client roles |
| `docs/pricing.md` | **Internal.** Market research, per-person split, effective rate. Do not share. |
| `docs/quote-GS-001.md` | Quote for the client's records — still needs address/contact details |
| `docs/content/site-inventory.md` | Old-site page inventory and asset checklist |
| `docs/meetings/` | Minutes, template, and the discovery-meeting script |

**Google Drive** — folder GetStrength Gym — Website Project (link held by Johnson — not in the public repo)
holds the client-facing doc: What We're Building, and the Quote (link held by Johnson — not in the public repo).
The repo copy and the Drive copy are edited separately — **update both**, or the client
reads a stale version. Drive updates are done by re-uploading the full markdown.
**Both Drive links stay out of the public GitHub repo** — the client doc was found shared as
"anyone with the link can edit" on 2026-10-09.

**GitHub** — `GetStrength-Gym/GetStrengthGym` (**public**). `main` is protected (PR + 1 approval).
Dependabot alerts and **security-update PRs are on**. Publish docs with
`./scripts/publish-docs.sh "message"` — never by hand; it strips `docs/pricing.md`, personal
emails and every Drive link, and refuses to push if any leak through.

**Jira** — project `GS` on axioms.atlassian.net. Reconciliation is tracked in GS-13.

## Unresolved client decisions
- **D1** Is the old WooCommerce store still taking orders? (retires ~10 pages if dead)
- **D2** Old forum, 1,758 replies — keep, archive read-only, or retire?
- **D3** Old blog, 323 articles — migrate all, the best, or start fresh? *(quote assumes fresh)*
- **D4** Do the Amazon and ClickBank affiliate links stay?
