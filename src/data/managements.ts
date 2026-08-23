// src/data/managements.ts
export type Management = {
  id: string
  prefix: string
  title: string
  oneLiner: string
  bullets: string[]
  skills: string[]
  color: string // tailwind class or css var
  icon: string // lucide name
  order: number // journey order
  lane: 'cycle' | 'parallel' | 'foundation'
}

export const managements: Management[] = [
  {
    id: 'incident', prefix: 'INC-', title: 'Incident Management', oneLiner: 'Detect & Respond in minutes, not hours',
    bullets: ['isWarRoom, detectionSource/impactLevel, recurrence tracking (recurrenceCount/lastRecurredAt)', 'Impact lookup via Service Map + export CSV', 'Filter priority/appId/date, recurring=true'],
    skills: ['Security Audit', 'Description Quality'], color: 'bg-red-500', icon: 'Siren', order: 1, lane: 'cycle'
  },
  {
    id: 'request', prefix: 'REQ-', title: 'Service Request', oneLiner: 'Intake without the ticket hell',
    bullets: ['requestType access/provisioning/hardware/service_catalog, targetDate overdue', 'requesterName/Contact, bulk delete PATCH /requests/bulk', 'Filter overdue/targetDateFromTo'],
    skills: ['Description Quality', 'Compliance'], color: 'bg-sky-500', icon: 'ClipboardList', order: 0, lane: 'parallel'
  },
  {
    id: 'problem', prefix: 'PRB-', title: 'Problem & RCA', oneLiner: 'Find root, not just symptoms',
    bullets: ['severity/firstObservedAt, RCA 8 categories (code_defect, config_drift...)', 'RCA draft→published, auto-derive Knowledge via derive-fields.ts', 'whatHappened/rootCause/contributingFactors'],
    skills: ['RCA Completeness'], color: 'bg-purple-500', icon: 'SearchX', order: 2, lane: 'cycle'
  },
  {
    id: 'change', prefix: 'CHG-', title: 'Change Management', oneLiner: 'Ship safely, verify continuously',
    bullets: ['riskLevel critical/high/medium/low, monitoringPeriodDays default 3', 'change_goals achieved/partial/not_achieved + checkpoints normal/warning/anomaly', 'env/version + export CSV'],
    skills: ['Compliance', 'Description Quality'], color: 'bg-amber-500', icon: 'GitBranch', order: 3, lane: 'cycle'
  },
  {
    id: 'knowledge', prefix: 'KB-', title: 'Knowledge Management', oneLiner: 'Every fix becomes reusable knowledge',
    bullets: ['kb_type 7 enum (runbook/troubleshoot/sop/faq/postmortem...)', 'knowledge_sections heading+sortOrder, sourceProblemId/sourceChangeId', 'env scope, report DOCX/PDF'],
    skills: ['Description Quality', 'Compliance'], color: 'bg-indigo-500', icon: 'BookOpen', order: 4, lane: 'cycle'
  },
  {
    id: 'improvement', prefix: 'IMP-', title: 'Improvement', oneLiner: 'Continuous improvement, actually tracked',
    bullets: ['source 6 enum, effort s/m/l/xl vs actualEffort, voting via entity_reactions', 'dueDate + overdue filter', 'export CSV'],
    skills: ['Description Quality'], color: 'bg-emerald-500', icon: 'TrendingUp', order: 5, lane: 'cycle'
  },
  {
    id: 'asset', prefix: 'AST-', title: 'Asset Management', oneLiner: 'Know what you own',
    bullets: ['asset_kind/location/environment/acquiredAt, optional ciId link', 'Inventory vs CI distinction', 'export CSV'],
    skills: [], color: 'bg-blue-500', icon: 'Package', order: 6, lane: 'foundation'
  },
  {
    id: 'service-map', prefix: 'CI-', title: 'Service Map (CMDB)', oneLiner: 'See dependencies, predict impact',
    bullets: ['ci_kind server/service, ci_dependencies directed + anti self-dependency', 'application_ci_links role, impact GET /cis/:id/impact', 'status active/maintenance/retired'],
    skills: ['CI Description Quality'], color: 'bg-slate-500', icon: 'Network', order: 7, lane: 'foundation'
  },
]

export const defaultSkills = [
  { name: 'Security Audit', entityType: 'Incident', reviewType: 'security_audit' },
  { name: 'Description Quality', entityType: 'All', reviewType: 'description_quality' },
  { name: 'RCA Completeness', entityType: 'Problem', reviewType: 'rca_completeness' },
  { name: 'Compliance', entityType: 'Change', reviewType: 'compliance' },
  { name: 'CI Description Quality', entityType: 'CI', reviewType: 'ci_description_quality' },
]
