# Page journey — four-page design

- **Ticket:** GS-14; implementation continues in GS-15 and GS-19.
- **Updated:** 2026-10-28 (Pacific/Auckland).
- **Design source:** the user's **GetStrength MVP** Figma file, current desktop (1440px)
  and mobile (390px) screens, reusable components and GS/Review notes. The earlier Low-Fi
  Wireframes file is superseded.
- **Scope:** `../requirements.md`; build decisions: ADR-003/004/005/006/007.
- **Decision record:** `../meetings/2026-10-28-design-reconciliation.md`.

The existing filename is retained for implementation references. This is a four-page
journey: Home serves as The Gym. Unconfirmed current-gym facts stay `TODO(confirm)`;
legacy getstrength.com content is historical evidence only.

## 1. Purpose and scope

Help prospective members understand the Penrose gym, compare memberships and join through
Debit Success. The blog remains available but is low priority.

Joe is the new owner, confirmed by Johnson's 2026-10-26 approval on PR #7. The site is
gym-only: no merch store, Front Squat Harness, Record Board or Amazon links. Exact sign-off
authority and account access still need recording; ownership alone does not establish them.

## 2. Pages, order and URLs

| Order | Page | URL | Proposed title | H1 |
|---|---|---|---|---|
| 1 | Home / The Gym | `/` | GetStrength Gym — Strength Gym in Penrose, Auckland | Build strength. Find your community. |
| 2 | About Us | `/about/` | About GetStrength Gym — Our Story and Coaching | About Us |
| 3 | Blog | `/blog/` | Training Articles — GetStrength Gym | Blog |
| 4 | Contact | `/contact/` | Contact GetStrength Gym — Penrose, Auckland | Contact |
| — | Article | `/blog/<slug>/` | Article title — GetStrength Gym | Article title |
| — | Privacy | `/privacy/` | Privacy Policy — GetStrength Gym | Privacy policy |

No separate `/gym/` page or additional Gym frame is required. Location and membership
options live on Home; link to `/#memberships` for the comparison. Explore the gym stays on
Home and moves to its gym-information section. Do not leave links to the unbuilt Gym route.
Article/privacy routes are outside primary navigation. Use one H1 and a unique title per
page, and retain trailing slashes (ADR-005/007).

## 3. Global shell, layout and accessibility

- Header: supplied logo, Home · About Us · Blog · Contact, Join GS Gym. Charcoal ground
  and red rule. Footer repeats that nav, the SEE YOU AT THE GYM statement, practical visit
  information and privacy link.
- Join GS Gym keeps its label and opens the recorded Debit Success form in the same tab.
  Header/footer and section CTAs use that destination. There are no per-plan buttons.
- Instagram: `https://www.instagram.com/getstrengthgym/`, recorded in Figma's current-gym
  source update. Remove Facebook. Publish YouTube links/embeds only after the exact
  current-gym destination and ownership are confirmed; an old-owner channel is not proof.
- Address: **20/10 Olive Road, Penrose, Auckland 1061**. Figma's 2026-10-12 notes record
  confirmation by Kevin and the current gym's Instagram. Use it in site data, directions,
  Contact, footer and metadata; do not reuse the Onehunga or factory address.
- Member access and staffed/viewing hours remain separate, unconfirmed fields. Do not
  publish 24/7 access without current-gym confirmation. Phone, inbox and privacy wording
  remain unconfirmed.
- Match the 1280px desktop content width and 24px mobile gutters. Check 320, 375, 390 and
  430px plus desktop. Four mobile nav links sit below logo/Join and wrap if needed; no
  menu system is required by this design. Keep H1 and hero Join visible at the target
  phone viewport, preserving the photo focal point and readable overlay.
- Required: ordered headings, visible field labels, meaningful alt text, keyboard access,
  visible focus, skip-to-content, reduced-motion support and no horizontal overflow.
  Aim for 44px nav/button targets. Check contrast; warm grey on charcoal fails.

## 4. Home — `/`

Use Home (`1:29`) and Home — Mobile (`45:307`) as visual targets, in this order:

1. Full-width photography hero, H1, supporting copy, Join GS Gym and Explore the gym.
2. Why GS Gym? — three benefit cards and Explore About Us.
3. Coach slot with approved portrait, role, biography and credentials.
4. Gym imagery and Train together. Grow stronger., linking to the gym's story.
5. Latest articles only when published content exists; low priority.
6. Video testimonials, with labelled preview placeholders until approved footage arrives.
7. Find GS Gym — address, separate access/viewing-hours lines, directions, enquiry action
   and static map placeholder.
8. Membership options and casual day pass (§6).
9. Existing bottom membership CTA immediately below the options, then the shared footer.

Reuse Figma layout and supplied logo. Keep marked preview placeholders until approved
photography arrives; do not use stock gym photos or old-owner portraits. Current coach,
story, services and credentials require approval. Hide unavailable coach/testimonial
content in production; never invent content for layout completeness.

**Confirmed difference from Figma:** video replaces text testimonial cards, per the
2026-10-11 client decision and the user's 2026-10-28 answer. Keep the section's rhythm.
Use approved YouTube footage with a click-to-load preview, rather than self-hosting video
on S3. Do not invent quotes or assume footage is cleared for publication.

