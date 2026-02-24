import { motion } from 'motion/react'
import { HeroSection } from './components/hero-section'
import { AboutSection } from './components/about-section'
import { ExperienceSection } from './components/experience-section'
import { ProjectsSection } from './components/projects-section'
import { SkillsSection } from './components/skills-section'
import { ContactSection } from './components/contact-section'

export const Home = () => {
  return (
    <motion.main
      className="min-h-screen bg-zinc-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </motion.main>
  )
}
