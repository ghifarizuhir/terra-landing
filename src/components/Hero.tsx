import { motion, useReducedMotion, type Variants } from 'framer-motion'
import PulsePreview from './PulsePreview'

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const container: Variants | undefined = shouldReduceMotion
    ? undefined
    : { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
  const item: Variants | undefined = shouldReduceMotion
    ? undefined
    : { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } } }

  return (
    <section className="relative overflow-hidden bg-[#fafaf7] border-b border-[#e8e9eb]">
      {/* subtle horizon wash cyclorama raise */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #fafaf7 0%, #f3f4f0 55%, #e8e9eb 100%)', opacity: 0.7 }} />

      {/* top utility bar factory header */}
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 bg-[#1a1d23] text-[#fafaf7] grid place-items-center font-display font-bold tracking-widest text-[12px]">T</div>
          <span className="font-mono text-[11px] tracking-widest uppercase font-semibold text-[#1a1d23]">Terra Platform AI for ITSM</span>
          <span className="hidden sm:inline-flex h-5 items-center gap-1.5 bg-[#1a1d23] text-[#fafaf7] font-mono text-[10px] tracking-widest uppercase px-2 rounded-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" /> Line live
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 font-mono text-[11px] tracking-widest uppercase text-[#8a8f98]">
          <span>ITIL4-aligned</span>
          <span className="h-3 w-px bg-[#e8e9eb]" />
          <span>8 stations</span>
          <span className="h-3 w-px bg-[#e8e9eb]" />
          <span>5 Andon skills</span>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-[1280px] mx-auto px-6 lg:px-8 py-10 lg:py-14 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start"
      >
        {/* Left headline */}
        <div>
          <motion.div variants={item} className="inline-flex items-center gap-2 border border-[#1a1d23] bg-[#fafaf7] px-2.5 py-1 font-mono text-[11px] tracking-widest uppercase font-semibold">
            <span className="h-1.5 w-1.5 bg-[#10b981] rounded-full" />
            Knowledge not product pitch
          </motion.div>

          <motion.h1 variants={item} className="mt-4 font-display font-bold tracking-tight leading-[0.9] text-[#1a1d23]">
            <span className="block text-[42px] lg:text-[64px] uppercase">Terra Platform</span>
            <span className="block text-[42px] lg:text-[64px] uppercase text-[#8a8f98]">AI for ITSM</span>
            <span className="block text-[20px] lg:text-[22px] font-sans font-medium tracking-tight normal-case text-[#3a3f4a] mt-2">What each management does + what AI skills it needs</span>
          </motion.h1>

          <motion.p variants={item} className="mt-4 text-[15px] leading-[1.6] text-[#3a3f4a] max-w-[52ch]">
            8 managements as stations on one line what each does, why it matters, and which AI skill makes it better. Generic ITSM knowledge, no ITIL4 verbatim, no codebase.
          </motion.p>

          <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#journey"
              className="group relative inline-flex items-center gap-3 bg-[#1a1d23] text-[#fafaf7] pl-4 pr-1.5 py-1.5 font-mono text-[11px] tracking-widest uppercase font-semibold"
            >
              <span>Pull cord see line live</span>
              <span className="h-8 w-8 bg-[#facc15] text-[#1a1d23] grid place-items-center">
                <span className="h-3 w-3 border-[1.5px] border-[#1a1d23] rounded-full grid place-items-center">
                  <span className="h-1.5 w-1.5 bg-[#1a1d23] rounded-full" />
                </span>
              </span>
            </a>
            <a href="#skills" className="inline-flex h-[38px] items-center border border-[#1a1d23] bg-[#fafaf7] px-4 font-mono text-[11px] tracking-widest uppercase font-semibold text-[#1a1d23]">
              View 5 Andon skills
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-6 flex items-center gap-3 font-mono text-[11px] tracking-widest uppercase text-[#8a8f98]">
            <span>Incident</span><span>Problem</span><span>Change</span><span>Knowledge</span><span>Request</span><span>Improvement</span>
          </motion.div>
        </div>

        {/* Right Andon status board */}
        <motion.div variants={item} className="lg:pt-2">
          <PulsePreview />
          <div className="mt-3 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[#8a8f98]">
            <span className="h-px flex-1 bg-[#e8e9eb]" />
            <span>Pulse takt 14 days</span>
            <span className="h-px flex-1 bg-[#e8e9eb]" />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom rail connects hero to line */}
      <div className="relative h-[2px] bg-[#1a1d23] max-w-[1280px] mx-auto mx-6 lg:mx-8" />
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8 py-2 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[#8a8f98]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
        <span>Line takt 1 all stations green</span>
        <span className="ml-auto hidden sm:inline">Drag the cord in the next section to cascade</span>
      </div>
    </section>
  )
}
