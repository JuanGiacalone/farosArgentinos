import { fileURLToPath, URL } from 'node:url'
import * as path from 'path';
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'

// // // https://vitejs.dev/config/
// // export default defineConfig({
// //   plugins: [
// //     vue2(),
// //     legacy({
// //       targets: ['ie >= 11'],
// //       additionalLegacyPolyfills: ['regenerator-runtime/runtime']
// //     })
// //   ],
// //   resolve: {
// //     alias: {
// //       '@': fileURLToPath(new URL('./src', import.meta.url))
// //     }
// //   }
// // })

// vite.config.js



const config = defineConfig({
  rollupOptions: {
    plugins: [
      vue2(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'] 
      }),
    ],
    output: {
      format: 'es'
    },
  },
  plugins: [
    vue2(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'] 
    })
  ],
  resolve: {    
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)) }
    },
  build: {
    entry: path.resolve(__dirname, '.') + '/index.html',
  }
})

export default config;