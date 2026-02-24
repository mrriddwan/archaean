import { motion } from 'motion/react'
import { AuroraText } from '../../../components/ui/aurora-text'
import {
  SKILLS_FRONTEND,
  SKILLS_BACKEND,
  SKILLS_DEPLOYMENT_DEVOPS,
} from '../data'
import { FlickeringGrid } from '../../../components/ui/flickering-grid'

const CHILL_AURORA = ['#67e8f9', '#a5b4fc', '#5eead4']

const skillCategory = [
  { title: 'Frontend', skills: SKILLS_FRONTEND },
  { title: 'Backend', skills: SKILLS_BACKEND },
  { title: 'Deployment / DevOps', skills: SKILLS_DEPLOYMENT_DEVOPS },
]

export function SkillsSection() {
  return (
    <section className="relative border-b border-slate-700/50 bg-zinc-950 px-4 py-20 sm:px-6 sm:py-28 md:py-32">
      <div className="bg-transparent absolute inset-0 h-full w-full overflow-hidden z-10">
        <FlickeringGrid
          className="absolute inset-0 z-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
          height={1000}
          width={2000}
        />
      </div>
      <div className="relative mx-auto max-w-3xl">
        <motion.h2
          className="mb-12 font-mono text-sm uppercase tracking-[0.3em] text-slate-500 sm:mb-14 sm:text-base"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-80px', amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <AuroraText colors={CHILL_AURORA} className="text-slate-400">
            Skills
          </AuroraText>
        </motion.h2>
        <div className="space-y-10 sm:space-y-12 md:space-y-14">
          {skillCategory.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-40px', amount: 0.2 }}
              transition={{ duration: 0.35, delay: catIndex * 0.05 }}
              className="relative z-20"
            >
              <h3 className="mb-4 font-mono text-base font-medium text-slate-400 sm:text-lg">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="rounded border border-slate-600/60 bg-zinc-800/80 px-3 py-2 font-mono text-sm text-slate-300 sm:px-4 sm:py-2 sm:text-base"
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.25, delay: i * 0.02 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
