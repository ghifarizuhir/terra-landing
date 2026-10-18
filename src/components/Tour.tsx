import { ArrowRight, ArrowUpRight, Check, ChevronDown } from 'lucide-react'
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
    screenshot: feature('services').screenshots[0],
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

function ServiceGraphPreview() {
  const screenshot = feature('services').screenshots[1]

  return (
    <figure className="overflow-hidden rounded-[12px] border border-neutral-200 bg-neutral-50">
      <figcaption className="flex items-center justify-between gap-3 border-b border-neutral-200 bg-white px-3 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-700">Service relationships</span>
        <span className="text-[11px] text-neutral-500">Dependency graph</span>
      </figcaption>
      <div className="p-2.5 sm:p-3.5">
        <ProductShot screenshot={screenshot} className="aspect-[16/10] object-cover object-top" />
      </div>
    </figure>
  )
}

function ProductShot({ screenshot, className = '', priority = false }: { screenshot: Screenshot; className?: string; priority?: boolean }) {
  return (
    <img
      src={screenshot.src}
      alt={screenshot.alt}
      width={screenshot.width}
      height={screenshot.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      draggable={false}
      className={`block h-auto w-full rounded-[8px] border border-neutral-200 bg-white ${className}`}
    />
  )
}

function Hero() {
  return (
    <section id="top" className="bg-white">
      <div className="mx-auto w-full px-5 pt-16 sm:px-8 md:pt-[88px] lg:px-16">
        <div className="grid items-center gap-10 pb-14 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12 md:pb-16 lg:gap-16">
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
              <a href="#product" className="inline-flex h-9 items-center gap-1.5 px-1 text-sm font-medium text-black hover:underline underline-offset-4">
                See the product <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-8 flex items-center gap-7">
              <div>
                <p className="font-mono text-[21px] leading-7 text-black">AGPL-3.0</p>
                <p className="mt-1 text-[13px] text-neutral-500">Open-source license</p>
              </div>
              <span aria-hidden="true" className="h-12 w-px bg-neutral-200" />
              <div>
                <p className="font-mono text-[19px] leading-7 text-black">Docker</p>
                <p className="mt-1 text-[13px] text-neutral-500">Self-host your stack</p>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full md:justify-self-end">
            <ServiceGraphPreview />
          </div>
        </div>
      </div>

      <div className="preview-panel mt-2 w-full overflow-hidden bg-neutral-50 p-2.5 sm:p-4 lg:p-6">
        <ProductShot screenshot={product.hero.screenshot} priority className="aspect-[16/9] rounded-[4px] border-0 object-cover object-top" />
      </div>
    </section>
  )
}

function FactStrip() {
  return (
    <section aria-label="Platform foundations" className="border-y border-neutral-200 bg-white">
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

function CapabilitySection({ item, index }: { item: Capability; index: number }) {
  const reverse = index % 2 === 1
  return (
    <article className="grid items-center gap-9 border-t border-neutral-200 py-14 md:grid-cols-2 md:gap-12 md:py-[76px]">
      <div className={reverse ? 'md:order-2' : ''}>
        <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-neutral-500">{item.number} / {item.eyebrow}</p>
        <h3 className="mt-4 max-w-[14ch] font-display text-[32px] font-medium leading-[1.22] tracking-[-0.45px] text-black sm:text-[36px] sm:leading-[44px]">
          {item.title}
        </h3>
        <p className="mt-4 max-w-[48ch] text-sm leading-[1.65] text-neutral-500">{item.body}</p>
        <div className="mt-7 space-y-4 border-l border-neutral-200 pl-5">
          {item.features.map((current) => (
            <div key={current.id}>
              <h4 className="text-sm font-medium text-black">{current.title}</h4>
              <p className="mt-1 max-w-[50ch] text-[13px] leading-[1.55] text-neutral-500">{current.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={`rounded-[20px] bg-neutral-50 p-2.5 sm:p-3.5 ${reverse ? 'md:order-1' : ''}`}>
        {item.secondaryScreenshot ? (
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(64px,0.27fr)] items-center gap-2.5 sm:gap-3">
            <ProductShot screenshot={item.screenshot} />
            <ProductShot screenshot={item.secondaryScreenshot} className="h-[160px] object-cover object-top sm:h-[220px]" />
          </div>
        ) : (
          <ProductShot screenshot={item.screenshot} />
        )}
      </div>
    </article>
  )
}

function ProductSection() {
  return (
    <section id="product" className="scroll-mt-[112px] bg-white md:scroll-mt-16">
      <div className="mx-auto w-full px-5 pb-16 pt-20 sm:px-8 md:pb-24 md:pt-[104px] lg:px-16">
        <div className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[1fr_0.75fr] md:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">The product</p>
            <h2 className="mt-4 max-w-[14ch] font-display text-[36px] font-medium leading-[44px] tracking-[-0.55px] text-black">
              Bring your service work into one system.
            </h2>
          </div>
          <p className="max-w-[49ch] pb-1 text-sm leading-[1.65] text-neutral-500 md:justify-self-end">
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
