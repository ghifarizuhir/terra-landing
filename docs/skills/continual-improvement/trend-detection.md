---
name: Trend detection
stage: "01 · Detect signal"
management: Continual Improvement (IMP-)
description: Use when many improvements share the same source or keywords but are treated as isolated and no systemic fix is created
---

# Trend detection

> **01 · Detect signal** · Cycle stage of Continual Improvement (IMP-)

**Use when** many improvements share the same source or keywords but are treated as isolated and no systemic fix is created

## Overview

Trend detection spots repeating improvement themes across retro notes and postmortems. Core principle: repetition is the systemic signal — five “onboarding docs” improvements should become one.

## When to Use

- Same theme (“onboarding”) appears 5× in 30 days
- Many improvements from retro/audit with overlapping keywords
- When NOT to use: single isolated improvement with unique theme

## Core Pattern

### Before

```js
// Before: 5 small improvements
improvements = ["fix onboarding page", "update onboarding docs", ...] // scattered
```

### After

```js
// After: one systemic
trend = cluster(improvements, {source, keywords})
// “Streamline onboarding docs” (effort M) replaces 5
```

## Quick Reference

| Signal | Cluster size | Action |
| --- | --- | --- |
| Same keywords 5× in 30d | 5 | Suggest systemic |
| Single unique | 1 | Keep as is |

## Implementation

Clusters improvements by source (retro/audit) + keyword overlap. Suggests a systemic improvement to replace many small ones. Input: improvements 30d. Output: trend + suggested title.

## Common Mistakes

- Creating systemic too early (2×) → premature. Fix: threshold 5 in 30d.
- Ignoring source → mixes retro and audit. Fix: cluster per source.

## Example

5 improvements with “onboarding docs” in 30 days → “Streamline onboarding docs” (M).
