---
name: Practice embedder
stage: "06 · Embed & close"
management: Continual Improvement (IMP-)
description: Use when verified improvements stay personal wins the person who fixed it leaves, and six months later the same problem needs the same heroics again
---

# Practice embedder

> **06 · Embed & close** · Cycle stage of Continual Improvement (IMP-)

**Use when** verified improvements stay personal wins the person who fixed it leaves, and six months later the same problem needs the same heroics again

## Overview

Practice embedder converts a verified improvement into the default way of working: runbook steps, checklists, policy lines, catalog defaults then closes with adoption evidence. Core principle: improvement is not finished when it works once; it is finished when working that way is unavoidable.

## When to Use

- Improvement verified by outcome data and ready to become standard
- A fix lives in one engineer’s muscle memory or private notes
- Similar work keeps being done differently per shift or per person
- When NOT to use: outcome unverified embed facts only after the verifier says they hold

## Core Pattern

### Before

```js
// Before: heroics are the process
imp.close() // alert lives in Dina’s head
// Dina leaves → next pool exhaustion repeats the discovery, full price
```

### After

```js
// After: standardize, then rest
embed({
  runbookUpdates: [steps §4],
  checklistAdds: ["check pool saturation"],
}) // adoption confirmed → close with evidence
```

## Quick Reference

| Target | Artifact | Adoption proof |
| --- | --- | --- |
| Incident response | Runbook section | used in next N incidents |
| Request handling | Catalog default/checklist | fulfillers follow it |
| Recurring risk | Policy/checklist line | audit passes |

## Implementation

Proposes concrete artifact edits which runbook section, which checklist line, which policy paragraph derived from the implemented change and its verified evidence. After edits land, tracks early adoption (artifacts referenced in real work) and only then proposes closure. Humans write and approve artifacts; the embedder keeps them from evaporating.

## Common Mistakes

- Embedding by memo (“team please start doing X”) → memory-hole. Fix: edit the actual artifact.
- Closing at embed proposal, before adoption evidence. Fix: close requires usage signal.
- Embedding unverified improvements → standardizing a mistake. Fix: gate on verifier verdict.

## Example

Verified pool alerting → embedder drafts runbook §4 “check pool saturation first” + triage checklist line → used in next 3 checkout incidents → closed as adopted.
