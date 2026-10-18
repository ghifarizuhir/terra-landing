import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, MoveUpRight } from 'lucide-react'
import { product, type Feature, type Screenshot } from '../data/product'
import Footer from './Footer'
import Mark from './Mark'

const feature = (id: string): Feature => {
  const found = product.features.find((item) => item.id === id)
  if (!found) throw new Error(`Unknown product feature: ${id}`)
  return found
}

type Capability = {
  number: string
  eyebrow: string
  title: string
  body: string
  screenshot: Screenshot
  secondaryScreenshot?: Screenshot
  features: readonly Feature[]
}

const capabilities: readonly Capability[] = [
  {
    number: '01',
    eyebrow: 'Work management',
    title: 'Move service work forward with a clear process.',
    body: 'Bring requests, incidents and change tasks into one queue, then give each kind of work the states and rules it needs.',
    screenshot: product.hero.screenshot,
    features: [feature('work-items'), feature('types'), feature('intake')],
  },
  {
    number: '02',
    eyebrow: 'Service catalog',
    title: 'See the services behind every decision.',
    body: 'Understand ownership, criticality and dependencies before a change—or while investigating an incident.',
    screenshot: feature('services').screenshots[1],
    features: [feature('services')],
  },
  {
    number: '03',
    eyebrow: 'Knowledge & AI',
    title: 'Keep context close to the work.',
    body: 'Runbooks, postmortems and an assistant grounded in the record help teams work from shared context.',
    screenshot: feature('ai').screenshots[0],
    features: [feature('pages'), feature('ai'), feature('scheduler')],
  },
  {
    number: '04',
    eyebrow: 'Delivery & mobile',
    title: 'Plan the work, then keep it moving.',
    body: 'Timebox service work, track progress and handle the important updates from your phone.',
    screenshot: feature('delivery').screenshots[0],
    secondaryScreenshot: feature('mobile').screenshots[0],
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
    <header className="site-nav sticky top-0 z-50 border-b border-border/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex h-[70px] items-center justify-between gap-5">
          <a href="#top" aria-label="Terraline home" className="group flex shrink-0 items-center gap-2.5 text-ink">
            <Mark className="h-[17px] w-auto text-brand" />
            <span className="font-display text-[20px] font-semibold tracking-[-0.055em]">Terraline</span>
            <span className="ml-1 hidden rounded-full border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted sm:inline-flex">
              Built on Plane
            </span>
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
            <a href="#product" className="site-nav-link">Product</a>
            <a href="#platform" className="site-nav-link">Platform</a>
            <a href="#roadmap" className="site-nav-link">Roadmap</a>
            <a href="/learn" className="site-nav-link">Learn</a>
          </nav>

          <a href={product.cta.href} className="button button-primary h-10 shrink-0 px-4 text-[13px]">
            Request access <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <nav aria-label="Mobile navigation" className="-mx-5 flex items-center gap-6 overflow-x-auto border-t border-[#edf0f4] px-5 py-3 sm:-mx-8 sm:px-8 md:hidden">
          <a href="#product" className="site-nav-link shrink-0">Product</a>
          <a href="#platform" className="site-nav-link shrink-0">Platform</a>
          <a href="#roadmap" className="site-nav-link shrink-0">Roadmap</a>
          <a href="/learn" className="site-nav-link shrink-0">Learn</a>
        </nav>
      </div>
    </header>
  )
}

