# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Buyers and practitioners evaluating **Terraline for ITSM**:
- **IT managers, service desk leads and platform owners** need to know whether Terraline runs the ITIL practices their team already follows, what ships today, and what they must still provide.
- **Secondary: partners and internal enablement** need a 30-second read of the practice map and the product boundary.

The main landing page is **Persuade**: the visitor should understand that Terraline is ITSM with six ITIL practices ready to run, believe the claim because the product evidence is on the page, and request a guided demo. The `/learn` route remains **Read**: a knowledge-first reference for all eight practices and their AI skills.

## Product Purpose

Main landing: position Terraline as open-source ITSM with six ITIL practices built in, and make the boundary explicit. Success: a visitor can name the six practices, understands how they connect, sees the product doing the work, and knows that asset management and service configuration are documented, not packaged.

## Positioning

ITIL-aligned, not ITIL-certified. Six practices ship as connected work types: incident, problem, change, service request, knowledge and continual improvement. Asset management and service configuration are reference material in the open knowledge base. Terraline is self-hosted, AGPL-3.0, and built on Plane.

## Operating Context

- One-page journey: Hero (practice rack) → platform facts → connected practices → practice register → product demo → platform/self-host → shipped vs out of scope → FAQ → demo CTA.
- Visitor scans on desktop (1280px) and mobile (375px), needs fast load (< 2s) and no horizontal page scroll.
- Static only, no auth, no backend fetch. Vite + React + Tailwind, deploy Cloudflare Pages/Vercel.
- Product proof is the existing demo workspace and real screenshots; no invented customers, pricing, results or certification.

## Capabilities and Constraints

Shipped practices (six):
- **Incident Management** restore service, keep users informed.
- **Problem Management** find the cause behind repeat incidents.
- **Change Management** score risk, ship, verify.
- **Service Request Management** fulfil approved needs from a catalog.
- **Knowledge Management** make every fix reusable.
- **Continual Improvement** turn lessons into shipped improvements.

Reference practices (two, knowledge base only):
- **Asset Management** ownership, location and lifecycle.
- **Service Configuration (Service Map)** dependencies and impact.

Product facts to keep honest:
- Built-in incident, problem, change and improvement types; request is opt-in.
- Service catalog with ownership, criticality and dependency graph.
- Intake triage, shared states, comments, versions and activity history.
- Galileo AI drafts from the work item on screen; humans review.
- Scheduler, Pages, analytics, mobile mode and public API v1.
- Not in v1: SLA engine, CAB approval board, live monitoring/APM, separate asset/CMDB module, native mobile app.

Constraints:
- Do not claim ITIL certification or quote ITIL verbatim.
- Do not fabricate pricing, testimonials, case studies or usage metrics.
- Do not expose Terraline codebase internals on the landing page.
- English operational voice; monospace IDs as illustration, not proof.

## Brand Commitments

- Product name: **Terraline** (domain: terraline.space).
- Keep entity-type color hints (incident red, problem purple, change amber, request sky, knowledge indigo, improvement emerald) as wayfinding.
- Keep the architectural ledger world: warm paper, graphite console, hazard-yellow tape, lamps and rails, Bricolage display voice, IBM Plex body and mono.
- The practice rack is the signature first-viewport object and the product's ITIL map.

## Evidence on Hand

- Six ITIL practices as built-in work types and shared states (product data and `/learn` content).
- Service catalog, intake, Pages, Galileo AI, Scheduler, analytics, mobile mode and API v1.
- Current Vite 6 + React 19 + Tailwind 4 + motion scaffold; tests cover the landing, demo and practice data.
- No ITIL certification, pricing or customer proof to claim.

## Product Principles

1. **The framework is the promise.** Lead with the practices, then prove them in the product.
2. **Six ship. Two are documented.** State the boundary in the hero, the register and the FAQ.
3. **AI proposes, humans confirm.** Every AI skill stays inside the record and stages a draft.
4. **Show the handoffs.** Incident → problem → change → knowledge → improvement is the argument.
5. **No certification theater.** ITIL-aligned language, plain operational copy.
