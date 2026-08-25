import { ReactNode, useRef } from 'react'
import { DesktopBoundsContext } from '../WindowChrome/WindowFrame'

export interface DesktopIcon {
  id: string
  icon: string
  label: string
  /** Position as a percentage of the wallpaper artwork, not of the viewport. */
  x: number
  y: number
  onOpen?: () => void
}

interface DesktopProps {
  icons: DesktopIcon[]
  /** Shown over the wallpaper's clock cell; returns to the title screen. */
  onReset?: () => void
  /** Open windows render above the wallpaper. */
  children?: ReactNode
}

function Desktop({ icons, onReset, children }: DesktopProps) {
  // Windows are dragged within this element, so they can't be flung off-screen.
  const boundsRef = useRef<HTMLDivElement>(null)

  return (
    <div className="desktop" ref={boundsRef}>
      {/* The stage keeps the wallpaper's 16:9 ratio and covers the viewport, so
          icon positions stay glued to the artwork instead of drifting with it. */}
      <div className="desktop-stage">
        {/* The wallpaper paints its own (non-interactive) row of icons down
            the top-left corner — a flat, uniform patch of the background
            colour, sampled directly from the art, so this blends in exactly
            rather than reading as a patch. Painting over it turns that whole
            corner into reliable, guaranteed-clean real estate instead of
            hunting for gaps between painted set-dressing everywhere else. */}
        <div className="desktop-icon-mask" />
        {icons.map((ic) => (
          <button
            key={ic.id}
            type="button"
            className="desktop-icon"
            data-icon-id={ic.id}
            style={{ left: `${ic.x}%`, top: `${ic.y}%` }}
            onDoubleClick={ic.onOpen}
            onClick={ic.onOpen}
          >
            <img src={ic.icon} alt="" className="desktop-icon-img" draggable={false} />
            <span className="desktop-icon-label">{ic.label}</span>
          </button>
        ))}

        {/* Replaces the wallpaper's own painted taskbar outright — this bar is
            opaque and sized to the same strip, so it fully covers the art
            underneath rather than needing a separate colour-matched mask. */}
        <div className="desktop-taskbar">
          <div className="desktop-taskbar-rainbow" />
          <div className="desktop-taskbar-start" aria-hidden="true">
            <svg viewBox="0 0 10 10" className="desktop-taskbar-start-flag">
              <rect x="0" y="0" width="4" height="4" fill="#f25022" />
              <rect x="6" y="0" width="4" height="4" fill="#7fba00" />
              <rect x="0" y="6" width="4" height="4" fill="#00a4ef" />
              <rect x="6" y="6" width="4" height="4" fill="#ffb900" />
            </svg>
          </div>
          <div className="desktop-taskbar-tabs">
            <span className="desktop-taskbar-tab">tomorrow x3</span>
            <span className="desktop-taskbar-tab">rain.mp4</span>
            <span className="desktop-taskbar-tab">ocean.mpeg</span>
          </div>
          {onReset && (
            <button type="button" className="win-raised desktop-reset" onClick={onReset}>
              reset
            </button>
          )}
        </div>
      </div>
      <DesktopBoundsContext.Provider value={boundsRef}>{children}</DesktopBoundsContext.Provider>
    </div>
  )
}

export default Desktop
