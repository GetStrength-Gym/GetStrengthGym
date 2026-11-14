<div align="center">

<img src="frontend/app/icon.png" width="96" alt="GetStrength Gym shield logo">

# GetStrength Gym website

*The static website for GetStrength Gym in Penrose, Auckland*

[![Checks](https://github.com/GetStrength-Gym/GetStrengthGym/actions/workflows/checks.yml/badge.svg)](https://github.com/GetStrength-Gym/GetStrengthGym/actions/workflows/checks.yml)
[![Deploy preview](https://github.com/GetStrength-Gym/GetStrengthGym/actions/workflows/deploy-preview.yml/badge.svg)](https://github.com/GetStrength-Gym/GetStrengthGym/actions/workflows/deploy-preview.yml)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org)
[![Node.js 22](https://img.shields.io/badge/Node.js-22-3c873a?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[Overview](#overview) • [Getting started](#getting-started) • [Commands](#commands) • [How it works](#how-it-works) • [Deploying](#deploying) • [Documentation](#documentation)

</div>

## Overview

The site has three pages: **Home**, **About Us** and **Contact**. Home also serves as The
Gym page. Membership signup stays on Debit Success.

There is no server, database or CMS. Gym staff never edit the site: they email the
maintenance team, who change a file here and redeploy
([ADR-003](docs/context/decisions/ADR-003-maintenance-team-editing.md)).

- **Static export.** Next.js builds plain HTML, CSS and JS. Nothing runs in production
  except a CDN in front of a private bucket.
- **Content as files.** Site details, prices and photos are JSON files, validated on every
  build.
- **Two build modes.** A preview build shows sample prices and labelled placeholders. A
  production build shows only what the gym has confirmed.
- **Automatic preview.** Every merge to `main` that changes the site redeploys the preview.

> [!NOTE]
> **Status (November 2026): pre-launch.** The preview site is live and redeploys on merge.
> The first production deploy and the DNS move are still to come, and the contact form is a
> preview-only layout until its sending method is decided. What's left is on the
> [roadmap](https://github.com/GetStrength-Gym/GetStrengthGym/wiki/Roadmap).

## Getting started

You need [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```sh
git clone https://github.com/GetStrength-Gym/GetStrengthGym.git
cd GetStrengthGym
docker compose up --build
```

Open <http://localhost:3000>. The first run takes a few minutes.

> [!TIP]
> On Windows, enable WSL 2, keep the repo inside your Ubuntu home (not on `C:`), and turn on
> Docker Desktop → Settings → Resources → WSL Integration → Ubuntu.

<details>
<summary>Without Docker</summary>

Use Node.js 22, the version in the Dockerfile and the workflows:

```sh
cd frontend
npm ci
npm run dev
```

Run the `npm` commands below directly in `frontend/`. For a production build, use
`SITE_ENV=production npm run build`.
</details>

## Commands

Run these from the repo root.

```sh
docker compose up                      # dev server on http://localhost:3000
docker compose down                    # stop it

docker compose run --rm frontend npm run lint
docker compose run --rm frontend npm test       # content loader and CloudFront function tests

docker compose run --rm frontend npm run build                        # preview build → frontend/out/
docker compose run --rm -e SITE_ENV=production frontend npm run build # production build

docker compose exec frontend npm install <name>   # add a package (while running)
docker compose up --build -V                      # after pulling changes that add packages
```

The [Checks](.github/workflows/checks.yml) workflow runs lint, the tests and a preview build
on every pull request.

## How it works

![How a visit is served. Visitors reach CloudFront over HTTPS, and CloudFront reads the private S3 bucket through Origin Access Control. At launch, Route 53 answers DNS for the gym's domain and holds the gym's email records, and ACM provides the certificate. Joining happens on Debit Success, and the map on Home and Contact is a Google Maps embed.](docs/diagrams/request-path.png)

- **Static export** ([ADR-005](docs/context/decisions/ADR-005-nextjs-static-export.md)).
  Next.js 16, React 19, TypeScript and Tailwind CSS 4 build plain HTML, CSS and JS. No
  application server runs in production.
- **Content as files** ([ADR-006](docs/context/decisions/ADR-006-content-as-files.md)).
  Site details live in `frontend/content/site.json` and photo choices in `photos.json`.
  Real prices live in `prices.json`, and preview builds show `prices.sample.json` instead.
  The build validates the content and fails with the file and field at fault.
- **Delivery** ([ADR-007](docs/context/decisions/ADR-007-aws-delivery-route53-oac.md)). A
  private S3 bucket sits behind CloudFront. A CloudFront Function serves `/about/` from
  `about/index.html` and redirects `/about` to `/about/`. Missing pages get the site's 404.
  Route 53 and the certificate arrive at launch; until then the preview uses its CloudFront
  address.
- **Third parties.** Joining links out to Debit Success, and the map on Home and Contact is
  a Google Maps embed. Nothing else loads from outside the site.

### Preview and production builds

`SITE_ENV` decides what a build shows. Anything other than `SITE_ENV=production`, including
a plain `npm run build`, is a preview build.

| | Preview (default) | Production (`SITE_ENV=production`) |
|---|---|---|
| Prices shown | `prices.sample.json`, labelled "preview only" | `prices.json` |
| Unconfirmed content (coach, services, email…) | labelled placeholders | left out |
| Price checks | both price files validated; client confirmation not needed | `prices.json` validated; the build **fails** until the client has confirmed the prices |

> [!CAUTION]
> Never upload a preview build to the live site. The sample prices and placeholders would go
> live with it.

## Deploying

![How a change reaches the site. A developer opens a pull request, and the Checks workflow runs lint, tests and a build on it. Once it has one approval and is merged to main with changes to frontend/ or the deploy workflow, the Deploy preview workflow builds the site, assumes the deploy role through OIDC, syncs the files to the preview bucket and invalidates the preview distribution. The live bucket and distribution are updated by hand from a production build.](docs/diagrams/deploy-pipeline.png)

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
│   ├── components/           header, footer, join button, prices, hero video, map
│   ├── content/              site.json, photos.json, prices.json, prices.sample.json
│   ├── lib/                  content loader and validation, with its test
│   ├── cloudfront/           CloudFront viewer-request function, with its test
│   └── public/               images and the hero video, served as-is
├── docs/                     requirements, decisions, runbooks, design, meetings, diagrams
├── scripts/                  maintainer tools (publishing the docs)
├── .github/                  workflows (checks, preview deploy) and Dependabot config
├── docker-compose.yml        local development only
├── CONTRIBUTING.md           branches, pull requests and the ground rules
├── HANDOVER.md               where things stand, for whoever picks this up
└── CLAUDE.md                 rules for AI-assisted work on this repo
```

## Documentation

The full map is in [docs/README.md](docs/README.md). The ones you'll need most:

| Document | What it covers |
|---|---|
| [Requirements](docs/requirements.md) | What we're building, and the quote |
| [HANDOVER.md](HANDOVER.md) | Where the project stands, and what to watch out for |
| [Developer runbook](docs/maintenance/content-changes.md) | Making content changes, checking them and deploying |
| [Decisions (ADRs)](docs/context/decisions/README.md) | Why the site is built this way |
| [Roadmap](https://github.com/GetStrength-Gym/GetStrengthGym/wiki/Roadmap) | What's done, what's next |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to make a change, and the rules that keep the site safe |

## Troubleshooting

- **`next: not found` or missing packages:** run `docker compose up --build -V`.
- **The production build fails on `confirmedWithClient`:** this is expected until the client
  confirms the prices. Use a preview build in the meantime.
- **The build fails while downloading fonts:** the build fetches Inter from Google Fonts.
  Check your connection and run it again.
- **Port 3000 is busy:** stop the other server, or change the port mapping in
  `docker-compose.yml`.
- **Clean up build output:** `docker compose run --rm frontend rm -rf out`.

## Team

Built and maintained by Johnson Zhang (lead), Desmond Li, Jayden Pham and Kevin Wang.
