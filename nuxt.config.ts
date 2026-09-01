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

  srcDir: "app/",

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  css: ["~/assets/styles/index.styl"],

  modules: [
    // "@unocss/nuxt",
    // "nuxt-swiper",
    "@nuxt/icon",
    "@nuxt/image",
    '@nuxtjs/tailwindcss',
    "nuxt-headlessui",  
    "@pinia/nuxt",
    // 'radix-vue/nuxt',
  ],  
  
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  
  icon: {
    customCollections: [
      {
        prefix: 'my-icon',
        dir: './app/assets/icons',
      },
    ],
  },
  
  // shadcn: {
  //   prefix: 'Ui',
  //   componentDir: [
  //     '@/components/ui',
  //   ],
  // },

  // image: {
  //   inject: true
  // },

  // headlessui: {
  //   prefix: "Headless",
  // },

  pinia: {
    storesDirs: ['~/stores/**','./src/stores/**','./stores/**'],
  },

  runtimeConfig: {
    public: {
      appwriteEndpoint: process.env.NUXT_PUBLIC_APPWRITE_ENDPOINT ?? "",
      appwriteProjectId: process.env.NUXT_PUBLIC_APPWRITE_PROJECT_ID ?? "",
      appwriteDbId: process.env.NUXT_PUBLIC_APPWRITE_DB_ID ?? "",
      appwriteCollectionDeals: process.env.NUXT_PUBLIC_APPWRITE_COLLECTION_DEALS ?? "",
      appwriteCollectionComments: process.env.NUXT_PUBLIC_APPWRITE_COLLECTION_COMMENTS ?? "",
      appwriteCollectionCustomers: process.env.NUXT_PUBLIC_APPWRITE_COLLECTION_CUSTOMERS ?? "",
      appwriteBucketId: process.env.NUXT_PUBLIC_APPWRITE_BUCKET_ID ?? "",
    },
  },

  compatibilityDate: "2025-12-15",
});
