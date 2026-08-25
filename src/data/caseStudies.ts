/**
 * Full case-study content for the external /projects/:id pages. Separate from
 * projects.ts on purpose: that file feeds the small in-app summary card and
 * stays short by design, this one is meant to be long. A project with no
 * entry here still gets a page: ProjectCaseStudy falls back to the summary
 * data with a "full write-up coming soon" notice instead of 404ing.
 */

export interface CaseStudyStep {
  /** Basename of a pixelarticons SVG in public/assets/icons/pixelart/. */
  icon: string
  title: string
  text: string
}

export interface CaseStudySection {
  heading: string
  intro?: string
  /** Small labelled facts, e.g. "20 / Standard Answers". */
  stats?: { value: string; label: string }[]
  /** Icon + title + text cards, e.g. the four Experience steps. */
  items?: CaseStudyStep[]
  /** Closing paragraph(s) for the section. */
  paragraphs?: string[]
}

export interface CaseStudy {
  /** Small category line above the title, e.g. "UI/UX · MOTION DESIGN · DEVELOPMENT". */
  eyebrow: string
  tagline: string
  subtagline?: string
  /** Role / Duration / Type / Platform: only set when the source page had its
   *  own meta box. Omitted entries fall back to the project's Year / Role. */
  meta?: { label: string; value: string }[]
  sections: CaseStudySection[]
  quote: { text: string; attribution: string; coda?: string }
  /** Renders the hero title in the site's rainbow gradient instead of a flat
   *  glow. Reserved for a couple of the more playful, viral projects. */
  rainbow?: boolean
  /** Extra screenshots shown as a strip below the main cover image, filenames
   *  under public/assets/img/projects/. The cover itself (id.png) is separate. */
  gallery?: string[]
  /** An embedded documentary/process video, shown below the gallery strip.
   *  orientation defaults to landscape; set 'portrait' for vertical/social-
   *  format footage so the frame doesn't letterbox it down to a sliver. */
  video?: { provider: 'vimeo'; id: string; orientation?: 'portrait' }
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  // ======================================================================
  // UI/UX & Web Design
  // ======================================================================
  'oracle-webapp': {
    eyebrow: 'UI/UX · MOTION DESIGN · DEVELOPMENT',
    tagline: 'Transforming the simple Magic 8-Ball mechanic into a cinematic ritual wrapped in purple hues.',
    subtagline: 'Where UX meets wonder: a 10-second utility transformed into a two-minute ritual.',
    meta: [
      { label: 'Role', value: 'UI/UX, Motion & Dev' },
      { label: 'Duration', value: '2 Weeks' },
      { label: 'Type', value: 'Solo Side Project' },
      { label: 'Platform', value: 'iOS Web App' },
    ],
    sections: [
      {
        heading: 'The Experience',
        intro: 'A choreographed four-step sequence, attraction to revelation, built to feel both mystical and satisfying.',
        items: [
          { icon: 'sparkles', title: '1. Attraction', text: 'A soft gradient and floating particles draw the eye toward the luminous crystal sphere at the center.' },
          { icon: 'message', title: '2. Question', text: 'Tapping the orb lifts a glass-effect button, and a modal slides up with heavy haptic feedback: a single thump.' },
          { icon: 'zap', title: '3. Revelation', text: 'The question dissolves into shimmering mist; the sphere pulses three times and explodes into a 360° particle trail.' },
          { icon: 'sticky-note-text', title: '4. Answer', text: 'A parchment-style card fades in, revealing your mystical fortune with cinematic flair.' },
        ],
      },
      {
        heading: 'Visual Language',
        intro: 'Every pixel crafted to evoke mysticism through colour, typography, lighting, and motion.',
        items: [
          { icon: 'colors-swatch', title: 'Colour Alchemy', text: 'Deep radial purple (#1A0B2E to #4C1D95) backdrop, aurora accents (#C084FC), and prophetic gold (#FBBF24).' },
          { icon: 'text-cursor', title: 'Typography', text: 'Cinzel Decorative for mystical titles, Inter for maximum body readability.' },
          { icon: 'lightbulb', title: 'Lighting System', text: 'A 3-layer glow simulates glass refraction: 25% white inner, 45% purple outer, 70% violet edge.' },
          { icon: 'move', title: 'Motion Physics', text: 'Custom curves running at 60fps, particle physics with 0.35 drag for a "magnetic" feel, and a 12% screen flash on rare hits.' },
        ],
      },
      {
        heading: 'Micro-interactions & Feedback',
        intro: 'Tactile details that make the digital feel physical and delightfully responsive.',
        items: [
          { icon: 'target', title: 'Touch Ripple', text: 'The ripple originates from the exact finger coordinates, reinforcing direct manipulation.' },
          { icon: 'vibrate', title: 'Haptic Feedback', text: 'A light tap on touch and a medium impact on revelation, for tactile satisfaction.' },
          { icon: 'audio-waveform', title: 'Audio Layer', text: 'A gentle wind loop plus a crystalline F♯6 ping, synced to peak luminosity (optional).' },
          { icon: 'square-alert', title: 'Playful Error', text: 'An empty question makes the sphere shake ±4px and tint magenta, skipping the usual alert box entirely.' },
        ],
      },
      {
        heading: 'Gamified Rarity System',
        intro: 'A 2% "Golden Prophecy" creates a jackpot moment that users can\'t help but share.',
        stats: [
          { value: '20', label: 'Standard Answers' },
          { value: '2%', label: 'Golden Prophecy' },
          { value: '1.5×', label: 'Jackpot Effect' },
          { value: 'Viral', label: 'Auto Share' },
        ],
        paragraphs: [
          'When the ultra-rare 2% Golden Prophecy hits, the entire palette shifts to amber, particles turn gold, a crown emoji appears, and confetti bursts across the screen. The share panel opens automatically, built to get shared.',
        ],
      },
      {
        heading: 'Accessibility & Inclusivity',
        intro: 'Mysticism for everyone, built with WCAG 2.2 AA compliance and thoughtful inclusive design.',
        items: [
          { icon: 'check-double', title: 'WCAG 2.2 AA', text: 'Purple background and white text achieve a 7.2:1 contrast ratio.' },
          { icon: 'zap-off', title: 'Reduce Motion', text: 'The system setting replaces the particle explosion with a gentle cross-fade.' },
          { icon: 'mic', title: 'VoiceOver', text: 'Every interactive node is labelled; the modal announces "Write your question" on focus.' },
          { icon: 'text-align-right', title: 'RTL Support', text: 'A mirrored layout for Arabic and Hebrew, tested and functional.' },
        ],
      },
      {
        heading: 'Technical Performance',
        intro: 'Cinematic visuals without compromising speed: gradients and glows are generated via code.',
        stats: [
          { value: '6.3 MB', label: 'Total App Size' },
          { value: '<150 KB', label: 'Image Assets' },
          { value: '60 FPS', label: 'Motion Smoothness' },
          { value: '0ms', label: 'Network Latency' },
        ],
        paragraphs: [
          'A stateless generation engine based on timestamp microseconds delivers instant responses with zero network calls, and every visual effect renders in real time at 60fps.',
        ],
      },
      {
        heading: 'Future Iterations',
        intro: "Next-level experiences to expand The Oracle's mystical universe.",
        items: [
          { icon: 'watch', title: 'Apple Watch Companion', text: "Rotate the digital crown to \"charge\" the sphere's energy before revelation." },
          { icon: 'camera', title: 'AR Mode', text: 'Place the crystal on a real table; a particle fountain cascades onto the room floor.' },
          { icon: 'globe', title: 'Localization Pipeline', text: 'EN, ES, JP, HI, plus dynamic lunar-calendar-based responses.' },
        ],
      },
    ],
    quote: {
      text: 'By wrapping a simple random text generator in cinematic visuals, tactile feedback, and a 2% jackpot moment, The Oracle transforms a 10-second utility into a 2-minute ritual users genuinely feel.',
      attribution: 'Design philosophy',
      coda: "The best UX feels like wonder.",
    },
    gallery: ['oracle-webapp-question.png', 'oracle-webapp-answer.png', 'oracle-webapp-history.png'],
  },

