import Mark from './Mark'
import { product } from '../data/product'

type Props = { variant?: 'default' | 'landing' }

export default function Footer({ variant = 'default' }: Props) {
  if (variant === 'default') {
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

  return (
    <footer className="border-t border-[#e6eaf0] bg-white">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-5 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="flex items-center gap-2 text-brand">
            <Mark className="h-[14px] w-auto" />
            <span className="font-display text-[14px] font-semibold tracking-[-0.04em] text-[#202a38]">Terraline</span>
          </span>
          <span className="hidden h-4 w-px bg-[#dce2ea] sm:block" />
          <span className="text-[11px] text-[#657080]">{product.footer.tagline}</span>
        </div>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[11px] text-[#687483]" aria-label="Footer">
          <a href="/" className="transition-colors hover:text-[#172232]">Product</a>
          <a href="/learn" className="transition-colors hover:text-[#172232]">Learn</a>
          <a href={product.footer.contact} className="transition-colors hover:text-[#172232]">Contact</a>
          <a
            href={product.footer.planeUrl}
            className="rounded-full border border-[#e0e5ed] px-3 py-1.5 transition-colors hover:border-brand hover:text-[#172232]"
          >
            Built on Plane · AGPL-3.0
          </a>
        </nav>
      </div>
    </footer>
  )
}
