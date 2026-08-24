// src/data/managements.ts — Terra — AI for ITSM: clear knowledge + real AI skills (full writing-skills format) per management.
export type SkillDetail = {
  name: string
  description?: string // frontmatter Use when... — for CSO, third-person
  overview: string
  whenToUse: string | string[] // string for short, string[] for full with symptoms
  whenNotToUse?: string
  corePattern?: { before: string; after: string }
  quickReference?: { headers: string[]; rows: string[][] }
  how: string // Implementation
  commonMistakes?: string[] // what goes wrong + fixes
  example?: string
}
export type Management = {
  id: string
  prefix: string
  title: string
  oneLiner: string
  bullets: string[]
  skills: SkillDetail[]
  color: string
  icon: string
  order: number
  lane: 'cycle' | 'parallel' | 'foundation'
}

export const managements: Management[] = [
  {
    id: 'incident', prefix: 'INC-', title: 'Incident Management', oneLiner: 'Restores disrupted service as fast as possible while keeping users informed',
    bullets: [
      'Detects, logs, categorizes and prioritizes incidents by impact and urgency',
      'Restores service via escalation and war-room, communicates progress',
      'Closes with handover to problem and knowledge to prevent recurrence',
    ],
    skills: [
      {
        name: 'Auto-triage & priority',
        description: 'Use when incidents have inconsistent priority, wrong team assignment, or triage queue grows faster than humans can read',
        overview: 'Auto-triage is a reference skill for suggesting priority and assignee from incident text and history. Core principle: history is the training data — past incidents with similar titles taught the model what “P1 + Payments” looks like, so the next “timeout 504” does not need a human to guess. It is a technique, not a rule: the AI suggests, the human confirms.',
        whenToUse: [
          'New incident with short or vague title (“checkout error”, “slow”) — priority is guessed',
          'Queue >10 un-triaged incidents — human reader cannot keep up',
          'Recurring “urgent” that is actually low — P-levels are inconsistent across triagers',
          'Wrong team assigned — incident bounces 2–3 times before correct team',
          'When NOT to use: incident already has a clear runbook match with a fixed priority (use the runbook), or when confidence <0.6 — ask, do not guess',
        ],
        corePattern: {
          before: '// Before: manual triage — human reads, guesses\nfunction triage(incident) {\n  // “504 checkout” → human guesses P2, assigns Network (wrong)\n  return { priority: guess(), team: guess() }\n}',
          after: '// After: AI suggests, human confirms\nfunction triage(incident) {\n  const suggestion = suggestFromHistory(incident, last90Days) // {priority: "P1", team: "Payments", confidence: 0.82}\n  // Human sees confidence, confirms or overrides — audit trail kept\n  return suggestion.confidence > 0.7 ? suggestion : askClarifying(incident)\n}',
        },
        quickReference: {
          headers: ['Signal', 'Action', 'Threshold'],
          rows: [
            ['Title embedding ≥0.75 + same app', 'Suggest same priority/team', 'confidence ≥0.7'],
            ['Confidence 0.6–0.7', 'Ask 1 clarifying question (2–4 options)', 'human picks'],
            ['Confidence <0.6', 'Do not suggest — leave for human', 'avoid false triage'],
            ['Prod + “timeout 504”', 'Bias to P1', 'history shows 90% P1'],
          ],
        },
        how: 'Implementation: embedding similarity (text-embedding-3-small) against last 90 days, plus keyword match on “timeout”, “down”, “504”. Input: incident title + description. Output: {priority: P1–P4, team, confidence, reason}. Pattern: suggest, never auto-assign. Store suggestion + human decision for audit. Keep prompt short — title is the signal, description is context. Common pitfall: trusting a single keyword without history; always check confidence.',
        commonMistakes: [
          'Auto-assigning without human confirm → wrong team gets woken at 2am. Fix: suggestion only, human confirms.',
          'Keyword alone (“urgent” → P1) → over-triage. Fix: require embedding + history.',
          'Ignoring confidence → low-confidence suggestions treated as truth. Fix: threshold 0.7, below that ask.',
        ],
        example: 'INC “Checkout timeout 504” → embedding matches 3 similar P1s in 7 days to Payments (overlap 0.82) → suggests “P1 — Payments, 0.82 — because 3 similar P1s”. Human confirms in one click.',
      },
      {
        name: 'War-room summarization',
        overview: 'Condenses a noisy incident timeline (dozens of comments, status changes) into a 3-bullet handover that a newcomer can read in 30 seconds.',
        whenToUse: 'Use when an incident has >10 comments, when a shift handover happens, or when a war-room is active. Symptoms: long scroll, “what happened so far?” asked repeatedly, duplicate questions.',
        how: 'Summarizes comments chronologically in 3 parts: what happened, current impact, next action. Input: timeline. Output: 2–3 sentences, no recommendations. Source is verbatim comments, so nothing is invented.',
        example: '200-comment incident → “Payment gateway 504 since 09:12, 12 orders affected, rollback to v2.3 in progress — ETA 09:40.”',
      },
    ],
    color: 'bg-red-500', icon: 'Siren', order: 1, lane: 'cycle'
  },
  {
    id: 'request', prefix: 'REQ-', title: 'Service Request Management', oneLiner: 'Fulfills approved user needs through a service catalog — not a disruption',
    bullets: [
      'Offers catalog for access, hardware, info and provisioning requests',
      'Validates, routes and fulfills from intake to delivery with due date',
      'Keeps requests separate from incidents — different urgency, different flow',
    ],
    skills: [
      {
        name: 'Intent classification',
        overview: 'Decides whether incoming text is a service request or an incident, and which catalog item it maps to. Prevents requests being misfiled as incidents (and vice versa).',
        whenToUse: 'Use when a user writes free-text (“need laptop”, “cannot login”) and the intake form is ambiguous. Symptoms: requests in incident queue, incidents treated as requests, wrong SLA applied.',
        how: 'Classifies text into request_type (access/hardware/info/provisioning/…) vs incident. Confidence threshold 0.7; below that, ask one clarifying question with 2–4 options.',
        example: '“Need MacBook for new hire Budi, start 2026-09-01” → request_type hardware, confidence 0.91.',
      },
      {
        name: 'Auto-routing',
        overview: 'Routes a validated request to the correct fulfillment team and suggests a realistic due date.',
        whenToUse: 'Use when a request is approved and needs assignment. Symptoms: requests sit unassigned, wrong team gets hardware requests, due dates are guessed.',
        how: 'Matches catalog item + requester department + history to owner team. Suggests targetDate based on past fulfillment time for that type. Human approves routing.',
        example: 'Hardware request from Engineering → auto-routes to Workplace team, suggests targetDate 7 days (median for hardware).',
      },
    ],
    color: 'bg-sky-500', icon: 'ClipboardList', order: 0, lane: 'parallel'
  },
  {
    id: 'problem', prefix: 'PRB-', title: 'Problem Management', oneLiner: 'Finds the cause behind repeating incidents so they stop recurring',
    bullets: [
      'Clusters similar incidents to spot patterns (≥3 similar in 7 days)',
      'Investigates root cause and contributing factors, records RCA',
      'Links findings to knowledge so fixes outlive the incident',
    ],
    skills: [
      {
        name: 'Pattern clustering',
        overview: 'Finds groups of similar incidents that should become a problem. Surfaces recurrence before it becomes obvious.',
        whenToUse: 'Use when ≥3 incidents in 7 days share the same app and title overlap ≥0.6, or when an incident is marked “recurring”. Symptoms: same error every week, no problem created, reactive firefighting.',
        how: 'Title embedding cosine similarity + same appId. Clusters flagged in Pulse (“3 similar in 7 days → create Problem”). Does not auto-create; suggests.',
        example: '3× “DB timeout 500” on APP-004 in 5 days → cluster score 0.78 → suggestion: “Create PRB — DB capacity”.',
      },
      {
        name: 'RCA draft assist',
        overview: 'Drafts a root-cause analysis from a cluster of linked incidents, ready for the engineer to edit.',
        whenToUse: 'Use when a problem has 2+ linked incidents and RCA is empty. Symptoms: blank RCA, “what happened” repeated manually, inconsistent RCA structure.',
        how: 'Summarizes linked incidents into RCA sections: whatHappened, rootCause, contributingFactors, duration. Human edits and publishes (draft → published). Source is linked incidents, so no invented facts.',
        example: 'Linked 4 incidents → draft: “What happened: DB pool exhausted at 09:12, 12 orders failed…”',
      },
    ],
    color: 'bg-purple-500', icon: 'SearchX', order: 2, lane: 'cycle'
  },
  {
    id: 'change', prefix: 'CHG-', title: 'Change Management', oneLiner: 'Controls changes to services and infrastructure and verifies they hold',
    bullets: [
      'Plans change with risk, intent and rollback — not just deploy',
      'Verifies outcome after deployment during monitoring period',
      'Holds or rolls back when monitoring shows warning or anomaly',
    ],
    skills: [
      {
        name: 'Risk scoring',
        overview: 'Scores a planned change as low/medium/high/critical before it is approved, so reviewers know where to look.',
        whenToUse: 'Use when a change is created, especially for production or with a short description. Symptoms: every change marked “medium”, prod changes with 10-word description, no risk signal.',
        how: 'Checks description length (<50 chars → warn), env (prod → higher), and linked incidents. Short prod change with linked incidents → high/critical. Suggests, not blocks.',
        example: 'Change “Update DB” 12 words, env prod, linked to 2 incidents → scored high, suggests adding rollback steps.',
      },
      {
        name: 'Impact prediction',
        overview: 'Predicts which services and apps will be affected if this change is deployed.',
        whenToUse: 'Use when a change touches a CI that has dependencies. Symptoms: “we didn’t know it would break X”, blast radius discovered after deploy.',
        how: 'Traverses Service Map (CI dependencies) from the touched CI downstream. Lists affected apps/CIs with distance. Input: CI id. Output: impact list.',
        example: 'Change on CI-042 (payment-api) → predicts impact: APP-004 Checkout, CI-017 DB, CI-089 cache.',
      },
    ],
    color: 'bg-amber-500', icon: 'GitBranch', order: 3, lane: 'cycle'
  },
  {
    id: 'knowledge', prefix: 'KB-', title: 'Knowledge Management', oneLiner: 'Makes every fix reusable at the moment of need',
    bullets: [
      'Captures runbooks, troubleshooting guides and postmortems as structured articles',
      'Makes knowledge findable inside the incident — not after',
      'Evolves articles from real resolutions, not theory',
    ],
    skills: [
      {
        name: 'Resolution → article',
        overview: 'Generates a knowledge article draft from a closed problem or change resolution.',
        whenToUse: 'Use when a problem RCA is published or a change is marked achieved. Symptoms: fixes stay in comments, same incident solved from scratch, KB stays empty.',
        how: 'Prefills title, kbType and sections from published RCA or change goals. Human reviews and publishes. Synthetic demo data is labeled as such.',
        example: 'Published RCA “DB pool fix” → draft KB “Runbook: DB pool exhausted — increase maxPool to 50” (kbType runbook).',
      },
      {
        name: 'Search relevance',
        overview: 'Suggests the right KB article when a similar incident is opened.',
        whenToUse: 'Use when a new incident is created. Symptoms: “is there a runbook for this?”, repeated manual search, link suggestions missed.',
        how: 'Embedding similarity between incident title/description and KB sections. Surfaces top 3 with score. No auto-link; suggests.',
        example: 'New incident “504 checkout” → suggests KB-012 “Runbook: 504 — check DB pool” (score 0.81).',
      },
    ],
    color: 'bg-indigo-500', icon: 'BookOpen', order: 4, lane: 'cycle'
  },
  {
    id: 'improvement', prefix: 'IMP-', title: 'Continual Improvement', oneLiner: 'Turns lessons learned into improvements that actually get done',
    bullets: [
      'Collects ideas from incidents, audits and retros',
      'Prioritizes by effort and due date, tracks proposed → done',
      'Makes improvement visible on the board so it happens',
    ],
    skills: [
      {
        name: 'Trend detection',
        overview: 'Spots repeating improvement themes across retro notes and postmortems.',
        whenToUse: 'Use when many improvements share the same source or keywords. Symptoms: same theme (“onboarding”) appears 5× but treated as isolated, no systemic fix.',
        how: 'Clusters improvements by source (retro/audit) + keyword overlap. Suggests a systemic improvement to replace 5 small ones.',
        example: '5 improvements with “onboarding docs” in 30 days → trend: “Streamline onboarding docs” (effort M).',
      },
      {
        name: 'Suggestion mining',
        overview: 'Extracts improvement candidates from incident comments and postmortems.',
        whenToUse: 'Use when a postmortem contains “what could be better” but no improvement is created. Symptoms: lessons stay in comments, no follow-up.',
        how: 'Parses comments for “should / could / need to” patterns into draft improvement titles. Human confirms and prioritizes.',
        example: 'Comment “should add DB pool alert” → draft IMP “Add DB pool alert (effort S)”.',
      },
    ],
    color: 'bg-emerald-500', icon: 'TrendingUp', order: 5, lane: 'cycle'
  },
  {
    id: 'asset', prefix: 'AST-', title: 'Asset Management', oneLiner: 'Knows what is owned, where it is, and its lifecycle',
    bullets: [
      'Inventories hardware, licenses and service assets with location and environment',
      'Connects ownership to operational reality — what runs where',
      'Informs cost, compliance and replacement decisions',
    ],
    skills: [
      {
        name: 'Inventory linking',
        overview: 'Suggests a link between an asset (the inventory) and its running CI (the operational graph). Keeps ownership tied to reality.',
        whenToUse: 'Use when an asset has a hostname or name that matches a CI. Symptoms: assets without CI link, “which CI is this asset?”, audit mismatches.',
        how: 'Matches asset name/hostname to CI hostname via exact + fuzzy. Suggests assets_ext.ci_id with confidence. Human confirms.',
        example: 'Asset “Web-042” hostname web-042 → suggests link to CI-042 (confidence 0.92).',
      },
    ],
    color: 'bg-blue-500', icon: 'Package', order: 6, lane: 'foundation'
  },
  {
    id: 'service-map', prefix: 'CI-', title: 'Service Configuration (Service Map)', oneLiner: 'Maps services as a live graph to see dependencies and predict impact',
    bullets: [
      'Records CIs (server/service) and directed dependencies — not a stale diagram',
      'Answers impact: if this component fails, what else is affected?',
      'Ties configuration to the assets that actually run it',
    ],
    skills: [
      {
        name: 'Dependency mapping',
        overview: 'Suggests dependency edges between CIs from descriptions and app links.',
        whenToUse: 'Use when a new CI is created or a description mentions “depends on”. Symptoms: graph has isolated nodes, dependencies missing, impact analysis empty.',
        how: 'Parses “depends on / calls / uses” mentions + app-CI links to propose ci_dependencies with confidence. Human confirms edge.',
        example: 'CI “checkout-service — depends on payment-api” → suggests edge checkout → payment-api (0.88).',
      },
      {
        name: 'Impact prediction',
        overview: 'Lists all downstream apps and CIs that would be affected if this CI fails.',
        whenToUse: 'Use when an incident or change touches a CI. Symptoms: “we didn’t know X would break”, impact discovered after, not before.',
        how: 'Graph traversal from CI via ci_dependencies downstream. Output: impacted apps/CIs with distance. Used by incident and change skills.',
        example: 'Incident on CI-017 DB → predicts impact: checkout-service, payment-api, 2 apps.',
      },
    ],
    color: 'bg-slate-500', icon: 'Network', order: 7, lane: 'foundation'
  },
]

export const defaultSkills = [
  { name: 'Auto-triage', entityType: 'Incident', reviewType: 'triage' },
  { name: 'RCA Assist', entityType: 'Problem', reviewType: 'rca' },
  { name: 'Change Risk', entityType: 'Change', reviewType: 'risk' },
  { name: 'Knowledge Synthesis', entityType: 'Knowledge', reviewType: 'knowledge' },
  { name: 'Impact Prediction', entityType: 'Config', reviewType: 'impact' },
]