  'cooking-python': {
    eyebrow: 'UI/UX DESIGN · PYTHON · TKINTER',
    tagline: 'A desktop app for managing a home pantry, built to prove that even tkinter can hold a genuinely playful interface.',
    subtagline: 'Object-oriented Python meets a cooking-game aesthetic.',
    sections: [
      {
        heading: 'The Project',
        intro: 'A desktop GUI for tracking a household pantry: what recipes are actually makeable with what you have on hand.',
        items: [
          { icon: 'box', title: 'Pantry Tracking', text: 'A visual, intuitive interface for monitoring household food stock.' },
          { icon: 'sticky-note-text', title: 'Recipe Feasibility', text: 'Checks whether a recipe can be made with the ingredients currently in stock.' },
          { icon: 'zap', title: 'Automatic Calculations', text: 'Cost and calorie counts computed automatically, in real time.' },
        ],
      },
      {
        heading: 'Custom Illustrated Icon Set',
        intro: 'Every recipe and ingredient gets its own hand-styled icon, in a soft, cartoon style that nods to Cooking Mama and the Nintendo DS era.',
        items: [
          { icon: 'colors-swatch', title: 'Consistent Style', text: 'Soft lines and vivid colour across every single icon in the set.' },
          { icon: 'eye', title: 'Instant Recognition', text: 'Every element reads clearly even at the small sizes used in the interface.' },
          { icon: 'sparkles', title: 'Personality', text: 'The illustrations turn a plain pantry tracker into a playful, characterful app.' },
        ],
      },
      {
        heading: 'Design System',
        intro: 'Built on centralised constants rather than scattered hardcoded values, so the interface stays consistent as it grows.',
        items: [
          { icon: 'blocks', title: 'Centralized Style Class', text: 'One shared palette, typography and widget style, referenced everywhere instead of repeated.' },
          { icon: 'shield', title: 'Fallback & Resilience', text: 'Filename normalisation, path checks, and automatic fallbacks mean missing assets never crash the app.' },
          { icon: 'star', title: 'Playful Branding', text: "A cartoon chef logo that immediately signals the app's light-hearted character." },
        ],
      },
      {
        heading: 'UX & Accessibility',
        intro: 'The interface is built to guide the user without instructions, keeping the pantry list in view at all times.',
        items: [
          { icon: 'zap', title: 'Instant Feedback', text: 'Every selection and action gets an immediate, clear response.' },
          { icon: 'target', title: 'Smart Selection', text: 'Selected recipe cards are visually highlighted with a colour change.' },
          { icon: 'grid-3x3', title: 'Progressive Disclosure', text: 'An ordered grid keeps only the essential details visible on each card.' },
          { icon: 'move', title: 'Keyboard Accessibility', text: 'Focus is managed carefully so the app is fully navigable from the keyboard.' },
        ],
      },
    ],
    quote: {
      text: 'A visually coherent, accessible experience, built inside the real constraints of tkinter.',
      attribution: 'Project takeaway',
    },
    gallery: ['cooking-python-icons.png', 'cooking-python-overview.png', 'cooking-python-ux.png'],
  },

