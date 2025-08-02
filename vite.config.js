import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        // Ajout du support M4A
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,mp3,wav,ogg,m4a}'],
        runtimeCaching: [
          {
            // Support M4A dans le cache
            urlPattern: /\.(?:mp3|wav|ogg|m4a)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'audio-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60
              }
            }
          }
        ]
      },
      // ... reste de la config
    })
  ],
  // Support M4A dans les assets
  assetsInclude: ['**/*.mp3', '**/*.wav', '**/*.ogg', '**/*.m4a'],
  // ... reste de la config
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          // Support M4A
          if (/\.(mp3|wav|ogg|m4a)$/i.test(assetInfo.name)) {
            return `assets/audio/[name]-[hash][extname]`;
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (ext === 'css') {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    }
  }
})
