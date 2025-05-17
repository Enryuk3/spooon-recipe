import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    spoonacular: {
      apiKey: '',
    },
  },
  routeRules: {
    '/**': {
      isr: 60 * 60 * 24,
    },
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
  ],
  // Configuraremos los estilos directamente en los componentes

  image: {
    providers: {
      spoonacular: {
        provider: '~/providers/spoonacular.ts',
      },
    },
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  $development: {
    nitro: {
      storage: {
        recipes: {
          driver: 'fs',
          base: 'recipes',
        },
      },
    },
  },
})
