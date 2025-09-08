import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

import svgLoader from 'vite-svg-loader';

// https://vite.dev/config/
export default defineConfig({
  publicDir: './src/assets',
  plugins: [
    vue(),
    vueDevTools(),
    svgLoader({ defaultImport: 'component' }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/colors.scss";
          @use "@/styles/typo.scss";
          @use "@/styles/main.scss";
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
