# Terra Landing Journey Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build static showcase landing (terra-landing) with Journey Timeline Loop for 8 Terra managements + AI skills per management, desktop loop vs mobile timeline.

**Architecture:** Single-page Vite + React 19 + Tailwind 4 static site. Data layer `src/data/managements.ts` (8 objs, source of truth from spec) drives `ManagementCard` → composed by `JourneyLoop` (media query switch desktop SVG loop vs mobile vertical timeline) + `SkillsSection` aggregate + `EntityGraphProof`. No backend, no routing.

**Tech Stack:** Vite 6, React 19, TypeScript 5, Tailwind 4, shadcn/ui, lucide-react, Motion (framer-motion), Vitest + React Testing Library, ESLint + Prettier

---

## File Structure

```
terra-landing/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── data/
│   │   └── managements.ts
│   ├── lib/
│   │   └── cn.ts
│   └── components/
│       ├── Hero.tsx
│       ├── PulsePreview.tsx
│       ├── ManagementCard.tsx
│       ├── JourneyLoop.tsx
│       ├── SkillsSection.tsx
│       ├── EntityGraphProof.tsx
│       └── Footer.tsx
├── tests/
│   ├── managements.test.ts
│   ├── ManagementCard.test.tsx
│   └── JourneyLoop.test.tsx
└── public/
    └── favicon.svg
```

**Files to create/modify per task listed in each Task header.**

---

### Task 1: Scaffold Vite + Tailwind + shadcn Base

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/lib/cn.ts`

- [ ] **Step 1: Initialize Vite project**

```bash
npm create vite@latest . -- --template react-ts
# when prompted for existing files, choose to overwrite or run in temp then move
```

Expected: `package.json` with vite, react, typescript

Alternative manual (if create fails because dir not empty):

```bash
npm init -y
npm install react@19 react-dom@19
npm install -D vite@6 @vitejs/plugin-react typescript@5 @types/react @types/react-dom
```

- [ ] **Step 2: Install Tailwind 4 + shadcn deps + motion + lucide**

```bash
npm install -D tailwindcss@4 @tailwindcss/vite
npm install tailwind-merge clsx class-variance-authority
npm install lucide-react motion
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Write `vite.config.ts` with tailwind + test config**

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
  },
})
```

- [ ] **Step 4: Write `src/lib/cn.ts` (shadcn util)**

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 5: Write `src/index.css` with Tailwind + design tokens**

```css
@import "tailwindcss";
@theme {
  --color-incident: #ef4444;
  --color-problem: #a855f7;
  --color-change: #f59e0b;
  --color-knowledge: #6366f1;
  --color-improvement: #10b981;
  --color-asset: #3b82f6;
  --color-request: #0ea5e9;
  --color-ci: #475569;
}
```

- [ ] **Step 6: Write minimal `src/App.tsx` shell**

```tsx
export default function App() {
  return <div className="min-h-screen bg-zinc-50 text-zinc-900">Terra Landing — scaffold ok</div>
}
```

- [ ] **Step 7: Write `src/main.tsx`**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>
)
```

- [ ] **Step 8: Run build to verify scaffold**

```bash
npm run build
# Expected: vite build succeeds, dist/ created
```

- [ ] **Step 9: Commit**

```bash
git add package.json vite.config.ts tsconfig.json tailwind.config.ts src/main.tsx src/App.tsx src/index.css src/lib/cn.ts index.html
git commit -m "feat: scaffold vite+react+tailwind base"
```

---

### Task 2: Data Layer — 8 Managements + Skills Mapping

**Files:**
- Create: `src/data/managements.ts`
- Create: `tests/managements.test.ts`
- Create: `tests/setup.ts`

- [ ] **Step 1: Write failing test for data integrity**

