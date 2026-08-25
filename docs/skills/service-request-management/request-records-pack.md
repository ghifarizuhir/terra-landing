---
name: Request records pack
stage: "07 · Reporting & records"
management: Service Request Management (REQ-)
description: Use when catalog items live without a written spec, SLA is a guess, and monthly fulfillment statistics do not exist when the business asks for them
---

# Request records pack

> **07 · Reporting & records** · Cycle stage of Service Request Management (REQ-)

**Use when** catalog items live without a written spec, SLA is a guess, and monthly fulfillment statistics do not exist when the business asks for them

## Overview

Request records pack standardizes the documents every fulfilled request journey must leave: the catalog item spec, the SLA sheet, the monthly fulfillment report, the approval audit trail. Core principle: requests are not favors — they are measurable services; whatever is not defined and counted will be debated and ignored.

## When to Use

- New catalog item added without its spec and approval rules documented
- Monthly service review asks for volume, timing and satisfaction — nobody has numbers
- Approval for costly access is questioned and no trail exists to defend it
- When NOT to use: one-off exception request with no repeat value — note the trail only

## Core Pattern

### Before

```js
// Before: records scattered
// “catalog says depends on who wrote it”, MTTS = vibes
// audit asks who approved REQ-42 → silence
```

### After

```js
// After: standardized records per request
const pack = buildRequestRecords(req)
// {itemSpec, slaSheet, approvalTrail} → monthlyReport aggregates
```

## Quick Reference

| Document | Trigger | Required sections |
| --- | --- | --- |
| Catalog item spec | New catalog entry | what it is · who it is for · what you get · lead time |
| Approval audit trail | Any approved request | approvers · policy basis · decision dates |
| SLA sheet | Per catalog item | target time · measured median · breach rate |
| Monthly fulfillment report | End of month | volume · MTTS · satisfaction · top demands |

## Implementation

Catalog specs are templates enforced at catalog creation; approval trails auto-attach from approval router events; fulfillment records feed a monthly aggregation job that outputs the standard report structure — humans review and publish before it reaches stakeholders.

## Common Mistakes

- Catalog specs written as marketing copy → nobody can fulfill to it. Fix: required structured sections.
- Monthly report built manually → stale by publication day. Fix: auto-aggregation, human publishes.
- Approval trails kept in email → unauditable. Fix: trail attached to request record.

## Example

New “laptop for contractors” item → spec drafted + SLA derived from MTT history → 6 weeks later monthly report shows 34 fulfilled, median 4.1 days, 2 approval waivers flagged.
