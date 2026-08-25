---
name: Problem records pack
stage: "07 · Reporting & records"
management: Problem Management (PRB-)
description: Use when problems close as “fixed” with no documented statement, known errors hide in war-room chats, and recurrence trends are invisible to leadership
---

# Problem records pack

> **07 · Reporting & records** · Cycle stage of Problem Management (PRB-)

**Use when** problems close as “fixed” with no documented statement, known errors hide in war-room chats, and recurrence trends are invisible to leadership

## Overview

Problem records pack standardizes what every problem must produce: the problem statement, the RCA document, the known-error record, the recurrence and fix-effectiveness report. Core principle: a problem is not solved because its ticket says closed — it is solved when its records explain what happened, what worked, and what came back.

## When to Use

- Problem investigated — RCA document due for review
- Workaround exists but no known-error record pins it where agents can find it
- Quarterly problem review needs recurrence curves across all open/closed problems
- When NOT to use: single-incident PRB closed as no-fault — lean record suffices

## Core Pattern

### Before

```js
// Before: records exist if someone felt like writing them
// RCA blank, known error in a Slack thread
// “did it come back?” unknown until the next outage
```

### After

```js
// After: records standardized per problem
const pack = buildProblemRecords(prb)
// {rcaDoc, knownError?, recurrenceReport, fixVerdict?}
```

## Quick Reference

| Document | Trigger | Required sections |
| --- | --- | --- |
| Problem record | Every PRB | statement · scope · linked incidents |
| RCA document | Investigation confirmed | cause · contributors · evidence |
| Known-error record | Workaround published | cause · workaround · affected CIs |
| Recurrence & fix report | Post-fix window | before/after curves · verdict |

## Implementation

Problem creation seeds a record skeleton; RCA draft assist fills the RCA doc draft; known-error publisher and fix-effectiveness check contribute their outputs as linked records rather than scattered notes. Leadership reads recurrence/verification reports aggregated across the problem portfolio with one structure.

## Common Mistakes

- RCA written as blame narrative → unusable. Fix: evidence-backed sections.
- Workaround living in comments instead of the known-error record → repeat discovery. Fix: separate published document.
- Fix declared effective without the report → recurrence surprises. Fix: gate closure on fix verdict.

## Example

PRB “pool exhaustion” → RCA doc published + KE record linked to checkout KB + 3-week fix report: 78% reduction, verdict partial — problem stays open with evidence.
