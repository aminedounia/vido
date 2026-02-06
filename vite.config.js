import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all addresses
    port: 5173, // or your preferred port
    strictPort: false, // if true, won't try other ports if specified port is busy
  },
  base: '/', // Ensure this is set to root
})
