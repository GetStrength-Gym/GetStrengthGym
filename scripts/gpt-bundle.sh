#!/usr/bin/env bash
# Rebuild gpt-context.md — one file to upload to the admin/planning assistant.
# Re-run after any doc change: ./scripts/gpt-bundle.sh
# docs/pricing.md is excluded on purpose: "internal, do not share".
set -euo pipefail
cd "$(dirname "$0")/.."

FILES=(
  HANDOVER.md
  CLAUDE.md
  docs/requirements.md
  docs/quote-GS-001.md
  docs/context/project-brief.md
  docs/context/stakeholders.md
  docs/context/current-site-audit.md
  docs/context/decisions/ADR-001-static-site-architecture.md
  docs/context/decisions/ADR-003-maintenance-team-editing.md
  docs/context/decisions/ADR-004-hosting-on-aws.md
  docs/context/decisions/ADR-005-nextjs-static-export.md
  docs/context/decisions/ADR-007-aws-delivery-route53-oac.md
  docs/content/site-inventory.md
  docs/meetings/README.md
  docs/meetings/_prep-stakeholder-discovery.md
)

{
  cat scripts/gpt-brief.md
  for f in "${FILES[@]}"; do
    printf '\n\n---\n\n# FILE: %s\n\n' "$f"
    cat "$f"
  done
} > gpt-context.md

echo "gpt-context.md — $(wc -c < gpt-context.md) bytes, ${#FILES[@]} files + brief"
