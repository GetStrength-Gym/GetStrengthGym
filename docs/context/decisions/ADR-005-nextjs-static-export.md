# ADR-005: Next.js with static export as the site generator

- **Status:** accepted — 2026-10-05. **Scope: the generator only.**
- **Decider:** Johnson Zhang (lead), explicitly and against advice — see "Dissent on record"
- **Source:** lead decision 2026-10-05, resolving the generator question left open by
  `ADR-004-hosting-on-aws.md` and tracked in GS-13. Supersedes the **generator and template**
  rows of `ADR-002-stack-eleventy-decap-netlify.md`.

## Context
ADR-002 chose Eleventy when hosting was Netlify and a CMS was in scope. Since then ADR-003
removed the CMS and ADR-004 moved hosting to AWS, leaving the generator as the last open
piece. PR #1 already scaffolds Next.js (TypeScript, Tailwind, App Router) configured for
static export, and the team is more familiar with React than with Eleventy.

## Options considered

### Option A — Eleventy (ADR-002's choice)
Markdown in, static HTML out, no framework, smallest toolchain, least for a future developer
to learn. **Recommended by both the assistant and the Jev advisor (0.94).** Not chosen.

### Option B — Next.js with static export (`output: 'export'`)
A modern, widely-known React framework. Larger toolchain for a five-page site, but the team
already knows it, the scaffold exists, and the hiring pool of developers who can maintain a
Next.js site is far bigger than the Eleventy one. **Chosen.**

## Decision
**Next.js with `output: 'export'`.** `next build` emits a static `out/` directory that is
uploaded to AWS (ADR-004). No server runtime, no containers in production.

Unchanged by this ADR: no CMS (ADR-003), content as files edited by the maintenance team,
hosting on AWS (ADR-004), the agreed five-page scope, and the $1,500 terms.

## Dissent on record
The assistant and the Jev advisor both recommended Eleventy — Jev at 0.94, on the grounds
that a five-page brochure site maintained by whoever inherits it is better served by the
smaller toolchain. The lead chose Next.js deliberately, with that advice in hand. Recorded
so that nobody re-argues it later and so the trade-off is visible if it bites.

## Consequences

**Makes easy**
- The team builds in a framework it already knows, and the PR #1 scaffold stands.
- A much larger pool of developers can pick this up later — the "any web developer could take
  it over" promise is arguably better served by React than by Eleventy.
- Static export keeps the no-server, no-patching position intact, which the client was promised.

**Constraints that come with static export** — these are not optional, they are what
`output: 'export'` does not support:
- **No server-side features.** No Route Handlers, no middleware, no server actions, no ISR,
  no dynamic rendering. Anything needing a server must live outside the site.
- **Image optimization is off by default.** `next/image` needs `images: { unoptimized: true }`
  or a custom loader. Photographs are most of a gym site, so **size images by hand** or wire a
  loader — do not discover this at launch.
- **Clean URLs on S3/CloudFront need `trailingSlash: true`**, so pages emit as
  `about/index.html` rather than `about.html`. Without it, CloudFront will not serve `/about`.
  Configure a 404 document too.
- `assetPrefix` is available if assets are served from a separate CloudFront domain.

**Costs accepted**
- A heavier toolchain than the job needs: `node_modules`, a build step, a lockfile, and a
  framework upgrade treadmill on a site that will mostly sit still. The client's "nothing to
  patch" promise covers the *running* site, not our dev dependencies — but dependency updates
  are now part of the one-year support, so keep an eye on the `next` major.
- **Timeline risk is real.** Jev put the risk to the 2026-10-11 preview and the five-week
  deadline at **high (0.79)**, driven by toolchain plus AWS deployment plus content work on
  ~107 part-time hours. The mitigation is scope discipline, not optimism: five pages, a blog
  list, a blog post template, a contact form. Nothing else.

## Revisit if
- Static export turns out to block something the agreed scope needs — then the question is
  whether that scope item is really in scope, not whether to add a server.
- The preview date slips for toolchain reasons. If the framework is eating the schedule, the
  deadline moves or the stack does; the price does not.
