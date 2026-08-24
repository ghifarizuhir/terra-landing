# Service Request Cycle Skills — Design

Date: 2026-08-25
Status: Approved via established pattern (user: "go ahead service request")

## Goal

Complete Service Request Management AI-skill coverage using the 1-skill-per-stage pattern. UI (cycle strip + chips) already generic.

## Cycle → Skill mapping

| # | Stage | Skill | New? |
|---|-------|-------|------|
| 01 | Intake & classify | Intent classification | existing |
| 02 | Validate | Completeness checker | NEW |
| 03 | Approve | Approval router | NEW |
| 04 | Route & fulfill | Auto-routing | existing |
| 05 | Deliver & confirm | Status comms drafter | NEW |
| 06 | Close & mine demand | Demand miner | NEW |

## New skills (full SKILL.md structure)

### Completeness checker (Validate)
Checks the request against its catalog item's required fields/attachments before it moves; asks one consolidated clarifying question instead of email ping-pong. A request that cannot be fulfilled yet should not be in a fulfiller's queue.

### Approval router (Approve)
Identifies the right approver from item type × cost × requester role policy, attaches context (what, why, cost), and chases approvals sitting past due. Suggests routes and reminders — approval itself stays human.

### Status comms drafter (Deliver & confirm)
Answers "where is my request?" by drafting status updates from the fulfillment timeline (ordered → shipped → delivered), and drafts delivery confirmation so closure is explicit. Extractive from timeline only.

### Demand miner (Close & mine demand)
Clusters fulfilled requests over time to surface demand patterns: recurring manual requests that deserve catalog items or full self-service automation. The catalog grows from evidence, not vibes.

Shared principle: requests are not disruptions — AI removes friction (classification, completeness, approval chasing, comms) while every decision (approve, fulfill, publish new catalog item) stays human.

## Tests

- `managements.test.ts`: request has 6 skills, ordered stage names.
- `JourneyLoop.test.tsx`: strip renders for Service Request too.
