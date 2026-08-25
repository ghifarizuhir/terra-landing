---
name: Pattern clustering
stage: "01 · Detect & cluster"
management: Problem Management (PRB-)
description: Use when similar incidents repeat weekly but no problem is created and the team stays in reactive firefighting
---

# Pattern clustering

> **01 · Detect & cluster** · Cycle stage of Problem Management (PRB-)

**Use when** similar incidents repeat weekly but no problem is created and the team stays in reactive firefighting

## Overview

Pattern clustering finds groups of similar incidents that should become a problem. Core principle: recurrence is a graph signal — same app + overlapping title is the cluster, not a single incident’s severity.

## When to Use

- ≥3 incidents in 7 days share same app and title overlap ≥0.6
- Incident marked “recurring”
- Same error every week, no PRB created
- When NOT to use: single isolated incident with unique title

## Core Pattern

### Before

```js
// Before: human notices after 10 repeats
if (incidents.length > 10) maybeCreateProblem() // too late
```

### After

```js
// After: AI flags early
const cluster = findCluster(incidents, {days:7, overlap:0.6})
if (cluster.size >=3) suggestProblem(cluster)
```

## Quick Reference

| Signal | Threshold | Action |
| --- | --- | --- |
| Same app + title cosine ≥0.6 | 3 in 7 days | Suggest PRB |
| Recurring flag set | 1 | Suggest PRB |
| Single unique incident | - | No cluster |

## Implementation

Title embedding cosine + same appId. Clusters flagged in Pulse. Does not auto-create; suggests. Input: incidents 7d. Output: cluster + score + suggested PRB title.

## Common Mistakes

- Single keyword match → false cluster. Fix: require embedding + app.
- Auto-creating PRB → noise. Fix: suggest only.

## Example

3× “DB timeout 500” on APP-004 in 5 days → 0.78 → “Create PRB — DB capacity”.
