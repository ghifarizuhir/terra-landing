import { motion, useReducedMotion } from 'framer-motion'
import JourneyLoop from './components/JourneyLoop'
import { managements } from './data/managements'

export default function App() {
  const shouldReduceMotion = useReducedMotion()
  const totalSkills = managements.reduce((n, m) => n + m.skills.length, 0)
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[oklch(0.985_0_0)] text-[oklch(0.145_0_0)]">
      <motion.header
        initial={shouldReduceMotion ? undefined : { y: -6, opacity: 0 }}
        animate={shouldReduceMotion ? undefined : { y: 0, opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        className="shrink-0 sticky top-0 z-20 bg-[oklch(0.985_0_0)] border-b border-[oklch(0.145_0_0)]"
      >
        <div className="w-full px-4 lg:px-6 h-[52px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-[26px] w-[26px] bg-[oklch(0.145_0_0)] text-white grid place-items-center font-semibold text-[13px]">T</div>
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase font-medium">Terra — AI for ITSM</span>
            <span className="hidden sm:inline-flex h-5 items-center border border-[oklch(0.145_0_0/25%)] px-2 font-mono text-[10px] tracking-[0.12em] uppercase bg-white">Platform</span>
          </div>
          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-[oklch(0.45_0_0)]">
            <span>8 managements</span>
            <span className="h-3 w-px bg-[oklch(0.145_0_0/12%)]" />
            <span>{totalSkills} AI skills</span>
          </div>
        </div>
      </motion.header>

      {/* Structured hero — corporate, no serif, no italic */}
      <section className="w-full px-4 lg:px-6 pt-7 pb-4">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-end">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.16em] uppercase text-[oklch(0.45_0_0)]">
              <span className="h-px w-7 bg-[oklch(0.145_0_0)]" />
              Product overview · AI for ITSM
            </div>
            <h1 className="font-display font-semibold tracking-[-0.02em] leading-[1.05] text-[30px] lg:text-[44px] mt-3">
              What each management does —<br />and what AI skill it needs
            </h1>
          </div>
          <div>
            <p className="text-[14px] leading-[1.65] text-[oklch(0.45_0_0)] max-w-[520px]">
              Eight ITSM practices, mapped end to end: one AI skill per lifecycle stage, standardized reports and records, and a human confirming every AI proposal.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] tracking-[0.12em] uppercase">
              <span className="border border-[oklch(0.145_0_0/25%)] bg-white px-2.5 py-1.5">AI proposes · humans confirm</span>
              <span className="border border-[oklch(0.145_0_0/25%)] bg-white px-2.5 py-1.5">One skill per stage</span>
              <span className="border border-[oklch(0.145_0_0/25%)] bg-white px-2.5 py-1.5">Audit-ready records</span>
            </div>
          </div>
        </div>
        <div className="h-px bg-[oklch(0.145_0_0)] mt-6" />
        <div className="flex items-center justify-between py-2.5 font-mono text-[10px] tracking-[0.14em] uppercase text-[oklch(0.45_0_0)]">
          <span>Incident · Problem · Change · Request · Knowledge · Improvement · Assets · Configuration</span>
          <span className="hidden sm:inline">Select a practice to explore its skills</span>
        </div>
        <div className="h-px bg-[oklch(0.145_0_0/12%)]" />
      </section>

      <main className="flex-1 flex flex-col w-full px-4 lg:px-6 py-4">
        <JourneyLoop />
      </main>

      <footer className="shrink-0 h-[28px] border-t border-[oklch(0.145_0_0)] bg-[oklch(0.145_0_0)] flex items-center px-4 lg:px-6">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/70">© 2026 Terra · 8 practices · {totalSkills} AI skills</span>
        <span className="ml-auto hidden sm:inline font-mono text-[10px] tracking-[0.14em] uppercase text-white/30">AI proposes · humans confirm</span>
      </footer>
    </div>
  )
}