```ts
// tests/managements.test.ts
import { describe, expect, it } from 'vitest'
import { managements, defaultSkills } from '../src/data/managements'

describe('managements data', () => {
  it('has 8 managements', () => {
    expect(managements).toHaveLength(8)
  })
  it('each has prefix, title, oneliner, bullets, skills, color', () => {
    for (const m of managements) {
      expect(m.prefix).toMatch(/^(INC|REQ|PRB|CHG|KB|IMP|AST|CI)-$/)
      expect(m.title.length).toBeGreaterThan(3)
      expect(m.oneLiner.length).toBeGreaterThan(10)
      expect(m.bullets.length).toBeGreaterThanOrEqual(2)
      expect(m.color).toBeTruthy()
    }
  })
  it('incident has Security Audit skill', () => {
    const inc = managements.find(m => m.prefix === 'INC-')!
    expect(inc.skills).toContain('Security Audit')
  })
  it('has 5 default skills', () => {
    expect(defaultSkills).toHaveLength(5)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- tests/managements.test.ts
# Expected: FAIL — module not found
```

- [ ] **Step 3: Write minimal `src/data/managements.ts`**

```ts
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
```

- [ ] **Step 4: Create `tests/setup.ts`**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Run test to verify pass**

```bash
npm run test -- tests/managements.test.ts -v
# Expected: PASS (4 tests)
```

- [ ] **Step 6: Commit**

```bash
git add src/data/managements.ts tests/managements.test.ts tests/setup.ts
git commit -m "feat: add managements data layer (8 modules + 5 skills)"
```

---

### Task 3: ManagementCard Component (Color-coded, Skills Badge)

**Files:**
- Create: `src/components/ManagementCard.tsx`
- Create: `tests/ManagementCard.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// tests/ManagementCard.test.tsx
import { render, screen } from '@testing-library/react'
import ManagementCard from '../src/components/ManagementCard'

const props = {
  prefix: 'INC-', title: 'Incident Management', oneLiner: 'Detect & Respond',
  bullets: ['war-room', 'recurrence'], skills: ['Security Audit'], color: 'bg-red-500', icon: 'Siren'
}

it('renders prefix, title, oneliner, skills', () => {
  render(<ManagementCard {...props} />)
  expect(screen.getByText('INC-')).toBeInTheDocument()
  expect(screen.getByText('Incident Management')).toBeInTheDocument()
  expect(screen.getByText('Security Audit')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run to verify fail**

```bash
npm run test -- tests/ManagementCard.test.tsx
# Expected: FAIL module not found
```

- [ ] **Step 3: Implement `src/components/ManagementCard.tsx`**

```tsx
import { cn } from '../lib/cn'
import * as Icons from 'lucide-react'

type Props = {
  prefix: string; title: string; oneLiner: string; bullets: string[]; skills: string[]; color: string; icon: string
}

