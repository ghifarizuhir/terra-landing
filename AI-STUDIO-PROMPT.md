# Terraline landing page: Google AI Studio build prompt

How to use: open Google AI Studio, start a new Build app, and paste everything
below the line into the prompt box. Attach `PRODUCT.md` if AI Studio allows
attachments. If you have real product screenshots, upload them. If not, the
prompt tells the model to build a clearly labeled CSS/SVG incident record.

---

# Build: Terraline marketing landing page

## Mission

Build a single-page marketing landing page for Terraline, open-source regulatory
incident management for mid-market financial institutions.

The page must persuade a skeptical IT or compliance buyer with the incident
record the product actually runs today, and recruit the first design partners
for the Malaysia regulator pack. Success means a visitor understands the
reporting problem, sees the incident record that ships today, knows exactly
what is in pilot and what is out of scope, and applies for a design partner
pilot.

## Product facts

Terraline is open-source incident management built for financial institutions
that report outages to a regulator. It runs incident intake, triage, war rooms,
service context, problem and change work, knowledge and reports on one
self-hosted system. It is built on Plane, licensed AGPL-3.0, and deployed with
Docker Compose.

Current capabilities:

- Incident intake with in-app forms and tokenized webhook sources.
- Series deduplication so an alert storm does not become a ticket storm.
- AI triage suggestions with human accept or decline.
- Incident tickets with states, priority, owner, comments, activity, versions,
  attachments, relations and sub-items.
- War rooms with realtime chat, presence, runbook, participants, blast radius
  and an activity timeline.
- Service catalog with ownership, criticality, dependencies and
  incident-derived health.
- Problem, change, request and improvement work types on one shared state set.
- Knowledge base with rich-text pages, versions, comments and Yjs collaboration.
- Reports and analytics with ticket trends, distribution and export.
- Galileo AI assistant and Scheduler with human review.
- Public API v1, MCP and SDK compatibility.
- Self-host with Docker Compose on Postgres and Redis.

Pilot scope, not shipped:

- Malaysia regulator pack for BNM RMiT and the Cyber Security Act 2024.
- Reportability rules for severity, customer impact, duration, third-party
  involvement and data breach.
- Regulator report draft with fields, validation and PDF or Excel export.
- Evidence pack with timeline, classification, impact, root cause, corrective
  actions, approvals and audit log.
- Immutable audit log with actor, timestamp, before and after, export and
  retention.
- KRI dashboard with incident volume, report timeliness, MTTR and overdue
  actions.

Out of scope:

- ServiceNow, BMC, Jira or Freshservice feature parity.
- CMDB, ITOM, APM or AIOps.
- A full GRC suite.
- SLA engine and CAB approval board.
- A native mobile app.
- Any guarantee of audit or regulator approval.

## Audience

Primary: IT managers, service desk leads, CISOs, compliance leads and
operational risk owners at mid-market financial institutions. Bank tier-2 and
below, digital banks, licensed payment/e-money/PSP firms, insurers, takaful
operators and multifinance companies.

They already have an incident process. They need a record that survives a
regulator deadline and an audit review. Their objections are: another tool,
another migration, another compliance claim, and a vendor that promises audit
success.

Secondary: local implementation partners and internal enablement who need a
30-second read of the pilot scope.

## Page job

Landing page. Mode: persuade. One primary action: apply for a design partner
pilot.

## Positioning and honesty rules

- Lead with regulator deadlines, the incident record and audit evidence.
- Treat ITIL as the operating model, never the headline.
- Say "ITIL-aligned", never "ITIL-certified".
- The six ITIL practices ship. Asset management and service configuration are
  reference material in the open knowledge base.
- The Malaysia regulator pack is in pilot. Never present reportability rules,
  report drafts, evidence packs, audit logs or KRI dashboards as shipped.
- Never invent customers, logos, testimonials, pricing, dates, certifications,
  usage metrics, audit outcomes or regulator approvals. If a proof point is
  missing, write `[NEED: evidence]` instead of filling the gap.
- Never quote ITIL or regulator text verbatim.
- Never guarantee an audit or regulator outcome.
- Do not expose codebase internals on the page.
- Monospace IDs are illustration, not proof.

## Required page journey

