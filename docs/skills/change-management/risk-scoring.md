---
name: Risk scoring
stage: "02 · Assess risk"
management: Change Management (CHG-)
description: Use when changes are created with vague descriptions, every change is marked medium, or production changes have no risk signal
---

# Risk scoring

> **02 · Assess risk** · Cycle stage of Change Management (CHG-)

**Use when** changes are created with vague descriptions, every change is marked medium, or production changes have no risk signal

## Overview

Risk scoring grades a planned change as low/medium/high/critical before approval. Core principle: description length and environment are the signals a 10-word prod change is riskier than a 100-word staging change.

## When to Use

- Change created, especially for prod or with <50 char description
- Every change is “medium” no differentiation
- Prod change with 10-word description
- When NOT to use: change already has a thorough risk assessment by author

## Core Pattern

### Before

```js
// Before: all medium
risk = "medium" // no signal
```

### After

```js
// After: scored
risk = score({descLength, env, linkedIncidents}) // short prod + linked → high
```

## Quick Reference

| Signal | Score | Hint |
| --- | --- | --- |
| Desc <50 chars | +1 risk | warn: add details |
| Env prod | +1 risk | higher scrutiny |
| Linked incidents ≥1 | +1 risk | suggest rollback plan |
| All three | high/critical | add verification steps |

## Implementation

Checks description length, env, linked incidents. Short prod change with linked incidents → high/critical. Suggests, not blocks. Output: risk + reason.

## Common Mistakes

- Blocking high risk → theater. Fix: suggest, not block.
- Scoring without env → staging treated as prod. Fix: include env.

## Example

“Update DB” 12 words, env prod, linked to 2 incidents → high, suggests adding rollback steps.
