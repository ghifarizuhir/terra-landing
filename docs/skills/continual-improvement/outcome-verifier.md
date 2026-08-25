---
name: Outcome verifier
stage: "05 · Verify outcome"
management: Continual Improvement (IMP-)
description: Use when improvements get marked done the moment the task closes, while nobody checks whether the metric they promised actually moved
---

# Outcome verifier

> **05 · Verify outcome** · Cycle stage of Continual Improvement (IMP-)

**Use when** improvements get marked done the moment the task closes, while nobody checks whether the metric they promised actually moved

## Overview

Outcome verifier compares the target metric after implementation against the pre-improvement baseline and issues a verdict: verified, partial, or no effect. Core principle: task completion is not improvement — the metric is the only judge, and it votes after, not before.

## When to Use

- Implementation marked done with a stated target (“cut MTTR”, “fewer misrouted requests”)
- Quarterly review: which shipped improvements actually paid off?
- Deciding whether to double down, adjust, or abandon an approach
- When NOT to use: improvement has no measurable target defined — send back to planning with a metric requirement

## Core Pattern

### Before

```js
// Before: done means done
imp.close() // “alert added” ✓
// MTTR unchanged; nobody noticed because nobody looked
```

### After

```js
// After: metric decides
const v = verify({
  metric: imp.target,           // e.g. MTTR for APP-004
  baseline: windowBefore(imp.doneDate, 30),
  after: windowAfter(imp.doneDate, 30),
}) // {verdict: "verified", delta: "-22%"}
return attachEvidence(v)
```

## Quick Reference

| Metric delta vs baseline | Verdict | Next |
| --- | --- | --- |
| Improved ≥20% | Verified | propose embed + close |
| Improved <20% | Partial | iterate or accept |
| Flat / worse | No effect | reopen investigation |
| No target metric | Unverifiable | return to planning |

## Implementation

Resolves each improvement’s target to a measurable series (incident metrics, request volumes, KB success rates), builds a pre/post window around completion, and reports the delta with sample sizes so noise is visible. Verdicts attach to the record permanently — feeding practice embedder on success and progress tracker on failure. Humans decide iteration vs acceptance.

## Common Mistakes

- Short windows read noise as victory. Fix: symmetric 30-day windows minimum.
- Ignoring confounders (another fix landed same week). Fix: note overlapping changes in evidence.
- Verifying only successes → survivorship bias in the board. Fix: verdict required for every done.

## Example

“DB pool alert” done → MTTR for checkout incidents: 42 min → 33 min over matched 30-day windows = −21% → verified, forwarded for embedding into runbooks.
