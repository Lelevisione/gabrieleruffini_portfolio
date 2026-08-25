import { useContext, useEffect, useMemo, useState } from 'react'
import { motion, useDragControls } from 'framer-motion'
import { DesktopBoundsContext, nextZ } from './WindowFrame'
import { asset } from '../../lib/asset'
import { Ebook, Spread, buildPageSequence, pageUrl } from '../../data/ebooks'

interface EbookReaderWindowProps {
  book: Ebook
  onClose: () => void
}

/** Displayed width of one page in a paired (xhtml) book; the native page
 *  scales down to fit via CSS transform. */
const PAGE_DISPLAY_WIDTH = 380
const GUTTER_WIDTH = 14

/** Target height for a single full-page image (a pre-composed spread or a
 *  cover); width follows the source image's own aspect ratio. */
const SINGLE_PAGE_HEIGHT = 520
const MAX_SINGLE_PAGE_WIDTH = 900

type FlipPhase = 'out' | 'in' | null

function XhtmlPage({ book, pageNumber }: { book: Ebook; pageNumber: number | null }) {
  const scale = PAGE_DISPLAY_WIDTH / book.pageWidth!
  const displayHeight = book.pageHeight! * scale

  return (
    <div className="ebook-page" style={{ width: PAGE_DISPLAY_WIDTH, height: displayHeight }}>
      {pageNumber && (
        <iframe
          key={pageNumber}
          className="ebook-page-frame"
          src={pageUrl(book, pageNumber)}
          title={`${book.title}, page ${pageNumber}`}
          style={{
            width: book.pageWidth,
            height: book.pageHeight,
            transform: `scale(${scale})`,
          }}
          loading="lazy"
        />
      )}
    </div>
  )
}

function ImagePage({
  book,
  pageNumber,
  width,
  height,
  onNaturalSize,
}: {
  book: Ebook
  pageNumber: number | null
  width: number
  height: number
  onNaturalSize: (w: number, h: number) => void
}) {
  return (
    <div className="ebook-page" style={{ width, height }}>
      {pageNumber && (
        <img
          key={pageNumber}
          className="ebook-page-img"
          src={pageUrl(book, pageNumber)}
          alt={`${book.title}, page ${pageNumber}`}
          onLoad={(e) => onNaturalSize(e.currentTarget.naturalWidth, e.currentTarget.naturalHeight)}
        />
      )}
    </div>
  )
}

/**
 * No window chrome at all: the book is the window. Modelled on the music
 * player's approach (see MusicPlayerWindow) for the same reason, a
 * bespoke shape doesn't fit WindowFrame's title-bar-and-body assumptions,
 * so it skips WindowFrame entirely and builds its own drag handling with
 * dragListener={false} + a manual controls.start() on a known-safe surface
 * (the spine gutter here, the whole shape there), since interactive
 * children need to keep receiving their own pointer events.
 */
function EbookReaderWindow({ book, onClose }: EbookReaderWindowProps) {
  const spreads = useMemo(() => buildPageSequence(book), [book])
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<FlipPhase>(null)
  const [dir, setDir] = useState<'next' | 'prev' | null>(null)
  const boundsRef = useContext(DesktopBoundsContext)
  const controls = useDragControls()
  // Shares WindowFrame's own counter (see there) instead of a fixed z-index,
  // so this window reliably ends up above the room whenever it's opened or
  // clicked, no matter how many other windows have been focused meanwhile.
  const [z, setZ] = useState(nextZ)
  // Only used for kind:'image': each page can be a different shape (a
  // portrait cover vs. a landscape pre-composed spread), so the book's own
  // box tracks whatever the current page's real image dimensions are,
  // instead of assuming one fixed page size like the xhtml case can.
  const [naturalSize, setNaturalSize] = useState({ w: SINGLE_PAGE_HEIGHT * 0.75, h: SINGLE_PAGE_HEIGHT })

  const startDrag = (e: React.PointerEvent) => controls.start(e)
  const stop = (e: React.PointerEvent) => e.stopPropagation()

  const atStart = index === 0
  const atEnd = index === spreads.length - 1

  const go = (delta: 1 | -1) => {
    const target = index + delta
    if (phase || target < 0 || target > spreads.length - 1) return
    setDir(delta > 0 ? 'next' : 'prev')
    setPhase('out')
    window.setTimeout(() => {
      setIndex(target)
      setPhase('in')
      window.setTimeout(() => {
        setPhase(null)
        setDir(null)
      }, 170)
    }, 170)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, phase])

  const [left, right]: Spread = spreads[index]
  const isSingleImage = book.kind === 'image' && book.layout === 'single'

  let spreadWidth: number
  let displayHeight: number
  if (isSingleImage) {
    displayHeight = SINGLE_PAGE_HEIGHT
    spreadWidth = Math.min(MAX_SINGLE_PAGE_WIDTH, naturalSize.w * (SINGLE_PAGE_HEIGHT / naturalSize.h))
  } else {
    displayHeight = book.pageHeight! * (PAGE_DISPLAY_WIDTH / book.pageWidth!)
    spreadWidth = PAGE_DISPLAY_WIDTH * 2 + GUTTER_WIDTH
  }

  return (
    <motion.div
      className="ebook-root"
      style={{ width: spreadWidth, height: displayHeight, zIndex: z }}
      drag
      dragListener={false}
      dragControls={controls}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={boundsRef ?? undefined}
      onPointerDownCapture={() => setZ(nextZ())}
      // Drag from anywhere on the shape that isn't a button — the pages
      // themselves are iframes or images, so clicks on actual book content
      // never reach this handler in the first place for the xhtml book;
      // this only ever catches the borders, gutter and surrounding space.
      onPointerDown={startDrag}
    >
      <button type="button" className="ebook-close" onClick={onClose} onPointerDown={stop} aria-label="Close">
        ×
      </button>

      <button
        type="button"
        className="ebook-arrow ebook-arrow--left"
        onClick={() => go(-1)}
        onPointerDown={stop}
        disabled={atStart}
        aria-label="Previous page"
      >
        <span className="resume-icon" style={{ ['--icon' as string]: `url(${asset('assets/icons/pixelart/chevron-left.svg')})` }} />
      </button>

      <div className={`ebook-spread-inner ${phase ? `ebook-flip-${phase}` : ''} ${dir ? `ebook-flip-${dir}` : ''}`}>
        {isSingleImage ? (
          <ImagePage
            book={book}
            pageNumber={left}
            width={spreadWidth}
            height={displayHeight}
            onNaturalSize={(w, h) => setNaturalSize({ w, h })}
          />
        ) : (
          <>
            <XhtmlPage book={book} pageNumber={left} />
            <div className="ebook-gutter" />
            <XhtmlPage book={book} pageNumber={right} />
          </>
        )}
      </div>

      <button
        type="button"
        className="ebook-arrow ebook-arrow--right"
        onClick={() => go(1)}
        onPointerDown={stop}
        disabled={atEnd}
        aria-label="Next page"
      >
        <span className="resume-icon" style={{ ['--icon' as string]: `url(${asset('assets/icons/pixelart/chevron-right.svg')})` }} />
      </button>
    </motion.div>
  )
}

export default EbookReaderWindow
