# Terraline Product Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Repurpose `terra-landing` from the old knowledge landing into a product-credibility landing for Terraline (the `plane-for-itsm` fork), moving the 8-management/56-skill knowledge to `/learn`.

**Architecture:** Static Vite MPA with two entries (`/` homepage, `/learn` knowledge page). Homepage is a proof-led product tour driven by `src/data/product.ts` and real screenshots captured from `dashboard.terraline.space`; `/learn` reuses the existing `JourneyLoop` knowledge components.

**Tech Stack:** Vite 6, React 19, TypeScript strict, Tailwind 4 (`@theme` tokens), `motion`, Vitest + Testing Library, Playwright (capture script), sharp (webp conversion).

**Spec:** `docs/superpowers/specs/2026-09-27-terraline-product-landing-design.md`

---

## File Structure

Created:
- `src/data/product.ts` — all homepage copy, features, roadmap, CTAs
- `src/components/Mark.tsx` — strata logo mark
- `src/components/Nav.tsx`, `Hero.tsx` (rewrite), `FactsStrip.tsx`, `ScreenshotFrame.tsx`, `FeatureBlock.tsx`, `CompareCards.tsx`, `ArchDiagram.tsx`, `RoadmapColumns.tsx`, `CTABand.tsx`, `Footer.tsx` (rewrite)
- `src/components/learn/Traceability.tsx`
- `src/LearnApp.tsx` — moved from `src/App.tsx`
- `learn/index.html`, `src/learn-main.tsx`
- `scripts/capture.mjs`, `public/og-template.html`, `public/screenshots/*.webp`
- `tests/product.test.ts`, `tests/site-components.test.tsx`, `tests/home.test.tsx`, `tests/learn.test.tsx`
- `.env.local` (never committed)

Modified:
- `src/index.css` (tokens + fonts), `index.html` (meta), `src/App.tsx` (new homepage), `vite.config.ts` (MPA input), `package.json` (capture script + devDeps), `.gitignore`

Deleted:
- `src/components/SkillsFlowDiagram.tsx`, `src/components/PulsePreview.tsx`, `src/components/EntityGraphProof.tsx`

---

### Task 0: Commit the pending baseline

**Files:** none (git only)

- [ ] **Step 1: Commit the pre-existing uncommitted work**

Run:
```bash
cd /home/ghifari/terra-landing
git add index.html src/App.tsx src/components/JourneyLoop.tsx src/components/SkillsFlowDiagram.tsx src/index.css vite.config.ts
git commit -m "feat: skills flow diagram + journey a11y polish"
```

- [ ] **Step 2: Confirm clean tree**

Run: `git status --short`
Expected: no output.

---

### Task 1: Design tokens and fonts

**Files:**
- Modify: `src/index.css` (full rewrite)
- Modify: `index.html:1-30` (font links + body comment)

- [ ] **Step 1: Rewrite `src/index.css`**

```css
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap");
@import "tailwindcss";

@theme {
  --color-bg: #ffffff;
  --color-ink: #0b1220;
  --color-muted: #5b6472;
  --color-border: #e2e6ee;
  --color-subtle: #f7f9fc;
  --color-brand: #3f76ff;
  --color-brand-strong: #2a5ce0;
  --font-display: "Inter", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;
}

html { scrollbar-gutter: stable; overflow-x: hidden; }
body {
  font-family: var(--font-body);
  background: var(--color-bg);
  color: var(--color-ink);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
::selection { background: var(--color-brand); color: #ffffff; }
:focus-visible { outline: 2px solid var(--color-brand-strong); outline-offset: 2px; }
:where(.font-mono) { font-variant-numeric: tabular-nums; }
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--color-border); }
::-webkit-scrollbar-thumb:hover { background: var(--color-muted); }
```

- [ ] **Step 2: Update `index.html` head fonts and body comment**

Replace the `<title>`…`<link rel="canonical">` block later in Task 12; for now ensure the font preconnects exist (they do) and replace the old thesis comment with:

```html
    <!-- Terraline product landing: open-source ITSM built on Plane. Proof-led tour with real screenshots; knowledge lives at /learn. -->
```

- [ ] **Step 3: Run tests to confirm nothing broke**

Run: `npm test -- --run`
Expected: existing JourneyLoop/ManagementCard/managements tests PASS (colors are hardcoded in keep components; tokens only affect the new work).

- [ ] **Step 4: Commit**

```bash
git add src/index.css index.html
git commit -m "style: product-native tokens (Inter, Terraline blue) replace Andon palette"
```

---

### Task 2: Product data model

**Files:**
- Create: `src/data/product.ts`
- Test: `tests/product.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/product.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { product } from '../src/data/product'

describe('product data', () => {
  it('has hero, facts, features, comparisons, roadmap and cta', () => {
    expect(product.hero.title.length).toBeGreaterThan(10)
    expect(product.facts.length).toBeGreaterThanOrEqual(4)
    expect(product.features).toHaveLength(9)
    expect(product.comparisons).toHaveLength(2)
    expect(product.roadmap.shipped.length).toBeGreaterThan(0)
    expect(product.roadmap.next.length).toBeGreaterThan(0)
    expect(product.cta.href.startsWith('mailto:')).toBe(true)
  })

  it('has unique feature ids and meaningful screenshots', () => {
    const ids = product.features.map((f) => f.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const f of product.features) {
      expect(f.screenshots.length).toBeGreaterThan(0)
      for (const s of f.screenshots) {
        expect(s.src).toMatch(/^\/screenshots\/[a-z-]+\.webp$/)
        expect(s.alt.length).toBeGreaterThan(10)
      }
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/product.test.ts`
Expected: FAIL — `Failed to resolve import "../src/data/product"`.

- [ ] **Step 3: Create `src/data/product.ts`**

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/product.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/data/product.ts tests/product.test.ts
git commit -m "feat: product data model for the credibility landing"
```

---

### Task 3: Mark, Nav, Footer

**Files:**
- Create: `src/components/Mark.tsx`, `src/components/Nav.tsx`
- Rewrite: `src/components/Footer.tsx`
- Test: `tests/site-components.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/site-components.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Nav from '../src/components/Nav'
import Footer from '../src/components/Footer'

describe('Nav', () => {
  it('links to product sections, learn and request access', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: /terraline/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Learn' })).toHaveAttribute('href', '/learn')
    expect(screen.getAllByRole('link', { name: /request access/i }).length).toBeGreaterThan(0)
  })
})

describe('Footer', () => {
  it('keeps Plane attribution and contact', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /built on plane/i })).toHaveAttribute('href', 'https://plane.so')
    expect(screen.getByRole('link', { name: /learn/i })).toHaveAttribute('href', '/learn')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/site-components.test.tsx`
Expected: FAIL — `Failed to resolve import "../src/components/Nav"`.

- [ ] **Step 3: Create `src/components/Mark.tsx`**

```tsx
type Props = { className?: string }

