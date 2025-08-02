import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Configuration pour Vercel
  base: '/',
  
  // Configuration de build optimisée
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', 'framer-motion'],
        },
        // Noms de fichiers pour le cache
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Optimisation pour Vercel
    cssCodeSplit: true,
    cssMinify: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000
  },
  
  // Configuration du serveur de dev
  server: {
    port: 3000,
    host: true,
    open: false,
    strictPort: false
  },
  
  // Configuration preview
  preview: {
    port: 4173,
    host: true,
    strictPort: false
  },
  
  // Optimisation des dépendances
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'lucide-react',
      'framer-motion'
    ],
    exclude: []
  },
  
  // Variables d'environnement
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  },
  
  // Configuration des alias (optionnel)
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@assets': '/src/assets',
      '@utils': '/src/utils'
    }
  },
  
  // Configuration CSS
  css: {
    postcss: './postcss.config.js'
  }
})
