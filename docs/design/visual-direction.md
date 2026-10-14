# Visual direction

- **Ticket:** GS-14 (parent GS-4), sprint *GS 1 — Build & preview*
- **Status:** taken from the Figma MVP and ready to show at the week-2 review. Not yet
  approved by the new owners.
- **Written:** 2026-10-07. **Rewritten 2026-10-12** to adopt the Figma colour scheme,
  typography and components in place of the earlier provisional tokens.
- **Design source:** Figma **GetStrength MVP**,
  <https://www.figma.com/design/wwJSIomAL5ysJB0GrFRVfx/GetStrength-MVP>, frames
  *GS/Colour scheme — reference layout*, `GS/Button`, `GS/Benefit card`,
  `GS/Photo placeholder`, `GS/Location`, Header and Footer
- **Pairs with:** `five-page-journey.md` (layout and content), `README.md` (brand inputs)

> ⚠️ **Gym-only.** The site carries no merch or harness branding or links. The logo and
> colours below come from the Figma file. The new owners' **right to use the GS shield logo**,
> and the original vector file, are still `TODO(confirm)` (`five-page-journey.md` §10).

---

## 1. The direction in one paragraph

**"Stronger together."** It's bold and warm: a charcoal ground, warm neutrals and one
GetStrength red, with big tight headings in Inter and photographs of people training
together (Figma colour-scheme frame: *"A bold red accent. Warm neutrals. Strong
contrast."*). The copy leans on community ("Find your community", "Train together. Grow
stronger.", "See you at the gym."), not on hardcore imagery. It should look like the gym
and the people in it, not like a supplement brand.

Three principles, in priority order when they conflict:

1. **The photograph carries the page.** Every large surface in the Figma file is a photo
   slot. Until approved photos arrive, those slots stay as marked placeholders.
2. **Red means act.** GetStrength red is for buttons and brand accents only: the Join
   buttons, the header rule, eyebrow labels and the article CTA panel. It's never a
   background for body text, except the one CTA panel.
3. **Readable on a phone in a car park.** Mobile-first at 375px, high contrast, body text
   no smaller than 16px.

What this direction is deliberately **not**: gradients, stock smiling models, icon
illustrations, carousels, or animation beyond hover and focus.

---

## 2. Colour — from Figma

The five Figma swatches, plus the two utility tokens the Figma file doesn't name. Ratios
were computed with the WCAG 2.2 formula.

| Token | Value | Figma name and use |
|---|---|---|
| `--charcoal` | `#13100E` | Charcoal. Headings, dark backgrounds (header, footer, hero) |
| `--grey` | `#625C57` | Warm grey. Secondary text |
| `--red` | `#A81C22` | GetStrength red. Buttons, brand accents |
| `--neutral` | `#F3F1EE` | Warm neutral. Section backgrounds |
| `--white` | `#FFFFFF` | White. Page backgrounds, inverse text |
| `--line` | `TODO(confirm)` | Card and input borders. Must reach 3:1 against its ground |
| `--focus` | `#1F6FEB` (proposed) | Focus ring. Deliberately not red, so a focused Join button still reads as focused |

### Contrast — what passes and what doesn't

| Pair | Ratio | Verdict |
|---|---|---|
| Charcoal on white / on neutral | 18.95 / 16.81 | ✅ any text |
| Neutral or white on charcoal | 16.81 / 18.95 | ✅ any text |
| Warm grey on white / on neutral | 6.59 / 5.84 | ✅ body text |
| White on red (button label) | 7.36 | ✅ |
| Red on white / on neutral (eyebrows, links) | 7.36 / 6.53 | ✅ |
| **Warm grey on charcoal** | **2.88** | ❌ **never as text**. Footer secondary text needs a lighter tone, `TODO(confirm)` |
| **Red on charcoal** | **2.58** | ⚠️ fine for the decorative header rule. Red *text* on charcoal fails. The Join button passes because its white label (7.36:1) identifies it |
| Focus `#1F6FEB` on charcoal / white | 4.09 / 4.63 | ✅ ≥3:1 non-text |
| A light grey border such as `#C9CDD0` on white | 1.6 | ❌ too faint if a border is the only boundary of an input. Darken it or rely on the fill |

- Light text over a photograph needs a charcoal scrim at 55% minimum over the text area.
  Check each image. Text never sits on an unscrimmed photo.
- No colour carries meaning on its own. Form errors use text as well as red.

---

## 3. Typography — Inter

The Figma review notes record "Inter typography preserved".

| Role | Treatment (from Figma) | Desktop | Mobile |
|---|---|---|---|
| Display (footer "SEE YOU AT THE GYM.", colour frame) | Inter 800–900, uppercase, tight | ~96px | ~56px |
| H1 (hero) | Inter 800, sentence case | ~64px | ~34px |
| H1 (inner pages), H2 | Inter 700–800 | 36–40px | 28–30px |
| H3 (cards) | Inter 700 | 22–24px | 22–24px |
| Eyebrow | Inter 600, uppercase, red, small | 12–13px | 12–13px |
| Body | Inter 400, warm grey on light grounds | 17–18px / 1.6 | 16–17px / 1.6 |
| Button | Inter 600, sentence case ("Join GS Gym") | 16–17px | 16–17px |

The sizes are read off the Figma frames. Take exact values from the file when building.

- **Self-host Inter** (it's under the SIL Open Font License). Don't use a Google Fonts
  request: ADR-004 serves everything from S3 + CloudFront, so a font is just another asset,
  and a third-party call would need a privacy-policy mention.
- Nothing smaller than 15px anywhere, and body text never below 16px.
- Line length caps at about 68 characters. The article template's 760px column holds this.
- No text as an image, except the logo.

---

## 4. Space, shape, motion

- **Grid:** 1440 frame with 80px side gutters and a 1280 content width. Mobile 390 with
  24px gutters. Build at 375 first (`five-page-journey.md` §3).
- **Section rhythm:** full-width bands that alternate white, neutral and charcoal.
- **Radius:** small, about 2–4px on buttons, cards and inputs. The blog category chips are
  the only pill shape.
- **Borders:** 1px on cards and inputs. Primary buttons are a solid fill with no border.
- **Shadows:** none. Separation comes from the band grounds.
- **Motion:** a 150ms ease on hover and focus colour only. No scroll animation, parallax
  or carousels. Respect `prefers-reduced-motion`.

---

## 5. Components — Figma names

### `GS/Button` — Tone × State

| Tone | Default | Focus |
|---|---|---|
| **Primary** | red fill, white label | adds the focus ring |
| **Secondary** | white or transparent fill, charcoal 1px border and label; on dark, light border and label | adds the focus ring |

- Primary is reserved for **Join GS Gym** and the few direct actions: "Enquire about
  coaching", "Ask about visiting", "Send enquiry".
- **Join GS Gym** always has the same label and always points at the Debitsuccess form,
  same tab (`five-page-journey.md` §3).
- Height ≥44px everywhere. The button is full width on mobile.
- Hover and active colour: `TODO(confirm)`. Figma defines only Default and Focus. Propose a
  darker red with white text ≥4.5:1.

### `GS/Benefit card`

White card on a neutral band: a red index number ("01"), an H3 and one line of warm-grey
body text. It's used three times in "Why GS Gym?".

### `GS/Photo placeholder`

A dashed box with a label such as "PLACEHOLDER · APPROVED PHOTOGRAPHY NEEDED". It's kept in
the preview until real photos arrive, and never swapped for stock. It has a fixed aspect
ratio per slot, so the layout never shifts.

### `GS/Location` (desktop and mobile)

An eyebrow, the H2 "Find GS Gym", the address, member-access and staffed-hours lines,
**Get directions** (secondary) and **Ask about visiting** (primary), plus a map image. The
address and hours are `TODO(confirm)`.

### Header and Footer

See `five-page-journey.md` §3. The footer is the large "SEE YOU AT THE GYM." display with
a red underline, the nav list, three info columns, then © and Privacy policy.

### Cards (post, testimonial, offer)

Post card: image, a category eyebrow (· date), an H3 title as the link text, and an
excerpt. The whole card is one link target, and its accessible name is the title, not
"read more". Testimonial and offer cards are white with a 1px border.

### Form field

A visible label above a 48px input with a 1px border and a focus ring. The error state adds
a red edge **and** a text message, tied to the input with `aria-describedby`.

---

## 6. Tokens live in one file

Per ADR-003 the site is maintained by our team and must be handed on to any web developer.

- Every value in §2–§4 is a CSS custom property declared once in a single `tokens.css`
  (proposed `styles/tokens.css`). Nothing hard-codes a hex value or a px size.
- The Figma swatch names are kept as the token names, so a designer and a developer use
  the same words.
- It's the same principle as keeping editable facts in a data file rather than in
  templates: one fact, one place.

---

## 7. What we show the new owners at week 2, and what we ask

**Show:**

1. The five pages at mobile and desktop width: Home, Blog, The Gym, About Us, Contact.
   The Gym is assembled from the Figma components until its own frame exists.
2. The Join path clicked end to end, including the broken banner on the Debitsuccess form.
3. The page structure, if it's still in question (`five-page-journey.md` §2, D-1).

**Ask, in this order** (highest-leverage first):

1. **Logo rights and the original file**, and confirmation that the red and charcoal are
   theirs to keep.
2. **Photographs**, and permission to use the people in them.
3. **Who coaches at the gym**, if anyone is to be featured, and the gym's own story.
4. **Is this the right feel?** Bold, warm and community-led. This is the cheap moment to
   find out.

**Do not show:** anything that implies the hosting cost or the guide change is settled.
Neither has been agreed by the client yet (`HANDOVER.md`). Those are Johnson's
conversations, not a design review's.

---

## 8. Known risks in this direction

| Risk | Mitigation |
|---|---|
| The logo and red belong to the old owners' brand | Confirm the rights first. Tokens live in one file, so a palette swap is one edit |
| No photography arrives in time | The preview ships with marked placeholders. If photos arrive late, the launch date moves, not the price (`requirements.md`) |
| Warm grey used as text on charcoal | Banned in §2. Footer secondary text gets a lighter tone |
| Coach content is built around the old owner | Treat it as a generic coach slot until the new owners confirm (`five-page-journey.md` §4) |
| "Unlimited feedback" turns the direction into a loop | Land the *feel* at week 2. After week 4, changes of direction move the date, not the price (`HANDOVER.md`) |
