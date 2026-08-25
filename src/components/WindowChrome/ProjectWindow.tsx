import WindowFrame from './WindowFrame'
import { projectById } from '../../data/projects'

interface ProjectWindowProps {
  projectId: string
  /** Cascades each new window so they don't stack exactly on top of each other. */
  index: number
  onClose: () => void
}

/**
 * Summary card for a project. Deliberately short: the long-form case study
 * lives on its own page (opened in a new tab), so this stays readable inside
 * a small window.
 */
function ProjectWindow({ projectId, index, onClose }: ProjectWindowProps) {
  const p = projectById(projectId)
  if (!p) return null

  const offset = index * 26

  return (
    <WindowFrame
      title={`${p.id}.prj`}
      onClose={onClose}
      left={`calc(20% + ${offset}px)`}
      top={`calc(14% + ${offset}px)`}
      sizeClass="win-window--project"
    >
      <div className="win-sunken readme-body project-detail">
        <h2 className="readme-h">{p.title}</h2>

        <dl className="project-meta">
          <div>
            <dt>year</dt>
            <dd>{p.year}</dd>
          </div>
          <div>
            <dt>role</dt>
            <dd>{p.role}</dd>
          </div>
        </dl>

        <p className="project-summary">{p.summary}</p>

        {/* Cover images are named to match the project id exactly (see
            public/assets/img/projects/), so no per-project field to keep in sync. */}
        <div className="win-sunken project-shot">
          <img src={`/assets/img/projects/${p.id}.png`} alt={p.title} loading="lazy" />
        </div>

        <p>{p.context}</p>

        <h3 className="readme-h2">In short</h3>
        <ul className="project-highlights">
          {p.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <div className="project-cta-row">
          <a
            className={`win-raised project-cta ${p.demoUrl ? 'project-cta--half' : ''}`}
            href={`/projects/${p.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            learn more
          </a>
          {p.demoUrl && (
            <a
              className="win-raised project-cta project-cta--half"
              href={p.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Try it out!
            </a>
          )}
        </div>
      </div>
    </WindowFrame>
  )
}

export default ProjectWindow
