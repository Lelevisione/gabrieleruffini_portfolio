import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Desktop, { DesktopIcon } from '../components/Desktop/Desktop'
import RoomWindow from '../components/RoomWindow'
import ReadmeWindow from '../components/WindowChrome/ReadmeWindow'
import AboutWindow from '../components/WindowChrome/AboutWindow'
import ContactsWindow from '../components/WindowChrome/ContactsWindow'
import ProjectWindow from '../components/WindowChrome/ProjectWindow'
import ResumeWindow from '../components/WindowChrome/ResumeWindow'
import MusicPlayerWindow from '../components/WindowChrome/MusicPlayerWindow'
import EbookLibraryWindow from '../components/WindowChrome/EbookLibraryWindow'
import EbookReaderWindow from '../components/WindowChrome/EbookReaderWindow'
import HeroIntro from '../components/Intro/HeroIntro'
import { useMusicPlayer } from '../hooks/useMusicPlayer'
import { ebookById } from '../data/ebooks'
import { asset } from '../lib/asset'

type WindowId = 'room' | 'readme' | 'about' | 'contacts' | 'resume' | 'music' | 'library'

function Home() {
  const [booted, setBooted] = useState(false)
  const [bootFlash, setBootFlash] = useState(false)
  const [open, setOpen] = useState<Set<WindowId>>(new Set())
  // Several project windows can sit open at once, like real documents.
  const [openProjects, setOpenProjects] = useState<string[]>([])
  // Same idea for open books: each one gets its own reader window.
  const [openBooks, setOpenBooks] = useState<string[]>([])
  // Bumped whenever the turntable is clicked while the player is already
  // open — MusicPlayerWindow watches this to bring itself back to front.
  const [musicFocusTick, setMusicFocusTick] = useState(0)
  // Owned here, not inside the player window, so the music keeps playing
  // when the window is closed — only the audio element's own mount lifecycle
  // controls playback, and that lives at this level regardless of the window.
  const player = useMusicPlayer()

  const openProject = useCallback((id: string) => {
    setOpenProjects((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const closeProject = useCallback((id: string) => {
    setOpenProjects((prev) => prev.filter((p) => p !== id))
  }, [])

  const openBook = useCallback((id: string) => {
    setOpenBooks((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const closeBook = useCallback((id: string) => {
    setOpenBooks((prev) => prev.filter((b) => b !== id))
  }, [])

  const openWindow = useCallback((id: WindowId) => {
    setOpen((prev) => new Set(prev).add(id))
  }, [])

  // The turntable's own version of "open": if the player isn't up yet, open
  // it like any other window; if it's already sitting open behind something
  // else, just bump the focus tick instead of adding a duplicate.
  const openOrFocusMusic = useCallback(() => {
    if (open.has('music')) {
      setMusicFocusTick((t) => t + 1)
    } else {
      openWindow('music')
    }
  }, [open, openWindow])

  const closeWindow = useCallback((id: WindowId) => {
    setOpen((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }, [])

  const handleBoot = useCallback(() => {
    setBooted(true)
    setBootFlash(true)
  }, [])

  const handleReset = useCallback(() => {
    setOpen(new Set())
    setOpenProjects([])
    setOpenBooks([])
    setBooted(false)
    player.pause()
  }, [player])

  // Drop the flash overlay once it has finished fading, rather than leaving a
  // full-screen element parked on top of the desktop forever.
  useEffect(() => {
    if (!bootFlash) return
    const t = setTimeout(() => setBootFlash(false), 950)
    return () => clearTimeout(t)
  }, [bootFlash])

  // The intro needs a tall scrollable page; the desktop must not scroll at all.
  // Always land at the top: on reset the intro remounts and reads scroll position
  // immediately, so a stale offset would send it straight back to the desktop.
  useEffect(() => {
    document.body.style.overflow = booted ? 'hidden' : ''
    window.scrollTo(0, 0)
    return () => {
      document.body.style.overflow = ''
    }
  }, [booted])

  if (!booted) return <HeroIntro onComplete={handleBoot} />

  // A 2x2 grid plus one, all sitting on .desktop-icon-mask (see Desktop.tsx)
  // instead of individually hunting for gaps in the painted wallpaper art —
  // that mask is verified flat from y:0 to ~55.6% and x:0 to ~13.5%. Two
  // columns at x:3.5/10 keep each 112px-wide icon box safely inside it;
  // portfolio.exe sits alone on the row below, centred under the other four.
  const icons: DesktopIcon[] = [
    {
      id: 'tutorial',
      icon: asset('assets/icons/search.png'),
      label: 'tutorial',
      x: 3.5,
      y: 6,
      onOpen: () => openWindow('readme'),
    },
    {
      id: 'library',
      icon: asset('assets/icons/text_file_2.png'),
      label: 'library',
      x: 10,
      y: 6,
      onOpen: () => openWindow('library'),
    },
    {
      id: 'resume',
      icon: asset('assets/icons/folder_open.png'),
      label: 'resume',
      x: 3.5,
      y: 18,
      onOpen: () => openWindow('resume'),
    },
    {
      id: 'music',
      icon: asset('assets/icons/music.png'),
      label: 'lofi player',
      x: 10,
      y: 18,
      onOpen: () => openWindow('music'),
    },
    {
      id: 'portfolio',
      icon: asset('assets/icons/program.png'),
      label: 'portfolio.exe',
      x: 6.75,
      y: 30,
      onOpen: () => openWindow('room'),
    },
  ]

  return (
    <Desktop icons={icons} onReset={handleReset}>
      <AnimatePresence>
        {open.has('room') && (
          <RoomWindow
            key="room"
            onClose={() => closeWindow('room')}
            onOpenAbout={() => openWindow('about')}
            onOpenContacts={() => openWindow('contacts')}
            onOpenProject={openProject}
            onOpenBook={openBook}
            onOpenOrFocusMusic={openOrFocusMusic}
          />
        )}
        {open.has('readme') && <ReadmeWindow key="readme" onClose={() => closeWindow('readme')} />}
        {open.has('about') && <AboutWindow key="about" onClose={() => closeWindow('about')} />}
        {open.has('contacts') && (
          <ContactsWindow key="contacts" onClose={() => closeWindow('contacts')} />
        )}
        {open.has('resume') && (
          <ResumeWindow key="resume" onClose={() => closeWindow('resume')} />
        )}
        {open.has('music') && (
          <MusicPlayerWindow
            key="music"
            player={player}
            onClose={() => closeWindow('music')}
            focusTick={musicFocusTick}
          />
        )}
        {open.has('library') && (
          <EbookLibraryWindow key="library" onClose={() => closeWindow('library')} onOpenBook={openBook} />
        )}
        {openProjects.map((id, i) => (
          <ProjectWindow key={id} projectId={id} index={i} onClose={() => closeProject(id)} />
        ))}
        {openBooks.map((id) => {
          const book = ebookById(id)
          if (!book) return null
          return <EbookReaderWindow key={id} book={book} onClose={() => closeBook(id)} />
        })}
      </AnimatePresence>
      {bootFlash && <div className="boot-flash" />}
      {/* Always mounted, independent of whether the player window is open, so
          closing the window doesn't stop playback. */}
      <audio
        ref={player.audioRef}
        src={player.track.file}
        onTimeUpdate={player.handleTimeUpdate}
        onLoadedMetadata={player.handleLoadedMetadata}
        onEnded={player.onEnded}
      />
    </Desktop>
  )
}

export default Home
