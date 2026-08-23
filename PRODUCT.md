# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

External showcase audience for Terra Service Management (AI for ITSM):
- **Prospective enterprise IT leaders (CIO, IT managers, team leads)** — evaluating an ITIL4-aligned platform that unifies incident, problem, change, request, knowledge, asset, improvement + Service Map in one entity graph.
- **Secondary: internal team & partners** — needs to understand 8 managements + AI skills mapping quickly (30-second comprehension).

Landing purpose is **Persuade**: visitor decides Terra is credible and wants to act (explore journey, view skills, request demo). Not Operate.

## Product Purpose

Terra Service Management is an IT operations platform that unifies every kind of IT work — incidents, problems, changes, improvements, service requests, knowledge articles, assets, and Service Map — in one graph with AI skills per management. Success on landing: visitor can recount the lifecycle (Incident → Problem/RCA → Change → Knowledge → Improvement, with Request parallel and Asset/Service Map as foundation) and understands AI augments each step, not replaces it.

## Positioning

Entity-graph unification: unlike siloed ITSM suites where each work type lives in its own module, Terra treats every work item as a node in a single graph (`entity_links` with 5 relations: parent, depends_on, relates_to, caused_by, resolved_by). Anything can link to anything, and ITIL4 is methodology not ceremony. That graph plus per-management AI skills (Security Audit, Description Quality, RCA Completeness, Compliance, CI Description Quality) is the mechanism a competitor could not truthfully copy.

## Operating Context

- Content is static factual showcase: 8 managements derived from `terra-service-management/docs/business-capabilities.md` and `PRODUCT.md`.
- Visitor scans on desktop (1280px) and mobile (375px), often on corporate network, needs fast load (< 2s) and no horizontal scroll.
- One-page journey: Hero → Journey Loop → Skills → Entity-Graph Proof → CTA. No auth, no backend.
- Design must honor entity-type color language: Incident red, Problem purple, Change amber, Improvement emerald, Asset blue, Request sky, Knowledge indigo, Service Map slate.

## Capabilities and Constraints

Confirmed capabilities to show:
- 8 managements with factual details: Incident (war-room, recurrence, impact), Problem + RCA (8 categories, draft/published), Change (goals/checkpoints, monitoringPeriodDays), Knowledge (7 kbTypes, sections), Asset (ciId link), Service Map (CI graph, dependencies, impact), Request (targetDate/overdue), Improvement (effort voting).
- Cross-cutting: entity graph, comments/timeline/versions/reviews.
- AI: 5 default agent skills + Pulse Advisor + Dispatch (secondary).

Constraints:
- Do not fabricate pricing, testimonials, case studies (none exist in PRODUCT.md: Evidence on Hand).
- English concise operational voice; monospace IDs (INC-202501-003 style).
- Static only, Vite + React + Tailwind, deploy Cloudflare Pages/Vercel, no backend fetch.
- Performance: split chunks (react/motion/lucide separately), tree-shake lucide.

## Brand Commitments

- Product name: **Terra Service Management** (short: Terra).
- Entity-type color language established; monospace IDs; concise operational labels.
- Existing landing scaffold uses Tailwind, shadcn patterns, lucide-react, motion — new world must replace visual language intentionally, not polish incumbent zinc neutrals.

## Evidence on Hand

- `terra-service-management/docs/PRODUCT.md`, `business-capabilities.md` (observational 2026-08-14), `docs/CHEAT-SHEET.md`, `docs/features/*` — factual spec corpus.
- Current terra-landing scaffold: Vite 6 + React 19 + Tailwind 4 + motion, 7 tests green, docs/superpowers/specs/2026-08-24-terra-landing-journey-design.md (Journey Loop spec), docs/superpowers/plans/...
- No marketing copy exists — to be authored at production fidelity, labeled synthetic where demo data used.

## Product Principles

1. One graph, not silos — every management is a node, linking is first-class.
2. ITIL4 as methodology, not ceremony — processes make work faster and traceable.
3. Prove, don't claim — every management card shows factual capability a competitor cannot copy-paste.
4. AI per management, not bolt-on — each node has relevant skill badge.
5. Speed for scanners — Persuade in seconds, readable at any viewport.