1. Hero
2. Pilot and platform facts strip
3. Problem: the report clock
4. What ships today
5. Product demo
6. Pilot scope and shape
7. Coexistence
8. Platform and self-host
9. Boundary: shipped, in pilot, out of scope
10. FAQ
11. Final CTA

### 1. Hero

Eyebrow: `Regulatory incident management · Mid-market finance · Self-hosted`

Headline: `Run the incident. Keep the evidence.`

Body: `Terraline gives mid-market banks, digital banks and licensed payment firms one incident record from intake to closure. War rooms, service dependencies, problem follow-up and decision history stay together, so reporting starts from the record your team already keeps.`

Primary CTA: `Apply for a design partner pilot`
Link: `mailto:support@terraline.space?subject=Terraline%20design%20partner%20pilot`

Secondary CTA: `See what ships today`
Link: `#product`

Boundary note: `The first regulator pack is in pilot with 3–5 design partners. The incident record it runs on ships today.`

Hero object: an incident file, not an abstract illustration. Build it with
HTML and CSS.

```
INCIDENT FILE · INC-2041
Payment gateway outage
Critical · In progress · Payments

Started 09:12 · 18 events · 4 decisions · 2 versions
Service: Payment Gateway (Critical)
Impact: checkout errors, 12,400 failed transactions
Evidence: timeline, comments, versions, related incidents

Timeline
09:12  Incident opened from alert webhook
09:18  War room opened
09:24  Rollback approved
09:41  Service restored

In pilot: Reportable? · 2h window · Evidence pack

Sample data · Product illustration
```

The incident file should feel like an operational artifact: a paper record
clipped to a graphite console, a hazard-yellow edge, a vertical timeline with
colored lamps, and a separate `In pilot` strip for the regulator fields. Do not
use a screenshot or a stock image.

### 2. Facts strip

Show six plain facts in a thin strip:

- First corridor: Malaysia
- BNM RMiT + Cyber Security Act 2024
- 4–6 week pilot
- 3–5 design partners
- Self-hosted · AGPL-3.0
- Built on Plane

### 3. Problem

Heading: `The report clock starts before the record is clean.`

Body: `A reportable incident arrives as an alert, a chat thread, a spreadsheet and three versions of the truth. The regulator asks what happened, when you knew and what you changed. The team rebuilds the answer after the outage.`

Three cards:

- `Deadlines are short.` `Malaysia's RMiT and Cyber Security Act 2024 set notification windows measured in hours.`
- `Evidence is scattered.` `Timelines live in chat. Decisions live in email. Service impact lives with one person.`
- `Audit asks for proof.` `Who decided what, when, and on which service. The record has to answer before the meeting.`

Add a small source note: `Regulatory detail is a summary, not legal advice. Confirm current requirements with your compliance team.`

Before publishing, have legal verify the regulator references and any deadline
numbers.

### 4. What ships today

Heading: `The incident record is already here.`

Body: `Before the regulator pack, Terraline runs the operational record the report depends on.`

Six cards:

- `Intake that survives an alert storm.` `Webhook sources, series deduplication and AI triage suggestions with human accept or decline.`
- `One incident record.` `States, priority, owner, comments, activity, versions, attachments and relations on the same ticket.`
- `A war room with a timeline.` `Realtime chat, runbook, participants and blast radius for major incidents.`
- `Service context.` `Ownership, criticality and dependencies beside the incident, so impact is visible before a change.`
- `Problem, change and knowledge.` `Recurring incidents link to root-cause work, affected services and known errors.`
- `Reports and export.` `Ticket trends, distribution and export for the people who ask for numbers.`

### 5. Product demo

Heading: `See the record at work.`

Body: `The demo workspace runs the real flows: intake, triage, service context, knowledge and reports. Step through the chapters or use the slides.`

Use a product window mock built with CSS and SVG. Do not use stock photos or
fake customer logos. Label it `Demo workspace · Sample data`.

Four scenes:

1. `Intake & triage` — `Triage every reportable incident in one queue.`
   Incidents, requests and change tasks keep their own fields and vocabulary
   while sharing states, comments and history.

2. `Service context` — `Know the service and the blast radius.`
   Ownership, criticality and dependencies sit beside the incident, so impact
   is visible before a change or during a response.

