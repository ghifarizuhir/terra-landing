# Foundation Workflows Skills Design (Asset + Service Configuration)

Date: 2026-08-25
Status: Approved via established pattern (user: "boleh lanjut keduanya")

## Goal

Complete coverage for the two foundation managements. They are not lifecycle cycles but operating workflows same 1-skill-per-stage pattern, strip label becomes lane-aware ("Workflow coverage" for non-cycle lanes).

## Asset Management workflow → skills

| # | Stage | Skill | New? |
|---|-------|-------|------|
| 01 | Receive & register | Receiving registrar | NEW |
| 02 | Categorize & tag | Lifecycle classifier | NEW |
| 03 | Link to operations | Inventory linking | existing |
| 04 | Track & maintain | Status tracker | NEW |
| 05 | Audit & reconcile | Audit reconciler | NEW |
| 06 | Retire & dispose | Retirement planner | NEW |

### New skills (essence)
- Receiving registrar: drafts the asset record from PO/delivery evidence (model, serials, cost, warranty start); never invents serials.
- Lifecycle classifier: assigns category (server/license/service/other), environment and criticality from description; enum not open labels.
- Status tracker: watches location/status changes, warranty and renewal dates; proposes updates before things lapse silently.
- Audit reconciler: compares records against discovery/spot-check reality; flags ghosts (recorded, missing) and zombies (running, unrecorded).
- Retirement planner: surfaces end-of-life/warranty-expired assets; drafts disposal checklist (data wipe, license reclaim, CI unlink).

## Service Configuration workflow → skills

| # | Stage | Skill | New? |
|---|-------|-------|------|
| 01 | Register & describe | CI capture assist | NEW |
| 02 | Map dependencies | Dependency mapping | existing |
| 03 | Detect drift | Graph drift detector | NEW |
| 04 | Predict impact | Impact prediction | existing |
| 05 | Score health | Graph health scorer | NEW |
| 06 | Retire & clean | Stale-node sweeper | NEW |

### New skills (essence)
- CI capture assist: drafts CI records from deploy events and service descriptions; suggests kind/env/app links.
- Graph drift detector: compares graph against signals of reality (new services mentioned in deploys/incidents); proposes missing nodes/edges.
- Graph health scorer: scores completeness (orphan nodes, empty descriptions, unconfirmed edges) so impact answers can be trusted.
- Stale-node sweeper: proposes archiving CIs with no events whose linked asset retired or which nothing references anymore.

Shared principle unchanged: AI drafts/suggests/measures, humans confirm every write to the graphs of record.

## Tests

- `managements.test.ts`: asset + config 6-stage sequences.
- `JourneyLoop.test.tsx`: Workflow strip renders for AST/CI; old negative-strip assertion replaced (no unstaged management remains).
