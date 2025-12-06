import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    // Clave configurada correctamente
    'process.env.API_KEY': JSON.stringify("AIzaSyC0SA_dMAsU3-MPbiIAEiVIUE5LSpyKRMk")
  }
})