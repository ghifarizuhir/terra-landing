# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Knowledge seekers for **Terra AI for ITSM**:
- **IT practitioners & team leads** want to understand what each ITSM management does (not ITIL4-certified, generic operational knowledge) + what AI skills are needed per management.
- **Secondary: partners / internal enablement** needs 30-second comprehension of the 8 managements as a connected system.

Landing purpose is **Read**: visitor *understands* what each management does + what AI skills it needs. Not marketing the Terra codebase implementation (no `entity_links`, no `apps/*` details). Terra is the framing, not the proof.

## Product Purpose

Terra AI for ITSM knowledge landing: explain 8 core managements as standalone knowledge (what each does, why it matters) and pair each with the AI-augmented skills it needs. Success: visitor can recount the 8 managements + name one AI skill per management, without needing to understand Terra's internal implementation.

## Positioning

Knowledge-first, not product-first: we do not claim ITIL4 certification or reproduce ITIL4 verbatim. We describe generic ITSM management knowledge in operational language, with AI as the enabler per station. Terra is the host for that knowledge.

## Operating Context

- Content is generic ITSM knowledge + AI skills not derived from `terra-service-management` codebase, no code references.
- Explicitly **avoid ITIL4 certification claims** (author not certified) use plain management language.
- Visitor scans on desktop (1280px) and mobile (375px), needs fast load (< 2s) and no horizontal scroll.
- One-page journey: Hero → Andon Line (8 stations knowledge) → Skills matrix → Principles → CTA. No auth, no backend, static only.
- Design keeps Andon world (graphite/steel/off-white, Oswald caps, rail+lamp+cord) now carries knowledge, not product metrics.

## Capabilities and Constraints

Knowledge to show (8 managements, generic):
- **Incident Management** what it does + AI skills (triage, priority, war-room summarization, recurrence detection).
- **Problem Management** what it does + AI skills (clustering, RCA draft, pattern mining).
- **Change Management** what it does + AI skills (risk scoring, impact prediction, drift detection).
- **Service Request Management** what it does + AI skills (intent classification, auto-routing).
- **Knowledge Management** what it does + AI skills (auto-generation from resolutions, search relevance).
- **Service Configuration (Service Map)** what it does + AI skills (dependency mapping, impact prediction).
- **Asset Management** what it does + AI skills (inventory linking, lifecycle).
- **Continual Improvement** what it does + AI skills (trend detection, suggestion mining).
- No codebase-specific bullets (no `entity_links`, `goals`, `checkpoints`).

Constraints:
- Do not claim ITIL4 certification or quote ITIL4 verbatim.
- Do not fabricate pricing, testimonials, case studies.
- Do not expose Terra codebase internals.
- English concise operational voice; monospace IDs as light illustration only, not as data proof.
- Static only, Vite + React + Tailwind, deploy Cloudflare Pages/Vercel, no backend fetch.
- Performance: split chunks (react/motion/lucide separately), tree-shake lucide.

## Brand Commitments

- Product name: **Terra Platform AI for ITSM** (short: Terra Platform).
- Keep entity-type color hints (Incident red, Problem purple, etc.) as wayfinding, not as spec.
- Andon world (graphite/steel/off-white, hazard yellow for pull) already shipped.

## Evidence on Hand

- Generic ITSM management knowledge (authored for landing, not imported from codebase).
- Current terra-platform scaffold: Vite 6 + React 19 + Tailwind 4 + motion, Andon world shipped, 7 tests green.
- No ITIL4 certification, no product marketing claims to fabricate.

## Product Principles

1. Knowledge over marketing explain what each management does before how Terra does it.
2. One skill per station every management has an AI skill that makes it better.
3. No certification theater generic operational language, no ITIL4 verbatim.
4. AI augments, not replaces human judgment stays, AI speeds the call.
5. Scannable 8 stations readable in 30 seconds, any viewport.

