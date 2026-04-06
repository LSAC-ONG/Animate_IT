import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,   // am adaugat ca sa imi dea refresh la schimbari fiindca am WSL 
      interval: 1000,     
    },
  },
})
