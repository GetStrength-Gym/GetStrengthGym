# Contributing

## Making a change

1. Branch from `main`. Name the branch after the Jira ticket, e.g.
   `feature/GS-19-about-contact-pages`, or `content/<short-description>` for a content change.
2. Run lint, the tests and a build before you push. The commands are in the
   [README](README.md#commands), and the Checks workflow runs the same three on your pull
   request.
3. Open a PR with the ticket key in the title. `main` needs one approval, and pushing new
   commits dismisses earlier approvals.
4. A decision that is expensive to reverse gets an ADR: copy
   [the template](docs/context/decisions/ADR-000-template.md). A client request heard in a
   meeting goes into the [minutes](docs/meetings/README.md) before it goes into code.

Content changes (prices, hours, photos, copy) have their own step-by-step
[runbook](docs/maintenance/content-changes.md).

## Ground rules

- **Don't invent gym facts.** Prices, hours, names and claims come from the client, in
  writing. Until then, use a labelled placeholder or `TODO(confirm)`.
- **Real prices live in one place**, `frontend/content/prices.json`. Never put a price in a
  page or component.
- **This repo is public.** Never commit, or paste into a PR: AWS account IDs, bucket names,
  distribution IDs or preview addresses, keys, client contact details, private document links
  or internal pricing notes.
- **Stay static.** Don't add route handlers, middleware, server actions or ISR. `next/image`
  runs unoptimized, so resize and compress photos before adding them. Keep
  `trailingSlash: true`; clean URLs depend on it.
- Build mobile-first at 375px and meet basic WCAG 2.2 AA, with a unique title and one H1 per
  page.
- **History stays history.** Meeting minutes are append-only, and an accepted ADR is never
  edited to change its decision: add a dated note, or write a new ADR that supersedes it.
