import { useRef, useLayoutEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Locked isometric view direction.
const VIEW_DIR = new THREE.Vector3(-4, 2.6, 4).normalize()

// Room extents measured once in camera space (half-width / half-height of the
// model's projected bounding box) and its projected centre. Hardcoding these
// avoids recomputing a Box3 at runtime — an earlier attempt did that from a
// second useGLTF() call on the same asset, which broke rendering outright.
// If the room model's footprint changes, re-measure these three constants.
const ROOM_HALF_W = 2.895
const ROOM_HALF_H = 2.228
const ROOM_CENTER = new THREE.Vector3(0.045, 1.038, 0.011)
const MARGIN = 1.06

function IsoCamera() {
  const camRef = useRef<THREE.OrthographicCamera>(null)
  const { set, size } = useThree()

  useLayoutEffect(() => {
    const cam = camRef.current
    if (!cam || size.width <= 0 || size.height <= 0) return

    const aspect = size.width / size.height

    // Fit BOTH axes: a fixed frustum height alone crops the room horizontally
    // as soon as the canvas gets narrower than the room's own aspect ratio.
    const frustumHeight = Math.max(ROOM_HALF_H * 2, (ROOM_HALF_W * 2) / aspect) * MARGIN
    const frustumWidth = frustumHeight * aspect

    cam.left = -frustumWidth / 2
    cam.right = frustumWidth / 2
    cam.top = frustumHeight / 2
    cam.bottom = -frustumHeight / 2
    cam.near = 0.1
    cam.far = 60
    cam.position.copy(ROOM_CENTER).addScaledVector(VIEW_DIR, 20)
    cam.lookAt(ROOM_CENTER)
    cam.updateProjectionMatrix()
    set({ camera: cam })
  }, [size.width, size.height, set])

  return <orthographicCamera ref={camRef} />
}

export default IsoCamera
