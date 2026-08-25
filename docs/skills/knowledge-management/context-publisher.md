---
name: Context publisher
stage: "03 · Publish & target"
management: Knowledge Management (KB-)
description: Use when published articles live only in the portal nobody opens during an outage, while agents needed them inside the ticket
---

# Context publisher

> **03 · Publish & target** · Cycle stage of Knowledge Management (KB-)

**Use when** published articles live only in the portal nobody opens during an outage, while agents needed them inside the ticket

## Overview

Context publisher places an approved article where its audience actually works: the portal, the runbook slot of matching CIs, the in-ticket suggestion pool for future similar incidents. Core principle: publishing is placement, not a button — knowledge that surfaces after the incident is trivia.

## When to Use

- Article approved but visible only via direct URL / portal search
- Runbooks exist for services but never appear when those services fail
- Teams argue the KB is useless because nothing shows up mid-ticket
- When NOT to use: sensitive internal analysis restricted by policy — placement must respect ACLs first

## Core Pattern

### Before

```js
// Before: one button, one place
publish(kb) // → portal listing #47
// during next checkout outage, agent never sees it exists
```

### After

```js
// After: placed where work happens
place({
  kb,
  ciSlots: cisMatching(kb.tags),      // runbook slot on CI pages
  suggestionPool: embedInto(kb),       // findable by Search relevance
}) // humans confirm placements
```

## Quick Reference

| Article type | Primary surface | Secondary |
| --- | --- | --- |
| Runbook | CI page slot + in-ticket pool | Portal |
| Troubleshoot guide | In-ticket suggestion pool | Portal |
| Postmortem | Portal + problem links | not in-ticket |
| FAQ | Portal | - |

## Implementation

Maps kbType + tags to surfaces: matching CIs get the article in their runbook slot, embeddings feed the in-ticket suggestion index used by search relevance, and visibility follows ACLs. Placement changes are proposed as a package the human confirms, so sensitive material never leaks into broad surfaces.

## Common Mistakes

- Publishing everything everywhere → in-ticket noise drowns real matches. Fix: type-based surface rules.
- Ignoring ACLs in placement → internal postmortems visible broadly. Fix: ACL check precedes placement.
- One-time setup → new CIs miss runbook slots. Fix: placements derive from tags, re-evaluated on CI changes.

## Example

“Runbook: DB pool exhausted” → placed on CI-042 runbook slot + embedded into in-ticket suggestions → next 504 shows it at triage without anyone searching.
