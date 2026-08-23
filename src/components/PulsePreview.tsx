export default function PulsePreview() {
  const stations = [
    { id: 'INC', label: 'INCIDENT', count: '12', lamp: '#ef4444', state: 'pull' },
    { id: 'PRB', label: 'PROBLEM', count: '03', lamp: '#a855f7', state: 'hold' },
    { id: 'CHG', label: 'CHANGE', count: '07', lamp: '#f59e0b', state: 'warn' },
    { id: 'KB', label: 'KNOWLEDGE', count: '24', lamp: '#6366f1', state: 'green' },
  ]
  return (
    <div className="bg-[#1a1d23] text-[#fafaf7] border border-[#1a1d23] overflow-hidden">
      {/* board header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <span className="font-mono text-[11px] tracking-widest uppercase font-semibold">Andon Board — Station Status</span>
        <span className="font-mono text-[10px] tracking-widest uppercase bg-[#facc15] text-[#1a1d23] px-1.5 py-0.5 font-bold">Takt live</span>
      </div>

      {/* station row */}
      <div className="grid grid-cols-4 gap-px bg-white/10 p-px">
        {stations.map((s) => (
          <div key={s.id} className="bg-[#1a1d23] p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="h-2 w-2 rounded-full" style={{ background: s.lamp, boxShadow: `0 0 8px ${s.lamp}` }} />
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/60">{s.label}</span>
            </div>
            <div className="font-mono text-[22px] leading-none font-semibold tracking-tight">{s.count}</div>
            <div className="font-mono text-[10px] tracking-widest uppercase" style={{ color: s.lamp }}>{s.state}</div>
          </div>
        ))}
      </div>

      {/* takt strip — 14 days as andon ticks */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[10px] tracking-widest uppercase text-white/50">14-day takt</span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-white/50">56 slots</span>
        </div>
        <div className="grid grid-cols-14 gap-[3px]">
          {Array.from({ length: 56 }).map((_, i) => {
            const v = Math.random()
            const bg = v > 0.85 ? '#ef4444' : v > 0.6 ? '#f59e0b' : v > 0.2 ? '#10b981' : '#2a2f3a'
            return <div key={i} className="h-[7px] rounded-[1px]" style={{ background: bg, opacity: v > 0.2 ? 1 : 0.4 }} />
          })}
        </div>
      </div>

      {/* advisor call */}
      <div className="mx-3 mb-3 flex items-start gap-2 bg-[#facc15] text-[#1a1d23] px-3 py-2">
        <span className="mt-0.5 h-4 w-4 bg-[#1a1d23] text-[#facc15] grid place-items-center font-mono text-[10px] leading-none">!</span>
        <div>
          <div className="font-mono text-[11px] tracking-widest uppercase font-bold leading-none">Andon Call</div>
          <div className="text-[12px] leading-[1.4] font-medium">3 incidents without KB link → create runbook at KB station</div>
        </div>
      </div>
    </div>
  )
}