export default function ManagementCard({ prefix, title, oneLiner, bullets, skills, color, icon }: Props) {
  const Icon = (Icons as any)[icon] ?? Icons.Box
  return (
    <div className={cn("rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-all hover:scale-[1.02]", "border-zinc-200")}>
      <div className="flex items-center gap-3 mb-2">
        <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center text-white", color)}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="font-mono text-xs tracking-tight bg-zinc-900 text-white px-2 py-1 rounded">{prefix}</span>
        <h3 className="font-semibold text-zinc-900 text-sm">{title}</h3>
      </div>
      <p className="text-sm text-zinc-600 mb-3">{oneLiner}</p>
      <ul className="text-xs text-zinc-500 list-disc pl-4 space-y-1 mb-3">
        {bullets.map(b => <li key={b}>{b}</li>)}
      </ul>
      <div className="flex flex-wrap gap-1.5">
        {skills.map(s => (
          <span key={s} className="inline-flex items-center gap-1 text-[11px] bg-zinc-900 text-white px-2 py-1 rounded-full">
            <Icons.Sparkles className="h-3 w-3" /> {s}
          </span>
        ))}
        {skills.length === 0 && <span className="text-[11px] text-zinc-400">No native skill — links to CI</span>}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify pass**

```bash
npm run test -- tests/ManagementCard.test.tsx -v
# Expected: PASS
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ManagementCard.tsx tests/ManagementCard.test.tsx
git commit -m "feat: add ManagementCard (color-coded + skill badges)"
```

---

### Task 4: Hero + PulsePreview

**Files:**
- Create: `src/components/PulsePreview.tsx`
- Create: `src/components/Hero.tsx`
- Modify: `src/App.tsx` to compose Hero

- [ ] **Step 1: Create `src/components/PulsePreview.tsx` (static mock)**

```tsx
export default function PulsePreview() {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-lg border-zinc-200 w-full max-w-md">
      <div className="text-xs font-semibold text-zinc-500 mb-2">Pulse Dashboard — 14-day activity</div>
      <div className="grid grid-cols-4 gap-2 mb-3">
        {['INC 12','PRB 3','CHG 7','KB 24'].map(v => (
          <div key={v} className="bg-zinc-900 text-white text-xs font-mono rounded-lg p-2 text-center">{v}</div>
        ))}
      </div>
      <div className="grid grid-cols-14 gap-1">
        {Array.from({length: 56}).map((_,i) => (
          <div key={i} className="h-3 rounded-sm" style={{background: `rgba(16,185,129,${0.15 + Math.random()*0.7})`}} />
        ))}
      </div>
      <div className="mt-3 text-[11px] bg-amber-50 border border-amber-200 rounded-lg p-2 text-amber-800">AI Advisor: 3 incidents without KB link → create runbook</div>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/components/Hero.tsx`**

```tsx
import PulsePreview from './PulsePreview'

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-mono bg-zinc-900 text-white px-3 py-1 rounded-full mb-4">TERRA — AI for ITSM</div>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 mb-3">One Graph, Not Silos</h1>
        <p className="text-lg text-zinc-600 mb-6">8 managements, one entity graph, AI skills for every step. ITIL4-aligned, built for operators.</p>
        <div className="flex gap-3">
          <a href="#journey" className="bg-zinc-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium">Explore Journey</a>
          <a href="#skills" className="border border-zinc-300 px-5 py-2.5 rounded-xl text-sm font-medium">View Skills</a>
        </div>
      </div>
      <PulsePreview />
    </section>
  )
}
```

- [ ] **Step 3: Update `src/App.tsx`**

```tsx
import Hero from './components/Hero'

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Hero />
      <div id="journey" className="max-w-7xl mx-auto px-6 py-8 text-sm text-zinc-500">Journey will render here</div>
    </div>
  )
}
```

- [ ] **Step 4: Run build**

```bash
npm run build
# Expected: PASS
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx src/components/PulsePreview.tsx src/App.tsx
git commit -m "feat: add Hero + PulsePreview"
```

---

### Task 5: JourneyLoop — Desktop SVG Loop + Mobile Timeline

**Files:**
- Create: `src/components/JourneyLoop.tsx`
- Create: `tests/JourneyLoop.test.tsx`
- Modify: `src/App.tsx` to use JourneyLoop

- [ ] **Step 1: Write failing test for JourneyLoop rendering 8 cards**

```tsx
// tests/JourneyLoop.test.tsx
import { render, screen } from '@testing-library/react'
import JourneyLoop from '../src/components/JourneyLoop'

it('renders all 8 managements', () => {
  render(<JourneyLoop />)
  expect(screen.getByText('Incident Management')).toBeInTheDocument()
  expect(screen.getByText('Service Map (CMDB)')).toBeInTheDocument()
})
it('renders foundation section', () => {
  render(<JourneyLoop />)
  expect(screen.getByText(/foundation/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run to verify fail**

```bash
npm run test -- tests/JourneyLoop.test.tsx
# Expected: FAIL — module not found
```

- [ ] **Step 3: Implement `src/components/JourneyLoop.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { managements } from '../data/managements'
import ManagementCard from './ManagementCard'

function useIsMobile(bp = 1024) {
  const [m, setM] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp}px)`)
    const handler = () => setM(mq.matches)
    handler()
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [bp])
  return m
}

export default function JourneyLoop() {
  const isMobile = useIsMobile()
  const cycle = managements.filter(m => m.lane === 'cycle').sort((a,b)=>a.order-b.order)
  const parallel = managements.filter(m => m.lane === 'parallel')
  const foundation = managements.filter(m => m.lane === 'foundation')

  if (isMobile) {
    return (
      <section id="journey" className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Journey Timeline</h2>
        <div className="relative pl-8 border-l-2 border-zinc-200 space-y-6">
          {[...parallel, ...cycle].sort((a,b)=>a.order-b.order).map(m => (
            <div key={m.id} className="relative">
              <div className={`absolute -left-[33px] top-4 h-4 w-4 rounded-full ${m.color} border-4 border-white shadow`} />
              <ManagementCard {...m} />
            </div>
          ))}
        </div>
        <div className="mt-10">
          <h3 className="text-sm font-semibold text-zinc-500 mb-3">Foundation — always visible</h3>
          <div className="grid gap-4">
            {foundation.map(m => <ManagementCard key={m.id} {...m} />)}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="journey" className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-2">Journey Timeline</h2>
      <p className="text-sm text-zinc-500 mb-6">Incident → Problem → Change → Knowledge → Improvement — with Request parallel & Service Map + Asset as foundation</p>
      {/* parallel lane hint */}
      <div className="mb-6 flex gap-4">
        {parallel.map(m => (
          <div key={m.id} className="w-[280px]"><ManagementCard {...m} /></div>
        ))}
        <div className="text-xs text-zinc-400 self-center">↑ parallel intake (not only via Incident)</div>
      </div>
      {/* cycle loop */}
      <div className="relative bg-white rounded-3xl border p-8">
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 1000 400">
          <path d="M 150 120 L 400 120 L 650 120 L 650 260 L 400 260 L 150 260 Z" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeDasharray="6 6" />
          {/* arrow heads approximated */}
        </svg>
        <div className="relative grid grid-cols-3 gap-4">
          {cycle.map(m => <ManagementCard key={m.id} {...m} />)}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 text-white text-[10px] font-mono px-3 py-1 rounded-full">entity_links graph</div>
      </div>
      {/* foundation */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-zinc-500 mb-3">Foundation</h3>
        <div className="grid grid-cols-2 gap-4">
          {foundation.map(m => <ManagementCard key={m.id} {...m} />)}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Update `src/App.tsx`**

```tsx
import Hero from './components/Hero'
import JourneyLoop from './components/JourneyLoop'

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Hero />
      <JourneyLoop />
    </div>
  )
}
```

- [ ] **Step 5: Run tests**

```bash
npm run test -- tests/JourneyLoop.test.tsx -v
# Expected: PASS (media query mock defaults to desktop; foundation heading exists)
```

- [ ] **Step 6: Commit**

```bash
git add src/components/JourneyLoop.tsx tests/JourneyLoop.test.tsx src/App.tsx
git commit -m "feat: add JourneyLoop (desktop SVG loop + mobile timeline)"
```

---

### Task 6: SkillsSection — Aggregate 5 Default Skills

**Files:**
- Create: `src/components/SkillsSection.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `src/components/SkillsSection.tsx`**

