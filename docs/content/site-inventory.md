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
out"), not by this table.

| # | Title | URL | Action | Why |
|---|-------|-----|--------|-----|
| 1 | Amazon – Front Squat Harness | <https://www.amazon.com/dp/B07XDCK9FQ?tag=getstrength-20> | `keep` | The harness link. Keep the `tag=getstrength-20` affiliate tag. Per Johnson, GS-14. |
| 2 | GetStrength Merch Store | <https://getstrength.creator-spring.com/> | `keep` | The "Merch Store (Teespring)" link in `docs/requirements.md`. Creator-spring is Teespring's current store domain. |
| 3 | YouTube – GS Videos | <https://www.youtube.com/user/getstrength> | `keep` | The "GS Videos (YouTube)" link in `docs/requirements.md`. |
| 4 | YouTube – GS TV | <https://www.youtube.com/getstrength> | TODO(confirm) | A second YouTube URL, not named in `docs/requirements.md`. Confirm whether it is the same channel as #3 before using either. |
| 5 | Facebook – Photo Gallery | <https://www.facebook.com/media/set/?set=a.10150680469047397.390418.26091922396&type=1> | `drop` | Replaced by Instagram: client decision D3, `docs/meetings/2026-10-11-client-sprint-review.md`. |
| 6 | Gym Membership – DebitSuccess | <https://oc.debitsuccess.com/DirectEntry/DirectDebitRequest/Form?brandtemplateid=9adb8b79-828d-4c8b-af23-7b7d6b5cabde> | `keep` | The join link, already recorded in `docs/requirements.md`. The form's banner image is broken (`HANDOVER.md`). |
| 7 | Amazon – Knee Sleeves | <https://amzn.to/2WTBOH0> | TODO(confirm) | Not in the `docs/requirements.md` link list, so not built unless scope adds it. |
| 8 | Amazon – Harness (short URL) | <https://amzn.to/36J0Pqg> | `drop` | A search link, not the product. Use #1. Per Johnson, GS-14. |
| 9 | Waiuku Health and Fitness | <https://www.waiukuhealthfitness.co.nz/> | `drop` | A client page, out of scope (Google Doc note). Not in the `docs/requirements.md` link list. |
| new | Instagram | TODO(confirm) | `new` | Replaces #5 (D3). Handle still owed by the client: "What we need from you" in `docs/requirements.md`. |

The Google Doc's #10 (Blogus WordPress theme), #11 (Themeansar) and #12 (legacy Teespring
store) are left out: theme credits and a dead store, dropped per Johnson, GS-14.

## Assets to collect from the client
- [ ] Logo (vector — SVG/AI/EPS, not a JPEG off the old site)
- [ ] Brand colours and fonts (or a licence for them)
- [ ] Photography — gym interior, coaches, classes (and confirm we may use member photos)
- [ ] Current pricing and membership tiers
- [ ] Timetable / class schedule, and where it lives now
- [ ] Opening hours, address, phone, email
- [ ] Google Business Profile access
- [ ] Social accounts
- [ ] Existing testimonials / reviews
