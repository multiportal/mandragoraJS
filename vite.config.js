import { defineConfig } from 'vite'

export default defineConfig({
  /*assetsInclude: ['** /*.html'],*/
  base: './',
  root: './',
  build: {
    outDir: 'web',
  },
  publicDir: 'public',
})