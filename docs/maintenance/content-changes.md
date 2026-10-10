# Content changes — developer runbook

How the maintenance team makes a content change. Written for a developer who has never seen
this codebase. Why it works this way: ADR-003 (no CMS) and ADR-006 (content as files).

**Nothing edits the live site directly.** There is no admin page, no database and no server.
Every change, even a typo, is a file edit in this repo, followed by a rebuild and a fresh
upload of the whole site.

All commands run from the repo root, through Docker.

## Where content lives

| What | File |
|---|---|
| Blog posts | `frontend/content/blog/<slug>.md` |
| Blog images | `frontend/public/images/blog/` |
| Membership prices (the only place prices live) | `frontend/content/prices.json` |
| Sample prices for the preview site only | `frontend/content/prices.sample.json` |
| Loader and validation | `frontend/lib/content.ts` |

## Preview builds and production builds

The build mode comes from the `SITE_ENV` environment variable.

| | Preview (default) | Production (`SITE_ENV=production`) |
|---|---|---|
| Prices | `prices.sample.json`, labelled "Sample prices — preview only" | `prices.json` |
| Draft posts | shown, marked "Draft (preview only)" | left out |
| Launch check | — | build **fails** if `confirmedWithClient` is `null` |

**Anything other than `SITE_ENV=production` counts as preview**, including a plain
`npm run build`. Never upload a build made without `SITE_ENV=production` to the live site,
or the sample prices and draft posts go live with it.

## Add a blog post

1. Choose a slug: lower-case words separated by hyphens, e.g. `deadlift-basics`. It becomes
   the address `/blog/deadlift-basics/`, so don't change it after publishing.
2. Create `frontend/content/blog/<slug>.md`:

   ```markdown
   ---
   title: "Post title"
   date: "2026-10-11"
   description: "One sentence for the blog list and search results."
   image: "/images/blog/deadlift-basics.jpg"
   imageAlt: "What the photo shows, in a short sentence"
   draft: true
   ---

   Body text in Markdown. Use ## for headings, never #.
   ```

   | Field | Rules |
   |---|---|
   | `title` | Required, non-empty |
   | `date` | Required, `YYYY-MM-DD`, **in quotes**. YAML silently rolls an unquoted `2026-02-30` over to 2 March, so the build rejects unquoted dates. |
   | `description` | Required, non-empty |
   | `image` | Optional. A path starting with `/`, pointing into `frontend/public/` |
   | `imageAlt` | **Required when `image` is set**, and not allowed without it. A short description of what the image shows, used as its alt text for screen readers |
   | `draft` | Optional, `true` or `false` (default `false`) |

   Any other field fails the build, so a typo such as `drafts: true` can't publish a draft
   by accident. Body headings start at `##`, because the title is the page's only `<h1>`.
3. Images: **resize and compress before adding** (no image optimizer in a static export,
   ADR-005), then put them in `frontend/public/images/blog/`. Target dimensions and file size:
   TODO(confirm) with GS-25. Write `imageAlt` from what the photo actually shows; if you
   can't tell who or what is in it, ask the client rather than guessing. Images in the body
   need alt text too: `![What the photo shows](/images/blog/photo.jpg)`.
4. Keep `draft: true` while the client reviews it on the preview. Remove it, or set it to
   `false`, to publish.

Use only the words and facts the client sent. Don't fill gaps; ask them.

## Change a price

1. Edit `frontend/content/prices.json` **only**. Never put a price in a page or component.
2. Each plan has `price` (a positive number, or `null`) and `period` (e.g. `"week"`, or
   `null`). A `null` price shows "Contact us for pricing".
3. Don't rename a plan's `id`. Plan names come from the client's sign-up form (GS-8), so
   change a `name` only if the client has changed it there too.
4. Update `confirmedWithClient` to the date the client confirmed the new price (next section).
5. Keep `prices.sample.json` in the same shape if you add or remove a plan. Its numbers stay
   obvious placeholders.

## Confirm prices before launch

Production builds fail until `confirmedWithClient` in `prices.json` is a date:

```
content/prices.json: prices not confirmed with the client. "confirmedWithClient" is null ...
```

This is the launch check. Once the client has confirmed the prices **in writing**, enter
them and set `"confirmedWithClient": "YYYY-MM-DD"` to the date they confirmed. Never set
the date just to get a build through. Keep the client's written confirmation with the project
records, **not in this repo**, which is public.

## Check it locally

```sh
docker compose up                                  # http://localhost:3000/blog/
docker compose run --rm frontend npm run lint
docker compose run --rm frontend npm run build     # preview build into frontend/out/
```

Invalid content fails the build with the file and field, for example:

```
content/blog/deadlift-basics.md: "date" must be YYYY-MM-DD
```

**A production build with no published posts is fine.** `/blog/` says "No posts yet." Next.js
static export can't build a route with no pages, so the build emits one placeholder,
`blog/_no-posts/`. It shows the 404 page, is marked `noindex` and is never linked
(ADR-006). It disappears once a post is published.

Clean up afterwards with `docker compose run --rm frontend rm -rf out`.

## Branch, PR, review, merge

1. Branch from `main`: `content/<short-description>`, e.g. `content/price-change-2026-11`.
2. Commit the content and image files.
3. Open a PR. Summarise what the client asked for and when. **Don't paste their email or
   contact details**: the repo and its PRs are public.
4. One approval is required (`main` is protected). The reviewer checks the preview build and
   that the wording matches what the client sent.
5. Merge.

## Deploy

ADR-007 sets the deploy path: build, upload `frontend/out/` to S3, invalidate CloudFront.
It's manual until a pipeline exists. The exact commands, bucket and distribution belong to
GS-16 and aren't defined yet.

1. From an up-to-date `main`, make a production build:

   ```sh
   docker compose run --rm -e SITE_ENV=production frontend npm run build
   ```

2. Upload `frontend/out/` to the production S3 bucket. Command, bucket name, credentials and
   whether to delete removed files: TODO(confirm) in GS-16.
3. **Invalidate CloudFront**, or visitors keep seeing the old pages. Command and distribution
   ID: TODO(confirm) in GS-16.
4. Check the live page, then email the client that the change is live.

The preview site uses the same steps with a plain (preview) build and the preview bucket:
TODO(confirm) in GS-16.

## How blog URLs work on AWS

- Pages export as `blog/<slug>/index.html` (`trailingSlash: true`). The S3 bucket is private
  behind OAC and doesn't resolve directory indexes, so `/blog/<slug>/` works only because of
  the **GS-16 CloudFront Function**, which maps `/x/` to `/x/index.html` (ADR-007).
- Only slugs that exist at build time are generated (`dynamicParams = false`). An unknown slug
  has no object in S3, S3 returns 403, and CloudFront's **403 → `/404.html`** mapping shows
  the 404 page (ADR-007).
- Renaming or deleting a post therefore breaks its old URL. Redirects:
  TODO(confirm), not in scope for GS-17.
