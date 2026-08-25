import { useRef, useLayoutEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const ORIGIN = new THREE.Vector3(0, 0, 0)
const UP = new THREE.Vector3(0, 1, 0)
const CAM_DISTANCE = 20

/** The room's default locked isometric angle. */
const ISO_DIR = new THREE.Vector3(-4, 2.6, 4).normalize()

// Room extents measured once in camera space (half-width/height of the projected
// bounding box) plus its projected centre, for the wide default view.
const ROOM_HALF_W = 2.895
const ROOM_HALF_H = 2.228
const ROOM_CENTER = new THREE.Vector3(0.045, 1.038, 0.011)
const MARGIN = 1.06

/**
 * Camera orientation for a given viewing direction. Must go through
 * Matrix4.lookAt(eye, target, up): Object3D.lookAt() aims +Z at the target for
 * ordinary objects but -Z for cameras, so building this from a plain Object3D
 * dummy points the camera 180° away and renders an empty frame.
 */
export function quatFromViewDir(dir: THREE.Vector3): THREE.Quaternion {
  const m = new THREE.Matrix4().lookAt(dir, ORIGIN, UP)
  return new THREE.Quaternion().setFromRotationMatrix(m)
}

const ISO_QUAT = quatFromViewDir(ISO_DIR)

/** Default fraction of frustum width to shift the aim point right (object moves left). */
const DEFAULT_FOCUS_SHIFT = 0.22
/** Higher = snappier. Frame-rate independent via exponential damping. */
const DAMPING = 3.2

export interface FocusTarget {
  position: THREE.Vector3
  focusHeight: number
  /** Omit to hold the isometric angle and merely dolly in. */
  quat?: THREE.Quaternion
  /** Per-hotspot override for how far left of centre the object sits. */
  focusShift?: number
}

interface CameraRigProps {
  focus: FocusTarget | null
}

function CameraRig({ focus }: CameraRigProps) {
  const camRef = useRef<THREE.OrthographicCamera>(null)
  const { set, size } = useThree()

  // Animated state kept in a ref so it survives re-renders without restarting.
  const current = useRef<{ center: THREE.Vector3; height: number; quat: THREE.Quaternion } | null>(null)

  const aspect = size.width > 0 && size.height > 0 ? size.width / size.height : 16 / 9
  // Default view fits BOTH axes — a fixed height alone crops the room sideways
  // as soon as the canvas is narrower than the room's own aspect ratio.
  const defaultHeight = Math.max(ROOM_HALF_H * 2, (ROOM_HALF_W * 2) / aspect) * MARGIN

  useLayoutEffect(() => {
    const cam = camRef.current
    if (!cam) return
    if (!current.current) {
      current.current = {
        center: ROOM_CENTER.clone(),
        height: defaultHeight,
        quat: ISO_QUAT.clone(),
      }
    }
    // Fully valid camera BEFORE the first render — leaving the frustum to the
    // first useFrame left R3F rendering one frame through a default 2×2 frustum.
    const cur = current.current
    const w = cur.height * aspect
    cam.left = -w / 2
    cam.right = w / 2
    cam.top = cur.height / 2
    cam.bottom = -cur.height / 2
    // Tight depth range around the fixed camera distance: a needlessly wide
    // near/far span wastes depth-buffer precision and invites z-fighting.
    cam.near = 8
    cam.far = 34
    cam.quaternion.copy(cur.quat)
    cam.position.copy(cur.center).addScaledVector(ISO_DIR, CAM_DISTANCE)
    cam.updateProjectionMatrix()
    set({ camera: cam })
  }, [set, defaultHeight, aspect])

  useFrame((_, delta) => {
    const cam = camRef.current
    const cur = current.current
    if (!cam || !cur) return

    const targetHeight = focus ? focus.focusHeight : defaultHeight
    const targetQuat = focus?.quat ?? ISO_QUAT

    // Off-centre shift uses the TARGET orientation, not the animating one, so the
    // aim point doesn't wobble while the camera is still rotating into place.
    let targetCenter: THREE.Vector3
    if (focus) {
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(targetQuat)
      const shift = focus.focusShift ?? DEFAULT_FOCUS_SHIFT
      targetCenter = focus.position
        .clone()
        .addScaledVector(right, targetHeight * aspect * shift)
    } else {
      targetCenter = ROOM_CENTER
    }

    // Exponential damping: same easing regardless of frame rate.
    const t = 1 - Math.exp(-DAMPING * delta)
    cur.height += (targetHeight - cur.height) * t
    cur.center.lerp(targetCenter, t)
    cur.quat.slerp(targetQuat, t)

    const frustumHeight = cur.height
    const frustumWidth = frustumHeight * aspect
    cam.left = -frustumWidth / 2
    cam.right = frustumWidth / 2
    cam.top = frustumHeight / 2
    cam.bottom = -frustumHeight / 2
    cam.quaternion.copy(cur.quat)
    // Pull back along the camera's own +Z so this works at any orientation.
    const back = new THREE.Vector3(0, 0, 1).applyQuaternion(cur.quat)
    cam.position.copy(cur.center).addScaledVector(back, CAM_DISTANCE)
    cam.updateProjectionMatrix()
  })

  return <orthographicCamera ref={camRef} />
}

export default CameraRig
