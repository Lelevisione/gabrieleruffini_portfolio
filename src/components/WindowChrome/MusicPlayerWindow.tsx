import { useContext, useEffect, useState } from 'react'
import { motion, useDragControls } from 'framer-motion'
import { DesktopBoundsContext, nextZ } from './WindowFrame'
import type { MusicPlayerState } from '../../hooks/useMusicPlayer'

interface MusicPlayerWindowProps {
  player: MusicPlayerState
  onClose: () => void
  /** Bumped by Home whenever the turntable is clicked while this window is
   *  already open — any change (including the very first, on open) raises it. */
  focusTick: number
}

/**
 * A deliberately un-window-like widget: no title bar, a rectangle fused to a
 * circle housing the spinning disc.
 *
 * Dragging works from any non-interactive point of the shape (not just a
 * title bar), via dragListener={false} + a manual controls.start() on the
 * background surfaces. This is the same split WindowFrame uses for its own
 * close button, just applied more broadly here since there's no dedicated
 * drag handle. It matters: framer-motion's automatic drag listener attaches
 * directly to the dragged DOM node, and a child's stopPropagation can't
 * reliably beat that once React 17's root-delegated event dispatch is in the
 * mix — disabling the automatic listener and starting drags explicitly from
 * known-safe elements sidesteps the race entirely, rather than fighting it.
 */
function MusicPlayerWindow({ player, onClose, focusTick }: MusicPlayerWindowProps) {
  const { track, isPlaying, volume, progress, duration, toggle, next, prev, seek, setVolume } = player
  const boundsRef = useContext(DesktopBoundsContext)
  const controls = useDragControls()
  // Shares WindowFrame's own counter (see there) instead of a fixed z-index,
  // so this window reliably ends up above the room whenever it's opened or
  // clicked, no matter how many other windows have been focused meanwhile.
  const [z, setZ] = useState(nextZ)
  // Clicking the turntable while this is already open can't reach the drag
  // handlers below (it's a click inside the 3D scene, nowhere near this DOM
  // node), so Home raises focusTick instead and this is what actually moves
  // the window to the front in response.
  useEffect(() => {
    setZ(nextZ())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusTick])
  const startDrag = (e: React.PointerEvent) => controls.start(e)
  const stop = (e: React.PointerEvent) => e.stopPropagation()

  return (
    <motion.div
      className="mp-root"
      style={{ zIndex: z }}
      drag
      dragListener={false}
      dragControls={controls}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={boundsRef ?? undefined}
      onPointerDownCapture={() => setZ(nextZ())}
    >
      <button
        type="button"
        className="mp-close"
        onClick={onClose}
        onPointerDown={stop}
        aria-label="Close"
      >
        ×
      </button>

      {/* Circle + rectangle share one fill with no per-shape border, and this
          wrapper's drop-shadow filter follows their combined silhouette — the
          trick that lets two overlapping shapes read as one continuous piece
          instead of two panels with a visible seam. Also the general drag
          surface: anywhere on it that isn't a button or slider starts a drag. */}
      <div className="mp-shape" onPointerDown={startDrag}>
        <button
          type="button"
          className="mp-play"
          onClick={toggle}
          onPointerDown={stop}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <span
            className="mp-play-icon"
            style={{ ['--icon' as string]: `url(/assets/icons/pixelart/${isPlaying ? 'pause' : 'play'}.svg)` }}
          />
        </button>

        <button
          type="button"
          className="mp-disc-wrap"
          onClick={toggle}
          onPointerDown={stop}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <img
            src="/assets/img/player/cd-disc.png"
            alt=""
            className={`mp-disc ${isPlaying ? 'mp-disc--spin' : ''}`}
          />
        </button>

        <div className="mp-panel">
          <div className="mp-info">
            <div className="mp-title">{track.title}</div>
            <div className="mp-artist">{track.artist}</div>
          </div>

          <div className="mp-seek-row">
            <button type="button" className="mp-skip" onClick={prev} onPointerDown={stop} aria-label="Previous track">
              <span className="mp-skip-icon" style={{ ['--icon' as string]: 'url(/assets/icons/pixelart/chevron-left.svg)' }} />
            </button>
            <input
              type="range"
              className="mp-seek"
              min={0}
              max={duration || 0}
              step={0.1}
              value={progress}
              onChange={(e) => seek(Number(e.target.value))}
              onPointerDown={stop}
              aria-label="Seek"
            />
            <button type="button" className="mp-skip" onClick={next} onPointerDown={stop} aria-label="Next track">
              <span className="mp-skip-icon" style={{ ['--icon' as string]: 'url(/assets/icons/pixelart/chevron-right.svg)' }} />
            </button>
          </div>

          <div className="mp-volume-row">
            <span
              className="mp-volume-icon"
              style={{ ['--icon' as string]: `url(/assets/icons/pixelart/${volume === 0 ? 'volume-x' : 'volume-2'}.svg)` }}
            />
            <input
              type="range"
              className="mp-volume-slider"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              onPointerDown={stop}
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MusicPlayerWindow
