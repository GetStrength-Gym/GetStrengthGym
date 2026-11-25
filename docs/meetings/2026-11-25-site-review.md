---
date: 2026-11-25
type: internal
attendees: [Kevin]
---

# Whole-site UI/UX review — 2026-11-25

Kevin asked on 2026-11-25 for a review of the whole site for design and viewing improvements. All
five pages were checked at 375px, with mock-ups of the three largest changes. The main finding:
phone pages are long (Home about 8,400px, About about 6,100px). Ten improvements were proposed and
Kevin said "Build all"; each lands as its own commit on PR #33.

Proposed: (1) compact prices on phones and "$30" for whole dollars; (2) coaches side by side on
Home; (3) a two-column gallery on phones; (4) the Join band's wording matching the new pricing
panel; (5) the footer's "Contact the team" label and a phone number; (6) clearer viewing wording;
(7) larger Contact tap targets; (8) linked "What we offer" cards; (9) the lone Contact Instagram
icon; (10) lighter About and "Train together" photos.

## Decisions

| ID | Decision | Source |
|---|---|---|
| D1 | On phones (below 600px) each membership plan is a compact row with the name and price on one line, and the day and weekly passes sit side by side; Home's pricing goes from about 2,000px to 1,500px. Whole-dollar prices show without cents everywhere ("$30 / visit"). | Kevin ("Build all", item 1) |
| D2 | Home shows the coaches side by side as cards under the heading "Meet your coaches" (the mock-up's "Coached by competitors" was placeholder wording and is not used). Phones crop the photos to portrait and show the first four lines of each biography; About keeps the full rows. Home's second coach button reads "More about our coaches" (was "About the gym"). Home's coach section on phones goes from about 1,380px to 620px. | Kevin ("Build all", item 2) |
| D3 | About's "Inside the gym" gallery is a two-column mosaic on phones too: the first and last photos run full width at 2:1 and the six between sit in square pairs, so the gallery goes from about 1,860px to 840px tall. Tablet and desktop are unchanged. | Kevin ("Build all", item 3) |
| D4 | D2 is reverted the same day at Kevin's request: Home shows the coaches as full rows again (photo and complete biography, every second photo on the right on wide screens), with "Enquire about coaching" and "About the gym". Supersedes D2. | Kevin |
| D5 | Wording: Home's closing Join band reads "Compare the plans above, then sign up online through our Debit Success form." (was "Check Debit Success for membership options, prices and terms."). "Staffed / viewing hours" on Home and Contact, and "Staffed / viewing" in the footer, become "Viewings", showing the same `site.json` value ("Contact us to arrange"). The footer's Get in touch adds the phone number as a tap-to-call link. "Contact the team" in the footer was a link that looked like a heading over the Instagram icon; it now matches the phone and email links, with an arrow. The review's "Follow us" suggestion is dropped: it misread that link as a label. | Kevin ("Build all", items 4, 5, 6) |
| D6 | Contact: the phone and email links in the details card are 44px-tall tap targets (were 19px). The Instagram icon under the map becomes a labelled "Instagram" pill link, so it no longer floats on its own; the footer keeps the icon. | Kevin ("Build all", items 7, 9) |

## Open questions

- None yet.

## Promoted to

- D1 → `frontend/app/globals.css` (memberships, phones), `frontend/lib/format.ts` and
  `docs/design/five-page-journey.md` §7
- D2 → `frontend/components/Coaches.tsx` (`compact`), `frontend/app/page.tsx`, `frontend/app/globals.css`
  (`.coach-card`) and `docs/design/five-page-journey.md` §7
- D3 → `frontend/app/globals.css` (`.gallery-grid`)
- D4 → reverts the D2 changes in `frontend/components/Coaches.tsx`, `frontend/app/page.tsx`,
  `frontend/app/globals.css` and `docs/design/five-page-journey.md` §7
- D5 → `frontend/app/page.tsx`, `frontend/app/contact/page.tsx`, `frontend/components/SiteFooter.tsx` and
  `frontend/lib/format.ts` (`telUrl`, shared by Contact and the footer)
- D6 → `frontend/app/contact/page.tsx` and `frontend/app/globals.css` (`.details-card dd a`, `.social-link`)
