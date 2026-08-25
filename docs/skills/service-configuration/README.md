# Service Configuration (Service Map) (CI-)

Maps services as a live graph to see dependencies and predict impact

Lane: **foundation** · workflow coverage: 6/6 stages

## What it does

- Records CIs (server/service) and directed dependencies — not a stale diagram
- Answers impact: if this component fails, what else is affected?
- Ties configuration to the assets that actually run it

## AI skills

| # | Stage | Skill | File |
| --- | --- | --- | --- |
| 01 | 01 · Register & describe | CI capture assist | ./ci-capture-assist.md |
| 02 | 02 · Map dependencies | Dependency mapping | ./dependency-mapping.md |
| 03 | 03 · Detect drift | Graph drift detector | ./graph-drift-detector.md |
| 04 | 04 · Predict impact | Impact prediction | ./impact-prediction.md |
| 05 | 05 · Score health | Graph health scorer | ./graph-health-scorer.md |
| 06 | 06 · Retire & clean | Stale-node sweeper | ./stale-node-sweeper.md |
