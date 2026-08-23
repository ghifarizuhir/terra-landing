# Design Doc — Terra Landing: Journey Timeline Showcase

**Date:** 2026-08-24  
**Project:** terra-landing (greenfield, currently 0 entries)  
**Context:** Terra Service Management — AI for ITSM, entity-graph unification (ITIL4-aligned)  
**Reference:** `terra-service-management/docs/PRODUCT.md`, `business-capabilities.md` (observational 2026-08-14), `CHEAT-SHEET.md`

---

## 1. Goal & Scope

**Purpose:** Showcase portfolio — memperkenalkan Terra sebagai platform AI for ITSM kepada audience eksternal (calon customer, partner, investor) dengan cerita yang kohesif, bukan katalog modul terpisah.

**Success criteria:**
- Visitor paham dalam 30 detik: Terra = 8 managements dalam 1 graph + AI skills per management.
- Visitor bisa menjelaskan alur lifecycle: Incident → Problem/RCA → Change → Knowledge → Improvement, dengan Asset & Service Map sebagai backbone.
- Tiap management punya bukti faktual (capability dari kode) + badge AI skill yang relevan — tidak ada klaim kosong.
- Mobile tetap readable (vertical timeline), desktop delights dengan loop animation.

**Out of scope (YAGNI):**
- Pricing, testimonials, case studies (belum ada data — PRODUCT.md: jangan fabrikasi).
- Auth, multi-tenant, realtime — landing adalah static site.
- Backend fetch — semua konten statis dari `managements.ts`.

---

## 2. Decision — Approach Chosen

**Chosen: Approach A — Journey Timeline Loop (Recommended)**

Alternatif yang dipertimbangkan:
- **B — 4 Pillars ITIL-aligned** (OPERATE/ANALYZE/EVOLVE/FOUNDATION): scan-able tapi kurang tunjuk USP linking.
- **C — 8-Card Equal Grid**: simpel tapi terlihat katalog biasa.

Alasan pilih A: satu-satunya yang memvisualisasikan "one graph, not silos" — core positioning Terra. Loop menjelaskan kenapa 8 modul bukan 8 tools terpisah, dan natural untuk attach AI skills per node.

---

## 3. Information Architecture

### 3.1 Page Outline (top → bottom)

1. **Hero** — Headline: "Terra — AI for ITSM, One Graph Not Silos" + sub: "8 managements, one entity graph, AI skills for every step." + CTA (Request Demo / Explore Journey) + mini Pulse dashboard preview (cards + 14-day heatmap mock).
2. **Journey Loop (hero of the page)** — 8 managements dalam loop visual (lihat §3.2).
3. **Skills Layer (attached + aggregate)** — badge skill per card + section "5 Default Agent Skills" grid di bawah loop.
4. **Entity-Graph Proof** — visualisasi `entity_links` (5 relasi: parent, depends_on, relates_to, caused_by, resolved_by) + cross-cutting capabilities (comments, timeline, versions, reviews) sebagai bukti traceability.
5. **CTA** — "Bring your ITSM into one graph" + footer.

### 3.2 Journey Order & Grouping

**Cycle (top loop, 5 steps):**
```
Incident (INC-) ──→ Problem + RCA (PRB-)
     ↑                      ↓
Improvement (IMP-) ← Knowledge (KB-) ← Change (CHG-)
     ↑ (feedback loop: recurring incident → new problem)
```

**Parallel lane (offshoot, visual kecil di samping Incident):**
- Service Request (REQ-) — intake jalur paralel, tidak harus dari incident.

**Foundation layer (di bawah loop, selalu visible, 2 cards lebar):**
- Service Map (CI-) — CI graph, dependencies directed, impact analysis `GET /cis/:id/impact`
- Asset Management (AST-) — inventory + optional `ciId` linkage

Foundation tidak ikut siklus tapi menopang loop — menjelaskan "Asset vs CI distinction" (CHEAT-SHEET.md §3).

---

## 4. Content Spec per Management

Semua konten diambil dari fakta kode (`business-capabilities.md`), bukan marketing fluff. Setiap card berisi: icon, prefix badge monospace, judul, one-liner, 2–3 bullet capability, footer badge AI skill.

### 4.1 Incident Management — `INC-` (red)
- **One-liner:** "Detect & Respond in minutes, not hours"
- **Capabilities:** isWarRoom, detectionSource/impactLevel/detectedAt/closedAt, recurrence tracking (incident_recurrences, recurrenceCount/lastRecurredAt, filter `recurring=true`), impact lookup via Service Map, export CSV.
- **AI Skills:** Security Audit + Description Quality (audit high-priority, fix deskripsi <50 char — Pulse Advisor rule).

