import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Github } from 'lucide-react'
import { product, type Feature } from '../data/product'
import {
  landingPractices,
  productPractices,
  referencePractices,
  type LandingPractice,
} from '../data/practices'
import type { ShowcaseChapterId } from '../data/product-demo'
import Footer from './Footer'
import Mark from './Mark'
import ProductShowcase, { useShowcaseContext } from './product-showcase/ProductShowcase'

const feature = (id: string): Feature => {
  const found = product.features.find((item) => item.id === id)
  if (!found) throw new Error(`Unknown product feature: ${id}`)
  return found
}

type Capability = {
  chapter: ShowcaseChapterId
  short: string
  eyebrow: string
  title: string
  body: string
  features: readonly Feature[]
}

const capabilities: readonly Capability[] = [
  {
    chapter: 'work',
    short: 'Intake',
    eyebrow: 'Intake & triage',
    title: 'Triage every kind of service work in one queue.',
    body: 'Incidents, requests and change tasks keep their own fields and vocabulary while sharing states, comments and history.',
    features: [feature('work-items'), feature('types'), feature('intake')],
  },
  {
    chapter: 'services',
    short: 'Services',
    eyebrow: 'Service context',
    title: 'Know the service before you touch it.',
    body: 'Ownership, criticality and dependencies sit beside the work item, so impact is visible before a change or during an incident.',
    features: [feature('services')],
  },
  {
    chapter: 'galileo',
    short: 'Knowledge',
    eyebrow: 'Knowledge & AI',
    title: 'Draft from the work item.',
    body: 'Runbooks and postmortems live next to the work. Galileo drafts summaries and comments from the item on screen; a person reviews every draft before it is used.',
    features: [feature('pages'), feature('ai'), feature('scheduler')],
  },
  {
    chapter: 'delivery',
    short: 'Delivery',
    eyebrow: 'Delivery & mobile',
    title: 'Keep the practice moving after triage.',
    body: 'Cycles, analytics and phone-sized triage cover the work that continues outside the queue.',
    features: [feature('delivery'), feature('mobile')],
  },
]

const handoffs = [
  { id: 'INC-', label: 'Incident', action: 'Restore service' },
  { id: 'PRB-', label: 'Problem', action: 'Find the cause' },
  { id: 'CHG-', label: 'Change', action: 'Ship the fix' },
  { id: 'KB-', label: 'Knowledge', action: 'Make it reusable' },
  { id: 'IMP-', label: 'Improvement', action: 'Prove it worked' },
] as const

const principles = [
  {
    title: 'Work types, built in.',
    body: 'Incident, problem, change and improvement are first-class types. Request is opt-in. Each has its own fields and vocabulary, and all share one state set.',
  },
  {
    title: 'Service context beside the work.',
    body: 'The catalog holds ownership, criticality and dependencies, so triage and change decisions start from the service map instead of a guess.',
  },
  {
    title: 'AI that stays inside the record.',
    body: 'Galileo drafts summaries, descriptions and comments from the work item on screen. A person reviews every draft before it is used.',
  },
]

const questions = [
  {
    question: 'Is Terraline ITIL certified?',
    answer:
      'No. Terraline is built around ITIL practices, and we do not hold ITIL certification or claim it. Six practices ship as work types; the open knowledge base documents all eight.',
  },
  {
    question: 'Which practices ship today?',
    answer:
      'Incident, problem, change, service request, knowledge and continual improvement management. Asset management and service configuration are covered in the knowledge base as reference material, not separate product modules.',
  },
  {
    question: 'What is Terraline?',
    answer:
      'Open-source IT service management built on Plane. Work items, a service catalog, shared states and AI-assisted drafting run in one self-hosted system.',
  },
  {
    question: 'Can I run Terraline on my own infrastructure?',
    answer:
      'Yes. Self-host Terraline with Docker Compose, with application data on infrastructure you operate. AI features send prompts to the configured LLM endpoint; the default is OpenAI, so configure a provider you control if your data requirements call for it.',
  },
  {
    question: 'Where is the source code?',
    answer:
      'Terraline is AGPL-3.0 and lives on GitHub at github.com/ghifarizuhir/plane-for-itsm. Self-host it with Docker Compose or request a guided demo workspace.',
  },
  {
    question: 'How can I see the product?',
    answer:
      'Request a demo and we will set up a guided workspace so you can walk an incident, request or change through Terraline against your own service processes.',
  },
]

