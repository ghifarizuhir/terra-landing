---
name: Graph drift detector
stage: "03 · Detect drift"
management: Service Configuration (Service Map) (CI-)
description: Use when the map says a service has no dependencies yet incidents keep proving otherwise, and nobody remembers what changed since someone last drew the graph
---

# Graph drift detector

> **03 · Detect drift** · Workflow stage of Service Configuration (Service Map) (CI-)

**Use when** the map says a service has no dependencies yet incidents keep proving otherwise, and nobody remembers what changed since someone last drew the graph

## Overview

Graph drift detector compares the configuration graph against signals of operational reality new services in deploys, dependency mentions in incident notes, edges implied by traffic and proposes the missing nodes and edges. Core principle: maps do not drift loudly; they rot quietly until an impact prediction lies to you at the worst time.

## When to Use

- Incident revealed “X actually calls Y” but no edge exists
- Deploy logs mention services absent from the graph
- Impact prediction results contradict what responders saw
- When NOT to use: intentional isolation confirmed by owner document, don’t chase

## Core Pattern

### Before

```js
// Before: drift found by victims
impact(CI-042) // “no downstream”
// reality: three services scream when it dies map was stale for months
```

### After

```js
// After: reality compared continuously
const drift = diffAgainstSignals({deploys, incidentNotes, traffic})
// {missingEdges: [checkout → payment-worker], missingNodes: [...]} 
returnPropose(drift) // human confirms each write
```

## Quick Reference

| Signal | Drift type | Confidence |
| --- | --- | --- |
| “calls X” in incident note | missing edge | high cite incident |
| New deploy target | missing node | route via capture assist |
| No events + no mentions | possible ghost | low verify first |

## Implementation

Mines deployment records, incident timelines and postmortem text for dependency statements (“calls”, “depends on”, “broke when”), then diffs them against current ci_dependencies. Strong evidence becomes edge proposals citing its source; weak signals batch into a review digest. Every proposed write cites where it came from.

## Common Mistakes

- Writing inferred edges silently → graph confidently wrong. Fix: propose with citations only.
- Treating one ambiguous mention as fact → phantom dependencies. Fix: confidence thresholds.
- One-time cleanup project → drift resumes next sprint. Fix: continuous signal watching.

## Example

Postmortem says “payment-worker died when DB failed” → proposes edge payment-worker → CI-017 citing PRB-1042 → confirmed → impact predictions finally include it.
