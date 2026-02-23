import { motion } from 'motion/react'
import { AuroraText } from '../../../components/ui/aurora-text'
import { ABOUT } from '../data'

const CHILL_AURORA = ['#67e8f9', '#a5b4fc', '#5eead4']

export function AboutSection() {
  return (
    <section className="border-b border-slate-700/50 bg-zinc-900 px-4 py-20 sm:px-6 sm:py-28 md:px-8 md:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          className="mb-8 font-mono text-sm uppercase tracking-[0.3em] text-slate-500 sm:mb-10 sm:text-base"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-80px', amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <AuroraText colors={CHILL_AURORA} className="text-slate-400">
            About
          </AuroraText>
        </motion.h2>
        <motion.p
          className="text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-80px', amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
          {ABOUT}
        </motion.p>
      </div>
    </section>
  )
}
