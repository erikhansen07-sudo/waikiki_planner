import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path is set for GitHub Pages project site.
// If you rename the repo, update `base` to match `/<repo-name>/`.
export default defineConfig({
  plugins: [react()],
  base: '/Hawaii/',
})
