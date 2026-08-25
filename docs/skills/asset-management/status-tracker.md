---
name: Status tracker
stage: "04 · Track & maintain"
management: Asset Management (AST-)
description: Use when warranties lapse unnoticed, “locations” show a laptop in three cities at once, and renewal dates live in someone’s calendar reminders
---

# Status tracker

> **04 · Track & maintain** · Workflow stage of Asset Management (AST-)

**Use when** warranties lapse unnoticed, “locations” show a laptop in three cities at once, and renewal dates live in someone’s calendar reminders

## Overview

Status tracker watches each asset’s lifecycle clock — warranty expiry, license renewals, location/status changes — and proposes record updates before things lapse silently or contradict themselves. Core principle: inventory truth decays daily; tracking is not a project, it is a pulse.

## When to Use

- Warranty or license expiry within 30–60 days with no action yet
- Asset status/location changed (assignment, office move) but record still old
- Quarterly review needs the list of assets about to need attention
- When NOT to use: asset already retired — retirement planner owns it now

## Core Pattern

### Before

```js
// Before: decay discovered at renewal failure
if (warrantyExpired) hopeForTheBest() // vendor refuses service
// “location: Jakarta” while the device scans in Singapore
```

### After

```js
// After: clocks watched continuously
watchClocks(asset) // {warrantyEndsIn: 21d, renewalDue: 14d}
onApproaching((a) => proposeUpdate(a)) // human confirms changes
```

## Quick Reference

| Signal | Lead time | Proposal |
| --- | --- | --- |
| Warranty ending | 30d before | renew / accept risk |
| License renewal due | 45d before | recount seats first |
| Status contradiction | immediately | ask owner once |
| No events 12 months | review flag | still in use? |

## Implementation

Maintains per-asset timelines from assignment events, scan data and document dates; detects approaching deadlines (warranty, renewals) and contradictions (status says assigned, scans say idle for months). Proposals arrive as one digest per owner rather than drip-feed pings; humans apply updates.

## Common Mistakes

- Alerting on expiry day → decisions already impossible. Fix: lead-time windows.
- Auto-updating status from single signals → wrong writes to record. Fix: propose with evidence.
- Digesting everything weekly → noise fatigue. Fix: only assets needing a decision this week.

## Example

12 Adobe licenses renew in 6 weeks → tracker proposes recount first (usage shows 9 active) → renewal adjusted, $ saved, record updated with decision.
