import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
      // Base '/' asegura que las rutas de los assets (CSS/JS) empiecen desde la raíz
      base: '/', 
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          // Corregimos el alias para que apunte a la carpeta src
          '@': path.resolve(__dirname, './src'),
        }
      },
      build: {
        // Esto ayuda a que los nombres de archivos sean limpios
        outDir: 'dist',
        assetsDir: 'assets',
      }
    };
});