---
name: Stale-node sweeper
stage: "06 · Retire & clean"
management: Service Configuration (Service Map) (CI-)
description: Use when the map accumulates ghosts of decommissioned servers and dead services, and every traversal drags outdated baggage into impact answers
---

# Stale-node sweeper

> **06 · Retire & clean** · Workflow stage of Service Configuration (Service Map) (CI-)

**Use when** the map accumulates ghosts of decommissioned servers and dead services, and every traversal drags outdated baggage into impact answers

## Overview

Stale-node sweeper proposes archiving configuration items that no longer exist operationally: no recent events, linked asset retired, nothing references them anymore. Core principle: a clean graph is not a bigger graph every dead node dilutes the signal for everything that is alive.

## When to Use

- Linked asset retired/disposed but the CI still sits on the map
- CI untouched for many months with zero incident/change references
- Traversal results feel polluted with things everyone knows are gone
- When NOT to use: seasonal or rarely-active components dormancy is not death; verify first

## Core Pattern

### Before

```js
// Before: nothing ever leaves
graph.nodes // 2019 servers, deleted projects, ex-vendor APIs
// impact lists grow; trust shrinks
```

### After

```js
// After: exits like entries planned
const candidates = findStale({noEventsMonths: 12, assetRetired, unreferenced})
proposeArchive(candidates) // evidence attached, reversible
```

## Quick Reference

| Signal | Weight | Action |
| --- | --- | --- |
| Linked asset retired | strong | propose archive |
| No events 12+ months | medium | verify with owner |
| Zero inbound references | supporting | strengthens case |
| Owner objects | - | keep, tag dormant |

## Implementation

Ranks archival candidates from lifecycle evidence retirement planner outputs, event recency, reference counts from edges and documents and packages each proposal with proof plus a one-click restore path if the node turns out alive. Archives preserve history for audits instead of hard-deleting; humans approve every exit.

## Common Mistakes

- Hard-deleting nodes → audit history gone. Fix: archive, always reversible.
- Sweeping by age alone → rare-but-critical components vanish. Fix: multi-signal requirement.
- Silent mass purges → teams stop trusting writes. Fix: visible proposals, named approver.

## Example

Sweeper finds 6 CIs whose assets retired in Q2 + 3 untouched since 2024 → archive proposals with evidence; graph sheds 9 dead nodes, impact lists get shorter and truer.
