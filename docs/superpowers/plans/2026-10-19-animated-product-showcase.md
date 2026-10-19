# Animated Product Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the active Terraline homepage's product screenshots with a scroll-synchronized, self-contained animated product window modeled on the current Plane frontend.

**Architecture:** Keep the work in `terra-landing`. Add typed deterministic demo fixtures, four presentational UI scenes, a shared app-window shell, and a controller that synchronizes the active scene with the story chapters and owns playback/accessibility state. Preserve the Plane checkout and its existing work; do not import its API-bound UI components.

**Tech Stack:** React 19, TypeScript, Vite, Motion (`motion/react`, already installed), Vitest, Testing Library, and the existing Playwright dependency for responsive browser verification.

**Spec:** `docs/superpowers/specs/2026-10-19-animated-product-showcase-design.md`

---

## File Structure

Create:
- `src/data/product-demo.ts` — chapter order, typed sample work items/services/dependencies/assistant/cycle data, and per-scene step counts.
- `src/components/product-showcase/use-product-showcase.ts` — chapter observation and playback lifecycle (one-time auto-play, pause/resume/replay, reduced motion, hidden-tab behavior).
- `src/components/product-showcase/ProductShowcase.tsx` — two-column shared story layout; observes `data-showcase-chapter` copy sections and renders one window.
- `src/components/product-showcase/ProductWindow.tsx` — dark app shell, sample-data label, chapter navigation, scene viewport, mobile collapse control, and playback buttons.
- `src/components/product-showcase/SceneView.tsx` — map the active chapter to its presentational scene.
- `src/components/product-showcase/scenes/types.ts` — shared props for scene components.
- `src/components/product-showcase/scenes/WorkItemsScene.tsx` — workflow board and incident movement.
- `src/components/product-showcase/scenes/ServicesScene.tsx` — health board and dependency graph.
- `src/components/product-showcase/scenes/GalileoScene.tsx` — work item context, prompt, and fixed assistant response.
- `src/components/product-showcase/scenes/DeliveryScene.tsx` — cycle progress and mobile work-item state.
- `tests/product-demo.test.ts` — fixture/chapter integrity.
- `tests/product-showcase-scenes.test.tsx` — static content and chapter-to-scene mapping.
- `tests/product-window.test.tsx` — chapter, playback, and collapse controls.
- `tests/product-showcase.test.tsx` — observer, playback, reduced-motion, visibility, and controls.

Modify:
- `src/components/Tour.tsx` — combine hero/capability copy into the story region; remove active screenshot rendering; move the facts strip after the story.
- `tests/home.test.tsx` — replace screenshot assertions with demo-window/chapter assertions while retaining page-navigation and content checks.
- `src/index.css` only if the implementation needs a narrowly scoped sticky/collapsed-window rule beyond existing Tailwind utilities. The existing global reduced-motion rule and focus styles remain.

Keep `src/data/product.ts`, the screenshot files, capture script, `/learn`, and the inactive screenshot-stage source untouched. Those source assets are still referenced by inactive modules and are no longer requested by the active homepage after integration.

## Task 1: Add typed deterministic showcase fixtures

**Files:**
- Create: `src/data/product-demo.ts`
- Test: `tests/product-demo.test.ts`

- [ ] **Step 1: Write failing fixture tests**

Create `tests/product-demo.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { productDemo, showcaseChapters } from '../src/data/product-demo'

describe('product showcase fixtures', () => {
  it('defines the four scenes in product-story order', () => {
    expect(showcaseChapters.map((chapter) => chapter.id)).toEqual([
      'work',
      'services',
      'galileo',
      'delivery',
    ])
  })

  it('labels all scenario content as sample data and uses valid graph endpoints', () => {
    expect(productDemo.label).toBe('Demo workspace · Sample data')
    const serviceIds = new Set(productDemo.services.map((service) => service.id))
    expect(productDemo.dependencies.length).toBeGreaterThan(0)
    for (const edge of productDemo.dependencies) {
      expect(serviceIds.has(edge.from)).toBe(true)
      expect(serviceIds.has(edge.to)).toBe(true)
    }
    expect(productDemo.assistant.response.length).toBeGreaterThan(20)
  })
})
```

- [ ] **Step 2: Run the test and confirm the missing-module failure**

Run: `npx vitest run tests/product-demo.test.ts`

Expected: FAIL because `src/data/product-demo.ts` does not exist.

- [ ] **Step 3: Add the smallest fixture model that passes**

Create `src/data/product-demo.ts` with this exported shape and fixture content:

```ts
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
```

- [ ] **Step 4: Run the fixture test and confirm it passes**

Run: `npx vitest run tests/product-demo.test.ts`

Expected: 2 tests pass.

## Task 2: Build the four presentational product scenes

**Files:**
- Create: `src/components/product-showcase/SceneView.tsx`
- Create: `src/components/product-showcase/scenes/types.ts`
- Create: `src/components/product-showcase/scenes/WorkItemsScene.tsx`
- Create: `src/components/product-showcase/scenes/ServicesScene.tsx`
- Create: `src/components/product-showcase/scenes/GalileoScene.tsx`
- Create: `src/components/product-showcase/scenes/DeliveryScene.tsx`
- Test: `tests/product-showcase-scenes.test.tsx`

- [ ] **Step 1: Write failing scene tests**

