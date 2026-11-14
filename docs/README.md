# Documentation

Everything written down about the GetStrength Gym website, grouped by what you came to do.
New here? Read [HANDOVER.md](../HANDOVER.md) first, then the [requirements](requirements.md).

## What we're building

| Document | What it covers |
|---|---|
| [requirements.md](requirements.md) | The client-facing requirements and the quote. The single source of truth for scope. It is mirrored in a shared document, so update both. |
| [quote-GS-001.md](quote-GS-001.md) | The quote dated 23 September 2026, kept unchanged |
| [Project brief](context/project-brief.md) | Scope, constraints and the open questions still waiting on the gym |
| [Stakeholders](context/stakeholders.md) | Who is on the team and who decides for the client |
| [Glossary](context/glossary.md) | Project and gym terms |
| [Roadmap](https://github.com/GetStrength-Gym/GetStrengthGym/wiki/Roadmap) (wiki) | What's done, what's next |

## Why it's built this way

| Document | What it covers |
|---|---|
| [Decisions (ADRs)](context/decisions/README.md) | One record per significant decision, with an index and each one's status |
| [Diagrams](diagrams/) | The request path and the deploy pipeline, generated from `architecture.py` |
| [Old-site audit](context/current-site-audit.md) | The site this one replaces, and why we started fresh |

## Changing and running the site

| Document | What it covers |
|---|---|
| [Developer runbook](maintenance/content-changes.md) | Changing content, checking it, deploying, and rolling back |
| [Change-request guide](maintenance/change-request-guide.md) | For the gym: how to ask for a change |
| [Site inventory](content/site-inventory.md) | The old site's pages and what happens to each one |

## Design

| Document | What it covers |
|---|---|
| [Design overview](design/README.md) | Direction, brand tokens and the Figma files |
| [Page journey](design/five-page-journey.md) | The current three-page design. The filename is older than the scope. |
| [Visual direction](design/visual-direction.md) | Colour, type, components and contrast checks |

## History

| Document | What it covers |
|---|---|
| [Meeting minutes](meetings/README.md) | What was agreed with the client and the team. Append-only. |
| [Raw meeting notes](meetings/raw/) | The source notes behind each set of minutes |

## Keeping the docs honest

- Minutes are never rewritten. If a decision changes, write new minutes.
- An accepted ADR is never edited to change its decision. Add a dated note, or supersede it.
- Unknown gym facts are written as `TODO(confirm)`, never guessed.
- This repo is public. Internal pricing notes, client contact details and private document
  links stay out of it.
