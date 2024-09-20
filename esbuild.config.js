// esbuild.config.js
const esbuild = require('esbuild')
const alias = require('esbuild-plugin-alias')
const path = require('path')

esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/main.js',
  platform: 'node',
  sourcemap: true, // opcional
  plugins: [
    alias({
      '@': path.resolve(__dirname, 'src')
    })
  ]
}).catch(() => process.exit(1))
