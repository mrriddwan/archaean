import { Link } from '@tanstack/react-router'

const SECTIONS = [
  {
    id: 'use',
    title: 'Use of the Website',
    content: [
      'This website is a personal portfolio created to showcase projects, technical work, and professional experience.',
      'Users agree to use the website only for lawful purposes.',
    ],
  },
  {
    id: 'accounts',
    title: 'Accounts',
    content: [
      'Some features of the website may require authentication through third-party providers such as Google or GitHub.',
      'Users are responsible for maintaining the security of their authentication accounts.',
    ],
  },
  {
    id: 'ip',
    title: 'Intellectual Property',
    content: [
      'All content on this website, including projects, code samples, designs, and written material, belongs to the website owner unless otherwise stated.',
      'Users may not reproduce, distribute, or use the content for commercial purposes without permission.',
    ],
  },
  {
    id: 'links',
    title: 'External Links',
    content: [
      'This website may contain links to external websites. The website owner is not responsible for the content or practices of those sites.',
    ],
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    content: [
      'The website is provided "as is" without warranties of any kind. The website owner is not responsible for any damages arising from the use of the website.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to Terms',
    content: [
      'These terms may be updated at any time. Continued use of the website after changes constitutes acceptance of the updated terms.',
    ],
  },
]

export const Terms = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <header className="space-y-4 pb-12">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-400">Last updated: March 9, 2026</p>
          <p className="text-slate-300">
            By accessing or using this website, you agree to the following terms.
          </p>
        </header>

        <main className="space-y-14">
          {SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 space-y-4"
            >
              <h2 className="text-xl font-semibold text-cyan-400/90 sm:text-2xl">
                {section.title}
              </h2>
              <ul className="space-y-3 text-slate-300">
                {section.content.map((paragraph, i) => (
                  <li key={i} className="leading-relaxed">
                    {paragraph}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </main>

        <footer className="mt-16 border-t border-slate-800 pt-8">
          <Link
            to="/"
            className="text-sm text-cyan-400 hover:text-cyan-300 hover:underline"
          >
            ← Back to home
          </Link>
        </footer>
      </div>
    </div>
  )
}

export default Terms