3. `Evidence & AI` — `Keep the timeline and the decisions.`
   Runbooks, postmortems and comments live next to the work. Galileo drafts
   from the item on screen; a person reviews every draft.

4. `Reports & delivery` — `Turn the record into numbers.`
   Cycles, saved views and analytics cover the work that continues after the
   incident closes.

### 6. Pilot scope

Heading: `The regulator pack is built with design partners.`

Body: `We are building the first corridor pack for BNM RMiT and Malaysia's Cyber Security Act 2024 with 3–5 licensed financial institutions. The pilot proves one reportable incident end to end.`

Scope cards, each labeled `In pilot`:

- `Reportability rules` `Severity, customer impact, duration, third-party involvement and data breach thresholds.`
- `Regulator report draft` `Fields, validation, PDF or Excel export, version and submission status.`
- `Evidence pack` `Timeline, classification, impact, root cause, corrective actions, approvals and audit log.`
- `Immutable audit log` `Actor, timestamp, before and after, export and retention.`
- `KRI dashboard` `Incident volume, report timeliness, MTTR and overdue actions.`

Pilot shape: `4–6 weeks` · `One reportable incident end to end` · `Compliance crosswalk` · `Local implementation partner` · `Success criteria before kickoff`

CTA: `Apply for a design partner pilot`

### 7. Coexistence

Heading: `Keep the tools you already run.`

Body: `Terraline starts with the incident record. Your service desk, monitoring and delivery tools keep doing their jobs. Integrations with Jira, ServiceNow, email, Teams and monitoring are next on the roadmap.`

Two cards:

- `If you run Jira or Freshservice.` `Terraline adds the compliance record above the tool your team already uses.`
- `If you run Excel and email.` `Terraline gives the incident process a system with a timeline and an owner.`

### 8. Platform

Heading: `Keep the records in your own infrastructure.`

Body: `Terraline is AGPL-3.0 and self-hosts with Docker Compose on Postgres and Redis. Run it in your data center or a region you choose. AI requests go to the LLM endpoint you configure.`

Facts: `Rust Axum API` · `Postgres + Redis Stream` · `Yjs live collaboration` · `Public API v1` · `Built on Plane` · `AGPL-3.0`

Add: `SaaS in a country region is planned for teams that cannot self-host.`

### 9. Boundary

Heading: `What ships. What is in pilot. What we leave out.`

Body: `No dates, no promises. The boundary is part of the product.`

Three columns:

Shipped today:

- Incident intake, dedup and triage
- War rooms
- Service catalog and dependencies
- Problem, change, request and knowledge
- Reports and export
- Galileo AI and Scheduler
- Self-host, AGPL, API v1

In pilot:

- Malaysia regulator pack
- Reportability rules
- Regulator report draft
- Evidence pack
- Immutable audit log
- KRI dashboard
- 3–5 design partner pilots

Out of scope:

- ServiceNow parity
- CMDB, ITOM, APM, AIOps
- Full GRC suite
- SLA engine and CAB board
- Native mobile app
- Audit or regulator guarantees

### 10. FAQ

Heading: `Before you deploy.`

Q: `Is Terraline ITIL-certified?`
A: `No. ITIL is the operating model behind the incident, problem and change practices. We do not claim certification.`

Q: `Which regulator pack comes first?`
A: `The first corridor is Malaysia: BNM RMiT and the Cyber Security Act 2024. It is in pilot with design partners. Saudi is the alternative corridor.`

Q: `Does Terraline file the report for us?`
A: `Reportability rules and report drafts are in the pilot scope. Today the product keeps the incident record, timeline, decisions and service context the report is built from.`

Q: `Do we have to replace our current service desk?`
A: `No. Start with the incident record. Integrations with existing tools are next on the roadmap.`

Q: `Can we self-host?`
A: `Yes. AGPL-3.0, Docker Compose, Postgres and Redis.`

Q: `Do you guarantee we pass an audit?`
A: `No. Terraline gives you a defensible record and evidence. The audit outcome depends on your controls, not a software claim.`

Q: `What does the pilot cost?`
A: `Pilot pricing is scoped with each design partner. We agree success criteria before kickoff.`

Q: `How long is the pilot?`
A: `4–6 weeks, with one reportable incident run end to end.`

### 11. Final CTA

Heading: `Bring one reportable incident.`