Create `tests/product-showcase-scenes.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SceneView from '../src/components/product-showcase/SceneView'
import { showcaseChapters } from '../src/data/product-demo'

describe('product showcase scenes', () => {
  it('shows the sample work item in the workflow board', () => {
    render(<SceneView chapter="work" step={2} reducedMotion={false} />)
    expect(screen.getByText('TERRA-42')).toBeInTheDocument()
    expect(screen.getByText('API latency spike')).toBeInTheDocument()
    expect(screen.getByText('In progress')).toBeInTheDocument()
  })

  it('shows service names and a labeled dependency graph', () => {
    render(<SceneView chapter="services" step={2} reducedMotion={false} />)
    expect(screen.getByText('API Gateway')).toBeInTheDocument()
    expect(screen.getByText('Payment Gateway')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /service dependency graph/i })).toBeInTheDocument()
  })

  it('reveals the simulated service-health change as the graph resolves', () => {
    const { rerender } = render(<SceneView chapter="services" step={1} reducedMotion={false} />)
    expect(screen.getAllByText('Healthy').length).toBeGreaterThan(0)
    rerender(<SceneView chapter="services" step={2} reducedMotion={false} />)
    expect(screen.getByText('Degraded · 1 incident')).toBeInTheDocument()
  })

  it('shows a fixed Galileo answer without a live request', () => {
    render(<SceneView chapter="galileo" step={2} reducedMotion={false} />)
    expect(screen.getByText('What is affected?')).toBeInTheDocument()
    expect(screen.getByText(/depends on API Gateway/)).toBeInTheDocument()
  })

  it('shows cycle progress and the mobile update', () => {
    render(<SceneView chapter="delivery" step={2} reducedMotion={false} />)
    expect(screen.getByText('Week 2: Triage and response')).toBeInTheDocument()
    expect(screen.getByText('Added an incident response update')).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /mobile work item/i })).toBeInTheDocument()
  })

  it('renders every scene without screenshot image elements', () => {
    for (const chapter of showcaseChapters) {
      const { container, unmount } = render(<SceneView chapter={chapter.id} step={chapter.steps - 1} reducedMotion />)
      expect(container.querySelector('img')).toBeNull()
      unmount()
    }
  })
})
```

- [ ] **Step 2: Run scene tests and confirm the missing-module failure**

Run: `npx vitest run tests/product-showcase-scenes.test.tsx`

Expected: FAIL because `SceneView.tsx` is not present.

- [ ] **Step 3: Implement presentational scene components**

Each scene receives the numeric scene step and `reducedMotion`. Read all visible data from `productDemo`; use no API calls, image elements, or Plane imports. Create `scenes/types.ts`:

```ts
export type TSceneProps = { step: number; reducedMotion: boolean }
```

Implement the work board with `LayoutGroup`/`layoutId` so the same incident card moves between columns:

```tsx
import { LayoutGroup, motion } from 'motion/react'
import { productDemo } from '../../../data/product-demo'
import type { TSceneProps } from './types'

export default function WorkItemsScene({ step, reducedMotion }: TSceneProps) {
  const duration = reducedMotion ? 0 : 0.45
  const item = productDemo.workItem
  const itemColumn = step >= 2 ? item.toState.toLowerCase().replace(' ', '-') : item.fromState.toLowerCase()
  const columns = [
    { id: 'triage', label: 'Triage' },
    { id: 'backlog', label: 'Backlog' },
    { id: 'in-progress', label: 'In progress' },
  ]

  return (
    <section aria-label="Work items board" className="grid grid-cols-3 gap-2">
      <LayoutGroup>
        {columns.map((column) => (
          <div key={column.id} className="min-h-36 rounded-md bg-neutral-900 p-2">
            <h3 className="text-xs text-neutral-300">{column.label}</h3>
            {column.id === itemColumn && (
              <motion.article
                layoutId="showcase-incident-card"
                transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
                className="mt-2 rounded border border-neutral-700 bg-neutral-800 p-2 text-xs text-white"
              >
                <span className="font-mono text-neutral-400">{item.id}</span>
                <p className="mt-1">{item.title}</p>
                <span className="mt-2 inline-block rounded bg-blue-950 px-1.5 py-0.5 text-blue-200">{item.type}</span>
              </motion.article>
            )}
            {column.id === 'triage' && step === 1 && <p role="status" className="mt-2 text-[10px] text-neutral-400">Reviewing impact…</p>}
          </div>
        ))}
      </LayoutGroup>
    </section>
  )
}
```

Implement service board/graph switch using SVG edges and DOM service nodes (no React Flow dependency):

```tsx
import { AnimatePresence, motion } from 'motion/react'
import { productDemo } from '../../../data/product-demo'
import type { TSceneProps } from './types'

export default function ServicesScene({ step, reducedMotion }: TSceneProps) {
  const graphVisible = step >= 1
  const duration = reducedMotion ? 0 : 0.45
  return (
    <section aria-label="Service catalog" className="min-h-48 rounded-md bg-neutral-950 p-3 text-white">
      <AnimatePresence mode="wait" initial={false}>
        {graphVisible ? (
          <motion.div key="graph" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration }}>
            <div role="img" aria-label="Service dependency graph" className="relative grid min-h-40 grid-cols-3 items-center gap-2">
              <svg aria-hidden="true" viewBox="0 0 600 160" className="absolute inset-0 h-full w-full">
                <motion.path d="M95 80 H300 M300 80 H505" fill="none" stroke="#737373" strokeWidth="2"
                  initial={{ pathLength: reducedMotion || step >= 2 ? 1 : 0 }}
                  animate={{ pathLength: reducedMotion || step >= 2 ? 1 : 0.55 }}
                  transition={{ duration }} />
              </svg>
              {productDemo.services.map((service) => {
                const impacted = service.id === 'payment-gateway' && step >= 2
                const healthy = service.health === 'healthy' && !impacted
                const incidentCount = service.incidents + (impacted ? 1 : 0)
                return (
                  <div key={service.id}
                    className={`relative z-10 rounded border border-neutral-700 border-l-2 ${healthy ? 'border-l-emerald-500' : 'border-l-amber-500'} bg-neutral-900 p-2 text-xs`}>
                    <span className="block truncate">{service.name}</span>
                    <span className="mt-1 block text-neutral-400">{service.status} · {service.criticality}</span>
                    <span className={healthy ? 'mt-1 block text-emerald-400' : 'mt-1 block text-amber-400'}>
                      {healthy ? 'Healthy' : `Degraded · ${incidentCount} incident${incidentCount === 1 ? '' : 's'}`}
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div key="board" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration }}>
            {productDemo.services.map((service) => {
              const impacted = service.id === 'payment-gateway' && step >= 2
              const healthy = service.health === 'healthy' && !impacted
              const incidentCount = service.incidents + (impacted ? 1 : 0)
              return (
                <div key={service.id} className="grid grid-cols-[1fr_5rem_6rem_5rem] gap-2 border-b border-neutral-800 py-2 text-xs">
                  <span>{service.name}</span><span>{service.status}</span><span>{service.criticality}</span>
                  <span className={healthy ? 'text-emerald-400' : 'text-amber-400'}>
                    {healthy ? 'Healthy' : `Degraded · ${incidentCount} incident${incidentCount === 1 ? '' : 's'}`}
                  </span>
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
```

