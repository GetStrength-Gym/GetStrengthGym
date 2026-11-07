# ADR-008: Deploy the preview automatically on merge to main (GitHub Actions + OIDC)

- **Status:** proposed
- **Date:** 2026-11-03
- **Deciders:** Johnson Zhang (lead), with the development team
- **Source:** GS-42, requested by Johnson Zhang. No meeting minutes. Answers the "Revisit if"
  in `ADR-007-aws-delivery-route53-oac.md`, which asks for a pipeline's credentials model to be
  recorded as its own decision. **Preview only.**

## Context
ADR-007 makes deploys manual: build, upload `frontend/out/` to S3, invalidate CloudFront. Every
preview update therefore waits for someone with AWS access to run three commands by hand, and
the preview drifts behind `main` in between. The lead wants the preview to update by itself
whenever a change merges.

Constraints that apply:
- The repo is **public**. No account ID, distribution ID, bucket name, domain or key may be
  committed (ADR-007 already rules out long-lived keys in the repo).
- `main` is protected and needs one approval (`docs/maintenance/content-changes.md`).
- A build without `SITE_ENV=production` is a **preview** build: sample prices and
  "preview only" labels (ADR-006). That is exactly what the preview should show, and exactly
  what production must never get.
- The AWS account is in GetStrength's name, on their billing (ADR-004). This ADR adds no AWS
  service and no meaningful cost.

## Options considered

### Option A — Deploy on push to `main` — chosen
Every merge that touches `frontend/**` (or the workflow itself) deploys. The PR review that
already gates `main` is the deploy gate. Nothing extra for anyone to remember, and the preview
always matches `main`. A manual button (`workflow_dispatch`) covers re-runs.

### Option B — A separate deploy branch
Deploy when `main` is merged or pushed into, e.g., `preview`. Gives an explicit "ship it" step,
but adds a second long-lived branch to keep in sync, and a step people forget. For a preview,
whose whole job is to show the client what `main` looks like, the delay is the problem we are
solving. **Rejected.**

### Option C — Deploy on a release tag
Deploy when a tag such as `preview-2026-11-03` is pushed. Good for production, where a named,
deliberate release matters. For the preview it is ceremony: someone still has to remember, and
tags must be protected separately or anyone with write access can deploy. **Rejected for the
preview; worth considering for production.**

### Option D — Manual trigger only
Click "Run workflow" when wanted. No surprise deploys, but the preview still lags `main` until
someone remembers, which is the current state with less typing. **Rejected as the only trigger;
kept as a secondary trigger alongside Option A.**

## Decision
1. **`.github/workflows/deploy-preview.yml` deploys the preview on every push to `main` that
   changes `frontend/**` or the workflow file, and on manual dispatch from `main`.** Docs-only
   merges do not deploy.
2. **Preview build only.** The workflow runs a plain `npm run build` with no `SITE_ENV`, then
   `aws s3 sync out/ s3://<preview bucket> --delete` and a `/*` CloudFront invalidation.
   Node's major version matches `frontend/Dockerfile` (22).
3. **Deploys never overlap.** One concurrency group, `cancel-in-progress: false`, so a running
   upload is never killed halfway. If several merges queue, GitHub keeps only the newest
   pending run, which contains all of them.
4. **AWS access is GitHub OIDC, never stored keys.** Each run gets a short-lived session for one
   IAM role in GetStrength's account.
5. **Third-party actions are pinned to full commit SHAs**, with the version in a comment, so a
   moved or compromised tag cannot change what runs. Dependabot could propose bumps once
   enabled; it isn't configured yet.

### Security
- **OIDC trust is limited to this repo's `main` branch.** The role's trust policy accepts only
  tokens from `token.actions.githubusercontent.com` with audience `sts.amazonaws.com` and
  subject exactly `repo:GetStrength-Gym@337686561/GetStrengthGym@1404327806:ref:refs/heads/main`.
  This repo emits GitHub's immutable subject claim, which adds the organisation's and the
  repo's numeric IDs (checked 2026-11-08 in the repo's OIDC settings), so a trust policy with
  the name-only form `repo:GetStrength-Gym/GetStrengthGym:...` is refused. A run from any
  other branch, a fork or a pull request cannot assume it. The workflow's job also skips any
  run whose ref is not `main`. The job must not use a GitHub `environment:`; that changes the
  token's subject to `...:environment:<name>` and the trust policy would stop matching.
- **Least-privilege role**, nothing else attached:
  - `s3:ListBucket` on the preview bucket;
  - `s3:PutObject` and `s3:DeleteObject` on the preview bucket's objects (`<bucket>/*`);
  - `cloudfront:CreateInvalidation` on the preview distribution only.

  It cannot touch production, read other buckets, change the distribution or create users.
