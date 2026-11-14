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
| Which photo or video fills each slot | `frontend/content/photos.json` |
| Events and competitions on `/events/` | `frontend/content/events.json` |
| Sample events for the preview site only | `frontend/content/events.sample.json` |
| Loader and validation | `frontend/lib/content.ts` |

## Preview builds and production builds

The build mode comes from the `SITE_ENV` environment variable.

| | Preview (default) | Production (`SITE_ENV=production`) |
|---|---|---|
| Prices | `prices.sample.json`, labelled "Unconfirmed prices and terms — preview only" | `prices.json` |
| Events | `events.sample.json`, labelled "Sample events — preview only" | `events.json` |
| Unconfirmed content (coach, email, staffed hours) | labelled placeholders | left out |
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
Join destination, navigation, approved social links, Home's introductory/benefit copy and
About's `about.story`.
Each Home benefit has a `photo` path under `public/images/`; the build fails if the photo file is missing.
Use only the current gym's confirmed external destinations; a null social URL is omitted.
Instagram shows as its logo (`frontend/components/SocialIcon.tsx`); a service without a logo there
shows its name instead.
Missing coach and video-testimonial content stays labelled in preview and is hidden in
production. The map on Home and Contact is a Google Maps embed built from `name` and `address`. The supplied Figma logo is stored locally in
`frontend/public/images/brand/`; confirm current-owner usage rights before launch.

## Swap a photo or the hero video

`frontend/content/photos.json` says which file each slot uses: the Home hero video and its
poster, Home's Train together photo, Home's five member-testimonial photos (`homeMembers`), About's
story photo, About's What we offer cards (`aboutOffers`) and the About gallery. Every photo
needs `alt` text describing what is visible; the hero video is decorative, so it has none.
The build fails if a file is missing, its path's case differs from the file, or alt text is empty.

1. Use only photos the client has approved, with permission for anyone in them. Leave out
   anything showing a number plate.
2. Resize before adding, as JPEG:
   - 2880px wide for the full-width Train together and About story photos (about 400–700 KB);
   - 1600×800 for the member photos (`homeMembers`);
   - 1200×800 for the About gallery;
   - 800×1200 for the Why GS Gym cards and 800×1000 for What we offer (portrait).
3. Remove location data. Keep the photographer's copyright (`qbkl.media` for the
   2026-11-09 album).
4. Put the file in `frontend/public/images/gym/` and point the slot at it.

The hero video lives in `frontend/public/videos/`; keep it short, muted-friendly and about
5 MB or less, with a matching still frame as its `poster`.

## Add or change an event

Edit `frontend/content/events.json`. Add only events the gym has given us (brief Q17); an
empty list is fine and shows "Nothing on the calendar yet". The order in the file doesn't
matter: the page sorts by date. Past events stay listed under "Past events", so delete old
ones whenever the list gets long.

```json
{
  "id": "auckland-cup-2027",
  "title": "Auckland Cup 2027",
  "type": "competition",
  "start": "2027-11-27",
  "end": "2027-11-28",
  "venue": "Venue name",
  "address": "Street, suburb, Auckland",
  "organiser": "Auckland Powerlifting Association",
  "entriesOpen": "2027-10-16",
  "entriesClose": "2027-11-06",
  "entryUrl": "https://organiser.example/enter",
  "note": "One or two sentences for visitors."
}
```

- **Required:** `id` (lower-case words joined by hyphens, unique), `title`, `type`
  (`"competition"` or `"gym"`), `start`, `venue`, `organiser`.
- **Optional** (leave out or `null`): `end` (defaults to `start`), `time`
  (e.g. `"9:00am – 1:00pm"`), `address` (needed for Get directions), `note`.
- **Competitions only:** `entriesOpen` and `entriesClose`, both or neither, in the order
  open ≤ close ≤ start. `entryUrl` (https) needs them; the Enter button shows only while
  entries are open.
