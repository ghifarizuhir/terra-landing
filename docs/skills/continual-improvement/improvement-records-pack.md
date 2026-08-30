---
name: Improvement records pack
stage: "07 · Reporting & records"
management: Continual Improvement (IMP-)
description: Use when improvements exist as scattered board cards with no common record, status is vibes, and quarterly reviews cannot prove the program did anything
---

# Improvement records pack

> **07 · Reporting & records** · Cycle stage of Continual Improvement (IMP-)

**Use when** improvements exist as scattered board cards with no common record, status is vibes, and quarterly reviews cannot prove the program did anything

## Overview

Improvement records pack standardizes what every improvement yields: the register entry, the business case for large items, the outcome verification report, the adoption record. Core principle: improvement is not a card on a board it is a chain of documents that survives team changes and proves what became standard.

## When to Use

- Improvement mined/drafted register entry due with evidence and target metric
- Large (L/XL) improvement needs a business case before effort is allocated
- Outcome verifier completed verification report attaches to the record
- When NOT to use: tiny voluntary fixes done in a day lean close is fine

## Core Pattern

### Before

```js
// Before: board is the record
// “Add pool alert doing” → done → card gone → nothing to show
// quarterly: “what did we improve?” …which board?
```

### After

```js
// After: records survive the board
const pack = buildImprovementRecords(imp)
// {entry · businessCase? · verificationReport · adoptionRecord}
```

## Quick Reference

| Document | Trigger | Required sections |
| --- | --- | --- |
| Register entry | At intake | source evidence · target metric · owner · effort |
| Business case | L/XL pre-prioritize | options · cost · expected return |
| Verification report | At verify stage | baseline · delta · verdict + sample |
| Adoption record | At embed stage | artifacts updated · usage signal · close date |

## Implementation

Suggestion mining and trend detection seed the entry with evidence; impact-effort ranker contributes expected-return arithmetic; outcome verifier and practice embedder attach their reports as linked sections the whole pack stays attached to the register entry permanently and feeds the quarterly program report.

## Common Mistakes

- Entry without target metric → unverifiable later. Fix: required section, verifier blocks closure.
- Business cases skipped under pressure → expensive guesses. Fix: gate L/XL at prioritize.
- Adoption omitted → verified improvements forgotten. Fix: embed record required before pack closes.

## Example

“Pool alert” → mined entry + ranked #1 (arithmetic shown) + verification: MTTR −21% (verified) + runbook adoption recorded → closed with full chain.
