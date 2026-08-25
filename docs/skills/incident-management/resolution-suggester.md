---
name: Resolution suggester
stage: "05 · Resolve & restore"
management: Incident Management (INC-)
description: Use when the diagnosis is clear but responders stare at the ticket unsure what to do, or MTTR is dominated by “what now?” instead of work
---

# Resolution suggester

> **05 · Resolve & restore** · Cycle stage of Incident Management (INC-)

**Use when** the diagnosis is clear but responders stare at the ticket unsure what to do, or MTTR is dominated by “what now?” instead of work

## Overview

Resolution suggester ranks candidate actions for a diagnosed incident — workarounds and fixes drawn from similar resolved incidents and matched runbooks — each with its past success rate and source. Core principle: during an outage, restore first, root-cause later; the fastest safe action beats the perfect fix. The AI suggests and ranks; only humans execute.

## When to Use

- Diagnosis points at a known failure mode (same signature resolved before)
- A runbook exists but nobody on shift remembers which one or trusts it
- P1 needs an interim workaround while engineering prepares the real fix
- When NOT to use: genuinely novel failure with no history — escalate to deeper expertise instead of dressing up a guess

## Core Pattern

### Before

```js
// Before: fix chosen under pressure
function resolve(incident) {
  // “try restarting? redeploy? someone check the runbook?”
  return loudestOpinion() // slow, inconsistent, untracked
}
```

### After

```js
// After: ranked candidates with evidence
function resolve(incident) {
  const options = rankActions(incident, history, runbooks)
  // [{action:"rollback v2.3", source:"INC-1042", success:1.0}, {action:"RB-07 §3"}]
  return options // human picks and executes
}
```

## Quick Reference

| Candidate | Shown as | Rule |
| --- | --- | --- |
| Past resolution ≥0.85 match | “Proven” + success rate | cite incident |
| Runbook step match | Steps + link | flag staleness |
| Partial similarity | Options ranked | no single answer |
| No history at all | Say so honestly | escalate, do not guess |

## Implementation

Reuses similar-incident embeddings, joins each candidate with its resolution record and duration, ranks by same-service × recency × past success. Output: top-3 {action, source link, success rate, blast radius}. Execution always stays with the human; outcomes are written back so rankings improve.

## Common Mistakes

- Presenting an unverified suggestion as “proven”. Fix: label every candidate with its evidence.
- Hiding blast radius (“rollback also drops in-flight orders”). Fix: show side effects next to action.
- Treating the workaround as the fix — problem never gets the handover. Fix: mark workaround as temporary.

## Example

Diagnosed 504 on checkout → suggests “Rollback to v2.3 — used 4×, 100% success (INC-1042)” ahead of deep-dive; service restored in 12 minutes, root cause goes to Problem.
