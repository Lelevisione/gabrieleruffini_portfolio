import { useCallback, useEffect, useRef, useState } from 'react'
import { TRACKS } from '../data/tracks'

/**
 * Owns playback state and the single <audio> element. Called once in Home, so
 * the audio itself lives above the player window's mount lifecycle: closing
 * the window hides the UI but never stops the music, the same way a real
 * media player keeps playing after you close its window.
 */
export function useMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.6)
  const [progress, setProgress] = useState(0) // seconds
  const [duration, setDuration] = useState(0) // seconds

  const track = TRACKS[trackIndex]

  useEffect(() => {
    const el = audioRef.current
    if (el) el.volume = volume
  }, [volume])

  // Loading a new track always resumes playback — selecting a track from the
  // playlist (or hitting next/prev) is an unambiguous "play this" gesture.
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    el.currentTime = 0
    setProgress(0)
    if (isPlaying) {
      el.play().catch(() => {
        /* Autoplay can be blocked before the user has interacted with the
           page at all; the play button remains available either way. */
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex])

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => {})
    setIsPlaying(true)
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) pause()
    else play()
  }, [isPlaying, pause, play])

  const next = useCallback(() => {
    setTrackIndex((i) => (i + 1) % TRACKS.length)
    setIsPlaying(true)
  }, [])

  const prev = useCallback(() => {
    setTrackIndex((i) => (i - 1 + TRACKS.length) % TRACKS.length)
    setIsPlaying(true)
  }, [])

  const selectTrack = useCallback((index: number) => {
    setTrackIndex(index)
    setIsPlaying(true)
  }, [])

  const seek = useCallback((seconds: number) => {
    const el = audioRef.current
    if (!el) return
    el.currentTime = seconds
    setProgress(seconds)
  }, [])

  const handleTimeUpdate = useCallback(() => {
    const el = audioRef.current
    if (el) setProgress(el.currentTime)
  }, [])

  const handleLoadedMetadata = useCallback(() => {
    const el = audioRef.current
    if (el) setDuration(el.duration)
  }, [])

  return {
    audioRef,
    track,
    trackIndex,
    isPlaying,
    volume,
    progress,
    duration,
    setVolume,
    play,
    pause,
    toggle,
    next,
    prev,
    selectTrack,
    seek,
    handleTimeUpdate,
    handleLoadedMetadata,
    onEnded: next,
  }
}

export type MusicPlayerState = ReturnType<typeof useMusicPlayer>
