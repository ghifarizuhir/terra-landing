---
name: Retirement planner
stage: "06 · Retire & dispose"
management: Asset Management (AST-)
description: Use when end-of-life hardware keeps running past support, licenses keep billing for leavers, and disposal happens without wipe certificates or record closure
---

# Retirement planner

> **06 · Retire & dispose** · Workflow stage of Asset Management (AST-)

**Use when** end-of-life hardware keeps running past support, licenses keep billing for leavers, and disposal happens without wipe certificates or record closure

## Overview

Retirement planner surfaces assets at end of life — support ended, warranty expired, unused for months, linked person offboarded — and drafts the disposal checklist: data wipe, license reclaim, CI unlink, record close. Core principle: an asset’s exit matters as much as its entry; sloppy exits leak money and data.

## When to Use

- Vendor support/warranty ended — device now an uninsured risk
- License seats bill for people who left months ago
- Storage closet filling with “we’ll deal with those later”
- When NOT to use: asset still actively serving prod despite age — flag risk instead of retiring

## Core Pattern

### Before

```js
// Before: retirement = forgetting harder
// old laptops pile up; Adobe bills 12 seats, 4 employees remain
// one wiped-later-found-unwiped incident away from headlines
```

### After

```js
// After: planned exits
const candidates = findEOL({supportEnded, unusedMonths, offboarded})
plan(candidates[0]) // [wipe+cert, reclaimSeats, unlink CI, close record]
```

## Quick Reference

| Candidate signal | Check first | Exit steps |
| --- | --- | --- |
| Support ended | still serving traffic? | wipe cert → retire |
| Unused >6 months | confirmed with owner | wipe → dispose |
| Offboarded user license | seat truly idle | reclaim → downgrade plan |
| Prod-critical but EOL | risk accepted? | flag, do NOT retire |

## Implementation

Ranks retirement candidates from lifecycle signals (dates from receiving, usage from tracking, links from inventory linking), generates a per-asset checklist covering data destruction with certificate, license seat reclamation, CI link removal and final record state. Each completed step is recorded; nothing closes until the checklist does.

## Common Mistakes

- Retiring prod workhorses because they are old. Fix: usage + criticality gate before any exit.
- Skipping wipe certificates → data leaves with the hardware. Fix: certificate is a required step.
- Forgetting seat reclamation → zombie spend continues forever. Fix: license exits include vendor-side action.

## Example

Planner lists 4 ThinkPads past support + 8 idle Adobe seats → checklists issued: wipes scheduled, seats reclaimed ($ saved), CI links removed, records closed cleanly.
