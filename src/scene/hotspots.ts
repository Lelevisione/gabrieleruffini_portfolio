export interface HotspotDef {
  /** Stable id used by UI/data. */
  id: string
  /** Node name in room.glb, without Blender's numeric duplicate suffix. */
  nodeName: string
  label: string
  /** Zoom level when focused: frustum height in world units. Smaller = closer. */
  focusHeight: number
  /**
   * Direction the camera sits in, relative to the object, in Three.js space.
   * Omit to keep the room's locked isometric angle (the camera only dollies in).
   * Set it to the object's front normal for a straight-on view — measured from
   * the Blender transform, converted (x, y, z)blender -> (x, z, -y)three.
   */
  viewDir?: [number, number, number]
  /**
   * How far left of centre the object sits, as a fraction of frustum width,
   * leaving room for the project panel on the right. Defaults to 0.22;
   * lower (or negative) values push the object back toward the right.
   */
  focusShift?: number
  /** Marks the WIP category — content handled by the UI, not the model. */
  wip?: boolean
  /**
   * Escape hatch for hotspots that aren't a project category: instead of the
   * normal camera-focus + project-panel flow, RoomModel routes the click to
   * a dedicated callback and never touches focusedId at all. focusHeight is
   * required by the type but unused for these — the camera never moves.
   */
  onClickAction?: 'open-music'
}

export const HOTSPOTS: HotspotDef[] = [
  // Desk and corkboard read well from the room's isometric angle — left as-is.
  { id: 'uiux', nodeName: 'hotspot_uiux_desk', label: 'UI/UX & Web Design', focusHeight: 1.5 },
  { id: 'graphicdesign', nodeName: 'hotspot_graphicdesign_corkboard', label: 'Graphic Design', focusHeight: 1.3 },

  // Headset was turned to face out into the room, so a straight-on view keeps the
  // room itself as the backdrop instead of the empty space outside the walls.
  // Swung 30° toward the headset's own right so the frame catches the side and
  // strap too — dead-on, the silhouette barely reads as a headset.
  { id: 'xr', nodeName: 'hotspot_xr_vrheadset', label: 'XR', focusHeight: 0.42, viewDir: [0.066, 0, 0.998], focusShift: 0.06 },

  // Both sit on the right-hand wall facing -X, so a straight-on view drops the
  // isometric angle entirely and squares up to their front face.
  { id: 'social', nodeName: 'hotspot_social_radio', label: 'Social', focusHeight: 0.85, viewDir: [-1, 0, 0] },
  { id: 'datascience', nodeName: 'hotspot_datascience_abacus', label: 'Data Science', focusHeight: 0.7, viewDir: [-1, 0, 0], wip: true },

  // Not a project category — a standalone object wired straight to the lofi
  // player window instead. Still gets the same real hover-glow as everything
  // above (it's a genuine standalone mesh, unlike the fused bookshelf).
  { id: 'music-player', nodeName: 'deco_giradischi_01', label: 'Lofi Player', focusHeight: 0.5, onClickAction: 'open-music' },
]

/**
 * Blender appends a fixed 3-digit duplicate suffix (".001", ".002", ...) to
 * duplicated objects, and three.js's GLTFLoader then strips the dot when
 * sanitising node names — so "hotspot_uiux_desk.001" arrives as
 * "hotspot_uiux_desk001". Tolerate both forms.
 *
 * Try the exact name first, then strip exactly those 3 trailing digits (not
 * "any trailing digits") — deco_giradischi_01 itself ends in a digit, so a
 * greedy digit-strip would clip into the real name instead of just the
 * Blender suffix. Blender's suffix is always zero-padded to 3 digits, so
 * this stays unambiguous regardless of what the base name ends in.
 */
export function hotspotFromNodeName(name: string): HotspotDef | undefined {
  const exact = HOTSPOTS.find((h) => h.nodeName === name)
  if (exact) return exact
  const suffixStripped = /\d{3}$/.test(name) ? name.slice(0, -3) : name
  return HOTSPOTS.find((h) => h.nodeName === suffixStripped)
}
