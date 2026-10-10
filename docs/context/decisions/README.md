# Architecture Decision Records

One file per significant decision: `ADR-001-short-slug.md`. Copy `ADR-000-template.md`.

Record a decision here when it is expensive to reverse or when someone will later ask
"why is it like this?" — stack choice, CMS vs static, hosting, booking integration,
whether to keep the existing domain/theme, design system.

Never edit an accepted ADR to change the decision. Write a new one and mark the old
`superseded by ADR-00n`.

## Index
| ADR | Title | Status |
|-----|-------|--------|
| [ADR-001](ADR-001-static-site-architecture.md) | Build a new static site; abandon the old WordPress install | accepted 2026-09-22 |
| [ADR-002](ADR-002-stack-eleventy-decap-netlify.md) | Eleventy + Markdown in Git, Decap CMS, Netlify hosting | superseded 2026-10-05 (by ADR-003, ADR-004, ADR-005) |
| [ADR-003](ADR-003-maintenance-team-editing.md) | Content changes go through our maintenance team; no in-site CMS | accepted 2026-10-05 |
| [ADR-004](ADR-004-hosting-on-aws.md) | Host on AWS; Docker is local development only | accepted 2026-10-05 |
| [ADR-005](ADR-005-nextjs-static-export.md) | Next.js with static export as the site generator | accepted 2026-10-05 |
| [ADR-006](ADR-006-content-as-files.md) | Content as files read at build time; prices in one data file | accepted 2026-10-11 |
| [ADR-007](ADR-007-aws-delivery-route53-oac.md) | AWS delivery: Route 53 DNS, private S3 origin with OAC, CloudFront Function | accepted 2026-10-10 |
