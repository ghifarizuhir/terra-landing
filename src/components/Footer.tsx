import Mark from './Mark'
import { product } from '../data/product'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-subtle">
      <div className="mx-auto flex max-w-[1140px] flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-brand">
          <Mark className="h-[14px] w-auto" />
          <span className="text-[13px] font-semibold text-ink">Terraline</span>
          <span className="text-[12px] text-muted">— {product.footer.tagline}</span>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-[12px] text-muted" aria-label="Footer">
          <a href="/" className="hover:text-ink">Product</a>
          <a href="/learn" className="hover:text-ink">Learn</a>
          <a href={product.footer.contact} className="hover:text-ink">Contact</a>
          <a
            href={product.footer.planeUrl}
            className="rounded-full border border-border px-2.5 py-1 hover:border-brand hover:text-ink"
          >
            Built on Plane · AGPL-3.0
          </a>
        </nav>
      </div>
    </footer>
  )
}
