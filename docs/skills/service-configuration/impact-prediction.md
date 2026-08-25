---
name: Impact prediction
stage: "04 · Predict impact"
management: Service Configuration (Service Map) (CI-)
description: Use when an incident or change touches a CI and impact is discovered after, not before
---

# Impact prediction

> **04 · Predict impact** · Workflow stage of Service Configuration (Service Map) (CI-)

**Use when** an incident or change touches a CI and impact is discovered after, not before

## Overview

Impact prediction lists all downstream apps and CIs that would be affected if this CI fails. Core principle: the graph already knows — traverse it downstream from the touched CI.

## When to Use

- Incident or change touches a CI
- “We didn’t know X would break” after deploy
- When NOT to use: CI has no downstream — no impact

## Core Pattern

### Before

```js
// Before: blind
impact = unknown // discover after failure
```

### After

```js
// After: predicted
impact = traverse(CI, dependencies) // downstream CIs + apps + distance
```

## Quick Reference

| Input | Output | Source |
| --- | --- | --- |
| CI id | Downstream CIs + apps | Service Map |
| Isolated CI | Empty list | no downstream |

## Implementation

Graph traversal from CI via ci_dependencies downstream. Output: impacted apps/CIs with distance. Used by incident and change. Input: CI id. Output: impact list.

## Common Mistakes

- Stale graph → wrong impact. Fix: keep CI graph live.
- Only direct deps → misses transitive. Fix: traverse full downstream.

## Example

Incident on CI-017 DB → predicts: checkout-service, payment-api, 2 apps.