  'shopping-app': {
    eyebrow: 'MOBILE UI/UX DESIGN',
    tagline: 'When shopping becomes a visual experience.',
    subtagline: 'A homepage built as editorial composition, not a product grid.',
    meta: [
      { label: 'Client', value: 'Personal Project' },
      { label: 'Role', value: 'UI/UX Designer' },
      { label: 'Tools', value: 'Figma' },
    ],
    sections: [
      {
        heading: 'Design Vision',
        intro: 'Built entirely in Figma, the interface treats editorial content, promotions and personalised suggestions as one coherent, readable space.',
        items: [
          { icon: 'grid-3x3', title: 'Visual Hierarchy', text: "Immersive visual blocks guide the eye naturally, reducing decision friction." },
          { icon: 'move', title: 'Fluid Navigation', text: 'Light, engaging scrolling turns exploration into something spontaneous.' },
          { icon: 'book-open', title: 'Micro-Narrative', text: 'Every element builds a small visual story of discovery, desire and immediacy.' },
        ],
      },
      {
        heading: 'Key Features',
        intro: 'The design balances promotional content, personalisation and clear navigation without overwhelming the user.',
        items: [
          { icon: 'target', title: 'Persistent Search', text: 'Always accessible, for goal-oriented browsing that never interrupts the flow.' },
          { icon: 'eye', title: 'Visual Touchpoints', text: 'Large visual elements built for quick scanning and low cognitive load.' },
          { icon: 'move', title: 'Bottom Navigation', text: 'Core areas stay one tap away, without breaking the sense of exploration.' },
          { icon: 'gift', title: 'Promotional Banners', text: 'Editorial banners introduce context and urgency where it matters.' },
          { icon: 'shopping-bag', title: 'Product Clusters', text: 'Curated groupings that encourage discovery and impulse browsing.' },
          { icon: 'grid-3x3', title: 'Consistent Spacing', text: 'A visual rhythm that keeps readability steady across varying content densities.' },
        ],
      },
      {
        heading: 'The Experience',
        intro: 'Familiar elements, like persistent search and bottom navigation, sit alongside a more expressive, editorial composition.',
        paragraphs: [
          'The result is a digital environment that builds a visual micro-narrative of discovery, desire and immediacy. Prototyped entirely in Figma, the design explores how editorial composition and familiar mobile patterns can support both impulse browsing and intentional product search.',
        ],
      },
    ],
    quote: {
      text: 'Transforming the act of scrolling into a light and engaging experience.',
      attribution: 'Design note',
    },
    gallery: ['shopping-app-flow.png'],
  },

  'di-cosa-parla': {
    eyebrow: 'UX/UI DESIGN · USER RESEARCH · INFORMATION ARCHITECTURE',
    tagline: 'A compass in the sea of content: a webapp for discovering trending pop culture, built for passionate communities.',
    subtagline: 'Built around the question people actually ask: what is it about?',
    sections: [
      {
        heading: 'Three Users, Three Needs',
        intro: 'Three researched personas, each pulling the product in a different direction.',
        items: [
          { icon: 'eye', title: 'Luca, 22', text: 'Fears being left out of conversations. Needs the plot and the hot topics in thirty seconds, not critical depth.' },
          { icon: 'heart', title: 'Cristina, 24', text: 'Loves cinema but has no one to talk to about it. Wants a stage to write reviews and be heard.' },
          { icon: 'shield', title: 'Gianni, 35', text: 'A time-poor parent who needs ratings and clear synopses to judge content in seconds, not minutes.' },
        ],
      },
      {
        heading: 'Dual Design Strategy',
        intro: "The product's own name works as an SEO hook, intercepting the exact question people search for.",
        items: [
          { icon: 'globe', title: 'Attract', text: 'SEO-led queries bring in quick-answer seekers, served instantly with summaries, ratings and genre info.' },
          { icon: 'message', title: 'Engage', text: 'Once hooked, the UI nudges toward reviews, votes and comments, turning visitors into community members.' },
        ],
      },
      {
        heading: 'Two Views, One Platform',
        intro: 'A rigorous task model translated into a dual-view interface.',
        items: [
          { icon: 'book-open', title: 'Editorial View', text: 'Clean and hierarchical: title, genre, synopsis, ratings, with nothing else competing for attention.' },
          { icon: 'comment-text', title: 'Community View', text: 'Warm and dynamic, built for reviews, star ratings and debate, with room for infinite scrolling.' },
        ],
      },
    ],
    quote: {
      text: "Di Cosa Parla? demonstrates that a good interface speaks different languages to different users. It unites the coldness of data with the vitality of the social, solving with a single tool the anxiety of not knowing and the desire to share.",
      attribution: 'Outcome',
      coda: 'One platform. Multiple voices. Infinite conversations.',
    },
    gallery: ['di-cosa-parla-wireframe.png'],
  },

  'cosmic-insights': {
    eyebrow: 'UI/UX DESIGN · WEB APP · MYSTICAL EXPERIENCE',
    tagline: 'Unveil the mysteries of the universe through digital tarot divination.',
    subtagline: 'Where ancient wisdom meets modern technology.',
    sections: [
      {
        heading: 'Three Paths to Enlightenment',
        intro: 'Three divination modes, each suited to a different kind of question.',
        items: [
          { icon: 'calendar-range', title: 'Past, Present, Future', text: "Traces the line from where you've been to where you're headed." },
          { icon: 'star', title: 'Single Card Extraction', text: 'Direct cosmic guidance for one immediate question.' },
          { icon: 'heart', title: 'Relationship Reading', text: 'Explores the energies between Me, Us, and Them.' },
        ],
      },
      {
        heading: 'The Experience',
        intro: 'Mysticism designed to be carried in your pocket, and returned to daily.',
        items: [
          { icon: 'eye', title: 'Personalized Insights', text: 'Every reading is interpreted uniquely against the question asked.' },
          { icon: 'move', title: 'Intuitive Interface', text: 'Every step of the reading flows straight into the next, no menus to fight.' },
          { icon: 'moon', title: 'Daily Guidance', text: 'A reason to return each day for fresh cosmic wisdom.' },
        ],
      },
      {
        heading: 'The Arcana',
        intro: 'Built around the full deck.',
        paragraphs: [
          'All 22 Major Arcana cards are illustrated and interpreted individually, from The Fool\'s new beginnings to Judgement\'s rebirth, giving every reading real symbolic depth rather than generic fortune-cookie text.',
        ],
      },
    ],
    quote: {
      text: 'Your destiny awaits: step into the mystical realm and discover what the universe has in store for you.',
      attribution: 'In-app copy',
    },
    gallery: ['cosmic-insights-reading.png', 'cosmic-insights-mobile.png'],
  },

