---
name: Recurring-impact scorer
stage: "02 · Prioritize"
management: Problem Management (PRB-)
description: Use when the problem backlog is ranked by gut feel, small-but-daily failures sit below one-off P1s, or engineers argue about which RCA to run first
---

# Recurring-impact scorer

> **02 · Prioritize** · Cycle stage of Problem Management (PRB-)

**Use when** the problem backlog is ranked by gut feel, small-but-daily failures sit below one-off P1s, or engineers argue about which RCA to run first

## Overview

Recurring-impact scorer ranks the problem backlog by real cost: recurrence frequency × users affected × trend direction. Core principle: for problems, frequency beats severity a 5-minute failure every day costs more than a one-hour outage once. The AI computes and ranks; humans confirm the priority.

## When to Use

- Problem backlog has >10 open PRBs with no clear order
- A daily nuisance incident outranks nothing because each occurrence looks small
- Planning meeting needs evidence for “why this RCA first”
- When NOT to use: brand-new problem with 1 occurrence no recurrence data to score yet

## Core Pattern

### Before

```js
// Before: backlog ordered by loudest voice
const queue = problems.sort((a, b) => b.shoutiness - a.shoutiness)
// daily nuisances starve while big one-offs jump the line
```

### After

```js
// After: score = frequency x impact x trend
const scored = problems.map((p) => ({
  prb: p.id,
  score: p.occurrences * p.usersAffected * trendFactor(p),
}))
return scored.sort((a, b) => b.score - a.score) // human confirms top of queue
```

## Quick Reference

| Input | Weight | Output |
| --- | --- | --- |
| Occurrences / 30d | ×3 | frequency dominates |
| Users affected | ×2 | breadth matters |
| Trend rising vs flat | ×1.5 / ×1 | rising beats stable |
| Score ≥ threshold | Suggest P-level | human confirms |

## Implementation

Counts occurrences from linked incidents over trailing 30 days, multiplies by distinct users affected and trend factor (rising/flat/falling via week-over-week delta). Output: {score, suggestedP, reason} per problem. Suggestion only priority changes still need human confirmation, and every factor is shown so the ranking is arguable.

## Common Mistakes

- Scoring on single-incident severity → backlog becomes just another P1 list. Fix: frequency is the dominant factor.
- Hiding the formula → engineers distrust the rank. Fix: show factors next to score.
- Auto-reprioritizing the board. Fix: suggest, human applies.

## Example

PRB “DB pool exhaustion”: 9 occurrences × 40 users × rising (×1.5) → score 540, suggested P2 jumps above two older one-off P1s in the ranked backlog.
