import { Suspense, useCallback, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import RoomModel, { HotspotEntry } from './RoomModel'
import CameraRig, { quatFromViewDir } from './CameraRig'
import BookMarkers, { BookHoverInfo } from './BookMarkers'
import { HOTSPOTS } from '../../scene/hotspots'

interface SceneCanvasProps {
  focusedId: string | null
  onFocusChange: (id: string | null) => void
  onOpenBook: (id: string) => void
  /** The tooltip itself renders outside the canvas, as plain DOM — this just
   *  forwards the raw hover events up to whoever owns that DOM overlay. */
  onHoverBook: (info: BookHoverInfo | null) => void
  onOpenOrFocusMusic: () => void
}

function SceneCanvas({ focusedId, onFocusChange, onOpenBook, onHoverBook, onOpenOrFocusMusic }: SceneCanvasProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [hotspots, setHotspots] = useState<Map<string, HotspotEntry>>(new Map())

  // Orientation per hotspot: those with a viewDir square up to the object's front
  // face, the rest keep the room's isometric angle. Built once, not per frame.
  const viewQuats = useMemo(() => {
    const m = new Map<string, THREE.Quaternion>()
    for (const h of HOTSPOTS) {
      if (h.viewDir) m.set(h.id, quatFromViewDir(new THREE.Vector3(...h.viewDir).normalize()))
    }
    return m
  }, [])

  const shifts = useMemo(() => {
    const m = new Map<string, number>()
    for (const h of HOTSPOTS) {
      if (h.focusShift !== undefined) m.set(h.id, h.focusShift)
    }
    return m
  }, [])

  // focusedId (owned by the page) is the single source of truth — deriving the
  // camera target from it means closing the panel also pulls the camera back out.
  const entry = focusedId ? hotspots.get(focusedId) : undefined
  const focus = entry
    ? {
        position: entry.position,
        focusHeight: entry.focusHeight,
        quat: focusedId ? viewQuats.get(focusedId) : undefined,
        focusShift: focusedId ? shifts.get(focusedId) : undefined,
      }
    : null

  const handleHotspotsReady = useCallback((map: Map<string, HotspotEntry>) => {
    setHotspots(map)
  }, [])

  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      gl={{ toneMapping: THREE.NoToneMapping }}
      onPointerMissed={() => onFocusChange(null)}
    >
      <CameraRig focus={focus} />
      <Suspense fallback={null}>
        <RoomModel
          hoveredId={hoveredId}
          onHover={setHoveredId}
          onSelect={onFocusChange}
          onHotspotsReady={handleHotspotsReady}
          onOpenOrFocusMusic={onOpenOrFocusMusic}
        />
        <BookMarkers onOpenBook={onOpenBook} onHoverBook={onHoverBook} />
      </Suspense>
    </Canvas>
  )
}

export default SceneCanvas
