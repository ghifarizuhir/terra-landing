---
name: Usefulness tracker
stage: "05 · Use & feedback"
management: Knowledge Management (KB-)
description: Use when KB health is measured by page views and thumbs-up, while nobody knows whether articles actually resolve incidents
---

# Usefulness tracker

> **05 · Use & feedback** · Cycle stage of Knowledge Management (KB-)

**Use when** KB health is measured by page views and thumbs-up, while nobody knows whether articles actually resolve incidents

## Overview

Usefulness tracker correlates article usage with outcomes: when an incident linked to an article resolves successfully, the article earns a confirmed success; high views without successes mean findable-but-broken. Core principle: feedback is behavioral resolution data tells the truth that star ratings flatter.

## When to Use

- Quarterly KB review: which articles deserve investment?
- An article gets traffic but the same failures keep escalating past it
- Deciding where to spend documentation effort next quarter
- When NOT to use: brand-new article with <10 exposures sample too small to judge

## Core Pattern

### Before

```js
// Before: popularity as proxy for quality
rankArticlesBy(views) // SEO wins, usefulness invisible
// broken runbook keeps collecting views and failed fixes
```

### After

```js
// After: outcome-linked scoring
const stats = correlate(kb, resolvedIncidents)
// {views: 40, confirmedSuccesses: 3, successRate: "low"}
return flagForRework(stats.topProblem)
```

## Quick Reference

| Pattern | Reading | Action |
| --- | --- | --- |
| High views + high success | Healthy workhorse | keep current |
| High views + low success | Findable but broken | flag rework |
| Low views + high success | Hidden gem | improve placement |
| Low views + low success | Candidate retire | route to watchdog |

## Implementation

Joins in-ticket suggestions and CI-slot placements with incident outcomes: an incident counts as article-assisted if the article was opened during its lifecycle and the incident did not escalate to problem within the window. Output per article: {views, assisted, successRate, trend}. Flags are proposals attached to articles; humans decide rework or retirement.

## Common Mistakes

- Counting opens as success → views inflation returns. Fix: require positive incident outcome.
- Punishing niche articles with tiny samples. Fix: minimum-exposure threshold.
- Acting on flags automatically (auto-unpublish) → knowledge loss. Fix: propose, human retires.

## Example

KB-012: 40 views, only 3 assisted resolutions → flagged “findable but broken”; KB-031: 6 views, 5 successes → hidden gem, placement proposal sent.
