import { ThreeEvent } from '@react-three/fiber'

export interface BookHoverInfo {
  title: string
  description: string
  /** Viewport coordinates, straight off the native pointer event. */
  clientX: number
  clientY: number
}

interface BookMarker {
  ebookId: string
  title: string
  description: string
  /** World position, in front of the bookshelf's face so the invisible
   *  hitbox never sits inside/behind the real geometry. */
  position: [number, number, number]
}

// The bookshelf (deco_libreria_01) is one fused mesh in room.glb, no separate
// named objects per book, so real per-book raycasting against the model
// isn't possible without re-exporting it from Blender. These are a practical
// stand-in instead: invisible boxes placed by eye over two books on the
// shelf, safe to do because the room camera is always locked to the same
// isometric angle, so a fixed world position reliably lines up on screen.
// Narrow on the Z axis specifically — that's the along-the-shelf width, and
// the first pass was wide enough to straddle two books at once.
const MARKERS: BookMarker[] = [
  {
    ebookId: 'cronache-del-segno',
    title: 'Cronache del Segno',
    description: 'A small history of graphic design, told chapter by chapter.',
    position: [1.78, 0.78, 0.82],
  },
  {
    ebookId: 'la-casina-guide',
    title: "Wanderer's Guide",
    description: "A personalised travel companion for La Casina's guests.",
    position: [1.78, 0.78, 1.18],
  },
]

interface BookMarkersProps {
  onOpenBook: (id: string) => void
  /** null clears the tooltip. Position updates on every move so it tracks
   *  the cursor, not just the moment it first enters the hitbox. */
  onHoverBook: (info: BookHoverInfo | null) => void
}

function BookMarkers({ onOpenBook, onHoverBook }: BookMarkersProps) {
  return (
    <>
      {MARKERS.map((m) => (
        <mesh
          key={m.ebookId}
          position={m.position}
          onPointerMove={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation()
            document.body.style.cursor = 'pointer'
            onHoverBook({
              title: m.title,
              description: m.description,
              clientX: e.clientX,
              clientY: e.clientY,
            })
          }}
          onPointerOut={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation()
            document.body.style.cursor = 'auto'
            onHoverBook(null)
          }}
          onClick={(e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation()
            onOpenBook(m.ebookId)
          }}
        >
          {/* Small on purpose — one book's worth of shelf, not two. */}
          <boxGeometry args={[0.12, 0.26, 0.09]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </>
  )
}

export default BookMarkers