Implement Galileo and delivery with fixed text and scene-step state:

```tsx
// GalileoScene.tsx
import { motion } from 'motion/react'
import { productDemo } from '../../../data/product-demo'
import type { TSceneProps } from './types'

export default function GalileoScene({ step, reducedMotion }: TSceneProps) {
  const assistant = productDemo.assistant
  return (
    <section aria-label="Work item with Galileo" className="grid min-h-52 grid-cols-2 rounded-md bg-neutral-950 text-white">
      <div className="border-r border-neutral-800 p-3 text-sm">
        <span className="font-mono text-xs text-neutral-400">{productDemo.workItem.id}</span>
        <h3 className="mt-2">{productDemo.workItem.title}</h3>
        <p className="mt-2 text-xs text-neutral-400">Incident · API Gateway</p>
      </div>
      <div className="p-3 text-xs">
        <h3 className="border-b border-neutral-800 pb-2">✦ Galileo · Context: {productDemo.workItem.id}</h3>
        {step >= 1 && <p className="mt-3 rounded bg-neutral-800 p-2">{assistant.prompt}</p>}
        {step === 1 && <p role="status" className="mt-2 text-neutral-400">Galileo is drafting a response…</p>}
        {step >= 2 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.35 }} className="mt-2 rounded bg-neutral-800 p-2">
            {assistant.response}
          </motion.p>
        )}
      </div>
    </section>
  )
}
```

```tsx
// DeliveryScene.tsx
import { motion } from 'motion/react'
import { productDemo } from '../../../data/product-demo'
import type { TSceneProps } from './types'

export default function DeliveryScene({ step, reducedMotion }: TSceneProps) {
  const completed = productDemo.delivery.completed + (step >= 1 ? 1 : 0)
  return (
    <section aria-label="Cycle progress and mobile update" className="rounded-md bg-neutral-950 p-3 text-white">
      <h3 className="text-sm">{productDemo.delivery.cycle}</h3>
      <p className="mt-2 text-xs text-neutral-300">{completed} of {productDemo.delivery.total} work items complete</p>
      <div className="mt-2 h-1.5 overflow-hidden rounded bg-neutral-800">
        <motion.div className="h-full bg-sky-500" initial={false}
          animate={{ width: `${(completed / productDemo.delivery.total) * 100}%` }}
          transition={{ duration: reducedMotion ? 0 : 0.55 }} />
      </div>
      {step >= 2 && (
        <div className="mt-3 grid grid-cols-[1fr_auto] items-end gap-3">
          <p className="rounded border border-neutral-700 p-2 text-xs">{productDemo.delivery.update}</p>
          <div role="region" aria-label="Mobile work item" className="w-24 rounded-xl border-2 border-neutral-500 bg-neutral-900 p-2 text-[9px]">
            <p className="text-neutral-400">9:41 · TERRA-42</p>
            <p className="mt-2 font-medium">{productDemo.workItem.title}</p>
            <p className="mt-2 rounded bg-neutral-800 p-1">{productDemo.workItem.toState}</p>
          </div>
        </div>
      )}
    </section>
  )
}
```

Export `TSceneProps` from `scenes/types.ts` and use it in each presentational scene. Keep `reducedMotion` transitions at duration zero, and keep all final scene text in the DOM.

Use a typed selector in `SceneView.tsx`:

```tsx
import type { ShowcaseChapterId } from '../../data/product-demo'
import DeliveryScene from './scenes/DeliveryScene'
import GalileoScene from './scenes/GalileoScene'
import ServicesScene from './scenes/ServicesScene'
import WorkItemsScene from './scenes/WorkItemsScene'

type Props = { chapter: ShowcaseChapterId; step: number; reducedMotion: boolean }

export default function SceneView({ chapter, step, reducedMotion }: Props) {
  switch (chapter) {
    case 'work':
      return <WorkItemsScene step={step} reducedMotion={reducedMotion} />
    case 'services':
      return <ServicesScene step={step} reducedMotion={reducedMotion} />
    case 'galileo':
      return <GalileoScene step={step} reducedMotion={reducedMotion} />
    case 'delivery':
      return <DeliveryScene step={step} reducedMotion={reducedMotion} />
  }
}
```

- [ ] **Step 4: Run scene tests and confirm all four views pass**

