export interface Track {
  id: string
  title: string
  artist: string
  file: string
}

/** Royalty-free lofi tracks, stored in public/assets/audio/. */
export const TRACKS: Track[] = [
  {
    id: 'slow-raining',
    title: 'Slow Raining',
    artist: 'AllWorldMusic',
    file: '/assets/audio/allworldmusic-lofi-slow-raining-259042.mp3',
  },
  {
    id: 'paper-dust-loop',
    title: 'Paper Dust Loop',
    artist: 'LofCosmos',
    file: '/assets/audio/lofcosmos-paper-dust-loop-580808.mp3',
  },
  {
    id: 'paper-rain-desk',
    title: 'Paper Rain Desk',
    artist: 'LofCosmos',
    file: '/assets/audio/lofcosmos-paper-rain-desk-1-580817.mp3',
  },
  {
    id: 'natures-reserve',
    title: "Nature's Reserve",
    artist: 'Snoozy Beats',
    file: '/assets/audio/snoozybeats-naturex27s-reserve-325859.mp3',
  },
  {
    id: 'peace-with-nature',
    title: 'Peace with Nature',
    artist: 'Unknown',
    file: '/assets/audio/u_diz10qg8wi-peace-with-nature-160075.mp3',
  },
  {
    id: 'midnight-study-session',
    title: 'Midnight Study Session',
    artist: 'Wings of Freedom',
    file: '/assets/audio/wings_of_freedom-lofi-midnight-study-session-479471.mp3',
  },
]
