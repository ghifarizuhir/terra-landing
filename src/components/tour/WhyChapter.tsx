import { motion } from 'motion/react'
import { product } from '../../data/product'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Props = { reduced: boolean }

export default function WhyChapter({ reduced }: Props) {
  return (
    <section className="relative z-10 flex min-h-0 flex-1 flex-col justify-center gap-6 overflow-y-auto px-5 py-8 lg:col-span-2 lg:row-start-1 lg:gap-8 lg:px-14 lg:py-12">
      <motion.header
        initial={{ opacity: 0, y: reduced ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.18em] text-brand">10</span>
          <span className="h-px w-6 bg-brand/50" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">Why Terraline</span>
        </div>
        <h2 className="mt-4 max-w-[24ch] font-display text-[clamp(32px,3.4vw,54px)] leading-[1.0] tracking-[-0.012em] text-ink">
          A service layer on a proven delivery core
        </h2>
        <p className="mt-4 max-w-[76ch] text-[14px] leading-relaxed text-muted lg:text-[15px]">
          {product.architecture.body}
        </p>
      </motion.header>

      <div className="grid gap-4 lg:grid-cols-2">
        {product.comparisons.map((card, index) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduced ? 0 : 0.12 + index * 0.1, duration: reduced ? 0 : 0.6, ease: EASE }}
            className="relative rounded-xl border border-border bg-panel/60 p-5 lg:p-7"
          >
            <span className="absolute left-5 top-0 h-px w-10 bg-brand/60" />
            <h3 className="font-display text-[23px] leading-tight text-ink lg:text-[26px]">{card.title}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{card.body}</p>
            <ul className="mt-5 space-y-2.5">
              {card.points.map((point) => (
                <li key={point} className="flex gap-3 text-[13.5px] leading-snug text-ink/85">
                  <span className="mt-[5px] font-mono text-[11px] leading-none text-brand">+</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 0.34, duration: reduced ? 0 : 0.6 }}
        className="flex flex-wrap items-center gap-x-3 gap-y-2"
      >
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">Stack</span>
        {product.architecture.facts.map((fact) => (
          <span
            key={fact}
            className="rounded-full border border-border px-3 py-1 font-mono text-[10.5px] tracking-[0.08em] text-ink/80"
          >
            {fact}
          </span>
        ))}
      </motion.div>
    </section>
  )
}
