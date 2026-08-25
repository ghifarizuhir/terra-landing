---
name: CI capture assist
stage: "01 · Register & describe"
management: Service Configuration (Service Map) (CI-)
description: Use when services run in production that the map has never heard of, or CI entries start life as a bare hostname with no kind, environment or app link
---

# CI capture assist

> **01 · Register & describe** · Workflow stage of Service Configuration (Service Map) (CI-)

**Use when** services run in production that the map has never heard of, or CI entries start life as a bare hostname with no kind, environment or app link

## Overview

CI capture assist drafts configuration records from operational evidence — deploy events, service descriptions, app associations — so the graph learns about services when they are born, not after their first outage. Core principle: every unrecorded service is a blind spot in the next impact prediction; capture is the graph’s immune system.

## When to Use

- New service deployed but no CI exists for it yet
- CI entry has only a hostname — no kind, environment or owning app
- Team mentions “the queue worker” that no one can find on the map
- When NOT to use: ephemeral build containers / short-lived jobs — noise, not configuration

## Core Pattern

### Before

```js
// Before: map learns from incidents
// “what is payment-worker?” asked during SEV1
createCiBarebones({name}) // impact analysis useless
```

### After

```js
// After: drafted from deployment evidence
const draft = draftFromSignals({deploys, descriptions, apps})
// {kind: "service", env: "prod", app: APP-004}
return humanConfirms(draft)
```

## Quick Reference

| Signal | Drafted field | Rule |
| --- | --- | --- |
| Deploy event | name, kind, env | prod deploys first |
| Service README/description | purpose summary | verbatim excerpt |
| App association | app link | from repo/org mapping |
| Ephemeral workload | skip | not configuration |

## Implementation

Watches deployment and infrastructure events plus existing app structures to propose new CI records with kind (server/service), environment and owning application; enriches descriptions from documentation excerpts. Drafts stage for human confirmation — the graph of record only grows through approved writes.

## Common Mistakes

- Capturing every ephemeral container → graph drowns in noise. Fix: filter by persistence signals.
- Bare-bones records (“web-9”) → technically present, analytically useless. Fix: require kind+env before confirm.
- Guessing the owning app silently → wrong blast-radius reports. Fix: suggest with evidence, human confirms.

## Example

payment-worker deploys to prod 3× this week → draft CI: service/prod/APP-004 + purpose excerpt → confirmed in one click → visible to impact analysis immediately.
