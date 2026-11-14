# Glossary

Gym-specific and project-specific terms, so AI and new contributors don't guess.
Add a row the first time a term appears in minutes.

| Term | Means |
|------|-------|
| ADR | Architecture Decision Record: one file per significant decision, in `docs/context/decisions/`. |
| Preview build | Any build without `SITE_ENV=production`. Shows sample prices and labelled placeholders. Never goes to the live site. |
| Production build | A build with `SITE_ENV=production`. Shows only confirmed content, and fails until the prices are confirmed. |
| Preview site | The private-address copy of the site that redeploys on every merge to `main` (ADR-008). |
| Live site | The public site on the gym's domain. Not launched yet. |
| `confirmedWithClient` | The date in `prices.json` on which the gym confirmed the prices. `null` blocks a production build. |
| `TODO(confirm)` | A fact we don't have from the gym in writing yet. Never replace it with a guess. |
| Debit Success | The gym's membership signup and billing provider. Every Join button links to its form. |
| Day pass | A single casual visit, priced separately from the membership plans. |
| OAC | Origin Access Control: lets CloudFront read the private S3 bucket so nothing else can (ADR-007). |
| OIDC | How the deploy workflow gets short-lived AWS credentials without stored keys (ADR-008). |
| Maintenance team | The four developers. The gym emails a change request and the team edits the files (ADR-003). |

Still worth defining once the gym confirms them: membership tier names and what each
includes, and any coaching programme names.
