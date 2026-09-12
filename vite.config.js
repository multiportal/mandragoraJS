import { defineConfig } from 'vite'

export default defineConfig({
  /*assetsInclude: ['** /*.html'],*/
  base: '/', //Configuarar para [spa -> '/'] para [hash -> './'] // /mandragoraJS/
  root: './',
  build: {
    outDir: 'web',
  },
  publicDir: 'public',
  envDir: ".env"
})