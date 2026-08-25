---
name: Receiving registrar
stage: "01 · Receive & register"
management: Asset Management (AST-)
description: Use when hardware arrives and sits unrecorded for weeks, or asset entries start life as “new laptop??” with no serial, cost or owner
---

# Receiving registrar

> **01 · Receive & register** · Workflow stage of Asset Management (AST-)

**Use when** hardware arrives and sits unrecorded for weeks, or asset entries start life as “new laptop??” with no serial, cost or owner

## Overview

Receiving registrar drafts the complete asset record at the moment of arrival from purchase and delivery evidence: model, serials, cost, warranty start, assigned location. Core principle: an asset that is not registered on day one will lie in every report forever. The AI extracts from documents; humans confirm the record.

## When to Use

- Hardware delivered with a PO/packing list but no asset entry yet
- New license purchased — needs its seat count and renewal date recorded
- Bulk delivery (10 monitors) arriving as one box with one invoice
- When NOT to use: asset already registered — update instead of duplicating

## Core Pattern

### Before

```js
// Before: record typed later, if ever
// laptop arrives Monday → registered “someday”
// audit finds it in October as a mystery device
```

### After

```js
// After: draft from delivery evidence
const record = extractFromDocuments({ po, packingList })
// {model, serials[], cost, warrantyStart} — gaps flagged
return humanConfirms(record)
```

## Quick Reference

| Field | Source | Rule |
| --- | --- | --- |
| Model + serials | Packing list / device | verbatim, never guessed |
| Cost + currency | PO/invoice | required for lifecycle |
| Warranty start | Invoice date | drives expiry tracking |
| Missing field | Flagged gap | human fills |

## Implementation

Extracts structured fields from PO and delivery documents (text parsing; OCR where available), dedupes serials against existing inventory to catch double-registration, and stages a complete-or-flagged draft. Registration completes only with human confirmation; bulk deliveries expand into one record per serial.

## Common Mistakes

- Typing serials by hand later → transposition errors poison matching forever. Fix: extract verbatim.
- Registering “one laptop” for a 10-unit delivery → inventory lies by 9. Fix: per-serial expansion.
- Skipping warranty dates → renewals lapse silently. Fix: required field, feeds status tracker.

## Example

Delivery of 5 ThinkPads → registrar extracts 5 serials + PO cost → 5 staged records, warranty starts invoice date, one click each to confirm.
