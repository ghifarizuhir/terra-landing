---
name: Closure & handover pack
stage: "06 · Close & learn"
management: Incident Management (INC-)
description: Use when incidents close as one-liners like “fixed”, postmortems start from a blank page, or problem/knowledge teams chase responders for context
---

# Closure & handover pack

> **06 · Close & learn** · Cycle stage of Incident Management (INC-)

**Use when** incidents close as one-liners like “fixed”, postmortems start from a blank page, or problem/knowledge teams chase responders for context

## Overview

Closure & handover pack assembles the learning record at close time: timeline digest, impact, actions taken, resolution and open follow-ups formatted so problem management gets a problem statement and knowledge gets an article stub, not a scavenger hunt. Core principle: learning is part of closing; whatever is not captured now is lost forever.

## When to Use

- Any non-trivial incident is about to close with a thin resolution note
- An incident closes that has recurred before recurrence must reach problem management
- Major/war-room incident closure where stakeholders expect a record
- When NOT to use: trivial password-reset-class tickets lightweight close is fine

## Core Pattern

### Before

```js
// Before: close = type “done”, move on
function close(incident) {
  incident.resolution = prompt('resolution?') // “fixed”
  return incident // context evaporates
}
```

### After

```js
// After: pack generated from the timeline
function close(incident) {
  const pack = buildClosurePack(incident.timeline)
  // {summary, impact, actions, followUps} + problem flag + KB draft
  return reviewAndSave(pack) // human reviews before anything is created
}
```

## Quick Reference

| Signal at close | Route | Rule |
| --- | --- | --- |
| Recurred ≥2× | Propose Problem record | human confirms |
| Novel cause + novel fix | Draft Knowledge article | from timeline only |
| Standard documented fix | Link existing article | no new article |
| Every closure | Summary + impact attached | extractive only |

## Implementation

Extractive assembly from the timeline and comms into four sections (what happened, impact, actions, follow-ups); classifies the learning target (problem / knowledge / none) using recurrence count and novelty; drafts are staged for human review before any record is created. Recurrence counters feed back into similar-incident and triage skills.

## Common Mistakes

- Writing a root cause into the closure that is problem management’s job, not the closer’s. Fix: record facts, flag for RCA.
- Auto-creating problem records or articles without review. Fix: draft and stage, human publishes.
- Skipping follow-up capture (“we should add alerting”) they evaporate. Fix: follow-ups are a required section.

## Example

INC closes after rollback → pack: “504 checkout, 22 min, 12 orders affected, rollback v2.3” + “3rd occurrence in 30 days → propose PRB” + KB stub drafted from timeline, awaiting review.
