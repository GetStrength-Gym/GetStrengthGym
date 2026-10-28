---
date: 2026-10-11
type: client
attendees: [Johnson Zhang, "Joe (GetStrength)", TODO(confirm) other team members]
duration: ~50 min (from the summary's timestamps)
---

# Client sprint review — 2026-10-11

> **Source:** an AI-generated summary of the meeting recording, kept verbatim in
> `raw/2026-10-11-client-sprint-meeting-summary.md`. It is a summary, not a transcript, and it
> transcribes some names inconsistently. Anything ambiguous is marked `TODO(confirm)` below
> rather than guessed.

## Attendees
- Johnson Zhang (lead)
- Joe (GetStrength) — TODO(confirm) full name and role. Possibly the `joseph-mundey` account that
  already has edit access to the project's Drive documents; that is unconfirmed.
- Kevin Wang was given an action, so was probably present. TODO(confirm) the other team members.

## Purpose
Weekly sprint check-in. Show the current designs, collect content, and settle domain and hosting
next steps.

## Discussion

### Designs
- The team showed the homepage and the page structure (Home, About Us, Blog, Contact). The client
  responded positively.
- Plan: the fundamental pages are delivered by the end of week two (2026-10-18).

### Content
- Coach introduction: change the name from "John" to **"Rain"**. The summary also writes this person
  as "Raynan" and "Brandon (Rain)". TODO(confirm) the exact name and spelling.
- Testimonials: the client wants **video**, using existing interview footage from when the gym moved
  location.
- Social links: switch to **Instagram**. The Facebook pages are dead.
- The client wants **prices shown on the site** in a graphic, rather than "join" sending people
  straight to Debitsuccess.
- Add "membership viewing hours" and location details. TODO(confirm) whether "viewing hours" means
  opening hours.
- Blog: unlikely to get new posts, so keep it minimal. Johnson to check with the coach above whether
  he wants to keep blogging.
- Privacy policy: the old site had none. The team asked the client to send one.

### Domain and hosting
- The client finds the old site's ~$40/month expensive. This is almost certainly the WPX hosting
  bill, not the domain.
- Discussed: try to move `getstrength.com` to the new site; if that is too expensive or difficult,
  consider a new domain such as `getstrengthstream.com` (~$20/year).
- AWS: the client will send the email address to register the AWS account with.

## Decisions
- **D1** — Page structure (Home, About Us, Blog, Contact) approved, subject to content placeholders
  being corrected. (decided by: client)
- **D2** — Testimonials are videos from existing footage, not text. (decided by: client)
- **D3** — Facebook link replaced by Instagram. (decided by: client)
- **D4** — Membership prices are shown on the site as a graphic before the "join" step. (decided by:
  client)
- **D5** — The blog stays, kept minimal. Not a priority for styling. (decided by: client and team)

**Not a decision:** the domain. "Try getstrength.com first, fall back to a new domain" is a plan to
investigate. The signed document still says the site goes on getstrength.com — see the flags below.

## Actions
| # | Action | Owner | Due |
|---|--------|-------|-----|
| A1 | Push the homepage and shared-navigation PRs | Johnson | 2026-10-11 |
| A2 | Make a video walkthrough of the design for the client | Kevin | Week of 2026-10-12 |
| A3 | Send high-quality photos of the gym | Client (Joe) | TODO(confirm) |
| A4 | Confirm the coach's name for the homepage introduction | Client (Joe) | TODO(confirm) |
| A5 | Send a privacy policy for the website | Client (Joe) | Before launch |
| A6 | Send the email address for the AWS account | Client (Joe) | **ASAP — the preview is blocked on it** |
| A7 | Provide the getstrength.com registrar login | Client (Joe) | Before launch |
| A8 | Design the membership price graphic | Dev team | Sprint 2 |
| A9 | Ask the coach whether he'll keep blogging | Johnson | TODO(confirm) |
| A10 | **Tell the client not to cancel WPX or deregister anything yet** (see flags) | Johnson | **2026-10-11** |

## Open questions
- **Q1** — Who is Joe, and is he the decision-maker? (needs: client)
- **Q2** — Exact name of the coach replacing "John". (needs: client)
- **Q3** — Membership prices. Still not supplied, and the price graphic (D4) can't be built
  without them. (needs: client)
- **Q4** — Did the client agree to the ~US$1/month AWS cost, and to the $110 line now covering a
  change-request guide and developer handover? The summary doesn't say. Silence is not agreement.
  (needs: Johnson to confirm with the client)
- **Q5** — "Just ask" change-request terms. Not discussed. (needs: Johnson and client)
- **Q6** — Does the client have a privacy policy, or will they get one written? (needs: client)

## Flags — contradictions and risks this meeting raised
1. **Cancelling WPX too early could kill the gym's email.** The nameservers point at WPX and the
   email's MX records live in WPX's DNS. "Deregister current site", or cancelling the $40/month WPX
   plan, before DNS has moved to Route 53 with the email records rebuilt could take the DNS zone,
   and the email, down. **Cancel WPX only after the DNS move is confirmed. Never deregister the
   domain itself.** (Jev: 0.95 that this is a serious risk.)
2. **A new domain contradicts the signed document**, which promises the site goes on getstrength.com,
   "your normal web address". It would also split the brand (email on one domain, website on
   another) and throw away whatever search ranking the old site has. Keeping getstrength.com costs
   ~US$0.50/month in Route 53 (ADR-007). The $40/month is WPX hosting, which goes away either way.
   **Recommend keeping getstrength.com** (Jev: 1.00). A switch would be a scope change, quoted
   separately.
3. **The privacy policy is the client's to supply.** We publish it as a page. Writing legal text is
   outside the $1,500 scope (Jev: 1.00). The contact form collects names and email addresses, so
   launch should not happen without one.
4. **Testimonial videos should be embedded from YouTube**, not uploaded to S3. Self-hosted video
   would be the biggest cost on an otherwise ~US$1/month bill.
5. **The AWS account must be the client's.** The root login and its MFA belong to GetStrength,
   registered with their email. We work through IAM users, per ADR-004 and ADR-007.

## Client-supplied facts
- Coach introduction should name **"Rain"**, not "John". Spelling TODO(confirm).
- The **Facebook pages are dead**. Use **Instagram**. Handle/URL TODO(confirm).
- **Existing interview footage** exists from the gym's move. Location and format TODO(confirm).
- The old site costs about **$40/month**.

## Promoted to
- D1, D5 → no change needed; already matches `docs/requirements.md` (five pages)
  - **Correction 2026-10-14:** wrong. The summary lists **four** pages (Home, About Us, Blog,
    Contact); `requirements.md` has **five**, including **The Gym** (location, 24/7 access,
    membership options with prices). A teammate's draft scope doc also lists four. Whether The
    Gym was merged into another page or left out of the summary is **unconfirmed** — see
    project brief Q13. Until confirmed, requirements.md (five pages) stands.
- D2, D3, D4 → `docs/requirements.md` ("What the new website will have"), plus the client Google
  Doc once it can be synced
- A5 (privacy policy) → `docs/requirements.md` ("What we need from you")
- Flag 1 → `HANDOVER.md` Watch-outs, and ADR-007 already covers the DNS order
- Flag 2 → project brief, Open questions (domain)
- Q1–Q6 → project brief, Open questions
- Ticket changes (GS-15, GS-16, GS-25, GS-27) → Jira, via the admin assistant

## Raw source
`raw/2026-10-11-client-sprint-meeting-summary.md`