Run: `npx vitest run tests/product-showcase-scenes.test.tsx`

Expected: 6 tests pass; no scene renders an `<img>` element.

## Task 3: Add the shared product window and accessible controls

**Files:**
- Create: `src/components/product-showcase/ProductWindow.tsx`
- Test: `tests/product-window.test.tsx`

- [ ] **Step 1: Write failing window/control tests**

Create `tests/product-window.test.tsx`:

```tsx
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ProductWindow from '../src/components/product-showcase/ProductWindow'

const makeProps = () => ({
  chapter: 'work' as const,
  step: 0,
  phase: 'playing' as const,
  reducedMotion: false,
  collapsed: false,
  onSelectChapter: vi.fn(),
  onPlaybackToggle: vi.fn(),
  onReplay: vi.fn(),
  onToggleCollapsed: vi.fn(),
})

describe('ProductWindow', () => {
  it('labels the sample app and forwards chapter and playback actions', () => {
    const props = makeProps()
    render(<ProductWindow {...props} />)

expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toBeInTheDocument()
expect(screen.getByText('Demo workspace · Sample data')).toBeInTheDocument()
expect(screen.getByRole('button', { name: 'Pause animation' })).toBeInTheDocument()
expect(screen.getByRole('button', { name: 'Replay scene' })).toBeInTheDocument()
expect(screen.getByRole('button', { name: 'Work management' })).toHaveAttribute('aria-current', 'step')
expect(screen.getByRole('button', { name: 'Service catalog' })).not.toHaveAttribute('aria-current')

    fireEvent.click(screen.getByRole('button', { name: 'Pause animation' }))
    fireEvent.click(screen.getByRole('button', { name: 'Replay scene' }))
    fireEvent.click(screen.getByRole('button', { name: 'Service catalog' }))
    expect(props.onPlaybackToggle).toHaveBeenCalledTimes(1)
    expect(props.onReplay).toHaveBeenCalledTimes(1)
    expect(props.onSelectChapter).toHaveBeenCalledWith('services')
  })

  it('shows Resume when paused and lets mobile visitors reopen a collapsed window', () => {
    const props = { ...makeProps(), phase: 'paused' as const, collapsed: true }
    const { rerender } = render(<ProductWindow {...props} />)
    fireEvent.click(screen.getByRole('button', { name: 'Show product demo' }))
    expect(props.onToggleCollapsed).toHaveBeenCalledTimes(1)
    rerender(<ProductWindow {...props} collapsed={false} />)
    expect(screen.getByRole('button', { name: 'Resume animation' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the window tests and confirm the missing-module failure**

Run: `npx vitest run tests/product-window.test.tsx`

Expected: FAIL because `ProductWindow.tsx` is not present.

- [ ] **Step 3: Implement the shell and controls**

Create `ProductWindow.tsx` with this prop contract and shell/control behavior:

```tsx
import { Play, Pause, RotateCcw, X } from 'lucide-react'
import { showcaseChapters, type ShowcaseChapterId, type ShowcasePhase } from '../../data/product-demo'
import SceneView from './SceneView'

type Props = {
  className?: string
  chapter: ShowcaseChapterId
  step: number
  phase: ShowcasePhase
  reducedMotion: boolean
  collapsed: boolean
  onSelectChapter: (chapter: ShowcaseChapterId) => void
  onPlaybackToggle: () => void
  onReplay: () => void
  onToggleCollapsed: () => void
}

