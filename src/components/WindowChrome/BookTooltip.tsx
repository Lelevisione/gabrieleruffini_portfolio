import { BookHoverInfo } from '../Scene/BookMarkers'

interface BookTooltipProps {
  info: BookHoverInfo
  /** Position relative to the tooltip's own positioned ancestor (.win-content). */
  x: number
  y: number
}

/** A vaporwave library checkout slip that follows the cursor: torn top edge,
 *  pastel gradient stripe, monospace receipt type. Purely presentational —
 *  RoomWindow owns the hover state and the client-to-local coordinate math. */
function BookTooltip({ info, x, y }: BookTooltipProps) {
  return (
    <div className="book-tooltip" style={{ left: x, top: y }}>
      <div className="book-tooltip-band" />
      <p className="book-tooltip-eyebrow">Library Slip</p>
      <div className="book-tooltip-rule" />
      <p className="book-tooltip-title">{info.title}</p>
      <p className="book-tooltip-desc">{info.description}</p>
      <div className="book-tooltip-rule" />
      <p className="book-tooltip-author-label">Author</p>
      <p className="book-tooltip-author">Gabriele Ruffini</p>
    </div>
  )
}

export default BookTooltip
