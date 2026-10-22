import { ArrowRight, ArrowUpRight, Check, ChevronDown } from 'lucide-react'
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
    body: 'Bring requests, incidents and change tasks into one queue, then give each kind of work the states and rules it needs.',
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
      'Terraline is open-source IT service management built on Plane. It brings work items, a service catalog, typed workflows and AI-assisted operations into one system.',
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
      'Request access and we will arrange a guided demo workspace so you can explore Terraline against your own service workflows.',
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
            <span aria-hidden="true" className="hidden h-3.5 w-px bg-[#c8c3b8] sm:inline-block" />
            <span className="hidden font-mono text-[11px] text-[#4b5260] sm:inline-block">AGPL-3.0 · Self-hosted</span>
          </div>

          <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
            <a href="#product" className="site-nav-link">Product</a>
            <a href="#platform" className="site-nav-link">Platform</a>
            <a href="#roadmap" className="site-nav-link">Roadmap</a>
            <a href="/learn" className="site-nav-link">Learn</a>
          </nav>

          <div className="flex shrink-0 items-center gap-2.5">
            <a href={product.footer.contact} className="button button-secondary hidden h-9 px-3.5 text-xs sm:inline-flex">
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
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" data-showcase-chapter="work" className="pb-10 pt-2 md:pb-14 md:pt-4">
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
  work: { surface: 'Queue · Typed states · Intake', badge: 'TERRA-42' },
  services: { surface: 'Catalog · Dependency graph', badge: '3 SERVICES' },
  galileo: { surface: 'Pages · Grounded AI · Schedules', badge: 'GALILEO AI' },
  delivery: { surface: 'Cycles · Analytics · Mobile', badge: 'WEEK 2' },
}

function CapabilitySection({ item }: { item: Capability }) {
  const { activeChapter, selectChapter } = useShowcaseContext()
  const isActive = activeChapter === item.chapter
  const meta = chapterMeta[item.chapter]
  const id = item.chapter === 'work' ? undefined : `showcase-${item.chapter}`

  return (
    <article
      id={id}
      data-showcase-chapter={item.chapter}
      onClick={() => selectChapter(item.chapter)}
      className={`group relative cursor-pointer border-t border-[#dcd8ce] px-5 py-8 transition-colors duration-200 sm:px-7 sm:py-10 ${
        isActive
          ? 'bg-[#fbfaf7] shadow-[0_18px_40px_-24px_rgba(12,14,18,0.12)]'
          : 'bg-transparent hover:bg-[#fbfaf7]/60'
      }`}
    >
      {/* Chapter headline & interactive status bar */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-[46ch]">
          <h3 className="text-balance font-display text-[26px] font-semibold leading-[1.16] tracking-[-0.025em] text-[#0c0e12] sm:text-[31px]">
            {item.title}
          </h3>
          <p className="mt-3 text-[15px] leading-[1.65] text-[#3a404d]">
            {item.body}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded border border-[#d0cbc0] bg-[#efeae0] px-2.5 py-1 font-mono text-[10px] font-medium text-[#2d333f]">
            {meta.badge}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] ${
              isActive
                ? 'border border-emerald-700/25 bg-emerald-950/90 text-emerald-200'
                : 'border border-[#d0cbc0] bg-[#fbfaf7] text-[#4b5260]'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-[#8c867a]'}`} />
            {isActive ? 'Live in window' : 'Inspect'}
          </span>
        </div>
      </div>

      {/* Chapter metadata rail below heading */}
      <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[11px] text-[#4b5260]">
        <span className="font-semibold text-[#0c0e12]">{item.eyebrow}</span>
        <span aria-hidden="true">·</span>
        <span>{meta.surface}</span>
      </div>

      {/* Feature specification rows (no nested cards) */}
      <div className="mt-7 divide-y divide-[#dcd8ce] border-y border-[#dcd8ce]">
        {item.features.map((current) => (
          <div key={current.id} className="py-5 first:pt-4 last:pb-4">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
              <h4 className="text-[15px] font-semibold leading-snug text-[#0c0e12]">
                {current.title}
              </h4>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-[#4b5260]">
                {current.eyebrow}
              </span>
            </div>
            <p className="mt-1.5 max-w-[60ch] text-[13.5px] leading-[1.6] text-[#3a404d]">
              {current.body}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {current.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#dcd8ce] bg-[#f6f4ef] px-2.5 py-1 text-[11.5px] text-[#2d333f]"
                >
                  <span className="h-1 w-1 rounded-full bg-[#0c0e12]" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  )
}

function ProductSection() {
  return (
    <section id="product" className="scroll-mt-[112px] pt-4 md:scroll-mt-20">
      {/* Editorial Section Header */}
      <div className="rounded-t-[20px] border border-[#1e2430] bg-[#0c0e12] p-6 text-white sm:p-8">
        <h2 className="max-w-[20ch] text-balance font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.028em] text-white sm:text-[36px]">
          Bring your service work into one system.
        </h2>
        <p className="mt-3 max-w-[54ch] text-[14.5px] leading-[1.65] text-slate-300">
          From intake and triage to service health and delivery, keep the operational picture connected in one place.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-4 font-mono text-[11px] text-slate-300">
          <span>4 connected operational surfaces</span>
          <span aria-hidden="true">·</span>
          <span>Scroll or click any chapter to inspect live</span>
        </div>
      </div>

      {/* Capabilities ledger stack */}
      <div className="overflow-hidden rounded-b-[20px] border-x border-b border-[#dcd8ce] bg-[#f6f4ef]/80">
        {capabilities.map((item) => (
          <CapabilitySection key={item.chapter} item={item} />
        ))}
      </div>
    </section>
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
            Shipped today. Building next.
          </h2>
          <p className="max-w-[44ch] text-[15px] leading-[1.65] text-[#3a404d]">
            What is in the product now and where the platform is heading—without dates or promises.
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
                Next in line
              </h3>
              <span className="rounded-full border border-[#c8c3b8] bg-[#fbfaf7] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#3a404d]">
                In active design
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
        <ProductShowcase hero={<Hero />}>
          <ProductSection />
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
