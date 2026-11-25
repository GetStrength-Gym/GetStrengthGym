---
date: 2026-11-25
type: design-review
attendees: [Kevin]
---

# Whole-site UI/UX review — 2026-11-25

A review of the whole site Kevin asked for on PR #33. Not a client meeting; nothing here changes
scope, price or gym facts, though D5 changes wording the client will read.

## Purpose
Find design and viewing improvements across the site, and build the ones Kevin approves.

## Discussion

### How it was reviewed
- All five pages (Home, About, Events, Contact, 404) at 375px, with quick checks of headings, tap
  targets, small text and image descriptions. Desktop was checked by measurement, as the browser
  pane crops wide screenshots.
- Mock-ups of the three largest changes were shown at phone width before anything was built.

### What was found
- Phone pages are long: Home about 8,400px, About about 6,100px.
- The pricing section alone was about 2,000px on phones; the gallery about 1,860px.
- Home's closing Join band still said "Check Debit Success for membership options", against the
  new pricing panel (`2026-11-25-join-under-pricing.md`).
- Contact's phone and email links were 19px tall; its Instagram icon sat alone under the map.
- About opens with a 712KB photo.

### Proposed
- (1) Compact prices on phones and "$30" for whole dollars; (2) coaches side by side on Home;
  (3) a two-column gallery on phones; (4) the Join band's wording; (5) the footer's "Contact the
  team" and a phone number; (6) clearer viewing wording; (7) larger Contact tap targets; (8) linked
  "What we offer" cards; (9) the lone Contact Instagram icon; (10) lighter About and "Train
  together" photos. Kevin said "Build all"; each landed as its own commit on PR #33.

## Decisions
- **D1** — On phones (below 600px) each membership plan is a compact row with the name and price
  on one line, and the day and weekly passes sit side by side; Home's pricing goes from about
  2,000px to 1,500px. Whole-dollar prices show without cents everywhere ("$30 / visit").
  (decided by: Kevin)
- **D2** — Home shows the coaches side by side as cards under "Meet your coaches" (the mock-up's
  "Coached by competitors" was placeholder wording and is not used). Phones crop the photos to
  portrait and show the first four lines of each biography; About keeps the full rows. Home's
  second coach button reads "More about our coaches" (was "About the gym"). On phones the section
  goes from about 1,380px to 620px. (decided by: Kevin)
- **D3** — About's "Inside the gym" gallery is a two-column mosaic on phones too: the first and
  last photos run full width at 2:1 and the six between sit in square pairs, taking the gallery
  from about 1,860px to 840px. Tablet and desktop are unchanged. (decided by: Kevin)
- **D4** — Changes D2 the same day, reverting it: Home shows the coaches as full rows again (photo
  and complete biography, every second photo on the right on wide screens), with "Enquire about
  coaching" and "About the gym". (decided by: Kevin)
- **D5** — Wording. Home's closing Join band reads "Compare the plans above, then sign up online
  through our Debit Success form." (was "Check Debit Success for membership options, prices and
  terms."). "Staffed / viewing hours" on Home and Contact, and "Staffed / viewing" in the footer,
  become "Viewings", showing the same `site.json` value ("Contact us to arrange"). The footer's Get
  in touch adds the phone number as a tap-to-call link. The footer's "Contact the team" was a link
  that looked like a heading over the Instagram icon; it now matches the phone and email links,
  with an arrow. The proposed "Follow us" label is dropped: it misread that link as a label.
  (decided by: Kevin)
- **D6** — Contact: the phone and email links are 44px-tall tap targets (were 19px). The Instagram
  icon under the map becomes a labelled "Instagram" pill link; the footer keeps the icon.
  (decided by: Kevin)
- **D7** — About's "What we offer" cards are links, each the whole card, named by its title with
  an arrow: Gym membership → Home's prices (`/#memberships`), Personal training & coaching →
  Contact, Competition prep → Events. The card descriptions are unchanged. (decided by: Kevin)
- **D8** — Item 10 (lighter About and "Train together" photos) is not done: those two photos were
  recompressed and restored on 2026-11-16, and `2026-11-16-mlp-ux-review.md` D6 keeps them at
  original size and quality. That decision stands. (decided by: Kevin)

## Actions
| # | Action | Owner | Due |
|---|--------|-------|-----|
| A1 | Tell the client about the D5 wording changes (Join band, "Viewings", footer phone number) | Kevin | next client update |
| A2 | Check the compact prices, gallery and Contact tap targets on a real phone on the preview | Team | before launch |

## Open questions
- None.

## Client-supplied facts
- None. The footer's phone number is the one already on Contact (`site.json`); no fact was added
  or changed.

## Promoted to
- D1 → `frontend/app/globals.css` (memberships, phones), `frontend/lib/format.ts` and
  `docs/design/five-page-journey.md` §7
- D2 → `frontend/components/Coaches.tsx` (`compact`), `frontend/app/page.tsx`,
  `frontend/app/globals.css` (`.coach-card`) and `docs/design/five-page-journey.md` §7
- D3 → `frontend/app/globals.css` (`.gallery-grid`)
- D4 → reverts the D2 changes in `frontend/components/Coaches.tsx`, `frontend/app/page.tsx`,
  `frontend/app/globals.css` and `docs/design/five-page-journey.md` §7
- D5 → `frontend/app/page.tsx`, `frontend/app/contact/page.tsx`, `frontend/components/SiteFooter.tsx`
  and `frontend/lib/format.ts` (`telUrl`, shared by Contact and the footer)
- D6 → `frontend/app/contact/page.tsx` and `frontend/app/globals.css` (`.details-card dd a`,
  `.social-link`)
- D7 → `frontend/app/about/page.tsx` (`OFFERS`) and `frontend/app/globals.css` (`.benefit-card.is-link`)
- D8 → no change
