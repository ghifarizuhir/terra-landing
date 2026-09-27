const items = [
  {
    title: 'Comments & activity',
    body: 'Each record keeps the conversation and the change trail: who moved it, when, and why.',
  },
  {
    title: 'Versions',
    body: 'Descriptions keep their history, so an edit never erases the original wording.',
  },
  {
    title: 'Linked records',
    body: 'Related work stays one hop away: the fix links to the problem, the problem to the knowledge article.',
  },
]

export default function Traceability() {
  return (
    <section id="traceability" className="max-w-[1100px] mx-auto w-full px-6 py-10">
      <div className="rounded-lg border border-[#eaeaea] overflow-hidden">
        <div className="px-6 py-5 border-b border-dashed border-[#1a1d23]/12 bg-[#fafafa]">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#999]">Traceability</div>
          <h2 className="font-display font-semibold text-[20px] tracking-[-0.01em] mt-1">Why records stay trustworthy</h2>
        </div>
        <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-dashed divide-[#1a1d23]/12 sm:divide-[#eaeaea]">
          {items.map((item) => (
            <div key={item.title} className="p-6">
              <h3 className="font-semibold text-[14px] tracking-[-0.01em]">{item.title}</h3>
              <p className="text-[13px] leading-[1.6] text-[#666] mt-2">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
