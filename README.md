# GetStrength Gym website

Static website for GetStrength Gym, Onehunga. Decisions live in `docs/context/decisions/`.

## Stack
- **Next.js with static export** (ADR-005): `npm run build` produces plain files in `frontend/out/`
- **Hosting: AWS S3 + CloudFront** (ADR-004)
- **No CMS** (ADR-003): content changes are made by the maintenance team
- **Docker is for local development only.** Nothing runs in containers in production.

## Getting started
1. Install Docker Desktop. On Windows: enable WSL2, keep this repo inside Ubuntu (not on C:),
   and turn on Docker Desktop → Settings → Resources → WSL Integration → Ubuntu.
2. `docker compose up --build`
3. Open http://localhost:3000

The first run takes a few minutes.

## Everyday commands
- Stop: `docker compose down`
- Install a package: `docker compose exec frontend npm install <name>`
- After pulling changes that add packages: `docker compose up --build -V`

## Production build
`docker compose run --rm frontend npm run build` writes the static site to `frontend/out/`.

## Content
Blog posts and prices are files in `frontend/content/`, read at build time (ADR-006).
A build is a **preview** build (sample prices, draft posts) unless `SITE_ENV=production` is
set: `docker compose run --rm -e SITE_ENV=production frontend npm run build`. Never deploy a
preview build to the live site.
- [Developer runbook for content changes](docs/maintenance/content-changes.md)
- [Change-request guide for GetStrength](docs/maintenance/change-request-guide.md) (client-facing)

## Static export rules (ADR-005)
- No server features: no route handlers, middleware, server actions or ISR.
- `next/image` runs unoptimized, so resize and compress photos before adding them.
- `trailingSlash: true` is required for clean URLs on S3/CloudFront. Don't remove it.

## Troubleshooting
- "next: not found" or missing packages: `docker compose up --build -V`
