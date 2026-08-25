import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from a GitHub Pages project site (https://lelevisione.github.io/gabrieleruffini_portfolio/),
// not domain root, so every asset URL needs this prefix baked in.
export default defineConfig({
  plugins: [react()],
  base: '/gabrieleruffini_portfolio/',
})
