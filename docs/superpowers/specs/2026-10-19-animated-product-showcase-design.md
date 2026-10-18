# Animated Product Showcase — Design

Date: 2026-10-19
Status: Draft — pending user review
Scope: Replace the product screenshots currently rendered on the Terraline homepage in `terra-landing` with a scroll-synchronized, self-contained animated product window. The `/home/ghifari/plane-for-itsm` checkout is a read-only visual reference and will not be modified.

## Context

The homepage is currently rendered by `src/App.tsx` → `src/components/Tour.tsx`. The active page uses six distinct product screenshot visuals, with the work-items board reused in the hero and first capability section:

| Current visual | Active placement | Planned scene |
| --- | --- | --- |
| `work-items-board.webp` | Hero and Work management | Work queue / board |
| `services-board.webp` | Service catalog | Service health board |
| `services-graph.webp` | Hero service preview | Service dependency graph |
| `galileo.webp` | Knowledge & AI | Work item with Galileo context |
| `cycles.webp` | Delivery | Cycle progress |
| `mobile-work-item.webp` | Delivery & mobile | Mobile work-item update |

`/learn` does not render these product screenshots. The older screenshot-stage files under `src/components/tour/` and `src/data/tour.ts` are not imported by the active `src/App.tsx` route.

The Plane frontend was inspected as the visual and interaction source of truth. Relevant examples include:

- `apps/web/core/components/services/graph/service-graph-canvas.tsx`, `service-node.tsx`, and `use-graph-layout.ts`: service cards, health and incident state, dependency edges, and a left-to-right graph layout.
- `apps/web/core/components/services/workspace/workspace-services-list-view.tsx`: service board/graph view selection.
- `apps/web/core/components/issues/issue-layouts/kanban/default.tsx`: workflow-state board columns.
- `apps/web/core/components/ai/assistant-sidebar/root.tsx`: contextual Galileo panel, prompt, response, and composer.

The product frontend depends on application state, providers, API stores, and translations, so embedding its components in the standalone landing app would add significant runtime coupling. The landing app already has `motion` installed. The Plane checkout also has extensive uncommitted work, so it remains untouched.

## Goal

Replace the active screenshot-based product proof with an original, responsive UI demonstration that stays visually aligned with Terraline's current frontend and does not require image recaptures, an authenticated session, or a live backend.

Success means:

1. No product screenshot is rendered in the active homepage hero or capability showcase.
2. A single product window follows the homepage's product story as visitors scroll.
3. Each current screenshot scene is represented by deterministic, readable UI and restrained motion.
4. Visitors can pause, resume, replay, and navigate the scenes accessibly.
5. The landing page works independently from `plane-for-itsm` and remains responsive with reduced motion enabled.

## Decisions

