import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/reacttaskapi/',  // <-- Add this
  plugins: [react()],
})
