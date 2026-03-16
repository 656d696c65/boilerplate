import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'


// https://vite.development/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.md', "**/*.woff2"],
  server: {
    host: true,
    port: 3102,
    watch: {
      usePolling: true
    },
    hmr: true,
  },
  build: {
    outDir: './build',
    rollupOptions: {
      output: {
        entryFileNames: "[name].[hash].js",
        chunkFileNames: "[name].[hash].js",
        assetFileNames: "[name].[hash].[ext]",
        manualChunks(id: string) {
          if (id.includes('react-dom')) {
            return 'react-dom'
          }
        },

      }
    }
  },
})
