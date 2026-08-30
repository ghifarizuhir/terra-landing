---
name: CAB evidence pack
stage: "04 · Approve & schedule"
management: Change Management (CHG-)
description: Use when approvers decide from a title and a gut feeling, meetings re-litigate the same questions, or two changes collide on the same service unnoticed
---

# CAB evidence pack

> **04 · Approve & schedule** · Cycle stage of Change Management (CHG-)

**Use when** approvers decide from a title and a gut feeling, meetings re-litigate the same questions, or two changes collide on the same service unnoticed

## Overview

CAB evidence pack compiles everything an approver needs into one view: risk score, predicted blast radius, rollout and rollback plans, schedule conflicts (change freezes, overlapping changes on the same CI) plus a draft rationale either way. Core principle: approval quality is bounded by evidence quality; the AI assembles, the board decides.

## When to Use

- Change enters approval with prod impact or high risk score
- Approvers keep asking “what else touches this CI next week?”
- Change freeze calendar exists but nobody checks it before scheduling
- When NOT to use: standard pre-approved change (password rotation, patching) with a fixed low-risk path

## Core Pattern

### Before

```js
// Before: approval by vibes
cabReview(change) // “looks fine, who wrote this? ok go”
// conflicts discovered when two deploys hit one CI in the same window
```

### After

```js
// After: pack first, decision second
const pack = assembleEvidence(change)
// {risk, blastRadius, conflicts: [CHG-131 same CI], freezeCheck}
return cab.decide(pack) // human approve/reject/schedule
```

## Quick Reference

| Pack section | Source | Flags |
| --- | --- | --- |
| Risk + reason | Risk scoring | high → extra scrutiny |
| Blast radius | Impact prediction | prod apps listed |
| Conflicts | Same-CI changes ±48h | overlap warning |
| Freeze calendar | Schedule check | blocked windows |

## Implementation

Joins outputs of the earlier stages (risk, impact) with schedule data: other pending changes on the same CIs within a conflict window and active freeze periods. Renders one evidence pack with a drafted approve/defer rationale citing specifics. The board’s decision and any rejection reasons are recorded back for future drafting.

## Common Mistakes

- Auto-approving low-risk packs → approval theater returns via the side door. Fix: humans decide, always.
- Conflict window too narrow (same hour) → sequential deploys still collide. Fix: default ±48h.
- Packs so long nobody reads them. Fix: one screen flags up top, evidence behind.

## Example

CHG “DB pool fix” on CI-042 → pack: high risk · 3 apps impacted · conflicts CHG-131 (same CI, +6h) · freeze starts Friday → CAB defers to Monday, rationale recorded.
