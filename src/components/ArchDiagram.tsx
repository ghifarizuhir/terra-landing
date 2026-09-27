import { product } from '../data/product'

export default function ArchDiagram() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
      <div className="rounded-lg border border-border bg-subtle p-4">
        <svg
          viewBox="0 0 960 280"
          className="w-full"
          role="img"
          aria-label="Architecture: browser SPA, Rust API, Postgres, Redis Stream and a live collaboration server"
        >
          <rect x="30" y="40" width="220" height="70" rx="8" fill="#ffffff" stroke="#e2e6ee" />
          <text x="140" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0b1220">Browser SPA</text>
          <text x="140" y="92" textAnchor="middle" fontSize="11" fill="#5b6472">React 19 · React Router</text>

          <rect x="330" y="40" width="240" height="70" rx="8" fill="#ffffff" stroke="#e2e6ee" />
          <text x="450" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0b1220">Rust API (Axum)</text>
          <text x="450" y="92" textAnchor="middle" fontSize="11" fill="#5b6472">REST + token auth</text>

          <rect x="660" y="20" width="250" height="60" rx="8" fill="#ffffff" stroke="#e2e6ee" />
          <text x="785" y="46" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0b1220">Postgres</text>
          <text x="785" y="64" textAnchor="middle" fontSize="11" fill="#5b6472">per-table model</text>

          <rect x="660" y="100" width="250" height="60" rx="8" fill="#ffffff" stroke="#e2e6ee" />
          <text x="785" y="126" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0b1220">Redis Stream</text>
          <text x="785" y="144" textAnchor="middle" fontSize="11" fill="#5b6472">background jobs</text>

          <rect x="330" y="180" width="240" height="70" rx="8" fill="#eef3ff" stroke="#bcd0f7" />
          <text x="450" y="212" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0b1220">Live server</text>
          <text x="450" y="232" textAnchor="middle" fontSize="11" fill="#5b6472">Yjs collaboration</text>

          <path d="M250 75 H330" stroke="#5b6472" strokeDasharray="4 4" />
          <text x="290" y="66" textAnchor="middle" fontSize="10" fill="#5b6472">HTTPS</text>
          <path d="M570 60 H660" stroke="#5b6472" strokeDasharray="4 4" />
          <text x="615" y="52" textAnchor="middle" fontSize="10" fill="#5b6472">SQL</text>
          <path d="M570 85 H660 V120" stroke="#5b6472" strokeDasharray="4 4" fill="none" />
          <text x="630" y="112" textAnchor="middle" fontSize="10" fill="#5b6472">jobs</text>
          <path d="M140 110 V215 H330" stroke="#5b6472" strokeDasharray="4 4" fill="none" />
          <text x="212" y="207" textAnchor="middle" fontSize="10" fill="#5b6472">WebSocket</text>
        </svg>
      </div>
      <div>
        <p className="text-[14px] leading-[1.7] text-muted">{product.architecture.body}</p>
        <ul className="mt-4 space-y-2">
          {product.architecture.facts.map((fact) => (
            <li key={fact} className="flex items-center gap-2 font-mono text-[12px] text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
