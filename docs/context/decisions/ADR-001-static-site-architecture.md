# ADR-001: Build a new static site; abandon the old WordPress install

- **Status:** accepted — 2026-09-22, confirmed by client 2026-09-23
- **Deciders:** Johnson Zhang (lead), with GetStrength
- **Source:** `docs/context/current-site-audit.md`, `docs/requirements.md`

## Context
getstrength.com is WordPress 7.0.1 + Elementor + WooCommerce + bbPress on WPX hosting,
~2,725 indexed URLs. Nobody holds wp-admin or hosting credentials; only the domain
registrar login. The client is non-technical and will maintain the site themselves.

Recovery was considered (password reset via `/wp-login.php`, WPX account recovery) and
**not pursued** — the client accepted starting fresh, which removes the dependency on
third parties and on a platform they cannot manage.

## Options considered
- **A — Recover access and improve in place.** Cheapest if recovery works, but depends on
  WPX support and leaves them owning a WordPress install they can't maintain.
- **B — New static site, launched by repointing the domain.** Works with registrar access
  alone. Free hosting, nothing to patch, no member or payment data held.
- **C — Full migration off WordPress.** Impossible without access; no export path.

## Decision
**Option B.** A new static site with an editable blog, published at getstrength.com by
repointing DNS. The old WordPress install is abandoned in place, not migrated.

## Consequences
- The old site's 323 posts and 1,758 forum replies are **not** carried over by default.
  They remain publicly readable, so they can be scraped later if the client wants them
  (quoted separately — Q3, Q4).
- Existing indexed URLs will break unless specific ones are redirected. Accepted for now;
  revisit if the client prioritises search traffic.
- **Email risk is the main hazard.** MX records point at Google Workspace and live in
  WPX's DNS panel. The zone must be reconstructed before nameservers change.
- Running costs drop to just the domain.

## Still to decide
The specific stack — static site generator and editing method — is **not** settled here.
That needs ADR-002, constrained by: staff must edit the blog without a developer,
hosting must be free, and any web developer must be able to pick it up.

## Revisit if
The client asks for member accounts, on-site payments, or decides the old content matters
enough to fund a migration.
