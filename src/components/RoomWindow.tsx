import { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SceneCanvas from './Scene/SceneCanvas'
import { BookHoverInfo } from './Scene/BookMarkers'
import InfoToolbar from './WindowChrome/InfoToolbar'
import ProjectPanel from './WindowChrome/ProjectPanel'
import BookTooltip from './WindowChrome/BookTooltip'
import WindowFrame from './WindowChrome/WindowFrame'

interface RoomWindowProps {
  onClose: () => void
  onOpenAbout: () => void
  onOpenContacts: () => void
  /** Project detail windows open on the desktop, not inside this window. */
  onOpenProject: (projectId: string) => void
  /** Same idea for books, clicked straight off the shelf. */
  onOpenBook: (bookId: string) => void
  /** The turntable: opens the lofi player if it isn't open yet, or just
   *  brings it to front if it's already sitting open in the background. */
  onOpenOrFocusMusic: () => void
}

/** The isometric-room program window, opened from the desktop. */
function RoomWindow({
  onClose,
  onOpenAbout,
  onOpenContacts,
  onOpenProject,
  onOpenBook,
  onOpenOrFocusMusic,
}: RoomWindowProps) {
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const [hoverBook, setHoverBook] = useState<BookHoverInfo | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // BookMarkers reports raw viewport coordinates (it lives inside the WebGL
  // canvas and has no notion of this DOM subtree); converting to a position
  // relative to .win-content happens below, at render time, so it always
  // uses the layout as it is right now rather than whatever it was when the
  // pointer event fired.
  const rect = contentRef.current?.getBoundingClientRect()

  return (
    <WindowFrame
      title="PORTFOLIO.exe"
      onClose={onClose}
      left="14%"
      top="7%"
      sizeClass="win-window--room"
    >
      <InfoToolbar onOpenAbout={onOpenAbout} onOpenContacts={onOpenContacts} />
      <div className="win-sunken win-content" ref={contentRef}>
        <SceneCanvas
          focusedId={focusedId}
          onFocusChange={setFocusedId}
          onOpenBook={onOpenBook}
          onHoverBook={setHoverBook}
          onOpenOrFocusMusic={onOpenOrFocusMusic}
        />
        <AnimatePresence>
          {focusedId && (
            <ProjectPanel
              key={focusedId}
              hotspotId={focusedId}
              onClose={() => setFocusedId(null)}
              onOpenProject={onOpenProject}
            />
          )}
        </AnimatePresence>
        {hoverBook && rect && (
          <BookTooltip info={hoverBook} x={hoverBook.clientX - rect.left} y={hoverBook.clientY - rect.top} />
        )}
      </div>
    </WindowFrame>
  )
}

export default RoomWindow
