---
type: prep
for: Stakeholder discovery meeting
date: TBC
duration: 45–60 min
---

# Discovery meeting script — GetStrength Gym

> **Updated 2026-08-30 after auditing the live site.** The site is **not static** — it's
> WordPress + WooCommerce + a 1,758-reply forum, ~2,725 URLs. Read
> `docs/context/current-site-audit.md` before this meeting. Section 3 below was rewritten.

**Your goal:** leave the room knowing (a) whether admin access can be recovered and
(b) whether this project is about the *gym*, the *store*, or the *blog*. Everything
else is secondary. Not to agree a design.

**Their goal (probably):** find out what they're getting, when, and for how much.
Give them that in the first two minutes or they'll keep steering back to it.

---

## Before you walk in
- [ ] Have the current site open on your **phone**, not your laptop — you'll want to
      show them what it looks like on mobile.
- [ ] Have `project-brief.md` and `site-inventory.md` open to fill live.
- [ ] Know the current site's platform (view source / check the footer) so you're not
      asking a question you could have answered yourself.
- [ ] Ask permission to record. If yes, the transcript goes in `raw/` and you can stop
      writing and actually listen.

---

## 0. Opening — 2 min

> "Thanks for the time. I want to spend most of today understanding the gym and what
> the site needs to do for you, rather than talking about design. I've got a set of
> questions — some will sound very practical, like who updates the timetable — but
> those are the ones that decide how we build it. At the end I'll tell you what I need
> from you to get started."

Then shut up and let them talk about the gym for a minute. It's free context.

---

## 1. The business — 8 min
*Why: the site's job comes from the business's job. Skip this and you build a pretty brochure that converts nobody.*

1. Tell me about the gym — who trains here, and what makes people pick you over the
   place down the road?
2. Where do new members actually come from today? Walk-ins, Instagram, word of mouth,
   Google?
3. When someone lands on your site for the first time, what do you want them to do?
   *(Push for ONE answer. "Book a trial" and "read about us" are not the same site.)*
4. What do people ring up and ask that they should have been able to find online?
   *(Gold. This is your FAQ and your information architecture, straight from them.)*
5. Is there anything changing in the next 12 months the site should be ready for — new
   location, new classes, rebrand?

**Listen for:** the single conversion action, and the top 3 recurring phone questions.

---

## 2. The current site — 7 min
*Why: you need to know what's load-bearing before you touch anything.*

6. What do you dislike about the current site? And is there anything you'd keep?
7. Who built it, and can we still reach them?
8. **Who owns the domain and the hosting login?** *(Ask flat out. This derails more
   projects at launch than anything else.)*
9. Does anything currently feed off the site — Google Business, a booking link, an
   ad campaign pointing at a specific page?
10. Does anyone look at analytics? Can I get access?

**Listen for:** "keep" items, and any URL you must not break.

---

## 3. Access — 15 min ← **do this first if time is short**
*Why: nothing can ship until access is resolved, and it involves waiting on other people.
Every day this is delayed is a day added to the project.*

Open by showing them what you found. It will surprise them:

> "I had a look at the site this week. It's a WordPress site with an online store, a
> members' forum with about 1,700 posts, and 300-odd blog articles — around 2,700 pages
> in total. It's hosted with a company called WPX. The problem is that the domain login
> you have doesn't get us into any of that. So before we talk about what the new site
> looks like, I need to work out what we can actually get into."

11. Who set the site up originally, and are they contactable?
12. **Who pays the hosting bill?** Which card or account does it come off?
    *(This is the strongest ownership proof for recovering the WPX account — go looking
    for a recurring charge in the bank statements.)*
13. **Does anyone have an email address that was used to log into the website itself?**
    Try (email held by Johnson — not in the public repo) first. *(If yes: the password-reset link on
    `/wp-login.php` may hand us full admin today, for free. Try it in the room.)*
14. Who controls the Google Workspace / gym email account?
    *(The MX records live at WPX — this matters for question 16.)*
15. Is the merch store still taking real orders? Which payment gateway, and who gets
    paid? *(If money is flowing, someone has a login to something.)*
16. Explain the DNS risk plainly, and get them to acknowledge it:
    > "One thing to flag: your email runs through the same settings as the website. If
    > we move the domain without copying those settings across first, the gym's email
    > stops working. I'll handle it, but I need you to know it's a real risk, not
    > something to rush."

**Carry out of the room:** the answer to "can we get into wp-admin?" — it decides ADR-001.

---

## 3b. What is this project actually about — 10 min
*Why: the site is a blog and a store with the gym buried fourth in the navigation. "Refurbish
the website" is at least three different projects.*

