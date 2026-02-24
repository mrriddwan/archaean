import { motion } from 'motion/react'
import { AuroraText } from '../../../components/ui/aurora-text'
import { EXPERIENCE } from '../data'
import { LightRays } from '../../../components/ui/light-rays'

const CHILL_AURORA = ['#67e8f9', '#a5b4fc', '#5eead4']

export function ExperienceSection() {
  return (
    <section className="relative border-b border-slate-700/50 bg-zinc-950 px-4 py-20 sm:px-6 sm:py-28 md:px-8 md:py-32">
      <div
        className="absolute inset-0 overflow-hidden z-10"
        style={{ top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
      >
        <LightRays
          length="100%"
          className="absolute inset-0 size-full"
          style={{ width: '100%', height: '100%' }}
          count={10}
          // color="rgba(250, 204, 21, 0.2)"
        />
      </div>
      <div className="relative z-20 mx-auto max-w-3xl">
        <motion.h2
          className="mb-12 font-mono text-sm uppercase tracking-[0.3em] text-slate-500 sm:mb-14 sm:text-base"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-80px', amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <AuroraText colors={CHILL_AURORA} className="text-slate-400">
            Experience
          </AuroraText>
        </motion.h2>
        <ul className="space-y-12 sm:space-y-14">
          {EXPERIENCE.map((job, i) => (
            <motion.li
              key={`${job.company}-${job.period}`}
              className="relative border-l-2 border-slate-600/60 pl-6 sm:pl-8"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: '-60px', amount: 0.2 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <span className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-cyan-400/80" />
              <p className="font-medium text-slate-200 text-base sm:text-lg">{job.role}</p>
              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                {job.company} · {job.period}
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300 sm:text-base">
                {job.points.map((point, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-slate-500">—</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
