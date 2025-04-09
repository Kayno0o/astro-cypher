import type { IconifyJSON } from '@iconify/types'
// uno.config.ts
import { defineConfig, presetIcons, presetWebFonts, presetWind3, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Inter:400,500,700,900',
        mono: 'IBM Plex Mono',
      },
    }),
    presetIcons({
      collections: {
        // eslint-disable-next-line github/no-then
        tabler: () => import('@iconify-json/tabler/icons.json').then(iconSet => iconSet.default as IconifyJSON),
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
  safelist: [
    'text-red-7',
  ],
  shortcuts: [
    {
      'content-wrapper': 'container px-6 my-8 mx-auto',
      'link': `
        relative text-xl border-solid
        text-light hover:text-primary transition-color duration-300 
        after:(no-content h-px w-0 bg-primary absolute bottom-0.5 inset-x-0 inline-block transition-[width] duration-300)
        hover:after:w-full
      `,
      'h1': 'text-2xl font-extrabold',
      'h2': 'text-xl font-bold',
      'input': 'px-4 py-1.5 w-full text-dark placeholder:text-card placeholder:font-light font-medium bg-light border-none outline-none disabled:(bg-card text-white)',
      'btn': 'bg-primary px-5 py-1.5 h-fit text-dark hover:bg-light uppercase font-bold',
      'card': 'relative light:bg-card bg-card px-4 py-2 backdrop-light',
      'label': 'text-lg font-medium',
    },
    [/backdrop-(\w+)/, ([,c]) => `relative before:(no-content bg-${c} size-full absolute top-2 left-2 -z-2)`],
  ],
  rules: [
    ['no-content', { content: '\'\'' }],
    ['html', {
      'scrollbar-width': 'thin',
      'scrollbar-color': 'var(--color--primary) var(--color--card)',
    }],
  ],
  theme: {
    colors: {
      dark: 'var(--color--dark)',
      light: 'var(--color--light)',
      primary: 'var(--color--primary)',
      accent: 'var(--color--accent)',
      card: 'var(--color--card)',
      error: 'var(--color--error)',
    },
  },
  variants: [
    (matcher) => {
      const regexp = /^nth-child-([\dn\-]+):/
      const match = matcher.match(regexp)
      if (!match)
        return matcher
      const n = match[1]!.trim().replace(/^\(|\)$/g, '')
      return {
        matcher: matcher.replace(regexp, ''),
        selector: s => `${s}:nth-child(${n})`,
      }
    },

    (matcher) => {
      const regexp = /^parent\b([^:]+):/
      const match = matcher.match(regexp)
      if (!match)
        return matcher

      const c = match[1]!

      return {
        matcher: matcher.replace(regexp, ''),
        selector: s => `${c.replaceAll('_', ' ')} ${s}`,
      }
    },
  ],
})
