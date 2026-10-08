#!/usr/bin/env bash
# Publish the docs to the PUBLIC GitHub repo, minus private material.
# Never published: docs/pricing.md, personal email addresses, Google Drive/Docs links.
# Usage: ./scripts/publish-docs.sh "commit message"
set -euo pipefail
SRC="$(cd "$(dirname "$0")/.." && pwd)"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

git clone -q https://github.com/GetStrength-Gym/GetStrengthGym.git "$WORK"
cd "$WORK"   # set -e: if this fails we stop, rather than redacting the private copy

rsync -a --exclude 'pricing.md' --exclude '.DS_Store' "$SRC/docs/" docs/
rsync -a --exclude '.DS_Store' "$SRC/scripts/" scripts/
cp "$SRC/CLAUDE.md" "$SRC/HANDOVER.md" .

find . -name '*.md' -not -path './.git/*' -print0 | xargs -0 perl -0pi -e '
  s/`?[A-Za-z0-9._%+-]+\@(?:gmail|hotmail|outlook|yahoo)\.com`?/(email held by Johnson — not in the public repo)/g;
  s/\[([^\]]*)\]\(https:\/\/(?:drive|docs)\.google\.com\/[^)]*\)/$1 (link held by Johnson — not in the public repo)/g;
  s/<https:\/\/(?:drive|docs)\.google\.com\/[^>]*>/(link held by Johnson — not in the public repo)/g;
  s/https:\/\/(?:drive|docs)\.google\.com\/\S+/(link held by Johnson — not in the public repo)/g;'

if [ -e docs/pricing.md ] || grep -rn -E '@(gmail|hotmail|outlook|yahoo)\.com|(drive|docs)\.google\.com' \
     --include='*.md' . ; then
  echo "LEAK CHECK FAILED — nothing pushed" >&2; exit 1
fi

git add -A
if git diff --cached --quiet; then echo "Nothing to publish."; exit 0; fi
git -c user.name="Johnson Zhang" -c user.email="rzha972@aucklanduni.ac.nz" \
  commit -q -m "${1:-Update project documentation}"
git push -q origin main
echo "Published $(git rev-parse --short HEAD)"
