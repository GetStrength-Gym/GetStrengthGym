# CLAUDE.md — GetStrength Gym website refurbishment

## Project
Building a new static website for GetStrength Gym, Onehunga, Auckland. The old WordPress
site was lost (no admin or hosting access) and is being abandoned, not migrated.
**Scope and price are agreed; no code written yet.** Stack not yet chosen.

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
**Accepted — `ADR-002` (2026-10-05), editing layer amended by `ADR-003` (2026-10-05):**
Eleventy (11ty) + Markdown in Git, Nunjucks, plain CSS, Netlify free hosting, Netlify Forms.
**No CMS, no `/admin`** — content changes go through our maintenance team (ADR-003), so
prices live in one data file (`src/_data/prices.json`), never inline in templates.
Binding constraints the build has to keep satisfying:

- Content changes are made by **our maintenance team**, not gym staff (ADR-003). Keep every
  editable fact in Markdown or a data file so a developer who has never seen Eleventy can
  change it.
- Hosting must be **free**
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
