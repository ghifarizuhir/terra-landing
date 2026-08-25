---
name: Incident records pack
stage: "07 · Reporting & records"
management: Incident Management (INC-)
description: Use when nobody can say which documents an incident must produce, PIRs quietly stop happening after busy weeks, and audits ask for reports that were never written
---

# Incident records pack

> **07 · Reporting & records** · Cycle stage of Incident Management (INC-)

**Use when** nobody can say which documents an incident must produce, PIRs quietly stop happening after busy weeks, and audits ask for reports that were never written

## Overview

Incident records pack defines the standard documents every incident yields — the incident report for the facts, the post-incident review for majors, the communications log for who was told what when. Core principle: an incident without its records never legally happened: no lessons, no compliance trail, no defense.

## When to Use

- Major incident resolved — post-incident review due within 5 working days
- Audit or customer asks for incident documentation
- New coordinator unsure what to produce for each severity level
- When NOT to use: trivial ticket closed with a lightweight resolution note — full pack is overkill

## Core Pattern

### Before

```js
// Before: documentation = whatever anyone remembers later
resolve(incident)
// three months later: “do we have a report for that outage?” …no
```

### After

```js
// After: records generated to standard
const pack = buildRecords(incident)
// {report: always, pir: p1OrP2 ? dueIn5Days : null, commsLog: warRoom}
return attachToIncident(pack)
```

## Quick Reference

| Document | Trigger | Required sections |
| --- | --- | --- |
| Incident report | Every incident | summary · timeline · impact · actions · resolution |
| Post-incident review | P1/P2 or recurring | root cause · what worked · action items + owners |
| Comms log | War-room/major | timestamp · audience · message · channel |
| Waiver note | Pack skipped | who waived · why |

## Implementation

Templates are attached at incident creation by severity; the closure flow checks for required documents and offers an explicit waiver path (named human, stated reason) instead of silent gaps. Majors auto-schedule their PIR meeting. Reports stay extractive — assembled from timeline and comms, edited by humans, never ghostwritten opinions.

## Common Mistakes

- PIR skipped under workload pressure → same outage returns undocumented. Fix: scheduled + waiver requires a name.
- Reports written as novels → nobody reads them. Fix: structured sections, facts only.
- Comms reconstructed from memory → timeline disputes. Fix: log entries at send time.

## Example

Checkout 504 P1 resolves → pack attaches report + opens PIR doc with timeline prefilled + comms log complete → PIR held day 3, two action items registered to problem management.
