# Change Cycle Skills — Design

Date: 2026-08-25
Status: Approved (user confirmed mapping table)

## Goal

Complete Change Management AI-skill coverage using the 1-skill-per-stage pattern. UI (cycle strip + chips) already generic.

## Cycle → Skill mapping

| # | Stage | Skill | New? |
|---|-------|-------|------|
| 01 | Log & plan | Change-request drafter | NEW |
| 02 | Assess risk | Risk scoring | existing |
| 03 | Map blast radius | Impact prediction | existing |
| 04 | Approve & schedule | CAB evidence pack | NEW |
| 05 | Deploy & verify | Post-deploy sentinel | NEW |
| 06 | Close & learn | Closure & drift report | NEW |

## New skills (full SKILL.md structure)

### Change-request drafter (Log & plan)
Drafts the change record from similar completed changes: intent, rollout steps, rollback plan, verification steps. History is the template; drafter compresses, human edits. Never invents rollback steps that no past change used.

### CAB evidence pack (Approve & schedule)
Compiles risk score + predicted impact + schedule conflicts (freezes, overlapping changes on same CI) into one reviewer pack with an approve/reject rationale draft. Approve/reject stays human; the pack makes the decision fast and evidence-based.

### Post-deploy sentinel (Deploy & verify)
Watches service metrics during the monitoring period against a pre-change baseline; flags anomalies and proposes hold or rollback. Proposes only — execution is human. Baseline = same weekday/time window pre-deploy.

### Closure & drift report (Close & learn)
After monitoring passes, checks whether the change held over time (no related incidents, config matches intent) and lists docs/runbooks to update. A change is closed when it stopped generating work, not when it deployed.

Shared principle: AI prepares evidence and watches; approve/execute/rollback decisions stay human; success is verified by curves over time, not by green deploys.

## Tests

- `managements.test.ts`: change has 6 skills, ordered stage names.
- `JourneyLoop.test.tsx`: strip renders for Change too.
