---
name: Dependency mapping
stage: "02 · Map dependencies"
management: Service Configuration (Service Map) (CI-)
description: Use when a new CI is created or a description mentions depends on and the graph has isolated nodes or empty impact analysis
---

# Dependency mapping

> **02 · Map dependencies** · Workflow stage of Service Configuration (Service Map) (CI-)

**Use when** a new CI is created or a description mentions depends on and the graph has isolated nodes or empty impact analysis

## Overview

Dependency mapping suggests dependency edges between CIs from descriptions and app links. Core principle: the description already says it “depends on / calls / uses” are the signals.

## When to Use

- New CI is created
- Description mentions “depends on”
- Graph has isolated nodes
- When NOT to use: CI is intentionally isolated no deps

## Core Pattern

### Before

```js
// Before: isolated graph
graph = [CI-A, CI-B] // no edge, impact empty
```

### After

```js
// After: suggested edge
edge = parse("checkout depends on payment-api") // {from: checkout, to: payment-api, confidence:0.88}
```

## Quick Reference

| Phrase | Edge | Confidence |
| --- | --- | --- |
| depends on | checkout → payment-api | 0.88 |
| calls | service A → service B | 0.75 |
| no phrase | No suggestion | - |

## Implementation

Parses “depends on / calls / uses” mentions + app-CI links to propose ci_dependencies with confidence. Human confirms edge. Input: CI description + app links. Output: edge + confidence.

## Common Mistakes

- Auto-creating edge → wrong graph. Fix: suggest only.
- Ignoring app links → misses deps. Fix: include app-CI links.

## Example

CI “checkout-service depends on payment-api” → suggests edge checkout → payment-api (0.88).