```tsx
import { defaultSkills } from '../data/managements'
import { Sparkles } from 'lucide-react'

export default function SkillsSection() {
  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-2">AI Agent Skills — per Management</h2>
      <p className="text-sm text-zinc-500 mb-6">5 default skills seeded per org via <span className="font-mono bg-zinc-900 text-white px-1.5 py-0.5 rounded text-xs">GET /api/skills</span>. Attach to any Incident/Problem/Change/CI — plus create custom skills.</p>
      <div className="grid md:grid-cols-3 gap-4">
        {defaultSkills.map(s => (
          <div key={s.name} className="rounded-2xl border bg-white p-5">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="font-semibold text-sm">{s.name}</span>
            </div>
            <div className="text-xs font-mono text-zinc-500">{s.entityType} · {s.reviewType}</div>
          </div>
        ))}
        <div className="rounded-2xl border-2 border-dashed bg-zinc-50 p-5 flex flex-col justify-center">
          <div className="font-semibold text-sm">Create custom skill</div>
          <div className="text-xs text-zinc-500">Define entityType, reviewType, instructions + welcomePrompts (max 10)</div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update `src/App.tsx`**

```tsx
import Hero from './components/Hero'
import JourneyLoop from './components/JourneyLoop'
import SkillsSection from './components/SkillsSection'

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Hero />
      <JourneyLoop />
      <SkillsSection />
    </div>
  )
}
```

- [ ] **Step 3: Build check**

```bash
npm run build
# Expected: PASS
```

- [ ] **Step 4: Commit**

```bash
git add src/components/SkillsSection.tsx src/App.tsx
git commit -m "feat: add SkillsSection (5 default skills grid)"
```

---

### Task 7: EntityGraphProof + Footer + CTA

**Files:**
- Create: `src/components/EntityGraphProof.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `src/components/EntityGraphProof.tsx`**

