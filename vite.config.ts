import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const manifestForPlugIn: Partial<VitePWAOptions> = {
  workbox: {
    globPatterns: ['**/*'],
  },
  includeAssets: [
    'favicon.ico',
    'apple-touch-icon.png',
    'masked-icon.svg',
    '**/*',
  ],
  manifest: {
    name: 'Ponto RPMDev',
    short_name: 'Ponto',
    description: 'Um app para registrar o ponto',
    icons: [
      {
        src: '/ponto/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/ponto/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/ponto/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: '/ponto/maskable_icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    theme_color: '#ba4949',
    background_color: '#ba4949',
    display: 'standalone',
    scope: '/',
    start_url: '/ponto',
    orientation: 'portrait',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
