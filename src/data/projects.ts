export interface Project {
  id: string
  /** Which room hotspot this belongs to: must match a HotspotDef id. */
  hotspotId: string
  title: string
  year: string
  role: string
  tools: string[]
  /** One-line hook shown at the top of the summary card. */
  summary: string
  /** Short context shown on the card. The long-form write-up lives on the
   *  full case-study page, not here. */
  context: string
  /** Exactly three bullets. The card's layout is built around three. */
  highlights: [string, string, string]
  /** Live, visitable demo. When set, both the summary card and the full
   *  case-study page grow a second "Try it out!" link, deliberately
   *  redundant with each other. */
  demoUrl?: string
}

/**
 * Pulled from the old portfolio (portfoliogabrieleruffini.vercel.app) and
 * condensed to card length. The source pages carry much more detail, which
 * belongs on the full case-study page once that exists, not on this card.
 * A few years aren't stated on the source site and are estimated from context
 * (course/thesis projects, engine versions, etc.), worth double-checking.
 */
export const PROJECTS: Project[] = [
  // ---- UI/UX & Web Design --------------------------------------------
  {
    id: 'oracle-webapp',
    hotspotId: 'uiux',
    title: 'The Oracle',
    year: '2025',
    role: 'UI/UX, Motion & Development',
    tools: ['Figma', 'Motion design', 'Haptics'],
    summary:
      'A pocket divination experience that turns the classic Magic 8-Ball into a two-minute cinematic ritual.',
    context:
      "A solo two-week project built to see how far a simple utility could be pushed with motion and craft: glass-morphic modals, custom particle physics, and a 3-layer glow system simulating glass refraction, all wrapped in a deep-purple mystical palette.",
    highlights: [
      'Glass-morphic UI with heavy haptic feedback and a custom touch-ripple system',
      "A 2% \"Golden Prophecy\" jackpot moment engineered to drive organic sharing",
      'Built to WCAG 2.2 AA, with VoiceOver labels, reduced-motion support and RTL layouts',
    ],
    demoUrl: 'https://from-layer-67298225.figma.site/',
  },
  {
    id: 'cooking-python',
    hotspotId: 'uiux',
    title: 'Cooking Python',
    year: '2023',
    role: 'UI/UX & Software Design',
    tools: ['Python', 'tkinter', 'Pillow'],
    summary:
      "A desktop app for managing a home pantry, built to show that tkinter's limits don't have to mean an ugly interface.",
    context:
      "An academic project pairing object-oriented Python with a from-scratch GUI. It tracks stock, calculates cost and calories automatically, checks which recipes are actually makeable with what's in the pantry, and wraps it all in custom-illustrated recipe and ingredient icons.",
    highlights: [
      'Centralized design-system class for colors, type and widget styling across the app',
      'Custom illustrated icon set for every ingredient and recipe, styled like a cooking game',
      'Fallback handling for every asset: a missing file degrades gracefully instead of crashing the app',
    ],
  },
  {
    id: 'shopping-app',
    hotspotId: 'uiux',
    title: 'Shopping App',
    year: '2024',
    role: 'UI/UX Designer',
    tools: ['Figma'],
    summary:
      'A mobile shopping concept that treats browsing as a visual, editorial experience rather than a grid of products.',
    context:
      "A personal project exploring how far a shopping app's homepage can lean into editorial composition (immersive imagery, promotional banners, curated product clusters) while keeping the familiar patterns, like persistent search and bottom navigation, that make it usable.",
    highlights: [
      'Homepage built as a rhythmic sequence of large visual blocks, not a product grid',
      'Persistent search and bottom navigation keep goal-directed shopping friction-free',
      'Balances promotional urgency with discovery-driven product clusters',
    ],
  },
  {
    id: 'di-cosa-parla',
    hotspotId: 'uiux',
    title: 'Di cosa parla?',
    year: '2024',
    role: 'UX Research & UI Design',
    tools: ['Figma', 'User research', 'Personas'],
    summary:
      'A webapp for discovering trending pop-culture content, designed around the question people actually type: "what is it about?"',
    context:
      'Built on three researched personas with different needs (a FOMO-driven student, a cinema-obsessed community builder, a time-poor parent screening content for his kids), the product runs a dual-view strategy: a clean editorial view for quick answers, and a warmer community view for reviews and discussion.',
    highlights: [
      'Three user personas drove two distinct interface modes: Editorial and Community',
      "SEO-led acquisition strategy built around the app's own name as a search query",
      'Full task-modeling and user-flow mapping from registration to review submission',
    ],
  },
  {
    id: 'cosmic-insights',
    hotspotId: 'uiux',
    title: 'Tarot: Cosmic Insights',
    year: '2025',
    role: 'UI/UX Designer',
    tools: ['Figma'],
    summary:
      'A digital tarot web app pairing mystical ritual with a clean, modern reading experience.',
    context:
      'Three divination modes (past/present/future, single-card, and relationship readings) built around the full 22-card Major Arcana, designed to feel intuitive enough to return to daily.',
    highlights: [
      'Three distinct reading modes, from quick single-card pulls to full spreads',
      'All 22 Major Arcana cards illustrated and interpreted individually',
      'Prototyped and shipped as a live, playable web experience',
    ],
    demoUrl: 'https://nix-thumb-90231924.figma.site/',
  },
  {
    id: 'valentine-app',
    hotspotId: 'uiux',
    title: 'Valentine App',
    year: '2024',
    role: 'UI/UX Design',
    tools: ['Figma', 'Web development'],
    summary:
      'A playful way to ask someone to be your Valentine: a weekend side project that hit 160K+ TikTok views.',
    context:
      'The idea was deliberately minimal: pick a message, choose a cute animal avatar, get a shareable link, no sign-up and no download required. That simplicity is exactly what made it spread on its own across WhatsApp, Instagram and TikTok.',
    highlights: [
      'One-click shareable links, no account required',
      '160K+ organic TikTok views with zero paid promotion',
      "A playful \"No\" response that nudges the recipient to reconsider, built for shareability",
    ],
    demoUrl: 'https://line-cub-72209324.figma.site/',
  },

  // ---- Graphic Design --------------------------------------------------
  {
    id: 'corti-brillanti',
    hotspotId: 'graphicdesign',
    title: 'Corti Brillanti',
    year: '2026',
    role: 'Visual Identity & Poster Design',
    tools: ['Illustrator', 'Photoshop', 'Print'],
    summary:
      "A theater poster for I Postumi Teatro that turns \"brilliant, shining actors\" into a household-cleaning metaphor.",
    context:
      "A literal reading of the show's title, turning stage brilliance into a spray-bottle explosion of freshness, built on cut-out collage, halftone texture and a playful primary-colour palette borrowed from fanzine aesthetics.",
    highlights: [
      "Central spray-bottle illustration doubles as the composition's visual trigger",
      'Cut-out collage technique with halftone texture for a raw, independent-print feel',
      'Ironic concept translated into a distinctive, self-standing visual identity',
    ],
  },
  {
    id: 'graphic-design-ebook',
    hotspotId: 'graphicdesign',
    title: 'Cronache del Segno',
    year: '2023',
    role: 'Editorial & Interaction Design',
    tools: ['EPUB 3', 'Editorial design'],
    summary:
      'An interactive eBook on the history of graphic design that changes its own visual language chapter by chapter.',
    context:
      "Built for a Digital Publishing course at the University of Pisa, developed out of a bachelor's thesis: each historical era (Arts & Crafts, Bauhaus, Post-Modernism, the Digital Age) gets its own layout, typography and composition, so the book's form performs the history it narrates.",
    highlights: [
      "Fixed-layout EPUB 3 gives full control over every spread's composition",
      "Four distinct chapter layouts, each embodying its era's design language",
      'Interactive, navigable timeline lets readers jump straight to a period',
    ],
  },
  {
    id: 'psicologa',
    hotspotId: 'graphicdesign',
    title: 'Psicologa',
    year: '2024',
    role: 'Brand Identity & Social Strategy',
    tools: ['Illustrator', 'Brand identity', 'Social strategy'],
    summary:
      'A visual identity for a life-cycle psychologist, built to translate an invisible, delicate process into something visible and warm.',
    context:
      'The logo fuses the Greek letter Psi with the image of a tangled thread and a cocoon: the knot a patient brings into a session, and the protected space where transformation happens, carried through a soft rose-and-blue palette and a social strategy that uses cinema as a mirror for psychological concepts.',
    highlights: [
      'Logo built around a dual metaphor: the Psi symbol as both thread and cocoon',
      'A social content strategy using film characters as emotional entry points',
      'Full identity system: business cards, coordinated stationery, social templates',
    ],
  },
  {
    id: 'la-casina-bb',
    hotspotId: 'graphicdesign',
    title: 'La Casina B&B',
    year: '2024',
    role: 'Brand Identity Design',
    tools: ['Illustrator', 'Typography', 'Brand identity'],
    summary: 'A brand identity for a Tuscan B&B, built to feel as warm and hand-crafted as the place itself.',
    context:
      'An organic house-and-olive-branch pictogram anchors a full system: Helvetica paired with a hand-painted display face, a warm Tuscan palette, five supporting icons, and touchpoints from welcome posters to a custom guest guide, designed to read as genuinely local rather than generic hospitality branding.',
    highlights: [
      'Pictogram mark combining a stylized house with an olive branch',
      'Five-icon system extending the mark across different guest touchpoints',
      'Full rollout: welcome poster, house-rules booklet, custom travel guide, social presence',
    ],
  },
  {
    id: 'per-il-tuo-bene',
    hotspotId: 'graphicdesign',
    title: 'Per il tuo Bene',
    year: '2025',
    role: 'Visual Identity & Social Strategy',
    tools: ['Illustrator', 'Motion design'],
    summary: 'A logo-as-title for a theater production about family and hidden control, built around a single suitcase.',
    context:
      "Rather than simply setting the title in type, the show got its own mark: a suitcase, standing in for the weight of going home, carried into a social campaign that deliberately flips the drama's tone, telling the story through a child's innocent, hand-drawn eyes to sharpen its unease by contrast.",
    highlights: [
      "The show's title redesigned as a standalone logo instead of typeset text",
      'Suitcase motif ties the poster directly to its target audience of students away from home',
      'Instagram carousel told through deliberately childlike illustration for emotional contrast',
    ],
  },
  {
    id: 'alveare',
    hotspotId: 'graphicdesign',
    title: "L'Alveare",
    year: '2023',
    role: 'Print & Identity Design',
    tools: ['InDesign', 'Illustrator'],
    summary:
      'A shared visual identity uniting three volunteer projects supporting disadvantaged children, under a National Civil Service program.',
    context:
      'The beehive became the guiding metaphor: many different cells working toward one goal, used to bring order to a text-heavy institutional brochure without losing warmth, with a honey-gold texture softening the density of the content.',
    highlights: [
      'One visual identity unifying three separate volunteer initiatives',
      'Hexagonal grid geometry brought inside the layout after budget ruled out die-cutting',
      'Honeycomb and honey-texture motifs used to soften dense institutional copy',
    ],
  },
  {
    id: 'cli-centro-linguistico',
    hotspotId: 'graphicdesign',
    title: 'CLI: Language Center',
    year: '2023',
    role: 'Logo & Brand Identity',
    tools: ['Illustrator', 'Typography'],
    summary: "A logo for the University of Pisa's Language Center, built around two speech bubbles meeting mid-conversation.",
    context:
      "The intersecting bubbles read three ways at once: as dialogue, as quotation marks, and as a stuck-out tongue, while the typography borrows the University of Pisa's own official typeface to tie the mark visually back to its institution.",
    highlights: [
      'Single mark that reads simultaneously as dialogue, quotation marks and a tongue',
      "Typography matched to the University of Pisa's official wordmark font",
      'Full colour-variant system built for consistent use across touchpoints',
    ],
  },

  // ---- XR ----------------------------------------------------------------
  {
    id: 'the-monsters-archive',
    hotspotId: 'xr',
    title: 'The Monsters Archive',
    year: '2026',
    role: 'Gaussian Splatting Capture & Digital Heritage Design',
    tools: ['Gaussian Splatting', 'Three.js', 'Spark', 'SuperSplat'],
    summary:
      'A Gaussian-splat digital archive of Labubu figures, treating a mass-produced blind-box toy as a genuine object of cultural-heritage study.',
    context:
      'Three physical Labubu figures were 3D-captured with Gaussian Splatting and rendered live in the browser with annotated hotspots, alongside five essay pages covering the toy\'s origin, its designer, Pop Mart\'s business model, and a critical section confronting the labor, psychology, and environmental cost behind the object.',
    highlights: [
      'Three independently captured figures, rendered as real-time Gaussian splats via Three.js and Spark',
      'Annotated hotspots where the capture itself becomes evidence: fur texture visibly strains the splatting technique at the fur-to-vinyl boundary',
      'A full critical-heritage essay applying Benjamin, Adorno, and Latour to a mass-produced collectible, backed by a real academic bibliography',
    ],
    demoUrl: 'https://lelevisione.github.io/grafica3D/index.html',
  },
  {
    id: 'on-display',
    hotspotId: 'xr',
    title: "On Display: A Curator's Choice",
    year: '2026',
    role: 'XR Design & Development',
    tools: ['Unity 3D', 'C#', 'Blender'],
    summary: 'An interactive virtual museum where the player takes on the role of curator, building their own collection.',
    context:
      'Built in Unity 6 on the Universal Render Pipeline, the museum runs on a culling system that swaps entire rooms in and out to keep performance high, while three mini-games (true-or-false, spatial placement, and chronological ordering) turn art-history learning into something closer to play.',
    highlights: [
      'Three built-in mini-games teaching art history through play, not text',
      'Dynamic room-culling system keeps rendering steady at 60 FPS',
      'NavMesh-driven NPCs, spatial audio and Cinemachine camera work throughout',
    ],
  },
  {
    id: 'meta-ar-filters',
    hotspotId: 'xr',
    title: 'Meta AR Filters',
    year: '2025',
    role: 'AR / XR Design',
    tools: ['Meta Spark Hub'],
    summary:
      'A set of Instagram/Facebook AR filters designed for people, not brands: shared over 160,000 times without a single ad.',
    context:
      'What started as self-taught experimentation with Meta Spark Hub became a study in organic reach: four filters (a personality quiz, an aesthetic wings effect, an animated crown, and an art-history quiz) spread purely on the strength of the effect itself.',
    highlights: [
      '143K+ opens and 34K+ captures across four filters, entirely organic',
      'Nearly 5K shares with zero paid promotion behind any of them',
      'Real-time face tracking and particle shader work built directly in Spark Hub',
    ],
  },

  // ---- Social --------------------------------------------------------
  {
    id: 'sei-versilia',
    hotspotId: 'social',
    title: 'SEI Versilia',
    year: '2022',
    role: 'Social Media Manager & Content Strategist',
    tools: ['TikTok', 'Instagram', 'Content strategy'],
    summary: 'Territorial marketing for a Versilia cultural association, rebuilt around short-form video, with a +700% organic reach to show for it.',
    context:
      "Moving from a rigid content grid to a flexible, single-photo-led composition and launching a TikTok channel shifted the account's whole trajectory: short, well-made content started outperforming everything else, all without ad spend.",
    highlights: [
      '+700% organic reach after a pivot to Reels and short-form video',
      '1M+ video views and 50K+ engagement, entirely through organic growth',
      'New TikTok channel launched and grown from zero',
    ],
  },
  {
    id: 'antica-salumeria-vargiu',
    hotspotId: 'social',
    title: 'Antica Salumeria Vargiu',
    year: '2024',
    role: 'Brand & Social Strategy',
    tools: ['Photography direction', 'Tone of voice', 'Social strategy'],
    summary: 'A heritage Sardinian delicatessen, brought into its digital voice without losing what makes it feel old.',
    context:
      "Co-designed alongside the brand's in-house social media manager, the refresh stripped away visual noise rather than adding to it: clean typography, high-quality product photography, and a calmer, more confident tone of voice that lets the brand's history speak for itself.",
    highlights: [
      'A revamp built on subtraction: stripping away visual noise instead of adding decoration',
      'New tone of voice: quietly authoritative instead of folkloric',
      "Delivered collaboratively, working directly with the client's own social media manager",
    ],
  },
  {
    id: 'mudac',
    hotspotId: 'social',
    title: 'Dialogues in Stone: mudaC',
    year: '2024',
    role: 'Videomaking',
    tools: ['Videography', 'Editing'],
    summary:
      'A campaign film for mudaC, the Museum of Arts in Carrara, framing a museum visit as a sensory experience rather than an academic one.',
    context:
      "Shot for the \"Lo visito\" campaign, the film pairs the cold polish of classical marble sculpture with contemporary installations, following young protagonists as active witnesses rather than passive tourists: an argument, in a few minutes, for why the museum belongs to them too.",
    highlights: [
      'Visual language built on the contrast between polished marble and modern installation',
      'Young protagonists framed as active witnesses, not passive museum visitors',
      "Produced for mudaC, Museum of Arts in Carrara's \"Lo visito\" campaign",
    ],
  },
]

export function projectsFor(hotspotId: string): Project[] {
  return PROJECTS.filter((p) => p.hotspotId === hotspotId)
}

export function projectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id)
}
