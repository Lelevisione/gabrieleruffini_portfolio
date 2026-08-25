import { useEffect, useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { hotspotFromNodeName } from '../../scene/hotspots'

// Lighting is baked into vertex colors in Blender (Cycles) and displayed via an
// unlit (KHR_materials_unlit) material — no dynamic Three.js lights needed.

/** Hover tint. Unlit material colour multiplies the baked vertex colours, so a
 *  value above 1 brightens; biased toward cyan to match the project accent. */
const HOVER_TINT = new THREE.Color(1.45, 1.95, 2.05)
const NEUTRAL = new THREE.Color(1, 1, 1)

export interface HotspotEntry {
  mesh: THREE.Mesh
  position: THREE.Vector3
  focusHeight: number
}

interface RoomModelProps {
  hoveredId: string | null
  onHover: (id: string | null) => void
  onSelect: (id: string) => void
  onHotspotsReady: (map: Map<string, HotspotEntry>) => void
  /** Hotspots tagged onClickAction:'open-music' route here instead of
   *  onSelect — no camera focus, no project panel, just the player window. */
  onOpenOrFocusMusic: () => void
}

function RoomModel({ hoveredId, onHover, onSelect, onHotspotsReady, onOpenOrFocusMusic }: RoomModelProps) {
  const { scene } = useGLTF('/assets/models/room.glb')
  const hotspotMeshes = useRef<Map<string, THREE.Mesh>>(new Map())

  // Every mesh shares one baked material, so tinting it directly would light up
  // the whole room. Give each hotspot its own clone first.
  const hotspots = useMemo(() => {
    const map = new Map<string, HotspotEntry>()
    scene.updateMatrixWorld(true)
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (!mesh.isMesh) return
      const def = hotspotFromNodeName(mesh.name)
      if (!def || map.has(def.id)) return

      if (Array.isArray(mesh.material)) {
        mesh.material = mesh.material.map((m) => m.clone())
      } else {
        mesh.material = mesh.material.clone()
      }

      const box = new THREE.Box3().setFromObject(mesh)
      map.set(def.id, {
        mesh,
        position: box.getCenter(new THREE.Vector3()),
        focusHeight: def.focusHeight,
      })
    })
    hotspotMeshes.current = new Map([...map].map(([id, v]) => [id, v.mesh]))
    return map
  }, [scene])

  useEffect(() => {
    onHotspotsReady(hotspots)
  }, [hotspots, onHotspotsReady])

  // Apply/remove the hover tint.
  useEffect(() => {
    for (const [id, { mesh }] of hotspots) {
      const target = id === hoveredId ? HOVER_TINT : NEUTRAL
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      for (const m of materials) {
        const mat = m as THREE.MeshBasicMaterial
        if (mat.color) mat.color.copy(target)
      }
    }
  }, [hoveredId, hotspots])

  useEffect(() => {
    document.body.style.cursor = hoveredId ? 'pointer' : 'auto'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hoveredId])

  const defForEvent = (e: ThreeEvent<PointerEvent | MouseEvent>) => hotspotFromNodeName(e.object.name)

  // Handlers live on a wrapper group, not on <primitive> itself: attaching them
  // to the imported glTF root made R3F's event system throw on its internal
  // store lookup. Events still bubble up from the individual meshes.
  return (
    <group
      onPointerMove={(e: ThreeEvent<PointerEvent>) => {
        const def = defForEvent(e)
        if (def) e.stopPropagation()
        onHover(def ? def.id : null)
      }}
      onPointerOut={() => onHover(null)}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        const def = defForEvent(e)
        if (!def) return
        e.stopPropagation()
        if (def.onClickAction === 'open-music') {
          onOpenOrFocusMusic()
        } else {
          onSelect(def.id)
        }
      }}
    >
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/assets/models/room.glb')

export default RoomModel
