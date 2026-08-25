---
name: War-room summarization
stage: "04 · Communicate"
management: Incident Management (INC-)
description: Use when incident timelines have long scroll, duplicate questions, or shift handovers where newcomers ask what happened so far
---

# War-room summarization

> **04 · Communicate** · Cycle stage of Incident Management (INC-)

**Use when** incident timelines have long scroll, duplicate questions, or shift handovers where newcomers ask what happened so far

## Overview

War-room summarization condenses a noisy incident timeline (dozens of comments, status changes) into a 3-bullet handover readable in 30 seconds. Core principle: the timeline is the source of truth — the AI compresses it, never invents. It is a reference skill for handovers, not a decision maker.

## When to Use

- Incident has >10 comments or war-room flag is set
- Shift handover — newcomer asks “what happened so far?”
- Same question asked twice — timeline is too long to read
- When NOT to use: incident has <5 comments or is already resolved — summary adds no value

## Core Pattern

### Before

```js
// Before: human scrolls 200 comments, copies manually
const handover = readAllCommentsAndGuess()
// duplicate, slow, misses updates
```

### After

```js
// After: AI compresses timeline
const summary = summarizeTimeline(comments) // {whatHappened, impact, nextAction}
// 2–3 sentences, verbatim source, no recommendations
```

## Quick Reference

| Input | Output | Rule |
| --- | --- | --- |
| Timeline comments | 3 bullets: what happened / impact / next | chronological |
| Source | Verbatim comments only | no invention |
| Length | 2–3 sentences | no recommendations |

## Implementation

Chronological summarization of comments into 3 parts: what happened, current impact, next action. Input: timeline. Output: 2–3 sentences. Uses extractive summarization, no LLM recommendations. Trigger on war-room or >10 comments.

## Common Mistakes

- Adding recommendations (“should rollback”) → invented. Fix: summary only, no advice.
- Summarizing from title alone → misses timeline. Fix: use comments.
- Too long (paragraph) → not scannable. Fix: 2–3 sentences max.

## Example

200-comment incident → “Payment gateway 504 since 09:12, 12 orders affected, rollback to v2.3 in progress — ETA 09:40.”
