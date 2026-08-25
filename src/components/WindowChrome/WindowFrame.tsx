import { ReactNode, createContext, useContext, useState } from 'react'
import { motion, useDragControls } from 'framer-motion'

/** Shared so windows can be constrained to the desktop area while dragging. */
export const DesktopBoundsContext = createContext<React.RefObject<HTMLElement> | null>(null)

// Click-to-front ordering. A plain counter is enough here: windows only ever
// need to be raised above whatever is currently on top. Exported so the
// handful of windows that skip WindowFrame entirely (MusicPlayerWindow,
// EbookReaderWindow — bespoke shapes with no title bar) can still take part
// in the same stacking order instead of using a disconnected fixed z-index.
let zCounter = 10
export const nextZ = () => ++zCounter

interface WindowFrameProps {
  title: string
  onClose: () => void
  /** CSS position within the desktop, e.g. '7%' or 120. */
  left: number | string
  top: number | string
  /** Extra class carrying this window's sizing. */
  sizeClass?: string
  children: ReactNode
}

/**
 * Retro program window: draggable by its title bar, raised above its siblings
 * when clicked, closable. All windows on the desktop are built from this.
 */
function WindowFrame({ title, onClose, left, top, sizeClass = '', children }: WindowFrameProps) {
  const controls = useDragControls()
  const boundsRef = useContext(DesktopBoundsContext)
  const [z, setZ] = useState(nextZ)

  return (
    <motion.div
      className={`win-raised win-window ${sizeClass}`}
      style={{ left, top, zIndex: z }}
      drag
      dragControls={controls}
      // Drag only from the title bar, the way a real window behaves — otherwise
      // dragging would fire from anywhere, including the 3D canvas and buttons.
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={boundsRef ?? undefined}
      onPointerDownCapture={() => setZ(nextZ())}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
    >
      <div
        className="win-titlebar win-titlebar--drag"
        onPointerDown={(e) => controls.start(e)}
      >
        <span className="win-titlebar-text">{title}</span>
        <div className="win-titlebar-controls">
          <span className="win-raised win-sq-btn">_</span>
          <span className="win-raised win-sq-btn">□</span>
          <button
            type="button"
            className="win-raised win-sq-btn"
            onClick={onClose}
            // Keep the pointer-down from starting a drag on the title bar.
            onPointerDown={(e) => e.stopPropagation()}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>
      {children}
    </motion.div>
  )
}

export default WindowFrame