Body: `We will map it to the incident record, the evidence it leaves behind and the regulator deadline you have to meet.`

Button: `Apply for a design partner pilot`
Link: `mailto:support@terraline.space?subject=Terraline%20design%20partner%20pilot`

Secondary: `See what ships today` (anchor to `#product`)

Footnote: `First corridor: Malaysia · 3–5 design partners · Self-hosted or in-country deployment`

## Visual direction

World: architectural ledger crossed with an incident control room. Warm paper,
graphite console, hazard-yellow tape, lamps, rails and clipped files. Quiet,
precise, engineered. No generic SaaS gradients, floating orbs, glassmorphism, or
stock photography.

Design tokens:

- Paper background: `#F6F4EF`
- Panel: `#FBFAF7`
- Subtle fill: `#EFEAE0`
- Ink: `#0C0E12`
- Muted text: `#4B5260`
- Border: `#DCD8CE`
- Hazard yellow: `#E7B400`
- Console dark: `#0C0E12` and `#1B2230`

Status colors:

- Shipped: emerald `#10B981`
- In pilot: amber `#F59E0B`
- Out of scope: slate `#64748B`
- Incident: red `#EF4444`

Typography: Google Fonts.

- Display: `Bricolage Grotesque`, weights 400 to 700.
- Body: `IBM Plex Sans`, weights 400 to 700.
- Mono: `IBM Plex Mono`, weights 400 to 600. Use for eyebrows, IDs and labels.

Layout notes:

- Max content width around 1200 to 1280px.
- Numbered section labels in mono, like a technical register.
- Thin rules, paper grid background, registration marks, hazard-tape accents,
  rail and lamp motifs.
- The incident file is the hero. Build it with HTML/CSS/SVG, not an image.
- Motion is restrained: lamp pulse, subtle scene changes, no parallax.
- Respect `prefers-reduced-motion`.

## Build constraints for AI Studio

- Build a single-page React app with TypeScript and Tailwind if the environment
  supports it. Otherwise produce one self-contained HTML file with CSS and JS.
- No backend, no auth, no database, no Gemini API calls, no analytics. The only
  action is the pilot mailto link and in-page anchors.
- Keep all page copy in a `content.ts` data file or a clearly grouped constant at
  the top of the file so it is easy to edit.
- Use `lucide-react` for icons if available. Otherwise use inline SVG. Do not use
  emoji.
- Load fonts from Google Fonts. Provide system font fallbacks.
- Build the incident file and product window with CSS/SVG. Do not generate or
  hotlink images.
- Ensure no horizontal scroll at 390px, 768px, 1280px and 1440px.
- Use semantic headings in order, visible focus states, AA contrast, descriptive
  alt text and aria labels on interactive scene tabs.
- Add page title, meta description, canonical, Open Graph and Twitter meta tags.
  Title: `Terraline: regulatory incident management for mid-market finance`
  Description: `One incident record from intake to closure, built for regulator reporting deadlines. Self-hosted, AGPL-3.0, with the first Malaysia regulator pack in pilot.`
- Keep the first render fast. No heavy animation libraries or video.

## Copy rules

- English, operational, plain, specific.
- Prefer outcomes over features and facts over superlatives.
- One idea per section. One or two punchy lines per page, not every line.
- No AI tells: no "it's not X, it's Y", no negation lists, no "the result?"
  reveals, no stock openers, no em dashes in headlines or CTAs.
- If a sentence would work unchanged on a competitor's site, rewrite it or flag
  the missing differentiator.
- Keep the boundary honest. "In pilot" is a feature of the page, not a
  disclaimer to bury.

## Non-goals

No pricing page, blog, dashboard, login, fake social proof, or invented roadmap
dates. Do not redesign the positioning. Do not add practices outside the eight.
Do not present pilot features as shipped.

## Acceptance checklist

- A visitor can state the problem in one sentence: regulator reporting deadlines
  and scattered incident evidence.
- A visitor can name what ships today and what is in pilot.
- The incident file is the strongest object in the first viewport.
- ITIL appears as the operating model, not the headline.
- One primary CTA, repeated in the hero and the final section.
- The page works on a 390px phone with no horizontal scroll.
- Every claim is traceable to the facts above.
- The page reads like an operator wrote it, not a language model.