17. Show them the homepage on your phone and ask: **"If someone in Onehunga is looking
    for a gym and lands here, what happens?"** *(Let the silence do the work. The nav
    reads Merch Store · Front Squat Harness · Blog · GS Gym · About Us.)*
18. Which of these actually pays the bills — gym memberships, the merch store, or online
    coaching? Rank them.
19. If we could only fix one of those in the next three months, which?
20. The forum has ~1,700 replies and the blog has 323 articles. Are they still valuable,
    or is that history you'd be happy to archive?
    *(Their answer massively changes cost. Don't lead them.)*
21. Are the Amazon and ClickBank affiliate links on the site deliberate, and do they earn
    anything? *(They may be leftovers from a previous era. If they're not earning, cutting
    them simplifies the whole site.)*
22. Memberships are currently sold as store products with coupon codes
    (`12nofee` etc., $19.90–$29.90/wk). Is that still the current pricing, and is that
    how you want people to sign up?

**Quick win to offer if the mood is right:** the homepage currently has no title — it
shows as "-" in Google — and no heading. If access is recovered, that's an hour's work
against a problem that's been costing them search traffic for years. Offering this
early buys enormous goodwill.

---

## 4. Content and brand — 8 min
*Why: content, not code, is what makes these projects late.*

18. Do you have a logo as an original file, or just the image off the old site?
19. Do you have decent photos of the gym and coaches? Recent ones?
    *(If no: raise it now. A gym site is 80% photography. Budget a shoot or the new
    site will look like the old one.)*
20. Who writes the words? *(If it's them: they won't, or it'll take six weeks. If it's
    you: say so out loud and price it.)*
21. Are there brand colours and fonts, or am I free to propose?
22. Any competitor or other gym sites you like — and what specifically about them?
23. Can we use photos of members? Do you have their consent?

---

## 5. Practicalities — 6 min

24. Is there a date this needs to be live by, and is anything driving it — a campaign,
    a new class term, a lease?
25. What's the budget range? *(Ask directly. "I'd rather scope to your number than
    surprise you.")*
26. Who signs off? If you and [other name] disagree, who wins?
27. After launch, who's looking after it, and what do you expect that to cost per month?
28. Is there anyone else I should talk to before I start?

---

## 6. Close — 3 min

Play it back — this is where you catch the misunderstanding:

> "Let me read back what I heard, tell me where I've got it wrong.
> The site's main job is [X]. The audience is mostly [Y]. Bookings stay in [system].
> Timetable is updated by [who], [how often]. Must be live by [date]. Biggest thing
> you dislike about the current site is [Z]."

Then set expectations:

> "Next I'll write this up and send you a short brief — one page, so you can check I
> understood. The thing that will hold us up is content, so the useful thing you can
> do this week is [logo file / photos / current pricing]. I'll follow up with a list."

**Book the next meeting before you leave.**

---

## Questions to have ready but not ask unless relevant
- Do you need the site in more than one language?
- Any accessibility requirement from a funder, franchise, or corporate partner?
- Are you part of a franchise with brand rules you have to follow?
- Do you run challenges/programmes with their own signup pages?
- Is there a shop — supplements, merch? *(A "small shop" quietly turns a static site
  into an e-commerce project. Flag it as separate scope on the spot.)*

## Traps
- **Don't design in the room.** If they start on colours: "Noted — I'll come back with
  options once I know what the pages need to do."
- **Don't say yes to "can it also…" .** Say: "Yes, and it's out of the current scope —
  let me price it separately." Write it in the brief's Scope (out) either way.
- **Don't accept "just make it look modern."** Ask what they think is dated about the
  current one and you'll get something actionable.
- **Don't leave without the domain/hosting answer.** Go back to Q8 if it got skipped.

---

## Straight after the meeting (do it same day)
- [ ] Recording or notes → `docs/meetings/raw/`
- [ ] Write minutes from `_template.md` → `docs/meetings/YYYY-MM-DD-stakeholder-discovery.md`
- [ ] Fill in `docs/context/project-brief.md` — kill the `TODO(confirm)`s you can now answer
- [ ] Turn answers into `FR-n` rows in `docs/context/requirements.md`
- [ ] Resolve `ADR-001` using its decision table (depends entirely on the access answer)
- [ ] If admin access was recovered: run Tools → Export and commit a backup **the same day**
- [ ] Update `WA-3` (access) in the brief: confirmed or dead
- [ ] Answer `Q-A1`–`Q-A6` in `current-site-audit.md`
- [ ] Send the client the content-and-access request list while it's fresh
