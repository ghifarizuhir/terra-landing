---
name: Known-error publisher
stage: "04 · Workaround"
management: Problem Management (PRB-)
description: Use when the cause is understood but the permanent fix is weeks away, and every new incident re-derives the same workaround from scratch
---

# Known-error publisher

> **04 · Workaround** · Cycle stage of Problem Management (PRB-)

**Use when** the cause is understood but the permanent fix is weeks away, and every new incident re-derives the same workaround from scratch

## Overview

Known-error publisher turns a diagnosed problem into a findable known-error record: confirmed cause + the best workaround observed across linked incidents, published to knowledge so agents hit it during triage. Core principle: until the fix ships, the workaround is the product make it impossible not to find.

## When to Use

- RCA is confirmed but the permanent fix waits on a change window
- Linked incidents show 2+ different workarounds for the same cause pick and standardize one
- Agents keep asking “how did we fix this last time?” in war-rooms
- When NOT to use: RCA still unconfirmed publishing an unproven cause poisons future diagnosis

## Core Pattern

### Before

```js
// Before: workaround lives in one engineer’s head
if (incident.matches(problem)) {
  return askSeniorHowToMitigate() // slow, inconsistent, leaves with them
}
```

### After

```js
// After: published known-error surfaces at triage
const ke = publishKnownError({
  cause: problem.rca.rootCause,
  workaround: bestObserved(problem.linkedIncidents),
})
// next similar incident links to ke automatically
```

## Quick Reference

| Input | Output | Rule |
| --- | --- | --- |
| Confirmed RCA | Cause section | verbatim from RCA |
| Linked incident resolutions | One standardized workaround | most-used wins |
| No confirmed RCA yet | Do not publish | wait for confirmation |
| Fix finally ships | Retire known-error | link to change |

## Implementation

Extracts cause text from the published RCA and ranks workarounds across linked incidents by success rate and usage count; drafts the known-error record and stages it for human review before publishing. When the permanent-fix change completes, proposes retiring the record so stale workarounds do not linger.

## Common Mistakes

- Publishing before RCA is confirmed → wrong cause becomes canonical. Fix: gate on published RCA.
- Listing three workarounds “so teams can choose” → inconsistency returns. Fix: one standard workaround.
- Forgetting to retire after the fix → agents apply obsolete mitigations. Fix: tie retirement to change completion.

## Example

PRB “DB pool exhaustion” RCA confirmed → publishes KE: cause “pool never recycled on 504” + workaround “recycle pool via admin job” (used 4/5 times) → next checkout timeout links to it at triage.
