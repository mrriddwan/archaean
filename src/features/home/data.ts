export const NAME = import.meta.env.VITE_USER_NAME
export const TAGLINE = import.meta.env.VITE_USER_TAGLINE
export const LOCATION = import.meta.env.VITE_USER_LOCATION
export const EMAIL = import.meta.env.VITE_USER_EMAIL
export const PHONE = import.meta.env.VITE_USER_PHONE
export const LINKEDIN_URL = import.meta.env.VITE_USER_LINKEDIN_URL
export const GITHUB_URL = import.meta.env.VITE_USER_GITHUB_URL

export const CONTACT_ITEMS = [
  {
    href: `mailto:${EMAIL}`,
    label: 'Email',
    type: 'mail' as const,
    external: false,
  },
  {
    href: `tel:${PHONE.replace(/\s/g, '')}`,
    label: 'Phone',
    type: 'phone' as const,
    external: false,
  },
  {
    href: LINKEDIN_URL,
    label: 'LinkedIn',
    type: 'linkedin' as const,
    external: true,
  },
  {
    href: GITHUB_URL,
    label: 'GitHub',
    type: 'github' as const,
    external: true,
  },
]

export const ABOUT =
  'Innovative Full Stack Developer with 3 years of experience in managing complex government projects and developing robust full-stack solutions, 6-year background in manufacturing, with strong attention to detail, workflow understanding, and a practical approach to development.'

export const EXPERIENCE = [
  {
    role: 'Front End Developer',
    company: 'UQPAY Sdn Bhd',
    period: 'Aug 2025 – Feb 2026',
    points: [
      'Develop new features for existing business systems',
      'Maintained and debugged financial systems',
      'Developed company website for card, solution and banking modules',
    ],
  },
  {
    role: 'Front End Developer',
    company: 'Infra Systems Technology Sdn Bhd',
    period: 'Feb 2025 – Jul 2025',
    points: [
      'Developed company website using Nuxt.js',
      'Conducted testing for company e-hailing app',
      'Deployed website via GoDaddy cPanel',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'RF Infinite Sdn Bhd',
    period: 'Feb 2023 – Jan 2025',
    points: [
      'Led government project: requirements, workshops, front end and backend',
      'Developed RESTful APIs for Pcari app (services, invitations, gigs)',
      'Maintained and enhanced government projects per client requests',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Bluedale Integrated Sdn Bhd',
    period: 'Aug 2022 – Jan 2023',
    points: [
      'Solo-built internal CRM for client contact and history in under three months',
      'Developed front end from user requirements; integrated backend for marketing and sales tracking',
    ],
  },
]

export const PROJECTS = [
  {
    name: 'Technical Demo: Marketplace (Backend)',
    description: 'Marketplace with JWT/OAuth, roles and permissions, Zod validation, Prisma + Postgres.',
    tech: 'Express, Prisma, Zod, Postgres',
    href: `${import.meta.env.VITE_WEB_URL}/marketplace`,
    period: 'Dec 2025 - Present',
  },
  {
    name: 'UQPAY Website + UQPAY Merchant Portal + UQPAY Admin Account Centre Portal',
    description: 'Website for UQPAY Sdn Bhd',
    tech: 'Next.js, Tailwind CSS, TypeScript',
    href: 'https://uqpay.com',
    period: 'Aug 2025 - Feb 2026',
  },
  {
    name: 'Republisys Website',
    description: 'Frontend with Nuxt.js from Figma; Firestore for Contact/Subscribe; deployed on cPanel.',
    tech: 'Nuxt.js, Firestore',
    href: 'https://republisys.com',
    period: 'Mar 2025 - Apr 2025',
  },
  {
    name: 'Government Project A',
    description: 'Nation-wide ordering, inventory and admin system; DB with 100+ MySQL tables; multi-user roles.',
    tech: 'Laravel, MySQL, Next.js',
    href: null,
    period: 'Jan 2024 - Jan 2025',
  },
  {
    name: 'Pcari Gigs',
    description: 'Backend modules: services, KYC, reports; order flow, CRON, Billplz; admin dashboard.',
    tech: 'Laravel, MySQL',
    href: null,
    period: 'Mar 2023 - Jun 2023',
  },
  {
    name: 'Bluedale Integrated CRM',
    description: 'CRM for Bluedale Integrated Sdn Bhd',
    tech: 'Vue.js, Tailwind CSS, Laravel',
    href: null,
    period: 'Aug 2022 - Jan 2023',
  },
]

export const SKILLS_FRONTEND = [
  'Next.js',
  'React.js',
  'Vue.js',
  'Nuxt.js',
  'Zustand',
  'Chakra UI',
  'Tailwind CSS',
  'Figma',
]

export const SKILLS_BACKEND = [
  'Node.js',
  'Express.js',
  'Prisma',
  'Laravel',
  'MySQL',
  'WordPress API',
]

export const SKILLS_DEPLOYMENT_DEVOPS = ['cPanel', 'GoDaddy', 'Git', 'Docker', 'CI/CD', 'AWS', 'GCP']
