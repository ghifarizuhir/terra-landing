---
name: Change-request drafter
stage: "01 · Log & plan"
management: Change Management (CHG-)
description: Use when change requests are thin one-liners like “update DB”, rollout steps are invented per deploy, or rollback is a blank field nobody fills
---

# Change-request drafter

> **01 · Log & plan** · Cycle stage of Change Management (CHG-)

**Use when** change requests are thin one-liners like “update DB”, rollout steps are invented per deploy, or rollback is a blank field nobody fills

## Overview

Change-request drafter assembles a complete change record from history: intent, rollout steps, verification checks and a rollback plan drawn from similar completed changes on the same service. Core principle: past changes are the template — if no previous change ever used a rollback step, the drafter says so instead of inventing one.

## When to Use

- New change created with a short description and empty rollback field
- Same service gets changed repeatedly with rewritten-from-scratch plans
- Author is junior to change process — needs the structure, not the lecture
- When NOT to use: emergency fix mid-incident — speed beats paperwork; draft after the fact

## Core Pattern

### Before

```js
// Before: plan typed from memory
const chg = { title: "update DB", rollback: null }
// discovered incomplete at 2am during a failed deploy
```

### After

```js
// After: drafted from similar completed changes
const chg = draftFromHistory({ ci: "CI-042", intent })
// {steps: [...], verify: [...], rollback: from INC/CHG evidence}
return humanEdits(chg) // author confirms every step
```

## Quick Reference

| Section | Source | Rule |
| --- | --- | --- |
| Intent + description | Author input + linked CI | expanded, not invented |
| Rollout steps | Similar completed changes | most recent wins |
| Rollback plan | What actually worked before | never fabricated |
| Verification steps | Post-deploy checks used before | human edits |

## Implementation

Finds completed changes touching the same CI/service (embedding + exact CI match), extracts their steps, rollbacks and outcomes; drafts the new record section by section with source links. Output is a staged draft — nothing enters the approval flow until the author edits and submits. Missing sections are flagged, not filled with guesses.

## Common Mistakes

- Copying a rollback plan from an unrelated service → dangerous theater. Fix: same-CI history only.
- Auto-submitting drafts into approval → reviewers rubber-stamp noise. Fix: author submits.
- Fabricating plausible-sounding steps → hallucinated ops. Fix: extractive, cite sources, flag gaps.

## Example

“Update DB” on CI-042 → draft expands to intent + 5 rollout steps + rollback “restore snapshot pre-CHG-118 (worked in 4 min)” + 3 verify checks, each citing its source change.
