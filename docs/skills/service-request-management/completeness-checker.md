---
name: Completeness checker
stage: "02 · Validate"
management: Service Request Management (REQ-)
description: Use when requests reach fulfillers missing fields or attachments, and fulfillment starts with a “can you also send me…” email instead of work
---

# Completeness checker

> **02 · Validate** · Cycle stage of Service Request Management (REQ-)

**Use when** requests reach fulfillers missing fields or attachments, and fulfillment starts with a “can you also send me…” email instead of work

## Overview

Completeness checker validates a request against its catalog item’s requirements before it enters a queue — missing laptop model, no manager name, absent justification — and asks the requester one consolidated question covering everything at once. Core principle: a request that cannot be fulfilled yet should not look fulfillable; bounce once, completely, or not at all.

## When to Use

- Catalog item has required fields/attachments that arrive empty
- Fulfillers spend their first touch asking for details instead of fulfilling
- Requests bounce back and forth 2–3 times before work can start
- When NOT to use: optional fields — nagging over nice-to-haves kills goodwill

## Core Pattern

### Before

```js
// Before: discover gaps one email at a time
fulfill(request) // → “which model?” → wait → “and manager approval?” → wait
// 3 days lost before real work starts
```

### After

```js
// After: validate once, ask everything at once
const gaps = checkRequirements(request, catalogItem.requires)
return gaps.length ? askOnce(gaps) : routeToFulfillment(request)
// one message, all missing items, with defaults suggested
```

## Quick Reference

| Check | On gap | Rule |
| --- | --- | --- |
| Required field empty | Ask in consolidated message | suggest common default |
| Attachment missing | Request upload link | block progression |
| Approval prerequisite | Flag to approval stage | do not fulfill first |
| Optional field empty | Proceed silently | never nag |

## Implementation

Each catalog item declares required fields and attachments; the checker diffs them against the submitted request. All gaps are combined into one clarifying message, ordered by blocking impact, with sensible defaults pre-filled where history shows one dominant answer (e.g. standard laptop model). Requests pass through only when genuinely fulfillable.

## Common Mistakes

- Asking per-field as they are noticed → the 3-email dance returns. Fix: single consolidated ask.
- Treating optional as required → friction and abandoned carts. Fix: only catalog-declared requirements.
- Guessing values silently → wrong hardware ordered. Fix: suggest defaults visibly, requester confirms.

## Example

Hardware request without model + start date → one message: “Which model? (85% pick MacBook Air) · Start date? · Manager name missing” → completed same day, fulfillment starts next morning.
