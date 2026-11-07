# GetStrength Gym website

[![Deploy preview](https://github.com/GetStrength-Gym/GetStrengthGym/actions/workflows/deploy-preview.yml/badge.svg)](https://github.com/GetStrength-Gym/GetStrengthGym/actions/workflows/deploy-preview.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

The new website for **GetStrength Gym** in Penrose, Auckland. It is a static site with three
pages, **Home**, **About Us** and **Contact**; Home also serves as The Gym page. Membership
signup stays on Debit Success.

There is no server, database or CMS. Gym staff never edit the site: they email the
maintenance team, who change a file here and redeploy
([ADR-003](docs/context/decisions/ADR-003-maintenance-team-editing.md)).

> **Status (November 2026): pre-launch.** The preview site redeploys automatically when a
> merge to `main` changes `frontend/` or the deploy workflow. The live launch, meaning the first production deploy
> and the DNS move, is still to come. The contact form is a preview-only layout until its
> sending method is decided.

## Quick start

You need [Docker Desktop](https://www.docker.com/products/docker-desktop/). On Windows,
enable WSL 2, keep the repo inside your Ubuntu home (not on `C:`), and turn on
Docker Desktop → Settings → Resources → WSL Integration → Ubuntu.

```sh
git clone https://github.com/GetStrength-Gym/GetStrengthGym.git
cd GetStrengthGym
docker compose up --build
```

Open <http://localhost:3000>. The first run takes a few minutes.

<details>
<summary>Without Docker</summary>

Use Node.js 22, the version in the Dockerfile and the deploy workflow:

```sh
cd frontend
npm ci
npm run dev
```

Run the `npm` and `node` commands below directly in `frontend/`. For a production build, use
`SITE_ENV=production npm run build`.
</details>

## Documentation

| Document | What it covers |
|---|---|
| [docs/requirements.md](docs/requirements.md) | What we're building, and the quote. It is client-facing and mirrored in a shared document, so update both. |
| [HANDOVER.md](HANDOVER.md) | Where the project stands, and what to watch out for |
| [Project brief](docs/context/project-brief.md) | Scope, constraints and open questions |
| [Decisions (ADRs)](docs/context/decisions/README.md) | Why the site is built this way |
| [Developer runbook](docs/maintenance/content-changes.md) | Making content changes, checking them and deploying |
| [Change-request guide](docs/maintenance/change-request-guide.md) | For the gym: how to ask for a change |
| [Design](docs/design/README.md) | Visual direction and the page journey |
| [Meeting minutes](docs/meetings/README.md) | What was agreed with the client and the team |
| [Old-site audit](docs/context/current-site-audit.md) | The site this one replaces, and why we started fresh |

## Everyday commands

Run these from the repo root.

```sh
docker compose up                      # dev server on http://localhost:3000
docker compose down                    # stop it

docker compose run --rm frontend npm run lint
docker compose run --rm frontend node --experimental-strip-types lib/content.test.mjs
docker compose run --rm frontend node cloudfront/viewer-request.test.mjs

docker compose run --rm frontend npm run build                        # preview build → frontend/out/
docker compose run --rm -e SITE_ENV=production frontend npm run build # production build

docker compose exec frontend npm install <name>   # add a package (while running)
docker compose up --build -V                      # after pulling changes that add packages
```

## How it works

![How a visit is served. Visitors reach CloudFront over HTTPS, and CloudFront reads the private S3 bucket through Origin Access Control. At launch, Route 53 answers DNS for getstrength.com and holds the gym's email records, and ACM provides the certificate. Joining happens on Debit Success.](docs/diagrams/request-path.png)

- **Static export** ([ADR-005](docs/context/decisions/ADR-005-nextjs-static-export.md)).
  Next.js 16, React 19, TypeScript and Tailwind CSS 4 build plain HTML, CSS and JS. No
  application server runs in production.
- **Content as files** ([ADR-006](docs/context/decisions/ADR-006-content-as-files.md)).
  Site details live in `frontend/content/site.json`. Real prices live in `prices.json`, and
  preview builds show `prices.sample.json` instead. The build validates the content and
  fails with the file and field at fault.
- **Delivery** ([ADR-007](docs/context/decisions/ADR-007-aws-delivery-route53-oac.md)). A
  private S3 bucket sits behind CloudFront. A CloudFront Function serves `/about/` from
  `about/index.html` and redirects `/about` to `/about/`. Missing pages get the site's 404.
  Route 53 and the certificate arrive at launch; until then the preview uses its CloudFront
  address.

## Preview and production builds

`SITE_ENV` decides what a build shows. Anything other than `SITE_ENV=production`, including
a plain `npm run build`, is a preview build.

| | Preview (default) | Production (`SITE_ENV=production`) |
|---|---|---|
| Prices shown | `prices.sample.json`, labelled "preview only" | `prices.json` |
| Unconfirmed content (photos, hours, phone…) | labelled placeholders | left out |
| Price checks | both price files validated; client confirmation not needed | `prices.json` validated; the build **fails** until the client has confirmed the prices |

**Never upload a preview build to the live site.**

## Deploying

![How a change reaches the site. A developer opens a pull request; once it has one approval and is merged to main with changes to frontend/ or the deploy workflow, the Deploy preview workflow builds the site, assumes the deploy role through OIDC, syncs the files to the preview bucket and invalidates the preview distribution. The live bucket and distribution are updated by hand from a production build.](docs/diagrams/deploy-pipeline.png)

- **Preview: automatic** ([ADR-008](docs/context/decisions/ADR-008-auto-deploy-preview.md)).
  When a merge to `main` changes `frontend/` or the workflow, the
  [Deploy preview](.github/workflows/deploy-preview.yml) workflow builds the site, syncs
  `frontend/out/` to the preview bucket with `--delete` and clears the CloudFront cache. It
  gets short-lived credentials through OIDC from a role that trusts only `main`, so it needs
  no long-lived AWS keys. Re-runs and rollbacks are in the
  [runbook](docs/maintenance/content-changes.md#preview-automatic-on-merge).
- **Live: manual for now**, from a production build. The
  [runbook](docs/maintenance/content-changes.md#live-site-manual) has the steps; some details
  are still to be confirmed before launch. Automating it needs its own workflow, with an
  approval step, and its own ADR.
- AWS identifiers live in the repository's secrets and variables, never in files here.

> [!WARNING]
> The gym's email depends on DNS records held at the old host. Rebuild every record in
> Route 53 before any nameserver change, or the gym loses its email. See
> [HANDOVER.md](HANDOVER.md#watch-outs).

Both diagrams are generated from [`docs/diagrams/architecture.py`](docs/diagrams/architecture.py)
with the official AWS icons. The command to regenerate them is at the top of that file.

## Project layout

```text
.
├── frontend/                 the website (Next.js)
│   ├── app/                  pages: Home, about/, contact/, 404
│   ├── components/           header, footer, join button, prices, placeholders
│   ├── content/              site.json, prices.json, prices.sample.json
│   ├── lib/                  content loader and validation, with its test
│   ├── cloudfront/           CloudFront viewer-request function, with its test
│   └── public/               images, served as-is
├── docs/                     requirements, decisions, runbooks, design, meetings, diagrams
├── scripts/                  maintainer tools (publishing the docs)
├── .github/workflows/        preview deploy
├── docker-compose.yml        local development only
├── HANDOVER.md               where things stand, for whoever picks this up
└── CLAUDE.md                 rules for AI-assisted work on this repo
```

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

## Contributing

1. Branch from `main`. Name the branch after the Jira ticket, e.g. `feature/GS-19-about-contact-pages`,
   or `content/<short-description>` for a content change.
2. Run lint, both tests and a build before you push.
3. Open a PR with the ticket key in the title. `main` needs one approval, and pushing new
   commits dismisses earlier approvals.
4. A decision that is expensive to reverse gets an ADR: copy
   [the template](docs/context/decisions/ADR-000-template.md). A client request heard in a
   meeting goes into the [minutes](docs/meetings/README.md) before it goes into code.

## Troubleshooting

- **`next: not found` or missing packages:** run `docker compose up --build -V`.
- **The production build fails on `confirmedWithClient`:** this is expected until the client
  confirms the prices. Use a preview build in the meantime.
- **The build fails while downloading fonts:** the build fetches Inter from Google Fonts.
  Check your connection and run it again.
- **Port 3000 is busy:** stop the other server, or change the port mapping in
  `docker-compose.yml`.
- **Clean up build output:** `docker compose run --rm frontend rm -rf out`.

## Team and license

Built and maintained by Johnson Zhang (lead), Desmond Li, Jayden Pham and Kevin Wang.
Released under the [MIT License](LICENSE), © 2026 GetStrength Gym.
