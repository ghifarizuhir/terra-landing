---
name: Closure & drift report
stage: "06 · Close & learn"
management: Change Management (CHG-)
description: Use when changes close the moment monitoring ends, related incidents later have no link back, and the runbook nobody updated quietly rots
---

# Closure & drift report

> **06 · Close & learn** · Cycle stage of Change Management (CHG-)

**Use when** changes close the moment monitoring ends, related incidents later have no link back, and the runbook nobody updated quietly rots

## Overview

Closure & drift report closes the loop: it checks whether the change held after the monitoring period (no related incidents, config still matches intent) and lists what should be updated runbooks, architecture docs, the CI record. Core principle: a change is done when it stopped generating work, not when it deployed green.

## When to Use

- Monitoring period completed without rollback candidate for closure review
- Incident appears days/weeks later touching a recently changed CI
- Docs and diagrams that reference this service may now be stale
- When NOT to use: change was rolled back it feeds problem/incident records instead

## Core Pattern

### Before

```js
// Before: close = status flip
if (monitoringOver()) change.close()
// docs say old schema, incidents arrive unlinkable, drift begins
```

### After

```js
// After: closure checks holding power
const report = driftCheck({ change, lookbackDays: 30 })
// {relatedIncidents: 0, docUpdates: [runbook §4], ciFieldsStale: false}
return reviewAndClose(report) // human closes with context
```

## Quick Reference

| Check | Window | Outcome |
| --- | --- | --- |
| Related incidents | 30d post-close | 0 → clean close |
| Config vs intent | at close | drift flagged |
| Docs referencing CI | at close | update list |
| Clean result | - | close + archive evidence |

## Implementation

After the monitoring period, correlates new incidents against the changed CIs (embedding + CI match), diffs current config against the change intent, and lists documents referencing the touched services. Output: one-page report {held: yes/no, follow-ups}. Closure stays a human call; reports attach permanently so future drafting inherits the outcome.

## Common Mistakes

- Closing with open follow-ups (“docs later”) → never happens. Fix: follow-ups are part of the report.
- Zero lookback for related incidents → drift invisible. Fix: mandatory 30-day correlation.
- Treating rolled-back changes as closures → wrong lessons archived. Fix: rollbacks route to problem/incident.

## Example

DB pool fix, monitoring done → report: held 30d · 0 related incidents · runbook §4 references old pool size → close with 1 doc follow-up assigned, evidence archived for future drafts.
