interface InfoToolbarProps {
  onOpenAbout: () => void
  onOpenContacts: () => void
}

function InfoToolbar({ onOpenAbout, onOpenContacts }: InfoToolbarProps) {
  return (
    <div className="win-sunken win-toolbar">
      <div>
        <h1 className="win-toolbar-title">Hi, I'm Gabriele</h1>
        <p className="win-toolbar-bio">
          Digital creative from Tuscany, part designer, part developer, full-time nostalgic
          for interfaces that never existed. This is my actual desk. Go ahead, touch everything.
        </p>
      </div>
      <nav className="win-toolbar-nav">
        <button type="button" className="win-raised retro-btn" onClick={onOpenAbout}>
          About Me
        </button>
        <button type="button" className="win-raised retro-btn" onClick={onOpenContacts}>
          Contacts
        </button>
      </nav>
    </div>
  )
}

export default InfoToolbar