export default function ProductWindow({
  className = '', chapter, step, phase, reducedMotion, collapsed,
  onSelectChapter, onPlaybackToggle, onReplay, onToggleCollapsed,
}: Props) {
  const active = showcaseChapters.find((item) => item.id === chapter)!
  const playbackLabel = phase === 'playing' ? 'Pause animation' : 'Resume animation'

  return (
    <section aria-label="Terraline demo workspace" data-showcase-phase={phase}
      className={`overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 text-white shadow-xl ${className}`}>
      <header className="flex items-center justify-between border-b border-neutral-800 px-3 py-2">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium">Terraline Demo</p>
          <p className="text-[10px] text-neutral-400">Demo workspace · Sample data</p>
        </div>
        <button type="button" className="lg:hidden" onClick={onToggleCollapsed}
          aria-label={collapsed ? 'Show product demo' : 'Hide product demo'}>
          {collapsed ? <Play aria-hidden="true" /> : <X aria-hidden="true" />}
        </button>
      </header>
      <div className={collapsed ? 'hidden lg:block' : ''}>
        <>
          <nav aria-label="Product demo chapters" className="flex gap-1 overflow-x-auto border-b border-neutral-800 p-2">
            {showcaseChapters.map((item) => (
              <button key={item.id} type="button" aria-label={item.label}
                aria-current={item.id === chapter ? 'step' : undefined}
                onClick={() => onSelectChapter(item.id)}
                className="shrink-0 rounded px-2 py-1 text-[10px] text-neutral-300 aria-[current=step]:bg-neutral-800 aria-[current=step]:text-white">
                {item.label}
              </button>
            ))}
          </nav>
          <div className="min-h-48 p-3">
            <SceneView chapter={chapter} step={step} reducedMotion={reducedMotion} />
          </div>
          <footer className="flex items-center justify-between border-t border-neutral-800 px-3 py-2">
            <span className="truncate text-[10px] text-neutral-400" aria-live="polite">{active.label}</span>
            <div className="flex shrink-0 gap-2">
              {(phase === 'playing' || phase === 'paused') && (
                <button type="button" onClick={onPlaybackToggle} aria-label={playbackLabel}>
                  {phase === 'playing' ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
                </button>
              )}
              <button type="button" onClick={onReplay} disabled={reducedMotion} aria-label="Replay scene">
                <RotateCcw aria-hidden="true" />
              </button>
            </div>
          </footer>
        </>
      </div>
    </section>
  )
}
```

Keep the sticky/collapse layout on the outer `ProductShowcase`; `ProductWindow` owns only its visible shell and callbacks. Chapter buttons use `aria-current="step"` on the selected chapter; reduced motion disables Replay while retaining chapter navigation.

- [ ] **Step 4: Run the window tests and confirm controls pass**

Run: `npx vitest run tests/product-window.test.tsx`

Expected: 2 tests pass with all control callbacks verified.

## Task 4: Implement chapter tracking and playback lifecycle

**Files:**
- Create: `src/components/product-showcase/use-product-showcase.ts`
- Test: `tests/product-showcase.test.tsx`

- [ ] **Step 1: Write failing chapter/playback tests**

Create `tests/product-showcase.test.tsx`:

```tsx
import { useRef } from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { showcaseChapters } from '../src/data/product-demo'
import ProductWindow from '../src/components/product-showcase/ProductWindow'
import { useProductShowcase } from '../src/components/product-showcase/use-product-showcase'

class ControlledIntersectionObserver {
  static instances: ControlledIntersectionObserver[] = []

  constructor(private callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {
    ControlledIntersectionObserver.instances.push(this)
  }

  observe(_target: Element) {}
  unobserve() {}
  disconnect = vi.fn()
  takeRecords(): IntersectionObserverEntry[] { return [] }

  enter(target: Element) {
    this.callback([{ target, isIntersecting: true, intersectionRatio: 0.8 } as IntersectionObserverEntry], this as unknown as IntersectionObserver)
  }
}

function Harness() {
  const storyRef = useRef<HTMLDivElement>(null)
  const demo = useProductShowcase(storyRef)
  return (
    <>
      <div ref={storyRef}>
        {showcaseChapters.map((chapter) => (
          <section key={chapter.id} data-showcase-chapter={chapter.id} />
        ))}
      </div>
      <ProductWindow
        chapter={demo.activeChapter}
        step={demo.step}
        phase={demo.phase}
        reducedMotion={demo.reducedMotion}
        collapsed={demo.collapsed}
        onSelectChapter={demo.activateChapter}
        onPlaybackToggle={demo.togglePlayback}
        onReplay={demo.replay}
        onToggleCollapsed={demo.toggleCollapsed}
      />
    </>
  )
}

beforeEach(() => {
  ControlledIntersectionObserver.instances = []
  vi.stubGlobal('IntersectionObserver', ControlledIntersectionObserver)
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
  vi.useRealTimers()
  if (originalHidden) Object.defineProperty(document, 'hidden', originalHidden)
})

const enter = (container: HTMLElement, chapter: string) => {
  const target = container.querySelector(`[data-showcase-chapter="${chapter}"]`)
  if (!target) throw new Error(`Missing showcase chapter: ${chapter}`)
  act(() => ControlledIntersectionObserver.instances[0]!.enter(target))
}

const originalHidden = Object.getOwnPropertyDescriptor(document, 'hidden')

describe('useProductShowcase', () => {
  it('selects the scene for the intersecting story chapter', () => {
    const { container } = render(<Harness />)
    enter(container, 'services')
    expect(screen.getByRole('button', { name: 'Service catalog' })).toHaveAttribute('aria-current', 'step')
    expect(screen.getByText('API Gateway')).toBeInTheDocument()
  })

  it('plays a chapter once, holds its final state on return, and replays on request', () => {
    vi.useFakeTimers()
    const { container } = render(<Harness />)
    act(() => vi.advanceTimersByTime(3000))
    enter(container, 'services')
    act(() => vi.advanceTimersByTime(3000))
    expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toHaveAttribute('data-showcase-phase', 'complete')
    enter(container, 'work')
    enter(container, 'services')
    expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toHaveAttribute('data-showcase-phase', 'complete')
    fireEvent.click(screen.getByRole('button', { name: 'Replay scene' }))
    expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toHaveAttribute('data-showcase-phase', 'playing')
  })

  it('keeps a manual pause across chapter changes until Resume is pressed', () => {
    const { container } = render(<Harness />)
    enter(container, 'services')
    fireEvent.click(screen.getByRole('button', { name: 'Pause animation' }))
    enter(container, 'galileo')
    expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toHaveAttribute('data-showcase-phase', 'paused')
    fireEvent.click(screen.getByRole('button', { name: 'Resume animation' }))
    expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toHaveAttribute('data-showcase-phase', 'playing')
  })

  it('uses a final static state when reduced motion is requested', async () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: query.includes('prefers-reduced-motion: reduce'), media: query, onchange: null,
      addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false },
    }) as MediaQueryList)
    render(<Harness />)
    await waitFor(() => expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toHaveAttribute('data-showcase-phase', 'static'))
  })

  it('pauses for a hidden tab and resumes only an unpaused active scene', () => {
    const { container } = render(<Harness />)
    enter(container, 'services')
    Object.defineProperty(document, 'hidden', { configurable: true, value: true })
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toHaveAttribute('data-showcase-phase', 'paused')
    Object.defineProperty(document, 'hidden', { configurable: true, value: false })
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toHaveAttribute('data-showcase-phase', 'playing')
  })

  it('does not resume a different chapter that becomes active while the tab is hidden', () => {
    const { container } = render(<Harness />)
    enter(container, 'services')
    Object.defineProperty(document, 'hidden', { configurable: true, value: true })
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    enter(container, 'galileo')
    Object.defineProperty(document, 'hidden', { configurable: true, value: false })
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toHaveAttribute('data-showcase-phase', 'paused')
  })

  it('disconnects the observer and clears the active timer on unmount', () => {
    vi.useFakeTimers()
    const { unmount } = render(<Harness />)
    const observer = ControlledIntersectionObserver.instances[0]!
    expect(vi.getTimerCount()).toBeGreaterThan(0)
    unmount()
    expect(observer.disconnect).toHaveBeenCalledTimes(1)
    expect(vi.getTimerCount()).toBe(0)
  })
})
```

- [ ] **Step 2: Run the controller tests and confirm the missing-module failure**

Run: `npx vitest run tests/product-showcase.test.tsx`

Expected: FAIL because the showcase controller is not present.

- [ ] **Step 3: Implement the controller and observer lifecycle**

Create `src/components/product-showcase/use-product-showcase.ts`:

```ts
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { useReducedMotion } from 'motion/react'
import { showcaseChapters, type ShowcaseChapterId, type ShowcasePhase } from '../../data/product-demo'

