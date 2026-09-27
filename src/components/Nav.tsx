import Mark from './Mark'
import { product } from '../data/product'

const links = [
  { href: '#product', label: 'Product' },
  { href: '#why', label: 'Why Terraline' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '/learn', label: 'Learn' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1140px] items-center justify-between px-5">
        <a href="/" className="flex items-center gap-2 text-brand">
          <Mark className="h-[14px] w-auto" />
          <span className="text-[15px] font-semibold tracking-tight text-ink">Terraline</span>
        </a>
        <nav className="hidden items-center gap-6 text-[13px] text-muted md:flex" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={product.cta.href}
          className="rounded-md bg-brand-strong px-3.5 py-2 text-[13px] font-medium text-white hover:bg-[#2450c8]"
        >
          Request access
        </a>
      </div>
    </header>
  )
}
