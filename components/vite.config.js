import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.API_KEY': JSON.stringify("AIzaSyC0SA_dMAsU3-MPbiIAEiVIUE5LSpyKRMk")
  }
})