type TPlayback = { activeChapter: ShowcaseChapterId; step: number; phase: ShowcasePhase; run: number }
type TShowcaseController = TPlayback & {
  collapsed: boolean
  reducedMotion: boolean
  activateChapter: (chapter: ShowcaseChapterId) => void
  replay: () => void
  togglePlayback: () => void
  toggleCollapsed: () => void
}

const STEP_MS = 1000
const configFor = (id: ShowcaseChapterId) => showcaseChapters.find((chapter) => chapter.id === id)!

export function useProductShowcase(storyRef: RefObject<HTMLDivElement | null>): TShowcaseController {
  const reducedMotion = useReducedMotion() ?? false
  const [playback, setPlayback] = useState<TPlayback>(() => ({
    activeChapter: 'work', step: reducedMotion ? configFor('work').steps - 1 : 0,
    phase: reducedMotion ? 'static' : 'playing', run: 0,
  }))
  const [collapsed, setCollapsed] = useState(false)
  const seen = useRef(new Set<ShowcaseChapterId>(['work']))
  const userPaused = useRef(false)
  const hiddenChapter = useRef<ShowcaseChapterId | null>(null)

  const activateChapter = useCallback((chapter: ShowcaseChapterId) => {
    setPlayback((current) => {
      if (current.activeChapter === chapter) return current
      const finalStep = configFor(chapter).steps - 1
      const wasSeen = seen.current.has(chapter)
      if (reducedMotion) {
        seen.current.add(chapter)
        return { activeChapter: chapter, step: finalStep, phase: 'static', run: current.run + 1 }
      }
      if (userPaused.current || document.hidden) return { activeChapter: chapter, step: 0, phase: 'paused', run: current.run + 1 }
      if (wasSeen) return { activeChapter: chapter, step: finalStep, phase: 'complete', run: current.run + 1 }
      seen.current.add(chapter)
      return { activeChapter: chapter, step: 0, phase: 'playing', run: current.run + 1 }
    })
  }, [reducedMotion])

  useEffect(() => {
    const root = storyRef.current
    if (!root) return
    const observer = new IntersectionObserver((entries) => {
      const entry = entries.filter((candidate) => candidate.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0]
      const id = entry?.target.getAttribute('data-showcase-chapter') as ShowcaseChapterId | null
      if (id && showcaseChapters.some((chapter) => chapter.id === id)) activateChapter(id)
    }, { rootMargin: '-20% 0px -35% 0px', threshold: [0.25, 0.5, 0.75] })
    root.querySelectorAll('[data-showcase-chapter]').forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [storyRef, activateChapter])

  useEffect(() => {
    if (reducedMotion || playback.phase !== 'playing') return
    const chapter = playback.activeChapter
    const run = playback.run
    const timer = window.setTimeout(() => {
      setPlayback((current) => {
        if (current.activeChapter !== chapter || current.phase !== 'playing' || current.run !== run) return current
        if (current.step >= configFor(chapter).steps - 1) return { ...current, phase: 'complete' }
        return { ...current, step: current.step + 1 }
      })
    }, STEP_MS)
    return () => window.clearTimeout(timer)
  }, [playback.activeChapter, playback.phase, playback.run, playback.step, reducedMotion])

  useEffect(() => {
    if (!reducedMotion) return
    setPlayback((current) => ({ ...current, step: configFor(current.activeChapter).steps - 1, phase: 'static' }))
  }, [reducedMotion])

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        setPlayback((current) => {
          if (current.phase !== 'playing') return current
          hiddenChapter.current = current.activeChapter
          return { ...current, phase: 'paused' }
        })
      } else if (hiddenChapter.current) {
        const chapter = hiddenChapter.current
        hiddenChapter.current = null
        if (!userPaused.current) {
          setPlayback((current) => current.phase === 'paused' && current.activeChapter === chapter
            ? { ...current, phase: 'playing' }
            : current)
        }
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  const togglePlayback = useCallback(() => {
    setPlayback((current) => {
      if (current.phase === 'playing') {
        userPaused.current = true
        hiddenChapter.current = null
        return { ...current, phase: 'paused' }
      }
      if (current.phase === 'paused' && !reducedMotion) {
        userPaused.current = false
        seen.current.add(current.activeChapter)
        return { ...current, phase: 'playing' }
      }
      return current
    })
  }, [reducedMotion])

  const replay = useCallback(() => {
    if (reducedMotion) return
    userPaused.current = false
    hiddenChapter.current = null
    setPlayback((current) => {
      seen.current.add(current.activeChapter)
      return { ...current, step: 0, phase: 'playing', run: current.run + 1 }
    })
  }, [reducedMotion])

  return { ...playback, collapsed, reducedMotion, activateChapter, replay, togglePlayback,
    toggleCollapsed: () => setCollapsed((value) => !value) }
}
```

Use one 1000 ms timeout per scene step for the three-step sequence. The observer, timer, and visibility effects must clean up on dependency change/unmount. Story copy provides `data-showcase-chapter`; there is no dependency on screenshots or inactive legacy tour code.

- [ ] **Step 4: Run controller tests and confirm observer/playback behavior**

Run: `npx vitest run tests/product-showcase.test.tsx`

Expected: 7 tests pass, including timer/observer cleanup after unmount, no timeout-driven changes while manually paused, and no hidden-tab resume after the active chapter changes.

## Task 5: Replace active homepage screenshots with the shared window

**Files:**
- Create: `src/components/product-showcase/ProductShowcase.tsx`
- Modify: `src/components/Tour.tsx`
- Modify: `tests/home.test.tsx`

- [ ] **Step 1: Replace screenshot expectations with failing showcase assertions**

In `tests/home.test.tsx`, replace the screenshot-specific test with assertions that the home page renders the labeled demo window, all four chapter controls, all four capability copy sections, and no screenshot image:

```tsx
it('shows one animated product window instead of product screenshots', () => {
  const { container } = render(<App />)

  expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toBeInTheDocument()
  expect(screen.getByText('Demo workspace · Sample data')).toBeInTheDocument()
  for (const label of ['Work management', 'Service catalog', 'Knowledge & AI', 'Delivery & mobile']) {
    expect(screen.getAllByText(new RegExp(label)).length).toBeGreaterThan(0)
    expect(screen.getByRole('button', { name: label })).toBeInTheDocument()
  }
  expect(container.querySelector('.tour img[src^="/screenshots/"]')).toBeNull()
  expect(screen.getByRole('region', { name: 'Platform foundations' })).toBeInTheDocument()
})
```

Retain the existing hero promise/CTA, lower-page content, navigation, and `/learn` link assertions.

- [ ] **Step 2: Run the homepage test and confirm it fails on old screenshot rendering**

Run: `npx vitest run tests/home.test.tsx`

Expected: FAIL because the new demo window is not integrated and the active page still renders screenshot images.

- [ ] **Step 3: Compose `ProductShowcase` around the existing story copy**

Create `src/components/product-showcase/ProductShowcase.tsx`:

```tsx
import { useRef, type ReactNode } from 'react'
import { showcaseChapters, type ShowcaseChapterId } from '../../data/product-demo'
import ProductWindow from './ProductWindow'
import { useProductShowcase } from './use-product-showcase'

type Props = { children: ReactNode }

export default function ProductShowcase({ children }: Props) {
  const storyRef = useRef<HTMLDivElement>(null)
  const demo = useProductShowcase(storyRef)

  const selectChapter = (chapter: ShowcaseChapterId) => {
    const targetId = showcaseChapters.find((item) => item.id === chapter)!.targetId
    document.getElementById(targetId)?.scrollIntoView({
      behavior: demo.reducedMotion ? 'auto' : 'smooth',
      block: 'center',
    })
    demo.activateChapter(chapter)
  }

  return (
    <div className="mx-auto grid w-full gap-6 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 lg:px-16">
      <ProductWindow
        className="sticky top-[112px] z-30 order-first self-start md:top-[72px] lg:order-none lg:col-start-2 lg:row-start-1 lg:mt-16"
        chapter={demo.activeChapter}
        step={demo.step}
        phase={demo.phase}
        reducedMotion={demo.reducedMotion}
        collapsed={demo.collapsed}
        onSelectChapter={selectChapter}
        onPlaybackToggle={demo.togglePlayback}
        onReplay={demo.replay}
        onToggleCollapsed={demo.toggleCollapsed}
      />
      <div ref={storyRef} className="min-w-0 lg:col-start-1 lg:row-start-1">
        {children}
      </div>
    </div>
  )
}
```

In `Tour.tsx`:

1. Remove `ProductShot`, `ServiceGraphPreview`, `Screenshot`, and screenshot fields from the local `Capability` type/config because this active component will no longer render image data.
2. Keep the current Hero text/CTAs and four capability descriptions as the left story column. Mark the hero and feature sections with `data-showcase-chapter` values `work`, `services`, `galileo`, and `delivery`; hero and Work management both map to `work`. Give the service/AI/delivery capability articles IDs `showcase-services`, `showcase-galileo`, and `showcase-delivery`, matching `showcaseChapters.targetId`.
3. Remove screenshot frames and the mobile image composition from `CapabilitySection`.
4. Remove the Hero/ProductSection inner full-width containers and screenshot-driven grid spacing; keep existing max-widths on individual text blocks. Wrap hero + product copy in `ProductShowcase`; keep `id="top"` on the hero and `id="product"` on the product section so current nav anchors work.
5. Move `FactStrip` immediately after the unified story region. Keep Platform, Roadmap, FAQ, CTA, Footer, copy, and navigation intact.

Add a chapter field to the existing capability metadata and use it to annotate the rendered article:

```tsx
import type { ShowcaseChapterId } from '../data/product-demo'

type Capability = {
  number: string
  chapter: ShowcaseChapterId
  eyebrow: string
  title: string
  body: string
  features: readonly Feature[]
}

const capabilities: readonly Capability[] = [
  {
    number: '01', chapter: 'work', eyebrow: 'Work management',
    title: 'Move service work forward with a clear process.',
    body: 'Bring requests, incidents and change tasks into one queue, then give each kind of work the states and rules it needs.',
    features: [feature('work-items'), feature('types'), feature('intake')],
  },
  {
    number: '02', chapter: 'services', eyebrow: 'Service catalog',
    title: 'See the services behind every decision.',
    body: 'Understand ownership, criticality and dependencies before a change—or while investigating an incident.',
    features: [feature('services')],
  },
  {
    number: '03', chapter: 'galileo', eyebrow: 'Knowledge & AI',
    title: 'Keep context close to the work.',
    body: 'Runbooks, postmortems and an assistant grounded in the record help teams work from shared context.',
    features: [feature('pages'), feature('ai'), feature('scheduler')],
  },
  {
    number: '04', chapter: 'delivery', eyebrow: 'Delivery & mobile',
    title: 'Plan the work, then keep it moving.',
    body: 'Timebox service work, track progress and handle the important updates from your phone.',
    features: [feature('delivery'), feature('mobile')],
  },
]

function Hero() {
  return (
    <section id="top" data-showcase-chapter="work" className="bg-white">
      <div className="mx-auto w-full px-5 pt-16 sm:px-8 md:pt-[88px] lg:px-16">
        <div className="max-w-[460px]">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">{product.hero.eyebrow}</p>
          <h1 className="mt-5 font-display text-[clamp(38px,4vw,48px)] font-medium leading-[1.16] tracking-[-0.8px] text-black">
            {product.hero.title}
          </h1>
          <p className="mt-5 max-w-[45ch] text-[16px] leading-6 text-neutral-500">{product.hero.body}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href={product.hero.primaryCta.href} className="button button-primary h-9 px-[14px] text-sm">
              {product.hero.primaryCta.label}
            </a>
            <a href={product.hero.secondaryCta.href} className="inline-flex h-9 items-center px-1 text-sm font-medium text-black">
              {product.hero.secondaryCta.label}
            </a>
          </div>
          <div className="mt-8 flex items-center gap-7">
            <div><p className="font-mono text-[21px]">AGPL-3.0</p><p className="mt-1 text-[13px] text-neutral-500">Open-source license</p></div>
            <span aria-hidden="true" className="h-12 w-px bg-neutral-200" />
            <div><p className="font-mono text-[19px]">Docker</p><p className="mt-1 text-[13px] text-neutral-500">Self-host your stack</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CapabilitySection({ item }: { item: Capability }) {
  const id = item.chapter === 'work' ? undefined : `showcase-${item.chapter}`
  return (
    <article id={id} data-showcase-chapter={item.chapter}>
      <p>{item.number} / {item.eyebrow}</p>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      {item.features.map((feature) => (
        <div key={feature.id}>
          <h4>{feature.title}</h4>
          <p>{feature.body}</p>
        </div>
      ))}
    </article>
  )
}
```

The final composition in `Tour` is:

```tsx
<main>
  <ProductShowcase>
    <Hero />
    <ProductSection />
  </ProductShowcase>
  <FactStrip />
  <PlatformSection />
  <RoadmapSection />
  <FaqSection />
  <CallToAction />
</main>
```

- [ ] **Step 4: Run homepage and site-component tests**

Run: `npx vitest run tests/home.test.tsx tests/site-components.test.tsx`

Expected: all homepage and footer tests pass; there are no active screenshot `<img>` elements.

## Task 6: Full verification and responsive visual pass

**Files:**
- No new application files; fix only defects found in the preceding tasks.

- [ ] **Step 1: Run the complete test suite**

Run: `npm test -- --run`

Expected: all Vitest files pass, including existing `/learn` tests.

- [ ] **Step 2: Build both Vite entries**

Run: `npm run build`

Expected: TypeScript and Vite succeed for the homepage and `/learn` entries.

- [ ] **Step 3: Run the site locally for visual verification**

Run: `npm run dev -- --host 127.0.0.1`

Open `http://127.0.0.1:5173/`. Inspect widths 1440, 1024, 768, 390, and 320 px. Confirm the desktop stage sticks beside the copy; the compact stage stays below the nav on smaller widths; the hide/show control works; and no viewport has horizontal overflow.

- [ ] **Step 4: Verify motion and network behavior in the browser**

In the browser, verify each chapter activates the correct scene; each unseen chapter auto-plays once; revisiting holds the final state; Pause/Resume/Replay work; chapter navigation scrolls to its copy; a hidden tab pauses and resumes only an unpaused sequence; and `prefers-reduced-motion: reduce` renders static final states. In DevTools Network, confirm the active homepage requests no `/screenshots/*.webp` files or requests to the Plane API.

- [ ] **Step 5: Confirm the final repository scope**

Run: `git status --short`

Expected: only the intended landing-repository implementation changes remain. Confirm `/home/ghifari/plane-for-itsm` has not been modified by this work.

---

## Self-Review Against the Approved Spec

- **All active screenshots replaced:** Task 5 removes screenshot rendering from the active homepage and tests for no screenshot `<img>`; source files and inactive legacy modules remain untouched per scope.
- **Single scroll-synchronized window:** Task 4 owns chapter intersection and Task 5 composes one shared window.
- **Current frontend modeled with local data:** Task 1 defines the stable work/service/Galileo/cycle fixtures; Task 2 implements all four views without Plane imports or React Flow.
- **Playback/accessibility:** Tasks 3–4 cover Pause/Resume/Replay, one-time auto-play, reduced motion, keyboard semantics, visibility handling, and hidden mobile state.
- **Responsive behavior:** Task 5 implements sticky desktop and compact tablet/phone layouts; Task 6 checks all agreed viewport widths.
- **No Plane checkout changes:** every create/modify path belongs to `terra-landing`; Task 6 checks scope.

## Changelog

| Date | Change |
| --- | --- |
| 2026-10-19 | Plan created from the approved animated product showcase design. |
