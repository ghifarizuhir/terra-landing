# Incident Cycle Skills — Design

Date: 2026-08-25
Status: Approved (user confirmed 6-stage cycle, 1 skill/stage, cycle strip + chip)

## Goal

Complete Incident Management AI-skill coverage so all 6 stages of one incident cycle are covered — no more adding skills one by one without a map.

## Cycle → Skill mapping

| # | Stage | Skill | New? |
|---|-------|-------|------|
| 01 | Detect & log | Auto-log enrichment | NEW |
| 02 | Triage | Auto-triage & priority | existing |
| 03 | Diagnose | Similar-incident detection | existing |
| 04 | Communicate | War-room summarization | existing |
| 05 | Resolve & restore | Resolution suggester | NEW |
| 06 | Close & learn | Closure & handover pack | NEW |

## Data changes (`src/data/managements.ts`)

- `SkillDetail` gains optional `stage?: string`.
- Incident `skills[]` reordered to cycle order; each skill gets its stage label.
- 3 new skills written in full SKILL.md structure. Shared principle: AI suggests, human confirms; restore-first mindset during outage; extractive summaries only.

### Auto-log enrichment (Detect & log)
Merges correlated alert bursts into one incident and pre-fills fields from the monitoring payload (service, component, start time, error signature). Never invents — copies structured facts only. Mistakes to avoid: merging across services, overwriting human-entered fields, paging on maintenance windows.

### Resolution suggester (Resolve & restore)
Ranks candidate workarounds/resolutions from similar resolved incidents + matched runbooks, with past success rate and source. Restore first, root-cause later. Mistakes: hiding blast radius, treating workaround as fix, stale runbooks.

### Closure & handover pack (Close & learn)
Assembles closure record from timeline (summary, impact, actions, follow-ups), flags recurrence to Problem, drafts Knowledge stub for review. Learning is part of closing. Mistakes: inventing root cause at close, skipping follow-up capture, publishing internal comms.

## UI changes (`src/components/JourneyLoop.tsx`)

- Cycle strip above the skills grid when active management's skills have `stage`: Andon rail of numbered nodes (stage name + covering skill name below), connected line, wraps 2-col on mobile. "N/N stages" badge next to section title.
- Stage chip on each skill card header: `STAGE 02 · TRIAGE`.
- Managements without staged skills render exactly as before (graceful).

## Tests

- `managements.test.ts`: incident has 6 skills, ordered stage 01→06, every skill has `stage`.
- `JourneyLoop.test.tsx`: cycle strip renders for Incident detail; absent for a non-staged management.
