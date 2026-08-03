// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    baseURL: process.env.GITHUB_PAGES ? '/portfolio/' : '/',
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/ui'
  ],
  css: ['~/assets/css/main.css']
})