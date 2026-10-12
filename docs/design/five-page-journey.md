# The page journey — design spec

- **Ticket:** GS-14 (parent GS-4), sprint *GS 1 — Build & preview*
- **Status:** draft for week-2 client review. **Rewritten 2026-10-12** to match the Figma
  MVP and the gym-only scope, then aligned to GS-14's five pages in the agreed order.
- **Written:** 2026-10-07, rewritten 2026-10-12
- **Design source:** Figma file **GetStrength MVP**,
  <https://www.figma.com/design/wwJSIomAL5ysJB0GrFRVfx/GetStrength-MVP>. Desktop frames are
  1440px and mobile frames 390px. The file's *GS/Review notes* frame lists the
  `TODO(confirm)`s per element. This document records what the file shows and how it
  fits the agreed scope. Where the two disagree, the file is not the spec: see §2.
- **Governed by:** `docs/requirements.md` (scope), ADR-003 / ADR-004 / ADR-005 (build),
  `docs/context/project-brief.md` (audiences, constraints), and the gym-only instruction
  from GetStrength's new owners (passed to the team, recorded here 2026-10-12)
- **Rule applied throughout:** no new gym facts. Every fact below is either cited to a doc
  or marked `TODO(confirm)`. Facts in `current-site-audit.md` §5 are *scraped, not
  confirmed*. They appear here only as candidate values to put in front of the client.

---

## 1. What this design is for

One sentence from the brief: *a visitor looking for a gym in Onehunga can reach the
membership sign-up in one click* (`project-brief.md`, "Success looks like").

The old site failed at that. Its nav was Merch Store · Front Squat Harness · Blog · GS Gym ·
About Us, so the physical gym came fourth, behind a shop. Its homepage introduced itself as
"Strength Training Blog", with no title tag and an empty H1 (`current-site-audit.md` §4).

**Gym-only (2026-10-12).** GetStrength has new owners. The old owners keep the old site
and the merch and manufacturing business. The new site is about the gym and nothing else:
**no Merch Store, no Front Squat Harness, no Record Board, no Amazon links**. This also settles the old nav-order worry, because nothing commercial is
left to sit in front of the gym.

**Two audiences, in priority order** (`project-brief.md`):

1. A prospective member in Onehunga comparing gyms. *This is the design's primary path.*
2. Existing members and the wider strength-training audience reading the blog.

---

## 2. Pages, order, URLs

Five pages, in the order agreed in `docs/requirements.md` and GS-14's acceptance, plus a
blog-post template and a privacy-policy link:

| # | Page | URL | `<title>` | The one `<h1>` |
|---|---|---|---|---|
| 1 | Home | `/` | GetStrength Gym — Strength Gym in Onehunga, Auckland | Build strength. Find your community. |
| 2 | Blog | `/blog/` | Training Articles — GetStrength Gym | Blog |
| 3 | The Gym | `/gym/` | The Gym — GS Gym in Onehunga, Auckland | The Gym |
| 4 | About Us | `/about/` | About GetStrength Gym — Our Story and Coaching | About Us |
| 5 | Contact | `/contact/` | Contact GetStrength Gym — Onehunga, Auckland | Contact |
| — | Article | `/blog/<slug>/` | `<Article title> — GetStrength Gym` | the article title |
| — | Privacy policy | `/privacy/` | Privacy Policy — GetStrength Gym | Privacy policy |

The H1s for Home, Blog, About Us and Contact are the Figma headings. The `<title>`s and the
The Gym H1 are proposed copy. The *rules* are not negotiable: a unique title and exactly one
H1 per page (binding constraint, `CLAUDE.md`). Trailing slashes are required
(`trailingSlash: true`, ADR-005).

### ⚠️ Where this differs from the Figma file

The Figma MVP has **four** pages (Home · About Us · Blog · Contact) and **no The Gym page**.
It puts the gym content on other pages instead. This spec follows GS-14 and
`requirements.md`: The Gym is its own page, built from components the Figma file already
has (§6):

