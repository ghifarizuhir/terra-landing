# Problem Management (PRB-)

Finds the cause behind repeating incidents so they stop recurring

Lane: **cycle** · cycle coverage: 6/6 stages

## What it does

- Clusters similar incidents to spot patterns (≥3 similar in 7 days)
- Investigates root cause and contributing factors, records RCA
- Links findings to knowledge so fixes outlive the incident

## AI skills

| # | Stage | Skill | File |
| --- | --- | --- | --- |
| 01 | 01 · Detect & cluster | Pattern clustering | ./pattern-clustering.md |
| 02 | 02 · Prioritize | Recurring-impact scorer | ./recurring-impact-scorer.md |
| 03 | 03 · Investigate (RCA) | RCA draft assist | ./rca-draft-assist.md |
| 04 | 04 · Workaround | Known-error publisher | ./known-error-publisher.md |
| 05 | 05 · Verify fix | Fix-effectiveness check | ./fix-effectiveness-check.md |
| 06 | 06 · Close & watch | Recurrence watchdog | ./recurrence-watchdog.md |
