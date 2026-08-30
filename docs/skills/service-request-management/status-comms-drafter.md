---
name: Status comms drafter
stage: "05 · Deliver & confirm"
management: Service Request Management (REQ-)
description: Use when requesters ask “any update on my laptop?” because fulfillment happens in silence, and closure arrives as a surprise status flip
---

# Status comms drafter

> **05 · Deliver & confirm** · Cycle stage of Service Request Management (REQ-)

**Use when** requesters ask “any update on my laptop?” because fulfillment happens in silence, and closure arrives as a surprise status flip

## Overview

Status comms drafter answers “where is my request?” from the fulfillment timeline ordered, shipped, delivered and drafts the delivery confirmation message so closure is explicit, not a silent status change. Core principle: silence reads as neglect; the timeline already knows the answer, someone just has to say it.

## When to Use

- Requester asks for status on an in-flight request
- Fulfillment state changed (ordered/shipped/done) without telling the requester
- Request is fulfilled needs explicit confirmation before closing
- When NOT to use: nothing has changed since the last update do not send empty noise

## Core Pattern

### Before

```js
// Before: requester pings, human digs
onStatusQuestion((req) => readTimelineManually(req)) // 10 min per ping
// close happens silently; requester finds out by accident
```

### After

```js
// After: draft from timeline
const msg = draftFrom(timeline) // “Ordered 12/8 · shipped 15/8 · ETA Mon”
return humanSends(msg)
onFulfilled((req) => proposeConfirmation(req))
```

## Quick Reference

| Trigger | Draft | Rule |
| --- | --- | --- |
| “Any update?” | Timeline digest + ETA | extractive only |
| State changed | Proactive one-liner | send via human |
| Fulfilled | Confirmation + how to return issues | explicit close |
| No change since last | Nothing | no empty updates |

## Implementation

Compresses the fulfillment timeline into 12 sentences with the next milestone and date, always extractive (dates and states come from records, not invention). Drafts are sent by humans or auto-posted where policy allows. At fulfillment, proposes the confirmation message that doubles as the closure record.

## Common Mistakes

- Inventing ETAs to sound helpful → broken promises. Fix: only dates that exist in records.
- Updating on every micro-change → spam. Fix: meaningful milestones only.
- Closing without confirmation → requester reopens or loses trust. Fix: confirmation is part of closure.

## Example

Laptop request → “MacBook ordered 12/8, shipped 15/8, arriving Monday to your desk” sent proactively at ship event → delivery confirmed → closed with requester’s OK.
