import { defineConfig } from 'vite'

export default defineConfig({
  /*assetsInclude: ['** /*.html'],*/
  base: './', //Configuarar para [spa -> '/'] para [hash -> './'] // /mandragoraJS/
  root: './',
  build: {
    outDir: 'docs',
  },
  publicDir: 'public',
  envDir: ".env"
})