# Continual Improvement Cycle Skills — Design

Date: 2026-08-25
Status: Approved via established pattern (user: "lanjut continual improvement")

## Goal

Complete Continual Improvement AI-skill coverage using the 1-skill-per-stage pattern. UI (cycle strip + chips) already generic.

## Cycle → Skill mapping

| # | Stage | Skill | New? |
|---|-------|-------|------|
| 01 | Detect signal | Trend detection | existing |
| 02 | Mine ideas | Suggestion mining | existing |
| 03 | Prioritize | Impact-effort ranker | NEW |
| 04 | Implement & track | Progress tracker | NEW |
| 05 | Verify outcome | Outcome verifier | NEW |
| 06 | Embed & close | Practice embedder | NEW |

## New skills (full SKILL.md structure)

### Impact-effort ranker (Prioritize)
Ranks the improvement backlog by expected impact × confidence ÷ effort, using evidence from the source data (how often the pain recurred, how many users touched). Prevents loud-but-tiny ideas from starving systemic ones.

### Progress tracker (Implement & track)
Watches improvement items for motion: proposed → in_progress → done. Flags stalled work with age and owner evidence, proposes unblock or descoped close instead of letting the board rot. A visible board only works if someone reads it.

### Outcome verifier (Verify outcome)
Compares the target metric after implementation against the pre-improvement baseline — did MTTR actually drop, did that ticket category shrink? Declares verified / partial / no effect; closes on evidence, not on task completion.

### Practice embedder (Embed & close)
Turns a verified improvement into the default way of working: proposes runbook/policy/checklist updates so the fix survives team changes, then closes with adoption evidence. An improvement is done when it became the standard.

Shared principle: improvements must earn their place with measured outcomes and become defaults, not one-off heroics. AI ranks, tracks, measures and proposes embedding; humans decide and adopt.

## Tests

- `managements.test.ts`: improvement has 6 skills, ordered stage names.
- `JourneyLoop.test.tsx`: strip renders for Continual Improvement too.
