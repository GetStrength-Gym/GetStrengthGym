# ADR-002: Eleventy + Markdown in Git, Decap CMS, Netlify hosting

- **Status:** accepted — 2026-10-05 (lead sign-off, GS-12). **Editing layer superseded by ADR-003 — 2026-10-05:** Decap CMS is out of scope; generator, hosting and forms below stand unchanged.
- **Deciders:** Johnson Zhang (lead), with Desmond Li, Jayden Pham, Kevin Wang
- **Source:** `docs/context/decisions/ADR-001-static-site-architecture.md` ("Still to decide"), `docs/requirements.md`, `docs/context/project-brief.md`

## Context
ADR-001 settled *new static site, launched by repointing DNS*. It deliberately left the
generator and the editing method open. Those are now needed before anyone writes code.

Binding constraints, all from agreed documents:

| Constraint | Source |
|---|---|
| Staff publish blog posts and change prices **without a developer** | `docs/requirements.md` — "Built so it's easy to look after" |
| Hosting, editor and contact form **free** | `docs/requirements.md` — "Running costs after launch" |
| **Common, standard tools** — any web developer can take it over | `docs/requirements.md`; `project-brief.md` constraints |
| **Nothing to update or patch** | `docs/requirements.md` — sold explicitly as the fix for what killed the old site |
| Site stores **no member, customer or payment data** | `project-brief.md` constraints |
| Everything in **GetStrength's name** | `docs/requirements.md` |
| Private preview link **from week 1**, two-week review cycles | `docs/requirements.md` — "How we'll work together" |
| ~107 team hours over ~5 weeks, 4 developers | `project-brief.md` |
| Mobile-first at 375px, WCAG 2.2 AA basics, unique titles, one H1 | `CLAUDE.md` |

Five pages plus a blog. No shop, login, payments or booking (ADR-001, requirements).

## Options considered

### Option A — Hand-written HTML/CSS, no generator, no CMS
Fastest to stand up and the least to explain. Fails the one constraint that is not
negotiable: staff cannot publish a blog post without a developer, and every page's
header/footer is copy-pasted five times. **Rejected.**

### Option B — Eleventy + Markdown in Git + Decap CMS on Netlify
Markdown files in the repo; Eleventy builds them into static HTML; Decap CMS gives staff a
web form at `/admin` that commits to the repo; Netlify builds and hosts on push.
Zero-config-ish, JavaScript/npm-standard, no framework to learn, no server, no database,
nothing to patch. Free at this scale. Deploy previews give the week-1 preview link for free.
Cost: staff need a GitHub login (see Consequences).

### Option C — Astro + the same CMS and host
Everything Option B does, plus a component/island model and a build pipeline we would not
use on five static pages. More concepts for whoever inherits it, no gain here.
**Rejected — right answer for a bigger site, not this one.**

### Option D — Hosted site builder (Squarespace, Wix, Webflow) or WordPress.com
Best editing experience by far. Squarespace/Wix/Webflow are not free, so they fail the
running-costs promise outright. WordPress.com's free tier carries ads and reintroduces
exactly the platform ADR-001 abandoned, and nothing is handed over as code.
**Rejected.**

### Option E — Static site + hosted headless CMS free tier (Sanity, Contentful)
A nicer editor than Decap, but another vendor account, another free-tier limit to watch,
another thing that can change its pricing under a client with no budget, and content that
no longer lives in the repo we hand over. **Rejected — no gain over Option B.**

## Decision
**Option B.** Specifically:

| Layer | Choice | Why this one |
|---|---|---|
| Generator | **Eleventy (11ty) 3.x** | Markdown in, HTML out. No framework, no client-side JS by default — the fastest thing to hand to another developer. |
| Templates | **Nunjucks** + plain CSS | One layout, one blog-post layout. No CSS framework: five pages do not need one. |
| Content | **Markdown + front matter, in the Git repo** | The content and the site ship together; the handover is the repo. |
| Editing | **Decap CMS** at `/admin`, `backend: github` | Free, open source, commits straight to the repo. Prices live in one editable data file, not in page markup. |
| CMS login | **GitHub OAuth app + Netlify's OAuth authentication provider** | No auth service of our own to run or pay for. (Netlify Identity / Git Gateway is closed to new sites — do not design around it.) |
| Hosting | **Netlify free tier**, deploy on push to `main` | Free, HTTPS included, and deploy previews are the private week-1 preview link. |
| Contact form | **Netlify Forms** free tier, notifications to the gym's enquiry address | No backend, no third-party form vendor. |
| Accounts | Every account — GitHub org, Netlify, domain — created **in GetStrength's name**, listed on the logins page | Requirements: "everything is in your name". |

Netlify free-tier ceilings at signing: 100 form submissions/month, 300 build minutes/month,
100 GB bandwidth. All far above a five-page gym site. If forms outgrow it, the fallback is
a free form service, not a paid plan — recheck before launch.

## Consequences

**Makes easy**
- Blog post or price change: staff log in at `/admin`, type, publish. Build is automatic.
- Nothing to patch, ever. No plugins, no PHP, no database — the old site's failure mode is gone.
- Handover is `git clone` + `npm install` + `npx @11ty/eleventy --serve`. Any web developer can pick that up.
- Preview link exists from the first deploy, which is what the two-week cycles were sold on.
- Mobile-first and WCAG basics are down to our own HTML and CSS — no framework fighting us.

**Makes hard / accepted costs**
- **Staff need a GitHub account** to use `/admin`. One account in GetStrength's name, invited
  as a collaborator, covered with screenshots in the how-to guide. This is the main usability
  cost of keeping the CMS free and the content in the repo. If staff reject it in training,
  see "Revisit if".
- Contact-form submissions (name, email, message) sit in Netlify's dashboard as well as
  arriving by email. That is enquiry data, not member or payment data, so the "no member,
  customer or payment data" constraint holds — but it is data, so set a retention habit and
  say so in the how-to guide. TODO(confirm) with the client which address receives enquiries.
- Two vendor free tiers (GitHub, Netlify) are now part of the running-costs promise.
- A build step exists: a bad commit can fail the build. Netlify keeps the last good deploy live.
- Images are our problem — no CDN resizing. Hand-sized images, or add `@11ty/eleventy-img`
  if the photo set turns out large. Not scaffolded up front.

**Locked in**
- Content is Markdown in Git. Moving to a hosted CMS later means an export, not a switch.
- Nothing here supports member accounts or payments, by design (ADR-001).

## Revisit if
- Staff cannot or will not log in with GitHub after the training session → replace the editing
  layer only (a CMS with its own logins, quoted separately). Eleventy, the content and the
  host do not change.
- The client funds migrating the old 323 posts (Q3) → recheck build time and the CMS's
  handling of a few hundred files before committing.
- The client asks for a members' area, booking or payments → that reopens ADR-001, not this one.
- A free tier we depend on changes terms.
