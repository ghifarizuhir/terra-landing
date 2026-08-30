# Knowledge Cycle Skills Design

Date: 2026-08-25
Status: Approved via established pattern (user: "lanjut knowledge")

## Goal

Complete Knowledge Management AI-skill coverage using the 1-skill-per-stage pattern. UI (cycle strip + chips) already generic.

## Cycle → Skill mapping

| # | Stage | Skill | New? |
|---|-------|-------|------|
| 01 | Capture | Resolution → article | existing |
| 02 | Structure & review | Structure & tagging assist | NEW |
| 03 | Publish & target | Context publisher | NEW |
| 04 | Find & surface | Search relevance | existing |
| 05 | Use & feedback | Usefulness tracker | NEW |
| 06 | Maintain & retire | Freshness watchdog | NEW |

## New skills (full SKILL.md structure)

### Structure & tagging assist (Structure & review)
Turns a raw draft into a reviewable article: sections per kbType template (symptom/cause/steps), suggested tags from content, readability pass, and routes to a technical reviewer with a diff view. Structure is suggested; the author keeps meaning.

### Context publisher (Publish & target)
Decides where an article surfaces: portal, runbook slot on matching CIs, in-ticket suggestion pool based on audience and article type. Publishing is not one button; it is placement. Humans approve placement changes.

### Usefulness tracker (Use & feedback)
Correlates views with outcomes: was the incident resolved using this article? Flags high-views-low-success pieces (findable but not working) versus hidden gems. Feedback is behavioral (resolution data), not just thumbs-up counts.

### Freshness watchdog (Maintain & retire)
Watches for staleness signals linked CI changed, product version moved on, no confirmed success in N months and proposes update or retirement with evidence. A wrong article is worse than no article.

Shared principle: knowledge lives only if it is captured, placed where work happens, measurably useful, and kept honest over time. AI drafts, places, measures and flags; humans write, approve and retire.

## Tests

- `managements.test.ts`: knowledge has 6 skills, ordered stage names.
- `JourneyLoop.test.tsx`: strip renders for Knowledge too.
