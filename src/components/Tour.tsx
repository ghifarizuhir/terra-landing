import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown } from 'lucide-react'
import { product, type Feature } from '../data/product'
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
  eyebrow: string
  title: string
  body: string
  features: readonly Feature[]
}

const capabilities: readonly Capability[] = [
  {
    chapter: 'work',
    eyebrow: 'Work management',
    title: 'Move service work forward with a clear process.',
    body: 'Bring requests, incidents and change tasks into one queue, then give each kind of work its own fields and vocabulary.',
    features: [feature('work-items'), feature('types'), feature('intake')],
  },
  {
    chapter: 'services',
    eyebrow: 'Service catalog',
    title: 'See the services behind every decision.',
    body: 'Understand ownership, criticality and dependencies before a change—or while investigating an incident.',
    features: [feature('services')],
  },
  {
    chapter: 'galileo',
    eyebrow: 'Knowledge & AI',
    title: 'Keep context close to the work.',
    body: 'Runbooks, postmortems and an assistant grounded in the record help teams work from shared context.',
    features: [feature('pages'), feature('ai'), feature('scheduler')],
  },
  {
    chapter: 'delivery',
    eyebrow: 'Delivery & mobile',
    title: 'Plan the work, then keep it moving.',
    body: 'Timebox service work, track progress and handle the important updates from your phone.',
    features: [feature('delivery'), feature('mobile')],
  },
]

const questions = [
  {
    question: 'What is Terraline?',
    answer:
      'Terraline is open-source IT service management built on Plane. It brings work items, a service catalog, shared states and AI-assisted operations into one system.',
  },
  {
    question: 'Where is the source code?',
    answer:
      'Terraline is AGPL-3.0 and lives on GitHub at github.com/ghifarizuhir/plane-for-itsm. Self-host it with Docker Compose or request a guided demo workspace.',
  },
  {
    question: 'Can I run Terraline on my own infrastructure?',
    answer:
      'Yes. You can self-host Terraline with Docker Compose, with application data on infrastructure you operate. AI features send prompts to the configured LLM endpoint; the default is OpenAI, so configure a provider you control if your data requirements call for it.',
  },
  {
    question: 'What is the product built with?',
    answer:
      'The stack includes a React application, a Rust API, Postgres, Redis Stream jobs and a live server for collaborative pages.',
  },
  {
    question: 'How can I see the product?',
    answer:
      'Request access and we will arrange a guided demo workspace so you can explore Terraline against your own service processes.',
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
            <span className="hidden font-mono text-[11px] text-[#4b5260] lg:inline-block">AGPL-3.0 · Self-hosted</span>
          </div>

          <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex lg:gap-8">
            <a href="#product" className="site-nav-link">Product</a>
            <a href="#platform" className="site-nav-link">Platform</a>
            <a href="#roadmap" className="site-nav-link">Roadmap</a>
            <a href="/learn" className="site-nav-link">Learn</a>
            <a href={product.footer.repoUrl} target="_blank" rel="noreferrer" className="site-nav-link">GitHub</a>
          </nav>

          <div className="flex shrink-0 items-center gap-2.5">
            <a href={product.footer.contact} className="button button-secondary hidden h-9 px-3.5 text-xs lg:inline-flex">
              Contact
            </a>
            <a href={product.cta.href} className="button button-primary h-9 px-3.5 text-xs">
              Request access
            </a>
          </div>
        </div>
        <nav
          aria-label="Mobile navigation"
          className="-mx-5 flex items-center gap-6 overflow-x-auto border-t border-[#dcd8ce] px-5 py-3 sm:-mx-8 sm:px-8 md:hidden"
        >
          <a href="#product" className="site-nav-link shrink-0">Product</a>
          <a href="#platform" className="site-nav-link shrink-0">Platform</a>
          <a href="#roadmap" className="site-nav-link shrink-0">Roadmap</a>
          <a href="/learn" className="site-nav-link shrink-0">Learn</a>
          <a href={product.footer.repoUrl} target="_blank" rel="noreferrer" className="site-nav-link shrink-0">GitHub</a>
        </nav>
      </div>
    </header>
  )
}

