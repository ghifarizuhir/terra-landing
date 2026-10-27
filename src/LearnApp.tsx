import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, BookOpen, Check, Search, Sparkles } from 'lucide-react'
import Footer from './components/Footer'
import JourneyLoop from './components/JourneyLoop'
import Mark from './components/Mark'
import SkillsSection from './components/SkillsSection'
import Traceability from './components/learn/Traceability'
import { managements } from './data/managements'

const filters = ['all', 'lifecycle', 'foundation'] as const
type PracticeFilter = (typeof filters)[number]

export default function LearnApp() {
  const totalSkills = managements.reduce((n, management) => n + management.skills.length, 0)
  const lifecycleCount = managements.filter((management) => management.lane !== 'foundation').length
  const foundationCount = managements.filter((management) => management.lane === 'foundation').length
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<PracticeFilter>('all')
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === '/' && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="learn-page min-h-[100dvh] bg-white text-neutral-950 antialiased">
      <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full items-center justify-between gap-4 px-5 sm:px-8 lg:px-16">
          <div className="flex min-w-0 items-center gap-2.5">
            <a href="/" aria-label="Terraline home" className="flex shrink-0 items-center gap-2.5 text-black">
              <Mark className="h-[17px] w-auto text-black" />
              <span className="font-display text-[18px] font-medium tracking-[-0.025em]">Terraline</span>
            </a>
            <span aria-hidden="true" className="h-4 w-px bg-neutral-200" />
            <span className="text-sm text-neutral-500">Learn</span>
            <span className="hidden rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-[10px] text-neutral-500 sm:inline-flex">
              {managements.length} practices
            </span>
          </div>

          <nav aria-label="Learn navigation" className="flex shrink-0 items-center gap-3 sm:gap-5">
            <a href="#practices" className="hidden text-[13px] text-neutral-600 transition-colors hover:text-black sm:inline">Practices</a>
            <a href="#principles" className="hidden text-[13px] text-neutral-600 transition-colors hover:text-black md:inline">Principles</a>
            <a href="/" aria-label="← Product" className="text-[13px] font-medium text-neutral-800 transition-colors hover:text-neutral-500">← Product</a>
            <a
              href="mailto:support@terraline.space?subject=Terraline%20demo%20access"
              className="button button-primary h-9 px-3.5 text-xs"
            >
              Request access
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-neutral-200 bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:20px_20px]">
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/90 to-white" />
          <div className="relative mx-auto grid w-full items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-16 lg:py-20">
            <div className="max-w-[640px]">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/90 px-3 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <BookOpen className="h-3.5 w-3.5 text-neutral-500" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-600">The open ITSM knowledge base</span>
              </div>

              <h1 className="mt-6 max-w-[15ch] font-display text-[clamp(38px,5vw,58px)] font-medium leading-[1.08] tracking-[-0.035em] text-black">
                What each management does <span className="text-neutral-400">and what AI can take off your plate.</span>
              </h1>
              <p className="mt-5 max-w-[59ch] text-[15px] leading-[1.7] text-neutral-600 sm:text-base">
                Explore the practices your team lives every day—from restoring incidents and fulfilling requests to shipping changes and keeping knowledge current. Each stage pairs a repeatable pattern with an AI skill that helps humans decide faster.
              </p>
              <p className="mt-3 max-w-[59ch] text-[12px] leading-[1.6] text-neutral-500">
                A practice reference, not a feature list: Terraline ships the six practices in its ITIL4 map; Asset Management and Service Configuration appear here as broader ITSM knowledge.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#practices" className="button button-primary h-10 px-4 text-sm shadow-sm">
                  Explore {totalSkills} skills <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href="#principles" className="inline-flex h-10 items-center gap-1.5 px-2 text-sm font-medium text-neutral-800 transition-colors hover:text-neutral-500">
                  How skills work <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.09em] text-neutral-500">
                <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> AI proposes · humans confirm</span>
                <span className="hidden h-3 w-px bg-neutral-200 sm:inline" />
                <span>One skill per stage</span>
                <span className="hidden h-3 w-px bg-neutral-200 sm:inline" />
                <span>No signup · open knowledge</span>
              </div>
            </div>

            <aside aria-label="Knowledge base overview" className="relative mx-auto w-full max-w-[560px] lg:justify-self-end">
              <div className="overflow-hidden rounded-[20px] border border-neutral-800/90 bg-[#0b0d11] text-white shadow-[0_28px_70px_-24px_rgba(0,0,0,0.38)] ring-1 ring-black/5">
                <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#10131a] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="hidden items-center gap-1.5 sm:flex">
                      <i className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                      <i className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                      <i className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                    </span>
                    <div>
                      <p className="text-xs font-medium tracking-tight">Practice map</p>
                      <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-neutral-500">ITSM · AI skill library</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Open
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 p-4 sm:p-5">
                  {managements.map((management, index) => (
                    <a
                      key={management.id}
                      href="#practices"
                      className="group rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[9px] tracking-[0.12em] text-neutral-500">0{index + 1} · {management.prefix}</span>
                        <span className={`h-1.5 w-1.5 rounded-full ${management.lane === 'foundation' ? 'bg-emerald-400' : 'bg-neutral-500'}`} />
                      </div>
                      <p className="mt-2 text-[11px] font-medium leading-snug text-neutral-100 group-hover:text-white sm:text-xs">
                        {management.title.replace(' Management', '')}
                      </p>
                      <p className="mt-1 font-mono text-[9px] text-neutral-500">{management.skills.length} skills</p>
                    </a>
                  ))}
                </div>

                <div className="grid grid-cols-2 border-t border-white/[0.08] bg-[#10131a]">
                  <div className="px-4 py-3 sm:px-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-neutral-500">Practice areas</p>
                    <p className="mt-1 font-display text-[22px] font-medium tracking-tight">{managements.length}</p>
                  </div>
                  <div className="border-l border-white/[0.08] px-4 py-3 sm:px-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-neutral-500">Reusable skills</p>
                    <p className="mt-1 font-display text-[22px] font-medium tracking-tight">{totalSkills}</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-2 hidden rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-neutral-500 shadow-sm sm:inline-flex">
                <Sparkles className="mr-1.5 h-3 w-3" aria-hidden="true" /> Knowledge first, then augmentation
              </div>
            </aside>
          </div>
        </section>

        <section aria-label="How to use this knowledge base" className="mx-auto w-full px-5 py-12 sm:px-8 md:py-16 lg:px-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">A practical reference</p>
              <h2 className="mt-2 font-display text-[26px] font-medium leading-tight tracking-[-0.025em] text-black sm:text-[30px]">Knowledge before automation.</h2>
            </div>
            <p className="max-w-[42ch] text-[13px] leading-[1.6] text-neutral-500">Understand the work, then decide where a repeatable AI skill can help.</p>
          </div>

          <div className="grid overflow-hidden rounded-[20px] border border-neutral-200 bg-white md:grid-cols-3">
            <article className="p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400">01 · What ITSM does</p>
              <h3 className="mt-3 text-[15px] font-semibold leading-snug tracking-[-0.01em]">Run the services the business lives on.</h3>
              <p className="mt-2 text-[13px] leading-[1.65] text-neutral-600">Incident to restore, request to fulfill, change to ship, and knowledge to keep current—with problem, improvement, assets, and configuration underneath.</p>
            </article>
            <article className="border-y border-neutral-200 bg-neutral-950 p-5 text-white md:border-x md:border-y-0 sm:p-6">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-neutral-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Core idea
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500">02 · What a skill is</p>
              <h3 className="mt-2 text-[15px] font-semibold leading-snug">A reusable way of doing one thing well.</h3>
              <p className="mt-2 text-[13px] leading-[1.65] text-neutral-300">A skill bundles when to use it, what good looks like, and a copyable pattern—so teams can act consistently without rethinking each situation.</p>
            </article>
            <article className="p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400">03 · Why skills help</p>
              <h3 className="mt-3 text-[15px] font-semibold leading-snug tracking-[-0.01em]">Repetitive work, high stakes, clear ownership.</h3>
              <p className="mt-2 text-[13px] leading-[1.65] text-neutral-600">Skills handle busywork—classify, enrich, route, score risk, summarize—and propose a draft for a human to confirm.</p>
            </article>
            <div className="col-span-full flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-neutral-200 bg-neutral-50 px-5 py-3 font-mono text-[10px] text-neutral-500 sm:px-6">
              <span>How to read:</span>
              <span className="text-neutral-900">Pick a practice <span className="text-neutral-400">→</span> pick a stage <span className="text-neutral-400">→</span> copy the pattern</span>
              <span className="sm:ml-auto">{managements.length} practices · {totalSkills} skills</span>
            </div>
          </div>
        </section>

        <SkillsSection />
        <Traceability />

        <section id="practices" className="scroll-mt-20 border-y border-neutral-200 bg-neutral-50/70">
          <div className="mx-auto w-full px-5 py-12 sm:px-8 md:py-16 lg:px-16">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">Browse the library</p>
                <h2 className="mt-2 font-display text-[30px] font-medium leading-tight tracking-[-0.03em] text-black sm:text-[36px]">The practice index.</h2>
              </div>
              <p className="max-w-[44ch] text-[13px] leading-[1.65] text-neutral-500">Open a practice to explore its stages, implementation notes, and patterns you can reuse.</p>
            </div>

            <div className="mt-7 rounded-[18px] border border-neutral-200 bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
                  <label className="relative block min-w-0 sm:w-[340px]">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
                    <input
                      ref={searchRef}
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search practices, skills, or keywords…"
                      aria-label="Search practices and skills"
                      className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-12 text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900/5"
                    />
                    <span aria-hidden="true" className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 font-mono text-[10px] text-neutral-400">/</span>
                  </label>
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-400">{managements.length} practice areas</span>
                </div>

                <div className="flex w-full max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-1 sm:w-fit" role="tablist" aria-label="Filter practices">
                  {filters.map((key) => {
                    const label = key === 'all' ? `All ${managements.length}` : key === 'lifecycle' ? `Lifecycle ${lifecycleCount}` : `Foundation ${foundationCount}`
                    return (
                      <button
                        key={key}
                        role="tab"
                        aria-selected={filter === key}
                        onClick={() => setFilter(key)}
                        className={`shrink-0 rounded-lg px-2.5 py-2 font-mono text-[9px] transition-colors sm:px-3 sm:text-[11px] ${filter === key ? 'bg-neutral-950 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-950'}`}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-100 pt-3 font-mono text-[10px] text-neutral-400">
                <span>Press <kbd className="rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-neutral-600">/</kbd> to search</span>
                <span>{totalSkills} AI skills · AI proposes, people confirm</span>
              </div>
            </div>

            <div className="mt-5" id="practice-list">
              <JourneyLoop q={query} filter={filter} />
            </div>
          </div>
        </section>

        <section id="principles" className="scroll-mt-20 mx-auto w-full px-5 py-12 sm:px-8 md:py-16 lg:px-16">
          <div className="overflow-hidden rounded-[20px] border border-neutral-200 bg-white">
            <div className="flex flex-col gap-3 border-b border-neutral-200 bg-neutral-50 px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-7">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">Working principles</p>
                <h2 className="mt-2 font-display text-[26px] font-medium leading-tight tracking-[-0.025em] text-black">Knowledge you can put to work.</h2>
              </div>
              <p className="max-w-[38ch] text-[13px] leading-[1.6] text-neutral-500">Designed to explain the practice first, then show where a skill can help.</p>
            </div>
            <div className="grid divide-y divide-neutral-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                ['Knowledge over marketing', 'Explain what each practice does before how Terraline does it.'],
                ['AI proposes, human confirms', 'Every skill suggests. No auto-assign, no silent overwrite.'],
                ['Scannable in 30 seconds', 'One-liner, core steps, and practical patterns for each stage.'],
              ].map(([title, body], index) => (
                <article key={title} className="p-5 sm:p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400">0{index + 1}</p>
                  <h3 className="mt-2 text-[14px] font-semibold text-neutral-900">{title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.6] text-neutral-600">{body}</p>
                </article>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-neutral-200 bg-neutral-950 px-5 py-3 font-mono text-[10px] text-neutral-300 sm:px-7">
              <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              <span>Human decision points stay explicit.</span>
              <span className="sm:ml-auto text-neutral-500">Terraline · Open knowledge for service operations</span>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full px-5 pb-12 sm:px-8 md:pb-16 lg:px-16">
          <div className="overflow-hidden rounded-[20px] border border-neutral-800 bg-neutral-950 text-white shadow-[0_22px_60px_-32px_rgba(0,0,0,0.4)]">
            <div className="flex flex-col gap-6 px-5 py-7 sm:px-8 sm:py-9 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-neutral-300">
                  <Sparkles className="h-3 w-3 text-emerald-400" aria-hidden="true" /> Start here
                </div>
                <h2 className="mt-4 max-w-[28ch] font-display text-[26px] font-medium leading-[1.18] tracking-[-0.025em] sm:text-[32px]">Pick a practice. Copy a pattern. Use it today.</h2>
                <p className="mt-2 max-w-[55ch] text-[13px] leading-[1.65] text-neutral-400">Every stage has when-to-use guidance, a clear standard, and a before-and-after pattern. No signup required.</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <a href="#practices" className="button h-10 bg-white px-4 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200">
                  Explore {totalSkills} skills <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href="/" className="button h-10 border border-white/15 bg-white/[0.05] px-4 text-sm text-white transition-colors hover:bg-white/10">See the product</a>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-white/10 bg-white/[0.03] px-5 py-3 font-mono text-[10px] text-neutral-500 sm:px-8">
              <span>Tip: press <kbd className="rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-neutral-300">/</kbd> to search</span>
              <span className="sm:ml-auto">{managements.length} practices · {totalSkills} skills · one pattern per stage</span>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="learn" />
    </div>
  )
}
