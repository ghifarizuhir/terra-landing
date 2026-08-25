import { motion, useReducedMotion } from 'framer-motion'
import JourneyLoop from './components/JourneyLoop'
import { managements } from './data/managements'

export default function App() {
  const shouldReduceMotion = useReducedMotion()
  const totalSkills = managements.reduce((n, m) => n + m.skills.length, 0)
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[oklch(0.985_0_0)] text-[oklch(0.145_0_0)]">
      {/* Grain — 4% editorial texture */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")",
        }}
      />

      <motion.header
        initial={shouldReduceMotion ? undefined : { y: -6, opacity: 0 }}
        animate={shouldReduceMotion ? undefined : { y: 0, opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        className="shrink-0 sticky top-0 z-20 bg-[oklch(0.985_0_0)] border-b border-[oklch(0.145_0_0)]"
      >
        <div className="w-full px-4 lg:px-5 h-[52px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-[26px] w-[26px] border-[1.5px] border-[oklch(0.145_0_0)] grid place-items-center font-display text-[15px] leading-none bg-white">T</div>
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase font-semibold">Terra — AI for ITSM</span>
            <span className="hidden sm:inline-flex h-5 items-center border border-[oklch(0.145_0_0)] px-2 font-mono text-[10px] tracking-[0.12em] uppercase bg-white">Knowledge</span>
          </div>
          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-[oklch(0.45_0_0)]">
            <span>8 managements</span>
            <span className="h-3 w-px bg-[oklch(0.145_0_0/12%)]" />
            <span>{totalSkills} AI skills</span>
            <span className="h-2 w-2 rounded-full bg-[oklch(0.145_0_0)] animate-pulse" />
          </div>
        </div>
      </motion.header>

      {/* Editorial hero — kicker + serif display + lead + rule + byline */}
      <section className="w-full px-4 lg:px-5 pt-6 pb-3 max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-end">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.16em] uppercase text-[oklch(0.45_0_0)]">
              <span className="h-px w-7 bg-[oklch(0.145_0_0)]" />
              Editorial monochrome · Knowledge landing
            </div>
            <h1 className="font-display font-normal tracking-[-0.04em] leading-[0.88] text-[42px] lg:text-[68px] mt-3">
              What each <em className="font-normal italic text-[oklch(0.45_0_0)]">management</em>
              <br />
              <span className="font-normal">does — </span>
              <span className="font-serif2 italic font-light tracking-[-0.03em]">and what AI skill it needs</span>
            </h1>
          </div>
          <div>
            <p className="text-[14px] leading-[1.7] text-[oklch(0.45_0_0)] max-w-[520px]">
              Generic ITSM knowledge — no ITIL4 verbatim, no codebase. Monochrome oklch neutrals, 1px rule system, serif display — hierarchy from typography &amp; grid, not rainbow.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] tracking-[0.12em] uppercase">
              <span className="border border-[oklch(0.145_0_0/12%)] bg-white px-2.5 py-1.5 rounded-full">Instrument Serif + Newsreader</span>
              <span className="border border-[oklch(0.145_0_0/12%)] bg-white px-2.5 py-1.5 rounded-full">oklch neutrals only</span>
              <span className="border border-[oklch(0.145_0_0/12%)] bg-white px-2.5 py-1.5 rounded-full">1px rule system</span>
              <span className="hidden sm:inline border border-[oklch(0.145_0_0/12%)] bg-white px-2.5 py-1.5 rounded-full">grain 4%</span>
            </div>
          </div>
        </div>
        <div className="h-px bg-[oklch(0.145_0_0)] mt-6" />
        <div className="flex items-center justify-between py-2.5 font-mono text-[10px] tracking-[0.14em] uppercase text-[oklch(0.45_0_0)]">
          <span>Terra Knowledge — Generic ITSM · no ITIL4 verbatim · no internals</span>
          <span className="hidden sm:inline">Est. 2026 · click station for detail</span>
        </div>
        <div className="h-px bg-[oklch(0.145_0_0/12%)]" />
      </section>

      <main className="flex-1 flex flex-col w-full px-4 lg:px-5 py-4 max-w-[1280px] mx-auto">
        <JourneyLoop />
      </main>

      <footer className="shrink-0 h-[28px] border-t border-[oklch(0.145_0_0)] bg-[oklch(0.145_0_0)] flex items-center px-4 lg:px-5">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/70">© 2026 Terra · Editorial monochrome — 8 stations · {totalSkills} AI skills</span>
        <span className="ml-auto hidden sm:inline font-mono text-[10px] tracking-[0.14em] uppercase text-white/30">Instrument Serif · 1px rule · grain</span>
      </footer>
    </div>
  )
}
