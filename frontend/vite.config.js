import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible'

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix:"REACT_APP_",
  
  plugins: [
    react(),
    envCompatible(),],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8000/',
          changeOrigin: true,
        }
      }
    }
})
