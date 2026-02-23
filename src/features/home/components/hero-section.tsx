import { motion } from 'motion/react'
import { Globe } from '../../../components/ui/globe'
import { AuroraText } from '../../../components/ui/aurora-text'
import { NAME, TAGLINE } from '../data'
import { Meteors } from '../../../components/ui/meteors'
import { MorphingText } from '../../../components/ui/morphing-text'

const CHILL_AURORA = ['#67e8f9', '#a5b4fc', '#c4b5fd', '#5eead4']

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center overflow-hidden bg-zinc-950 px-6">
      <div className="absolute inset-0 h-[80%] w-full overflow-hidden z-0">
        <Meteors className="z-0" />
      </div>
      <div className="absolute inset-0 top-1/3 z-10 opacity-60 scale-[1.5]">
        <Globe className="pointer-events-auto" />
      </div>
      <div className="relative z-20 flex flex-col items-center gap-4 text-center mt-24">
        <motion.h1
          className="font-mono text-2xl font-medium tracking-tight sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AuroraText colors={CHILL_AURORA} speed={0.8}>
            {NAME}
          </AuroraText>
        </motion.h1>
        <motion.p
          className="text-sm uppercase tracking-[0.35em] text-slate-400 sm:text-base md:text-lg"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {TAGLINE}
        </motion.p>
      </div>
      <motion.div
          className="mt-[20%] min-h-10 font-mono text-black relative z-20 w-full max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <MorphingText texts={["Hello, World.", "Apa khabar, dunia.", "Bonjour, le monde.", "Hallo, Welt.", "Olá, mundo.", "Ciao, mondo.", "こんにちは、世界。", "안녕하세요, 세계.", "你好，世界。", "مرحبا بالعالم."]} />
          {/* <TypeText /> */}
        </motion.div>
    </section>
  )
}
