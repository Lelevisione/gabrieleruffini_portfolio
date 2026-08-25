import { motion } from 'framer-motion'
import { HOTSPOTS } from '../../scene/hotspots'
import { projectsFor } from '../../data/projects'

/** Cycled per row, like coloured file icons in an old file manager. */
const ICON_TINTS = ['pink', 'cyan', 'blue', 'magenta']

interface ProjectPanelProps {
  hotspotId: string
  onClose: () => void
  onOpenProject: (projectId: string) => void
}

function ProjectPanel({ hotspotId, onClose, onOpenProject }: ProjectPanelProps) {
  const def = HOTSPOTS.find((h) => h.id === hotspotId)
  const projects = projectsFor(hotspotId)

  return (
    <motion.div
      className="win-raised project-panel"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <div className="win-titlebar">
        <span className="win-titlebar-text">{def?.label ?? hotspotId}</span>
        <div className="win-titlebar-controls">
          <button
            type="button"
            className="win-raised win-sq-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>

      <div className="project-panel-body">
        <div className="win-sunken project-listbox">
          {def?.wip ? (
            <p className="project-panel-wip">Section under construction</p>
          ) : (
            <ul className="project-list">
              {projects.map((p, i) => (
                <li key={p.id}>
                  <button
                    type="button"
                    className="project-list-item"
                    onClick={() => onOpenProject(p.id)}
                    onDoubleClick={() => onOpenProject(p.id)}
                  >
                    <span className={`project-item-icon tint-${ICON_TINTS[i % ICON_TINTS.length]}`} />
                    <span className="project-item-label">{p.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="win-sunken project-statusbar">
          {def?.wip
            ? 'work in progress'
            : `${projects.length} ${projects.length === 1 ? 'project' : 'projects'}`}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectPanel
