export default function EntityGraphProof() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
      <div className="bg-[#1a1d23] text-[#fafaf7] overflow-hidden border border-[#1a1d23]">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-0">
          <div className="p-8">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase bg-[#facc15] text-[#1a1d23] px-2 py-1 font-bold mb-4">
              Underfloor harness
            </div>
            <h2 className="font-display text-[28px] font-bold tracking-tight uppercase leading-none">Anything can link to anything</h2>
            <p className="mt-3 text-[13px] leading-[1.6] text-white/70 max-w-[48ch]">
              <span className="font-mono text-[12px] bg-white text-[#1a1d23] px-1">entity_links</span> with 5 relations — the wiring under the Andon line. Plus comments (edit-tracked, soft-delete), timeline, versions, reviews, attachments. One graph, not silos.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 font-mono text-[11px]">
              {['INC-202501-003 —caused_by→ PRB-202501-001', 'PRB →resolved_by→ CHG-202501-002', 'CHG →relates_to→ KB-202501-010', 'INC —depends_on→ CI-001'].map((e) => (
                <span key={e} className="bg-white text-[#1a1d23] px-2.5 py-1 font-semibold">
                  {e}
                </span>
              ))}
            </div>
          </div>

          {/* wiring diagram */}
          <div className="relative bg-[#0f1115] border-t lg:border-t-0 lg:border-l border-white/10 p-6">
            <div className="font-mono text-[10px] tracking-widest uppercase text-white/40 mb-3">Harness schematic — not to scale</div>
            <svg viewBox="0 0 360 160" className="w-full h-auto">
              {/* nodes */}
              <rect x="20" y="60" width="70" height="28" fill="#fafaf7" stroke="#8a8f98" strokeWidth="0.8" />
              <text x="55" y="77" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fontWeight="600" fill="#1a1d23">INC</text>
              <rect x="115" y="20" width="70" height="28" fill="#fafaf7" stroke="#8a8f98" strokeWidth="0.8" />
              <text x="150" y="37" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fontWeight="600" fill="#1a1d23">PRB</text>
              <rect x="115" y="110" width="70" height="28" fill="#fafaf7" stroke="#8a8f98" strokeWidth="0.8" />
              <text x="150" y="127" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fontWeight="600" fill="#1a1d23">CHG</text>
              <rect x="210" y="60" width="70" height="28" fill="#fafaf7" stroke="#8a8f98" strokeWidth="0.8" />
              <text x="245" y="77" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fontWeight="600" fill="#1a1d23">KB</text>
              <rect x="300" y="60" width="40" height="28" fill="#1a1d23" stroke="#facc15" strokeWidth="1.2" />
              <text x="320" y="77" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#facc15">CI</text>

              {/* wires */}
              <path d="M 90 74 C 105 74, 105 34, 115 34" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
              <path d="M 90 74 C 105 74, 105 124, 115 124" fill="none" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 3" />
              <path d="M 185 34 C 200 34, 200 74, 210 74" fill="none" stroke="#a855f7" strokeWidth="1.2" />
              <path d="M 185 124 C 200 124, 200 74, 210 74" fill="none" stroke="#6366f1" strokeWidth="1.2" />
              <path d="M 280 74 C 290 74, 290 74, 300 74" fill="none" stroke="#10b981" strokeWidth="1.2" />
              {/* labels */}
              <text x="102" y="52" fontFamily="JetBrains Mono" fontSize="5" fill="#f59e0b">caused_by</text>
              <text x="102" y="115" fontFamily="JetBrains Mono" fontSize="5" fill="#ef4444">depends_on</text>
            </svg>
            <div className="mt-3 flex gap-2 font-mono text-[9px] tracking-widest uppercase text-white/40">
              <span>5 relations</span>
              <span className="text-white/20">·</span>
              <span>comments · timeline · versions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
