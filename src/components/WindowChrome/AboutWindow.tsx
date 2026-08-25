import WindowFrame from './WindowFrame'

interface AboutWindowProps {
  onClose: () => void
}

function AboutWindow({ onClose }: AboutWindowProps) {
  return (
    <WindowFrame title="about_me.txt" onClose={onClose} left="24%" top="18%" sizeClass="win-window--text">
      <div className="win-sunken readme-body">
        <div className="doc-hero">
          <p className="doc-hero-eyebrow">Who&apos;s behind the desk</p>
          <h2 className="doc-hero-title">About Me</h2>
        </div>

        <p>
          I&apos;m Gabriele, a digital creative based between Carrara and Pisa, in Tuscany. My work moves
          between graphic design, web design and social media strategy, with the occasional detour into
          3D and interaction design, this room you&apos;re standing in being the clearest example.
        </p>
        <p>
          I studied the history of graphic design before I studied code, and it still shows: I care as
          much about where a visual idea comes from as about whether the button actually works. Right
          now I&apos;m finishing a Master&apos;s in Digital Humanities at the University of Pisa, which
          is really just an official way of saying I like building bridges between technical rigor and
          design sensibility.
        </p>
        <p>
          Outside client work I host visitors at a museum, volunteer on rebrands for local meetups, and
          apparently build entire vaporwave operating systems in my spare time. Figma, Blender and Unity
          are usually open somewhere in the background.
        </p>
      </div>
    </WindowFrame>
  )
}

export default AboutWindow
