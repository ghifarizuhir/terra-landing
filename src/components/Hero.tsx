import { motion, useReducedMotion } from 'framer-motion'
import PulsePreview from './PulsePreview'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.section
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true }}
      variants={shouldReduceMotion ? undefined : container}
      className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center"
    >
      <motion.div variants={shouldReduceMotion ? undefined : container} className="flex flex-col">
        <motion.div variants={shouldReduceMotion ? undefined : item} className="inline-flex items-center gap-2 text-xs font-mono bg-zinc-900 text-white px-3 py-1 rounded-full mb-4 w-fit">TERRA — AI for ITSM</motion.div>
        <motion.h1 variants={shouldReduceMotion ? undefined : item} className="text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 mb-3">One Graph, Not Silos</motion.h1>
        <motion.p variants={shouldReduceMotion ? undefined : item} className="text-lg text-zinc-600 mb-6">8 managements, one entity graph, AI skills for every step. ITIL4-aligned, built for operators.</motion.p>
        <motion.div variants={shouldReduceMotion ? undefined : item} className="flex gap-3">
          <a href="#journey" className="bg-zinc-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium">Explore Journey</a>
          <a href="#skills" className="border border-zinc-300 px-5 py-2.5 rounded-xl text-sm font-medium">View Skills</a>
        </motion.div>
      </motion.div>
      <motion.div variants={shouldReduceMotion ? undefined : item}>
        <PulsePreview />
      </motion.div>
    </motion.section>
  )
}
