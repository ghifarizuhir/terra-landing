// src/data/managements.ts — Terra — AI for ITSM: clear knowledge + real AI skills (with detail) per management. Generic ITSM, no ITIL4 verbatim.
export type SkillDetail = { name: string; what: string; how: string }
export type Management = {
  id: string
  prefix: string
  title: string
  oneLiner: string
  bullets: string[] // 3 core activities
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
      { name: 'Auto-triage & priority', what: 'Reads title, description and history to suggest P1–P4 and assignee.', how: 'Keyword + history similarity. Input: incident text. Output: priority + suggested team with confidence.' },
      { name: 'War-room summarization', what: 'Condenses timeline updates into a 3-bullet handover.', how: 'Summarizes comments in chronological order. Output: what happened, impact, next action.' },
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
      { name: 'Intent classification', what: 'Decides if input is a request or an incident.', how: 'Classifies text into request_type (access/hardware/info/…) vs incident. Prevents miscategorization.' },
      { name: 'Auto-routing', what: 'Routes request to the right fulfillment team.', how: 'Matches catalog item + requester team to owner team. Suggests due date based on type.' },
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
      { name: 'Pattern clustering', what: 'Finds ≥3 similar incidents in 7 days by same app + title overlap.', how: 'Title embedding cosine ≥0.6 + same app. Output: cluster + suggest “create Problem”.' },
      { name: 'RCA draft assist', what: 'Drafts whatHappened / rootCause / contributingFactors from incident cluster.', how: 'Summarizes linked incidents into RCA sections. Human edits before publish.' },
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
      { name: 'Risk scoring', what: 'Scores change as low/medium/high/critical before approval.', how: 'Checks description length, env (prod vs staging), and linked incidents. Short prod change → high risk.' },
      { name: 'Impact prediction', what: 'Predicts which services will be affected by this change.', how: 'Uses Service Map dependencies (CI graph) to list downstream CIs and apps.' },
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
      { name: 'Resolution → article', what: 'Generates a KB draft from a closed problem or change.', how: 'Prefills title/kbType from published RCA or change summary. Human publishes.' },
      { name: 'Search relevance', what: 'Suggests the right KB when a similar incident is opened.', how: 'Embedding similarity between incident and KB sections. Surfaces top 3.' },
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
      { name: 'Trend detection', what: 'Spots repeating improvement themes across postmortems.', how: 'Clusters improvement sources (retro/audit) by keywords. Suggests systemic fix.' },
      { name: 'Suggestion mining', what: 'Extracts improvement candidates from incident postmortems.', how: 'Parses “what could be better” from comments into draft improvement titles.' },
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
      { name: 'Inventory linking', what: 'Suggests link between asset and its running CI.', how: 'Matches asset name/hostname to CI hostname. Suggests assets_ext.ci_id link with confidence.' },
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
      { name: 'Dependency mapping', what: 'Suggests dependency edges from description and app links.', how: 'Parses “depends on” mentions + app-CI links to propose ci_dependencies with confidence.' },
      { name: 'Impact prediction', what: 'Lists downstream apps and CIs if this CI fails.', how: 'Graph traversal from CI via dependencies. Output: impact list for incident/change.' },
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
