# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Buyers and practitioners evaluating **Terraline for regulatory incident
management**:

- **IT managers, service desk leads, CISOs, compliance leads and operational
  risk owners** at mid-market financial institutions. Bank tier-2 and below,
  digital banks, licensed payment/e-money/PSP firms, insurers, takaful operators
  and multifinance companies.
- **Secondary: local implementation partners and internal enablement** need a
  30-second read of the pilot scope and the product boundary.

The main landing page is **Persuade**: the visitor should understand the
regulator reporting problem, see the incident record that ships today, know
exactly what is in pilot and what is out of scope, and apply for a design
partner pilot. The `/learn` route remains **Read**: a knowledge-first reference
for the eight ITIL practices and their AI skills.

## Product Purpose

Main landing: position Terraline as regulatory incident management for
mid-market finance, with the incident record and evidence trail as the argument.
Success: a visitor can state the reporting problem, name the shipped incident
record, understands the first Malaysia regulator pack is in pilot with 3–5
design partners, and knows that audit and regulator outcomes are not guaranteed.

## Positioning

ITIL-aligned, not ITIL-certified. Regulatory incident management and operational
resilience for mid-market financial institutions in one corridor. The first
corridor is Malaysia: BNM RMiT and the Cyber Security Act 2024. Terraline is
self-hosted, AGPL-3.0, and built on Plane.

The product ships incident intake, triage, war rooms, service context, problem
and change work, knowledge and reports. The regulator pack (reportability rules,
report draft, evidence pack, immutable audit log, KRI dashboard) is in pilot with
design partners, not shipped.

## Operating Context

- One-page journey: Hero (incident file) → pilot/platform facts → reporting
  problem → what ships today → product demo → design partner pilot →
  coexistence → platform/self-host → shipped vs in pilot vs out of scope → FAQ →
  pilot CTA.
- Visitor scans on desktop (1280px) and mobile (375px), needs fast load (<2s)
  and no horizontal page scroll.
- Static only, no auth, no backend fetch. Vite + React + Tailwind, deploy
  Cloudflare Pages/Vercel.
- Product proof is the existing demo workspace and the incident record; no
  invented customers, pricing, results, certifications or audit outcomes.

## Capabilities and Constraints

Shipped today:

- Incident intake with in-app forms, tokenized webhook sources and series
  deduplication.
- AI triage suggestions with human accept or decline.
- Incident tickets with states, priority, owner, comments, activity, versions,
  attachments, relations and sub-items.
- War rooms with realtime chat, runbook, participants, blast radius and activity
  timeline.
- Service catalog with ownership, criticality, dependencies and incident-derived
  health.
- Problem, change, request and improvement work types on one shared state set.
- Knowledge base with rich-text pages, versions, comments and Yjs collaboration.
- Reports and analytics with export.
- Galileo AI and Scheduler with human review.
- Public API v1, MCP and SDK compatibility.
- Self-host with Docker Compose on Postgres and Redis.

In pilot:

- Malaysia regulator pack for BNM RMiT and the Cyber Security Act 2024.
- Reportability rules and incident classification.
- Regulator report draft, validation and PDF/Excel export.
- Evidence pack with timeline, classification, impact, root cause, corrective
  actions and approvals.
- Immutable audit log with retention and export.
- KRI dashboard with volume, timeliness, MTTR and overdue actions.

Out of scope:

- ServiceNow, BMC, Jira or Freshservice feature parity.
- CMDB, ITOM, APM or AIOps.
- A full GRC suite.
- SLA engine and CAB approval board.
- A native mobile app.
- Any guarantee of audit or regulator approval.

Constraints:

- Do not claim ITIL certification or quote ITIL or regulator text verbatim.
- Do not present pilot features as shipped.
- Do not fabricate pricing, testimonials, case studies, usage metrics or audit
  outcomes.
- Do not expose Terraline codebase internals on the landing page.
- English operational voice; monospace IDs as illustration, not proof.

## Brand Commitments

- Product name: **Terraline** (domain: terraline.space).
- Keep entity-type color hints (incident red, problem purple, change amber,
  request sky, knowledge indigo, improvement emerald) as wayfinding.
- Keep the architectural ledger world: warm paper, graphite console, hazard-yellow
  tape, lamps and rails, Bricolage display voice, IBM Plex body and mono.
- The incident file is the signature first-viewport object and the product's
  evidence argument.

## Evidence on Hand

- The incident record, intake, war rooms, service catalog, knowledge, reports,
  AI and self-host facts from the product repo.
- The pilot scope and market strategy from
  `plane-for-itsm/docs/strategy/01-market-strategy.md`.
- Current Vite 6 + React 19 + Tailwind 4 + motion scaffold; tests cover the
  landing, demo and practice data.
- No regulator pack, audit guarantee, pricing or customer proof to claim.

## Product Principles

1. **The record is the promise.** Lead with the incident record and the evidence
   it leaves behind.
2. **Six ship. Two are documented.** State the ITIL boundary in the FAQ and the
   knowledge base, not the hero.
3. **Pilot is a label, not a footnote.** Every regulator feature is marked
   in pilot until it ships.
4. **Show the handoffs.** Intake → incident → war room → problem → change →
   knowledge → report is the argument.
5. **No compliance theater.** Provide evidence and records; never guarantee an
   audit or regulator outcome.