- **Identifiers live in GitHub, not the repo.** `AWS_ROLE_ARN` and `CLOUDFRONT_DISTRIBUTION_ID`
  are repository **secrets**. `PREVIEW_BUCKET` is a repository **variable**: it is already
  visible in the upload command's log line, and it grants nothing on its own. The workflow
  masks the account ID in logs.
- The workflow token has `id-token: write` and `contents: read` only, and checkout does not
  persist the token into the workspace.

### AWS-side setup (Johnson, in GetStrength's account)
Nothing below is in this repo, and none of the real values may be added to it.
1. Add GitHub as an IAM OIDC identity provider: URL `https://token.actions.githubusercontent.com`,
   audience `sts.amazonaws.com` (once per account).
2. Create the deploy role with the trust policy and permissions above. Trust policy shape, with
   placeholders:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Effect": "Allow",
       "Principal": { "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com" },
       "Action": "sts:AssumeRoleWithWebIdentity",
       "Condition": {
         "StringEquals": {
           "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
           "token.actions.githubusercontent.com:sub": "repo:GetStrength-Gym@337686561/GetStrengthGym@1404327806:ref:refs/heads/main"
         }
       }
     }]
   }
   ```

   Permissions policy shape:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       { "Effect": "Allow", "Action": "s3:ListBucket",
         "Resource": "arn:aws:s3:::<PREVIEW_BUCKET>" },
       { "Effect": "Allow", "Action": ["s3:PutObject", "s3:DeleteObject"],
         "Resource": "arn:aws:s3:::<PREVIEW_BUCKET>/*" },
       { "Effect": "Allow", "Action": "cloudfront:CreateInvalidation",
         "Resource": "arn:aws:cloudfront::<ACCOUNT_ID>:distribution/<PREVIEW_DISTRIBUTION_ID>" }
     ]
   }
   ```

   Confirmed on 2026-11-03 that the preview bucket uses default SSE-S3 (AES256) encryption, so
   the role needs no KMS permissions. If the bucket is ever switched to SSE-KMS, the role also
   needs `kms:GenerateDataKey` on that key.
3. In GitHub, repository settings: add secrets `AWS_ROLE_ARN` and `CLOUDFRONT_DISTRIBUTION_ID`,
   and variable `PREVIEW_BUCKET` (bucket name only, no `s3://`).
4. Run the workflow once with the manual button from `main` and check the preview address.

The workflow uses region `ap-southeast-2`. Confirmed on 2026-11-03 that the preview bucket is in
that region.

## Consequences

**Makes easy**
- The preview always shows what is on `main`, a few minutes after merge, with nobody's laptop
  involved.
- No AWS keys exist to leak, rotate or hand over. Revoking access is deleting one role.
- The deploy steps are written down and run the same way every time.

**Makes hard / accepted risks**
- **Every merge to `main` that touches `frontend/` deploys.** Review is the only gate. The
  preview is client-visible, so a bad merge is client-visible within minutes. This is accepted
  because it is the preview, it shows "preview only" labels, and it is fixed the same way.
- **The build fetches Google Fonts.** `next/font/google` downloads Inter at build time
  (`frontend/app/layout.tsx`). If Google Fonts is unreachable, the build fails and nothing is
  uploaded; re-run the workflow. Visitors are unaffected, since fonts are self-hosted in the output.
- **Rollback is revert and merge.** Revert the bad PR on GitHub and merge the revert; the
  workflow redeploys the previous state. `--delete` removes files that the reverted change added.
  There is no one-click "previous version" in S3 or CloudFront.
- **`--delete` makes the bucket an exact mirror of the build.** Anything uploaded to the preview
  bucket by hand is removed on the next deploy.
- **A cancelled or failed run can leave the preview half-updated** (some files new, some old)
  until the next successful run. The concurrency setting avoids this for overlapping deploys
  but not for a failure partway through the upload.
- Pinned SHAs need bumping deliberately. Dependabot could propose them once enabled, but it
  isn't configured yet; someone still reviews them.

## Out of scope: production
**Production is not deployed by this workflow, and must not be added to it.** A production
pipeline needs its own workflow and its own ADR, with at least:
- a deliberate trigger and a **required approval** (e.g. a protected GitHub environment, with
  the production role's trust policy matching that environment's subject);
- `SITE_ENV=production` set on the build, which also runs ADR-006's price-confirmation check;
- ADR-007's guard that refuses to upload if `out/` contains "preview only";
- a **separate role** that can reach only the production bucket and distribution.

Until then, production stays manual (`docs/maintenance/content-changes.md`).

## Revisit if
- A production pipeline is built → new ADR, as above.
- The preview gets a separate audience who should not see unreviewed work, or a merge breaks
  the preview in a way the client notices → add an approval step or move to Option B/C.
- GitHub or AWS change how OIDC subjects are formed (e.g. custom subject claims), or the repo
  is renamed or moved → update the trust policy, or deploys stop.
