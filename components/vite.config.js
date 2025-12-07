// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // ** IMPORTANTE: Esta es la línea que soluciona el problema de Vercel **
  base: './', 
  
  plugins: [react()],
  
  // Si tienes errores de mayúsculas/minúsculas en los archivos
  // En este punto, no es necesario, pero lo dejo por si acaso:
  // resolve: {
  //   alias: {
  //     // Puedes agregar aliases si tienes problemas con las rutas
  //   }
  // }
});