import { defaultSkills } from '../data/managements'
import { Sparkles, Plus } from 'lucide-react'

export default function SkillsSection() {
  return (
    <section id="skills" className="mx-auto w-full px-5 py-12 sm:px-8 md:py-16 lg:px-16">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">Augmentation layer</p>
          <h2 className="mt-2 font-display text-[28px] font-medium leading-tight tracking-[-0.03em] text-black sm:text-[32px]">
            AI skills per management
          </h2>
          <p className="mt-2 max-w-[64ch] text-[13px] leading-[1.65] text-neutral-600">
            Each management can be supported by a focused skill, attached to a specific stage. Knowledge first, then augmentation.
          </p>
        </div>
        <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> AI-assisted
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {defaultSkills.map((s) => (
          <article key={s.name} className="rounded-[16px] border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-300 hover:bg-neutral-50/60">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-neutral-950 text-white">
                <Sparkles className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
              </span>
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-neutral-900">{s.name}</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-400">{s.entityType} · {s.reviewType}</div>
            <div className="mt-3 border-t border-neutral-100 pt-3 text-[12px] leading-[1.6] text-neutral-600">
              When to use this skill and what good looks like at this stage.
            </div>
          </article>
        ))}
        <article className="flex flex-col justify-center rounded-[16px] border border-dashed border-neutral-300 bg-neutral-50/60 p-5">
          <div className="mb-2 flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-neutral-200 bg-white text-neutral-700">
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-neutral-800">Create a custom skill</span>
          </div>
          <p className="text-[12px] leading-[1.6] text-neutral-500">Define when it triggers and what it checks. A skill can reflect the standard work your team follows.</p>
        </article>
      </div>
    </section>
  )
}
