import WindowFrame from './WindowFrame'
import { EBOOKS } from '../../data/ebooks'

interface EbookLibraryWindowProps {
  onClose: () => void
  onOpenBook: (id: string) => void
}

function EbookLibraryWindow({ onClose, onOpenBook }: EbookLibraryWindowProps) {
  return (
    <WindowFrame title="library.exe" onClose={onClose} left="30%" top="14%" sizeClass="win-window--library">
      <div className="win-sunken readme-body">
        <div className="doc-hero">
          <p className="doc-hero-eyebrow">On the shelf</p>
          <h2 className="doc-hero-title">Library</h2>
        </div>

        <ul className="library-list">
          {EBOOKS.map((b) => (
            <li
              key={b.id}
              className="library-item"
              tabIndex={0}
              onDoubleClick={() => onOpenBook(b.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onOpenBook(b.id)
              }}
            >
              <img src={b.cover} alt="" className="library-item-cover" />
              <div className="library-item-info">
                <h3 className="library-item-title">{b.title}</h3>
                <p className="library-item-sub">{b.subtitle}</p>
                <p className="library-item-pages">{b.pageCount} pages</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="library-hint">Double-click a book to open it.</p>
      </div>
    </WindowFrame>
  )
}

export default EbookLibraryWindow
