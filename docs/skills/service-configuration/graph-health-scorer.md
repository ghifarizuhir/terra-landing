---
name: Graph health scorer
stage: "05 · Score health"
management: Service Configuration (Service Map) (CI-)
description: Use when leadership asks “can we trust the map?” and the honest answer is a shrug, while impact predictions get quietly ignored by engineers who got burned before
---

# Graph health scorer

> **05 · Score health** · Workflow stage of Service Configuration (Service Map) (CI-)

**Use when** leadership asks “can we trust the map?” and the honest answer is a shrug, while impact predictions get quietly ignored by engineers who got burned before

## Overview

Graph health scorer grades the configuration map’s trustworthiness: completeness of nodes, share of confirmed vs inferred edges, orphan count, description coverage — one score with the reasons behind it. Core principle: impact answers inherit the graph’s health; a B-grade map gives B-grade blast radii, and everyone should know which grade they are reading.

## When to Use

- Periodic CMDB/data-quality review
- Teams bypass the map because “it’s always wrong” — quantify what is wrong
- Before trusting impact analysis for a high-stakes change
- When NOT to use: freshly seeded graph still in bulk import — scores mislead during bootstrap

## Core Pattern

### Before

```js
// Before: trust is vibes
“the map is fine” // nobody checked
// engineer ignores predicted blast radius, gets surprised anyway
```

### After

```js
// After: grade with reasons
const h = scoreHealth(graph)
// {grade: "C+", orphans: 14, unconfirmedEdges: "38%", thinDescriptions: 22}
return fixList(h)
```

## Quick Reference

| Dimension | Signal | Fix route |
| --- | --- | --- |
| Orphan nodes | no app, no edges | capture/link stages |
| Unconfirmed edges | still suggested-only | review queue |
| Thin descriptions | <20 chars purpose | enrichment pass |
| Stale untouched | no events 12mo | retire sweeper |

## Implementation

Computes per-dimension metrics across all CIs and edges (completeness, confirmation ratio, connectivity, freshness), combines into a weighted grade, and emits a prioritized fix list routed back to earlier workflow stages. Scores are tracked over time so improvement investments show up as rising grades, not anecdotes.

## Common Mistakes

- One vanity number with no breakdown → nobody knows what to fix. Fix: grade plus dimension detail.
- Punishing legitimately isolated CIs as orphans. Fix: confirmed-isolation flag respected.
- Scoring once a year → trust erodes between reviews. Fix: scheduled cadence, trend visible.

## Example

Score: C+ — 38% edges unconfirmed, 14 orphans → fix list queues 9 edge confirmations and routes ghosts; two quarters later the map reads A− and engineers cite it in change packs.
