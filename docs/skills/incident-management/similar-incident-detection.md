---
name: Similar-incident detection
stage: "03 · Diagnose"
management: Incident Management (INC-)
description: Use when responders ask “has this happened before?”, duplicate incidents pile up in the queue, or restore-path knowledge lives only in senior heads
---

# Similar-incident detection

> **03 · Diagnose** · Cycle stage of Incident Management (INC-)

**Use when** responders ask “has this happened before?”, duplicate incidents pile up in the queue, or restore-path knowledge lives only in senior heads

## Overview

Similar-incident detection surfaces past incidents that resemble the current one by title, symptom and affected service. Core principle: if it happened before, the fastest path to restore is what worked last time. The AI links candidates, it never merges; humans decide whether two incidents are truly the same.

## When to Use

- New incident looks familiar (“same 504 as last week”) but nobody remembers the INC number
- Multiple reporters file separate tickets for one outage duplicates flood the queue
- Major incident needs known workarounds from previous occurrences, fast
- When NOT to use: similarity below threshold or different affected service a false link actively misleads restoration

## Core Pattern

### Before

```js
// Before: matching by human memory
function findSimilar(incident) {
  // senior: “I think this was INC-something last month?”
  return searchByMemory() // slow, misses, does not scale
}
```

### After

```js
// After: AI ranks candidates, human confirms
function findSimilar(incident) {
  const matches = embedAndRank(incident, resolvedIncidents)
  // [{id: "INC-1042", sim: 0.88, resolution: "rollback v2.3"}]
  return matches.filter((m) => m.sim >= 0.75) // human confirms link/duplicate
}
```

## Quick Reference

| Match | Action | Rule |
| --- | --- | --- |
| sim ≥0.85 + same service | Suggest as duplicate | merge only with confirm |
| sim 0.750.85 | Suggest as related | link both directions |
| sim <0.75 | No suggestion | avoid false leads |
| Duplicate confirmed | Carry over workaround + comms | restore faster |

## Implementation

Embed title + description + affected service, rank against resolved incidents from the last 180 days, boost same-service matches. Output: top-3 {incidentId, similarity, prior resolution summary}. Pattern: suggest links, never auto-merge; feed confirmed links back so recurring clusters surface to problem management.

## Common Mistakes

- Auto-merging high-similarity pairs → two distinct outages collapse into one. Fix: human confirms every merge.
- Keyword-only matching (“timeout”) → noisy false links across unrelated services. Fix: embedding + same-service boost.
- Linking without resolution context → match found but no “what fixed it”. Fix: always show prior resolution summary.

## Example

INC “Checkout timeout 504” → INC-1042 same title resolved 6 days ago (0.88) → suggests duplicate + “fixed by rollback v2.3” → responder reuses workaround in minutes instead of rediscovering it.
