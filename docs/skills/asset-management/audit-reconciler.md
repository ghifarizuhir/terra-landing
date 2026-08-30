---
name: Audit reconciler
stage: "05 · Audit & reconcile"
management: Asset Management (AST-)
description: Use when audit season reveals devices on paper that nobody can find, servers running that exist in no spreadsheet, and everyone guessing which list is right
---

# Audit reconciler

> **05 · Audit & reconcile** · Workflow stage of Asset Management (AST-)

**Use when** audit season reveals devices on paper that nobody can find, servers running that exist in no spreadsheet, and everyone guessing which list is right

## Overview

Audit reconciler compares inventory records against operational reality discovery scans, spot checks, network evidence and classifies every mismatch: ghost (recorded, absent) or zombie (running, unrecorded). Core principle: two sources of truth means zero; reconciliation is how inventory stays honest.

## When to Use

- Periodic audit cycle or compliance check approaching
- Discovery tooling reports devices the inventory never heard of
- Reports disagree: finance counts ≠ ops counts
- When NOT to use: asset mid-transfer between locations expected temporary mismatch

## Core Pattern

### Before

```js
// Before: reconciliation by spreadsheet duel
diff(financeList, opsList) // 200 rows of red
// weeks of email archaeology per mismatch
```

### After

```js
// After: classified mismatches with evidence
const mismatches = reconcile(inventory, discovery)
// [{type: "ghost", asset: AST-118}, {type: "zombie", host: "web-077"}]
return triageList(mismatches)
```

## Quick Reference

| Mismatch | Meaning | Proposal |
| --- | --- | --- |
| Ghost (recorded, not found) | lost/stolen/uninstalled | investigate then retire |
| Zombie (found, unrecorded) | shadow IT / missed intake | register via registrar |
| Attribute drift | moved/upgraded silently | update record |
| Match | - | no action |

## Implementation

Matches records against scan/discovery feeds using hostname, serial and fuzzy name matching (same matcher as inventory linking), then buckets differences by type with confidence and last-seen evidence. Produces a triage-ordered worklist high-value ghosts first where each resolution routes to the right stage (retire, register, update). Humans judge every disposition.

## Common Mistakes

- Treating all mismatches equally → low-value noise blocks serious finds. Fix: value-ordered triage.
- Deleting ghosts immediately → stolen assets vanish from books too. Fix: investigate-before-retire rule.
- One-off cleanup → drift returns next quarter. Fix: schedule as recurring reconciliation.

## Example

Reconciliation finds 3 ghosts (2 retired laptops still licensed) + 1 zombie (web-077 running unrecorded) → zombie registered, ghosts investigated and retired, counts finally agree.
