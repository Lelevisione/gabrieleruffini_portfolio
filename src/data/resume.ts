/**
 * Real content for the Resume window, adapted from LinkedIn into the site's
 * English voice. Kept as data (like projects.ts / caseStudies.ts) so the
 * component underneath stays pure layout.
 */
import { asset } from '../lib/asset'

export interface ResumeEntry {
  period: string
  title: string
  place: string
  meta?: string
  bullets?: string[]
}

export interface CertificationEntry {
  title: string
  issuer: string
  issued: string
  credentialId?: string
}

export const PROFILE = {
  name: 'Gabriele Ruffini',
  role: 'Digital Creative, Visual Design & Social Communication',
  location: 'Tuscany, Italy',
  email: 'gabrieleruffini@icloud.com',
  photo: asset('assets/img/profile/gabriele-ruffini.jpg'),
}

export const EXPERIENCE: ResumeEntry[] = [
  {
    period: '2024 · Present',
    title: 'Museum Host',
    place: 'Randstad Italia',
    meta: 'Part-time · Carrara, Tuscany, Italy · On-site',
    bullets: [
      'Welcomes and assists visitors, keeping every visit smooth and enjoyable.',
      "Supports the creation and publishing of the museum's promotional content.",
    ],
  },
  {
    period: 'Apr 2020 · Present',
    title: 'Freelance Creative',
    place: 'Independent, via Fiverr and direct clients',
    meta: '6+ years · Italy',
    bullets: [
      'An umbrella for a long run of independent visual design and digital content work across many different clients and industries.',
      'Owns the full project lifecycle solo, from the client brief through final delivery.',
    ],
  },
  {
    period: '2022 · 2023',
    title: 'Social Media Manager',
    place: 'STOPS.it, events & communication',
    meta: 'Full-time · Camaiore, Tuscany, Italy · On-site',
    bullets: [
      "Ran the company's B2B and B2C social channels and planned the editorial calendar.",
      'Concepted and designed visual content, posts, stories, banners and newsletters, all kept on brand.',
    ],
  },
  {
    period: '2020',
    title: 'Graphic Design Intern',
    place: 'Votre, Contemporary Spaces',
    meta: 'Internship · Carrara, Tuscany, Italy · On-site',
    bullets: ['Supported the design of promotional material, posters and brochures, for contemporary art exhibitions.'],
  },
]

export const EDUCATION: ResumeEntry[] = [
  {
    period: '2024 · 2026',
    title: "Master's Degree, Digital Humanities",
    place: 'University of Pisa',
    bullets: [
      'Digital Humanities is where technical rigor and design sensibility stop being a contradiction: the program built a genuinely double profile.',
    ],
  },
  {
    period: '2024',
    title: "Bachelor's Degree, Cultural Heritage Studies (Art History)",
    place: 'Civiltà e Forme del Sapere, University of Pisa',
    bullets: [
      'A thesis on the history of graphic design and the social role of the commercial arts built an aesthetic compass reaching from Mucha to Rand, from Olivetti to punk.',
    ],
  },
]

export const CERTIFICATIONS: CertificationEntry[] = [
  { title: 'Claude Code in Action', issuer: 'Anthropic', issued: 'Jun 2026', credentialId: 'ycjbyfueopvd' },
  {
    title: 'Web Communication and Digital Marketing',
    issuer: 'University of Milano-Bicocca',
    issued: 'Aug 2022',
    credentialId: 'bPbJSsmSx1',
  },
  {
    title: 'NSW Government: Marketing & Communication',
    issuer: 'Forage',
    issued: 'Dec 2025',
    credentialId: 'ZLJF7FnTTJXHZDqs6',
  },
  {
    title: 'BCG: Strategy & Experience Design',
    issuer: 'Forage',
    issued: 'Sep 2025',
    credentialId: 'DpPQzLLXF23bizT5T',
  },
]

export const VOLUNTEERING: ResumeEntry[] = [
  {
    period: 'Mar 2026 · Present',
    title: 'Graphic Designer & Social Media',
    place: 'WordPress Pisa Meetup',
    meta: 'Science & Technology',
    bullets: ['Designing and rolling out a gradual rebrand to give the meetup a clear, recognizable visual identity.'],
  },
  {
    period: 'Apr 2021 · Apr 2022',
    title: 'Theatre & Communication Lab Volunteer',
    place: 'Servizio Civile Nazionale, Universal Civil Service',
    meta: '1 year 1 month · Civil Rights & Social Action',
    bullets: [
      'Took part in a project for children from economically disadvantaged families, running educational and recreational activities and leading a theatre lab.',
    ],
  },
  {
    period: '',
    title: 'Volunteer',
    place: 'WordCamp Pisa',
    meta: 'Science & Technology',
  },
]

export const SKILLS: string[] = [
  'Figma',
  'Adobe Creative Cloud',
  'InDesign',
  'Blender',
  'Unity',
  'HTML/CSS',
  'React',
  'Web Design',
  'Social Media Strategy',
  'Content Strategy',
  'Media Planning',
  'GIS',
]

export const LANGUAGES: { name: string; level: string }[] = [
  { name: 'Italian', level: 'Native' },
  { name: 'English', level: 'Fluent' },
]
