---
name: Configuration records pack
stage: "07 · Reporting & records"
management: Service Configuration (Service Map) (CI-)
description: Use when nobody can say which CI fields are authoritative, only some edges have evidence, and drift findings exist nowhere outside one engineer’s memory
---

# Configuration records pack

> **07 · Reporting & records** · Workflow stage of Service Configuration (Service Map) (CI-)

**Use when** nobody can say which CI fields are authoritative, only some edges have evidence, and drift findings exist nowhere outside one engineer’s memory

## Overview

Configuration records pack standardizes what the map must maintain: the CI schema (required field set per kind), the edge confidence policy, the graph health report, the drift findings log. Core principle: impact predictions inherit one thing from the map its documented health. Records are how trust becomes a grade instead of a vibe.

## When to Use

- New or stalky CI entry exists as a bare hostname
- Teams argue whether the map can be trusted for this change’s blast radius
- Planning map hygiene or an internal audit of the configuration estate
- When NOT to use: items properly outside CMDB scope (ephemerals) no record expected

## Core Pattern

### Before

```js
// Before: map quality = vibes
// schema per author, edges per hunch
// “grade: trust me”
```

### After

```js
// After: records standardized
const pack = buildConfigRecords()
// {ciSchema, edgePolicy, healthReport, driftLog}
```

## Quick Reference

| Document | Trigger | Required sections |
| --- | --- | --- |
| CI schema standard | At setup/per review | required fields per kind · description floor · app link |
| Edge confidence policy | At setup | auto vs suggested-only threshold · citation rule |
| Graph health report | Per review cycle | grade · orphans · unconfirmed % · stale count |
| Drift findings log | Continuous | signal · proposals with citations · dispositions |

## Implementation

CI capture assist and graph drift detector contribute their evidence packages as log entries; graph health scorer rolls them into the periodic grade. Schema and edge policy are reviewed documents, not tribal knowledge they are where the strip stages derive their meaning.

## Common Mistakes

- Schema per habit → incomparable records. Fix: documented required field set per kind.
- Health report without cited evidence → grade distrusted. Fix: dimension details with source counts.
- Drift findings kept off-record → map silently rots between cleanups. Fix: continuous log, archived.

## Example

Quarterly health report: C+ → 38% edges unconfirmed, 14 orphans → policy requires 0.7 cited edges, 9 confirmations queued via drift log grade rises to B next quarter.
