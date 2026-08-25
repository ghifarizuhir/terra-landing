---
name: Intent classification
stage: "01 · Intake & classify"
management: Service Request Management (REQ-)
description: Use when users write free-text and it is ambiguous whether the input is a service request or an incident, or which catalog item it maps to
---

# Intent classification

> **01 · Intake & classify** · Cycle stage of Service Request Management (REQ-)

**Use when** users write free-text and it is ambiguous whether the input is a service request or an incident, or which catalog item it maps to

## Overview

Intent classification decides whether incoming text is a service request or an incident, and which catalog item it maps to. Core principle: the catalog is the vocabulary — the model maps free text to a fixed enum (access/hardware/info/…), not to open-ended labels.

## When to Use

- User writes “need laptop” vs “cannot login” — request vs incident is unclear
- Requests appear in incident queue or vice versa
- Wrong SLA applied because request_type was guessed
- When NOT to use: form already has a selected catalog item — no classification needed

## Core Pattern

### Before

```js
// Before: human reads, guesses type
if (text.includes("need")) return "request" // fragile
```

### After

```js
// After: classifier suggests
const {type, confidence} = classify(text) // {type:"hardware", confidence:0.91}
return confidence > 0.7 ? type : askQuestion(text)
```

## Quick Reference

| Signal | Result | Action |
| --- | --- | --- |
| Confidence ≥0.7 | request_type + catalog | auto-fill |
| Confidence 0.5–0.7 | Ask 1 question (2–4 options) | human picks |
| Confidence <0.5 | Leave blank | human decides |

## Implementation

Classifier maps text to request_type enum vs incident. Confidence 0.7 threshold; below, ask one clarifying question with 2–4 options. Input: free text. Output: type + confidence + reason.

## Common Mistakes

- Open-ended labels (“other”) → unsearchable. Fix: fixed enum.
- Auto-filing low-confidence → wrong queue. Fix: threshold + question.

## Example

“Need MacBook for new hire Budi, start 2026-09-01” → hardware, 0.91.
