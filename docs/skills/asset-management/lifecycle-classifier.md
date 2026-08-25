---
name: Lifecycle classifier
stage: "02 · Categorize & tag"
management: Asset Management (AST-)
description: Use when inventory mixes servers, licenses and “misc” because classification depends on whoever typed the row
---

# Lifecycle classifier

> **02 · Categorize & tag** · Workflow stage of Asset Management (AST-)

**Use when** inventory mixes servers, licenses and “misc” because classification depends on whoever typed the row

## Overview

Lifecycle classifier assigns each asset its category (server/license/service/other), environment and criticality from its description and context — mapping free text onto the fixed enum. Core principle: category decides the whole lifecycle (a license renews, a server depreciates); misclassification corrupts every downstream report.

## When to Use

- Imported inventory arrives with free-text “type” columns (“box”, “subscrip”)
- Assets lack environment tags so prod cannot be separated from dev in reports
- Replacement planning needs criticality that nobody assigned
- When NOT to use: asset already cleanly categorized — no signal needed

## Core Pattern

### Before

```js
// Before: type = whatever was typed
{kind: "subscription thing?"} // unreportable
// licenses counted as hardware; budget reviews despair
```

### After

```js
// After: classify into enum
const cls = classify(description, {enum: [server, license, service, other]})
// {kind: "license", env: "prod", criticality: "high", confidence: 0.9}
return confidence >= 0.7 ? apply(cls) : askOnce(cls)
```

## Quick Reference

| Signal | Classification | Threshold |
| --- | --- | --- |
| “renewal”, “seats”, “per user” | license | confidence ≥0.7 auto |
| “rack”, “serial”, hostname | server | env from naming |
| Ambiguous text | Ask one question | below 0.7 |

## Implementation

Classifies description text against the fixed asset enum with confidence scores, infers environment from naming conventions and location fields, and suggests criticality from what the asset’s linked CI serves (when linked). Below threshold it asks exactly one clarifying question. All assignments are suggestions until confirmed.

## Common Mistakes

- Open-ended categories return → unreportable mess again. Fix: fixed enum, additions via governance.
- Guessing prod/dev silently → wrong compliance reports. Fix: low-confidence asks, never assumes.
- Criticality defaulting to “low” everywhere → replacement plans starve real workhorses. Fix: derive from linked CI impact when available.

## Example

“Adobe subscription, 12 seats, renews March” → license / office / medium (0.93) applied; “old box in rack B2” → server / prod? asked once, then classified.
