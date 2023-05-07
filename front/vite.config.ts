import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {Plugin as importToCDN, autoComplete } from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      importToCDN({
          modules: [
              autoComplete('react'),
              autoComplete('react-dom'),
              autoComplete('react-router-dom'),
              autoComplete('axios'),
          ]
      }),
      react(),
  ],
})
