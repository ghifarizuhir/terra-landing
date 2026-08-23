export default function PulsePreview() {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-lg border-zinc-200 w-full max-w-md">
      <div className="text-xs font-semibold text-zinc-500 mb-2">Pulse Dashboard — 14-day activity</div>
      <div className="grid grid-cols-4 gap-2 mb-3">
        {['INC 12','PRB 3','CHG 7','KB 24'].map(v => (
          <div key={v} className="bg-zinc-900 text-white text-xs font-mono rounded-lg p-2 text-center">{v}</div>
        ))}
      </div>
      <div className="grid grid-cols-14 gap-1">
        {Array.from({length: 56}).map((_,i) => (
          <div key={i} className="h-3 rounded-sm" style={{background: `rgba(16,185,129,${0.15 + Math.random()*0.7})`}} />
        ))}
      </div>
      <div className="mt-3 text-[11px] bg-amber-50 border border-amber-200 rounded-lg p-2 text-amber-800">AI Advisor: 3 incidents without KB link → create runbook</div>
    </div>
  )
}
