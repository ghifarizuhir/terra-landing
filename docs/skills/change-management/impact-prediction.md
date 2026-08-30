---
name: Impact prediction
stage: "03 · Map blast radius"
management: Change Management (CHG-)
description: Use when a change touches a CI that has dependencies and the blast radius is discovered only after deploy
---

# Impact prediction

> **03 · Map blast radius** · Cycle stage of Change Management (CHG-)

**Use when** a change touches a CI that has dependencies and the blast radius is discovered only after deploy

## Overview

Impact prediction lists which services and apps will be affected if this change is deployed. Core principle: the Service Map is the truth traverse the dependency graph from the touched CI downstream.

## When to Use

- Change touches a CI that has outgoing dependencies
- “We didn’t know it would break X” after deploy
- When NOT to use: CI has no dependencies (isolated) no impact

## Core Pattern

### Before

```js
// Before: blind deploy
deploy(change) // discover impact after
```

### After

```js
// After: predict then deploy
const impacted = traverse(CI, dependencies) // downstream CIs + apps
review(impacted) // approve with eyes open
```

## Quick Reference

| Input | Output | Source |
| --- | --- | --- |
| CI id | Downstream CIs + apps + distance | Service Map |
| Isolated CI | Empty list | no downstream |

## Implementation

Graph traversal from CI via ci_dependencies downstream. Lists affected apps/CIs with distance. Input: CI id. Output: impact list. Used by incident and change.

## Common Mistakes

- Stale graph → wrong impact. Fix: keep CI graph live.
- Only direct deps → misses transitive. Fix: traverse full downstream.

## Example

Change on CI-042 payment-api → predicts: APP-004 Checkout, CI-017 DB, CI-089 cache.