| `requirements.md` asks The Gym page for | Figma component reused on `/gym/` |
|---|---|
| Onehunga location, map | `GS/Location` (also stays on Home as a short "Find GS Gym" block) |
| 24/7 access | the member-access and staffed-hours lines from `GS/Location` and the footer |
| Membership options | the "Gym membership" card from About Us "What we offer", expanded into tiers |
| — | the "Inside the gym" photo grid, moved from About Us |

To do in Figma: add a The Gym frame (desktop 1440 and mobile 390) and reorder the
header and footer nav to Home · Blog · The Gym · About Us · Contact.

⚠️ **Flag for Johnson, not decided here.** At the 2026-10-11 client sprint review
(minutes on `main`, D1), the client approved a four-page structure (Home, About Us, Blog,
Contact). That conflicts with GS-14 and with `requirements.md`. This spec follows the ticket.
Which one wins is Johnson's call with the client.

The privacy policy is new against `requirements.md`. A site with an enquiry form needs one
under the NZ Privacy Act 2020 (MVP Scope Google Doc §3). Its wording is `TODO(confirm)`:
who writes it, and who signs it off.

---

## 3. Global shell

### Header (all pages)

```
Desktop 1440                                                     Mobile 390
+--------------------------------------------------------------+  +----------------------+
| [GS logo]  Home  Blog  The Gym  About Us  Contact [Join GS Gym]|  | [logo]  [Join GS Gym]|
+==============================================================+  | Home  Blog  The Gym  |
  red 2px rule under the header                                   | About Us  Contact    |
                                                                  +----------------------+
```

- **Charcoal** (`#13100E`) ground with a GetStrength-red rule underneath. The logo sits left
  and the nav centre, with **Join GS Gym** right.
- **Nav order is Home · Blog · The Gym · About Us · Contact** (GS-14, `requirements.md`).
- **Mobile has no hamburger in Figma.** It shows the nav as a row under the logo and the Join
  button. Figma has four links, and five won't fit on one row at 375px, so the row
  **wraps to two lines** as drawn above. Each link must stay ≥44px tall. If that crowds the
  header, a menu toggle is the fallback. Check both at 375px.
- **Join GS Gym** links to the Debitsuccess membership form, recorded and verified live
  2026-10-05:
  <https://oc.debitsuccess.com/DirectEntry/DirectDebitRequest/Form?brandtemplateid=9adb8b79-828d-4c8b-af23-7b7d6b5cabde>
  The Figma review notes say it **opens in the same tab**, so mobile users don't lose
  their place (MVP Scope doc §5).
- ⚠️ `TODO(confirm)` **that this form still belongs to the gym under the new owners**.
  The form's banner image is also broken ("Banner Image
  Missing"). That's a fix on their Debitsuccess template, not ours, and every Join button
  lands there.
- **No outbound links in the header.** Merch Store and Front Squat Harness are gone (gym-only).
- Members' login link: `TODO(confirm)`. Its URL is still unknown, or it may not exist
  (`HANDOVER.md` blocker 2). The Figma file has no slot for it. Add one only if a URL
  arrives, and never ship a dead link.

### Footer (all pages) — "See you at the gym"

```
+--------------------------------------------------------------+
| [GS logo]                                     [Join GS Gym]  |
|                                                              |
| SEE YOU                                   |  Home            |
| AT THE GYM.                               |  Blog            |
| ===                                       |  The Gym         |
|                                           |  About Us        |
|                                           |  Contact         |
|--------------------------------------------------------------|
| Visit GS Gym        | Access & viewing         | Get in touch |
| 385 B Neilson St    | Member access: [confirm] | Training,    |
| Onehunga, Auckland  | Staffed/viewing: [confirm]| memberships |
|                     |                          | & enquiries  |
|                     |                          | Contact the team ->
|--------------------------------------------------------------|
| (c) GetStrength                              Privacy policy  |
+--------------------------------------------------------------+
```

- The address comes from `HANDOVER.md`. Figma has it as "385 B Neilson Street". The review
  notes keep it `TODO(confirm)`: "verify before launch". **The Waiuku address is the old
  owners' factory and is excluded** (Figma review notes).
