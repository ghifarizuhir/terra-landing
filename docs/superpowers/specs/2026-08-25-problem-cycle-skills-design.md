# Problem Cycle Skills — Design

Date: 2026-08-25
Status: Approved (user confirmed mapping table)

## Goal

Complete Problem Management AI-skill coverage using the same 1-skill-per-stage pattern as Incident. UI (cycle strip + stage chips) is already generic.

## Cycle → Skill mapping

| # | Stage | Skill | New? |
|---|-------|-------|------|
| 01 | Detect & cluster | Pattern clustering | existing |
| 02 | Prioritize | Recurring-impact scorer | NEW |
| 03 | Investigate (RCA) | RCA draft assist | existing |
| 04 | Workaround | Known-error publisher | NEW |
| 05 | Verify fix | Fix-effectiveness check | NEW |
| 06 | Close & watch | Recurrence watchdog | NEW |

## New skills (full SKILL.md structure)

### Recurring-impact scorer (Prioritize)
Scores a problem's priority from recurrence frequency × affected users × trend direction. Frequency beats severity for problems — a small failure every day costs more than one big one. Suggests P-level, human confirms.

### Known-error publisher (Workaround)
When RCA confirms cause but the permanent fix needs a change, drafts and publishes the workaround as a known-error record so agents find it during incidents. Extractive from RCA + linked incident workarounds; never publishes unreviewed.

### Fix-effectiveness check (Verify fix)
Correlates incidents after the permanent fix shipped against the pre-fix baseline. Declares "effective / partial / no effect" with numbers; never auto-closes on assumption that shipping = fixed.

### Recurrence watchdog (Close & watch)
Watches closed problems for re-emergence of the same signature; proposes reopen with fresh cluster evidence instead of letting a dead problem absorb new incidents.

Shared principle: AI correlates and suggests, humans confirm; a problem is not done because it was closed — it is done when recurrence stops.

## Tests

- `managements.test.ts`: problem has 6 skills, ordered stages matching the 6 stage names.
- JourneyLoop strip test already generic — extend to also assert Problem renders the strip.