## 5. Blog — `/blog/` and `/blog/<slug>/`

Keep the existing content-as-files reader and static article routes. Launch uses a simple
newest-first list with an empty state, shared shell and readable article typography.
No old-article migration is included.

Search, filters, featured treatment, pagination and related-post features shown in Figma
are deferred, not migration acceptance requirements. Preserve existing published URLs and
draft/production filtering. Deprioritizing Blog does not delete it or authorize fabricated
articles, authors or excerpts. Maintainers publish Markdown through PRs; no CMS or admin.

## 6. Memberships on Home — `/#memberships`

Four display-only cards follow Figma order: Standard, Flexible, Coaching,
Student/sub-junior. Stack on phones; use four columns at the reference desktop width.
Place the separate casual-day-pass block below. Do not add per-plan buttons, a standalone
Join button, a How joining works guide or a separate Gym page. The existing bottom CTA
says Join GS Gym and goes to Debit Success; header/footer Join actions remain.

| Plan | Observed weekly amount (NZD) | Terms needing gym approval |
|---|---|---|
| Standard | $27.99 | 12-month minimum; $45 one-off payment |
| Flexible | $35.99 | Description says no minimum; payment summary says 12 months; $45 one-off payment |
| Coaching | $54.99 | Description says no minimum; payment summary says 12 months; $45 one-off payment |
| Student/sub-junior | $18.99 | 12-month minimum; $45 one-off payment |

These are observations recorded in Figma on 2026-10-12, not approved current prices.
Label unconfirmed observations in preview. Production still requires client-confirmed
values under ADR-006; do not set `confirmedWithClient` from a Figma observation.

The day pass is absent from the observed form: price and purchase method remain
`TODO(confirm)`. Do not send a one-off visitor to a direct-debit form without confirmation.

Extend **`frontend/content/prices.json`**, not `data/membership.json`, with confirmed
billing, minimum term, one-off payment, inclusions and day-pass details. Reuse existing
plan identifiers/content reader and ADR-006 preview-data rules. Prices remain accessible
text, not an image. Current-gym ownership of the join form still needs confirmation.

## 7. About Us — `/about/`

Follow About Us (`1:58`) and mobile (`45:508`): hero, current gym story, coach profile,
confirmed services, Inside the gym gallery and Join CTA. The gallery remains here, as
Figma shows, rather than moving to another Gym page.

Keep a generic coach slot until name, role, biography, portrait consent and credentials
are approved. Optional team content stays hidden until supplied. Do not reuse John
Strachan's portrait/credentials or manufacturing history as current-gym facts. Confirm
services before publishing them.

## 8. Contact — `/contact/`

Follow Contact (`1:145`) and mobile (`45:786`): visible labels for required name, email and
message; optional phone; enquiry type if confirmed; Send enquiry; privacy notice; current
address, approved contacts and hours; map/social links; Join CTA.

Figma's form is a prototype. Recipient, privacy wording, spam protection and delivery
remain GS-13 decisions. Static export cannot process submissions itself. Define idle,
submitting, success and visible error states, with field errors tied to inputs. Do not
imply delivery works until tested, or invent an inbox, number or data-retention promise.

## 9. Assets and implementation conventions

- Reuse components, tokens and the build-time loader. Colour tokens already belong in
  `frontend/app/globals.css`; do not create a parallel token file.
- Adapt Figma into responsive project-native code, preserving supplied asset proportions.
  Store required design assets locally; do not ship temporary Figma URLs.
- Use approved, compressed photographs with alt text and explicit geometry; lazy-load
  below-the-fold images. Keep marked preview placeholders until assets arrive.
- Use a static map image linking to directions; no interactive map dependency.
- Preserve static export, trailing slashes, image validation, CloudFront routing and the
  `SITE_ENV=production` launch guard.

## 10. Remaining confirmations

Coach/story/services; photography and permission; logo rights/original asset; membership
prices, conflicting terms, inclusions and fees; day-pass price/purchase; join-form
ownership; access/viewing hours; inbox/phone; privacy and form delivery; testimonial
footage/permission; approved YouTube destination; client sign-off authority. These do not
reopen resolved page or button decisions.

## 11. Intentional differences from the visual reference

| Area | Migration decision |
|---|---|
| Testimonials | Video; preview placeholders until approved footage arrives |
| Social links | Remove Facebook; Instagram plus confirmed current-gym YouTube only |
| Blog | Basic newest-first list; defer enhanced features |

Penrose location, the four-page structure and Home membership cards follow Figma.

## 12. Promotion and acceptance

The 2026-10-28 decisions are promoted into requirements and its matching Google Docs
scope section, project brief, stakeholder record, inventory and handover. Older minutes,
old-site audit, ADR history and the original dated quote remain historical. No new ADR
is required; the stack has not changed.

Implementation acceptance: check the shell and priority pages at phone/desktop widths;
remove dead Gym links; verify Penrose directions and all Join destinations; exercise
membership display/build-mode behavior; test contact delivery when chosen; run lint,
TypeScript, static build and CloudFront tests. Blog polish is not a blocker.
