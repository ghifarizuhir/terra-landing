---
name: Auto-triage & priority
stage: "02 · Triage"
management: Incident Management (INC-)
description: Use when incidents have inconsistent priority, wrong team assignment, or triage queue grows faster than humans can read
---

# Auto-triage & priority

> **02 · Triage** · Cycle stage of Incident Management (INC-)

**Use when** incidents have inconsistent priority, wrong team assignment, or triage queue grows faster than humans can read

## Overview

Auto-triage is a reference skill for suggesting priority and assignee from incident text and history. Core principle: history is the training data past incidents with similar titles taught the model what “P1 + Payments” looks like, so the next “timeout 504” does not need a human to guess. It is a technique, not a rule: the AI suggests, the human confirms.

## When to Use

- New incident with short or vague title (“checkout error”, “slow”) priority is guessed
- Queue >10 un-triaged incidents human reader cannot keep up
- Recurring “urgent” that is actually low P-levels are inconsistent across triagers
- Wrong team assigned incident bounces 23 times before correct team
- When NOT to use: incident already has a clear runbook match with a fixed priority (use the runbook), or when confidence <0.6 ask, do not guess

## Core Pattern

### Before

```js
// Before: manual triage human reads, guesses
function triage(incident) {
  // “504 checkout” → human guesses P2, assigns Network (wrong)
  return { priority: guess(), team: guess() }
}
```

### After

```js
// After: AI suggests, human confirms
function triage(incident) {
  const suggestion = suggestFromHistory(incident, last90Days) // {priority: "P1", team: "Payments", confidence: 0.82}
  return suggestion.confidence > 0.7 ? suggestion : askClarifying(incident)
}
```

## Quick Reference

| Signal | Action | Threshold |
| --- | --- | --- |
| Title embedding ≥0.75 + same app | Suggest same priority/team | confidence ≥0.7 |
| Confidence 0.60.7 | Ask 1 clarifying question | human picks |
| Confidence <0.6 | Do not suggest | avoid false triage |
| Prod + “timeout 504” | Bias to P1 | 90% P1 in history |

## Implementation

Embedding similarity (text-embedding-3-small) against last 90 days, plus keyword match on “timeout”, “down”, “504”. Input: title + description. Output: {priority: P1P4, team, confidence, reason}. Pattern: suggest, never auto-assign. Store suggestion + human decision for audit. Keep prompt short title is the signal.

## Common Mistakes

- Auto-assigning without human confirm → wrong team woken at 2am. Fix: suggestion only.
- Keyword alone (“urgent” → P1) → over-triage. Fix: require embedding + history.
- Ignoring confidence → low-confidence treated as truth. Fix: threshold 0.7.

## Example

INC “Checkout timeout 504” → 3 similar P1s in 7 days to Payments (0.82) → suggests “P1 Payments, 0.82 because 3 similar P1s”. Human confirms in one click.
