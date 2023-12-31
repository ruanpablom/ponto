import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const manifestForPlugIn: Partial<VitePWAOptions> = {
  strategies: 'injectManifest',
  manifest: {
    name: 'Ponto RPMDev',
    short_name: 'Ponto',
    scope: '/ponto/',
    start_url: '/ponto/',
    description: 'Um app para registrar o ponto',
    icons: [
      {
        src: 'android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: 'android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: 'apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: 'maskable_icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: 'favicon.ico',
        type: 'image/x-icon',
        purpose: 'any maskable',
      },
    ],

    theme_color: '#ba4949',
    background_color: '#ba4949',
    display: 'standalone',
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
