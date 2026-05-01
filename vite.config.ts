import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
      // Base '/' asegura que las rutas de los assets (CSS/JS) empiecen desde la raíz
      base: '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
      },
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
      },
      test: {
        environment: 'node',
        globals: true,
      },
    };
});