  'valentine-app': {
    eyebrow: 'UI/UX DESIGN · WEB APP · VIRAL PROJECT',
    tagline: 'A playful way to ask your Valentine.',
    subtagline: 'From personal project to viral sensation, simple, shareable, and surprisingly viral.',
    meta: [
      { label: 'Role', value: 'UI/UX Design' },
      { label: 'Type', value: 'Personal Project' },
      { label: 'Reach', value: '160K+ Views' },
      { label: 'Platform', value: 'Web App' },
    ],
    rainbow: true,
    sections: [
      {
        heading: 'The Concept',
        intro: 'A brilliantly simple idea: personalise a request, pick a cute animal, share it with your crush.',
        items: [
          { icon: 'heart', title: 'Personal & Playful', text: "A name, a sweet message and a charming animal avatar, chosen in seconds." },
          { icon: 'share', title: 'Instant Sharing', text: 'A unique link, shareable anywhere: WhatsApp, Instagram, TikTok.' },
          { icon: 'sparkles', title: 'Unexpectedly Viral', text: 'What began as a fun experiment exploded on TikTok with over 160,000 views.' },
        ],
      },
      {
        heading: 'How It Works',
        items: [
          { icon: 'text-cursor', title: 'Personalize Your Request', text: "Enter a name and craft the message. The interface stays clean and gets out of the way." },
          { icon: 'star', title: 'Choose Your Avatar', text: 'Dog, panda, fox, rabbit or cat: each one adds its own personality.' },
          { icon: 'link', title: 'Generate & Share', text: 'One click creates a unique link, ready for the recipient.' },
          { icon: 'zap', title: 'The Playful Twist', text: 'A "No" click gets a playful nudge to reconsider, the detail everyone shared.' },
        ],
      },
      {
        heading: 'Viral Success',
        stats: [
          { value: '160K+', label: 'TikTok Views' },
          { value: '0', label: 'Sign-ups Required' },
          { value: '1-click', label: 'Link Sharing' },
        ],
        paragraphs: [
          'No downloads, no complicated steps: just pure, simple sharing. The result was organic viral growth driven entirely by people sharing their own personalised requests.',
        ],
      },
    ],
    quote: {
      text: 'What started as a simple tool to ask someone out became a viral sensation with over 160,000 views on TikTok.',
      attribution: 'How it spread',
    },
    gallery: ['valentine-app-form.png', 'valentine-app-share.png'],
  },

  // ======================================================================
  // Graphic Design
  // ======================================================================
  'corti-brillanti': {
    eyebrow: 'GRAPHIC DESIGN · VISUAL IDENTITY · THEATER',
    tagline: 'A theatrical poster that transforms stage brilliance into a household cleaning metaphor.',
    subtagline: 'I Postumi Teatro: actors always more shining.',
    sections: [
      {
        heading: 'The Ironic Concept',
        intro: "A deliberately literal reading of the show's own title.",
        items: [
          { icon: 'text-cursor', title: 'Ironic Literality', text: '"Brilliant" and "shining", usually about acting quality, taken at face value instead.' },
          { icon: 'spray-wave', title: 'Visual Metaphor', text: 'The adjectives become a metaphor for household cleaning and detergent.' },
          { icon: 'zap', title: 'Explosion of Freshness', text: 'Theater becomes a sanitising action: a vortex of clean, brilliant energy.' },
        ],
      },
      {
        heading: 'The Spray Bottle: Heart of the Design',
        intro: 'The focal element that turns theatrical brilliance into a visual experience.',
        items: [
          { icon: 'box', title: 'The Custom Bottle', text: "An illustrated spray bottle with a custom label, the composition's trigger." },
          { icon: 'spray-wave', title: 'The Dynamic Spray', text: 'The actors themselves are projected out of the nozzle, protagonists of the effervescence.' },
          { icon: 'star', title: 'Visual Energy', text: 'A 3D pop-up effect that captures the eye at a glance.' },
        ],
      },
      {
        heading: 'Visual Language',
        intro: 'Four pillars that define the identity.',
        items: [
          { icon: 'blocks', title: 'Cut-Out Aesthetic', text: 'Digital collage with sharp white borders, recalling fanzine culture.' },
          { icon: 'grid-3x3', title: 'Halftone Texture', text: 'A retina pattern unifying the photography with a raw, independent-print feel.' },
          { icon: 'text-cursor', title: 'Playful Typography', text: 'Hand-drawn lettering in bold primary colours: cyan, magenta, yellow, green.' },
          { icon: 'colors-swatch', title: 'Chromatic Contrast', text: 'A deep blue background lets the white central explosion and saturated text pop.' },
        ],
      },
    ],
    quote: {
      text: 'Theater becomes a sanitizing action, an explosion of scenic freshness.',
      attribution: 'Visual concept',
    },
  },

  'graphic-design-ebook': {
    eyebrow: 'GRAPHIC DESIGN · EDITORIAL DESIGN',
    tagline: 'An interactive eBook that changes its own visual language chapter by chapter.',
    subtagline: 'Cronache del Segno: a small history of graphic design.',
    sections: [
      {
        heading: 'A Visual Metamorphosis',
        intro: "Built for a Digital Publishing course at the University of Pisa, developed from a bachelor's thesis. The book is a chameleon, reflecting each era's spirit through its own layout.",
        items: [
          { icon: 'leaf', title: 'Arts & Crafts, 1880 to 1910', text: 'William Morris. Intricate nature-inspired patterns and humanist type, celebrating craft.' },
          { icon: 'grid-3x3', title: 'Bauhaus & Swiss Style, 1920 to 1960', text: 'Josef Müller-Brockmann. A rigid grid, white space as protagonist, geometric rigour.' },
          { icon: 'blocks', title: 'Post-Modernism, 1980 to 2000', text: 'Paula Scher. Controlled chaos, bold typographic overlays, rules broken on purpose.' },
          { icon: 'zap', title: 'Digital Age, 2000 to today', text: 'Beeple. Acid colours, digital glitches, and the aesthetic of technological imperfection.' },
        ],
      },
      {
        heading: 'Technique & Interactivity',
        stats: [
          { value: 'EPUB 3', label: 'Fixed Layout' },
          { value: '100%', label: 'Interactive' },
          { value: '4+', label: 'Unique Layouts' },
        ],
        paragraphs: [
          'A navigable timeline lets the reader tap specific years to reveal contextual detail, turning the reading itself into an act of discovery rather than passive scrolling.',
        ],
      },
    ],
    quote: {
      text: 'This project is a manifesto of my method: uniting academic research with visual experimentation.',
      attribution: 'Design note',
    },
    gallery: [
      'graphic-design-ebook-halftone.png',
      'graphic-design-ebook-bauhaus.png',
      'graphic-design-ebook-mullerbrockmann.png',
      'graphic-design-ebook-digitalage.png',
    ],
  },

