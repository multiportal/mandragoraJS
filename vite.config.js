import { defineConfig } from 'vite'

export default defineConfig({
  /*assetsInclude: ['** /*.html'],*/
  base: './',
  root: './',
  build: {
    outDir: 'docs',
  },
  publicDir: 'public',
})