---
name: Approval router
stage: "03 · Approve"
management: Service Request Management (REQ-)
description: Use when approvals sit for days with the wrong person, requesters have no idea where theirs is stuck, or every approval chases its approver manually
---

# Approval router

> **03 · Approve** · Cycle stage of Service Request Management (REQ-)

**Use when** approvals sit for days with the wrong person, requesters have no idea where theirs is stuck, or every approval chases its approver manually

## Overview

Approval router determines who must approve a request — by item type × cost × requester role policy — attaches the context an approver needs to decide fast, and nudges approvals sitting past due. Core principle: approval should take one glance; the AI finds the right pair of eyes and hands them everything on one screen.

## When to Use

- Access/costly items waiting on an approval chain nobody is sure about
- Approvals routed by org-chart guesswork bounce between managers
- Stale approvals age out silently past due dates
- When NOT to use: pre-approved zero-cost items with policy-defined auto-approval

## Core Pattern

### Before

```js
// Before: who approves this? ask around
routeTo(requester.manager) // → “not mine, try IT budget owner”
// 4 days of forwarding, no record why
```

### After

```js
// After: policy-derived route with context
const chain = resolveApprovers(item, cost, role)
sendForApproval(chain[0], packContext(request))
onStale(() => remind(chain[0], afterDays: 2))
```

## Quick Reference

| Signal | Action | Rule |
| --- | --- | --- |
| Policy match (item+cost+role) | Route to named approver | cite policy line |
| No policy match | Escalate to service owner | never guess silently |
| Approved | Release to routing stage | context carried |
| Pending > SLA days | Auto-remind | max 2 reminders |

## Implementation

Reads the approval matrix (item category, cost threshold, requester role → approver), builds a one-screen context pack (what, why, cost, policy basis), sends with due date, and auto-reminds up to twice before escalating. Every hop and nudge is recorded so the audit trail explains itself.

## Common Mistakes

- Routing by org chart proximity → wrong approver, silent delays. Fix: explicit approval matrix.
- Reminding forever → approvers mute the channel. Fix: cap reminders, then escalate.
- Sending bare titles (“approve REQ-42”) → slow decisions. Fix: always attach context pack.

## Example

“Jira admin access, Finance, $0” → policy: Finance data tools need Data Owner + manager → both get context pack; Data Owner approves day 1, manager reminded day 3, released to IAM routing.