  'psicologa': {
    eyebrow: 'GRAPHIC DESIGN · BRANDING · SOCIAL MEDIA STRATEGY',
    tagline: 'The art of untangling the soul: a visual identity that translates the invisible.',
    subtagline: 'A brand built for Dr. Camilla Ruffini, life-cycle psychologist, as a promise of welcome and transformation.',
    sections: [
      {
        heading: 'The Mark',
        intro: 'The Greek letter Psi, fused with a more intimate story.',
        items: [
          { icon: 'heart', title: 'The Thread', text: 'The inner tangle a patient carries into a session, ready to be unravelled with care.' },
          { icon: 'shield', title: 'The Cocoon', text: 'The protected space where the crysalis precedes rebirth and transformation.' },
          { icon: 'star', title: 'The Psi Letter', text: "Psychology's ancestral symbol, the thread wound around it." },
        ],
      },
      {
        heading: 'Colour Palette',
        intro: 'A colour language that avoids clinical coldness in favour of warmth and welcome.',
        stats: [
          { value: '#D4A5C4', label: 'Rose Quartz' },
          { value: '#A8C7E0', label: 'Serene Blue' },
          { value: '#9B8BA6', label: 'Soft Lavender' },
        ],
      },
      {
        heading: 'Cinema as a Mirror',
        intro: 'Digital communication needed a bridge for complex subjects, and cinema, always a great examiner of the human soul, became the tool.',
        paragraphs: [
          'Educational carousels and evocative reels turn the feed into an emotional screening room. One example: a carousel on accepting Sadness, built around the characters of Inside Out, letting film archetypes make abstract psychological concepts tangible.',
        ],
      },
    ],
    quote: {
      text: 'The characters we love become archetypes, mirrors to recognise ourselves in, breaking down the barriers of mistrust and opening the door to deep, accessible psychological outreach.',
      attribution: 'Visual concept',
    },
    gallery: ['psicologa-logo-dark.png', 'psicologa-card-flat.png', 'psicologa-carousel.png'],
  },

  'la-casina-bb': {
    eyebrow: 'GRAPHIC DESIGN · BRAND IDENTITY · HOSPITALITY',
    tagline: 'A visual identity built to feel as warm and hand-crafted as the place itself.',
    sections: [
      {
        heading: 'Brand Essence',
        intro: 'A moodboard built from Tuscan landscape, architecture, nature and local craft.',
        items: [
          { icon: 'colors-swatch', title: 'Authentic Warmth', text: 'A warm palette evoking Tuscan light and its local architecture.' },
          { icon: 'heart', title: 'Welcome', text: 'An organic, hand-crafted design language that reads as familiarity and care.' },
          { icon: 'map-pin', title: 'Territory', text: "A pictogram integrating Tuscany's own silhouette, honouring local authenticity." },
        ],
      },
      {
        heading: 'Colour Palette',
        stats: [
          { value: '#F5E6D3', label: 'Delicate Beige' },
          { value: '#F2CC8F', label: 'Warm Cream' },
          { value: '#E07A5F', label: 'Burnt Orange' },
          { value: '#81B29A', label: 'Tuscan Green' },
          { value: '#3D5A80', label: 'Bright Blue' },
        ],
      },
      {
        heading: 'Touchpoints',
        intro: 'The identity travels through print and digital alike, before, during and after the stay.',
        items: [
          { icon: 'sticky-note-text', title: 'Welcome Poster', text: 'A travel-scrapbook aesthetic: fragmented layout, photography, blocks of colour.' },
          { icon: 'book-open', title: 'House-Rules Booklet', text: "An informal, readable guide built around the brand's own colour and icon system." },
          { icon: 'globe', title: 'Website', text: 'A clear, welcoming digital interface with an airy, carefully calibrated grid.' },
          { icon: 'map-pin', title: "Wander's Guide", text: 'A personalised travel guide, meant as a real companion for the stay.' },
        ],
      },
    ],
    quote: {
      text: "A mark that unites simplicity and visual storytelling, able to convey the true essence of La Casina through every detail.",
      attribution: 'Design note',
    },
    gallery: [
      'la-casina-bb-variants.png',
      'la-casina-bb-poster.png',
      'la-casina-bb-website.png',
      'la-casina-bb-merch.png',
    ],
  },

  'per-il-tuo-bene': {
    eyebrow: 'GRAPHIC DESIGN · THEATER BRANDING · COMMUNICATION',
    tagline: 'Translating dramaturgy into visual identity.',
    subtagline: 'Designing for theater means giving visual form to the invisible: tension, ambiguity, and a narrative promise held in a single mark.',
    sections: [
      {
        heading: 'Logo, Not Title',
        intro: "For \"Per il tuo Bene\", staged by I Postumi Teatro at Teatro Sant'Andrea in Pisa, the choice was radical: build a real logo rather than simply setting the title in type.",
        items: [
          { icon: 'box', title: 'The Suitcase Symbol', text: 'Speaks directly to students away from home: returning is baggage that always weighs heavy.' },
          { icon: 'zap', title: 'Visual Dramaturgy', text: "The performance's tension and ambiguity, translated into a single graphic identity." },
          { icon: 'star', title: 'A Distinctive Mark', text: 'Strong enough to work with equal force on paper and across digital spaces.' },
        ],
      },
      {
        heading: "A Child's Gaze",
        intro: 'The social strategy flips the drama\'s perspective, filtering the family through a disarming, childlike eye.',
        items: [
          { icon: 'sparkles', title: 'Childlike Aesthetic', text: 'Visual design based on imperfect, hand-drawn lines and animation.' },
          { icon: 'zap', title: 'Emotional Contrast', text: 'The apparent innocence amplifies the tensions of the text by contrast.' },
          { icon: 'heart', title: 'Tender and Unsettling', text: 'Reveals the hypocrisy hidden behind the phrase "for your own good".' },
        ],
      },
    ],
    quote: {
      text: 'The mark works as a narrative promise in its own right.',
      attribution: 'Design note',
    },
    gallery: ['per-il-tuo-bene-poster-square.png', 'per-il-tuo-bene-cast.png'],
    video: { provider: 'vimeo', id: '1167864764', orientation: 'portrait' },
  },

