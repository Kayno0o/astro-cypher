import { defineConfig } from 'astro/config'
// @ts-check
import UnoCSS from 'unocss/astro'
import { loadEnv } from 'vite'

const { APP_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), '')

// https://astro.build/config
export default defineConfig({
  integrations: [UnoCSS({
    injectReset: true,
  })],
  server: {
    allowedHosts: [String(APP_URL)],
  },
})
