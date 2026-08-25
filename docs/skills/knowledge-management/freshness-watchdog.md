---
name: Freshness watchdog
stage: "06 · Maintain & retire"
management: Knowledge Management (KB-)
description: Use when three-year-old runbooks still claim to be truth, the service they describe was redesigned twice, and wrong instructions burn the next on-call
---

# Freshness watchdog

> **06 · Maintain & retire** · Cycle stage of Knowledge Management (KB-)

**Use when** three-year-old runbooks still claim to be truth, the service they describe was redesigned twice, and wrong instructions burn the next on-call

## Overview

Freshness watchdog watches staleness signals — linked CI changed, product version moved, no confirmed success in months — and proposes update or retirement with evidence. Core principle: a wrong article is worse than no article; stale knowledge actively misleads at the worst moment.

## When to Use

- CI referenced by an article was modified or replaced
- Article had zero confirmed successes for N months while its topic recurred
- Periodic KB hygiene sweep before audit or review
- When NOT to use: reference material that does not decay (architecture decision records) — age alone is not staleness

## Core Pattern

### Before

```js
// Before: staleness discovered by victims
onCall.follows(runbookFrom2023) // steps reference deleted service
// incident extended by 40 minutes of confusion
```

### After

```js
// After: signals surface before harm
watchdog.watch({ kb, signals: [ciChanged, versionDrift, noSuccess] })
onStale((kb, evidence) => proposeUpdateOrRetire(kb))
```

## Quick Reference

| Signal | Verdict | Proposal |
| --- | --- | --- |
| Linked CI changed | Likely stale | propose update |
| No success in 6 months | Suspect | verify against reality |
| Topic retired from estate | Obsolete | propose archive |
| Contradicts newer article | Conflict | merge proposal |

## Implementation

Subscribes to change events on CIs and products referenced in each article’s tags and body entities; combines signal strength (how central was the changed component) with usefulness data from the tracker. Proposals come as evidence packages — what changed, what likely broke, suggested owner — routed to the last author or domain reviewer. Humans update or retire.

## Common Mistakes

- Age-only triggers → good stable articles harassed. Fix: require change/success signals.
- Silent auto-archive → teams lose tribal knowledge. Fix: proposals with grace period.
- No ownership routing → flags rot next to the articles. Fix: route to last meaningful author.

## Example

CI-042 replaced by CI-077 → watchdog flags “Runbook: DB pool exhausted” referencing deleted CI → proposes update to new topology or archive, routed to former author with diff evidence.
