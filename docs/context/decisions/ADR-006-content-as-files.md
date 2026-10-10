# ADR-006: Content as files read at build time; prices in one data file

- **Status:** accepted
- **Date:** 2026-10-11
- **Deciders:** Desmond Li, with Johnson Zhang (lead)
- **Source:** GS-17 (and GS-41), scope agreed with the lead. No meeting minutes.

## Context
ADR-003 removed the CMS: gym staff never edit the site, and the maintenance team makes every
change on request. ADR-003 also requires prices to live in one data file, never inline in
templates. ADR-005 fixes Next.js with `output: 'export'`, so there is no server and no
runtime data source; everything must be known at `next build`. ADR-007 serves the site from
a private S3 bucket behind OAC, which has no directory indexes. Clean URLs depend on a
CloudFront Function (GS-16), and missing pages come back as 403 mapped to `/404.html`.

No price is confirmed yet (`docs/requirements.md`, "Before it can go live"). The week-1
preview still needs to show what the price list looks like.

## Options considered

### Option A — Content inline in page components
Nothing to load or validate. But a price or post edit means changing JSX, which ADR-003
forbids for prices and which a developer new to the codebase is most likely to get wrong.
**Rejected.**

### Option B — A CMS
Already rejected by ADR-003. Nobody at the gym edits, so it would be dead weight.
**Rejected.**

### Option C — Files in the repo, read at build time — chosen
Blog posts as Markdown with front matter in `frontend/content/blog/`, prices in
`frontend/content/prices.json`. A small server-only loader (`frontend/lib/content.ts`)
reads and validates them during `next build`. Portable, reviewable in a PR, and CMS-ready if
ADR-003 is ever revisited. **Chosen.**

## Decision
1. **Content is files, read at build time** by `frontend/lib/content.ts`. No client-side
   fetching. Dependencies: `yaml` (2.x), `remark` and `remark-html` (sanitisation on),
   pinned to exact versions. A few lines in the loader split a post into its front matter
   and body. A front-matter library would add little: the only one considered,
   `gray-matter` 4.0.3, pulls in js-yaml 3 → argparse → sprintf-js,
   which carries a DoS advisory (GHSA-hp3w-g68c-fv3c).
2. **`prices.json` is the single source of prices.** Plan names are the four from the
   client's live sign-up form (GS-8). Unknown prices are `null`.
3. **A `null` price renders "Contact us for pricing"**, never blank, `0` or "TODO".
4. **Validation is plain TypeScript, not zod.** The schema is a handful of fields. Plain
   checks read like the rules they enforce, any developer can follow them, and they add no
   dependency to the upgrade treadmill ADR-005 already accepts. Errors name the file and
   field (`content/blog/foo.md: "date" must be YYYY-MM-DD`) and fail the build. Unknown
   fields are rejected, so a typo like `drafts: true` can't publish a draft. Duplicate fields
   are rejected too (the `yaml` default). Dates must be quoted. `yaml`'s YAML 1.2 core
   schema keeps an unquoted date as text, but YAML 1.1 tools (most front-matter libraries,
   and any future CMS) silently roll an unquoted `2026-02-30` over to 2 March. Quoting keeps
   the files safe under every parser. The loader checks how the value was written, not just
   its type.
   A post's `image` needs an `imageAlt` (WCAG 2.2 AA), rendered as the image's alt text. The
   build fails if either is set without the other.
5. **Build mode comes from `SITE_ENV`.** No existing variable was defined (ADR-007's deploy
   path is a plain `npm run build`). `production` means production; **anything else is
   preview**, so everyday builds and `docker compose up` need no setup.
   - Preview uses `prices.sample.json` (obvious placeholders, `"sample": true`, labelled
     "Sample prices — preview only") and includes draft posts, labelled as drafts.
   - Production uses `prices.json`, excludes drafts, and never reads the sample file.
6. **Launch check:** a production build fails unless `confirmedWithClient` in `prices.json`
   is an ISO date. The check runs from `next.config.ts` in the production-build phase, so it
   fires even while no page shows prices.
7. **Blog URLs are `/blog/<slug>/`**, with the slug taken from the file name. They work on
   AWS only through the GS-16 CloudFront Function (`/x/` → `/x/index.html`, ADR-007).
   `dynamicParams = false`, so only real posts are emitted. Unknown slugs have no S3 object
   and reach `/404.html` through ADR-007's 403 mapping.
8. **Zero published posts is a valid production build.** The quote assumes the blog starts
   fresh (`HANDOVER.md`, D3), so launch may have none. `/blog/` then says "No posts yet." Next.js 16 static export
   refuses a dynamic route whose `generateStaticParams()` returns nothing ("at least one
   route must be generated"), so the route returns one placeholder, `_no-posts`, instead.
   It can't collide with a post, because file names can't contain `_`. It is never linked,
   and it renders the same 404 page as `/404.html` (`app/not-found.tsx`), marked `noindex`.
   It renders that component directly, because calling `notFound()` during export gives
   the page an empty body until JavaScript runs.

## Consequences

**Makes easy**
- A price change is a one-line edit to one file. A new post is one Markdown file.
- Bad content is caught at build time with a message that says where, not after deploy.
- Unconfirmed prices can't reach the live site by accident. Sample prices can't either.
- The preview shows the real layout with clearly labelled placeholder prices.

**Makes hard / accepted costs**
- **`SITE_ENV=production` is load-bearing.** A plain `npm run build` is a preview build, with
  sample prices and drafts. Whoever writes the GS-16 deploy steps must set it for production,
  and ADR-007's deploy path doesn't mention it yet.
- **With no published posts, `/blog/_no-posts/` exists as a file.** CloudFront serves it
  with HTTP 200, not 404, because the S3 object exists (a soft 404). It shows the 404 page,
  is `noindex` and is never linked, so this is accepted. It disappears with the first
  published post.
- The front-matter splitter is our own code (one regular expression). It accepts only a
  leading `---` block: no TOML, no `...` end marker.
- `next.config.ts` imports the loader. Keep `lib/content.ts` free of anything that can't
  load at config time.
- Renaming a post's file changes its URL. There are no redirects.

## Revisit if
- Someone at the gym wants to edit content themselves (ADR-003's revisit condition). The
  files are CMS-ready.
- Old blog articles are migrated (D3, ~323 posts). Re-check build time and whether the
  loader should cache.
- A deploy pipeline is built. Set `SITE_ENV=production` in it, and record that with the
  pipeline decision ADR-007 asks for.
