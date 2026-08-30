---
name: Knowledge records pack
stage: "07 · Reporting & records"
management: Knowledge Management (KB-)
description: Use when articles of wildly different shapes pass review, placement decisions vanish without a trail, and nobody can report on whether the knowledge base actually works
---

# Knowledge records pack

> **07 · Reporting & records** · Cycle stage of Knowledge Management (KB-)

**Use when** articles of wildly different shapes pass review, placement decisions vanish without a trail, and nobody can report on whether the knowledge base actually works

## Overview

Knowledge records pack standardizes what knowledge produces: article templates per kbType, control effectiveness

## When to Use

- New article drafted must follow the template for its kbType before review
- Article published or retired placement/retirement decision needs a record
- Quarterly review: which content to invest, fix, or archive?
- When NOT to use: reference architecture decisions that follow a different record scheme

## Core Pattern

### Before

```js
// Before: shape varies per author
kb = freeText() // some have steps, some novelize
// review = “can you fix the structure?”
```

### After

```js
// After: records standardized
const pack = knowledgeRecords(kb)
// {templateScore, editorialCheck, placementRecord, scorecard, auditLine}
```

## Quick Reference

| Document | Trigger | Required sections |
| --- | --- | --- |
| Article by template | Every KB item | symptom · cause · steps · verification (per kbType) |
| Editorial checklist | At review | structure · tags · readability · owner domain |
| Placement record | At publish/retire | surfaces chosen · ACLs checked |
| Quality scorecard & audit | Quarterly | views · success rate · stale flags · decisions |

## Implementation

Structure & tagging assist records template coverage and editorial notes; context publisher records placements; usefulness tracker and freshness watchdog feed the quarterly scorecard and audit one report structure per quarter, reviewed and archived.

## Common Mistakes

- Template ignored → article unusable mid-incident. Fix: template enforced by record, not by habit.
- Placement decisions undocumented → leaks and blind spots. Fix: record at publish and at retire.
- Scorecard reduced to thumbs-up counts → popularity ≠ usefulness. Fix: outcome-linked metrics.

## Example

Runbook draft → template + checklist passed → placement on CI-042 slot recorded → quarterly scorecard: 40 views, 3 successes → rework proposal attached.
