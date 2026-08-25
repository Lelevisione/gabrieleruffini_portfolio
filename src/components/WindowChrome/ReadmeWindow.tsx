import WindowFrame from './WindowFrame'

interface ReadmeWindowProps {
  onClose: () => void
}

const CATEGORIES: { object: string; category: string; note?: string }[] = [
  { object: 'The desk with the computer', category: 'UI/UX & web design' },
  { object: 'The cork board', category: 'graphic design' },
  { object: 'The headset on the drawers', category: 'XR' },
  { object: 'The radio on the shelf', category: 'social' },
  { object: 'The abacus on the side table', category: 'data science', note: 'work in progress' },
]

function ReadmeWindow({ onClose }: ReadmeWindowProps) {
  return (
    <WindowFrame title="readme.txt" onClose={onClose} left="6%" top="12%" sizeClass="win-window--readme">
      <div className="win-sunken readme-body">
        <h2 className="readme-h">HOW THIS WORKS</h2>
        <p>
          This portfolio is a room. Every object inside it stands for a field of work, and
          you get through it by exploring.
        </p>

        <h3 className="readme-h2">Getting started</h3>
        <ol className="readme-list">
          <li>
            Open <b>portfolio.exe</b> from the desktop.
          </li>
          <li>
            Move the mouse over the room: the <b>interactive objects light up</b>. The rest
            is just furniture.
          </li>
          <li>
            Click one: the camera moves in and the projects for that category appear.
          </li>
          <li>
            Click the × on the panel, or an empty spot in the room, to pull back out.
          </li>
        </ol>

        <h3 className="readme-h2">What's where</h3>
        <table className="readme-table">
          <tbody>
            {CATEGORIES.map((c) => (
              <tr key={c.category}>
                <td className="readme-td-obj">{c.object}</td>
                <td>
                  {c.category}
                  {c.note && <span className="readme-note"> · {c.note}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="readme-foot">
          The view is isometric and locked on purpose: there's no need to rotate the room,
          the camera already frames each object the right way. Windows drag around by their
          title bar, like on a real desktop.
        </p>
      </div>
    </WindowFrame>
  )
}

export default ReadmeWindow
