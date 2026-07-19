import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    // Only meaningfully runs its output on build, not dev — fine as is.
    visualizer({ open: false, filename: 'stats.html' })
  ],
  server: {
    allowedHosts: ['.ngrok-free.dev', '.ngrok-free.app']
  },
  build: {
    target: 'esnext',
    sourcemap: false,
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // GSAP isn't installed yet, but kept here since you're actively
          // adding it — this rule is a no-op until the package exists.
          if (id.includes('gsap')) return 'chunk-gsap'

          if (id.includes('framer-motion')) return 'chunk-framer'

          if (id.includes('node_modules')) return 'chunk-vendor'
        }
      }
    }
  }
})