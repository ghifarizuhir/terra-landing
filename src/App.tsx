import JourneyLoop from './components/JourneyLoop'

export default function App() {
  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-[#fafaf7] text-[#1a1d23]">
      {/* Compact header — 100vh grid needs no large hero scroll */}
      <header className="shrink-0 border-b border-[#1a1d23] bg-[#fafaf7]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-[56px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 bg-[#1a1d23] text-[#fafaf7] grid place-items-center font-display font-bold tracking-widest text-[12px]">T</div>
            <span className="font-mono text-[11px] tracking-widest uppercase font-semibold hidden sm:inline">Terra — AI for ITSM</span>
            <span className="hidden md:inline-flex h-5 items-center bg-[#1a1d23] text-[#fafaf7] font-mono text-[10px] tracking-widest uppercase px-2">Knowledge</span>
          </div>
          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#8a8f98]">
            <span>8 managements</span>
            <span className="h-3 w-px bg-[#e8e9eb]" />
            <span>click a station for detail</span>
            <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 pb-3">
          <h1 className="font-display font-bold tracking-tight uppercase leading-none text-[22px] lg:text-[28px]">
            What each management does <span className="text-[#8a8f98]">+ what AI skill it needs</span>
          </h1>
          <p className="font-mono text-[11px] tracking-widest uppercase text-[#8a8f98] mt-1">Generic ITSM knowledge — no ITIL4 verbatim, no codebase · 100vh dashboard, no scroll</p>
        </div>
        <div className="h-[2px] bg-[#1a1d23]" />
      </header>

      {/* Grid — fills remaining viewport, no page scroll */}
      <main className="flex-1 min-h-0 flex flex-col overflow-hidden max-w-[1280px] w-full mx-auto px-3 lg:px-4 py-3">
        <JourneyLoop />
      </main>

      <footer className="shrink-0 h-[28px] border-t border-[#e8e9eb] bg-[#1a1d23] flex items-center px-6 lg:px-8">
        <span className="font-mono text-[10px] tracking-widest uppercase text-white/60">© 2026 Terra · Knowledge landing — 8 stations, one AI skill each</span>
        <span className="ml-auto hidden sm:inline font-mono text-[10px] tracking-widest uppercase text-white/30">100vh · no scroll · click station</span>
      </footer>
    </div>
  )
}
