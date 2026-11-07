export type Screenshot = {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
}

export type Feature = {
  readonly id: string
  readonly eyebrow: string
  readonly title: string
  readonly body: string
  readonly bullets: readonly string[]
  readonly screenshots: readonly Screenshot[]
}

const shot = (name: string, alt: string): Screenshot => ({
  src: `/screenshots/${name}.webp`,
  alt,
  width: 2880,
  height: 1800,
})

const mobileShot = (name: string, alt: string): Screenshot => ({
  src: `/screenshots/${name}.webp`,
  alt,
  width: 780,
  height: 1688,
})

const DEMO_MAILTO = 'mailto:support@terraline.space?subject=Terraline%20demo%20access'

export const product = {
  name: 'Terraline',
  meta: {
    title: 'Terraline: ITIL-aligned IT service management, ready to run',
    description:
      'Open-source ITSM with six ITIL practices built in. Incident, problem, change, request, knowledge and improvement management on one self-hosted system, with AI drafting from the record.',
  },
  hero: {
    eyebrow: 'Open-source ITSM · ITIL-aligned · self-hosted',
    title: 'ITIL practices, ready to run',
    body: 'Terraline is open-source IT service management with six ITIL practices built in. Incidents, problems, changes, requests, knowledge and improvement run on one self-hosted system. AI drafts from the record.',
    primaryCta: { label: 'Request a demo', href: DEMO_MAILTO },
    secondaryCta: { label: 'Explore the 8 practices', href: '#practices' },
    screenshot: shot('work-items-board', 'Terraline service operations board showing incident and request work in progress'),
  },
  facts: [
    '6 ITIL practices',
    'Rust API (Axum)',
    'Postgres + Redis Stream',
    'Real-time pages (Yjs)',
    'Docker Compose self-host',
    'AGPL-3.0',
  ],
  features: [
    {
      id: 'work-items',
      eyebrow: 'Work management',
      title: 'Every incident, request and task in one queue',
      body: 'Work items are the unit of work: a request, an incident, a change task. Group, filter and switch layouts without leaving the queue.',
      bullets: [
        'List, board, calendar, spreadsheet and timeline layouts',
        'Rich text with versions, sub-items, relations and attachments',
        'Comments, activity and state history on every record',
      ],
      screenshots: [
        shot('work-items-list', 'Work items list with filters and properties'),
        shot('work-item-detail', 'Work item detail with description, activity and comments'),
      ],
    },
    {
      id: 'types',
      eyebrow: 'Work item types',
      title: 'Model each kind of service work explicitly',
      body: 'Incident, problem, change and improvement are built-in work item types; request is opt-in with an optional service gate. Each type carries its own fields and vocabulary while sharing one state set.',
      bullets: [
        'Four built-in types, plus an opt-in Request type',
        'Optional required-service gate on intake acceptance',
        'Type-aware boards, filters and create forms',
      ],
      screenshots: [
        shot('work-items-list', 'Work items list with type and service properties'),
        shot('work-item-detail', 'Work item detail with type, service and activity'),
      ],
    },
    {
      id: 'services',
      eyebrow: 'Service catalog',
      title: 'Know what you run and how it connects',
      body: 'Services are first-class records: status, criticality, ownership and dependencies — the map you reason about before a change or during an incident.',
      bullets: [
        'Health-first board with criticality and ownership',
        'Dependency graph view',
        'Service detail ties related work items together',
      ],
      screenshots: [
        shot('services-graph', 'Service dependency graph view'),
        shot('service-detail', 'Service detail with dependencies and linked work items'),
      ],
    },
    {
      id: 'intake',
      eyebrow: 'Intake & triage',
      title: 'Turn incoming noise into accepted work',
      body: 'Intake is a triage queue between the request and the project: accept, decline, snooze or route — with the decision recorded.',
      bullets: [
        'Triage queue separate from the backlog',
        'Accept, decline, snooze or mark duplicate',
        'Decisions stay on the intake record',
      ],
      screenshots: [shot('intake', 'Intake triage queue with incoming work items')],
    },
    {
      id: 'pages',
      eyebrow: 'Docs that stay close to work',
      title: 'Runbooks and postmortems, live',
      body: 'Pages are a rich-text editor with multi-user collaboration — runbooks, postmortems and SOPs live next to the work they describe.',
      bullets: [
        'Rich-text pages for runbooks, postmortems and SOPs',
        'Real-time collaboration built on Yjs',
        'Every new workspace starts with a service runbook and a postmortem template',
      ],
      screenshots: [shot('pages', 'Pages list with the seeded service runbook')],
    },
    {
      id: 'ai',
      eyebrow: 'Galileo AI',
      title: 'An assistant grounded in the record on screen',
      body: 'Galileo drafts summaries, descriptions and comments from the work item you are looking at, so you start from a draft instead of a blank page.',
      bullets: [
        'Sidebar assistant with your chat history',
        'AI drafting for work item descriptions',
        'Nothing runs until you ask',
      ],
      screenshots: [shot('galileo', 'Galileo AI sidebar open on a work item')],
    },
    {
      id: 'scheduler',
      eyebrow: 'AI Scheduler',
      title: 'Recurring agent runs with a recipe',
      body: 'Schedule an agent to run on a cadence; each schedule can carry a structured recipe — description, steps, tools, expected output — and keeps its run history.',
      bullets: [
        'Presets: hourly, daily, weekly, monthly',
        'Hard tool allowlist per recipe',
        'Run history for every schedule',
      ],
      screenshots: [shot('scheduler', 'Scheduler page with schedules and run history')],
    },
    {
      id: 'delivery',
      eyebrow: 'Delivery tracking',
      title: 'Cycles, modules, views and analytics',
      body: 'Timebox service work with cycles, group long efforts into modules, save the filters you live in, and read trends from analytics.',
      bullets: [
        'Cycles with progress and burndown',
        'Modules for longer efforts',
        'Saved views and analytics across work',
      ],
      screenshots: [shot('cycles', 'Cycles with progress for service work')],
    },
    {
      id: 'mobile',
      eyebrow: 'Mobile mode',
      title: 'Triage from your phone',
      body: 'The web app is usable on phones for the flows that matter away from a desk: read and update work items, comment, attach and search.',
      bullets: [
        'View and update work items on small screens',
        'Comments and attachments',
        'Workspace navigation and search',
      ],
      screenshots: [mobileShot('mobile-work-item', 'Work item on a phone screen')],
    },
  ],
  comparisons: [
    {
      title: 'Built on Plane, extended for service',
      body: 'Terraline keeps Plane’s delivery core and adds the service layer an ITIL practice needs.',
      points: [
        'Service catalog with dependencies and incident-derived health',
        'Built-in incident, problem, change and improvement types',
        'Operations vocabulary and type-aware intake',
        'Galileo AI assistant and Scheduler',
      ],
    },
    {
      title: 'Open source, end to end',
      body: 'Run the stack and keep the service record on infrastructure you control.',
      points: [
        'AGPL-3.0, built on Plane',
        'Docker Compose self-host, Postgres + Redis',
        'One data model for operations and delivery work',
        'Traceable by default: comments, versions, activity',
      ],
    },
  ],
  architecture: {
    body: 'A React Router SPA talks to a Rust Axum API over Postgres; background jobs ride a Redis Stream, and Pages collaborate through a dedicated live server. The whole stack deploys with Docker Compose.',
    facts: [
      'React 19 + React Router SPA',
      'Rust Axum API + SQLx',
      'Postgres + Redis Stream jobs',
      'Live server for Yjs collaboration',
    ],
  },
  roadmap: {
    shipped: [
      'Six ITIL practices as built-in work types and shared states',
      'Service catalog with dependency graph',
      'Intake triage and saved views',
      'Real-time pages, analytics and mobile mode',
      'Galileo AI assistant, Scheduler and public API v1 (MCP/SDK-compatible)',
    ],
    next: [
      'An SLA engine and CAB approval board',
      'A live monitoring or APM feed',
      'A separate asset or CMDB module',
      'A native mobile app',
    ],
  },
  cta: {
    title: 'Put your practices to work',
    body: 'Request a guided demo workspace and walk a real incident, request or change through Terraline. We will map it to the practices you already follow.',
    label: 'Request a demo',
    href: DEMO_MAILTO,
  },
  footer: {
    tagline: 'ITIL-aligned IT service management',
    contact: DEMO_MAILTO,
    planeUrl: 'https://plane.so',
    repoUrl: 'https://github.com/ghifarizuhir/plane-for-itsm',
  },
} as const
