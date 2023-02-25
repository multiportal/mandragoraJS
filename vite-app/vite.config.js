import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { createHtmlPlugin } from 'vite-plugin-html'

import {defineConfig} from 'vite'

// vite.config.js
export default defineConfig({
  assetsInclude: ['**/*.html'],
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'partials'),
    }),
  ],
  //base: '/vite-app/'
})

/*
export default {
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'partials'),
    }),
  ],
};
*/