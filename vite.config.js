import { defineConfig } from 'vite'

export default defineConfig({
  /*assetsInclude: ['** /*.html'],*/
  base: '/mandragoraJS/',
  root: './',
  build: {
    outDir: 'web',
  },
  publicDir: 'public',
})