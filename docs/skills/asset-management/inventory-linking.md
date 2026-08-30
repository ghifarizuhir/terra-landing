---
name: Inventory linking
stage: "03 · Link to operations"
management: Asset Management (AST-)
description: Use when assets have a hostname or name that matches a CI but the link is missing and audits show mismatches
---

# Inventory linking

> **03 · Link to operations** · Workflow stage of Asset Management (AST-)

**Use when** assets have a hostname or name that matches a CI but the link is missing and audits show mismatches

## Overview

Inventory linking suggests a link between an asset (inventory) and its running CI (operational graph). Core principle: the hostname is the key asset.name ↔ CI.hostname should match.

## When to Use

- Asset has hostname or name matching a CI
- Assets without CI link
- Audit mismatches: “which CI is this asset?”
- When NOT to use: asset is a license/service with no hostname no CI to link

## Core Pattern

### Before

```js
// Before: manual link
asset.ci_id = guess() // often wrong
```

### After

```js
// After: suggested link
const {ci, confidence} = match(asset, CIs) // {CI-042, 0.92}
// human confirms
```

## Quick Reference

| Match | Confidence | Action |
| --- | --- | --- |
| Exact hostname | ≥0.9 | Suggest link |
| Fuzzy (web-042 vs Web_042) | 0.70.9 | Suggest with warning |
| No match | <0.6 | No suggestion |

## Implementation

Matches asset name/hostname to CI hostname via exact + fuzzy. Suggests assets_ext.ci_id with confidence. Human confirms. Input: asset + CIs. Output: CI + confidence.

## Common Mistakes

- Fuzzy without threshold → wrong CI. Fix: 0.7 threshold.
- Linking license to CI → nonsense. Fix: only hardware/service with hostname.

## Example

Asset “Web-042” hostname web-042 → suggests link to CI-042 (0.92).
