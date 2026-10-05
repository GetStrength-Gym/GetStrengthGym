# ADR-004: Host on AWS; Docker is local development only

- **Status:** accepted — 2026-10-05. **Scope: hosting and the contact-form mechanism only.**
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

- **Specific AWS services are not fixed by this ADR.** Pull request #1 proposes S3 +
  CloudFront, which fits a static site; confirm against the actual implementation decision
  rather than treating it as settled here.
- **Docker is local development and testing only.** No production containers.
- **Netlify and Netlify Forms are out**, which removes the contact-form mechanism ADR-002
  relied on. A replacement is required and is **not chosen here** (candidates: API Gateway +
  Lambda + SES, or a free third-party form service). Whatever is chosen must keep the site
  free of member, customer and payment data.

## What this ADR does *not* decide
Named here so nobody infers it later:

- **The generator.** ADR-002's choice of **Eleventy stands** — nothing in the AWS direction
  changes it, and it was not part of this clarification. Pull request #1 uses Next.js with
  static export; that is an open question in GS-13, not a decision.
- **Whether a backend service exists at all.** PR #1 carries a Spring Boot placeholder with
  one health endpoint and an undecided role. The agreed scope has no payments, no logins and
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
- **The running-cost promise.** "Hosting: free" is in a document the client has read. AWS is
  not free, needs a billing account with a card, and the account must sit in GetStrength's
  name or we carry the bill ourselves. **Tell the client, change the wording, get it agreed
  before launch** — tracked in GS-13.
- **"Nothing to update or patch"** holds only while nothing server-side ships. It survives a
  static bucket; it does not survive a Spring Boot service.
- **The contact form is unsolved** until the replacement mechanism is decided.
- **Estimates move.** GS-17, GS-27, GS-28 and GS-33 were sized against Netlify. They need
  re-estimating; this ADR deliberately claims no figure for capacity freed or consumed.

## Revisit if
- The client declines to hold an AWS account or to accept any running cost → a free static
  host returns to the table, and ADR-002's reasoning applies again.
- A backend turns out to be genuinely required → that is a new ADR, not an extension of this one.
