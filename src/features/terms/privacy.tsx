import { Link } from '@tanstack/react-router'

const SECTIONS = [
  {
    id: 'collect',
    title: 'Information We Collect',
    content: [
      'When you use this website, the following information may be collected:',
      'Basic profile information provided by third-party authentication providers (such as name, email address, and profile image)',
      'Information necessary to authenticate your account',
      'Technical information such as IP address, browser type, and usage data',
    ],
  },
  {
    id: 'auth',
    title: 'Third-Party Authentication',
    content: [
      'This website may allow users to sign in using third-party authentication providers such as Google or GitHub.',
      'When you sign in using these services, we may receive limited profile information from the provider, such as: name, email address, and profile picture. This information is used solely for authentication and account identification.',
    ],
  },
  {
    id: 'use',
    title: 'How We Use Your Information',
    content: [
      'The collected information is used to: authenticate users, maintain secure access to the website, and improve the functionality and security of the site.',
      'We do not sell, trade, or rent personal information to third parties.',
    ],
  },
  {
    id: 'security',
    title: 'Data Security',
    content: [
      'Reasonable measures are taken to protect your information from unauthorized access or disclosure.',
    ],
  },
  {
    id: 'retention',
    title: 'Data Retention',
    content: [
      'User information is retained only as long as necessary to operate the website or comply with legal obligations.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    content: [
      'This Privacy Policy may be updated from time to time. Updates will be reflected on this page with a revised date.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    content: [
      'If you have any questions about this Privacy Policy, you may contact the website owner through the contact information provided on the website.',
    ],
  },
]

export const Privacy = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <header className="space-y-4 pb-12">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400">Last updated: March 9, 2026</p>
          <p className="text-slate-300">
            This Privacy Policy explains how information is collected, used, and
            protected when you use this website.
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

export default Privacy