  alveare: {
    eyebrow: 'GRAPHIC DESIGN · SOCIAL MEDIA · BRANDING',
    tagline: 'Architecture of thought: a community that nurtures the future.',
    subtagline: 'A shared identity for three National Civil Service projects supporting disadvantaged children.',
    sections: [
      {
        heading: 'The Beehive Metaphor',
        intro: 'The beehive stood for perfect cooperation: many different cells, working toward one shared goal.',
        items: [
          { icon: 'blocks', title: 'Cooperation', text: 'Many different cells, all working toward a single common objective.' },
          { icon: 'shield', title: 'Care', text: 'A busy community that protects and nurtures the future, just as volunteers care for children.' },
          { icon: 'heart', title: 'Solidarity', text: 'Three separate projects, united behind one shared front for children.' },
        ],
      },
      {
        heading: 'Design & Mediation',
        intro: 'The brief required heavy institutional text, balanced against a design that had to stay light and empathetic.',
        paragraphs: [
          'Budget ruled out an external hexagonal die-cut, so that geometry moved inside the layout grid instead, keeping order without losing the metaphor. Honey-gold textures, requested by the client, soften the density of the copy and add warmth to an otherwise text-heavy brochure.',
        ],
      },
    ],
    quote: {
      text: 'An architecture that protects, where design becomes a bridge, the symbol becomes action, and every cell of the hive works to nurture the future.',
      attribution: 'Design note',
    },
    gallery: ['alveare-spread.png'],
  },

  'cli-centro-linguistico': {
    eyebrow: 'BRANDING · LOGO DESIGN · VISUAL IDENTITY',
    tagline: "A logo for the University of Pisa's Language Center, built around two speech bubbles meeting mid-conversation.",
    subtagline: 'Dialogue as a meeting space.',
    sections: [
      {
        heading: 'One Mark, Three Readings',
        intro: 'Two intersecting bubbles, read three ways at once.',
        items: [
          { icon: 'message', title: 'Dialogue', text: 'A universal symbol of communication, forming a new shared space where it overlaps.' },
          { icon: 'text-cursor', title: 'Quotation Marks', text: 'A graphic sign that introduces and holds the word, tying written and spoken language together.' },
          { icon: 'star', title: 'A Stuck-Out Tongue', text: 'A playful detail hidden in the intersection, a direct metaphor for the act of speaking.' },
        ],
      },
      {
        heading: 'Typography & Palette',
        paragraphs: [
          "The typeface, Swift Regular SC, is the University of Pisa's own official logo font, tying the mark visually back to its institution. The palette stays institutional: blue, white and black, built for consistency across every touchpoint.",
        ],
      },
    ],
    quote: {
      text: 'Where every word becomes a bridge, every dialogue transforms into meeting, and every language finds its space.',
      attribution: 'Design note',
    },
    gallery: [
      'cli-centro-linguistico-variants.png',
      'cli-centro-linguistico-guidelines.png',
      'cli-centro-linguistico-totebag.png',
    ],
  },

  // ======================================================================
  // XR
  // ======================================================================
  'on-display': {
    eyebrow: 'XR · UNITY 3D · INTERACTIVE MUSEUM EXPERIENCE',
    tagline: "An interactive virtual museum where you become the curator of your own collection.",
    subtagline: 'Built in Unity 6 on the Universal Render Pipeline.',
    sections: [
      {
        heading: 'The Concept',
        intro: 'The objective was to merge 3D exploration with edutainment: explore, interact, learn through a mini-game, then move to the next piece.',
        stats: [
          { value: '100%', label: 'Real-time 3D' },
          { value: '60 FPS', label: 'Optimization' },
          { value: 'Full', label: 'Interactivity' },
        ],
      },
      {
        heading: 'Three Mini-Games',
        intro: 'Art-history learning, turned into play.',
        items: [
          { icon: 'check-double', title: 'True or False', text: 'Critical analysis to tell originals from copies.' },
          { icon: 'map-pin', title: 'Art Geography', text: 'Spatial placement of artworks onto a map.' },
          { icon: 'calendar-range', title: 'Timeline', text: 'Chronological ordering of masterpieces.' },
        ],
      },
      {
        heading: 'Technical Architecture',
        intro: 'Six pillars of Unity development, from scene construction to problem solving.',
        items: [
          { icon: 'blocks', title: 'Level Design & Rendering', text: 'Modular prefab architecture with occlusion culling and custom LOD generation.' },
          { icon: 'grid-3x3', title: 'Software Architecture', text: 'SOLID principles: observer-pattern events, interfaces, a finite state machine, a singleton GameManager.' },
          { icon: 'zap', title: 'Real-time Optimization', text: 'Mixed lighting, baked GI with light probes, reflection probes and PBR materials.' },
          { icon: 'audio-waveform', title: 'NPC & Audio Systems', text: 'NavMesh-driven characters with 3D spatialised sound and dynamic subtitles.' },
        ],
      },
      {
        heading: 'Problem Solving',
        intro: 'A recurring conflict between the Character Controller and manual scene transitions needed a careful fix.',
        paragraphs: [
          "During scene changes, the Character Controller's internal physics kept overriding direct Transform changes, silently undoing the intended repositioning. The fix: a coroutine that disables the Character Controller, applies the Transform change, waits one frame, then re-enables the controller, giving Unity's registry time to register the new position before physics takes back over.",
        ],
      },
    ],
    quote: {
      text: 'On Display demonstrates advanced real-time 3D development combining software architecture, interactive design, and performance optimization to create an engaging educational experience.',
      attribution: 'Project takeaway',
    },
    gallery: ['on-display-museum.png', 'on-display-character-controller.png'],
  },

