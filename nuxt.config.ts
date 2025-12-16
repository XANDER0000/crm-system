// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "ru",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },

  // srcDir: "src/",

  // components: [
  //   {
  //     path: '~/components',
  //     pathPrefix: false,
  //   },
  // ],

  css: ["~/assets/styles/index.styl"],

  modules: [
    // "@unocss/nuxt",
    // "nuxt-swiper",
    // "nuxt-icons",
    "@nuxt/image",
    // "nuxt-headlessui",
    // "@pinia/nuxt",
    // 'radix-vue/nuxt',
  ],

  // image: {
  //   inject: true
  // },

  // headlessui: {
  //   prefix: "Headless",
  // },

  // pinia: {
  //   storesDirs: ['~/stores/**','./src/stores/**','./stores/**'],
  // },

  // runtimeConfig: {
  //   public: {
  //     apiDomain: process.env.API_DOMAIN ?? "",
  //     appDomain: process.env.APP_DOMAIN ?? "",
  //   },
  // },

  compatibilityDate: "2025-12-15",
});
