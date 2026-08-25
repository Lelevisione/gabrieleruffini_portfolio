import { useEffect, useRef } from 'react'
import { asset } from '../../lib/asset'

const HERO_URL = `url('${asset('assets/img/hero.png')}')`

interface HeroIntroProps {
  onComplete: () => void
}

/**
 * Full-screen hero that tears itself apart as the page is scrolled, blows out
 * to white, and hands over to the desktop. All the visual work is CSS driven by
 * a single --p custom property (0 → 1); this component only measures scroll.
 */
function HeroIntro({ onComplete }: HeroIntroProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const done = useRef(false)

  // Hide the viewport scrollbar for as long as the intro is on screen; the
  // page still scrolls, the bar just doesn't sit over the artwork.
  useEffect(() => {
    document.documentElement.classList.add('intro-active')
    return () => document.documentElement.classList.remove('intro-active')
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let raf = 0
    const update = () => {
      raf = 0
      // How far through the runway we are: 0 at the top, 1 once the sticky
      // panel has been scrolled past its full height.
      const total = el.offsetHeight - window.innerHeight
      const p = total > 0 ? Math.min(Math.max(window.scrollY / total, 0), 1) : 0

      stickyRef.current?.style.setProperty('--p', String(p))

      if (p >= 0.995 && !done.current) {
        done.current = true
        onComplete()
      }
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [onComplete])

  return (
    <div className="intro-scroll" ref={scrollRef}>
      <div
        className="intro-sticky"
        ref={stickyRef}
        style={{ ['--hero' as string]: HERO_URL, ['--p' as string]: 0 }}
      >
        <div className="glitch" />
        <div className="glitch-tear tear-1" />
        <div className="glitch-tear tear-2" />
        <div className="glitch-tear tear-3" />
        <div className="glitch-scanlines" />
        <div className="glitch-flash" />
        <div className="intro-hint">
          <span className="intro-hint-pill">SCROLL</span>
          <span className="intro-hint-bob">
            <span className="intro-hint-arrow" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default HeroIntro
