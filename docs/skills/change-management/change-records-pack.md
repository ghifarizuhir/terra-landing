---
name: Change records pack
stage: "07 · Reporting & records"
management: Change Management (CHG-)
description: Use when changes ship with scattered intent, CAB decisions lack minutes, deployment checklists live in private notes, and no post-change report tells whether it held
---

# Change records pack

> **07 · Reporting & records** · Cycle stage of Change Management (CHG-)

**Use when** changes ship with scattered intent, CAB decisions lack minutes, deployment checklists live in private notes, and no post-change report tells whether it held

## Overview

Change records pack standardizes the documents every change leaves: the change plan/RFC, the CAB agenda and minutes, the deployment checklist, the post-implementation review. Core principle: a change without its records is an undocumented edit to production — unreviewable, unauditable, unlearnable.

## When to Use

- Any prod change entering approval — CAB packet due before the meeting
- Change deployed — PIR-change due after the monitoring period
- Audit or incident review asks “who approved CHG-118 and why?”
- When NOT to use: pre-approved Standard change with a fixed low-risk package — single record suffices

## Core Pattern

### Before

```js
// Before: records exist in someone’s notes
document(findIt()) // deployment checklist in a DM
// 6 weeks later audit: “was this approved?” …who knows
```

### After

```js
// After: records standardized per change
const pack = buildChangeRecords(chg)
// {plan, cabPacket{agenda,minutes}, checklist, pir}
```

## Quick Reference

| Document | Trigger | Required sections |
| --- | --- | --- |
| Change plan / RFC | Change creation | intent · risk · impact · rollback · verify steps |
| CAB packet | Before approval | agenda · risk score · conflicts · minutes + decision |
| Deployment checklist | At implement | steps · owner · sequence · rollback triggers |
| Post-implementation review | After monitoring | held/drift · related incidents · docs to update |

## Implementation

Change-request drafter seeds the plan, CAB evidence pack contributes risk/blast-radius/conflict pages, post-deploy sentinel contributes monitoring evidence; each document is a section of one linked packet rather than four orphan records. Standard changes use a condensed single-record variant.

## Common Mistakes

- CAB minutes omitted → re-litigation forever. Fix: decision + reasons captured.
- Deployment checklist kept privately → execution varies per shift. Fix: checklist is the record section.
- No PIR-change because monitoring passed → drift invisible. Fix: due after the monitoring window, evidence attached.

## Example

High-risk DB change → plan + CAB packet with conflicts + checklist with owner sequence + PIR showing held 30 days → single auditable packet closure.