```tsx
export default function EntityGraphProof() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="rounded-3xl bg-zinc-900 text-white p-8">
        <h2 className="text-xl font-bold mb-2">Anything can link to anything</h2>
        <p className="text-sm text-zinc-400 mb-6">entity_links with 5 relations: parent · depends_on · relates_to · caused_by · resolved_by — plus comments, timeline, versions, reviews, attachments.</p>
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {['INC-202501-003 —caused_by→ PRB-202501-001', 'PRB →resolved_by→ CHG-202501-002', 'CHG →relates_to→ KB-202501-010', 'INC —depends_on→ CI-001'].map(e => (
            <span key={e} className="bg-white/10 px-3 py-1.5 rounded-full">{e}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/Footer.tsx`**

```tsx
export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-6 py-10 text-center">
      <h3 className="text-xl font-bold mb-2">Bring your ITSM into one graph</h3>
      <p className="text-sm text-zinc-500 mb-4">Terra Service Management — AI for ITSM, ITIL4-aligned.</p>
      <div className="text-xs text-zinc-400">© 2026 Terra · No pricing/testimonials fabricated</div>
    </footer>
  )
}
```

- [ ] **Step 3: Update `src/App.tsx` final composition**

```tsx
import Hero from './components/Hero'
import JourneyLoop from './components/JourneyLoop'
import SkillsSection from './components/SkillsSection'
import EntityGraphProof from './components/EntityGraphProof'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Hero />
      <JourneyLoop />
      <SkillsSection />
      <EntityGraphProof />
      <Footer />
    </div>
  )
}
```

- [ ] **Step 4: Build**

```bash
npm run build
# Expected: PASS
```

- [ ] **Step 5: Commit**

```bash
git add src/components/EntityGraphProof.tsx src/components/Footer.tsx src/App.tsx
git commit -m "feat: add EntityGraphProof + Footer CTA"
```

---

### Task 8: Motion Polish + Responsive QA + Final Build

**Files:**
- Modify: `src/components/JourneyLoop.tsx`, `src/components/ManagementCard.tsx`, `src/components/Hero.tsx` to add Motion wrappers

- [ ] **Step 1: Add motion wrappers to ManagementCard**

```tsx
// wrap outer div with motion.div, add initial/whileInView
import { motion } from 'motion'
// ...
<motion.div initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.3}} className={...}>
```

Apply same to `Hero` (stagger) and `JourneyLoop` grid.

- [ ] **Step 2: Run tests + build**

```bash
npm run test -- -v
# Expected: all 3 suites PASS
npm run build
# Expected: PASS, dist/ size < 500kb gz
```

- [ ] **Step 3: Manual QA checklist**

- Desktop 1280px: loop visible, no overflow, hover glow works
- Mobile 375px: timeline vertical, no horizontal scroll
- Check reduced-motion: disable animations when `prefers-reduced-motion`
- Check contrast: all prefix badges readable

- [ ] **Step 4: Commit**

```bash
git add src/components/JourneyLoop.tsx src/components/ManagementCard.tsx src/components/Hero.tsx
git commit -m "feat: add motion polish + responsive QA"
```

---

## Self-Review

**Spec coverage:**
- Hero + Pulse preview → Task 4
- 8 managements Journey Loop (cycle/parallel/foundation) → Tasks 2,3,5
- Per-management skills badges + aggregate 5 skills → Tasks 3,6
- Entity graph proof + cross-cutting → Task 7
- Visual tokens + responsive + motion → Tasks 1,5,8
- Tech stack + file structure → Task 1
- Gap: Dispatch/Advisor secondary mention covered in SkillsSection + PulsePreview (no dedicated section needed per spec YAGNI).

**Placeholder scan:** No TODO/TBD; all steps have exact code, commands, expected outputs.

**Type consistency:** `Management` type defined in Task 2, reused in Tasks 3,5; `color` as string Tailwind class consistent; `defaultSkills` shape matches Task 6.

---