  'meta-ar-filters': {
    eyebrow: 'XR · AUGMENTED REALITY · META SPARK HUB',
    tagline: 'Design becomes experience: AR filters for Meta platforms that turn digital magic into viral moments.',
    rainbow: true,
    sections: [
      {
        heading: 'The Creative Lab',
        intro: 'Meta Spark Hub started as a self-learning exercise and became a case study in organic distribution.',
        items: [
          { icon: 'heart', title: 'People-First Design', text: 'Filters built for people, not brands: small aesthetic tools rather than campaign assets.' },
          { icon: 'globe', title: 'XR Innovation', text: 'Blending the physical and digital worlds to create moments that resonate globally.' },
          { icon: 'share', title: 'Organic Distribution', text: 'No ad spend behind any of it, growth came from the filters themselves.' },
        ],
      },
      {
        heading: 'Four Filters',
        items: [
          { icon: 'target', title: 'Dog Test', text: 'An interactive personality quiz: what kind of dog would you be?' },
          { icon: 'sparkles', title: 'Ethereal Wings', text: 'A dreamy, magical wings effect layered over the face.' },
          { icon: 'crown', title: 'Emoji Crown', text: 'An animated headpiece of floating emoji, playful and instantly readable.' },
          { icon: 'star', title: 'Cat Paintings Quiz', text: 'An art-history challenge matching you to a famous feline masterpiece.' },
        ],
      },
      {
        heading: 'Organic Growth',
        stats: [
          { value: '143K+', label: 'Opens' },
          { value: '34K+', label: 'Captures' },
          { value: '4.8K+', label: 'Shares' },
        ],
      },
    ],
    quote: {
      text: 'Empathetic, refined design produced these numbers, with zero ad spend behind them.',
      attribution: 'Organic growth philosophy',
    },
    gallery: ['meta-ar-filters-grid.png', 'meta-ar-filters-analytics.png'],
  },

  // ======================================================================
  // Social
  // ======================================================================
  'sei-versilia': {
    eyebrow: 'SOCIAL MEDIA · CONTENT STRATEGY · TERRITORIAL MARKETING',
    tagline: 'Digitalising beauty: when the territory goes viral.',
    subtagline: 'A 360-degree marketing project pairing an SEO web portal with fieldwork for a cultural association.',
    sections: [
      {
        heading: 'Design Choices',
        intro: 'Keeping visual quality high without sacrificing the volume needed to cover every local event.',
        items: [
          { icon: 'grid-3x3', title: 'Compositional Freedom', text: 'A move from a rigid grid to a flexible, single-photo layout, each post its own small story.' },
          { icon: 'video', title: 'Video-First Strategy', text: 'A new TikTok channel and a pivot toward Reels and informative carousels.' },
          { icon: 'zap', title: 'Speed & Responsiveness', text: 'Fast coverage of territorial events, without ever cutting corners on quality.' },
        ],
      },
      {
        heading: 'Performance',
        intro: 'The algorithm rewarded short, well-made content with exceptional organic coverage.',
        stats: [
          { value: '+700%', label: 'Organic Reach' },
          { value: '1M+', label: 'Video Views' },
          { value: '50K+', label: 'Engagement' },
          { value: 'Gen Z', label: 'Target Reached' },
        ],
      },
    ],
    quote: {
      text: 'The data confirmed the vision: the algorithm rewarded quality short content with exceptional organic coverage, proving that even institutional, territorial promotion, done well, can engage a new generation.',
      attribution: 'Results',
    },
    gallery: ['sei-versilia-instagram.png', 'sei-versilia-instore.png'],
  },

  'antica-salumeria-vargiu': {
    eyebrow: 'SOCIAL MEDIA · BRAND STRATEGY · VISUAL IDENTITY',
    tagline: 'A guardian of Sardinian flavors and memories, reimagined for the digital age.',
    subtagline: 'How do you tell a story of heritage without appearing old-fashioned?',
    sections: [
      {
        heading: 'The Context',
        intro: 'Antica Salumeria Vargiu is a guardian of Sardinian flavour and memory, but its digital voice risked staying trapped in a dusty past.',
        paragraphs: [
          'The challenge was a delicate one: how do you communicate history without seeming old? How do you convey the luxury of genuineness, rather than covering it up?',
        ],
      },
      {
        heading: 'The Intervention',
        intro: 'A radical but respectful revamp.',
        items: [
          { icon: 'eye', title: 'Respectful Revamping', text: "Stripping away visual noise made room for the brand's own elegance to show through." },
          { icon: 'mic', title: 'New Tone of Voice', text: 'Folkloric clichés abandoned for a calm, authoritative register that doesn\'t need to shout.' },
          { icon: 'comment-text', title: 'Collaborative Process', text: "Built alongside the brand's own in-house social media manager, at the owner's request." },
        ],
      },
    ],
    quote: {
      text: 'Clean lines and essential geometries frame carefully studied typography: an embrace between the retro style that honours the history, and the modern freshness needed to stand out in today\'s feed.',
      attribution: 'Design note',
    },
    gallery: [
      'antica-salumeria-vargiu-formaggi.png',
      'antica-salumeria-vargiu-salumi.png',
      'antica-salumeria-vargiu-pasta.png',
    ],
  },

  mudac: {
    eyebrow: 'SOCIAL MEDIA · VIDEOMAKING · MUSEUM CAMPAIGN',
    tagline: 'A short film for mudaC, where the mountain becomes sculpture and history crystallizes in absolute white.',
    subtagline: "Shot for mudaC's \"Lo visito\" campaign, Museum of Arts in Carrara.",
    sections: [
      {
        heading: 'The Concept',
        intro: 'Carrara is a state of matter: the goal was to capture an atmosphere suspended in time.',
        paragraphs: [
          "A choral narrative celebrates the dialogue between a millennial marble tradition and irreverent contemporary art, narrated by active witnesses moved by beauty. The campaign's own title, Lo visito (I visit it), affirms belonging: the museum as a sensory experience.",
        ],
      },
      {
        heading: 'Narrative Architecture',
        intro: 'Four pillars of emotional communication.',
        items: [
          { icon: 'building-community', title: "Carrara's Essence", text: 'The mountain becomes sculpture, history crystallised in absolute white.' },
          { icon: 'video', title: 'Visual Direction', text: 'Polished classical sculpture meets modern installation, each frame composed like a painting.' },
          { icon: 'eye', title: 'New Generation', text: "Young protagonists framed as active witnesses, not passive viewers." },
          { icon: 'heart', title: 'Emotional Belonging', text: 'A sensory experience that makes you feel part of something larger than yourself.' },
        ],
      },
    ],
    quote: {
      text: 'Visiting the museum is a sensory experience that nourishes passion and makes you feel part of an extraordinary story.',
      attribution: 'mudaC campaign philosophy',
    },
    gallery: ['mudac-artist1.png', 'mudac-artist2.png', 'mudac-artist3.png'],
    video: { provider: 'vimeo', id: '1066576328' },
  },

