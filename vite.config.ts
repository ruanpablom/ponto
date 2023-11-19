import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const manifestForPlugIn: Partial<VitePWAOptions> = {
  // includeAssets: [
  //   'favicon.ico',
  //   'apple-touch-icon.png',
  //   'masked-icon.svg',
  //   '**/*',
  // ],
  strategies: 'injectManifest',
  manifest: {
    name: 'Ponto RPMDev',
    short_name: 'Ponto',
    scope: '/ponto/',
    start_url: '/ponto/',
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
    orientation: 'portrait',
  },
  workbox: {
    globPatterns: ['**/*'],
    globIgnores: ['**/*.map'],
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: '/ponto',
        handler: 'NetworkFirst',
        options: {
          cacheName: 'ponto-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24, // 24 hours
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
