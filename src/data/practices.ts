import { managements } from './managements'

export type LandingPractice = {
  id: string
  prefix: string
  title: string
  shortTitle: string
  oneLiner: string
  aiSkill: string
  lamp: string
  status: 'product' | 'reference'
}

type PracticeCopy = {
  oneLiner: string
  aiSkill: string
  shortTitle?: string
  status?: LandingPractice['status']
}

const order = [
  'incident',
  'problem',
  'change',
  'request',
  'knowledge',
  'improvement',
  'asset',
  'service-map',
] as const

const copy: Record<string, PracticeCopy> = {
  incident: {
    oneLiner: 'Restore disrupted service fast, with users kept informed.',
    aiSkill: 'Auto-triage & priority',
    shortTitle: 'Incident',
    status: 'product',
  },
  problem: {
    oneLiner: 'Find the cause behind repeat incidents and stop the loop.',
    aiSkill: 'RCA draft assist',
    shortTitle: 'Problem',
    status: 'product',
  },
  change: {
    oneLiner: 'Ship changes with a risk score, then verify they hold.',
    aiSkill: 'Risk scoring',
    shortTitle: 'Change',
    status: 'product',
  },
  request: {
    oneLiner: 'Fulfill approved needs from a service catalog.',
    aiSkill: 'Intent classification',
    shortTitle: 'Request',
    status: 'product',
  },
  knowledge: {
    oneLiner: 'Make every fix reusable at the moment of need.',
    aiSkill: 'Resolution → article',
    shortTitle: 'Knowledge',
    status: 'product',
  },
  improvement: {
    oneLiner: 'Turn lessons into improvements that ship.',
    aiSkill: 'Trend detection',
    shortTitle: 'Improvement',
    status: 'product',
  },
  asset: {
    oneLiner: 'Know what is owned, where it sits, and when it retires.',
    aiSkill: 'Lifecycle classifier',
    shortTitle: 'Asset',
    status: 'reference',
  },
  'service-map': {
    oneLiner: 'Map services as a graph and predict the blast radius.',
    aiSkill: 'Dependency mapping',
    shortTitle: 'Service configuration',
    status: 'reference',
  },
}

const lampByColor: Record<string, string> = {
  'bg-red-500': '#ef4444',
  'bg-sky-500': '#0ea5e9',
  'bg-purple-500': '#a855f7',
  'bg-amber-500': '#f59e0b',
  'bg-indigo-500': '#6366f1',
  'bg-emerald-500': '#10b981',
  'bg-blue-500': '#3b82f6',
  'bg-slate-500': '#64748b',
}

export const landingPractices: LandingPractice[] = order.map((id) => {
  const management = managements.find((item) => item.id === id)
  if (!management) throw new Error(`Unknown management: ${id}`)
  const entry = copy[id]
  if (!entry) throw new Error(`Missing landing copy: ${id}`)
  return {
    id,
    prefix: management.prefix,
    title: management.title,
    shortTitle: entry.shortTitle ?? management.title.replace(' Management', ''),
    oneLiner: entry.oneLiner,
    aiSkill: entry.aiSkill,
    lamp: lampByColor[management.color] ?? '#64748b',
    status: entry.status ?? (management.lane === 'foundation' ? 'reference' : 'product'),
  }
})

export const productPractices = landingPractices.filter((practice) => practice.status === 'product')
export const referencePractices = landingPractices.filter((practice) => practice.status === 'reference')