- **Member access** and **staffed / viewing** hours are deliberately separate lines. Both are
  `TODO(confirm)`. 24/7 access is the requirements wording but isn't confirmed under the
  new owners.
- The Privacy policy label **has no link yet** (Figma review notes). It must link before
  launch.
- No phone number appears in the footer. Contact shows a phone slot, `TODO(confirm)`. The
  old site published none (`current-site-audit.md` §5).

### Breakpoints and layout

The binding constraint is **mobile-first at 375px**. The Figma mobile frames are **390px**
(an iPhone 12–15 width). Build and test at 375px first. A 390px design that has 16px
gutters on each side has to survive losing 15px. Long headings ("Personal training &
coaching") and the wrapped five-link mobile nav are the places to check.

| Breakpoint | Layout |
|---|---|
| 375px (base) | single column, 24px side gutters as in Figma mobile (16px minimum) |
| >=600px | two-column cards |
| >=960px | content max 1280px (Figma: 80px gutters at 1440), three-column cards |

### Accessibility floor (WCAG 2.2 AA basics — binding)

- One H1 per page, headings in order, no skipped levels.
- Text contrast >=4.5:1, large text and UI borders >=3:1. Ratios for the Figma palette are
  in `visual-direction.md` §2. **Warm grey is not usable as text on charcoal (2.88:1).**
- Every interactive target >=24x24px. The Join button and nav items are >=44px.
- A visible focus ring on every focusable element, never removed. Figma has Focus states on
  `GS/Button`.
- Images carry real alt text, and decorative photography gets `alt=""`.
- Form labels are visible and persistent. Figma does this: labels sit above the fields, and
  the placeholders are hints, not labels.
- A skip-to-content link is the first focusable element.
- The blog search field needs a real `<label>`, which can be visually hidden. Its
  placeholder alone is not enough.

---

## 4. Home — `/`

The one job: *this is a gym in Onehunga, and here is how you join.*

```
390px
+----------------------------------+
| HERO (charcoal, photo placeholder)|
|  Build strength.                 |  <- H1
|  Find your community.            |
|  Train for powerlifting,         |
|  weightlifting, strongman or the |
|  enjoyment of getting stronger...|
|  ### Join GS Gym ###             |  primary, above the fold
|  [ Explore the gym ]             |  secondary -> /gym/
+----------------------------------+
| STRENGTH FOR EVERY LEVEL          |
| Why GS Gym?                       |
| 01 Experienced coaching           |  GS/Benefit card x3
| 02 Specialist equipment           |
| 03 Supportive community           |
| [ Explore About Us ]              |
+----------------------------------+
| MEET YOUR COACH                   |  ⚠️ see below
| [photo] John Strachan             |
| Head Strength Coach & Gym Manager |
| credentials line                  |
| ### Enquire about coaching ###    |
| [ Meet John ]                     |
+----------------------------------+
| [gym interior photo]              |
| Train together. Grow stronger.    |
| Read our story ->                 |
+----------------------------------+
| Start strong. Keep learning.      |  3 post cards
| View all posts ->                 |
+----------------------------------+
| What our members say              |  3 testimonial cards, placeholders
+----------------------------------+
| COME TRAIN WITH US                |  GS/Location, short form
| Find GS Gym                       |
| 385 B Neilson Street, Onehunga    |
| Member access / staffed hours     |
| [ Get directions ]                |
| ### Ask about visiting ###        |
| [ map placeholder ]               |
+----------------------------------+
| Ready to get strong?  (dark band) |
| ### Join GS Gym ###               |
| Memberships are handled securely  |
| through Debit Success             |
+----------------------------------+
```

**Non-negotiable:** the H1 and the Join button are both above the fold at 375px.

**Removed for gym-only:** the earlier draft's "Front Squat Harness in use" band and its
"Explore the Record Board" button. They're already gone from the Figma file. The
"Also from GetStrength" outbound-links block in the 2026-10-07 draft of this spec is gone
too.

### ⚠️ "Meet your coach" is built on the old owner

The Home coach band and the About Us head-coach block both feature **John Strachan**. They
carry his title, "Head Strength Coach & Gym Manager", and a credentials line: "8 national
powerlifting titles · 2 Oceania titles · Commonwealth champion". The **MVP Scope doc**
instead says "8x National Champion, 3 IPF World Championships". The two sources don't
agree, and the Figma notes already refuse to infer a world title.

As of 2026-10-12, **John is no longer the client** and belongs to the old owners. Until the new owners say
who coaches at the gym:

- treat the band as a **coach slot**, not a John slot. Name, role, portrait, bio and
  credentials are all `TODO(confirm)`;
- do not publish any credentials line until the coach in question has approved it;
- if the gym has no featured coach, the band collapses and "Why GS Gym?" leads straight
  into "Train together".

### Other content slots

| Slot | Status |
|---|---|
| Hero photo | `TODO(confirm)`: approved photography with consent. Varied genders, ages, body types and abilities (Figma note) |
| Hero and "Why GS Gym?" copy | Figma draft copy. `TODO(confirm)` that coaching and equipment are currently on offer |
| Post cards | "Beginner Strength Training Manual" is an existing resource on the old site. `TODO(confirm)` that the new owners may republish it |
| Testimonials | Placeholders. 3–5 quotes with permission (MVP Scope doc §7). Hide the band until they exist, never fabricate them |
| Explore the gym | Links to `/gym/` |

---

## 5. Blog — `/blog/` and `/blog/<slug>/`

```
+----------------------------------+
| Blog                      <- H1  |
| Training articles, how-tos and   |
| programs from the GetStrength    |
| coaches.                         |
| (All)(How-To)(Training)(Programs)|  category chips
| (News)(Weight Loss)  [search...] |
+----------------------------------+
| FEATURED · TRAINING              |
| [Featured article]  Read ->      |
+----------------------------------+
| 3-column post grid               |
| <- 1 2 3 ->                      |  pagination
+----------------------------------+
```

Article page: Back to blog · category · date · read time · H1 title · By [Author] · hero
image · body with embedded YouTube · a red **"Want to train with us in person?" Join GS
Gym** panel · Related posts.

- **Static-site consequences (ADR-005, no server runtime):** category filters must be
  **pre-built pages** (`/blog/category/how-to/` and so on) or client-side filtering of a
  build-time list. **Search** has to be client-side over a build-time index. There is no
  search server. Both are buildable, but they are build work that the agreed "newest
  first" list doesn't include. Confirm with Johnson whether this fits the $560 build line.
- **The blog launches empty or near-empty** (`requirements.md`: the quote assumes starting
  fresh. it is also open whether the new owners own the old articles). The design has to
  survive empty and one-article states: hide the chips and pagination below about 10
  posts, and show a short "articles are on the way" line plus Join, never a bare grid.
- **Categories** (How-To, Training, Programs, News, Weight Loss) come from the old site via
  the MVP Scope doc. `TODO(confirm)` with the new owners.
- **YouTube embeds:** whose channel is it? An embed loads a third-party script and
  sets cookies, which the privacy policy has to mention. Prefer a click-to-load thumbnail.
- **Author** and **read time**: `TODO(confirm)` whether they're wanted. Author needs a real
  name for every post.
- Posts are Markdown files in the repo, published by our maintenance team on request
  (ADR-003). There is no CMS and no `/admin`.

---

## 6. The Gym — `/gym/`

The page the primary audience wants. Its content follows `requirements.md`: *Onehunga
location, 24/7 access, membership options, map.* **The Figma file has no frame for it yet**
(§2). It is assembled from existing Figma components, in the same visual language.

```
+----------------------------------+
| The Gym                   <- H1  |
| [ PHOTO - gym interior ]         |  GS/Photo placeholder
+----------------------------------+
| COME TRAIN WITH US               |  GS/Location, full form
| 385 B Neilson Street, Onehunga   |
| Member access: [confirm]         |
| Staffed / viewing: [confirm]     |
| [ Get directions ]               |
| ### Ask about visiting ###       |
| [ map image -> Google Maps ]     |
+----------------------------------+
| MEMBERSHIP                       |
| +------------------------------+ |  one card per tier, from the data file
| | [tier]       $TODO / week    | |
| | ### Join GS Gym ###          | |
| +------------------------------+ |
| ... repeated per tier ...        |
| Memberships are handled securely |
| through Debit Success            |
+----------------------------------+
| Inside the gym  [4 photos]       |  moved here from About Us
+----------------------------------+
| Ready to get strong? (dark band) |
| ### Join GS Gym ###              |
+----------------------------------+
```

- **Address and hours** are as in `GS/Location`. All `TODO(confirm)`, with member access
  kept separate from staffed / viewing hours. "24/7" isn't printed until it is confirmed.
- **Membership tiers and prices: `TODO(confirm)`.** None are supplied. `current-site-audit.md`
  §5 has scraped, unconfirmed figures. Don't publish them; ask the client whether they're
  still right. The old site's coupon codes are not reproduced.
- **Every price renders from one data file**, never typed into a template (ADR-003). Home's
  short form, if it shows a "from" price, reads the same file, so the two can never
  disagree.
- At the 2026-10-11 client sprint review (minutes on `main`, D4), the client asked for prices
  to be shown on the site as a graphic before the join step. This section is the natural
  place for it. The graphic's design is a separate sprint-2 action in those minutes, not part
  of GS-14.
- **Inside the gym:** 4–6 approved photos, with permission for anyone in them. Use marked
  placeholders until then.

---

## 7. About Us — `/about/`

```
+----------------------------------+
| About Us                  <- H1  |
| Serious strength training.       |
| A welcoming community.           |
+----------------------------------+
| Our story                        |
| [draft copy]        [gym photo]  |
+----------------------------------+
| HEAD STRENGTH COACH & GYM MANAGER|  ⚠️ coach slot, see §4
| [portrait] [name] / bio          |
| [ Get in touch ]                 |
+----------------------------------+
| Team (optional) — hidden until   |
| more coaches are confirmed       |
+----------------------------------+
| What we offer                    |
| Gym membership -> Debit Success  |
| Personal training & coaching     |
| Competition prep                 |
+----------------------------------+
| Train with us  (dark CTA band)   |
+----------------------------------+
```

- **"Our story" needs rewriting for the new owners.** The Figma draft says "GetStrength
  began in West Auckland in 1997 as a training and educational concept. A need for
  specialist equipment grew into…". That is **the old owners' history**, and the specialist
  equipment is now their manufacturing business. `TODO(confirm)` the
  gym's own story with the new owners. Any reference to the old business is their call.
- **What we offer:** the three services are `TODO(confirm)` as currently available.
  Coaching charges are not shown or guessed (Figma note).
- **Team (optional):** kept in the file but hidden until more coaches are confirmed, with no
  fabricated profiles (Figma note).
- **Inside the gym** (Figma puts the photo grid here) moves to The Gym (§6). About Us keeps
  the story, the coach and what we offer.
- **Photo permission is a gate, not a nicety.** No member or coach photo ships without it
  (`requirements.md`, "Before it can go live").

---

## 8. Contact — `/contact/`

```
+----------------------------------+
| Contact                   <- H1  |
| Questions about training,        |
| coaching or the gym? Get in      |
| touch.                           |
+----------------------------------+
| Send us a message                |
| Name            [required]       |
| Email           [required]       |
| Phone (optional)                 |
| Enquiry type  Gym membership /   |
|               Coaching / Other   |
| Message         [required]       |
| ### Send enquiry ###             |
| Read our privacy policy...       |
+----------------------------------+
| Get in touch                     |
| PHONE   [confirmed gym phone]    |
| EMAIL   [confirmed enquiry email]|
| ADDRESS 385 B Neilson St [confirm]|
| HOURS   member / staffed [confirm]|
| [ map placeholder ]              |
| [YouTube] [Facebook]             |
+----------------------------------+
| Ready to join? (dark CTA band)   |
+----------------------------------+
```

### ⚠️ The submit mechanism is still an open question, not a design decision

Figma marks the form as "a design prototype only" and leaves recipient, privacy policy, spam
protection and backend delivery as `TODO(confirm)`. GS-13 owns that question. ADR-005 is a
static export with no server runtime, so the form cannot post to itself. This spec defines
the **form UI and its states only**:

- the fields, order and required set above (Figma review note: name, email and message
  required, phone optional);
- the enquiry types are `TODO(confirm)` with the owners;
- inline validation messages tied to each field via `aria-describedby`;
- idle, submitting and submitted states, plus a visible error state that shows the
  enquiries email as a fallback, so a failed submit never silently loses an enquiry;
- the success and error states render on this page, with no redirect.

**Phone is optional and personal data.** The site stores no member or customer data
(binding). The form relays the message and keeps nothing, and the privacy policy says so.

**Social links:** YouTube and Facebook are the only social links left. Whether they're the
gym's or the old owners' accounts is `TODO(confirm)`. Drop them rather than send
members to the old owners' channels. Instagram is mentioned in the MVP Scope doc but has
no known URL.

---

## 9. Images, given the stack

ADR-005: `next/image` has no optimizer at runtime, so it needs `unoptimized: true` or a
custom loader.

- Every photograph is **pre-sized and pre-compressed at build time** at the widths the
  layouts use (390 / 780 / 1280 / 2560).
- Hero photography ships as WebP with a JPEG fallback, targeting under 200KB at 1280px.
- `width` and `height` are always set, so nothing shifts while loading.
- The hero image is the only eager-loaded image on a page. Everything below the fold is
  lazy-loaded.
- Use a **static map image** that links out to Google Maps, not an embedded interactive
  map. It is faster, needs no third-party script and holds no visitor data.
- Until real photos arrive, the preview uses the Figma file's **marked placeholder
  blocks**, never stock photos of someone else's gym.

---

## 10. What this design needs before it can be finished

In the order that unblocks design. Items marked *new* come from the 2026-10-12 ownership
change:

1. *new* **Who the client is**: the new owners' names, the decision-maker and who signs.
2. *new* **The featured coach, or none**, plus the gym's own "Our story" copy.
3. **Photography**: gym interior, coaches and members training, plus permission to use
   the people in them.
4. *new* **Logo rights.** Figma uses the GS shield logo, and the review notes call it
   "supplied". `TODO(confirm)` that the new owners have the right to use it and the
   original vector file. The old owners kept the merch business, and the logo is on that
   merch.
5. **Membership form**: confirm the Debitsuccess form is the gym's under the new owners
  .
6. **Enquiries email and gym phone number.**
7. **Member access and staffed / viewing hours.**
8. **Testimonials**: 3–5, with permission.
9. **Members' login URL, or confirmation there is none.**

## 11. Open questions this design raises

| | Question | Who decides |
|---|---|---|
| D-1 | This spec has five pages (GS-14, `requirements.md`). The Figma file and the client's 2026-10-11 approval have four. Which stands? See §2 | Johnson, with the client |
| D-2 | Contact form mechanism. It blocks nothing in design but blocks the build | GS-13 |
| D-3 | Blog category filters and search: in the $1,500, or cut to a newest-first list? | Johnson |
| D-4 | Is the old blog content theirs to republish? Does the blog launch empty? | New owners |
| D-5 | YouTube and Facebook: the gym's accounts or the old owners'? | New owners |
| D-6 | Featured coach on Home and About Us: who, if anyone? | New owners |
| D-7 | Privacy policy: who writes it, and who signs it off? | Johnson / new owners |

**Nav order:** this spec uses the agreed order, Home · Blog · The Gym · About Us · Contact.
With merch and the harness gone, nothing commercial sits in front of the gym.

## 12. Promotion

Per `CLAUDE.md`, this document is design work, not spec. Two things here change
client-facing scope and need the new owners' agreement before `docs/requirements.md` (and
its Google Doc copy) changes:

- dropping the Merch Store and Front Squat Harness links, which `requirements.md` still
  lists.

The page structure needs no promotion: this spec keeps the five agreed pages. The Figma
file needs a The Gym frame and the nav reordered to match (§2).

No ADR is needed. The stack decisions this depends on are recorded in ADR-003/004/005.