### 4.2 Service Request Management — `REQ-` (sky)
- **One-liner:** "Intake without the ticket hell"
- **Capabilities:** requestType (access/provisioning/info/service_catalog/hardware/other), requesterName/Contact, targetDate (validasi tidak di masa lalu), filter overdue/targetDateFromTo, export CSV, bulk delete `PATCH /requests/bulk`.
- **AI Skills:** Description Quality + Compliance.
- **Note:** Approval single-stage disebut di README/PRODUCT.md tapi tidak ada endpoint approval di kode — jangan klaim fitur approval otomatis; tampilkan sebagai "intake & tracking" saja.

### 4.3 Problem Management & RCA — `PRB-` (purple) + RCA sub-resource
- **One-liner:** "Find root, not just symptoms"
- **Capabilities:** severity, firstObservedAt, RCA sub-resource (tanggalInsiden, durasiInsiden, severity, komponenTerdampak, kategoriRootCause 8 enum, whatHappened/rootCause/contributingFactors), status draft/published, published RCA jadi sumber auto-derive Knowledge via `derive-fields.ts`.
- **AI Skills:** RCA Completeness (utama).

### 4.4 Change Management — `CHG-` (amber)
- **One-liner:** "Ship safely, verify continuously"
- **Capabilities:** riskLevel (critical/high/medium/low), environment, version, monitoringPeriodDays default 3, change_goals (evaluationStatus achieved/partial/not_achieved + evaluatedAt), change_checkpoints (normal/warning/anomaly + notes), export CSV.
- **AI Skills:** Compliance + Description Quality.

### 4.5 Knowledge Management — `KB-` (indigo)
- **One-liner:** "Every fix becomes reusable knowledge"
- **Capabilities:** kb_type 7 enum (runbook/troubleshoot/sop/faq/postmortem/onboarding/reference), env scope, knowledge_sections (heading + sortOrder), sourceProblemId/sourceChangeId, export CSV, report DOCX/PDF.
- **AI Skills:** Description Quality + Compliance.

### 4.6 Improvement Management — `IMP-` (emerald)
- **One-liner:** "Continuous improvement, actually tracked"
- **Capabilities:** source 6 enum (monitoring/post_incident/audit/retro/user_feedback/other), dueDate, effort s/m/l/xl vs actualEffort, voting via `entity_reactions` (unique per entity+user), filter overdue/dueDate range, export CSV.
- **AI Skills:** Description Quality.

### 4.7 Asset Management — `AST-` (blue)
- **One-liner:** "Know what you own"
- **Capabilities:** asset_kind, location, environment, acquiredAt, optional `ciId` link to CI, export CSV.
- **AI Skills:** — (tidak ada native; highlight bridging Asset ↔ CI).

### 4.8 Service Map (CMDB) — `CI-` (slate)
- **One-liner:** "See dependencies, predict impact"
- **Capabilities:** configuration_items (name, ci_kind server/service, environment, hostname, status active/maintenance/retired, metadata JSON), ci_dependencies (directed, unique + anti self-dependency), application_ci_links (role), impact analysis `GET /cis/:id/impact`, filter status/kind, ci_reviews.
- **AI Skills:** CI Description Quality (skill khusus CI, entityType=CI).

### 4.9 Cross-cutting Proof — Entity Graph
- **Message:** "Anything can link to anything"
- **Capabilities:** entity_links (5 relations), comments (soft-delete, edit-tracked), timeline, versions (snapshot + revert), reviews (security_audit/description_quality/rca_completeness/compliance), attachments, reactions, SSE realtime — bukti traceability & one-graph.

---

## 5. AI Skills Mapping — Per Management (Aggregate)

**5 Default Skills (seed per org via `GET /api/skills`):**
1. Security Audit (entity) — untuk Incident/Change
2. Description Quality (entity) — untuk semua entity types (Incident, Problem, Change, Improvement, Knowledge, Asset, Request)
3. RCA Completeness (entity) — untuk Problem
4. Compliance (entity) — untuk Change/Knowledge
5. CI Description Quality (CI) — untuk Service Map

**Display strategy:**
- **Per-card badge:** tampilkan 1–2 skill relevan di footer card (pill dengan icon ✨ + label skill).
- **Aggregate section:** grid 5 cards di bawah loop, masing-masing dengan: name, entityType, reviewType, instructions preview, welcomePrompts hint. CTA: "Create custom skill" → link ke `/skills` (di app utama).

**Dispatch & Advisor (secondary, bukan focus landing):**
- Dispatch cron jobs per team (cronExpression, prompt, skillId, targetEntityType/Id) — sebut singkat sebagai "automation".
- Pulse Advisor (deterministik, 4 rules: knowledge/quality/recurring/linking) — sebut sebagai "AI suggestions on Pulse" di Hero preview.

---

## 6. Visual & Interaction Design

