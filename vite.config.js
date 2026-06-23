import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/daily-reps-app/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
