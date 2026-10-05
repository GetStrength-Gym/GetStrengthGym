# ADR-003: Content changes go through our maintenance team; no in-site CMS

- **Status:** accepted — 2026-10-05
- **Deciders:** Johnson Zhang (lead), with GetStrength — mutual agreement, **verbal**
- **Source:** supersedes the editing layer of `ADR-002-stack-eleventy-decap-netlify.md`.
  Minutes outstanding: TODO(confirm) date and attendees of the conversation.

## Context
ADR-002 put Decap CMS in the build for exactly one reason: "staff must edit blog posts and
prices without a developer". It also flagged the cost of that choice — every editor needs a
GitHub account to log in at `/admin`.

`docs/requirements.md` ("Three things for you to decide", item 3) always offered the client
both models: staff self-serve, or we handle updates. **The client chose the second.** Gym
staff do not write code and do not want to learn an editor, so blog posts and price changes
will be requested from us.

That removes the only requirement Decap existed to satisfy.

## Options considered

### Option A — Keep Decap CMS anyway
An `/admin` nobody logs into, an OAuth app to keep alive, CMS config to maintain, and a
free-tier dependency, all serving a workflow that is no longer used. **Rejected — dead weight.**

### Option B — No CMS. Markdown in the repo, edited by the maintenance team
A change request arrives (email), a maintenance-team developer edits the Markdown or the
price data file, commits, and Netlify deploys. Fewer moving parts than ADR-002, and the
content stays exactly as portable. **Chosen.**

### Option C — Hosted CMS with its own logins
Only ever a workaround for the GitHub-login problem. Moot — nobody at the gym is editing.
**Rejected.**

## Decision
**Option B.** Decap CMS, `/admin` and the GitHub OAuth app are **out of scope**.

Unchanged from ADR-002: Eleventy, Markdown + front matter in Git, Nunjucks, plain CSS,
Netlify free hosting with deploy previews, Netlify Forms, every account in GetStrength's name.

Two things this decision requires us to build anyway:
- **Prices live in one data file** (e.g. `src/_data/prices.json`), never inline in templates,
  so a price change is a one-line edit by any developer who has never seen Eleventy.
- **A written change-request path** — who to email, what to send, what happens next — in
  place of the staff editor training.

## Consequences

**Makes easy**
- One less system: no CMS, no `/admin`, no OAuth app, no CMS free tier to watch, no GitHub
  accounts for gym staff. The weakest point of ADR-002 is gone.
- The handover deliverable gets simpler: "how to ask for a change" instead of "how to drive
  an editor".
- ~6 hours freed from CMS integration (GS-17), going to launch readiness, not new scope.

**Makes hard / accepted costs**
- **Every content change now needs us.** That is an ongoing obligation, and it is wider than
  the 1-year "we fix what we broke" monitoring already promised. Define before launch what
  counts as a small included change (typo, photo swap, price edit) and what gets quoted.
  `docs/requirements.md` ("We'll still be here… small things, just ask") implies it; it is
  now load-bearing, so it needs a response-time expectation and a named owner.
- **This is how the last site was lost** — a site only its developers could change, and then
  the developers were gone. Mitigation is non-optional: every account in GetStrength's name,
  repo and logins documented on the handover page, plus a plain-English "how to hand this to
  another developer" note so the client can replace us without our help.
- Staff cannot fix a typo at 9pm. Accepted by the client in exchange for never touching code.

**Client-facing documents still to update** (requirements + ADRs win, so these are wrong until fixed)
- `docs/requirements.md` — "Built so it's easy to look after" promises *"a simple how-to guide
  with screenshots, for posting a blog article or changing prices"*, and the quote line
  *"Your how-to guide and a training session — $110"*. Both now describe a different
  deliverable. **Price does not change.**
- The Google Doc copy must be re-uploaded, or the client is reading the old promise.
- Decision 3 ("Who updates the site afterwards") is now resolved — record the answer.

## Revisit if
- Someone at the gym later wants to publish posts themselves → ADR-004 adds an editing layer
  back. Nothing here blocks that: Markdown in Git is CMS-ready, which is why the content
  format is staying put.
- We stop being reachable, or the 1-year support window ends without a named successor.
