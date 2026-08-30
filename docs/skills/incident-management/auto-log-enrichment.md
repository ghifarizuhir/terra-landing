---
name: Auto-log enrichment
stage: "01 · Detect & log"
management: Incident Management (INC-)
description: Use when monitoring floods the queue with raw alert bursts, incidents arrive with empty fields, or responders retype what the payload already says
---

# Auto-log enrichment

> **01 · Detect & log** · Cycle stage of Incident Management (INC-)

**Use when** monitoring floods the queue with raw alert bursts, incidents arrive with empty fields, or responders retype what the payload already says

## Overview

Auto-log enrichment turns a burst of correlated alerts into one clean incident: duplicates merge, and service, component, start time and error signature are copied from the structured payload into the ticket. Core principle: one outage is one ticket and the alert already knows most of its own fields. The AI copies structured facts; it never invents values it cannot find.

## When to Use

- Burst of related alerts from one service within minutes (CPU + health-check + latency)
- Incident created by monitoring webhook arrives with blank description or missing affected-service
- Responders spend minutes copying host, error text and timestamps from dashboards into the ticket
- When NOT to use: alerts are genuinely distinct failures merging hides independent outages; or a clean manual report is already complete

## Core Pattern

### Before

```js
// Before: humans triage alert storms by hand
function log(alerts) {
  // 14 CPU alerts + 2 health-checks → 16 tickets? copy-paste each
  return alerts.map((a) => createTicket(a)) // queue floods
}
```

### After

```js
// After: cluster, merge, enrich
function log(alerts) {
  const clusters = clusterByServiceAndSignature(alerts, { windowMin: 5 })
  return clusters.map((c) => createTicket({
    service: c.service, component: c.component, startedAt: c.firstSeen,
    errorSignature: c.signature, mergedAlerts: c.size,
  })) // one incident per cluster, fields pre-filled from payload
}
```

## Quick Reference

| Signal | Action | Rule |
| --- | --- | --- |
| Same service + same signature ≤5 min | Merge into one incident | keep alert count |
| Different signature or service | Separate incidents | never cross-merge |
| Structured field in payload | Copy into ticket | mark as auto-filled |
| Field not in payload | Leave empty for human | do not guess |

## Implementation

Fingerprint each alert by service + error signature, time-window clustering merges bursts, structured extraction copies fields into the draft incident. Output: one incident per cluster with auto-filled fields marked as such. Maintenance windows are excluded. Human-entered fields are never overwritten.

## Common Mistakes

- Merging across services or signatures → two outages hidden as one. Fix: strict fingerprint match.
- Overwriting responder edits with payload data. Fix: auto-fill only empty fields.
- Creating tickets during maintenance windows. Fix: check change/maintenance calendar first.

## Example

14 “CPU >90%” + 2 health-check fails on checkout-api in 4 minutes → 1 INC pre-filled: Payments / checkout-api / started 09:12 / signature “cpu-saturation” / “16 alerts merged”.
