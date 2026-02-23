import { motion } from 'motion/react'
import { Mail, Phone, Linkedin, Github } from 'lucide-react'
import { Dock, DockIcon } from '../../../components/ui/dock'
import { AnimatedGradientText } from '../../../components/ui/animated-gradient-text'
import { CONTACT_ITEMS } from '../data'

const ICON_MAP = {
  mail: Mail,
  phone: Phone,
  linkedin: Linkedin,
  github: Github,
} as const

export function ContactSection() {
  return (
    <section className="bg-zinc-900 px-4 py-20 sm:px-6 sm:py-28 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <motion.h2
          className="mb-12 font-mono text-sm uppercase tracking-[0.3em] sm:mb-14 sm:text-base"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-80px', amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <AnimatedGradientText
            colorFrom="#67e8f9"
            colorTo="#a5b4fc"
            className="text-slate-400"
          >
            Contact
          </AnimatedGradientText>
        </motion.h2>
        <motion.div
          className="flex flex-col items-center gap-8 sm:gap-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: '-40px', amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex flex-col items-center gap-6">
            <Dock
              className="border-slate-600/60 bg-slate-800 backdrop-blur-md"
              iconSize={44}
              iconMagnification={56}
              iconDistance={120}
            >
              {CONTACT_ITEMS.map((item) => {
                const Icon = ICON_MAP[item.type]
                return (
                  <DockIcon key={item.type}>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      aria-label={item.label}
                      className="flex size-full items-center justify-center rounded-full text-white transition-colors hover:bg-slate-600/40 hover:text-cyan-300"
                    >
                      <Icon className="size-5 sm:size-6 text-white" />
                    </a>
                  </DockIcon>
                )
              })}
            </Dock>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {CONTACT_ITEMS.map((item) => (
                <a
                  key={item.type}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="text-sm font-medium sm:text-base"
                >
                  <AnimatedGradientText
                    colorFrom="#67e8f9"
                    colorTo="#a5b4fc"
                    speed={0.8}
                    className="hover:opacity-90"
                  >
                    {item.label}
                  </AnimatedGradientText>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
