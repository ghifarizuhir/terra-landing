import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Check,
  ChevronDown,
  FileText,
  Github,
  GitBranch,
  Inbox,
  Network,
  Radio,
} from 'lucide-react'
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
    title: 'Triage every reportable incident in one queue.',
    body: 'Incidents, requests and change tasks keep their own fields and vocabulary while sharing states, comments and history.',
    features: [feature('work-items'), feature('types'), feature('intake')],
  },
  {
    chapter: 'services',
    short: 'Services',
    eyebrow: 'Service context',
    title: 'Know the service and the blast radius.',
    body: 'Ownership, criticality and dependencies sit beside the incident, so impact is visible before a change or during a response.',
    features: [feature('services')],
  },
  {
    chapter: 'galileo',
    short: 'Evidence',
    eyebrow: 'Evidence & AI',
    title: 'Keep the timeline and the decisions.',
    body: 'Runbooks, postmortems and comments live next to the work. Galileo drafts from the item on screen; a person reviews every draft.',
    features: [feature('pages'), feature('ai'), feature('scheduler')],
  },
  {
    chapter: 'delivery',
    short: 'Reports',
    eyebrow: 'Reports & delivery',
    title: 'Turn the record into numbers.',
    body: 'Cycles, saved views and analytics cover the work that continues after the incident closes.',
    features: [feature('delivery'), feature('mobile')],
  },
]

const shippedCards = [
  {
    icon: Inbox,
    title: 'Intake that survives an alert storm.',
    body: 'Webhook sources, series deduplication and AI triage suggestions with human accept or decline.',
  },
  {
    icon: FileText,
    title: 'One incident record.',
    body: 'States, priority, owner, comments, activity, versions, attachments and relations on the same ticket.',
  },
  {
    icon: Radio,
    title: 'A war room with a timeline.',
    body: 'Realtime chat, runbook, participants and blast radius for major incidents.',
  },
  {
    icon: Network,
    title: 'Service context.',
    body: 'Ownership, criticality and dependencies beside the incident, so impact is visible before a change.',
  },
  {
    icon: GitBranch,
    title: 'Problem, change and knowledge.',
    body: 'Recurring incidents link to root-cause work, affected services and known errors.',
  },
  {
    icon: BarChart3,
    title: 'Reports and export.',
    body: 'Ticket trends, distribution and export for the people who ask for numbers.',
  },
]

const crosswalk = [
  { regulator: 'RMiT notification', record: 'Timeline → report draft' },
  { regulator: 'CSA 2024 detail', record: 'Classification → evidence pack' },
  { regulator: 'Audit trail', record: 'Activity → versions → log' },
  { regulator: 'Corrective action', record: 'Problem → change record' },
]

const questions = [
  {
    question: 'Is Terraline ITIL-certified?',
    answer:
      'No. ITIL is the operating model behind the incident, problem and change practices. We do not claim certification.',
  },
  {
    question: 'Which regulator pack comes first?',
    answer:
      'The first corridor is Malaysia: BNM RMiT and the Cyber Security Act 2024. It is in pilot with design partners. Saudi is the alternative corridor.',
  },
  {
    question: 'Does Terraline file the report for us?',
    answer:
      'Reportability rules and report drafts are in the pilot scope. Today the product keeps the incident record, timeline, decisions and service context the report is built from.',
  },
  {
    question: 'Do we have to replace our current service desk?',
    answer:
      'No. Start with the incident record. Integrations with existing tools are next on the roadmap.',
  },
  {
    question: 'Can we self-host?',
    answer:
      'Yes. AGPL-3.0, Docker Compose, Postgres and Redis. AI requests follow the LLM endpoint you configure.',
  },
  {
    question: 'Do you guarantee we pass an audit?',
    answer:
      'No. Terraline gives you a defensible record and evidence. The audit outcome depends on your controls, not a software claim.',
  },
  {
    question: 'What does the pilot cost?',
    answer:
      'Pilot pricing is scoped with each design partner. We agree success criteria before kickoff.',
  },
  {
    question: 'How long is the pilot?',
    answer:
      '4–6 weeks, with one reportable incident run end to end.',
  },
]

