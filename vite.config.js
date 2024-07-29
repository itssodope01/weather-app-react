// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/weather-app-react/',
  server: {
    proxy: {
      '/api': {
        target: 'https://ai-weather-by-meteosource.p.rapidapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
