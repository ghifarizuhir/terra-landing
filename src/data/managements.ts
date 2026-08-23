// src/data/managements.ts — Terra — AI for ITSM: knowledge (what each management does) + AI skills it needs. Generic ITSM, no ITIL4 verbatim, no codebase internals.
export type Management = {
  id: string
  prefix: string
  title: string
  oneLiner: string
  bullets: string[] // knowledge: what this management does
  skills: string[] // AI-augmented skills needed per management
  color: string
  icon: string
  order: number
  lane: 'cycle' | 'parallel' | 'foundation'
}

export const managements: Management[] = [
  {
    id: 'incident', prefix: 'INC-', title: 'Incident Management', oneLiner: 'Restore service fast, keep users informed',
    bullets: [
      'Logs, categorizes and prioritizes disruptions; drives rapid restoration via war-room and escalation',
      'Correlates repeats and impacted services to prevent the same incident twice',
      'Closes with clear communication and handover to problem/knowledge for learning',
    ],
    skills: ['Auto-triage & priority', 'War-room summarization'], color: 'bg-red-500', icon: 'Siren', order: 1, lane: 'cycle'
  },
  {
    id: 'request', prefix: 'REQ-', title: 'Service Request Management', oneLiner: 'Fulfill user needs without ticket friction',
    bullets: [
      'Provides a service catalog for access, hardware, info and provisioning requests',
      'Tracks requester, due date and fulfillment path from intake to delivery',
      'Keeps requests separate from incidents — different urgency, different flow',
    ],
    skills: ['Intent classification', 'Auto-routing'], color: 'bg-sky-500', icon: 'ClipboardList', order: 0, lane: 'parallel'
  },
  {
    id: 'problem', prefix: 'PRB-', title: 'Problem Management', oneLiner: 'Find the cause, stop the recurrence',
    bullets: [
      'Investigates patterns behind incidents to find the underlying cause',
      'Records root-cause analysis and contributing factors for reuse',
      'Links findings to knowledge so fixes outlive the incident',
    ],
    skills: ['Pattern clustering', 'RCA draft assist'], color: 'bg-purple-500', icon: 'SearchX', order: 2, lane: 'cycle'
  },
  {
    id: 'change', prefix: 'CHG-', title: 'Change Management', oneLiner: 'Ship change safely, verify that it holds',
    bullets: [
      'Plans and controls changes to services and infrastructure with clear risk and intent',
      'Verifies outcomes after deployment — did the change achieve its goal?',
      'Holds or rolls back when monitoring shows warning or anomaly',
    ],
    skills: ['Risk scoring', 'Impact prediction'], color: 'bg-amber-500', icon: 'GitBranch', order: 3, lane: 'cycle'
  },
  {
    id: 'knowledge', prefix: 'KB-', title: 'Knowledge Management', oneLiner: 'Make every fix reusable',
    bullets: [
      'Captures runbooks, troubleshooting guides and postmortems as structured knowledge',
      'Keeps knowledge findable at the moment of need — inside the incident, not after',
      'Evolves articles from real resolutions, not theory',
    ],
    skills: ['Resolution → article', 'Search relevance'], color: 'bg-indigo-500', icon: 'BookOpen', order: 4, lane: 'cycle'
  },
  {
    id: 'improvement', prefix: 'IMP-', title: 'Continual Improvement', oneLiner: 'Improve on purpose, not by accident',
    bullets: [
      'Collects improvement ideas from incidents, audits and team retros',
      'Prioritizes by effort and due date, tracks from proposed to done',
      'Makes improvement visible so it actually happens',
    ],
    skills: ['Trend detection', 'Suggestion mining'], color: 'bg-emerald-500', icon: 'TrendingUp', order: 5, lane: 'cycle'
  },
  {
    id: 'asset', prefix: 'AST-', title: 'Asset Management', oneLiner: 'Know what you own and where it is',
    bullets: [
      'Tracks hardware, licenses and service assets with location and lifecycle',
      'Connects ownership to operational reality — who owns what runs where',
      'Informs cost, compliance and replacement decisions',
    ],
    skills: ['Inventory linking'], color: 'bg-blue-500', icon: 'Package', order: 6, lane: 'foundation'
  },
  {
    id: 'service-map', prefix: 'CI-', title: 'Service Configuration (Service Map)', oneLiner: 'See how services connect, predict what breaks',
    bullets: [
      'Maps services and dependencies as a live graph — not a stale diagram',
      'Answers impact: if this component fails, what else is affected?',
      'Keeps configuration tied to the assets that actually run it',
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
