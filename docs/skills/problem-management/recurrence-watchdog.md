---
name: Recurrence watchdog
stage: "06 · Close & watch"
management: Problem Management (PRB-)
description: Use when closed problems silently absorb nothing while their failure mode lives on under new titles, and nobody notices the same outage wearing a new name
---

# Recurrence watchdog

> **06 · Close & watch** · Cycle stage of Problem Management (PRB-)

**Use when** closed problems silently absorb nothing while their failure mode lives on under new titles, and nobody notices the same outage wearing a new name

## Overview

Recurrence watchdog keeps watching after a problem closes: if incidents with the same signature re-emerge, it proposes reopening with the fresh cluster as evidence. Core principle: a problem is done when recurrence stops — not when its status says closed. The watch costs nothing; missing the comeback costs the whole RCA again.

## When to Use

- Problem closed as “fixed” — start a watch instead of walking away
- New incident arrives that matches a closed PRB’s signature
- Quarterly hygiene: which closed problems have quietly recurred?
- When NOT to use: problem closed as “no fault found” with zero occurrences ever linked — nothing to match against

## Core Pattern

### Before

```js
// Before: closed = invisible
problem.close()
// 6 weeks later the same failure returns under a new title — fresh RCA, full price
createBrandNewProblem(incident)
```

### After

```js
// After: closed problems stay watched
watchdog.watch(problem, { signatureEmbedding, ttlDays: 90 })
onMatch((incident, prb) => proposeReopen(prb, [incident])) // evidence attached
```

## Quick Reference

| Signal | Action | Threshold |
| --- | --- | --- |
| New incident sim ≥0.85 to closed PRB | Propose reopen | cluster attached |
| sim 0.7–0.85 | Flag for review | human judges |
| Quiet through TTL | Archive watch | 90 days default |
| Reopen confirmed | Restore links + history | no cold restart |

## Implementation

Stores each closed problem’s cluster signature (embeddings of linked incident titles + service) with a 90-day watch TTL. Incoming incidents are matched against closed-problem signatures; strong matches generate a reopen proposal citing the old RCA plus the new cluster. Humans confirm reopens — the AI only proves the case.

## Common Mistakes

- Watching forever → watch list becomes noise. Fix: TTL archive.
- Auto-reopening on any weak match → churn and distrust. Fix: reopen needs ≥0.85 or human review.
- Reopening empty-handed → engineers relitigate from scratch. Fix: always attach new cluster + old RCA.

## Example

Closed PRB “DB pool exhaustion”: 5 weeks later 3× “checkout latency spike” score 0.88 to its signature → proposal: “Reopen PRB-1042 — same signature, here is why”, old RCA preloaded.
