# Terraline Product Landing — Design

Date: 2026-09-27
Status: Draft (pending user review)
Scope: Repurpose `terra-landing` from the old "8 managements / 56 AI skills" knowledge landing into a product credibility landing for **Terraline** (the `plane-for-itsm` fork). Static site only; the product repo is not touched.

## Context

- `terra-landing` today markets a different product (`terra-service-management`: Express + `entities` JSONB): 8 managements, 56 AI skills, JourneyLoop, SkillsFlowDiagram, EntityGraphProof. Deployed at `www.terraline.space`.
- The real product is `/home/ghifari/plane-for-itsm`: a fork of Plane (AGPL-3.0) fully rebranded to **Terraline** (spec `2026-09-18-terraline-rebrand-design.md`), served at `dashboard.terraline.space` + `api.terraline.space`. Shipped surfaces include Work Items, Work Item Types + Workflows, Services (with dependency graph), Intake, Cycles/Modules/Views/Pages, Analytics, Galileo AI assistant, AI Scheduler, MCP public API v1 core resources, mobile mode, and a real-time live server for Pages.
- The old landing's knowledge content is still wanted, but as a secondary page, not the story.

## Goal & Audience

Make partners and investors trust that Terraline is a real, working product: what it is, what is shipped, what is next, and how to get access. No lead-gen funnel, no pricing.

Success: a partner/investor can state in 30 seconds (a) Terraline is open-source ITSM built on Plane, (b) it is real — proven by screenshots and architecture facts, (c) what is shipped vs next, (d) how to request a demo. Every claim traces to shipped code; load stays under 2s.

## Decisions (locked in brainstorming)

1. **Deliverable** — landing site only; README/GitHub of the product repo untouched.
2. **Goal** — product credibility; audience partner/investor.
3. **Naming** — "Terraline", with visible attribution "built on Plane · AGPL-3.0".
4. **Language** — English.
5. **Visual direction** — product-native: Terraline blue `#3f76ff`, Inter + IBM Plex Mono, light theme, the app's own strata mark. (Mockup option B chosen in the visual companion.)
6. **Structure** — proof-led product tour (hero → facts strip → product tour → why → architecture + roadmap → CTA).
7. **Proof** — real screenshots captured from `dashboard.terraline.space` (fallback `localhost:3000`); live demo optional. Repo is private → CTA is "Request access" via email.
8. **Roadmap** — honest "Shipped today / Next" split, no dates.
9. **Old content** — moves to `/learn`, keeping the 8-management journey and 56-skill library.
10. **Screenshots** — captured by the agent with Playwright using credentials in `.env.local` (never committed).

## 1. Homepage (`/`) — Information Architecture

1. **Nav** — Terraline mark + wordmark; links: Product · Why Terraline · Roadmap · Learn; button: Request access.
2. **Hero** — eyebrow "Open-source IT service management · built on Plane"; H1 "Run services and delivery work in one system"; sub: work items, service catalog, typed workflows, AI in the loop — self-hosted, traceable, real-time; CTAs: *Request a demo* (mailto) + *See the product* (anchor); hero screenshot: work items board.
3. **Facts strip** — Rust API (Axum) · Postgres + Redis Stream · Real-time pages (Yjs) · Docker Compose self-host · AGPL-3.0.
4. **The product** — eight feature blocks (copy ↔ screenshot):
   1. **Work items** — list, board, spreadsheet, calendar, timeline; rich text; sub-issues; relations; attachments; comments; activity; versions.
   2. **Work item types & workflows** — typed states, allowed transitions, workflow editor in workspace settings.
   3. **Services** — health-first ops board, dependency graph view, service detail with linked work.
   4. **Intake** — triage queue from incoming request to accepted work.
   5. **Pages + live collaboration** — TipTap editor with multi-user Yjs sessions via the live server.
   6. **Galileo AI** — sidebar assistant grounded in the work item on screen; editor AI; chat history.
   7. **AI Scheduler** — recurring, structured recipes (description, how-to, tools, expected output) with run history.
   8. **Delivery tracking** — Cycles (burndown), Modules, Views (saved filters), Analytics.
