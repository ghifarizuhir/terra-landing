---
name: Search relevance
stage: "04 · Find & surface"
management: Knowledge Management (KB-)
description: Use when a new incident is created and the right KB article is not suggested, so the team searches manually
---

# Search relevance

> **04 · Find & surface** · Cycle stage of Knowledge Management (KB-)

**Use when** a new incident is created and the right KB article is not suggested, so the team searches manually

## Overview

Search relevance suggests the right KB article when a similar incident is opened. Core principle: the incident text is the query embedding similarity finds the KB whose sections already solved it.

## When to Use

- New incident is created
- “Is there a runbook for this?” asked
- Repeated manual search for same error
- When NOT to use: incident is a novel error with no KB no suggestion

## Core Pattern

### Before

```js
// Before: manual search
results = search("timeout") // 50 hits, slow
```

### After

```js
// After: AI suggests top 3
suggestions = similar(incident, KBs) // [{KB-012, score:0.81}, ...]
```

## Quick Reference

| Signal | Result | Threshold |
| --- | --- | --- |
| Embedding cosine ≥0.75 | Top 3 KB | suggest |
| Score <0.6 | No suggestion | avoid noise |

## Implementation

Embedding similarity between incident title/description and KB sections. Surfaces top 3 with score. No auto-link; suggests. Input: incident. Output: KB list + scores.

## Common Mistakes

- Auto-linking low score → wrong KB linked. Fix: threshold 0.6, suggest only.
- Ignoring sections → title only. Fix: include KB sections in embedding.

## Example

New incident “504 checkout” → suggests KB-012 “Runbook: 504 check DB pool” (0.81).
