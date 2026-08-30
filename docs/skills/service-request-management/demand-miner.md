---
name: Demand miner
stage: "06 · Close & mine demand"
management: Service Request Management (REQ-)
description: Use when the same manual requests repeat every week yet stay manual, and nobody can prove which new catalog item or automation would pay off first
---

# Demand miner

> **06 · Close & mine demand** · Cycle stage of Service Request Management (REQ-)

**Use when** the same manual requests repeat every week yet stay manual, and nobody can prove which new catalog item or automation would pay off first

## Overview

Demand miner clusters fulfilled requests over time to expose what people actually keep asking for and quantifies it: volume, handler time, seasonality. Core principle: the catalog should grow from evidence of repeated demand, not from whoever complained loudest this month.

## When to Use

- Quarterly catalog review: which free-text asks recur often enough to become items?
- A request type is fulfilled manually 20× a month with the same three steps
- Stakeholders debate new self-service flows with no usage data
- When NOT to use: one-off unusual requests no pattern to mine yet

## Core Pattern

### Before

```js
// Before: catalog evolves by anecdote
reviewCatalog() // “I think people want X?”
// same manual fulfillment continues, cost invisible
```

### After

```js
// After: demand ranked by evidence
const clusters = mineDemand(fulfilledRequests, { lookbackDays: 90 })
// [{pattern: “VPN token reset”, count: 34, avgHandleMin: 18}]
return proposeCatalogItem(clusters[0])
```

## Quick Reference

| Signal | Threshold | Proposal |
| --- | --- | --- |
| Same cluster ≥10× / month | Propose catalog item | with volume + effort |
| Purely digital + deterministic | Propose full automation | zero-touch flow |
| Cluster shrinking | No action | watch |
| One-off requests | Ignore | no pattern |

## Implementation

Embeds fulfilled request texts over a trailing quarter, clusters them (same technique family as problem pattern clustering), and joins each cluster with handler time from fulfillment records. Output: ranked list {pattern, volume, total handle time, seasonality} with proposals to add catalog items or automate zero-touch flows. Humans decide what enters the catalog.

## Common Mistakes

- Building catalog items for tiny clusters → shelfware entries. Fix: volume threshold.
- Ignoring handler time → big-volume-but-trivial wins crowd out real savings. Fix: rank by minutes × count.
- Automating a flaky manual process as-is → automated mess. Fix: flag process health before automation.

## Example

90-day mine: “VPN token reset” × 34, 18 min each ≈ 10 hours handled manually → proposal: self-service reset flow, projected full automation of the cluster.