  'the-monsters-archive': {
    eyebrow: 'XR · GAUSSIAN SPLATTING · DIGITAL HERITAGE',
    tagline: 'Three collectible figures, captured with Gaussian Splatting and treated as objects worthy of real archival study.',
    subtagline: 'A live 3D archive of Labubu, built around a question: what happens when heritage digitization is pointed at a mass-produced toy instead of a monument?',
    meta: [
      { label: 'Role', value: 'Capture & Digital Heritage Design' },
      { label: 'Method', value: 'Gaussian Splatting' },
      { label: 'Stack', value: 'Three.js + Spark' },
      { label: 'Year', value: '2026' },
    ],
    sections: [
      {
        heading: 'The Concept',
        intro: 'Labubu, the flagship character of Kasing Lung\'s "The Monsters" universe and Pop Mart\'s best-selling collectible, is not the kind of object heritage digitization usually touches: no monument, no unique original, one of hundreds of thousands of identical units. That mismatch is the point.',
        paragraphs: [
          'Three physical figures (a plush pink Labubu, a grey variant, and a Coca-Cola themed edition) were scanned with Gaussian Splatting and brought into the browser as real-time, orbit-able 3D objects, sitting inside a site built like an archive: numbered essay sections, a reading room typeface, ambient music, footnotes. The 3D viewer is the centrepiece, but it is deliberately surrounded by the scholarly apparatus that usually justifies calling something "heritage" in the first place.',
        ],
      },
      {
        heading: 'Annotated Details',
        intro: 'Clicking a highlighted point on the model opens a written entry on that specific detail, the way a museum wall label works, except some of these entries are about the capture process itself.',
        items: [
          {
            icon: 'link',
            title: 'The Ring',
            text: 'The security clasp stitched into the hood becomes a case study in its own right: the exact point where a toy becomes a fashion accessory, and a single point of failure for an object that resells for far more than its retail price.',
          },
          {
            icon: 'shield',
            title: 'The Label',
            text: 'The QR-coded authenticity tag, read against the paradox of verifying originality on an object that never had an original: a blind-box figure serialized from unit one, now defended with anti-counterfeit tech against "Lafufu" fakes.',
          },
          {
            icon: 'eye',
            title: 'The Snout',
            text: 'Where the fur body meets the injection-molded vinyl face, the capture itself starts to fail: dense, irregular fur generates floaters the smooth vinyl doesn\'t, and the annotation says so directly. The limits of Gaussian splatting become part of the exhibit.',
          },
        ],
      },
      {
        heading: 'The Archive',
        intro: 'Five essay pages frame the object from five different angles, each with its own sourced, cited research rather than paraphrased trivia.',
        items: [
          { icon: 'book-open', title: 'The Monsters', text: 'The 2015 picture-book trilogy, its nine principal characters, and the shift from Hong Kong art-toy subculture to Pop Mart mass production.' },
          { icon: 'star', title: 'Kasing Lung', text: 'The designer\'s biography, from a Dutch childhood spent drawing in a family restaurant to exhibitions alongside Takashi Murakami.' },
          { icon: 'building-community', title: 'Pop Mart', text: 'The blind-box business model, the 2020 Hong Kong IPO, and the 2024 to 2025 revenue explosion driven by celebrity virality.' },
          { icon: 'square-alert', title: 'Blind Spot', text: 'A critical section on the supply-chain labor behind the toy, blind-box gambling psychology, and the environmental cost of disposable collectibles.' },
        ],
      },
      {
        heading: 'Critical Framework',
        intro: 'The project does not stop at description. It applies real heritage and media theory to ask whether digitizing a toy is a democratizing act or a category error.',
        paragraphs: [
          'Walter Benjamin\'s writing on mechanical reproduction and the "aura" of an original is reopened by Latour and Lowe\'s argument that aura can migrate to a good facsimile, and tested directly against Laurajane Smith\'s claim that heritage itself is not a fixed set of worthy objects but an "Authorized Heritage Discourse" that decides what counts. Adorno\'s warning that musealization is a "mortifying process" sits deliberately unresolved next to the counter-argument that scanning a disposable object might be exactly the critical act worth taking.',
          'None of this is decoration. The China Labor Watch investigation into the factory supply chain, the peer-reviewed research on blind-box gambling mechanics, and the PVC and microplastic data on the object\'s material afterlife are all cited from real, dated sources, listed in full on the site\'s own references page.',
        ],
      },
      {
        heading: 'Under the Hood',
        intro: 'Built with Three.js and Spark, a Gaussian Splatting renderer that plugs directly into the Three.js pipeline rather than replacing it.',
        stats: [
          { value: '3', label: 'Captured figures' },
          { value: '.spz', label: 'Compressed splat format' },
          { value: '<100MB', label: 'Per model, GitHub-hosted' },
          { value: '3', label: 'Annotated hotspots' },
        ],
        paragraphs: [
          'Models were processed in SuperSplat and served as .spz, a compressed splat format roughly ten times smaller than raw .ply, small enough to sit directly in the repository with no external hosting dependency. OrbitControls handle the drag-to-orbit interaction, and antialiasing is deliberately disabled, a requirement of the Spark renderer rather than an oversight.',
        ],
      },
    ],
    quote: {
      text: 'To 3D-scan such an object is to reproduce a reproduction: a facsimile of a commodity. Digitizing it, and in doing so also capturing the manufacturing flaws caused by production ramped up to meet demand, is an important critical act.',
      attribution: 'Blind Spot, critical analysis section',
    },
    gallery: [
      'the-monsters-archive-blindbox.png',
      'the-monsters-archive-reveal.png',
      'the-monsters-archive-essay.png',
    ],
  },
}

export function caseStudyFor(id: string): CaseStudy | undefined {
  return CASE_STUDIES[id]
}
