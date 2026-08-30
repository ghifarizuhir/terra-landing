---
name: Structure & tagging assist
stage: "02 · Structure & review"
management: Knowledge Management (KB-)
description: Use when KB drafts are wall-of-text with no sections or tags, reviews bounce for structure instead of substance, and every author formats differently
---

# Structure & tagging assist

> **02 · Structure & review** · Cycle stage of Knowledge Management (KB-)

**Use when** KB drafts are wall-of-text with no sections or tags, reviews bounce for structure instead of substance, and every author formats differently

## Overview

Structure & tagging assist shapes a raw draft into a reviewable article: sections per kbType template, suggested tags pulled from content, a readability pass, then routes it to the right technical reviewer. Core principle: reviewers should spend attention on whether the fix is right not on reformatting. The AI structures; meaning stays with the author.

## When to Use

- Draft has no symptom/cause/steps separation hard to follow mid-incident
- Tagging is inconsistent, so search misses articles that exist
- Review cycles waste time on “can you restructure this?” feedback
- When NOT to use: postmortem with required legal/compliance wording template may break format rules

## Core Pattern

### Before

```js
// Before: reviewer = editor + fact-checker
review(rawDraft) // “add steps section, add tags, what’s the symptom here?”
// 3 rounds of formatting ping-pong before anyone checks the facts
```

### After

```js
// After: structure arrives done, review checks substance
const shaped = applyTemplate(draft, kbType) // {symptom, cause, steps, verify}
shaped.tags = suggestTags(shaped) // from entities in text
return routeForReview(shaped, domainExpert)
```

## Quick Reference

| Pass | Input | Output |
| --- | --- | --- |
| Template sections | Raw draft | kbType-shaped article |
| Tags | Entities in text (CI, app, error) | 510 consistent tags |
| Readability | Full text | flags long steps, jargon |
| Reviewer route | Domain of content | named technical reviewer |

## Implementation

Applies the kbType section template by classifying each paragraph into a target slot (extractive move, never rewrite), extracts candidate tags from recognized entities (services, error signatures, products) matched against existing tag vocabulary, flags unreadable steps (>N actions in one line, undefined acronyms), and suggests the reviewer whose past approvals cover this domain. Author confirms all changes.

## Common Mistakes

- Rewriting sentences → meaning drifts in safety-critical runbooks. Fix: move text, do not rewrite it.
- Free-form new tags → vocabulary chaos returns. Fix: match existing tag set, propose additions separately.
- Routing reviews to whoever is free → wrong expertise approves wrong fixes. Fix: domain-matched reviewers.

## Example

Wall-of-text pool-exhaustion draft → structured {symptom: 504s at peak, cause: pool not recycled, steps: 4} + tags [db, checkout-api, timeout] → routed to the DB platform reviewer.
