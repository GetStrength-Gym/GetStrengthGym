---
date: 2026-11-15
type: technical
attendees: [Kevin]
---

# Events calendar review follow-up — 2026-11-15

Records the response to ZingZing001's 2026-11-15 review of PR #32 (events calendar), applied
by Kevin on 2026-11-15. Review comments are evidence; this is not a client meeting. The
client's wishes below are as the reviewer reported them; no client meeting date is recorded.

## Decisions

| ID | Decision | Source |
|---|---|---|
| D1 | The blog's replacement is the events calendar page, as the client asked. `docs/requirements.md` says so instead of "to be agreed". | Review: "The client asked for this page in place of the blog" |
| D2 | Until there is an automatic feed, the maintenance team fills `frontend/content/events.json` by hand from the Auckland Powerlifting Association calendar (<https://www.sporty.co.nz/aucklandpowerlifting/events-calendar>). This answers brief Q17. | Review |
| D3 | Feeding the calendar automatically from the APA calendar is a follow-up, not part of PR #32. Sporty's widget endpoints are private and the page challenges scripts, so neither an API nor scraping is available. If APA's calendar is backed by a Google Calendar, its public iCal link could be read at build time with a nightly rebuild; `getEvents()` is where it would plug in. | Review; the reviewer is asking APA |
| D4 | Three selection bugs fixed: the Next competition card resets the filter when it hides the chosen event; choosing a past event opens the Past events list so phones show its details; the card jumps to and focuses the details. | Review, items 1–3 (commit `f3b98d9`) |
| D5 | "Add to calendar" links to a real `/events/<id>.ics` file (text/calendar) written before each dev and build, instead of a `data:` link whose iPhone behaviour was unknown. | Review asked for an iPhone test; nobody on the team has one (commit `777bfff`) |
| D6 | PR #32 has no Jira ticket, so its title carries no GS key. | Kevin |

## Open questions

- **Q1** — Is APA's calendar backed by a Google Calendar with a public iCal link? (needs: APA,
  via the reviewer)
- **Q2** — "Add to calendar" has not been tried on an iPhone. (needs: anyone with an iPhone,
  on the preview site after merge)

## Client-supplied facts

- The client wants an events calendar page in place of the blog (via the reviewer).
- The client would like the events to come from the APA calendar automatically (via the reviewer).

## Promoted to

- D1 → `docs/requirements.md` (blog-removal note, decision 1, quote table); the client's Google
  Doc copy still needs re-uploading (`HANDOVER.md`)
- D2 → project brief Q17 (resolved), `HANDOVER.md`, `CLAUDE.md`
- D3, Q1 → open; follow-up after PR #32
- D4, D5 → code on `feature/events-calendar`
- D6 → no change
- Q2 → open; not promoted
