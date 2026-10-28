---
date: 2026-10-28
type: design-reconciliation
---

# Figma migration decisions

Decisions supplied by the user in the Codex chat on 2026-10-28 (Pacific/Auckland).
This is not a client meeting or approval of unconfirmed prices, terms or assets.

## Evidence

- The user's GetStrength MVP Figma screens and GS/Review notes. The 2026-10-12 source
  update records Kevin's confirmation of **20/10 Olive Road, Penrose, Auckland 1061**,
  matching the current gym's Instagram profile.
- Johnson's [2026-10-26 approval on PR #7](https://github.com/GetStrength-Gym/GetStrengthGym/pull/7#pullrequestreview-5650667572):
  Joe is the new owner; the site is gym-only. Membership terms and day-pass content are
  in scope; extend `frontend/content/prices.json`, rather than creating a second file.
- The user asked to use their GetStrength MVP and deprioritize Blog, then answered the
  conflicting decisions as follows.

## Decisions

| ID | User confirmation |
|---|---|
| D1 | Home serves as The Gym; nav is Home · About Us · Blog · Contact. No separate Gym page. |
| D2 | Four membership cards and a day-pass block on Home, one shared bottom Join CTA, no per-plan buttons. Header/footer Join actions remain. |
| D3 | Video testimonials; labelled preview placeholders until approved footage arrives. |
| D4 | Remove Facebook; use Instagram and confirmed current-gym YouTube links. |
| D5 | Blog is low priority; retain the basic newest-first list and article routes, deferring enhanced search/filter/featured/pagination work. |

D5's minimal implementation follows the priority instruction; it does not delete Blog
or authorize old-article migration. Quote amounts, payment terms, hosting, DNS and the
contact-form mechanism were not changed by these answers.

## Still unconfirmed

Figma prices are observations, not client approval. Flexible/Coaching descriptions conflict
with minimum-payment summaries. Preserve the production confirmation gate. Day-pass details,
coach/story, contacts, hours, assets/permission, privacy, delivery and external-account
ownership remain open. Joe's exact sign-off authority still needs recording.

## Promoted to

Requirements and the matching client Google Doc's migration scope; design spec/index and
visual direction; project brief; stakeholder record; inventory; handover.
Earlier minutes and the original dated quote remain unchanged. PR #7 holds the reconciled
design. The Figma canvas was not edited; intentional deviations are documented in the spec.