export default function Mark({ className = 'h-4 w-auto' }: Props) {
  return (
    <svg viewBox="0 0 20 14" className={className} aria-hidden="true" focusable="false">
      <rect x="0" y="0" width="20" height="4" rx="2" fill="currentColor" />
      <rect x="3" y="5" width="14" height="4" rx="2" fill="currentColor" opacity="0.72" />
      <rect x="6" y="10" width="8" height="4" rx="2" fill="currentColor" opacity="0.45" />
    </svg>
  )
}
```

- [ ] **Step 4: Create `src/components/Nav.tsx`**

```tsx
import Mark from './Mark'
import { product } from '../data/product'

const links = [
  { href: '#product', label: 'Product' },
  { href: '#why', label: 'Why Terraline' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '/learn', label: 'Learn' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1140px] items-center justify-between px-5">
        <a href="/" className="flex items-center gap-2 text-brand">
          <Mark className="h-[14px] w-auto" />
          <span className="text-[15px] font-semibold tracking-tight text-ink">Terraline</span>
        </a>
        <nav className="hidden items-center gap-6 text-[13px] text-muted md:flex" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={product.cta.href}
          className="rounded-md bg-brand-strong px-3.5 py-2 text-[13px] font-medium text-white hover:bg-[#2450c8]"
        >
          Request access
        </a>
      </div>
    </header>
  )
}
```

- [ ] **Step 5: Rewrite `src/components/Footer.tsx`**

```tsx
import Mark from './Mark'
import { product } from '../data/product'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-subtle">
      <div className="mx-auto flex max-w-[1140px] flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-brand">
          <Mark className="h-[14px] w-auto" />
          <span className="text-[13px] font-semibold text-ink">Terraline</span>
          <span className="text-[12px] text-muted">— {product.footer.tagline}</span>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-[12px] text-muted" aria-label="Footer">
          <a href="/" className="hover:text-ink">Product</a>
          <a href="/learn" className="hover:text-ink">Learn</a>
          <a href={product.footer.contact} className="hover:text-ink">Contact</a>
          <a
            href={product.footer.planeUrl}
            className="rounded-full border border-border px-2.5 py-1 hover:border-brand hover:text-ink"
          >
            Built on Plane · AGPL-3.0
          </a>
        </nav>
      </div>
    </footer>
  )
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run tests/site-components.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 7: Commit**

```bash
git add src/components/Mark.tsx src/components/Nav.tsx src/components/Footer.tsx tests/site-components.test.tsx
git commit -m "feat: brand mark, nav and footer for the product landing"
```

---

### Task 4: Hero, FactsStrip, ScreenshotFrame

**Files:**
- Create: `src/components/ScreenshotFrame.tsx`, `src/components/FactsStrip.tsx`
- Rewrite: `src/components/Hero.tsx`
- Test: append to `tests/site-components.test.tsx`

- [ ] **Step 1: Write the failing tests**

Add the new imports next to the existing ones at the top of `tests/site-components.test.tsx`, then append:

```tsx
import Hero from '../src/components/Hero'
import FactsStrip from '../src/components/FactsStrip'
import { product } from '../src/data/product'

describe('Hero', () => {
  it('renders the headline, both CTAs and the hero screenshot', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1, name: /run services and delivery work/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: product.hero.primaryCta.label })).toHaveAttribute('href', product.hero.primaryCta.href)
    expect(screen.getByRole('link', { name: product.hero.secondaryCta.label })).toHaveAttribute('href', '#product')
    expect(screen.getByAltText(/work items board/i)).toBeInTheDocument()
  })
})

describe('FactsStrip', () => {
  it('renders every platform fact', () => {
    render(<FactsStrip />)
    for (const fact of product.facts) expect(screen.getByText(fact)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/site-components.test.tsx`
Expected: FAIL — `Failed to resolve import "../src/components/Hero"`.

- [ ] **Step 3: Create `src/components/ScreenshotFrame.tsx`**

```tsx
import type { Screenshot } from '../data/product'

type Props = Screenshot & { priority?: boolean; className?: string }

export default function ScreenshotFrame({ src, alt, width, height, priority = false, className = '' }: Props) {
  return (
    <figure className={`overflow-hidden rounded-lg border border-border bg-subtle shadow-sm ${className}`}>
      <div className="flex h-8 items-center gap-1.5 border-b border-border bg-white px-3" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
      </div>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className="block h-auto w-full"
      />
    </figure>
  )
}
```

- [ ] **Step 4: Rewrite `src/components/Hero.tsx`**

```tsx
import { product } from '../data/product'
import ScreenshotFrame from './ScreenshotFrame'

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1140px] px-5 pt-14 pb-10 lg:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">{product.hero.eyebrow}</p>
          <h1 className="mt-4 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[42px] lg:text-[50px]">
            {product.hero.title}
          </h1>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.7] text-muted">{product.hero.body}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={product.hero.primaryCta.href}
              className="rounded-md bg-brand-strong px-5 py-2.5 text-[14px] font-medium text-white hover:bg-[#2450c8]"
            >
              {product.hero.primaryCta.label}
            </a>
            <a
              href={product.hero.secondaryCta.href}
              className="rounded-md border border-border px-5 py-2.5 text-[14px] font-medium text-ink hover:border-brand"
            >
              {product.hero.secondaryCta.label}
            </a>
          </div>
        </div>
        <ScreenshotFrame {...product.hero.screenshot} priority />
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create `src/components/FactsStrip.tsx`**

```tsx
import { product } from '../data/product'

