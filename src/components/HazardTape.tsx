type Props = {
  variant?: 'rail' | 'thin'
  className?: string
}

export default function HazardTape({ variant = 'rail', className = '' }: Props) {
  if (variant === 'thin') {
    return (
      <div className={`h-[6px] bg-[#1a1a1a] border-y border-black/10 flex items-center gap-[14px] overflow-hidden shrink-0 ${className}`} aria-hidden>
        {Array.from({ length: 48 }).map((_, i) => (
          <span
            key={i}
            className="h-[6px] w-[18px] bg-[#FAFF00] -skew-x-12 shrink-0"
            style={{ opacity: i % 3 === 0 ? 1 : 0.35 }}
          />
        ))}
      </div>
    )
  }
  // rail variant: andon-style 28px bar + tape
  return (
    <div className={`overflow-hidden rounded-none border-y border-black/5 ${className}`} aria-hidden>
      <div className="h-[28px] bg-[#141414] border-b border-white/10 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#FAFF00] shadow-[0_0_8px_rgba(250,255,0,0.6)] animate-pulse" />
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-white/60 hidden sm:inline">Terraline line live</span>
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-white/40 sm:hidden">Line live</span>
        </div>
        <span className="font-mono text-[10px] tracking-widest uppercase text-white/20 hidden sm:inline">AI proposes · humans confirm</span>
      </div>
      <div className="h-[6px] bg-[#1a1a1a] flex items-center gap-[14px] overflow-hidden">
        {Array.from({ length: 48 }).map((_, i) => (
          <span
            key={i}
            className="h-[6px] w-[18px] bg-[#FAFF00] -skew-x-12 shrink-0"
            style={{ opacity: i % 3 === 0 ? 1 : 0.35 }}
          />
        ))}
      </div>
    </div>
  )
}

export function DottedRule({ className = '' }: { className?: string }) {
  return <div className={`h-px w-full border-t border-dashed border-[#1a1d23]/12 ${className}`} aria-hidden />
}

export function DottedDivider({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 font-mono text-[11px] text-[#999] ${className}`} aria-hidden>
      <span className="h-px flex-1 border-t border-dashed border-[#1a1d23]/12" />
      {children && <span className="shrink-0 px-1">{children}</span>}
      <span className="h-px flex-1 border-t border-dashed border-[#1a1d23]/12" />
    </div>
  )
}