function SiteNav() {
  return (
    <header className="site-nav sticky top-0 z-50 border-b border-[#dcd8ce] bg-[#f6f4ef]/95 backdrop-blur-md">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="flex h-16 items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <a href="#top" aria-label="Terraline home" className="flex shrink-0 items-center gap-2.5 text-[#0c0e12]">
              <Mark className="h-[18px] w-auto text-[#0c0e12]" />
              <span className="font-display text-[19px] font-semibold tracking-[-0.03em]">Terraline</span>
            </a>
            <span aria-hidden="true" className="hidden h-3.5 w-px bg-[#c8c3b8] lg:inline-block" />
            <span className="hidden font-mono text-[11px] text-[#4b5260] lg:inline-block">Open source · AGPL-3.0</span>
          </div>

          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            <a href="#product" className="site-nav-link">Product</a>
            <a href="#practices" className="site-nav-link">Practices</a>
            <a href="#platform" className="site-nav-link">Platform</a>
            <a href="/learn" className="site-nav-link">Learn</a>
          </nav>

          <a
            href={product.footer.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="button button-primary h-9 shrink-0 gap-2 px-3.5 text-xs"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
          </a>
        </div>
        <nav
          aria-label="Mobile navigation"
          className="-mx-5 flex items-center gap-6 overflow-x-auto border-t border-[#dcd8ce] px-5 py-3 sm:-mx-8 sm:px-8 lg:hidden"
        >
          <a href="#product" className="site-nav-link shrink-0">Product</a>
          <a href="#practices" className="site-nav-link shrink-0">Practices</a>
          <a href="#platform" className="site-nav-link shrink-0">Platform</a>
          <a href="/learn" className="site-nav-link shrink-0">Learn</a>
        </nav>
      </div>
    </header>
  )
}

function PracticeRack() {
  return (
    <aside aria-label="Terraline ITIL practice rack" className="relative">
      <div className="overflow-hidden rounded-[22px] border border-[#1e2430] bg-[#0c0e12] text-white shadow-[0_30px_70px_-28px_rgba(12,14,18,0.55)]">
        <div className="hazard-tape h-1.5 w-full" aria-hidden="true" />

        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1" aria-hidden="true">
              <i className="h-1.5 w-1.5 rounded-full bg-red-500/70" />
              <i className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
              <i className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-300">
              Service operations · practice rack
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            6 in product
          </span>
        </div>

        <div className="px-2 py-1">
          {productPractices.map((practice, index) => (
            <a
              key={practice.id}
              href="/learn#practices"
              className="group grid grid-cols-[28px_minmax(0,1fr)] items-start gap-3 rounded-xl px-2.5 py-3 transition-colors hover:bg-white/[0.04] sm:grid-cols-[28px_minmax(0,1fr)_auto] sm:items-center sm:gap-4"
            >
              <div className="relative flex h-full justify-center pt-1.5">
                <span aria-hidden="true" className="absolute inset-y-[-14px] w-px bg-white/10" />
                <span
                  className="rack-lamp relative z-10 mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: practice.lamp,
                    boxShadow: `0 0 0 4px ${practice.lamp}1f, 0 0 16px ${practice.lamp}66`,
                    animationDelay: `${index * 0.6}s`,
                  }}
                  aria-hidden="true"
                />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span className="font-mono text-[10px] tracking-[0.08em] text-slate-400">{practice.prefix}</span>
                  <span className="text-[13.5px] font-semibold leading-snug text-white">{practice.shortTitle}</span>
                </div>
                <p className="mt-0.5 text-[11.5px] leading-snug text-slate-400">{practice.oneLiner}</p>
              </div>
              <span className="col-start-2 justify-self-start rounded border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-slate-300 sm:col-start-auto sm:justify-self-end">
                AI · {practice.aiSkill}
              </span>
            </a>
          ))}
        </div>

        <div className="border-t border-white/10 px-4 py-3 sm:px-5">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400">
            Also documented in the open knowledge base
          </p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
            {referencePractices.map((practice) => (
              <a
                key={practice.id}
                href="/learn#practices"
                className="inline-flex items-center gap-2 font-mono text-[10px] text-slate-300 transition-colors hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full border border-slate-400/60" aria-hidden="true" />
                {practice.prefix} {practice.shortTitle}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-[#10131a] px-4 py-2.5 font-mono text-[10px] text-slate-400 sm:px-5">
          <span>One queue · one catalog · one record</span>
          <span className="text-slate-400">ITIL-aligned · not certified</span>
        </div>
      </div>
    </aside>
  )
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-[#dcd8ce] bg-[#f6f4ef]">
      <div aria-hidden="true" className="paper-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-12 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-14 lg:py-24">
        <div className="max-w-[600px]">
          <h1 className="text-balance font-display text-[clamp(42px,5.2vw,68px)] font-semibold leading-[0.98] tracking-[-0.04em] text-[#0c0e12]">
            {product.hero.title}
          </h1>
          <p className="mt-6 max-w-[54ch] text-[16.5px] leading-[1.65] text-[#3a404d]">
            {product.hero.body}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
            <a href={product.hero.primaryCta.href} className="button button-primary h-11 px-5 text-sm">
              {product.hero.primaryCta.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={product.hero.secondaryCta.href} className="button button-secondary h-11 px-5 text-sm">
              {product.hero.secondaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <p className="mt-10 max-w-[52ch] border-t border-[#dcd8ce] pt-5 text-[12.5px] leading-relaxed text-[#4b5260]">
            Six practices ship today. Asset management and service configuration are documented in the{' '}
            <a href="/learn" className="font-semibold text-[#0c0e12] underline underline-offset-4">
              open knowledge base
            </a>
            , not packaged as modules.
          </p>
        </div>

        <PracticeRack />
      </div>
    </section>
  )
}

function FactStrip() {
  return (
    <section aria-label="Platform foundations" className="border-b border-[#dcd8ce] bg-[#efeae0]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-between gap-4 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:px-14">
        <p className="text-sm font-medium text-[#2d333f]">
          Open-source foundation, built for service operations
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {product.facts.map((fact) => (
            <li
              key={fact}
              className="inline-flex items-center gap-2 font-mono text-[11px] font-medium text-[#1f242d]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#0c0e12]" aria-hidden="true" />
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ConnectedPractices() {
  return (
    <section aria-label="How the practices connect" className="border-b border-[#dcd8ce] bg-[#efeae0]/45">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="max-w-[18ch] text-balance font-display text-[clamp(34px,3.8vw,48px)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#0c0e12]">
            The practices arrive connected.
          </h2>
          <p className="max-w-[62ch] text-[15px] leading-[1.65] text-[#3a404d] lg:justify-self-end">
            An incident that recurs can open a problem. A confirmed problem can publish a known error. The fix runs as a change. Closure captures the evidence and drafts the knowledge or improvement follow-up. One record follows the work.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[18px] border border-[#dcd8ce] bg-[#dcd8ce] sm:grid-cols-5">
          {handoffs.map((handoff) => {
            const practice = landingPractices.find((item) => item.prefix === handoff.id)
            return (
              <div key={handoff.id} className="bg-[#fbfaf7] p-4 sm:p-5 last:col-span-2 sm:last:col-span-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] tracking-[0.08em] text-[#4b5260]">{handoff.id}</span>
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: practice?.lamp ?? '#64748b',
                      boxShadow: `0 0 18px ${practice?.lamp ?? '#64748b'}44`,
                    }}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 font-display text-[19px] font-semibold tracking-[-0.02em] text-[#0c0e12]">
                  {handoff.label}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-[#4b5260]">{handoff.action}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-12 grid gap-8 border-t border-[#dcd8ce] pt-8 md:grid-cols-3 md:gap-10">
          {principles.map((principle) => (
            <article key={principle.title}>
              <h3 className="font-display text-[19px] font-semibold tracking-[-0.02em] text-[#0c0e12]">
                {principle.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.65] text-[#3a404d]">{principle.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function statusClasses(status: LandingPractice['status']) {
  return status === 'product'
    ? 'inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-700/25 bg-emerald-950 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-emerald-200'
    : 'inline-flex w-fit items-center gap-1.5 rounded-full border border-[#c8c3b8] bg-[#f6f4ef] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-[#4b5260]'
}

function PracticesSection() {
  return (
    <section id="practices" className="scroll-mt-[112px] border-b border-[#dcd8ce] md:scroll-mt-16">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <h2 className="max-w-[20ch] text-balance font-display text-[clamp(34px,3.8vw,48px)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#0c0e12]">
              Eight practices. Six in the product. All in the open.
            </h2>
            <p className="mt-4 max-w-[56ch] text-[15px] leading-[1.65] text-[#3a404d]">
              Six practices ship as connected work types. Asset management and service configuration live in the open knowledge base, so the full map is readable before you deploy.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:justify-self-end">
            <span className={statusClasses('product')}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              6 in product
            </span>
            <span className={statusClasses('reference')}>2 reference</span>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-[18px] border border-[#dcd8ce] bg-[#fbfaf7]">
          <div className="hidden grid-cols-[minmax(0,1.15fr)_minmax(0,1.5fr)_minmax(0,0.9fr)_auto_18px] items-center gap-4 border-b border-[#dcd8ce] bg-[#efeae0]/60 px-5 py-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#4b5260] md:grid">
            <span>Practice</span>
            <span>What it does</span>
            <span>AI skill</span>
            <span>Status</span>
            <span />
          </div>

          {landingPractices.map((practice) => (
            <a
              key={practice.id}
              href="/learn#practices"
              className="group grid gap-2 border-b border-[#e5e1d8] px-5 py-4 transition-colors last:border-b-0 hover:bg-[#f6f4ef] md:grid-cols-[minmax(0,1.15fr)_minmax(0,1.5fr)_minmax(0,0.9fr)_auto_18px] md:items-center md:gap-4"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{
                    backgroundColor: practice.lamp,
                    boxShadow: practice.status === 'product' ? `0 0 8px ${practice.lamp}66` : undefined,
                  }}
                  aria-hidden="true"
                />
                <span className="font-mono text-[10px] text-[#4b5260]">{practice.prefix}</span>
                <span className="text-[14px] font-semibold text-[#0c0e12]">{practice.shortTitle}</span>
              </div>
              <p className="pl-5 text-[13px] leading-snug text-[#3a404d] md:pl-0">{practice.oneLiner}</p>
              <span className="pl-5 font-mono text-[10px] uppercase tracking-[0.06em] text-[#3a404d] md:pl-0">
                {practice.aiSkill}
              </span>
              <span className={statusClasses(practice.status)}>
                {practice.status === 'product' ? 'In product' : 'Reference'}
              </span>
              <ArrowUpRight
                className="hidden h-4 w-4 text-[#4b5260] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:block"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-[#4b5260]">
          <span>Six practices ship today. Two are reference material in the open knowledge base.</span>
          <a href="/learn" className="font-semibold text-[#0c0e12] underline underline-offset-4">
            Read all 8 practices →
          </a>
        </div>
      </div>
    </section>
  )
}

const chapterMeta: Record<ShowcaseChapterId, { surface: string; badge: string }> = {
  work: { surface: 'Intake · Queue · Types', badge: 'TERRA-42' },
  services: { surface: 'Catalog · Dependency graph', badge: '3 SERVICES' },
  galileo: { surface: 'Pages · Grounded AI · Schedules', badge: 'GALILEO AI' },
  delivery: { surface: 'Cycles · Analytics · Mobile', badge: 'WEEK 2' },
}

function ProductHeader() {
  const { activeChapter, prevChapter, nextChapter } = useShowcaseContext()
  const activeIndex = capabilities.findIndex((item) => item.chapter === activeChapter)
  const current = capabilities[activeIndex] ?? capabilities[0]!

  return (
    <div id="product" className="flex scroll-mt-24 flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <h2 className="max-w-[22ch] text-balance font-display text-[clamp(32px,3.6vw,46px)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0c0e12]">
          See the six practices at work.
        </h2>
        <p className="mt-2.5 max-w-[58ch] text-[15px] leading-[1.65] text-[#3a404d]">
          The demo workspace runs the real flows: intake, triage, service context, knowledge and delivery. Step through the chapters or use the slides.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3 self-start md:self-auto">
        <div className="rounded-xl border border-[#d0cbc0] bg-[#fbfaf7] px-3.5 py-2 font-mono text-xs text-[#0c0e12]">
          <span className="font-semibold">0{activeIndex + 1}</span>
          <span className="text-[#4b5260]"> / 0{capabilities.length} · </span>
          <span className="font-medium">{current.eyebrow}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={prevChapter}
            aria-label="Previous chapter slide"
            className="button button-secondary h-9 w-9 p-0"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={nextChapter}
            aria-label="Next chapter slide"
            className="button button-primary h-9 w-9 p-0"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

function CapabilitySlideDeck() {
  const { activeChapter, selectChapter, prevChapter, nextChapter } = useShowcaseContext()
  const activeIndex = capabilities.findIndex((item) => item.chapter === activeChapter)

  return (
    <div className="overflow-hidden rounded-[22px] border border-[#dcd8ce] bg-[#fbfaf7] shadow-[0_18px_45px_-28px_rgba(12,14,18,0.16)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dcd8ce] bg-[#f6f4ef] px-5 py-3.5 sm:px-7">
        <div className="flex items-center gap-2">
          {capabilities.map((cap, idx) => {
            const isCurrent = cap.chapter === activeChapter
            return (
              <button
                key={cap.chapter}
                type="button"
                onClick={() => selectChapter(cap.chapter)}
                aria-label={`Slide ${idx + 1}: ${cap.title}`}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-[11px] transition-colors ${
                  isCurrent
                    ? 'bg-[#0c0e12] font-semibold text-white'
                    : 'text-[#4b5260] hover:bg-[#efeae0] hover:text-[#0c0e12]'
                }`}
              >
                <span>0{idx + 1}</span>
                <span className="hidden sm:inline">{cap.short}</span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-[#4b5260]">
          <span>Slide {activeIndex + 1} of {capabilities.length}</span>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={prevChapter}
            className="font-semibold text-[#0c0e12] underline underline-offset-4 hover:text-[#3a404d]"
          >
            Prev
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            onClick={nextChapter}
            className="font-semibold text-[#0c0e12] underline underline-offset-4 hover:text-[#3a404d]"
          >
            Next
          </button>
        </div>
      </div>

      <div>
        {capabilities.map((item) => {
          const isActive = activeChapter === item.chapter
          const meta = chapterMeta[item.chapter]
          const id = item.chapter === 'work' ? undefined : `showcase-${item.chapter}`

          return (
            <article
              key={item.chapter}
              id={id}
              data-showcase-chapter={item.chapter}
              className={isActive ? 'block p-6 sm:p-8 lg:p-9' : 'sr-only'}
            >
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                <div>
                  <h3 className="text-balance font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.025em] text-[#0c0e12] sm:text-[32px]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[48ch] text-[15px] leading-[1.65] text-[#3a404d]">
                    {item.body}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2.5 pt-1">
                    <span className="rounded border border-[#d0cbc0] bg-[#efeae0] px-2.5 py-1 font-mono text-[10px] font-semibold text-[#0c0e12]">
                      {item.eyebrow}
                    </span>
                    <span className="rounded border border-[#d0cbc0] bg-[#f6f4ef] px-2.5 py-1 font-mono text-[10px] text-[#2d333f]">
                      {meta.surface}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/25 bg-emerald-950 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                      Active in demo above
                    </span>
                  </div>
                </div>

                <div
                  className={`grid divide-y divide-[#dcd8ce] border-t border-[#dcd8ce] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 ${
                    item.features.length > 1 ? 'sm:grid-cols-2 sm:divide-x sm:divide-y-0' : 'grid-cols-1'
                  }`}
                >
                  {item.features.map((current, idx) => {
                    const spanFull = item.features.length === 3 && idx === 2
                    return (
                      <div
                        key={current.id}
                        className={`py-4 first:pt-0 last:pb-0 sm:px-4 sm:py-0 sm:first:pl-0 sm:last:pr-0 ${
                          spanFull ? 'sm:col-span-2 sm:mt-5 sm:border-t sm:border-l-0 sm:border-[#dcd8ce] sm:px-0 sm:pt-5' : ''
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="text-[15px] font-semibold leading-snug text-[#0c0e12]">
                            {current.title}
                          </h4>
                          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-[#4b5260]">
                            {current.eyebrow}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[13px] leading-[1.6] text-[#3a404d]">
                          {current.body}
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {current.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="inline-flex items-center gap-1.5 rounded border border-[#dcd8ce] bg-[#f6f4ef] px-2 py-0.5 text-[11px] text-[#2d333f]"
                            >
                              <span className="h-1 w-1 rounded-full bg-[#0c0e12]" aria-hidden="true" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function PlatformSection() {
  return (
    <section id="platform" className="scroll-mt-[112px] border-b border-[#dcd8ce] md:scroll-mt-16">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="text-balance font-display text-[clamp(34px,3.8vw,48px)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0c0e12]">
            Your infrastructure. Your records.
          </h2>
          <p className="max-w-[60ch] text-[15px] leading-[1.65] text-[#3a404d] lg:justify-self-end">
            {product.architecture.body} AI requests follow the configured LLM endpoint; the default is OpenAI, and the endpoint can be configured for your deployment.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {product.comparisons.map((comparison, index) => (
            <article
              key={comparison.title}
              className={
                index === 0
                  ? 'flex flex-col justify-between rounded-[20px] border border-[#dcd8ce] bg-[#fbfaf7] p-7 sm:p-9'
                  : 'flex flex-col justify-between rounded-[20px] border border-[#1e2430] bg-[#0c0e12] p-7 text-white sm:p-9'
              }
            >
              <div>
                <h3 className="font-display text-[28px] font-semibold leading-tight tracking-[-0.025em]">
                  {comparison.title}
                </h3>
                <p
                  className={`mt-3 max-w-[54ch] text-[14.5px] leading-[1.65] ${
                    index === 0 ? 'text-[#3a404d]' : 'text-slate-300'
                  }`}
                >
                  {comparison.body}
                </p>
              </div>

              <ul className="mt-8 grid gap-x-6 gap-y-3 border-t border-current/10 pt-6 sm:grid-cols-2">
                {comparison.points.map((point) => (
                  <li
                    key={point}
                    className={`flex gap-2.5 text-[13px] leading-[1.55] ${
                      index === 0 ? 'text-[#1f242d]' : 'text-slate-200'
                    }`}
                  >
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        index === 0 ? 'text-[#0c0e12]' : 'text-emerald-400'
                      }`}
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-[16px] border border-[#dcd8ce] bg-[#efeae0] px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-semibold text-[#0c0e12]">
              A production-minded stack, ready to self-host with Docker Compose.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {product.architecture.facts.map((fact) => (
                <li key={fact} className="font-mono text-[11px] font-medium text-[#2d333f]">
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function RoadmapSection() {
  return (
    <section id="roadmap" className="scroll-mt-[112px] border-b border-[#dcd8ce] md:scroll-mt-16">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-balance font-display text-[clamp(34px,3.8vw,48px)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0c0e12]">
            Shipped today. Not claimed.
          </h2>
          <p className="max-w-[46ch] text-[15px] leading-[1.65] text-[#3a404d]">
            The boundary is part of the product. This is what runs now, and what we do not pretend to have.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-[20px] border border-[#dcd8ce] bg-[#fbfaf7] p-7 sm:p-9">
            <div className="flex items-center justify-between border-b border-[#dcd8ce] pb-4">
              <h3 className="font-display text-[22px] font-semibold tracking-[-0.02em] text-[#0c0e12]">
                Shipped today
              </h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                Available in v1.4
              </span>
            </div>
            <ul className="mt-6 space-y-3.5">
              {product.roadmap.shipped.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] leading-[1.55] text-[#1f242d]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0c0e12]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[20px] border border-[#dcd8ce] bg-[#efeae0]/70 p-7 sm:p-9">
            <div className="flex items-center justify-between border-b border-[#dcd8ce] pb-4">
              <h3 className="font-display text-[22px] font-semibold tracking-[-0.02em] text-[#0c0e12]">
                Out of scope in v1
              </h3>
              <span className="rounded-full border border-[#c8c3b8] bg-[#fbfaf7] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#3a404d]">
                Deliberate boundary
              </span>
            </div>
            <ul className="mt-6 space-y-3.5">
              {product.roadmap.next.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] leading-[1.55] text-[#2d333f]">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#4b5260]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section id="faq" className="border-b border-[#dcd8ce]">
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.82fr_1.18fr] md:gap-14 md:py-28 lg:px-14">
        <div>
          <h2 className="max-w-[14ch] text-balance font-display text-[clamp(34px,3.8vw,46px)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0c0e12]">
            Before you deploy.
          </h2>
          <p className="mt-4 max-w-[38ch] text-[15px] leading-[1.65] text-[#3a404d]">
            The short answers on certification, scope and self-hosting. Need the longer version?{' '}
            <a className="font-semibold text-[#0c0e12] underline underline-offset-4" href={product.footer.contact}>
              Contact us.
            </a>
          </p>
        </div>
        <div className="divide-y divide-[#dcd8ce] rounded-[20px] border border-[#dcd8ce] bg-[#fbfaf7]">
          {questions.map((item, index) => (
            <details key={item.question} className="faq-item group" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 text-left text-[15.5px] font-semibold text-[#0c0e12] marker:hidden sm:px-7">
                {item.question}
                <ChevronDown className="faq-chevron h-4 w-4 shrink-0 text-[#3a404d]" aria-hidden="true" />
              </summary>
              <p className="max-w-[66ch] px-6 pb-6 pr-10 text-[14px] leading-[1.65] text-[#3a404d] sm:px-7">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function CallToAction() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 md:py-20 lg:px-14">
      <div className="overflow-hidden rounded-[24px] border border-[#1e2430] bg-[#0c0e12] text-white shadow-[0_28px_64px_-24px_rgba(12,14,18,0.45)]">
        <div className="hazard-tape h-1.5 w-full" aria-hidden="true" />
        <div className="flex flex-col gap-6 p-8 sm:p-10 md:flex-row md:items-center md:justify-between lg:p-12">
          <div>
            <h2 className="text-balance font-display text-[clamp(30px,3.4vw,42px)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
              {product.cta.title}
            </h2>
            <p className="mt-3 max-w-[56ch] text-[15px] leading-[1.65] text-slate-300">
              {product.cta.body}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={product.cta.href}
              className="button h-11 bg-white px-5 text-sm font-semibold text-[#0c0e12] transition-colors hover:bg-[#efeae0]"
            >
              {product.cta.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="/learn"
              className="button h-11 border border-white/20 bg-white/[0.06] px-5 text-sm font-semibold text-white transition-colors hover:bg-white/12"
            >
              Read the practice guide
            </a>
            <a
              href={product.footer.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="button h-11 border border-white/20 bg-white/[0.06] px-5 text-sm font-semibold text-white transition-colors hover:bg-white/12"
            >
              View source
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Tour() {
  return (
    <div className="tour min-h-screen text-[#0c0e12]">
      <SiteNav />
      <main>
        <Hero />
        <FactStrip />
        <ConnectedPractices />
        <PracticesSection />
        <ProductShowcase header={<ProductHeader />}>
          <CapabilitySlideDeck />
        </ProductShowcase>
        <PlatformSection />
        <RoadmapSection />
        <FaqSection />
        <CallToAction />
      </main>
      <Footer variant="landing" />
    </div>
  )
}