5. **Why Terraline** — two honest comparison cards: *beyond Plane upstream* (service catalog, typed workflows, ops vocabulary, AI) and *beyond closed ITSM suites* (open source AGPL, self-hostable, keyboard-first speed, one data model).
6. **Architecture & operations** — SVG diagram (browser → React Router SPA → Rust Axum API → Postgres / Redis Stream; live server for pages) plus deployment facts (Docker Compose, multi-tenant workspaces, roles, god-mode admin).
7. **Shipped today / Next** — shipped list as in §4; next: asset lifecycle, CMDB dependency map, incident/postmortem records — no dates.
8. **CTA band** — "See it against your own services": guided demo workspace, no pricing page; button Request access.
9. **Footer** — Terraline — Open-source IT service management; Learn; Contact; Built on Plane (AGPL-3.0, link to plane.so).

## 2. Claim Boundaries (honesty audit)

Every homepage claim must map to evidence before copy is written; the audit table lives in the implementation plan.

- No separate Incident/Problem/Change modules — those are **work item types + workflows** + Services.
- Service health values in the current build are **deterministic seeded demo data** (frontend service layer, spec `2026-09-17-services-list-health-redesign-design.md`); never claim live monitoring integrations.
- AI Scheduler: claims limited to what the audit confirms is shipped end-to-end (structured recipes, run history, pause/resume/run-now permissions per spec `2026-09-27-ai-schedule-recipe-design.md`); if scheduled runs cannot be confirmed executing, the copy drops execution claims.
- MCP public API: state the shipped scope only, confirmed by the audit — v1 core resources (project, work item and its sub-resources), spec `2026-09-18-mcp-public-api-v1-core-design.md`.
- Mobile mode: view/update work items, comments, navigation/search only (spec `2026-09-23-mobile-mode-design.md`).
- No pricing, testimonials, case studies, funding, or customer logos.
- No links to the private repo; attribution to Plane is to `plane.so`, not an endorsement claim.

## 3. `/learn` — Knowledge Page

- New Vite entry `learn/index.html` + `src/learn-main.tsx` → URL `/learn` (no router dependency).
- Content: compact knowledge hero, `JourneyLoop` + `ManagementCard` (8 managements with the 56-skill library and copyable skill specs), `SkillsSection` (default skills summary), and one small static "Traceability" section — comments, timelines, versions, links between records — replacing `EntityGraphProof`.
- Dropped from the old landing: `PulsePreview` (mock of the old product), `SkillsFlowDiagram` (redundant with `SkillsSection`), and the old hero copy.
- `docs:skills` generator and `docs/skills/**` stay as the skill library.
- `/learn` header links back to `/` and to Request access.

## 4. Visual Design System (direction B)

| Token | Value | Use |
| --- | --- | --- |
| `--brand` | `#3f76ff` | mark, accents, non-text emphasis |
| `--brand-strong` | `#2a5ce0` | text-bearing buttons (AA contrast) |
| `--ink` | `#0b1220` | headings/body |
| `--muted` | `#5b6472` | secondary text |
| `--border` | `#e2e6ee` | rules, card borders |
| `--subtle` | `#f7f9fc` | section/card fills |
| `--bg` | `#ffffff` | page |

- Fonts: **Inter** (heading/body) + **IBM Plex Mono** (IDs, labels, numbers), Google Fonts with preconnect. Geist and the old hazard/rail tokens are removed; no dark mode.
- Radius 8px; restrained motion via `motion`, honoring `prefers-reduced-motion`.
- Components: `Nav`, `Hero`, `FactsStrip`, `FeatureBlock`, `ScreenshotFrame` (browser chrome), `CompareCards`, `ArchDiagram` (SVG), `RoadmapColumns`, `CTABand`, `Footer`; `/learn` reuses `Nav`/`Footer` variants.

## 5. Technical Design

- **MPA**: `vite.config.ts` adds `build.rollupOptions.input = { main: index.html, learn: learn/index.html }`; both entries share components/data. No client router.
- **Data**: `src/data/product.ts` is the single source for homepage copy — features (id, eyebrow, title, body, bullets, screenshot, alt), facts, comparisons, roadmap columns, CTAs, meta. `src/data/managements.ts` remains for `/learn`.
- **Scripts/deps**: add `playwright` as a devDependency and an `npm run capture` script pointing at `scripts/capture.mjs`.
- **File tree (delta)**:

```
index.html                      # rewritten homepage
learn/index.html                # new entry
src/main.tsx                    # homepage root
src/learn-main.tsx              # learn root
src/App.tsx                     # homepage composition
src/LearnApp.tsx                # learn composition
src/data/product.ts             # new
src/components/                 # new blocks + kept JourneyLoop/ManagementCard/SkillsSection
scripts/capture.mjs             # Playwright capture + og image template shot
public/screenshots/*.webp       # captured proof
public/og-template.html         # OG image source
```

