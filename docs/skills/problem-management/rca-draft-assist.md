---
name: RCA draft assist
stage: "03 · Investigate (RCA)"
management: Problem Management (PRB-)
description: Use when a problem has linked incidents but its RCA is blank, inconsistent, or repeatedly written manually
---

# RCA draft assist

> **03 · Investigate (RCA)** · Cycle stage of Problem Management (PRB-)

**Use when** a problem has linked incidents but its RCA is blank, inconsistent, or repeatedly written manually

## Overview

RCA draft assist generates a root-cause analysis draft from a cluster of linked incidents, ready for the engineer to edit. Core principle: linked incidents are the source — the draft compresses them, never invents.

## When to Use

- Problem has 2+ linked incidents and RCA is empty
- “What happened” is copied manually each time
- RCA structure varies per author
- When NOT to use: RCA already published — do not overwrite

## Core Pattern

### Before

```js
// Before: blank RCA
rca = {whatHappened:"", rootCause:""} // engineer writes from scratch
```

### After

```js
// After: draft from linked incidents
rca = draftFromIncidents(linkedIncidents) // {whatHappened, rootCause, contributingFactors, duration}
```

## Quick Reference

| Section | Source | Status |
| --- | --- | --- |
| whatHappened | Linked incidents timeline | human edits |
| rootCause | Most common error in cluster | human confirms |
| contributingFactors | History keywords | human edits |
| Publish | Human | draft → published |

## Implementation

Summarizes linked incidents into RCA sections. Human edits and publishes. Source is linked incidents, so no invented facts. Keeps draft vs published states.

## Common Mistakes

- Inventing root cause without evidence → hallucination. Fix: source is linked incidents only.
- Overwriting published RCA → lost. Fix: draft only, human publishes.

## Example

Linked 4 incidents → draft: “What happened: DB pool exhausted at 09:12, 12 orders failed…”
