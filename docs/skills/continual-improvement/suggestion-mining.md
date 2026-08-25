---
name: Suggestion mining
stage: "02 · Mine ideas"
management: Continual Improvement (IMP-)
description: Use when postmortems contain what could be better but no improvement is created and lessons stay in comments
---

# Suggestion mining

> **02 · Mine ideas** · Cycle stage of Continual Improvement (IMP-)

**Use when** postmortems contain what could be better but no improvement is created and lessons stay in comments

## Overview

Suggestion mining extracts improvement candidates from incident comments and postmortems. Core principle: the postmortem already contains the improvement — “should / could / need to” are the signals.

## When to Use

- Postmortem contains “what could be better”
- No improvement created after incident
- When NOT to use: no retrospective or postmortem — no source

## Core Pattern

### Before

```js
// Before: lessons in comments
// “should add DB pool alert” — stays in comment
```

### After

```js
// After: draft improvement
const draft = mine(comments) // "Add DB pool alert (effort S)"
// human confirms
```

## Quick Reference

| Pattern | Draft | Action |
| --- | --- | --- |
| “should add X” | Add X (S) | human confirms |
| “need to fix Y” | Fix Y (M) | human prioritizes |

## Implementation

Parses comments for “should / could / need to” patterns into draft improvement titles. Human confirms and prioritizes. Input: comments. Output: draft titles.

## Common Mistakes

- Mining without postmortem → noise. Fix: require retro/postmortem.
- Too long draft → not actionable. Fix: keep title <10 words + effort.

## Example

Comment “should add DB pool alert” → draft IMP “Add DB pool alert (effort S)”.
