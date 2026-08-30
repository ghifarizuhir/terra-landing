---
name: Impact-effort ranker
stage: "03 · Prioritize"
management: Continual Improvement (IMP-)
description: Use when the improvement backlog is ordered by whoever shouted last, tiny pet ideas outrank systemic fixes, and nobody can say why the top item is on top
---

# Impact-effort ranker

> **03 · Prioritize** · Cycle stage of Continual Improvement (IMP-)

**Use when** the improvement backlog is ordered by whoever shouted last, tiny pet ideas outrank systemic fixes, and nobody can say why the top item is on top

## Overview

Impact-effort ranker orders the improvement backlog by expected impact × confidence ÷ effort, where impact comes from evidence attached to each idea how often the pain recurred, how many people or tickets it touches. Core principle: a backlog is a bet portfolio; rank it by expected return, not by recency or volume of complaining.

## When to Use

- Improvement backlog exceeds what the team can do this quarter
- Two ideas compete and the debate is opinion vs opinion
- Small easy wins crowd out systemic improvements quarter after quarter
- When NOT to use: compliance/security-mandated changes they skip the queue by policy

## Core Pattern

### Before

```js
// Before: loudest voice sorts the board
backlog.sort((a, b) => b.insistence - a.insistence)
// systemic fix starves behind 12 quick cosmetic wins
```

### After

```js
// After: expected-return ranking
const ranked = backlog.map((i) => ({
  id: i.id,
  score: (evidence(i).recurrence * usersTouched(i) * i.confidence) / effortDays(i),
})).sort((a, b) => b.score - a.score)
return reviewTop(ranked.slice(0, 5))
```

## Quick Reference

| Factor | Source | Weight |
| --- | --- | --- |
| Recurrence of pain | Linked incidents/trends | ×3 |
| People/tickets touched | Records | ×2 |
| Confidence in effect | Author + history | ×1 |
| Effort | Estimate S/M/L/XL | ÷ divisor |

## Implementation

Joins each improvement with its source evidence (mined suggestions carry incident links; trends carry cluster size), computes expected-return score with all factors shown inline, and presents the ranked top slice for human confirmation. Scores are transparent arithmetic every factor is inspectable so the order can be argued and overridden.

## Common Mistakes

- Opaque scoring → team distrusts and ignores the order. Fix: show factors next to every score.
- Impact without recurrence evidence → popularity contest returns. Fix: require linked signals.
- Ranking as auto-reordering → planners bypassed. Fix: propose order, humans commit to it.

## Example

“DB pool alert” (S, 9 recurrences, 40 users) outscores “restyle status page” (S, 0 links) → ranked #1 for the sprint with its arithmetic shown.
