import { motion } from 'motion/react'
import { AuroraText } from '../../../components/ui/aurora-text'
import { PROJECTS } from '../data'
import { Particles } from '../../../components/ui/particles'

const CHILL_AURORA = ['#67e8f9', '#a5b4fc', '#5eead4']

export function ProjectsSection() {
  return (
    <section className="relative grid not-only-of-type:border-b border-slate-700/50 bg-zinc-900 px-4 py-20 sm:px-6 sm:py-28 md:px-8 md:py-32">
      <div className="absolute inset-0 overflow-hidden z-10 [grid-area:1/1]">
        <Particles size={0.5} quantity={1000} staticity={100} ease={100} color="#facc15" className="absolute inset-0 min-h-full min-w-full" vx={0.5} vy={0} />
      </div>
      <div className="relative z-20 mx-auto max-w-4xl [grid-area:1/1]">
        <motion.h2
          className="mb-12 font-mono text-sm uppercase tracking-[0.3em] text-slate-500 sm:mb-14 sm:text-base"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-80px', amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <AuroraText colors={CHILL_AURORA} className="text-slate-400">
            Projects
          </AuroraText>
        </motion.h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PROJECTS.map((project, i) => (
            <motion.li
              key={project.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-40px', amount: 0.2 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded border border-slate-600/60 bg-zinc-800/80 p-5 transition-colors hover:border-slate-500 hover:bg-zinc-800 sm:p-6 h-full"
                >
                  <p className="font-medium text-slate-200 text-base sm:text-lg">{project.name}</p>
                  <p className="mt-1 text-sm text-slate-500 sm:text-base">{project.period}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
                    {project.description}
                  </p>
                  <p className="mt-2 font-mono text-xs text-slate-500 sm:text-sm">
                    {project.tech}
                  </p>
                </a>
              ) : (
                <div className="block rounded border border-slate-600/60 bg-zinc-800/80 p-5 sm:p-6 h-full">
                  <p className="font-medium text-slate-200 text-base sm:text-lg">{project.name}</p>
                  <p className="mt-1 text-sm text-slate-500 sm:text-base">{project.period}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
                    {project.description}
                  </p>
                  <p className="mt-2 font-mono text-xs text-slate-500 sm:text-sm">
                    {project.tech}
                  </p>
                </div>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
