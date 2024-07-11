import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_OPENAI_KEY': JSON.stringify(process.env.VITE_OPENAI_KEY),
    'process.env.VITE_GOOGLE_MAPS_KEY': JSON.stringify(process.env.VITE_GOOGLE_MAPS_KEY),
    'process.env.VITE_MAP_ID': JSON.stringify(process.env.VITE_MAP_ID),
  }
})