- Dates are `YYYY-MM-DD` in Auckland time. **Never add a status:** the page works out
  "Entries open", "Entries closed", "Completed" and the rest from the dates every time it loads,
  so nothing goes stale between deploys.

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
docker compose run --rm frontend npm test
docker compose run --rm frontend npm run build     # preview build into frontend/out/
```

GitHub runs the same three checks on every pull request (the **Checks** workflow).

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
The **preview** site deploys automatically (ADR-008). The **live** site is still manual.

### Preview: automatic on merge

How it works: when a PR that changes anything under `frontend/` merges to `main`, the GitHub
Actions workflow `.github/workflows/deploy-preview.yml` ("Deploy preview") runs. It makes a
plain preview build (no `SITE_ENV`, so sample prices show), uploads `frontend/out/`
to the preview bucket with `--delete`, and invalidates the preview CloudFront distribution.
The upload tells browsers to keep fingerprinted files under `_next/static/` for a year and to
re-check everything else on each visit.
AWS access is a short-lived OIDC session for a role that trusts `main` only; there are no AWS
keys anywhere. Docs-only merges don't deploy. Deploys never overlap: a second merge waits for
the first to finish.

Check it: GitHub → **Actions** → **Deploy preview** → the latest run should be green. Then open
the preview address (TODO(confirm): where the preview address is kept; not in this repo).

**Re-run it with the manual button:** Actions → **Deploy preview** → **Run workflow** → branch
`main` → **Run workflow**. This deploys the current `main`. Use it after a failure such as Google
Fonts being unreachable (the build downloads the Inter font). Runs started from any other branch
are skipped. Avoid **Re-run jobs** on an *old* run: it redeploys that old commit, and the next
merge silently replaces it.

**Roll back:** revert the bad PR on GitHub (the PR's **Revert** button), get the revert PR
approved, and merge it. The workflow redeploys the previous state, and `--delete` removes any
files the bad change added. There is no other "previous version" to restore.

**Manual fallback** if Actions is unavailable. Needs the AWS CLI on your machine and AWS
credentials for the preview bucket and distribution; how a person gets those (the deploy role
trusts GitHub only): TODO(confirm). Run from the repo root on an up-to-date `main`:

```sh
docker compose run --rm frontend rm -rf out                 # start from a clean out/
docker compose run --rm frontend npm run build              # preview build into frontend/out/
aws s3 sync frontend/out/ s3://<preview-bucket-name> --delete
aws cloudfront create-invalidation --distribution-id <preview-distribution-id> --paths "/*"
```

Replace the `<...>` placeholders with the values from the GitHub repository settings
(variable `PREVIEW_BUCKET`, secret `CLOUDFRONT_DISTRIBUTION_ID`; TODO(confirm) where the team
keeps a readable copy, since GitHub secrets can't be viewed). **Never commit the real values**:
the repo is public.

### Live site: manual

Not automated, and not to be added to the preview workflow. A production pipeline needs its
own workflow with an approval step (ADR-008).

1. From an up-to-date `main`, make a production build:

   ```sh
   docker compose run --rm -e SITE_ENV=production frontend npm run build
   ```

2. Upload `frontend/out/` to the production S3 bucket. Command, bucket name, credentials and
   whether to delete removed files: TODO(confirm) in GS-16.
3. **Invalidate CloudFront**, or visitors keep seeing the old pages. Command and distribution
   ID: TODO(confirm) in GS-16.
4. Check the live page, then email the client that the change is live.

## How page URLs work on AWS

- Pages export as `<page>/index.html` (`trailingSlash: true`), e.g. `about/index.html`. The
  S3 bucket is private behind OAC and doesn't resolve directory indexes, so `/about/` works
  only because of the **GS-16 CloudFront Function**, which maps `/x/` to `/x/index.html` (ADR-007).
- The function's code is `frontend/cloudfront/viewer-request.js`. Test it with
  `docker compose run --rm frontend node cloudfront/viewer-request.test.mjs`.
- A page that doesn't exist has no object in S3, S3 returns 403, and CloudFront's
  **403 → `/404.html`** mapping shows the 404 page (ADR-007). Since the blog was removed,
  `/blog/` is one of these.
