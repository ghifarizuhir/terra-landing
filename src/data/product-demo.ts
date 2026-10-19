export const showcaseChapters = [
  { id: 'work', label: 'Work management', targetId: 'top', steps: 3 },
  { id: 'services', label: 'Service catalog', targetId: 'showcase-services', steps: 3 },
  { id: 'galileo', label: 'Knowledge & AI', targetId: 'showcase-galileo', steps: 3 },
  { id: 'delivery', label: 'Delivery & mobile', targetId: 'showcase-delivery', steps: 3 },
] as const

export type ShowcaseChapterId = (typeof showcaseChapters)[number]['id']
export type ShowcasePhase = 'playing' | 'paused' | 'complete' | 'static'

export const productDemo = {
  label: 'Demo workspace · Sample data',
  workItem: {
    id: 'TERRA-42',
    title: 'API latency spike',
    type: 'Incident',
    fromState: 'Triage',
    toState: 'In progress',
  },
  services: [
    { id: 'api-gateway', name: 'API Gateway', status: 'Active', criticality: 'High', health: 'healthy', incidents: 0 },
    { id: 'payment-gateway', name: 'Payment Gateway', status: 'Active', criticality: 'Critical', health: 'healthy', incidents: 0 },
    { id: 'postgres-primary', name: 'Postgres Primary', status: 'Active', criticality: 'Critical', health: 'healthy', incidents: 0 },
  ],
  dependencies: [
    { id: 'api-to-payment', from: 'api-gateway', to: 'payment-gateway' },
    { id: 'payment-to-postgres', from: 'payment-gateway', to: 'postgres-primary' },
  ],
  assistant: {
    prompt: 'What is affected?',
    response: 'The Payment Gateway depends on API Gateway. Review the incident path before resuming traffic.',
  },
  delivery: {
    cycle: 'Week 2: Triage and response',
    completed: 7,
    total: 10,
    update: 'Added an incident response update',
  },
} as const
