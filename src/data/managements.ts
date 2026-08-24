// src/data/managements.ts — Terra — AI for ITSM: clear knowledge (what each management does) + AI skills it needs. Generic ITSM, no ITIL4 verbatim, no codebase internals.
export type Management = {
  id: string
  prefix: string
  title: string
  oneLiner: string // clear definition 1 sentence
  bullets: string[] // 3 core activities
  skills: string[]
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
    skills: ['Auto-triage & priority', 'War-room summarization'], color: 'bg-red-500', icon: 'Siren', order: 1, lane: 'cycle'
  },
  {
    id: 'request', prefix: 'REQ-', title: 'Service Request Management', oneLiner: 'Fulfills approved user needs through a service catalog — not a disruption',
    bullets: [
      'Offers catalog for access, hardware, info and provisioning requests',
      'Validates, routes and fulfills from intake to delivery with due date',
      'Keeps requests separate from incidents — different urgency, different flow',
    ],
    skills: ['Intent classification', 'Auto-routing'], color: 'bg-sky-500', icon: 'ClipboardList', order: 0, lane: 'parallel'
  },
  {
    id: 'problem', prefix: 'PRB-', title: 'Problem Management', oneLiner: 'Finds the cause behind repeating incidents so they stop recurring',
    bullets: [
      'Clusters similar incidents to spot patterns (≥3 similar in 7 days)',
      'Investigates root cause and contributing factors, records RCA',
      'Links findings to knowledge so fixes outlive the incident',
    ],
    skills: ['Pattern clustering', 'RCA draft assist'], color: 'bg-purple-500', icon: 'SearchX', order: 2, lane: 'cycle'
  },
  {
    id: 'change', prefix: 'CHG-', title: 'Change Management', oneLiner: 'Controls changes to services and infrastructure and verifies they hold',
    bullets: [
      'Plans change with risk, intent and rollback — not just deploy',
      'Verifies outcome after deployment during monitoring period',
      'Holds or rolls back when monitoring shows warning or anomaly',
    ],
    skills: ['Risk scoring', 'Impact prediction'], color: 'bg-amber-500', icon: 'GitBranch', order: 3, lane: 'cycle'
  },
  {
    id: 'knowledge', prefix: 'KB-', title: 'Knowledge Management', oneLiner: 'Makes every fix reusable at the moment of need',
    bullets: [
      'Captures runbooks, troubleshooting guides and postmortems as structured articles',
      'Makes knowledge findable inside the incident — not after',
      'Evolves articles from real resolutions, not theory',
    ],
    skills: ['Resolution → article', 'Search relevance'], color: 'bg-indigo-500', icon: 'BookOpen', order: 4, lane: 'cycle'
  },
  {
    id: 'improvement', prefix: 'IMP-', title: 'Continual Improvement', oneLiner: 'Turns lessons learned into improvements that actually get done',
    bullets: [
      'Collects ideas from incidents, audits and retros',
      'Prioritizes by effort and due date, tracks proposed → done',
      'Makes improvement visible on the board so it happens',
    ],
    skills: ['Trend detection', 'Suggestion mining'], color: 'bg-emerald-500', icon: 'TrendingUp', order: 5, lane: 'cycle'
  },
  {
    id: 'asset', prefix: 'AST-', title: 'Asset Management', oneLiner: 'Knows what is owned, where it is, and its lifecycle',
    bullets: [
      'Inventories hardware, licenses and service assets with location and environment',
      'Connects ownership to operational reality — what runs where',
      'Informs cost, compliance and replacement decisions',
    ],
    skills: ['Inventory linking'], color: 'bg-blue-500', icon: 'Package', order: 6, lane: 'foundation'
  },
  {
    id: 'service-map', prefix: 'CI-', title: 'Service Configuration (Service Map)', oneLiner: 'Maps services as a live graph to see dependencies and predict impact',
    bullets: [
      'Records CIs (server/service) and directed dependencies — not a stale diagram',
      'Answers impact: if this component fails, what else is affected?',
      'Ties configuration to the assets that actually run it',
    ],
    skills: ['Dependency mapping', 'Impact prediction'], color: 'bg-slate-500', icon: 'Network', order: 7, lane: 'foundation'
  },
]

export const defaultSkills = [
  { name: 'Auto-triage', entityType: 'Incident', reviewType: 'triage' },
  { name: 'RCA Assist', entityType: 'Problem', reviewType: 'rca' },
  { name: 'Change Risk', entityType: 'Change', reviewType: 'risk' },
  { name: 'Knowledge Synthesis', entityType: 'Knowledge', reviewType: 'knowledge' },
  { name: 'Impact Prediction', entityType: 'Config', reviewType: 'impact' },
]
