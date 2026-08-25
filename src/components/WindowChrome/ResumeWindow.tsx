import { ReactNode, useState } from 'react'
import WindowFrame from './WindowFrame'
import { asset } from '../../lib/asset'
import {
  PROFILE,
  EXPERIENCE,
  EDUCATION,
  CERTIFICATIONS,
  VOLUNTEERING,
  SKILLS,
  LANGUAGES,
  ResumeEntry,
} from '../../data/resume'

interface ResumeWindowProps {
  onClose: () => void
}

function Icon({ name }: { name: string }) {
  return <span className="resume-icon" style={{ ['--icon' as string]: `url(${asset(`assets/icons/pixelart/${name}.svg`)})` }} />
}

function Section({ icon, title, children }: { icon: string; title: string; children: ReactNode }) {
  return (
    <section className="resume-section">
      <h3 className="resume-section-h">
        <Icon name={icon} />
        {title}
      </h3>
      {children}
    </section>
  )
}

function Timeline({ items }: { items: ResumeEntry[] }) {
  return (
    <ul className="resume-timeline">
      {items.map((e) => (
        <li key={e.title + e.place} className="resume-tl-entry">
          <div className="resume-tl-rail">
            <span className="resume-tl-dot" />
          </div>
          <div className="resume-tl-body">
            <span className="resume-tl-period">{e.period}</span>
            <h4 className="resume-tl-title">{e.title}</h4>
            <p className="resume-tl-place">{e.place}</p>
            {e.meta && <p className="resume-tl-meta">{e.meta}</p>}
            {e.bullets && (
              <ul className="resume-tl-bullets">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

function ResumeWindow({ onClose }: ResumeWindowProps) {
  const [photoFailed, setPhotoFailed] = useState(false)

  return (
    <WindowFrame title="resume.doc" onClose={onClose} left="12%" top="7%" sizeClass="win-window--resume">
      <div className="win-sunken resume-doc">
        <header className="resume-header">
          <div className="win-raised resume-photo-frame">
            {photoFailed ? (
              <span className="resume-photo-fallback">
                <Icon name="user" />
              </span>
            ) : (
              <img src={PROFILE.photo} alt={PROFILE.name} onError={() => setPhotoFailed(true)} />
            )}
          </div>
          <div className="resume-heading">
            <h1 className="resume-name">{PROFILE.name}</h1>
            <p className="resume-role">{PROFILE.role}</p>
            <div className="resume-contact">
              <span className="resume-contact-item">
                <Icon name="mail" />
                {PROFILE.email}
              </span>
              <span className="resume-contact-item">
                <Icon name="map-pin" />
                {PROFILE.location}
              </span>
            </div>
          </div>
        </header>

        <div className="resume-columns">
          <aside className="resume-col resume-col--side">
            <Section icon="target" title="Skills">
              <div className="resume-tags">
                {SKILLS.map((s) => (
                  <span key={s} className="resume-tag">
                    {s}
                  </span>
                ))}
              </div>
            </Section>

            <Section icon="globe" title="Languages">
              <ul className="resume-lang-list">
                {LANGUAGES.map((l) => (
                  <li key={l.name} className="resume-lang-row">
                    <span>{l.name}</span>
                    <span className="resume-lang-level">{l.level}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </aside>

          <div className="resume-col resume-col--main">
            <Section icon="briefcase" title="Experience">
              <Timeline items={EXPERIENCE} />
            </Section>

            <Section icon="book-open" title="Education">
              <Timeline items={EDUCATION} />
            </Section>

            <Section icon="trophy" title="Certifications">
              <ul className="resume-cert-list">
                {CERTIFICATIONS.map((c) => (
                  <li key={c.title} className="resume-cert">
                    <h4 className="resume-cert-title">{c.title}</h4>
                    <p className="resume-cert-issuer">
                      {c.issuer} <span className="resume-cert-issued">Issued {c.issued}</span>
                    </p>
                    {c.credentialId && <p className="resume-cert-id">Credential ID {c.credentialId}</p>}
                  </li>
                ))}
              </ul>
            </Section>

            <Section icon="heart" title="Volunteering">
              <Timeline items={VOLUNTEERING} />
            </Section>
          </div>
        </div>
      </div>
    </WindowFrame>
  )
}

export default ResumeWindow
