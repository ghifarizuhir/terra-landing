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
    <header className="site-nav sticky top-0 z-50 border-b border-neutral-100 bg-white">
      <div className="mx-auto w-full px-5 sm:px-8 lg:px-16">
        <div className="flex h-16 items-center justify-between gap-5">
          <a href="#top" aria-label="Terraline home" className="flex shrink-0 items-center gap-2.5 text-black">
            <Mark className="h-[17px] w-auto text-black" />
            <span className="font-display text-[18px] font-medium tracking-[-0.025em]">Terraline</span>
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
            <a href="#product" className="site-nav-link">Product</a>
            <a href="#platform" className="site-nav-link">Platform</a>
            <a href="#roadmap" className="site-nav-link">Roadmap</a>
            <a href="/learn" className="site-nav-link">Learn</a>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a href={product.footer.contact} className="button button-secondary hidden h-8 px-[10px] text-xs sm:inline-flex">
              Contact
            </a>
            <a href={product.cta.href} className="button button-primary h-8 px-[10px] text-xs">
              Request access
            </a>
          </div>
        </div>
        <nav aria-label="Mobile navigation" className="-mx-5 flex items-center gap-6 overflow-x-auto border-t border-neutral-100 px-5 py-3 sm:-mx-8 sm:px-8 md:hidden">
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
    <section id="top" data-showcase-chapter="work" className="pb-14 pt-6 md:pb-20 md:pt-12">
      <div className="max-w-[540px]">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-600">{product.hero.eyebrow}</p>
        </div>
        <h1 className="mt-6 font-display text-[clamp(38px,4.2vw,52px)] font-medium leading-[1.12] tracking-[-0.025em] text-black">
          {product.hero.title}
        </h1>
        <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.6] text-neutral-600">{product.hero.body}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a href={product.hero.primaryCta.href} className="button button-primary h-10 px-4 text-sm shadow-sm">
            {product.hero.primaryCta.label}
          </a>
          <a href="#product" className="inline-flex h-10 items-center gap-1.5 px-1 text-sm font-medium text-black transition-colors hover:text-neutral-600">
            See the product <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-10 grid max-w-[360px] grid-cols-2 gap-4 rounded-[14px] border border-neutral-200/90 bg-neutral-50/70 p-4">
          <div>
            <p className="font-mono text-[20px] font-medium leading-none tracking-tight text-black">AGPL-3.0</p>
            <p className="mt-1.5 text-[12px] text-neutral-500">Open-source license</p>
          </div>
          <div className="border-l border-neutral-200 pl-4">
            <p className="font-mono text-[20px] font-medium leading-none tracking-tight text-black">Docker</p>
            <p className="mt-1.5 text-[12px] text-neutral-500">Self-host your stack</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function FactStrip() {
  return (
    <section aria-label="Platform foundations" className="border-b border-neutral-200 bg-white">
      <div className="mx-auto w-full px-5 py-8 sm:px-8 lg:px-16">
        <p className="text-center text-sm text-neutral-600">Open-source foundation, built for real service operations</p>
        <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 text-center sm:grid-cols-3 lg:grid-cols-5">
          {product.facts.map((fact) => (
            <li key={fact} className="font-mono text-[10px] uppercase tracking-[0.04em] text-neutral-700 sm:text-[11px]">
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const chapterMeta: Record<ShowcaseChapterId, { code: string; surface: string; badge: string }> = {
  work: { code: 'MOD-01', surface: 'Queue · Typed states · Intake', badge: 'TERRA-42' },
  services: { code: 'MOD-02', surface: 'Catalog · Dependency graph', badge: '3 SERVICES' },
  galileo: { code: 'MOD-03', surface: 'Pages · Grounded AI · Schedules', badge: 'GALILEO AI' },
  delivery: { code: 'MOD-04', surface: 'Cycles · Analytics · Mobile', badge: 'WEEK 2' },
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
      className={`group relative cursor-pointer rounded-[20px] border p-6 transition-all duration-300 sm:p-8 ${
        isActive
          ? 'border-neutral-900 bg-white shadow-[0_20px_50px_-24px_rgba(0,0,0,0.16)] ring-1 ring-neutral-900/5'
          : 'border-neutral-200/90 bg-neutral-50/60 hover:border-neutral-300 hover:bg-white'
      }`}
    >
      {/* Top index bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200/80 pb-4">
        <div className="flex items-center gap-2.5">
          <span
            className={`inline-flex h-6 items-center rounded-md px-2 font-mono text-[11px] font-medium tracking-[0.08em] transition-colors ${
              isActive ? 'bg-neutral-950 text-white' : 'bg-neutral-200/80 text-neutral-700'
            }`}
          >
            {item.number} / {item.eyebrow}
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400 sm:inline">
            {meta.surface}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded border border-neutral-200 bg-neutral-50 px-2 py-0.5 font-mono text-[10px] text-neutral-600">
            {meta.badge}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] ${
              isActive ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'text-neutral-400'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-neutral-300'}`} />
            {isActive ? 'Live in window' : 'Inspect'}
          </span>
        </div>
      </div>

      {/* Chapter headline & lead */}
      <div className="mt-6">
        <h3 className="max-w-[20ch] font-display text-[26px] font-medium leading-[1.2] tracking-[-0.02em] text-black sm:text-[32px]">
          {item.title}
        </h3>
        <p className="mt-3 max-w-[54ch] text-[15px] leading-[1.6] text-neutral-600">
          {item.body}
        </p>
      </div>

      {/* Feature specification cards */}
      <div className={`mt-7 grid gap-3 ${item.features.length > 1 ? 'sm:grid-cols-2' : 'sm:grid-cols-1'}`}>
        {item.features.map((current, idx) => {
          const spanFull = item.features.length === 3 && idx === 0
          return (
            <div
              key={current.id}
              className={`rounded-[14px] border p-4 transition-colors ${
                spanFull ? 'sm:col-span-2' : ''
              } ${
                isActive
                  ? 'border-neutral-200 bg-neutral-50/70'
                  : 'border-neutral-200/70 bg-white/80'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400">
                  {item.number}.{idx + 1} · {current.eyebrow}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
              </div>
              <h4 className="mt-2 text-[14px] font-semibold leading-snug text-neutral-950">
                {current.title}
              </h4>
              <p className="mt-1.5 text-[13px] leading-[1.55] text-neutral-600">
                {current.body}
              </p>
            </div>
          )
        })}
      </div>
    </article>
  )
}

function ProductSection() {
  const { activeChapter, selectChapter } = useShowcaseContext()

  return (
    <section id="product" className="scroll-mt-[112px] pt-8 md:scroll-mt-20 md:pt-12">
      {/* Editorial Section Header */}
      <div className="rounded-[20px] border border-neutral-200 bg-neutral-950 p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400">The product</p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400">
            04 connected surfaces · Scroll or select
          </span>
        </div>

        <h2 className="mt-5 max-w-[18ch] font-display text-[30px] font-medium leading-[1.15] tracking-[-0.02em] text-white sm:text-[36px]">
          Bring your service work into one system.
        </h2>
        <p className="mt-3 max-w-[52ch] text-[14px] leading-[1.65] text-neutral-300">
          From intake and triage to service health and delivery, keep the operational picture connected in one place.
        </p>

        {/* Quick chapter rail */}
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {capabilities.map((cap) => {
            const active = activeChapter === cap.chapter
            return (
              <button
                key={cap.number}
                type="button"
                onClick={() => selectChapter(cap.chapter)}
                className={`flex flex-col items-start rounded-[10px] border px-3 py-2 text-left transition-colors ${
                  active
                    ? 'border-white/30 bg-white text-neutral-950'
                    : 'border-neutral-800 bg-neutral-900/90 text-neutral-300 hover:border-neutral-700 hover:text-white'
                }`}
              >
                <span className={`font-mono text-[10px] ${active ? 'text-neutral-500' : 'text-neutral-500'}`}>
                  {cap.number}
                </span>
                <span className="mt-0.5 truncate text-[12px] font-medium">{cap.eyebrow}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Capabilities stack */}
      <div className="mt-6 space-y-6">
        {capabilities.map((item) => <CapabilitySection key={item.number} item={item} />)}
      </div>
    </section>
  )
}

function PlatformSection() {
  return (
    <section id="platform" className="scroll-mt-[112px] bg-white md:scroll-mt-16">
      <div className="mx-auto w-full px-5 py-20 sm:px-8 md:py-[104px] lg:px-16">
        <div className="mx-auto max-w-[560px] text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">Open by design</p>
          <h2 className="mt-4 font-display text-[36px] font-medium leading-[44px] tracking-[-0.55px] text-black">
            One platform. Your infrastructure.
          </h2>
          <p className="mx-auto mt-4 max-w-[55ch] text-sm leading-[1.65] text-neutral-500">
            {product.architecture.body} AI requests follow the configured LLM endpoint; the default is OpenAI, and the endpoint can be configured for your deployment.
          </p>
        </div>

        <div className="mt-10 grid gap-3 md:mt-14 md:grid-cols-2">
          {product.comparisons.map((comparison, index) => (
            <article
              key={comparison.title}
              className={index === 0
                ? 'flex min-h-[300px] flex-col justify-end rounded-[20px] bg-neutral-100 p-6 sm:p-8'
                : 'flex min-h-[300px] flex-col justify-end rounded-[20px] bg-neutral-950 p-6 text-white sm:p-8'}
            >
              <p className={`font-mono text-[10px] uppercase tracking-[0.14em] ${index === 0 ? 'text-neutral-500' : 'text-neutral-400'}`}>
                {index === 0 ? 'The foundation' : 'The alternative'}
              </p>
              <h3 className="mt-3 font-display text-[26px] font-medium leading-tight tracking-[-0.35px]">{comparison.title}</h3>
              <p className={`mt-2 max-w-[54ch] text-[13px] leading-[1.6] ${index === 0 ? 'text-neutral-600' : 'text-neutral-300'}`}>
                {comparison.body}
              </p>
              <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {comparison.points.map((point) => (
                  <li key={point} className={`flex gap-2 text-[12px] leading-[1.5] ${index === 0 ? 'text-neutral-700' : 'text-neutral-200'}`}>
                    <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${index === 0 ? 'text-black' : 'text-white'}`} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-3 rounded-[12px] border border-neutral-200 px-5 py-5 sm:px-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">Under the hood</p>
              <p className="mt-1 text-sm text-neutral-700">A production-minded stack, ready to self-host.</p>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {product.architecture.facts.map((fact) => (
                <li key={fact} className="font-mono text-[10px] text-neutral-600">{fact}</li>
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
    <section id="roadmap" className="scroll-mt-[112px] bg-white md:scroll-mt-16">
      <div className="mx-auto w-full px-5 py-20 sm:px-8 md:py-[100px] lg:px-16">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">Product direction</p>
            <h2 className="mt-4 font-display text-[36px] font-medium leading-[44px] tracking-[-0.55px] text-black">
              Shipped today. Building next.
            </h2>
          </div>
          <p className="max-w-[40ch] text-sm leading-[1.65] text-neutral-500">
            What is in the product now and where the platform is heading—without dates or promises.
          </p>
        </div>
        <div className="mt-9 grid gap-3 md:grid-cols-2">
          <article className="rounded-[12px] bg-neutral-100 p-6 sm:p-7">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-black" />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-700">Shipped today</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {product.roadmap.shipped.map((item) => (
                <li key={item} className="flex gap-2.5 text-[13px] leading-[1.55] text-neutral-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-black" /> <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-[12px] border border-neutral-200 bg-white p-6 sm:p-7">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-neutral-400" />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-600">Next in line</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {product.roadmap.next.map((item) => (
                <li key={item} className="flex gap-2.5 text-[13px] leading-[1.55] text-neutral-700">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" /> <span>{item}</span>
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
    <section id="faq" className="border-t border-neutral-200 bg-white">
      <div className="mx-auto grid w-full gap-8 px-5 py-20 sm:px-8 md:grid-cols-[0.78fr_1fr] md:gap-12 md:py-[96px] lg:px-16">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">FAQ</p>
          <h2 className="mt-4 max-w-[12ch] font-display text-[36px] font-medium leading-[44px] tracking-[-0.55px] text-black">
            You got questions? We got answers.
          </h2>
          <p className="mt-4 max-w-[38ch] text-sm leading-[1.65] text-neutral-500">
            Want to talk through your setup? <a className="text-black underline underline-offset-4" href={product.footer.contact}>Contact us.</a>
          </p>
        </div>
        <div className="divide-y divide-neutral-200 border-y border-r border-neutral-200">
          {questions.map((item, index) => (
            <details key={item.question} className="faq-item group" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-4 py-5 text-left text-[15px] font-medium text-black marker:hidden sm:px-5">
                {item.question}
                <ChevronDown className="faq-chevron h-4 w-4 shrink-0 text-neutral-700" />
              </summary>
              <p className="max-w-[68ch] px-4 pb-5 pr-8 text-[13px] leading-[1.65] text-neutral-600 sm:px-5">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function CallToAction() {
  return (
    <section className="bg-neutral-50">
      <div className="mx-auto flex w-full flex-col gap-5 px-5 py-9 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-16">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">See Terraline in context</p>
          <h2 className="mt-2 font-display text-[30px] font-medium leading-tight tracking-[-0.4px] text-black sm:text-[36px]">
            {product.cta.title}
          </h2>
          <p className="mt-2 max-w-[52ch] text-[13px] leading-[1.6] text-neutral-500">{product.cta.body}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <a href={product.cta.href} className="button button-primary h-9 px-[14px] text-sm">
            {product.cta.label} <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href={product.footer.contact} className="button button-secondary h-9 px-[14px] text-sm">Contact us</a>
        </div>
      </div>
    </section>
  )
}

export default function Tour() {
  return (
    <div className="tour min-h-screen bg-white text-black">
      <SiteNav />
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
      <Footer variant="landing" />
    </div>
  )
}
