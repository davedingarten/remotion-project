import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@project': path.resolve(__dirname, '../src'),
      // Use parent project's Remotion to avoid duplicate instances
      'remotion': path.resolve(__dirname, '../node_modules/remotion'),
      '@remotion/player': path.resolve(__dirname, '../node_modules/@remotion/player'),
      'react': path.resolve(__dirname, '../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
    },
    dedupe: ['remotion', '@remotion/player', 'react', 'react-dom'],
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
    fs: {
      allow: [
        // Allow serving files from parent project
        path.resolve(__dirname, '..'),
      ],
    },
  },
  // Serve public assets from the main project's public folder
  publicDir: path.resolve(__dirname, '../public'),
  optimizeDeps: {
    include: ['remotion', '@remotion/player'],
  },
});
