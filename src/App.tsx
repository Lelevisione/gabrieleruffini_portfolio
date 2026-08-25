import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProjectCaseStudy from './pages/ProjectCaseStudy'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Opened from the room's "learn more" button, in a new tab — its own
            real URL, so a case study is linkable and shareable on its own. */}
        <Route path="/projects/:id" element={<ProjectCaseStudy />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
