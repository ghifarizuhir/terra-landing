---
name: Asset records pack
stage: "07 · Reporting & records"
management: Asset Management (AST-)
description: Use when inventory records diverge per typist, no procurement/disposal trail exists when finance asks, and warranty calendars live in private spreadsheets
---

# Asset records pack

> **07 · Reporting & records** · Workflow stage of Asset Management (AST-)

**Use when** inventory records diverge per typist, no procurement/disposal trail exists when finance asks, and warranty calendars live in private spreadsheets

## Overview

Asset records pack standardizes what the inventory must maintain: the register standard (field set per category), the procurement and disposal logs, the renewal calendar, the reconciliation report. Core principle: assets are money, risk and data all at once; records are how finance, security and ops agree on what is real.

## When to Use

- Finance or audit requests a trustworthy asset list
- Hardware received or retired but the trail is one row someone typed
- Planning the next quarter’s spend or security posture
- When NOT to use: items below the accounting threshold handled elsewhere

## Core Pattern

### Before

```js
// Before: records per habit
// “laptop → in list?” depends on who bought it
// warranties expiring surprise at renewal failure
```

### After

```js
// After: records standardized
const pack = buildAssetRecords()
// {registerSpec, procurementLog, disposalLog, renewalCalendar, lastReconciliation}
```

## Quick Reference

| Document | Trigger | Required sections |
| --- | --- | --- |
| Register standard | At setup/per review | field set per category · enum enforcement |
| Procurement log | At receive | PO · model · serials · cost · warranty start |
| Disposal log + wipe cert | At retire | disposal method · cert · license reclaim · CI unlink |
| Renewal calendar & reconciliation | Rolling | due dates + lead times · ghosts/zombies report |

## Implementation

Receiving registrar and retirement planner emit their logs as sections; lifecycle classifier enforces the register standard at record creation; status tracker and audit reconciler feed renewal dates and reconciliation reports one rolling calendar plus one archived reconciliation per cycle.

## Common Mistakes

- Disposal logged without wipe certificate → data exposure with a tidy row. Fix: certificate required section.
- Renewals tracked per-person in calendars → missed scale. Fix: shared calendar with lead-time windows.
- Reconciliation skipped between audits → drift rebuilt fully. Fix: scheduled cycle, archived reports.

## Example

Quarter-close: register standard enforced for 120 assets · 8 procured (5 ThinkPads), 4 retired with certs, reconciliation finds 1 ghost flagged for investigation.
