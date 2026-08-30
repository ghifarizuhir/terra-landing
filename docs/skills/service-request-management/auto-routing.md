---
name: Auto-routing
stage: "04 · Route & fulfill"
management: Service Request Management (REQ-)
description: Use when a service request is approved and needs assignment to the correct fulfillment team with a realistic due date
---

# Auto-routing

> **04 · Route & fulfill** · Cycle stage of Service Request Management (REQ-)

**Use when** a service request is approved and needs assignment to the correct fulfillment team with a realistic due date

## Overview

Auto-routing suggests the owner team and a realistic due date for a validated request. Core principle: history is the SLA past fulfillment times for that catalog item predict the next due date.

## When to Use

- Request is approved and sits unassigned
- Wrong team gets hardware requests
- Due dates are guessed, not based on history
- When NOT to use: request already has an owner team assigned

## Core Pattern

### Before

```js
// Before: manual routing
team = guessFromDepartment(requester) // often wrong
```

### After

```js
// After: history-based
const {team, targetDate} = suggestRoute(catalogItem, requesterDept, history)
// team + median days for that type
```

## Quick Reference

| Signal | Team | Due date |
| --- | --- | --- |
| Hardware + Engineering | Workplace | median 7 days |
| Access + Finance | IAM | median 2 days |
| Unknown catalog | Ask | no guess |

## Implementation

Matches catalog item + requester department + history to owner team. Suggests targetDate as median fulfillment days for that type. Human approves. Input: catalogItem, requesterDept. Output: team + targetDate + confidence.

## Common Mistakes

- Routing without history → random team. Fix: require 5+ past samples.
- Ignoring department → Engineering hardware goes to IT. Fix: include requester dept.

## Example

Hardware from Engineering → Workplace, targetDate 7 days (median for hardware).
