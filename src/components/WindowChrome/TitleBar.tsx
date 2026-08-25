interface TitleBarProps {
  title: string
  /** When given, the × becomes a real control instead of decoration. */
  onClose?: () => void
}

function TitleBar({ title, onClose }: TitleBarProps) {
  return (
    <div className="win-titlebar">
      <span className="win-titlebar-text">{title}</span>
      <div className="win-titlebar-controls">
        <span className="win-raised win-sq-btn">_</span>
        <span className="win-raised win-sq-btn">□</span>
        {onClose ? (
          <button
            type="button"
            className="win-raised win-sq-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        ) : (
          <span className="win-raised win-sq-btn">×</span>
        )}
      </div>
    </div>
  )
}

export default TitleBar
