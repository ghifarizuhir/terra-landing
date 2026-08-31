export default function Footer() {
  return (
    <footer className="bg-[#1a1d23] text-[#fafaf7] border-t-[6px] border-[#facc15]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 bg-[#facc15] text-[#1a1d23] grid place-items-center font-display font-bold tracking-widest">T</div>
              <span className="font-display text-[15px] font-bold tracking-widest uppercase">Terraline AI for ITSM</span>
              <span className="hidden sm:inline font-mono text-[10px] tracking-widest uppercase bg-white/10 px-2 py-1">What each management does · What AI skill it needs</span>
            </div>
            <h3 className="font-display text-[26px] font-bold tracking-tight uppercase leading-none">Knowledge first. Then augmentation.</h3>
            <p className="mt-2 text-[13px] leading-[1.6] text-white/60 max-w-[52ch]">One Andon line, 8 stations, one AI skill each. Not a product demo a shared understanding of what each management does.</p>
          </div>
          <div className="flex flex-col gap-3 md:items-end md:text-right">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-white/60">
              <span className="h-1.5 w-1.5 bg-[#10b981] rounded-full" />
              Line ready pull when needed
            </div>
            <div className="font-mono text-[11px] leading-[1.6] text-white/40">
              © 2026 Terraline · terraline.space · Knowledge landing no ITIL4 certification claimed
              <br />
              Generic ITSM management knowledge + AI skills
            </div>
          </div>
        </div>

        {/* hazard stripe */}
        <div className="mt-8 h-[6px] w-full" style={{ background: 'repeating-linear-gradient(45deg, #facc15 0 12px, #1a1d23 12px 24px)' }} />
      </div>
    </footer>
  )
}
