---
name: Progress tracker
stage: "04 · Implement & track"
management: Continual Improvement (IMP-)
description: Use when improvement items enter the board full of energy and die there silently — proposed forever, in_progress with no commits, done meaning nothing happened
---

# Progress tracker

> **04 · Implement & track** · Cycle stage of Continual Improvement (IMP-)

**Use when** improvement items enter the board full of energy and die there silently — proposed forever, in_progress with no commits, done meaning nothing happened

## Overview

Progress tracker watches each improvement for actual motion across proposed → in_progress → done and surfaces stalled work with age-and-owner evidence before it fossilizes. Core principle: an improvement board works only if stale entries are embarrassing — visibility with gentle pressure is the whole mechanism.

## When to Use

- Items sit proposed/in_progress past their due dates with no updates
- Weekly sync spends its time asking “what happened to that one?”
- Board shows 40% done but nothing measurably changed
- When NOT to use: item is actively moving with fresh updates — no signal needed

## Core Pattern

### Before

```js
// Before: silent rot
improvements.filter(i => i.status === "proposed") // 23 items, oldest: 14 months
// nobody remembers why any of them mattered
```

### After

```js
// After: stall detection with context
watchProgress(improvements, {staleAfterDays: 21})
onStall((item) => flagWith({ageDays, owner, lastEvent})) // unblock or close honestly
```

## Quick Reference

| Signal | Flag | Proposal |
| --- | --- | --- |
| No update >21d | Stalled | unblock or descope |
| Due date passed | Overdue | re-commit or drop |
| In_progress >2× estimate | Bleeding | split or re-estimate |
| Done but unverified | Pretend-done | route to verifier |

## Implementation

Tracks state transitions and event freshness per item; when staleness thresholds trip, attaches the evidence package (age, owner, last event, original rationale link from mining) and proposes one of three honest exits: unblock, re-commit with new date, or close as won’t-do. Humans choose — the tracker only makes drift visible.

## Common Mistakes

- Nagging daily → flags muted like approval spam. Fix: one well-evidenced flag per threshold.
- Closing stalled items silently → ideas vanish without learning. Fix: closure requires a reason.
- Tracking activity instead of progress (“updated docs” ≠ moved metric). Fix: events tied to stages.

## Example

“Add DB pool alert” stuck in_progress 34 days → flagged with owner + last event → team splits alerting from dashboard work, first half ships next sprint.
