# Meeting minutes

## Where to put things
- **Raw dumps** (Teams/Zoom transcripts, voice-memo text, photos of a whiteboard,
  a wall of unformatted notes) → `raw/`. Keep the original filename and date. Never tidy these.
- **Cleaned minutes** → this folder, named `YYYY-MM-DD-topic.md`
  (e.g. `2026-09-03-client-kickoff.md`). Use `_template.md`.

## Why the split
Raw notes are high-noise, high-token. Cleaned minutes are what gets read by both
humans and AI. Keeping the raw file means nothing is lost if the summary got it wrong.

## Turning raw notes into minutes
Drop the raw file in `raw/`, then ask:
> Turn `docs/meetings/raw/<file>` into minutes using `docs/meetings/_template.md`.
> Flag anything ambiguous rather than guessing, and list what should be promoted
> to requirements or an ADR.

## Rule
Minutes are append-only history. If a decision changes, write new minutes and a
superseding ADR — don't rewrite the past.