### 6.1 Design Tokens
- **Colors:** Entity-type palette resmi (PRODUCT.md §Brand Commitments) + zinc/slate neutrals untuk background. Hero gradient dari slate ke zinc, loop garis pakai warna entity saat active.
- **Typography:** Inter/Geist Sans untuk body, JetBrains Mono untuk prefix/ID badge (monospace `INC-202501-003` style). Voice English concise.
- **Iconography:** lucide-react (konsisten dengan `apps/web`).

### 6.2 Layout — Desktop (≥1024px)
- Hero 2-column (copy left, Pulse mock right).
- Journey Loop: SVG loop path dengan 5 nodes siklus di atas (card size ~280px), foundation 2 cards di bawah full-width. Garis dotted + arrowhead, center ada mini graph animasi (nodes pulsing).
- Card: hover → scale 1.02 + colored glow + elevated shadow. Click → expand modal/drawer dengan detail lengkap (semua bullets + contoh ID + link ke docs).
- Skills: badge pill di card footer; aggregate grid 3-col di bawah loop.

### 6.3 Layout — Mobile (<1024px)
- Journey Loop collapse → vertical timeline (left line + dot berwarna entity, cards stack kanan). Foundation jadi section terpisah di bawah timeline (2 cards stack). Tidak ada horizontal scroll.
- Hero jadi single column.

### 6.4 Motion
- Framer Motion: loop entrance stagger (0.08s per card), scroll reveal (whileInView), hover micro-interaction. Tidak over-animated; respects `prefers-reduced-motion`.

### 6.5 Accessibility
- Semua warna entity punya contrast check (text white/black sesuai).
- Keyboard navigable (tab through cards), aria-label untuk timeline.
- ID badges pakai `font-mono` + `tracking-tight`.

---

## 7. Technical Design — terra-landing

### 7.1 Stack
- **Framework:** Vite 6 + React 19 + TypeScript
- **Styling:** Tailwind 4 + shadcn/ui (reuse tokens dari `apps/web`)
- **Animation:** Motion (framer-motion)
- **Routing:** Single page dengan anchor nav (no React Router needed; optional: TanStack Router jika multi-page nanti)
- **Data:** Static `src/data/managements.ts` — array 8 obj (id, prefix, title, oneliner, bullets, skills, color). Tidak fetch API.
- **Build:** `npm run build` → `dist/` static; deploy ke Cloudflare Pages / Vercel.
- **Lint/Format:** ESLint + Prettier (ikut pattern `terra-service-management`).

### 7.2 File Structure
```
terra-landing/
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── src/
│   ├── main.tsx
│   ├── app.tsx                         # single page composition
│   ├── data/
│   │   └── managements.ts              # 8 managements + skills mapping
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── JourneyLoop.tsx             # desktop loop SVG + mobile timeline switch
│   │   ├── ManagementCard.tsx          # variant per entity color
│   │   ├── SkillsSection.tsx           # aggregate 5 skills grid
│   │   ├── EntityGraphProof.tsx        # mini graph viz
│   │   ├── PulsePreview.tsx            # hero mock
│   │   └── Footer.tsx
│   └── lib/
│       └── cn.ts                       # shadcn utils
└── public/
    └── favicon.svg
```

### 7.3 Components — Responsibility
- `JourneyLoop.tsx`: decides desktop vs mobile via `useMediaQuery`; renders SVG path + positioned `ManagementCard`s.
- `ManagementCard.tsx`: props: `prefix`, `title`, `oneliner`, `bullets`, `skills`, `color`, `icon`; handles hover/expand.
- `SkillsSection.tsx`: renders 5 default skills grid + custom CTA.
- `EntityGraphProof.tsx`: lightweight SVG graph (no D3, just positioned divs + lines).

### 7.4 Deployment
- Static only. Env tidak diperlukan. CI: `npm run build` + `npm run lint` (jika ada). Host: Cloudflare Pages (recommended, align dengan platform expectation) atau Vercel.

---

## 8. Open Questions (resolved)

- Q: Tampilkan 8 lengkap atau core saja? → A: 8 lengkap (user confirmed).
- Q: Struktur? → A: Journey timeline loop (user confirmed).
- Q: Skills yang dimaksud? → A: AI Agent Skills Terra spesifik per management (user confirmed).

---

## 9. Next Step — Implementation Plan

Setelah spec ini disetujui, invoke `writing-plans` skill untuk breakdown plan:
- Phase 1: Scaffold Vite + Tailwind + shadcn + data layer
- Phase 2: Hero + PulsePreview
- Phase 3: JourneyLoop (desktop + mobile) + ManagementCard (8 variants)
- Phase 4: SkillsSection + EntityGraphProof + Footer
- Phase 5: Motion polish + responsive QA + build

---

## Revision History
- 2026-08-24: Initial design (Journey Loop, 8 managements, per-management AI skills mapping).