export default function FactsStrip() {
  return (
    <section aria-label="Platform facts" className="border-y border-border bg-subtle">
      <ul className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-4 font-mono text-[12px] text-muted">
        {product.facts.map((fact) => (
          <li key={fact} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            {fact}
          </li>
        ))}
      </ul>
    </section>
  )
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run tests/site-components.test.tsx`
Expected: PASS (4 tests).

- [ ] **Step 7: Commit**

```bash
git add src/components/ScreenshotFrame.tsx src/components/Hero.tsx src/components/FactsStrip.tsx tests/site-components.test.tsx
git commit -m "feat: hero, facts strip and screenshot frame"
```

---

### Task 5: FeatureBlock (product tour)

**Files:**
- Create: `src/components/FeatureBlock.tsx`
- Test: append to `tests/site-components.test.tsx`

- [ ] **Step 1: Write the failing test**

Add the new imports next to the existing ones at the top of `tests/site-components.test.tsx`, then append:

```tsx
import FeatureBlock from '../src/components/FeatureBlock'

describe('FeatureBlock', () => {
  it('renders eyebrow, title, bullets and every screenshot', () => {
    const feature = product.features[2]
    render(<FeatureBlock feature={feature} index={2} />)
    expect(screen.getByRole('heading', { level: 3, name: feature.title })).toBeInTheDocument()
    expect(screen.getByText(feature.eyebrow)).toBeInTheDocument()
    for (const bullet of feature.bullets) expect(screen.getByText(bullet)).toBeInTheDocument()
    for (const s of feature.screenshots) expect(screen.getByAltText(s.alt)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/site-components.test.tsx`
Expected: FAIL — `Failed to resolve import "../src/components/FeatureBlock"`.

- [ ] **Step 3: Create `src/components/FeatureBlock.tsx`**

```tsx
import type { Feature } from '../data/product'
import ScreenshotFrame from './ScreenshotFrame'

type Props = { feature: Feature; index: number }

export default function FeatureBlock({ feature, index }: Props) {
  const flip = index % 2 === 1
  const [main, ...rest] = feature.screenshots

  return (
    <article className="grid items-center gap-8 lg:grid-cols-2">
      <div className={flip ? 'lg:order-2' : ''}>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">{feature.eyebrow}</p>
        <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.01em] text-ink">{feature.title}</h3>
        <p className="mt-3 text-[14px] leading-[1.7] text-muted">{feature.body}</p>
        <ul className="mt-4 space-y-2">
          {feature.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2 text-[13px] leading-[1.6] text-muted">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
      <div className={`space-y-3 ${flip ? 'lg:order-1' : ''}`}>
        <ScreenshotFrame {...main} />
        {rest.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {rest.map((s) => (
              <ScreenshotFrame key={s.src} {...s} />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/site-components.test.tsx`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/FeatureBlock.tsx tests/site-components.test.tsx
git commit -m "feat: feature block with screenshot stack"
```

---

### Task 6: CompareCards, RoadmapColumns, CTABand

**Files:**
- Create: `src/components/CompareCards.tsx`, `src/components/RoadmapColumns.tsx`, `src/components/CTABand.tsx`
- Test: append to `tests/site-components.test.tsx`

- [ ] **Step 1: Write the failing tests**

Add the new imports next to the existing ones at the top of `tests/site-components.test.tsx`, then append:

```tsx
import CompareCards from '../src/components/CompareCards'
import RoadmapColumns from '../src/components/RoadmapColumns'
import CTABand from '../src/components/CTABand'

describe('CompareCards', () => {
  it('renders both comparisons with their points', () => {
    render(<CompareCards />)
    for (const c of product.comparisons) {
      expect(screen.getByRole('heading', { level: 3, name: c.title })).toBeInTheDocument()
      for (const point of c.points) expect(screen.getByText(point)).toBeInTheDocument()
    }
  })
})

describe('RoadmapColumns', () => {
  it('renders shipped and next columns', () => {
    render(<RoadmapColumns />)
    expect(screen.getByRole('heading', { level: 3, name: /shipped today/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /^next$/i })).toBeInTheDocument()
    expect(screen.getByText(product.roadmap.next[0])).toBeInTheDocument()
  })
})

describe('CTABand', () => {
  it('renders the request-access CTA', () => {
    render(<CTABand />)
    expect(screen.getByRole('heading', { level: 2, name: product.cta.title })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: product.cta.label })).toHaveAttribute('href', product.cta.href)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/site-components.test.tsx`
Expected: FAIL — unresolved imports for the three components.

- [ ] **Step 3: Create `src/components/CompareCards.tsx`**

```tsx
import { product } from '../data/product'

export default function CompareCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {product.comparisons.map((comparison) => (
        <article key={comparison.title} className="rounded-lg border border-border bg-white p-6">
          <h3 className="text-[17px] font-semibold text-ink">{comparison.title}</h3>
          <p className="mt-2 text-[13px] leading-[1.7] text-muted">{comparison.body}</p>
          <ul className="mt-4 space-y-2">
            {comparison.points.map((point) => (
              <li key={point} className="flex gap-2 text-[13px] text-ink">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Create `src/components/RoadmapColumns.tsx`**

```tsx
import { product } from '../data/product'

export default function RoadmapColumns() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <article className="rounded-lg border border-border bg-white p-6">
        <h3 className="text-[17px] font-semibold text-ink">Shipped today</h3>
        <ul className="mt-4 space-y-2">
          {product.roadmap.shipped.map((item) => (
            <li key={item} className="flex gap-2.5 text-[13px] text-ink">
              <span className="font-mono text-[13px] text-brand" aria-hidden="true">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </article>
      <article className="rounded-lg border border-border bg-subtle p-6">
        <h3 className="text-[17px] font-semibold text-ink">Next</h3>
        <ul className="mt-4 space-y-2">
          {product.roadmap.next.map((item) => (
            <li key={item} className="flex gap-2.5 text-[13px] text-muted">
              <span className="font-mono text-[13px]" aria-hidden="true">→</span>
              {item}
            </li>
          ))}
        </ul>
      </article>
    </div>
  )
}
```

- [ ] **Step 5: Create `src/components/CTABand.tsx`**

```tsx
import { product } from '../data/product'

export default function CTABand() {
  return (
    <section className="border-y border-border bg-subtle">
      <div className="mx-auto max-w-[1140px] px-5 py-14 text-center">
        <h2 className="text-[24px] font-semibold tracking-[-0.02em] text-ink sm:text-[28px]">{product.cta.title}</h2>
        <p className="mx-auto mt-3 max-w-[56ch] text-[14px] leading-[1.7] text-muted">{product.cta.body}</p>
        <a
          href={product.cta.href}
          className="mt-6 inline-block rounded-md bg-brand-strong px-6 py-3 text-[14px] font-medium text-white hover:bg-[#2450c8]"
        >
          {product.cta.label}
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run tests/site-components.test.tsx`
Expected: PASS (8 tests).

- [ ] **Step 7: Commit**

```bash
git add src/components/CompareCards.tsx src/components/RoadmapColumns.tsx src/components/CTABand.tsx tests/site-components.test.tsx
git commit -m "feat: comparison, roadmap and CTA sections"
```

---

### Task 7: ArchDiagram

**Files:**
- Create: `src/components/ArchDiagram.tsx`
- Test: append to `tests/site-components.test.tsx`

- [ ] **Step 1: Write the failing test**

Add the new imports next to the existing ones at the top of `tests/site-components.test.tsx`, then append:

```tsx
import ArchDiagram from '../src/components/ArchDiagram'

describe('ArchDiagram', () => {
  it('renders the architecture diagram with the stack facts', () => {
    render(<ArchDiagram />)
    expect(screen.getByRole('img', { name: /architecture/i })).toBeInTheDocument()
    for (const fact of product.architecture.facts) expect(screen.getByText(fact)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/site-components.test.tsx`
Expected: FAIL — `Failed to resolve import "../src/components/ArchDiagram"`.

- [ ] **Step 3: Create `src/components/ArchDiagram.tsx`**

```tsx
import { product } from '../data/product'

export default function ArchDiagram() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
      <div className="rounded-lg border border-border bg-subtle p-4">
        <svg
          viewBox="0 0 960 280"
          className="w-full"
          role="img"
          aria-label="Architecture: browser SPA, Rust API, Postgres, Redis Stream and a live collaboration server"
        >
          <rect x="30" y="40" width="220" height="70" rx="8" fill="#ffffff" stroke="#e2e6ee" />
          <text x="140" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0b1220">Browser SPA</text>
          <text x="140" y="92" textAnchor="middle" fontSize="11" fill="#5b6472">React 19 · React Router</text>

          <rect x="330" y="40" width="240" height="70" rx="8" fill="#ffffff" stroke="#e2e6ee" />
          <text x="450" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0b1220">Rust API (Axum)</text>
          <text x="450" y="92" textAnchor="middle" fontSize="11" fill="#5b6472">REST + token auth</text>

          <rect x="660" y="20" width="250" height="60" rx="8" fill="#ffffff" stroke="#e2e6ee" />
          <text x="785" y="46" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0b1220">Postgres</text>
          <text x="785" y="64" textAnchor="middle" fontSize="11" fill="#5b6472">per-table model</text>

          <rect x="660" y="100" width="250" height="60" rx="8" fill="#ffffff" stroke="#e2e6ee" />
          <text x="785" y="126" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0b1220">Redis Stream</text>
          <text x="785" y="144" textAnchor="middle" fontSize="11" fill="#5b6472">background jobs</text>

          <rect x="330" y="180" width="240" height="70" rx="8" fill="#eef3ff" stroke="#bcd0f7" />
          <text x="450" y="212" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0b1220">Live server</text>
          <text x="450" y="232" textAnchor="middle" fontSize="11" fill="#5b6472">Yjs collaboration</text>

          <path d="M250 75 H330" stroke="#5b6472" strokeDasharray="4 4" />
          <text x="290" y="66" textAnchor="middle" fontSize="10" fill="#5b6472">HTTPS</text>
          <path d="M570 60 H660" stroke="#5b6472" strokeDasharray="4 4" />
          <text x="615" y="52" textAnchor="middle" fontSize="10" fill="#5b6472">SQL</text>
          <path d="M570 85 H660 V120" stroke="#5b6472" strokeDasharray="4 4" fill="none" />
          <text x="630" y="112" textAnchor="middle" fontSize="10" fill="#5b6472">jobs</text>
          <path d="M140 110 V215 H330" stroke="#5b6472" strokeDasharray="4 4" fill="none" />
          <text x="212" y="207" textAnchor="middle" fontSize="10" fill="#5b6472">WebSocket</text>
        </svg>
      </div>
      <div>
        <p className="text-[14px] leading-[1.7] text-muted">{product.architecture.body}</p>
        <ul className="mt-4 space-y-2">
          {product.architecture.facts.map((fact) => (
            <li key={fact} className="flex items-center gap-2 font-mono text-[12px] text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/site-components.test.tsx`
Expected: PASS (9 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/ArchDiagram.tsx tests/site-components.test.tsx
git commit -m "feat: architecture diagram section"
```

---

### Task 8: Homepage composition

**Files:**
- Rewrite: `src/App.tsx`
- Test: `tests/home.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/home.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../src/App'
import { product } from '../src/data/product'

describe('homepage', () => {
  it('renders the full proof-led tour', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: product.hero.title })).toBeInTheDocument()
    for (const fact of product.facts) expect(screen.getByText(fact)).toBeInTheDocument()
    for (const feature of product.features) {
      expect(screen.getByRole('heading', { level: 3, name: feature.title })).toBeInTheDocument()
    }
    expect(screen.getByRole('heading', { level: 3, name: /shipped today/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: product.cta.title })).toBeInTheDocument()
  })

  it('links to /learn and request access', () => {
    render(<App />)
    const learnLinks = screen.getAllByRole('link', { name: 'Learn' })
    expect(learnLinks.length).toBeGreaterThan(0)
    for (const link of learnLinks) expect(link).toHaveAttribute('href', '/learn')
    expect(screen.getAllByRole('link', { name: /request (access|a demo)/i }).length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/home.test.tsx`
Expected: FAIL — the current `App.tsx` renders the old knowledge page (no `Run services…` heading).

- [ ] **Step 3: Rewrite `src/App.tsx`**

```tsx
import type { ReactNode } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import FactsStrip from './components/FactsStrip'
import FeatureBlock from './components/FeatureBlock'
import CompareCards from './components/CompareCards'
import ArchDiagram from './components/ArchDiagram'
import RoadmapColumns from './components/RoadmapColumns'
import CTABand from './components/CTABand'
import Footer from './components/Footer'
import { product } from './data/product'

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="mx-auto max-w-[1140px] px-5 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">{eyebrow}</p>
      <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.02em] text-ink sm:text-[32px]">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  )
}

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-bg text-ink">
      <Nav />
      <main>
        <Hero />
        <FactsStrip />
        <Section id="product" eyebrow="Product tour" title="What you get, on day one">
          <div className="space-y-16">
            {product.features.map((feature, index) => (
              <FeatureBlock key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </Section>
        <div className="border-y border-border bg-white">
          <Section id="why" eyebrow="Why Terraline" title="A service layer on a proven delivery core">
            <CompareCards />
          </Section>
        </div>
        <Section id="architecture" eyebrow="Architecture & operations" title="Built to self-host, built to stay fast">
          <ArchDiagram />
        </Section>
        <div className="border-y border-border bg-white">
          <Section id="roadmap" eyebrow="Roadmap" title="Shipped today, next in line">
            <RoadmapColumns />
          </Section>
        </div>
        <CTABand />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/home.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Run the whole suite and typecheck**

Run: `npm test -- --run && npx tsc -b`
Expected: all tests PASS; tsc exits 0.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx tests/home.test.tsx
git commit -m "feat: homepage composition (proof-led product tour)"
```

---

### Task 9: Screenshot capture script

**Files:**
- Create: `scripts/capture.mjs`, `.env.local` (local only)
- Modify: `package.json` (devDeps + `capture` script), `.gitignore`
- Test: append file-existence test to `tests/product.test.ts`

**Prerequisite:** create `.env.local` in the repo root (never committed) with:

```
CAPTURE_EMAIL=<the demo account email>
CAPTURE_PASSWORD=<the demo account password>
# optional overrides if auto-discovery fails:
# CAPTURE_BASE_URL=https://dashboard.terraline.space
# CAPTURE_WORKSPACE=<workspace slug>
# CAPTURE_PROJECT=<project uuid>
# CAPTURE_WORKITEM=<IDENTIFIER-SEQUENCE>
```

- [ ] **Step 1: Add ignores**

Append to `.gitignore`:

```
.env.local
.capture/
.superpowers/
```

- [ ] **Step 2: Install tooling**

Run: `npm i -D playwright sharp && npx playwright install chromium`
Expected: packages added; chromium available (a cached build already exists under `~/.cache/ms-playwright`).

- [ ] **Step 3: Create `scripts/capture.mjs`**

```js
import { chromium } from 'playwright'
import sharp from 'sharp'
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const OUT = resolve(ROOT, 'public/screenshots')
const STATE = resolve(ROOT, '.capture/state.json')

function loadLocalEnv() {
  const path = resolve(ROOT, '.env.local')
  if (!existsSync(path)) return
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

loadLocalEnv()

const BASE = process.env.CAPTURE_BASE_URL ?? 'https://dashboard.terraline.space'

async function login(page) {
  const email = process.env.CAPTURE_EMAIL
  const password = process.env.CAPTURE_PASSWORD
  if (!email || !password) throw new Error('Set CAPTURE_EMAIL and CAPTURE_PASSWORD in .env.local')
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
  const emailInput = page.locator('input[type="email"]')
  try {
    await emailInput.waitFor({ timeout: 8000 })
  } catch {
    return // already signed in via storageState
  }
  await emailInput.fill(email)
  await page.locator('button[type="submit"]').first().click()
  const passwordInput = page.locator('input[type="password"]')
  await passwordInput.waitFor({ timeout: 8000 })
  await passwordInput.fill(password)
  await page.locator('button[type="submit"]').first().click()
  await page.waitForFunction(() => !document.querySelector('input[type="password"]'), null, { timeout: 20000 })
}

async function discover(page) {
  const api = async (url) => {
    const res = await page.evaluate(async (u) => {
      const r = await fetch(u, { credentials: 'include' })
      return r.ok ? r.json() : null
    }, url)
    return res ? (Array.isArray(res) ? res : res.results ?? []) : []
  }

  let slug = process.env.CAPTURE_WORKSPACE
  if (!slug) {
    const workspaces = await api('/api/workspaces/')
    slug = workspaces[0]?.slug
  }
  let projectId = process.env.CAPTURE_PROJECT
  let identifier = process.env.CAPTURE_WORKITEM
  if (slug && !projectId) {
    const projects = await api(`/api/workspaces/${slug}/projects/`)
    projectId = projects[0]?.id
    const issues = projectId ? await api(`/api/workspaces/${slug}/projects/${projectId}/issues/?per_page=1`) : []
    const issue = issues[0]
    if (!identifier && issue) identifier = `${projects[0].identifier}-${issue.sequence_id}`
  }
  if (!slug || !projectId) {
    throw new Error('Could not discover workspace/project — set CAPTURE_WORKSPACE and CAPTURE_PROJECT in .env.local')
  }
  return { slug, projectId, identifier }
}

const shots = [
  { file: 'work-items-list', path: (c) => `/${c.slug}/projects/${c.projectId}/issues/` },
  {
    file: 'work-items-board',
    path: (c) => `/${c.slug}/projects/${c.projectId}/issues/`,
    action: async (page) => {
      const board = page.getByRole('button', { name: /^board$/i }).first()
      if (await board.count()) await board.click().catch(() => {})
    },
  },
  {
    file: 'work-item-detail',
    path: (c) => `/${c.slug}/browse/${c.identifier}`,
  },
  {
    file: 'galileo',
    path: (c) => `/${c.slug}/browse/${c.identifier}`,
    action: async (page) => {
      const trigger = page.getByRole('button', { name: /galileo|ai assistant/i }).first()
      if (await trigger.count()) await trigger.click().catch(() => {})
    },
  },
  { file: 'work-item-types', path: (c) => `/${c.slug}/settings/work-item-types` },
  { file: 'workflow-editor', path: (c) => `/${c.slug}/settings/workflows` },
  { file: 'services-board', path: (c) => `/${c.slug}/projects/${c.projectId}/services/` },
  {
    file: 'services-graph',
    path: (c) => `/${c.slug}/projects/${c.projectId}/services/`,
    action: async (page) => {
      const graph = page.getByRole('button', { name: /^graph$/i }).first()
      if (await graph.count()) await graph.click().catch(() => {})
    },
  },
  {
    file: 'service-detail',
    path: (c) => `/${c.slug}/projects/${c.projectId}/services/`,
    action: async (page) => {
      const row = page.locator('a[href*="/services/"]').first()
      if (await row.count()) {
        await row.click().catch(() => {})
        await page.waitForLoadState('networkidle').catch(() => {})
      }
    },
  },
  { file: 'intake', path: (c) => `/${c.slug}/projects/${c.projectId}/intake/` },
  { file: 'pages-live', path: (c) => `/${c.slug}/projects/${c.projectId}/pages/` },
  { file: 'scheduler', path: (c) => `/${c.slug}/scheduler/` },
  { file: 'analytics', path: (c) => `/${c.slug}/analytics/` },
]

async function shoot(page, file) {
  const buffer = await page.screenshot({ type: 'png' })
  await sharp(buffer).webp({ quality: 82 }).toFile(resolve(OUT, `${file}.webp`))
  console.log(`captured ${file}.webp`)
}

async function main() {
  mkdirSync(OUT, { recursive: true })
  mkdirSync(resolve(ROOT, '.capture'), { recursive: true })

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    storageState: existsSync(STATE) ? STATE : undefined,
  })
  const page = await context.newPage()
  await login(page)
  await context.storageState({ path: STATE })
  const cfg = await discover(page)

  for (const shot of shots) {
    if ((shot.file === 'work-item-detail' || shot.file === 'galileo') && !cfg.identifier) continue
    await page.goto(BASE + shot.path(cfg), { waitUntil: 'domcontentloaded' }).catch(() => {})
    await page.waitForLoadState('networkidle').catch(() => {})
    if (shot.action) await shot.action(page)
    await page.waitForTimeout(900)
    await shoot(page, shot.file)
  }

  if (!cfg.identifier) {
    console.warn('skipping mobile-work-item: no work item identifier discovered')
  } else {
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      storageState: STATE,
    })
    const mobilePage = await mobileContext.newPage()
    await mobilePage.goto(BASE + `/${cfg.slug}/browse/${cfg.identifier}`, { waitUntil: 'domcontentloaded' }).catch(() => {})
    await mobilePage.waitForTimeout(1200)
    await shoot(mobilePage, 'mobile-work-item')
    await mobileContext.close()
  }

  const ogTemplate = resolve(ROOT, 'public/og-template.html')
  if (existsSync(ogTemplate)) {
    const ogPage = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
    await ogPage.goto('file://' + ogTemplate)
    await ogPage.waitForTimeout(400)
    await ogPage.screenshot({ path: resolve(ROOT, 'public/og-image.png') })
    console.log('captured og-image.png')
  }

  await browser.close()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
```

- [ ] **Step 4: Add the capture script to `package.json`**

Add to `"scripts"`:

```json
    "capture": "node scripts/capture.mjs"
```

- [ ] **Step 5: Run the capture**

Run: `npm run capture`
Expected: `captured <name>.webp` for `work-items-list`, `work-items-board`, `work-item-detail`, `galileo`, `work-item-types`, `workflow-editor`, `services-board`, `services-graph`, `service-detail`, `intake`, `pages-live`, `scheduler`, `analytics`, `mobile-work-item`. `public/og-template.html` does not exist yet, so the OG step is skipped.

If a shot lands on the wrong screen (for example the board switch selector changed), open the `.webp`, inspect the live UI, adjust the `action` selector in `scripts/capture.mjs`, and re-run. Do not hand-edit screenshots.

- [ ] **Step 6: Verify capture visually**

Open three files and confirm content matches filename: `public/screenshots/work-items-list.webp`, `public/screenshots/services-graph.webp`, `public/screenshots/galileo.webp`. Re-run after selector fixes if not.

- [ ] **Step 7: Add the screenshot file-existence test**

In `tests/product.test.ts`, change the import block at the top to:

```ts
import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { product } from '../src/data/product'

const publicDir = fileURLToPath(new URL('../public', import.meta.url))
```

Then append at the end of the file:

```ts
describe('screenshot files', () => {
  it('every referenced screenshot exists on disk', () => {
    for (const feature of product.features) {
      for (const screenshot of feature.screenshots) {
        expect(existsSync(publicDir + screenshot.src), `missing ${screenshot.src}`).toBe(true)
      }
    }
    expect(existsSync(publicDir + product.hero.screenshot.src)).toBe(true)
  })
})
```

- [ ] **Step 8: Run tests**

Run: `npx vitest run tests/product.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 9: Commit**

```bash
git add scripts/capture.mjs package.json package-lock.json .gitignore tests/product.test.ts public/screenshots
git commit -m "feat: playwright screenshot capture + real product proof"
```

---

### Task 10: `/learn` MPA entry

**Files:**
- Create: `learn/index.html`, `src/learn-main.tsx`, `src/components/learn/Traceability.tsx`, `src/LearnApp.tsx` (recovered from git history)
- Modify: `vite.config.ts`
- Test: `tests/learn.test.tsx`

**Execution note:** This task assumes Tasks 0–9 are done, so the old knowledge page only exists in git history (the Task 0 baseline commit).

- [ ] **Step 1: Recover the knowledge page as `src/LearnApp.tsx`**

```bash
git show "$(git log --format=%H -1 --grep='skills flow diagram + journey a11y polish'):src/App.tsx" > src/LearnApp.tsx
wc -l src/LearnApp.tsx
```
Expected: ~283 lines.

- [ ] **Step 2: Edit `src/LearnApp.tsx` — imports**

Replace:
```tsx
import JourneyLoop from './components/JourneyLoop'
import SkillsFlowDiagram from './components/SkillsFlowDiagram'
import HazardTape, { DottedDivider } from './components/HazardTape'
import { managements } from './data/managements'
```
with:
```tsx
import JourneyLoop from './components/JourneyLoop'
import HazardTape, { DottedDivider } from './components/HazardTape'
import SkillsSection from './components/SkillsSection'
import Footer from './components/Footer'
import Traceability from './components/learn/Traceability'
import { managements } from './data/managements'
```

- [ ] **Step 3: Edit `src/LearnApp.tsx` — header**

Replace the whole `<header>…</header>` block (from `<header className="sticky top-0…">` through `</header>`) with:

```tsx
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-[#eaeaea]">
        <div className="h-[3px] w-full bg-[#FAFF00]" aria-hidden />
        <div className="max-w-[1100px] mx-auto px-6 h-[49px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="h-[28px] w-[28px] bg-black text-white grid place-items-center font-semibold text-[13px] leading-none relative overflow-hidden">
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FAFF00]" aria-hidden />
              T
            </a>
            <a href="/" className="font-mono text-[13px] tracking-tight font-medium hover:underline">Terraline</a>
            <span className="hidden sm:inline text-[#666] text-[13px]">Learn</span>
            <span className="hidden md:inline-flex ml-1 h-5 items-center rounded-full border border-[#eaeaea] bg-[#fafafa] px-2 font-mono text-[11px] text-[#666]">8 practices</span>
          </div>
          <nav className="flex items-center gap-4 font-mono text-[13px]">
            <a href="#practices" className="hidden sm:inline text-[#666] hover:text-black">Practices</a>
            <a href="#principles" className="hidden sm:inline text-[#666] hover:text-black">Principles</a>
            <a href="/" className="text-black hover:underline underline-offset-4">← Product</a>
            <a href="mailto:support@terraline.space?subject=Terraline%20demo%20access" className="hidden sm:inline-flex items-center h-8 px-3 rounded-full bg-black text-white hover:bg-[#1a1a1a]">Request access</a>
          </nav>
        </div>
      </header>
```

- [ ] **Step 4: Edit `src/LearnApp.tsx` — body content**

Remove the line `<SkillsFlowDiagram />`. After the intro 3-point section (`</section>` that ends with `8 practices · 56 skills · start with Incident`) and before the controls block, insert:

```tsx
      <SkillsSection />

      <Traceability />
```

Then replace the closing footer block (from `<HazardTape variant="thin" />` through `</footer>`) with:

```tsx
      <HazardTape variant="thin" />
      <Footer />
```

- [ ] **Step 5: Create `src/components/learn/Traceability.tsx`**

```tsx
const items = [
  {
    title: 'Comments & activity',
    body: 'Each record keeps the conversation and the change trail: who moved it, when, and why.',
  },
  {
    title: 'Versions',
    body: 'Descriptions keep their history, so an edit never erases the original wording.',
  },
  {
    title: 'Linked records',
    body: 'Related work stays one hop away: the fix links to the problem, the problem to the knowledge article.',
  },
]

export default function Traceability() {
  return (
    <section id="traceability" className="max-w-[1100px] mx-auto w-full px-6 py-10">
      <div className="rounded-lg border border-[#eaeaea] overflow-hidden">
        <div className="px-6 py-5 border-b border-dashed border-[#1a1d23]/12 bg-[#fafafa]">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#999]">Traceability</div>
          <h2 className="font-display font-semibold text-[20px] tracking-[-0.01em] mt-1">Why records stay trustworthy</h2>
        </div>
        <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-dashed divide-[#1a1d23]/12 sm:divide-[#eaeaea]">
          {items.map((item) => (
            <div key={item.title} className="p-6">
              <h3 className="font-semibold text-[14px] tracking-[-0.01em]">{item.title}</h3>
              <p className="text-[13px] leading-[1.6] text-[#666] mt-2">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Create `learn/index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <title>Terraline Learn — Open ITSM knowledge</title>
    <meta name="description" content="8 IT service management practices with one AI skill per stage — the open ITSM knowledge base." />
    <link rel="canonical" href="https://terraline.space/learn" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/learn-main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Create `src/learn-main.tsx`**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import LearnApp from './LearnApp'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LearnApp />
  </React.StrictMode>,
)
```

- [ ] **Step 8: Configure MPA input in `vite.config.ts`**

Add the import and input map:

```ts
import { fileURLToPath } from 'node:url'
```

```ts
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        learn: fileURLToPath(new URL('./learn/index.html', import.meta.url)),
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion', 'motion'],
          lucide: ['lucide-react'],
        },
      },
    },
  },
```

- [ ] **Step 9: Write `tests/learn.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LearnApp from '../src/LearnApp'

describe('learn page', () => {
  it('keeps the knowledge content and links back to the product', () => {
    render(<LearnApp />)
    expect(screen.getByText('Incident Management')).toBeInTheDocument()
    expect(screen.getByText(/Assets & configuration as the foundation/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /why records stay trustworthy/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /← product/i })).toHaveAttribute('href', '/')
  })
})
```

- [ ] **Step 10: Run the tests and build**

Run: `npm test -- --run && npm run build`
Expected: all tests PASS; build emits `dist/index.html` and `dist/learn/index.html`.

- [ ] **Step 11: Commit**

```bash
git add learn src/LearnApp.tsx src/learn-main.tsx src/components/learn/Traceability.tsx vite.config.ts tests/learn.test.tsx
git commit -m "feat: /learn knowledge page as second MPA entry"
```

---

### Task 11: Remove obsolete components

**Files:**
- Delete: `src/components/SkillsFlowDiagram.tsx`, `src/components/PulsePreview.tsx`, `src/components/EntityGraphProof.tsx`
- Modify: `.gitignore` already covers `.superpowers/`

- [ ] **Step 1: Confirm nothing imports them**

Run: `rg -n "SkillsFlowDiagram|PulsePreview|EntityGraphProof" src tests`
Expected: no output (Task 10 removed the last import).

- [ ] **Step 2: Delete**

```bash
git rm src/components/SkillsFlowDiagram.tsx src/components/PulsePreview.tsx src/components/EntityGraphProof.tsx
```

- [ ] **Step 3: Full check**

Run: `npm test -- --run && npx tsc -b`
Expected: tests PASS, tsc exits 0. (`npm run lint` is not usable: the repo has no ESLint config; out of scope.)

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: drop leftover knowledge-landing components"
```

---

### Task 12: Meta, OG image and homepage HTML

**Files:**
- Modify: `index.html`
- Create: `public/og-template.html`
- Regenerate: `public/og-image.png` (via `npm run capture`)

- [ ] **Step 1: Rewrite `index.html` head**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <title>Terraline — Open-source IT service management platform</title>
    <meta name="description" content="Terraline is open-source IT service management built on Plane: work items, a service catalog, typed workflows and AI in the loop — self-hosted, traceable, real-time." />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Terraline — Open-source IT service management" />
    <meta property="og:description" content="Work items, a service catalog, typed workflows and AI in the loop. Self-hosted, traceable, real-time." />
    <meta property="og:url" content="https://terraline.space/" />
    <meta property="og:image" content="/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Terraline — open-source IT service management built on Plane" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Terraline — Open-source IT service management" />
    <meta name="twitter:description" content="Work items, a service catalog, typed workflows and AI in the loop." />
    <meta name="twitter:image" content="/og-image.png" />
    <link rel="canonical" href="https://terraline.space/" />
  </head>
  <body>
    <!-- Terraline product landing: open-source ITSM built on Plane. Proof-led tour with real screenshots; knowledge lives at /learn. -->
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Create `public/og-template.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      * { margin: 0; box-sizing: border-box; }
      body {
        width: 1200px; height: 630px; display: flex; align-items: center; gap: 56px;
        padding: 64px; font-family: Inter, system-ui, sans-serif; background: #ffffff; color: #0b1220;
      }
      .copy { flex: 1; }
      .eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: 18px; letter-spacing: 0.14em; text-transform: uppercase; color: #3f76ff; }
      h1 { font-size: 54px; line-height: 1.05; letter-spacing: -0.03em; margin-top: 18px; }
      p { font-size: 20px; line-height: 1.5; color: #5b6472; margin-top: 18px; max-width: 30ch; }
      .shot { width: 520px; border: 1px solid #e2e6ee; border-radius: 12px; overflow: hidden; box-shadow: 0 18px 40px rgba(11,18,32,0.12); }
      .bar { height: 28px; background: #f7f9fc; border-bottom: 1px solid #e2e6ee; }
      .shot img { display: block; width: 100%; }
      .brand { position: absolute; top: 40px; left: 64px; display: flex; align-items: center; gap: 10px; font-weight: 600; }
      .bars span { display: block; height: 5px; border-radius: 3px; background: #3f76ff; margin-bottom: 3px; }
      .bars span:nth-child(1) { width: 26px; }
      .bars span:nth-child(2) { width: 18px; margin-left: 4px; opacity: 0.72; }
      .bars span:nth-child(3) { width: 10px; margin-left: 8px; opacity: 0.45; }
    </style>
  </head>
  <body>
    <div class="brand"><div class="bars"><span></span><span></span><span></span></div>Terraline</div>
    <div class="copy">
      <div class="eyebrow">Open-source ITSM · built on Plane</div>
      <h1>Run services and delivery work in one system</h1>
      <p>Work items, a service catalog, typed workflows and AI in the loop.</p>
    </div>
    <div class="shot">
      <div class="bar"></div>
      <img src="./screenshots/work-items-list.webp" alt="" />
    </div>
  </body>
</html>
```

- [ ] **Step 3: Regenerate OG image**

Run: `npm run capture`
Expected: last line `captured og-image.png`; file `public/og-image.png` is 1200×630 (check with `file public/og-image.png`).

- [ ] **Step 4: Commit**

```bash
git add index.html public/og-template.html public/og-image.png
git commit -m "feat: product meta and regenerated OG image"
```

---

### Task 13: Final verification

**Files:** none

- [ ] **Step 1: Full checks**

Run: `npm test -- --run && npx tsc -b && npm run build`
Expected: all green; `dist/index.html`, `dist/learn/index.html`, `dist/screenshots/*.webp` present. (`npm run lint` is unconfigured in this repo — skip.)

- [ ] **Step 2: Local smoke**

Run: `npm run preview -- --port 4173` then in another shell `curl -s -o /dev/null -w "%{http_code}" http://localhost:4173/learn`
Expected: `200`.

- [ ] **Step 3: Viewport QA**

In a browser at 1440 and 390 widths, check: no horizontal scroll; hero screenshot loads eagerly; feature screenshots lazy-load; `/learn` search, filter and skill copy still work; `prefers-reduced-motion` honored (JourneyLoop motion skipped).

- [ ] **Step 4: Claim audit**

Open `docs/superpowers/specs/2026-09-27-terraline-product-landing-design.md` §2 and verify every copy claim against the product repo:
- typed workflows → `apps/web/app/routes/core.ts` (`settings/workflows`), `docs/superpowers/specs/2026-09-25-work-item-types-workflows-design.md`
- services + graph → `apps/api-rs/migrations/0003_services.sql`, `apps/web/core/components/services/*`
- scheduler → `apps/api-rs/crates/api/src/routes/ai_schedule.rs`, spec `2026-09-27-ai-schedule-recipe-design.md`
- MCP API v1 core → `apps/api-rs/crates/api/src/routes/v1/*`, spec `2026-09-18-mcp-public-api-v1-core-design.md`
- mobile → spec `2026-09-23-mobile-mode-design.md`
Fix any copy that cannot be sourced.

- [ ] **Step 5: Deploy check (after push)**

Confirm the Cloudflare Pages deployment serves `/` (new hero) and `/learn` (knowledge page). If `/learn` 404s, add `_redirects` with `learn/* /learn/index.html 200`… only if the host flattens the directory.

- [ ] **Step 6: Final commit (if verification fixes anything)**

```bash
git add -A
git commit -m "fix: landing verification follow-ups"
```

---

## Claim Audit Results (Task 13 Step 4)

Audited against `/home/ghifari/plane-for-itsm` on 2026-09-27. Copy fixes applied in `src/data/product.ts`.

| Claim (landing copy) | Evidence (product repo) | Status |
| --- | --- | --- |
| Rust API (Axum) + Postgres | `apps/api-rs/Cargo.toml:7,10`; `crates/api/src/main.rs:51` | Verified |
| Redis Stream jobs | `crates/common/src/stream.rs:4-39`; `crates/worker/src/main.rs:20-31` | Verified |
| Real-time pages (Yjs) via dedicated live server | `apps/live/src/hocuspocus.ts:7,45`; `packages/editor/src/hooks/use-yjs-setup.ts:7` | Verified |
| Docker Compose self-host | `docker-compose.yml:69-159` | Verified |
| AGPL-3.0 | `LICENSE.txt:1-3` | Verified |
| Layouts: list, board, calendar, spreadsheet, timeline | `packages/types/src/issues/issue.ts:15-21` | Verified |
| Versions, sub-items, relations, attachments, comments, activity | `apps/api-rs/migrations/0001_initial.sql:1108-1237,1319-1331,1490-1519`; `routes/issue_version_write.rs`, `issue_activity_write.rs` | Verified |
| Per-type states + transitions; workflow editor in settings | `crates/api/src/seed.rs:296-373`; `routes/workflow.rs:79-95,203-219`; `apps/web/core/components/workflows/workflow-editor.tsx` | Verified |
| Type-aware boards/filters/create forms | `use-work-item-filters-config.tsx:322-333`; `issue-layouts/kanban/default.tsx:113-124` | Verified |
| Services: status, criticality, ownership, dependencies | `apps/api-rs/migrations/0003_services.sql:4-65`; `routes/service.rs:74-113` | Verified |
| Health-first board, dependency graph, service detail with linked work | `services/service.helpers.ts:98-123`; `services/graph/service-graph.tsx:10-19`; `services/detail/work-items.tsx:34-42` | Verified |
| Service health is seeded demo data, not live monitoring | `services/service-health.helpers.ts:16-110` (FNV-1a + mulberry32 from `service.id`); no `health` column in `0003_services.sql` | Verified (claim boundary holds) |
| Intake triage: accept/decline/snooze/duplicate | `0001_initial.sql:1035-1053`; `routes/intake.rs:1115-1117`; `inbox/modals/*` | Verified |
| "Decisions stay on the intake record" | `routes/intake.rs:1602-1652` persists status/duplicate/snooze/updated_by; no activity log (`intake.rs:1045-1047`) | Verified after copy fix (was "Every decision keeps its trail") |
| Pages rich text + multi-user Yjs collaboration | `pages/editor/editor-body.tsx:275`; `collaborative-editor.tsx:158` | Verified |
| "Every new workspace starts with a service runbook and a postmortem template" | `crates/api/assets/seeds/data/pages.json:4,20`; `crates/api/src/seed.rs:919`; triggered on workspace create `routes/workspace.rs:398-402` | Verified after copy fix (was "Seeded on first workspace run") |
| Galileo sidebar grounded in on-screen work item | `ai/assistant-sidebar/root.tsx:90-112`; `lib/ai-context.ts:85-97` | Verified |
| "Sidebar assistant with your chat history" | `migrations/0008_ai_conversations.sql`; owner-scoped reads `routes/ai_conversations.rs:204-211` | Verified after copy fix (was "workspace chat history"; history is per-user) |
| "AI drafting for work item descriptions" | `/ai-complete/` `main.rs:1815`; `issue-modal/components/description-editor.tsx:268-294` | Verified after copy fix (was "Editor AI for pages and descriptions"; page-editor AI is not wired — `pages/editor/ai/menu.tsx:80-96`) |
| "Nothing runs until you ask" | Assistant and scheduler only act on user/trigger input; "Use this response" flow `gpt-assistant-popover.tsx:178-188` | Verified after copy fix (was "Human confirms every suggestion"; "I'm feeling lucky" inserts without a review step) |
| Scheduler: recipes, presets, tool allowlist, run history, runs execute | `migrations/0009_ai_schedule_spec.sql`; `crates/ai/src/schedule.rs:18-26,176-247`; beat cron `crates/beat/src/main.rs:99-115`; worker `handlers/ai_schedule.rs:72-260`; history `routes/ai_schedule.rs:429-437` | Verified; copy says "can carry a structured recipe" (legacy prompt-only shape still accepted) |
| Cycles progress/burndown, modules, saved views, analytics | `cycles/analytics-sidebar/issue-progress.tsx:41`; `routes/view.rs:476`; `routes/analytic.rs:277` | Verified |
| Mobile: view/update, comment, attach, nav + search | `hooks/use-mobile-viewport.ts:1`; `issue-layouts/mobile-layout.ts`; `comments/comment-create.tsx:96`; `issues/attachment/root.tsx:30`; spec `2026-09-23-mobile-mode-design.md` | Verified for stated flows (no create/settings/pages on mobile) |
| MCP API (v1 core) | `main.rs:1362-1446`; `routes/v1/{project,work_item,subresource,activity,relation,work_item_type}.rs`; spec `2026-09-18-mcp-public-api-v1-core-design.md` | Verified as "v1 core" (custom relation CRUD stubbed; spec still Draft) |

---

## Self-Review Notes

- Spec §1 IA → Tasks 3–8 (nav, hero, facts, 9 feature blocks, compare, architecture, roadmap, CTA, footer).
- Spec §2 claim boundaries → Task 13 Step 4 audit; copy in `product.ts` deliberately avoids module claims.
- Spec §3 `/learn` → Task 10 (header/footer/back-link, SkillsSection, Traceability, JourneyLoop kept).
- Spec §4 design system → Task 1 tokens/fonts; components use `bg-brand-strong` for text-bearing buttons.
- Spec §5 MPA + data + gitignore → Tasks 9, 10.
- Spec §6 capture plan → Task 9 (14 shots + OG).
- Spec §7 meta/OG → Task 12.
- Spec §8 perf/a11y → Task 4 (`fetchPriority`), Task 9 (lazy + explicit dimensions), Task 13.
- Spec §9–11 verification/tests/risks → Tasks 9, 13.
- No placeholder steps: every code step contains the complete file or exact replacement block.
- Type names consistent: `Screenshot`, `Feature`, `product.hero.screenshot`, `product.cta.href` used identically across tasks.
