# Current site inventory

Crawl or click through the existing site and list every page before deciding what the
new one looks like. Action: `keep` / `rewrite` / `merge` / `drop` / `new`.

| URL | Page | Purpose | Traffic | Action | New URL |
|-----|------|---------|---------|--------|---------|
| TODO | Home | | | | |

## Outbound links

Every external link the old site carried, moved here from the team's MVP-scope Google Doc
(GS-14). Numbering is the Google Doc's, kept so the two can be cross-referenced; gaps are
deliberate. Johnson checked every link and found them live on 2026-10-14 (GS-14 comment).
Which links the new site carries is set by `docs/requirements.md` ("Plus clearly-marked links
out"), not by this table. Current migration decisions below reflect the 2026-10-26
PR #7 approval (Joe/gym-only) and `../meetings/2026-10-28-design-reconciliation.md`.

| # | Title | URL | Action | Why |
|---|-------|-----|--------|-----|
| 1 | Amazon – Front Squat Harness | <https://www.amazon.com/dp/B07XDCK9FQ?tag=getstrength-20> | `drop` | Excluded from confirmed gym-only scope; historical URL only. |
| 2 | GetStrength Merch Store | <https://getstrength.creator-spring.com/> | `drop` | Old-owner product business; excluded from confirmed gym-only scope. |
| 3 | YouTube – GS Videos | <https://www.youtube.com/user/getstrength> | TODO(confirm) | Historical candidate only. Omit until exact destination and current-gym ownership are confirmed. |
| 4 | YouTube – GS TV | <https://www.youtube.com/getstrength> | TODO(confirm) | A second YouTube URL, not named in `docs/requirements.md`. Confirm whether it is the same channel as #3 before using either. |
| 5 | Facebook – Photo Gallery | <https://www.facebook.com/media/set/?set=a.10150680469047397.390418.26091922396&type=1> | `drop` | Replaced by Instagram: client decision D3, `docs/meetings/2026-10-11-client-sprint-review.md`. |
| 6 | Gym Membership – DebitSuccess | <https://oc.debitsuccess.com/DirectEntry/DirectDebitRequest/Form?brandtemplateid=9adb8b79-828d-4c8b-af23-7b7d6b5cabde> | `keep` | The join link, already recorded in `docs/requirements.md`. The form's banner image is broken (`HANDOVER.md`). |
| 7 | Amazon – Knee Sleeves | <https://amzn.to/2WTBOH0> | `drop` | Product sales are outside the gym-only scope. |
| 8 | Amazon – Harness (short URL) | <https://amzn.to/36J0Pqg> | `drop` | Search link and product business; neither harness URL belongs on the gym-only site. |
| 9 | Waiuku Health and Fitness | <https://www.waiukuhealthfitness.co.nz/> | `drop` | A client page, out of scope (Google Doc note). Not in the `docs/requirements.md` link list. |
| new | Instagram | <https://www.instagram.com/getstrengthgym/> | `keep` | Current-gym profile recorded in Figma's 2026-10-12 notes. Replaces Facebook, reconfirmed by the user on 2026-10-28. |

The Google Doc's #10 (Blogus WordPress theme), #11 (Themeansar) and #12 (legacy Teespring
store) are left out: theme credits and a dead store, dropped per Johnson, GS-14.

## Assets to collect from the client
- [ ] Logo (vector — SVG/AI/EPS, not a JPEG off the old site)
- [ ] Brand colours and fonts (or a licence for them)
- [ ] Photography — gym interior, coaches, classes (and confirm we may use member photos)
- [ ] Current pricing and membership tiers
- [x] Address: 20/10 Olive Road, Penrose, Auckland 1061 (current Figma notes)
- [ ] Member-access hours, staffed/viewing hours, current phone and enquiry email
- [ ] Google Business Profile access
- [ ] Social accounts
- [ ] Existing testimonials / reviews
