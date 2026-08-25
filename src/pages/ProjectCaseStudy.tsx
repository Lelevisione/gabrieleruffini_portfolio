import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projectById } from '../data/projects'
import { caseStudyFor } from '../data/caseStudies'

// One accent per room category, not per project: every project under the same
// hotspot shares a background family, so clicking between them inside one
// category feels continuous, and switching category reads as a clear change.
const ACCENT_BY_HOTSPOT: Record<string, { primary: string; secondary: string }> = {
  uiux: { primary: '#00e5ff', secondary: '#ff2bd6' }, // cyan / magenta
  graphicdesign: { primary: '#8ace00', secondary: '#c6ff5c' }, // brat green / acid yellow-green
  social: { primary: '#ff2ea6', secondary: '#ffb3e0' }, // hot pink / soft pink
  xr: { primary: '#a5d8f0', secondary: '#c3bce9' }, // baby blue / lavender
}

// Used only when a project has no hotspot match (shouldn't happen in
// practice) or on the not-found page, which isn't tied to any category.
const DEFAULT_ACCENT = { primary: '#c3bce9', secondary: '#f2c0dc' }

function ProjectCaseStudy() {
  const { id = '' } = useParams()
  const project = projectById(id)
  const study = caseStudyFor(id)
  const accent = (project && ACCENT_BY_HOTSPOT[project.hotspotId]) ?? DEFAULT_ACCENT

  // Case-study pages open in their own tab: always land at the top rather
  // than wherever the room's scroll happened to be when the link was clicked.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const titlebar = (label: string) => (
    <div className="win-titlebar cs-titlebar">
      <span className="win-titlebar-text">{label}</span>
      <div className="win-titlebar-controls">
        <span className="win-raised win-sq-btn">_</span>
        <span className="win-raised win-sq-btn">□</span>
        <Link className="win-raised win-sq-btn" to="/" aria-label="Close">
          ×
        </Link>
      </div>
    </div>
  )

  if (!project) {
    return (
      <div className="cs-desktop">
        <div className="win-raised cs-window" style={{ ['--cs-a' as string]: DEFAULT_ACCENT.primary, ['--cs-b' as string]: DEFAULT_ACCENT.secondary }}>
          {titlebar('not_found.casestudy')}
          <div className="win-sunken cs-body">
            <div className="cs-grid-floor" />
            <div className="cs-scanlines" />
            <main className="cs-notfound">
              <h1>Project not found</h1>
              <Link className="cs-back" to="/">
                Back to the portfolio
              </Link>
            </main>
          </div>
        </div>
      </div>
    )
  }

  const cover = `/assets/img/projects/${project.id}.png`

  return (
    <div className="cs-desktop">
      <div
        className="win-raised cs-window"
        style={{
          ['--cs-a' as string]: accent.primary,
          ['--cs-b' as string]: accent.secondary,
        }}
      >
        {titlebar(`${project.id}.casestudy`)}

        <div className="win-sunken cs-body">
        <div className="cs-grid-floor" />
        <div className="cs-scanlines" />

        <main className={`cs-hero ${study?.rainbow ? 'cs-hero--rainbow' : ''}`}>
          <p className="cs-eyebrow">{study?.eyebrow ?? project.role.toUpperCase()}</p>
          <h1 className="cs-title">{project.title}</h1>
          <p className="cs-tagline">{study?.tagline ?? project.summary}</p>
          {study?.subtagline && <p className="cs-subtagline">{study.subtagline}</p>}

          <dl className="cs-meta">
            {(study?.meta ?? [
              { label: 'Year', value: project.year },
              { label: 'Role', value: project.role },
            ]).map((m) => (
              <div key={m.label} className="cs-meta-item">
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>

          {project.demoUrl && (
            <a className="cs-demo-btn" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              Try it out!
            </a>
          )}
        </main>

        <div className="cs-cover-frame">
          <img src={cover} alt={project.title} className="cs-cover" />
        </div>

        {study?.gallery && study.gallery.length > 0 && (
          <div className="cs-gallery">
            {study.gallery.map((file) => (
              <img key={file} src={`/assets/img/projects/${file}`} alt="" className="cs-gallery-img" loading="lazy" />
            ))}
          </div>
        )}

        {study?.video && (
          <div className={`cs-video-frame ${study.video.orientation === 'portrait' ? 'cs-video-frame--portrait' : ''}`}>
            <iframe
              className="cs-video"
              // fl=tl&fe=ec is the share-link access token these two private
              // uploads need; without it Vimeo shows a sign-in wall instead
              // of the video, even though the video itself is public-shared.
              src={`https://player.vimeo.com/video/${study.video.id}?title=0&byline=0&portrait=0&fl=tl&fe=ec`}
              title={`${project.title} video`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        )}

        {study ? (
          <>
            {study.sections.map((section) => (
              <section className="cs-section" key={section.heading}>
                <h2 className="cs-section-heading">{section.heading}</h2>
                {section.intro && <p className="cs-section-intro">{section.intro}</p>}

                {section.stats && (
                  <div className="cs-stats">
                    {section.stats.map((s) => (
                      <div className="cs-stat" key={s.label}>
                        <span className="cs-stat-value">{s.value}</span>
                        <span className="cs-stat-label">{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {section.items && (
                  <div className="cs-items">
                    {section.items.map((it) => (
                      <div className="cs-item" key={it.title}>
                        <span
                          className="cs-item-icon"
                          style={{ ['--icon' as string]: `url(/assets/icons/pixelart/${it.icon}.svg)` }}
                        />
                        <h3 className="cs-item-title">{it.title}</h3>
                        <p className="cs-item-text">{it.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.paragraphs?.map((p, i) => (
                  <p className="cs-section-para" key={i}>
                    {p}
                  </p>
                ))}
              </section>
            ))}

            <section className="cs-quote">
              <p className="cs-quote-text">{study.quote.text}</p>
              <p className="cs-quote-attr">{study.quote.attribution}</p>
              {study.quote.coda && <p className="cs-quote-coda">{study.quote.coda}</p>}
            </section>
          </>
        ) : (
          <section className="cs-section cs-fallback">
            <p className="cs-section-intro">{project.context}</p>
            <div className="cs-items">
              {project.highlights.map((h) => (
                <div className="cs-item" key={h}>
                  <span
                    className="cs-item-icon"
                    style={{ ['--icon' as string]: 'url(/assets/icons/pixelart/check-double.svg)' }}
                  />
                  <p className="cs-item-text">{h}</p>
                </div>
              ))}
            </div>
            <p className="cs-coming-soon">The full write-up for this project is coming soon.</p>
          </section>
        )}

        <footer className="cs-footer">
          <div className="cs-tools">
            {project.tools.map((t) => (
              <span key={t} className="cs-tool-tag">
                {t}
              </span>
            ))}
          </div>
          <Link className="cs-back" to="/">
            Back to the portfolio
          </Link>
        </footer>
        </div>
      </div>
    </div>
  )
}

export default ProjectCaseStudy