1. **Page scope** — replace all product screenshots currently rendered by the active homepage. The `/learn` page, currently unmounted screenshot-stage modules, screenshot capture tooling, and unused screenshot files are not part of this change.
2. **Composition** — use one shared product window that changes view as the visitor scrolls through the product story (the user's selected visual direction B).
3. **Source of UI** — create high-fidelity, self-contained scenes in `terra-landing`, guided by current `apps/web` frontend behavior and styles. Do not embed Plane components or use an iframe.
4. **Data** — use deterministic fictional demo records modeled on the current demo workspace. Do not request real product data or connect to the API.
5. **Motion** — use quiet, operational movement: state changes that explain the workflow rather than camera moves or decorative loops.
6. **Playback** — hybrid behavior: each scene plays a short sequence the first time its chapter becomes active; it then settles into a final state. No idle or infinite loop. Provide Pause/Resume and Replay controls.
7. **Mobile** — keep a compact shared product window sticky beneath the site navigation, with a hide/show affordance to return reading space.
8. **Dependencies** — use the existing `motion` dependency; add no animation or graph library.
9. **Product repository** — `plane-for-itsm` is a visual reference only; do not edit its code, assets, configuration, or dirty working tree.

## Experience Design

### Shared page structure

- The hero and four current product capability narratives become one product-story region.
- At wide desktop widths (1024 px and up), explanatory copy and capability chapters occupy the left column; a single dark Terraline app window stays sticky in the right column below the site navigation.
- The window begins on the work-items board in the hero. As the corresponding story chapters become active, that same window transitions through service health/graph, Galileo, and delivery/mobile states.
- The homepage order becomes: navigation → unified hero/product story → platform-facts strip → platform → roadmap → FAQ → CTA → footer. Existing copy and navigation links remain.
- Existing hero screenshot locations and capability screenshot frames are removed. The hero and first capability share the same work-board scene rather than repeating a static capture.

### Scene sequence

| Chapter | Product-window view and motion |
| --- | --- |
| Hero / Work management | A workflow board with Triage, Backlog, and In progress columns. One incident card moves into the response state. |
| Service catalog | Show service health rows, then transition to the dependency graph. Draw the API Gateway → Payment Gateway relationship and update the affected health indicators. Service statuses, criticality, and incident count follow the fields shown in the Plane UI. |
| Knowledge & AI | Show the work item with its context strip and Galileo sidebar. A fixed prompt appears, a short answer types in, and the final response remains visible. No LLM call is made. |
| Delivery & mobile | Show cycle progress advance and a work item update. On wide screens, the final scene includes a small phone view; on narrow screens, the same product window adapts to the compact layout. |

The scenes use recognizable Plane/Terraline structures—workflow columns, service health rails, dependency nodes, context chips, assistant conversation, cycle progress, and mobile work-item controls—without copying application providers or business logic into the marketing site.

Label the frame `Demo workspace` / `Sample data`. Health changes are simulated scene state, not live monitoring, and Galileo's response is prewritten; no element should imply live telemetry or a live AI request.

## Motion and Interaction

- An `IntersectionObserver` tracks which story chapter is active and updates the shared window. The window's chapter navigation also scrolls to the matching copy section.
- When a chapter is first reached, run its one-time sequence over roughly three seconds. If the visitor scrolls back to an already-seen chapter, keep its final state rather than autoplaying again.
- Motion is limited to small product-like changes: card placement, health indicator changes, dependency-edge drawing, response typing, and progress updates. Avoid continuous ambient motion, zooms, large camera pans, and flashes.
- Controls expose Pause, Resume, and Replay with visible keyboard focus and accessible names. A user pause persists across subsequent chapter changes until the user resumes playback.
- Pause the active timeline while the page is hidden; resume it when visible only if the same scene is still active and the visitor has not manually paused. Do not animate an inactive scene.
- With `prefers-reduced-motion: reduce`, show each scene's final state without autoplay, typing, or animated transitions. Chapter selection and the information remain available.
- Keep the scene's labels and essential information in the DOM; do not make motion the only way to discover a status or outcome.

## Responsive Behavior

- **Wide desktop (1024 px and up):** the app window remains sticky beside the scrolling chapter copy and uses a product-scale aspect ratio.
- **Tablet and phone (below 1024 px):** use the selected compact sticky version below the site navigation. Keep the app preview short, provide a hide/show control, and preserve scene and playback controls without horizontal overflow.
- The delivery/mobile chapter can display the phone-oriented work-item state without relying on the old mobile screenshot.
- At very narrow widths, prioritize legible scene content and controls over showing every app-shell detail.

## Component and Data Design

Keep the implementation inside the landing repository. Suggested component boundaries:

- `ProductShowcase` — story-region composition, active chapter, scroll synchronization, visibility handling, and playback state.
- `ProductWindow` — shared app chrome, chapter navigation, scene viewport, and playback controls.
- Scene components — work board, service board/graph, Galileo work item, and cycle/mobile views.
- `product-demo` data — typed, deterministic service/work-item/cycle fixtures and scene timing metadata.

Scene components should accept data through props or typed fixtures and remain presentational. Avoid importing modules from `/home/ghifari/plane-for-itsm`. Reuse the existing product copy in `src/data/product.ts`; do not introduce new feature claims.

## Accessibility, Performance, and Verification

- Use semantic buttons and sections, keyboard-operable chapter and playback controls, visible focus, and concise accessible labels/status text.
- Respect `prefers-reduced-motion`; preserve all key information in the final static states.
- Animate only the active scene and favor transform/opacity for transitions. Avoid video, canvas rendering, network assets, and animation work while offscreen.
- Add meaningful tests for chapter-to-scene mapping, control state, and reduced-motion behavior. Preserve existing tests for homepage content and `/learn`.
- Verify `npm test -- --run` and `npm run build`.
- Inspect desktop and phone widths (1440, 768, 390, and 320 px), including no horizontal overflow, readable labels, sticky/hide behavior, and navigation between chapters.
- Verify auto-play occurs once per chapter, Pause/Resume/Replay work, returning to a viewed chapter does not restart it automatically, hidden-tab playback pauses, and reduced-motion renders a stable final scene.
- Confirm product screenshot files are not requested by the active homepage at runtime. Keep the source image files and capture script untouched unless a later cleanup is requested.

## Out of Scope

- Any edit to `/home/ghifari/plane-for-itsm` or its staged/uncommitted changes.
- Live API data, authentication, iframe embedding, or production app component reuse.
- Updating or deleting screenshots and capture tooling used by inactive modules.
- Reworking `/learn`, landing copy, product claims, or downstream landing sections.
- Adding new animation packages or changing the platform's production UI.

## Changelog

| Date | Change |
| --- | --- |
| 2026-10-19 | Initial design: one scroll-synchronized product window replaces active homepage screenshots; quiet motion and compact sticky mobile mode selected. |
