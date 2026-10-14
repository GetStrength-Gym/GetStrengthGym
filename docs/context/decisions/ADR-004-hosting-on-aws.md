# ADR-004: Host on AWS; Docker is local development only

- **Status:** accepted — 2026-10-05, services confirmed 2026-10-05. **Scope: hosting and the contact-form mechanism only.** **Agreed by the whole team 2026-10-08** (`docs/meetings/2026-10-08-architecture-agreement.md`).
- **Deciders:** Johnson Zhang (lead), with the development team
- **Source:** lead clarification 2026-10-05, recorded in GS-13. Supersedes the **hosting**
  and **forms** rows of `ADR-002-stack-eleventy-decap-netlify.md`.

## Context
ADR-002 chose Netlify because hosting had to be free. The lead has since established that
hosting is through **AWS**, and that **Docker is for local and offline development and
testing** — production containers are not assumed. Neither statement had reached the repo,
so GS-17 still cited "hosting from ADR-002 unchanged", and pull request #1 was reviewed
against a Netlify assumption. GS-13 tracks the full reconciliation.

One fact this ADR does not blur: **the client has not agreed to pay for AWS.** The signed
document promises "hosting free, website editor free, contact form free; only the domain is
paid". GS-13 states the client correspondence does not specify AWS, and that agreement must
not be inferred from silence. That reconciliation is owed to the client before launch.

## Decision
**The site is hosted on AWS.** Static output, deployed from the repo.

- **Services confirmed by the lead 2026-10-05: S3 as the origin, CloudFront as the CDN.**
  This fills the blank this ADR originally left open and matches PR #1's stated plan. No
  other AWS services are in scope; adding one is a new decision. *Route 53, ACM and a
  CloudFront Function were added 2026-10-10 — see ADR-007.*

  What that combination requires, so none of it is discovered at launch:
  - **Keep the bucket private** and serve it through CloudFront with Origin Access Control.
    A public website bucket is the common shortcut and it is not needed here.
  - **`trailingSlash: true` in Next.js** (ADR-005) so pages emit `about/index.html`.
    *Corrected 2026-10-10 by ADR-007: a default root object only covers `/`. With OAC,
    subpages also need a CloudFront Function to map `/x/` to `/x/index.html`, and missing
    pages come back as 403, which must be mapped to `/404.html`.*
  - **The TLS certificate must live in `us-east-1`** to be usable by CloudFront, whatever
    region the bucket is in.
  - **Invalidate CloudFront on deploy**, or the client sees a stale site and reports a bug
    that is really a cache.
  - **Pointing getstrength.com at CloudFront is a DNS change**, which is the project's one
    irreversible hazard: the gym's Google Workspace MX records live in WPX's panel, which we
    cannot read. Reconstruct the entire zone — MX included — before any nameserver change
    (GS-27, GS-35). Getting this wrong kills the client's email.
- **Docker is local development and testing only.** No production containers.
- **Netlify and Netlify Forms are out**, which removes the contact-form mechanism ADR-002
  relied on. A replacement is required and is **not chosen here** (candidates: API Gateway +
  Lambda + SES, or a free third-party form service). Whatever is chosen must keep the site
  free of member, customer and payment data.

## What this ADR does *not* decide
Named here so nobody infers it later:

- **The generator.** *Since decided by ADR-005 (2026-10-05): Next.js with static export.*
- **Whether a backend service exists at all.** *PR #1's Spring Boot placeholder was removed
  2026-10-06; no backend is planned.* The agreed scope has no payments, no logins and
  no stored customer data, and the client was promised "nothing to update or patch" — so a
  long-lived server needs its own ADR and its own answer on who patches it.
- **The week-1 preview mechanism.** Netlify deploy previews were ADR-002's answer. AWS needs
  an equivalent before the 2026-10-11 preview target in GS-13.
- **Content editing.** Unchanged by this ADR: no CMS, maintenance team edits files (ADR-003).

## Consequences

**Accepted**
- Hosting is on infrastructure the team chose and understands, and the client's accounts can
  still be in GetStrength's name — which the requirements demand.
- Static output on S3-class storage for a five-page site is cheap in absolute terms.

**Owed, and currently unreconciled**
- **Account ownership — decided 2026-10-05: the AWS account is created in GetStrength's
  name, on the client's own billing.** We are given access; we do not host their site in a
  team member's personal account. Cost was never the real question — a site the client
  cannot log into is exactly how the previous one was lost, and the requirements promise
  "everything is in your name".
- **The running-cost promise — corrected 2026-10-05.** `docs/requirements.md` no longer says
  hosting is free; it states a small monthly AWS cost on the client's account, flags the
  change from the earlier draft explicitly, and commits to showing them the real figure
  before launch. **Still owed: the client's agreement to it, and the Google Doc re-upload**
  (GS-13). Silence is not agreement.
- **"Nothing to update or patch"** holds only while nothing server-side ships. It survives a
  static bucket; it does not survive a Spring Boot service.
- **The contact form is unsolved** until the replacement mechanism is decided.
- **Estimates move.** GS-17, GS-27, GS-28 and GS-33 were sized against Netlify. They need
  re-estimating; this ADR deliberately claims no figure for capacity freed or consumed.

## Revisit if
- The client declines to hold an AWS account or to accept any running cost → a free static
  host returns to the table, and ADR-002's reasoning applies again.
- A backend turns out to be genuinely required → that is a new ADR, not an extension of this one.