function HeroBlueprintVisual() {
  return (
    <aside
      aria-label="Terraline operational architecture schematic"
      className="rounded-[24px] border border-[#dcd8ce] bg-[#fbfaf7] p-4 shadow-[0_24px_60px_-24px_rgba(12,14,18,0.14)] sm:p-6"
    >
      {/* Top schematic bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#dcd8ce] pb-3.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-600" aria-hidden="true" />
          <span className="font-mono text-[11px] font-semibold text-[#0c0e12]">SYSTEM BLUEPRINT · ONE DATA MODEL</span>
        </div>
        <span className="rounded border border-[#d0cbc0] bg-[#efeae0] px-2 py-0.5 font-mono text-[10px] font-medium text-[#2d333f]">
          Self-hosted · Real-time
        </span>
      </div>

      {/* Connected 4-stage operational flow */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#dcd8ce] bg-[#f6f4ef] p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4b5260]">
              Stage 1 · Intake & Queue
            </span>
            <span className="shrink-0 whitespace-nowrap rounded bg-[#0c0e12] px-2 py-0.5 font-mono text-[10px] text-white">ITSM types</span>
          </div>
          <p className="mt-2.5 text-[14px] font-semibold text-[#0c0e12]">Requests, incidents & changes</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-[#3a404d]">
            Incoming noise enters a dedicated triage buffer before becoming typed work with a service link and a shared state set.
          </p>
        </div>

        <div className="rounded-2xl border border-[#dcd8ce] bg-[#f6f4ef] p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4b5260]">
              Stage 2 · Service Graph
            </span>
            <span className="shrink-0 whitespace-nowrap rounded border border-emerald-700/30 bg-emerald-950 px-2 py-0.5 font-mono text-[10px] text-emerald-200">
              Graph
            </span>
          </div>
          <p className="mt-2.5 text-[14px] font-semibold text-[#0c0e12]">Ownership & blast radius</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-[#3a404d]">
            Work items link to the services they affect, with criticality tiers and incident-derived health.
          </p>
        </div>

        <div className="rounded-2xl border border-[#1e2430] bg-[#0c0e12] p-4 text-white sm:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-slate-300">
              Signal Trace · Incident → Service → Runbook → Cycle
            </span>
            <span className="font-mono text-[10px] text-sky-300">Yjs + Redis Stream</span>
          </div>

          <div className="mt-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-[#141923] p-2.5">
              <span className="font-mono text-[9px] text-sky-300">WORK ITEM</span>
              <p className="mt-1 text-xs font-semibold text-white">Incident type</p>
              <p className="mt-0.5 font-mono text-[10px] text-slate-300">Backlog → In progress</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#141923] p-2.5">
              <span className="font-mono text-[9px] text-emerald-300">CATALOG</span>
              <p className="mt-1 text-xs font-semibold text-white">Dependency map</p>
              <p className="mt-0.5 font-mono text-[10px] text-slate-300">Tier-1 linked</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#141923] p-2.5">
              <span className="font-mono text-[9px] text-amber-300">GALILEO AI</span>
              <p className="mt-1 text-xs font-semibold text-white">Grounded SOPs</p>
              <p className="mt-0.5 font-mono text-[10px] text-slate-300">Human-confirmed</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#141923] p-2.5">
              <span className="font-mono text-[9px] text-slate-300">DELIVERY</span>
              <p className="mt-1 text-xs font-semibold text-white">Cycles & mobile</p>
              <p className="mt-0.5 font-mono text-[10px] text-slate-300">On-call ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom runtime bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-1 font-mono text-[11px] text-[#4b5260]">
        <span>Rust Axum · Postgres · Redis Stream</span>
        <a href="#product" className="font-semibold text-[#0c0e12] underline underline-offset-4 hover:text-[#3a404d]">
          Launch interactive workspace ↓
        </a>
      </div>
    </aside>
  )
}

function Hero() {
  return (
    <section id="top" className="border-b border-[#dcd8ce] bg-[#f6f4ef]">
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 px-5 py-12 sm:px-8 md:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-14 lg:py-20">
        <div className="max-w-[580px]">
          <h1 className="text-balance font-display text-[clamp(40px,4.6vw,58px)] font-semibold leading-[1.06] tracking-[-0.035em] text-[#0c0e12]">
            {product.hero.title}
          </h1>
          <p className="mt-5 max-w-[52ch] text-[16.5px] leading-[1.65] text-[#3a404d]">
            {product.hero.body}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href={product.hero.primaryCta.href} className="button button-primary h-11 px-5 text-sm">
              {product.hero.primaryCta.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#product"
              className="inline-flex h-11 items-center gap-2 rounded-lg px-2 text-sm font-semibold text-[#0c0e12] transition-colors hover:text-[#3a404d]"
            >
              See the product <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={product.footer.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-lg px-2 text-sm font-semibold text-[#0c0e12] transition-colors hover:text-[#3a404d]"
            >
              View source <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-10 border-y border-[#dcd8ce] py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#3a404d]">
              {product.hero.eyebrow}
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-4 border-t border-[#e5e1d8] pt-3 sm:grid-cols-3">
              <div>
                <dt className="text-[12px] text-[#4b5260]">License</dt>
                <dd className="mt-0.5 font-mono text-[13px] font-semibold text-[#0c0e12]">AGPL-3.0</dd>
              </div>
              <div className="border-l border-[#dcd8ce] pl-4">
                <dt className="text-[12px] text-[#4b5260]">Deployment</dt>
                <dd className="mt-0.5 font-mono text-[13px] font-semibold text-[#0c0e12]">Docker Compose</dd>
              </div>
              <div className="col-span-2 border-t border-[#e5e1d8] pt-2 sm:col-span-1 sm:border-l sm:border-t-0 sm:border-[#dcd8ce] sm:pl-4 sm:pt-0">
                <dt className="text-[12px] text-[#4b5260]">Knowledge base</dt>
                <dd className="mt-0.5 font-mono text-[13px] font-semibold text-[#0c0e12]">
                  <a href="/learn" className="underline decoration-[#9ca3af] underline-offset-4 hover:decoration-[#0c0e12]">
                    8 ITSM practices →
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <HeroBlueprintVisual />
      </div>
    </section>
  )
}

function FactStrip() {
  return (
    <section aria-label="Platform foundations" className="border-b border-[#dcd8ce] bg-[#efeae0]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-between gap-4 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:px-14">
        <p className="text-sm font-medium text-[#2d333f]">
          Open-source foundation, engineered for real service operations
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

const chapterMeta: Record<ShowcaseChapterId, { surface: string; badge: string }> = {
  work: { surface: 'Queue · Work item types · Intake', badge: 'TERRA-42' },
  services: { surface: 'Catalog · Dependency graph', badge: '3 SERVICES' },
  galileo: { surface: 'Pages · Grounded AI · Schedules', badge: 'GALILEO AI' },
  delivery: { surface: 'Cycles · Analytics · Mobile', badge: 'WEEK 2' },
}

function ProductHeader() {
  const { activeChapter, prevChapter, nextChapter } = useShowcaseContext()
  const activeIndex = capabilities.findIndex((item) => item.chapter === activeChapter)
  const current = capabilities[activeIndex] ?? capabilities[0]!

  return (
    <div id="product" className="scroll-mt-24 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <h2 className="max-w-[22ch] text-balance font-display text-[clamp(32px,3.6vw,46px)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0c0e12]">
          Bring your service work into one system.
        </h2>
        <p className="mt-2.5 max-w-[58ch] text-[15px] leading-[1.65] text-[#3a404d]">
          Switch chapters below or step through the slides—the live demo workspace stays front and center.
        </p>
      </div>

      {/* Chapter Slide Controls */}
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
      {/* Slide Deck Top Bar */}
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
                <span className="hidden sm:inline">{cap.title.split(' ')[0]}</span>
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

      {/* Single Active Chapter Slide (no vertical chapter scrolling) */}
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
                {/* Left Column: Active Chapter Overview */}
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

                {/* Right Column: Feature Specifications in Horizontal Grid */}
                <div
                  className={`grid divide-y divide-[#dcd8ce] border-t border-[#dcd8ce] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 ${
                    item.features.length > 1 ? 'sm:grid-cols-2 sm:divide-x sm:divide-y-0' : ' grid-cols-1'
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
            One platform. Your infrastructure.
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
            Shipped today. Bounded by design.
          </h2>
          <p className="max-w-[44ch] text-[15px] leading-[1.65] text-[#3a404d]">
            What is in the product now, and what we deliberately leave out of this release—without dates or promises.
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
                Not in v1
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
            You got questions? We got answers.
          </h2>
          <p className="mt-4 max-w-[38ch] text-[15px] leading-[1.65] text-[#3a404d]">
            Want to talk through your setup?{' '}
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
      <div className="flex flex-col gap-6 rounded-[24px] border border-[#1e2430] bg-[#0c0e12] p-8 text-white shadow-[0_28px_64px_-24px_rgba(12,14,18,0.45)] sm:p-10 md:flex-row md:items-center md:justify-between lg:p-12">
        <div>
          <h2 className="text-balance font-display text-[clamp(30px,3.4vw,42px)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
            {product.cta.title}
          </h2>
          <p className="mt-3 max-w-[54ch] text-[15px] leading-[1.65] text-slate-300">
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
            href={product.footer.contact}
            className="button h-11 border border-white/20 bg-white/[0.06] px-5 text-sm font-semibold text-white transition-colors hover:bg-white/12"
          >
            Contact us
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
    </section>
  )
}

export default function Tour() {
  return (
    <div className="tour min-h-screen text-[#0c0e12]">
      <SiteNav />
      <main>
        <Hero />
        <ProductShowcase header={<ProductHeader />}>
          <CapabilitySlideDeck />
        </ProductShowcase>
        <FactStrip />
        <PlatformSection />
        <RoadmapSection />
        <FaqSection />
        <CallToAction />
      </main>
      <Footer variant="landing" />
    </div>
  )
}