const incidentTimeline = [
  { time: '09:12', event: 'Incident opened from alert webhook' },
  { time: '09:18', event: 'War room opened' },
  { time: '09:24', event: 'Rollback approved' },
  { time: '09:41', event: 'Service restored' },
]

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#4b5260]">
      <span className="text-[#0c0e12]">{index}</span>
      <span aria-hidden="true" className="h-px w-6 bg-[#c8c3b8]" />
      {children}
    </p>
  )
}

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
            <a href="#product" className="site-nav-link">Record</a>
            <a href="#pilot" className="site-nav-link">Pilot</a>
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
          <a href="#product" className="site-nav-link shrink-0">Record</a>
          <a href="#pilot" className="site-nav-link shrink-0">Pilot</a>
          <a href="#platform" className="site-nav-link shrink-0">Platform</a>
          <a href="/learn" className="site-nav-link shrink-0">Learn</a>
        </nav>
      </div>
    </header>
  )
}

function IncidentFile() {
  return (
    <aside aria-label="Sample incident record" className="relative">
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
              Incident file · INC-2041
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/25 bg-red-500/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-red-300">
            <span className="rack-lamp h-1.5 w-1.5 rounded-full bg-red-400" aria-hidden="true" />
            In progress
          </span>
        </div>

        <div className="relative px-3 py-4 sm:px-4 sm:py-5">
          <span
            aria-hidden="true"
            className="absolute left-8 top-2 h-2.5 w-24 rounded-t-md border border-b-0 border-[#dcd8ce] bg-[#efeae0]"
          />
          <div className="relative rounded-[12px] border border-[#dcd8ce] bg-[#fbfaf7] p-4 text-[#0c0e12] shadow-[0_12px_28px_-18px_rgba(0,0,0,0.45)] sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#4b5260]">Payment gateway outage</p>
                <p className="mt-2 font-display text-[24px] font-semibold leading-none tracking-[-0.03em] sm:text-[27px]">
                  INC-2041
                </p>
              </div>
              <span className="shrink-0 rotate-[-5deg] rounded border-2 border-red-700/50 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-red-800/80">
                Reportable?
              </span>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 border-y border-[#dcd8ce] py-3 font-mono text-[10px] sm:grid-cols-3">
              <div>
                <dt className="text-[#4b5260]">Service</dt>
                <dd className="mt-0.5 font-semibold">Payment Gateway</dd>
              </div>
              <div>
                <dt className="text-[#4b5260]">Criticality</dt>
                <dd className="mt-0.5 font-semibold">Critical</dd>
              </div>
              <div>
                <dt className="text-[#4b5260]">Owner</dt>
                <dd className="mt-0.5 font-semibold">Payments</dd>
              </div>
              <div>
                <dt className="text-[#4b5260]">Started</dt>
                <dd className="mt-0.5 font-semibold">09:12</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[#4b5260]">Impact</dt>
                <dd className="mt-0.5 font-semibold">12,400 failed transactions</dd>
              </div>
            </dl>

            <div className="mt-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#4b5260]">Timeline</p>
                <p className="font-mono text-[9px] text-[#4b5260]">18 events · 4 decisions</p>
              </div>
              <ol className="relative mt-3 space-y-2.5 pl-4">
                <span aria-hidden="true" className="absolute bottom-1.5 left-[3px] top-1.5 w-px bg-[#dcd8ce]" />
                {incidentTimeline.map((item, index) => (
                  <li key={item.time} className="relative flex items-baseline gap-2.5 text-[11px] leading-snug">
                    <span
                      aria-hidden="true"
                      className="absolute -left-4 top-1 h-1.5 w-1.5 rounded-full"
                      style={{
                        backgroundColor: index === incidentTimeline.length - 1 ? '#10b981' : '#0c0e12',
                      }}
                    />
                    <span className="font-mono text-[10px] text-[#4b5260]">{item.time}</span>
                    <span className="text-[#1f242d]">{item.event}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-4 rounded-lg border border-amber-700/20 bg-[#f5ecd2] px-3 py-2.5">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-amber-900">In pilot</p>
                <p className="font-mono text-[9px] text-amber-900/70">Regulator fields</p>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {['Reportable?', '2h window', 'Evidence pack'].map((item) => (
                  <span
                    key={item}
                    className="rounded border border-amber-800/20 bg-[#fbfaf7] px-2 py-0.5 font-mono text-[9px] text-amber-950"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-[#10131a] px-4 py-2.5 font-mono text-[9px] text-slate-400 sm:px-5">
          <span>One record · timeline · service context</span>
          <span>Sample data · Product illustration</span>
        </div>
      </div>
    </aside>
  )
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-[#dcd8ce] bg-[#f6f4ef]">
      <div aria-hidden="true" className="paper-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-12 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-14 lg:py-24">
        <div className="max-w-[620px]">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#4b5260]">
            {product.hero.eyebrow}
          </p>
          <h1 className="mt-5 text-balance font-display text-[clamp(42px,5.2vw,68px)] font-semibold leading-[0.98] tracking-[-0.04em] text-[#0c0e12]">
            {product.hero.title}
          </h1>
          <p className="mt-6 max-w-[56ch] text-[16.5px] leading-[1.65] text-[#3a404d]">
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
            {product.hero.boundary}
          </p>
        </div>

        <IncidentFile />
      </div>
    </section>
  )
}

function FactStrip() {
  return (
    <section aria-label="Pilot and platform facts" className="border-b border-[#dcd8ce] bg-[#efeae0]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-between gap-4 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:px-14">
        <p className="text-sm font-medium text-[#2d333f]">
          The incident record ships. The regulator pack is in pilot.
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

function ProblemSection() {
  return (
    <section aria-label="The reporting problem" className="border-b border-[#dcd8ce] bg-[#f6f4ef]">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-14">
        <SectionLabel index="01">The report clock</SectionLabel>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <h2 className="max-w-[18ch] text-balance font-display text-[clamp(34px,3.8vw,48px)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#0c0e12]">
            {product.problem.title}
          </h2>
          <p className="max-w-[62ch] text-[15px] leading-[1.65] text-[#3a404d] lg:justify-self-end">
            {product.problem.body}
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[18px] border border-[#dcd8ce] bg-[#dcd8ce] md:grid-cols-3">
          {product.problem.cards.map((card, index) => (
            <article key={card.id} className="group bg-[#fbfaf7] p-6 transition-colors hover:bg-[#efeae0]/55 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] text-[#4b5260]">0{index + 1}</span>
                <span className="h-2 w-2 rounded-full bg-[#0c0e12] transition-transform group-hover:scale-125" aria-hidden="true" />
              </div>
              <h3 className="mt-8 font-display text-[21px] font-semibold leading-tight tracking-[-0.02em] text-[#0c0e12]">
                {card.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-[1.65] text-[#3a404d]">{card.body}</p>
            </article>
          ))}
        </div>

        <p className="mt-4 font-mono text-[10px] leading-relaxed text-[#4b5260]">{product.problem.note}</p>
      </div>
    </section>
  )
}

function ShippedSection() {
  return (
    <section aria-label="What ships today" className="border-b border-[#dcd8ce] bg-[#efeae0]/45">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-14">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <SectionLabel index="02">Shipped today</SectionLabel>
            <h2 className="mt-6 max-w-[16ch] text-balance font-display text-[clamp(34px,3.8vw,48px)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#0c0e12]">
              The incident record is already here.
            </h2>
          </div>
          <p className="max-w-[58ch] text-[15px] leading-[1.65] text-[#3a404d] lg:justify-self-end">
            Before the regulator pack, Terraline runs the operational record the report depends on.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shippedCards.map((card) => {
            const Icon = card.icon
            return (
              <article
                key={card.title}
                className="group rounded-[16px] border border-[#dcd8ce] bg-[#fbfaf7] p-5 transition-colors hover:border-[#b8b2a6] hover:bg-[#f6f4ef]"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#0c0e12] text-white">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-[15px] font-semibold leading-snug text-[#0c0e12]">{card.title}</h3>
                <p className="mt-1.5 text-[13px] leading-[1.6] text-[#3a404d]">{card.body}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const chapterMeta: Record<ShowcaseChapterId, { surface: string; badge: string }> = {
  work: { surface: 'Intake · Queue · Types', badge: 'INC-2041' },
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
        <SectionLabel index="03">Product proof</SectionLabel>
        <h2 className="mt-6 max-w-[22ch] text-balance font-display text-[clamp(32px,3.6vw,46px)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0c0e12]">
          See the record at work.
        </h2>
        <p className="mt-2.5 max-w-[58ch] text-[15px] leading-[1.65] text-[#3a404d]">
          The demo workspace runs the real flows: intake, triage, service context, knowledge and reports. Step through the chapters or use the slides.
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

function PilotSection() {
  return (
    <section id="pilot" className="scroll-mt-[112px] border-b border-[#dcd8ce] bg-[#f6f4ef] md:scroll-mt-16">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <SectionLabel index="04">Design partner pilot</SectionLabel>
            <h2 className="mt-6 max-w-[18ch] text-balance font-display text-[clamp(34px,3.8vw,48px)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#0c0e12]">
              {product.pilot.title}
            </h2>
            <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.65] text-[#3a404d]">
              {product.pilot.body}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {product.pilot.scope.map((item, index) => (
                <article
                  key={item.title}
                  className={`rounded-[14px] border border-[#dcd8ce] bg-[#fbfaf7] p-4 ${
                    index === product.pilot.scope.length - 1 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[14px] font-semibold leading-snug text-[#0c0e12]">{item.title}</h3>
                    <span className="shrink-0 rounded-full border border-amber-700/25 bg-[#f5ecd2] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-amber-900">
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-[1.55] text-[#3a404d]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[22px] border border-[#1e2430] bg-[#0c0e12] text-white shadow-[0_30px_70px_-28px_rgba(12,14,18,0.55)]">
            <div className="hazard-tape h-1.5 w-full" aria-hidden="true" />
            <div className="p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-amber-300">Pilot shape</p>
              <h3 className="mt-3 max-w-[18ch] font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.025em] text-white sm:text-[30px]">
                One incident. One deadline. One record.
              </h3>
              <ol className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {product.pilot.shape.map((item, index) => (
                  <li key={item} className="flex items-center gap-4 py-3">
                    <span className="font-mono text-[10px] text-slate-400">0{index + 1}</span>
                    <span className="text-[13.5px] text-slate-200">{item}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400">Example crosswalk</p>
                  <p className="font-mono text-[9px] text-slate-400">Pilot scope</p>
                </div>
                <ul className="mt-3 space-y-2">
                  {crosswalk.map((row) => (
                    <li key={row.regulator} className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-2 text-[11.5px] last:border-b-0">
                      <span className="text-slate-300">{row.regulator}</span>
                      <span className="text-right font-mono text-[10px] text-amber-300">{row.record}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={product.pilot.cta.href}
                className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-white px-5 text-sm font-semibold text-[#0c0e12] transition-colors hover:bg-[#efeae0]"
              >
                {product.pilot.cta.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="mt-3 text-center font-mono text-[9px] text-slate-400">
                First corridor: Malaysia · 3–5 design partners
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function CoexistenceSection() {
  return (
    <section aria-label="Coexistence" className="border-b border-[#dcd8ce] bg-[#efeae0]/45">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <SectionLabel index="05">Coexistence</SectionLabel>
            <h2 className="mt-6 max-w-[16ch] text-balance font-display text-[clamp(34px,3.8vw,48px)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#0c0e12]">
              {product.coexistence.title}
            </h2>
          </div>
          <p className="max-w-[58ch] text-[15px] leading-[1.65] text-[#3a404d] lg:justify-self-end">
            {product.coexistence.body}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {product.coexistence.cards.map((card, index) => (
            <article
              key={card.title}
              className={
                index === 0
                  ? 'rounded-[18px] border border-[#dcd8ce] bg-[#fbfaf7] p-6 sm:p-8'
                  : 'rounded-[18px] border border-[#1e2430] bg-[#0c0e12] p-6 text-white sm:p-8'
              }
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="max-w-[20ch] font-display text-[22px] font-semibold leading-tight tracking-[-0.02em]">
                  {card.title}
                </h3>
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border ${
                    index === 0 ? 'border-[#d0cbc0] text-[#0c0e12]' : 'border-white/20 text-white'
                  }`}
                >
                  {index === 0 ? (
                    <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                </span>
              </div>
              <p className={`mt-4 max-w-[48ch] text-[13.5px] leading-[1.65] ${index === 0 ? 'text-[#3a404d]' : 'text-slate-300'}`}>
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function PlatformSection() {
  return (
    <section id="platform" className="scroll-mt-[112px] border-b border-[#dcd8ce] bg-[#f6f4ef] md:scroll-mt-16">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <SectionLabel index="06">Platform</SectionLabel>
            <h2 className="mt-6 max-w-[16ch] text-balance font-display text-[clamp(34px,3.8vw,48px)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0c0e12]">
              Keep the records in your own infrastructure.
            </h2>
          </div>
          <p className="max-w-[60ch] text-[15px] leading-[1.65] text-[#3a404d] lg:justify-self-end">
            {product.architecture.body} AI requests follow the configured LLM endpoint; the endpoint can be configured for your deployment.
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

function BoundarySection() {
  const columns = [
    {
      title: 'Shipped today',
      badge: 'Available',
      tone: 'emerald',
      items: product.roadmap.shipped,
    },
    {
      title: 'In pilot',
      badge: 'Design partners',
      tone: 'amber',
      items: product.roadmap.pilot,
    },
    {
      title: 'Out of scope',
      badge: 'Deliberate',
      tone: 'slate',
      items: product.roadmap.outOfScope,
    },
  ] as const

  const toneClasses = {
    emerald: {
      badge: 'border-emerald-700/25 bg-emerald-950 text-emerald-200',
      dot: 'bg-emerald-400',
      icon: 'text-[#0c0e12]',
    },
    amber: {
      badge: 'border-amber-700/25 bg-[#f5ecd2] text-amber-900',
      dot: 'bg-amber-500',
      icon: 'text-amber-700',
    },
    slate: {
      badge: 'border-[#c8c3b8] bg-[#f6f4ef] text-[#4b5260]',
      dot: 'bg-slate-400',
      icon: 'text-[#4b5260]',
    },
  }

  return (
    <section id="boundary" className="scroll-mt-[112px] border-b border-[#dcd8ce] bg-[#efeae0]/45 md:scroll-mt-16">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <SectionLabel index="07">Boundary</SectionLabel>
            <h2 className="mt-6 max-w-[16ch] text-balance font-display text-[clamp(34px,3.8vw,48px)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0c0e12]">
              What ships. What is in pilot. What we leave out.
            </h2>
          </div>
          <p className="max-w-[52ch] text-[15px] leading-[1.65] text-[#3a404d] lg:justify-self-end">
            {product.roadmap.note}
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[18px] border border-[#dcd8ce] bg-[#dcd8ce] lg:grid-cols-3">
          {columns.map((column) => {
            const tone = toneClasses[column.tone]
            return (
              <article key={column.title} className="bg-[#fbfaf7] p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3 border-b border-[#dcd8ce] pb-4">
                  <h3 className="font-display text-[22px] font-semibold tracking-[-0.02em] text-[#0c0e12]">
                    {column.title}
                  </h3>
                  <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.1em] ${tone.badge}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} aria-hidden="true" />
                    {column.badge}
                  </span>
                </div>
                <ul className="mt-5 space-y-3">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[13px] leading-[1.55] text-[#2d333f]">
                      {column.tone === 'slate' ? (
                        <ArrowRight className={`mt-0.5 h-4 w-4 shrink-0 ${tone.icon}`} aria-hidden="true" />
                      ) : (
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${tone.icon}`} aria-hidden="true" />
                      )}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section id="faq" className="border-b border-[#dcd8ce] bg-[#f6f4ef]">
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.82fr_1.18fr] md:gap-14 md:py-28 lg:px-14">
        <div>
          <SectionLabel index="08">Questions</SectionLabel>
          <h2 className="mt-6 max-w-[14ch] text-balance font-display text-[clamp(34px,3.8vw,46px)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0c0e12]">
            Before you deploy.
          </h2>
          <p className="mt-4 max-w-[38ch] text-[15px] leading-[1.65] text-[#3a404d]">
            The short answers on the regulator pack, pilot scope and self-hosting. Need the longer version?{' '}
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
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-amber-300">Design partner pilot</p>
            <h2 className="mt-4 text-balance font-display text-[clamp(30px,3.4vw,42px)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
              {product.cta.title}
            </h2>
            <p className="mt-3 max-w-[56ch] text-[15px] leading-[1.65] text-slate-300">
              {product.cta.body}
            </p>
            <p className="mt-4 font-mono text-[10px] text-slate-400">{product.cta.note}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={product.cta.href}
              className="button h-11 bg-white px-5 text-sm font-semibold text-[#0c0e12] transition-colors hover:bg-[#efeae0]"
            >
              {product.cta.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={product.cta.secondary.href}
              className="button h-11 border border-white/20 bg-white/[0.06] px-5 text-sm font-semibold text-white transition-colors hover:bg-white/12"
            >
              {product.cta.secondary.label}
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
        <ProblemSection />
        <ShippedSection />
        <ProductShowcase header={<ProductHeader />}>
          <CapabilitySlideDeck />
        </ProductShowcase>
        <PilotSection />
        <CoexistenceSection />
        <PlatformSection />
        <BoundarySection />
        <FaqSection />
        <CallToAction />
      </main>
      <Footer variant="landing" />
    </div>
  )
}
