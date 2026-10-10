# ADR-007: AWS delivery — Route 53 DNS, private S3 origin with OAC, CloudFront Function

- **Status:** accepted — 2026-10-10 **Agreed by the whole team 2026-10-08** (`docs/meetings/2026-10-08-architecture-agreement.md`).
- **Deciders:** Johnson Zhang (lead), with the development team
- **Source:** the lead's deployment architecture, 2026-10-10 (Users → Route 53 → CloudFront →
  S3, with ACM). Extends `ADR-004-hosting-on-aws.md`, which said any AWS service beyond S3 and
  CloudFront needs its own decision. This is that decision, for three additions.

## Context
ADR-004 fixed S3 + CloudFront. The lead's architecture adds **Route 53** for DNS and **AWS
Certificate Manager** for TLS. Working through it surfaced a third requirement the design
needs and ADR-004 got wrong: ADR-004 said `trailingSlash: true` plus "a default root object"
gives clean URLs. **It does not.** CloudFront's default root object only applies to the bare
root `/`. With a private bucket behind Origin Access Control, CloudFront talks to the S3 REST
endpoint, which has no concept of directory indexes — a request for `/about/` asks S3 for an
object literally named `about/`, which does not exist. Every page except the home page fails.

Two facts make Route 53 effectively mandatory rather than a preference:
- The domain's current DNS zone lives in WPX's panel, which **we cannot log into**. We hold
  only the registrar login, so we can change nameservers but cannot edit or read the zone.
- The bare domain `getstrength.com` cannot be a CNAME. Pointing the apex at CloudFront needs
  an alias record, which Route 53 provides.

## Options considered

### Origin: private bucket + OAC + CloudFront Function — chosen
Bucket stays private; only CloudFront can read it. A ~20-line viewer-request function maps
`/x/` to `/x/index.html`. Jev: **0.99**.

### Origin: S3 static website endpoint — rejected
Resolves directory indexes itself, so no function is needed. But it requires a **public**
bucket, cannot use OAC, and the CloudFront-to-origin hop is HTTP only. Jev: 0.01.

### DNS: Route 53 — chosen
Jev: **0.88** that it is justified, conditional on reconstructing the email records first.

### DNS: leave it where it is — rejected
Not actually available: we cannot edit the zone in WPX, and the apex cannot point at
CloudFront without an alias record.

## Decision

**Request path** — DNS is a lookup, not a hop; users talk to CloudFront directly:

```
Users ──(DNS lookup)──► Route 53 ──► CloudFront distribution address
Users ──(HTTPS)───────► CloudFront ──► CloudFront Function ──► S3 (private, OAC)
                        └─ ACM certificate, us-east-1, attached once at setup
Mail ─────────────────► Route 53 MX ──► Google Workspace   (must not break)
```

**Deploy path:** GitHub → `npm run build` → upload `frontend/out/` to S3 → invalidate
CloudFront. Manual until a pipeline exists.

| Piece | Setting |
|---|---|
| S3 bucket | Private. Block Public Access on. No static website hosting. |
| Origin access | CloudFront **Origin Access Control**; bucket policy allows only this distribution |
| CloudFront Function | Viewer request, `cloudfront-js-2.0`, code below |
| Default root object | `index.html` (covers `/`; the function covers everything else) |
| Missing pages | Custom error response: **403 → `/404.html`, status 404**. With OAC, S3 returns 403 — not 404 — for a missing key. Next.js export already emits `404.html`. |
| TLS | ACM public certificate in **us-east-1** (CloudFront uses no other region), covering `getstrength.com` and `www.getstrength.com`. Free. |
| DNS | Route 53 hosted zone in GetStrength's account. Apex and `www` as alias records to the distribution. |
| Viewer protocol | Redirect HTTP to HTTPS |

**CloudFront Function** — tested against 9 cases (root, nested slash, no-slash redirect,
`/_next/` assets, images, `404.html`) before being recorded here:

```js
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  if (uri.endsWith('/')) {                       // /about/ -> /about/index.html
    request.uri = uri + 'index.html';
    return request;
  }
  if (uri.split('/').pop().indexOf('.') === -1) { // /about -> 301 /about/
    return { statusCode: 301, statusDescription: 'Moved Permanently',
             headers: { location: { value: uri + '/' } } };
  }
  return request;                                 // assets pass through
}
```

## Consequences

**The preview does not wait for any of the DNS work.** Every CloudFront distribution gets a
`*.cloudfront.net` address with HTTPS already working. Bucket → OAC → distribution → function →
upload gives a working private preview. Route 53, ACM and the email records matter only at
launch. **The only blocker for GS-16 is that no AWS account exists in GetStrength's name.**

**The email hazard moves into this decision.** Switching nameservers to Route 53 is the
irreversible mistake ADR-001 warned about. Before the switch, the Route 53 zone must already
hold every record the gym's email depends on: **MX** (Google Workspace), the **SPF** TXT record,
**DKIM** (`google._domainkey`), and **DMARC** (`_dmarc`). Since the WPX zone cannot be read,
those are reconstructed from public DNS lookups — and **any record on a subdomain nobody knows
about cannot be discovered that way.** Compare the reconstructed zone against public lookups
record by record, lower TTLs where possible, and switch at a quiet time with a rollback plan.
That is GS-27 / GS-35 / GS-33, and why GS-33 is Highest priority.

**Running cost, for the client conversation** (AWS published pricing as known on 2026-10-10 —
confirm in the AWS Pricing Calculator before quoting): Route 53 hosted zone ~US$0.50/month;
ACM free; CloudFront within the always-free tier (1 TB transfer, 10M requests per month) for a
site this size; S3 a few cents. **Roughly US$1/month.**

**Accepted costs**
- One small piece of code at the edge (the function) that a future maintainer has to know
  exists. It lives in the repo with its tests, and the handover must mention it.
- Route 53 is a second place DNS can go wrong. It is also the only place we can manage it.

## Supersedes
The "set a default root object" advice in ADR-004 is **incomplete** and corrected here. ADR-004's
other content stands.

## Revisit if
- The client keeps DNS somewhere else they can actually give us access to — then Route 53 is
  optional, but the apex still needs an alias-capable provider.
- A deploy pipeline is built — record the credentials model (IAM role in the client's account,
  ideally via GitHub OIDC, never long-lived keys in the repo) as its own decision.
