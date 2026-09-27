export type Screenshot = {
  src: string
  alt: string
  width: number
  height: number
}

export type Feature = {
  id: string
  eyebrow: string
  title: string
  body: string
  bullets: string[]
  screenshots: Screenshot[]
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
    title: 'Terraline — Open-source IT service management platform',
    description:
      'Terraline is open-source IT service management built on Plane: work items, a service catalog, typed workflows and AI in the loop — self-hosted, traceable, real-time.',
  },
  hero: {
    eyebrow: 'Open-source IT service management · built on Plane',
    title: 'Run services and delivery work in one system',
    body: 'Work items, a service catalog, typed workflows and AI in the loop — self-hosted, traceable, real-time.',
    primaryCta: { label: 'Request a demo', href: DEMO_MAILTO },
    secondaryCta: { label: 'See the product', href: '#product' },
    screenshot: shot('work-items-board', 'Terraline work items board showing service work in progress'),
  },
  facts: [
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
      eyebrow: 'Typed workflows',
      title: 'Give each process its own states and rules',
      body: 'Incident, request and change are work item types with their own state machines — the process each team follows is explicit and auditable.',
      bullets: [
        'Per-type states with allowed transitions',
        'Workflow editor lives in workspace settings',
        'Type-aware boards, filters and create forms',
      ],
      screenshots: [
        shot('work-item-types', 'Work item types settings page'),
        shot('workflow-editor', 'Workflow editor with typed states and transitions'),
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
        shot('services-board', 'Services board sorted by health and criticality'),
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
        'Every decision keeps its trail',
      ],
      screenshots: [shot('intake', 'Intake triage queue with incoming work items')],
    },
    {
      id: 'pages',
      eyebrow: 'Docs that stay close to work',
      title: 'Runbooks and postmortems, live',
      body: 'Pages are a rich-text editor with multi-user collaboration — runbooks, postmortems and SOPs live next to the work they describe.',
      bullets: [
        'TipTap editor with real-time Yjs sessions',
        'Seeded on first workspace run: a service runbook and a postmortem template',
        'Pages link to the projects and work they describe',
      ],
      screenshots: [shot('pages-live', 'Page editor with live collaboration')],
    },
    {
      id: 'ai',
      eyebrow: 'Galileo AI',
      title: 'An assistant grounded in the record on screen',
      body: 'Galileo drafts summaries, descriptions and comments from the work item you are looking at — suggesting, never overwriting.',
      bullets: [
        'Sidebar assistant with workspace chat history',
        'Editor AI for pages and descriptions',
        'Human confirms every suggestion',
      ],
      screenshots: [shot('galileo', 'Galileo AI sidebar open on a work item')],
    },
    {
      id: 'scheduler',
      eyebrow: 'AI Scheduler',
      title: 'Recurring agent runs with a recipe',
      body: 'Schedule an agent to run on a cadence; each schedule carries a structured recipe — description, steps, tools, expected output — and keeps its run history.',
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
      screenshots: [shot('analytics', 'Analytics dashboard with work trends')],
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
      title: 'Beyond Plane upstream',
      body: 'Terraline keeps Plane’s delivery core and adds the service layer IT teams need.',
      points: [
        'Service catalog with dependencies and health',
        'Work item types with enforced workflows',
        'Operations vocabulary and seeded demo data',
        'Galileo AI assistant and scheduler',
      ],
    },
    {
      title: 'Beyond closed ITSM suites',
      body: 'The control of self-hosting with the speed of a modern, keyboard-first UI.',
      points: [
        'Open source under AGPL-3.0, built on Plane',
        'Docker Compose self-host, Postgres + Redis',
        'One data model for ops and delivery work',
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
      'Work items with types and workflows',
      'Service catalog with dependency graph',
      'Intake triage and saved views',
      'Real-time pages, analytics and mobile mode',
      'Galileo AI assistant, AI scheduler and MCP API (v1 core)',
    ],
    next: [
      'Asset lifecycle records',
      'CMDB dependency map across services',
      'Incident and postmortem records as first-class types',
    ],
  },
  cta: {
    title: 'See it against your own services',
    body: 'Request access to a guided demo workspace — no pricing page, no signup funnel.',
    label: 'Request access',
    href: DEMO_MAILTO,
  },
  footer: {
    tagline: 'Open-source IT service management',
    contact: DEMO_MAILTO,
    planeUrl: 'https://plane.so',
  },
} as const
