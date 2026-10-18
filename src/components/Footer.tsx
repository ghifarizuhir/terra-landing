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
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto grid w-full gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.3fr_0.7fr_0.7fr] md:py-[72px] lg:px-16">
        <div>
          <a href="/" className="inline-flex items-center gap-2.5 text-white">
            <Mark className="h-[16px] w-auto text-white" />
            <span className="font-display text-[17px] font-medium tracking-[-0.02em]">Terraline</span>
          </a>
          <p className="mt-3 max-w-[34ch] text-[13px] leading-[1.6] text-neutral-400">{product.footer.tagline}</p>
          <p className="mt-5 font-mono text-[10px] text-neutral-400">Built on Plane · AGPL-3.0</p>
        </div>
        <nav className="flex flex-col items-start gap-2.5 text-[13px] text-neutral-300" aria-label="Product links">
          <span className="mb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500">Product</span>
          <a href="#product" className="hover:text-white">Product tour</a>
          <a href="#platform" className="hover:text-white">Platform</a>
          <a href="#roadmap" className="hover:text-white">Roadmap</a>
        </nav>
        <nav className="flex flex-col items-start gap-2.5 text-[13px] text-neutral-300" aria-label="Resources and contact">
          <span className="mb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500">Resources</span>
          <a href="/learn" className="hover:text-white">Learn</a>
          <a href={product.footer.contact} className="hover:text-white">Contact</a>
          <a href={product.footer.planeUrl} className="hover:text-white">Plane</a>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full flex-col gap-2 px-5 py-5 font-mono text-[10px] text-neutral-500 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-16">
          <span>© 2026 Terraline, Inc</span>
          <span>Open-source IT service management</span>
        </div>
      </div>
    </footer>
  )
}
