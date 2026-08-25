import WindowFrame from './WindowFrame'

interface ContactsWindowProps {
  onClose: () => void
}

interface ContactEntry {
  icon: string
  label: string
  value: string
  href?: string
}

const CONTACTS: ContactEntry[] = [
  { icon: 'mail', label: 'Email', value: 'gabrieleruffini@icloud.com', href: 'mailto:gabrieleruffini@icloud.com' },
  {
    icon: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/gabrieleruffini',
    href: 'https://www.linkedin.com/in/gabrieleruffini',
  },
  {
    icon: 'instagram',
    label: 'Instagram',
    value: '@lelevisione',
    href: 'https://instagram.com/lelevisione',
  },
  { icon: 'map-pin', label: 'Location', value: 'Tuscany, Italy' },
]

function ContactsWindow({ onClose }: ContactsWindowProps) {
  return (
    <WindowFrame title="contacts.txt" onClose={onClose} left="34%" top="30%" sizeClass="win-window--text">
      <div className="win-sunken readme-body">
        <div className="doc-hero">
          <p className="doc-hero-eyebrow">Say hello</p>
          <h2 className="doc-hero-title">Contacts</h2>
        </div>

        <ul className="contact-list">
          {CONTACTS.map((c) => (
            <li key={c.label} className="contact-row">
              <span
                className="contact-icon-badge"
                aria-hidden="true"
              >
                <span
                  className="resume-icon"
                  style={{ ['--icon' as string]: `url(/assets/icons/pixelart/${c.icon}.svg)` }}
                />
              </span>
              <span className="contact-info">
                <span className="contact-label">{c.label}</span>
                {c.href ? (
                  <a className="contact-value" href={c.href} target="_blank" rel="noopener noreferrer">
                    {c.value}
                  </a>
                ) : (
                  <span className="contact-value">{c.value}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </WindowFrame>
  )
}

export default ContactsWindow
