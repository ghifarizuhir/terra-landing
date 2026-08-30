import { useState } from 'react'
import JourneyLoop from './components/JourneyLoop'
import { managements } from './data/managements'

export default function App() {
  const totalSkills = managements.reduce((n, m) => n + m.skills.length, 0)
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState<'all' | 'lifecycle' | 'foundation'>('all')

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white text-black antialiased">
      {/* Top nav — skills.sh minimal */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-[#eaeaea]">
        <div className="max-w-[1100px] mx-auto px-6 h-[49px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-[28px] w-[28px] bg-black text-white grid place-items-center font-semibold text-[13px] leading-none">T</div>
            <span className="font-mono text-[13px] tracking-tight font-medium">Terra</span>
            <span className="hidden sm:inline text-[#666] text-[13px]">— AI for ITSM</span>
            <span className="hidden md:inline-flex ml-1 h-5 items-center rounded-full border border-[#eaeaea] bg-[#fafafa] px-2 font-mono text-[11px] text-[#666]">8 practices</span>
          </div>
          <nav className="flex items-center gap-5 font-mono text-[13px]">
            <a href="#practices" className="hidden sm:inline text-black hover:underline underline-offset-4">Practices</a>
            <a href="#principles" className="hidden sm:inline text-[#666] hover:text-black">Principles</a>
            <a href="https://github.com" className="text-[#666] hover:text-black hidden sm:inline">Docs</a>
            <span className="h-4 w-px bg-[#eaeaea] hidden sm:block" />
            <span className="font-mono text-[11px] text-[#999] hidden lg:inline">{totalSkills} AI skills</span>
          </nav>
        </div>
      </header>

      {/* Hero — centered, Vercel/skills.sh */}
      <section className="border-b border-[#eaeaea]">
        <div className="max-w-[1100px] mx-auto px-6 pt-10 pb-8">
          {/* ASCII block — subtle skills.sh nod */}
          <div className="flex justify-center select-none pointer-events-none">
            <pre className="font-mono text-[7px] sm:text-[8px] leading-[1.1] tracking-[0.02em] text-black hidden sm:block" aria-hidden>
{` ████████╗███████╗██████╗ ██████╗  █████╗
 ╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██╔══██╗
    ██║   █████╗  ██████╔╝██████╔╝███████║
    ██║   ██╔══╝  ██╔══██╗██╔══██╗██╔══██║
    ██║   ███████╗██║  ██║██║  ██║██║  ██║
    ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝`}
            </pre>
            <pre className="font-mono text-[8px] leading-[1.1] sm:hidden" aria-hidden>{` TERRA — AI for ITSM`}</pre>
          </div>

          <div className="text-center mt-6">
            <p className="font-mono text-[12px] tracking-wide text-[#666]">The Open ITSM Knowledge — 8 managements, one AI skill per stage</p>
            <h1 className="font-display font-semibold tracking-[-0.03em] leading-[0.95] text-[32px] sm:text-[42px] lg:text-[48px] mt-3">
              What each management does —<br />
              <span className="text-[#666] font-medium">and what AI skill it needs.</span>
            </h1>
            <p className="mx-auto max-w-[640px] text-[15px] leading-[1.6] text-[#666] mt-4">
              Eight ITSM practices, mapped end to end. Generic operational knowledge — no ITIL4 verbatim,
              no codebase. One AI skill per lifecycle stage. Human confirms every proposal.
            </p>
          </div>

          {/* Try it now — like skills.sh npx box */}
          <div className="mx-auto mt-6 max-w-[560px] flex items-center gap-2 rounded-lg border border-[#eaeaea] bg-[#fafafa] px-3 py-2.5 overflow-hidden">
            <span className="font-mono text-[13px] text-[#666] select-none shrink-0">$</span>
            <span className="font-mono text-[13px] text-black min-w-0 truncate">select a practice below to explore its skills</span>
            <span className="ml-auto hidden sm:inline-flex font-mono text-[11px] tracking-wide text-[#999] shrink-0">read in 30s</span>
          </div>

          {/* Agent/practice strip — like skills.sh agent icons */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 font-mono text-[11px]">
            {managements.map((m) => (
              <span key={m.id} className="inline-flex items-center gap-1.5 rounded-full border border-[#eaeaea] bg-white px-2.5 py-1 text-[#666]">
                <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
                {m.title.replace(' Management','')}
              </span>
            ))}
          </div>

          {/* Quick credibility badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 font-mono text-[11px]">
            <span className="rounded-full border border-[#eaeaea] bg-white px-3 py-1">AI proposes · humans confirm</span>
            <span className="rounded-full border border-[#eaeaea] bg-white px-3 py-1">One skill per stage</span>
            <span className="rounded-full border border-[#eaeaea] bg-white px-3 py-1">Audit-ready records</span>
          </div>
        </div>
      </section>

      {/* Controls — search + tabs like skills.sh leaderboard */}
      <div className="max-w-[1100px] mx-auto w-full px-6 pt-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="flex items-center gap-2 flex-1 sm:flex-none min-w-0">
            <div className="relative flex-1 sm:flex-none">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search practices or skills…"
                className="h-9 w-full sm:w-[320px] rounded-md border border-[#eaeaea] bg-white px-3 pr-8 font-mono text-[13px] placeholder:text-[#999] focus:outline-none focus:border-black focus:ring-0"
              />
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[11px] text-[#999] border border-[#eaeaea] rounded px-1.5 py-0.5 bg-[#fafafa]">/</span>
            </div>
            <span className="hidden sm:inline font-mono text-[12px] text-[#999] shrink-0">{managements.length} practices</span>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-full border border-[#eaeaea] bg-[#fafafa] w-fit">
            {([
              ['all', 'All'],
              ['lifecycle', 'Lifecycle'],
              ['foundation', 'Foundation'],
            ] as const).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`rounded-full px-3 py-1.5 font-mono text-[12px] transition ${filter === k ? 'bg-black text-white' : 'text-[#666] hover:text-black'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 font-mono text-[11px] text-[#999]">
          <span className="h-px flex-1 bg-[#eaeaea]" />
          <span>8 practices · {totalSkills} AI skills · click a row to read</span>
          <span className="h-px flex-1 bg-[#eaeaea]" />
        </div>
      </div>

      <main id="practices" className="flex-1 max-w-[1100px] mx-auto w-full px-6 py-6">
        <JourneyLoop q={q} filter={filter} />
      </main>

      {/* Principles — minimal */}
      <section id="principles" className="max-w-[1100px] mx-auto w-full px-6 pb-10">
        <div className="rounded-lg border border-[#eaeaea] overflow-hidden">
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#eaeaea]">
            {[
              ['Knowledge over marketing', 'Explain what each practice does before how Terra does it.'],
              ['AI proposes — human confirms', 'Every skill suggests. No auto-assign, no silent overwrite.'],
              ['Scannable in 30s', 'One-liner + 3 bullets + skills per practice. No jargon.'],
            ].map(([t, d]) => (
              <div key={t} className="p-5 bg-white">
                <div className="font-mono text-[11px] tracking-wide uppercase text-[#999]">{t}</div>
                <p className="text-[13px] leading-[1.5] text-[#666] mt-2">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#eaeaea] bg-white">
        <div className="max-w-[1100px] mx-auto px-6 py-3 sm:h-[52px] sm:py-0 flex flex-col sm:flex-row gap-1 sm:gap-0 sm:items-center sm:justify-between font-mono text-[11px]">
          <span className="text-[#999] leading-relaxed">© 2026 Terra · 8 practices · {totalSkills} AI skills · Knowledge-first, not product-first.</span>
          <span className="text-[#999]">AI proposes · humans confirm</span>
        </div>
      </footer>
    </div>
  )
}
