---
name: Resolution → article
stage: "01 · Capture"
management: Knowledge Management (KB-)
description: Use when a problem RCA is published or a change is marked achieved but the fix stays in comments and the KB stays empty
---

# Resolution → article

> **01 · Capture** · Cycle stage of Knowledge Management (KB-)

**Use when** a problem RCA is published or a change is marked achieved but the fix stays in comments and the KB stays empty

## Overview

Resolution → article generates a knowledge article draft from a closed problem or change resolution. Core principle: the resolution is the source the draft prefills from published RCA or change goals, human publishes.

## When to Use

- Problem RCA is published
- Change is marked achieved
- Same incident is solved from scratch each time
- When NOT to use: KB already exists for this fix link, do not duplicate

## Core Pattern

### Before

```js
// Before: fix stays in comments
// “we fixed by increasing pool” lost in 200 comments
```

### After

```js
// After: draft KB
kb = draftFromRCA(publishedRCA) // {title, kbType: "runbook", sections}
// human reviews → publish
```

## Quick Reference

| Source | Draft | Action |
| --- | --- | --- |
| Published RCA | Runbook draft | human reviews |
| Achieved change | Postmortem draft | human publishes |
| No source | No draft | do not invent |

## Implementation

Prefills title, kbType and sections from published RCA or change goals. Synthetic demo data is labeled as such. Human reviews and publishes.

## Common Mistakes

- Inventing steps without source → wrong runbook. Fix: source is RCA/change only.
- Duplicate KB → noise. Fix: check similarity before drafting.

## Example

RCA “DB pool fix” → draft KB “Runbook: DB pool exhausted increase maxPool to 50” (runbook).
