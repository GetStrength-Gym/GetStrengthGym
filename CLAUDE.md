# CLAUDE.md — GetStrength Gym website refurbishment

## Project
Building a new static website for GetStrength Gym, Onehunga, Auckland. The old WordPress
site was lost (no admin or hosting access) and is being abandoned, not migrated.
**Scope, price and stack are agreed** (ADR-003/004/005). The Next.js scaffold is in review
(PR #1); no site pages are built yet.

## Context sources — read in this order
1. `HANDOVER.md` — current status, what's blocked, next decision.
2. `docs/requirements.md` — client-facing requirements and quote. **Single source of truth for scope.**
3. `docs/context/project-brief.md` — constraints, third-party systems, open questions.
4. `docs/context/decisions/` — ADRs. If a decision is recorded here, do not re-litigate it; propose a superseding ADR instead.
5. `docs/context/current-site-audit.md` — evidence about the old site.
6. `docs/meetings/` — meeting minutes, newest first. Minutes are **evidence**, not spec.
7. `docs/content/` and `docs/design/` — content inventory and visual direction.

## How meeting minutes work here
- Raw notes / transcripts go in `docs/meetings/raw/` untouched.
- Cleaned minutes live in `docs/meetings/YYYY-MM-DD-topic.md` using `_template.md`.
- **Minutes are append-only history.** Never edit an old set of minutes to reflect a
  later change of mind — write new minutes, or a new ADR.
- Anything in minutes that becomes binding must be promoted:
  - a requirement → `docs/requirements.md` (client-facing scope)
  - a technical choice → a new ADR in `docs/context/decisions/`
  - an open question → the "Open questions" section of the project brief
  Minutes carry a **Promoted to** line recording where each decision landed.

## Rules for AI-assisted work on this repo
- **Do not invent facts about the gym** — class names, pricing, trainer names,
  opening hours, branding. If it isn't in `docs/`, ask or mark it `TODO(confirm)`.
- Prefer citing the source: `per docs/meetings/2026-09-01-kickoff.md` or `FR-4`.
- Client asks arriving verbally get written into minutes *before* being coded.
- Contradictions between minutes and requirements: requirements + ADRs win; flag the
  contradiction rather than silently choosing.
- Keep `docs/context/*` short and current. It is the loaded-every-session context;
  everything else is on-demand.

## Conventions
- Dates: ISO `YYYY-MM-DD`. Never relative dates ("last week") in docs.
- Requirement ids: `FR-1`, `NFR-1` — never renumber, only append and mark deprecated.
- ADR ids: `ADR-001-short-slug.md`, sequential, never reused.

## Stack
Read the ADRs; this is a summary, not the decision.
- **ADR-002:** superseded in every part — CMS by ADR-003, hosting and forms by ADR-004,
  generator by ADR-005. Read it for the reasoning, not for the stack.
- **ADR-003 (accepted):** **no CMS, no `/admin`** — content changes go through our
  maintenance team, so prices live in one data file, never inline in templates.
- **ADR-004 (accepted):** **hosting on AWS — S3 origin, CloudFront CDN.** Docker is local
  development and testing only, no production containers. Bucket stays private behind OAC;
  TLS cert in `us-east-1`; invalidate CloudFront on deploy.
- **ADR-007 (accepted):** **Route 53** for DNS, **ACM** cert in `us-east-1`, private S3 behind
  OAC plus a **CloudFront Function** that maps `/x/` to `/x/index.html` (a default root object
  only covers `/`), and 403 → `/404.html`. Switching DNS to Route 53 is the email hazard —
  rebuild MX, SPF, DKIM and DMARC first. The preview needs none of the DNS work.
- **ADR-005 (accepted):** **Next.js with `output: 'export'`.** Static `out/` uploaded to AWS.
  No server runtime. Needs `trailingSlash: true` for clean URLs on S3/CloudFront, and
  `next/image` needs `unoptimized: true` or a custom loader — there is no optimizer at runtime.

**Open, tracked in GS-13 — do not assume either way:** whether any backend exists at all
(none planned), the contact-form mechanism now that Netlify Forms is gone (the client doc
still promises the form is free), the week-1 preview mechanism on AWS, and the ongoing
content-update terms.

**The client has not yet agreed to AWS running costs.** `docs/requirements.md` now states a
small monthly cost on GetStrength's own AWS account, but the Google Doc the client reads still
says hosting is free until it is re-uploaded. Never imply the client has agreed until they have.

Binding constraints the build has to keep satisfying:

- Content changes are made by **our maintenance team**, not gym staff (ADR-003). Keep every
  editable fact in Markdown or a data file so a developer who has never seen this codebase
  can change it.
- Hosting on **AWS in GetStrength's own account, on their billing** (ADR-004). Keep the bill
  small and visible.
- **Standard, common tools** — any web developer must be able to take it over
- The site stores **no member, customer or payment data**
- Mobile-first at 375px, WCAG 2.2 AA basics, unique page title and one H1 per page

## Hard hazard — DNS and email
The gym's email (Google Workspace MX) is served from DNS we do not control, in WPX's
panel. Reconstruct every record before any nameserver change. Getting this wrong kills
the client's email and is not quietly reversible.

## Client-facing docs are duplicated
`docs/requirements.md` also lives as a Google Doc (link in `HANDOVER.md`). Change one,
change the other. Prices, terms and scope must never disagree between them.
