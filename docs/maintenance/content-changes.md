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
| Address, hours, contact details, nav, social links, Home copy | `frontend/content/site.json` |
| Membership prices (the only place prices live) | `frontend/content/prices.json` |
| Sample prices for the preview site only | `frontend/content/prices.sample.json` |
| Loader and validation | `frontend/lib/content.ts` |

## Preview builds and production builds

The build mode comes from the `SITE_ENV` environment variable.

| | Preview (default) | Production (`SITE_ENV=production`) |
|---|---|---|
| Prices | `prices.sample.json`, labelled "Unconfirmed prices and terms — preview only" | `prices.json` |
| Unconfirmed content (coach, photos, map, phone, email, hours) | labelled placeholders | left out |
| Launch check | — | build **fails** if `confirmedWithClient` is `null` |

**Anything other than `SITE_ENV=production` counts as preview**, including a plain
`npm run build`. Never upload a build made without `SITE_ENV=production` to the live site,
or the sample prices and placeholders go live with it.

There is no blog: it was removed per the 2026-10-18 meeting. Use only the words and facts
the client sent. Don't fill gaps; ask them.

## Change a price

1. Edit `frontend/content/prices.json` **only**. Never put a price in a page or component.
2. Each plan has `price` (a positive number, or `null`) and `period` (e.g. `"week"`, or
   `null`). A `null` price shows "Contact us for pricing".
3. Don't rename a plan's `id`. Plan names come from the client's sign-up form (GS-8), so
   change a `name` only if the client has changed it there too.
4. Update `confirmedWithClient` to the date the client confirmed the new price (next section).
5. Each plan's `details` is a list of display lines for billing, minimum term, fees and
   inclusions. Keep facts in this file rather than in the card component. `dayPass` holds
   a positive `price` (or `null`) and `howToBuy` text (or `null`).
6. Keep `prices.sample.json` in the same shape. Its current numbers are the unconfirmed
   observations recorded in Figma on 2026-10-12, displayed only in labelled previews.
   They are not client approval and must not be copied into production without confirmation.

## Update Home and shared details

Edit `frontend/content/site.json` for the address, separate access/viewing hours, the
Contact page's phone and enquiry email (null until confirmed; hidden in production), shared
Join destination, navigation, approved social links and Home's introductory/benefit copy.
Use only the current gym's confirmed external destinations; a null social URL is omitted.
Missing coach, photograph, map and video-testimonial content stays labelled in preview
and is hidden in production. The supplied Figma logo is stored locally in
`frontend/public/images/brand/`; confirm current-owner usage rights before launch.

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
docker compose up                                  # http://localhost:3000/
docker compose run --rm frontend npm run lint
docker compose run --rm frontend node --experimental-strip-types lib/content.test.mjs
docker compose run --rm frontend npm run build     # preview build into frontend/out/
```

Invalid content fails the build with the file and field, for example:

```
content/prices.json: "confirmedWithClient" must be null or YYYY-MM-DD
```

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

## How page URLs work on AWS

- Pages export as `<page>/index.html` (`trailingSlash: true`), e.g. `about/index.html`. The
  S3 bucket is private behind OAC and doesn't resolve directory indexes, so `/about/` works
  only because of the **GS-16 CloudFront Function**, which maps `/x/` to `/x/index.html` (ADR-007).
- The function's code is `frontend/cloudfront/viewer-request.js`. Test it with
  `docker compose run --rm frontend node cloudfront/viewer-request.test.mjs`.
- A page that doesn't exist has no object in S3, S3 returns 403, and CloudFront's
  **403 → `/404.html`** mapping shows the 404 page (ADR-007). Since the blog was removed,
  `/blog/` is one of these.
