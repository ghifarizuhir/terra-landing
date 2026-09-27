import { motion } from 'motion/react'
import { ArrowUpRight, Check } from 'lucide-react'
import { product } from '../../data/product'
import Mark from '../Mark'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Props = { reduced: boolean }

export default function NextChapter({ reduced }: Props) {
  return (
    <section className="relative z-10 flex min-h-0 flex-1 flex-col justify-center gap-6 overflow-y-auto px-5 py-8 lg:col-span-2 lg:row-start-1 lg:gap-7 lg:px-14 lg:py-12">
      <motion.header
        initial={{ opacity: 0, y: reduced ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.18em] text-brand">11</span>
          <span className="h-px w-6 bg-brand/50" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">Roadmap</span>
        </div>
        <h2 className="mt-4 font-display text-[clamp(32px,3.4vw,54px)] leading-[1.0] tracking-[-0.012em] text-ink">
          Shipped today, next in line
        </h2>
      </motion.header>

      <div className="grid gap-4 lg:grid-cols-2">
        <motion.article
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.1, duration: reduced ? 0 : 0.6, ease: EASE }}
          className="relative rounded-xl border border-border bg-panel/60 p-5 lg:p-7"
        >
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">Shipped today</h3>
          </div>
          <ul className="mt-5 space-y-3">
            {product.roadmap.shipped.map((item) => (
              <li key={item} className="flex gap-3 text-[13.5px] leading-snug text-ink/85">
                <Check className="mt-[2px] h-3.5 w-3.5 shrink-0 text-brand" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.2, duration: reduced ? 0 : 0.6, ease: EASE }}
          className="relative rounded-xl border border-border bg-panel/60 p-5 lg:p-7"
        >
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-muted" />
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">Next</h3>
          </div>
          <ul className="mt-5 space-y-3">
            {product.roadmap.next.map((item) => (
              <li key={item} className="flex gap-3 text-[13.5px] leading-snug text-muted">
                <ArrowUpRight className="mt-[2px] h-3.5 w-3.5 shrink-0 text-muted" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.article>
      </div>

      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0 : 0.3, duration: reduced ? 0 : 0.6, ease: EASE }}
        className="flex flex-col gap-5 rounded-xl border border-border bg-panel/60 p-5 lg:flex-row lg:items-center lg:justify-between lg:p-8"
      >
        <div>
          <h3 className="font-display text-[clamp(25px,2.3vw,36px)] leading-tight text-ink">{product.cta.title}</h3>
          <p className="mt-2 max-w-[52ch] text-[13.5px] leading-relaxed text-muted">{product.cta.body}</p>
        </div>
        <a
          href={product.cta.href}
          className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-strong px-6 text-[14px] font-medium text-white transition-colors hover:bg-brand"
        >
          {product.cta.label}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </motion.div>

      <footer className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border/60 pt-5 font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">
        <span className="flex items-center gap-2 text-ink/85">
          <Mark className="h-3 w-auto text-brand" />
          Terraline
        </span>
        <span>AGPL-3.0</span>
        <a href={product.footer.planeUrl} className="transition-colors hover:text-ink">
          Built on Plane
        </a>
        <a href="/learn" className="transition-colors hover:text-ink">
          Learn
        </a>
        <a href={product.footer.contact} className="transition-colors hover:text-ink">
          support@terraline.space
        </a>
        <span className="ml-auto hidden lg:block">Open-source IT service management</span>
      </footer>
    </section>
  )
}