function ScreenshotFrame({ screenshot, priority = false }: { screenshot: Screenshot; priority?: boolean }) {
  return (
    <div className="screenshot-frame overflow-hidden rounded-[18px] border border-[#dfe4ec] bg-white p-[6px]">
      <div aria-hidden="true" className="flex h-8 items-center gap-1.5 border-b border-[#edf0f4] px-3">
        <span className="h-2 w-2 rounded-full bg-[#ff6a60]" />
        <span className="h-2 w-2 rounded-full bg-[#ffbd44]" />
        <span className="h-2 w-2 rounded-full bg-[#00ca4e]" />
        <span className="ml-3 h-[18px] max-w-[190px] flex-1 rounded-md bg-[#f4f6f9]" />
        <span className="ml-2 font-mono text-[9px] tracking-[0.08em] text-[#657080]">TERRALINE</span>
      </div>
      <img
        src={screenshot.src}
        alt={screenshot.alt}
        width={screenshot.width}
        height={screenshot.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        draggable={false}
        className="block h-auto w-full rounded-b-[12px]"
      />
    </div>
  )
}

function Hero() {
  return (
    <section id="top" className="hero-wash relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="hero-glow absolute -right-[12%] top-[3%] h-[620px] w-[66%] rounded-full" />
      </div>
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 pb-14 pt-14 sm:px-8 md:pb-20 md:pt-20 lg:min-h-[690px] lg:grid-cols-[0.82fr_1.18fr] lg:gap-8 lg:pb-24 lg:pt-12">
        <div className="relative z-10 max-w-[590px] animate-rise">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d9e4ff] bg-white/80 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.13em] text-[#315dd3] shadow-[0_2px_10px_rgba(48,93,211,0.06)]">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Open-source ITSM <span className="text-[#9eacc7]">/</span> Built on Plane
          </div>
          <h1 className="mt-7 max-w-[11ch] font-display text-[clamp(46px,6.1vw,82px)] font-semibold leading-[0.99] tracking-[-0.075em] text-[#111923]">
            Run services and delivery work <span className="text-brand">in one system.</span>
          </h1>
          <p className="mt-6 max-w-[51ch] text-[16px] leading-[1.75] text-[#596575] sm:text-[17px]">
            Work items, a service catalog, typed workflows and AI in the loop—self-hosted, traceable, real-time.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={product.hero.primaryCta.href} className="button button-primary h-12 px-5 text-[14px]">
              {product.hero.primaryCta.label} <ArrowUpRight className="h-[17px] w-[17px]" />
            </a>
            <a href="#product" className="button button-secondary h-12 px-5 text-[14px]">
              Explore the product <ArrowDown className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-[#778291]">
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-brand" /> AGPL-3.0</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#b4bdc9]" />
            <span>Self-hostable</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#b4bdc9]" />
            <span>Built on Plane</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[740px] animate-rise-delayed lg:ml-auto">
          <div aria-hidden="true" className="hero-image-glow absolute -inset-5 rounded-[34px]" />
          <div className="relative rotate-[0.6deg] rounded-[23px] border border-white/90 bg-white/80 p-2 shadow-[0_34px_90px_rgba(36,69,133,0.15),0_6px_24px_rgba(21,38,66,0.08)] backdrop-blur-sm">
            <div className="-rotate-[0.6deg]">
              <ScreenshotFrame screenshot={product.hero.screenshot} priority />
            </div>
          </div>
          <div className="floating-note absolute -bottom-5 left-2 flex items-center gap-3 rounded-[14px] border border-[#e6eaf0] bg-white px-4 py-3 shadow-[0_14px_36px_rgba(22,39,69,0.12)] sm:-left-7 sm:bottom-7">
            <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-[#eef3ff] text-brand">
              <Mark className="h-[15px] w-auto" />
            </span>
            <span>
              <span className="block font-display text-[12px] font-semibold text-[#182230]">One operational view</span>
              <span className="mt-0.5 block text-[11px] text-[#657080]">Work · services · workflows</span>
            </span>
          </div>
          <span className="absolute -right-1 -top-4 hidden rounded-full border border-[#dce7ff] bg-white px-3 py-2 font-mono text-[9px] uppercase tracking-[0.13em] text-[#4b68a4] shadow-[0_8px_22px_rgba(36,69,133,0.08)] sm:block">
            Product preview
          </span>
        </div>
      </div>
    </section>
  )
}

function FactStrip() {
  return (
    <section aria-label="Platform foundations" className="border-y border-[#e6eaf0] bg-white">
      <div className="mx-auto grid max-w-[1320px] gap-5 px-5 py-7 sm:px-8 md:grid-cols-[180px_1fr] md:items-center md:gap-8 md:py-8">
        <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.13em] text-[#5f6d7f]">
          Built for teams<br className="hidden md:block" /> that run services
        </p>
        <ul className="flex flex-wrap items-center gap-x-0 gap-y-3 md:justify-between">
          {product.facts.map((fact, index) => (
            <li key={fact} className="flex items-center gap-4 pr-4 font-mono text-[10px] uppercase tracking-[0.07em] text-[#4f5a68] sm:pr-6 sm:text-[11px]">
              <span className="text-brand">0{index + 1}</span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function CapabilitySection({ item, index }: { item: Capability; index: number }) {
  const reverse = index % 2 === 1
  const points = item.features.flatMap((current) => current.bullets.slice(0, 2)).slice(0, 4)

  return (
    <article className="grid items-center gap-8 border-t border-[#e8ecf1] py-12 md:py-16 lg:grid-cols-[0.76fr_1.24fr] lg:gap-16 lg:py-[82px]">
      <div className={reverse ? 'lg:order-2' : ''}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.16em] text-brand">{item.number}</span>
          <span className="h-px w-7 bg-[#bdcced]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-[#5f6d7f]">{item.eyebrow}</span>
        </div>
        <h3 className="mt-5 max-w-[14ch] font-display text-[clamp(30px,3.2vw,46px)] font-semibold leading-[1.08] tracking-[-0.06em] text-[#111923]">
          {item.title}
        </h3>
        <p className="mt-4 max-w-[49ch] text-[14px] leading-[1.8] text-[#657080]">{item.body}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {item.features.map((current) => (
            <span key={current.id} className="rounded-full border border-[#e4e8ee] bg-white px-3 py-1.5 text-[11px] text-[#566171]">
              {current.eyebrow}
            </span>
          ))}
        </div>
        <ul className="mt-6 space-y-2.5">
          {points.map((point) => (
            <li key={point} className="flex gap-2.5 text-[12px] leading-relaxed text-[#566171]">
              <Check className="mt-[2px] h-3.5 w-3.5 shrink-0 text-brand" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={`relative ${reverse ? 'lg:order-1' : ''}`}>
        <div aria-hidden="true" className="screenshot-halo absolute -inset-3 rounded-[24px]" />
        <div className="relative pb-5">
          <ScreenshotFrame screenshot={item.screenshot} />
          {item.secondaryScreenshot ? (
            <div className="absolute bottom-0 right-3 z-10 w-[78px] rounded-[18px] border-[4px] border-white bg-[#111922] p-[2px] shadow-[0_14px_35px_rgba(15,29,53,0.25)] sm:right-5 sm:w-[112px]">
              <img
                src={item.secondaryScreenshot.src}
                alt={item.secondaryScreenshot.alt}
                width={item.secondaryScreenshot.width}
                height={item.secondaryScreenshot.height}
                loading="lazy"
                className="block h-[148px] w-full rounded-[12px] object-cover object-top sm:h-[210px]"
              />
            </div>
          ) : null}
          <span className={`absolute -bottom-3 rounded-full border border-[#e6eaf0] bg-white px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#5f6d7f] shadow-sm ${item.secondaryScreenshot ? 'left-4' : 'right-4'}`}>
            {item.eyebrow}
          </span>
        </div>
      </div>
    </article>
  )
}

function ProductSection() {
  return (
    <section id="product" className="scroll-mt-[114px] bg-[#fbfcfe] md:scroll-mt-20">
      <div className="mx-auto max-w-[1320px] px-5 pb-16 pt-20 sm:px-8 md:pb-24 md:pt-28">
        <div className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[1fr_0.7fr] md:items-end">
          <div>
            <p className="section-eyebrow"><span /> The product</p>
            <h2 className="mt-5 max-w-[17ch] font-display text-[clamp(36px,5vw,62px)] font-semibold leading-[1.02] tracking-[-0.07em] text-[#111923]">
              A better way to run service work.
            </h2>
          </div>
          <p className="max-w-[48ch] pb-1 text-[14px] leading-[1.8] text-[#657080] md:justify-self-end">
            From intake and triage to service health and delivery, keep the operational picture connected in one place.
          </p>
        </div>
        {capabilities.map((item, index) => <CapabilitySection key={item.number} item={item} index={index} />)}
      </div>
    </section>
  )
}

function PlatformSection() {
  return (
    <section id="platform" className="platform-section relative isolate overflow-hidden scroll-mt-[114px] bg-[#111922] text-white md:scroll-mt-20">
      <div aria-hidden="true" className="platform-grid pointer-events-none absolute inset-0 opacity-50" />
      <div aria-hidden="true" className="platform-glow pointer-events-none absolute -right-32 -top-48 h-[600px] w-[700px] rounded-full" />
      <div className="relative mx-auto max-w-[1320px] px-5 py-20 sm:px-8 md:py-28">
        <div className="grid gap-8 md:grid-cols-[1fr_0.72fr] md:items-end">
          <div>
            <p className="section-eyebrow section-eyebrow-inverse"><span /> Open by design</p>
            <h2 className="mt-5 max-w-[15ch] font-display text-[clamp(36px,5vw,62px)] font-semibold leading-[1.03] tracking-[-0.07em]">
              Run Terraline on infrastructure you control.
            </h2>
          </div>
          <p className="max-w-[48ch] text-[14px] leading-[1.8] text-[#a5b0bd] md:justify-self-end">
            {product.architecture.body} AI requests follow the configured LLM endpoint; the default is OpenAI, and the endpoint can be configured for your deployment.
          </p>
        </div>

        <div className="mt-12 grid gap-3 md:mt-16 md:grid-cols-2">
          {product.comparisons.map((comparison, index) => (
            <article key={comparison.title} className="platform-card rounded-[18px] border border-white/10 bg-white/[0.045] p-6 md:p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.16em] text-[#82a6ff]">0{index + 1} / FOUNDATION</span>
                <MoveUpRight className="h-4 w-4 text-[#6f87ad]" />
              </div>
              <h3 className="mt-5 font-display text-[25px] font-medium tracking-[-0.045em] text-white">{comparison.title}</h3>
              <p className="mt-2 max-w-[52ch] text-[13px] leading-[1.75] text-[#a5b0bd]">{comparison.body}</p>
              <ul className="mt-6 grid gap-x-5 gap-y-3 sm:grid-cols-2">
                {comparison.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-[11px] leading-relaxed text-[#d5dce5]">
                    <Check className="mt-[2px] h-3.5 w-3.5 shrink-0 text-[#82a6ff]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-5 rounded-[18px] border border-white/10 bg-[#17222e] px-5 py-6 md:px-8 md:py-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#8798ad]">Under the hood</span>
              <p className="mt-2 text-[13px] text-[#c5ced9]">A production-minded stack, ready to self-host.</p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {product.architecture.facts.map((fact) => (
                <li key={fact} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-[9px] tracking-[0.04em] text-[#d3dce6] sm:text-[10px]">
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
    <section id="roadmap" className="scroll-mt-[114px] bg-white md:scroll-mt-20">
      <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 md:py-28">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-eyebrow"><span /> Product direction</p>
            <h2 className="mt-5 font-display text-[clamp(36px,5vw,62px)] font-semibold leading-[1.02] tracking-[-0.07em] text-[#111923]">
              Shipped today. <span className="text-[#657080]">Building next.</span>
            </h2>
          </div>
          <p className="max-w-[40ch] text-[13px] leading-[1.8] text-[#657080]">
            A clear view of what is in the product now and where the platform is heading—without dates or promises.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2">
          <article className="rounded-[18px] border border-[#e3e8ef] bg-[#f8faff] p-6 md:p-8">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-brand" />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#344259]">Shipped today</h3>
            </div>
            <ul className="mt-6 space-y-3.5">
              {product.roadmap.shipped.map((item) => (
                <li key={item} className="flex gap-3 text-[13px] leading-relaxed text-[#394657]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-[18px] border border-[#e3e8ef] bg-white p-6 md:p-8">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#a4afbd]" />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#657080]">Next in line</h3>
            </div>
            <ul className="mt-6 space-y-3.5">
              {product.roadmap.next.map((item) => (
                <li key={item} className="flex gap-3 text-[13px] leading-relaxed text-[#596575]">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#8f9bab]" /> <span>{item}</span>
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
    <section id="faq" className="border-t border-[#e8ecf1] bg-[#fbfcfe]">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.65fr_1fr] md:gap-16 md:py-24">
        <div>
          <p className="section-eyebrow"><span /> Good to know</p>
          <h2 className="mt-5 max-w-[11ch] font-display text-[clamp(34px,4.3vw,54px)] font-semibold leading-[1.04] tracking-[-0.065em] text-[#111923]">
            A few things you may be wondering.
          </h2>
          <p className="mt-4 max-w-[38ch] text-[13px] leading-[1.8] text-[#657080]">
            Want to talk through your setup? <a className="font-medium text-brand hover:underline" href={product.footer.contact}>Get in touch.</a>
          </p>
        </div>
        <div className="divide-y divide-[#e4e8ee] border-y border-[#e4e8ee]">
          {questions.map((item) => (
            <details key={item.question} className="faq-item group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left font-display text-[15px] font-medium tracking-[-0.025em] text-[#202b39] marker:hidden sm:text-[16px]">
                {item.question}
                <ChevronDown className="faq-chevron h-4 w-4 shrink-0 text-[#7d8999] transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="max-w-[68ch] pb-5 pr-8 text-[13px] leading-[1.8] text-[#657080]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function CallToAction() {
  return (
    <section className="cta-band relative isolate overflow-hidden bg-[#eaf0ff]">
      <div aria-hidden="true" className="cta-grid pointer-events-none absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="cta-glow pointer-events-none absolute -right-24 -top-44 h-[540px] w-[540px] rounded-full" />
      <div className="relative mx-auto flex max-w-[1320px] flex-col gap-7 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between md:py-[76px]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#5473bb]">See Terraline in context</p>
          <h2 className="mt-3 max-w-[18ch] font-display text-[clamp(32px,4vw,48px)] font-semibold leading-[1.04] tracking-[-0.065em] text-[#111923]">
            {product.cta.title}
          </h2>
          <p className="mt-3 max-w-[52ch] text-[13px] leading-[1.8] text-[#5f6d82]">{product.cta.body}</p>
        </div>
        <a href={product.cta.href} className="button button-primary h-12 shrink-0 self-start px-5 text-[14px] md:self-center">
          {product.cta.label} <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}

export default function Tour() {
  return (
    <div className="tour min-h-screen bg-bg text-ink">
      <SiteNav />
      <main>
        <Hero />
        <FactStrip />
        <ProductSection />
        <PlatformSection />
        <RoadmapSection />
        <FaqSection />
        <CallToAction />
      </main>
      <Footer variant="landing" />
    </div>
  )
}
