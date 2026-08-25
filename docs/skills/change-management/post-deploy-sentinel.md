---
name: Post-deploy sentinel
stage: "05 · Deploy & verify"
management: Change Management (CHG-)
description: Use when deploys go green and everyone walks away, while the real verdict — error rates, latency, business metrics — shows up hours later unwatched
---

# Post-deploy sentinel

> **05 · Deploy & verify** · Cycle stage of Change Management (CHG-)

**Use when** deploys go green and everyone walks away, while the real verdict — error rates, latency, business metrics — shows up hours later unwatched

## Overview

Post-deploy sentinel watches the affected services during the monitoring period, comparing live metrics against a pre-deploy baseline, and proposes hold or rollback when anomalies appear. Core principle: green pipeline means deployed, not working. The AI watches and alerts; pulling the trigger stays human.

## When to Use

- High/critical change just deployed to prod with a monitoring period set
- Deploy finished outside overlap hours — no engineer is naturally watching
- Service has known wobble where humans need a diff against baseline, not raw dashboards
- When NOT to use: low-risk isolated change with trivial verification checks already defined

## Core Pattern

### Before

```js
// Before: deploy green → attention moves on
deploy(change) // ✅ pipeline passed
// latency creep found 4h later by users, not by us
```

### After

```js
// After: sentinel compares against baseline
sentinel.watch({ services: impacted, window: monitoringPeriod })
onAnomaly((m) => proposeHold(m)) // {metric, delta, baseline, confidence}
```

## Quick Reference

| Signal | Proposal | Threshold |
| --- | --- | --- |
| Error rate vs baseline | Propose rollback | sustained >2× baseline |
| Latency p95 drift | Propose hold | >50% over baseline |
| Within expected range | Report healthy | no action noise |
| Any proposal | Human executes | never auto-trigger |

## Implementation

Baseline = same weekday/hour window from before deployment, so daily seasonality does not fake anomalies. Watches only the services in the predicted blast radius. Anomalies are proposed as actions with metric evidence attached; rollback execution remains a human decision tied to the change record.

## Common Mistakes

- Alerting on absolute thresholds → normal traffic spikes page everyone. Fix: compare to seasonal baseline.
- Watching everything instead of blast radius → noise buries signal. Fix: scope to predicted impact list.
- Auto-rollback without human → AI performs a production change. Fix: propose, never execute.

## Example

DB pool fix deploys 18:40 → sentinel watches checkout-api: p95 within baseline all evening → 22:15 error rate 2.4× baseline sustained → proposes rollback with metric diff; engineer approves in 2 minutes.