- **Env & gitignore**: capture credentials in `.env.local` (`CAPTURE_EMAIL`, `CAPTURE_PASSWORD`, optional `CAPTURE_BASE_URL`); add `.env.local`, `.superpowers/`, `.capture/` to `.gitignore`.
- **Deploy**: same Cloudflare Pages project; `dist/learn/index.html` must serve at `/learn`; add `_redirects` only if the host requires it.

## 6. Screenshot Capture Plan

`scripts/capture.mjs` (Playwright devDependency): logs in to `CAPTURE_BASE_URL` (default `https://dashboard.terraline.space`, fallback `http://localhost:3000`), persists `storageState` in `.capture/`, captures at 1440×900 (plus one 390×844 mobile frame), writes `.webp` to `public/screenshots/`.

| File | Screen |
| --- | --- |
| `work-items-list.webp` | Project work items list with filters |
| `work-items-board.webp` | Board/kanban layout |
| `work-item-detail.webp` | Work item detail: properties, activity, comments |
| `work-item-types.webp` | Work item types settings |
| `workflow-editor.webp` | Workflow editor: typed states + transitions |
| `services-board.webp` | Services health-first board |
| `services-graph.webp` | Services dependency graph |
| `service-detail.webp` | Service detail with dependencies and linked work |
| `intake.webp` | Triage queue |
| `pages-live.webp` | Page editor with collaboration |
| `galileo.webp` | AI sidebar open on a work item |
| `scheduler.webp` | Scheduler list + run history |
| `analytics.webp` | Analytics dashboard |
| `mobile-work-item.webp` | Phone frame: work item on mobile |

Hero screenshot gets `fetchpriority="high"`; all others lazy with explicit `width`/`height` and descriptive `alt`. The same script renders `public/og-template.html` to regenerate `og-image.png`.

## 7. CTA, Meta, OG

- Primary CTA: `mailto:support@terraline.space?subject=Terraline%20demo%20access` ("Request a demo / access").
- Secondary: anchor to product tour; nav link to `/learn`.
- Title: "Terraline — Open-source IT service management platform"; description derived from the hero sub; OG image regenerated from the product screenshot template.

## 8. Performance & Accessibility

- Screenshots webp + lazy + explicit dimensions; hero preloaded; chunk-split `motion` and `lucide`; no horizontal scroll at 375px.
- Contrast: `--brand-strong` for text-bearing controls; `--brand` only for non-text accents.
- Keyboard-navigable nav/CTAs with visible focus; alt text for every screenshot; reduced-motion respected.

## 9. Verification

1. `npm run build` (tsc + vite) succeeds for both entries; `npm test` and `npm run lint` green.
2. `npm run capture` produces every file in §6 (manual, requires credentials); spot-check alt text and OG image.
3. Claim audit table complete — no claim without a code/spec reference.
4. Visual QA: 1440/1280/390 widths, no horizontal scroll, all screenshots load; `/learn` renders journey + skills unchanged.
5. Deploy check: `/` and `/learn` both 200 on the Pages URL; OG/meta valid.

## 10. Tests

- `tests/product.test.ts` — `product.ts` shape; every feature's screenshot file exists in `public/screenshots/`; CTA hrefs valid.
- `tests/home.test.tsx` — homepage renders hero, facts, features, roadmap, CTA.
- `tests/learn.test.tsx` — `/learn` still renders 8 managements and the skill sections.
- `scripts/capture.mjs` is not part of CI (credentials); documented manual step.

## 11. Risks

- Credentials were exposed in chat — use only via `.env.local`, never commit; rotate the password after capture.
- `dashboard.terraline.space` depends on the local tunnel; fall back to `localhost:3000`, escalate to the user if headless login fails.
- Screenshot drift as the product UI evolves — `npm run capture` is re-runnable and documented.
- Old tests may break when old components move/drop — update `tests/` to keep the suite green.
- Fake-claim risk — mitigated by §2 audit and captions marked as demo data where true.

## 12. Out of Scope

- Product repo README/GitHub presentation, public repo exposure.
- Pricing, testimonials, case studies, blog, analytics/tracking.
- Landing auth/backend, i18n/bilingual, dark mode.
- Any change to `plane-for-itsm` itself.

## Changelog

| Date | Change |
| --- | --- |
| 2026-09-27 | Initial design — repurpose landing for Terraline product credibility; knowledge moves to `/learn`. |
