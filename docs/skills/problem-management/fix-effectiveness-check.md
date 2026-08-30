---
name: Fix-effectiveness check
stage: "05 · Verify fix"
management: Problem Management (PRB-)
description: Use when the permanent fix just shipped and everyone assumes the problem is over, but nobody checked whether incidents actually stopped
---

# Fix-effectiveness check

> **05 · Verify fix** · Cycle stage of Problem Management (PRB-)

**Use when** the permanent fix just shipped and everyone assumes the problem is over, but nobody checked whether incidents actually stopped

## Overview

Fix-effectiveness check compares incident recurrence after the permanent fix against the pre-fix baseline and declares a verdict: effective, partial, or no effect. Core principle: shipping is not fixing only the recurrence curve decides. The AI measures; humans decide what to do about a failing verdict.

## When to Use

- Permanent-fix change completed ≥1 week ago baseline comparison is meaningful
- Problem was closed on the assumption that deployment = resolution
- Stakeholders ask “is it actually better now?” with no data behind the answer
- When NOT to use: fix shipped days ago with near-zero traffic since sample too small, wait

## Core Pattern

### Before

```js
// Before: close because the change went green
if (change.status === "completed") problem.close() // hope as strategy
// nobody checks next month
```

### After

```js
// After: verdict from the curve
const v = compareRecurrence(problem, {
  before: last30dBefore(change.completedAt),
  after: daysSince(change.completedAt),
}) // {verdict: "partial", reduction: "62%", evidence: clusterIds}
return review(v) // human decides: keep open, adjust, close
```

## Quick Reference

| Reduction vs baseline | Verdict | Next |
| --- | --- | --- |
| ≥80% | Effective | propose close + retire KE |
| 3080% | Partial | keep open, note residual |
| <30% | No effect | reopen investigation |
| <1 week of data | Inconclusive | wait for sample |

## Implementation

Builds a 30-day pre-fix occurrence baseline from linked incidents, then counts matching occurrences since the fix change completed; same embedding signature as pattern clustering so “similar” means the same thing in both places. Output: {reduction %, verdict, evidence}. Verdicts are proposals attached to the problem closure still needs a human.

## Common Mistakes

- Judging after 2 quiet days → noise reads as success. Fix: minimum observation window.
- Ignoring partial results → residual occurrences have no owner. Fix: partial keeps the problem open.
- Comparing different signatures pre/post → false improvement. Fix: reuse clustering embeddings.

## Example

Fix shipped 3 weeks ago: baseline 9/month → now 2/month = 78% reduction → verdict “Partial keep open”; two residual timeouts share a new signature worth its own look.
