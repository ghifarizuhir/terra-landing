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

const DEMO_MAILTO = 'mailto:support@terraline.space?subject=Terraline%20design%20partner%20pilot'

export const product = {
  name: 'Terraline',
  meta: {
    title: 'Terraline: regulatory incident management for mid-market finance',
    description:
      'One incident record from intake to closure, built for regulator reporting deadlines. Self-hosted, AGPL-3.0, with the first Malaysia regulator pack in pilot.',
  },
  hero: {
    eyebrow: 'Regulatory incident management · Mid-market finance · Self-hosted',
    title: 'Run the incident. Keep the evidence.',
    body: 'Terraline gives mid-market banks, digital banks and licensed payment firms one incident record from intake to closure. War rooms, service dependencies, problem follow-up and decision history stay together, so reporting starts from the record your team already keeps.',
    primaryCta: { label: 'Apply for a design partner pilot', href: DEMO_MAILTO },
    secondaryCta: { label: 'See what ships today', href: '#product' },
    boundary:
      'The first regulator pack is in pilot with 3–5 design partners. The incident record it runs on ships today.',
    screenshot: shot('work-items-board', 'Terraline service operations board showing incident and request work in progress'),
  },
  facts: [
    'First corridor: Malaysia',
    'BNM RMiT + Cyber Security Act 2024',
    '4–6 week pilot',
    '3–5 design partners',
    'Self-hosted · AGPL-3.0',
    'Built on Plane',
  ],
  problem: {
    title: 'The report clock starts before the record is clean.',
    body: 'A reportable incident arrives as an alert, a chat thread, a spreadsheet and three versions of the truth. The regulator asks what happened, when you knew and what you changed. The team rebuilds the answer after the outage.',
    cards: [
      {
        id: 'deadlines',
        title: 'Deadlines are short.',
        body: "Malaysia's RMiT and Cyber Security Act 2024 set notification windows measured in hours.",
      },
      {
        id: 'evidence',
        title: 'Evidence is scattered.',
        body: 'Timelines live in chat. Decisions live in email. Service impact lives with one person.',
      },
      {
        id: 'audit',
        title: 'Audit asks for proof.',
        body: 'Who decided what, when, and on which service. The record has to answer before the meeting.',
      },
    ],
    note: 'Regulatory detail is a summary, not legal advice. Confirm current requirements with your compliance team.',
  },
  features: [
    {
      id: 'work-items',
      eyebrow: 'Incident record',
      title: 'Every reportable incident in one queue',
      body: 'Work items are the unit of record: an incident, a request, a change task. Group, filter and switch layouts without losing the timeline.',
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
      title: 'Model the work the regulator asks about',
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
      eyebrow: 'Service context',
      title: 'Know the service before you touch it',
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
      body: 'Intake is a triage queue between the report and the incident: accept, decline, snooze or route, with the decision recorded. Webhook sources and series deduplication keep an alert storm from becoming a ticket storm.',
      bullets: [
        'Triage queue separate from the backlog',
        'Accept, decline, snooze or mark duplicate',
        'Webhook sources and series deduplication',
      ],
      screenshots: [shot('intake', 'Intake triage queue with incoming work items')],
    },
    {
      id: 'pages',
      eyebrow: 'Knowledge that stays close',
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
      body: 'Galileo drafts summaries, descriptions and comments from the work item you are looking at, so you start from a draft instead of a blank page. It proposes; a person reviews.',
      bullets: [
        'Sidebar assistant with your chat history',
        'AI drafting for work item descriptions',
        'A person reviews every draft before it is used',
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
      eyebrow: 'Reports & follow-through',
      title: 'Read the trend, not the anecdote',
      body: 'Timebox service work with cycles, group long efforts into modules, save the filters you live in, and read incident trends from analytics.',
      bullets: [
        'Cycles with progress and burndown',
        'Saved views for the queues you live in',
        'Analytics and export across work',
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
      title: 'Built for the incident record',
      body: 'Terraline starts with intake, war rooms, service context and a timeline. The regulator pack sits on top of that record.',
      points: [
        'Incident intake with webhook sources and deduplication',
        'War rooms with realtime chat and runbooks',
        'Service catalog with dependencies and incident-derived health',
        'Problem, change and knowledge work on the same record',
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
  pilot: {
    title: 'The regulator pack is built with design partners.',
    body: "We are building the first corridor pack for BNM RMiT and Malaysia's Cyber Security Act 2024 with 3–5 licensed financial institutions. The pilot proves one reportable incident end to end.",
    scope: [
      {
        title: 'Reportability rules',
        status: 'In pilot',
        body: 'Severity, customer impact, duration, third-party involvement and data breach thresholds.',
      },
      {
        title: 'Regulator report draft',
        status: 'In pilot',
        body: 'Fields, validation, PDF or Excel export, version and submission status.',
      },
      {
        title: 'Evidence pack',
        status: 'In pilot',
        body: 'Timeline, classification, impact, root cause, corrective actions, approvals and audit log.',
      },
      {
        title: 'Immutable audit log',
        status: 'In pilot',
        body: 'Actor, timestamp, before and after, export and retention.',
      },
      {
        title: 'KRI dashboard',
        status: 'In pilot',
        body: 'Incident volume, report timeliness, MTTR and overdue actions.',
      },
    ],
    shape: [
      '4–6 weeks',
      'One reportable incident end to end',
      'Compliance crosswalk',
      'Local implementation partner',
      'Success criteria before kickoff',
    ],
    cta: { label: 'Apply for a design partner pilot', href: DEMO_MAILTO },
  },
  coexistence: {
    title: 'Keep the tools you already run.',
    body: 'Terraline starts with the incident record. Your service desk, monitoring and delivery tools keep doing their jobs. Integrations with Jira, ServiceNow, email, Teams and monitoring are next on the roadmap.',
    cards: [
      {
        title: 'If you run Jira or Freshservice.',
        body: 'Terraline adds the compliance record above the tool your team already uses.',
      },
      {
        title: 'If you run Excel and email.',
        body: 'Terraline gives the incident process a system with a timeline and an owner.',
      },
    ],
  },
  roadmap: {
    shipped: [
      'Incident intake with webhook sources and series deduplication',
      'Incident tickets with comments, activity, versions and relations',
      'War rooms with realtime chat, runbooks and blast radius',
      'Service catalog with ownership, criticality and dependencies',
      'Problem, change, request and knowledge work types',
      'Reports, analytics and export',
      'Galileo AI, Scheduler and public API v1 (MCP/SDK-compatible)',
      'Self-host with Docker Compose on Postgres and Redis',
    ],
    pilot: [
      'Malaysia regulator pack: BNM RMiT + Cyber Security Act 2024',
      'Reportability rules and incident classification',
      'Regulator report draft, validation and PDF/Excel export',
      'Evidence pack: timeline, impact, root cause, corrective actions, approvals',
      'Immutable audit log with retention and export',
      'KRI dashboard: volume, timeliness, MTTR, overdue actions',
    ],
    outOfScope: [
      'ServiceNow feature parity',
      'CMDB, ITOM, APM and AIOps',
      'A full GRC suite',
      'SLA engine and CAB approval board',
      'A native mobile app',
      'Any guarantee of audit or regulator approval',
    ],
    note: 'No dates, no promises. The boundary is part of the product.',
  },
  cta: {
    title: 'Bring one reportable incident.',
    body: 'We will map it to the incident record, the evidence it leaves behind and the regulator deadline you have to meet.',
    label: 'Apply for a design partner pilot',
    href: DEMO_MAILTO,
    secondary: { label: 'See what ships today', href: '#product' },
    note: 'First corridor: Malaysia · 3–5 design partners · Self-hosted or in-country deployment',
  },
  footer: {
    tagline: 'Regulatory incident management for mid-market finance',
    contact: DEMO_MAILTO,
    planeUrl: 'https://plane.so',
    repoUrl: 'https://github.com/ghifarizuhir/plane-for-itsm',
  },
} as const
